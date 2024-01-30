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
class WkPosOutletCategory extends ObjectModel
{
    public $id_order;
    public $id_category;
    public $id_wkpos_outlet;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_outlet_category',
        'primary' => 'id_wkpos_outlet_category',
        'multilang' => false,
        'fields' => [
            'id_category' => ['type' => self::TYPE_STRING, 'validate' => 'isJson'],
            'id_wkpos_outlet' => ['type' => self::TYPE_INT, 'validate' => 'isInt', 'required' => true],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => false],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => false],
        ],
    ];

    public static function getOutletCatgoryId($idOutlet)
    {
        return Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow(
            'SELECT id_category, id_wkpos_outlet_category
            FROM `' . _DB_PREFIX_ . 'wkpos_outlet_category`
            WHERE `id_wkpos_outlet` = ' . (int) $idOutlet
        );
    }
}
