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

function upgrade_module_5_1_0()
{
    $queries = [
        'ALTER TABLE `' . _DB_PREFIX_ . 'wkpos_order`
        CHANGE `id_employee` `id_wkpos_outlet_employee` INT(10) NOT NULL;',

        'ALTER TABLE `' . _DB_PREFIX_ . "wkpos_outlet_employee`
        ADD `type` TINYINT(1) NOT NULL DEFAULT '0',
        ADD `active` TINYINT(2) NOT NULL DEFAULT '1'",

        'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'wkpos_customer_phone` (
            `id_wkpos_customer_phone` int(10) unsigned NOT NULL auto_increment,
            `id_customer` int(10) unsigned NOT NULL,
            `customer_phone` varchar(32) NOT NULL,
            PRIMARY KEY  (`id_wkpos_customer_phone`)
        ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
    ];
    $db = Db::getInstance();
    $success = true;
    foreach ($queries as $query) {
        $success &= $db->execute($query);
    }

    return true;
}
