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

import { showErrorMsg, showSuccessMsg } from './wkgrowlmsg.js';
import { updateCartTotalAmount, getProductDetails } from './poscart.js';
import { ajaxResposeError } from './wkajaxresponseerror.js';
import objProduct from './product.js';
import { Products, loadProductPanel, storeProduct } from './product.js';
import { updateVouchers, appliedVouchers, updateVoucherCoupon } from './voucher.js';
import { asyncComputed, wkFormatCurrency, makeTotalProductCaculation } from './wkformatcurrency.js';

/* Mapping of order Details */
export function Order(order, products = false) {
    var self = this;
    self.orderReference = order['reference'];
    self.idOrder = order['id_order'];
    self.orderDate = order['order_date'];
    self.messages = null;
    self.orderedProducts = ko.observableArray([]);
    self.current_state = ko.observable(parseInt(order.current_state));
    self.orderTotal = ko.observable(order['total_paid_tax_incl']);
    self.displayOrderDiscount = ko.observable(order['total_discounts']);
    self.orderSubTotal = ko.observable((order['total_products_wt']));
    self.displayOrderShipping = ko.observable((order['shipping_cost_tax_incl']));
    if (typeof order['shipping_cost_tax_incl'] != 'undefined' && order['shipping_cost_tax_incl']) {
        self.orderShipping = ko.observable((order['shipping_cost_tax_incl'].replace(order['currency'], '')));
    } else {
        self.orderShipping = ko.observable(0);
    }
    if (typeof order['total_discounts'] != 'undefined' && order['total_discounts']) {
        self.orderDiscount = ko.observable((order['total_discounts'].replace(order['currency'], '')));
    } else {
        self.orderDiscount = ko.observable(0);
    }
    self.displayOrderDiscount = ko.observable(order['total_discounts']);
    self.shippingCost = ko.observable(order['shipping_cost_tax_incl']);

    if (typeof order['messages'] != 'undefined' && order['messages'] != null) {
        var messages = [];
        $.each(order['messages'], function (index, message) {
            messages.push({
                'name': message['message']
            });
        });
        self.messages = messages;
    }
    // if (isNaN(order['total_paid_tax_incl'])) {
    // } else {
    //     self.orderTotal = asyncComputed(function () {
    //         return wkFormatCurrency(order['total_paid_tax_incl'], currencyFormat);
    //     }, this);
    //     self.displayOrderDiscount = asyncComputed(function () {
    //         return wkFormatCurrency(order['total_discounts'], currencyFormat);
    //     }, this);
    //     self.orderSubTotal = asyncComputed(function () {
    //         return wkFormatCurrency(order['total_products_wt'], currencyFormat);
    //     }, this);
    //     self.orderShipping = asyncComputed(function () {
    //         return wkFormatCurrency(order['shipping_cost_tax_incl'], currencyFormat);
    //     }, this);
    //     self.orderDiscount = asyncComputed(function () {
    //         return wkFormatCurrency(order['total_discounts'], currencyFormat);
    //     }, this);
    //     self.shippingCost = asyncComputed(function () {
    //         return wkFormatCurrency(order['shipping_cost_tax_incl'], currencyFormat);
    //     }, this);

    // }
    self.payment = order['payment'];
    self.id_wkpos_order = parseInt(order['id_wkpos_order']);
    self.order_payment = order['order_payment'];
    self.installment_order = false;
    self.currency = ko.observable(order.currency);
    var orderPayments = [];
    if (order['order_payment']) {
        $.each(order['order_payment'], function (index, payment) {
            if (payment['id_wkpos_payment'] == 4) {
                self.installment_order = true;
                if (order['installment']['paidAmount'] == null) {
                    order['installment']['paidAmount'] = 0;
                }
                if (isNaN(order['installment']['paidAmount'])) {
                    self.displayAmountPaid = order['installment']['paidAmount'];
                    self.displayRemainingAmount = order['installment']['remainingAmount'];
                } else {
                    self.displayAmountPaid = asyncComputed(function () {
                        return wkFormatCurrency(parseFloat(order['installment']['paidAmount']), currencyFormat);
                    }, this);
                    self.displayRemainingAmount = asyncComputed(function () {
                        return wkFormatCurrency(parseFloat(order['installment']['remainingAmount']), currencyFormat);
                    }, this);
                }
                self.amountPaid = ko.observable(parseFloat(order['installment']['paidAmount']));
                self.remainingAmount = ko.observable(parseFloat(order['installment']['remainingAmount']));
            } else {
                if (isNaN(payment['tendered'])) {
                    var orderPayment = {
                        'name': payment['name'],
                        'displayPartialAmount': payment['totalOrderAmount']
                    };
                } else {
                    var orderPayment = {
                        'name': payment['name'],
                        'displayPartialAmount': asyncComputed(function () {
                            return wkFormatCurrency(parseFloat(payment['totalOrderAmount']), currencyFormat);
                        }, this)
                    };
                }
                orderPayments.push(orderPayment);
            }
        });
    } else {
        self.displayAmountPaid = ko.observable(0);
        self.displayRemainingAmount = ko.observable(0);
        self.amountPaid = ko.observable(0);
        self.remainingAmount = ko.observable(0);
    }
    self.order_payment = orderPayments;

    self.customerName = order['customer_name'];
    var address;
    if (order['address1'] != '') {
        address = order['address1'] + '<br>';
    }
    if (order['address2'] != '') {
        address += order['address2'] + '<br>';
    }
    if (order['city'] != '') {
        address += order['city'] + ' - ';
    }
    if (order['postcode'] != '') {
        address += order['postcode'];
    }
    self.customerAddress = address;

    if (products) {
        $.each(products, function (index, product) {
            self.orderedProducts.push(new OrderedProduct(product, index, 1, order.currency));
        });
    }
}

/* Mapping of ordered product in a order */
export function OrderedProduct(product, index, displayOrderBill = false, currency) {
    var self = this;
    this.serialNo = parseInt(index) + 1;
    this.productName = product['product_name'].split(" - ")[0];
    this.productQuantity = product['product_quantity'];
    self.productPrice = makeTotalProductCaculation(product['unit_price_tax_incl']);
    self.totalPricePerProduct = makeTotalProductCaculation(product['total_price_tax_incl']);
    self.changedtotalPricePerProduct = ko.observable(makeTotalProductCaculation(product['total_price_tax_incl']));
    self.currency = currency;
    // if (isNaN(product['unit_price_tax_incl'])) {
    // } else {
    //     self.productPrice = asyncComputed(function () {
    //         return wkFormatCurrency(product['unit_price_tax_incl'], currencyFormat);
    //     }, this);
    //     self.totalPricePerProduct = asyncComputed(function () {
    //         return wkFormatCurrency(product['total_price_tax_incl'], currencyFormat);
    //     }, this);
    //     self.changedtotalPricePerProduct = asyncComputed(function () {
    //         return wkFormatCurrency(product['total_price_tax_incl'], currencyFormat);
    //     }, this);
    // }
    // formatCurrencyCldr(product['unit_price_tax_incl'], function(price) {
    //     self.productPrice = price;
    // });
    // formatCurrencyCldr(product['total_price_tax_incl'], function(price) {
    //     self.totalPricePerProduct = price;
    // });
    // formatCurrencyCldr(product['total_price_tax_incl'], function(price) {
    //     self.changedtotalPricePerProduct = ko.observable(price);
    // });

    this.changedTaxExclPrice = ko.observable(makeTotalProductCaculation(parseFloat(product['total_price_tax_incl'])));
    this.id_order_invoice = parseInt(product['id_order_invoice']);
    this.totalPrice = parseFloat(product['total_price_tax_incl']);
    this.price = product['unit_price_tax_incl'];
    this.totalTaxExclusive = parseFloat(product['total_price_tax_excl']);
    this.totalTaxInclusive = parseFloat(product['total_price_tax_incl']);
    this.taxRate = ((this.totalTaxInclusive - this.totalTaxExclusive) * 100 / (this.totalTaxExclusive));

    if (product['product_name'].split(" - ")[1] != undefined) {
        this.productAttributes = product['product_name'].split(" - ")[1];
    } else {
        this.productAttributes = "";
    }

    if (product['reduction_percent'] != undefined && displayProductDiscount == 1) {
        this.productDiscount = product['reduction_percent'];
        // productDetails += product['reduction_percent'];
    } else {
        this.productDiscount = 0;
    }

    this.partialRefundQty = ko.observable(0);
    this.partialRefundAmount = ko.observable(0);

    this.refundedQty = ko.observable(0);
    this.refundedAmount = ko.observable(0);

    this.id_order_detail = product.id_order_detail;
    this.amount_refundable_tax_incl = ko.observable(product.amount_refundable_tax_incl);
    this.quantity_refundable = ko.observable(parseInt(product.quantity_refundable));

    if (product.return_qty) {
        var status = viewModel.alreadyRefund() || true;
        this.return_qty = product['return_qty'];
    } else {
        var status = viewModel.alreadyRefund() || false;
        this.return_qty = 0;
    }
    viewModel.changeRefundStatus(status);
    if (product.return_amount_tax_incl) {
        this.return_amount_tax_incl = product['return_amount_tax_incl'];
    } else {
        this.return_amount_tax_incl = 0;
    }
    self.return_amount = makeTotalProductCaculation(self.return_amount_tax_incl);
    // if (isNaN(self.return_amount_tax_incl)) {
    // } else {
    //     self.return_amount = asyncComputed(function () {
    //         return wkFormatCurrency(self.return_amount_tax_incl, currencyFormat);
    //     }, this);
    // }
}

/* Search order on the basis of order reference */
export function searchOrder() {
    var posOrder;
    posOrder = posOrders;
    if (viewModel.selectedOrderType() == "offline") {
        posOrder = $.parseJSON(localStorage.pos_orders);
    }
    var selectOrder = true;
    var i = 0, mappedOrders = [];
    var orderSearch = (viewModel.orderSearchKey()).toLowerCase();
    var addOrder = true;
    $.each(posOrder, function (index, order) {
        if ((((order['order']['reference'] + "").toLowerCase()).search(orderSearch) != '-1')
            || (((order['order']['offline_reference'] + "").toLowerCase()).search(orderSearch) != '-1')
            || ((order['order']['order_date'] + "").search(orderSearch) != '-1')
            || ((order['order']['total_paid_tax_incl'] + "").search(orderSearch) != '-1')
        ) {
            addOrder = true;
            // if (viewModel.selectedOrderType() == "history" && order['order'].id_wkpos_session == idWkPosSession) {
            //     addOrder = false;
            // } else if (viewModel.selectedOrderType() == "current_session" && order['order'].id_wkpos_session != idWkPosSession) {
            //     addOrder = false;
            // }

            if (addOrder) {
                if (selectOrder) {
                    viewModel.selectedOrderReference(order['order']['reference']);
                    viewModel.selectedOrderId(order['order']['id_order']);
                    selectOrder = false;
                }
                mappedOrders[i++] = (new Order(order['order']));
            }
        }
    });
    loadOrderPanel(mappedOrders);
    // viewModel.orderDetails(mappedOrders);
}


export async function addProductToPsCart(offlineSync = false) {
    var pos_cart = $.parseJSON(localStorage.pos_cart);
    var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
    viewModel.order = ko.observableArray([]);
    var idCustomer = 0;
    if (pos_cart[cartIndex] != undefined) {
        if (pos_cart[cartIndex]['others'] != undefined && pos_cart[cartIndex]['others']['customer'] != undefined) {
            idCustomer = pos_cart[cartIndex]['others']['customer']['idCustomer'];
        }
        var products = await getProductDetails(pos_cart[cartIndex]);
        if (products != null) {
            var data = {
                action: 'addProductToCart',
                ajax: true,
                product: JSON.stringify(products),
                idCustomer: idCustomer,
                order_discount: viewModel.orderDiscount(),
                id_address: viewModel.selectedIdAddress(),
                id_carrier: viewModel.selectedIdCarrier(),
                posToken: posToken
            };
            if (pos_cart[cartIndex]['others'] != undefined
                && pos_cart[cartIndex]['others']['id_cart'] != undefined
            ) {
                data['id_cart'] = pos_cart[cartIndex]['others']['id_cart'];
            }
            $('.wk-loading-pos-details').addClass('sync-orders').removeClass('hide');
            $('.wk-loading-status').html('').show();
            $('.wk-loading-pos-details').next().css({ "opacity": "0.7" });
            $.ajax({
                url: orderUrl,
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (order) {
                    if (order.hasError) {
                        $.each(order.errors, function (index, error) {
                            showErrorMsg(error);
                            $('.wk-loading-pos-details').addClass('sync-orders').addClass('hide');
                            $('.wk-loading-status').html('').hide();
                            $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                            // $.growl.error({ title: "", message: error });
                            posViewModel.bodyPanel('products');
                            posViewModel.contentModel.callPosResize();
                        });
                    } else {
                        // self.totalOrderAmount(order.cartAmount);
                        updateCartTotalAmount(order.cartAmount);
                        cartVouchers = order.availableVouchers;
                        if (order.id_cart != undefined) {
                            pos_cart[cartIndex]['others']['id_cart'] = order.id_cart;
                        }
                        if (typeof order.appliedVoucher != 'undefined' && order.appliedVoucher) {
                            updateVoucherCoupon(pos_cart[cartIndex], order.appliedVoucher);
                            updateVouchers(pos_cart[cartIndex]);
                            appliedVouchers(order.appliedVoucher);
                        }
                        localStorage.pos_cart = JSON.stringify(pos_cart);
                        $('.wk-loading-pos-details').removeClass('sync-orders').addClass('hide');
                        $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                        if (offlineSync) {

                        }
                    }
                },
                error: function (jqXHR, exception) {
                    ajaxResposeError(jqXHR, exception);
                }
            });
        }
    }
}

export async function generateOrder(orderData = null) {
    if (deliveryError == 0) {
        var pos_cart = $.parseJSON(localStorage.pos_cart);
        var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
        viewModel.order = ko.observableArray([]);
        var idCustomer = 0;
        var cartOtherDetails = pos_cart[cartIndex]['others'];

        if (cartOtherDetails != undefined && cartOtherDetails['customer'] != undefined) {
            idCustomer = cartOtherDetails['customer']['idCustomer'];
        }

        var products = await getProductDetails(pos_cart[cartIndex]);
        if (products != null) {
            viewModel.confirmDisabled(1);
            if (posViewModel.navigatorOnline()) {
                /* Generate order in prestashop if there is internet connection  */
                $('.wk-loading-pos-details').addClass('sync-orders').removeClass('hide');
                $('.wk-loading-status').html('').show();
                $('.wk-loading-pos-details').next().css({ "opacity": "0.7" });
                var paymentDetails = ko.mapping.toJS(viewModel.paymentOptions);
                var data = {
                    action: 'generateOrder',
                    ajax: true,
                    idCustomer: idCustomer,
                    total_paid: viewModel.total(),
                    // tendered: viewModel.customerPayAmount(),
                    // change: viewModel.customerReturnAmount(),
                    order_discount: viewModel.orderDiscount(),
                    payment_module: viewModel.selectedPaymentOption(),
                    // id_payment: viewModel.selectedPaymentId(),
                    id_address: viewModel.selectedIdAddress(),
                    id_carrier: viewModel.selectedIdCarrier(),
                    order_message: viewModel.orderMessage(),
                    // id_wkpos_session: idWkPosSession,
                    paymentDetails: paymentDetails,
                    posToken: posToken
                };

                if (orderData != null) {
                    data = { ...data, ...orderData };
                }
                if (viewModel.selectedPaymentId() == 3) {
                    data.installment = viewModel.installment();
                    data.installmentAmount = viewModel.installmentAmount();
                }
                if (pos_cart[cartIndex]['others']['id_cart'] != undefined) {
                    data['id_cart'] = pos_cart[cartIndex]['others']['id_cart'];
                }
                posViewModel.contentModel.emitBeforeEvents('generateOnlineOrder', data);
                $.ajax({
                    url: orderUrl,
                    dataType: 'json',
                    type: 'get',
                    data: data,
                    success: function (order) {
                        if (order.hasError) {
                            $.each(order.errors, function (index, error) {
                                showErrorMsg(error);
                                // $.growl.error({ title: "", message: error });
                            });
                        } else {
                            showSuccessMsg(order.success);
                            // $.growl.notice({ title: "", message: order.success });
                            taxRate = undefined;
                            viewModel.confirmDisabled(0);
                            viewModel.orderDiscount(0);
                            /* Generate order Receipt */
                            viewModel.orderReceipt(order[order.id_order]);
                            viewModel.selectedOrderId(order.id_order);
                            posOrders[order.id_order] = order[order.id_order];
                            /* Display Barcode if applicable */
                            if (displayBarcode == 1) {
                                JsBarcode("#order_barcode", order[order.id_order]['order']['reference'], {
                                    height: 40,
                                    displayValue: false,
                                    textAlign: 'center',
                                });
                            }
                            $('.wk-loading-pos-details').removeClass('sync-orders').addClass('hide');
                            $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                            /* Update all the deatils in the store */
                            getPOSDetails();
                            selectedCountry = 0;
                            /* Remove the shipping methods */
                            viewModel.posShipping([]);
                            viewModel.selectedIdCountry(0);
                            viewModel.selectedPaymentId(0);
                            qty = 0;
                            viewModel.selectedIdCarrier(0);
                            viewModel.selectedIdCarrierCost(0);
                            viewModel.appliedVouchers([]);
                        }
                        viewModel.selectedPaymentOption(defaultPaymentMethod);
                        viewModel.selectedCarrierName(noCarrier);
                        if (guestAccountEnabled == true) {
                            viewModel.selectedCustomerId(idGuest);
                            viewModel.selectedCustomerName(guestName);
                            if (shippingEnabled) {
                                viewModel.posShipping([]);
                            }
                        } else {
                            viewModel.resetCustomerDetails();
                            viewModel.selectedCustomerName(customerName);
                            // viewModel.selectedCustomerId(0);
                            // viewModel.activeCustomerId(0);
                        }
                        viewModel.idCustomer(0);
                        viewModel.confirmDisabled(0);
                        applyCustomer = 0;
                        applyShipping = 0;
                        $('.wk-loading-pos-details').removeClass('sync-orders').addClass('hide');
                        $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                    },
                    error: function (jqXHR, exception) {
                        ajaxResposeError(jqXHR, exception);
                    }
                });
            } else {
                /* Generate order in local storage if there is no internet connection  */
                var order = {};
                var d = new Date();
                var olength = Object.keys(pos_orders).length;
                order['product'] = products;
                var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

                order['order'] = {};
                order['order']['payment'] = viewModel.selectedPaymentOption();
                order['order']['order_date'] = date + " " + time;
                order['order']['total_discounts'] = viewModel.orderDiscount();
                order['order']['total_tax'] = parseFloat(viewModel.total()) - parseFloat(viewModel.subTotal());
                order['order']['total_paid_tax_excl'] = viewModel.subTotal();
                order['order']['total_products_wt'] = parseFloat(viewModel.subTotal()) + parseFloat(viewModel.totalTax());
                order['order']['total_paid_tax_incl'] = viewModel.total();
                order['order']['reference'] = Math.floor((Math.random() * 999999999) + 100000000);
                order['order']['id_order'] = olength;
                order['order']['payment_module'] = viewModel.selectedPaymentOption();
                order['order']['id_payment'] = viewModel.selectedPaymentId();
                order['order']['id_customer'] = idCustomer;
                order['order']['id_address'] = idOutletAddress;
                order['order']['id_carrier'] = viewModel.selectedIdCarrier();
                order['order']['order_message'] = viewModel.orderMessage();
                order['order']['shipping_cost_tax_incl'] = 0;
                order['order']['order_payment'] = ko.mapping.toJS(viewModel.paymentOptions);
                $.each(order['order']['order_payment'], function (index, payment) {
                    order['order']['order_payment'][index]['name'] = payment['paymentMethod'];
                });
                if (viewModel.selectedPaymentId() == 3) {
                    order['order']['installment'] = viewModel.installment();
                    order['order']['installmentAmount'] = viewModel.installmentAmount();
                }
                order['order']['id_address'] = idOutletAddress;
                order['order']['address1'] = outletAddress1;
                order['order']['address2'] = outletAddress2;
                order['order']['city'] = outletCity;
                order['order']['currency'] = currencySign;
                order['order']['current_state'] = 2;
                order['order']['postcode'] = outletPostCode;

                order['order']['tendered'] = viewModel.customerPayAmount();
                order['order']['change'] = viewModel.customerReturnAmount();
                // order['order']['id_wkpos_session'] = idWkPosSession;

                order['order']['customer_name'] = viewModel.selectedCustomerName();
                viewModel.orderReceipt(order);
                viewModel.orderDiscount(0);
                viewModel.selectedOrderId(olength);
                if (displayBarcode == 1) {
                    JsBarcode("#order_barcode", order['order']['reference'], {
                        height: 40,
                        displayValue: false,
                        textAlign: 'center',
                    });
                }
                viewModel.confirmDisabled(0);
                viewModel.selectedIdCountry(0);
                viewModel.selectedPaymentId(0);
                qty = 0;
                if (guestAccountEnabled == true) {
                    viewModel.selectedCustomerId(idGuest);
                    viewModel.selectedCustomerName(guestName);
                } else {
                    viewModel.resetCustomerDetails();
                    viewModel.selectedCustomerName(customerName);
                }
                viewModel.selectedPaymentOption(defaultPaymentMethod);
                viewModel.idCustomer(0);
                posViewModel.contentModel.emitBeforeEvents('generateOfflineOrder', order);
                pos_orders[olength] = order;
                // $.growl.success({ message: "Order Created Successfully" });
                if (localStorage) {
                    localStorage.pos_orders = JSON.stringify(pos_orders);
                };
                /* Update the local storage inventory */
                try {
                    var pos_products = await objProduct.getPosProductDetails();
                    var mappedTasks = $.map(pos_products, function (item) { return new Products(item, viewModel.selectedIdCountry()) });
                    loadProductPanel(mappedTasks);
                    $.each(pos_cart[cartIndex], function (key, value) {
                        if (Number.isInteger(parseInt(key))) {
                            var cartProduct = pos_cart[cartIndex][key];
                            pos_products[cartProduct['id']]['quantity'] = parseInt(pos_products[cartProduct['id']]['quantity']) - parseInt(cartProduct['quantity']);
                            if (cartProduct['combinationIndex'] != undefined) {
                                pos_products[cartProduct['id']]['combination_details'][cartProduct['combinationIndex']]['quantity'] = parseInt(pos_products[cartProduct['id']]['combination_details'][cartProduct['combinationIndex']]['quantity']) - parseInt(cartProduct['quantity']);
                            }
                        }
                    });
                    storeProduct(pos_products);
                } catch (e) {
                    console.log(e);
                }
                applyCustomer = 0;
                applyShipping = 0;
            }
        }
    } else {
        showErrorMsg(deliveryAddressError);
        // $.growl.error({ title: "", message: deliveryAddressError });
    }
}

export function generatePOSOrder(idCart, order, idCustomer, index, numberOfOrders) {
    var data = {
        action: 'generateOrder',
        ajax: true,
        // product: JSON.stringify(order['product']),
        idCustomer: idCustomer,
        total_paid: order['order']['total_price_tax_incl'],
        orderDate: order['order']['order_date'],
        tendered: order['order']['tendered'],
        change: order['order']['change'],
        order_discount: order['order']['total_discounts'],
        payment_module: order['order']['payment_module'],
        id_payment: order['order']['id_payment'],
        id_address: order['order']['id_address'],
        id_carrier: order['order']['id_carrier'],
        // id_wkpos_session: order['order']['id_wkpos_session'],
        offline_reference: order['order']['reference'],
        id_cart: idCart,
        offlineSync: true,
        posToken: posToken
    };

    if (typeof order['order']['order_message'] != undefined) {
        data.order_message = order['order']['order_message'];
    }

    posViewModel.contentModel.emitBeforeEvents('syncOfflineOrder', { data: data, order: order });

    if (order['order']['id_payment'] == 3) {
        data.installment = order['order']['installment'];
        data.installmentAmount = order['order']['installmentAmount'];
    }

    $.ajax({
        url: orderUrl,
        dataType: 'json',
        type: 'POST',
        async: false,
        data: data,
        success: function (order) {
            if (order != null) {
                if (order.hasError) {
                    $.each(order.errors, function (errorIndex, error) {
                        showErrorMsg(error);
                        // $.growl.error({ title: "", message: error });
                    });
                } else {
                    showSuccessMsg(order.success);
                    // $.growl.notice({ title: "", message: order.success });
                    posOrders[order['id_order']] = order;
                    delete pos_orders[index];
                    localStorage.pos_orders = JSON.stringify(pos_orders);
                    if (viewModel.orderDetails() != undefined && viewModel.orderDetails() != null) {
                        viewModel.orderDetails.remove(viewModel.orderDetails()[0]);
                    }
                    if (viewModel.orderDetails().length == 0) {
                        viewModel.emptyOrders(true);
                    }
                }
                if (index == numberOfOrders) {
                    $('.wk-loading-pos-details').removeClass('sync-orders').addClass('hide');
                    $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                    getPOSDetails();
                }
            }
        },
        error: function (jqXHR, exception) {
            ajaxResposeError(jqXHR, exception);
        }
    });
}

export async function updateOrderStatus(idWkPosOrder, installmentAmount) {
    var orderData = {
        action: 'updateOrderStatus',
        id_wkpos_order: idWkPosOrder,
        installmentAmount: installmentAmount,
    }
    var response = await updateOrder(orderData);
    return response;
}

export async function refundOrder(orderData) {
    var response = await updateOrder(orderData);
    if (response) {
        if (typeof response.msg != 'undefined') {
            showSuccessMsg(response.msg);
        }
        viewModel.orderHistory([]);
        viewModel.orderHistory(
            new Order(
                response['order'],
            )
        );
        viewModel.orderedProductsDetail([]);
        $.each(response['products'], function (index, product) {
            viewModel.orderedProductsDetail.push(new OrderedProduct(product, index, false, response.currency));
        });
        posOrders[parseInt(response['id_order'])]['product'] = response['products'];
        posOrders[parseInt(response['id_order'])]['order'] = response['order'];
        orderSlip = response.orderSlip;
        viewModel.showCreditSlip(1);
    }
}
// action: editProductOnOrder
// id_order: 99
// product_id_order_detail: 160
// product_price_tax_excl: 15
// product_price_tax_incl: 18
// product_quantity: 1
// product_invoice: 62
export async function editOrderProduct(orderData) {
    var response = await updateOrder(orderData);
    if (response) {
        showSuccessMsg(response.msg);
        posOrders[viewModel.selectedOrderId()] = response['order'][viewModel.selectedOrderId()];
        var data = {
            idOrder: viewModel.selectedOrderId()
        };
        viewModel.loadOrderedDetails(data);
        if (typeof (viewModel.orderDetails()[viewModel.currentSelectedOrderIndex()]) != 'undefined'
            && (viewModel.orderDetails()[viewModel.currentSelectedOrderIndex()])
        ) {
            (viewModel.orderDetails()[viewModel.currentSelectedOrderIndex()]).orderTotal(posOrders[viewModel.selectedOrderId()]['order']['total_paid_tax_incl']);
        }
        // (viewModel.orderDetails()[viewModel.currentSelectedOrderIndex()]).orderTotal(wkFormatCurrency((parseFloat(posOrders[viewModel.selectedOrderId()]['order']['total_paid_tax_incl'])), currencyFormat));
    }
}


export function updateOrder(orderData = {}) {
    orderData.ajax = true;
    orderData.posToken = posToken;

    return new Promise(resolve => {
        $.ajax({
            url: orderUrl,
            dataType: 'json',
            type: 'get',
            data: orderData,
            success: function (response) {
                if (response.hasError) {
                    $.each(response.errors, function (index, error) {
                        showErrorMsg(error);
                    });
                    resolve(false);
                } else {
                    resolve(response);
                    // getAllCategories();
                }
            },
            error: function (jqXHR, exception) {
                ajaxResposeError(jqXHR, exception);
                resolve(false);
            }
        });
    });
}



var remainingOrders = [];
export function loadOrderPanel(orders, onScroll = false) {
    var pagination = 30;
    var i = 0;
    remainingOrders = orders.slice(pagination, orders.length + 1);
    viewModel.loadedOrders(remainingOrders);
    if (onScroll) {
        var remaininglength = orders.length;
        if (orders.length > pagination) {
            remaininglength = pagination;
        }
        for (i = 0; i < remaininglength; i++) {
            viewModel.orderDetails.push(orders[i]);
        }
    } else {
        viewModel.orderDetails(orders.slice(0, pagination));
    }
}
