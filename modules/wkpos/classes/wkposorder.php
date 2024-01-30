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
class WkPosOrder extends ObjectModel
{
    public $id_order;
    public $reference;
    public $offline_reference;
    public $active;
    public $id_wkpos_outlet_employee;
    public $id_wkpos_outlet;
    // public $id_wkpos_session;
    // public $tendered;
    // public $change;
    // public $id_wkpos_payment;
    public $order_date;
    public $date_upd;

    public static $definition = [
        'table' => 'wkpos_order',
        'primary' => 'id_wkpos_order',
        'multilang' => false,
        'fields' => [
            'id_order' => ['type' => self::TYPE_INT, 'validate' => 'isInt', 'required' => true],
            'reference' => ['type' => self::TYPE_STRING, 'required' => true, 'size' => 9],
            'offline_reference' => ['type' => self::TYPE_STRING, 'size' => 10],
            'id_wkpos_outlet_employee' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            // 'tendered' => array('type' => self::TYPE_FLOAT, 'size' => 20),
            // 'change' => array('type' => self::TYPE_FLOAT, 'size' => 20),
            // 'id_wkpos_payment' => array(
            //     'type' => self::TYPE_INT,
            //     'required' => true,
            //     'validate' => 'isNullOrUnsignedId',
            //     'size' => 10
            // ),
            'active' => ['type' => self::TYPE_INT, 'size' => 2],
            'id_wkpos_outlet' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            // 'id_wkpos_session' => array(
            //     'type' => self::TYPE_INT,
            //     'required' => true,
            //     'validate' => 'isNullOrUnsignedId',
            //     'size' => 10
            // ),
            'order_date' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
        ],
    ];

    /**
     * get order details by outlet id or id order
     *
     * @param [int] $idWkPosOutlet
     * @param int $idOrder
     *
     * @return array of order details
     */
    public function getOrdersDetail($idWkPosOutlet, $idOrder = false)
    {
        $context = Context::getContext();
        $idShop = $context->shop->id;
        $shopGroup = new ShopGroup($context->shop->id_shop_group);
        $sql = 'SELECT ord.`id_order`, ord.`id_currency`,ord.`total_paid_tax_excl`,
            ord.`total_discounts`, ord.`total_products_wt`,
            ord.`total_paid_tax_incl`, pord.`order_date`, addr.`address1`, ord.`current_state`,
            addr.`address2`, addr.`city`, addr.`postcode`,
            ord.`reference`, ord.`payment`, pord.`id_wkpos_outlet_employee`,
            pord.`offline_reference`, ord.`id_customer`, pord.`id_wkpos_order`,
            odc.`shipping_cost_tax_excl`, odc.`shipping_cost_tax_incl`, ord.`current_state`, odsl.`name`
            FROM `' . _DB_PREFIX_ . 'wkpos_order` pord
            JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_employee` outl
            ON (pord.`id_wkpos_outlet_employee` = outl.`id_wkpos_outlet_employee`)
            LEFT JOIN `' . _DB_PREFIX_ . 'orders` ord ON (pord.`id_order` = ord.`id_order`)
            LEFT JOIN `' . _DB_PREFIX_ . 'address` addr ON (addr.`id_address` = ord.`id_address_delivery`)
            LEFT JOIN `' . _DB_PREFIX_ . 'order_carrier` odc ON (odc.`id_order` = ord.`id_order`)
            LEFT JOIN `' . _DB_PREFIX_ . 'order_state` ods ON (ods.`id_order_state` = ord.`current_state`)
            LEFT JOIN `' . _DB_PREFIX_ . 'order_state_lang` odsl ON (ods.`id_order_state` = odsl.`id_order_state`)
            WHERE outl.`id_wkpos_outlet` = ' . (int) $idWkPosOutlet .
            // ' AND odsl.`id_lang` = '.(int)Configuration::get('PS_LANG_DEFAULT');
            ' AND odsl.`id_lang` = ' . (int) $context->language->id;
        if ($idOrder) {
            $sql .= ' AND pord.`id_order` = ' . (int) $idOrder;
            $order = Db::getInstance()->getRow($sql);
            if ($order) {
                $order = $this->formatOrderDetails($order);
                // $order['order_payment'] = WkPosOrderPayment::getOrderPayment($order['id_wkpos_order']);
            }

            return $order;
        }
        if ($shopGroup->share_order == 0) {
            $sql .= ' AND ord.`id_shop` = ' . $idShop;
        }
        $orders = Db::getInstance()->executeS($sql);
        if ($orders) {
            $context = Context::getContext();
            foreach ($orders as &$order) {
                $order = $this->formatOrderDetails($order);
            }
        }

        return $orders;
    }

    public function formatOrderDetails($order)
    {
        $objCurrency = new Currency($order['id_currency']);
        $orderPayment = WkPosOrderPayment::getOrderPayment($order['id_wkpos_order']);
        /* Pending */
        $orderPaymentData = [];
        foreach ($orderPayment as &$orderAmount) {
            /* Format order amount */
            $idPayment = $orderAmount['id_wkpos_payment'];
            if (!isset($orderPaymentData[$idPayment])) {
                $orderPaymentData[$idPayment] = $orderAmount;
            }
            if (!isset($orderPaymentData[$idPayment]['change'])) {
                $orderPaymentData[$idPayment]['change'] = 0;
            }
            if (!isset($orderPaymentData[$idPayment]['tendered'])) {
                $orderPaymentData[$idPayment]['tendered'] = 0;
            }
            if ($orderAmount['type'] == WkPosOrderPayment::MONEY_OUT) {
                $orderPaymentData[$idPayment]['change'] += (float) $orderAmount['amount'];
            } elseif ($orderAmount['type'] == WkPosOrderPayment::MONEY_IN) {
                $orderPaymentData[$idPayment]['tendered'] += (float) $orderAmount['amount'];
            }
        }

        foreach ($orderPaymentData as &$orderAmount) {
            $totalAmount = $orderAmount['tendered'] - $orderAmount['change'];
            $orderAmount['totalOrderAmount'] = Tools::displayPrice($totalAmount, $objCurrency);
            if (isset($orderAmount['change'])) {
                $orderAmount['change'] = Tools::displayPrice($orderAmount['change'], $objCurrency);
            }
            if (isset($orderAmount['tendered'])) {
                $orderAmount['tendered'] = Tools::displayPrice($orderAmount['tendered'], $objCurrency);
            }
        }
        $order['order_payment'] = $orderPaymentData;
        $order['currency'] = $objCurrency->sign;
        $order['currency_iso_code'] = $objCurrency->iso_code;
        $order['shipping_cost_tax_excl'] = Tools::displayPrice(
            $order['shipping_cost_tax_excl'],
            $objCurrency
        );
        $order['shipping_cost_tax_incl'] = Tools::displayPrice(
            $order['shipping_cost_tax_incl'],
            $objCurrency
        );
        $order['total_discounts_value'] = round($order['total_discounts'], 2);
        $order['total_discounts'] = Tools::displayPrice(
            $order['total_discounts'],
            $objCurrency
        );
        $order['total_tax'] = Tools::displayPrice(
            (float) $order['total_paid_tax_incl'] - (float) $order['total_paid_tax_excl'],
            $objCurrency
        );
        $order['total_paid_tax_excl'] = Tools::displayPrice(
            $order['total_paid_tax_excl'],
            $objCurrency
        );
        $order['total_paid_tax_incl'] = Tools::displayPrice(
            $order['total_paid_tax_incl'],
            $objCurrency
        );
        $order['total_products_wt'] = Tools::displayPrice(
            $order['total_products_wt'],
            $objCurrency
        );
        $order['messages'] = Message::getMessagesByOrderId($order['id_order']);
        // new added for loyalty and nf525
        Hook::exec('actionWkPosFormatOrderDetail', ['order_detail' => &$order]);

        return $order;
    }

    /**
     * get order product detail
     *
     * @param [int] $idOrder
     *
     * @return array - array containing product detail
     */
    public function getOrderDetailsByIdOrder($idOrder, $objCurrency)
    {
        $orderedProducts = Db::getInstance()->executeS(
            'SELECT od.`product_id`, od.`product_attribute_id`,
            od.`product_quantity`, od.`product_price`, od.`product_name`,od.`group_reduction`,
            od.`total_price_tax_incl`, od.`total_price_tax_excl`, od.`reduction_percent`, od.`reduction_amount`,
            od.`unit_price_tax_incl`, od.`unit_price_tax_excl`, od.`id_order_detail`, od.`id_order_invoice`, od.`tax_rate`, od.`original_product_price`
            FROM `' . _DB_PREFIX_ . 'order_detail` od
            WHERE od.`id_order` = ' . (int) $idOrder
        );

        foreach ($orderedProducts as &$orderProduct) {
            $resume = OrderSlip::getProductSlipResume($orderProduct['id_order_detail']);
            $orderProduct['return_qty'] = $resume['product_quantity'];
            $orderProduct['display_return_amount_tax_excl'] = Tools::displayPrice(
                $resume['amount_tax_excl'],
                $objCurrency
            );
            $orderProduct['display_return_amount_tax_incl'] = Tools::displayPrice(
                $resume['amount_tax_incl'],
                $objCurrency
            );
            $orderProduct['return_amount_tax_excl'] = $resume['amount_tax_excl'];
            $orderProduct['return_amount_tax_incl'] = $resume['amount_tax_incl'];

            $orderProduct['quantity_refundable'] = $orderProduct['product_quantity'] - $resume['product_quantity'];
            $orderProduct['display_amount_refundable_tax_incl'] = Tools::displayPrice(
                $orderProduct['total_price_tax_incl'] - $resume['amount_tax_incl'],
                $objCurrency
            );
            $orderProduct['display_amount_refundable_tax_excl'] = Tools::displayPrice(
                $orderProduct['total_price_tax_excl'] - $resume['amount_tax_excl'],
                $objCurrency
            );
            $orderProduct['display_total_price_tax_excl'] = Tools::displayPrice(
                $orderProduct['total_price_tax_excl'],
                $objCurrency
            );
            $orderProduct['display_total_price_tax_incl'] = Tools::displayPrice(
                $orderProduct['total_price_tax_incl'],
                $objCurrency
            );
            $orderProduct['display_unit_price_tax_excl'] = Tools::displayPrice(
                $orderProduct['unit_price_tax_excl'],
                $objCurrency
            );
            $orderProduct['display_unit_price_tax_incl'] = Tools::displayPrice(
                $orderProduct['unit_price_tax_incl'],
                $objCurrency
            );
            $orderProduct['refund_history'] = OrderSlip::getProductSlipDetail($orderProduct['id_order_detail']);
            $orderProduct['return_history'] = OrderReturn::getProductReturnDetail($orderProduct['id_order_detail']);
            $tempT = $orderProduct['total_price_tax_incl'] - $orderProduct['total_price_tax_excl'];
            $orderProduct['tax_amount'] = Tools::displayPrice($tempT, $objCurrency);
            $orderProduct['tax_amount_value'] = round($tempT, 2);
            $orderProduct['tax_rate_value'] = round($orderProduct['tax_rate'], 2);
            $orderProduct['tax_rate'] = round($orderProduct['tax_rate'], 2) . '%';
            if ($orderProduct['reduction_amount'] > 0) {
                $totalReductionAmt = $orderProduct['reduction_amount'] * $orderProduct['quantity_refundable'];
                $orderProduct['discount_amount'] = Tools::displayPrice(
                    $totalReductionAmt,
                    $objCurrency
                );
                $orderProduct['discount_amount_value'] = round($totalReductionAmt, 2);
            } elseif ($orderProduct['group_reduction'] > 0 && $orderProduct['reduction_amount'] == 0) {
                $proPrice = (($orderProduct['original_product_price'] / (100 - $orderProduct['group_reduction'])) * 100);
                $proPrcieWithTax = $proPrice + (($proPrice / 100) * $orderProduct['tax_rate_value']);
                $totalReductionAmt = ($proPrcieWithTax - $orderProduct['total_price_tax_incl']) * $orderProduct['quantity_refundable'];
                $orderProduct['discount_amount'] = Tools::displayPrice(
                    $totalReductionAmt,
                    $objCurrency
                );
                $orderProduct['discount_amount_value'] = round($totalReductionAmt, 2);
            } else {
                $totTemp = $orderProduct['original_product_price'] * $orderProduct['reduction_percent'];
                $totalReductionAmt = ($totTemp / 100) * $orderProduct['product_quantity'];
                // $totalReductionAmt = $totalReductionAmt * $orderProduct['quantity_refundable'];
                $orderProduct['discount_amount'] = Tools::displayPrice(
                    $totalReductionAmt,
                    $objCurrency
                );
                $orderProduct['discount_amount_value'] = round($totalReductionAmt, 2);
            }
        }

        return $orderedProducts;
    }

    /**
     * Get id order by id cart
     *
     * @param [int] $idCart
     *
     * @return array - array of idOrder containing $idCart value
     */
    public static function getIdOrdersByIdCart($idCart)
    {
        return Db::getInstance()->executeS(
            'SELECT o.`id_order`
            FROM `' . _DB_PREFIX_ . 'orders` AS o
            WHERE o.`id_cart` = ' . (int) $idCart
        );
    }

    public static function getPosOrderId($idOrder)
    {
        return Db::getInstance()->getValue(
            'SELECT o.`id_wkpos_order`
            FROM `' . _DB_PREFIX_ . 'wkpos_order` AS o
            WHERE o.`id_order` = ' . (int) $idOrder
        );
    }

    /**
     * Create new voucher for the order discount
     *
     * @param [int] $idCustomer
     *
     * @return void
     */
    public function createOrderVoucher($idCustomer)
    {
        $context = Context::getContext();
        $module = Module::getInstanceByName('wkpos');
        $objCartRule = new CartRule();
        $language_ids = Language::getIDs(false);
        foreach ($language_ids as $id_lang) {
            // $objCartRule->name = array($context->language->id => $module->l('WKPOS Discount', 'order'));
            $objCartRule->name[$id_lang] = $module->l('WKPOS Discount', 'order');
        }
        $objCartRule->id_customer = $idCustomer;
        $objCartRule->date_from = date('Y-m-d H:i:s');
        $objCartRule->date_to = date('Y-m-d H:i:s', strtotime('+1 Day'));
        $objCartRule->priority = 1;
        $objCartRule->partial_use = 0;
        $objCartRule->code = self::generateCode();
        $objCartRule->minimum_amount = (float) Tools::getValue('amount_paid');
        $objCartRule->minimum_amount_tax = 1;
        $objCartRule->minimum_amount_currency = $context->currency->id;
        $objCartRule->minimum_amount_shipping = 1;
        $objCartRule->free_shipping = 0;
        $objCartRule->reduction_percent = 0;
        $objCartRule->reduction_amount = (float) Tools::getValue('order_discount');
        $objCartRule->reduction_tax = 1;
        $objCartRule->reduction_currency = $context->currency->id;
        $objCartRule->active = 1;
        $objCartRule->add();

        return $objCartRule;
    }

    /**
     * Generate the random code for the voucher
     *
     * @return void
     */
    protected function generateCode()
    {
        $chars = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
        $charactersLength = Tools::strlen($chars);
        $code = '';
        for ($i = 0; $i < 8; ++$i) {
            $code .= $chars[rand(0, $charactersLength - 1)];
        }

        return $code;
    }

    public static function getOutletByIdOrder($idOrder)
    {
        return Db::getInstance()->getRow(
            'SELECT o.`id_wkpos_outlet`
            FROM `' . _DB_PREFIX_ . 'wkpos_order` AS o
            WHERE o.`id_order` = ' . (int) $idOrder
        );
    }
}
