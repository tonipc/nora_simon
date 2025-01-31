<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

use PrestaShop\PrestaShop\Adapter\ServiceLocator;
use PrestaShop\PrestaShop\Core\Product\ProductInterface;

class Product extends ProductCore
{
    // public $temporada_semana;

    public static $definition = [
        'table' => 'product',
        'primary' => 'id_product',
        'multilang' => true,
        'multilang_shop' => true,
        'fields' => [
            /* Classic fields */
            'id_shop_default' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'id_manufacturer' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'id_supplier' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'reference' => ['type' => self::TYPE_STRING, 'validate' => 'isReference', 'size' => 64],
            'supplier_reference' => ['type' => self::TYPE_STRING, 'validate' => 'isReference', 'size' => 64],
            'location' => ['type' => self::TYPE_STRING, 'validate' => 'isReference', 'size' => 64],
            'width' => ['type' => self::TYPE_FLOAT, 'validate' => 'isUnsignedFloat'],
            'height' => ['type' => self::TYPE_FLOAT, 'validate' => 'isUnsignedFloat'],
            'depth' => ['type' => self::TYPE_FLOAT, 'validate' => 'isUnsignedFloat'],
            'weight' => ['type' => self::TYPE_FLOAT, 'validate' => 'isUnsignedFloat'],
            'quantity_discount' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'ean13' => ['type' => self::TYPE_STRING, 'validate' => 'isEan13', 'size' => 13],
            'isbn' => ['type' => self::TYPE_STRING, 'validate' => 'isIsbn', 'size' => 32],
            'upc' => ['type' => self::TYPE_STRING, 'validate' => 'isUpc', 'size' => 12],
            'mpn' => ['type' => self::TYPE_STRING, 'validate' => 'isMpn', 'size' => 40],
            'cache_is_pack' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'cache_has_attachments' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'is_virtual' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'state' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'additional_delivery_times' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'delivery_in_stock' => [
                'type' => self::TYPE_STRING,
                'lang' => true,
                'validate' => 'isGenericName',
                'size' => 255,
            ],
            'delivery_out_stock' => [
                'type' => self::TYPE_STRING,
                'lang' => true,
                'validate' => 'isGenericName',
                'size' => 255,
            ],

            /* Shop fields */
            'id_category_default' => ['type' => self::TYPE_INT, 'shop' => true, 'validate' => 'isUnsignedId'],
            'id_tax_rules_group' => ['type' => self::TYPE_INT, 'shop' => true, 'validate' => 'isUnsignedId'],
            'on_sale' => ['type' => self::TYPE_BOOL, 'shop' => true, 'validate' => 'isBool'],
            'online_only' => ['type' => self::TYPE_BOOL, 'shop' => true, 'validate' => 'isBool'],
            'ecotax' => ['type' => self::TYPE_FLOAT, 'shop' => true, 'validate' => 'isPrice'],
            'minimal_quantity' => ['type' => self::TYPE_INT, 'shop' => true, 'validate' => 'isUnsignedInt'],
            'low_stock_threshold' => ['type' => self::TYPE_INT, 'shop' => true, 'allow_null' => true, 'validate' => 'isInt'],
            'low_stock_alert' => ['type' => self::TYPE_BOOL, 'shop' => true, 'validate' => 'isBool'],
            'price' => ['type' => self::TYPE_FLOAT, 'shop' => true, 'validate' => 'isPrice', 'required' => true],
            'wholesale_price' => ['type' => self::TYPE_FLOAT, 'shop' => true, 'validate' => 'isPrice'],
            'unity' => ['type' => self::TYPE_STRING, 'shop' => true, 'validate' => 'isString'],
            'unit_price_ratio' => ['type' => self::TYPE_FLOAT, 'shop' => true],
            'additional_shipping_cost' => ['type' => self::TYPE_FLOAT, 'shop' => true, 'validate' => 'isPrice'],
            'customizable' => ['type' => self::TYPE_INT, 'shop' => true, 'validate' => 'isUnsignedInt'],
            'text_fields' => ['type' => self::TYPE_INT, 'shop' => true, 'validate' => 'isUnsignedInt'],
            'uploadable_files' => ['type' => self::TYPE_INT, 'shop' => true, 'validate' => 'isUnsignedInt'],
            'active' => ['type' => self::TYPE_BOOL, 'shop' => true, 'validate' => 'isBool'],
            'redirect_type' => ['type' => self::TYPE_STRING, 'shop' => true, 'validate' => 'isString'],
            'id_type_redirected' => ['type' => self::TYPE_INT, 'shop' => true, 'validate' => 'isUnsignedId'],
            'available_for_order' => ['type' => self::TYPE_BOOL, 'shop' => true, 'validate' => 'isBool'],
            'available_date' => ['type' => self::TYPE_DATE, 'shop' => true, 'validate' => 'isDateFormat'],
            'show_condition' => ['type' => self::TYPE_BOOL, 'shop' => true, 'validate' => 'isBool'],
            'condition' => ['type' => self::TYPE_STRING, 'shop' => true, 'validate' => 'isGenericName', 'values' => ['new', 'used', 'refurbished'], 'default' => 'new'],
            'show_price' => ['type' => self::TYPE_BOOL, 'shop' => true, 'validate' => 'isBool'],
            'indexed' => ['type' => self::TYPE_BOOL, 'shop' => true, 'validate' => 'isBool'],
            'visibility' => ['type' => self::TYPE_STRING, 'shop' => true, 'validate' => 'isProductVisibility', 'values' => ['both', 'catalog', 'search', 'none'], 'default' => 'both'],
            'cache_default_attribute' => ['type' => self::TYPE_INT, 'shop' => true],
            'advanced_stock_management' => ['type' => self::TYPE_BOOL, 'shop' => true, 'validate' => 'isBool'],
            'date_add' => ['type' => self::TYPE_DATE, 'shop' => true, 'validate' => 'isDate'],
            'date_upd' => ['type' => self::TYPE_DATE, 'shop' => true, 'validate' => 'isDate'],
            'pack_stock_type' => ['type' => self::TYPE_INT, 'shop' => true, 'validate' => 'isUnsignedInt'],
            // 'temporada_semana' => ['type' => self::TYPE_STRING, 'shop' => true],

            /* Lang fields */
            'meta_description' => ['type' => self::TYPE_STRING, 'lang' => true, 'validate' => 'isGenericName', 'size' => 512],
            'meta_keywords' => ['type' => self::TYPE_STRING, 'lang' => true, 'validate' => 'isGenericName', 'size' => 255],
            'meta_title' => ['type' => self::TYPE_STRING, 'lang' => true, 'validate' => 'isGenericName', 'size' => 255],
            'link_rewrite' => [
                'type' => self::TYPE_STRING,
                'lang' => true,
                'validate' => 'isLinkRewrite',
                'required' => false,
                'size' => 128,
                'ws_modifier' => [
                    'http_method' => WebserviceRequest::HTTP_POST,
                    'modifier' => 'modifierWsLinkRewrite',
                ],
            ],
            'name' => ['type' => self::TYPE_STRING, 'lang' => true, 'validate' => 'isCatalogName', 'required' => false, 'size' => 128],
            'description' => ['type' => self::TYPE_HTML, 'lang' => true, 'validate' => 'isCleanHtml'],
            'description_short' => ['type' => self::TYPE_HTML, 'lang' => true, 'validate' => 'isCleanHtml'],
            'available_now' => ['type' => self::TYPE_STRING, 'lang' => true, 'validate' => 'isGenericName', 'size' => 255],
            'available_later' => ['type' => self::TYPE_STRING, 'lang' => true, 'validate' => 'IsGenericName', 'size' => 255],
        ],
        'associations' => [
            'manufacturer' => ['type' => self::HAS_ONE],
            'supplier' => ['type' => self::HAS_ONE],
            'default_category' => ['type' => self::HAS_ONE, 'field' => 'id_category_default', 'object' => 'Category'],
            'tax_rules_group' => ['type' => self::HAS_ONE],
            'categories' => ['type' => self::HAS_MANY, 'field' => 'id_category', 'object' => 'Category', 'association' => 'category_product'],
            'stock_availables' => ['type' => self::HAS_MANY, 'field' => 'id_stock_available', 'object' => 'StockAvailable', 'association' => 'stock_availables'],
        ],
    ];
}
