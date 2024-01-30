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
class WkPosRegisterOrder extends ObjectModel
{
    public $id_wkpos_register;
    public $id_wkpos_order;

    public static $definition = [
        'table' => 'wkpos_register_order',
        'primary' => 'id_wkpos_register_order',
        'multilang' => false,
        'fields' => [
            'id_wkpos_register' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'id_wkpos_order' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'id_wkpos_user' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
        ],
    ];

    public function getRegisterOrders($idRegister, $type)
    {
        $sql = new DbQuery();
        $sql->select('wpop.`id_wkpos_payment`, SUM(wpop.`amount`) as `amount`');
        $sql->from('wkpos_register_order', 'wpro');
        $sql->innerJoin('wkpos_register', 'wpr', 'wpr.`id_wkpos_register` = wpro.`id_wkpos_register`');
        $sql->leftJoin('wkpos_order_payment', 'wpop', 'wpop.`id_wkpos_order` = wpro.`id_wkpos_order`');
        $sql->where('wpr.`id_wkpos_register` = ' . (int) $idRegister);
        $sql->where('wpop.`type` = ' . (int) $type);
        $sql->groupBy('wpop.`id_wkpos_payment`');

        return Db::getInstance()->executeS($sql);
    }

    public function getRegisterVouchers($idRegister)
    {
        $sql = new DbQuery();
        $sql->select('SUM(o.`total_discounts`) as total_discount');
        $sql->from('wkpos_register_order', 'wpro');
        $sql->leftJoin('wkpos_order', 'wpo', 'wpo.`id_wkpos_order` = wpro.`id_wkpos_order`');
        $sql->leftJoin('orders', 'o', 'wpo.`id_order` = o.`id_order`');
        $sql->where('wpro.`id_wkpos_register` = ' . (int) $idRegister);

        return Db::getInstance()->getValue($sql);
    }

    public function getRegisterOrderMovement($idRegister, $idWkPosPayment = false)
    {
        $sql = new DbQuery();
        $sql->select('wpop.`id_wkpos_payment`, o.`reference`, wpop.`amount`, wpop.`type`, o.`date_add`');
        $sql->from('wkpos_register_order', 'wpro');
        $sql->leftJoin('wkpos_order_payment', 'wpop', 'wpop.`id_wkpos_order` = wpro.`id_wkpos_order`');
        $sql->leftJoin('wkpos_order', 'wpo', 'wpo.`id_wkpos_order` = wpro.`id_wkpos_order`');
        $sql->leftJoin('orders', 'o', 'wpo.`id_order` = o.`id_order`');
        $sql->where('wpro.`id_wkpos_register` = ' . (int) $idRegister);
        if ($idWkPosPayment) {
            $sql->where('wpop.`id_wkpos_payment` = ' . (int) $idWkPosPayment);
        }

        return Db::getInstance()->executeS($sql);
    }

    public function getRegisterPayment($idRegister)
    {
        $sql = new DbQuery();
        $sql->select('wpop.`id_wkpos_payment`, wpp.`name`');
        $sql->from('wkpos_register_order', 'wpro');
        $sql->leftJoin('wkpos_order_payment', 'wpop', 'wpop.`id_wkpos_order` = wpro.`id_wkpos_order`');
        $sql->leftJoin('wkpos_payment', 'wpp', 'wpp.`id_wkpos_payment` = wpop.`id_wkpos_payment`');
        $sql->where('wpp.`active` = ' . 1);
        $sql->where('wpro.`id_wkpos_register` = ' . (int) $idRegister);
        $sql->groupBy('wpop.`id_wkpos_payment`');

        return Db::getInstance()->executeS($sql);
    }

    public function getTotalAmount($idRegister, $objCurrency, $idWkPosPayment = false)
    {
        $sql = new DbQuery();
        $sql->select('SUM(CASE
            WHEN wpop.`type` = ' . (int) WkPosOrderPayment::MONEY_OUT . ' THEN wpop.`amount` * -1
                ELSE wpop.`amount`
            END
        ) AS order_amount');
        $sql->from('wkpos_register_order', 'wpro');
        $sql->leftJoin('wkpos_order_payment', 'wpop', 'wpop.`id_wkpos_order` = wpro.`id_wkpos_order`');
        $sql->where('wpro.`id_wkpos_register` = ' . (int) $idRegister);
        if ($idWkPosPayment) {
            $sql->where('wpop.`id_wkpos_payment` = ' . (int) $idWkPosPayment);
        }
        $amount = Db::getInstance()->getValue($sql);
        if (empty($amount)) {
            $amount = 0;
        }

        return Tools::displayPrice($amount, $objCurrency);
    }
}
