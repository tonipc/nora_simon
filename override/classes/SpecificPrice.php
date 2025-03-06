<?php

class SpecificPrice extends SpecificPriceCore
{
    /**
     * Returns the specificPrice information related to a given productId and context.
     *
     * @param int $id_product
     * @param int $id_shop
     * @param int $id_currency
     * @param int $id_country
     * @param int $id_group
     * @param int $quantity
     * @param int $id_product_attribute
     * @param int $id_customer
     * @param int $id_cart
     * @param int $real_quantity
     *
     * @return array
     */
    public static function getSpecificPrice(
        $id_product,
        $id_shop,
        $id_currency,
        $id_country,
        $id_group,
        $quantity,
        $id_product_attribute = null,
        $id_customer = 0,
        $id_cart = 0,
        $real_quantity = 0
    ) {
        //GLOVO
        if ($id_shop == 2 && date('w') != 3) {
            return [];
        }

        return parent::getSpecificPrice(
            $id_product,
            $id_shop,
            $id_currency,
            $id_country,
            $id_group,
            $quantity,
            $id_product_attribute,
            $id_customer,
            $id_cart,
            $real_quantity
        );
    }
}