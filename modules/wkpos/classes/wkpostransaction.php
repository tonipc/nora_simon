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
class WkPosTransaction extends ObjectModel
{
    public const WKPOS_MONEY_IN = 1;
    public const WKPOS_MONEY_OUT = 0;

    public $label;
    public $amount;
    public $id_wkpos_session;
    public $type;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_outlet_transaction',
        'primary' => 'id_wkpos_outlet_transaction',
        'multilang' => false,
        'fields' => [
            'id_wkpos_session' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'label' => ['type' => self::TYPE_STRING, 'required' => true],
            'type' => ['type' => self::TYPE_INT, 'required' => true, 'size' => 2],
            'amount' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice', 'required' => true],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    public function getSessionTransactions($idWkPosSession)
    {
        $sql = new DbQuery();
        $sql->select('wot.*, o.`id_currency`');
        $sql->from('wkpos_outlet_transaction', 'wot');
        $sql->leftJoin('wkpos_order', 'wko', 'wko.`id_wkpos_session` = wot.`id_wkpos_session`');
        $sql->leftJoin('orders', 'o', 'o.`id_order` = wko.`id_order`');
        $sql->where('wot.`id_wkpos_session` = ' . (int) $idWkPosSession);

        $sql->orderBy('wot.`id_wkpos_outlet_transaction` DESC');
        $sql->groupBy('wot.`id_wkpos_outlet_transaction`');

        return Db::getInstance()->executeS($sql);
    }

    public function updateOrderAmount($idOrder, $idWkPosSession, $orderAmount)
    {
        $idPosOrder = WkPosOrder::getPosOrderId($idOrder);
        if ($idPosOrder) {
            $sql = new DbQuery();
            $sql->select('*');
            $sql->from('wkpos_outlet_transaction', 'wot');
            $sql->where('wot.`id_wkpos_session` = ' . (int) $idWkPosSession);
            $sql->where('wot.`label` LIKE \'%' . psQL('/' . $idPosOrder) . '%\'');
            $sql->orderBy('wot.`id_wkpos_outlet_transaction` ASC');
            $transactions = Db::getInstance()->executeS($sql);
            if ($transactions) {
                $returnAmount = 0;
                if (isset($transactions[1])) {
                    $returnAmount = (float) $transactions[1]['amount'];
                }
                if (isset($transactions[0])) {
                    $amount = (float) $orderAmount + $returnAmount;
                    $objTransaction = new WkPosTransaction($transactions[0]['id_wkpos_outlet_transaction']);
                    $objTransaction->amount = (float) $amount;
                    $objTransaction->save();
                }
            }
        }
    }
}
