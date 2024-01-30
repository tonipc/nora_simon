<?php
/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.txt
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to a newer
 * versions in the future. If you wish to customize this module for your
 * needs please refer to CustomizationPolicy.txt file inside our module for more information.
 *
 * @author Webkul IN
 * @copyright Since 2010 Webkul
 * @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */
if (!defined('_PS_VERSION_')) {
    exit;
}
class WkPosOutletProductAttribute extends ObjectModel
{
    public $id_wkpos_outlet_product;
    public $id_product_attribute;
    public $quantity;

    public static $definition = [
        'table' => 'wkpos_outlet_product_attribute',
        'primary' => 'id_wkpos_outlet_product_attribute',
        'multilang' => false,
        'fields' => [
            'id_wkpos_outlet_product' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isUnsignedInt',
                'size' => 10,
            ],
            'id_product_attribute' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isUnsignedInt',
                'size' => 10,
            ],
            'quantity' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isInt',
                'size' => 10,
            ],
        ],
    ];

    /**
     * get Product Combination of a product
     *
     * @param [int] $idProduct
     *
     * @return array
     */
    public static function getProductCombination($idProduct)
    {
        // Added join for PS8
        $context = Context::getContext();
        $idShop = $context->shop->id;
        $idShopGroup = $context->shop->id_shop_group;

        $sql = 'SELECT pa.`id_product_attribute`';
        if (version_compare(_PS_VERSION_, '8.0.0', '>=')) {
            $sql .= ', sa.`location` ';
        } else {
            $sql .= ', pa.`location` ';
        }
        $sql .= ' FROM `' . _DB_PREFIX_ . 'product_attribute` pa
        LEFT JOIN `' . _DB_PREFIX_ . 'stock_available` sa
        ON sa.`id_product` = pa.`id_product` AND sa.`id_product_attribute` = pa.`id_product_attribute`
        ' . Shop::addSqlAssociation('product_attribute', 'pa') . '
        WHERE pa.`id_product` = ' . (int) $idProduct . ' AND sa.`id_shop` = ' . (int) $idShop;

        return Db::getInstance()->executeS($sql);
    }

    /**
     * get oultet product attribute id of a selcted product
     *
     * @param [int] $idWkPosProduct
     *
     * @return array
     */
    public static function getCombinationByIdOutletProduct($idWkPosProduct)
    {
        return Db::getInstance()->executeS(
            'SELECT opa.`id_wkpos_outlet_product_attribute`
            FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` opa
            WHERE opa.`id_wkpos_outlet_product` = ' . (int) $idWkPosProduct
        );
    }

    /**
     * get combination detail of a selected product attribute
     *
     * @param [int] $idProductAttribute
     * @param [int] $idWkPosOutlet
     * @param int $idWkPosOutletProduct
     * @param int $type
     *
     * @return void
     */
    public static function getProductCombinationDetail(
        $idProductAttribute,
        $idWkPosOutlet,
        $idWkPosOutletProduct = false,
        $type = 1,
        $idProduct = false
    ) {
        $idShop = Context::getContext()->shop->id;
        $sql = 'SELECT ';
        if ($type == 1) {
            $sql .= 'SUM(opa.`quantity`) as quantity';
        } elseif ($type == 2) {
            $sql .= 'opa.`id_wkpos_outlet_product_attribute`';
        }
        $sql .= ' FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` opa
            LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product` op
            ON (opa.`id_wkpos_outlet_product` = op.`id_wkpos_outlet_product`)
            WHERE opa.`id_product_attribute` = ' . (int) $idProductAttribute . ' AND op.`id_shop` = ' . (int) $idShop;
        if ($type == 1) {
            $sql .= ' AND op.`id_wkpos_outlet` NOT IN (' . pSQL($idWkPosOutlet) . ')';
        } elseif ($type == 2) {
            $sql .= ' AND opa.`id_wkpos_outlet_product` = ' . (int) $idWkPosOutletProduct;
        }
        if ($idProduct) {
            $sql .= ' AND op.`id_product` = ' . (int) $idProduct;
        }

        return Db::getInstance()->getValue($sql);
    }

    /**
     * get product qunatity of a selected product of an outlet
     *
     * @param [int] $idProduct
     * @param [int] $idWkPosOutlet
     * @param int $idProductAttribute
     *
     * @return void
     */
    public static function getProductQuantity($idProduct, $idWkPosOutlet, $idProductAttribute = false)
    {
        $sql = 'SELECT ';
        if ($idProductAttribute) {
            $sql .= 'opa.`quantity`';
        } else {
            $sql .= 'SUM(opa.`quantity`)';
        }
        $sql .= ' FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` opa
            LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product` op
            ON (opa.`id_wkpos_outlet_product` = op.`id_wkpos_outlet_product`)
            WHERE op.`id_product` = ' . (int) $idProduct .
            ' AND op.`id_wkpos_outlet` = ' . (int) $idWkPosOutlet;
        if ($idProductAttribute) {
            $sql .= ' AND opa.`id_product_attribute` = ' . (int) $idProductAttribute;
        }

        return Db::getInstance()->getValue($sql);
    }

    /**
     * get attribute wise details of a product.
     *
     * @param [int] $idOutletProduct
     * @param [int] $idLang
     * @param string $valueSeparator
     * @param string $separator
     *
     * @return array
     */
    public function getAttributesResume($idOutletProduct, $idLang, $valueSeparator = ' - ', $separator = ', ')
    {
        if (!Combination::isFeatureActive()) {
            return [];
        }

        $combinations = Db::getInstance()->executeS(
            'SELECT pa.*, opa.*
            FROM `' . _DB_PREFIX_ . 'product_attribute` pa
            ' . Shop::addSqlAssociation('product_attribute', 'pa') . '
            LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` opa
             ON(opa.`id_product_attribute` = pa.`id_product_attribute`)
            WHERE opa.`id_wkpos_outlet_product` = ' . (int) $idOutletProduct . '
            GROUP BY pa.`id_product_attribute`'
        );
        if (!$combinations) {
            return false;
        }

        $product_attributes = [];
        foreach ($combinations as $combination) {
            $product_attributes[] = (int) $combination['id_product_attribute'];
        }

        $lang = Db::getInstance()->executeS(
            'SELECT pac.`id_product_attribute`,
            GROUP_CONCAT(agl.`name`, \'' . pSQL($valueSeparator) . '\',al.`name`
            ORDER BY agl.`id_attribute_group` SEPARATOR \'' . pSQL($separator) . '\') as attribute_designation
            FROM `' . _DB_PREFIX_ . 'product_attribute_combination` pac
            LEFT JOIN `' . _DB_PREFIX_ . 'attribute` a ON a.`id_attribute` = pac.`id_attribute`
            LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group` ag ON ag.`id_attribute_group` = a.`id_attribute_group`
            LEFT JOIN `' . _DB_PREFIX_ . 'attribute_lang` al
            ON (a.`id_attribute` = al.`id_attribute` AND al.`id_lang` = ' . (int) $idLang . ')
            LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group_lang` agl
            ON (ag.`id_attribute_group` = agl.`id_attribute_group` AND agl.`id_lang` = ' . (int) $idLang . ')
            WHERE pac.id_product_attribute IN (' . pSQL(implode(',', $product_attributes)) . ')
            GROUP BY pac.id_product_attribute'
        );

        foreach ($lang as $row) {
            foreach ($combinations as $j => $combination) {
                // modified for 549 issue
                if ($combination['id_product_attribute'] == $row['id_product_attribute']) {
                    $combinations[$j]['attribute_designation'] = $row['attribute_designation'];
                }
            }
        }

        // Get quantity of each variations
        foreach ($combinations as $key => $row) {
            $cacheKey = $row['id_product'] . '_' . $row['id_product_attribute'] . '_quantity';

            if (!Cache::isStored($cacheKey)) {
                $result = $row['quantity'];
                Cache::store(
                    $cacheKey,
                    $result
                );
                $combinations[$key]['quantity'] = $result;
            } else {
                $combinations[$key]['quantity'] = Cache::retrieve($cacheKey);
            }
        }

        return $combinations;
    }

    public function deleteAllOutletProductAttribute($idProductAttribute)
    {
        return Db::getInstance()->execute(
            'DELETE FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute`
            WHERE `id_product_attribute` = ' . (int) $idProductAttribute
        );
    }

    public function getCombinationQty($idProduct)
    {
        return Db::getInstance()->executeS(
            'SELECT SUM(wkpa.`quantity`) as `quantity`, wkp.`id_wkpos_outlet_product`
            FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` wkpa
            LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product` wkp
            ON wkp.`id_wkpos_outlet_product` = wkpa.`id_wkpos_outlet_product`
            WHERE wkp.`id_product` = ' . (int) $idProduct .
            ' GROUP BY wkp.`id_wkpos_outlet_product`'
        );
    }

    public static function getIdWkposOutletProductAttribute($idProduct, $idWkPosOutlet, $idProductAttribute)
    {
        $sql = 'SELECT ';
        $sql .= 'opa.`id_wkpos_outlet_product_attribute`';
        $sql .= ' FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` opa
            LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product` op
            ON (opa.`id_wkpos_outlet_product` = op.`id_wkpos_outlet_product`)
            WHERE op.`id_product` = ' . (int) $idProduct .
            ' AND op.`id_wkpos_outlet` = ' . (int) $idWkPosOutlet;
        if ($idProductAttribute) {
            $sql .= ' AND opa.`id_product_attribute` = ' . (int) $idProductAttribute;
        }

        return Db::getInstance()->getValue($sql);
    }
}
