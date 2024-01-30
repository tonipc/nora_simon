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
class AdminWkPosSessionController extends ModuleAdminController
{
    public function __construct()
    {
        $this->bootstrap = true;
        $this->lang = false;
        $this->context = Context::getContext();
        parent::__construct();
        $this->table = 'wkpos_register';
        $this->className = 'WkPosRegister';
        $this->identifier = 'id_wkpos_register';
        $this->_select = ' wo.*,';
        $this->_select .= ' a.`opening_date` as `reference`,';
        $this->_select .= ' a.`id_wkpos_register` as `transaction`,';
        $this->_select .= ' a.`id_wkpos_register` as `opening_balance`,';
        $this->_select .= ' a.`id_wkpos_register` as `closing_balance`,';
        $this->_select .= ' a.`id_wkpos_register` as `cash_movement`,';
        $this->_join .= ' INNER JOIN `' . _DB_PREFIX_ . 'wkpos_outlets` wo
            ON (wo.`id_wkpos_outlet` = a.`id_wkpos_outlet`)';
        // Shop filter
        $idShop = $this->context->shop->id;
        if (Shop::getContext() == Shop::CONTEXT_SHOP) {
            $this->_where .= ' AND wo.`id_shop` = ' . (int) $idShop;
        }
        if (Shop::getContext() == Shop::CONTEXT_GROUP) {
            $idShops = Shop::getContextListShopID();
            $this->_where .= ' AND wo.`id_shop` IN (' . implode(',', $idShops) . ')';
        }
        // Shop filter
        $this->_group .= ' GROUP By a.`id_wkpos_register`';

        $this->_orderBy = $this->identifier;

        $this->fields_list = [
            'id_wkpos_register' => [
                'title' => $this->l('Reference'),
                'align' => 'center',
                'callback' => 'posSessionRefCallback',
                'havingFilter' => false,
                'search' => false,
            ],
            'name' => [
                'title' => $this->l('Name'),
                'align' => 'center',
                'havingFilter' => true,
            ],
            'opening_balance' => [
                'title' => $this->l('Opening balance'),
                'align' => 'center',
                'search' => false,
                'callback' => 'openingBalanceCallback',
                'orderby' => false,
            ],
            'cash_movement' => [
                'title' => $this->l('Cash movement'),
                'align' => 'center',
                'search' => false,
                'callback' => 'cashMovementCallback',
                'orderby' => false,
            ],
            'transaction' => [
                'title' => $this->l('Transaction'),
                'align' => 'center',
                'search' => false,
                'callback' => 'transactionCallback',
                'orderby' => false,
            ],
            'closing_balance' => [
                'title' => $this->l('Closing balance'),
                'align' => 'center',
                'callback' => 'closingBalanceCallback',
                'search' => false,
                'orderby' => false,
            ],
            'opening_date' => [
                'title' => $this->l('Opening date/time'),
                'type' => 'datetime',
                'havingFilter' => true,
                'align' => 'center',
                'callback' => 'getformatedDate',
            ],
            'closing_date' => [
                'title' => $this->l('Closing date/time'),
                'type' => 'datetime',
                'havingFilter' => true,
                // 'callback' => 'closingTimeCallback',
                'align' => 'center',
                'callback' => 'getformatedDate',
            ],
        ];

        $this->objWkPosRegister = null;
    }

    public function getformatedDate($row)
    {
        $idLang = Context::getContext()->language->id;
        $lang = new Language($idLang);
        if ($row != '0000-00-00 00:00:00') {
            return date($lang->date_format_full, strtotime($row));
        }
    }

    /**
     * display the donwload pdf link
     *
     * @param [type] $token
     * @param int $id
     * @param [type] $name
     *
     * @return void
     */
    public function displayDownloadPdfLink($token, $id, $name = null)
    {
        if ($token || $name) {
            $action = $this->l('Download PDF');
            $this->context->smarty->assign([
                'href' => $this->context->link->getAdminLink(
                    'AdminWkPosSession',
                    true,
                    [],
                    [
                        'download_pdf' => 1,
                        'id_wkpos_register' => $id,
                        'action' => 'downloadPdf',
                    ]
                ),
                'action' => $action,
                'icon' => 'download',
            ]);

            return $this->createTemplate('list_action_download_pdf.tpl')->fetch();
        }
    }

    public function processDownloadPdf()
    {
        $idWkPosRegister = Tools::getValue('id_wkpos_register');
        $objPosRegister = new WkPosRegister($idWkPosRegister);
        if ($idWkPosRegister && $objPosRegister->id == $idWkPosRegister) {
            // $order = new Order($idOrder);
            $createRegisterPdf = new PDF(
                $objPosRegister,
                HTMLTemplateCashRegister::REGISTER_TEMPLATE,
                $this->context->smarty
            );
            $createRegisterPdf->render();
            // $create_invoice->createInvoice($order, $idCustomer, true);
            exit;
        }
    }

    /**
     * display the donwload pdf link
     *
     * @param [type] $token
     * @param int $id
     * @param [type] $name
     *
     * @return void
     */
    public function displayOrderLink($token, $id, $name = null)
    {
        $orderPayment = new WkPosOrderPayment($id);
        $orderPayment = new WkPosOrder($orderPayment->id_wkpos_order);
        if ($token || $name) {
            $action = $this->l('View Order');
            $this->context->smarty->assign([
                'href' => $this->context->link->getAdminLink(
                    'AdminOrders',
                    true,
                    [],
                    [
                        'id_order' => $orderPayment->id_order,
                        'vieworder' => 1,
                    ]
                ),
                'action' => $action,
                'icon' => 'shopping-cart',
                'target' => '_new',
            ]);

            return $this->createTemplate('list_action_download_pdf.tpl')->fetch();
        }
    }

    /**
     * Get outlet list
     *
     * @return void
     */
    public function renderList()
    {
        unset($this->toolbar_btn['new']);
        unset($this->toolbar_btn['back']);
        $this->addRowAction('view');
        $this->addRowAction('downloadPdf');

        return parent::renderList();
    }

    public function posSessionRefCallback($idWkPosSession, $sessionDetail)
    {
        return $this->l('POS') . '/' . $idWkPosSession . ' - ' . $sessionDetail['reference'];
    }

    public function closingTimeCallback($time, $transaction)
    {
        $openingAmount = (float) $this->getOpeningAmount($transaction['id_wkpos_control_panel']);
        $transactionAmount = (float) $this->getTransactionAmount($transaction['id_wkpos_session'], $transaction);
        $closingAmount = (float) $this->getClosingAmount($transaction['id_wkpos_control_panel']);
        if ($openingAmount + $transactionAmount == $closingAmount && empty($transaction['status'])) {
            return $time;
        }
    }

    public function closingBalanceCallback($idWkPosRegister, $register)
    {
        $objCurrency = new Currency($register['id_currency']);
        $amount = 0;
        $objCashMovement = new WkPosCashMovement();
        $closingBalances = $objCashMovement->getCashMovement(
            $idWkPosRegister,
            WkPosCashMovement::CLOSING
        );
        if ($closingBalances) {
            foreach ($closingBalances as $closingBalance) {
                $amount += $closingBalance['amount'];
            }
        }

        return Tools::displayPrice($amount, $objCurrency);
    }

    public function cashMovementCallback($idWkPosRegister, $register)
    {
        $objCurrency = new Currency($register['id_currency']);
        $cashMovements = $this->module->getCashMovement($idWkPosRegister);
        $amount = 0;
        if ($cashMovements) {
            foreach ($cashMovements as $movement) {
                if ($movement['type'] == WkPosCashMovement::DEPOSIT) {
                    $amount += (float) $movement['amount'];
                } elseif ($movement['type'] == WkPosCashMovement::WITHDRAW) {
                    $amount -= (float) $movement['amount'];
                }
            }
        }

        return Tools::displayPrice($amount, $objCurrency);
    }

    public function openingBalanceCallback($idWkPosRegister, $register)
    {
        $objCurrency = new Currency($register['id_currency']);
        $objCashMovement = new WkPosCashMovement();
        $openingBalance = $objCashMovement->getRegisterOpeningBalance($idWkPosRegister);
        $amount = 0;
        if ($openingBalance) {
            $amount = $openingBalance['amount'];
        }

        return Tools::displayPrice($amount, $objCurrency);
    }

    public function transactionCallback($idWkPosRegister, $register)
    {
        $objRegisterOrder = new WkPosRegisterOrder();
        $moneyInOrders = $objRegisterOrder->getRegisterOrders(
            $idWkPosRegister,
            WkPosOrderPayment::MONEY_IN
        );
        $amount = 0;
        $moneyOutOrders = $objRegisterOrder->getRegisterOrders(
            $idWkPosRegister,
            WkPosOrderPayment::MONEY_OUT
        );
        if ($moneyInOrders) {
            foreach ($moneyInOrders as $order) {
                $amount += (float) $order['amount'];
            }
        }
        if ($moneyOutOrders) {
            foreach ($moneyOutOrders as $order) {
                $amount -= (float) $order['amount'];
            }
        }
        $objCurrency = new Currency($register['id_currency']);

        return Tools::displayPrice(
            $amount,
            $objCurrency
        );
    }

    public function renderView()
    {
        if (Tools::getIsset('viewwkpos_payment')) {
            $this->registerPaymentOrderList();
        } else {
            $this->registerPaymentList();
        }

        return parent::renderList();
    }

    public function initPageHeaderToolbar()
    {
        if ($this->display == 'view') {
            $this->object = $this->loadObject();
            if ($this->object) {
                $objRegister = new WkPosRegister($this->object->id);
                $controlPanel = $objRegister->id . ' - ' . $objRegister->opening_date;
                $this->toolbar_title[] = $this->l('Reference') . ': ' . $this->l('POS') . '/' . $controlPanel;
            }
        }

        return parent::initPageHeaderToolbar();
    }

    public function initToolbar()
    {
        if ($this->display == 'view') {
            if (Tools::getValue('viewwkpos_payment')) {
                $idWkPosRegister = Tools::getValue('id_wkpos_register');
                self::$currentIndex .= '&view' . $this->table . '&id_wkpos_register=' . (int) $idWkPosRegister;
            }
        }

        return parent::initToolbar();
    }

    public function postProcess()
    {
        if (Tools::isSubmit('submitFilter' . $this->table)) {
            $idWKPosRegister = (int) Tools::getValue('id_wkpos_register');
            $idWKPosPayment = (int) Tools::getValue('id_wkpos_payment');
            if ($idWKPosPayment) {
                self::$currentIndex .= '&token=' . $this->token . '&view' . $this->table;
                self::$currentIndex .= '&id_wkpos_register=' . (int) $idWKPosRegister;
                self::$currentIndex .= '&viewwkpos_payment&id_wkpos_payment=' . (int) $idWKPosPayment;
                $this->context->smarty->assign([
                    'current' => self::$currentIndex,
                ]);
            } elseif ($idWKPosRegister) {
                self::$currentIndex .= '&token=' . $this->token;
                self::$currentIndex .= '&view' . $this->table . '&id_wkpos_register=' . (int) $idWKPosRegister;
                $this->context->smarty->assign([
                    'current' => self::$currentIndex,
                ]);
            }
        }

        if (Tools::isSubmit('submitReset' . $this->table)) {
            $this->processResetFilters();
        }

        // if ($this->filter && $this->action != 'reset_filters') {
        //     if (Tools::getValue('view'.$this->table)) {
        //         $this->table = 'wkpos_payment';
        //         $this->className = 'WkPosPayment';
        //         $this->identifier = 'id_wkpos_payment';
        //         $this->fields_list = $this->getPaymentFieldList();
        //     }
        // }

        parent::postProcess();
    }

    protected function getPaymentFieldList()
    {
        unset($this->toolbar_btn['back']);
        unset($this->_filterHaving);

        return [
            'id_wkpos_payment' => [
                'title' => $this->l('ID'),
                'class' => 'fixed-width-xs',
                'align' => 'center',
                'havingFilter' => false,
                'search' => false,
            ],
            'name' => [
                'title' => $this->l('Payment type'),
                'align' => 'center',
                'havingFilter' => true,
                'search' => true,
            ],
            'order_amount' => [
                'title' => $this->l('Transaction amount'),
                'type' => 'price',
                'callback' => 'setRegisterCurrency',
                'havingFilter' => false,
                'align' => 'center',
                'search' => false,
                'orderby' => false,
            ],
        ];
    }

    protected function registerPaymentList()
    {
        unset($this->_filterHaving);
        unset($this->toolbar_btn['back']);
        $idWkPosRegister = trim(Tools::getValue('id_wkpos_register'));
        unset($this->_select);
        unset($this->_join);
        unset($this->_group);
        unset($this->_where);
        $this->table = 'wkpos_payment';
        $this->className = 'WkPosPayment';
        $this->identifier = 'id_wkpos_payment';
        $this->_select = ' wpo.*, wro.*, wr.`id_currency`';
        $this->_select .= ',
        SUM( CASE
               WHEN wpo.`type` = ' . (int) WkPosOrderPayment::MONEY_OUT . ' THEN wpo.`amount` * -1
               ELSE wpo.`amount`
            END
          ) AS order_amount';
        $this->_join = ' INNER JOIN `' . _DB_PREFIX_ . 'wkpos_order_payment` wpo
            ON (a.`id_wkpos_payment` = wpo.`id_wkpos_payment`)';
        $this->_join .= ' INNER JOIN `' . _DB_PREFIX_ . 'wkpos_register_order` wro
            ON (wro.`id_wkpos_order` = wpo.`id_wkpos_order`)';
        $this->_join .= ' INNER JOIN `' . _DB_PREFIX_ . 'wkpos_register` wr
            ON (wro.`id_wkpos_register` = wr.`id_wkpos_register`)';
        $this->_join .= ' INNER JOIN `' . _DB_PREFIX_ . 'wkpos_outlets` wo
            ON (wo.`id_wkpos_outlet` = wr.`id_wkpos_outlet`)';
        $this->_where = ' AND wro.`id_wkpos_register` = ' . (int) $idWkPosRegister;
        // Shop filter
        $idShop = $this->context->shop->id;
        if (Shop::getContext() == Shop::CONTEXT_SHOP) {
            $this->_where .= ' AND wo.`id_shop` = ' . (int) $idShop;
        }
        if (Shop::getContext() == Shop::CONTEXT_GROUP) {
            $idShops = Shop::getContextListShopID();
            $this->_where .= ' AND wo.`id_shop` IN (' . implode(',', $idShops) . ')';
        }
        // Shop filter
        $this->_group = 'GROUP By wpo.`id_wkpos_payment`';
        $this->_orderBy = $this->identifier;
        $this->fields_list = $this->getPaymentFieldList();
        self::$currentIndex .= '&id_wkpos_register=' . (int) $idWkPosRegister . '&viewwkpos_register=1';
        $this->context->smarty->assign([
            'current' => self::$currentIndex,
        ]);
        $this->addRowAction('view');
        if (Tools::isSubmit('submitFilter')) {
            $this->processFilter();
        }

        if (Tools::isSubmit('submitResetwkpos_register')) {
            $this->processResetFilters();
        }
    }

    public static function setRegisterCurrency($amount, $row)
    {
        $idCurrency = (int) $row['id_currency'];

        return Tools::displayPrice($amount, $idCurrency);
    }

    protected function registerPaymentOrderList()
    {
        unset($this->_filterHaving);
        unset($this->toolbar_btn['back']);
        $idWkPosRegister = trim(Tools::getValue('id_wkpos_register'));
        $idWkPosPayment = trim(Tools::getValue('id_wkpos_payment'));
        unset($this->_select);
        unset($this->_join);
        unset($this->_group);
        unset($this->_where);
        $this->table = 'wkpos_order_payment';
        $this->className = 'WkPosOrderPayment';
        $this->identifier = 'id_wkpos_order_payment';
        $this->_select = ' wo.*, wro.*, wr.`id_currency`';
        $this->_join = ' INNER JOIN `' . _DB_PREFIX_ . 'wkpos_register_order` wro
            ON (wro.`id_wkpos_order` = a.`id_wkpos_order`)';
        $this->_join .= ' INNER JOIN `' . _DB_PREFIX_ . 'wkpos_register` wr
            ON (wro.`id_wkpos_register` = wr.`id_wkpos_register`)';
        $this->_join .= ' INNER JOIN `' . _DB_PREFIX_ . 'wkpos_order` wo
            ON (wo.`id_wkpos_order` = a.`id_wkpos_order`)';
        $this->_join .= ' INNER JOIN `' . _DB_PREFIX_ . 'wkpos_outlets` wot
            ON (wot.`id_wkpos_outlet` = wr.`id_wkpos_outlet`)';
        $this->_where = ' AND wro.`id_wkpos_register` = ' . (int) $idWkPosRegister;
        $this->_where .= ' AND a.`id_wkpos_payment` = ' . (int) $idWkPosPayment;
        // Shop filter
        $idShop = $this->context->shop->id;
        if (Shop::getContext() == Shop::CONTEXT_SHOP) {
            $this->_where .= ' AND wot.`id_shop` = ' . (int) $idShop;
        }
        if (Shop::getContext() == Shop::CONTEXT_GROUP) {
            $idShops = Shop::getContextListShopID();
            $this->_where .= ' AND wot.`id_shop` IN (' . implode(',', $idShops) . ')';
        }
        // Shop filter
        $this->list_no_link = true;
        $this->_orderBy = $this->identifier;
        $this->fields_list = [
            'id_wkpos_order' => [
                'title' => $this->l('ID'),
                'class' => 'fixed-width-xs',
                'align' => 'center',
                'search' => false,
                'havingFilter' => false,
            ],
            'reference' => [
                'title' => $this->l('Reference'),
                'callback' => 'setOrderReference',
                'search' => false,
                'havingFilter' => false,
            ],
            'amount' => [
                'title' => $this->l('Transaction amount'),
                'type' => 'price',
                'callback' => 'setRegisterCurrency',
                'align' => 'center',
                'search' => false,
                'havingFilter' => false,
            ],
            'type' => [
                'title' => $this->l('Type'),
                'callback' => 'setOrderType',
                'align' => 'center',
                'search' => false,
                'havingFilter' => false,
            ],
            'order_date' => [
                'title' => $this->l('Transaction date'),
                'type' => 'datetime',
                // 'callback' => 'setRegisterCurrency',
                'align' => 'center',
                'search' => false,
                'havingFilter' => false,
            ],
        ];

        self::$currentIndex .= '&id_wkpos_register=' . (int) $idWkPosRegister .
            '&viewwkpos_register=1&id_wkpos_payment=' . (int) $idWkPosPayment .
            '&viewwkpos_payment=1';
        $this->context->smarty->assign([
            'current' => self::$currentIndex,
        ]);
        $this->addRowAction('order');
        if (Tools::isSubmit('submitFilter')) {
            $this->processFilter();
        }

        if (Tools::isSubmit('submitResetwkpos_register')) {
            $this->processResetFilters();
        }
    }

    public function setOrderType($type)
    {
        if ($type == WkPosOrderPayment::MONEY_IN) {
            return $this->l('Money In');
        } elseif ($type == WkPosOrderPayment::MONEY_OUT) {
            return $this->l('Money Out');
        }
    }

    public function setOrderReference($reference, $row)
    {
        if ($row['type'] == WkPosOrderPayment::MONEY_IN) {
            return $this->l('Order') . '/#' . $reference;
        } elseif ($row['type'] == WkPosOrderPayment::MONEY_OUT) {
            return $this->l('Order Return') . '/#' . $reference;
        }
    }
}
