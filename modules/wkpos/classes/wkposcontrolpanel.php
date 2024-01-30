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
class WkPosControlPanel extends ObjectModel
{
    public $id_employee;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_control_panel',
        'primary' => 'id_wkpos_control_panel',
        'multilang' => false,
        'fields' => [
            'id_employee' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'active' => ['type' => self::TYPE_INT, 'required' => true, 'size' => 2],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    public function getControlDetails($idEmployee, $active = false)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('wkpos_control_panel', 'wps');
        $sql->where('wps.`id_employee` IN (' . pSQL($idEmployee) . ')');
        if ($active) {
            $sql->where('wps.`active` = 1');
        }
        $sql->orderBy('wps.`id_wkpos_control_panel` DESC');

        return Db::getInstance()->getRow($sql);
    }
}
