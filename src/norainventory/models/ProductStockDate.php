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

use Cart;
use Combination;
use Configuration;
use Context;
use Db;
use DbQuery;
use Module;
use ObjectModel;
use Validate;
use Group;

class ProductStockDate extends ObjectModel
{
    /** @var int */
    public $id_product_stock_date;

    /** @var int */
    public $id_product;

    /** @var int */
    public $id_product_attribute;

    /** @var int */
    public $quantity;

    /** @var string 'YYYY-MM-DD' */
    public $available_date;

    /** @var string Object creation date in mysql format Y-m-d H:i:s */
    public $date_add;

    /** @var string Object last modification date in mysql format Y-m-d H:i:s */
    public $date_upd;

    public static $definition = [
        'table' => 'product_stock_date',
        'primary' => 'id_product_stock_date',
        'multilang' => false,
        'fields' => [
            'id_product_stock_date' => ['type' => self::TYPE_INT, 'validate' => 'isInt'],
            'id_product' => ['type' => self::TYPE_INT, 'validate' => 'isInt'],
            'id_product_attribute' => ['type' => self::TYPE_INT, 'validate' => 'isInt'],
            'quantity' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'available_date' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat'],

            // Timestamps
            'date_add' => ['type' => self::TYPE_DATE, 'shop' => true, 'validate' => 'isDate'],
            'date_upd' => ['type' => self::TYPE_DATE, 'shop' => true, 'validate' => 'isDate'],
        ],
    ];

    /**
     * Get id of the model which fullfill requirements
     *
     * @param string $date
     * @param int $idProduct
     * @param int $idProductAttribute
     *
     * @return int
     */
    public static function getIdByParams($date, $idProduct, $idProductAttribute)
    {
        $sql = new DbQuery();

        $sql->select(self::$definition['primary']);
        $sql->from(self::$definition['table']);
        $sql->where('`id_product` = ' . $idProduct);

        if ($idProductAttribute) {
            $sql->where('`id_product_attribute` = ' . $idProductAttribute);
        }

        $sql->where('`available_date` = "' . $date . '"');

        return Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($sql, false);
    }

    public static function cleanStock()
    {
        $module = Module::getInstanceByName('norainventory');
        $context = Context::getContext();

        // Remove products that weren't attributes but not now they have
        $sql = new DbQuery();
        $sql->select(self::$definition['primary']);
        $sql->from(self::$definition['table']);
        $sql->where('`id_product_attribute` = 0');
        $sql->where('`id_product` IN (SELECT `id_product` FROM `' . _DB_PREFIX_ . self::$definition['table'] . '` WHERE `id_product_attribute` > 0)');
        $inStockNowWithAttributesIds = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

        $ids = [];
        foreach ($inStockNowWithAttributesIds as $id) {
            $ids[] = $id[self::$definition['primary']];
        }

        if ($ids) {
            $where = self::$definition['primary'] . ' IN (' . implode(',', $ids) . ')';

            Db::getInstance()->delete(self::$definition['table'], $where);
        }

        // Clean yesterday stocks
        /*$sql = new DbQuery();
        $sql->select('cd.*, c.*'); //, cp.`id_cart`, o.`id_order`
        $sql->from('customized_data', 'cd');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'customization` as c' .
            ' ON (c.`id_customization` = cd.`id_customization`)');

        //$sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'orders` as o' .
        //    ' ON (o.`id_cart` = c.`id_cart`)');

        //$sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'cart_product` as cp' .
        //    ' ON (cp.`id_customization` = c.`id_customization`)');

        $sql->where('cd.value < DATE(CURDATE())');
        $sql->where('cd.id_module = "' . (int) $module->id . '"');
        //$sql->where('o.id_order IS NOT NULL');



        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql, true, false);

        foreach ($result as $row) {
            $module->updateStock($row['value'], 0, $row['id_product'], $row['id_product_attribute']);
            //$cart = new Cart($row['id_cart'], $context->language->id); //CREO QUE HACE UN UPDATE DEL CART PARA BORRARLOS EN CASO DE QUE HUBIERA ITEMS EN EL CARRITO, PERO COMO LOS BORRAMOS DIRECTAMENTE CREO QUE NO TIENE MUCHO SENTIDO
 //           $cart->deleteProduct($row['id_product'], $row['id_product_attribute'], $row['id_customization']);
}*/

        // Delete previous stock -> Podría cambiarse por una query directa DELETE FROM `nora_product_stock_date` WHERE available_date <= DATE(CURDATE())
        /*$sql = new DbQuery();
        $sql->select('*');
        $sql->from(self::$definition['table']);
        $sql->where('`available_date` < DATE(CURDATE())');
        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql, true, false);

        foreach ($result as $row) {
            $module->updateStock($row['available_date'], 0, $row['id_product'], $row['id_product_attribute']);
        }*/

        Db::getInstance(_PS_USE_SQL_SLAVE_)->execute('DELETE FROM `' . _DB_PREFIX_ . self::$definition['table'] . '` WHERE available_date < DATE(CURDATE())');

        return true;
    }

    /**
     * @param string $date Date in format 'YYYY-MM-DD'
     * @param array $attributes Attribute ids [1, 2, 3]
     * @param array $categories Category ids [1, 2, 3]
     * @param number $menu Menu Id
     * @param number $option Option Id
     * @param number $step Step Id
     *
     * @return array
     */
    // public static function getProductsByDate($date, $attributes = [], $categories = [], $menu = 0, $option = 0, $step = 0)
    public static function getProductsByDate($date, $attributes = [], $categories = [])
    {
        if (!$date || !Validate::isDate($date)) {
            return [];
        }

        $sql = new DbQuery();

         $idLang = Context::getContext()->language->id;
        $sql->select('a.*,
        p.id_product, p.out_of_stock, p.id_category_default, p.ean13, p.minimal_quantity, p.unit_price_ratio,
        pl.`name`, pl.`link_rewrite`,
        cl.`name` AS `category_name`');

        $sql->from(self::$definition['table'], 'a');

        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product` as p' .
            ' ON (p.`id_product` = a.`id_product`)');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` as pl' .
            ' ON (pl.`id_product` = p.`id_product` AND pl.`id_lang` = ' . (int) $idLang . ')');

        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'category_lang` as cl' .
            ' ON (cl.`id_category` = p.`id_category_default` AND cl.`id_lang` = ' . (int) $idLang . ')');

        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'manufacturer` as ma' .
            ' ON (p.`id_manufacturer` = ma.`id_manufacturer`)');

        $sql->where('a.`available_date` = "' . pSQL(date('Y-m-d', strtotime($date))) . '"');

        $categories = array_filter($categories);
        if (!empty($categories)) {
            $sql->where('p.`id_category_default` IN (' . implode(',', $categories) .')');
        }

        $attributes = array_filter($attributes);
        if (!empty($attributes) && Combination::isFeatureActive()) {
            $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute_combination` as pac' .
                ' ON (pac.`id_product_attribute` = a.`id_product_attribute`)');

            $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_attribute` as psa' .
                ' ON (psa.`id_attribute` = pac.`id_attribute`)');

            $sql->where('(psa.`id_attribute` IN (' . implode(',', $attributes) .') OR psa.`id_attribute` IS NULL)');
            $sql->groupBy('a.id_product', 'a.id_product_attribute');
        }

        // $sql->groupBy('a.id_product', 'a.id_product_attribute');
        $sql->orderBy('ma.`name`', 'asc');

        $products = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql, true, false);

        // dump($products);

        return $products;
    }

    /**
     * Get all the list of model data
     *
     * @return array|false
     */
    public static function getProductsStock($dateFrom = '', $dateTo = '')
    {
        $sql = new DbQuery();

        $sql->select('*');
        $sql->from(self::$definition['table']);

        if ($dateFrom && $dateTo) {
            $sql->where('`date` BETWEEN "' . pSQL($dateFrom) . '"' .
            ' AND "' . pSQL($dateTo) . '"');
        }

        $stocks = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql, true, false);

        return $stocks;
    }

    /**
     * Get the stock quantity for the specif product and date
     *
     * @param string $date
     * @param int $idProduct
     * @param int $idProductAttribute
     */
    public static function getStockByDate($date, $idProduct, $idProductAttribute)
    {
        $sql = new DbQuery();

        $sql->select('quantity');
        $sql->from(self::$definition['table']);
        $sql->where('`id_product` = ' . (int) $idProduct);
        $sql->where('`id_product_attribute` = ' . (int) $idProductAttribute);
        $sql->where('`available_date` = "' . pSQL($date) . '"');
        // $sql->where('`id_shop` = ' . (int) Context::getContext()->shop->id);

        $stock = Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($sql, true, false);

        return (int) $stock;
    }

    /**
     * Get the total stock by product
     *
     * @param int $idProduct
     * @param int $idProductAttribute
     */
    public static function getStockByProduct($idProduct, $idProductAttribute = 0)
    {
        $sql = new DbQuery();

        $sql->select('SUM(quantity)');
        $sql->from(self::$definition['table']);
        $sql->where('`id_product` = ' . (int) $idProduct);
        $sql->where('`id_product_attribute` = ' . (int) $idProductAttribute);

        $stock = Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($sql, true, false);

        return (int) $stock;
    }

    /**
     * Get the dates to determine in which days there are inventory
     *
     * @param bool $fromTomorrow Get dates only from tomorrow
     *
     * @return array|false
     */
    public static function getAvailableDates($fromTomorrow = false)
    {

        $sql = new DbQuery();
        $sql->select('available_date');
        $sql->from(self::$definition['table']);

        $hora_corte = explode('.', Group::getCurrent()->clossing_time);

        //Calculate if current hour has passed the scheduled time
        $next_day = false;

        if(date('H') == $hora_corte[0]) {
            $minutes_now = round(date('i') / 60, 2);
            if($minutes_now > ($hora_corte[1]/100)) {
                $next_day = true;
            }
        } else if(date('H') > $hora_corte[0]) {
            $next_day = true;
        }

        //$next_day = false;

        if ($next_day) {
            // $tomorrow = date("Y-m-d", strtotime('tomorrow'));
            $sql->where('available_date > DATE(CURDATE())');
        }
        else
        {
            $sql->where('available_date >= DATE(CURDATE())');
        }


        $sql->groupBy('available_date');


        $dates = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql, true, false);

        $result = [];
        if (is_array($dates) && count($dates)) {
            $result = array_column($dates, 'available_date');
            asort($result);
        }

        return $result;
    }

    /**
     * Get products array with stock information
     *
     * @return array
     */
    public static function getProductsWithPopulate($params)
    {
        $idLang = Context::getContext()->language->id;
        $sql = new DbQuery();

        $sql->select(
            'p.`id_product` AS `id_product`, p.`active` AS `active`,
            pl.`name` AS `name`,
            cl.`name` AS `category_name`,
            pa.`id_product_attribute` AS `id_product_attribute`,
            al.`name` AS `attribute_name`'
        );

        $sql->from('product', 'p');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` as pl' .
            ' ON (pl.`id_product` = p.`id_product`)');

        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'category_lang` as cl' .
            ' ON (cl.`id_category` = p.`id_category_default`)');

        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute` as pa' .
            ' ON (pa.`id_product` = p.`id_product`)');

        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute_combination` as pac' .
            ' ON (pac.`id_product_attribute` = pa.`id_product_attribute`)');

        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'attribute_lang` as al' .
            ' ON (al.`id_attribute` = pac.`id_attribute`)');

        $sql->where('pl.`id_lang` = ' . (int) $idLang);
        $sql->where('(al.`id_lang` = ' . (int) $idLang . ' OR al.`id_lang` IS NULL)');
        $sql->where('cl.`id_lang` = ' . (int) $idLang);
        $sql->where('p.`id_category_default` <> ' . (int) Configuration::get('NORAINVENTORY_DEFAULT_CATEGORY'));

        if (isset($params['name'])) {
            $sql->where('pl.`name` LIKE "%' . pSQL($params['name']) . '%"');
        }

        if (isset($params['category'])) {
            $sql->where('cl.`name` LIKE "%' . pSQL($params['category']) . '%"');
        }

        if (isset($params['active']) ) {
            $sql->where('p.`active` = ' . (int) $params['active']);
        }

        $sql->orderBy('pl.`name` ASC');

        $products = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql, true, false);

        // @TODO: Product::getProductsProperties((int) $idLang, $products)
        return $products;
    }

    /**
     * Get products array without product attributes, for Control Cocina
     *
     * @return array
     */
    public static function getProductsWithPopulateCC($params)
    {
        $idLang = Context::getContext()->language->id;
        $sql = new DbQuery();

        $sql->select(
            'p.`id_product` AS `id_product`,
            pl.`name` AS `name`'
        );

        $sql->from('product', 'p');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` as pl' .
            ' ON (pl.`id_product` = p.`id_product`)');

        $sql->where('pl.`id_lang` = ' . (int) $idLang);

        $sql->where('p.`id_category_default` <> ' . (int) Configuration::get('NORAINVENTORY_DEFAULT_CATEGORY'));

        if (isset($params['name'])) {
            $sql->where('pl.`name` LIKE "%' . pSQL($params['name']) . '%"');
        }

        if (isset($params['active'])) {
            $sql->where('p.`active` = ' . (int) $params['active']);
        }

        if (isset($params['omit'])) {
        //array(8,80,160,302,303,401,402,427,428,429,435,451,458,459,460,461)
            $sql->where('p.`id_product` NOT IN (' . trim(str_replace(']','',trim(str_replace('[','',json_encode($params['omit'] ))))).')');
            //$sql->where('p.`id_product` NOT IN (  8,9,19)');
        }

        $sql->groupBy('p.`id_product`');
        $sql->orderBy('pl.`name` ASC');

        $products = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql, true, false);

        // @TODO: Product::getProductsProperties((int) $idLang, $products)
        return $products;
    }
}
