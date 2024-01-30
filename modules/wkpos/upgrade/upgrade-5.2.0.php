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

function upgrade_module_5_2_0($module)
{
    $queries = [
        'ALTER TABLE `' . _DB_PREFIX_ . 'wkpos_outlets`
        ADD `id_shop` INT(10) UNSIGNED NULL DEFAULT NULL AFTER `active`',

        'ALTER TABLE `' . _DB_PREFIX_ . 'wkpos_outlet_product`
        ADD `id_shop` INT(10) UNSIGNED NULL DEFAULT NULL AFTER `active`',

        'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'wkpos_custom_product` (
            `id_wkpos_custom_product` int(10) unsigned NOT NULL auto_increment,
            `id_wkpos_outlet` int(10) unsigned NOT NULL,
            `id_product` int(10) unsigned NOT NULL,
            `id_cart` int(10) unsigned NOT NULL,
            `date_add` datetime NOT NULL,
            `date_upd` datetime NOT NULL,
            PRIMARY KEY (`id_wkpos_custom_product`)
        ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',

        'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . "wkpos_custom_pos_values` (
            `id_wkpos_custom_pos_values` int(10) unsigned NOT NULL auto_increment,
            `id_product` int(10) unsigned NOT NULL,
            `online_sale_allow` tinyint(2) NOT NULL DEFAULT '1',
            `pos_sale_allow` tinyint(2) NOT NULL DEFAULT '1',
            PRIMARY KEY  (`id_wkpos_custom_pos_values`)
        ) ENGINE=" . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
    ];
    $db = Db::getInstance();
    $success = true;
    foreach ($queries as $query) {
        $success &= $db->execute($query);
    }
    $hooks = [
        'actionProductSave',
        'displayAdminProductsOptionsStepBottom',
        'actionAdminLoginControllerLoginBefore',
        'actionProductUpdate',
    ];
    $module->registerHook($hooks);
    $module->installCustomProductCategory();

    return true;
}
