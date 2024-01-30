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
class WkPosDb
{
    public function createTables()
    {
        if ($sql = $this->getModuleSql()) {
            foreach ($sql as $query) {
                if ($query) {
                    if (!Db::getInstance()->execute(trim($query))) {
                        return false;
                    }
                }
            }
        }
        if ($sql = $this->getCashRegisterSql()) {
            foreach ($sql as $query) {
                if ($query) {
                    if (!Db::getInstance()->execute(trim($query))) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    public function getModuleSql()
    {
        return [
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . "wkpos_order` (
                `id_wkpos_order` int(10) unsigned NOT NULL auto_increment,
                `id_order` int(10) NOT NULL,
                `reference` varchar(9) NOT NULL,
                `offline_reference` varchar(10) NOT NULL,
                `active` tinyint(2) NOT NULL DEFAULT '1',
                `id_wkpos_outlet_employee` int(10) NOT NULL,
                -- `tendered` decimal(20,6),
                -- `change` decimal(20,6),
                `id_wkpos_outlet` int(10) NOT NULL,
                -- `id_wkpos_session` int(10) NOT NULL,
                -- `id_wkpos_payment` int(10) NOT NULL,
                `order_date` datetime NOT NULL,
                `date_upd` datetime NOT NULL,
                PRIMARY KEY  (`id_wkpos_order`)
            ) ENGINE=" . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'wkpos_payment` (
                `id_wkpos_payment` int(10) unsigned NOT NULL auto_increment,
                `name` varchar(50) NOT NULL,
                `active` tinyint(2) NOT NULL,
                `date_add` datetime NOT NULL,
                `date_upd` datetime NOT NULL,
                PRIMARY KEY  (`id_wkpos_payment`)
            ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'wkpos_outlets` (
                `id_wkpos_outlet` int(10) unsigned NOT NULL auto_increment,
                `name` varchar(50) NOT NULL,
                `id_address` int(10) unsigned NOT NULL,
                `default_currency` int(10) unsigned NOT NULL,
                `allowed_currencies` text default NULL,
                `default_language` int(10) unsigned NOT NULL,
                `allowed_languages` text default NULL,
                `id_shop` int(10) unsigned NOT NULL,
                `active` tinyint(2) NOT NULL,
                `date_add` datetime NOT NULL,
                `date_upd` datetime NOT NULL,
                PRIMARY KEY  (`id_wkpos_outlet`)
            ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'wkpos_outlet_product` (
                `id_wkpos_outlet_product` int(10) unsigned NOT NULL auto_increment,
                `id_wkpos_outlet` int(10) unsigned NOT NULL,
                `id_product` int(10) unsigned NOT NULL,
                `quantity` int(10) NOT NULL,
                `active` tinyint(2) NOT NULL,
                `id_shop` int(10) unsigned NOT NULL,
                `date_add` datetime NOT NULL,
                `date_upd` datetime NOT NULL,
                PRIMARY KEY  (`id_wkpos_outlet_product`)
            ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute` (
                `id_wkpos_outlet_product_attribute` int(10) unsigned NOT NULL auto_increment,
                `id_wkpos_outlet_product` int(10) unsigned NOT NULL,
                `id_product_attribute` int(10) unsigned NOT NULL,
                `quantity` int(10) NOT NULL,
                `date_add` datetime NOT NULL,
                `date_upd` datetime NOT NULL,
                PRIMARY KEY  (`id_wkpos_outlet_product_attribute`)
            ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . "wkpos_outlet_employee` (
                `id_wkpos_outlet_employee` int(10) unsigned NOT NULL auto_increment,
                `id_wkpos_outlet` int(10) unsigned NOT NULL,
                `id_employee` int(10) unsigned NOT NULL,
                `type` tinyint(1) NOT NULL DEFAULT '0',
                `active` tinyint(2) NOT NULL DEFAULT '1',
                `date_add` datetime NOT NULL,
                `date_upd` datetime NOT NULL,
                PRIMARY KEY  (`id_wkpos_outlet_employee`)
            ) ENGINE=" . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'wkpos_outlet_category` (
                `id_wkpos_outlet_category` int(10) unsigned NOT NULL auto_increment,
                `id_category`  text default NULL,
                `id_wkpos_outlet` int(10) unsigned NOT NULL,
                `date_add` datetime NOT NULL,
                `date_upd` datetime NOT NULL,
                PRIMARY KEY  (`id_wkpos_outlet_category`)
            ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . "wkpos_installment` (
                `id_wkpos_installment` int(10) unsigned NOT NULL auto_increment,
                `id_wkpos_order` int(10) unsigned NOT NULL,
                `amount` decimal(20, 6) NOT NULL DEFAULT '0.000000',
                `date_add` datetime NOT NULL,
                `date_upd` datetime NOT NULL,
                PRIMARY KEY  (`id_wkpos_installment`)
            ) ENGINE=" . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . "wkpos_order_payment` (
                `id_wkpos_order_payment` int(10) unsigned NOT NULL auto_increment,
                `id_wkpos_order` int(10) unsigned NOT NULL,
                `id_wkpos_payment` int(10) unsigned NOT NULL,
                `amount` decimal(20,6) NOT NULL DEFAULT '0.000000',
                `type` int(2) unsigned NOT NULL,
                PRIMARY KEY  (`id_wkpos_order_payment`)
            ) ENGINE=" . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'wkpos_customer_phone` (
                `id_wkpos_customer_phone` int(10) unsigned NOT NULL auto_increment,
                `id_customer` int(10) unsigned NOT NULL,
                `customer_phone` varchar(32) NOT NULL,
                PRIMARY KEY  (`id_wkpos_customer_phone`)
            ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'wkpos_custom_product` (
                `id_wkpos_custom_product` int(10) unsigned NOT NULL auto_increment,
                `id_wkpos_outlet` int(10) unsigned NOT NULL,
                `id_product` int(10) unsigned NOT NULL,
                `id_cart` int(10) unsigned NOT NULL,
                `date_add` datetime NOT NULL,
                `date_upd` datetime NOT NULL,
                PRIMARY KEY  (`id_wkpos_custom_product`)
            ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . "wkpos_custom_pos_values` (
                `id_wkpos_custom_pos_values` int(10) unsigned NOT NULL auto_increment,
                `id_product` int(10) unsigned NOT NULL,
                `online_sale_allow` tinyint(2) NOT NULL DEFAULT '1',
                `pos_sale_allow` tinyint(2) NOT NULL DEFAULT '1',
                PRIMARY KEY  (`id_wkpos_custom_pos_values`)
            ) ENGINE=" . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8',
        ];
    }

    public function getCashRegisterSql()
    {
        return [
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
    }

    /**
     * Delete module tables
     *
     * @return bool
     */
    public function deleteTables()
    {
        return Db::getInstance()->execute(
            'DROP TABLE IF EXISTS
            `' . _DB_PREFIX_ . 'wkpos_payment`,
            `' . _DB_PREFIX_ . 'wkpos_outlets`,
            `' . _DB_PREFIX_ . 'wkpos_outlet_product`,
            `' . _DB_PREFIX_ . 'wkpos_outlet_product_attribute`,
            `' . _DB_PREFIX_ . 'wkpos_outlet_employee`,
            `' . _DB_PREFIX_ . 'wkpos_outlet_category`,
            `' . _DB_PREFIX_ . 'wkpos_order`,
            `' . _DB_PREFIX_ . 'wkpos_order_payment`,
            `' . _DB_PREFIX_ . 'wkpos_installment`,
            `' . _DB_PREFIX_ . 'wkpos_customer_phone`,
            `' . _DB_PREFIX_ . 'wkpos_custom_pos_values`,
            `' . _DB_PREFIX_ . 'wkpos_custom_product`,
            `' . _DB_PREFIX_ . 'wkpos_cash_movement`,
            `' . _DB_PREFIX_ . 'wkpos_register`,
            `' . _DB_PREFIX_ . 'wkpos_register_order`,
            `' . _DB_PREFIX_ . 'wkpos_user`'
        );
    }
}
