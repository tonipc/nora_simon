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
class WkPosCustomProduct extends ObjectModel
{
    public $id_cart;
    public $id_product;
    public $id_wkpos_outlet;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_custom_product',
        'primary' => 'id_wkpos_custom_product',
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
            'id_cart' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isUnsignedInt',
                'size' => 10,
            ],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    public function createCustomProduct($productData)
    {
        $idShop = Context::getContext()->shop->id;
        $objectProduct = new Product();
        $objectProduct->name = [];
        $objectProduct->description_short = [];
        $objectProduct->link_rewrite = [];
        $objectProduct->active = true;
        foreach (Language::getLanguages(true) as $language) {
            $objectProduct->name[$language['id_lang']] = $productData['name'];
            $objectProduct->link_rewrite[$language['id_lang']] = Tools::link_rewrite($productData['name']);
            $objectProduct->description_short[$language['id_lang']] = '';
        }
        $tax_rate = TaxRule::getTaxRulesByGroupId(1, $productData['tax']);
        if (is_array($tax_rate) && isset($tax_rate[0])) {
            $productActualPrice = round(($productData['price'] * 100) / ($tax_rate[0]['rate'] + 100), 4, PHP_ROUND_HALF_UP);
        } else {
            $productActualPrice = round(($productData['price'] * 100) / (0 + 100), 4, PHP_ROUND_HALF_UP);
        }

        $objectProduct->indexed = 1;
        $objectProduct->price = $productActualPrice;
        $objectProduct->base_price = $productActualPrice;
        $objectProduct->unit_price = $productActualPrice;
        $objectProduct->wholesale_price = $productActualPrice;
        $objectProduct->condition = 'new';
        $objectProduct->visibility = 'none';
        $objectProduct->is_virtual = 0;
        $objectProduct->id_tax_rules_group = (int) $productData['tax'];
        $objectProduct->out_of_stock = 2;
        $rootCat = new Category(Configuration::get('WKPOS_CUSTOM_PRODUCT_CATEGORY'));
        $objectProduct->id_category_default = $rootCat->id_category;
        $objectProduct->category = $rootCat->link_rewrite;
        $objectProduct->save();
        $objectProduct->updateCategories([$rootCat->id_category]);
        if (0 < $objectProduct->id) {
            StockAvailable::updateQuantity($objectProduct->id, null, $productData['qty'], $idShop);
        }

        return $objectProduct;
    }

    public function getCartCustomProduct($idCart)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('wkpos_custom_product', 'wcp');
        $sql->where('wcp.`id_cart` = ' . (int) $idCart);

        return Db::getInstance()->executeS($sql);
    }

    public function deleteCustomProduct($idCart)
    {
        $products = $this->getCartCustomProduct($idCart);
        if ($products) {
            foreach ($products as $product) {
                if (isset($product['id_product'])) {
                    $objProduct = new Product($product['id_product']);
                    if (Validate::isLoadedObject($objProduct)) {
                        if ($objProduct->delete()) {
                            $objCustomProduct = new WkPosCustomProduct($product['id_wkpos_custom_product']);
                            if (Validate::isLoadedObject($objCustomProduct)) {
                                $objCustomProduct->delete();
                            }
                        }
                    }
                }
            }
        }
    }

    public static function checkCustomProduct($idProduct)
    {
        $sql = new DbQuery();
        $sql->select('id_product');
        $sql->from('wkpos_custom_product', 'wcp');
        $sql->where('wcp.`id_product` = ' . (int) $idProduct);

        return Db::getInstance()->executeS($sql);
    }

    public function updateCustomProductCartId($idCart, $products, $newCartId)
    {
        if ($idCart != $newCartId) {
            foreach ($products as $product) {
                if (isset($product->product_id) && $product->product_id && $product->product_quantity > 0) {
                    if (isset($product->customProduct) && $product->customProduct) {
                        $this->updateCartId(
                            $idCart,
                            $newCartId,
                            $product->product_id
                        );
                    }
                }
            }
        }
    }

    public function updateCartId($idCart, $newCartId, $idProduct)
    {
        $where = 'id_cart = ' . (int) $idCart . ' AND id_product = ' . (int) $idProduct;

        return Db::getInstance()->update('wkpos_custom_product', ['id_cart' => (int) $newCartId], $where);
    }
}
