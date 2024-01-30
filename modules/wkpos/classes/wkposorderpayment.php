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
class WkPosOrderPayment extends ObjectModel
{
    public $id_wkpos_order;
    public $id_wkpos_payment;
    public $amount;
    public $type;

    public const MONEY_IN = 1;
    public const MONEY_OUT = 2;
    public static $definition = [
        'table' => 'wkpos_order_payment',
        'primary' => 'id_wkpos_order_payment',
        'multilang' => false,
        'fields' => [
            'id_wkpos_order' => ['type' => self::TYPE_INT, 'validate' => 'isInt', 'required' => true],
            'id_wkpos_payment' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'amount' => ['type' => self::TYPE_FLOAT, 'size' => 20],
            'type' => ['type' => self::TYPE_INT, 'size' => 2],
        ],
    ];

    public static function getOrderPayment($idWkPosOrder)
    {
        return Db::getInstance()->executeS(
            'SELECT a.*, b.`name`
            FROM `' . _DB_PREFIX_ . 'wkpos_order_payment` a
            LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_payment` b ON (a.`id_wkpos_payment` = b.`id_wkpos_payment`)
            WHERE `id_wkpos_order` = ' . (int) $idWkPosOrder
        );
    }

    public function updateOrderAmount($idOrder, $prevOrderAmount)
    {
        $idPosOrder = WkPosOrder::getPosOrderId($idOrder);
        if ($idPosOrder) {
            $order = new Order($idOrder);
            $orderAmount = $order->getTotalPaid();

            $this->updateOrderTransaction(
                $prevOrderAmount,
                self::MONEY_OUT,
                $idPosOrder,
                Configuration::get('WKPOS_ORDER_EDIT_PAYMENT')
            );
            $this->updateOrderTransaction(
                $orderAmount,
                self::MONEY_IN,
                $idPosOrder,
                Configuration::get('WKPOS_ORDER_EDIT_PAYMENT')
            );
        }
    }

    public function updateOrderTransaction($amount, $type, $idPosOrder, $idWkPosPayment)
    {
        $objOrderPayment = new WkPosOrderPayment();
        $objOrderPayment->amount = $amount;
        $objOrderPayment->type = $type;
        $objOrderPayment->id_wkpos_order = $idPosOrder;
        $objOrderPayment->id_wkpos_payment = $idWkPosPayment;
        $objOrderPayment->save();
    }
}
