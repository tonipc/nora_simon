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
class WkPosCustomPosValues extends ObjectModel
{
    public $id_product;
    public $online_sale_allow;
    public $pos_sale_allow;

    public static $definition = [
        'table' => 'wkpos_custom_pos_values',
        'primary' => 'id_wkpos_custom_pos_values',
        'multilang' => false,
        'fields' => [
            'id_product' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'size' => 50,
            ],
            'online_sale_allow' => ['type' => self::TYPE_INT, 'required' => true, 'size' => 2],
            'pos_sale_allow' => ['type' => self::TYPE_INT, 'required' => true, 'size' => 2],
        ],
    ];

    /**
     * get all oulted id and name
     *
     * @return array
     */
    public static function getPosCustomValuesByIdProduct($idProduct)
    {
        $sql = Db::getInstance()->getRow(
            'SELECT *
            FROM `' . _DB_PREFIX_ . 'wkpos_custom_pos_values`
            WHERE id_product = ' . (int) $idProduct
        );

        return $sql;
    }
}
