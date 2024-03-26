<?php

$sql = array();

$sql[] = '
	CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'posreprintlog` (
	  `id` int(10) NOT NULL AUTO_INCREMENT,
	  `email` varchar(255) NOT NULL,
	  `order_reference` varchar(9) NOT NULL,
	  `id_order` int(10) NOT NULL,
	  `date_add` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	  PRIMARY KEY (`id`)
	) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8;
';

foreach ($sql as $query)
	if (Db::getInstance(_PS_USE_SQL_SLAVE_)->execute($query) == false)
		return false;
