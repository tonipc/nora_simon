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

use PrestaShop\PrestaShop\Adapter\ServiceLocator;

/**
 * Represents quantities available
 * It is either synchronized with Stock or manualy set by the seller.
 *
 * @since 1.5.0
 */
class StockAvailable extends StockAvailableCore
{
    /**
     * For a given id_product and id_product_attribute sets the quantity available.
     *
     * @param $id_product
     * @param $id_product_attribute
     * @param $quantity
     * @param null $id_shop
     * @param bool $add_movement
     *
     * @return bool
     */
    public static function setQuantity(
        $id_product,
        $id_product_attribute,
        $quantity,
        $id_shop = null,
        $add_movement = true
    ) {
        if (!Validate::isUnsignedId($id_product)) {
            return false;
        }
        $context = Context::getContext();
        // if there is no $id_shop, gets the context one
        if ($id_shop === null && Shop::getContext() != Shop::CONTEXT_GROUP) {
            $id_shop = (int) $context->shop->id;
        }
        $depends_on_stock = StockAvailable::dependsOnStock($id_product);
        $deltaQty = 0;

        // Try to set available quantity if product does not depend on physical stock
        if (!$depends_on_stock) {
            $stockManager = ServiceLocator::get('\\PrestaShop\\PrestaShop\\Core\\Stock\\StockManager');

            $id_stock_available = (int) StockAvailable::getStockAvailableIdByProductId(
                $id_product,
                $id_product_attribute,
                $id_shop
            );
            if ($id_stock_available) {
                $stock_available = new StockAvailable($id_stock_available);

                $deltaQty = $quantity - $stock_available->quantity;
                $deltaQuantity = -1 * ((int) $stock_available->quantity - (int) $quantity);

                $stock_available->quantity = (int) $quantity;
                $stock_available->update();

                if (true === $add_movement && 0 != $deltaQuantity) {
                    $stockManager->saveMovement($id_product, $id_product_attribute, $deltaQuantity);
                }
            } else {
                $out_of_stock = StockAvailable::outOfStock($id_product, $id_shop);
                $stock_available = new StockAvailable();
                $stock_available->out_of_stock = (int) $out_of_stock;
                $stock_available->id_product = (int) $id_product;
                $stock_available->id_product_attribute = (int) $id_product_attribute;
                $stock_available->quantity = (int) $quantity;
                if ($id_shop === null) {
                    $shop_group = Shop::getContextShopGroup();
                } else {
                    $shop_group = new ShopGroup((int) Shop::getGroupFromShop((int) $id_shop));
                }
                // if quantities are shared between shops of the group
                if ($shop_group->share_stock) {
                    $stock_available->id_shop = 0;
                    $stock_available->id_shop_group = (int) $shop_group->id;
                } else {
                    $stock_available->id_shop = (int) $id_shop;
                    $stock_available->id_shop_group = 0;
                }
                $stock_available->add();

                if (true === $add_movement && 0 != $quantity) {
                    $stockManager->saveMovement($id_product, $id_product_attribute, (int) $quantity);
                }
            }

            Hook::exec(
                'actionUpdateQuantity',
                [
                    'id_product' => $id_product,
                    'id_product_attribute' => $id_product_attribute,
                    'quantity' => $stock_available->quantity,
                ]
            );
            Hook::exec(
                'actionWkUpdateQuantity',
                [
                    'id_product' => $id_product,
                    'id_product_attribute' => $id_product_attribute,
                    'quantity' => $stock_available->quantity,
                    'delta_qty' => $deltaQty,
                ]
            );
        }
        Cache::clean('StockAvailable::getQuantityAvailableByProduct_' . (int) $id_product . '*');
    }

    public static function updateQuantity(
        $id_product,
        $id_product_attribute,
        $delta_quantity,
        $id_shop = null,
        $add_movement = false,
        $params = []
    ) {
        $result = parent::updateQuantity(
            $id_product,
            $id_product_attribute,
            $delta_quantity,
            $id_shop,
            $add_movement,
            $params
        );
        if ($result) {
            // Hook::exec(
            //     'actionWkUpdateQuantity',
            //     array(
            //         'id_product' => $id_product,
            //         'id_product_attribute' => $id_product_attribute,
            //         'quantity' => '0',
            //         'delta_qty' => $delta_quantity
            //     )
            // );
        }

        return $result;
    }

    public function updateWs()
    {
        $stockAvailable = new StockAvailable($this->id);
        $deltaQty = $this->quantity - $stockAvailable->quantity;
        $result = parent::updateWs();
        if ($result) {
            Hook::exec(
                'actionWkUpdateQuantity',
                [
                    'id_product' => $this->id_product,
                    'id_product_attribute' => $this->id_product_attribute,
                    'quantity' => $this->quantity,
                    'delta_qty' => $deltaQty,
                ]
            );
        }

        return $result;
    }
}
