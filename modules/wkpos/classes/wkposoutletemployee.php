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
class WkPosOutletEmployee extends ObjectModel
{
    public const ADMIN = 0;
    public $id_wkpos_outlet;
    public $id_employee;
    public $type;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_outlet_employee',
        'primary' => 'id_wkpos_outlet_employee',
        'multilang' => false,
        'fields' => [
            'id_wkpos_outlet' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'id_employee' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'type' => [
                'type' => self::TYPE_INT,
                'validate' => 'isNullOrUnsignedId',
                'size' => 1,
            ],
            'active' => [
                'type' => self::TYPE_INT,
                'validate' => 'isNullOrUnsignedId',
                'size' => 1,
            ],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    /**
     * get outlet id assigned to an employee
     *
     * @param [int] $idEmployee
     *
     * @return int - retuning employee id
     */
    public static function getIdOutletEmployee($idEmployee)
    {
        return Db::getInstance()->getValue(
            'SELECT id_wkpos_outlet_employee
            FROM `' . _DB_PREFIX_ . 'wkpos_outlet_employee`
            WHERE id_employee = ' . (int) $idEmployee
        );
    }

    /**
     * Logout.
     */
    public function logout()
    {
        if (isset(Context::getContext()->cookie)) {
            Context::getContext()->cookie->logout();
            Context::getContext()->cookie->write();
        }
        $this->id = null;
    }
}
