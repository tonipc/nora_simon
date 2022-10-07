<?php

namespace Module\NoraInventory\Classes;

use Db;
use PrestaShopLogger as Logger;

class InstallTables implements InstallInterface
{
    private static function exec($sql)
    {
        foreach ($sql as $query) {
            if (Db::getInstance()->execute($query) == false) {
                $message = $sql('Error while trying to install table: ' . $sql);
                Logger::AddLog($message);
            }
        }
    }

    public static function uninstall()
    {
        /*
        $sql = [];

        $sql[] = 'DROP TABLE IF EXISTS ' . _DB_PREFIX_ . 'product_stock_date;';

        $sql[] = 'DROP TABLE IF EXISTS ' . _DB_PREFIX_ . 'product_step;';
        $sql[] = 'DROP TABLE IF EXISTS ' . _DB_PREFIX_ . 'product_step_lang;';

        $sql[] = 'DROP TABLE IF EXISTS ' . _DB_PREFIX_ . 'product_step_pack;';
        $sql[] = 'DROP TABLE IF EXISTS ' . _DB_PREFIX_ . 'product_step_pack_lang;';

        self::exec($sql);
        */
        return true;
    }

    public static function install()
    {
        $sql = [];

        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_stock_date`(
            `id_product_stock_date` int(10) unsigned NOT NULL auto_increment,
            `id_product` int(10) unsigned NOT NULL,
            `id_product_attribute` int(10) unsigned DEFAULT NULL,
            `available_date` date DEFAULT NULL,
            `quantity` int(10) unsigned NOT NULL DEFAULT 1,
            `date_add` datetime NOT NULL,
            `date_upd` datetime NOT NULL,
            PRIMARY KEY (`id_product_stock_date`),
            KEY `id_product` (`id_product`),
            KEY `id_product_attribute` (`id_product_attribute`),
            KEY `available_date` (`available_date`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        // ProductStepPack
        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_step_pack`(
            `id_product_step_pack` int(10) unsigned NOT NULL auto_increment,
            `id_shop` int(10) unsigned NOT NULL DEFAULT 1,
            `type` ENUM("product_pack", "cart_rule"),
            `position` int(10) unsigned NOT NULL DEFAULT 0,
            `reduction_amount` float NOT NULL DEFAULT 0,
            `reduction_percent` float NOT NULL DEFAULT 0,
            `price` decimal(20, 6) NOT NULL DEFAULT "0.000000",
            `id_tax_rules_group` int(10) unsigned NOT NULL DEFAULT 0,
            `active` tinyint(1) unsigned NOT NULL DEFAULT "0",
            `upselling` tinyint(1) unsigned NOT NULL DEFAULT "1",
            `date_add` datetime NOT NULL,
            `date_upd` datetime NOT NULL,
            PRIMARY KEY (`id_product_step_pack`, `id_shop`),
            KEY `id_shop` (`id_shop`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_step_pack_lang`(
            `id_product_step_pack` int(10) unsigned NOT NULL,
            `id_lang` int(10) unsigned NOT NULL,
            `name` varchar(128) NOT NULL,
            `description_short` text NOT NULL DEFAULT "",
            `description` text NOT NULL DEFAULT "",
            PRIMARY KEY (`id_product_step_pack`, `id_lang`),
            KEY `id_lang` (`id_lang`),
            KEY `name` (`name`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_step_pack_group`(
            `id_product_step_pack` int(10) unsigned NOT NULL,
            `id_group` int(10) unsigned NOT NULL,
            PRIMARY KEY (`id_product_step_pack`, `id_group`),
            KEY `id_group` (`id_group`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        // ProductStep
        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_step`(
            `id_product_step` int(10) unsigned NOT NULL auto_increment,
            `id_shop` int(10) unsigned NOT NULL DEFAULT 1,
            `position` int(10) unsigned NOT NULL DEFAULT 0,
            `active` tinyint(1) unsigned NOT NULL DEFAULT "0",
            `date_add` datetime NOT NULL,
            `date_upd` datetime NOT NULL,
            PRIMARY KEY (`id_product_step`, `id_shop`),
            KEY `id_shop` (`id_shop`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_step_lang`(
            `id_product_step` int(10) unsigned NOT NULL,
            `id_lang` int(10) unsigned NOT NULL,
            `name` varchar(128) NOT NULL,
            `description_short` text NOT NULL DEFAULT "",
            `description` text NOT NULL DEFAULT "",
            PRIMARY KEY (`id_product_step`, `id_lang`),
            KEY `id_lang` (`id_lang`),
            KEY `name` (`name`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_step_category`(
            `id_product_step` int(10) unsigned NOT NULL,
            `id_category` int(10) unsigned NOT NULL,
            PRIMARY KEY (`id_product_step`, `id_category`),
            KEY `id_category` (`id_category`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_step_attribute`(
            `id_product_step` int(10) unsigned NOT NULL,
            `id_attribute` int(10) unsigned NOT NULL,
            PRIMARY KEY (`id_product_step`, `id_attribute`),
            KEY `id_attribute` (`id_attribute`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        // ProductStepOption
        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_step_pack_option`(
            `id_product_step_pack_option` int(10) unsigned NOT NULL auto_increment,
            `id_shop` int(10) unsigned NOT NULL DEFAULT 1,
            `id_product_step_pack` int(10) unsigned NOT NULL,
            `position` int(10) unsigned NOT NULL DEFAULT 0,
            `active` tinyint(1) unsigned NOT NULL DEFAULT "0",
            `date_add` datetime NOT NULL,
            `date_upd` datetime NOT NULL,
            PRIMARY KEY (`id_product_step_pack_option`, `id_product_step_pack`, `id_shop`),
            KEY `id_shop` (`id_shop`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_step_pack_option_lang`(
            `id_product_step_pack_option` int(10) unsigned NOT NULL,
            `id_lang` int(10) unsigned NOT NULL,
            `name` varchar(128) NOT NULL,
            `description_short` text NOT NULL DEFAULT "",
            `description` text NOT NULL DEFAULT "",
            PRIMARY KEY (`id_product_step_pack_option`, `id_lang`),
            KEY `id_lang` (`id_lang`),
            KEY `name` (`name`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        // ProductStepOptionStep
        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_step_pack_option_step`(
            `id_product_step_pack_option_step` int(10) unsigned NOT NULL auto_increment,
            `id_shop` int(10) unsigned NOT NULL DEFAULT 1,
            `id_product_step_pack_option` int(10) unsigned NOT NULL,
            `id_product_step` int(10) unsigned NOT NULL,
            `quantity` int(10) NOT NULL DEFAULT 1,
            `position` int(10) unsigned NOT NULL DEFAULT 0,
            `active` tinyint(1) unsigned NOT NULL DEFAULT "0",
            `date_add` datetime NOT NULL,
            `date_upd` datetime NOT NULL,
            PRIMARY KEY (`id_product_step_pack_option_step`, `id_product_step_pack_option`, `id_shop`),
            KEY `id_shop` (`id_shop`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'product_step_pack_option_step_lang`(
            `id_product_step_pack_option_step` int(10) unsigned NOT NULL,
            `id_lang` int(10) unsigned NOT NULL,
            `name` varchar(128) NOT NULL,
            `description_short` text NOT NULL DEFAULT "",
            `description` text NOT NULL DEFAULT "",
            PRIMARY KEY (`id_product_step_pack_option_step`, `id_lang`),
            KEY `id_lang` (`id_lang`),
            KEY `name` (`name`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'order_detail_status`(
            `id_order_detail_status` int(10) unsigned NOT NULL auto_increment,
            `id_order_detail` int(10) unsigned NOT NULL,
            `printed` tinyint(1) unsigned NOT NULL DEFAULT "0",
            PRIMARY KEY (`id_order_detail_status`, `id_order_detail`)
        ) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET = utf8;';

        self::exec($sql);

        return true;
    }
}
