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
require_once dirname(__FILE__) . '/ModuleFrontController.php';
class WkPosSaleModuleFrontController extends WkPosModuleFrontController
{
    protected $pattern = '/^([A-Z_]*)[0-9]+/';
    protected $user_groups;

    /**
     * Disable the header, footer, left column, right column
     *
     * @return void
     */
    public function init()
    {
        parent::init();
        $this->posController = 'sale';
    }

    /**
     * Set the variable for js and css
     *
     * @return void
     */
    public function initContent()
    {
        parent::initContent();
        $this->context->smarty->assign(
            [
                'paymentAcceptedStatus' => Configuration::get('PS_OS_PAYMENT'),
            ]
        );
        // added new hook for addon modules
        Hook::exec('actionSetSmartyVariablesInPos');
        // added new hook for addon modules
        $this->setTemplate('module:wkpos/views/templates/front/possale.tpl');
    }

    public function posSetMedia()
    {
        parent::posSetMedia();
        $this->posAddJsDef(
            [
                'autoPrinterConnect' => Configuration::get('WKPOS_PRINTER_AUTO_CONNECT'),
            ]
        );
        $this->posAddJsDefL(
            [
                'invalidInstallmentAmount' => $this->module->l('Invalid Installment Amount', 'sale'),
                'overflowInstallmentAmount' => $this->module->l('Installment amount shold be less then or equal to order amount', 'sale'),
                'installmentPaidAmount' => $this->module->l('Paid Amount', 'sale'),
                'installmentRemainingAmount' => $this->module->l('Remaining Amount', 'sale'),
                'paymentAcceptedStatus' => Configuration::get('PS_OS_PAYMENT'),
            ]
        );
        $this->posAddJs(_MODULE_DIR_ . 'wkpos/views/js/onscan.js');
        $this->posAddJs(_MODULE_DIR_ . 'wkpos/views/js/fuse.js');
        $this->posAddJs(_MODULE_DIR_ . 'wkpos/views/js/bundle.js');
    }

    /**
     * Process the data according to the condition
     *
     * @return void
     */
    public function postProcess()
    {
        parent::postProcess();
        if (Tools::getValue('ajax')) {
            if (Tools::getValue('posToken') == $this->module->secure_key) {
                $action = 'displayAjax' . Tools::ucfirst(Tools::getValue('action'));
                $this->$action();
            } else {
                $this->ajaxRender(
                    json_encode(
                        [
                            'errors' => [
                                $this->module->l('Invalid Access Token', 'sale'),
                            ],
                            'hasError' => true,
                        ]
                    )
                );
            }
            exit;
        }
    }

    /**
     * get all product details
     *
     * @return void
     */
    public function displayAjaxGetAllProducts()
    {
        // $this->context->currency = new Currency(Configuration::get('PS_CURRENCY_DEFAULT'));
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $objPosProduct = new WkPosOutletProduct();
            $productDetails = [];
            $objOutletEmployee = new WkPosOutletEmployee($this->context->cookie->id_outlet_employee);
            $objOutlet = new WkPosOutlets($objOutletEmployee->id_wkpos_outlet);
            $productDetails['products'] = $objPosProduct->getProductDetails(
                $this->context,
                $objOutletEmployee->id_wkpos_outlet,
                false,
                $objOutlet->id_address
            );
            $productDetails['count_products'] = count($productDetails['products']);
            $productDetails['next_page'] = (int) Tools::getValue('page') + 1;
            if (Tools::getValue('page') == 0) {
                $productDetails['category_wise_id_product'] = $objPosProduct->getProductsWs(
                    $objOutletEmployee->id_wkpos_outlet
                );
                $productDetails['total_products'] = count($productDetails['products']);
                $productDetails['taxRate'] = $objPosProduct->getTaxRate(
                    $objOutletEmployee->id_wkpos_outlet,
                    $objOutlet->id_address
                );
            }
            $productDetails['hasError'] = false;
            if (Tools::getValue('ajax')) {
                $this->ajaxRender(json_encode($productDetails));
            }

            return $productDetails;
        }
    }

    /**
     * Get all categories details
     *
     * @return void
     */
    public function displayAjaxGetAllCategories()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $categories = [];
            $categories['categories'] = $this->makeMenu();

            if ($categories) {
                if (Tools::getValue('ajax')) {
                    $categories['hasError'] = false;
                    $this->ajaxRender(json_encode($categories));
                }

                return $categories;
            }
        }
    }

    /**
     * Get Tax Rate of an outlet
     *
     * @return void
     */
    public function displayAjaxGetTaxRate()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $idAddress = (int) Tools::getValue('id_address');
            $objOutletEmployee = new WkPosOutletEmployee($this->context->cookie->id_outlet_employee);
            $objPosProduct = new WkPosOutletProduct();
            $this->ajaxRender(
                json_encode(
                    [
                        'taxRate' => $objPosProduct->getTaxRate($objOutletEmployee->id_wkpos_outlet, $idAddress),
                        'hasError' => false,
                    ]
                )
            );
        }
    }

    /**
     * get Menu Items Details
     *
     * @return void
     */
    public function getMenuItems()
    {
        $items = Tools::getValue('items');
        if (is_array($items) && count($items)) {
            return $items;
        } else {
            $shops = Shop::getContextListShopID();
            $conf = null;

            if (count($shops) > 1) {
                foreach ($shops as $key => $shop_id) {
                    $shop_group_id = Shop::getGroupFromShop($shop_id);
                    $conf .= (string) ($key > 1 ? ',' : '') . Configuration::get(
                        'MOD_BLOCKTOPMENU_ITEMS',
                        null,
                        $shop_group_id,
                        $shop_id
                    );
                }
            } else {
                $shop_id = (int) $shops[0];
                $shop_group_id = Shop::getGroupFromShop($shop_id);
                $conf = Configuration::get(
                    'MOD_BLOCKTOPMENU_ITEMS',
                    null,
                    $shop_group_id,
                    $shop_id
                );
            }

            if (Tools::strlen($conf)) {
                return explode(',', $conf);
            } else {
                return [];
            }
        }
    }

    /**
     * Process the menu data and organise it accordingly
     *
     * @return array
     */
    public function makeMenu()
    {
        $id_lang = (int) $this->context->language->id;
        if (Module::isEnabled('ps_mainmenu')) {
            $menu_items = $this->getMenuItems();

            $this->_menu = [];
            foreach ($menu_items as $item) {
                if (!$item) {
                    continue;
                }
                preg_match($this->pattern, $item, $value);
                $id = (int) Tools::substr($item, Tools::strlen($value[1]), Tools::strlen($item));
                $objPosProduct = new WkPosOutletProduct();

                $category = $objPosProduct->getCategories($id, $id_lang, true, $this->user_groups);
                if ($category !== null && $category['id_parent'] != 0) {
                    $this->_menu[] = $category;
                }
            }

            return $this->_menu;
        } else {
            $shop = new Shop($this->context->shop->id);
            $root_category = Category::getRootCategory(null, $shop);
            $rootCategoryArr = Category::getNestedCategories($root_category->id, $id_lang, true, $this->user_groups);
            $mainCategories = $rootCategoryArr[$root_category->id]['children'];

            return array_values($mainCategories);
        }
    }

    /**
     * Get all customers details
     *
     * @return void
     */
    public function displayAjaxGetAllCustomers()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $customerList = [];
            $customers = [];
            $customerList['customers'] = WkPosCustomer::getCustomers(true);
            $customers['next_page'] = (int) Tools::getValue('page') + 1;
            if (Tools::getValue('page') == 0) {
                $titles = [];
                $customers['customerGroups'] = Group::getGroups($this->context->language->id);
                $genders = Gender::getGenders($this->context->language->id);
                foreach ($genders as $gender) {
                    $titles[$gender->id_gender] = $gender->name;
                }
                $customers['genders'] = $titles;
                $objOutletEmployee = new WkPosOutletEmployee($this->context->cookie->id_outlet_employee);
                $objOutlet = new WkPosOutlets($objOutletEmployee->id_wkpos_outlet);
                $customers['outlet_address'] = WkPosCustomer::getOutletAddress($objOutlet->id_address);
                $customers['pos_customer_group'] = (int) Configuration::get('WKPOS_CUSTOMER_GROUP');
            }
            // blank return of customer variable create issue must be at least one customer register
            if ($customerList['customers']) {
                $customerDetails = WkPosCustomer::formatCustomerDetail($customerList['customers']);
                $customers['customers'] = $customerDetails;
                if (Tools::getValue('ajax')) {
                    $this->ajaxRender(json_encode($customers));
                }

                return $customers;
            } else {
                if (Tools::getValue('ajax')) {
                    $customers['customers'] = [];
                    $this->ajaxRender(json_encode($customers));
                }
            }
        }
    }

    public function getVouchers($idCustomer, $idLang)
    {
        $vouchers = CartRule::getCustomerCartRules($idLang, $idCustomer, true, true, true);
        $vouchersDetail = [];
        if ($vouchers) {
            foreach ($vouchers as $voucher) {
                $idCartRule = $voucher['id_cart_rule'];
                $vouchersDetail[$idCartRule] = [];
                $vouchersDetail[$idCartRule]['name'] = $voucher['name'];
                $vouchersDetail[$idCartRule]['id_cart_rule'] = $idCartRule;
                $vouchersDetail[$idCartRule]['reduction_amount'] = $voucher['reduction_amount'];
                $vouchersDetail[$idCartRule]['reduction_percent'] = $voucher['reduction_percent'];
                $vouchersDetail[$idCartRule]['code'] = $voucher['code'];
            }
        }

        return $vouchersDetail;
    }

    /**
     * Get All orders details
     *
     * @return void
     */
    public function displayAjaxGetAllOrders()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $objPosOrder = new WkPosOrder();
            $objOutletEmployee = new WkPosOutletEmployee($this->context->cookie->id_outlet_employee);
            $orders = $objPosOrder->getOrdersDetail($objOutletEmployee->id_wkpos_outlet);
            $posOrder = [];
            foreach ($orders as &$order) {
                $objCurrency = new Currency($order['id_currency']);
                $orderDetails = $objPosOrder->getOrderDetailsByIdOrder($order['id_order'], $objCurrency);
                $customer = new Customer($order['id_customer']);
                $customerName = $customer->firstname . ' ' . $customer->lastname;
                $order['customer_name'] = $customerName;
                $posOrder[$order['id_order']] = ['product' => $orderDetails];
                $posOrder[$order['id_order']]['order'] = $order;
                if ($order['order_payment']) {
                    foreach ($order['order_payment'] as $orderPayment) {
                        if ($orderPayment['id_wkpos_payment'] == 4) {
                            $objOrder = new Order($order['id_order']);
                            $orderTotal = $objOrder->getOrdersTotalPaid();
                            $installmentAmount = WkPosInstallment::getInstallmentTotalPaid($order['id_wkpos_order']);
                            $posOrder[$order['id_order']]['order']['installment'] = [
                                'paidAmount' => $installmentAmount,
                                'remainingAmount' => $orderTotal - $installmentAmount,
                            ];
                        }
                    }
                }
            }
            if (Tools::getValue('ajax')) {
                $this->ajaxRender(json_encode($posOrder));
            }

            return $posOrder;
        }
    }

    /**
     * Add New customer in post outlet
     *
     * @return void
     */
    public function displayAjaxAddNewCustomer()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $idCustomer = trim(Tools::getValue('id_customer'));
            $customerEmail = trim(Tools::getValue('customer_email'));
            if (!Validate::isCleanHtml($customerEmail)) {
                $this->errors[] = $this->module->l('Please enter correct email address:', 'sale') .
                    ' ' . $customerEmail;
            }
            if (!$idCustomer) {
                $customer = new Customer();
                if (Validate::isEmail($customerEmail)) {
                    $customer->getByEmail($customerEmail);
                }
                if ($customer->id) {
                    $this->errors[] = $this->module->l('An account already exists for this email address:', 'sale') .
                    ' ' . $customerEmail;
                }
            }
            if (empty(Tools::getValue('first_name'))) {
                $this->errors[] = $this->module->l('First Name can not be empty.', 'sale');
            } elseif (!Validate::isName(Tools::getValue('first_name'))) {
                $this->errors[] = $this->module->l('Invalid First Name', 'sale');
            }
            if (empty(Tools::getValue('last_name'))) {
                $this->errors[] = $this->module->l('Last name can not be empty.', 'sale');
            } elseif (!Validate::isName(Tools::getValue('last_name'))) {
                $this->errors[] = $this->module->l('Invalid last name', 'sale');
            }
            // if (empty(Tools::getValue('customer_passwd'))) {
            //     $this->errors[] = $this->module->l('Password can not be empty.', 'sale');
            // } elseif (!Validate::isPasswd(Tools::getValue('customer_passwd'))) {
            if (!empty(Tools::getValue('customer_passwd')) && !Validate::isPlaintextPassword(Tools::getValue('customer_passwd'))) {
                $this->errors[] = $this->module->l('Invalid password', 'sale');
            }
            if (empty($this->errors)) {
                if ($idCustomer) {
                    $objCustomer = new Customer($idCustomer);
                    $idCustomerPhone = WkPosCustomerPhone::getIdByCustomerId($idCustomer);
                    if ($idCustomerPhone) {
                        $objCustomerPhone = new WkPosCustomerPhone($idCustomerPhone);
                    } else {
                        $objCustomerPhone = new WkPosCustomerPhone();
                    }
                    if ($objCustomer->email != $customerEmail) {
                        $objCustomer->email = $customerEmail;
                    }
                } else {
                    $objCustomer = new Customer();
                    $objCustomerPhone = new WkPosCustomerPhone();
                    $objCustomer->email = $customerEmail;
                }
                $objCustomer->lastname = Tools::getValue('last_name');
                $objCustomer->firstname = Tools::getValue('first_name');
                if (empty(Tools::getValue('customer_passwd'))) {
                    if (!$idCustomer) {
                        $randomPassword = Tools::substr(md5(uniqid(mt_rand(), true)), 0, 8);
                        $objCustomer->passwd = Tools::encrypt($randomPassword);
                    }
                } else {
                    $objCustomer->passwd = Tools::encrypt(Tools::getValue('customer_passwd'));
                }

                if (Tools::getValue('birthday') == '0-0-0' || Tools::getValue('birthday') == ' - - ' || Tools::getValue('birthday') == '0-0-0' || Tools::getValue('birthday') == '--') {
                } else {
                    $objCustomer->birthday = Tools::getValue('birthday');
                }
                if (Tools::getValue('news_letter') == 'true') {
                    $objCustomer->newsletter = 1;
                } else {
                    $objCustomer->newsletter = 0;
                }
                $objCustomer->id_gender = (int) Tools::getValue('title');

                $groups = Tools::getValue('groupAccess');
                $objCustomer->id_default_group = (int) Configuration::get('WKPOS_CUSTOMER_GROUP');
                $objCustomer->save();

                if ($objCustomer->id) {
                    $objCustomerPhone->id_customer = $objCustomer->id;
                    $objCustomerPhone->customer_phone = Tools::getValue('customer_phone');
                    $objCustomerPhone->save();
                    $objCustomer->updateGroup($groups);
                    $customerDetails = [];
                    $customerDetails['id_customer'] = $objCustomer->id;
                    $customerDetails['email'] = $objCustomer->email;
                    $customerDetails['firstname'] = $objCustomer->firstname;
                    $customerDetails['lastname'] = $objCustomer->lastname;

                    $response = [];
                    $customerDetails = WkPosCustomer::formatCustomerDetail([$customerDetails]);
                    if ($idCustomer) {
                        $response['edit'] = true;
                        $response['success'] = $this->module->l('Successfully updated customer details', 'sale');
                    } else {
                        $response['edit'] = false;
                        $response['success'] = $this->module->l('Successfully Added New Customer', 'sale');
                    }
                    $response['customer'] = $customerDetails[$objCustomer->id];
                    $response['hasError'] = false;
                    $this->ajaxRender(json_encode($response));
                }
            } else {
                $this->ajaxRender(
                    json_encode(
                        [
                            'errors' => $this->errors,
                            'hasError' => true,
                        ]
                    )
                );
            }
            exit;
        }
    }

    /**
     * Add New Address of a customer
     *
     * @return void
     */
    public function displayAjaxAddNewAddress()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $firstName = trim(Tools::getValue('first_name'));
            $idAddress = trim(Tools::getValue('id_address'));
            $lastName = trim(Tools::getValue('last_name'));
            $customerEmail = trim(Tools::getValue('customer_email'));
            $aliasName = trim(Tools::getValue('alias'));
            $address1 = trim(Tools::getValue('address1'));
            $address2 = trim(Tools::getValue('address2'));
            $company = trim(Tools::getValue('company'));
            $vatNumber = trim(Tools::getValue('vat_number'));
            $postcode = trim(Tools::getValue('postcode'));
            $homePhone = trim(Tools::getValue('home_phone'));
            $phone = trim(Tools::getValue('phone'));
            $other = trim(Tools::getValue('other'));
            $idCountry = trim(Tools::getValue('id_country'));
            $idState = trim(Tools::getValue('id_state'));
            $city = trim(Tools::getValue('city'));

            $customer = new Customer();
            if (Validate::isEmail($customerEmail)) {
                $customer = $customer->getByEmail($customerEmail);
            }
            if (empty($idCountry)) {
                $this->errors[] = $this->module->l('Country Required', 'sale');
            }/* If the selected country does not contain states */
            if ($idCountry) {
                $country = new Country((int) $idCountry);
                if ($country && $country->contains_states && empty($idState)) {
                    $this->errors[] =
                    $this->module->l('Please select the state for a country that contain states.', 'sale');
                }
            }
            if (empty($aliasName)) {
                $this->errors[] = $this->module->l('Alias Name Required', 'sale');
            } elseif (!Validate::isName($aliasName)) {
                $this->errors[] = $this->module->l('Invalid Alias Name', 'sale');
            }
            if (empty($firstName)) {
                $this->errors[] = $this->module->l('First Name Required', 'sale');
            } elseif (!Validate::isName($firstName)) {
                $this->errors[] = $this->module->l('Invalid First Name', 'sale');
            }
            if (empty($city)) {
                $this->errors[] = $this->module->l('City Name Required', 'sale');
            } elseif (!Validate::isGenericName($city)) {
                $this->errors[] = $this->module->l('Invalid City Name', 'sale');
            }
            if (empty($address1)) {
                $this->errors[] = $this->module->l('Address1 Required', 'sale');
            } elseif (!Validate::isAddress($address1)) {
                $this->errors[] = $this->module->l('Invalid Address1', 'sale');
            }
            if (!empty($address2) && !Validate::isAddress($address2)) {
                $this->errors[] = $this->module->l('Invalid Address2', 'sale');
            }
            if (!empty($company) && !Validate::isAddress($company)) {
                $this->errors[] = $this->module->l('Invalid Company Name', 'sale');
            }
            if (!empty($homePhone) && !Validate::isPhoneNumber($homePhone)) {
                $this->errors[] = $this->module->l('Invalid Home Phone Number', 'sale');
            }
            if (!empty($phone) && !Validate::isPhoneNumber($phone)) {
                $this->errors[] = $this->module->l('Invalid Phone Number', 'sale');
            }
            if (!empty($lastName) && !Validate::isName($lastName)) {
                $this->errors[] = $this->module->l('Invalid last name', 'sale');
            }
            if (!Validate::isPostCode($postcode)) {
                $this->errors[] = $this->module->l('Invalid Post Code', 'sale');
            }

            if (empty($this->errors)) {
                try {
                    if (empty($idAddress)) {
                        $objAddress = new Address();
                    } else {
                        $objAddress = new Address($idAddress);
                    }

                    $objAddress->id_customer = (int) $customer->id;
                    $objAddress->id_country = (int) $idCountry;
                    $objAddress->id_state = (int) $idState;
                    $objAddress->alias = $aliasName;
                    $objAddress->company = $company;
                    $objAddress->lastname = $firstName;
                    $objAddress->firstname = $lastName;
                    $objAddress->vat_number = $vatNumber;
                    $objAddress->dni = $vatNumber ? $vatNumber : '0000000';
                    $objAddress->address1 = $address1;
                    $objAddress->address2 = $address2;
                    $objAddress->postcode = $postcode;
                    $objAddress->city = $city;
                    $objAddress->other = $other;
                    $objAddress->phone = $homePhone;
                    $objAddress->phone_mobile = $phone;
                    $objAddress->save();
                    if ($objAddress->id) {
                        $addresses = WkPosCustomer::getCustomerAddresses($customer->id);
                        $this->ajaxRender(
                            json_encode(
                                [
                                    'addresses' => $addresses,
                                    'success' => $this->module->l('Successfully added', 'sale'),
                                    'hasError' => false,
                                ]
                            )
                        );
                    }
                } catch (Exception $e) {
                    $this->ajaxRender(
                        json_encode(
                            [
                                'errors' => [$e->getMessage()],
                                'hasError' => true,
                            ]
                        )
                    );
                }
            } else {
                $this->ajaxRender(
                    json_encode(
                        [
                            'errors' => $this->errors,
                            'hasError' => true,
                        ]
                    )
                );
            }
            exit;
        }
    }

    /**
     * Get States of a slected country
     *
     * @return void
     */
    protected function displayAjaxGetStates()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $states = WkPosOutletProduct::getStates(Tools::getvalue('id_country'));
            if (is_array($states) and !empty($states)) {
                $this->ajaxRender(json_encode(['states' => $states, 'hasError' => false]));
            } else {
                $this->ajaxRender(json_encode(['hasError' => false]));
            }
        }
    }

    /**
     * Get Shipping carriers
     *
     * @return void
     */
    public function displayAjaxGetShippingCarriers()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $idAddress = (int) Tools::getValue('id_address');
            $objAddress = new Address($idAddress);
            $idZone = Country::getIdZone($objAddress->id_country);

            $selectedShippingMethod = explode(',', Configuration::get('WKPOS_SHIPPING_METHOD'));
            $defaultShippingMethod = Configuration::get('WKPOS_DEFAULT_SHIPPING');
            $shippingApplied = [];
            $defaultShippingCarrier = 0;
            $this->context->cart->id_address_invoice = $idAddress;
            $this->context->cart->id_address_invoice = $idAddress;
            foreach ($selectedShippingMethod as $idreference) {
                $objCarrier = Carrier::getCarrierByReference($idreference);
                $shippingCost = $this->context->cart->getPackageShippingCost(
                    $objCarrier->id,
                    true,
                    new Country($objAddress->id_country),
                    null,
                    $idZone
                );
                $shippingApplied[$objCarrier->id] = [
                    'idCarrier' => $objCarrier->id,
                    'idReference' => $objCarrier->id_reference,
                    'shippingCost' => $shippingCost,
                    'displayShippingCost' => Tools::displayPrice(
                        $shippingCost,
                        new Currency(Configuration::get('PS_CURRENCY_DEFAULT'))
                    ),
                    'name' => $objCarrier->name,
                ];
                if ($defaultShippingMethod == $objCarrier->id_reference) {
                    $defaultShippingCarrier = $objCarrier->id;
                }
            }
            if (Tools::getValue('ajax')) {
                if (empty($shippingApplied)) {
                    $this->ajaxRender(
                        json_encode(
                            [
                                'noShipping' => true,
                                'shipping' => $this->module->l('No shipping method applied to the selected Address', 'sale'),
                            ]
                        )
                    );
                } else {
                    $this->ajaxRender(
                        json_encode(
                            [
                                'shipping' => $shippingApplied,
                                'defaultShipping' => $defaultShippingCarrier,
                                'noShipping' => false,
                            ]
                        )
                    );
                }
            }

            return $shippingApplied;
        }
    }

    public function displayAjaxSearchCustomer()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $key = Tools::getValue('search');
            $objPosCustomer = new WkPosCustomer();
            $customers = $objPosCustomer->getCustomerByKey($key);
            $customerDetails = $objPosCustomer->formatCustomerDetail($customers);
            $this->ajaxRender(
                json_encode(
                    [
                        'hasError' => false,
                        'customers' => $customerDetails,
                    ]
                )
            );
        }
    }

    public function displayAjaxAddCustomProduct()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $productDetails = [];
            $productDetails['name'] = trim(pSQL(Tools::getValue('name')));
            $productDetails['price'] = trim(Tools::getValue('price'));
            $productDetails['qty'] = trim((int) Tools::getValue('qty'));
            $productDetails['tax'] = trim((int) Tools::getValue('tax'));
            if (isset($productDetails['name'])
                || isset($productDetails['price'])
                || isset($productDetails['qty'])
                || isset($productDetails['tax'])
            ) {
                if (Tools::getValue('id_cart') && Tools::getValue('id_cart') != 0) {
                    $idCart = trim(Tools::getValue('id_cart'));
                } else {
                    $cart = new Cart();
                    $cart->id_shop_group = $this->context->shop->id_shop_group;
                    $cart->id_shop = $this->context->shop->id;
                    $cart->id_currency = Configuration::get('PS_CURRENCY_DEFAULT');
                    $cart->id_lang = Configuration::get('PS_LANG_DEFAULT');
                    $cart->save();
                    $idCart = $cart->id;
                }
                $objWkPosCustomProduct = new WkPosCustomProduct();
                $idWkPosOutlet = $this->context->cookie->id_wkpos_outlet;
                $objProduct = $objWkPosCustomProduct->createCustomProduct($productDetails, $idWkPosOutlet);
                $objWkPosCustomProduct->id_product = $objProduct->id;
                $objWkPosCustomProduct->id_cart = $idCart;
                $objWkPosCustomProduct->id_wkpos_outlet = $idWkPosOutlet;
                $objWkPosCustomProduct->save();
                $product = WkPosOutletProduct::getProductDetails($this->context, $idWkPosOutlet, $objProduct->id);
                $this->ajaxRender(
                    json_encode(
                        [
                            'hasError' => false,
                            'product' => $product,
                            'id_product' => $objProduct->id,
                            'id_cart' => $objWkPosCustomProduct->id_cart,
                            'tax_rate_cpro' => Tax::getProductTaxRate($objProduct->id),
                        ]
                    )
                );
            }
        }
    }

    public function displayAjaxUpdateAllStock()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $idWkPosOutlet = Context::getContext()->cookie->id_wkpos_outlet;
            $objOutlet = new WkPosOutletProduct();
            $idProducts = $objOutlet->getAllOutletProductForDelete($idWkPosOutlet);
            WkPosOutletProduct::deleteCurrentOutletProduct($idWkPosOutlet);
            if ($idWkPosOutlet) {
                $objPosOutletProduct = new WkPosOutletProduct();
                $psProducts = $objPosOutletProduct->getAllPsProductWithInActive();
                foreach ($psProducts as $key => $postProduct) {
                    $matchFound = false;
                    foreach ($idProducts as $preProduct) {
                        if ($preProduct['id_product'] == $postProduct['id_product']) {
                            $matchFound = true;
                            break;
                        }
                    }
                    if (!$matchFound) {
                        unset($psProducts[$key]);
                    }
                }
                if ($psProducts) {
                    $this->assignProduct($psProducts, $idWkPosOutlet);
                }
            }
            $result['hasError'] = false;
            $result['status'] = 200;
            if (Tools::getValue('ajax')) {
                $this->ajaxDie(json_encode($result));
            }
        }
    }

    public function assignProduct($psProducts, $idWkPosOutlet, $idWkPosOutletProduct = false)
    {
        $idShopGroup = $this->context->shop->id_shop_group;
        $idShop = Context::getContext()->shop->id;
        foreach ($psProducts as $product) {
            $objWkPosOutletProduct = new WkPosOutletProduct();
            $objWkPosOutletProduct->id_wkpos_outlet = (int) $idWkPosOutlet;
            $objWkPosOutletProduct->id_product = (int) $product['id_product'];
            $objWkPosOutletProduct->active = Configuration::get('WKPOS_OUTLET_PRODUCT_ACTIVE');
            if (
                $this->context->cookie->shopContext != 'g-' . $idShopGroup
                && $this->context->cookie->shopContext != ''
            ) {
                $objWkPosOutletProduct->id_shop = $idShop;
            } else {
                $objWkPosOutletProduct->id_shop = $idShop;
            }
            $totalQuantity = (int) StockAvailable::getQuantityAvailableByProduct(
                $product['id_product'],
                null,
                $idShop
            );
            $quantity = $objWkPosOutletProduct->getProductQuantityByIdProduct($product['id_product']);
            if ($quantity) {
                $totalQuantity -= $quantity;
            }
            if ($totalQuantity < 0) {
                $totalQuantity = 0;
            }
            $objWkPosOutletProduct->quantity = $totalQuantity;
            $objWkPosOutletProduct->save();
            if (Combination::isFeatureActive() && $product['cache_default_attribute']) {
                $combinations = WkPosOutletProductAttribute::getProductCombination($product['id_product']);
                foreach ($combinations as $combination) {
                    $objPosProductAttribute = new WkPosOutletProductAttribute();
                    $objPosProductAttribute->id_wkpos_outlet_product = (int) $objWkPosOutletProduct->id;
                    $objPosProductAttribute->id_product_attribute = (int) $combination['id_product_attribute'];

                    $totalQuantity = (int) StockAvailable::getQuantityAvailableByProduct(
                        $objWkPosOutletProduct->id_product,
                        $combination['id_product_attribute'],
                        $idShop
                    );
                    $quantity = WkPosOutletProductAttribute::getProductCombinationDetail(
                        $combination['id_product_attribute'],
                        $idWkPosOutlet,
                        $idWkPosOutletProduct,
                        1
                    );
                    if ($quantity) {
                        $totalQuantity -= $quantity;
                    }
                    if ($totalQuantity < 0) {
                        $totalQuantity = 0;
                    }

                    $objPosProductAttribute->quantity = (int) $totalQuantity;
                    $objPosProductAttribute->save();
                }
            }
        }
    }
}
