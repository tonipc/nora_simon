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
class WkPosPaytefHelper
{

    const WK_POS_PAYTEF_PINPAD_STATUS_ENDPOINT = '/pinpad/status';
    const WK_POS_PAYTEF_TRANSACTION_START = '/transaction/start';
    const WK_POS_PAYTEF_TRANSACTION_POLL = '/transaction/poll';
    const WK_POS_PAYTEF_TRANSACTION_RESULT = '/transaction/result';

    public static function getPosPaymentByName($name)
    {
        return Db::getInstance()->getRow(
            'SELECT * FROM `' . _DB_PREFIX_ . 'wkpos_payment` WHERE `name` = "' . $name . '"'
        );
    }

    public static function isColumnExist($columnName, $table)
    {
        $allColumnName = Db::getInstance()->executeS('DESCRIBE `' . _DB_PREFIX_ . bqsql($table) . '`');
        foreach ($allColumnName as $name) {
            if ($name['Field'] == bqsql($columnName)) {
                return true;
            }
        }
        return false;
    }

    public static function getOutlets()
    {
        $posOutlets = [];
        $outlets = WkPosOutlets::getOutlets();
        if (_PS_VERSION_ >= '1.7.6.0') {
            foreach ($outlets as $outlet) {
                $posOutlets[$outlet['name']] = $outlet['id_wkpos_outlet'];
            }
        } else {
            $posOutlets = $outlets;
        }

        return $posOutlets;
    }

    public static function getAllPOSUsers($active = true)
    {
        $context = Context::getContext();
        $contextEmpId = $context->cookie->id_employee;
        $idOutlet = (int) $context->cookie->id_wkpos_outlet;
        $sql = new DbQuery();
        $sql->select('wpu.`name`, wpu.`id_wkpos_user`, wpu.`active`, al.`id_wkpos_outlet`, al.`device_ip`,  al.`device_port`,  al.`device_pinpad`');
        $sql->from('wkpos_user', 'wpu');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_employee` al ON al.`id_employee` = wpu.`id_employee`');
        if ($active) {
            $sql->where('wpu.`active` = 1');
        }
        $sql->where('wpu.`deleted` = 0');
        $sql->where('al.`id_wkpos_outlet` = ' . (int) $idOutlet);
        $objEmp = new Employee($contextEmpId);
        if ($objEmp->isSuperAdmin() == false) {
            $sql->where('wpu.`id_employee` = ' . (int) $contextEmpId);
        }

        return Db::getInstance()->executeS($sql);
    }
}