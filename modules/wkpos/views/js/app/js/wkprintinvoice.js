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

import $ from 'jquery';
import { showErrorMsg, showWarningMsg } from './wkgrowlmsg.js';
import { wkFormatCurrency, makeTotalProductCaculation } from './wkformatcurrency.js';

var orderBill = [];

var languageEncoding = {
    'fr': 'Cp850',
    'es': 'Cp850',
    'it': 'Cp850',
    'pt': 'Cp850',
    'de': 'Cp850',
    'el': 'Cp1253',
    'vi': 'TCVN-3-1',
    'zh': 'GB2312',
    'ar': 'IBM864',
    'ru': 'Cp866',
};

export function printOrderBill(printer) {
    var encoding = {};
    if (typeof languageEncoding[langIsoCode] != 'undefined') {
        encoding = { encoding: languageEncoding[langIsoCode] };
    }
    var posOrder;
    posOrder = posOrders;
    if (viewModel.selectedOrderType() == "offline"
        || (posViewModel.bodyPanel() == 'pay' && !posViewModel.navigatorOnline())
    ) {
        posOrder = $.parseJSON(localStorage.pos_orders);
    }


    createOrderBill(posOrder[viewModel.selectedOrderId()]['order'], posOrder[viewModel.selectedOrderId()]['product']);
    if (typeof encoding.encoding != 'undefined') {
        var config = qz.configs.create(printer, encoding);       // Create a default config for the found printer
    } else {
        var config = qz.configs.create(printer);       // Create a default config for the found printer
    }
    return qz.print(config, orderBill);
}

function getShopName(shopName, variableLength = 19) {
    var shopNameArray = [];
    if (shopName.length > variableLength) {
        var count = 0;
        var searchLength = 0;
        var i = 0;
        for (i = 0; (i < shopName.length); i = searchLength) {
            var shopNameSlice = shopName.slice(i, i + variableLength);
            count = shopNameSlice.lastIndexOf(' ', variableLength);
            if (count != -1) {
                shopNameSlice = shopNameSlice.slice(0, count);
                shopNameArray.push(shopNameSlice);
                searchLength += count + 1;
            } else {
                searchLength += shopNameSlice.length;
                shopNameArray.push(shopNameSlice);
            }
        }
        return shopNameArray;
    } else {
        return [shopName];
    }
}

function chunkString(str, length) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

/* generate order bill array for order print */
function createOrderBill(order, products) {
    if (isNaN(order['total_paid_tax_incl'])) {
        var totalTax = order['total_tax'];
        var orderTotal = order['total_paid_tax_incl'];
        var orderDiscount = order['total_discounts'];
        var orderSubTotal = order['total_products_wt'];
        var orderShipping = order['shipping_cost_tax_incl'];
    } else {
        // var totalTax = wkFormatCurrency((parseFloat(order['total_paid_tax_incl']) - parseFloat(order['total_paid_tax_excl'])), currencyFormat, true);
        // var orderTotal = wkFormatCurrency((parseFloat(order['total_paid_tax_incl'])), currencyFormat, true);
        // var orderDiscount = wkFormatCurrency((parseFloat(order['total_discounts'])), currencyFormat, true);
        // var orderSubTotal = wkFormatCurrency((parseFloat(order['total_products_wt'])), currencyFormat, true);
        // var orderShipping = wkFormatCurrency((parseFloat(order['shipping_cost_tax_incl'])), currencyFormat, true);

        var totalTax = makeTotalProductCaculation(order['total_tax']);
        var orderTotal = makeTotalProductCaculation(order['total_paid_tax_incl']);
        var orderDiscount = makeTotalProductCaculation(order['total_discounts']);
        var orderSubTotal = makeTotalProductCaculation(order['total_products_wt']);
        var orderShipping = makeTotalProductCaculation(order['shipping_cost_tax_incl']);
    }

    var orderDetails = [];
    if (order.id_wkpos_payment == 4 && typeof order.installment != 'undefined') {
        if (isNaN(order.installment.paidAmount)) {
            var displayPaidAmount = order.installment.paidAmount;
            var displayRemainingAmount = order.installment.remainingAmount;
        } else {
            var displayPaidAmount = makeTotalProductCaculation((parseFloat(order.installment.paidAmount)));
            var displayRemainingAmount = makeTotalProductCaculation((parseFloat(order.installment.remainingAmount)));
            // var displayPaidAmount = wkFormatCurrency((parseFloat(order.installment.paidAmount)), currencyFormat, true);
            // var displayRemainingAmount = wkFormatCurrency((parseFloat(order.installment.remainingAmount)), currencyFormat, true);
        }
    }
    // order['customer_name'];
    var shopNameArray = getShopName(shopName, 42);
    orderBill = [
        { type: 'raw', format: 'plain', data: 'views/img/logo_invoice.jpg', options: { language: "ESCPOS", dotDensity: 'double' } },
        '\x1B' + '\x40',          // init
        '\x1B' + '\x45' + '\x0D', // bold on
        '\x1B' + '\x61' + '\x31', // center align
    ];
    $.each(shopNameArray, function (index, shop) {
        orderBill.push(shop + '\x0A');
    });
    orderBill.push(outletCity + '\x0A');
    if (contactDetails != undefined && contactDetails != '') {
        orderDetails = [displayPhone + contactDetails + '\x0A'];
    }
    orderBill = orderBill.concat(orderDetails);

    var productNameHeading2 = productNameHeading;
    if (productNameHeading2.length < 20) {
        var length = productNameHeading2.length;
        for (var i = 0; i < (22 - length); i++) {
            productNameHeading2 += ' ';
        }
    } else {
        productNameHeading2 += productNameHeading2.substr(0, 20) + '  ';
    }

    var qtyHeading2 = qtyHeading;
    if (qtyHeading2.length < 4) {
        var length = qtyHeading2.length;
        for (var i = 0; i < (6 - length); i++) {
            qtyHeading2 += ' ';
        }
    } else {
        qtyHeading2 += qtyHeading2.substr(0, 4) + '  ';
    }
    var priceHeading2 = priceHeading;
    if (priceHeading2.length < 9) {
        var length = priceHeading2.length;
        for (var i = 0; i < (11 - length); i++) {
            priceHeading2 += ' ';
        }
    } else {
        priceHeading2 += priceHeading2.substr(0, 9) + '  ';
    }
    var totalHeading2 = totalHeading;
    if (totalHeading2.length > 12) {
        totalHeading2 += totalHeading2.substr(0, 12);
    }
    orderDetails = [
        order['order_date'] + '\x0A',
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',                   // line break
        displayUser + employeeName + '\x0A',
        // '\x0A',                   // line break
        displayOrder + '#' + order['reference'] + '\x0A',
        // '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        productNameHeading2,
        qtyHeading2 + priceHeading2 + totalHeading2,
        '\x0A',
        '\x1B' + '\x61' + '\x30',
        '-----------------------------------------------',
    ];
    orderBill = orderBill.concat(orderDetails);
    // orderDetails = [
    //     order['order_date'] + '\x0A',
    //     '\x1B' + '\x45' + '\x0A', // bold off
    //     '\x0A',                   // line break
    //     displayUser + self.cashierName() + '\x0A',
    //     // '\x0A',                   // line break
    //     displayOrder + '#' + order['reference'] + '\x0A',
    //     // '\x0A',
    //     '\x1B' + '\x61' + '\x30', // left align
    //     '  ' + sNoHeading+ '   '+ productNameHeading + '  ',
    //     '\x0A',
    //     '\x1B' + '\x61' + '\x32',
    //     qtyHeading2 + '        ' + priceHeading2 + '        ' + totalHeading2,
    //     '\x0A',
    //     '\x1B' + '\x61' + '\x30',
    //     '-----------------------------------------------' + '\x0A',
    // ];
    // orderBill = orderBill.concat(orderDetails);
    if (products) {
        var serialNo;
        var productQuantity;
        var productPrice;
        var totalPricePerProduct;
        var totalProducts = products.length + '';
        var maximumIndex = totalProducts.length;
        if (maximumIndex < 4) {
            maximumIndex = 4;
        }

        $.each(products, function (index, product) {
            orderBill.push('\x0A');
            serialNo = parseInt(index) + 1;
            productQuantity = product['product_quantity'];
            if (typeof product['display_unit_price_tax_incl'] != 'undefined' && isNaN(product['display_unit_price_tax_incl'])) {
                productPrice = product['display_unit_price_tax_incl'];
                totalPricePerProduct = product['display_total_price_tax_incl'];
            } else {
                productPrice = makeTotalProductCaculation(product['unit_price_tax_incl']);
                totalPricePerProduct = makeTotalProductCaculation(product['total_price_tax_incl']);
            }
            var productDetails = '';
            var i = 0;
            for (i = 0; i <= maximumIndex - (serialNo + '').length; i++) {
                productDetails += '';
            }
            var productName = product['product_name'];
            if (product['reduction_percent'] != undefined
                && product['reduction_percent'] > 0
                && displayProductDiscount == 1) {
                productName += ' ' + beforeDiscountMessage + product['reduction_percent'] + afterDiscountMessage;
                // productDetails += ' ' + beforeDiscountMessage + product['reduction_percent'] + afterDiscountMessage;
            }
            var productNameArray = chunkString(productName, 20);
            $.each(productNameArray, function (index, name) {
                productDetails += name;
                // productDetails += '\x0A' + '\x1B' + '\x61' + '\x32';
                if (index == 0) {
                    if (name.length <= 20) {
                        var length = name.length;
                        for (var i = 0; i < (22 - length); i++) {
                            name += ' ';
                        }
                    }
                    productQuantity = productQuantity.toString();
                    var length = productQuantity.length;
                    if (productQuantity.length <= 4) {
                        for (var i = 0; i < (6 - length); i++) {
                            productQuantity += ' ';
                        }
                    }
                    productPrice = productPrice.toString();
                    var length = productPrice.length;
                    if (productPrice.length <= 9) {
                        for (var i = 0; i < (11 - length); i++) {
                            productPrice += ' ';
                        }
                    }
                    totalPricePerProduct = totalPricePerProduct.toString();
                    var length = totalPricePerProduct.length;
                    if (totalPricePerProduct.length <= 12) {
                        for (var i = 0; i < (12 - length); i++) {
                            totalPricePerProduct += '';
                        }
                    }
                    name += productQuantity + productPrice + totalPricePerProduct + '\x0A';
                    // name += productQuantity + '   ' + productPrice + '   ' + totalPricePerProduct + '\x0A';
                } else {
                    name += '\x0A';
                }
                orderBill.push(name);
            })
            // for (i = 0; i < (serialNo + '').length; i++) {
            //     productDetails += ' ';
            // }
            // productDetails += '\x1B' + '\x61' + '\x30',

            // if (displayOrderBill) {
            // }
        });

        // $.each(products, function (index, product) {
        //     serialNo = parseInt(index) + 1;
        //     productQuantity = product['product_quantity'];

        //     if (typeof product['display_unit_price_tax_incl'] != 'undefined' && isNaN(product['display_unit_price_tax_incl'])) {
        //         productPrice = product['display_unit_price_tax_incl'];
        //         totalPricePerProduct = product['display_total_price_tax_incl'];
        //     } else {
        //         productPrice = makeTotalProductCaculation(product['unit_price_tax_incl']);
        //         totalPricePerProduct = makeTotalProductCaculation(product['total_price_tax_incl']);
        //         // productPrice = wkFormatCurrency(parseFloat(product['unit_price_tax_incl']), currencyFormat, true);
        //         // totalPricePerProduct = wkFormatCurrency(parseFloat(product['total_price_tax_incl']), currencyFormat, true);
        //     }
        //     var productDetails = ' ' + serialNo;
        //     var i = 0;
        //     for (i = 0; i <= maximumIndex - (serialNo + '').length; i++) {
        //         productDetails += ' ';
        //     }
        //     productDetails += product['product_name'];
        //     if (product['reduction_percent'] != undefined
        //         && product['reduction_percent'] > 0
        //         && displayProductDiscount == 1) {
        //         productDetails += ' ' + beforeDiscountMessage + product['reduction_percent'] + afterDiscountMessage;
        //     }
        //     productDetails += '\x0A' + '\x1B' + '\x61' + '\x32';
        //     for (i = 0; i < (serialNo + '').length; i++) {
        //         productDetails += ' ';
        //     }
        //     productDetails += '   ' + productQuantity + '   @   ' + productPrice + '    ' + totalPricePerProduct + '\x0A' + '\x0A';
        //     productDetails += '\x1B' + '\x61' + '\x30',
        //         orderBill.push(productDetails);

        //     // if (displayOrderBill) {
        //     // }
        // });
    }
    var chr = function (n) { return String.fromCharCode(n); };
    orderDetails = [
        '-----------------------------------------------' + '\x0A',
        '\x1B' + '\x45' + '\x0D', // bold on
        '\x1B' + '\x61' + '\x32',
        displaySubTotal,
        orderSubTotal,
        '\x0A'
    ];
    orderBill = orderBill.concat(orderDetails);

    if (order['shipping_cost_tax_incl'] > 0) {
        orderDetails = [
            displayShippingMsg,
            orderShipping,
            '\x0A'
        ]
    }
    orderBill = orderBill.concat(orderDetails);
    orderDetails = [
        displayTax,
        totalTax,
        '\x0A',
    ];
    orderBill = orderBill.concat(orderDetails);

    if (displayOrderDiscount == 1) {
        orderDetails = [
            '\x1B' + '\x61' + '\x32',
            displayDiscount,
            orderDiscount,
            '\x0A',
        ];
        orderBill = orderBill.concat(orderDetails);
    }
    orderDetails = [
        '\x1B' + '\x61' + '\x32',
        displayTotal,
        orderTotal,
        '\x0A',
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x1B' + '\x61' + '\x30', // left align
        '-----------------------------------------------' + '\x0A',
        '\x1B' + '\x61' + '\x31', // center align
        displayCustomerName + order['customer_name'] + '\x0A',
    ];
    orderBill = orderBill.concat(orderDetails);

    if (order.id_wkpos_payment == 4 && typeof order.installment != 'undefined') {
        orderDetails = [
            '\x1B' + '\x45' + '\x0D', // bold on
            '-----------------------------------------------' + '\x0A',
            installmentPaidAmount + '          ' + '\x1B' + '\x61' + '\x32' + displayPaidAmount,
            '\x0A',
            installmentRemainingAmount + '          ' + '\x1B' + '\x61' + '\x32' + displayRemainingAmount,
            '\x0A',
            '\x1B' + '\x45' + '\x0A', // bold off
            '\x1B' + '\x61' + '\x30', // left align
            '-----------------------------------------------' + '\x0A',
            '\x1B' + '\x61' + '\x31', // center align
        ];
        orderBill = orderBill.concat(orderDetails);
    }
    if (displayBarcode == 1) {
        orderDetails = [
            '\x1D' + 'h' + chr(80) +   //barcode height
            '\x1D' + 'f' + chr(0) +              //font for printed number
            '\x1D' + 'k' + chr(69) + chr(order['reference'].length) + order['reference'] + chr(0),
        ];
        orderBill = orderBill.concat(orderDetails);
    }
    orderDetails = [
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper
    ];
    if (openCashDrawer == 1) {
        // Generate Pulse to kick-out cash drawer**
        orderDetails.push('\x10' + '\x14' + '\x01' + '\x00' + '\x05');
        // **for legacy drawer cable CD-005A.  Research before using.
    }
    orderBill = orderBill.concat(orderDetails);
}

/* Connect the printer at run time */
export function connect(times = 1) {
    return new RSVP.Promise(function (resolve, connectionReject) {
        if (qz.websocket.isActive()) {	// if already active, resolve immediately
            resolve();
        } else {
            // reject(qzTrayLoadError);
            // $.growl.error({ title: "", message: printerNotConnected });
            // try to connect once before firing the mimetype launcher
            qz.websocket.connect().then(resolve, function reject() {
                showWarningMsg(qzTrayLoadError);
                // if a connect was not succesful, launch the mimetime, try 3 more times
                // qz.websocket.connect({ retries: 2, delay: 1 }).then(resolve, reject);
            });
        }
    });
}


function createOrderSlip(order, orderSlip) {
    var creditSlipHeading = 'Credit Slip';

    var orderDetails = [];
    // order['customer_name'];
    var shopNameArray = getShopName(shopName, 42);
    var creditSlip = [
        { type: 'raw', format: 'plain', data: 'views/img/logo_invoice.jpg', options: { language: "ESCPOS", dotDensity: 'double' } },
        '\x1B' + '\x40',          // init
        '\x1B' + '\x45' + '\x0D', // bold on
        '\x1B' + '\x61' + '\x31', // center align

    ];
    $.each(shopNameArray, function (index, shop) {
        creditSlip.push(shop + '\x0A');
    });
    creditSlip.push(outletCity + '\x0A');
    if (contactDetails != undefined || contactDetails != '') {
        orderDetails = [displayPhone + contactDetails + '\x0A'];
    }
    creditSlip = creditSlip.concat(orderDetails);
    orderDetails = [
        creditSlipHeading + '\x0A',
        orderSlip.date_add + '\x0A',
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',                   // line break
        displayUser + viewModel.cashierName() + '\x0A',
        // '\x0A',                   // line break
        displayOrder + '#' + order['reference'] + '\x0A',
        // '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        orderSlipAmount + '    ' + orderSlip.amount,
        '\x0A',
        orderSlipVoucher + '    ' + orderSlip.code,
        '\x1B' + '\x61' + '\x32',
        '\x0A',
    ];
    var chr = function (n) { return String.fromCharCode(n); };
    orderDetails = [
        '\x1B' + '\x61' + '\x30', // left align
        '-----------------------------------------------' + '\x0A',
        '\x1B' + '\x61' + '\x31', // center align
        displayCustomerName + order['customer_name'] + '\x0A',
    ];
    creditSlip = creditSlip.concat(orderDetails);

    if (displayBarcode == 1) {
        orderDetails = [
            '\x1D' + 'h' + chr(80) +   //barcode height
            '\x1D' + 'f' + chr(0) +              //font for printed number
            '\x1D' + 'k' + chr(69) + chr(order['reference'].length) + order['reference'] + chr(0),
        ];
        creditSlip = creditSlip.concat(orderDetails);
    }
    orderDetails = [
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper
    ];
    if (openCashDrawer == 1) {
        // Generate Pulse to kick-out cash drawer**
        orderDetails.push('\x10' + '\x14' + '\x01' + '\x00' + '\x05');
        // **for legacy drawer cable CD-005A.  Research before using.
    }
    creditSlip = creditSlip.concat(orderDetails);
    return creditSlip;
}

export function printCreditSlip(printer) {
    var config = qz.configs.create(printer);       // Create a default config for the found printer
    var posOrder;
    if (viewModel.selectedOrderType() == "offline") {
        posOrder = $.parseJSON(localStorage.pos_orders);
    } else if (viewModel.selectedOrderType() == "history") {
        posOrder = posOrders;
    }
    var creditSlip = createOrderSlip(posOrder[viewModel.selectedOrderId()]['order'], orderSlip);
    return qz.print(config, creditSlip);
}
