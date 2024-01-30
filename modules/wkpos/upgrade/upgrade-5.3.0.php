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

function upgrade_module_5_3_0($module)
{
    $queries = [
        'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . "wkpos_cash_movement` (
            `id_wkpos_cash_movement` int(10) unsigned NOT NULL auto_increment,
            `id_wkpos_register` int(10) unsigned NOT NULL,
            `id_wkpos_payment` int(10) unsigned NOT NULL,
            `type` int(2) unsigned NOT NULL,
            `amount` decimal(20, 6) NOT NULL DEFAULT '0.000000',
            `note`  text default NULL,
            `date_add` datetime NOT NULL,
            `date_upd` datetime NOT NULL,
            PRIMARY KEY  (`id_wkpos_cash_movement`)
        ) ENGINE=" . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
        'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'wkpos_register` (
            `id_wkpos_register` int(10) unsigned NOT NULL auto_increment,
            `id_wkpos_outlet` int(10) unsigned NOT NULL,
            `id_employee` int(10) unsigned NOT NULL,
            `id_currency` int(10) unsigned NOT NULL,
            `status` int(2) unsigned NOT NULL,
            `opening_date` datetime NOT NULL,
            `closing_date` datetime NOT NULL,
            PRIMARY KEY  (`id_wkpos_register`)
        ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
        'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'wkpos_register_order` (
            `id_wkpos_register_order` int(10) unsigned NOT NULL auto_increment,
            `id_wkpos_register` int(10) unsigned NOT NULL,
            `id_wkpos_order` int(10) unsigned NOT NULL,
            `id_wkpos_user` int(10) unsigned NOT NULL,
            PRIMARY KEY  (`id_wkpos_register_order`)
        ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
        'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . "wkpos_user` (
            `id_wkpos_user` int(10) unsigned NOT NULL auto_increment,
            `name` varchar(50) NOT NULL,
            `active` int(2) unsigned NOT NULL,
            `id_employee` int(10) unsigned NULL,
            `deleted` tinyint(1) unsigned NOT NULL DEFAULT '0',
            `date_add` datetime NOT NULL,
            `date_upd` datetime NOT NULL,
            PRIMARY KEY  (`id_wkpos_user`)
        ) ENGINE=" . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
    ];
    $db = Db::getInstance();
    $success = true;
    foreach ($queries as $query) {
        $success &= $db->execute($query);
    }
    $hooks = [
        'displayAdminProductsOptionsStepTop',
        'actionProductUpdate',
    ];
    $module->registerHook($hooks);
    $module->setConfigurationVariable();

    return true;
}
