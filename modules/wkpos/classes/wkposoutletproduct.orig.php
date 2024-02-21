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
class WkPosOutletProduct extends ObjectModel
{
    public $id_wkpos_outlet;
    public $id_product;
    public $quantity;
    public $active;
    public $id_shop;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_outlet_product',
        'primary' => 'id_wkpos_outlet_product',
        'multilang' => false,
        'fields' => [
            'id_wkpos_outlet' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isUnsignedInt',
                'size' => 10,
            ],
            'id_product' => [
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
            'active' => ['type' => self::TYPE_INT, 'required' => true, 'size' => 2],
            'id_shop' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    /**
     * get all prestashop active product not assigned to an oultet
     *
     * @param string $posOutletProduct
     *
     * @return array
     */
    public function getAllPsProduct($posOutletProduct = false)
    {
        $idLang = Context::getContext()->language->id;
        $sql = 'SELECT p.`id_product`, p.`cache_default_attribute`FROM `' . _DB_PREFIX_ . 'product` p
        ' . Shop::addSqlAssociation('product', 'p') . '
        LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` pl ON (pl.id_product = p.id_product AND pl.id_lang =
        ' . (int) $idLang . Shop::addSqlRestrictionOnLang('pl') . ') WHERE p.`active` = 1';
        if ($posOutletProduct) {
            $sql .= ' AND p.`id_product` NOT IN (' . pSQL($posOutletProduct) . ') GROUP BY p.`id_product`';
        }

        return Db::getInstance()->executeS($sql);
    }

    public function getAllPsProductWithInActive($posOutletProduct = false)
    {
        $idLang = Context::getContext()->language->id;
        $sql = 'SELECT p.`id_product`, p.`cache_default_attribute`FROM `' . _DB_PREFIX_ . 'product` p
        ' . Shop::addSqlAssociation('product', 'p') . '
        LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` pl ON (pl.id_product = p.id_product AND pl.id_lang =
        ' . (int) $idLang . Shop::addSqlRestrictionOnLang('pl') . ') WHERE 1 = 1';
        if ($posOutletProduct) {
            $sql .= ' AND p.`id_product` NOT IN (' . pSQL($posOutletProduct) . ') GROUP BY p.`id_product`';
        }

        return Db::getInstance()->executeS($sql);
    }

    /**
     * get selected ps product assigned to the cart
     *
     * @param string $posOutletProduct
     *
     * @return array
     */
    public function getSelectedPsProduct($posOutletProduct = false)
    {
        $sql = 'SELECT p.`id_product`, p.`cache_default_attribute`
            FROM `' . _DB_PREFIX_ . 'product` p';

        if ($posOutletProduct) {
            $sql .= ' WHERE p.`id_product` IN (' . pSQL($posOutletProduct) . ')';
        }

        return Db::getInstance()->executeS($sql);
    }

    /**
     * get All idProduct of an outlet
     *
     * @param [int] $idWkPosOutlet
     *
     * @return array
     */
    public function getAllOutletProduct($idWkPosOutlet)
    {
        return Db::getInstance()->executeS(
            'SELECT op.`id_product`
            FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product` op
            WHERE op.`id_wkpos_outlet` = ' . (int) $idWkPosOutlet
        );
    }

    public function getAllOutletProductForDelete($idWkPosOutlet)
    {
        return Db::getInstance()->executeS(
            'SELECT * FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product` op
            WHERE op.`id_wkpos_outlet` = ' . (int) $idWkPosOutlet
        );
    }

    /**
     * get states by id country
     *
     * @param [int] $idCountry
     *
     * @return array
     */
    public static function getStates($idCountry)
    {
        return Db::getInstance()->executeS(
            'SELECT s.id_state, s.name
            FROM ' . _DB_PREFIX_ . 'state s
            LEFT JOIN ' . _DB_PREFIX_ . 'country c ON (s.`id_country` = c.`id_country`)
            WHERE s.id_country = ' . (int) $idCountry . ' AND s.active = 1 AND c.`contains_states` = 1
            ORDER BY s.`name` ASC'
        );
    }

    /**
     * get sum of all quantity of a product assigned to an oultet
     *
     * @param [int] $idProduct
     *
     * @return void
     */
    public function getProductQuantityByIdProduct($idProduct)
    {
        $idShop = Context::getContext()->shop->id;

        return Db::getInstance()->getValue(
            'SELECT SUM(op.`quantity`) as qunatity
            FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product` op
            WHERE op.`id_product` = ' . (int) $idProduct . ' AND op.`id_shop` = ' . $idShop
        );
    }

    /**
     * get sum of all quantity of a product assigned to an outlet except the selected outlet
     *
     * @param [int] $idProduct
     * @param [int] $idWkPosOutlet
     *
     * @return array
     */
    public static function getProductQuantityExceptCurrentOutlet($idProduct, $idWkPosOutlet)
    {
        return Db::getInstance()->getValue(
            'SELECT SUM(op.`quantity`) as qunatity
            FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product` op
            WHERE op.`id_product` = ' . (int) $idProduct .
            ' AND op.`id_wkpos_outlet` NOT IN (' . pSQL($idWkPosOutlet) . ')'
        );
    }

    /**
     * get sum of product qunatity of a selected id product in a selected outlet
     *
     * @param [int] $idProduct
     * @param [int] $idWkPosOutlet
     *
     * @return array
     */
    public static function getProductQuantity($idProduct, $idWkPosOutlet)
    {
        return Db::getInstance()->getValue(
            'SELECT SUM(op.`quantity`) as qunatity
            FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product` op
            WHERE op.`id_product` = ' . (int) $idProduct .
            ' AND op.`id_wkpos_outlet` = ' . (int) $idWkPosOutlet
        );
    }

    /**
     * get outlet product id based on idProduct and outlet id
     *
     * @param [int] $idProduct
     * @param [int] $idWkPosOutlet
     *
     * @return array
     */
    public static function getOutletProductId($idProduct, $idWkPosOutlet)
    {
        return Db::getInstance()->getValue(
            'SELECT op.`id_wkpos_outlet_product`
            FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product` op
            WHERE op.`id_product` = ' . (int) $idProduct .
            ' AND op.`id_wkpos_outlet` = ' . (int) $idWkPosOutlet
        );
    }

    /**
     * Get the product Image url
     *
     * @param [string] $linkRewrite
     * @param [int] $idImage
     *
     * @return string
     */
    public static function getProductImage($linkRewrite, $idImage)
    {
        $context = Context::getContext();
        $imageUrl = '';
        if ($idImage) {
            $imageUrl = str_replace(
                'http://',
                Tools::getShopProtocol(),
                $context->link->getImageLink(
                    $linkRewrite,
                    $idImage,
                    // ImageType::getFormatedName('home') // in PS7
                    ImageType::getByNameNType('home') // in PS8
                )
            );
        }
        if (empty($imageUrl)) {
            $attrImage = new Image($idImage);
            $imageTemp = _PS_PROD_IMG_DIR_ . $attrImage->getExistingImgPath() . '-' .
            ImageType::getFormattedName('home') . '.jpg';
            if (empty($idImage) || !file_exists($imageTemp)) {
                $imageUrl = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ .
                '/img/p/' . $context->language->iso_code . '.jpg';
            }
        }

        return $imageUrl;
    }

    /**
     * Get product completed details of a selected outlet
     *
     * @param [Context] $context
     * @param int $idWkPosOutlet
     * @param int $idProduct
     *
     * @return array
     */
    public static function getProductDetails($context, $idWkPosOutlet = false, $idProduct = false, $idAddress = null)
    {
        $objOutletProduct = new WkPosOutletProduct();
        $items = $objOutletProduct->getProductBasicDetails($context, $idWkPosOutlet, $idProduct);
        if ($items) {
            // packs
            $idLang = $context->language->id;
            $results = [];
            foreach ($items as $item) {
                $objPosValues = new WkPosCustomPosValues();
                $allValues = $objPosValues->getPosCustomValuesByIdProduct($item['id_product']);
                if ($allValues) {
                    $availableForPos = $allValues['pos_sale_allow'];
                    if ($availableForPos == 0) {
                        continue;
                    }
                }
                $taxRate = [];
                $productNameLength = Configuration::get('WKPOS_PRODUCT_NAME_LENGTH');
                $displayProductName = Tools::strlen($item['name']) > $productNameLength ?
                    Tools::substr($item['name'], 0, $productNameLength) . '...' :
                    $item['name'];

                $coverImage = Product::getCover($item['id_product']);
                if (isset($item['link_rewrite'], $coverImage['id_image'])) {
                    $imageUrl = WkPosOutletProduct::getProductImage($item['link_rewrite'], $coverImage['id_image']);
                } else {
                    if (isset($item['name'], $coverImage['id_image'])) {
                        $imageUrl = WkPosOutletProduct::getProductImage($item['name'], $coverImage['id_image']);
                    } else {
                        $imageUrl = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ .
                        '/img/p/' . $context->language->iso_code . '.jpg';
                    }
                }
                $idProduct = $item['id_product'];
                $objProduct = new Product($idProduct);
                $productPrice = WkPosOutletProduct::getProductPrice($idProduct, $idAddress);
                $productPriceWithoutReduction = WkPosOutletProduct::getProductPriceWithoutReduction($idProduct, $idAddress);
                $results[$idProduct]['id'] = (int) $idProduct;
                $results[$idProduct]['image'] = $imageUrl;
                $results[$idProduct]['name'] = str_replace('|', ' ', $item['name']);
                $results[$idProduct]['minimal_quantity'] = $item['minimal_quantity'];
                $results[$idProduct]['display_name'] = str_replace('|', ' ', $displayProductName);
                $results[$idProduct]['ref'] = (
                    !empty($item['reference']) ? $item['reference'] : ''
                );
                $results[$idProduct]['upc'] = (
                    !empty($item['upc'] || $item['upc'] == 0) ? $item['upc'] : ''
                );
                $results[$idProduct]['ean13'] = (
                    !empty($item['ean13']) || $item['ean13'] == 0 ? $item['ean13'] : ''
                );
                $results[$idProduct]['isbn'] = (
                    !empty($item['isbn']) || $item['isbn'] == 0 ? $item['isbn'] : ''
                );
                $results[$idProduct]['id_category_default'] = (
                    !empty($item['id_category_default']) ? $item['id_category_default'] : ''
                );
                $results[$idProduct]['id_supplier'] = (
                    !empty($item['id_supplier']) ? $item['id_supplier'] : ''
                );
                $results[$idProduct]['id_shop'] = $item['id_shop'];
                $results[$idProduct]['has_combination'] = false;
                $results[$idProduct]['price'] = $productPrice;
                $results[$idProduct]['displayPrice'] = Tools::displayPrice($productPrice);
                $results[$idProduct]['displayPriceWithoutReduction'] = Tools::displayPrice($productPriceWithoutReduction);
                $results[$idProduct]['taxExcludedPrice'] = $productPrice;
                $results[$idProduct]['availableForOrder'] = $item['available_for_order'];
                $results[$idProduct]['taxRate'] = $taxRate;
                $results[$idProduct]['outOfStock'] = $item['out_of_stock'];
                $results[$idProduct]['stock_location'] = $item['location'];
                $results[$idProduct]['tags'] = $objProduct->getTags($idLang);
                $results[$idProduct]['quantity'] = WkPosOutletProduct::getProductQuantity(
                    $idProduct,
                    $idWkPosOutlet
                );
                // check if product have combination
                if (Combination::isFeatureActive() && $item['cache_default_attribute']) {
                    $combinations = $objOutletProduct->getProductCombination($item, $context);
                    if ($combinations) {
                        $productCombination = [];
                        $defaultCombination = [];
                        $previousIdProductAttribute = 0;
                        $ean13 = '';
                        $isbn = '';
                        $reference = '';
                        $upc = '';
                        $idProductAttributeIndex = '';
                        $productCombinationDetails = [];
                        $minimalQuantity = '';
                        $stockLocation = '';
                        foreach ($combinations as $combination) {
                            $results[$idProduct]['has_combination'] = true;
                            if ($previousIdProductAttribute == 0) {
                                $idProductAttributeIndex = $combination['id_attribute'];
                                $ean13 = $combination['ean13'];
                                $isbn = $combination['isbn'];
                                $reference = $combination['reference'];
                                $upc = $combination['upc'];
                                $minimalQuantity = $combination['minimal_quantity'];
                                $stockLocation = $combination['location'];
                            } elseif ($previousIdProductAttribute == $combination['id_product_attribute']) {
                                $idProductAttributeIndex .= '-' . $combination['id_attribute'];
                            } else {
                                $productAttributeDetails = [
                                    'id_product_attribute' => $previousIdProductAttribute,
                                    'quantity' => WkPosOutletProductAttribute::getProductQuantity(
                                        $idProduct,
                                        $idWkPosOutlet,
                                        $previousIdProductAttribute
                                    ),
                                    'minimal_quantity' => $minimalQuantity,
                                    'ean13' => $ean13,
                                    'isbn' => $isbn,
                                    'reference' => $reference,
                                    'upc' => $upc,
                                    'price' => WkPosOutletProduct::getProductPrice(
                                        $idProduct,
                                        $idAddress,
                                        true,
                                        $previousIdProductAttribute
                                    ),
                                    'taxExcludedPrice' => WkPosOutletProduct::getProductPrice(
                                        $idProduct,
                                        $idAddress,
                                        false,
                                        $previousIdProductAttribute
                                    ),
                                    'priceWithoutReduction' => Tools::displayPrice(WkPosOutletProduct::getProductPriceWithoutReduction(
                                        $idProduct,
                                        $idAddress,
                                        true,
                                        $previousIdProductAttribute
                                    )),
                                    'stock_location' => $stockLocation,
                                ];
                                $idProductAttributeArray = explode('-', $idProductAttributeIndex);
                                asort($idProductAttributeArray);
                                $idProductAttributeArray = array_filter($idProductAttributeArray);
                                $idProductAttributeIndex = implode('-', $idProductAttributeArray);
                                $productCombinationDetails[$idProductAttributeIndex] = $productAttributeDetails;
                                $idProductAttributeIndex = $combination['id_attribute'];
                            }
                            $previousIdProductAttribute = $combination['id_product_attribute'];
                            $ean13 = $combination['ean13'];
                            $reference = $combination['reference'];
                            $upc = $combination['upc'];
                            $isbn = $combination['isbn'];
                            $minimalQuantity = $combination['minimal_quantity'];
                            $stockLocation = $combination['location'];
                            $idGroup = $combination['id_attribute_group'];
                            $groupName = $combination['group_name'];
                            $idAttr = $combination['id_attribute'];
                            if ($idGroup) {
                                $productCombination[$idGroup][$groupName][$idAttr] = $combination['attribute_name'];
                            }

                            if ($combination['default_on']) {
                                $defaultCombination[$combination['id_attribute']] = $combination['attribute_name'];
                            }
                        }
                        $productAttributeDetails = [
                            'id_product_attribute' => $previousIdProductAttribute,
                            'quantity' => WkPosOutletProductAttribute::getProductQuantity(
                                $idProduct,
                                $idWkPosOutlet,
                                $previousIdProductAttribute
                            ),
                            'minimal_quantity' => $minimalQuantity,
                            'ean13' => $ean13,
                            'reference' => $reference,
                            'isbn' => $isbn,
                            'upc' => $upc,
                            'price' => WkPosOutletProduct::getProductPrice(
                                $idProduct,
                                $idAddress,
                                true,
                                $previousIdProductAttribute
                            ),
                            'taxExcludedPrice' => WkPosOutletProduct::getProductPrice(
                                $idProduct,
                                $idAddress,
                                false,
                                $previousIdProductAttribute
                            ),
                            'priceWithoutReduction' => Tools::displayPrice(WkPosOutletProduct::getProductPriceWithoutReduction(
                                $idProduct,
                                $idAddress,
                                true,
                                $previousIdProductAttribute
                            )),
                            'stock_location' => $stockLocation,
                        ];
                        $idProductAttributeArray = explode('-', $idProductAttributeIndex);
                        asort($idProductAttributeArray);
                        $idProductAttributeArray = array_filter($idProductAttributeArray);
                        $idProductAttributeIndex = implode('-', $idProductAttributeArray);
                        $productCombinationDetails[$idProductAttributeIndex] = $productAttributeDetails;
                        $results[$idProduct]['combination_details'] = $productCombinationDetails;
                        $results[$idProduct]['combination'] = $productCombination;
                        $results[$idProduct]['default_combination'] = $defaultCombination;
                        $results[$idProduct]['combination_images'] = self::getCombinationImages($idProduct, $idLang);
                    }
                    if ($results[$idProduct]['stock_location'] == '' && !empty($results[$idProduct]['default_combination'])) {
                        $defaultCombinationIndex = '';
                        $i = 0;
                        ksort($results[$idProduct]['default_combination'], SORT_NUMERIC);
                        foreach ($results[$idProduct]['default_combination'] as $key => $val) {
                            if ($i == 0) {
                                $defaultCombinationIndex = $key;
                            } else {
                                if ($defaultCombinationIndex < $key) {
                                    $defaultCombinationIndex = $defaultCombinationIndex . '-' . $key;
                                } else {
                                    $defaultCombinationIndex = $key . '-' . $defaultCombinationIndex;
                                }
                            }
                            ++$i;
                        }
                        if (isset($results[$idProduct]['combination_details'][$defaultCombinationIndex])) {
                            $results[$idProduct]['stock_location'] = $results[$idProduct]['combination_details'][$defaultCombinationIndex]['stock_location'];
                        }
                    }
                }
                $quantity_discounts = self::getDiscountsByProductId($idProduct);
                foreach ($quantity_discounts as &$quantity_discount) {
                    if ($quantity_discount['id_product_attribute']) {
                        $combination = new Combination((int) $quantity_discount['id_product_attribute']);
                        $attributes = $combination->getAttributesName((int) $context->language->id);
                        foreach ($attributes as $attribute) {
                            $quantity_discount['attributes'] = $attribute['name'] . ' - ';
                        }
                        $quantity_discount['attributes'] = rtrim($quantity_discount['attributes'], ' - ');
                    }
                    if ((int) $quantity_discount['id_currency'] == 0
                    && $quantity_discount['reduction_type'] == 'amount') {
                        $quantity_discount['reduction'] = Tools::convertPriceFull(
                            $quantity_discount['reduction'],
                            null,
                            $context->currency
                        );
                        if ($quantity_discount['price'] > 0) {
                            $quantity_discount['price'] = Tools::convertPriceFull(
                                $quantity_discount['price'],
                                null,
                                $context->currency
                            );
                        }
                    }
                }
                $results[$idProduct]['specificPrices'] = $quantity_discounts;
            }

            return $results;
        } else {
            return [];
        }
    }

    public static function getDiscountsByProductId($id_product)
    {
        $first_date = date('Y-m-d 00:00:00');
        $last_date = date('Y-m-d 23:59:59');
        $now = date('Y-m-d H:i:00');
        $beginning = $now;
        $ending = $now;
        $key = 'WkPosOutletProduct_getDiscountsByProductId-' . $first_date . '-' . $last_date;
        if (!Cache::isStored($key)) {
            $query_from_count = 'SELECT 1 FROM `' . _DB_PREFIX_ . 'specific_price` WHERE `from` BETWEEN \'' .
            $first_date . '\' AND \'' . $last_date . '\'';
            $from_specific_count = Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($query_from_count);
            $query_to_count = 'SELECT 1 FROM `' . _DB_PREFIX_ . 'specific_price` WHERE `to` BETWEEN \'' . $first_date .
            '\' AND \'' . $last_date . '\'';
            $to_specific_count = Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($query_to_count);
            Cache::store($key, [$from_specific_count, $to_specific_count]);
        } else {
            list($from_specific_count, $to_specific_count) = Cache::retrieve($key);
        }
        if (!$from_specific_count && !$to_specific_count) {
            $ending = $beginning = $first_date;
        }
        $db = Db::getInstance();
        $beginning = $db->escape($beginning);
        $ending = $db->escape($ending);
        $sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'specific_price`
        WHERE `id_product` = ' . (int) $id_product .
        ' AND (`from` = \'0000-00-00 00:00:00\' OR \'' . $beginning . '\' >= `from`)' .
        ' AND (`to` = \'0000-00-00 00:00:00\' OR \'' . $ending . '\' <= `to`)
        ORDER BY `from_quantity` DESC';

        return $db->executeS($sql);
    }

    public static function getCombinationImages($idProduct, $idLang)
    {
        $objProduct = new Product($idProduct, false, $idLang);
        $attrImages = $objProduct->getCombinationImages($idLang);
        if ($attrImages) {
            $combinationImages = [];
            foreach ($attrImages as $idProductAttribute => $images) {
                foreach ($images as $image) {
                    if ($image['legend']) {
                        $combinationImages[$idProductAttribute][] = self::getProductImage(
                            $image['legend'],
                            $image['id_image']
                        );
                    } else {
                        $combinationImages[$idProductAttribute][] = self::getProductImage(
                            $objProduct->link_rewrite,
                            $image['id_image']
                        );
                    }
                }
            }

            return $combinationImages;
        }

        return false;
    }

    /**
     * Get Product Price according to the outlet address
     *
     * @param [int] $idProduct
     * @param [int] $idAddress
     * @param bool $tax
     * @param [int] $idProductAttribute
     *
     * @return float
     */
    public static function getProductPriceWithoutReduction($idProduct, $idAddress, $tax = true, $idProductAttribute = null)
    {
        $specificPrice = null;

        return Product::getPriceStatic(
            $idProduct,
            $tax,
            $idProductAttribute,
            6,
            null,
            false,
            false,
            1,
            false,
            null,
            null,
            (int) $idAddress,
            $specificPrice,
            true,
            true,
            null,
            false
        );
    }

    /**
     * Get Product Price according to the outlet address
     *
     * @param [int] $idProduct
     * @param [int] $idAddress
     * @param bool $tax
     * @param [int] $idProductAttribute
     *
     * @return float
     */
    public static function getProductPrice($idProduct, $idAddress, $tax = true, $idProductAttribute = null)
    {
        $specificPrice = null;

        return Product::getPriceStatic(
            $idProduct,
            $tax,
            $idProductAttribute,
            6,
            null,
            false,
            true,
            1,
            false,
            null,
            null,
            (int) $idAddress,
            $specificPrice,
            true,
            true,
            null,
            false
        );
    }

    /**
     * Get product simple details
     *
     * @param [context] $context
     * @param [int] $idWkPosOutlet
     * @param [int] $idProduct
     *
     * @return array
     */
    public function getProductBasicDetails($context, $idWkPosOutlet, $idProduct)
    {
        $limit = trim(Tools::getValue('limit'));
        if ($limit) {
            $page = trim(Tools::getValue('page'));
            $page = (int) $page;
            $startLimit = $page * $limit;
        }
        $sql = 'SELECT p.`id_product`, pl.`link_rewrite`, p.`reference`, pl.`name`, p.`location`,
            p.`cache_default_attribute`, pl.`id_shop`, p.`minimal_quantity`,
            p.`price`, p.`upc`, p.`isbn`, p.`ean13`, p.`id_supplier`, p.`available_for_order`,
            p.`id_category_default`, op.`id_wkpos_outlet_product`, op.`id_wkpos_outlet`, sa.`out_of_stock`
            FROM `' . _DB_PREFIX_ . 'product` p
            ' . Shop::addSqlAssociation('product', 'p') . '
            LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` pl ON (pl.id_product = p.id_product AND pl.id_lang =
            ' . (int) $context->language->id . Shop::addSqlRestrictionOnLang('pl') . ')
            LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product` op ON (p.`id_product` = op.`id_product`)
            LEFT JOIN `' . _DB_PREFIX_ . 'stock_available` sa ON (sa.`id_product` = p.`id_product`)
            WHERE p.`active` = 1 AND op.`id_wkpos_outlet` = ' . (int) $idWkPosOutlet . ' AND op.`active` = 1';

        if ($idProduct) {
            $sql .= ' AND p.`id_product` = ' . (int) $idProduct;
        }

        $sql .= ' GROUP BY p.`id_product`';
        if ($limit) {
            $sql .= ' LIMIT ' . (int) $startLimit . ',' . (int) $limit;
        }

        return Db::getInstance()->executeS($sql);
    }

    /**
     * get product combination details of a selected product
     *
     * @param [array] $item
     * @param [Context] $context
     *
     * @return array
     */
    public function getProductCombination($item, $context)
    {
        $sql = 'SELECT pa.`id_product_attribute`, pa.`id_product`, pa.`price`,pa.`reference`, pa.`minimal_quantity`,
        pa.`ean13`, pa.`isbn`, pa.`upc`, ag.`id_attribute_group`, pai.`id_image`, agl.`name` AS group_name,
        al.`name` AS attribute_name, pa.`default_on`, a.`id_attribute`';
        if (version_compare(_PS_VERSION_, '8.0.0', '>=')) {
            $sql .= ', sa.`location`';
        } else {
            $sql .= ', pa.`location`';
        }
        $sql .= 'FROM `' . _DB_PREFIX_ . 'product_attribute` pa
        ' . Shop::addSqlAssociation('product_attribute', 'pa') . '
        LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute_combination` pac ON
        pac.`id_product_attribute` = pa.`id_product_attribute`
        LEFT JOIN `' . _DB_PREFIX_ . 'attribute` a ON a.`id_attribute` = pac.`id_attribute`
        LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group` ag
        ON ag.`id_attribute_group` = a.`id_attribute_group`
        LEFT JOIN `' . _DB_PREFIX_ . 'attribute_lang` al ON (a.`id_attribute` = al.`id_attribute`
            AND al.`id_lang` = ' . (int) $context->language->id . ')
        LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group_lang` agl
        ON (ag.`id_attribute_group` = agl.`id_attribute_group`
        AND agl.`id_lang` = ' . (int) $context->language->id . ')
        LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute_image` pai
        ON pai.`id_product_attribute` = pa.`id_product_attribute`
        LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` opa
            ON (pa.`id_product_attribute` = opa.`id_product_attribute`)';
        if (version_compare(_PS_VERSION_, '8.0.0', '>=')) {
            $sql .= ' LEFT JOIN `' . _DB_PREFIX_ . 'stock_available` sa
            ON (pa.`id_product_attribute` = sa.`id_product_attribute` AND pa.`id_product` = sa.`id_product`)';
        }
        $sql .= ' WHERE pa.`id_product` = ' . (int) $item['id_product'] .
        ' AND opa.`id_wkpos_outlet_product` = ' . (int) $item['id_wkpos_outlet_product'] .
        ' GROUP BY pa.`id_product_attribute`, ag.`id_attribute_group`
        ORDER BY pa.`id_product_attribute`';

        return Db::getInstance()->executeS($sql);
    }

    /**
     * get Tax rate of a selected outlet or selected id address
     *
     * @param int $idWkPosOutlet
     * @param int $idDeliveryAddress
     *
     * @return array
     */
    public static function getTaxRate($idWkPosOutlet = false, $idDeliveryAddress = false)
    {
        $products = Db::getInstance()->executeS(
            'SELECT p.`id_product`
		    FROM `' . _DB_PREFIX_ . 'product` p
		    ' . Shop::addSqlAssociation('product', 'p') . '
            LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product` op
            ON (p.`id_product` = op.`id_product`)
            WHERE p.`active` = 1
            AND op.`id_wkpos_outlet` = ' . (int) $idWkPosOutlet .
            ' AND op.`active` = 1'
        );

        $taxRate = [];
        if ($products) {
            $objAddress = new Address($idDeliveryAddress);
            foreach ($products as $product) {
                $objProduct = new Product($product['id_product']);
                $taxRate[$product['id_product']] = $objProduct->getTaxesRate($objAddress);
            }

            return $taxRate;
        }
    }

    /**
     * get tax group id
     *
     * @param [int] $idTax
     *
     * @return array
     */
    public static function getTaxGroupId($idTax)
    {
        return Db::getInstance()->getRow(
            'SELECT * FROM `' . _DB_PREFIX_ . 'tax_rule`
            WHERE `id_tax_rules_group` = ' . (int) $idTax
        );
    }

    /**
     * get categories details
     *
     * @param [int] $rootCategory
     * @param int $idLang
     * @param int $active
     * @param [array] $groups
     *
     * @return array
     */
    public function getCategories($rootCategory = null, $idLang = false, $active = true, $groups = null)
    {
        if (isset($rootCategory) && !Validate::isInt($rootCategory)) {
            exit('1');
        }

        if (!Validate::isBool($active)) {
            exit('1');
        }

        if (isset($groups) && Group::isFeatureActive() && !is_array($groups)) {
            $groups = (array) $groups;
        }

        $result = Db::getInstance()->executeS(
            'SELECT c.`id_category`, c.`id_parent`, cl.`name`
            FROM `' . _DB_PREFIX_ . 'category` c
            LEFT JOIN `' . _DB_PREFIX_ . 'category_lang` cl ON c.`id_category` = cl.`id_category`
            ' . Shop::addSqlRestrictionOnLang('cl') . '
            ' . (isset($groups) && Group::isFeatureActive() ? 'LEFT JOIN `' . _DB_PREFIX_ . 'category_group` cg
            ON c.`id_category` = cg.`id_category`' : '') . '
            ' . (isset($rootCategory) ? 'RIGHT JOIN `' . _DB_PREFIX_ . 'category` c2
            ON c2.`id_category` = ' . (int) $rootCategory . ' AND c.`nleft` >= c2.`nleft`
             AND c.`nright` <= c2.`nright`' : '') . '
            WHERE 1 ' . ($idLang ? 'AND `id_lang` = ' . (int) $idLang : '') . '
            ' . ($active ? ' AND c.`active` = 1' : '') . '
            ' . (isset($groups) && Group::isFeatureActive() ?
            ' AND cg.`id_group` IN (' . pSQl(implode(',', $groups)) . ')' : '') . '
            ' . (!$idLang || (isset($groups) && Group::isFeatureActive()) ? ' GROUP BY c.`id_category`' : '')
        );
        $categories = [];
        $buff = [];

        if (!isset($rootCategory)) {
            $rootCategory = Category::getRootCategory()->id;
        }

        foreach ($result as $row) {
            $current = &$buff[$row['id_category']];
            $current = $row;

            if ($row['id_category'] == $rootCategory) {
                $categories = &$current;
            } else {
                $buff[$row['id_parent']]['children'][] = &$current;
            }
        }
        if (empty($categories)) {
            return null;
        }

        return $categories;
    }

    /**
     * get outlet product according to categories
     *
     * @param [int] $idWkPosOutlet
     *
     * @return array
     */
    public function getProductsWs($idWkPosOutlet)
    {
        $idCategories = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(
            'SELECT c.`id_category`
            FROM `' . _DB_PREFIX_ . 'category` c' .
            ' ORDER BY `id_category` DESC'
        );
        $result = [];
        foreach ($idCategories as $idCategory) {
            $products = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(
                'SELECT cp.`id_product` as id
                FROM `' . _DB_PREFIX_ . 'category_product` cp
                LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product` op ON (op.`id_product` = cp.`id_product`)
                LEFT JOIN `' . _DB_PREFIX_ . 'product` p ON (p.`id_product` = cp.`id_product`)
                WHERE cp.`id_category` = ' . (int) $idCategory['id_category'] . '
                AND op.`id_wkpos_outlet` = ' . (int) $idWkPosOutlet .
                ' AND op.`active` = 1' .
                ' AND p.`active` = 1' .
                ' ORDER BY `position` ASC'
            );
            $category = [];
            foreach ($products as $product) {
                $category[] = $product['id'];
            }
            $result[$idCategory['id_category']] = $category;
        }
        $context = Context::getContext();
        foreach ($idCategories as $idCategory) {
            $childCategories = Category::getChildren($idCategory['id_category'], $context->language->id);
            if ($childCategories) {
                foreach ($childCategories as $children) {
                    $result[$idCategory['id_category']] = array_unique(
                        array_merge(
                            $result[$idCategory['id_category']],
                            $result[$children['id_category']]
                        )
                    );
                }
            }
        }

        return $result;
    }

    public static function getCartProduct($idCart)
    {
        return Db::getInstance()->executeS(
            'SELECT * FROM `' . _DB_PREFIX_ . 'cart_product` WHERE `id_cart` = ' . (int) $idCart
        );
    }

    /**
     * Delete the cart product of a selected idCart
     *
     * @param [int] $idCart
     *
     * @return void
     */
    public static function deleteCartProduct($idCart)
    {
        $cartProduct = self::getCartProduct($idCart);
        $cart = new Cart($idCart);
        if ($cartProduct) {
            foreach ($cartProduct as $productDetails) {
                $cart->deleteProduct(
                    $productDetails['id_product'],
                    $productDetails['id_product_attribute'],
                    $productDetails['id_customization'],
                    $productDetails['id_address_delivery']
                );
            }

            return true;
        }
    }

    public static function updatePosProductQty($idWkPosOutlets, $product)
    {
        if ($idWkPosOutlets) {
            $idWkPosOutlets = WkPosOutletProduct::checkProductExist(
                $product['id_product'],
                abs($product['delta_qty']),
                $product['id_product_attribute'],
                $idWkPosOutlets
            );
        }
        $remainingQuantity = abs($product['delta_qty']);
        if ($idWkPosOutlets) {
            $idWkPosOutlets = array_unique(array_column($idWkPosOutlets, 'id_wkpos_outlet'));
            $remainingQuantity = self::decreaseOutletQuantity(
                $idWkPosOutlets,
                $product,
                $remainingQuantity
            );
        }
        if ($remainingQuantity > 0) {
            $idWkPosOutlets = WkPosOutlets::getOutletExcept($idWkPosOutlets);
            $idWkPosOutlets = array_unique(array_column($idWkPosOutlets, 'id_wkpos_outlet'));
            $remainingQuantity = self::decreaseOutletQuantity(
                $idWkPosOutlets,
                $product,
                $remainingQuantity
            );
        }
    }

    /**
     * Update the product qunatity of the outlet store after order
     *
     * @param [array] $products
     * @param int $idOutletEmployee
     *
     * @return void
     */
    public static function updateOutletProductQuantity($products, $idOutletEmployee = false)
    {
        if (!$idOutletEmployee) {
            $idWkPosOutlets = [Configuration::get('WKPOS_DEFAULT_OUTLET')];
            if (Configuration::get('WKPOS_DEFAULT_OUTLET')) {
                $idPsWkPosOutlet = [Configuration::get('WKPOS_DEFAULT_OUTLET')];
            } else {
                $idPsWkPosOutlet = [];
            }
        } else {
            $objOutletEmployee = new WkPosOutletEmployee($idOutletEmployee);
            $idWkPosOutlets = [];
            $idWkPosOutlets[] = ['id_wkpos_outlet' => $objOutletEmployee->id_wkpos_outlet];
            $idPsWkPosOutlet = [$objOutletEmployee->id_wkpos_outlet];
        }

        foreach ($products as $product) {
            self::updatePosProductQty($idPsWkPosOutlet, $product);
        }
    }

    public static function checkProductExist(
        $idProduct,
        $quantity = false,
        $idProductAttribute = false,
        $idWkPosOutlets = false
    ) {
        $sql = 'SELECT op.`id_wkpos_outlet` FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product` op';

        if ($idProductAttribute) {
            $sql .= ' LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` opa' .
                ' ON (op.`id_wkpos_outlet_product` = opa.`id_wkpos_outlet_product`)';
        }
        $sql .= ' WHERE op.`id_product` = ' . (int) $idProduct;
        if ($quantity) {
            if ($idProductAttribute) {
                $sql .= ' AND opa.`quantity` >= ' . (int) $quantity;
            } else {
                $sql .= ' AND op.`quantity` >= ' . (int) $quantity;
            }
        }
        if (is_array($idWkPosOutlets)) {
            $idWkPosOutlets = implode(',', $idWkPosOutlets);
        }
        if ($idWkPosOutlets) {
            $sql .= ' AND op.`id_wkpos_outlet` IN (' . pSQL($idWkPosOutlets) . ')';
        }
        $sql .= ' ORDER BY op.`quantity` DESC';

        return Db::getInstance()->executeS($sql);
    }

    public static function getRandomOutlet($idProduct, $quantity = false, $idProductAttribute = false)
    {
        $sql = 'SELECT op.`id_wkpos_outlet` FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product` op';

        if ($idProductAttribute) {
            $sql .= ' LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` opa' .
                ' ON (op.`id_wkpos_outlet_product` = opa.`id_wkpos_outlet_product`)';
        }
        $sql .= ' WHERE op.`id_product` = ' . (int) $idProduct;
        if ($quantity) {
            if ($idProductAttribute) {
                $sql .= ' AND opa.`quantity` >= ' . (int) $quantity;
                $sql .= ' OR (SELECT SUM(quantity) from `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` where '
                . 'id_product_attribute=' . (int) $idProductAttribute . ') >= ' . (int) $quantity;
            } else {
                $sql .= ' AND (op.`quantity` >= ' . (int) $quantity;
                $sql .= ' OR (SELECT SUM(quantity) from `' . _DB_PREFIX_ . 'wkpos_outlet_product` where '
                . 'id_product=' . (int) $idProduct . ') >= ' . (int) $quantity . ')';
            }
        }

        return Db::getInstance()->executeS($sql);
    }

    public static function decreaseOutletQuantity($idWkPosOutlets, $product, $qty)
    {
        $remainingQuantity = $qty;
        if ($idWkPosOutlets) {
            foreach ($idWkPosOutlets as $idWkPosOutlet) {
                if ($remainingQuantity > 0) {
                    $idOutletProduct = WkPosOutletProduct::getOutletProductId(
                        $product['id_product'],
                        $idWkPosOutlet
                    );
                    $objPosOutletProduct = new WkPosOutletProduct($idOutletProduct);

                    if (Validate::isLoadedObject($objPosOutletProduct)) {
                        if (isset($product['id_product_attribute']) && $product['id_product_attribute']) {
                            $idOutletProductAttribute = WkPosOutletProductAttribute::getProductCombinationDetail(
                                $product['id_product_attribute'],
                                $idWkPosOutlet,
                                $idOutletProduct,
                                2
                            );
                            if ($idOutletProductAttribute) {
                                $objPosOutletProductAttribute = new WkPosOutletProductAttribute(
                                    $idOutletProductAttribute
                                );
                                if (Validate::isLoadedObject($objPosOutletProductAttribute)) {
                                    if ($remainingQuantity > $objPosOutletProductAttribute->quantity) {
                                        $remainingQuantity -= $objPosOutletProductAttribute->quantity;
                                        $objPosOutletProductAttribute->quantity = 0;
                                    } else {
                                        $objPosOutletProductAttribute->quantity -= $remainingQuantity;
                                        $remainingQuantity = 0;
                                    }
                                    $objPosOutletProductAttribute->save();
                                    $qty = WkPosOutletProductAttribute::getProductQuantity(
                                        $product['id_product'],
                                        $idWkPosOutlet
                                    );
                                    $objPosOutletProduct->quantity = $qty;
                                    $objPosOutletProduct->save();
                                }
                            }
                        } else {
                            if ($remainingQuantity > $objPosOutletProduct->quantity) {
                                $remainingQuantity = $remainingQuantity - $objPosOutletProduct->quantity;
                                $objPosOutletProduct->quantity = 0;
                            } else {
                                $objPosOutletProduct->quantity -= $remainingQuantity;
                                $remainingQuantity = 0;
                            }
                            $objPosOutletProduct->save();
                        }
                    }
                } else {
                    break;
                }
            }
        }

        return $remainingQuantity;
    }

    public static function increaseOutletQuantity($idWkPosOutlets, $product)
    {
        if ($idWkPosOutlets && Tools::getValue('action') != 'addCustomProduct') {
            $idWkPosOutlets = array_unique(array_column($idWkPosOutlets, 'id_wkpos_outlet'));
            foreach ($idWkPosOutlets as $idWkPosOutlet) {
                $idOutletProduct = WkPosOutletProduct::getOutletProductId(
                    $product['id_product'],
                    $idWkPosOutlet
                );
                $objPosOutletProduct = new WkPosOutletProduct($idOutletProduct);
                if (Validate::isLoadedObject($objPosOutletProduct)) {
                    if (isset($product['id_product_attribute']) && $product['id_product_attribute']) {
                        $idOutletProductAttribute = WkPosOutletProductAttribute::getProductCombinationDetail(
                            $product['id_product_attribute'],
                            $idWkPosOutlet,
                            $idOutletProduct,
                            2
                        );
                        if ($idOutletProductAttribute) {
                            $combinationQuantity = WkPosOutletProductAttribute::getProductCombinationDetail(
                                $product['id_product_attribute'],
                                $idWkPosOutlet,
                                $idOutletProduct,
                                1,
                                $product['id_product']
                            );
                            $objPosOutletProductAttribute = new WkPosOutletProductAttribute(
                                $idOutletProductAttribute
                            );
                            if (Validate::isLoadedObject($objPosOutletProductAttribute)) {
                                $diff = (int) $product['quantity'] - (int) $combinationQuantity;
                                $objPosOutletProductAttribute->quantity = $diff;
                                if ($product['quantity'] < 0) {
                                    $objPosOutletProductAttribute->quantity = 0;
                                    WkPosOutletProduct::updateAttributeQty($product['id_product_attribute']);
                                }
                                $objPosOutletProductAttribute->save();
                                $qty = WkPosOutletProductAttribute::getProductQuantity(
                                    $product['id_product'],
                                    $idWkPosOutlet
                                );
                                $objPosOutletProduct->quantity = $qty;
                                $objPosOutletProduct->save();
                            }
                        }
                    } else {
                        $quantity = WkPosOutletProduct::getProductQuantityExceptCurrentOutlet(
                            $product['id_product'],
                            $idWkPosOutlet
                        );
                        $objPosOutletProduct->quantity = (int) $product['quantity'] - (int) $quantity;
                        if ($product['quantity'] < 0) {
                            $objPosOutletProduct->quantity = 0;

                            WkPosOutletProduct::updateAllOutletQuantity($product['id_product']);
                        }
                        $objPosOutletProduct->save();
                    }
                }
            }
        }
    }

    public static function wkOutletUpdateQty($product)
    {
        if (isset($product['delta_qty']) && $product['delta_qty'] != 0) {
            $idWkPosOutlets = null;
            if (Configuration::get('WKPOS_DEFAULT_OUTLET')) {
                $idWkPosOutlets = Configuration::get('WKPOS_DEFAULT_OUTLET');
            }
            $objProduct = new Product($product['id_product']);
            $update = true;
            if ($objProduct->hasCombinations() && $product['id_product_attribute'] == 0) {
                $update = false;
            }
            if ($update) {
                $product['delta_qty'] = (int) $product['delta_qty'];
                if (isset($product['id_product']) && $product['id_product']) {
                    if ($product['delta_qty'] < 0) {
                        self::updatePosProductQty($idWkPosOutlets, $product);
                    } else {
                        if ($idWkPosOutlets) {
                            $idWkPosOutlets = WkPosOutletProduct::checkProductExist(
                                $product['id_product'],
                                false,
                                $product['id_product_attribute'],
                                $idWkPosOutlets
                            );
                        }
                        if (empty($idWkPosOutlets)) {
                            $idWkPosOutlets = WkPosOutletProduct::getRandomOutlet(
                                $product['id_product'],
                                false,
                                $product['id_product_attribute']
                            );
                        }
                        self::increaseOutletQuantity($idWkPosOutlets, $product);
                    }
                }
            }
        }
    }

    public static function updateOutletProduct($product, $idOutlet)
    {
        $product['delta_qty'] = (int) $product['delta_qty'];
        if (isset($product['id_product']) && $product['id_product']) {
            if ($idOutlet) {
                $idOutletProduct = WkPosOutletProduct::getOutletProductId(
                    $product['id_product'],
                    $idOutlet
                );
                if ($idOutletProduct) {
                    $objPosOutletProduct = new WkPosOutletProduct($idOutletProduct);
                    if (Validate::isLoadedObject($objPosOutletProduct)) {
                        if (isset($product['id_product_attribute']) && $product['id_product_attribute']) {
                            $idOutletProductAttribute = WkPosOutletProductAttribute::getProductCombinationDetail(
                                $product['id_product_attribute'],
                                $idOutlet,
                                $idOutletProduct,
                                2
                            );
                            if ($idOutletProductAttribute) {
                                $objPosOutletProductAttribute = new WkPosOutletProductAttribute(
                                    $idOutletProductAttribute
                                );
                                if (Validate::isLoadedObject($objPosOutletProductAttribute)) {
                                    if ($product['delta_qty'] > 0) {
                                        $diff = (int) $objPosOutletProductAttribute->quantity;
                                        $diff += abs($product['delta_qty']);
                                    } else {
                                        $diff = (int) $objPosOutletProductAttribute->quantity;
                                        $diff -= abs($product['delta_qty']);
                                    }
                                    $objPosOutletProductAttribute->quantity = $diff;
                                    if ($objPosOutletProductAttribute->quantity < 0) {
                                        $objPosOutletProductAttribute->quantity = 0;
                                        WkPosOutletProduct::updateAttributeQty($product['id_product_attribute']);
                                    }
                                    $objPosOutletProductAttribute->save();
                                }
                            }
                        } else {
                            if ($product['delta_qty'] > 0) {
                                $diff = (int) $objPosOutletProduct->quantity + abs($product['delta_qty']);
                            } else {
                                $diff = (int) $objPosOutletProduct->quantity - abs($product['delta_qty']);
                            }
                            $objPosOutletProduct->quantity = (int) $diff;
                            if ($objPosOutletProduct->quantity < 0) {
                                $objPosOutletProduct->quantity = 0;

                                WkPosOutletProduct::updateAllOutletQuantity($product['id_product']);
                            }
                            $objPosOutletProduct->save();
                        }
                    }
                }
            }
        }
    }

    public static function updateAllOutletQuantity($idProduct)
    {
        $sql = 'UPDATE `' . _DB_PREFIX_ . 'wkpos_outlet_product` op
            SET op.`quantity` = 0
            WHERE op.`id_product` = ' . (int) $idProduct;

        return Db::getInstance()->execute($sql);
    }

    public static function updateAttributeQty($idProductAttribute)
    {
        $sql = 'UPDATE `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` opa
            SET opa.`quantity` = 0
            WHERE opa.`id_product_attribute` = ' . (int) $idProductAttribute;

        return Db::getInstance()->execute($sql);
    }

    /**
     * get oultet id based on idProduct
     *
     * @param [int] $idProduct
     * @param [int] $quantity
     * @param int $idProductAttribute
     * @param int $idWkPosOutlet
     *
     * @return int
     */
    public static function getIdOutlet(
        $idProduct,
        $quantity,
        $idProductAttribute = false,
        $idWkPosOutlet = false,
        $type = 1
    ) {
        $sql = 'SELECT op.`id_wkpos_outlet` FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product` op';

        if ($idProductAttribute) {
            $sql .= ' LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` opa' .
                ' ON (op.`id_wkpos_outlet_product` = opa.`id_wkpos_outlet_product`)';
        }
        $sql .= ' WHERE op.`id_product` = ' . (int) $idProduct;

        if ($idWkPosOutlet) {
            if (is_array($idWkPosOutlet)) {
                $idWkPosOutlet = implode(',', $idWkPosOutlet);
            }
            $sql .= ' AND op.`id_wkpos_outlet` IN (' . pSQl($idWkPosOutlet) . ')';
        }
        if ($idProductAttribute) {
            $sql .= ' AND opa.`id_product_attribute` = ' . (int) $idProductAttribute;
            if ($idWkPosOutlet) {
                $sql .= ' AND opa.`quantity`>= ' . (int) $quantity;
            } elseif ($type == 1) {
                $sql .= ' AND (SELECT SUM(quantity) from `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` where '
                . 'id_product_attribute=' . (int) $idProductAttribute . ') >= ' . (int) $quantity;
            }
            $sql .= ' ORDER BY opa.`quantity` DESC';
        } else {
            if ($idWkPosOutlet) {
                $sql .= ' AND op.`quantity`>= ' . (int) $quantity;
            } elseif ($type == 1) {
                $sql .= ' AND (SELECT SUM(quantity) from `' . _DB_PREFIX_ . 'wkpos_outlet_product` where id_product=';
                $sql .= (int) $idProduct . ') >= ' . (int) $quantity;
                // $sql .= ' GROUP BY op.`quantity` HAVING SUM(op.`quantity`) >= '.(int)$quantity;
            }
            $sql .= ' ORDER BY op.`quantity` DESC';
        }

        return Db::getInstance()->executeS($sql);
    }

    public function getOutletProductIdByIdProduct($idProduct)
    {
        $sql = 'SELECT `id_wkpos_outlet_product` FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product`
            WHERE `id_product` = ' . (int) $idProduct;

        return Db::getInstance()->executeS($sql);
    }

    public function deleteAllOutletProduct($idProduct)
    {
        return Db::getInstance()->execute(
            'DELETE FROM `' . _DB_PREFIX_ . 'wkpos_outlet_product`
            WHERE `id_product` = ' . (int) $idProduct
        );
    }

    public static function reinjectQuantity($idOrder, $idProduct, $idProductAttribute, $quantity)
    {
        $idWkPosOutlets = WkPosOrder::getOutletByIdOrder($idOrder);
        if ($idWkPosOutlets && isset($idWkPosOutlets['id_wkpos_outlet'])) {
            if ($idProductAttribute) {
                $qty = WkPosOutletProductAttribute::getProductQuantity(
                    $idProduct,
                    $idWkPosOutlets['id_wkpos_outlet'],
                    $idProductAttribute
                );
            } else {
                $qty = WkPosOutletProduct::getProductQuantity(
                    $idProduct,
                    $idWkPosOutlets['id_wkpos_outlet']
                );
            }
            $quantity += $qty;
            $product = [
                'id_product' => $idProduct,
                'id_product_attribute' => $idProductAttribute,
                'quantity' => $quantity,
            ];
            static::increaseOutletQuantity([$idWkPosOutlets], $product);
        }
    }

    /**
     * Save the outlet product
     *
     * @param [int] $psProducts
     * @param [int] $idWkPosOutlet
     * @param int $idWkPosOutletProduct
     *
     * @return void
     */
    public static function assignProduct($psProducts, $idWkPosOutlet, $idWkPosOutletProduct = false, $totalQuantity = 0)
    {
        // $idShopGroup = Context::getContext()->shop->id_shop_group;
        $idShop = Context::getContext()->shop->id;
        foreach ($psProducts as $product) {
            $objWkPosOutletProduct = new WkPosOutletProduct();
            $objWkPosOutletProduct->id_wkpos_outlet = (int) $idWkPosOutlet;
            $objWkPosOutletProduct->id_product = (int) $product['id_product'];
            if (Tools::getValue('ajax') == true
            && Tools::getValue('action') == 'addCustomProduct'
            && Tools::getValue('fc') == 'module'
            && Tools::getValue('module') == 'wkpos') {
                $objWkPosOutletProduct->active = 1;
            } else {
                $objWkPosOutletProduct->active = Configuration::get('WKPOS_OUTLET_PRODUCT_ACTIVE');
            }
            if (empty($totalQuantity)) {
                $totalQuantity = (int) StockAvailable::getQuantityAvailableByProduct($product['id_product']);
            }
            $quantity = $objWkPosOutletProduct->getProductQuantityByIdProduct($product['id_product']);
            if ($quantity) {
                $totalQuantity -= $quantity;
            }
            if ($totalQuantity < 0) {
                $totalQuantity = 0;
            }
            if (Context::getContext()->shop->id != '') {
                $objWkPosOutletProduct->id_shop = $idShop;
            } else {
                $objWkPosOutletProduct->id_shop = $idShop;
            }
            $objWkPosOutletProduct->quantity = $totalQuantity;
            $objWkPosOutletProduct->save();
            if (Combination::isFeatureActive() && $product['cache_default_attribute']) {
                $combinations = WkPosOutletProductAttribute::getProductCombination($product['id_product']);
                foreach ($combinations as $combination) {
                    $objPosProductAttribute = new WkPosOutletProductAttribute();
                    $objPosProductAttribute->id_wkpos_outlet_product = (int) $objWkPosOutletProduct->id;
                    $objPosProductAttribute->id_product_attribute = (int) $combination['id_product_attribute'];
                    $totalQuantity = (int) StockAvailable::getQuantityAvailableByProduct(
                        $objWkPosOutletProduct->id_product,
                        $combination['id_product_attribute']
                    );
                    $quantity = WkPosOutletProductAttribute::getProductCombinationDetail(
                        $combination['id_product_attribute'],
                        $idWkPosOutlet,
                        $idWkPosOutletProduct,
                        1
                    );
                    if ($quantity) {
                        $totalQuantity -= $quantity;
                    }
                    if ($totalQuantity < 0) {
                        $totalQuantity = 0;
                    }
                    $objPosProductAttribute->quantity = (int) $totalQuantity;
                    $objPosProductAttribute->save();
                }
            }
        }
    }

    public function deactivePsProduct($idProduct, $update)
    {
        return
            Db::getInstance()->update('product', $update, 'id_product = ' . (int) $idProduct)
            && Db::getInstance()->update('product_shop', $update, 'id_product = ' . (int) $idProduct)
        ;
    }

    public function checkOutletProductExist($idProduct, $idWkPosOutlet)
    {
        return Db::getInstance()->getValue(
            'Select `id_wkpos_outlet_product` from `' . _DB_PREFIX_ . 'wkpos_outlet_product` op' .
            ' Where `id_product` = ' . (int) $idProduct .
            ' AND `id_wkpos_outlet` = ' . (int) $idWkPosOutlet
        );
    }

    public static function reinjectQuantityOutletwise($idOrder, $idProduct, $idProductAttribute, $quantity)
    {
        $reinjectibleProductQuantity = $quantity;
        $idWkPosOutlets = WkPosOrder::getOutletByIdOrder($idOrder);
        if ($idWkPosOutlets && isset($idWkPosOutlets['id_wkpos_outlet'])) {
            if ($idProductAttribute) {
                $qty = 0;
                $qty = (int) WkPosOutletProductAttribute::getProductQuantity(
                    $idProduct,
                    $idWkPosOutlets['id_wkpos_outlet'],
                    $idProductAttribute
                );
                $quantity += $qty;
                $id_wkpos_outlet_product_att = (int) WkPosOutletProductAttribute::getIdWkposOutletProductAttribute(
                    $idProduct,
                    $idWkPosOutlets['id_wkpos_outlet'],
                    $idProductAttribute
                );
                $objWkPosOutletProductAttribute = new WkPosOutletProductAttribute($id_wkpos_outlet_product_att);
                $objWkPosOutletProductAttribute->quantity = $quantity;
                $objWkPosOutletProductAttribute->update();
            }
            $qtyProduct = 0;
            $qtyProduct = (int) WkPosOutletProduct::getProductQuantity(
                $idProduct,
                $idWkPosOutlets['id_wkpos_outlet']
            );
            $id_wkpos_outlet_product = (int) WkPosOutletProduct::getOutletProductId(
                $idProduct,
                $idWkPosOutlets['id_wkpos_outlet']
            );
            $reinjectibleProductQuantity += $qtyProduct;
            $objWkPosOutletProduct = new WkPosOutletProduct($id_wkpos_outlet_product);
            $objWkPosOutletProduct->quantity = $reinjectibleProductQuantity;
            $objWkPosOutletProduct->update();
        }
    }

    public static function deleteCurrentOutletProduct($idWkPosOutlet)
    {
        $objOutlet = new WkPosOutletProduct();
        $idProducts = $objOutlet->getAllOutletProductForDelete($idWkPosOutlet);
        if (!empty($idProducts)) {
            foreach ($idProducts as $idProduct) {
                $objWkPosOutletProduct = new WkPosOutletProduct($idProduct['id_wkpos_outlet_product']);
                self::deleteOutletCombination($idProduct['id_wkpos_outlet_product']);
                $objWkPosOutletProduct->delete();
            }
        }
    }

    public static function deleteOutletCombination($idProduct)
    {
        $idProductAttributes = WkPosOutletProductAttribute::getCombinationByIdOutletProduct($idProduct);
        if (!empty($idProductAttributes)) {
            foreach ($idProductAttributes as $idProductAttribute) {
                $objPosProductAttribute = new WkPosOutletProductAttribute(
                    $idProductAttribute['id_wkpos_outlet_product_attribute']
                );
                $objPosProductAttribute->delete();
            }
        }
    }
}
