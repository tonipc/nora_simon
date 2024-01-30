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
use PrestaShop\PrestaShop\Adapter\Presenter\Object\ObjectPresenter;
use PrestaShop\PrestaShop\Adapter\SymfonyContainer;
use PrestaShop\PrestaShop\Core\Localization\Locale;
use PrestaShop\PrestaShop\Core\Localization\Number\Formatter;

class WkPosModuleFrontController extends ModuleFrontController
{
    public const DEFAULT_SPECIFICATION_SYMBOL = [
        '.',
        ',',
        ';',
        '%',
        '-',
        '+',
        'E',
        '×',
        '‰',
        '∞',
        'NaN',
    ];

    protected $jsFiles = [];
    protected $cssFiles = [];
    protected $jsVariables = [];
    protected $posController;
    protected $idWkPosOutlet;
    protected $idEmployee;
    protected $idOutletEmployee;
    protected $idWkPosOutletEmployee;
    protected $idWkPosSession;
    protected $posSession;
    protected $controlPanel;

    public $objOutletEmployee;
    public $objEmployee;
    protected $isSeller;

    public function init()
    {
        parent::init();
        $this->display_column_left = false;
        $this->display_header = false;
        $this->display_footer = false;
        $this->display_column_right = false;
        $this->addJquery();
        $this->idWkPosOutletEmployee = $this->context->cookie->id_wkpos_outlet_employee;
        $this->idOutletEmployee = $this->context->cookie->id_outlet_employee;
        $this->objOutletEmployee = new WkPosOutletEmployee($this->idOutletEmployee);
        $this->idWkPosOutlet = $this->objOutletEmployee->id_wkpos_outlet;
        $this->idEmployee = $this->context->cookie->id_employee;
        if (isset($this->context->cookie->isSeller)) {
            $this->isSeller = true;
            $this->objEmployee = new Customer($this->idEmployee);
            Hook::exec('actionPOSEmployeeAuthentication');
        } else {
            $this->isSeller = false;
            $this->objEmployee = new Employee($this->idEmployee);
            if ($this->objEmployee->id == null || empty($this->objEmployee->active)) {
                Tools::redirect($this->context->link->getModuleLink('wkpos', 'login', ['poslogout' => 1]));
            }
            if (empty($this->idEmployee)) {
                Tools::redirect($this->context->link->getModuleLink('wkpos', 'login'));
            }
        }

        Hook::exec('actionAfterInitContent');
    }

    public function posAddJS($filePath)
    {
        if (!is_array($filePath)) {
            $filePath = [$filePath];
        }
        $this->jsFiles = array_merge($this->jsFiles, $filePath);
    }

    public function posAddCss($filePath)
    {
        if (!is_array($filePath)) {
            $filePath = [$filePath];
        }
        $this->cssFiles = array_merge($this->cssFiles, $filePath);
    }

    /**
     * Prepare price specifications to display cldr prices in javascript context.
     *
     * @param Context $context
     *
     * @return array
     */
    private function preparePriceSpecifications(Context $context)
    {
        /* @var Currency */
        $currency = $context->currency;
        /* @var PriceSpecification */
        $priceSpecification = $context->getCurrentLocale()->getPriceSpecification($currency->iso_code);
        if (empty($priceSpecification)) {
            return [];
        }

        return array_merge(
            ['symbol' => self::DEFAULT_SPECIFICATION_SYMBOL],
            $priceSpecification->toArray()
        );
    }

    private function replaceCurrencyFormat($context)
    {
        $numberSpecification = $context->getCurrentLocale()->getNumberSpecification();
        if (empty($numberSpecification)) {
            return [];
        }

        $symbols = $numberSpecification->getSymbolsByNumberingSystem(Locale::NUMBERING_SYSTEM_LATIN);
        $replacements = [
            Formatter::DECIMAL_SEPARATOR_PLACEHOLDER => $symbols->getDecimal(),
            Formatter::GROUP_SEPARATOR_PLACEHOLDER => $symbols->getGroup(),
            Formatter::MINUS_SIGN_PLACEHOLDER => $symbols->getMinusSign(),
            Formatter::PERCENT_SYMBOL_PLACEHOLDER => $symbols->getPercentSign(),
            Formatter::PLUS_SIGN_PLACEHOLDER => $symbols->getPlusSign(),
        ];

        return $replacements;
    }

    /**
     * Prepare number specifications to display cldr numbers in javascript context.
     *
     * @param Context $context
     *
     * @return array
     */
    private function prepareNumberSpecifications(Context $context)
    {
        /* @var NumberSpecification */
        $numberSpecification = $context->getCurrentLocale()->getNumberSpecification();
        if (empty($numberSpecification)) {
            return [];
        }

        return array_merge(
            ['symbol' => self::DEFAULT_SPECIFICATION_SYMBOL],
            $numberSpecification->toArray()
        );
    }

    public function posSetMedia()
    {
        $this->posAddJS(
            [
                _PS_JS_DIR_ . 'jquery/jquery-1.11.0.min.js',
                _MODULE_DIR_ . 'wkpos/views/js/bootstrap.min.js',
                _PS_JS_DIR_ . 'jquery/jquery-migrate-1.2.1.min.js',
                'https://code.jquery.com/ui/1.9.2/jquery-ui.js',
                _MODULE_DIR_ . 'wkpos/views/js/cldr/cldr.bundle.js',
                _MODULE_DIR_ . 'wkpos/views/js/JsBarcode.min.js',
                _MODULE_DIR_ . 'wkpos/views/js/rsvp-3.1.0.min.js',
                _MODULE_DIR_ . 'wkpos/views/js/sha-256.min.js',
                _MODULE_DIR_ . 'wkpos/views/js/qz-tray.js',
                _PS_JS_DIR_ . 'validate.js',
                _PS_JS_DIR_ . 'tools.js',
                _MODULE_DIR_ . 'wkpos/views/js/jquery.growl.js',
                _MODULE_DIR_ . 'wkpos/views/js/knockout.js',
                _MODULE_DIR_ . 'wkpos/views/js/knockout.mapping-latest.js',
            ]
        );
        $this->posAddCss(
            [
                _MODULE_DIR_ . 'wkpos/views/css/bootstrap.min.css',
                _MODULE_DIR_ . 'wkpos/views/css/custom.css',
                _MODULE_DIR_ . 'wkpos/views/css/jquery.growl.css',
                'https://fonts.googleapis.com/css?family=Roboto:400,400i,500,700',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
                'https://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css',
            ]
        );

        Hook::exec(
            'actionPosSetMedia',
            [
                'jsFiles' => &$this->jsFiles,
                'cssFiles' => &$this->cssFiles,
                'jsVariables' => &$this->jsVariables,
            ]
        );
    }

    public function posAddJsDef($vars)
    {
        if (!is_array($vars)) {
            $vars = [$vars];
        }
        $this->jsVariables = array_merge($this->jsVariables, $vars);
    }

    public function posAddJsDefL($vars)
    {
        if (!is_array($vars)) {
            $vars = [$vars];
        }
        $this->jsVariables = array_merge($this->jsVariables, $vars);
    }

    public static function getContextLocale(Context $context)
    {
        $locale = $context->getCurrentLocale();
        if (null !== $locale) {
            return $locale;
        }

        $container = isset($context->controller) ? $context->controller->getContainer() : null;
        if (null === $container) {
            $container = SymfonyContainer::getInstance();
        }

        /** @var LocaleRepository $localeRepository */
        $localeRepository = $container->get(self::SERVICE_LOCALE_REPOSITORY);
        $locale = $localeRepository->getLocale(
            $context->language->getLocale()
        );

        return $locale;
    }

    public function setPosVariables()
    {
        $idShop = $this->context->shop->id;
        $idShopGroup = $this->context->shop->id_shop_group;
        $objOutlet = new WkPosOutlets($this->idWkPosOutlet);
        $this->context->cart = new Cart();
        $address = new Address($objOutlet->id_address);

        $posSales = $this->context->link->getModuleLink('wkpos', 'sale');
        $employeeDetails = $this->objEmployee;
        $paymentDetails = WkPosPayment::getActivePaymentDetail();
        $posSessionStatus = 0;
        $controlSession = 0;

        if (Configuration::get(
            'WKPOS_GUEST_ACCOUNT_ENABLE',
            null,
            $idShopGroup,
            $idShop,
            false
        )) {
            $customer = Customer::getCustomersByEmail(Configuration::get('WKPOS_GUEST_ACCOUNT'));
            if ($customer) {
                $customerName = $customer[0]['firstname'] . ' ' . $customer[0]['lastname'];
                $this->posAddJsDef(
                    [
                        'idGuest' => $customer[0]['id_customer'],
                        'guestName' => $customerName,
                    ]
                );
            }
        }

        // $objCurrency = new Currency(Configuration::get('PS_CURRENCY_DEFAULT'));
        $objCurrency = $this->context->currency;

        if (_PS_VERSION_ >= '1.7.6.0') {
            $locale = static::getContextLocale($this->context);
            $positiveFormat = $locale->getNumberSpecification()->getPositivePattern();
            $this->posAddJsDef(
                [
                    'currency_specifications' => $this->preparePriceSpecifications($this->context),
                    'number_specifications' => $this->prepareNumberSpecifications($this->context),
                    'number_formatter' => $this->replaceCurrencyFormat($this->context),
                ]
            );
        } else {
            $positiveFormat = $objCurrency->format;
        }

        $defaultGroup = [
            (int) Configuration::get('WKPOS_CUSTOMER_GROUP'),
            (int) Configuration::get('PS_CUSTOMER_GROUP'),
        ];
        $defaultSearchTypeId = (int) Configuration::get('WKPOS_DEFAULT_SEARCH_TYPE');
        $defaultSearchType = $this->module->customerSearchType[$defaultSearchTypeId - 1]['name'];
        $idLang = $this->context->language->id;
        $this->posAddJsDef(
            [
                'posSales' => $posSales,
                'defaultSearchType' => $defaultSearchType,
                'defaultSearchTypeId' => $defaultSearchTypeId,
                'customerSearchTypes' => $this->module->customerSearchType,
                'allowOOSConfig' => Configuration::get('PS_ORDER_OUT_OF_STOCK'),
                'psVersion' => _PS_VERSION_,
                'langIsoCode' => $this->context->language->iso_code,
                'posController' => $this->posController,
                'idEmployee' => $this->idOutletEmployee,
                'orderUrl' => $this->context->link->getModuleLink('wkpos', 'order'),
                'productSearchMethods' => Configuration::get('WKPOS_PRODUCT_SEARCH_TYPE'),
                'defaultPaymentMethod' => $paymentDetails[0]['name'],
                'defaultIdPaymentMethod' => $paymentDetails[0]['id_wkpos_payment'],
                'wkposLogin' => $this->context->link->getModuleLink('wkpos', 'login'),
                'currencySign' => $objCurrency->sign,
                'currencyBlank' => $objCurrency->blank,
                'currencyFormat' => $positiveFormat,
                'priceDisplayPrecision' => 2,
                'employeeName' => $employeeDetails->firstname . ' ' . $employeeDetails->lastname,
                'shopName' => Configuration::get('WKPOS_SHOP_NAME', $idLang),
                'validateSession' => Configuration::get('WKPOS_CASH_VALIDATE'),
                'contactDetails' => $address->phone,
                'displayBarcode' => Configuration::get('WKPOS_DISPLAY_BARCODE'),
                'openCashDrawer' => Configuration::get('WKPOS_ENABLE_CASH_DRAWER'),
                'selectedPrinterName' => Configuration::get('WKPOS_PRINTER_NAME'),
                'barcodeType' => Configuration::get('WKPOS_BARCODE_SEARCH_TYPE'),
                'changePriceType' => Configuration::get('WKPOS_CHANGE_PRODUCT_PRICE'),
                'removePosProduct' => Configuration::get('WKPOS_PRODUCT_REMOVE'),
                // 'printerIpAddress' => Configuration::get('WKPOS_PRINTER_IP_ADDRESS'),
                'idWkPosOutlet' => $this->idWkPosOutlet,
                // 'outletAddress' => $objOutlet->address,
                'outletCity' => $address->city,
                'outletPhone' => $address->phone,
                'outletAddress1' => $address->address1,
                'outletAddress2' => $address->address2,
                'outletPostCode' => $address->postcode,
                'outletCountry' => $address->country,
                'outletState' => State::getNameById($address->id_state),
                'idOutletAddress' => $objOutlet->id_address,
                'defaultGroup' => Configuration::get('WKPOS_CUSTOMER_GROUP'),
                'defaultGroupAccess' => $defaultGroup,
                'guestAccountEnabled' => (bool) Configuration::get(
                    'WKPOS_GUEST_ACCOUNT_ENABLE',
                    null,
                    $idShopGroup,
                    $idShop,
                    false
                ),
                'shippingEnabled' => (bool) Configuration::get('WKPOS_ENABLE_SHIPPING'),
                'posToken' => $this->module->secure_key,
                'psPrecision' => Configuration::get('PS_PRICE_DISPLAY_PRECISION') ?
                Configuration::get('PS_PRICE_DISPLAY_PRECISION') : Configuration::get('WKPOS_PRICE_DISPLAY_PRECISION'),
                'psRoundType' => Configuration::get('PS_ROUND_TYPE'),
                'posSessionStatus' => $posSessionStatus,
                'controlSession' => $controlSession,
                'wkposPrintType' => Configuration::get('WKPOS_PRINT_TYPE'),
                'signOnOrderReciept' => Configuration::get('WKPOS_DIGITAL_SIGN_ON_RECIEPT') ?
                Configuration::get('WKPOS_DIGITAL_SIGN_ON_RECIEPT') : 0,
                'signOnCashRegister' => Configuration::get('WKPOS_DIGITAL_SIGN_ON_CASH_REGISTER') ?
                Configuration::get('WKPOS_DIGITAL_SIGN_ON_CASH_REGISTER') : 0,
                'signOnOrderListing' => Configuration::get('WKPOS_DIGITAL_SIGN_ON_PS_ORDER_LISTING') ?
                Configuration::get('WKPOS_DIGITAL_SIGN_ON_PS_ORDER_LISTING') : 0,
                'printerEncoding' => Configuration::get('WKPOS_PRINTER_ENCODING'),
                'showPriceWithoutReduction' => Configuration::get('WKPOS_SHOW_ORIGINAL_PRICE') ? 1 : 0,
                'showStockLocation' => Configuration::get('WKPOS_SHOW_STOCK_LOCATION') ? 1 : 0,
                'displayProductDiscount' => Configuration::get('WKPOS_DISPLAY_PRODUCT_DISCOUNT') ? 1 : 0,
                'displayOrderDiscountWk' => Configuration::get('WKPOS_DISPLAY_ORDER_DISCOUNT') ? 1 : 0,
                'wkDigitalCertUrl' => _MODULE_DIR_ . 'wkpos/views/certs/digital-certificate.txt',
                'wkSignRequestUrl' => $this->context->link->getModuleLink(
                    'wkpos',
                    'login',
                    ['ajax' => 1, 'action' => 'signRequest', 'posToken' => $this->module->secure_key]
                ),
                'invoice_logo' => _PS_BASE_URL_SSL_ . _PS_IMG_ . Configuration::get('PS_LOGO'),
                'cashRegisterStatus' => Configuration::get('WKPOS_CASH_REGISTER_STATUS'),
            ]
        );

        $this->posAddJsDefL(
            [
                'stockUpdated' => $this->l('Stock updated successfully.', 'modulefrontcontroller'),
                'noProductFound' => $this->module->l('No product found.', 'modulefrontcontroller'),
                'loadingPosProduct' => $this->module->l('Loading products', 'modulefrontcontroller'),
                'qzTrayLoadError' => $this->module->l('Please run QZ tray in background, allow request to process', 'modulefrontcontroller'),
                'printerConnectedSuccess' => $this->module->l('Printer connected successfully', 'modulefrontcontroller'),
                'printerDisconnectSuccess' => $this->module->l('Printer disconnected', 'modulefrontcontroller'),
                'orderSyncBeforeClose' => $this->module->l('Before session close synchronize the offline orders first.', 'modulefrontcontroller'),
                'errorPosProduct' => $this->module->l('Could not load Products', 'modulefrontcontroller'),
                'loadingPosCategory' => $this->module->l('Loading category', 'modulefrontcontroller'),
                'errorPosCategory' => $this->module->l('Could not load category', 'modulefrontcontroller'),
                'loadingPosOrders' => $this->module->l('Loading orders', 'modulefrontcontroller'),
                'errorPosOrders' => $this->module->l('Could not load Load Orders', 'modulefrontcontroller'),
                'loadingPosCustomers' => $this->module->l('Loading customers', 'modulefrontcontroller'),
                'errorPosCustomers' => $this->module->l('Could not load customers', 'modulefrontcontroller'),
                'customerName' => $this->module->l('Customer', 'modulefrontcontroller'),
                'addCustomerHeading' => $this->module->l('Add customer', 'modulefrontcontroller'),
                'editCustomerHeading' => $this->module->l('Edit customer', 'modulefrontcontroller'),
                'deliveryAddressError' => $this->module->l('The delivery address country is not active.', 'modulefrontcontroller'),
                'wkProductNotAvailable' => $this->module->l('Product not available for order', 'modulefrontcontroller'),
                'wkQuantityNotifi' => $this->module->l('product does not have enough quantity.', 'modulefrontcontroller'),
                'displaySubTotal' => $this->module->l('Subtotal : ', 'modulefrontcontroller'),
                'displayTax' => $this->module->l('Tax : ', 'modulefrontcontroller'),
                'displayDiscount' => $this->module->l('Discount : ', 'modulefrontcontroller'),
                'displayTotal' => $this->module->l('Total : ', 'modulefrontcontroller'),
                'displayCustomerName' => $this->module->l('Customer name : ', 'modulefrontcontroller'),
                'displayPhone' => $this->module->l('Phone : ', 'modulefrontcontroller'),
                'displayUser' => $this->module->l('Cashier : ', 'modulefrontcontroller'),
                'displayOrder' => $this->module->l('Order : ', 'modulefrontcontroller'),
                'displayShippingMsg' => $this->module->l('Shipping cost : ', 'modulefrontcontroller'),
                'invalidOrderDiscount' => $this->module->l('Invalid order discount', 'modulefrontcontroller'),
                'beforeDiscountMessage' => $this->module->l('With a ', 'modulefrontcontroller'),
                'afterDiscountMessage' => $this->module->l('% Discount', 'modulefrontcontroller'),
                'networkError' => $this->module->l('No internet connection', 'modulefrontcontroller'),
                'invalidProductQuantity' => $this->module->l('Invalid product quantity.', 'modulefrontcontroller'),
                'invalidAddress1' => $this->module->l('Invalid address1', 'modulefrontcontroller'),
                'invalidAddress2' => $this->module->l('Invalid address2', 'modulefrontcontroller'),
                'invalidPostCode' => $this->module->l('Invalid post', 'modulefrontcontroller'),
                'invalidCityName' => $this->module->l('Invalid city name', 'modulefrontcontroller'),
                'invalidPhone' => $this->module->l('Invalid phone number', 'modulefrontcontroller'),
                'invalidHomePhone' => $this->module->l('Invalid home phone number', 'modulefrontcontroller'),
                'invalidFirstName' => $this->module->l('Invalid first name', 'modulefrontcontroller'),
                'invalidLastName' => $this->module->l('Invalid last name', 'modulefrontcontroller'),
                'invalidCompanyName' => $this->module->l('Invalid company name', 'modulefrontcontroller'),
                'invalidAliasName' => $this->module->l('Invalid alias name', 'modulefrontcontroller'),
                'invalidEmail' => $this->module->l('Invalid email Address', 'modulefrontcontroller'),
                'invalidPasswd' => $this->module->l('Invalid password', 'modulefrontcontroller'),
                'noCarrier' => $this->module->l('No carrier applied', 'modulefrontcontroller'),
                'noAddressSelectedError' => $this->module->l('Please select address', 'modulefrontcontroller'),
                'negativePriceError' => $this->module->l('Product price should be positive', 'modulefrontcontroller'),
                'deleteCartMessage' => $this->module->l('Are you sure you want to delete the cart?', 'modulefrontcontroller'),
                'deleteProductMessage' => $this->module->l('Are you sure you want to delete the product from cart?', 'modulefrontcontroller'),
                'deleteOrderProductMessage' => $this->module->l('Are you sure you want to delete the product from order?', 'modulefrontcontroller'),
                'addedToCart' => $this->module->l('Product successfully added to cart', 'modulefrontcontroller'),
                'productNotExists' => $this->module->l('does not exists in the outlet'),
                'updateQuantityMsg' => $this->module->l('Updated the product quantity in cart', 'modulefrontcontroller'),
                'successRemoveProduct' => $this->module->l('Successfully removed product from cart', 'modulefrontcontroller'),
                'combinationNotExist' => $this->module->l('Combination does not exist', 'modulefrontcontroller'),
                'printerNotConnected' => $this->module->l('Printer not connected', 'modulefrontcontroller'),
                'selectCustomerMsg' => $this->module->l('Please select the customer', 'modulefrontcontroller'),
                'orderSyncMsg' => $this->module->l('Synchronize offline orders to proceed', 'modulefrontcontroller'),
                'requireAddress1' => $this->module->l('Address1 required', 'modulefrontcontroller'),
                'requireZipCode' => $this->module->l('Zip/Post code Required', 'modulefrontcontroller'),
                'requireCityName' => $this->module->l('City name required', 'modulefrontcontroller'),
                'requireCountry' => $this->module->l('Country name required', 'modulefrontcontroller'),
                'requireAliasName' => $this->module->l('Alias name required', 'modulefrontcontroller'),
                'selectCustomerError' => $this->module->l('Please select customer. Guest Checkout is disabled', 'modulefrontcontroller'),
                'minimalQtyError' => $this->module->l('You cannot proceed to checkout with ', 'modulefrontcontroller'),
                'minimalQtyError1' => $this->module->l('Qty of ', 'modulefrontcontroller'),
                'exitFullScreen' => $this->module->l('Exit Full Screen', 'modulefrontcontroller'),
                'enterFullScreen' => $this->module->l('Enter Full Screen', 'modulefrontcontroller'),
                'removeProductAlert' => $this->module->l(
                    'Remove the product from cart that are not available because its causes problem during checkout.',
                    'modulefrontcontroller'
                ),
                'eitherMsg' => $this->module->l('Either', 'modulefrontcontroller'),
                'productNotFoundAlert' => $this->module->l('is disabled or it doesn\'t exists in the outlet', 'modulefrontcontroller'),
                'productSuccessRemovedAlert' => $this->module->l(
                    'Product that are not active or deleted from the outlet are successfully removed',
                    'modulefrontcontroller'
                ),
                'sNoHeading' => $this->module->l('S.No.', 'modulefrontcontroller'),
                'productNameHeading' => $this->module->l('Product name', 'modulefrontcontroller'),
                'qtyHeading' => $this->module->l('Qty', 'modulefrontcontroller'),
                'priceHeading' => $this->module->l('Price', 'modulefrontcontroller'),
                'totalHeading' => $this->module->l('Total', 'modulefrontcontroller'),
                'changeCurrencyMsg' => $this->module->l(
                    'On changing currency, cart product price will updated so, please remove the cart.',
                    'modulefrontcontroller'
                ),
                'displayCustomerName' => $this->module->l('Customer name : ', 'modulefrontcontroller'),
                'displayCustomerPhone' => $this->module->l('Customer phone : ', 'modulefrontcontroller'),
                'displayOrderCarrier' => $this->module->l('Order carrier : ', 'modulefrontcontroller'),
                'displayPhone' => $this->module->l('Phone : ', 'modulefrontcontroller'),
                'displayPaymentMethod' => $this->module->l('Payment method : ', 'modulefrontcontroller'),

                'orderSlipAmount' => $this->module->l('Amount : ', 'modulefrontcontroller'),
                'orderSlipVoucher' => $this->module->l('Voucher code : ', 'modulefrontcontroller'),
                'creditSlipHeading' => $this->module->l('Credit slip', 'modulefrontcontroller'),

                'requireCustomProductName' => $this->module->l('Please enter product name.', 'modulefrontcontroller'),
                'requireCustomQty' => $this->module->l('Please enter product qty.', 'modulefrontcontroller'),
                'requireCustomPrice' => $this->module->l('Please enter product price.', 'modulefrontcontroller'),
                'invalidCustomProductName' => $this->module->l('Please enter valid name.', 'modulefrontcontroller'),
                'invalidCustomQty' => $this->module->l('Please enter valid qty.', 'modulefrontcontroller'),
                'invalidCustomPrice' => $this->module->l('Please enter valid price.', 'modulefrontcontroller'),
                'customerAddress' => $this->module->l('Delivery address: ', 'modulefrontcontroller'),
                'paymentTypeWk' => $this->module->l('Pay Method ', 'modulefrontcontroller'),
                'paymentAmountWk' => $this->module->l('Amount ', 'modulefrontcontroller'),
                'paymentTenderedWk' => $this->module->l('Tendered ', 'modulefrontcontroller'),
                'paymentChangeWk' => $this->module->l('Change ', 'modulefrontcontroller'),
                'taxRateHeading' => $this->module->l('Tax Rate', 'modulefrontcontroller'),
                'taxAmountHeading' => $this->module->l('Tax Amt', 'modulefrontcontroller'),
                'discountHeading' => $this->module->l('Discount', 'modulefrontcontroller'),
            ]
        );
    }

    /**
     * Set the variable for js and css
     *
     * @return void
     */
    public function initContent()
    {
        $idShop = $this->context->shop->id;
        $idLang = $this->context->language->id;
        $idShopGroup = $this->context->shop->id_shop_group;
        $this->idEmployee = $this->context->cookie->id_employee;
        $this->idWkPosOutletEmployee = $this->context->cookie->id_wkpos_outlet_employee;
        if (!isset($this->idEmployee)) {
            Tools::redirect($this->context->link->getModuleLink('wkpos', 'login'));
        }
        $this->idOutletEmployee = $this->context->cookie->id_outlet_employee;
        $objOutletEmployee = new WkPosOutletEmployee($this->idOutletEmployee);
        $this->idWkPosOutlet = $objOutletEmployee->id_wkpos_outlet;
        $objOutlet = new WkPosOutlets($this->idWkPosOutlet);
        $employeeDetails = $this->objEmployee;
        $allowedCurrency = json_decode($objOutlet->allowed_currencies);
        $allowedLanguages = json_decode($objOutlet->allowed_languages);
        if (empty($this->idWkPosOutlet)
            || !$objOutlet->active
            || $objOutletEmployee->id_wkpos_outlet != $this->context->cookie->id_wkpos_outlet
        ) {
            $objOutletEmployee->logout();
            Tools::redirect($this->context->link->getModuleLink('wkpos', 'login'));
        }

        $this->context->cart = new Cart();
        $address = new Address($objOutlet->id_address);
        // Add Css And JS Files
        $this->setPosVariables();
        $this->posSetMedia();

        $posSales = $this->context->link->getModuleLink('wkpos', 'sale');

        // Add JS Variables

        $dirName = _PS_MODULE_DIR_ . 'wkpos/views/img/employee/';
        $filePrefix = $employeeDetails->id . '_';
        $fileName = glob($dirName . "$filePrefix*.jpg");
        if ($fileName) {
            $fileName = explode('/', $fileName[0]);
            $fileName = $fileName[count($fileName) - 1];
            $this->context->smarty->assign(
                [
                    'employeeImage' => _MODULE_DIR_ . 'wkpos/views/img/employee/' . $fileName,
                ]
            );
        }
        $objectPresenter = new ObjectPresenter();
        $outletDetails = (array) $objOutlet;
        $this->context->smarty->assign($this->getCurrencies($allowedCurrency));
        if ($this->isSeller) {
            $logoutUrl = $this->context->link->getModuleLink('mppos', 'login', ['poslogout' => 1]);
        } else {
            $logoutUrl = $this->context->link->getModuleLink('wkpos', 'login', ['poslogout' => 1]);
        }
        $defaultSearchTypeId = (int) Configuration::get('WKPOS_DEFAULT_SEARCH_TYPE');
        $defaultSearchType = $this->module->customerSearchType[$defaultSearchTypeId - 1]['name'];
        $wkposNf525 = false;
        if (Module::isInstalled('wkposnf') && Module::isEnabled('wkposnf')) {
            $wkposNf525 = true;
        }
        $wkposLoyalty = false;
        if (Module::isInstalled('wkposloyalty') && Module::isEnabled('wkposloyalty')) {
            $wkposLoyalty = true;
        }
        $this->context->smarty->assign(
            [
                'wkposNf525Install' => $wkposNf525,
                'wkposLoyaltyInstall' => $wkposLoyalty,
            ]
        );
        $this->context->smarty->assign(
            [
                'logoPng' => _MODULE_DIR_ . '/wkpos/logo.png',
                'errorMp3' => _MODULE_DIR_ . 'wkpos/views/img/pos_error.mp3',
                'guestAccountEnabled' => (bool) Configuration::get(
                    'WKPOS_GUEST_ACCOUNT_ENABLE',
                    null,
                    $idShopGroup,
                    $idShop,
                    false
                ),
                'defaultSearchType' => $defaultSearchType,
                'defaultSearchTypeId' => $defaultSearchTypeId,
                'customerSearchTypes' => $this->module->customerSearchType,
                'wkposHeading' => Configuration::get('WKPOS_HEADING', $idLang),
                'languages' => $this->getLanguage($allowedLanguages),
                'selectedLanguageId' => $this->context->language->id,
                // 'currencies' => Currency::getCurrencies(false, true),
                'selectedCurrencyId' => $this->context->currency->id,
                'posController' => $this->posController,
                'posLayout' => _MODULE_DIR_ . '/wkpos/views/templates/front/layout.tpl',
                'page' => $this->getTemplateVarPage(),
                'urls' => $this->getTemplateVarUrls(),
                'shop' => $this->getTemplateVarShop(),
                'language' => $objectPresenter->present($this->context->language),
                'jsFiles' => $this->jsFiles,
                'jsVariables' => $this->jsVariables,
                'cssFiles' => $this->cssFiles,
                'posSales' => $posSales,
                'orderUrl' => $this->context->link->getModuleLink('wkpos', 'order'),
                'pageName' => 'pos-sale',
                'idOutletAddress' => $objOutlet->id_address,
                'customerName' => $this->module->l('Customer', 'modulefrontcontroller'),
                'currencySign' => $this->context->currency->sign,
                // 'currencySign' => (new Currency(Configuration::get('PS_CURRENCY_DEFAULT')))->sign,
                // 'productDetails' => $this->getAllProducts(),
                'displayLowStockAfter' => Configuration::get('WKPOS_LOW_STOCK'),
                'displayCombinationTag' => Configuration::get('WKPOS_COMBINATION_TAG_ENABLE'),
                'displayVoucherEnable' => Configuration::get('WKPOS_VOUCHER_ENABLE'),
                'displayMessageEnable' => Configuration::get('WKPOS_MESSAGE_ENABLE'),
                'shopName' => Configuration::get('WKPOS_SHOP_NAME', $idLang),
                'contactDetails' => $address->phone,
                'displayProductDiscount' => Configuration::get('WKPOS_DISPLAY_PRODUCT_DISCOUNT') ? 1 : 0,
                'displayOrderDiscount' => Configuration::get('WKPOS_DISPLAY_ORDER_DISCOUNT') ? 1 : 0,
                'displayBarcode' => Configuration::get('WKPOS_DISPLAY_BARCODE'),
                'countriesList' => Country::getCountries($this->context->language->id, true),
                'shippingEnabled' => (bool) Configuration::get('WKPOS_ENABLE_SHIPPING'),
                'wkposLogin' => $logoutUrl,
                'employee' => [
                    'id' => $employeeDetails->id,
                    'firstName' => $employeeDetails->firstname,
                    'lastName' => $employeeDetails->lastname,
                    'shortFirstName' => mb_strimwidth($employeeDetails->firstname, 0, 8, '.'),
                    'shortLastName' => mb_strimwidth($employeeDetails->lastname, 0, 8, '...'),
                    'email' => $employeeDetails->email,
                ],
                'payments' => WkPosPayment::getActivePaymentDetail(),
                'outlet' => [
                    'address1' => $address->address1,
                    'address2' => $address->address2,
                    'city' => $address->city,
                ],
                'outletDetails' => $outletDetails,
                'years' => Tools::dateYears(),
                'months' => Tools::dateMonths(),
                'days' => Tools::dateDays(),
                'signOnOrderReciept' => Configuration::get('WKPOS_DIGITAL_SIGN_ON_RECIEPT') ?
                Configuration::get('WKPOS_DIGITAL_SIGN_ON_RECIEPT') : 0,
                'signOnCashRegister' => Configuration::get('WKPOS_DIGITAL_SIGN_ON_CASH_REGISTER') ?
                Configuration::get('WKPOS_DIGITAL_SIGN_ON_CASH_REGISTER') : 0,
                'signOnOrderListing' => Configuration::get('WKPOS_DIGITAL_SIGN_ON_PS_ORDER_LISTING') ?
                Configuration::get('WKPOS_DIGITAL_SIGN_ON_PS_ORDER_LISTING') : 0,
                'customProductPopUpImg' => _MODULE_DIR_ . 'wkpos/views/img/loading.gif',
                'allTaxes' => TaxRulesGroup::getTaxRulesGroups(true),
            ]
        );
    }

    public function getCurrencies($allowedCrrency)
    {
        $currentCurrency = null;
        $serializer = new ObjectPresenter();
        $context = $this->context;
        $controller = $this->posController;
        $currencies = array_map(
            function ($currency) use ($serializer, &$currentCurrency, $allowedCrrency, $context, $controller) {
                $currencyArray = $serializer->present($currency);

                if (in_array($currencyArray['id'], $allowedCrrency)) {
                    // serializer doesn't see 'sign' because it is not a regular
                    // ObjectModel field.
                    $currencyArray['sign'] = $currency->sign;

                    $url = $context->link->getModuleLink(
                        'wkpos',
                        $controller,
                        [],
                        null,
                        $context->language->id
                    );

                    $extraParams = [
                        'SubmitCurrency' => 1,
                        'id_currency' => $currency->id,
                    ];

                    $partialQueryString = http_build_query($extraParams);
                    $separator = empty(parse_url($url)['query']) ? '?' : '&';

                    $url .= $separator . $partialQueryString;

                    $currencyArray['url'] = $url;

                    if ($currency->id === $context->currency->id) {
                        $currencyArray['current'] = true;
                        $currentCurrency = $currencyArray;
                    } else {
                        $currencyArray['current'] = false;
                    }

                    return $currencyArray;
                }
            },
            Currency::getCurrencies(true, true)
        );
        $currencies = array_filter($currencies);

        return [
            'currencies' => $currencies,
            'current_currency' => $currentCurrency,
        ];
    }

    public function getLanguage($allowedLanguages)
    {
        $languages = Language::getLanguages(true);
        $selectedLanguagesDetails = [];
        foreach ($languages as $language) {
            if (in_array($language['id_lang'], $allowedLanguages)) {
                $selectedLanguagesDetails[] = $language;
            }
        }

        return $selectedLanguagesDetails;
    }
}
