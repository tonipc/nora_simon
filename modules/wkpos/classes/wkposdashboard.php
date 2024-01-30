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
class WkPosDashboard
{
    /**
     * Get the total sale of the shop
     *
     * @param date $dateFrom
     * @param date $dateTo
     * @param bool $granularity
     *
     * @return array
     */
    public static function getPosSales($dateFrom, $dateTo, $idOutlet = false, $granularity = false)
    {
        $idOrders = static::getPosIdOrder($idOutlet);
        $result = [];
        if ($idOrders) {
            foreach ($idOrders as $key => $value) {
                $result[$key] = $value['id_order'];
            }
            $idOrders = implode(',', $result);
            $sales = [];
            $sql = 'SELECT';
            if ($granularity == 'day') {
                $sql .= ' LEFT(`invoice_date`, 10) as date,';
            }
            if ($granularity == 'month') {
                $sql .= ' LEFT(`invoice_date`, 7) as date,';
            }
            $sql .= ' SUM(total_products / o.conversion_rate) as sales
                FROM `' . _DB_PREFIX_ . 'orders` o
                LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON o.current_state = os.id_order_state
                WHERE `invoice_date` BETWEEN "' . pSQL($dateFrom) . ' 00:00:00" AND "' . pSQL($dateTo) . ' 23:59:59"
                AND os.logable = 1
                AND o.`id_order` IN(' . pSQL($idOrders) . ')' . Shop::addSqlRestriction(false, 'o');
            if ($granularity == 'day') {
                $sql .= ' GROUP BY LEFT(`invoice_date`, 10)';
            }
            if ($granularity == 'month') {
                $sql .= ' GROUP BY LEFT(`invoice_date`, 7)';
            }
            $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
            if ($granularity != 'day' && $granularity != 'month') {
                return $result;
            }
            foreach ($result as $row) {
                if ($granularity == 'day') {
                    $sales[strtotime($row['date'])] = $row['sales'];
                }
                if ($granularity == 'month') {
                    $sales[strtotime($row['date'] . '-01')] = $row['sales'];
                }
            }

            return $sales;
        }
    }

    public static function getPosSalesRefund($dateFrom, $dateTo, $idOutlet = false, $granularity = false)
    {
        $idOrders = static::getPosIdOrder($idOutlet);
        $result = [];
        if ($idOrders) {
            foreach ($idOrders as $key => $value) {
                $result[$key] = $value['id_order'];
            }
            $idOrders = implode(',', $result);
            $sales = [];
            $sql = 'SELECT';
            if ($granularity == 'day') {
                $sql .= ' LEFT(`date_add`, 10) as date,';
            }
            if ($granularity == 'month') {
                $sql .= ' LEFT(`date_add`, 7) as date,';
            }
            $sql .= ' SUM(od.total_refunded_tax_excl) as sales_refunded
                FROM `' . _DB_PREFIX_ . 'orders` o
                LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON o.current_state = os.id_order_state
                LEFT JOIN `' . _DB_PREFIX_ . 'order_detail` od ON o.id_order = od.id_order
                WHERE `date_add` BETWEEN "' . pSQL($dateFrom) . ' 00:00:00" AND "' . pSQL($dateTo) . ' 23:59:59"
                AND os.logable = 1 AND od.product_quantity_refunded > 0 AND od.total_refunded_tax_excl > 0
                AND o.`id_order` IN(' . pSQL($idOrders) . ')' . Shop::addSqlRestriction(false, 'o');
            if ($granularity == 'day') {
                $sql .= ' GROUP BY LEFT(`date_add`, 10)';
            }
            if ($granularity == 'month') {
                $sql .= ' GROUP BY LEFT(`date_add`, 7)';
            }
            $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
            if ($granularity != 'day' && $granularity != 'month') {
                return $result;
            }
            foreach ($result as $row) {
                if ($granularity == 'day') {
                    $sales[strtotime($row['date'])] = $row['sales_refunded'];
                }
                if ($granularity == 'month') {
                    $sales[strtotime($row['date'] . '-01')] = $row['sales_refunded'];
                }
            }

            return $sales;
        }
    }

    public static function getWebSales($dateFrom, $dateTo, $granularity = false)
    {
        $idOrders = static::getWebIdOrder();
        $result = [];
        if ($idOrders) {
            foreach ($idOrders as $key => $value) {
                $result[$key] = $value['id_order'];
            }
            $idOrders = implode(',', $result);
            $sales = [];
            $sql = 'SELECT';
            if ($granularity == 'day') {
                $sql .= ' LEFT(`date_add`, 10) as date,';
            }
            if ($granularity == 'month') {
                $sql .= ' LEFT(`date_add`, 7) as date,';
            }
            $sql .= ' SUM(total_products / o.conversion_rate) as sales
                FROM `' . _DB_PREFIX_ . 'orders` o
                LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON o.current_state = os.id_order_state
                WHERE `date_add` BETWEEN "' . pSQL($dateFrom) . ' 00:00:00" AND "' . pSQL($dateTo) . ' 23:59:59"
                AND os.logable = 1
                AND o.`id_order` IN(' . pSQL($idOrders) . ')' . Shop::addSqlRestriction(false, 'o');
            if ($granularity == 'day') {
                $sql .= ' GROUP BY LEFT(`date_add`, 10)';
            }
            if ($granularity == 'month') {
                $sql .= ' GROUP BY LEFT(`date_add`, 7)';
            }
            $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
            if ($granularity != 'day' && $granularity != 'month') {
                return $result;
            }
            foreach ($result as $row) {
                if ($granularity == 'day') {
                    $sales[strtotime($row['date'])] = $row['sales'];
                }
                if ($granularity == 'month') {
                    $sales[strtotime($row['date'] . '-01')] = $row['sales'];
                }
            }

            return $sales;
        }
    }

    public static function getWebSalesRefund($dateFrom, $dateTo, $granularity = false)
    {
        $idOrders = static::getWebIdOrder();
        $result = [];
        if ($idOrders) {
            foreach ($idOrders as $key => $value) {
                $result[$key] = $value['id_order'];
            }
            $idOrders = implode(',', $result);
            $sales = [];
            $sql = 'SELECT';
            if ($granularity == 'day') {
                $sql .= ' LEFT(`date_add`, 10) as date,';
            }
            if ($granularity == 'month') {
                $sql .= ' LEFT(`date_add`, 7) as date,';
            }
            $sql .= ' SUM(od.total_refunded_tax_excl) as sales
                FROM `' . _DB_PREFIX_ . 'orders` o
                LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON o.current_state = os.id_order_state
                LEFT JOIN `' . _DB_PREFIX_ . 'order_detail` od ON o.id_order = od.id_order
                WHERE `date_add` BETWEEN "' . pSQL($dateFrom) . ' 00:00:00" AND "' . pSQL($dateTo) . ' 23:59:59"
                AND os.logable = 1 AND od.product_quantity_refunded > 0 AND od.total_refunded_tax_excl > 0
                AND o.`id_order` IN(' . pSQL($idOrders) . ')' . Shop::addSqlRestriction(false, 'o');
            if ($granularity == 'day') {
                $sql .= ' GROUP BY LEFT(`date_add`, 10)';
            }
            if ($granularity == 'month') {
                $sql .= ' GROUP BY LEFT(`date_add`, 7)';
            }
            $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
            if ($granularity != 'day' && $granularity != 'month') {
                return $result;
            }
            foreach ($result as $row) {
                if ($granularity == 'day') {
                    $sales[strtotime($row['date'])] = $row['sales'];
                }
                if ($granularity == 'month') {
                    $sales[strtotime($row['date'] . '-01')] = $row['sales'];
                }
            }

            return $sales;
        }
    }

    /**
     * Get the total order of the shop
     *
     * @param date $dateFrom
     * @param date $dateTo
     * @param bool $granularity
     *
     * @return array
     */
    public static function getPosOrders($dateFrom, $dateTo, $idOutlet = false, $granularity = false)
    {
        $idOrders = static::getPosIdOrder($idOutlet);
        if ($idOrders) {
            $result = [];
            foreach ($idOrders as $key => $value) {
                $result[$key] = $value['id_order'];
            }
            $idOrders = implode(',', $result);

            $orders = [];
            $sql = 'SELECT';
            if ($granularity == 'day') {
                $sql .= ' LEFT(`invoice_date`, 10) as date,';
            }
            if ($granularity == 'month') {
                $sql .= ' LEFT(`invoice_date`, 7) as date,';
            }
            $sql .= ' COUNT(*) as orders
                FROM `' . _DB_PREFIX_ . 'orders` o
                LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON o.current_state = os.id_order_state
                WHERE `invoice_date` BETWEEN "' . pSQL($dateFrom) . ' 00:00:00" AND
                "' . pSQL($dateTo) . ' 23:59:59" AND os.logable = 1
                AND o.`id_order` IN(' . pSQL($idOrders) . ')' . Shop::addSqlRestriction(false, 'o');
            if ($granularity == 'day') {
                $sql .= ' GROUP BY LEFT(`invoice_date`, 10)';
            }
            if ($granularity == 'month') {
                $sql .= ' GROUP BY LEFT(`invoice_date`, 7)';
            }
            $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
            if ($granularity != 'month' && $granularity != 'day') {
                return $result;
            }
            foreach ($result as $row) {
                if ($granularity == 'day') {
                    $orders[strtotime($row['date'])] = $row['orders'];
                }
                if ($granularity == 'month') {
                    $orders[strtotime($row['date'] . '-01')] = $row['orders'];
                }
            }

            return $orders;
        }
    }

    public static function getPosIdOrder($idOutlet)
    {
        $sql = 'SELECT `id_order` FROM `' . _DB_PREFIX_ . 'wkpos_order` wkor';
        if ($idOutlet) {
            $sql .= ' LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlets` wko' .
            ' ON (wkor.`id_wkpos_outlet` = wko.`id_wkpos_outlet`)' .
            ' WHERE wko.`id_wkpos_outlet` = ' . (int) $idOutlet;
        }

        return Db::getInstance()->executeS($sql);
    }

    /**
     * Get the total purchases of the shop
     *
     * @param date $dateFrom
     * @param date $dateTo
     * @param bool $granularity
     *
     * @return array
     */
    public static function getPosPurchases($dateFrom, $dateTo, $idOutlet = false, $granularity = false)
    {
        $idOrders = static::getPosIdOrder($idOutlet);
        if ($idOrders) {
            $result = [];
            foreach ($idOrders as $key => $value) {
                $result[$key] = $value['id_order'];
            }
            $idOrders = implode(',', $result);

            $sql = 'SELECT';
            if ($granularity == 'day') {
                $sql .= ' LEFT(`invoice_date`, 10) as date,';
            }
            $sql .= ' SUM(od.`product_quantity` * IF(
                od.`purchase_supplier_price` > 0,
                od.`purchase_supplier_price` / `conversion_rate`,
                od.`original_product_price` * ' . (int) Configuration::get('CONF_AVERAGE_PRODUCT_MARGIN') . ' / 100
                )) as total_purchase_price
                FROM `' . _DB_PREFIX_ . 'orders` o
                LEFT JOIN `' . _DB_PREFIX_ . 'order_detail` od ON o.id_order = od.id_order
                LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON o.current_state = os.id_order_state
                WHERE `invoice_date` BETWEEN "' . pSQL($dateFrom) . ' 00:00:00" AND
                "' . pSQL($dateTo) . ' 23:59:59" AND os.logable = 1
                AND o.`id_order` IN(' . pSQL($idOrders) . ')' . Shop::addSqlRestriction(false, 'o');
            if ($granularity == 'day') {
                $sql .= ' GROUP BY LEFT(`invoice_date`, 10)';
            }

            $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
            if ($granularity == 'day') {
                $purchases = [];
                foreach ($result as $row) {
                    $purchases[strtotime($row['date'])] = $row['total_purchase_price'];
                }

                return $purchases;
            } else {
                return $result;
            }
        }
    }

    /**
     * Get the total expenses of the shop
     *
     * @param date $dateFrom
     * @param date $dateTo
     * @param bool $granularity
     *
     * @return array
     */
    public static function getPosExpenses($dateFrom, $dateTo, $idOutlet = false, $granularity = false)
    {
        $idOrders = static::getPosIdOrder($idOutlet);
        if ($idOrders) {
            $result = [];
            foreach ($idOrders as $key => $value) {
                $result[$key] = $value['id_order'];
            }
            $idOrders = implode(',', $result);
            $expenses = ($granularity == 'day' ? [] : 0);

            $orders = Db::getInstance()->executeS(
                'SELECT
                LEFT(o.`invoice_date`, 10) as date,
                total_paid_tax_incl / o.`conversion_rate` as total_paid_tax_incl,
                total_shipping_tax_excl / o.`conversion_rate` as total_shipping_tax_excl,
                o.`module`,
                a.`id_country`,
                o.`id_currency`,
                c.`id_reference` as carrier_reference
                FROM `' . _DB_PREFIX_ . 'orders` o
                LEFT JOIN `' . _DB_PREFIX_ . 'address` a ON o.`id_address_delivery` = a.`id_address`
                LEFT JOIN `' . _DB_PREFIX_ . 'carrier` c ON o.`id_carrier` = c.`id_carrier`
                LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON o.`current_state` = os.`id_order_state`
                WHERE o.`invoice_date` BETWEEN "' . pSQL($dateFrom) . ' 00:00:00" AND
                "' . pSQL($dateTo) . ' 23:59:59" AND os.logable = 1
                AND o.`id_order` IN(' . pSQL($idOrders) . ')' . Shop::addSqlRestriction(false, 'o')
            );
            foreach ($orders as $order) {
                // Add flat fees for this order
                $flatFees = Configuration::get('CONF_ORDER_FIXED') + (
                    $order['id_currency'] == Configuration::get('PS_CURRENCY_DEFAULT')
                        ? Configuration::get('CONF_' . Tools::strtoupper($order['module']) . '_FIXED')
                        : Configuration::get('CONF_' . Tools::strtoupper($order['module']) . '_FIXED_FOREIGN')
                );

                // Add variable fees for this order
                $varFees = $order['total_paid_tax_incl'] * (
                    $order['id_currency'] == Configuration::get('PS_CURRENCY_DEFAULT')
                        ? Configuration::get('CONF_' . Tools::strtoupper($order['module']) . '_VAR')
                        : Configuration::get('CONF_' . Tools::strtoupper($order['module']) . '_VAR_FOREIGN')
                ) / 100;

                // Add shipping fees for this order
                $shippingFees = $order['total_shipping_tax_excl'] * (
                    $order['id_country'] == Configuration::get('PS_COUNTRY_DEFAULT')
                        ? Configuration::get('CONF_' . Tools::strtoupper($order['carrier_reference']) . '_SHIP')
                        : Configuration::get('CONF_' . Tools::strtoupper($order['carrier_reference']) . '_SHIP_OVERSEAS')
                ) / 100;

                // Tally up these fees
                if ($granularity == 'day') {
                    if (!isset($expenses[strtotime($order['date'])])) {
                        $expenses[strtotime($order['date'])] = 0;
                    }
                    $expenses[strtotime($order['date'])] += $flatFees + $varFees + $shippingFees;
                } else {
                    $expenses += $flatFees + $varFees + $shippingFees;
                }
            }

            return $expenses;
        }
    }

    /**
     * get top cashier details
     *
     * @return array - cashier details
     */
    public static function getTopCashier()
    {
        return Db::getInstance()->executeS(
            'SELECT poso.`id_wkpos_outlet_employee`,  COUNT(*) as orders,
            SUM(o.`total_paid_tax_excl` / o.`conversion_rate`) AS sales
            FROM `' . _DB_PREFIX_ . 'wkpos_order` poso
            LEFT JOIN `' . _DB_PREFIX_ . 'orders` o ON o.`id_order` = poso.`id_order`
            GROUP BY `id_wkpos_outlet_employee`
            ORDER BY SUM(o.`total_paid_tax_excl` / o.`conversion_rate`) DESC'
        );
    }

    /**
     * get top selling product details
     *
     * @return array - top selling product details
     */
    public static function topSellingProduct()
    {
        return Db::getInstance()->executeS(
            'SELECT od.`product_id`,  od.`product_name`,
            SUM(od.`product_quantity`) AS quantity
            FROM `' . _DB_PREFIX_ . 'wkpos_order` poso
            LEFT JOIN `' . _DB_PREFIX_ . 'order_detail` od ON od.`id_order` = poso.`id_order`
            GROUP BY od.`product_id`
            ORDER BY SUM(od.`product_quantity`) DESC'
        );
    }

    public static function getTotalSalesRefund($date_from, $date_to, $granularity = false)
    {
        if ($granularity == 'day') {
            $sales = [];
            $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(
                '
			SELECT LEFT(`invoice_date`, 10) AS date, SUM(od.total_refunded_tax_excl) AS sales
			FROM `' . _DB_PREFIX_ . 'orders` o
			LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON o.current_state = os.id_order_state
            LEFT JOIN `' . _DB_PREFIX_ . 'order_detail` od ON o.id_order = od.id_order
			WHERE `invoice_date` BETWEEN "' . pSQL($date_from) . ' 00:00:00" AND "' . pSQL($date_to) . ' 23:59:59" AND os.logable = 1 AND od.product_quantity_refunded > 0 AND od.total_refunded_tax_excl > 0
			' . Shop::addSqlRestriction(false, 'o') . '
			GROUP BY LEFT(`invoice_date`, 10)'
            );
            foreach ($result as $row) {
                $sales[strtotime($row['date'])] = $row['sales'];
            }

            return $sales;
        } elseif ($granularity == 'month') {
            $sales = [];
            $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(
                '
			SELECT LEFT(`invoice_date`, 7) AS date, SUM(od.total_refunded_tax_excl) AS sales
			FROM `' . _DB_PREFIX_ . 'orders` o
			LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON o.current_state = os.id_order_state
            LEFT JOIN `' . _DB_PREFIX_ . 'order_detail` od ON o.id_order = od.id_order
			WHERE `invoice_date` BETWEEN "' . pSQL($date_from) . ' 00:00:00" AND "' . pSQL($date_to) . ' 23:59:59" AND os.logable = 1 AND od.product_quantity_refunded > 0 AND od.total_refunded_tax_excl > 0
			' . Shop::addSqlRestriction(false, 'o') . '
			GROUP BY LEFT(`invoice_date`, 7)'
            );
            foreach ($result as $row) {
                $sales[strtotime($row['date'] . '-01')] = $row['sales'];
            }

            return $sales;
        } else {
            return Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue(
                '
			SELECT SUM(od.total_refunded_tax_excl)
			FROM `' . _DB_PREFIX_ . 'orders` o
			LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON o.current_state = os.id_order_state
            LEFT JOIN `' . _DB_PREFIX_ . 'order_detail` od ON o.id_order = od.id_order
			WHERE `invoice_date` BETWEEN "' . pSQL($date_from) . ' 00:00:00" AND "' . pSQL($date_to) . ' 23:59:59" AND os.logable = 1 AND od.product_quantity_refunded > 0 AND od.total_refunded_tax_excl > 0
			' . Shop::addSqlRestriction(false, 'o')
            );
        }
    }
}
