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
class WkPosPaytefTransaction extends ObjectModel
{
    public $id_cart;
    public $id_order;
    public $reference;
    public $acquirerID;
    public $pinpadID;
    public $amount;
    public $transaction_response;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_paytef_transaction',
        'primary' => 'id_wkpos_paytef_transaction',
        'fields' => [
            'id_cart' => ['type' => self::TYPE_INT, 'validate' => 'isInt'],
            'id_order' => ['type' => self::TYPE_INT, 'validate' => 'isInt'],
            'reference' => ['type' => self::TYPE_STRING, 'size' => 50],
            'acquirerID' => ['type' => self::TYPE_STRING, 'size' => 255],
            'pinpadID' => ['type' => self::TYPE_STRING, 'size' => 50],
            'amount' => ['type' => self::TYPE_FLOAT, /*'validate' => 'isPrice'*/],
            'transaction_response' => ['type' => self::TYPE_STRING],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    public static function getTransactionDetailByIdCart($idCart , $pingpadID = false)
    {
        $sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'wkpos_paytef_transaction` WHERE `id_cart` = "' . $idCart . '"';
        if($pingpadID) {
            $sql .= 'AND `pinpadID` ='. pSQL($pingpadID);
        }
        $sql .= ' ORDER BY `id_wkpos_paytef_transaction` DESC LIMIT 1';

        return Db::getInstance()->executeS($sql);
    }

}
