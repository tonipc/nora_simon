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
use PrestaShop\PrestaShop\Adapter\StockManager;

class WkPosOrderModuleFrontController extends ModuleFrontController
{
    public function init()
    {
        /* Update the PS_CART_RULE_FEATURE_ACTIVE for addlying vouchers */
        if (Tools::getValue('order_discount')) {
            Configuration::updateGlobalValue('PS_CART_RULE_FEATURE_ACTIVE', 1);
        }
        Configuration::updateGlobalValue('PS_SPECIFIC_PRICE_FEATURE_ACTIVE', true);
        parent::init();
    }

    public function initContent()
    {
        parent::initContent();
    }

    /**
     * Process the data according to the set condition
     *
     * @return void
     */
    public function postProcess()
    {
        parent::postProcess();
        if (Tools::getValue('ajax')) {
            try {
                if (Tools::getValue('action') == 'generateOrder') {
                    if (Tools::getValue('order_discount')) {
                        Configuration::updateGlobalValue('PS_CART_RULE_FEATURE_ACTIVE', 1);
                    }
                    $this->generateOrder();
                }
                if (Tools::getValue('action') == 'applyPromoCode') {
                    $functionName = 'displayAjax' . Tools::ucfirst('applyPromoCode');
                    $this->$functionName();
                }
            } catch (Exception $e) {
                $this->dieException($e);
            }
        }
    }

    /**
     * Create order add product , customer , shipping and address in the context
     * and Then generate order
     *
     * @return void
     */
    public function generateOrder()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            if (Tools::getValue('idCustomer')) {
                $customer = new Customer(Tools::getValue('idCustomer'));
            } else {
                if (Configuration::get('WKPOS_GUEST_ACCOUNT_ENABLE')) {
                    $customer = new Customer();
                    $customer = $customer->getByEmail(
                        Configuration::get('WKPOS_GUEST_ACCOUNT')
                    );
                }
            }

            if (isset($customer) && Validate::isLoadedObject($customer)) {
                $this->validateOrder();
                exit;
            } else {
                $this->dieErrors(
                    [
                        $this->module->l('Guest Checkout Disabled', 'order'),
                    ]
                );
            }
        } else {
            $this->dieErrors(
                [
                    $this->module->l('Invalid Access Token', 'order'),
                ]
            );
        }
    }

    /**
     * Create new cart and add product to the cart
     *
     * @param [type] $customer
     *
     * @return void
     */
    public function createCart($customer)
    {
        try {
            $errors = [];
            $idCustomer = $customer->id;
            $idAddress = (int) Tools::getValue('id_address');
            if (Configuration::get('WKPOS_ENABLE_SHIPPING')) {
                if (empty((int) Tools::getValue('id_carrier'))) {
                    $idCarrier = $this->module->getCarrierId();
                } else {
                    $idCarrier = (int) Tools::getValue('id_carrier');
                }
            } else {
                $idCarrier = $this->module->getCarrierId();
            }
            if ($idAddress) {
                // Create new cart
                $idCart = trim(Tools::getValue('id_cart'));
                $alreadyProcessed = false;
                if ($idCart) {
                    $alreadyProcessed = empty(Order::getIdByCartId($idCart));
                }
                if ($alreadyProcessed) {
                    $cart = new Cart((int) $idCart);
                    SpecificPrice::deleteByIdCart((int) $cart->id);
                    WkPosOutletProduct::deleteCartProduct((int) $cart->id);
                    $cart->id_currency = $this->context->currency->id;
                } else {
                    $cart = new Cart();
                    $cart->id_shop_group = $this->context->shop->id_shop_group;
                    $cart->id_shop = $this->context->shop->id;
                    // $cart->id_currency = Configuration::get('PS_CURRENCY_DEFAULT');
                    $cart->id_currency = $this->context->currency->id;
                    $cart->id_lang = $this->context->language->id;
                    // $cart->id_lang = Configuration::get('PS_LANG_DEFAULT');
                    $cart->secure_key = $customer->secure_key;
                }
                $cart->id_customer = $idCustomer;
                $cart->id_address_delivery = $idAddress;
                $cart->id_address_invoice = $idAddress;
                $cart->save();
                $objAddress = new Address($idAddress);
                // Save new cart
                if ($cart->id) {
                    $this->context->cart = $cart;
                    $this->context->customer = new Customer($cart->id_customer);
                    $this->context->country = new Country($objAddress->id_country);
                    // get products available
                    $psProducts = json_decode(Tools::stripslashes(Tools::getValue('product')));
                    if ($psProducts) {
                        $errors = $this->checkCartProductAvailable($psProducts, $this->context->cart, true);
                        if (empty($errors)) {
                            foreach ($psProducts as $product) {
                                if (isset($product->product_id) && $product->product_id
                                    && $product->product_quantity > 0
                                ) {
                                    $idProductAttribute = null;
                                    if (isset($product->product_attribute_id)) {
                                        $idProductAttribute = $product->product_attribute_id;
                                    }
                                    $this->context->cart->updateQty(
                                        (int) $product->product_quantity,
                                        (int) $product->product_id,
                                        (int) $idProductAttribute,
                                        null,
                                        'up',
                                        $idAddress,
                                        new Shop($cart->id_shop)
                                    );
                                }
                            }
                            $this->context->cart->setDeliveryOption(
                                [$this->context->cart->id_address_delivery => (int) $idCarrier . ',']
                            );
                            $this->updatePosCartRule($idCustomer);
                            $this->applyOrderDiscountToPosCart();
                            $this->context->cart->update();
                            Product::flushPriceCache();
                            Cache::clear();
                            $this->ajaxRender(
                                json_encode(
                                    [
                                        'hasError' => false,
                                        'id_cart' => $this->context->cart->id,
                                        'cartAmount' => $this->context->cart->getOrderTotal(),
                                        'appliedVoucher' => $this->context->cart->getCartRules(),
                                        'availableVouchers' => $this->getAllVouchers(),
                                    ]
                                )
                            );
                        } else {
                            $this->dieErrors($errors);
                        }
                    } else {
                        $this->dieErrors([$this->module->l('No product found', 'order')]);
                    }
                }
            } else {
                $this->dieErrors(
                    [$this->module->l('Customer Address Required', 'order')]
                );
            }
        } catch (Exception $e) {
            $this->dieException($e);
        }
    }

    public function applyOrderDiscountToPosCart()
    {
        $errors = null;
        if (Tools::getValue('order_discount')) {
            if (isset($this->context->cookie->id_wkpos_cart_rule)) {
                $cartRule = new CartRule($this->context->cookie->id_wkpos_cart_rule);
                if (!Validate::isLoadedObject($cartRule)
                    || !$this->context->cart->addCartRule((int) $cartRule->id)
                ) {
                    $errors = $this->module->l('Can\'t add the voucher.', 'order');
                }
            }
        }

        return $errors;
    }

    public function updatePosCartRule($idCustomer)
    {
        $orderDiscount = (float) Tools::getValue('order_discount');
        if ($orderDiscount) {
            $createCartRule = true;
            if (isset($this->context->cookie->id_wkpos_cart_rule)) {
                $objCartRule = new CartRule($this->context->cookie->id_wkpos_cart_rule);
                if (Validate::isLoadedObject($objCartRule)) {
                    $createCartRule = false;
                    if ($objCartRule->reduction_amount != $orderDiscount
                        || $objCartRule->id_customer != $idCustomer
                    ) {
                        $objCartRule->date_to = date('Y-m-d H:i:s', strtotime('+1 Day'));
                        $objCartRule->id_customer = $idCustomer;
                        $objCartRule->reduction_amount = $orderDiscount;
                        $objCartRule->save();
                    }
                }
            }
            if ($createCartRule) {
                $objCustomer = new WkPosOrder();
                $objCartRule = $objCustomer->createOrderVoucher($idCustomer);
                $this->context->cookie->id_wkpos_cart_rule = $objCartRule->id;
                $this->context->cookie->write();
            }
        } elseif (isset($this->context->cookie->id_wkpos_cart_rule)) {
            $objCartRule = new CartRule($this->context->cookie->id_wkpos_cart_rule);
            $objCartRule->delete();
        }
    }

    public function checkCartProductAvailable($psProducts, $cart, $addSpecific = false)
    {
        $errors = [];
        foreach ($psProducts as $key => $product) {
            if (isset($product->product_id) && $product->product_id && $product->product_quantity > 0) {
                $psProducts->$key->name = Product::getProductName($product->product_id);
                Product::flushPriceCache();
                $objProduct = new Product($product->product_id);
                $idProductAttribute = null;
                if (isset($product->product_attribute_id)) {
                    $idProductAttribute = $product->product_attribute_id;
                }
                if ($idProductAttribute) {
                    $productQuantity = WkPosOutletProductAttribute::getProductQuantity(
                        $product->product_id,
                        $this->context->cookie->id_wkpos_outlet,
                        $idProductAttribute
                    );
                } else {
                    $productQuantity = WkPosOutletProduct::getProductQuantity(
                        $product->product_id,
                        $this->context->cookie->id_wkpos_outlet
                    );
                }
                $a = (float) $product->unit_price_tax_excl;
                $b = (float) $objProduct->getPrice(false, $idProductAttribute);
                $epsilon = 0.000001;
                $comparePrice = abs($a - $b) >= $epsilon;
                $outOfStock = StockAvailable::outOfStock($product->product_id);
                if ($objProduct
                    && $objProduct->available_for_order == 0
                ) {
                    $errors[] = $psProducts->$key->name . $this->module->l('Not available for order', 'order');
                } elseif ($productQuantity < $product->product_quantity
                    && !Product::isAvailableWhenOutOfStock($outOfStock)
                ) {
                    $errors[] = $psProducts->$key->name . $this->module->l(' Quantity Not Available', 'order');
                } else {
                    if ($addSpecific
                        && ((isset($product->reduction_percent)
                        && $product->reduction_percent != 0)
                        || $comparePrice)
                    ) {
                        $this->addSpecificPrice(
                            $product,
                            $comparePrice,
                            $cart->id_customer,
                            $cart->id
                        );
                    }
                }
            }
        }

        return $errors;
    }

    public function checkOrderProductAvailable($products)
    {
        $errors = [];
        foreach ($products as $product) {
            if (isset($product['id_product']) && $product['id_product'] && $product['cart_quantity'] > 0) {
                $product['name'] = Product::getProductName($product['id_product']);
                $objProduct = new Product($product['id_product']);
                $idProductAttribute = null;
                if (isset($product['id_product_attribute'])) {
                    $idProductAttribute = $product['id_product_attribute'];
                }
                if ($idProductAttribute) {
                    $productQuantity = WkPosOutletProductAttribute::getProductQuantity(
                        $product['id_product'],
                        $this->context->cookie->id_wkpos_outlet,
                        $idProductAttribute
                    );
                } else {
                    $productQuantity = WkPosOutletProduct::getProductQuantity(
                        $product['id_product'],
                        $this->context->cookie->id_wkpos_outlet
                    );
                }
                $outOfStock = StockAvailable::outOfStock($product['id_product']);
                if ($objProduct
                    && $objProduct->available_for_order == 0
                ) {
                    $errors[] = $product['name'] . $this->module->l('Not available for order', 'order');
                } elseif ($productQuantity < $product['cart_quantity']
                    && !Product::isAvailableWhenOutOfStock($outOfStock)
                ) {
                    $errors[] = $product['name'] . $this->module->l(' Quantity Not Available', 'order');
                }
            }
        }

        return $errors;
    }

    /**
     * Add Product to cart
     *
     * @return void
     */
    public function displayAjaxAddProductToCart()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            if (Tools::getValue('idCustomer')) {
                $customer = new Customer(Tools::getValue('idCustomer'));
            } else {
                if (Configuration::get('WKPOS_GUEST_ACCOUNT_ENABLE')) {
                    $customer = new Customer();
                    $customer = $customer->getByEmail(
                        Configuration::get('WKPOS_GUEST_ACCOUNT')
                    );
                }
            }

            if (isset($customer) && Validate::isLoadedObject($customer)) {
                $this->createCart($customer);
            } else {
                $this->dieErrors(
                    [$this->module->l('Guest Checkout Disabled', 'order')]
                );
            }
        } else {
            $this->dieErrors(
                [$this->module->l('Invalid Access Token', 'order')]
            );
        }
    }

    /**
     * Get the shipping details
     *
     * @return void
     */
    public function displayAjaxGetShippingCarriers()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            if (Tools::getValue('id_cart')) {
                $this->context->cart = new Cart((int) Tools::getValue('id_cart'));
                $idAddress = (int) Tools::getValue('id_address');
                $objAddress = new Address($idAddress);
                $idZone = Country::getIdZone($objAddress->id_country);

                $selectedShippingMethod = explode(',', Configuration::get('WKPOS_SHIPPING_METHOD'));
                $defaultShippingMethod = Configuration::get('WKPOS_DEFAULT_SHIPPING');
                $shippingApplied = [];
                $defaultShippingCarrier = 0;
                $carrierList = $this->getCarrierList($this->context);
                $idCarrierReferences = $this->getDeliveryOptionList();

                foreach ($selectedShippingMethod as $idReference) {
                    if (in_array($idReference, $idCarrierReferences)) {
                        $objCarrier = Carrier::getCarrierByReference($idReference);
                        $shippingCost = $this->context->cart->getPackageShippingCost(
                            $objCarrier->id,
                            false,
                            new Country($objAddress->id_country),
                            null,
                            $idZone
                        );
                        $carrierTax = $objCarrier->getTaxesRate($objAddress);
                        $shippingCost += $shippingCost * $carrierTax / 100;
                        $shippingApplied[$objCarrier->id] = [
                            'idCarrier' => $objCarrier->id,
                            'idReference' => $objCarrier->id_reference,
                            'shippingCost' => $shippingCost,
                            'carrierTax' => $carrierTax,
                            'displayShippingCost' => Tools::displayPrice(
                                $shippingCost,
                                $this->context->currency
                                // new Currency(Configuration::get('PS_CURRENCY_DEFAULT'))
                            ),
                            'name' => $objCarrier->name,
                        ];
                        if ($defaultShippingMethod == $objCarrier->id_reference) {
                            $defaultShippingCarrier = $objCarrier->id;
                        }
                    }
                }
                if (Tools::getValue('ajax')) {
                    $response = [];
                    if (empty($shippingApplied)) {
                        $response['noShipping'] = true;
                        $response['shipping'] =
                        $this->module->l('No shipping method applied to the selected Address', 'order');
                        $this->ajaxRender(
                            json_encode(
                                [
                                ]
                            )
                        );
                    } else {
                        $response['shipping'] = $shippingApplied;
                        $response['defaultShipping'] = $defaultShippingCarrier;
                        $response['noShipping'] = false;
                        $response['hasError'] = false;
                        $response['carrier_list'] = $carrierList;
                    }
                    $this->ajaxRender(json_encode($response));
                }

                return $shippingApplied;
            }

            return null;
        } else {
            $this->dieErrors(
                [$this->module->l('Invalid Access Token', 'order')]
            );
        }
    }

    public function getCarrierList($context)
    {
        $deliveryOptionsList = $context->cart->getDeliveryOptionList();
        $required = ['logo', 'delay', 'price_without_tax', 'price_with_tax', 'name', 'id_carrier', 'tracking_url'];
        $carriers = [];
        if (!empty($deliveryOptionsList)) {
            foreach ($deliveryOptionsList as $idAddress => $optionList) {
                $address = new Address((int) $idAddress, $this->context->language->id);
                if (!$address->deleted && $context->cart->id_address_delivery == $idAddress) {
                    $carriers[$idAddress] = [];
                    foreach ($optionList as $key => $option) {
                        $isSelected = 0;
                        $carriers[$idAddress]['id_carrier'] = $key;
                        $carriers[$idAddress]['carrier_list'] = [];
                        foreach ($option['carrier_list'] as $carrier) {
                            // selecting only required nodes
                            $idCarrier = $carrier['instance']->id;
                            foreach ($required as $key) {
                                if ($key == 'name') {
                                    $value = $carrier['instance']->name;
                                } elseif ($key == 'id_carrier') {
                                    $value = $carrier['instance']->id;
                                } elseif ($key == 'tracking_url') {
                                    $value = $carrier['instance']->url;
                                } elseif ($key == 'price_without_tax') {
                                    $value = Tools::displayPrice($carrier['price_without_tax']);
                                } elseif ($key == 'price_with_tax') {
                                    $value = Tools::displayPrice($carrier['price_with_tax']);
                                } elseif ($key == 'delay') {
                                    $value = $carrier['instance']->delay[1];
                                } elseif ($key == 'logo') {
                                    $value = $_SERVER['SERVER_NAME'] . $carrier['logo'];
                                } else {
                                    $value = $carrier[$key];
                                }
                                if (!isset($carriers[$idAddress]['carrier_list'][$idCarrier])) {
                                    $carriers[$idAddress]['carrier_list'][$idCarrier] = [];
                                }
                                $carriers[$idAddress]['carrier_list'][$idCarrier][$key] = $value;
                            }

                            $msg = '';
                            if ($option['is_best_grade']) {
                                if ($option['is_best_price']) {
                                    $isSelected = 1;
                                    $msg = $this->module->l('The best price and speed', 'order');
                                } else {
                                    $msg = $this->module->l('The fastest', 'order');
                                }
                            } elseif ($option['is_best_price']) {
                                $msg .= $this->module->l('The best price', 'order');
                            }
                            if ($isSelected) {
                            }
                            $carriers[$idAddress]['carrier_list'][$idCarrier]['msg'] = $msg;
                        }
                    }
                }
            }
        }

        return $carriers;
    }

    /**
     * get all delivery option for the pos
     *
     * @return void
     */
    protected function getDeliveryOptionList()
    {
        $deliveryOptionList = $this->context->cart->getDeliveryOptionList();

        if (!count($deliveryOptionList)) {
            return [];
        }

        $idCarrierReferences = [];
        foreach (current($deliveryOptionList) as $deliveryOption) {
            foreach ($deliveryOption['carrier_list'] as $carrier) {
                if (isset($carrier['instance']) && $carrier['instance']->id) {
                    $idCarrierReferences[] = $carrier['instance']->id_reference;
                }
            }
        }

        return $idCarrierReferences;
    }

    /**
     * Generate the order
     *
     * @return void
     */
    public function validateOrder()
    {
        try {
            $errors = [];
            $idCart = Tools::getValue('id_cart');
            $idPayment = trim(Tools::getValue('id_payment'));
            $idCustomer = trim(Tools::getValue('idCustomer'));
            if ($idCart) {
                $idAddress = trim(Tools::getValue('id_address'));
                $this->context->cart = new Cart($idCart);
                $this->context->cart->id_customer = $idCustomer;
                $this->context->cart->update();
                $cart = new Cart((int) $idCart);
                $cart->id_customer = $idCustomer;
                $cart->save();
                $this->context->cart->id_address_delivery = $idAddress;
                $this->context->cart->id_address_invoice = $idAddress;
                $cart = $this->context->cart;
                // $this->context->currency = new Currency(Configuration::get('PS_CURRENCY_DEFAULT'));
                $objAddress = new Address($idAddress);
                $this->context->customer = new Customer($cart->id_customer);
                $this->context->country = new Country($objAddress->id_country);
                $this->context->customer->isLogged = 1;
                if (!$cart->id
                    || !$cart->id_currency
                    || !$cart->id_customer
                    || !$cart->id_shop
                    || !$cart->id_address_invoice
                    || !$cart->id_address_delivery
                ) {
                    $this->ajaxRender('');
                } else {
                    if (!Tools::getIsset('order_discount')) {
                        if (Tools::getValue('offlineSync')) {
                            $this->removeCartRule();
                        }
                    }
                    if (Tools::getIsset('order_message') && !Validate::isMessage(Tools::getValue('order_message'))) {
                        $errors[] = $this->module->l('Invalid Order Message', 'order');
                    } elseif (Tools::strlen(Tools::getValue('order_message')) > 1500) {
                        $errors[] = $this->module->l('Order Message must be less than 1500 chars.', 'order');
                    }
                    $errors = array_merge(
                        $errors,
                        $this->checkOrderProductAvailable($this->context->cart->getProducts())
                    );
                    if (empty($this->context->cart->getNbProducts($this->context->cart->id)) || $errors) {
                        $this->ajaxRender(
                            json_encode(
                                [
                                    'hasError' => true,
                                    'errors' => $errors,
                                    'nb_products' => $this->context->cart->getNbProducts($this->context->cart->id),
                                ]
                            )
                        );
                    } else {
                        if (Tools::getIsset('order_message') && Tools::getValue('order_message')) {
                            $orderMessage = Tools::getValue('order_message');
                            $objMessage = new Message();
                            $objMessage->id_cart = $this->context->cart->id;
                            $objMessage->id_customer = $this->context->cart->id_customer;
                            $objMessage->message = $orderMessage;
                            $objMessage->private = 0;
                            $objMessage->save();
                        }
                        $channelOrderPayment = new WkPosCashPayment();
                        $this->context->cart->save();
                        $objEmployee = new Employee($this->context->cookie->id_employee);
                        $customerGroups = $this->context->customer->getGroups();
                        if ($customerGroups) {
                            if (!in_array(Configuration::get('WKPOS_CUSTOMER_GROUP'), $customerGroups)) {
                                $customerGroups[] = (int) Configuration::get('WKPOS_CUSTOMER_GROUP');
                                $this->context->customer->updateGroup($customerGroups);
                            }
                        } else {
                            $this->context->customer->updateGroup(
                                [Configuration::get('WKPOS_CUSTOMER_GROUP')]
                            );
                        }
                        $this->context->cookie->posOrder = true;
                        $totalAmount = (float) $this->context->cart->getOrderTotal();
                        if ($idPayment == 4) {
                            // $orderStatus = (int) Configuration::get('PS_OS_PAYMENT');
                            $orderStatus = (int) Configuration::get('WKPOS_ORDER_STATUS');
                        } else {
                            $orderStatus = (int) Configuration::get('PS_OS_PAYMENT');
                        }
                        $orderStatus = (int) Configuration::get('WKPOS_ORDER_STATUS_PAYMENT');
                        $this->context->employee = $objEmployee;
                        $this->context->cart->update();

                        $orderCreated = $channelOrderPayment->validateOrder(
                            (int) $this->context->cart->id,
                            $orderStatus,
                            (float) $totalAmount,
                            Tools::getValue('payment_module'),
                            $this->module->l('Manual order -- Employee:', 'order') . ' ' . Tools::substr($objEmployee->firstname, 0, 1) . '. ' . $objEmployee->lastname,
                            [],
                            null,
                            false,
                            $this->context->cart->secure_key,
                            null,
                            null
                        );
                        if ($orderCreated) {
                            unset($this->context->cookie->id_wkpos_cart_rule);
                            unset($this->context->cookie->posOrder);
                            SpecificPrice::deleteByIdCart($cart->id);

                            $idOrders = WkPosOrder::getIdOrdersByIdCart($cart->id);
                            $idOrders = array_column($idOrders, 'id_order');
                            if ($idOrders) {
                                $this->updateOrderDetails($idOrders, $cart->id);
                            } else {
                                $this->ajaxRender(json_encode(['hasError' => true]));
                            }
                        } else {
                            $this->ajaxRender(json_encode(['hasError' => true]));
                        }
                    }
                }
            }
        } catch (Exception $e) {
            $this->dieException($e);
        }
    }

    public function dieException($e)
    {
        $this->ajaxRender(
            json_encode(
                [
                    'hasError' => true,
                    'errors' => [$e->getMessage()],
                ]
            )
        );
    }

    /**
     * Update the order details
     *
     * @param [int] $idOrders
     * @param [int] $idCart
     * @param [int] $address
     *
     * @return void
     */
    public function updateOrderDetails($idOrders, $idCart)
    {
        // $tendered = trim(Tools::getValue('tendered'));
        // $change = trim(Tools::getValue('change'));
        // $idPayment = trim(Tools::getValue('id_payment'));
        $orderDate = trim(Tools::getValue('orderDate'));
        $paymentDetails = Tools::getValue('paymentDetails');
        $idWkPosSession = trim(Tools::getValue('id_wkpos_session'));
        $offlineReference = trim(Tools::getValue('offline_reference'));

        if ($paymentDetails) {
            // to divide multiple payment from pos to backoffice
        }
        $idWkPosOrder = 0;
        foreach ($idOrders as $idOrder) {
            $order = new Order($idOrder);
            // if (!empty($orderCartRules = $order->getCartRules())) {
            // foreach ($orderCartRules as $orderCartRule) {
            //     $cartRule = new CartRule($orderCartRule['id_cart_rule']);
            //     $cartRule->delete();
            // }
            // }
            $objPosOrder = new WkPosOrder();
            $objPosOrder->reference = $order->reference;
            $objPosOrder->id_order = $idOrder;
            $objPosOrder->id_wkpos_outlet_employee = $this->context->cookie->id_wkpos_outlet_employee;
            $objPosOrder->id_wkpos_session = $idWkPosSession;
            $objPosOrder->offline_reference = $offlineReference;
            $objPosOrder->active = 1;
            // $objPosOrder->tendered = (float)$tendered;
            // $objPosOrder->change = (float)$change;
            $objPosOrder->id_wkpos_outlet = (int) $this->context->cookie->id_wkpos_outlet;
            // $objPosOrder->id_wkpos_payment = (int)$idPayment;
            if (!empty($orderDate)) {
                $objPosOrder->order_date = date(
                    'Y-m-d H:i:s',
                    strtotime($orderDate)
                );
            } else {
                $objPosOrder->order_date = $order->date_add;
            }
            $objPosOrder->save();
            $idWkPosOrder = $objPosOrder->id;
            $this->updateOrderPayment($idWkPosOrder);
            Hook::exec(
                'actionWkPosSaveOrderDetail',
                [
                    'id_orders' => $idOrders,
                    'posOrder' => $objPosOrder,
                ]
            );
        }

        $idOrder = Order::getOrderByCartId($idCart);

        $posOrder = $this->getOrderDetailsById($idOrder);

        $creditSlip = [];
        if ($this->context->cookie->idVoucher != 0) {
            $cartRuleObject = new Cartrule($this->context->cookie->idVoucher);
            $creditSlip['status'] = true;
            $creditSlip['amount'] = $cartRuleObject->reduction_amount;
            $creditSlip['code'] = $cartRuleObject->code;
            $creditSlip['date_add'] = $cartRuleObject->date_add;
        } else {
            $creditSlip['status'] = false;
        }

        $posOrder['hasError'] = false;
        $posOrder['success'] = $this->module->l('Order generated Successfully', 'order');
        $posOrder['id_order'] = $idOrder;
        $posOrder['credit_slip'] = $creditSlip;
        // $orderAmountPaid = $order->getOrdersTotalPaid();
        // $installmentAmount = (float)trim(Tools::getValue('installmentAmount'));
        // if ($idPayment == 4) {
        //     $posOrder['order']['installment'] = array(
        //         'paidAmount' => $installmentAmount,
        //         'remainingAmount' => $orderAmountPaid - $installmentAmount
        //     );
        // }
        Hook::exec('actionWkPosAssignOrderDetail', ['order_detail' => &$posOrder]);
        $this->ajaxRender(json_encode($posOrder));
    }

    public function updateOrderPayment($idWkPosOrder)
    {
        $paymentDetails = Tools::getValue('paymentDetails');
        // $idWkPosSession = trim(Tools::getValue('id_wkpos_session'));
        if ($paymentDetails) {
            foreach ($paymentDetails as $payment) {
                if ($payment['tendered']) {
                    $idPayment = $payment['id_wkpos_payment'];
                    $change = 0.0;
                    $tendered = (float) $payment['tendered'];
                    if ($payment['change']) {
                        $change = (float) $payment['change'];
                    }
                    $objOrderPayment = new WkPosOrderPayment();
                    $objOrderPayment->id_wkpos_order = $idWkPosOrder;
                    $objOrderPayment->id_wkpos_payment = $idPayment;
                    $objOrderPayment->amount = $tendered;
                    $objOrderPayment->type = WkPosOrderPayment::MONEY_IN;
                    $objOrderPayment->save();
                    if ($change > 0) {
                        $objOrderPayment = new WkPosOrderPayment();
                        $objOrderPayment->id_wkpos_order = $idWkPosOrder;
                        $objOrderPayment->id_wkpos_payment = $idPayment;
                        $objOrderPayment->amount = (float) $change;
                        $objOrderPayment->type = WkPosOrderPayment::MONEY_OUT;
                        $objOrderPayment->save();
                    }
                    Hook::exec(
                        'actionWkPosOrderPayment',
                        [
                            'id_wkpos_order' => $idWkPosOrder,
                            'id_wkpos_payment' => $idPayment,
                        ]
                    );
                }
            }
        }
    }

    /**
     * Create a new specific price and apply it to the specific cart only
     *
     * @param [int] $product
     * @param [int] $updatePriceStatus
     * @param [int] $idCustomer
     * @param [int] $idCart
     *
     * @return void
     */
    public function addSpecificPrice($product, $updatePriceStatus, $idCustomer, $idCart)
    {
        $objSpecificPrice = new SpecificPrice();
        $objSpecificPrice->id_specific_price_rule = 0;
        $objSpecificPrice->id_cart = (int) $idCart;

        $objSpecificPrice->id_product = (int) $product->product_id;

        $objSpecificPrice->id_shop = 0;
        $objSpecificPrice->id_shop_group = 0;
        $objSpecificPrice->id_currency = $this->context->currency->id;
        $objSpecificPrice->id_country = 0;
        $objSpecificPrice->id_group = 0;
        $objSpecificPrice->id_customer = (int) $idCustomer;
        if (isset($product->product_attribute_id)) {
            $objSpecificPrice->id_product_attribute = $product->product_attribute_id;
        } else {
            $objSpecificPrice->id_product_attribute = 0;
        }
        $objSpecificPrice->from_quantity = $product->product_quantity;
        if ($updatePriceStatus) { // for specific price
            $objSpecificPrice->price = Tools::ps_round($product->unit_price_tax_excl, 6);
            if (isset($product->reduction_percent)) {
                $objSpecificPrice->reduction = (float) ($product->reduction_percent / 100);
            } else {
                $objSpecificPrice->reduction = 0;
            }
            $objSpecificPrice->reduction_tax = 1;
        } else {
            $objSpecificPrice->price = -1;
            if (isset($product->reduction_percent)) {
                $objSpecificPrice->reduction = (float) ($product->reduction_percent / 100);
            } else {
                $objSpecificPrice->reduction = 0;
            }
            $objSpecificPrice->reduction_tax = 0;
        }
        $objSpecificPrice->reduction_type = 'percentage';
        $objSpecificPrice->from = 0;

        $objSpecificPrice->to = 0;
        $objSpecificPrice->save();
        // return $objSpecificPrice->id;
    }

    public function displayAjaxApplyPromoCode()
    {
        if (Tools::getValue('idCustomer')
            && $this->context->customer->id != Tools::getValue('idCustomer')
        ) {
            $idCustomer = (int) Tools::getValue('idCustomer');
            $this->context->customer = new Customer($idCustomer);
        }
        if (isset($this->context->customer->id)) {
            $idCart = trim(Tools::getValue('id_cart'));
            // $idCartRule = trim(Tools::getValue('id_cart_rule'));
            if ($idCart && (empty($this->context->cart) || $this->context->cart->id != $idCart)) {
                $this->context->cart = new Cart($idCart);
                $this->context->cart->id_customer = (int) $this->context->customer->id;
                $this->context->cart->save();
                $this->context->cookie->id_cart = $idCart;
                $this->context->cookie->write();
            }
            $response = [];
            // $this->context->cart->removeCartRule((int)$idCartRule);
            if (!($code = trim(Tools::getValue('discount_name')))) {
                $response['hasError'] = true;
                $response['errors'][] = $this->module->l('You must enter a voucher code.', 'order');
            } elseif (!Validate::isCleanHtml($code)) {
                $response['hasError'] = true;
                $response['errors'][] = $this->module->l('The voucher code is invalid.', 'order');
            } else {
                if (($cartRule = new CartRule(CartRule::getIdByCode($code)))
                    && Validate::isLoadedObject($cartRule)
                ) {
                    if ((int) $cartRule->partial_use == 0) {
                        if ($cartRule->reduction_amount > 0 && ($this->context->cart->getOrderTotal() < (int) $cartRule->reduction_amount)) {
                            $response['hasError'] = true;
                            $response['errors'][] =
                            $this->module->l('Partial use of this voucher is not allowed.', 'order');
                        } elseif ($cartRule->reduction_percent > 100) {
                            $response['hasError'] = true;
                            $response['errors'][] =
                            $this->module->l('Not allowed.', 'order');
                        } else {
                            if ($error = $cartRule->checkValidity($this->context, false, true)) {
                                $response['hasError'] = true;
                                $response['errors'][] = $error;
                            } else {
                                if (!$this->context->cart->addCartRule((int) $cartRule->id)) {
                                    $response['hasError'] = true;
                                    $response['errors'] = [
                                        $this->module->l('Can\'t add voucher to the cart', 'order'),
                                    ];
                                } else {
                                    $response['hasError'] = false;
                                    $response['success'] = [$this->module->l('Voucher added successfully', 'order')];
                                    $response['cartAmount'] = $this->context->cart->getOrderTotal();
                                    $response['appliedVoucher'] = $this->context->cart->getCartRules();
                                }
                            }
                        }
                    } elseif ((int) $cartRule->partial_use == 1) {
                        if ($cartRule->reduction_amount > 0) {
                            if ($this->context->cart->getOrderTotal() < (int) $cartRule->reduction_amount) {
                                $response['hasError'] = true;
                                $response['errors'][] =
                                $this->module->l('Partial use of this voucher is not allowed.', 'order');
                            } else {
                                if ($error = $cartRule->checkValidity($this->context, false, true)) {
                                    $response['hasError'] = true;
                                    $response['errors'][] = $error;
                                } else {
                                    if (!$this->context->cart->addCartRule((int) $cartRule->id)) {
                                        $response['hasError'] = true;
                                        $response['errors'] = [
                                            $this->module->l('Can\'t add voucher to the cart', 'order'),
                                        ];
                                    } else {
                                        $response['hasError'] = false;
                                        $response['success'] = [$this->module->l('Voucher added successfully', 'order')];
                                        $response['cartAmount'] = $this->context->cart->getOrderTotal();
                                        $response['appliedVoucher'] = $this->context->cart->getCartRules();
                                    }
                                }
                            }
                        } elseif ($cartRule->reduction_percent > 100) {
                            $response['hasError'] = true;
                            $response['errors'][] =
                            $this->module->l('Not allowed.', 'order');
                        } else {
                            if ($error = $cartRule->checkValidity($this->context, false, true)) {
                                $response['hasError'] = true;
                                $response['errors'][] = $error;
                            } else {
                                if (!$this->context->cart->addCartRule((int) $cartRule->id)) {
                                    $response['hasError'] = true;
                                    $response['errors'] = [
                                        $this->module->l('Can\'t add voucher to the cart', 'order'),
                                    ];
                                } else {
                                    $response['hasError'] = false;
                                    $response['success'] = [$this->module->l('Voucher added successfully', 'order')];
                                    $response['cartAmount'] = $this->context->cart->getOrderTotal();
                                    $response['appliedVoucher'] = $this->context->cart->getCartRules();
                                }
                            }
                        }
                    } else {
                        $response['hasError'] = true;
                        $response['errors'][] = $this->module->l('This voucher does not exist.', 'order');
                    }
                }
                $this->ajaxRender(json_encode($response));
                exit;
            }
            $this->ajaxRender(json_encode($response));
            exit;
        }
    }

    public function displayAjaxRemovePromoCode()
    {
        if (Tools::getValue('idCustomer')
            && $this->context->customer->id != Tools::getValue('idCustomer')
        ) {
            $idCustomer = (int) Tools::getValue('idCustomer');
            $this->context->customer = new Customer($idCustomer);
        }
        if (isset($this->context->customer->id)) {
            $idCart = trim(Tools::getValue('id_cart'));
            $idCartRules = Tools::getValue('id_cart_rule');
            if ($idCart && (empty($this->context->cart) || $this->context->cart->id != $idCart)) {
                $this->context->cart = new Cart($idCart);
                $this->context->cart->id_customer = (int) $this->context->customer->id;
                $this->context->cart->save();
                $this->context->cookie->id_cart = $idCart;
                $this->context->cookie->write();
            }
            $response = [];
            foreach ($idCartRules as $idCartRule) {
                if (!$this->context->cart->removeCartRule((int) $idCartRule)) {
                    $response['errors'] = [
                        $idCartRule => $this->module->l('Can\'t add voucher to the cart', 'order'),
                    ];
                }
            }
            if (isset($response['errors'])) {
                $response['hasError'] = true;
            } else {
                $response['hasError'] = false;
                $response['success'] = $this->module->l('Voucher removed successfully', 'order');
                $response['cartAmount'] = $this->context->cart->getOrderTotal();
                $response['appliedVoucher'] = $this->context->cart->getCartRules();
            }
            $this->ajaxRender(json_encode($response));
        }
    }

    public function getAllVouchers()
    {
        $availableVouchers = CartRule::getCustomerHighlightedDiscounts(
            $this->context->language->id,
            $this->context->cart->id_customer,
            $this->context->cart
        );
        $cartRules = $this->context->cart->getCartRules();
        if ($cartRules) {
            $addedCartRules = array_column($cartRules, 'id_cart_rule');
        } else {
            $addedCartRules = [];
        }
        $vouchers = [];
        if (is_array($availableVouchers) && !empty($availableVouchers)) {
            foreach ($availableVouchers as $availableVoucher) {
                if (!in_array($availableVoucher['id_cart_rule'], $addedCartRules)
                    && !empty($availableVoucher['code'])
                ) {
                    $vouchers[] = $availableVoucher;
                }
            }
        }

        return $vouchers;
    }

    public function removeCartRule()
    {
        foreach ($this->context->cart->getCartRules() as $cartRule) {
            $this->context->cart->removeCartRule($cartRule['obj']->id);
            $this->context->cart->update();
        }
    }

    public function addInstallmentDetails($idWkPosOrder)
    {
        $installmentAmount = trim(Tools::getValue('installmentAmount'));
        $objInstallment = new WkPosInstallment();
        $objInstallment->amount = $installmentAmount;
        $objInstallment->id_wkpos_order = $idWkPosOrder;
        $objInstallment->save();
    }

    public function displayAjaxUpdateOrderStatus()
    {
        $idWkPosOrder = trim(Tools::getValue('id_wkpos_order'));
        $response = [];
        if ($idWkPosOrder) {
            $objPosOrder = new WkPosOrder($idWkPosOrder);
            $idOrder = $objPosOrder->id_order;
            $objOrder = new Order($idOrder);
            $posAwaitingStatus = (int) Configuration::get('WKPOS_ORDER_STATUS');
            if ($objOrder && $objOrder->current_state == $posAwaitingStatus) {
                $this->addInstallmentDetails($idWkPosOrder);
                $objOrderHistory = new OrderHistory($idOrder);
                $objOrderHistory->id_order = $idOrder;
                $objOrderHistory->changeIdOrderState(Configuration::get('PS_OS_PAYMENT'), $idOrder, true);
                $objOrderHistory->addWithemail();
                $response['hasError'] = false;
                $response['success'] = $this->module->l('Status updated successfully ', 'order');

                $objOrder = new Order($idOrder);
                $orderTotal = $objOrder->getOrdersTotalPaid();
                $installmentAmount = WkPosInstallment::getInstallmentTotalPaid($idWkPosOrder);
                $response['id_order'] = $idOrder;
                $response['installment'] = [
                    'paidAmount' => $installmentAmount,
                    'remainingAmount' => $orderTotal - $installmentAmount,
                ];
            }
        }
        if (!isset($response['hasError'])) {
            $response['hasError'] = true;
            $response['errors'] = [$this->module->l('There occur some error. Please try again later.', 'order')];
        }
        $this->ajaxRender(json_encode($response));
    }

    public function displayAjaxOrderRefund()
    {
        $refunds = Tools::getValue('partialRefundProduct');
        if (is_array($refunds)) {
            $amount = 0;
            $orderDetailList = [];
            $fullQuantityList = [];
            $idOrder = trim(Tools::getValue('id_order'));
            $order = new Order($idOrder);
            $idOrderCurrency = $order->id_currency;
            $orderSlip = [];
            foreach ($refunds as $idOrderDetail => $amount_detail) {
                $quantity = Tools::getValue('partialRefundProductQuantity');
                if (!$quantity[$idOrderDetail]) {
                    continue;
                }

                $fullQuantityList[$idOrderDetail] = (int) $quantity[$idOrderDetail];

                $orderDetailList[$idOrderDetail] = [
                    'quantity' => (int) $quantity[$idOrderDetail],
                    'id_order_detail' => (int) $idOrderDetail,
                ];

                $orderDetail = new OrderDetail((int) $idOrderDetail);
                if (empty($amount_detail)) {
                    $orderDetailList[$idOrderDetail]['unit_price'] = (!Tools::getValue('TaxMethod') ?
                    $orderDetail->unit_price_tax_excl : $orderDetail->unit_price_tax_incl);
                    $orderDetailList[$idOrderDetail]['amount'] =
                    $orderDetail->unit_price_tax_incl * $orderDetailList[$idOrderDetail]['quantity'];
                } else {
                    $orderDetailList[$idOrderDetail]['amount'] = (float) str_replace(',', '.', $amount_detail);
                    $orderDetailList[$idOrderDetail]['unit_price'] =
                    $orderDetailList[$idOrderDetail]['amount'] / $orderDetailList[$idOrderDetail]['quantity'];
                }
                $orderDetail->total_refunded_tax_excl = $orderDetailList[$idOrderDetail]['amount'];
                $orderDetail->total_refunded_tax_incl = $orderDetailList[$idOrderDetail]['amount'];
                $orderDetail->save();
                $amount += $orderDetailList[$idOrderDetail]['amount'];
                if (!$order->hasBeenDelivered()
                    || $order->hasBeenDelivered()
                    && $orderDetailList[$idOrderDetail]['quantity'] > 0
                ) {
                    $this->reinjectQuantity($orderDetail, $orderDetailList[$idOrderDetail]['quantity']);
                }
            }

            $shippingCostAmount = (float) (str_replace(',', '.', Tools::getValue('partialRefundShippingCost')) ?
                (float) str_replace(',', '.', Tools::getValue('partialRefundShippingCost'))
                : false
            );

            if ($amount == 0 && $shippingCostAmount == 0) {
                if (!empty($refunds) && isset($orderDetail)) {
                    if ($orderDetail->unit_price_tax_incl > 0) {
                        $this->errors[] =
                        $this->module->l('Please enter a valid quantity and price to proceed with your refund.', 'order');
                    }
                } else {
                    $this->errors[] = $this->module->l('Please enter an amount to proceed with your refund.', 'order');
                }
            }

            $choosen = false;
            $voucher = 0;

            if ((int) Tools::getValue('refund_voucher_off') == 1) {
                $amount -= $voucher = (float) Tools::getValue('order_discount_price');
            } elseif ((int) Tools::getValue('refund_voucher_off') == 2) {
                $choosen = true;
                $amount = $voucher = (float) Tools::getValue('refund_voucher_choose');
            }

            if ($shippingCostAmount > 0) {
                if (!Tools::getValue('TaxMethod')) {
                    $tax = new Tax();
                    $tax->rate = $order->carrier_tax_rate;
                    $taxCalculator = new TaxCalculator([$tax]);
                    $amount += $taxCalculator->addTaxes($shippingCostAmount);
                } else {
                    $amount += $shippingCostAmount;
                }
            }

            $orderCarrier = new OrderCarrier((int) $order->getIdOrderCarrier());
            if (Validate::isLoadedObject($orderCarrier)) {
                $orderCarrier->weight = (float) $order->getTotalWeight();
                if ($orderCarrier->update()) {
                    $order->weight = sprintf('%.3f ' . Configuration::get('PS_WEIGHT_UNIT'), $orderCarrier->weight);
                }
            }

            if ($amount >= 0) {
                $orderSlip = OrderSlip::create(
                    $order,
                    $orderDetailList,
                    $shippingCostAmount,
                    $voucher,
                    $choosen,
                    Tools::getValue('TaxMethod') ? false : true
                );
                if (!$orderSlip) {
                    $this->errors[] = $this->module->l('You cannot generate a partial credit slip.', 'order');
                } else {
                    Hook::exec(
                        'actionWkOrderSlipAdd',
                        [
                            'order' => $order,
                            'productList' => $orderDetailList,
                            'qtyList' => $fullQuantityList,
                        ],
                        null,
                        false,
                        true,
                        false,
                        $order->id_shop
                    );
                    $params = [];
                    $customer = new Customer((int) $order->id_customer);
                    $params['{lastname}'] = $customer->lastname;
                    $params['{firstname}'] = $customer->firstname;
                    $params['{id_order}'] = $order->id;
                    $params['{order_name}'] = $order->getUniqReference();
                    @Mail::Send(
                        (int) $order->id_lang,
                        'credit_slip',
                        Mail::l('New credit slip regarding your order', $order->id_lang),
                        $params,
                        $customer->email,
                        $customer->firstname . ' ' . $customer->lastname,
                        null,
                        null,
                        null,
                        null,
                        _PS_MAIL_DIR_,
                        true,
                        (int) $order->id_shop
                    );
                }

                foreach ($orderDetailList as &$product) {
                    $orderDetail = new OrderDetail((int) $product['id_order_detail']);
                    if (Configuration::get('PS_ADVANCED_STOCK_MANAGEMENT')) {
                        StockAvailable::synchronize($orderDetail->product_id);
                    }
                }

                // Generate voucher
                if (Tools::getValue('generateDiscountRefund')
                    && !count($this->errors) && $amount > 0
                    && Configuration::get('WKPOS_ORDER_EDIT_PAYMENT') == 0
                ) {
                    $cartRule = new CartRule();
                    $cartRule->description = sprintf(
                        $this->module->l('Credit slip for order #%d', 'order'),
                        $order->id
                    );
                    $language_ids = Language::getIDs(false);
                    foreach ($language_ids as $id_lang) {
                        // Define a temporary name
                        $cartRule->name[$id_lang] = sprintf('V0C%1$dO%2$d', $order->id_customer, $order->id);
                    }

                    // Define a temporary code
                    $cartRule->code = sprintf('V0C%1$dO%2$d', $order->id_customer, $order->id);
                    $cartRule->quantity = 1;
                    $cartRule->quantity_per_user = 1;

                    // Specific to the customer
                    $cartRule->id_customer = $order->id_customer;
                    $now = time();
                    $cartRule->date_from = date('Y-m-d H:i:s', $now);
                    $cartRule->date_to = date('Y-m-d H:i:s', strtotime('+1 year'));
                    $cartRule->partial_use = Configuration::get('WKPOS_PAYMENT_PARTIAL_VOUCHER');
                    // 1 for partial  setting in pos can be created
                    $cartRule->active = 1;

                    $cartRule->reduction_amount = $amount;
                    $cartRule->reduction_tax = $order->getTaxCalculationMethod() != PS_TAX_EXC;
                    $cartRule->minimum_amount_currency = $order->id_currency;
                    $cartRule->reduction_currency = $order->id_currency;

                    if (!$cartRule->add()) {
                        $this->errors[] = $this->module->l('You cannot generate a voucher.', 'order');
                    } else {
                        // Update the voucher code and name
                        foreach ($language_ids as $id_lang) {
                            $cartRule->name[$id_lang] = sprintf(
                                'V%1$dC%2$dO%3$d', // 'V%1$dC%2$dO%3$d',
                                $cartRule->id,
                                $order->id_customer,
                                $order->id
                            );
                        }
                        $cartRule->code = sprintf('V%1$dC%2$dO%3$d', $cartRule->id, $order->id_customer, $order->id);

                        if (!$cartRule->update()) {
                            $this->errors[] = $this->module->l('You cannot generate a voucher.', 'order');
                        } else {
                            $orderSlip = [];
                            $currency = $this->context->currency;
                            $customer = new Customer((int) $order->id_customer);
                            $params = [];
                            $params['{lastname}'] = $customer->lastname;
                            $params['{firstname}'] = $customer->firstname;
                            $params['{id_order}'] = $order->id;
                            $params['{order_name}'] = $order->getUniqReference();
                            $params['{voucher_amount}'] = Tools::displayPrice(
                                $cartRule->reduction_amount,
                                $currency,
                                false
                            );
                            $params['{voucher_num}'] = $cartRule->code;
                            $orderSlip['date_add'] = $cartRule->date_add;
                            $orderSlip['amount'] = $cartRule->reduction_amount;
                            $orderSlip['code'] = $cartRule->code;
                            @Mail::Send(
                                (int) $order->id_lang,
                                'voucher',
                                sprintf(Mail::l('New voucher for your order #%s', $order->id_lang), $order->reference),
                                $params,
                                $customer->email,
                                $customer->firstname . ' ' . $customer->lastname,
                                null,
                                null,
                                null,
                                null,
                                _PS_MAIL_DIR_,
                                true,
                                (int) $order->id_shop
                            );
                        }
                    }
                } else {
                    $idPosOrder = WkPosOrder::getPosOrderId($idOrder);
                    $objOrderPayment = new WkPosOrderPayment();
                    $objOrderPayment->updateOrderTransaction(
                        $amount,
                        WkPosOrderPayment::MONEY_OUT,
                        $idPosOrder,
                        Configuration::get('WKPOS_ORDER_EDIT_PAYMENT')
                    );
                }
            } else {
                if (!empty($refunds)) {
                    if ($orderDetail->unit_price_tax_incl > 0) {
                        $this->errors[] =
                        $this->module->l('Please enter a valid quantity and price to proceed with your refund.', 'order');
                    }
                } else {
                    $this->errors[] = $this->module->l('Please enter an amount to proceed with your refund.', 'order');
                }
            }

            // Redirect if no errors
            if (!count($this->errors)) {
                $objPosOrder = new WkPosOrder();
                $objCurrency = new Currency($idOrderCurrency);
                $idWkPosOutlet = $this->context->cookie->id_wkpos_outlet;
                $orderDetails = $objPosOrder->getOrderDetailsByIdOrder($idOrder, $objCurrency);
                $posOrder = $objPosOrder->getOrdersDetail($idWkPosOutlet, $idOrder);
                $customerObj = new Customer((int) $posOrder['id_customer']);
                $posOrder['customer_name'] = $customerObj->firstname . ' ' . $customerObj->lastname;
                if ($orderSlip == 1) {
                    $orderSlip = [];
                    $orderSlip['date_add'] = $posOrder['order_date'];
                    $orderSlip['amount'] = $amount;
                    $orderSlip['code'] = '--';
                }
                $this->ajaxRender(
                    json_encode(
                        [
                            'id_order' => $idOrder,
                            'products' => $orderDetails,
                            'order' => $posOrder,
                            'orderSlip' => $orderSlip,
                            'currency' => $objCurrency->sign,
                            'hasError' => false,
                            'msg' => $this->module->l('Return requested successfully', 'order'),
                        ]
                    )
                );
            } else {
                $this->ajaxRender(
                    json_encode(
                        [
                            'hasError' => true,
                            'errors' => $this->errors,
                        ]
                    )
                );
            }
        }
    }

    public function displayAjaxEditProductOnOrder()
    {
        // Return value
        $res = true;

        $idOrder = (int) Tools::getValue('id_order');
        $order = new Order($idOrder);
        $prevOrderAmount = $order->getOrdersTotalPaid();
        $idOrderCurrency = $order->id_currency;
        $orderDetail = new OrderDetail((int) Tools::getValue('product_id_order_detail'));
        if (Tools::isSubmit('product_invoice')) {
            $orderInvoice = new OrderInvoice((int) Tools::getValue('product_invoice'));
        }

        // Check fields validity
        $this->doEditProductValidation($orderDetail, $order, isset($orderInvoice) ? $orderInvoice : null);

        // If multiple product_quantity, the order details concern a product customized
        $productQuantity = 0;
        if (is_array(Tools::getValue('product_quantity'))) {
            foreach (Tools::getValue('product_quantity') as $id_customization => $qty) {
                // Update quantity of each customization
                Db::getInstance()->update(
                    'customization',
                    [
                        'quantity' => (int) $qty,
                    ],
                    'id_customization = ' . (int) $id_customization
                );
                // Calculate the real quantity of the product
                $productQuantity += $qty;
            }
        } else {
            $productQuantity = Tools::getValue('product_quantity');
        }

        $productPriceTaxIncl = Tools::ps_round(Tools::getValue('product_price_tax_incl'), 2);
        $productPriceTaxExcl = Tools::ps_round(Tools::getValue('product_price_tax_excl'), 2);
        $totalProductsTaxIncl = $productPriceTaxIncl * $productQuantity;
        $totalProductsTaxExcl = $productPriceTaxExcl * $productQuantity;

        // Calculate differences of price (Before / After)
        $diffPriceTaxIncl = $totalProductsTaxIncl - $orderDetail->total_price_tax_incl;
        $diffPriceTaxExcl = $totalProductsTaxExcl - $orderDetail->total_price_tax_excl;

        // Apply change on OrderInvoice
        if (isset($orderInvoice)) {
            // If OrderInvoice to use is different, we update the old invoice and new invoice
            if ($orderDetail->id_order_invoice != $orderInvoice->id) {
                $oldOrderInvoice = new OrderInvoice($orderDetail->id_order_invoice);
                // We remove cost of products
                $oldOrderInvoice->total_products -= $orderDetail->total_price_tax_excl;
                $oldOrderInvoice->total_products_wt -= $orderDetail->total_price_tax_incl;

                $oldOrderInvoice->total_paid_tax_excl -= $orderDetail->total_price_tax_excl;
                $oldOrderInvoice->total_paid_tax_incl -= $orderDetail->total_price_tax_incl;

                $res &= $oldOrderInvoice->update();

                $orderInvoice->total_products += $orderDetail->total_price_tax_excl;
                $orderInvoice->total_products_wt += $orderDetail->total_price_tax_incl;

                $orderInvoice->total_paid_tax_excl += $orderDetail->total_price_tax_excl;
                $orderInvoice->total_paid_tax_incl += $orderDetail->total_price_tax_incl;

                $orderDetail->id_order_invoice = $orderInvoice->id;
            }
        }

        if ($diffPriceTaxIncl != 0 && $diffPriceTaxExcl != 0) {
            $orderDetail->unit_price_tax_excl = $productPriceTaxExcl;
            $orderDetail->unit_price_tax_incl = $productPriceTaxIncl;

            $orderDetail->total_price_tax_incl += $diffPriceTaxIncl;
            $orderDetail->total_price_tax_excl += $diffPriceTaxExcl;

            if (isset($orderInvoice)) {
                // Apply changes on OrderInvoice
                $orderInvoice->total_products += $diffPriceTaxExcl;
                $orderInvoice->total_products_wt += $diffPriceTaxIncl;

                $orderInvoice->total_paid_tax_excl += $diffPriceTaxExcl;
                $orderInvoice->total_paid_tax_incl += $diffPriceTaxIncl;
            }

            // Apply changes on Order
            $order = new Order($orderDetail->id_order);
            $order->total_products += $diffPriceTaxExcl;
            $order->total_products_wt += $diffPriceTaxIncl;

            $order->total_paid += $diffPriceTaxIncl;
            $order->total_paid_tax_excl += $diffPriceTaxExcl;
            $order->total_paid_tax_incl += $diffPriceTaxIncl;

            $res &= $order->update();
        }

        $oldQuantity = $orderDetail->product_quantity;

        $orderDetail->product_quantity = $productQuantity;
        $orderDetail->reduction_percent = 0;

        // update taxes
        $res &= $orderDetail->updateTaxAmount($order);

        // Save order detail
        $res &= $orderDetail->update();

        // Update weight SUM
        $orderCarrier = new OrderCarrier((int) $order->getIdOrderCarrier());
        if (Validate::isLoadedObject($orderCarrier)) {
            $orderCarrier->weight = (float) $order->getTotalWeight();
            $res &= $orderCarrier->update();
            if ($res) {
                $order->weight = sprintf('%.3f ' . Configuration::get('PS_WEIGHT_UNIT'), $orderCarrier->weight);
            }
        }

        // Save order invoice
        if (isset($orderInvoice)) {
            $res &= $orderInvoice->update();
        }

        // Update product available quantity
        StockAvailable::updateQuantity(
            $orderDetail->product_id,
            $orderDetail->product_attribute_id,
            $oldQuantity - $orderDetail->product_quantity,
            $order->id_shop
        );

        $order = $order->refreshShippingCost();

        $this->sendChangedNotification($order);
        $this->updateOrderPaymentAmount($idOrder, $prevOrderAmount);
        $posOrder = $this->getOrderDetailsById($idOrder);
        $objCurrency = new Currency($idOrderCurrency);
        $this->ajaxRender(
            json_encode(
                [
                    'hasError' => false,
                    'msg' => $this->module->l('Updated Successfully', 'order'),
                    'order' => $posOrder,
                    'currency' => $objCurrency->sign,
                ]
            )
        );
    }

    public function getOrderDetailsById($idOrder)
    {
        $objPosOrder = new WkPosOrder();
        $idWkPosOutlet = $this->context->cookie->id_wkpos_outlet;
        $objOrder = $objPosOrder->getOrdersDetail($idWkPosOutlet, $idOrder);
        $posOrder = [];
        if ($objOrder) {
            $objCurrency = new Currency($objOrder['id_currency']);
            $orderDetails = $objPosOrder->getOrderDetailsByIdOrder($objOrder['id_order'], $objCurrency);
            $customer = new Customer($objOrder['id_customer']);
            $customerName = $customer->firstname . ' ' . $customer->lastname;
            $objOrder['customer_name'] = $customerName;
            $posOrder[$objOrder['id_order']] = ['product' => $orderDetails];
            $objOrder['currency'] = $objCurrency->sign;
            $posOrder[$objOrder['id_order']]['order'] = $objOrder;
        }

        return $posOrder;
    }

    protected function doEditProductValidation(
        OrderDetail $orderDetail,
        Order $order,
        OrderInvoice $orderInvoice = null
    ) {
        $errors = [];
        if (!Validate::isLoadedObject($orderDetail)) {
            $errors[] = $this->module->l('The Order Detail object could not be loaded.', 'order');
        }

        if (!empty($orderInvoice) && !Validate::isLoadedObject($orderInvoice)) {
            $errors[] = $this->module->l('The invoice object cannot be loaded.', 'order');
        }

        if (!Validate::isLoadedObject($order)) {
            $errors[] = $this->module->l('The order object cannot be loaded.', 'order');
        }

        if ($orderDetail->id_order != $order->id) {
            $errors[] = $this->module->l('You cannot edit the order detail for this order.', 'order');
        }

        // We can't edit a delivered order
        if ($order->hasBeenDelivered()) {
            $errors[] = $this->module->l('You cannot edit a delivered order.', 'order');
        }

        if (!empty($orderInvoice) && $orderInvoice->id_order != Tools::getValue('id_order')) {
            $errors[] = $this->module->l('You cannot use this invoice for the order', 'order');
        }

        // Clean price
        $productPriceTaxIncl = str_replace(',', '.', Tools::getValue('product_price_tax_incl'));
        $productPriceTaxExcl = str_replace(',', '.', Tools::getValue('product_price_tax_excl'));

        if (!Validate::isPrice($productPriceTaxIncl) || !Validate::isPrice($productPriceTaxExcl)) {
            $errors[] = $this->module->l('Invalid price', 'order');
        }

        if (!is_array(Tools::getValue('product_quantity'))
            && !Validate::isUnsignedInt(Tools::getValue('product_quantity'))
        ) {
            $errors[] = $this->module->l('Invalid quantity', 'order');
        } elseif (is_array(Tools::getValue('product_quantity'))) {
            foreach (Tools::getValue('product_quantity') as $qty) {
                if (!Validate::isUnsignedInt($qty)) {
                    $errors[] = $this->module->l('Invalid quantity', 'order');
                }
            }
        }
        if ($errors) {
            $this->ajaxRender(
                json_encode(
                    [
                        'hasError' => true,
                        'errors' => $errors,
                    ]
                )
            );
        }
    }

    public function sendChangedNotification(Order $order = null)
    {
        if (is_null($order)) {
            $order = new Order(Tools::getValue('id_order'));
        }

        Hook::exec('actionPosOrderEdited', ['order' => $order]);
    }

    public function displayAjaxDeleteProductLine()
    {
        try {
            $res = true;

            $idOrder = (int) Tools::getValue('id_order');
            $orderDetail = new OrderDetail((int) Tools::getValue('id_order_detail'));
            $order = new Order($idOrder);
            $prevOrderAmount = $order->getOrdersTotalPaid();

            $this->doDeleteProductLineValidation($orderDetail, $order);

            // Update OrderInvoice of this OrderDetail
            if ($orderDetail->id_order_invoice != 0) {
                $orderInvoice = new OrderInvoice($orderDetail->id_order_invoice);
                $orderInvoice->total_paid_tax_excl -= $orderDetail->total_price_tax_excl;
                $orderInvoice->total_paid_tax_incl -= $orderDetail->total_price_tax_incl;
                $orderInvoice->total_products -= $orderDetail->total_price_tax_excl;
                $orderInvoice->total_products_wt -= $orderDetail->total_price_tax_incl;
                $res &= $orderInvoice->update();
            }

            // Update Order
            $order->total_paid -= $orderDetail->total_price_tax_incl;
            $order->total_paid_tax_incl -= $orderDetail->total_price_tax_incl;
            $order->total_paid_tax_excl -= $orderDetail->total_price_tax_excl;
            $order->total_products -= $orderDetail->total_price_tax_excl;
            $order->total_products_wt -= $orderDetail->total_price_tax_incl;

            $res &= $order->update();

            // Reinject quantity in stock
            $orderDetail->delete();
            $this->reinjectQuantity($orderDetail, $orderDetail->product_quantity, true);

            // Update weight SUM
            $orderCarrier = new OrderCarrier((int) $order->getIdOrderCarrier());
            if (Validate::isLoadedObject($orderCarrier)) {
                $orderCarrier->weight = (float) $order->getTotalWeight();
                $res &= $orderCarrier->update();
                if ($res) {
                    $order->weight = sprintf('%.3f ' . Configuration::get('PS_WEIGHT_UNIT'), $orderCarrier->weight);
                }
            }

            if (!$res) {
                $this->dieErrors(
                    [
                        $this->module->l('An error occurred while attempting to delete the product line.', 'order'),
                    ]
                );
            }

            $order = $order->refreshShippingCost();

            $this->sendChangedNotification($order);
            $this->updateOrderPaymentAmount($idOrder, $prevOrderAmount);
            $posOrder = $this->getOrderDetailsById($idOrder);
            $this->ajaxRender(
                json_encode(
                    [
                        'hasError' => false,
                        'msg' => $this->module->l('Deleted Successfully', 'order'),
                        'order' => $posOrder,
                    ]
                )
            );
        } catch (Exception $e) {
            $this->ajaxRender(
                json_encode(
                    [
                        'hasError' => true,
                        'errors' => [$e->getMessage()],
                    ]
                )
            );
        }
    }

    protected function doDeleteProductLineValidation(OrderDetail $orderDetail, Order $order)
    {
        $errors = [];
        if (!Validate::isLoadedObject($orderDetail)) {
            $errors[] = $this->module->l('The Order Detail object could not be loaded.', 'order');
        }

        if (!Validate::isLoadedObject($order)) {
            $errors[] = $this->module->l('The order object cannot be loaded.', 'order');
        }

        if ($orderDetail->id_order != $order->id) {
            $errors[] = $this->module->l('You cannot delete the order detail.', 'order');
        }

        // We can't edit a delivered order
        if ($order->hasBeenDelivered()) {
            $errors[] = $this->module->l('You cannot edit a delivered order.', 'order');
        }

        if ($errors) {
            $this->dieErrors($errors);
        }
    }

    public function dieErrors($errors)
    {
        $this->ajaxRender(
            json_encode(
                [
                    'hasError' => true,
                    'errors' => $errors,
                ]
            )
        );
    }

    public function updateOrderPaymentAmount($idOrder, $prevOrderAmount)
    {
        $objOrderPayment = new WkPosOrderPayment();
        $objOrderPayment->updateOrderAmount($idOrder, $prevOrderAmount);
    }

    /**
     * @param OrderDetail $orderDetail
     * @param int $qtyCancelProduct
     * @param bool $delete
     */
    protected function reinjectQuantity($orderDetail, $qtyCancelProduct, $delete = false)
    {
        // Reinject product
        $reinjectableQuantity = (int) $orderDetail->product_quantity - (int) $orderDetail->product_quantity_reinjected;
        $quantity_to_reinject = $qtyCancelProduct > $reinjectableQuantity ? $reinjectableQuantity : $qtyCancelProduct;
        /** @since 1.5.0 : Advanced Stock Management */
        $product =
        new Product($orderDetail->product_id, false, (int) $this->context->language->id, (int) $orderDetail->id_shop);

        if (Configuration::get('PS_ADVANCED_STOCK_MANAGEMENT')
        && $product->advanced_stock_management
        && $orderDetail->id_warehouse != 0) {
            $manager = StockManagerFactory::getManager();
            $movements = StockMvt::getNegativeStockMvts(
                $orderDetail->id_order,
                $orderDetail->product_id,
                $orderDetail->product_attribute_id,
                $quantity_to_reinject
            );
            $left_to_reinject = $quantity_to_reinject;
            foreach ($movements as $movement) {
                if ($left_to_reinject > $movement['physical_quantity']) {
                    $quantity_to_reinject = $movement['physical_quantity'];
                }

                $left_to_reinject -= $quantity_to_reinject;
                if (Pack::isPack((int) $product->id)) {
                    // Gets items
                    if ($product->pack_stock_type == Pack::STOCK_TYPE_PRODUCTS_ONLY
                        || $product->pack_stock_type == Pack::STOCK_TYPE_PACK_BOTH
                        || ($product->pack_stock_type == Pack::STOCK_TYPE_DEFAULT
                            && Configuration::get('PS_PACK_STOCK_TYPE') > 0)
                    ) {
                        $products_pack = Pack::getItems(
                            (int) $product->id,
                            (int) Configuration::get('PS_LANG_DEFAULT')
                        );
                        // Foreach item
                        foreach ($products_pack as $product_pack) {
                            if ($product_pack->advanced_stock_management == 1) {
                                $manager->addProduct(
                                    $product_pack->id,
                                    $product_pack->id_pack_product_attribute,
                                    new Warehouse($movement['id_warehouse']),
                                    $product_pack->pack_quantity * $quantity_to_reinject,
                                    null,
                                    $movement['price_te'],
                                    true
                                );
                            }
                        }
                    }

                    if ($product->pack_stock_type == Pack::STOCK_TYPE_PACK_ONLY
                        || $product->pack_stock_type == Pack::STOCK_TYPE_PACK_BOTH
                        || (
                            $product->pack_stock_type == Pack::STOCK_TYPE_DEFAULT
                            && (Configuration::get('PS_PACK_STOCK_TYPE') == Pack::STOCK_TYPE_PACK_ONLY
                                || Configuration::get('PS_PACK_STOCK_TYPE') == Pack::STOCK_TYPE_PACK_BOTH)
                        )
                    ) {
                        $manager->addProduct(
                            $orderDetail->product_id,
                            $orderDetail->product_attribute_id,
                            new Warehouse($movement['id_warehouse']),
                            $quantity_to_reinject,
                            null,
                            $movement['price_te'],
                            true
                        );
                    }
                } else {
                    $manager->addProduct(
                        $orderDetail->product_id,
                        $orderDetail->product_attribute_id,
                        new Warehouse($movement['id_warehouse']),
                        $quantity_to_reinject,
                        null,
                        $movement['price_te'],
                        true
                    );
                }
            }

            $id_product = $orderDetail->product_id;
            if ($delete) {
                $orderDetail->delete();
            }
            StockAvailable::synchronize($id_product);
            // WkPosOutletProduct::reinjectQuantity(
            //     $orderDetail->id_order,
            //     $orderDetail->product_id,
            //     $orderDetail->product_attribute_id,
            //     $quantity_to_reinject
            // );
            WkPosOutletProduct::reinjectQuantityOutletwise(
                $orderDetail->id_order,
                $orderDetail->product_id,
                $orderDetail->product_attribute_id,
                $quantity_to_reinject
            );
        } elseif ($orderDetail->id_warehouse == 0) {
            StockAvailable::updateQuantity(
                $orderDetail->product_id,
                $orderDetail->product_attribute_id,
                $quantity_to_reinject,
                $orderDetail->id_shop,
                true,
                [
                    'id_order' => $orderDetail->id_order,
                    'id_stock_mvt_reason' => Configuration::get('PS_STOCK_CUSTOMER_RETURN_REASON'),
                ]
            );

            // sync all stock
            (new StockManager())->updatePhysicalProductQuantity(
                (int) $orderDetail->id_shop,
                (int) Configuration::get('PS_OS_ERROR'),
                (int) Configuration::get('PS_OS_CANCELED'),
                null,
                (int) $orderDetail->id_order
            );

            if ($delete) {
                $orderDetail->delete();
            }
            // WkPosOutletProduct::reinjectQuantity(
            //     $orderDetail->id_order,
            //     $orderDetail->product_id,
            //     $orderDetail->product_attribute_id,
            //     $quantity_to_reinject
            // );
            WkPosOutletProduct::reinjectQuantityOutletwise(
                $orderDetail->id_order,
                $orderDetail->product_id,
                $orderDetail->product_attribute_id,
                $quantity_to_reinject
            );
        } else {
            $this->errors[] =
            $this->trans('This product cannot be re-stocked.', [], 'Admin.Orderscustomers.Notification');
        }
    }
}
