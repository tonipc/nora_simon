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
class AdminWkPosDashboardController extends ModuleAdminController
{
    protected static $colors = [
        'orders' => ['#34a120', '#3677b4'],
        'sales' => ['#3777b6', '#FF7F0E'],
        'average_cart_value' => ['#e61c08', '#2CA02C'],
        'net_profits' => ['#b3591f', '#6b399c'],
    ];

    public $dateFrom;
    public $dateTo;

    public function __construct()
    {
        $this->bootstrap = true;
        $this->lang = false;
        $this->context = Context::getContext();

        parent::__construct();
        $this->toolbar_title = $this->l('Dashboard');
    }

    public function initContent()
    {
        $this->show_toolbar = false;
        $this->display = 'view';
        parent::initContent();
    }

    /**
     * get the Dashboard information accordint to the date
     *
     * @param [datetime] $dateFrom
     * @param [datetime] $dateTo
     *
     * @return void
     */
    public function getDashboardInformation($dateFrom, $dateTo)
    {
        $psData = [
            'orders' => [],
            'total_paid_tax_excl' => [],
            'total_paid_tax_excl_refund' => [],
            'total_purchases' => [],
            'total_expenses' => [],
        ];
        $posData = [
            'orders' => [],
            'total_paid_tax_excl' => [],
            'total_paid_tax_excl_refund' => [],
            'total_purchases' => [],
            'total_expenses' => [],
        ];

        $psData['orders'] = AdminStatsController::getOrders($dateFrom, $dateTo, 'day');
        $psData['total_paid_tax_excl'] = AdminStatsController::getTotalSales($dateFrom, $dateTo, 'day');
        $psData['total_paid_tax_excl_refund'] = WkPosDashboard::getTotalSalesRefund($dateFrom, $dateTo, 'day');
        $psData['total_purchases'] = AdminStatsController::getPurchases($dateFrom, $dateTo, 'day');
        $psData['total_expenses'] = AdminStatsController::getExpenses($dateFrom, $dateTo, 'day');

        $idSelectedOutlet = $this->context->cookie->WKPOS_SELECTED_OUTLET;
        $posData['orders'] = WkPosDashboard::getPosOrders($dateFrom, $dateTo, $idSelectedOutlet, 'day');
        $posData['total_paid_tax_excl'] = WkPosDashboard::getPosSales($dateFrom, $dateTo, $idSelectedOutlet, 'day');
        $posData['total_paid_tax_excl_refund'] = WkPosDashboard::getPosSalesRefund($dateFrom, $dateTo, $idSelectedOutlet, 'day');
        $posData['total_purchases'] = WkPosDashboard::getPosPurchases($dateFrom, $dateTo, $idSelectedOutlet, 'day');
        $posData['total_expenses'] = WkPosDashboard::getPosExpenses($dateFrom, $dateTo, $idSelectedOutlet, 'day');

        return ['ps' => $psData, 'pos' => $posData];
    }

    /**
     * get data for POS dashboard graph.
     *
     * @param [datetime] $dateFrom
     * @param [datetime] $dateTo
     *
     * @return void
     */
    public function getDashBoardGraphData($dateFrom, $dateTo)
    {
        $posDashboard = $this->getDashboardInformation($dateFrom, $dateTo);
        $psDetails = $this->refineData($dateFrom, $dateTo, $posDashboard['ps']);
        $posDetails = $this->refineData($dateFrom, $dateTo, $posDashboard['pos']);
        $graphData = [];
        $count = [];
        $typeTrans = [
            'sales' => $this->l('Sales'),
            'orders' => $this->l('Orders'),
            'average_cart_value' => $this->l('Average cart value'),
            'net_profits' => $this->l('Net profits'),
            'refund' => $this->l('Refund'),
        ];

        foreach ($psDetails as $type => $typeValues) {
            $details = [];
            $i = 0;
            $details[$i][] = ucwords(Configuration::get('WKPOS_PRESELECT_DATE_RANGE'));
            $details[$i][] = 'PrestaShop ' . (isset($typeTrans[$type]) ? $typeTrans[$type] : ucwords(implode(' ', explode('_', $type))));
            $details[$i++][] = 'POS ' . (isset($typeTrans[$type]) ? $typeTrans[$type] : ucwords(implode(' ', explode('_', $type))));
            $count[$type]['ps'] = 0;
            $count[$type]['pos'] = 0;
            foreach ($typeValues as $key => $value) {
                $details[$i][] = date('d/m/y', $key);
                $details[$i][] = $value;
                $details[$i++][] = $posDetails[$type][$key];
            }
            $graphData[$type] = $details;
            if ($type == 'average_cart_value') {
                $count[$type]['ps'] = $count['sales']['ps'] ? $count['sales']['ps'] / $count['orders']['ps'] : 0;
                $count[$type]['pos'] = $count['sales']['pos'] ? $count['sales']['pos'] / $count['orders']['pos'] : 0;
            } else {
                $count[$type]['ps'] = array_sum($psDetails[$type]);
                $count[$type]['pos'] = array_sum($posDetails[$type]);
            }
        }

        return [$graphData, $count];
    }

    public function init()
    {
        parent::init();
        if (empty(Configuration::get('WKPOS_PRESELECT_DATE_RANGE'))) {
            Configuration::updateValue('WKPOS_PRESELECT_DATE_RANGE', 'month');
        }
        if (empty(Configuration::get('WKPOS_DATE_FROM'))) {
            Configuration::updateValue('WKPOS_DATE_FROM', date('Y-m-01'));
        }
        if (empty(Configuration::get('WKPOS_DATE_TO'))) {
            Configuration::updateValue('WKPOS_DATE_TO', date('Y-m-t'));
        }
        if (empty($this->context->cookie->WKPOS_SELECTED_OUTLET)) {
            $this->context->cookie->WKPOS_SELECTED_OUTLET = 0;
            $this->context->cookie->write();
        }
    }

    /**
     * Generate the render view of dashboard.
     *
     * @return void
     */
    public function renderView()
    {
        $idProduct = (int) Tools::getValue('product_id');
        if ($idProduct) {
            Tools::redirectAdmin(
                $this->context->link->getAdminLink(
                    'AdminProducts',
                    true,
                    [
                        'id_product' => $idProduct,
                        'updateproduct' => '1',
                    ]
                )
            );
        }

        $this->dateFrom = Configuration::get('WKPOS_DATE_FROM');
        $this->dateTo = Configuration::get('WKPOS_DATE_TO');

        $calendarHelper = new HelperCalendar();
        $calendarHelper->setDateFrom(Tools::getValue('date_from', $this->dateFrom));
        $calendarHelper->setDateTo(Tools::getValue('date_to', $this->dateTo));

        $graphDetails = $this->getDashBoardGraphData($this->dateFrom, $this->dateTo);
        $pieData = [];
        foreach ($graphDetails[1] as $key => $value) {
            $pieData[$key][] = [$key, 'quantity'];
            if ($key !== 'orders') {
                $graphDetails[1][$key]['ps'] = Tools::displayPrice($value['ps']);
                $graphDetails[1][$key]['pos'] = Tools::displayPrice($value['pos']);
            }
            $pieData[$key][] = ['ps', $value['ps']];
            $pieData[$key][] = ['pos', $value['pos']];
        }

        Media::addJsDef(
            [
                'graphData' => $graphDetails[0],
                'dashboard_ajax_url' => $this->context->link->getAdminLink('wkposdashboard'),
                'graphColors' => self::$colors,
                'pieData' => $pieData,
                'noDataFound' => $this->l('No data found.'),
                'wkSalesGraphText' => $this->l('Sales'),
            ]
        );
        $this->tpl_view_vars = [
            'date_from' => $this->dateFrom,
            'date_to' => $this->dateTo,
            'action' => '#',
            'preselect_date_range' => Tools::getValue(
                'preselectDateRange',
                Configuration::get('WKPOS_PRESELECT_DATE_RANGE')
            ),
            'calendar' => $calendarHelper->generate(),
            'date_format' => $calendarHelper->getDateFormat(),
            'date_from' => $calendarHelper->getDateFrom(),
            'date_to' => $calendarHelper->getDateTo(),
            'actions' => $calendarHelper->getActions(),
            'is_rtl' => $calendarHelper->isRTL(),
            'datepickerFrom' => Tools::getValue('datepickerFrom', $this->dateFrom),
            'datepickerTo' => Tools::getValue('datepickerTo', $this->dateTo),
            'wkPosDashboardTplLink' => _PS_MODULE_DIR_ . $this->module->name . '/views/templates/admin/wk_pos_dashboard',
            'cashierDetails' => WkPosDashboard::getTopCashier(),
            'topSellingProducts' => WkPosDashboard::topSellingProduct(),
            'totalCount' => $graphDetails[1],
            'colors' => self::$colors,
            'imageDir' => _PS_IMG_DIR_,
            'posImageIcon' => _MODULE_DIR_ . 'wkpos/views/img/POS-Icon.png',
            'psImageIcon' => _MODULE_DIR_ . 'wkpos/views/img/favicon.ico',
            'selectedPOSOutlet' => $this->context->cookie->WKPOS_SELECTED_OUTLET,
        ];
        $outlets = WkPosOutlets::getOutlets();
        if ($outlets) {
            $this->tpl_view_vars['posOutlets'] = $outlets;
        }
        $lists = parent::renderView();
        unset($this->toolbar_btn['back']);
        unset($this->toolbar_btn['new']);

        $this->list_skip_actions = [];
        $this->topCashier();
        $lists .= parent::renderList();
        $this->addRowAction('view');
        $this->list_skip_actions = [];
        $this->topSellingProduct();
        $lists .= parent::renderList();

        return $lists;
    }

    /**
     * generate the render list for the top cashier
     *
     * @return void
     */
    protected function topCashier()
    {
        $idShop = $this->context->shop->id;
        $idShopGroup = $this->context->shop->id_shop_group;
        unset($this->fields_list, $this->_select, $this->_join, $this->_filterHaving);
        $this->table = 'wkpos_order';
        $this->className = 'WkPosOrder';
        $this->filter = false;
        $this->identifier = 'a.id_employee';
        $this->list_id = 'id_employee';
        $this->_select = 'COUNT(*) as orders, CONCAT(e.`firstname`," ", e.`lastname`) as employee_name, we.`id_employee` as `wk_id_empolyee`, ';
        $this->_select .= ' SUM(o.`total_paid_tax_excl` / o.`conversion_rate`) AS sales,';
        $this->_select .= ' wko.`name` AS outlet_name, e.`id_employee`';
        $this->_join = ' LEFT JOIN `' . _DB_PREFIX_ . 'orders` o ON (o.`id_order` = a.`id_order`)';
        $this->_join .= ' LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_employee` we
        ON (we.`id_wkpos_outlet_employee` = a.`id_wkpos_outlet_employee`)';
        $this->_join .= ' LEFT JOIN `' . _DB_PREFIX_ . 'employee` e ON (e.`id_employee` = we.`id_employee`)';
        $this->_join .= ' LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlets` wko';
        $this->_join .= ' ON (wko.`id_wkpos_outlet` = a.`id_wkpos_outlet`)';
        $this->_where = ' AND a.`date_upd` BETWEEN "' . pSQL($this->dateFrom) . ' 00:00:00" AND "';
        $this->_where .= pSQL($this->dateTo) . ' 23:59:59"';
        if (isset($this->context->cookie->WKPOS_SELECTED_OUTLET)
        && $this->context->cookie->WKPOS_SELECTED_OUTLET != 0) {
            $this->_where = ' AND wko.`id_wkpos_outlet` = ' . (int) $this->context->cookie->WKPOS_SELECTED_OUTLET;
        }
        if ($this->context->cookie->shopContext != 'g-' . (int) $idShopGroup
        && $this->context->cookie->shopContext != '') {
            $this->_where .= ' AND o.`id_shop` = ' . (int) $idShop;
        }
        if ($this->context->cookie->shopContext == 'g-' . (int) $idShopGroup) {
            $idShops = Shop::getContextListShopID();
            $this->_where .= ' AND o.`id_shop` IN (' . implode(',', $idShops) . ')';
        }
        $this->_group = 'GROUP BY e.`id_employee`';
        $idOrderBy = Tools::getValue('id_employeeOrderby');
        $this->_orderBy = $idOrderBy ? $idOrderBy : 'id_wkpos_outlet_employee';
        $this->_orderWay = Tools::getValue('id_employeeOrderway') ? Tools::getValue('id_employeeOrderway') : 'DESC';
        $this->toolbar_title = $this->l('Top cashier');
        $this->fields_list = [
            'id_employee' => [
                'title' => $this->l('Employee ID'),
                'class' => 'fixed-width-xs',
                'align' => 'center',
                'havingFilter' => true,
            ],
            'employee_name' => [
                'title' => $this->l('Employee name'),
                'align' => 'center',
                'havingFilter' => true,
            ],
            'outlet_name' => [
                'title' => $this->l('Outlet name'),
                'align' => 'center',
                'havingFilter' => true,
            ],
            'orders' => [
                'title' => $this->l('Order'),
                'havingFilter' => true,
                'align' => 'center',
            ],
            'sales' => [
                'title' => $this->l('Sales'),
                'havingFilter' => true,
                'align' => 'center',
                'type' => 'price',
            ],
            'wk_id_empolyee' => [
                'title' => $this->l('View'),
                'havingFilter' => false,
                'search' => false,
                'align' => 'center',
                'callback' => 'getEmpViewLink',
                'remove_onclick' => false,
            ],
        ];
        if (Tools::isSubmit('submitFilter') && Tools::isSubmit('submitFilterid_employee')) {
            $this->filter = true;
            $this->processFilter();
        }

        if (Tools::isSubmit('submitResetid_employee')) {
            $this->processResetFilters();
        }
    }

    public function processFilter()
    {
        $hasError = false;
        if (isset($this->list_id)) {
            foreach (Tools::getAllValues() as $key => $value) {
                if ($key == 'id_employeeFilter_sales') {
                    if (!Validate::isPrice($value)) {
                        $hasError = true;
                    }
                }
            }
        }
        if (!$hasError) {
            parent::processFilter();
        }
    }

    public function getAnchorHtmlData($wklink, $wktext)
    {
        $this->context->smarty->assign(
            [
                'wklink' => $wklink,
                'wktext' => $wktext,
                'wktype' => 'anchor',
            ]
        );

        return $this->context->smarty->fetch(
            _PS_MODULE_DIR_ . 'wkpos/views/templates/admin/generalHtml.tpl'
        );
    }

    public function getEmpViewLink($idEmployee)
    {
        $context = Context::getContext();
        $idLang = $context->language->id;
        $employee = new Employee($idEmployee, $idLang);
        $employeeLink = '';
        if (_PS_VERSION_ > '1.7.6.9') {
            $employeeLink = $this->getAnchorHtmlData(
                $context->link->getAdminLink(
                    'AdminEmployees',
                    1,
                    [
                        'route' => 'admin_employees_edit',
                        'employeeId' => $idEmployee,
                    ]
                ),
                $this->l('View Employee')
            );
        }

        return $employeeLink;
    }

    /**
     * generate the top selling product list
     *
     * @return void
     */
    protected function topSellingProduct()
    {
        $idShop = $this->context->shop->id;
        $idShopGroup = $this->context->shop->id_shop_group;
        unset($this->fields_list, $this->_select, $this->_join, $this->_filterHaving);
        $this->table = 'order_detail';
        $this->filter = false;
        $this->identifier = 'product_id';
        $this->list_id = 'product_id';
        $this->_select = 'SUM(a.`product_quantity`) AS quantity';
        $this->_join = 'RIGHT JOIN `' . _DB_PREFIX_ . 'wkpos_order` od ON od.`id_order` = a.`id_order`';
        $this->_where = ' AND od.`date_upd` BETWEEN "' . pSQL($this->dateFrom) . ' 00:00:00" AND "';
        $this->_where .= pSQL($this->dateTo) . ' 23:59:59"';
        if (isset($this->context->cookie->WKPOS_SELECTED_OUTLET)
        && $this->context->cookie->WKPOS_SELECTED_OUTLET != 0) {
            $this->_where = ' AND od.`id_wkpos_outlet` = ' . (int) $this->context->cookie->WKPOS_SELECTED_OUTLET;
        }
        if ($this->context->cookie->shopContext != 'g-' . (int) $idShopGroup
        && $this->context->cookie->shopContext != '') {
            $this->_where .= ' AND a.`id_shop` = ' . (int) $idShop;
        }
        if ($this->context->cookie->shopContext == 'g-' . (int) $idShopGroup) {
            $idShops = Shop::getContextListShopID();
            $this->_where .= ' AND a.`id_shop` IN (' . implode(',', $idShops) . ')';
        }
        $this->_group = 'GROUP BY a.`product_id`';
        $this->_orderBy = Tools::getValue('product_idOrderby') ? Tools::getValue('product_idOrderby') : 'product_id';
        $this->_orderWay = Tools::getValue('product_idOrderway') ? Tools::getValue('product_idOrderway') : 'DESC';
        $this->toolbar_title = $this->l('Top selling products');

        $this->fields_list = [
            'product_id' => [
                'title' => $this->l('Product ID'),
                'class' => 'fixed-width-xs',
                'align' => 'center',
                'havingFilter' => true,
            ],
            'product_name' => [
                'title' => $this->l('Product name'),
                'havingFilter' => true,
                'callback' => 'callbackProductName',
            ],
            'quantity' => [
                'title' => $this->l('Quantity'),
                'havingFilter' => true,
                'align' => 'center',
            ],
        ];

        if (Tools::isSubmit('submitFilter') && Tools::isSubmit('submitFilterproduct_id')) {
            $this->filter = true;
            $this->processFilter();
        }

        if (Tools::isSubmit('submitResetproduct_id')) {
            $this->processResetFilters();
        }
    }

    /**
     * Remove the attribute name in the product name of an order
     *
     * @param [string] $productName
     *
     * @return string
     */
    public function callbackProductName($productName)
    {
        return explode(' - ', $productName)[0];
    }

    /**
     * Add Css and JS file in the controller
     *
     * @return void
     */
    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);
        $this->addCSS(_MODULE_DIR_ . $this->module->name . '/views/css/wkposdashboard.css');
        $this->addJS('https://www.gstatic.com/charts/loader.js');
        $this->addJS(_MODULE_DIR_ . $this->module->name . '/views/js/wkposdashboard.js');
    }

    /**
     * Process the dashboard data according to the need in POS
     *
     * @param [datetime] $dateFrom
     * @param [datetime] $dateTo
     * @param [array] $grossData
     *
     * @return array
     */
    protected function refineData($dateFrom, $dateTo, $grossData)
    {
        $refinedData = [
            'sales' => [],
            'orders' => [],
            'average_cart_value' => [],
            'net_profits' => [],
            'refund' => [],
        ];

        $from = strtotime($dateFrom . ' 00:00:00');
        $to = min(time(), strtotime($dateTo . ' 23:59:59'));
        for ($date = $from; $date <= $to; $date = strtotime('+1 day', $date)) {
            $refinedData['sales'][$date] = 0;
            if (isset($grossData['total_paid_tax_excl'][$date])) {
                $refinedData['sales'][$date] += $grossData['total_paid_tax_excl'][$date];
            }

            $refinedData['orders'][$date] = isset($grossData['orders'][$date]) ? (int) $grossData['orders'][$date] : 0;

            $refinedData['average_cart_value'][$date] = (
                $refinedData['orders'][$date] ? $refinedData['sales'][$date] / $refinedData['orders'][$date] : 0
            );

            $refinedData['net_profits'][$date] = 0;
            if (isset($grossData['total_paid_tax_excl'][$date])) {
                $refinedData['net_profits'][$date] += $grossData['total_paid_tax_excl'][$date];
            }

            $refinedData['refund'][$date] = 0;
            if (isset($grossData['total_paid_tax_excl_refund'][$date])) {
                $refinedData['refund'][$date] += $grossData['total_paid_tax_excl_refund'][$date];
            }

            if (isset($grossData['total_purchases'][$date])) {
                $refinedData['net_profits'][$date] -= $grossData['total_purchases'][$date];
            }
            if (isset($grossData['total_expenses'][$date])) {
                $refinedData['net_profits'][$date] -= $grossData['total_expenses'][$date];
            }
        }

        return $refinedData;
    }

    /**
     * process the data according to the condition
     *
     * @return void
     */
    public function postProcess()
    {
        if (Tools::isSubmit('submitDateRange')) {
            if (!Validate::isDate(Tools::getValue('date_from'))
                || !Validate::isDate(Tools::getValue('date_to'))
            ) {
                $this->errors[] = $this->l('The selected date range is not valid.');
            }

            if (empty($this->errors)) {
                Configuration::updateValue('WKPOS_DATE_FROM', Tools::getValue('date_from'));
                Configuration::updateValue('WKPOS_DATE_TO', Tools::getValue('date_to'));
                Configuration::updateValue('WKPOS_PRESELECT_DATE_RANGE', Tools::getValue('preselectDateRange'));
            }

            $this->context->employee->update();
            Tools::redirectAdmin($this->context->link->getAdminLink('AdminWkPosDashboard'));
        } elseif (Tools::getIsset('changeOutlet') && Tools::getIsset('changeOutlet')) {
            $this->context->cookie->WKPOS_SELECTED_OUTLET = (int) Tools::getValue('wk_selected_outlet');
            $this->context->cookie->write();
        }
        parent::postProcess();
    }
}
