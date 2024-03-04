<?php

$sql = array();

$sql[] = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'posreprintlog`';

foreach ($sql as $query)
    if (Db::getInstance(_PS_USE_SQL_SLAVE_)->execute($query) == false)
        return false;
