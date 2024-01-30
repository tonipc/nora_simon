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
class WkPosOutlets extends ObjectModel
{
    public $name;
    public $id_address;
    public $allowed_currencies;
    public $default_currency;
    public $allowed_languages;
    public $default_language;
    public $id_shop;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_outlets',
        'primary' => 'id_wkpos_outlet',
        'multilang' => false,
        'fields' => [
            'name' => [
                'type' => self::TYPE_STRING,
                'validate' => 'isGenericName',
                'required' => true,
                'size' => 50,
            ],
            'id_address' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'default_currency' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'allowed_currencies' => ['type' => self::TYPE_STRING, 'validate' => 'isJson'],
            'default_language' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'allowed_languages' => ['type' => self::TYPE_STRING, 'validate' => 'isJson'],
            'id_shop' => [
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

    /**
     * get all oulted id and name
     *
     * @return array
     */
    public static function getOutlets()
    {
        return Db::getInstance()->executeS(
            'SELECT id_wkpos_outlet, name
            FROM `' . _DB_PREFIX_ . 'wkpos_outlets`
            WHERE active = 1'
        );
    }

    public static function getOutletExcept($idWkPosOutlets)
    {
        $notEmpty = false;
        if ($idWkPosOutlets) {
            $notEmpty = true;
        }
        if ($notEmpty) {
            if (is_array($idWkPosOutlets)) {
                $idWkPosOutlets = implode(',', $idWkPosOutlets);
            }
        }
        $sql = 'SELECT id_wkpos_outlet, name
            FROM `' . _DB_PREFIX_ . 'wkpos_outlets`';
        if ($notEmpty) {
            $sql .= ' WHERE  id_wkpos_outlet NOT IN (' . pSQL($idWkPosOutlets) . ')';
        }

        return Db::getInstance()->executeS($sql);
    }

    public function getOutletByNameId($outletName, $idOutlet)
    {
        return Db::getInstance()->executeS(
            'SELECT * FROM `' . _DB_PREFIX_ . 'wkpos_outlets` WHERE `id_wkpos_outlet` != ' . (int) $idOutlet .
            ' AND lower(`name`) = "' . pSQL($outletName) . '"'
        );
    }
}
