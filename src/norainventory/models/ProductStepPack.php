<?php
/**
* 2007-2020 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2020 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

namespace Module\NoraInventory\Models;

use Address;
use Configuration;
use Context;
use Db;
use DbQuery;
use FrontController;
use Group;
use ObjectModel;
use Tax;
use TaxManagerFactory;
use Tools;
use Validate;

class ProductStepPack extends ObjectModel
{
    /** @var string */
    public $name;

    /** @var string */
    public $description_short;

    /** @var string */
    public $description;

    /** @var string enum product_pack cart_rule */
    public $type;

    /** @var bool */
    public $active;

    /** @var int */
    public $position;

    public $price = 0;
    public $reduction_amount = 0;
    public $reduction_percent = 0;

    public $id_tax_rules_group = 0;

    /** @var bool */
    public $upselling;

    public static $definition = [
        'table' => 'product_step_pack',
        'primary' => 'id_product_step_pack',
        'multilang' => true,
        'fields' => [
            'active' => [
                'type' => self::TYPE_INT,
                'validate' => 'isBool',
                'required' => false,
            ],
            'position' => [
                'type' => self::TYPE_INT,
                'validate' => 'isUnsignedInt',
                'required' => false,
            ],
            'type' => [
                'type' => self::TYPE_STRING,
                'required' => true,
                'values' => [
                    'product_pack',
                    'cart_rule',
                ],
                'default' => 'product_pack',
            ],
            'price' => [
                'type' => self::TYPE_FLOAT,
                'validate' => 'isPrice',
            ],
            'id_tax_rules_group' => [
                'type' => self::TYPE_INT,
                'validate' => 'isInt',
            ],
            'reduction_amount' => [
                'type' => self::TYPE_FLOAT,
                'validate' => 'isFloat',
            ],
            'reduction_percent' => [
                'type' => self::TYPE_FLOAT,
                'validate' => 'isFloat',
            ],
            'upselling' => [
                'type' => self::TYPE_INT,
                'validate' => 'isBool',
                'required' => false,
            ],
            /* Lang fields */
            'name' => [
                'type' => self::TYPE_STRING,
                'lang' => true,
                'validate' => 'isCatalogName',
                'required' => true,
                'size' => 255,
            ],
            'description_short' => [
                'type' => self::TYPE_HTML,
                'lang' => true,
                'validate' => 'isCleanHtml',
            ],
            'description' => [
                'type' => self::TYPE_HTML,
                'lang' => true,
                'validate' => 'isCleanHtml',
            ],
        ],
    ];

    public function add($autoDate = true, $nullValues = false)
    {
        if (!$this->id_shop) {
            $this->id_shop = Context::getContext()->shop->id;
        }

        if ($this->position <= 0) {
            $this->position = static::getHigherPosition() + 1;
        }

        return parent::add($autoDate, $nullValues);
    }

    public function delete()
    {
        if (!parent::delete()) {
            return false;
        }

        $this->cleanGroups();

        return static::cleanPositions();
    }

    public function cleanGroups()
    {
        return Db::getInstance()->delete('product_step_pack_group', 'id_product_step_pack = ' . (int) $this->id);
    }

    /**
     * @param array $product
     * @param bool $useTax
     * @param Address $address
     */

     //ahora ya calcula bien las tasas con el precio sin IVA
    public static function getPackPriceWithTaxes(array $product, $useTax = true, Address $address = null)
    {
        $context = Context::getContext();

        if (!Validate::isLoadedObject($address)) {
            // Address
            if (is_object($context->cart) && $context->cart->{Configuration::get('PS_TAX_ADDRESS_TYPE')} != null) {
                $id_address = $context->cart->{Configuration::get('PS_TAX_ADDRESS_TYPE')};
                $address = new Address($id_address);
            } else {
                $address = new Address();
            }

            $address->id_country = $context->country->id;
        }

        $taxManager = TaxManagerFactory::getManager($address, $product['id_tax_rules_group'] ?: 0);
        $productTaxCalculator = $taxManager->getTaxCalculator();
        //no price
        $price = (float) $product['tax_excl'];
        if ($useTax) {
            //no price
            $price = $productTaxCalculator->addTaxes((float) $product['tax_excl']);
        }

        return $price;
    }

    public static function getDetailedPacks($onlyActive = true)
    {
        $context = Context::getContext();
        $idLang = (int) $context->language->id;
        $currency = $context->currency;

        $sqlGroupsWhere = '';
        $sqlGroupsJoin = '';
        if (Group::isFeatureActive()) {
            $sqlGroupsJoin = 'LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_group` pspg ON (pspg.`id_product_step_pack` = psp.`id_product_step_pack`)';
            $groups = FrontController::getCurrentCustomerGroups();
            $sqlGroupsWhere = 'pspg.`id_group` ' . (count($groups) ? 'IN (' . implode(',', $groups) . ')' : '=' . (int) Group::getCurrent()->id);
        }

        $sql = new DbQuery();
        $sql->select('
            a.*, psposl.`name` AS `name`,
            psp.`price` AS `price`, psp.`id_tax_rules_group` AS `id_tax_rules_group`, psp.`type` AS `type`, psp.`upselling` AS `upselling`,
            pspl.`id_product_step_pack` AS `id_menu`, pspl.`name` AS `menu_name`, pspl.`description_short`, pspl.`description`,
            pspol.`id_product_step_pack_option` AS `id_option`, pspol.`name` AS `option_name`,
            psl.`id_product_step` AS `id_step`, psl.`name` AS `step_name`'
        );
        $sql->from('product_step_pack_option_step', 'a');
        // LANG
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_option_step_lang` AS psposl' .
        ' ON (psposl.`id_product_step_pack_option_step` = a.`id_product_step_pack_option_step`' .
        ' AND psposl.`id_lang` = ' . (int) $idLang . ')');

        // OPTION LANG
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_option` AS pspo' .
        ' ON (pspo.`id_product_step_pack_option` = a.`id_product_step_pack_option`)');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_option_lang` AS pspol' .
        ' ON (pspol.`id_product_step_pack_option` = pspo.`id_product_step_pack_option`' .
        ' AND pspol.`id_lang` = ' . (int) $idLang . ')');

        // MENU LANG
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack` AS psp' .
        ' ON (psp.`id_product_step_pack` = pspo.`id_product_step_pack`)');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_lang` AS pspl' .
        ' ON (pspl.`id_product_step_pack` = psp.`id_product_step_pack`' .
        ' AND pspl.`id_lang` = ' . (int) $idLang . ')');

        // STEP LANG
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_lang` AS psl' .
        ' ON (psl.`id_product_step` = a.`id_product_step`' .
        ' AND psl.`id_lang` = ' . (int) $idLang . ')');

        // Groups
        $sql->join($sqlGroupsJoin);
        $sql->where($sqlGroupsWhere);

        if ($onlyActive) {
            $sql->where('psp.`active` = 1');
            $sql->where('pspo.`active` = 1');
            $sql->where('a.`active` = 1');
        }

        //Weekends al final
        $sql->orderBy('psp.position');

        $row = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql, true, false);

        $menus = [];
        $options = [];
        $steps = [];
        $result = [];
        foreach ($row as $item) {
            $menus[(int) $item['id_menu']] = [
                'id' => (int) $item['id_menu'],
                'label' => $item['menu_name'],
                'description_short' => $item['description_short'],
                'description' => $item['description'],
                'type' => $item['type'],
                'upselling' => $item['upselling'],
            ];

            // Use tax
            $useTax = true;
            if (Tax::excludeTaxeOption()) {
                $useTax = false;
            }

            //Get the price, as it can vary based on group
            $item['tax_excl'] = self::get_group_price($item['id_menu'], $item['price']);

            // dump($item);

            $priceAmount = (float) self::getPackPriceWithTaxes($item, $useTax);
            $priceTaxExc = (float) $item['tax_excl'];

            $price = Tools::displayPrice(
                $priceAmount,
                $currency
            );

            $options[(int) $item['id_menu']][(int) $item['id_option']] = [
                'id' => (int) $item['id_option'],
                'label' => $item['option_name'],
                'id_menu' => (int) $item['id_menu'],
                'type' => $item['type'],
                'price' => $price,
                'price_amount' => $priceAmount,
                'price_tax_exc' => $priceTaxExc,
            ];

            $steps[(int) $item['id_menu']][(int) $item['id_option']][(int) $item['id_step']] = [
                'id' => (int) $item['id_step'],
                'label' => $item['step_name'],
                'quantity' => $item['quantity'],
                'id_menu' => (int) $item['id_menu'],
                'id_option' => (int) $item['id_option'],
            ];
        }

        foreach ($menus as $menu) {
            foreach ($options[$menu['id']] as $option) {
                $options[$menu['id']][$option['id']]['steps'] = array_values($steps[$menu['id']][$option['id']]);
            }

            $menus[$menu['id']]['options'] = array_values($options[$menu['id']]);
        }

        return array_values($menus);
    }


    /***
        Gets the price from database for group if needed
    */

    public static function get_group_price($pack_id, $price)
    {
        //get if there are prices for the menu
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('product_step_pack_price', 'ps');
        $sql->innerJoin('product_step_pack_price_group', 'pp','ps.id_product_step_pack_price = pp.id_product_step_pack_price');
        $sql->where('ps.id_product_step_pack'. ' = ' . (int) $pack_id );

        // if($pack_id == 2)
        //     dump($sql);

        $row = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
        
        // No te da el grupo por defecto del cliente
        // $groupId = FrontController::getCurrentCustomerGroups(); 

        //este sí
        $id_default_group = Context::getContext()->customer->id_default_group;

        // echo 'grupo actual';
        // dump($id_default_group);
        
        // $price = $original_price;

        foreach ($row as $val) {

            // if($pack_id == 2 && $val['id_group'] == 201)
            //     dump($val);
            // if ( in_array( $val['id_group'], $groupId) )
            if ($val['id_group'] == $id_default_group)
            {
                $price = $val['price'];
            }
        }

        return $price;
    }


    /**
     * Moves a object.
     *
     * @since 1.5.0
     *
     * @param bool $way Up (1) or Down (0)
     * @param int $position Current position of the Object
     *
     * @return bool Whether the update was successful
     */
    public function updatePosition($way, $position)
    {
        $id_shop = Context::getContext()->shop->id;
        if (!$res = Db::getInstance()->executeS(
            'SELECT `' . static::$definition['primary'] . '`, `position`
			FROM `' . _DB_PREFIX_ . static::$definition['table'] . '`
            WHERE `id_shop` = ' . (int) $id_shop . '
			ORDER BY `position` ASC'
        )) {
            return false;
        }

        foreach ($res as $item) {
            if ((int) $item[static::$definition['primary']] == (int) $this->id) {
                $moved_item = $item;
            }
        }

        if (!isset($moved_item) || !isset($position)) {
            return false;
        }

        // < and > statements rather than BETWEEN operator
        // since BETWEEN is treated differently according to databases
        return Db::getInstance()->execute('
			UPDATE `' . _DB_PREFIX_ . static::$definition['table'] . '`
			SET `position`= `position` ' . ($way ? '- 1' : '+ 1') . '
			WHERE `position`
			' . ($way
                ? '> ' . (int) $moved_item['position'] . ' AND `position` <= ' . (int) $position
                : '< ' . (int) $moved_item['position'] . ' AND `position` >= ' . (int) $position . '
			AND `id_shop` = ' . (int) $id_shop))
        && Db::getInstance()->execute('
			UPDATE `' . _DB_PREFIX_ . static::$definition['table'] . '`
			SET `position` = ' . (int) $position . '
			WHERE `' . static::$definition['primary'] . '` = ' . (int) $moved_item[static::$definition['primary']] . '
            AND `id_shop` = ' . (int) $id_shop);
    }

    /**
     * Reorder Object positions
     * Called after deleting an Object.
     *
     * @since 1.5.0
     *
     * @return bool $return
     */
    public static function cleanPositions()
    {
        $id_shop = Context::getContext()->shop->id;
        $return = true;
        $sql = '
		SELECT `' . static::$definition['primary'] . '`
		FROM `' . _DB_PREFIX_ . static::$definition['table'] . '`
        WHERE `id_shop` = ' . (int) $id_shop . '
		ORDER BY `position` ASC';

        $result = Db::getInstance()->executeS($sql);
        $i = 0;
        foreach ($result as $value) {
            $return = Db::getInstance()->execute('
			UPDATE `' . _DB_PREFIX_ . static::$definition['table'] . '`
			SET `position` = ' . (int) $i++ . '
			WHERE `' . static::$definition['primary'] . '` = ' . (int) $value[static::$definition['primary']]);
        }

        return $return;
    }

    /**
     * Gets the highest object position.
     *
     * @since 1.5.0
     *
     * @return int $position
     */
    public static function getHigherPosition()
    {
        $sql = 'SELECT MAX(`position`)
			FROM `' . _DB_PREFIX_ . static::$definition['table'] . '`';
        $position = Db::getInstance()->getValue($sql);

        return (is_numeric($position)) ? $position : -1;
    }

    public function updateGroups($groups)
    {
        if (empty($groups)) {
            return false;
        }

        $result = Db::getInstance()->executeS(
            '
            SELECT a.`id_group`
            FROM `' . _DB_PREFIX_ . 'product_step_pack_group` a
            LEFT JOIN `' . _DB_PREFIX_ . 'group` g ON (g.`id_group` = a.`id_group`)
            WHERE a.`id_group` NOT IN (' . implode(',', array_map('intval', $groups)) . ')
            AND a.id_product_step_pack = ' . (int) $this->id
        );

        if (!is_array($result)) {
            return false;
        }

        foreach ($result as $groupToDelete) {
            $this->deleteGroup($groupToDelete['id_group']);
        }

        if (!$this->addToGroups($groups)) {
            return false;
        }

        return true;
    }

    public function deleteGroup($idGroup)
    {
        $result = Db::getInstance()->executeS(
            'SELECT `id_group`
            FROM `' . _DB_PREFIX_ . 'product_step_pack_group`
            WHERE `id_product_step_pack` = ' . (int) $this->id . '
            AND id_group = ' . (int) $idGroup . ''
        );

        $return = Db::getInstance()->delete(
            'product_step_pack_group',
            'id_product_step_pack = ' . (int) $this->id . ' AND id_group = ' . (int) $idGroup
        );

        return $return;
    }

    public function addToGroups($groups = [])
    {
        if (empty($groups)) {
            return false;
        }

        if (!is_array($groups)) {
            $groups = [$groups];
        }

        if (!count($groups)) {
            return false;
        }

        $groups = array_map('intval', $groups);

        $currentGroups = $this->getGroups();
        $currentGroups = array_map('intval', $currentGroups);

        $stepGruops = [];

        foreach ($groups as $group) {
            if (!in_array($group, $currentGroups)) {
                $stepGruops[] = [
                    'id_product_step_pack' => (int) $this->id,
                    'id_group' => (int) $group,
                ];
            }
        }

        Db::getInstance()->insert('product_step_pack_group', $stepGruops);

        return true;
    }

    public function getGroups()
    {
        return self::getStepPackGroups($this->id);
    }

    public static function getStepPackGroups($idProductStepPack)
    {
        $sql = new DbQuery();
        $sql->select('id_group');
        $sql->from('product_step_pack_group');
        $sql->where(static::$definition['primary'] . ' = ' . (int) $idProductStepPack);

        $row = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

        $ret = [];
        foreach ($row as $val) {
            $ret[] = $val['id_group'];
        }

        return $ret;
    }
}
