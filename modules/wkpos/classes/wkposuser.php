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
class WkPosUser extends ObjectModel
{
    public $id_employee;
    public $name;
    public $active;
    public $deleted;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_user',
        'primary' => 'id_wkpos_user',
        'multilang' => false,
        'fields' => [
            'id_employee' => [
                'type' => self::TYPE_INT,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'name' => [
                'type' => self::TYPE_STRING,
                'validate' => 'isGenericName',
                'required' => true,
                'size' => 50,
            ],
            'active' => ['type' => self::TYPE_INT, 'required' => true, 'size' => 2],
            'deleted' => ['type' => self::TYPE_INT, 'size' => 1],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    public function getUserDetails($idEmployee)
    {
        $sql = new DbQuery();
        $sql->select('wpu.`id_wkpos_user`');
        $sql->from('wkpos_user', 'wpu');
        $sql->where('wpu.`id_employee` = ' . (int) $idEmployee);
        $sql->where('wpu.`deleted` = 0');

        return Db::getInstance()->getValue($sql);
    }

    public function getAllUsers($active = true)
    {
        $context = Context::getContext();
        $contextEmpId = $context->cookie->id_employee;
        $idOutlet = (int) $context->cookie->id_wkpos_outlet;
        $sql = new DbQuery();
        $sql->select('wpu.`name`, wpu.`id_wkpos_user`, wpu.`active`, al.`id_wkpos_outlet`');
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

    public static function getAllPosOutletEmployee()
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('wkpos_outlet_employee', 'woe');

        return Db::getInstance()->executeS($sql);
    }
}
