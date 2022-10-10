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

use Context;
use Db;
use DbQuery;
use ObjectModel;
use Shop;

class ProductStep extends ObjectModel
{
    /** @var string */
    public $name;

    /** @var string */
    public $description_short;

    /** @var string */
    public $description;

    /** @var bool */
    public $active;

    /** @var int */
    public $position;

    public $price = 0;
    public $reduction_amount = 0;
    public $reduction_percent = 0;

    public $id_cart_rule;
    public $id_product_rule_group;
    public $id_product_rule;
    public $id_product_pack;

    public static $definition = [
        'table' => 'product_step',
        'primary' => 'id_product_step',
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
        'associations' => [
            'categories' => [
                'type' => self::HAS_MANY,
                'field' => 'id_category',
                'object' => 'Category',
                'association' => 'product_step_category',
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

    public function updateAttributes($attributes)
    {
        if (empty($attributes)) {
            return false;
        }

        $result = Db::getInstance()->executeS(
            '
            SELECT psa.`id_attribute`
            FROM `' . _DB_PREFIX_ . 'product_step_attribute` psa
            LEFT JOIN `' . _DB_PREFIX_ . 'attribute` a ON (a.`id_attribute` = psa.`id_attribute`)
            ' . Shop::addSqlAssociation('attribute', 'a', true, null, true) . '
            WHERE psa.`id_attribute` NOT IN (' . implode(',', array_map('intval', $attributes)) . ')
            AND psa.id_product_step = ' . (int) $this->id
        );

        if (!is_array($result)) {
            return false;
        }

        foreach ($result as $attributeToDelete) {
            $this->deleteAttribute($attributeToDelete['id_attribute']);
        }

        if (!$this->addToAttributes($attributes)) {
            return false;
        }

        return true;
    }

    public function deleteAttribute($idAttribute)
    {
        $result = Db::getInstance()->executeS(
            'SELECT `id_attribute`
            FROM `' . _DB_PREFIX_ . 'product_step_attribute`
            WHERE `id_product_step` = ' . (int) $this->id . '
            AND id_attribute = ' . (int) $idAttribute . ''
        );

        $return = Db::getInstance()->delete(
            'product_step_attribute',
            'id_product_step = ' . (int) $this->id . ' AND id_attribute = ' . (int) $idAttribute
        );

        return $return;
    }

    public function addToAttributes($attributes = [])
    {
        if (empty($attributes)) {
            return false;
        }

        if (!is_array($attributes)) {
            $attributes = [$attributes];
        }

        if (!count($attributes)) {
            return false;
        }

        $attributes = array_map('intval', $attributes);

        $currentAttributes = $this->getAttributes();
        $currentAttributes = array_map('intval', $currentAttributes);

        $stepAttributes = [];

        foreach ($attributes as $attribute) {
            if (!in_array($attribute, $currentAttributes)) {
                $stepAttributes[] = [
                    'id_product_step' => (int) $this->id,
                    'id_attribute' => (int) $attribute,
                ];
            }
        }

        Db::getInstance()->insert('product_step_attribute', $stepAttributes);

        return true;
    }

    public function getAttributes()
    {
        return self::getStepAttributes($this->id);
    }

    public static function getStepAttributes($idProductStep)
    {
        $sql = new DbQuery();
        $sql->select('id_attribute');
        $sql->from('product_step_attribute');
        $sql->where(static::$definition['primary'] . ' = ' . (int) $idProductStep);

        $row = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

        $ret = [];
        foreach ($row as $val) {
            $ret[] = $val['id_attribute'];
        }

        return $ret;
    }

    /**
     * @param array $categories
     */
    public function updateCategories($categories)
    {
        if (empty($categories)) {
            return false;
        }

        $result = Db::getInstance()->executeS(
            '
            SELECT psc.`id_category`
            FROM `' . _DB_PREFIX_ . 'product_step_category` psc
            LEFT JOIN `' . _DB_PREFIX_ . 'category` c ON (c.`id_category` = psc.`id_category`)
            ' . Shop::addSqlAssociation('category', 'c', true, null, true) . '
            WHERE psc.`id_category` NOT IN (' . implode(',', array_map('intval', $categories)) . ')
            AND psc.id_product_step = ' . (int) $this->id
        );

        if (!is_array($result)) {
            return false;
        }

        foreach ($result as $catToDelete) {
            $this->deleteCategory($catToDelete['id_category']);
        }

        if (!$this->addToCategories($categories)) {
            return false;
        }

        return true;
    }

    public function deleteCategory($idCategory)
    {
        $result = Db::getInstance()->executeS(
            'SELECT `id_category`
            FROM `' . _DB_PREFIX_ . 'product_step_category`
            WHERE `id_product_step` = ' . (int) $this->id . '
            AND id_category = ' . (int) $idCategory . ''
        );

        $return = Db::getInstance()->delete(
            'product_step_category',
            'id_product_step = ' . (int) $this->id . ' AND id_category = ' . (int) $idCategory
        );

        return $return;
    }

    public function addToCategories($categories = [])
    {
        if (empty($categories)) {
            return false;
        }

        if (!is_array($categories)) {
            $categories = [$categories];
        }

        if (!count($categories)) {
            return false;
        }

        $categories = array_map('intval', $categories);

        $currentCategories = $this->getCategories();
        $currentCategories = array_map('intval', $currentCategories);

        $stepCats = [];

        foreach ($categories as $cat) {
            if (!in_array($cat, $currentCategories)) {
                $stepCats[] = [
                    'id_product_step' => (int) $this->id,
                    'id_category' => (int) $cat,
                ];
            }
        }

        Db::getInstance()->insert('product_step_category', $stepCats);

        return true;
    }

    public function getCategories()
    {
        return self::getStepCategories($this->id);
    }

    public static function getStepCategories($idProductStep)
    {
        $sql = new DbQuery();
        $sql->select('id_category');
        $sql->from('product_step_category');
        $sql->where(static::$definition['primary'] . ' = ' . (int) $idProductStep);

        $row = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

        $ret = [];
        foreach ($row as $val) {
            $ret[] = $val['id_category'];
        }

        return $ret;
    }

    public function delete()
    {
        if (!parent::delete()) {
            return false;
        }

        return static::cleanPositions();
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

    public static function getStepsWithCategories($active = true)
    {
        $sql = new DbQuery();
        $sql->select('a.`id_product_step`, a.`position`, psl.`name`, psl.`description_short`, psl.`description`, psc.`id_category`, psa.`id_attribute`');
        $sql->from(self::$definition['table'], 'a');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_category` as psc' .
            ' ON (psc.`' . self::$definition['primary'] . '` = a.`' . self::$definition['primary'] . '`)');

        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_attribute` as psa' .
        ' ON (psa.`' . self::$definition['primary'] . '` = a.`' . self::$definition['primary'] . '`)');

        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_lang` as psl' .
            ' ON (psl.`' . self::$definition['primary'] . '` = a.`' . self::$definition['primary'] . '`)');

        $sql->where('a.`id_shop` = ' . (int) Context::getContext()->shop->id);
        $sql->where('psl.`id_lang` = ' . (int) Context::getContext()->language->id);
        if ($active) {
            $sql->where('a.`active` = 1');
        }

        $sql->orderBy('a.`position` ASC');

        $row = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql, true, false);

        $result = [];
        $categories = [];
        $attributes = [];

        // 'id' => 1,
        // 'text' => '1',
        // 'label' => $this->module->l('First'),
        // 'categories' => [3]
        foreach ($row as $item) {
            if (empty($categories[$item['id_product_step']])) {
                $categories[$item['id_product_step']] = [
                    "{$item['id_category']}" => $item['id_category'],
                ];
            } else {
                $categories[$item['id_product_step']][$item['id_category']] = $item['id_category'];
            }

            if (empty($attributes[$item['id_product_step']])) {
                $attributes[$item['id_product_step']] = [
                    "{$item['id_attribute']}" => $item['id_attribute'],
                ];
            } else {
                $attributes[$item['id_product_step']][$item['id_attribute']] = $item['id_attribute'];
            }

            $result[$item['id_product_step']] = [
                'id' => $item['id_product_step'],
                'text' => (int) $item['position'] + 1,
                'label' => $item['name'],
                'description_short' => $item['description_short'],
                'description' => $item['description'],
                'categories' => $categories[$item['id_product_step']],
                'attributes' => $attributes[$item['id_product_step']],
            ];
        }

        return $result;
    }
}
