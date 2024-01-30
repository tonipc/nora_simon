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

// function printMultipleBarcodeImages(imageDataUrlsToPrint, width, height, rotate) {
export function printHtmlOrderInvoice(order, products) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    var isEdge = window.navigator.userAgent.toLowerCase().indexOf("edge") > -1;
    var isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && !navigator.userAgent.match('CriOS');
    var isMSIE = window.navigator.userAgent.indexOf("MSIE") > 0;
    var min_width = 650;

    // if (width < min_width) {
    //     height = (height * min_width) / width;
    //     width = min_width;
    // }

    // // Create IE + others compatible event handler
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var printEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(printEvent, function (e) {
        $("#printingFrame").remove();
    }, false);

    // var extra_css = "";
    // if (isChrome || isFirefox) {
    //     extra_css = "@page { size: auto; margin: 0; }";
    // }

    // var final_Html_Code = generateFinalHtmlforPrint(imageDataUrlsToPrint, extra_css);

    var final_Html_Code = generateHtmlForOrderPrinting(order, products);
    var iframe = appendIframeHtml();
    var invoiceBarcodeDiv = document.createElement('div');
    invoiceBarcodeDiv.id = "invoiceBarcodeDiv";

    invoiceBarcodeDiv.innerHTML = '<svg class="barcode"></svg>';
    invoiceBarcodeDiv.style.position = "absolute";
    invoiceBarcodeDiv.style.height = 40 * 1.5 + "px";
    invoiceBarcodeDiv.style.width = 200 * 1.25 + "px";
    invoiceBarcodeDiv.style.zIndex = 0;
    invoiceBarcodeDiv.style.background = "transparent";
    invoiceBarcodeDiv.style.color = "black";

    document.body.appendChild(invoiceBarcodeDiv);


    var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
    if (isFirefox) {
        iframe.srcdoc = final_Html_Code;
    } else {
        iframedoc.body.innerHTML = final_Html_Code;
    }

    if (displayBarcode == 1) {
        JsBarcode("#invoiceBarcodeDiv .barcode", order['reference'], {
            height: 40,
            displayValue: false,
            textAlign: 'center'
        });
    }
    $($($('#printingFrame').get(0).contentWindow.document).find('#invoice_barcode')).html($('#invoiceBarcodeDiv').html());
    document.body.removeChild(invoiceBarcodeDiv);
    setTimeout(function () { $("#printingFrame").get(0).contentWindow.print(); parent.postMessage('Printing Completed') }, 100)
    // $("#printingFrame").get(0).contentWindow.print();
    // parent.postMessage('Printing Completed');
}


function generateFinalHtmlforPrint(imageDataUrlsToPrint, extra_css) {
    var jsTimeOutCode = "setTimeout(function(){window.print(); parent.postMessage('Printing Completed')},1000);";
    var imageCSS = "width:100%;max-height:100%;margin:3; padding:2;"
    var final_Html_Code = "<style>html, body { height:" + barcodeHeight + "; width:" + barcodeWidth + "; margin:5; padding:0;}" + extra_css + " </style>";

    lengthImages = Object.keys(images).length;
    for (var i = 0; i < lengthImages; i++) {
        var codeToBeLoaded = "";
        if (i == lengthImages - 1) {
            codeToBeLoaded = " onload=\"" + jsTimeOutCode + "\"";
        }
        final_Html_Code += "<img src=\"" + imageDataUrlsToPrint[i] + "\" style=\"" + imageCSS + "\" " + codeToBeLoaded + "/>";
        if (i < imageDataUrlsToPrint.length - 1) {
            final_Html_Code += "<br/>";
        }
    }
    return final_Html_Code;
}

function appendIframeHtml() {
    var iframe = document.createElement('iframe');
    iframe.scroll = "auto";
    iframe.height = '100%';
    iframe.width = '60%';
    iframe.style.position = "absolute";
    iframe.style.left = "20%";
    iframe.style.top = "0px";
    iframe.style.zIndex = 10000;
    iframe.marginwidth = "0";
    iframe.marginheight = "0";
    iframe.hspace = "0";
    iframe.vspace = "0";
    iframe.style.background = "white";
    iframe.id = "printingFrame";
    document.body.appendChild(iframe);
    iframe.focus();
    return iframe;
}


function generateHtmlForOrderPrinting(order, products) {
    if (isNaN(order['total_paid_tax_incl'])) {
        var totalTax = order['total_tax'];
        var orderTotal = order['total_paid_tax_incl'];
        var orderDiscount = order['total_discounts'];
        var orderSubTotal = order['total_products_wt'];
        var orderShipping = order['shipping_cost_tax_incl'];
    } else {
        var totalTax = makeTotalProductCaculation(order['total_tax']);
        var orderTotal = makeTotalProductCaculation(order['total_paid_tax_incl']);
        var orderDiscount = makeTotalProductCaculation(order['total_discounts']);
        var orderSubTotal = makeTotalProductCaculation(order['total_products_wt']);
        var orderShipping = makeTotalProductCaculation(order['shipping_cost_tax_incl']);
    }
    var flex8 = "flex: 8;";
    var flex2 = "flex: 2;";
    var flex3 = "flex: 3;";
    var dflex = "display: flex;";
    var textRight = "text-align: right;";
    var padding10 = "padding: 10px;";
    var fontWeight600 = "font-weight: 600;";
    var style = '<style>';
    style += '.order-heading { font-weight: 600; }';
    style += '.order-products { border-top: 1px dashed; padding: 15px 0; border-bottom: 1px dashed;}';
    style += 'div.order-detail span { padding: 5px 0; }';
    style += '.order-customer { border-top: 1px dashed; padding-top: 15px; }';
    style += '</style>';
    // var html = '<h1 onload="'+jsTimeOutCode+'">Heading</h1>';
    var html = '<div class="order-invoicing" style="text-align:center">';
    html += '<div class="order-heading" style="margin-bottom: 15px;">';
    html += '<div class="outlet-name">' + shopName + '</div>';
    html += '<div class="outlet-city">' + outletCity + '</div>';
    if (contactDetails != undefined && contactDetails != '') {
        html += '<div class="outlet-number">' + displayPhone + outletCity + '</div>';
    }
    html += '<div class="order-date">' + order['order_date'] + '</div>';
    html += '<div class="user-employee">' + displayUser + employeeName + '</div>';
    '<div class="order-refernce">' + displayOrder + '#' + order['reference'] + '</ div>';
    html += '</div>';
    html += '<div class="order-products" style="text-align: left;">';
    html += '<table width="100%">';
    html += '<thead>';
    html += '<tr style="' + dflex + '">';
    html += '<th style="' + flex8 + '">' + productNameHeading + '</th>';
    html += '<th style="' + flex2 + textRight + '">' + qtyHeading + '</th>';
    html += '<th style="' + flex3 + textRight + '">' + priceHeading + '</th>';
    html += '<th style="' + flex3 + textRight + '">' + totalHeading + '</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(products, function (index, product) {
        var productQuantity = product['product_quantity'];
        if (typeof product['display_unit_price_tax_incl'] != 'undefined' && isNaN(product['display_unit_price_tax_incl'])) {
            var productPrice = product['display_unit_price_tax_incl'];
            var totalPricePerProduct = product['display_total_price_tax_incl'];
        } else {
            var productPrice = makeTotalProductCaculation(product['unit_price_tax_incl']);
            var totalPricePerProduct = makeTotalProductCaculation(product['total_price_tax_incl']);
        }
        var productName = product['product_name'];
        if (product['reduction_percent'] != undefined
            && product['reduction_percent'] > 0
            && displayProductDiscount == 1
        ) {
            productName += ' ' + beforeDiscountMessage + product['reduction_percent'] + afterDiscountMessage;
            // productDetails += ' ' + beforeDiscountMessage + product['reduction_percent'] + afterDiscountMessage;
        }
        html += '<tr style="' + dflex + '">';
        html += '<td style="' + flex8 + padding10 + '">' + productName + '</td>';
        html += '<td style="' + flex2 + textRight + '">' + productQuantity + '</td>';
        html += '<td style="' + flex3 + textRight + '">' + productPrice + '</td>';
        html += '<td style="' + flex3 + textRight + '">' + totalPricePerProduct + '</td>';
        html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    html += '</div>';
    html += '<div class="order-detail">';

    html += '<div class="order-subtotal" style="' + dflex + fontWeight600 + '">';
    html += '<span style="' + flex8 + textRight + '">' + displaySubTotal + '</span>';
    html += '<span style="' + flex2 + textRight + '">' + orderSubTotal + '</span>';
    html += '</div>';

    if (order['shipping_cost_tax_incl'] > 0) {
        html += '<div class="order-shipping" style="' + dflex + fontWeight600 + '">';
        html += '<span style="' + flex8 + textRight + '">' + displayShippingMsg + '</span>';
        html += '<span style="' + flex2 + textRight + '">' + orderShipping + '</span>';
        html += '</div>';
    }

    html += '<div class="order-tax" style="' + dflex + fontWeight600 + '">';
    html += '<span style="' + flex8 + textRight + '">' + displayTax + '</span>';
    html += '<span style="' + flex2 + textRight + '">' + totalTax + '</span>';
    html += '</div>';

    if (displayOrderDiscount == 1) {
        html += '<div class="order-discount" style="' + dflex + fontWeight600 + '">';
        html += '<span style="' + flex8 + textRight + '">' + displayDiscount + '</span>';
        html += '<span style="' + flex2 + textRight + '">' + orderDiscount + '</span>';
        html += '</div>';
    }
    html += '<div class="order-total" style="' + dflex + fontWeight600 + '">';
    html += '<span style="' + flex8 + textRight + '">' + displayTotal + '</span>';
    html += '<span style="' + flex2 + textRight + '">' + orderTotal + '</span>';
    html += '</div>';

    html += '<div class="order-customer">';
    html += '<span>' + displayCustomerName + '</span>';
    html += '<span>' + order['customer_name'] + '</span>';
    html += '</div>';
    html += '<div id="invoice_barcode"></div>';
    html += '</div>';
    html += '</div>';
    return style + html;
}
