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
class AdminWkPosConfigurationController extends ModuleAdminController
{
    public $current_config_tab;

    public function __construct()
    {
        $this->bootstrap = true;
        $this->lang = false;
        $this->context = Context::getContext();
        parent::__construct();
        $this->toolbar_title = $this->l('Configuration');
        if (Tools::getValue('current_config_tab') != '') {
            $this->current_config_tab = Tools::getValue('current_config_tab');
        } else {
            $this->current_config_tab = 'generalConfig';
        }
        if ($this->current_config_tab == null) {
            $this->current_config_tab = 'generalConfig';
        }
    }

    /**
     * open the edit form on page hit
     *
     * @return void
     */
    public function initContent()
    {
        $this->show_toolbar = false;
        $this->show_form_cancel_button = false;
        $this->display = 'edit';
        parent::initContent();
    }

    /**
     * Add link in toolbar for POS shop.
     *
     * @return void
     */
    public function initPageHeaderToolbar()
    {
        $this->page_header_toolbar_btn['POS Shop'] = [
            'href' => $this->context->link->getModuleLink('wkpos', 'login'),
            'desc' => $this->l('POS shop'),
            'icon' => 'process-icon-cart',
        ];
        $this->page_header_toolbar_btn['Generate Barcodes'] = [
            'href' => self::$currentIndex . '&generateBarcodes=1&token=' . $this->token,
            'desc' => $this->l('Generate Barcodes'),
            'icon' => 'process-icon-cogs',
            'title' => $this->l('For internal use only'),
        ];
        parent::initPageHeaderToolbar();
    }

    /**
     * process the data and perform the action according to the condition
     *
     * @return void
     */
    public function postProcess()
    {
        if (Tools::getValue('generateBarcodes') == 1 && Tools::getIsset('generateBarcodes')) {
            $products = WkPosHelper::getAllProducts();
            try {
                foreach ($products as $product) {
                    $objProduct = new Product($product['id_product']);
                    if ($objProduct->isbn == '' || $objProduct->isbn == null) {
                        $objProduct->isbn = WkPosHelper::generateISBN();
                        $objProduct->save();
                    }
                    if ($objProduct->upc == '' || $objProduct->upc == null) {
                        $objProduct->upc = WkPosHelper::generateUPC();
                        $objProduct->save();
                    }
                    if ($objProduct->ean13 == '' || $objProduct->ean13 == null) {
                        $objProduct->ean13 = WkPosHelper::generateEAN();
                        $objProduct->save();
                    }

                    if ($objProduct->hasCombinations()) {
                        $combinations = WkPosHelper::getProductAttributes($product['id_product']);
                        foreach ($combinations as $combination) {
                            if ($combination['isbn'] == '' || $combination['isbn'] == null) {
                                $objAttr = new Combination($combination['id_product_attribute']);
                                $objAttr->isbn = WkPosHelper::generateISBN();
                                $objAttr->save();
                            }
                            if ($combination['upc'] == '' || $combination['upc'] == null) {
                                $objAttr = new Combination($combination['id_product_attribute']);
                                $objAttr->upc = WkPosHelper::generateUPC();
                                $objAttr->save();
                            }
                            if ($combination['ean13'] == '' || $combination['ean13'] == null) {
                                $objAttr = new Combination($combination['id_product_attribute']);
                                $objAttr->ean13 = WkPosHelper::generateEAN();
                                $objAttr->save();
                            }
                        }
                    }
                }
            } catch (Exception $e) {
                // dump($e);
                // die;
            }
        }
        if (Tools::getValue('ajax')) {
            $functionName = 'ajaxProcess' . Tools::ucfirst(Tools::getValue('action'));
            $this->$functionName();
        }

        if (Tools::isSubmit('submitWkPosGeneralConfiguration')) {
            $defaultLangId = Configuration::get('PS_LANG_DEFAULT');
            $defaultLanguage = Language::getLanguage((int) $defaultLangId);

            $posHeading = Tools::getValue('WKPOS_HEADING_' . $defaultLangId);
            if (!trim($posHeading)) {
                $this->context->controller->errors[] =
                sprintf($this->l('Please enter POS heading in %s'), $defaultLanguage['name']);
            } else {
                foreach (Language::getLanguages() as $language) {
                    if (trim($posHeading)) {
                        if (!Validate::isGenericName($posHeading)) {
                            $lang = Language::getLanguage((int) $language['id_lang']);
                            $this->context->controller->errors[] = sprintf(
                                $this->l('Please enter valid POS heading %s'),
                                $lang['name']
                            );
                        } elseif (Tools::strlen($posHeading) >= 30) {
                            $this->errors[] = $this->l('Please enter the POS heading less than 30 characters.');
                        }
                    }
                }
            }

            $shopName = Tools::getValue('WKPOS_SHOP_NAME_' . $defaultLangId);
            if (!trim($shopName)) {
                $this->context->controller->errors[] =
                sprintf($this->l('Please enter shop name in %s'), $defaultLanguage['name']);
            } elseif (Tools::strlen($shopName) >= 32) {
                $this->context->controller->errors[] = $this->l('Shop name length must be less than 32 characters.');
            } else {
                foreach (Language::getLanguages() as $language) {
                    if (trim($shopName)) {
                        if (!Validate::isGenericName($shopName)) {
                            $lang = Language::getLanguage((int) $language['id_lang']);
                            $this->context->controller->errors[] = sprintf(
                                $this->l('Please enter valid shop name %s'),
                                $lang['name']
                            );
                        }
                    }
                }
            }

            // if (empty(trim(Tools::getValue('WKPOS_HEADING')))) {
            //     $this->errors[] = $this->l('Please enter POS heading.');
            // } elseif (!Validate::isGenericName(Tools::getValue('WKPOS_HEADING'))) {
            //     $this->errors[] = $this->l('Please enter valid POS heading.');
            // } elseif (Tools::strlen(Tools::getValue('WKPOS_HEADING')) >= 30) {
            //     $this->errors[] = $this->l('Please enter the POS heading less than 30 characters.');
            // }

            // if (empty(trim(Tools::getValue('shop_name')))) {
            //     $this->errors[] = $this->l('Please enter shop name.');
            // } elseif (!Validate::isGenericName(Tools::getValue('shop_name'))) {
            //     $this->errors[] = $this->l('Please enter valid shop name.');
            // }
            $loginColor = Tools::getValue('WKPOS_LOGIN_COLOR');
            if (!$loginColor || !Tools::strlen(trim($loginColor))) {
                $this->errors[] = $this->l('Please select theme color.');
            } elseif (!preg_match('/^(#[0-9a-fA-F]{6})$/', $loginColor)) {
                $this->errors[] = $this->l('Please select valid theme color.');
            }
            $btnsColor = Tools::getValue('WKPOS_BUTTON_COLOR');
            if (!$btnsColor || !Tools::strlen(trim($btnsColor))) {
                $this->errors[] = $this->l('Please select POS buttons color.');
            } elseif (!preg_match('/^(#[0-9a-fA-F]{6})$/', $btnsColor)) {
                $this->errors[] = $this->l('Please select valid POS buttons color.');
            }
            if (!empty($this->errors)) {
                $this->current_config_tab = 'generalConfig';
                Media::addJsDef(
                    [
                        'current_config_tab' => $this->current_config_tab,
                    ]
                );
            }
        }

        if (Tools::isSubmit('submitWkPosProductConfiguration')) {
            if (trim(Tools::getValue('product_name_length')) == '' || Tools::getValue('product_name_length') <= 0) {
                $this->errors[] = $this->l('Product name length should be greater than 0.');
            } elseif (Tools::getValue('product_name_length') > 255) {
                $this->errors[] = $this->l('Product name length should not greater than 255.');
            } elseif (!Validate::isUnsignedInt(Tools::getValue('product_name_length'))) {
                $this->errors[] = $this->l('Product name length should be a positive integer.');
            }
            if (trim(Tools::getValue('low_stock_qty')) == '' || Tools::getValue('low_stock_qty') <= 0) {
                $this->errors[] = $this->l('Low stock quantity should be greater than 0.');
            } elseif (Tools::getValue('low_stock_qty') > 999999999) {
                $this->errors[] = $this->l('Please check low stock quantity value.');
            } elseif (!Validate::isUnsignedInt(Tools::getValue('low_stock_qty'))) {
                $this->errors[] = $this->l('Please enter positive integer in low stock quantity.');
            }
            if (empty(Tools::getValue('product_search'))) {
                $this->errors[] = $this->l('Please select at least one method for product search.');
            } else {
                foreach (Tools::getValue('product_search') as $selectedProductSearch) {
                    if (!in_array((string) $selectedProductSearch, ['1', '2', '3', '4', '5', '6', '7'])) {
                        $this->errors[] = $this->l('Selected type not found.');
                    }
                }
            }

            if (!empty($this->errors)) {
                $this->current_config_tab = 'productForm';
                Media::addJsDef(
                    [
                        'current_config_tab' => $this->current_config_tab,
                    ]
                );
            }
        }

        if (Tools::isSubmit('submitWkPosPaymentConfiguration')) {
            if (empty(Tools::getValue('groupBox'))) {
                $this->errors[] = $this->l('Please select at least one payment method.');
            } else {
                foreach (Tools::getValue('groupBox') as $selectedPaymentMethod) {
                    $array = array_column(WkPosPayment::getPaymentDetailId(), 'id_wkpos_payment');
                    if (!in_array((string) $selectedPaymentMethod, $array)) {
                        $this->errors[] = $this->l('Selected type not found.');
                    }
                }
            }

            if (!empty($this->errors)) {
                $this->current_config_tab = 'paymentForm';
                Media::addJsDef(
                    [
                        'current_config_tab' => $this->current_config_tab,
                    ]
                );
            }
        }
        if (Tools::isSubmit('submitWkPosCustomerConfiguration')) {
            if (Tools::getValue('guest_checkout')) {
                if (empty(Tools::getValue('guest_account'))) {
                    $this->errors[] = $this->l('Please enter guest account.');
                } elseif (empty(Customer::getCustomersByEmail(Tools::getValue('guest_account')))) {
                    $this->errors[] = $this->l('Please enter valid email address.');
                }
            }

            if (!empty($this->errors)) {
                $this->current_config_tab = 'customerForm';
                Media::addJsDef(
                    [
                        'current_config_tab' => $this->current_config_tab,
                    ]
                );
            }
        }
        if (Tools::isSubmit('submitWkPosOrderReceiptConfiguration')) {
            if (empty(Tools::getValue('printer_name'))) {
                // $this->errors[] = $this->l('Printer Name is a required field');
            } elseif (!Validate::isGenericName(Tools::getValue('printer_name'))) {
                $this->errors[] = $this->l('Please enter valid printer name.');
            }
            if (empty(Tools::getValue('printer_encoding'))) {
                $this->errors[] = $this->l('Please enter printer encoding.');
            } elseif (!Validate::isGenericName(Tools::getValue('printer_encoding'))) {
                $this->errors[] = $this->l('Please enter valid printer encoding.');
            }
            // if (empty(Tools::getValue('contact_number'))) {
            //     $this->errors[] = $this->l('Contact Number is a required field');
            // } elseif (!Validate::isInt(Tools::getValue('contact_number'))) {
            //     $this->errors[] = $this->l('Invalid Contact Number');
            // }
            if (!empty($this->errors)) {
                $this->current_config_tab = 'receiptForm';
                Media::addJsDef(
                    [
                        'current_config_tab' => $this->current_config_tab,
                    ]
                );
            }
        }
        if (Tools::isSubmit('submitWkPosShippingConfiguration')) {
            if (Tools::getValue('enable_shipping')) {
                if (empty(Tools::getValue('groupBox'))) {
                    $this->errors[] = $this->l('Please select at least one shipping method.');
                } else {
                    $shippingMethod = Tools::getValue('groupBox');
                    if (!in_array((string) Tools::getValue('default_shipping'), $shippingMethod)) {
                        $this->errors[] =
                        $this->l('Please select default setting in POS shipping method');
                    }
                }
            }

            if (!empty($this->errors)) {
                $this->current_config_tab = 'shippingForm';
                Media::addJsDef(
                    [
                        'current_config_tab' => $this->current_config_tab,
                    ]
                );
            }
        }

        if (empty($this->errors)) {
            if (Tools::isSubmit('submitWkPosProductConfiguration')) {
                $this->productPostProcess();
            } elseif (Tools::isSubmit('submitWkPosGeneralConfiguration')) {
                $this->generalPostProcess();
            } elseif (Tools::isSubmit('submitWkPosCustomerConfiguration')) {
                $this->customerPostProcess();
            } elseif (Tools::isSubmit('submitWkPosPaymentConfiguration')) {
                $this->paymentPostProcess();
            } elseif (Tools::isSubmit('submitWkPosOrderReceiptConfiguration')) {
                $this->orderPostProcess();
            } elseif (Tools::isSubmit('submitWkPosShippingConfiguration')) {
                $this->shippingPostProcess();
            }
        }
    }

    public function generalPostProcess()
    {
        $defaultLangId = Configuration::get('PS_LANG_DEFAULT');
        $posHeading = [];
        foreach (Language::getLanguages(false) as $lang) {
            if (Tools::getValue('WKPOS_HEADING_' . $lang['id_lang'])) {
                $posHeading['WKPOS_HEADING'][$lang['id_lang']] = Tools::getValue('WKPOS_HEADING_' . $lang['id_lang']);
            } else {
                $posHeading['WKPOS_HEADING'][$lang['id_lang']] = Tools::getValue('WKPOS_HEADING_' . $defaultLangId);
            }
        }
        $shopName = [];
        foreach (Language::getLanguages(false) as $lang) {
            if (Tools::getValue('WKPOS_SHOP_NAME_' . $lang['id_lang'])) {
                $shopName['WKPOS_SHOP_NAME'][$lang['id_lang']] = Tools::getValue('WKPOS_SHOP_NAME_' . $lang['id_lang']);
            } else {
                $shopName['WKPOS_SHOP_NAME'][$lang['id_lang']] = Tools::getValue('WKPOS_SHOP_NAME_' . $defaultLangId);
            }
        }
        Configuration::updateValue('WKPOS_HEADING', $posHeading['WKPOS_HEADING'], true);
        Configuration::updateValue('WKPOS_SHOP_NAME', $shopName['WKPOS_SHOP_NAME'], true);
        // Configuration::updateValue('WKPOS_HEADING', Tools::getValue('WKPOS_HEADING'));
        // Configuration::updateValue('WKPOS_SHOP_NAME', Tools::getValue('shop_name'));
        Configuration::updateValue('WKPOS_CHANGE_PRODUCT_PRICE', Tools::getValue('WKPOS_CHANGE_PRODUCT_PRICE'));
        Configuration::updateValue('WKPOS_VOUCHER_ENABLE', Tools::getValue('WKPOS_VOUCHER_ENABLE'));
        Configuration::updateValue('WKPOS_MESSAGE_ENABLE', Tools::getValue('WKPOS_MESSAGE_ENABLE'));
        Configuration::updateValue('WKPOS_LOGIN_COLOR', Tools::getValue('WKPOS_LOGIN_COLOR'));
        Configuration::updateValue('WKPOS_BUTTON_COLOR', Tools::getValue('WKPOS_BUTTON_COLOR'));
        Configuration::updateValue('WKPOS_SHOW_STOCK_LOCATION', Tools::getValue('WKPOS_SHOW_STOCK_LOCATION'));
        Configuration::updateValue('WKPOS_CASH_REGISTER_STATUS', Tools::getValue('WKPOS_CASH_REGISTER_STATUS'));
        Configuration::updateValue('WKPOS_SHOW_ORIGINAL_PRICE', Tools::getValue('WKPOS_SHOW_ORIGINAL_PRICE'));
        Tools::redirectAdmin(self::$currentIndex . '&conf=4&current_config_tab=generalConfig&token=' . $this->token);
    }

    /**
     * update the product configuration details
     *
     * @return void
     */
    public function productPostProcess()
    {
        Configuration::updateValue('WKPOS_PRODUCT_NAME_LENGTH', Tools::getValue('product_name_length'));
        Configuration::updateValue('WKPOS_LOW_STOCK', Tools::getValue('low_stock_qty'));

        Configuration::updateValue('WKPOS_BARCODE_SEARCH_TYPE', Tools::getValue('barcode_search_type'));
        Configuration::updateValue('WKPOS_DEFAULT_OUTLET', Tools::getValue('wkpos_default_outlet'));
        Configuration::updateValue('WKPOS_COMBINATION_TAG_ENABLE', Tools::getValue('combination_tag'));
        Configuration::updateValue('WKPOS_SYNCHRONISE_QUANTITY', Tools::getValue('synchronise_quantity'));
        Configuration::updateValue('WKPOS_OUTLET_PRODUCT_ACTIVE', Tools::getValue('outlet_product_active'));
        Configuration::updateValue('WKPOS_PRODUCT_SEARCH_TYPE', implode(',', Tools::getValue('product_search')));
        Configuration::updateValue('WKPOS_PRODUCT_REMOVE', Tools::getValue('remove_product'));
        Tools::redirectAdmin(self::$currentIndex . '&conf=4&current_config_tab=productForm&token=' . $this->token);
    }

    /**
     * update the shipping configuration details
     *
     * @return void
     */
    public function shippingPostProcess()
    {
        Configuration::updateValue('WKPOS_ENABLE_SHIPPING', Tools::getValue('enable_shipping'));
        if (Tools::getValue('enable_shipping')) {
            Configuration::updateValue('WKPOS_SHIPPING_METHOD', implode(',', Tools::getValue('groupBox')));
            Configuration::updateValue('WKPOS_DEFAULT_SHIPPING', (int) Tools::getValue('default_shipping'));
        }
        Tools::redirectAdmin(self::$currentIndex . '&conf=4&current_config_tab=shippingForm&token=' . $this->token);
    }

    /**
     * update the customer configuration details
     *
     * @return void
     */
    public function customerPostProcess()
    {
        Configuration::updateValue('WKPOS_GUEST_ACCOUNT_ENABLE', Tools::getValue('guest_checkout'));
        Configuration::updateValue('WKPOS_CUSTOMER_GROUP', Tools::getValue('WKPOS_CUSTOMER_GROUP'));
        if (Tools::getValue('guest_checkout')) {
            Configuration::updateValue('WKPOS_GUEST_ACCOUNT', Tools::getValue('guest_account'));
        }
        Configuration::updateValue('WKPOS_DEFAULT_SEARCH_TYPE', Tools::getValue('WKPOS_DEFAULT_SEARCH_TYPE'));
        Tools::redirectAdmin(self::$currentIndex . '&conf=4&current_config_tab=customerForm&token=' . $this->token);
    }

    /**
     * update the payment configuration details
     *
     * @return void
     */
    public function paymentPostProcess()
    {
        $paymentMethods = array_column(WkPosPayment::getPaymentDetailId(), 'id_wkpos_payment');
        foreach ($paymentMethods as $paymentMethod) {
            $found = 0;
            foreach (Tools::getValue('groupBox') as $selectedPaymentMethod) {
                if ($selectedPaymentMethod == $paymentMethod) {
                    $objWkPosPayment = new WkPosPayment($selectedPaymentMethod);
                    $objWkPosPayment->active = 1;
                    $objWkPosPayment->save();
                    $found = 1;
                    break;
                }
            }
            if (!$found) {
                $objWkPosPayment = new WkPosPayment($paymentMethod);
                $objWkPosPayment->active = 0;
                $objWkPosPayment->save();
            }
        }
        Configuration::updateValue('WKPOS_ORDER_EDIT_PAYMENT', Tools::getValue('WKPOS_ORDER_EDIT_PAYMENT'));
        Configuration::updateValue('WKPOS_PAYMENT_PARTIAL_VOUCHER', Tools::getValue('WKPOS_PAYMENT_PARTIAL_VOUCHER'));
        Configuration::updateValue('WKPOS_ORDER_STATUS_PAYMENT', Tools::getValue('WKPOS_ORDER_STATUS_PAYMENT'));
        Tools::redirectAdmin(self::$currentIndex . '&conf=4&current_config_tab=paymentForm&token=' . $this->token);
    }

    /**
     * update the order configuration details
     *
     * @return void
     */
    public function orderPostProcess()
    {
        Configuration::updateValue('WKPOS_PRINT_TYPE', Tools::getValue('WKPOS_PRINT_TYPE'));
        Configuration::updateValue('WKPOS_PRINTER_NAME', Tools::getValue('printer_name'));
        Configuration::updateValue('WKPOS_PRINTER_ENCODING', Tools::getValue('printer_encoding'));
        Configuration::updateValue('WKPOS_ORDER_CONFIRMATION_EMAIL', Tools::getValue('WKPOS_ORDER_CONFIRMATION_EMAIL'));
        Configuration::updateValue('WKPOS_DISPLAY_PRODUCT_DISCOUNT', Tools::getValue('display_product_discount'));
        Configuration::updateValue('WKPOS_PRINTER_AUTO_CONNECT', Tools::getValue('WKPOS_PRINTER_AUTO_CONNECT'));
        Configuration::updateValue('WKPOS_DISPLAY_ORDER_DISCOUNT', Tools::getValue('display_order_discount'));
        Configuration::updateValue('WKPOS_DISPLAY_BARCODE', Tools::getValue('display_barcode'));
        // Configuration::updateValue('WKPOS_PRINTER_IP_ADDRESS', Tools::getValue('printer_ip_addresss'));
        Configuration::updateValue('WKPOS_ENABLE_CASH_DRAWER', Tools::getValue('enable_cash_drawer'));
        Tools::redirectAdmin(self::$currentIndex . '&conf=4&current_config_tab=receiptForm&token=' . $this->token);
    }

    public function tabConfig()
    {
        $this->tabList = [
            [
                'tab_name' => 'generalConfig',
                'label' => $this->l('General'),
                'icon' => 'icon-wrench',
            ],
            [
                'tab_name' => 'productForm',
                'label' => $this->l('Product'),
                'icon' => 'icon-book',
            ],
            [
                'tab_name' => 'customerForm',
                'label' => $this->l('Customer'),
                'icon' => 'icon-user',
            ],
            [
                'tab_name' => 'paymentForm',
                'label' => $this->l('Payment'),
                'icon' => 'icon-money',
            ],
            [
                'tab_name' => 'receiptForm',
                'label' => $this->l('Order Receipt'),
                'icon' => 'icon-file',
            ],
            [
                'tab_name' => 'shippingForm',
                'label' => $this->l('Shipping'),
                'icon' => 'icon-truck',
            ],
        ];
    }

    /**
     * Containg multiple render form for different different action
     *
     * @return void
     */
    public function renderForm()
    {
        if (!$this->loadObject(true)) {
            return;
        }
        $form = [];
        $form['blogPdfForm'] = $this->blogPdfForm();
        $form['generalConfig'] = $this->generalConfig();
        $form['productForm'] = $this->productForm();
        $form['customerForm'] = $this->customerForm();
        $form['paymentForm'] = $this->paymentForm();
        $form['receiptForm'] = $this->orderReceiptDetailsForm();
        $form['shippingForm'] = $this->shippingForm();
        $this->context->smarty->assign(['current_config_tab' => $this->current_config_tab]);
        $this->tabConfig();
        $this->context->smarty->assign([
            'form' => $form,
            'tab_name' => $this->tabList,
            'module_version' => $this->module->version,
        ]);
        $final_form = $this->context->smarty->fetch(
            _PS_MODULE_DIR_ . 'wkpos/views/templates/admin/wkpos-config.tpl'
        );

        return $final_form;
    }

    public function generalConfig()
    {
        $productPriceType = [
            [
                'id' => 1,
                'type' => $this->l('Price (Tax Excluded)'),
            ],
            [
                'id' => 2,
                'type' => $this->l('Price (Tax Included)'),
            ],
        ];
        $this->fields_form = [
            'legend' => [
                'title' => $this->l('General'),
                'icon' => 'icon-wrench',
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => $this->l('POS heading'),
                    'name' => 'WKPOS_HEADING',
                    // 'class' => 'fixed-width-xxl',
                    'lang' => true,
                    'required' => true,
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Shop name'),
                    'name' => 'WKPOS_SHOP_NAME',
                    'lang' => true,
                    // 'class' => 'fixed-width-xxl',
                    'required' => true,
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Change product price in cart'),
                    'name' => 'WKPOS_CHANGE_PRODUCT_PRICE',
                    'class' => 'fixed-width-md',
                    'desc' => $this->l('Price change effect in cart product will be either tax included or tax excluded.'),
                    'options' => [
                        'query' => $productPriceType,
                        'id' => 'id',
                        'name' => 'type',
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Voucher field'),
                    // 'desc' => $this->l('If yes then '),
                    'name' => 'WKPOS_VOUCHER_ENABLE',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Message on POS cart'),
                    'name' => 'WKPOS_MESSAGE_ENABLE',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'color',
                    'label' => $this->l('POS theme color'),
                    'name' => 'WKPOS_LOGIN_COLOR',
                    'required' => true,
                ],
                [
                    'type' => 'color',
                    'label' => $this->l('POS buttons color'),
                    'name' => 'WKPOS_BUTTON_COLOR',
                    'required' => true,
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Show price without any reduction in POS panel'),
                    // 'desc' => $this->l('If yes then '),
                    'name' => 'WKPOS_SHOW_ORIGINAL_PRICE',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Show stock location on POS panel'),
                    // 'desc' => $this->l('If yes then '),
                    'name' => 'WKPOS_SHOW_STOCK_LOCATION',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Cash register'),
                    'desc' => $this->l('If yes then POS record each transaction in register to generate daily report.'),
                    'name' => 'WKPOS_CASH_REGISTER_STATUS',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
            ],
            'submit' => [
                'title' => $this->l('Save'),
                'name' => 'submitWkPosGeneralConfiguration',
            ],
        ];
        unset($this->fields_value);
        $posHeading = [];
        foreach (Language::getLanguages(false) as $lang) {
            $posHeading[$lang['id_lang']] = Tools::getValue(
                'WKPOS_HEADING_' . $lang['id_lang'],
                Configuration::get('WKPOS_HEADING', $lang['id_lang'])
            );
        }
        $posShop = [];
        foreach (Language::getLanguages(false) as $lang) {
            $posShop[$lang['id_lang']] = Tools::getValue(
                'WKPOS_SHOP_NAME_' . $lang['id_lang'],
                Configuration::get('WKPOS_SHOP_NAME', $lang['id_lang'])
            );
        }
        $this->fields_value = array_merge(
            [
                'WKPOS_HEADING' => $posHeading,
                'WKPOS_SHOP_NAME' => $posShop,
                'WKPOS_CHANGE_PRODUCT_PRICE' => Tools::getValue(
                    'WKPOS_CHANGE_PRODUCT_PRICE',
                    Configuration::get('WKPOS_CHANGE_PRODUCT_PRICE')
                ),
                'WKPOS_MESSAGE_ENABLE' => Tools::getValue(
                    'WKPOS_MESSAGE_ENABLE',
                    Configuration::get('WKPOS_MESSAGE_ENABLE')
                ),
                'WKPOS_VOUCHER_ENABLE' => Tools::getValue(
                    'WKPOS_VOUCHER_ENABLE',
                    Configuration::get('WKPOS_VOUCHER_ENABLE')
                ),
                'WKPOS_LOGIN_COLOR' => Tools::getValue(
                    'WKPOS_LOGIN_COLOR',
                    Configuration::get('WKPOS_LOGIN_COLOR')
                ),
                'WKPOS_BUTTON_COLOR' => Tools::getValue(
                    'WKPOS_BUTTON_COLOR',
                    Configuration::get('WKPOS_BUTTON_COLOR')
                ),
                'WKPOS_SHOW_ORIGINAL_PRICE' => Tools::getValue(
                    'WKPOS_SHOW_ORIGINAL_PRICE',
                    Configuration::get('WKPOS_SHOW_ORIGINAL_PRICE')
                ),
                'WKPOS_SHOW_STOCK_LOCATION' => Tools::getValue(
                    'WKPOS_SHOW_STOCK_LOCATION',
                    Configuration::get('WKPOS_SHOW_STOCK_LOCATION')
                ),
                'WKPOS_CASH_REGISTER_STATUS' => Tools::getValue(
                    'WKPOS_CASH_REGISTER_STATUS',
                    Configuration::get('WKPOS_CASH_REGISTER_STATUS')
                ),
            ]
        );

        return parent::renderForm();
    }

    /**
     * Display the blog pdf details
     *
     * @return void
     */
    public function blogPdfForm()
    {
        $protocolLink = (Configuration::get('PS_SSL_ENABLED') || Tools::usingSecureMode()) ? 'https://' : 'http://';
        $protocolLink = $protocolLink . Tools::getShopDomainSsl();
        $this->context->smarty->assign(
            [
                'doc_url' => $protocolLink . __PS_BASE_URI__ . 'modules/wkpos/doc_en.pdf',
            ]
        );

        return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'wkpos/views/templates/admin/document.tpl');
        // $this->fields_form = array(
        //     'legend' => array(
        //         'title' => $this->l('Documentation'),
        //         'icon' => 'icon-book',
        //     ),
        //     'description' => $this->l('Refer the').$document.
        //     $this->l('to checkout the complete workflow of the PrestaShop Point Of Sale (POS) module.'),
        // );
        // return parent::renderForm();
    }

    /**
     * Display the product details form
     *
     * @return void
     */
    public function productForm()
    {
        $productSearchType = [
            [
                'id' => 1,
                'type' => $this->l('Product ID'),
                'val' => 1,
            ],
            [
                'id' => 2,
                'type' => $this->l('Product name'),
                'val' => 2,
            ],
            [
                'id' => 3,
                'type' => $this->l('Product tags'),
                'val' => 3,
            ],
            [
                'id' => 4,
                'type' => $this->l('EAN'),
                'val' => 4,
            ],
            [
                'id' => 5,
                'type' => $this->l('UPC'),
                'val' => 5,
            ],
            [
                'id' => 6,
                'type' => $this->l('REF'),
                'val' => 6,
            ],
            [
                'id' => 7,
                'type' => $this->l('ISBN'),
                'val' => 7,
            ],
        ];

        $barcodeType = [
            [
                'id' => 4,
                'type' => $this->l('EAN'),
                'val' => 4,
            ],
            [
                'id' => 5,
                'type' => $this->l('UPC'),
                'val' => 5,
            ],
            [
                'id' => 7,
                'type' => $this->l('ISBN'),
                'val' => 7,
            ],
        ];

        $this->fields_form = [
            'legend' => [
                'title' => $this->l('Product'),
                'icon' => 'icon-book',
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => $this->l('Product name length'),
                    'name' => 'product_name_length',
                    'class' => 'fixed-width-md',
                    'required' => true,
                    'form_group_class' => 'wkpos_name_length',
                    'suffix' => '<i class="icon-question-circle" ></i>',
                    // 'hint' => '<i class="icon-question-circle"></i>'
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Quantity for low stock warning'),
                    'name' => 'low_stock_qty',
                    'required' => true,
                    'class' => 'fixed-width-md',
                    'form_group_class' => 'wkpos_qty_low',
                    'suffix' => '<i class="icon-question-circle" ></i>',
                ],
                [
                    'type' => 'checkbox',
                    'label' => $this->l('Search product by'),
                    'name' => 'product_search[]',
                    'required' => true,
                    'values' => [
                        'query' => $productSearchType,
                        'id' => 'id',
                        'name' => 'type',
                    ],
                    'expand' => [
                        'print_total' => count($productSearchType),
                        'default' => 'show',
                        'show' => ['text' => $this->l('show'), 'icon' => 'plus-sign-alt'],
                        'hide' => ['text' => $this->l('hide'), 'icon' => 'minus-sign-alt'],
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Barcode search type'),
                    'name' => 'barcode_search_type',
                    'class' => 'fixed-width-md',
                    'options' => [
                        'query' => $barcodeType,
                        'id' => 'id',
                        'name' => 'type',
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Remove product from cart'),
                    'desc' => $this->l('If yes then disabled or deleted products of outlet are removed from the cart.'),
                    'name' => 'remove_product',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Synchronise product quantity'),
                    'hint' => $this->l('If yes, PrestaShop product quantity will be synchronised with POS outlet quantity.'),
                    'name' => 'synchronise_quantity',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Default POS outlet'),
                    'name' => 'wkpos_default_outlet',
                    'hint' => $this->l('If \'No\' outlet is selected outlet product will be managed randomly.'),
                    'desc' => $this->l('The quantity of online product order will be managed from selected outlet.'),
                    'options' => [
                        'query' => WkPosOutlets::getOutlets(),
                        'id' => 'id_wkpos_outlet',
                        'name' => 'name',
                        'default' => [
                            'value' => 0,
                            'label' => $this->l('-- Select --'),
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Display tag on combination products'),
                    'hint' => $this->l('If yes, tag gets displayed on product'),
                    'name' => 'combination_tag',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Show outlet product active on assign'),
                    'hint' => $this->l('If yes, outlet product will gets displayed in the front end.'),
                    'name' => 'outlet_product_active',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
            ],
            'submit' => [
                'title' => $this->l('Save'),
                'name' => 'submitWkPosProductConfiguration',
            ],
        ];
        $searchedProduct = [];
        $productSearchSelected = explode(',', Configuration::get('WKPOS_PRODUCT_SEARCH_TYPE'));
        foreach ($productSearchSelected as $productSearchType) {
            $searchedProduct['product_search[]_' . $productSearchType] = true;
        }
        unset($this->fields_value);
        $this->fields_value = array_merge(
            $searchedProduct,
            [
                'product_name_length' => Tools::getValue(
                    'product_name_length',
                    Configuration::get('WKPOS_PRODUCT_NAME_LENGTH')
                ),
                'low_stock_qty' => Tools::getValue(
                    'low_stock_qty',
                    Configuration::get('WKPOS_LOW_STOCK')
                ),
                'combination_tag' => Tools::getValue(
                    'combination_tag',
                    Configuration::get('WKPOS_COMBINATION_TAG_ENABLE')
                ),
                'synchronise_quantity' => Tools::getValue(
                    'synchronise_quantity',
                    Configuration::get('WKPOS_SYNCHRONISE_QUANTITY')
                ),
                'outlet_product_active' => Tools::getValue(
                    'outlet_product_active',
                    Configuration::get('WKPOS_OUTLET_PRODUCT_ACTIVE')
                ),
                'special_price_tag' => Tools::getValue(
                    'special_price_tag',
                    Configuration::get('WKPOS_SPECIAL_PRICE_ENABLE')
                ),
                'barcode_search_type' => Tools::getValue(
                    'barcode_search_type',
                    Configuration::get('WKPOS_BARCODE_SEARCH_TYPE')
                ),
                'wkpos_default_outlet' => Tools::getValue(
                    'wkpos_default_outlet',
                    Configuration::get('WKPOS_DEFAULT_OUTLET')
                ),
                'remove_product' => Tools::getValue(
                    'remove_product',
                    Configuration::get('WKPOS_PRODUCT_REMOVE')
                ),
            ]
        );

        return parent::renderForm();
    }

    /**
     * Display the  customer configuration settings
     *
     * @return void
     */
    public function customerForm()
    {
        $customerSearchType = [
            [
                'search_id' => 1,
                'name' => $this->l('Name'),
            ],
            [
                'search_id' => 2,
                'name' => $this->l('Email'),
            ],
            [
                'search_id' => 3,
                'name' => $this->l('Phone'),
            ],
        ];
        $this->fields_form = [
            'legend' => [
                'title' => $this->l('Customer'),
                'icon' => 'icon-user',
            ],
            'input' => [
                [
                    'type' => 'switch',
                    'label' => $this->l('Guest checkout'),
                    'hint' => $this->l('If yes, selected customer details will be used in case of guest checkout.'),
                    'name' => 'guest_checkout',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Guest account'),
                    'name' => 'guest_account',
                    'required' => true,
                    'autocomplete' => 'off',
                    'disabled' => true,
                ],
                [
                    'type' => 'text',
                    'name' => 'guest_result',
                    'disabled' => true,
                    'class' => 'hidden',
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Customer group selection'),
                    'hint' => $this->l('If yes, customer group selection option will be show on POS.'),
                    'name' => 'WKPOS_CUSTOMER_GROUP',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Set default customer search type'),
                    'name' => 'WKPOS_DEFAULT_SEARCH_TYPE',
                    'class' => 'fixed-width-md',
                    'options' => [
                        'query' => $customerSearchType,
                        'id' => 'search_id',
                        'name' => 'name',
                    ],
                ],
            ],
            'submit' => [
                'title' => $this->l('Save'),
                'name' => 'submitWkPosCustomerConfiguration',
            ],
        ];
        unset($this->fields_value);
        $this->fields_value = [
            'guest_checkout' => Tools::getValue(
                'guest_checkout',
                Configuration::get('WKPOS_GUEST_ACCOUNT_ENABLE')
            ),
            'guest_account' => Tools::getValue(
                'guest_account',
                Configuration::get('WKPOS_GUEST_ACCOUNT')
            ),
            'WKPOS_CUSTOMER_GROUP' => Tools::getValue(
                'WKPOS_CUSTOMER_GROUP',
                Configuration::get('WKPOS_CUSTOMER_GROUP')
            ),
            'WKPOS_DEFAULT_SEARCH_TYPE' => Tools::getValue(
                'WKPOS_DEFAULT_SEARCH_TYPE',
                Configuration::get('WKPOS_DEFAULT_SEARCH_TYPE')
            ),
            'guest_result' => '',
        ];

        return parent::renderForm();
    }

    /**
     * Display the payment configuration settings
     *
     * @return void
     */
    public function paymentForm()
    {
        $idLang = Context::getContext()->language->id;
        $paymentDetails = WkPosPayment::getPaymentDetail();
        $refundOptions = array_merge(
            [
                [
                    'id_group' => 0,
                    'name' => 'Vouchers',
                ],
            ],
            $paymentDetails
        );
        $orderStatuses = OrderState::getOrderStates($idLang);
        $this->fields_form = [
            'legend' => [
                'title' => $this->l('Payment'),
                'icon' => 'icon-money',
            ],
            'input' => [
                [
                    'type' => 'group',
                    'id' => 'payment',
                    'label' => $this->l('Payment method'),
                    'name' => 'payment_method',
                    'required' => true,
                    'values' => $paymentDetails,
                    'col' => '6',
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Order status'),
                    'class' => 'fixed-width-xxl',
                    'desc' => $this->l('Selected order status will be assigned when order is validated on POS.'),
                    'name' => 'WKPOS_ORDER_STATUS_PAYMENT',
                    'options' => [
                        'query' => $orderStatuses,
                        'id' => 'id_order_state',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Order return payment method'),
                    'desc' => $this->l('Edit order payment will be managed through selected payment method.'),
                    'name' => 'WKPOS_ORDER_EDIT_PAYMENT',
                    'options' => [
                        'query' => $refundOptions,
                        'id' => 'id_group',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Partial use'),
                    'hint' => $this->l('If yes, generated voucher can be used partially.'),
                    'name' => 'WKPOS_PAYMENT_PARTIAL_VOUCHER',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
            ],
            'submit' => [
                'title' => $this->l('Save'),
                'name' => 'submitWkPosPaymentConfiguration',
            ],
        ];
        unset($this->fields_value);
        $payment = [
            'WKPOS_ORDER_EDIT_PAYMENT' => Tools::getValue(
                'WKPOS_ORDER_EDIT_PAYMENT',
                Configuration::get('WKPOS_ORDER_EDIT_PAYMENT')
            ),
            'WKPOS_PAYMENT_PARTIAL_VOUCHER' => Tools::getValue(
                'WKPOS_PAYMENT_PARTIAL_VOUCHER',
                Configuration::get('WKPOS_PAYMENT_PARTIAL_VOUCHER')
            ),
            'WKPOS_ORDER_STATUS_PAYMENT' => Tools::getValue(
                'WKPOS_ORDER_STATUS_PAYMENT',
                Configuration::get('WKPOS_ORDER_STATUS_PAYMENT')
            ),
        ];

        if ($paymentData = WkPosPayment::getPaymentDetail()) {
            foreach ($paymentData as $paymentMethod) {
                if ($paymentMethod['active']) {
                    $groupVal = 1;
                } else {
                    $groupVal = '';
                }
                $payment['groupBox_' . $paymentMethod['id_group']] = $groupVal;
            }
        }
        $this->fields_value = $payment;

        return parent::renderForm();
    }

    /**
     * Display the order receipt settings
     *
     * @return void
     */
    public function orderReceiptDetailsForm()
    {
        $printingType = [
            [
                'id_type' => 1,
                'name' => $this->l('Raw printing'),
            ],
            [
                'id_type' => 2,
                'name' => $this->l('HTML printing'),
            ],
        ];
        $this->fields_form = [
            'legend' => [
                'title' => $this->l('Order receipt'),
                'icon' => 'icon-file',
            ],
            'input' => [
                [
                    'type' => 'select',
                    'label' => $this->l('Select printing type'),
                    'name' => 'WKPOS_PRINT_TYPE',
                    'options' => [
                        'query' => $printingType,
                        'id' => 'id_type',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Printer name'),
                    'name' => 'printer_name',
                    'class' => 'fixed-width-xl',
                    'form_group_class' => 'raw_print',
                    'desc' => $this->l('If printer name is added then, system will connect to this specified printer.'),
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Printer encoding'),
                    'name' => 'printer_encoding',
                    'class' => 'fixed-width-xl',
                    'form_group_class' => 'raw_print',
                    'required' => true,
                    'desc' => $this->l('Deafult encoding is Cp850, you can fill supported code page for your printer.'),
                ],
                // array(
                //     'type' => 'text',
                //     'label' => $this->l('Enter Printer Connected Ip Address'),
                //     'name' => 'printer_ip_addresss',
                //     'form_group_class' => 'raw_print',
                //     'class' => 'fixed-width-lg',
                //     'required' => true
                // ),
                [
                    'type' => 'switch',
                    'label' => $this->l('Connect printer automatically'),
                    'hint' => $this->l('If yes, Printer will get connected automatically on page load.'),
                    'name' => 'WKPOS_PRINTER_AUTO_CONNECT',
                    'form_group_class' => 'raw_print',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Open cash drawer'),
                    'name' => 'enable_cash_drawer',
                    'form_group_class' => 'raw_print',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Yes'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('No'),
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Display product discount'),
                    'hint' => $this->l('If yes, product discount gets displayed in order bill.'),
                    'name' => 'display_product_discount',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Send email to customer on order through POS'),
                    'name' => 'WKPOS_ORDER_CONFIRMATION_EMAIL',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Yes'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('No'),
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Display order discount'),
                    'hint' => $this->l('If yes, order discount gets displayed in order bill.'),
                    'name' => 'display_order_discount',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Display barcode'),
                    'hint' => $this->l('If yes, barcode will display on order bill'),
                    'name' => 'display_barcode',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
            ],
            'submit' => [
                'title' => $this->l('Save'),
                'name' => 'submitWkPosOrderReceiptConfiguration',
            ],
        ];
        unset($this->fields_value);
        $this->fields_value = [
            'WKPOS_PRINT_TYPE' => Tools::getValue(
                'WKPOS_PRINT_TYPE',
                Configuration::get('WKPOS_PRINT_TYPE')
            ),
            'printer_name' => Tools::getValue(
                'printer_name',
                Configuration::get('WKPOS_PRINTER_NAME')
            ),
            'printer_encoding' => Tools::getValue(
                'printer_encoding',
                Configuration::get('WKPOS_PRINTER_ENCODING')
            ),
            'WKPOS_ORDER_CONFIRMATION_EMAIL' => Tools::getValue(
                'WKPOS_ORDER_CONFIRMATION_EMAIL',
                Configuration::get('WKPOS_ORDER_CONFIRMATION_EMAIL')
            ),
            'display_product_discount' => Tools::getValue(
                'display_product_discount',
                Configuration::get('WKPOS_DISPLAY_PRODUCT_DISCOUNT')
            ),
            'WKPOS_PRINTER_AUTO_CONNECT' => Tools::getValue(
                'WKPOS_PRINTER_AUTO_CONNECT',
                Configuration::get('WKPOS_PRINTER_AUTO_CONNECT')
            ),
            'display_order_discount' => Tools::getValue(
                'display_order_discount',
                Configuration::get('WKPOS_DISPLAY_ORDER_DISCOUNT')
            ),
            'display_barcode' => Tools::getValue(
                'display_barcode',
                Configuration::get('WKPOS_DISPLAY_BARCODE')
            ),
            'enable_cash_drawer' => Tools::getValue(
                'enable_cash_drawer',
                Configuration::get('WKPOS_ENABLE_CASH_DRAWER')
            ),
        ];

        return parent::renderForm();
    }

    /**
     * Display the shipping settings
     *
     * @return void
     */
    public function shippingForm()
    {
        $carriers = Carrier::getCarriers(
            Configuration::get('PS_LANG_DEFAULT'),
            true,
            false,
            false,
            [Configuration::get('WKPOS_CUSTOMER_GROUP')],
            ALL_CARRIERS
        );
        unset($this->fields_value);
        $defaultCarriers = [];
        $shippingCarriers = [];
        $shipping = [];
        if ($carriers) {
            $selectedCarriers = explode(',', Configuration::get('WKPOS_SHIPPING_METHOD'));
            foreach ($carriers as $carrier) {
                if ($selectedCarriers && in_array($carrier['id_reference'], $selectedCarriers)) {
                    $groupVal = 1;
                    $defaultCarriers[] = [
                        'id' => 'id_reference',
                        'value' => $carrier['id_reference'],
                        'label' => $carrier['name'],
                        'id_group' => $carrier['id_reference'],
                        'name' => $carrier['name'],
                        'id_reference' => $carrier['id_reference'],
                    ];
                } else {
                    $groupVal = '';
                }

                $shipping['groupBox_' . $carrier['id_reference']] = $groupVal;
                $shippingCarriers[] = [
                    'id' => 'id_reference',
                    'value' => $carrier['id_reference'],
                    'label' => $carrier['name'],
                    'id_group' => $carrier['id_reference'],
                    'name' => $carrier['name'],
                    'id_reference' => $carrier['id_reference'],
                ];
            }
        }
        $this->fields_form = [
            'legend' => [
                'title' => $this->l('Shipping'),
                'icon' => 'icon-truck',
            ],
            'input' => [
                [
                    'type' => 'switch',
                    'label' => $this->l('Shipping'),
                    'name' => 'enable_shipping',
                    'hint' => $this->l('If yes, shipping option will be displayed in front end'),
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Yes'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('No'),
                        ],
                    ],
                ],
                [
                    'type' => 'group',
                    'label' => $this->l('Shipping method'),
                    'name' => 'shipping_method',
                    'required' => true,
                    'values' => $shippingCarriers,
                    'form_group_class' => 'wkpos_shipping',
                    'col' => '6',
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Default shipping'),
                    'name' => 'default_shipping',
                    'options' => [
                        'query' => $defaultCarriers,
                        'id' => 'id_reference',
                        'name' => 'name',
                    ],
                ],
            ],
            'submit' => [
                'title' => $this->l('Save'),
                'name' => 'submitWkPosShippingConfiguration',
            ],
        ];
        $this->fields_value = array_merge(
            $shipping,
            [
                'default_shipping' => Configuration::get('WKPOS_DEFAULT_SHIPPING'),
                'enable_shipping' => Configuration::get('WKPOS_ENABLE_SHIPPING'),
            ]
        );

        return parent::renderForm();
    }

    /**
     * Add the js and css in the controller
     *
     * @return void
     */
    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);
        Media::addJsDef(
            [
                'posConfigUrl' => $this->context->link->getAdminLink('AdminWkPosConfiguration'),
                'lowStockImg' => _MODULE_DIR_ . 'wkpos/views/img/product_qty_alert.png',
                'combinationImg' => _MODULE_DIR_ . 'wkpos/views/img/product_combi_tag.png',
                'productNameLengthImg' => _MODULE_DIR_ . 'wkpos/views/img/product_name.png',
                'posToken' => $this->module->secure_key,
                'current_config_tab' => $this->current_config_tab,
            ]
        );
        $this->context->controller->addJS(_MODULE_DIR_ . 'wkpos/views/js/search_customer.js');
        $this->context->controller->addCSS(_MODULE_DIR_ . 'wkpos/views/css/wkpos_configuration.css');

        $this->context->controller->addJS(
            _MODULE_DIR_ . 'wkpos/views/js/wkposconfig.js'
        );
        $this->context->controller->addCSS(
            _MODULE_DIR_ . 'wkpos/views/css/wkposconfig.css'
        );

        // Cross selling banner code
        Media::addJsDef([
            'wkModuleAddonKey' => $this->module->module_key,
            'wkModuleAddonsId' => 31497,
            'wkModuleTechName' => $this->module->name,
        ]);
        $this->addJs('https://prestashop.webkul.com/crossselling/wkcrossselling.js?t=' . time());
    }

    /**
     * Search the POS customer
     *
     * @return void
     */
    public function ajaxProcessSearchPosCustomers()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $searches = explode(' ', Tools::getValue('customer_search'));
            $customers = [];
            $searches = array_unique($searches);
            foreach ($searches as $search) {
                if (!empty($search)
                    && $results = WkPosCustomer::searchByName(
                        $search,
                        // Configuration::get('WKPOS_CUSTOMER_GROUP'),
                        0,
                        50
                    )
                ) {
                    foreach ($results as $result) {
                        if ($result['active']) {
                            $customers[$result['id_customer']] = $result;
                        }
                    }
                }
            }

            if (count($customers)) {
                $toReturn = [
                    'customers' => $customers,
                    'found' => true,
                ];
            } else {
                $toReturn = ['found' => false];
            }
            $toReturn['hasError'] = false;

            $this->ajaxRender(json_encode($toReturn));
        } else {
            $this->ajaxRender(json_encode(['hasError' => true, 'errors' => ['Invalid Access Token']]));
        }
        exit;
    }
}
