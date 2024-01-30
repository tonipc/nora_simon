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
class WkPosCashControl extends ObjectModel
{
    public const OPEN_SESSION = 1;
    public const CLOSE_SESSION = 0;

    public $id_wkpos_control_panel;
    public $type;
    public $amount_value;
    public $quantity;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_cash_control',
        'primary' => 'id_wkpos_cash_control',
        'multilang' => false,
        'fields' => [
            'id_wkpos_control_panel' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'type' => ['type' => self::TYPE_INT, 'required' => true, 'size' => 2],
            'amount_value' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice', 'required' => true],
            'quantity' => ['type' => self::TYPE_INT, 'required' => true, 'size' => 10],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    public function getCashControlDetails($idWkPosControlPanel)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('wkpos_cash_control', 'wcc');
        $sql->where('wcc.`id_wkpos_control_panel` = ' . (int) $idWkPosControlPanel);
        $sql->orderBy('wcc.`id_wkpos_cash_control` ASC');

        return Db::getInstance()->executeS($sql);
    }

    public function balanceTotal($idWkPosControlPanel, $type)
    {
        $amount = 0;
        $cashControls = self::getCashControlDetails($idWkPosControlPanel);
        if ($cashControls) {
            foreach ($cashControls as $control) {
                if ($control['type'] == $type) {
                    $amount += $control['amount_value'] * $control['quantity'];
                }
            }
        }

        return $amount;
    }
}
