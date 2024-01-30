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
class WkPosInstallment extends ObjectModel
{
    public $id_wkpos_order;
    public $amount;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_installment',
        'primary' => 'id_wkpos_installment',
        'multilang' => false,
        'fields' => [
            'id_wkpos_order' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'amount' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice', 'required' => true],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    public static function getInstallmentTotalPaid($idWkPosOrder)
    {
        return Db::getInstance()->getValue(
            'SELECT SUM(amount)
            FROM `' . _DB_PREFIX_ . 'wkpos_installment`
            WHERE `id_wkpos_order` = ' . (int) $idWkPosOrder
        );
    }
}
