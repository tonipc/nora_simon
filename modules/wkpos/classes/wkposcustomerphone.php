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
class WkPosCustomerPhone extends ObjectModel
{
    public $id_customer;
    public $customer_phone;

    public static $definition = [
        'table' => 'wkpos_customer_phone',
        'primary' => 'id_wkpos_customer_phone',
        'multilang' => false,
        'fields' => [
            'id_customer' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isUnsignedInt',
                'size' => 10,
            ],
            'customer_phone' => ['type' => self::TYPE_STRING, 'validate' => 'isPhoneNumber', 'size' => 32],
        ],
    ];

    public static function getCustomerPhone($idCustomer)
    {
        return Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue(
            'SELECT customer_phone
            FROM `' . _DB_PREFIX_ . 'wkpos_customer_phone` a
            WHERE `id_customer` = ' . (int) $idCustomer
        );
    }

    public static function getIdByCustomerId($idCustomer)
    {
        return Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue(
            'SELECT id_wkpos_customer_phone
            FROM `' . _DB_PREFIX_ . 'wkpos_customer_phone` a
            WHERE `id_customer` = ' . (int) $idCustomer
        );
    }
}
