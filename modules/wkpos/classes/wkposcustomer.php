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
class WkPosCustomer
{
    /**
     * Get address by customer Id
     *
     * @param [int] $idCustomers
     *
     * @return array of customer addresses
     */
    public static function getCustomerAddresses($idCustomers)
    {
        $shareOrder = (bool) Context::getContext()->shop->getGroup()->share_order;
        $addresses = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(
            'SELECT DISTINCT a.*, cl.`name` AS country, c.`active`, s.name AS state, s.iso_code AS state_iso
            FROM `' . _DB_PREFIX_ . 'address` a
            LEFT JOIN `' . _DB_PREFIX_ . 'country` c ON (a.`id_country` = c.`id_country`)
            LEFT JOIN `' . _DB_PREFIX_ . 'country_lang` cl ON (c.`id_country` = cl.`id_country`)
            LEFT JOIN `' . _DB_PREFIX_ . 'state` s ON (s.`id_state` = a.`id_state`)
            ' . ($shareOrder ? '' : Shop::addSqlAssociation('country', 'c')) . '
            WHERE `id_customer` = ' . (int) $idCustomers . ' AND a.`deleted` = 0' .
            ' GROUP By `id_address`'
        );
        $finalArray = [];
        foreach ($addresses as $address) {
            $posPhone = WkPosCustomerPhone::getCustomerPhone((int) $idCustomers);
            if ($posPhone) {
                $address['pos_phone'] = $posPhone;
            } else {
                $address['pos_phone'] = '';
            }
            $finalArray[] = $address;
        }

        return $finalArray;
    }

    /**
     * Get the outlet addeess based on idAddress
     *
     * @param [int] $idAddress
     *
     * @return array of address details
     */
    public static function getOutletAddress($idAddress)
    {
        $shareOrder = (bool) Context::getContext()->shop->getGroup()->share_order;

        return Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow(
            'SELECT DISTINCT a.*, cl.`name` AS country, c.`active`, s.name AS state, s.iso_code AS state_iso
            FROM `' . _DB_PREFIX_ . 'address` a
            LEFT JOIN `' . _DB_PREFIX_ . 'country` c ON (a.`id_country` = c.`id_country`)
            LEFT JOIN `' . _DB_PREFIX_ . 'country_lang` cl ON (c.`id_country` = cl.`id_country`)
            LEFT JOIN `' . _DB_PREFIX_ . 'state` s ON (s.`id_state` = a.`id_state`)
            ' . ($shareOrder ? '' : Shop::addSqlAssociation('country', 'c')) . '
            WHERE `id_address` = ' . (int) $idAddress . ' AND a.`deleted` = 0'
        );
    }

    /**
     * Search customer by name from pos customer group
     *
     * @param [string] $query
     * @param [int] $idGroup
     * @param [int] $limit
     *
     * @return array of customers
     */
    public static function searchByName($query, $idGroup, $limit = null)
    {
        $sql = 'SELECT c.*
                FROM `' . _DB_PREFIX_ . 'customer` c
                LEFT JOIN `' . _DB_PREFIX_ . 'customer_group` cg
                ON (cg.`id_customer` = c.`id_customer`)';
        if ($idGroup) {
            $sql .= 'WHERE cg.`id_group` = ' . (int) $idGroup;
        }
        $searchItems = explode(' ', $query);
        $researchFields = ['c.`id_customer`', 'firstname', 'lastname', 'email'];

        $items = [];
        foreach ($researchFields as $field) {
            foreach ($searchItems as $item) {
                $items[$item][] = $field . ' LIKE \'%' . pSQL($item) . '%\' ';
            }
        }

        foreach ($items as $likes) {
            if ($idGroup) {
                $sql .= ' AND (' . implode(' OR ', $likes) . ') ';
            } else {
                $sql .= ' WHERE (' . implode(' OR ', $likes) . ') ';
            }
        }

        if ($limit) {
            $sql .= ' LIMIT 0, ' . (int) $limit;
        }

        return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
    }

    public static function formatCustomerDetail($customers)
    {
        $customerDetails = [];
        foreach ($customers as $customer) {
            $idCustomer = $customer['id_customer'];
            $objCustomer = new Customer((int) $idCustomer);
            $customerDetails[$idCustomer]['id_customer'] = $idCustomer;
            $customerDetails[$idCustomer]['email'] = $customer['email'];
            $customerDetails[$idCustomer]['birthday'] = $objCustomer->birthday;
            $customerDetails[$idCustomer]['newsletter'] = $objCustomer->newsletter;
            $customerDetails[$idCustomer]['name'] = $customer['firstname'] . ' ' . $customer['lastname'];
            $customerDetails[$idCustomer]['first_name'] = $customer['firstname'];
            $customerDetails[$idCustomer]['last_name'] = $customer['lastname'];
            $customerDetails[$idCustomer]['addresses'] = self::getCustomerAddresses($idCustomer);
            $customerDetails[$idCustomer]['group'] = Customer::getGroupsStatic($idCustomer);
            $customerDetails[$idCustomer]['default_group'] = Customer::getDefaultGroupId($idCustomer);
            $customerDetails[$idCustomer]['id_gender'] = $objCustomer->id_gender;
            $customerDetails[$idCustomer]['vouchers'] = [];
            $customerDetails[$idCustomer]['customer_phone'] = WkPosCustomerPhone::getCustomerPhone($objCustomer->id);
            // $customerDetails[$idCustomer]['vouchers'] = $this->getVouchers(
            //     $idCustomer,
            //     $this->context->language->id
            // );
        }

        return $customerDetails;
    }

    public static function getCustomers($only_active = null, $idCustomer = false)
    {
        $limit = trim(Tools::getValue('limit'));
        if ($limit) {
            $page = trim(Tools::getValue('page'));
            $page = (int) $page;
            $startLimit = $page * $limit;
        }
        $sql = 'SELECT `id_customer`, `email`, `firstname`, `lastname`
				FROM `' . _DB_PREFIX_ . 'customer`
				WHERE 1 ' . Shop::addSqlRestriction(Shop::SHARE_CUSTOMER) .
                ($only_active ? ' AND `active` = 1' : '');
        if ($idCustomer) {
            $sql .= ' AND `id_customer` =' . (int) $idCustomer;
        }
        $sql .= ' ORDER BY `id_customer` ASC';
        if (!$idCustomer && $limit) {
            $sql .= ' LIMIT ' . (int) $startLimit . ',' . (int) $limit;
        }
        if ($idCustomer) {
            return Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow($sql);
        } else {
            return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
        }
    }

    public function getCustomerByKey($key)
    {
        $sql = 'SELECT c.* FROM `' . _DB_PREFIX_ . 'customer` c';
        $sql .= ' WHERE c.`firstname` LIKE \'%' . pSQL($key) . '%\'
            OR c.`lastname` LIKE \'%' . pSQL($key) . '%\'';
        $sql .= ' OR c.`email` LIKE \'%' . pSQL($key) . '%\'';

        return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
    }
}
