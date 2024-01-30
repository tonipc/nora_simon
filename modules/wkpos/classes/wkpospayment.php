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
class WkPosPayment extends ObjectModel
{
    public $name;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_payment',
        'primary' => 'id_wkpos_payment',
        'multilang' => false,
        'fields' => [
            'name' => ['type' => self::TYPE_STRING, 'required' => true, 'validate' => 'isName', 'size' => 50],
            'active' => ['type' => self::TYPE_INT, 'required' => true, 'size' => 2],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    /**
     * get Payment Detail
     *
     * @param bool $active
     *
     * @return array
     */
    public static function getPaymentDetail($active = false)
    {
        $sql = 'SELECT pp.`id_wkpos_payment` as id_group, pp.`name`,
            pp.`active`, pp.`id_wkpos_payment` as `val`
            FROM `' . _DB_PREFIX_ . 'wkpos_payment` pp';
        if ($active) {
            $sql .= ' Where pp.`active` = 1';
        }

        return Db::getInstance()->executeS($sql);
    }

    /**
     * get id payment detail
     *
     * @return array
     */
    public static function getPaymentDetailId()
    {
        return Db::getInstance()->executeS(
            'SELECT pp.`id_wkpos_payment`
            FROM `' . _DB_PREFIX_ . 'wkpos_payment` pp'
        );
    }

    /**
     * get active payment Details
     *
     * @return array
     */
    public static function getActivePaymentDetail()
    {
        return Db::getInstance()->executeS(
            'SELECT pp.`id_wkpos_payment`,pp.`name`,
            pp.`active`, pp.`id_wkpos_payment` as `val`
            FROM `' . _DB_PREFIX_ . 'wkpos_payment` pp
            Where pp.`active` = 1'
        );
    }
}
