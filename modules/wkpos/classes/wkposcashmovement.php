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
class WkPosCashMovement extends ObjectModel
{
    public const CASH = 1;
    public const CARD = 2;
    public const OPENING = 1;
    public const DEPOSIT = 2;
    public const WITHDRAW = 3;
    public const CLOSING = 4;

    public $id_wkpos_register;
    public $id_wkpos_payment;
    public $type;
    public $amount;
    public $note;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_cash_movement',
        'primary' => 'id_wkpos_cash_movement',
        'multilang' => false,
        'fields' => [
            'id_wkpos_register' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'id_wkpos_payment' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'type' => ['type' => self::TYPE_INT, 'required' => true, 'size' => 2],
            'amount' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice', 'required' => true],
            'note' => ['type' => self::TYPE_STRING, 'size' => 255],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    public function getRegisterOpeningBalance($idRegister)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('wkpos_cash_movement', 'wcm');
        $sql->where('wcm.`id_wkpos_register` = ' . (int) $idRegister);
        $sql->where('wcm.`type` = ' . (int) self::OPENING);

        return Db::getInstance()->getRow($sql);
    }

    public function getCashMovement($idRegister, $type = false, $idWkPosPayment = false, $single = false)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('wkpos_cash_movement', 'wcm');
        $sql->where('wcm.`id_wkpos_register` = ' . (int) $idRegister);
        if ($type) {
            $sql->where('wcm.`type` = ' . (int) $type);
        }
        if ($idWkPosPayment) {
            $sql->where('wcm.`id_wkpos_payment` = ' . (int) $idWkPosPayment);
        }
        if ($single) {
            return Db::getInstance()->getRow($sql);
        } else {
            return Db::getInstance()->executeS($sql);
        }
    }

    public function getTotalAmount($idRegister, $objCurrency, $type = false, $idWkPosPayment = false)
    {
        $sql = new DbQuery();
        $sql->select('SUM(`amount`)');
        $sql->from('wkpos_cash_movement', 'wcm');
        $sql->where('wcm.`id_wkpos_register` = ' . (int) $idRegister);
        if ($type) {
            $sql->where('wcm.`type` = ' . (int) $type);
        }
        if ($idWkPosPayment) {
            $sql->where('wcm.`id_wkpos_payment` = ' . (int) $idWkPosPayment);
        }
        $amount = Db::getInstance()->getValue($sql);
        if (empty($amount)) {
            $amount = 0;
        }

        return Tools::displayPrice($amount, $objCurrency);
    }
}
