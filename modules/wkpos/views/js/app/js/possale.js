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
import { wkFormatCurrency, asyncComputed, makeTotalProductCaculation } from './wkformatcurrency.js';
import { Products, searchProduct, loadProductPanel, listenForScrollEvent, selectCombination, storeProduct, getAllPosProducts } from './product.js';
import objProduct from './product.js';
import { PosCartId, PosCartViewModel, createNewCart, removeSelectedCart, removeProduct, addProductToCart, addCombinationToCart, switchCart, pushCartProducts, updateProduct, getProductDetails, checkOutofStockAllow } from './poscart.js';
import { Order, OrderedProduct, searchOrder, addProductToPsCart, generateOrder, generatePOSOrder, updateOrderStatus, refundOrder, editOrderProduct, loadOrderPanel } from './order.js';
import { removePromoCode, applyPromocode } from './voucher.js';
import { searchCustomer, searchOnlineCustomer, selectCustomer, updateCustomer } from './customer.js';
import { selectDeliveryAddress } from './address.js';
import { PosSessionViewModel } from './header.js';
import { getTaxRate, updateTaxRate } from './tax.js';
import { printOrderBill, connect, printCreditSlip } from './wkprintinvoice.js';
import { loadSession, updateSessionStatus } from './session.js';
import { createIndexDBConnection } from './wkindexeddb.js';
import { ajaxResposeError } from './wkajaxresponseerror.js';
import { PaymentOption } from './payment.js';
import { printHtmlOrderInvoice } from './wkposhtmlprint.js';

global.wkpos = {};
global.modelList = {};

import EventEmitter from 'events';
for (var i in EventEmitter.prototype) {
    wkpos[i] = EventEmitter.prototype[i];
}
var enableResize = 0;
var shipping,
    defaultShippingCarrier,
    groups,
    genders,
    posError,
    pos_products = {},
    categoryWiseProducts = undefined,
    pos_cart = undefined,
    confirmBeforeLoad = true;

global.PosViewModel = undefined;
global.posOnlineProducts = {};
global.PosModel = undefined;
global.PosProductsViewModel = undefined;
global.activeCart = 0;
global.loaded = 0;
global.categories = undefined;
global.defaultTaxRate = undefined;
global.taxRate = undefined;
global.viewModel = undefined;
global.posViewModel = undefined;
global.productViewModel = undefined;
global.objPosProductsViewModel = undefined;
global.outletAddress = undefined;
global.cartVouchers = {};
global.customers = {};
global.deliveryError = 0;
global.posOrders = undefined;
global.growl = $.growl;
global.dbRequest = undefined;
global.dbName = 'wkpos';
global.dbVersion = 1;
global.applyCustomer = 0;
global.applyShipping = 0;
global.selectedCountry = 0;
global.qty = 0;
global.orderSlip = undefined;

global.getPOSDetails = undefined;
global.getAllProducts = undefined;
global.getAllCategories = undefined;
global.getAllCustomers = undefined;
global.getAllOrders = undefined;

var orderBill = [];
var key;
var posSession;
$(window).on('resize', function (e) {
    enableResize = 0;
    wkposBodySize();
});

function wkposBodySize(customer = false) {
    wkpos.emit('beforePosBodyResize', {});
    $('#wk-pos-side-panel, #wkpos-content-panel, #right_column, .wk-sidepanel, .wk-pos-employee-details, .wkpos-payment-panel').css('height', window.innerHeight - $('#wkpos-header').height());
    $('.invoice.wkpos-scrollbar').css('height', window.innerHeight - $('#wkpos-header').height() - 49);
    $('#wk-demo').css('height', window.innerHeight - $('#wkpos-header').height() - 50 - 40);
    $('.wk-pos-employee-details div.tab-content').css('height', window.innerHeight - $('#wkpos-header').height() - $('#pos-sale .wk-pos-employee-details ul.nav > li').height());
    $('.order-panel-height').css('height', window.innerHeight - $('#wkpos-header').height() - $('#pos-sale .wkpos-order-panel ul.nav > li').height());
    $('.wk-pos-order-detail').css('height', window.innerHeight - $('#wkpos-header').height() - $('#pos-sale .wkpos-order-panel ul.nav > li').height() - 60);

    var paymentHeaderHeight = $('#pos-sale .wkpayment-header').height();
    if (paymentHeaderHeight < 0) {
        paymentHeaderHeight = 25;
    }
    $('#wk-pos-payment-panel').css('height', window.innerHeight - $('#wkpos-header').height() - paymentHeaderHeight - 17);
    $('#wk-cart-panel >.wk-cart-product-details div.tab-content').css('height', window.innerHeight - $('#wkpos-header').height() - $('.wk-payment.collapsed').height() - $('.wk-cart-product-details > ul.nav').height() - 1);
    var categoryHeight = $('.upper-category').height();
    if (isNaN(categoryHeight) || categoryHeight < 0) {
        categoryHeight = 50;
    }
    $('.wkpos-body').css('height', window.innerHeight - $('#wkpos-header').height() - $('.upper-category').height());
    if (!customer) {
        var isMobile = window.matchMedia("only screen and (max-width: 991px)");
        var bodyPanelWidthPercent = 0;
        var cartPanelWidthPercent = 0;
        var minWidth = 0;
        if (isMobile.matches) {
            bodyPanelWidthPercent = 40.66;
            cartPanelWidthPercent = 59.03;
            minWidth = 300;
        } else {
            bodyPanelWidthPercent = 58.03;
            cartPanelWidthPercent = 41.66;
            minWidth = 550;
        }
        $('#content-wrapper.product-panel').width(bodyPanelWidthPercent * window.innerWidth * 91.6667 / 10000);
        $('#right_column').width(cartPanelWidthPercent * window.innerWidth * 91.6667 / 10000);
        // var resize = $(document).find("#content-wrapper.product-panel");
        if (enableResize == 0) {
            var productPanelWidth = 0;
            var cartPanelWidth = 0;
            if ($("#content-wrapper.product-panel").width() < 100) {
                productPanelWidth = $("#content-wrapper.product-panel").width() * $("#wkpos-content-panel").width() * window.innerWidth / 10000;
                cartPanelWidth = $("#right_column").width() * $("#wkpos-content-panel").width() * window.innerWidth / 10000;
            } else {
                productPanelWidth = $("#content-wrapper.product-panel").width();
            }
            if (isMobile.matches) {
                productPanelWidth = 320;
            }
            enableResize = 1;
        } else {
            if ($(document).find("#content-wrapper").hasClass('ui-resizable')) {
                $(document).find("#content-wrapper").resizable();
                $(document).find("#content-wrapper").resizable('destroy');
            }
        }
        var containerWidth = 91.6667 * window.innerWidth / 100;
        if (typeof posViewModel != 'undefined' && (posViewModel.bodyPanel() == 'products' || posViewModel.bodyPanel() == 'customers')) {
            $(document).find("#content-wrapper.product-panel").resizable({
                handles: 'e',
                maxWidth: productPanelWidth,
                minWidth: minWidth,
                resize: function (event, ui) {
                    var currentWidth = ui.size.width;
                    var padding = 12;
                    $(this).width(currentWidth);
                    $("#right_column").width(containerWidth - currentWidth - 2);
                }
            });
        } else {
            if ($(document).find("#content-wrapper").hasClass('ui-resizable')) {
                $(document).find("#content-wrapper").resizable();
                $(document).find("#content-wrapper").resizable('destroy');
            }
        }
    } else {
        $('#content-wrapper').width(100 * window.innerWidth * 91.6667 / 10000);
    }
    wkpos.emit('afterPosBodyResize', {});
    updateSyncStatus();
}


function updateSyncStatus() {
    var posOrder = $.parseJSON(localStorage.pos_orders);
    if (typeof viewModel != 'undefined') {
        if (posViewModel.navigatorOnline() && typeof posOrder != 'undefined' && posOrder && Object.keys(posOrder).length) {
            viewModel.emptyOfflineOrders(true);
        } else {
            viewModel.emptyOfflineOrders(false);
        }
    }
}

function blockDevloperMode() {
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);
    document.addEventListener("keydown", function (e) {
        //document.onkeydown = function(e) {
        // "I" key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            disabledEvent(e);
        }
        // "J" key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
            disabledEvent(e);
        }
        // "S" key + macOS
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            disabledEvent(e);
        }
        // "U" key
        if (e.ctrlKey && e.keyCode == 85) {
            disabledEvent(e);
        }
        // "F12" key
        if (event.keyCode == 123) {
            disabledEvent(e);
        }
    }, false);
}

function disabledEvent(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else if (window.event) {
        window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
}

function disabledUserSelection() {
    $("body").css("-webkit-user-select", "none");
    $("body").css("-moz-user-select", "none");
    $("body").css("-ms-user-select", "none");
    $("body").css("-o-user-select", "none");
    $("body").css("user-select", "none");
}

$(document).ready(function () {
    key = 'wkpos_outlet_session_' + idEmployee + '_' + idWkPosOutlet;

    $(window).trigger('resize');
    // navigator.onLine = false;
    createIndexDBConnection(dbName, dbVersion);
    wkposApplyBinding();
    loadSession();
    var fullscreenElement = document.getElementById("wkpos_full_screen");
    // dragElement(fullscreenElement);
    fullscreenElement.addEventListener('click', function () {
        toggleFullScreen();
    });
    $(window).bind('beforeunload', function (e, data) {
        if (confirmBeforeLoad) {
            return '';
        }
    });
    disabledUserSelection();
    // blockDevloperMode();
    // if (posController == 'sale') {
    //     if (typeof posSession == 'undefined') {
    //         window.location.href = posSessionLink;
    //     }
    //     if (posViewModel.sessionStatus() != 1) {
    //     }
    // }

    // localStorage.sessionStatus = posSessionStatus;

    $('.order_discount').on('focus', function () {
        if ($(this).val() == 0) {
            $(this).val('');
        }
    });

    window.addEventListener("orientationchange", function () {
        // Announce the new orientation number
        if (posViewModel.bodyPanel() == 'customers' || posViewModel.bodyPanel() == 'customers') {
            var isMobile = window.matchMedia("only screen and (max-width: 991px)");
            if (isMobile.matches) {
                wkposBodySize(true);
                viewModel.displayCart(1);
            } else {
                viewModel.displayCart(0);
                wkposBodySize(false);
            }
        }
    }, false);
});

function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        $('#wkpos_full_screen_img').attr('title', exitFullScreen);
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        $('#wkpos_full_screen_img').attr('title', enterFullScreen);
    }
}

getAllProducts = async function (page = 0, limit = 0) {
    return new Promise(resolve => {
        $.ajax({
            url: posSales,
            dataType: 'json',
            type: 'get',
            data: {
                action: 'getAllProducts',
                ajax: true,
                page: page,
                limit: limit,
                posToken: posToken
            },
            success: function (response) {
                if (response.hasError) {
                    $.each(response.errors, function (index, error) {
                        showErrorMsg(error);
                        // $.growl.error({ title: "", message: error });
                    });
                } else {
                    $('.progress-bar').addClass('progress-bar-success').css('width', '20%');
                    $('.wk-loading-status').html(loadingPosProduct).css('color', 'green');
                    // pos_products = response['products'];
                    pos_products = mergeObject(pos_products, response['products']);
                    if (page == 0) {
                        categoryWiseProducts = response['category_wise_id_product'];
                        defaultTaxRate = response['taxRate'];
                    }
                    if (response['count_products'] == limit && limit != 0) {
                        getAllProducts(response['next_page']);
                    } else {
                        storeProduct(pos_products);
                        posOnlineProducts = pos_products;
                        if (localStorage) {
                            // localStorage.pos_products = JSON.stringify(pos_products);
                            if (localStorage.currentCartId === undefined) {
                                localStorage.currentCartId = JSON.stringify(0);
                            }
                            if (localStorage.selectedCartId === undefined) {
                                localStorage.selectedCartId = parseInt(0);
                            }
                            var posCart = $.parseJSON(localStorage.pos_cart);
                            if (posCart === undefined || posCart == null) {
                                pos_cart = { [localStorage.selectedCartId]: {} };
                                localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
                            }
                        }
                    }
                    resolve(true);
                    // getAllCategories();
                }
            },
            error: function (jqXHR, exception) {
                ajaxResposeError(jqXHR, exception);
                posError = errorPosProduct + '<br>';
                $('.wk-loading-status').html(posError).css('color', 'red');
                $('.progress-bar').addClass('progress-bar-danger').css('width', '20%');
                resolve(false);
                // getAllCategories();
            }
        });
    });
}

function mergeObject(obj, src) {
    Object.keys(src).forEach(function (key) { obj[key] = src[key]; });
    return obj;
}

getAllCategories = function () {
    return new Promise(resolve => {
        $.ajax({
            url: posSales,
            dataType: 'json',
            type: 'get',
            data: {
                action: 'getAllCategories',
                ajax: true,
                posToken: posToken
            },
            success: function (json) {
                if (json.hasError) {
                    $.each(json.errors, function (index, error) {
                        showErrorMsg(error);
                        // $.growl.error({ title: "", message: error });
                    });
                } else {
                    $('.wk-loading-status').html(loadingPosCategory).css('color', 'green');
                    $('.progress-bar').css('width', '60%');
                    categories = json['categories'];
                    // getAllCustomers();
                    resolve(true);
                }
            },
            error: function (jqXHR, exception) {
                ajaxResposeError(jqXHR, exception);
                posError += errorPosCategory + '<br>';
                $('.wk-loading-status').html(posError).css('color', 'red');
                $('.progress-bar').addClass('progress-bar-danger').css('width', '60%');
                // getAllCustomers();
                resolve(false);
            },
        });
    });
}

getAllCustomers = function (noContinue = false, page = 0, limit = 0) {
    return new Promise(resolve => {
        $.ajax({
            url: posSales,
            dataType: 'json',
            type: 'get',
            data: {
                action: 'getAllCustomers',
                ajax: true,
                page: page,
                limit: limit,
                posToken: posToken
            },
            success: function (json) {
                if (json.hasError) {
                    $.each(json.errors, function (index, error) {
                        showErrorMsg(error);
                        // $.growl.error({ title: "", message: error });
                    });
                } else {
                    if (typeof json != null) {
                        customers = mergeObject(customers, json['customers']);
                        customers = json['customers'];
                        if (page == 0) {
                            $('.wk-loading-status').html(loadingPosCustomers).css('color', 'green');
                            $('.progress-bar').css('width', '80%');
                            groups = json['customerGroups'];
                            genders = json['genders'];
                            outletAddress = json['outlet_address'];
                        }
                        if (noContinue && json['count_customers'] == limit && limit != 0) {
                            getAllCustomers(noContinue, json['next_page']);
                        }
                    }
                    resolve(true);
                    // if (!nocontinue) {
                    //     getAllOrders();
                    // }
                }
            },
            error: function (jqXHR, exception) {
                ajaxResposeError(jqXHR, exception);
                posError += errorPosCustomers + '<br>';
                $('.wk-loading-status').html(posError).css('color', 'red');
                $('.progress-bar').addClass('progress-bar-danger').css('width', '80%');
                // getAllOrders();
                resolve(false);
            },
        });
    });
}

getAllOrders = function () {
    return new Promise(resolve => {
        var orderData = {};
        orderData['action'] = 'getAllOrders';
        orderData['ajax'] = true;
        orderData['posToken'] = posToken;
        if (loaded == 0) {
            orderData['viewmodel'] = 1;
        }
        $.ajax({
            url: posSales,
            dataType: 'json',
            type: 'get',
            data: orderData,
            success: function (orders) {
                if (orders.hasError) {
                    $.each(orders.errors, function (index, error) {
                        showErrorMsg(error);
                        // $.growl.error({ title: "", message: error });
                    });
                } else {
                    $('.wk-loading-status').html(loadingPosOrders).css('color', 'green');
                    $('.progress-bar').css('width', '100%');
                    posOrders = orders;
                    if (loaded == 0) {
                        wkposApplyBinding();
                    }
                    loaded = 1;
                    setTimeout(function () {
                        $('#loader').css('display', 'none');
                        $('.wk-pos').removeClass('hidden hide');
                        $('.wk-pos').show();

                        $('.wk-loading-pos-details, .progress, #loading-text').addClass('hide');
                    }, 700);
                    resolve(true);
                }
            },
            error: function (jqXHR, exception) {
                ajaxResposeError(jqXHR, exception);
                posError += errorPosOrders + '<br>';
                $('.wk-loading-status').html(posError).css('color', 'red');
                $('.progress-bar').addClass('progress-bar-danger').css('width', '100%');
                if (loaded == 0) {
                    wkposApplyBinding();
                }
                loaded = 1;
                setTimeout(function () {
                    $('#loader').css('display', 'none');
                    $('.wk-pos').removeClass('hidden hide');
                    $('.wk-pos').show();
                    $('.wk-loading-pos-details, .progress, #loading-text, #error-text').addClass('hide');
                }, 5000);
                resolve(false);
            }
        });
    });
}

PosModel = function () {
    var self = this;
    self.bodyPanel = ko.observable("products");
    self.enableRefund = ko.observable(false);
    self.rightColumnPage = ko.observable('pos_cart');
    self.confirmClose = ko.observable(0);
    if (parseInt(posSessionStatus)) {
        posSession = getCookie(key);
    }
    self.navigatorOnline = ko.observable(navigator.onLine);
    self.sessionStatus = ko.observable(parseInt(posSessionStatus));
    self.controlSession = ko.observable(parseInt(controlSession));
    self.errors = ko.observableArray([]);
    // if (typeof posSession != 'undefined') {
    // } else {
    //     self.sessionStatus = ko.observable(0);
    // }
    self.newSessionStatus = ko.observable(0);
    self.cashierName = ko.observable(employeeName);
    // this.contentModel = new PosProductsViewModel()
    // this.headerModel = new PosSessionViewModel();

    self.displayCurrency = ko.observable(true);

    self.changeCurrency = function (data, event) {
        var status = confirm(changeCurrencyMsg);
        if (status) {
            confirmBeforeLoad = false;
            window.location.href = data;
        }
    }
};

// modelList = {
//     'contentModel': 'PosProductsViewModel'
// };

PosViewModel = function () {
    var self = this;
    PosModel.call(self);
    this.contentModel = new PosProductsViewModel(PosModel);
    // $.each(modelList, function(index, model) {
    //     self[index] = new window[model](PosModel);
    // });
    // if (posController == 'sale') {
    // }
    // this.sessionModel = new PosSessionViewModel(PosModel);
};
function wkposApplyBinding() {
    wkpos.emit('beforeBinding', {});
    posViewModel = new PosViewModel();
    viewModel = posViewModel.contentModel;
    // viewModel.updateFocusType();
    wkpos.emit('afterPosModel', { 'posModel': posViewModel });
    ko.applyBindings(posViewModel);
    wkposBodySize();
    if (posController != 'session'
        && typeof autoPrinterConnect != 'undefined'
        && autoPrinterConnect == 1
        && wkposPrintType == 1
    ) {
        try {
            viewModel.connectPrinter();
        } catch (e) {
            console.log(e);
        }
    }
}

function PosLeftPanelViewModel(params) {
    return {
        activeClass: params.activeClass,
        iconClass: "fa fa-" + params.icon,
        panelConentHeading: params.panelConentHeading,
    };
}

getPOSDetails = async function () {
    if (posController != 'session') {
        await Promise.all([await getAllProducts(), await getAllCategories(), await getAllCustomers(), await getAllOrders()]);
    }
}

function set_cookie(name, value) {
    document.cookie = name + '=' + value + '; Path=/;';
}
function delete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

PosProductsViewModel = function (PosModel) {
    var self = this;
    PosModel.call(self);
    self.products = ko.observableArray([]);
    self.loadedProducts = ko.observableArray([]);
    self.loadedCustomers = ko.observableArray([]);
    self.loadedOrders = ko.observableArray([]);
    self.categories = ko.observableArray([]);
    self.remainingCategories = ko.observableArray([]);
    self.productCart = ko.observableArray([]);
    self.productCombination = ko.observableArray([]);
    self.productAttribute = ko.observableArray([]);
    self.posCarts = ko.observableArray([]);

    self.customerName = ko.observable();
    self.customerPhone = ko.observable(null);
    self.customerAddresses = ko.observableArray([]);
    self.customerAddressesDetails = ko.observableArray([]);
    self.selectedIdAddress = ko.observable(idOutletAddress);
    self.selectedIdAddressIndex = ko.observable(0);
    self.selectedCustomerIndex = ko.observable(0);
    self.customerContact = ko.observable();
    self.issetCustomer = ko.observable(0);

    self.address1 = ko.observable();
    self.address2 = ko.observable();
    self.customerEmail = ko.observable();
    self.aliasName = ko.observable(null);
    self.city = ko.observable(null);
    self.firstName = ko.observable(null);
    self.lastName = ko.observable(null);
    self.company = ko.observable(null);
    self.vatNumber = ko.observable(null);
    self.postcode = ko.observable(null);
    self.selectedIdCountry = ko.observable(0);
    self.selectedIdState = ko.observable();
    self.homePhone = ko.observable(null);
    self.phone = ko.observable(null);
    self.other = ko.observable(null);

    self.stateList = ko.observableArray([]);

    self.idCustomer = ko.observable();
    self.selectedCustomerName = ko.observable();
    self.selectedCustomerId = ko.observable();
    self.customers = ko.observableArray([]);
    self.customerDetail = ko.observable();
    // self.customerPayAmount = ko.observable(0.00);

    self.posShipping = ko.observableArray([]);
    self.selectedIdCarrier = ko.observable(0);
    self.selectedCarrierName = ko.observable(noCarrier);
    self.selectedIdCarrierCost = ko.observable(0);

    self.idOrder = ko.observable(0);
    self.activeCustomerId = ko.observable(0);
    self.updateAction = ko.observable("qty");
    self.selectedOrderType = ko.observable("history");
    self.orderDetails = ko.observableArray([]);
    self.orderHistory = ko.observableArray([]);
    self.orderedProducts = ko.observableArray([]);
    self.orderedProductsDetail = ko.observableArray([]);
    self.selectedPaymentOption = ko.observable(defaultPaymentMethod);
    self.selectedPaymentId = ko.observable(defaultIdPaymentMethod);
    self.selectedOrderId = ko.observable();
    self.selectedOrderReference = ko.observable();

    self.selectedCategory = ko.observable(0);

    self.orderPrint = ko.observableArray([]);

    self.selectedCartProduct = ko.observable('');
    self.selectedCartProductIndex = ko.observable(0);
    self.selectedSortType = ko.observable('');

    self.customerHeading = ko.observable("");
    self.confirmDisabled = ko.observable(0);

    self.selectedCombinationImage = ko.observable('');

    // Reward Points variable
    self.availablePoints = ko.observable(0);
    self.pointsWorth = ko.observable(0);
    self.zeroPrice = ko.observable(0);
    self.showRewardPoint = ko.observable(0);
    /* End */

    /* Vouchers */
    self.availableVouchers = ko.observableArray([]);
    self.appliedVouchers = ko.observableArray([]);
    self.totalOrderAmount = ko.observable();
    self.totalOrderAmountPaid = ko.observable(0.0);
    /* End */

    /* Installment */
    self.reset = ko.observable(true);
    self.installment = ko.observable(2);
    self.installmentAmount = ko.observable(500);
    /* END */

    /* Order Return */
    self.enableOrderReturn = ko.observable(0);
    self.enableOrderEdit = ko.observable(0);
    self.alreadyRefund = ko.observable(0);
    self.currentSelectedOrderIndex = ko.observable(-1);
    self.showCreditSlip = ko.observable(0);
    /* END */

    /* Partial Payment */
    self.paymentOptions = ko.observableArray([]);
    self.selectedPaymentOptionIndex = ko.observable(-1);
    /* End */
    self.emptyOfflineOrders = ko.observable(false);

    self.printerConnected = ko.observable(false);
    self.selectedPrinter = ko.observable(selectedPrinterName);

    objPosProductsViewModel = self;

    self.orderRemainingAmount = ko.observable(self.totalOrderAmount());
    self.remainingTotalAmount = asyncComputed(function () {
        var total = parseFloat(self.totalOrderAmount()) - parseFloat(self.totalOrderAmountPaid());
        var formattedAmount = wkFormatCurrency(total, currencyFormat);
        self.orderRemainingAmount(total);
        return formattedAmount;
    }, this);

    self.currentCartId = ko.observable(localStorage.selectedCartId);
    self.orderMessage = ko.observable('');

    if (!(ko.components.isRegistered('wkpos-left-panel'))) {
        ko.components.register('wkpos-left-panel', {
            viewModel: PosLeftPanelViewModel,
            template: '<div class="wksidepanel button-payment" id="button-home" data-bind="click: $root.contentModel.onClickSidePanel, css: {\'wkpos-text-color\': $root.bodyPanel() == activeClass }, attr: { title: panelConentHeading }"><i data-bind="css: iconClass"></i><div class="hidden-sm" data-bind="text: panelConentHeading"></div></div>'
        });
    }
    if (!(ko.components.isRegistered('update-cart-details'))) {
        ko.components.register('update-cart-details', {
            viewModel: PosCartViewModel,
            template: '<li class="letter col-xs-3" data-bind="attr: { value: buttonValue }, text: buttonText, click: $root.contentModel.updateProduct, css: {\'cart-product-selected\': $root.contentModel.updateAction() == activeClass }"></li>'
        });
    }
    if (!(ko.components.isRegistered('update-payment-details'))) {
        ko.components.register('update-payment-details', {
            viewModel: PosCartViewModel,
            template: '<li class="letter col-xs-3" data-bind="attr: { value: buttonValue }, text: buttonText, click: $root.contentModel.updatePaymentDetails"></li>'
        });
    }

    if (posSessionStatus == 1 && typeof getCookie(key) != 'undefined') {
        loadSession();
    }

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    function updateStatus() {
        posViewModel.navigatorOnline(navigator.onLine);
        updateSyncStatus();
        if (navigator.onLine == false) {
            taxRate = undefined;
            self.updateTaxRate(defaultTaxRate, true);
            self.selectedPaymentOption(defaultPaymentMethod);
            self.selectedPaymentId(defaultIdPaymentMethod);
            self.selectedIdAddress(outletAddress['id_address']);
            if (posViewModel.bodyPanel() == 'shipping') {
                posViewModel.bodyPanel('products');
                self.checkBodyPanel('products');
                listenForScrollEvent();
                self.resetShipping();
            }
            showErrorMsg(networkError);
        } else {
            posViewModel.bodyPanel('products');
            self.checkBodyPanel('products');
            listenForScrollEvent();
            getTaxRate();
        }
        wkposBodySize();
    }

    focusSearchProductField('products');
    function focusSearchProductField(type) {
        var BarcodeScanerEvents = function () {
            this.initialize.apply(this, arguments, type);
        };

        BarcodeScanerEvents.prototype = {
            initialize: function () {
                $(document).on({
                    keyup: $.proxy(this._keyup, this)
                });
            },
            _timeoutHandler: 0,
            _inputString: '',
            _keyup: function (e, data) {
                if (this._timeoutHandler) {
                    clearTimeout(this._timeoutHandler);
                }
                this._inputString += String.fromCharCode(e.which);

                this._timeoutHandler = setTimeout($.proxy(function () {
                    if (this._inputString.length <= 3) {
                        this._inputString = '';
                        return;
                    }
                    if (posViewModel.bodyPanel() == 'products')
                        switch (posViewModel.bodyPanel()) {
                            case 'products':
                                $(document).find('#wkpos-product-search input').focus();
                                viewModel.productSearchKey(this._inputString);
                                viewModel.searchProduct(null, e);
                                break;
                            case 'customers':
                                $(document).find('#wk-customer-panel .wkpos-search input').focus();
                                viewModel.customerSearchKey(this._inputString);
                                viewModel.searchCustomer(null, e);
                                break;
                            case 'orders':
                                $(document).find('#wk-order-panel .wkpos-search input').focus();
                                viewModel.orderSearchKey(this._inputString);
                                viewModel.searchOrder(null, e);
                                break;
                            default:
                        }
                    $(document).trigger('onbarcodescaned', this._inputString);

                    this._inputString = '';

                }, this), 20);
            }
        };

        new BarcodeScanerEvents();
    }

    //check the internet connection
    self.toggleNavigator = function () {
        updateStatus();
        wkposBodySize();
    }

    self.emitBeforeEvents = function (event, data) {
        event = capitalizeFLetter(event);
        return wkpos.emit('before' + event, data);
    }
    self.emitAfterEvents = function (event, data) {
        event = capitalizeFLetter(event);
        return wkpos.emit('after' + event, data);
    }

    function capitalizeFLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
    //Add new cart
    self.createNewCart = function (data, event) {
        self.emitBeforeEvents('createNewCart', { 'data': data, 'event': event });
        createNewCart();
        self.resetCartCalculator();
        self.emitAfterEvents('createNewCart', { 'data': data, 'event': event });
    }

    //Remove selected cart with all products
    self.removeSelectedCart = function (data, event) {
        var check;
        if (data != undefined) {
            check = confirm(deleteCartMessage);
        } else {
            check = true;
        }
        if (check == true) {
            self.emitBeforeEvents('removeSelectedCart', { 'data': data, 'event': event });
            removeSelectedCart(this);
            self.resetCartCalculator();
            self.emitBeforeEvents('removeSelectedCart', { 'data': data, 'event': event });
        }
        else {
            return false;
        }

    }

    self.combinationQuantity = ko.observable(0);
    // self.combinationPrice = ko.observable(0);
    self.combinationUnitPrice = ko.observable(0);
    self.eventTarget = ko.observable(false);

    self.errorIterator = function (errors) {
        $.each(errors, function (index, error) {
            showErrorMsg(error);
        });
    }
    //Add Product to the selected Cart
    self.addProductToCart = function (data, event) {
        self.emitBeforeEvents('addProductToCart', { 'data': data, 'event': event });
        // wkpos.emit('beforeAddProductToCart', {'data': data, 'event': event});
        //check whether the combination of product exist or not
        if (posViewModel.errors().length == 0) {
            addProductToCart(data, event);
            self.resetCartCalculator();
        } else {
            self.errorIterator(posViewModel.errors());
        }
        // wkpos.emit('afterAddProductToCart', {'data': data, 'event': event});
        self.emitBeforeEvents('addProductToCart', { 'data': data, 'event': event });
    }

    self.updateCombinationImage = function (idProduct, idProductAttr) {
        if (typeof pos_products[idProduct]['combination_images'] != 'undefined'
            && pos_products[idProduct]['combination_images']
        ) {
            if (typeof pos_products[idProduct]['combination_images'][idProductAttr] != 'undefined'
                && typeof pos_products[idProduct]['combination_images'][idProductAttr][0] != 'undefined') {
                self.selectedCombinationImage(pos_products[idProduct]['combination_images'][idProductAttr][0]);
            } else {
                self.selectedCombinationImage(pos_products[idProduct].image);
            }
        } else {
            self.selectedCombinationImage(pos_products[idProduct].image);
        }
    }

    /* Update the selected combination */
    self.selectCombination = async function (data, event) {
        var selectedCombinationId = [];
        var pos_products = await getAllPosProducts();
        selectedCombinationId.push(data.idAttribute());
        for (var i = 0; i < viewModel.productCombination().length; i++) {
            for (var j = 0; j < viewModel.productCombination()[i].productAttribute().length; j++) {
                if (viewModel.productCombination()[i].productAttribute()[j].idAttributeGroup() != data.idAttributeGroup()) {
                    if (viewModel.productCombination()[i].productAttribute()[j].selected() == "selected") {
                        selectedCombinationId.push(viewModel.productCombination()[i].productAttribute()[j].idAttribute());
                    }
                } else {
                    if (viewModel.productCombination()[i].productAttribute()[j].idAttribute() == data.idAttribute()) {
                        viewModel.productCombination()[i].productAttribute()[j].selected("selected");
                    } else {
                        viewModel.productCombination()[i].productAttribute()[j].selected("");
                    }
                }
            }
        }
        selectedCombinationId = selectedCombinationId.sort(function (a, b) { return a - b }).join('-');
        if (pos_products[data.idProduct()]['combination_details'][selectedCombinationId] != undefined) {
            var combiTaxRate = 0;
            if (taxRate != undefined) {
                combiTaxRate = parseFloat(taxRate[data.idProduct()]);
            } else {
                combiTaxRate = parseFloat(defaultTaxRate[data.idProduct()]);
            }
            var selectedCombinationDetail = pos_products[data.idProduct()]['combination_details'][selectedCombinationId];
            var combiPrice = parseFloat(selectedCombinationDetail['taxExcludedPrice']);
            combiPrice += (combiTaxRate * combiPrice) / 100;
            viewModel.combinationUnitPrice(parseFloat(combiPrice), currencyFormat);
            combiPrice *= viewModel.combinationQuantity();
            // viewModel.combinationPrice(wkFormatCurrency(parseFloat(combiPrice), currencyFormat));
            // viewModel.combinationPrice(wkFormatCurrency(parseFloat(selectedCombinationDetail['price']), currencyFormat));
            // customization
            var idProductAttribute = selectedCombinationDetail['id_product_attribute'];
            viewModel.updateCombinationImage(data.idProduct(), idProductAttribute);
            viewModel.combinationQuantity(parseInt(selectedCombinationDetail['minimal_quantity']));
            // End
        } else {
            showErrorMsg(combinationNotExist);
            // $.growl.error({ title: "", message: combinationNotExist });
        }
    }

    /* Add selected combination to the cart */
    self.addCombinationToCart = function (data, event) {
        self.emitBeforeEvents('addCombinationToCart', { 'data': data, 'event': event });
        addCombinationToCart();
        self.emitBeforeEvents('addCombinationToCart', { 'data': data, 'event': event });
    }

    /* Update the selected Product in the selected cart */
    self.selectCartItems = function (data, event) {
        self.resetCartCalculator();
        if (localStorage.pos_cart) {
            pos_cart = JSON.parse(localStorage.pos_cart);
        };
        var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
        pos_cart[cartIndex]['selectedCartItemIndex'] = self.productCart().indexOf(data);
        self.selectedCartProduct(data.idProduct() + 'c' + data.idProductAttribute);
        self.selectedCartProductIndex(self.productCart().indexOf(data));
        qty = 0;
        localStorage.setItem("pos_cart", JSON.stringify(pos_cart));
    }

    self.resetCartCalculator = function () {
        var params = {
            'buttonValue': 'qty',
            'buttonText': 'Qty'
        };
        updateProduct(new PosCartViewModel(params), true);
        self.reset(true);
    }

    /* Switch between the carts on hold */
    self.switchCart = function (data, event) {
        switchCart(data);
        self.resetCartCalculator();
    }

    /* Update the selected product details in cart */
    self.updateProduct = function () {
        updateProduct(this);
    }

    /* Update the details of payment option selected in the product */
    self.selectPaymentOption = function (paymentMethod) {
        var payment = paymentMethod.split(", ");
        self.selectedPaymentOption(payment[0]);
        self.selectedPaymentId(payment[1]);
        self.installmentAmount(self.totalOrderAmount());
        var dueAmount = self.totalOrderAmount() - self.customerPayAmount();
        var addedPayments = self.paymentOptions();
        var addPayment = true;
        if (addedPayments.length > 0) {
            $.each(addedPayments, function (idx, pOpt) {
                if (parseInt(payment[1]) == parseInt(pOpt['id_wkpos_payment'])) {
                    if (dueAmount > 0) {
                        addPayment = false;
                        var tenderAmount = parseFloat(dueAmount) + parseFloat(pOpt.tendered());
                        tenderAmount = makeTotalProductCaculation(tenderAmount);

                        addedPayments[idx].tendered(tenderAmount);
                        addedPayments[idx].dueAmount(tenderAmount);
                    }
                    self.selectedPaymentOptionIndex(idx);
                } else {
                    if (dueAmount > 0) {
                        addedPayments[idx].dueAmount(parseFloat(pOpt.tendered()));
                    }
                }
            });
            if (dueAmount > 0) {
                self.paymentOptions(addedPayments);
            }
        }
        if (dueAmount > 0) {
            if (addPayment) {
                var tenderedamount = 0;
                var autofillTenderedamount = true;
                dueAmount = makeTotalProductCaculation(parseFloat(dueAmount));
                if (autofillTenderedamount) {
                    tenderedamount = dueAmount;
                }
                var data = {
                    id_wkpos_payment: payment[1],
                    dueAmount: dueAmount,
                    tendered: tenderedamount,
                    paymentMethod: payment[0]
                };
                if (self.selectedPaymentOptionIndex() == -1) {
                    self.selectedPaymentOptionIndex(0);
                }
                var index = self.paymentOptions.push(new PaymentOption(data));
                self.selectedPaymentOptionIndex(index - 1);
            }





            // var tenderedamount = 0;
            // var autofillTenderedamount = true;
            // dueAmount = dueAmount.toFixed(psPrecision);
            // if (autofillTenderedamount) {
            //     tenderedamount = dueAmount;
            // }
            // var data = {
            //     id_wkpos_payment: payment[1],
            //     dueAmount: dueAmount,
            //     tendered: tenderedamount,
            //     paymentMethod: payment[0]
            // };
            // if(self.selectedPaymentOptionIndex() == -1) {
            //     self.selectedPaymentOptionIndex(0);
            // }
            // var index = self.paymentOptions.push(new PaymentOption(data));
            // self.selectedPaymentOptionIndex(index - 1);
        }
    }

    self.selectOrderPayment = function (orderPayment) {
        var index = self.paymentOptions.indexOf(orderPayment);
        self.selectedPaymentOptionIndex(index);
    }

    self.removePaymentOption = function (data) {
        self.paymentOptions.remove(data);
        var index = self.paymentOptions().length - 1;
        self.selectedPaymentOptionIndex(index);
    }

    /* Calculate the subTotal amount of the cart */
    self.subTotal = ko.computed(function () {
        var total = 0;
        var productCart = self.productCart();
        for (var i = 0; i < productCart.length; i++) {
            total = parseFloat(total) + parseFloat(productCart[i].taxExcludedPrice()) * productCart[i].productQuantity();
            if (productCart[i].productDiscount() > 0) {
                total -= (parseFloat(productCart[i].taxExcludedPrice()) * parseInt(productCart[i].productQuantity()) * parseFloat(productCart[i].productDiscount())) / 100;
            }
        }
        total = makeTotalProductCaculation(parseFloat(total));
        return total;
    }, this);

    self.combinationPrice = asyncComputed(function () {
        var combiPrice = self.combinationUnitPrice() * self.combinationQuantity();
        return wkFormatCurrency(parseFloat(combiPrice), currencyFormat);
    }, this);
    /* Calculate the subTotal amount of the cart */
    self.updateCombinationPrice = ko.computed(function () {
        if (isNaN(self.combinationQuantity()) || self.combinationQuantity() < 1) {
            self.combinationQuantity(1);
        }
        // var combiPrice = self.combinationUnitPrice() * self.combinationQuantity();
        // // formatCurrencyCldr(parseFloat(combiPrice), function(price) {
        // //     self.combinationPrice(price);
        // // });
        // self.combinationPrice = asyncComputed(function () {
        //     return wkFormatCurrency(parseFloat(combiPrice), currencyFormat);
        // }, this);
    }, this);

    /* Calculate the total tax amount of the cart */
    self.totalTax = ko.computed(function () {
        var total = 0;
        var productCart = self.productCart();
        for (var i = 0; i < productCart.length; i++) {
            var discountedPrice = parseFloat(productCart[i].taxExcludedPrice()) * productCart[i].productQuantity();
            if (productCart[i].productDiscount() > 0) {
                discountedPrice -= (discountedPrice * parseFloat(productCart[i].productDiscount()) / 100);
            }
            if (psRoundType == 1) {
                total = makeTotalProductCaculation(parseFloat(total));
                var orderDiscountTotal = makeTotalProductCaculation((discountedPrice * productCart[i].taxRate()) / 100);
                total = parseFloat(total) + parseFloat(orderDiscountTotal);
            } else if (psRoundType == 2) {
                total = parseFloat(total) + (discountedPrice * productCart[i].taxRate()) / 100;
                total = makeTotalProductCaculation(parseFloat(total));
                total = total;
            } else {
                total = parseFloat(total) + (discountedPrice * productCart[i].taxRate()) / 100;
            }
        }
        if (isNaN(total)) {
            total = 0;
        }
        if (psRoundType == 3) {
            total = makeTotalProductCaculation(parseFloat(total));
            return total;
        }
        return total;
    }, this);

    self.isCartActive = function () {
        self.posCarts()[localStorage.selectedCartId].isCartActive("active");
    }

    self.orderDiscount = ko.observable(0);

    self.decreaseCombinationQuantity = function (data, event) {
        if (self.combinationQuantity() > 1) {
            self.combinationQuantity(parseInt(self.combinationQuantity()) - 1);
        }
    }
    self.increaseCombinationQuantity = function (data, event) {
        if (self.combinationQuantity()) {
            var idProduct, selectedCombination = Array();
            var produtAttribute, attributeName;
            /* Generate the selected combination Index */
            for (var i = 0; i < self.productCombination().length; i++) {
                produtAttribute = self.productCombination()[i].productAttribute();
                for (var j = 0; j < produtAttribute.length; j++) {
                    if (produtAttribute[j].selected() == "selected") {
                        idProduct = produtAttribute[j].idProduct();
                        selectedCombination.push(produtAttribute[j].idAttribute());
                        break;
                    }
                }
            }
            selectedCombination = selectedCombination.sort(function (a, b) { return a - b }).join('-');
            if (pos_products[idProduct]['combination_details'] !== undefined
                && (parseInt(pos_products[idProduct]['combination_details'][selectedCombination]['quantity']) > 0
                    || checkOutofStockAllow(pos_products[idProduct]))
                && (parseInt(pos_products[idProduct]['combination_details'][selectedCombination]['quantity']) >= parseInt(self.combinationQuantity())
                    || checkOutofStockAllow(pos_products[idProduct]))
                && pos_products[idProduct]['availableForOrder'] == 1
            ) {
                self.combinationQuantity(parseInt(self.combinationQuantity()) + 1);
            } else if (pos_products[idProduct]['availableForOrder'] == 0) {
                showErrorMsg(wkProductNotAvailable);
                // $.growl.error({ title: "", message: wkProductNotAvailable });
            } else {
                showErrorMsg(wkQuantityNotifi);
                // $.growl.error({ title: "", message: wkQuantityNotifi });
            }
        }
    }

    /* Calculate the total amount of the cart */
    self.total = ko.computed(function (data, event) {
        if (isNaN(self.orderDiscount())) {
            self.orderDiscount(0);
            showErrorMsg(invalidOrderDiscount);
            // $.growl.error({ title: "", message: invalidOrderDiscount });
        }
        if (!Number.isInteger(parseInt(self.orderDiscount()))) {
            self.orderDiscount(0);
            showErrorMsg(invalidOrderDiscount);
            // $.growl.error({ title: "", message: invalidOrderDiscount });
        }
        // if (self.idOrder() == 0 && ((self.orderDiscount() < 0 && self.orderDiscount() != 0)
        //     || self.orderDiscount() > (parseFloat(this.subTotal()) + parseFloat(this.totalTax())))
        // ) {
        // showErrorMsg(invalidOrderDiscount);
        //     $.growl.error({ title: "", message: invalidOrderDiscount });
        //     self.orderDiscount(0);
        //     return (parseFloat(this.subTotal()) + parseFloat(this.totalTax())).toFixed(psPrecision);
        // } else {
        //     pos_cart = $.parseJSON(localStorage.pos_cart);
        //     localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
        //     return (parseFloat(this.subTotal()) + parseFloat(this.totalTax()) + parseFloat(self.selectedIdCarrierCost()) - parseFloat(this.orderDiscount())).toFixed(psPrecision);
        // }

        var totalAmount = 0;
        if (self.idOrder() == 0 && ((self.orderDiscount() < 0 && self.orderDiscount() != 0)
            || self.orderDiscount() > (parseFloat(this.subTotal()) + parseFloat(this.totalTax())))
        ) {
            showErrorMsg(invalidOrderDiscount);
            // $.growl.error({ title: "", message: invalidOrderDiscount });
            self.orderDiscount(0);
            totalAmount = parseFloat(this.subTotal()) + parseFloat(this.totalTax());
            // return (parseFloat(this.subTotal()) + parseFloat(this.totalTax())).toFixed(psPrecision);
        } else {
            pos_cart = $.parseJSON(localStorage.pos_cart);
            localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
            totalAmount = parseFloat(this.subTotal()) + parseFloat(this.totalTax()) - parseFloat(this.orderDiscount());
            // return (parseFloat(this.subTotal()) + parseFloat(this.totalTax()) + parseFloat(self.selectedIdCarrierCost()) - parseFloat(this.orderDiscount())).toFixed(psPrecision);
        }
        if (self.selectedIdCarrier() != 0) {
            totalAmount += parseFloat(self.selectedIdCarrierCost());
        }
        if (typeof posViewModel != 'undefined') {
            if (!posViewModel.navigatorOnline()) {
                totalAmount = makeTotalProductCaculation(parseFloat(totalAmount));
                self.totalOrderAmount(totalAmount);
                self.installmentAmount(totalAmount);
            }
        }
        totalAmount = makeTotalProductCaculation(parseFloat(totalAmount));
        return totalAmount;

    }, this);

    /* Calculate the total amount of the cart */
    // self.totalOrderAmount = ko.computed(function (data, event) {
    //     var totalAmount = self.total();
    //     if (self.rewardAmount() != 0) {
    //         totalAmount -= parseFloat(self.rewardAmount());
    //         totalAmount = totalAmount.toFixed(psPrecision);
    //     }
    //     return totalAmount;
    // }, this);

    self.customerPayAmount = ko.computed(function () {
        var total = 0;
        var paymentOptions = self.paymentOptions();
        $.each(paymentOptions, function (index, paymentOption) {
            total += parseFloat(paymentOption.tendered());
        });
        total = makeTotalProductCaculation(parseFloat(total));
        self.totalOrderAmountPaid(total);
        return total;
    }, this);

    /* Calculate the amount to be paid back to the customer */
    self.customerReturnAmount = ko.computed(function () {
        var total = parseFloat(self.customerPayAmount()) - parseFloat(this.totalOrderAmount());
        if (total > 0) {
        } else {
            total = 0;
        }
        total = makeTotalProductCaculation(parseFloat(total));
        return total;
    }, this);

    /* Update the amount paid by the customer while creating the order */
    self.updatePaymentDetails = function () {
        var added = false;
        if (self.paymentOptions().length == 0) {
            var paymentMethod = self.selectedPaymentOption() + ', ' + self.selectedPaymentId();
            self.selectPaymentOption(paymentMethod);
            added = true;
        }
        var paymentIndex = self.selectedPaymentOptionIndex();
        var selectedPaymentOption = null;
        if (paymentIndex != -1) {
            selectedPaymentOption = self.paymentOptions()[paymentIndex];
        }
        if (selectedPaymentOption) {
            var addText = '';
            var tenderedAmount = selectedPaymentOption.tendered();
            if (added) {
                tenderedAmount = 0;
            }
            if (Number.isInteger(parseInt(this.buttonValue()))) {
                if (tenderedAmount != 0) {
                    if (this.buttonValue() == 10
                        || this.buttonValue() == 20
                        || this.buttonValue() == 50
                    ) {
                        addText = parseFloat(tenderedAmount) + parseFloat(this.buttonValue());
                    } else {
                        addText = tenderedAmount + '' + this.buttonValue();
                    }
                } else {
                    if (typeof tenderedAmount != 'undefined' && tenderedAmount) {
                        var index = tenderedAmount.indexOf('.');
                        if (index == 1) {
                            addText = tenderedAmount + this.buttonValue();
                        } else {
                            addText = this.buttonValue();
                        }
                    } else {
                        addText = this.buttonValue();
                    }
                }
                // if (self.customerPayAmount() !== 0) {
                //     self.customerPayAmount(self.customerPayAmount() + this.buttonValue());
                // } else {
                //     self.customerPayAmount(this.buttonValue());
                // }
            } else if (this.buttonValue() == ".") {
                tenderedAmount += '';
                if (tenderedAmount.indexOf('.') == -1) {
                    addText = tenderedAmount + this.buttonValue();
                } else {
                    addText = tenderedAmount;
                }
                // self.customerPayAmount(self.customerPayAmount() + this.buttonValue());
            } else if (this.buttonValue().toLowerCase() == "del") {
                // qty = self.customerPayAmount() + "";
                var selectedOptionQty = tenderedAmount + "";
                // qty = qty.substring(0, qty.length - 1);
                // if (qty == "") {
                //     qty = 0;
                // }
                selectedOptionQty = selectedOptionQty.substring(0, selectedOptionQty.length - 1);
                if (selectedOptionQty == "") {
                    selectedOptionQty = 0;
                }
                addText = parseFloat(selectedOptionQty);
                // self.customerPayAmount(parseFloat(qty));
            } else if (this.buttonValue().toLowerCase() == "c") {
                addText = parseFloat(0.0);
            }
            if (selectedPaymentOption) {
                addText += '';
                var index = addText.indexOf('.');
                var qtyLength = addText.length;
                if (index != -1) {
                    if (index + 1 < qtyLength && (qtyLength - index - 1) > psPrecision) {
                        addText = makeTotalProductCaculation(parseFloat(addText));
                    }
                }
                // addText = parseFloat(addText).toFixed(psPrecision);
                selectedPaymentOption.tendered(addText);
            }
        }
    }

    self.emptyCustomers = ko.observable(false);

    /* Open customer panel on customer select and update the details of customer */
    self.updateCustomer = function () {
        $(window).trigger('resize');
        posViewModel.bodyPanel("customers");
        self.checkBodyPanel('customers');
        listenForScrollEvent();
        self.idOrder(0);
        if (customers != undefined) {
            self.emptyCustomers(false);
            updateCustomer(customers);
        } else {
            self.emptyCustomers(true);
        }
        self.callPosResize();
    }


    /* Get the shipping details of the selected cart */
    self.updateShippingCarrier = async function () {
        if (posViewModel.navigatorOnline()) {
            if (deliveryError == 0) {
                $(window).trigger('resize');
                var pos_cart = $.parseJSON(localStorage.pos_cart);
                var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                self.order = ko.observableArray([]);
                var idCustomer = 0;
                if (pos_cart[cartIndex] != undefined) {
                    if (pos_cart[cartIndex]['others'] != undefined && pos_cart[cartIndex]['others']['customer'] != undefined) {
                        idCustomer = pos_cart[cartIndex]['others']['customer']['idCustomer'];
                    }
                    var products = await getProductDetails(pos_cart[cartIndex]);
                    posViewModel.bodyPanel("shipping");
                    self.displayCart(1);
                    if (products != null) {
                        if (posViewModel.navigatorOnline()) {
                            var data = {
                                action: 'getShippingCarriers',
                                ajax: true,
                                posToken: posToken,
                                // product: JSON.stringify(products),
                                // idCustomer: idCustomer,
                                // order_discount: self.orderDiscount(),
                                id_address: self.selectedIdAddress()
                            };
                            if (pos_cart[cartIndex]['others'] != undefined
                                && pos_cart[cartIndex]['others']['id_cart'] != undefined
                            ) {
                                data['id_cart'] = pos_cart[cartIndex]['others']['id_cart'];
                            }
                            $('.shiping-carrier-spinner').removeClass('hidden');
                            $('.shiping-carrier').addClass('hidden');
                            $.ajax({
                                url: orderUrl,
                                dataType: 'json',
                                type: 'POST',
                                data: data,
                                success: function (order) {
                                    if (order.hasError) {
                                        $.each(order.errors, function (index, error) {
                                            showErrorMsg(error);
                                            // $.growl.error({ title: "", message: error });
                                        });
                                    } else {
                                        shipping = order.shipping;
                                        defaultShippingCarrier = order.defaultShipping;
                                        updateShipping();
                                        if (order.id_cart != undefined) {
                                            pos_cart[cartIndex]['others']['id_cart'] = order.id_cart;
                                        }
                                        localStorage.pos_cart = JSON.stringify(pos_cart);
                                        $('.shiping-carrier').removeClass('hidden');
                                        $('.shiping-carrier-spinner').addClass('hidden');
                                    }
                                },
                                error: function (jqXHR, exception) {
                                    ajaxResposeError(jqXHR, exception);
                                }
                            });
                        }
                    }
                    self.callPosResize();
                }
            } else {
                showErrorMsg(deliveryAddressError);
                // $.growl.error({ title: "", message: deliveryAddressError });
            }
        } else {
            self.resetShipping();
            // showErrorMsg(networkError);
            // $.growl.error({ title: "", message: networkError });
        }
    }

    /* Reset the details of the selected shipping */
    self.resetShipping = function () {
        self.posShipping([]);
        self.selectedIdCarrier(0);
        self.selectedCarrierName(noCarrier);
        self.selectedIdCarrierCost(0);
    }

    self.displayCart = ko.observable(1);
    /* Update the body panel on click of the left column element */
    self.checkBodyPanel = function (type) {
        if (type == 'products' || type == 'customers' || type == 'shipping') {
            self.displayCart(1);
            if (type == 'customers' || type == 'customers') {
                var isMobile = window.matchMedia("only screen and (max-width: 991px)");
                if (isMobile.matches) {
                    self.displayCart(0);
                }
            }
        } else {
            self.displayCart(0);
        }
    }

    self.onClickSidePanel = async function (data, event) {
        $.each(self.posCarts(), function (cartInd, cartItem) {
            self.posCarts()[cartInd].isCartActive("");
        });
        self.posCarts()[localStorage.selectedCartId].isCartActive("active");
        posViewModel.bodyPanel(data.activeClass);
        self.checkBodyPanel(data.activeClass);
        $(window).trigger('resize');
        self.idOrder(0);
        if (data.activeClass === "products") {
            listenForScrollEvent();
            self.resetShipping();
            self.selectedCategory(0);
            self.productSearchKey("");
            self.selectedSortType('');
            var pos_products = await objProduct.getPosProductDetails();
            if (typeof self.selectedCustomerIndex() != 'undefined') {
                var mappedTasks = $.map(pos_products, function (item) {
                    return new Products(item, self.selectedIdCountry())
                });
            } else {
                var mappedTasks = $.map(pos_products, function (item) {
                    return new Products(item, self.selectedIdCountry())
                });
            }
            // self.products(mappedTasks);
            loadProductPanel(mappedTasks);
        } else if (data.activeClass === "customers") {
            self.updateCustomer();
        } else if (data.activeClass === "orders") {
            self.orderTab(self.selectedOrderType());
        } else if (data.activeClass === "setting") {
            changeEmployeePassword(self.selectedSettingTab());
        } else if (data.activeClass === "shipping") {
            applyShipping = 1;
            updateShipping();
        }
        self.emitAfterEvents('onClickSidePanel', { 'data': data, 'event': event });
        self.callPosResize();
    }

    self.callPosResize = function () {
        if (self.displayCart() == 1) {
            wkposBodySize(false);
        } else {
            wkposBodySize(true);
        }
    }

    /* Update the shipping details in the shipping panel */
    function updateShipping() {
        if (shipping != undefined) {
            var mappedTasks = $.map(shipping, function (carrier) {
                if (defaultShippingCarrier == carrier.idCarrier) {
                    self.selectedIdCarrier(carrier.idCarrier);
                    self.selectedCarrierName(carrier.name);
                    self.selectedIdCarrierCost(carrier.shippingCost);
                }
                return new ShippingDetails(carrier);
            });

            self.posShipping(mappedTasks);
        }
    }

    /* Open the setting panel in the front */
    self.selectedSettingTab = ko.observable();
    self.settingTab = function (data) {
        posViewModel.bodyPanel('settings');
        self.selectedSettingTab(data);
    }

    function displayError(error) {
        showErrorMsg(error);
        // $.growl.error({ title: "", message: error });
    }

    self.minimalQtyCheck = async function () {
        var posCartProducts = self.productCart();
        var posProducts = await objProduct.getPosProductDetails();

        var error = false;
        $.each(posCartProducts, function (index, cartProduct) {
            var minimalQty;
            if (typeof posProducts[cartProduct.idProduct()] == 'undefined') {
                error = true;
                displayError(cartProduct.productName + ' ' + productNotExists);
            } else {
                if (typeof cartProduct.combinationIndex != 'undefined') {
                    minimalQty = posProducts[cartProduct.idProduct()]['combination_details'][cartProduct.combinationIndex]['minimal_quantity'];
                } else {
                    minimalQty = posProducts[cartProduct.idProduct()]['minimal_quantity'];
                }
                if (cartProduct.productQuantity() < minimalQty) {
                    error = true;
                    displayError(minimalQtyError + cartProduct.productQuantity() + minimalQtyError1 + cartProduct.productName + ' ' + cartProduct.productAttributes);
                }
            }
        });
        return error;
    }

    /* Proceed to the payment with all the selected details */
    self.proceedToPay = async function () {
        var posOrder = $.parseJSON(localStorage.pos_orders);
        var proceedPayment = true;
        if (posViewModel.navigatorOnline()) {
            if (typeof posOrder != 'undefined' && posOrder) {
                var posOrderList = Object.keys(posOrder);
                if (typeof posOrderList != 'undefined' && posOrderList.length > 0) {
                    showErrorMsg(orderSyncMsg);
                    proceedPayment = false;
                }
            }
        }
        if (proceedPayment) {
            var hasErrors = await self.minimalQtyCheck();
            if (!hasErrors) {
                var totalQty = 0;
                var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                var posCartPay = $.parseJSON(localStorage.pos_cart);
                $.each(posCartPay[cartIndex], function (index, product) {
                    if (Number.isInteger(parseInt(index))) {
                        totalQty += product['quantity'];
                    }
                });
                if (totalQty > 0) {
                    if (self.idCustomer() == undefined || self.customers().length == 0) {
                        posViewModel.bodyPanel("customers");
                        self.updateCustomer();
                        applyCustomer = 1;
                        if (self.activeCustomerId() == 0) {
                            showErrorMsg(selectCustomerMsg);
                            // $.growl.error({ title: "", message: selectCustomerMsg });
                        }
                    } else if (self.activeCustomerId() == 0 || (self.idCustomer() == undefined || self.idCustomer() == 0 || applyCustomer == 0)
                        && posViewModel.bodyPanel() != 'customers'
                    ) {
                        if (self.activeCustomerId() == 0) {
                            showErrorMsg(selectCustomerMsg);
                            // $.growl.error({ title: "", message: selectCustomerMsg });
                        }
                        // posViewModel.bodyPanel("customers");
                        self.updateCustomer();
                        applyCustomer = 1;
                        // applyShipping = 0;
                    } else if ((self.selectedIdAddress() == undefined || self.selectedIdAddress() == 0)
                        && posViewModel.bodyPanel() != 'customers'
                    ) {
                        self.updateCustomer();
                        applyCustomer = 1;
                        // applyShipping = 0;
                        showErrorMsg(noAddressSelectedError);
                        // $.growl.error({ title: "", message: noAddressSelectedError });
                    } else {
                        back = posViewModel.bodyPanel();
                        posViewModel.bodyPanel("pay");
                        self.updatePaymentOptions();
                        self.removeResizable();
                        if (posViewModel.navigatorOnline()) {
                            addProductToPsCart();
                        } else {
                            // showErrorMsg(networkError);
                            // $.growl.error({ title: "", message: networkError });
                        }
                        // updateVouchers(posCartPay[cartIndex]);
                        // appliedVouchers(posCartPay[cartIndex]);
                        // self.rewardAmount(getRewardTotalAmount(posCartPay[cartIndex], self.total()));
                    }
                }
            }
        }
    }

    self.copyCode = function (code) {
        $('#wk-voucher-applied-input').val(code.rewardCode);
        $('#wk-voucher-applied-input').attr('data-id-cart-rule', code.idCartRule);
    }

    self.applyPromocode = function () {
        applyPromocode();
        self.updatePaymentOptions();
    }

    self.removeVoucher = function (code) {
        var pos_cart = $.parseJSON(localStorage.pos_cart);
        var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
        var idCart = pos_cart[cartIndex]['others']['id_cart'];
        removePromoCode(code);
        self.updatePaymentOptions();
    }

    /* Open the previous body panel on click of back link in payment panel */
    self.previousPage = function () {
        if (back == 'shipping' && self.idOrder != 0) {
            posViewModel.bodyPanel('products');
            listenForScrollEvent();
        } else {
            posViewModel.bodyPanel(back);
        }
        self.idOrder(0);
        self.callPosResize();
        $(window).trigger('resize');
    }

    /* Reset the customer to the selected cart */
    self.resetCustomerDetails = function () {
        self.customerAddressesDetails([]);
        self.customerAddresses([]);
        self.customerName('');
        self.customerEmail('');
        self.idCustomer(0);
        self.activeCustomerId(0);
        self.customerAddresses([]);
    }
    /* Assign the customer to the selected cart */
    self.selectCustomer = function (customer, index = false) {
        selectCustomer(customer, index);
    }

    var getCustomerFromId = function (idCustomer) {
        var selectCustomer = {};
        $.each(customers, function (index, item) {
            if (item.id_customer == idCustomer) {
                selectCustomer['index'] = index;
                selectCustomer['customer'] = item;
                return;
            }
        });
        return selectCustomer;
    }

    self.selectGuestAccount = function () {
        if (guestAccountEnabled) {
            var guestCustomer = getCustomerFromId(idGuest);
            selectCustomer(guestCustomer['customer'], guestCustomer['index']);
        }
    }


    /* Update the address of the customer and get the tax rate according to the customer address */
    self.selectDeliveryAddress = function (data, event) {
        self.customerAddressesDetails([]);
        if (self.idCustomer() != undefined) {
            selectDeliveryAddress();
        }
    }

    /* Update the tax rate of the product and cart product */
    self.updateTaxRate = function (taxRate, updateCart = false) {
        updateTaxRate(taxRate, updateCart = false);
    }


    /* Update the customer in the cart */
    self.changeCustomer = function (idCustomer) {
        var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
        pos_cart = $.parseJSON(localStorage.pos_cart);
        self.selectedCustomerName(self.customerName());
        self.selectedCustomerId(idCustomer);
        applyShipping = 0;
        var customer = {};
        customer['idCustomer'] = idCustomer;
        customer['customerName'] = self.customerName();
        customer['customerEmail'] = self.customerEmail();
        customer['id_address_delivery'] = self.selectedIdAddress();

        if (pos_cart[cartIndex]['others'] == undefined) {
            pos_cart[cartIndex]['others'] = {};
        }
        pos_cart[cartIndex]['others']['customer'] = customer;
        localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
    }

    self.selectedSearchTypeId = ko.observable(parseInt(defaultSearchTypeId));
    self.selectedSearchType = ko.observable(defaultSearchType);
    self.changeCustomerSearchType = function (data) {
        let index = parseInt(data) - 1;
        self.selectedSearchTypeId(data);
        if (typeof customerSearchTypes[index] != 'undefined') {
            self.selectedSearchType(customerSearchTypes[index].name);
        }
    }

    /* generate the order on click of confirmation Payment button */
    self.generateOrder = function () {
        generateOrder();
        updateSyncStatus();
    }

    self.changeRefundStatus = function (status) {
        self.alreadyRefund(status);
    }

    self.returnOrderStatus = function () {
        var orderStatus = self.enableOrderReturn();
        self.enableOrderEdit(0);
        self.enableOrderReturn(!orderStatus);
        // returnOrderStatus();
    }

    self.changeOrderEditStatus = function (orderStatus) {
        self.enableOrderEdit(orderStatus);
    }

    self.editOrderDetails = function () {
        var orderStatus = self.enableOrderEdit();
        self.enableOrderReturn(0);
        self.enableOrderEdit(!orderStatus);
        // returnOrderStatus();
    }

    self.updateProductReturnQty = function (data) {
        if (data.quantity_refundable() <= data.partialRefundQty()) {
            data.partialRefundQty(data.quantity_refundable());
        }

        var amount = parseFloat(data.productPrice) * parseInt(data.partialRefundQty());
        data.partialRefundAmount(amount);
    }
    self.updateProductReturnAmount = function (data) {
        if (data.amount_refundable_tax_incl() <= data.partialRefundAmount()) {
            data.partialRefundAmount(data.amount_refundable_tax_incl());
        }
    }

    self.updateProductEditAmount = function (data) {
        if (data.price == '') {
            var price = 0;
            var total = 0;
        } else {
            var price = (parseFloat(data.price) * 100) / (100 + parseFloat(data.taxRate));
            price = makeTotalProductCaculation(parseFloat(price));
            var total = parseFloat(data.price) * parseInt(data.productQuantity);
        }
        data.changedTaxExclPrice(price);
        total = makeTotalProductCaculation(parseFloat(total));
        data.changedtotalPricePerProduct(total);
    }

    self.partialRefundProcess = async function (data) {
        var currentOrderDetails = viewModel.orderedProductsDetail();
        var partialRefundProduct = {};
        var partialRefundProductQuantity = {};
        var idOrderDetail = 0;
        var qtyReturn = 0;
        $.each(currentOrderDetails, function (index, order) {
            if (order.partialRefundQty() > 0) {
                qtyReturn++;
                idOrderDetail = order.id_order_detail;
                partialRefundProduct[idOrderDetail] = order.partialRefundAmount();
                partialRefundProductQuantity[idOrderDetail] = order.partialRefundQty();
            }
        });
        if (qtyReturn > 0) {
            var data = {
                partialRefundProduct: partialRefundProduct,
                partialRefundProductQuantity: partialRefundProductQuantity,
                id_order: self.selectedOrderId(),
                action: 'orderRefund',
                TaxMethod: 1,
                generateDiscountRefund: 1
            };
            await refundOrder(data);
            self.returnOrderStatus();
        } else {
            showErrorMsg('Update Product Quantity');
        }
    }

    self.updatePaymentOptions = function () {
        self.paymentOptions([]);
    }

    self.updateOrderProductDetails = async function (data) {
        // var currentOrderDetails = viewModel.orderedProductsDetail();
        // var partialRefundProduct = {};
        // var partialRefundProductQuantity = {};
        // var idOrderDetail = 0;
        // var qtyReturn = 0;
        // $.each(currentOrderDetails, function(index, order) {
        //     if (order.partialRefundQty() > 0) {
        //         qtyReturn++;
        //         idOrderDetail = order.id_order_detail;
        //         partialRefundProduct[idOrderDetail] = order.partialRefundAmount();
        //         partialRefundProductQuantity[idOrderDetail] = order.partialRefundQty();
        //     }
        // });
        // if (qtyReturn > 0) {
        var data = {
            action: 'editProductOnOrder',
            id_order: self.selectedOrderId(),
            product_id_order_detail: data.id_order_detail,
            product_price_tax_excl: data.changedTaxExclPrice(),
            product_price_tax_incl: data.price,
            product_quantity: data.productQuantity,
            product_invoice: data.id_order_invoice,
            // id_wkpos_session: idWkPosSession
        };


        var response = await editOrderProduct(data);
        self.changeOrderEditStatus(0);
        self.changeRefundStatus(false);
        // console.log(response['order'][self.selectedOrderId()]);
        // posOrders[self.selectedOrderId()] = response['order'][self.selectedOrderId()];
        // console.log(posOrders);
        // var data = {
        //     idOrder: self.selectedOrderId()
        // };
        // self.loadOrderedDetails(data);
        // } else {
        //     showErrorMsg('Update Product Quantity')
        // }

    }

    self.deleteOrderProductDetails = async function (data) {
        var check = confirm(deleteOrderProductMessage);
        if (check == true) {
            var data = {
                action: 'deleteProductLine',
                id_order: self.selectedOrderId(),
                id_order_detail: data.id_order_detail,
                // id_wkpos_session: idWkPosSession
            };
            var response = await editOrderProduct(data);
        }
    }

    self.updateOrderStatus = async function (data) {
        var orderDetail = self.orderHistory();
        var response = await updateOrderStatus(data.id_wkpos_order, data.remainingAmount);
        if (typeof response != 'undefined' && response) {
            orderDetail = orderDetail[0]
            // formatCurrencyCldr(parseFloat(response['installment']['paidAmount']), function(price) {
            //     orderDetail.displayAmountPaid(price);
            // });
            orderDetail.displayAmountPaid = asyncComputed(function () {
                return wkFormatCurrency(parseFloat(response['installment']['paidAmount']), currencyFormat);
            }, this);
            orderDetail.displayRemainingAmount = asyncComputed(function () {
                return wkFormatCurrency(parseFloat(response['installment']['remainingAmount']), currencyFormat);
            }, this);
            // formatCurrencyCldr(parseFloat(response['installment']['remainingAmount']), function(price) {
            //     orderDetail.displayRemainingAmount(price);
            // });
            // self.combinationPrice = asyncComputed(function () {
            //     return wkFormatCurrency(parseFloat(combiPrice), currencyFormat);
            // }, this);
            orderDetail.amountPaid(parseFloat(response['installment']['paidAmount']));
            orderDetail.remainingAmount(parseFloat(response['installment']['remainingAmount']));

            posOrders[parseInt(response.id_order)]['order']['installment'] = response.installment;
            showSuccessMsg(response.success);
            self.orderHistory().current_state(parseInt(paymentAcceptedStatus));
        }
    }

    self.updateInstallmentAmount = function () {
        var orderAmount = self.totalOrderAmount();
        if (isNaN(self.installmentAmount())) {
            showErrorMsg(invalidInstallmentAmount);
            self.installmentAmount(orderAmount);
        } else if (orderAmount < parseFloat(self.installmentAmount())) {
            showErrorMsg(overflowInstallmentAmount);
            self.installmentAmount(orderAmount);
        }
    }

    /* Synchronise all the offline order if there is internet connection */
    self.synchroniseOrder = function () {
        if (posViewModel.navigatorOnline()) {
            var numberOfOrders = (Object.keys(pos_orders).length);
            if (pos_orders != undefined && numberOfOrders > 0) {
                numberOfOrders -= 1;
                var idCustomer = 0;
                var syncMessage = '';
                $('.wk-loading-pos-details').addClass('sync-orders').removeClass('hide');
                $('.wk-loading-status').html('').show();
                $('.wk-loading-pos-details').next().css({ "opacity": "0.7" });

                var countIndex = 0;
                $.each(pos_orders, function (index, order) {
                    idCustomer = 0;
                    if (order['order']['id_customer'] != undefined) {
                        idCustomer = order['order']['id_customer'];
                    }
                    var idInterval = setTimeout(function () {
                        if (order['product'] != null) {
                            var data = {
                                action: 'addProductToCart',
                                ajax: true,
                                product: JSON.stringify(order['product']),
                                idCustomer: idCustomer,
                                order_discount: order['order']['total_discounts'],
                                id_address: order['order']['id_address'],
                                posToken: posToken
                            };

                            $('.wk-loading-pos-details').addClass('sync-orders').removeClass('hide');
                            $('.wk-loading-status').html('').show();
                            $('.wk-loading-pos-details').next().css({ "opacity": "0.7" });
                            $.ajax({
                                url: orderUrl,
                                dataType: 'json',
                                type: 'POST',
                                async: false,
                                data: data,
                                success: function (response) {
                                    if (response.hasError) {
                                        $.each(response.errors, function (erorIndex, error) {
                                            showErrorMsg(error);
                                            // $.growl.error({ title: "", message: error });
                                        });
                                        if (countIndex == numberOfOrders) {
                                            $('.wk-loading-pos-details').removeClass('sync-orders').addClass('hide');
                                            $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                                        }
                                    } else {
                                        generatePOSOrder(response.id_cart, order, idCustomer, countIndex, numberOfOrders);
                                    }
                                    countIndex += 1;
                                },
                                error: function (jqXHR, exception) {
                                    ajaxResposeError(jqXHR, exception);
                                }
                            });
                        }
                    }, 1);
                });
            }
        } else {
            // showErrorMsg(networkError);
            // $.growl.error({ title: "", message: networkError });
        }
        updateSyncStatus();
    }

    /* Create order receipt */
    self.orderReceipt = function (orderDetail) {
        if (orderDetail != undefined && orderDetail != "") {
            self.order.push(
                new Order(
                    orderDetail['order'],
                    orderDetail['product']
                )
            );
            self.idOrder(1);
            self.paymentOptions([]);
            // self.customerPayAmount(0);
            self.removeSelectedCart();
        }
    }

    /* Display the ordered products */
    self.orderProductReceipt = function (orderDetail) {
        if (orderDetail != undefined && orderDetail != "") {
            self.orderPrint([]);
            self.orderPrint.push(
                new Order(
                    orderDetail['order'],
                    orderDetail['product']
                )
            );
        }
    }

    /* Open product panel on click of next order */
    self.nextOrder = function () {
        listenForScrollEvent();
        self.idOrder(0);
        self.selectedPaymentId(defaultIdPaymentMethod);
        posViewModel.bodyPanel("products");
        var posProducts = objProduct.getPosProductDetails();
        posProducts.then(
            function (products) {
                var mappedTasks = $.map(products, function (item) { return new Products(item, self.selectedIdCountry()) });
                // self.products(mappedTasks);
                loadProductPanel(mappedTasks);
                self.callPosResize();
            },
            function (response) {
            }
        );
    }

    self.productSearchKey = ko.observable();
    self.customerSearchKey = ko.observable();
    self.orderSearchKey = ko.observable();

    /* Search the products in product panel */
    self.searchProduct = async function (data, event) {
        var code = (event.keyCode ? event.keyCode : event.which);
        if (code != 0) {
            await searchProduct(event, code);
            return;
        }
    }

    self.sortOrders = function (orders) {
        return orders.sort(function (a, b) {
            if (a > b) {
                return -1;
            }
            if (a < b) {
                return 1;
            }
        });
    }

    /* sort the product by ascending order */
    self.sortProductByAsc = function () {
        self.selectedSortType('asc');
        self.products(self.products().sort(function (a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
        }));
    }

    /* sort the product by descending order */
    self.sortProductByDesc = function () {
        self.selectedSortType('desc');
        self.products(self.products().sort(function (a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
        }));
    }

    /* Remove the product from cart */
    self.removeProduct = function (product) {
        var check = confirm(deleteProductMessage);
        if (check == true) {
            removeProduct(product);
            self.resetCartCalculator();
        }
    }

    /* Increase the product quantity by one */
    self.increaseProductQuantity = function (product) {
        var index = self.productCart.indexOf(product);
        var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
        var cartProductQty = 0;
        var pos_cart = $.parseJSON(localStorage.pos_cart);
        var productQty = 0;
        if (product.idProductAttribute == '') {
            productQty = parseInt(pos_products[product.idProduct()].quantity);
        } else {
            productQty = parseInt(pos_products[product.idProduct()]['combination_details'][product.combinationIndex].quantity);
        }
        var currentQty = parseInt(product.productQuantity());
        if (currentQty + 1 > productQty
            && checkOutofStockAllow(pos_products[product.idProduct()]) == false
        ) {
            showErrorMsg(wkQuantityNotifi);
            // $.growl.error({ title: "", message: wkQuantityNotifi });
        } else {
            cartProductQty = parseInt(product.productQuantity()) + 1;
            pos_cart[cartIndex][index]['quantity'] = cartProductQty;
            localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
            product.productQuantity(cartProductQty);
        }
    }

    /* Decrease the product quantity by one */
    self.decreaseProductQuantity = function (product) {
        var index = self.productCart.indexOf(product);
        var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
        var cartProductQty = 0;
        var pos_cart = $.parseJSON(localStorage.pos_cart);
        if (parseInt(product.productQuantity()) - 1 < 1) {
            self.removeProduct(product);
            self.resetCartCalculator();
        } else {
            cartProductQty = product.productQuantity() - 1;
            pos_cart[cartIndex][index]['quantity'] = cartProductQty;
            localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
            product.productQuantity(cartProductQty);
        }
    }

    // /* Search customer on the basis of name */
    self.searchCustomer = function (data, event) {
        searchCustomer();
    }

    /* Search order on the basis of order reference */
    self.searchOrder = function (data, event) {
        searchOrder();
    }


    self.connectPrinter = function () {
        try {
            if (qz.websocket.isActive()) {
                qz.websocket.disconnect().then(function () {
                    self.printerConnected(qz.websocket.isActive());
                    showSuccessMsg(printerDisconnectSuccess);
                });
            } else {
                connect().then(function () {
                    return qz.printers.find(selectedPrinterName);               // Pass the printer name into the next Promise
                }).then(function (printer) {
                    showSuccessMsg(printerConnectedSuccess);
                    self.selectedPrinter(printer);
                    self.printerConnected(qz.websocket.isActive());
                }).catch(function (e) {
                    self.printerConnected(qz.websocket.isActive());
                    showErrorMsg(e);
                });
            }
        } catch (e) {
            self.printerConnected(qz.websocket.isActive());
            console.log(e);
        }
    }

    self.printCreditSlip = function () {
        connect().then(function () {
            return qz.printers.find(selectedPrinterName);               // Pass the printer name into the next Promise
            // return print();
        }).then(function (printer) {
            printCreditSlip(printer);
        }).catch(function (e) {
            showErrorMsg(e);
            // $.growl.error({ title: "", message: e });
        });
    }

    /* Print Invoice on print invoice button click */
    self.printInvoice = function () {
        try {
            if (wkposPrintType == 2) {
                var posOrder;
                posOrder = posOrders;
                if (viewModel.selectedOrderType() == "offline"
                    || (posViewModel.bodyPanel() == 'pay' && !posViewModel.navigatorOnline())
                ) {
                    posOrder = $.parseJSON(localStorage.pos_orders);
                }

                printHtmlOrderInvoice(
                    posOrder[viewModel.selectedOrderId()]['order'],
                    posOrder[viewModel.selectedOrderId()]['product']
                );
            } else {
                self.printerConnected(qz.websocket.isActive());
                if (qz.websocket.isActive()) {
                    printOrderBill(self.selectedPrinter());
                } else {
                    showErrorMsg(printerNotConnected);
                }
            }
        } catch (e) {
            self.printerConnected(qz.websocket.isActive());
            showErrorMsg(e);
        }
        // connect().then(function () {
        //     return qz.printers.find(selectedPrinterName);               // Pass the printer name into the next Promise
        //     // return print();
        // }).then(function (printer) {
        //     printOrderBill(printer);
        // }).catch(function (e) {
        //     showErrorMsg(e);
        //     // $.growl.error({ title: "", message: e });
        // });
    }

    self.removeResizable = function () {
        wkposBodySize(false);
        $("#content-wrapper").removeAttr("style");
    }

    self.customerGroups = ko.observableArray([]);
    self.titles = ko.observableArray([]);

    /* Add new customer from front end */
    self.addNewCusomer = function () {
        self.issetCustomer(1);
        self.firstName("");
        self.lastName("");
        self.customerEmail("");
        self.customerPassword("");
        self.customerPhone("");
        self.editIdCustomer(0);
        self.groupAccess(defaultGroupAccess);
        self.days([0]);
        self.months([0]);
        self.years([0]);
        self.newsLetter(false);
        self.selectedTitle(0);
        self.customerHeading(addCustomerHeading);
        // customerGroups = $.parseJSON(customerGroups);
        var mappedTasks = $.map(groups, function (group, index) {
            return new customerGroup(group);
        });
        self.customerGroups(mappedTasks);
        var mappedTasks = $.map(genders, function (gender, index) {
            return { idGender: index, name: gender };
        });
        self.titles(mappedTasks);
        posViewModel.bodyPanel("customer");

        self.customerPanel('customer');
        self.removeResizable();
        self.callPosResize();
    }

    self.customerPanel = ko.observable('customer');

    /* Mapping of customer address */
    self.addAddress = function () {
        self.aliasName('');
        self.address1('');
        self.address2('');
        self.company('');
        self.vatNumber('');
        self.postcode('');
        self.homePhone('');
        self.phone('');
        self.other('');
        self.selectedIdCountry(0);
        self.stateList([]);
        self.selectedIdState(0);
        self.city('');
        self.customerPanel('addaddress');
        posViewModel.bodyPanel('customer');
        self.removeResizable();
    }

    /* Add New Customer address */
    self.addNewAddress = function (address) {
        if (self.activeCustomerId() == 0) {
            showErrorMsg(selectCustomerMsg);
            // $.growl.error({ title: "", message: selectCustomerMsg });
        } else {
            $.each(customers, function (key, customer) {
                if (customer["id_customer"] == self.idCustomer()) {
                    self.customerHeading(editCustomerHeading);
                    posViewModel.bodyPanel("customer");
                    self.customerPanel('address');
                    if (self.selectedIdAddress() != undefined && self.selectedIdAddress() != 0 && customer["addresses"] != undefined) {
                        $.each(customer["addresses"], function (key, address) {
                            if (address["id_address"] == self.selectedIdAddress()) {
                                self.firstName(address.firstname);
                                self.lastName(address.lastname);
                                self.customerEmail(self.customerEmail());
                                self.aliasName(address.alias);
                                self.address1(address.address1);
                                self.address2(address.address2);
                                self.company(address.company);
                                self.vatNumber(address.vat_number);
                                self.postcode(address.postcode);
                                self.homePhone(address.phone);
                                self.phone(address.phone_mobile);
                                self.other(address.other);
                                self.selectedIdCountry(address.id_country);
                                if (address.id_state != undefined || address.id_State != 0) {
                                    self.getStates()
                                    self.selectedIdState(address.id_state);
                                }
                                self.city(address.city);
                                return true;
                            }
                        });
                    } else {
                        self.firstName(customer['first_name']);
                        self.lastName(customer['last_name']);
                        self.aliasName('');
                        self.address1('');
                        self.address2('');
                        self.company('');
                        self.vatNumber('');
                        self.postcode('');
                        self.homePhone('');
                        self.phone('');
                        self.other('');
                        self.selectedIdCountry(0);
                        self.selectedIdState(0);
                        self.city('');
                    }
                }
            });
        }
    }

    self.groupAccess = ko.observableArray([]);
    self.editIdCustomer = ko.observable();
    self.editCustomerIndex = ko.observable();
    self.defaultGroup = ko.observable(parseInt(defaultGroup));

    /* Edit customer details */
    self.editCustomerDetails = function () {
        $.each(customers, function (key, customer) {
            if (customer["id_customer"] == self.idCustomer()) {
                self.issetCustomer(0);
                self.firstName(customer['first_name']);
                self.lastName(customer['last_name']);
                self.customerEmail(customer['email']);
                self.editIdCustomer(customer['id_customer']);
                self.editCustomerIndex(key);
                self.customerPassword('');
                self.customerHeading(editCustomerHeading);
                posViewModel.bodyPanel("customer");
                self.customerPanel('customer');
                self.removeResizable();
                self.groupAccess(customer['group']);

                if (customer['customer_phone']) {
                    self.customerPhone(customer['customer_phone']);
                } else {
                    self.customerPhone('');
                }

                var mappedTasks = $.map(groups, function (group, index) {
                    return new customerGroup(group);
                });
                self.customerGroups(mappedTasks);
                var mappedTasks = $.map(genders, function (gender, index) {
                    return { idGender: index, name: gender };
                });
                self.titles(mappedTasks);

                if (customer['birthday'] != undefined) {
                    var dob = customer['birthday'].split('-');
                    self.days([parseInt(dob[2]) + '']);
                    self.months(parseInt(dob[1]) + '');
                    self.years([parseInt(dob[0]) + '']);
                }
                if (customer['newsletter'] != undefined && customer['newsletter'] != 0) {
                    self.newsLetter(Boolean(customer['newsletter']));
                } else {
                    self.newsLetter(false);
                }
                if (customer['id_gender'] != undefined) {
                    self.selectedTitle(customer['id_gender']);
                }
                return true;
            }
        });
        self.callPosResize();
    }

    /* Update Employee password */
    self.updateEmployeePassword = function (data) {
        if (posViewModel.navigatorOnline()) {
            $.ajax({
                url: wkposLogin,
                dataType: 'json',
                type: 'POST',
                data: {
                    action: 'updateEmployeePassword',
                    ajax: true,
                    'id_employee': document.getElementById('id_employee').value,
                    'old_passwd': document.getElementById('old_passwd').value,
                    'passwd': document.getElementById('passwd').value,
                    'passwd2': document.getElementById('passwd2').value,
                    posToken: posToken,
                },
                success: function (response) {
                    if (response.hasErrors) {
                        $.each(response.errors, function (index, error) {
                            showErrorMsg(error);
                            // $.growl.error({ title: "", message: error });
                        })
                    } else {
                        showSuccessMsg(response.success);
                        // $.growl.notice({ title: "", message: response.success });
                        document.getElementById('old_passwd').value = '';
                        document.getElementById('passwd').value = '';
                        document.getElementById('passwd2').value = '';
                    }
                },
                error: function (jqXHR, exception) {
                    ajaxResposeError(jqXHR, exception);
                }
            });
        } else {
            // showErrorMsg(networkError);
            // $.growl.error({ title: "", message: networkError });
        }
    }

    /* Display the product on the basis of category in product panel */
    self.getCategoryWsProduct = function (data) {
        self.selectedCategory(data.idCategory);
        self.selectedSortType('');
        var idProducts = categoryWiseProducts[data.idCategory];
        self.products([]);
        var mappedProducts = $.map(idProducts, function (idProduct) {
            return new Products(pos_products[idProduct], self.selectedIdCountry());
        });
        loadProductPanel(mappedProducts);
    }


    self.subCategories = ko.observableArray([]);
    self.displaySubCategoriesFlag = ko.observable(0);
    var Category = function (children, category) {
        var self = this;
        self.children = ko.observableArray(children);
        self.idCategory = category.id_category;
        self.name = ko.observable(category.name);
        self.categoryOpen = ko.observable(0);
        if (typeof category.children == 'undefined') {
            self.hasChildren = ko.observable(0);
        } else {
            self.hasChildren = ko.observable(1);
        }
    }

    self.createCategorieTree = function (categories) {
        var categoryTreeDemo = [];
        $.each(categories, function (index, category) {
            categoryTreeDemo.push(self.createSubCategorieTree(category));
        });
        return categoryTreeDemo;
    }

    self.createSubCategorieTree = function (category) {
        if (typeof category.children == 'undefined') {
            return new Category([], category);
        } else {
            return new Category(self.createCategorieTree(category.children), category);
        }
    }

    self.showExpand = ko.observable(1);
    self.expandAllCategory = function () {
        self.changeSubCategoryStatus([self.subCategories()], 1);
        self.showExpand(0);
    }

    self.collapseAllCategory = function () {
        self.changeSubCategoryStatus([self.subCategories()], 0);
        self.showExpand(1);
    }

    self.changeSubCategoryStatus = function (categories, status) {
        $.each(categories, function (index, category) {
            self.changeTreeStatus(category, status);
        });
    }

    self.changeTreeStatus = function (category, status) {
        if (category.hasChildren() == 0) {
            category.categoryOpen(status);
        } else {
            category.categoryOpen(status);
            return self.changeSubCategoryStatus(category.children(), status);
        }
    }

    self.displaySubCategories = function (data) {
        var selectedCategory = null;
        $.each(categories, function (index, category) {
            if (category.id_category == data.idCategory) {
                selectedCategory = category;
                return;
            }
        });
        var categoryTree = self.createCategorieTree(selectedCategory.children);
        self.subCategories(new Category(categoryTree, selectedCategory));
        self.showExpand(1);
        self.displaySubCategoriesFlag(1);
        $('#wk-pos-category').modal('toggle');
    }

    /* Load all the order details on click of order in left panel */
    self.loadOrderedDetails = function (data) {
        var orderDetails = self.orderDetails();
        $.each(orderDetails, function (index, order) {
            if (order.idOrder == data.idOrder) {
                self.currentSelectedOrderIndex(parseInt(index));
                return;
            }
        });
        self.orderHistory([]);
        self.orderedProductsDetail([]);
        var posOrderDetail;
        posOrderDetail = posOrders;
        if (self.selectedOrderType() == "offline") {
            posOrderDetail = $.parseJSON(localStorage.pos_orders);
        }
        self.changeRefundStatus(false);

        self.selectedOrderId(data.idOrder);
        self.selectedOrderReference(posOrderDetail[data.idOrder]['order']['reference']);
        self.orderHistory.push(
            new Order(posOrderDetail[data.idOrder]['order'])
        );
        if (posOrderDetail[data.idOrder] != undefined) {
            self.orderPrint([]);
            self.orderProductReceipt(posOrderDetail[data.idOrder]);
        }
        var currency = posOrderDetail[data.idOrder]['order'].currency;
        $.each(posOrderDetail[data.idOrder]['product'], function (index, product) {
            self.orderedProductsDetail.push(
                new OrderedProduct(product, index, false, currency)
            );
        });
        self.enableOrderReturn(0);
        self.showCreditSlip(0);
        self.changeOrderEditStatus(0);
    }

    self.emptyOrders = ko.observable(false);

    /* Switch between order tab */
    self.orderTab = function (orderType) {
        self.orderDetails([]);
        self.orderHistory([]);
        self.orderedProductsDetail([]);
        self.orderSearchKey('');
        self.selectedOrderType(orderType);
        var selectOrder = true;

        if (orderType == "history") {
            if (posOrders == undefined || posOrders == null || posOrders.length == 0) {
                self.emptyOrders(true);
            } else {
                var empty = true;
                var orderSortedKeys = self.sortOrders(Object.keys(posOrders));
                var mappedTasks = $.map(orderSortedKeys, function (order, index) {
                    // if (posOrders[order].order.id_wkpos_session != idWkPosSession) {
                    empty = false;
                    if (selectOrder) {
                        selectOrder = false;
                        self.loadOrderedDetails({ idOrder: posOrders[order]['order']['id_order'] })
                    }
                    return new Order(posOrders[order]['order']);
                    // }
                });
                self.emptyOrders(empty);
                loadOrderPanel(mappedTasks);
                // self.orderDetails(mappedTasks);
            }
        } else if (orderType == "offline") {
            if (typeof localStorage.pos_orders != 'undefined' && localStorage.pos_orders != null) {
                var posOfflineOrders = $.parseJSON(localStorage.pos_orders);
                if (typeof posOfflineOrders == 'undefined' || posOfflineOrders == null || Object.keys(posOfflineOrders).length == 0) {
                    self.emptyOrders(true);
                } else {
                    var mappedTasks = $.map(posOfflineOrders, function (order, index) {
                        if (selectOrder) {
                            selectOrder = false;
                            self.loadOrderedDetails({ idOrder: index })
                        }
                        return new Order(order['order'])
                    });
                    self.emptyOrders(false);
                    loadOrderPanel(mappedTasks);
                    // self.orderDetails(mappedTasks);
                }
            } else {
                self.emptyOrders(true);
            }
        } else if (orderType == "current_session") {
            if (posOrders == undefined || posOrders == null || posOrders.length == 0) {
                self.emptyOrders(true);
            } else {
                var empty = true;
                var orderSortedKeys = self.sortOrders(Object.keys(posOrders));
                var mappedTasks = $.map(orderSortedKeys, function (order, index) {
                    // if (posOrders[order].order.id_wkpos_session == idWkPosSession) {
                    empty = false;
                    if (selectOrder) {
                        selectOrder = false;
                        self.loadOrderedDetails({ idOrder: posOrders[order]['order']['id_order'] })
                    }
                    return new Order(posOrders[order]['order']);
                    // }
                });
                self.emptyOrders(empty);
                loadOrderPanel(mappedTasks);
                // self.orderDetails(mappedTasks);
            }
        }
        listenForScrollEvent();
        self.callPosResize();
    }

    /* Add new Address */
    self.onSubmit = function () {
        var errors = self.validateAddressForm();
        if (errors == undefined || errors.length == 0) {
            var data = {
                ajax: true,
                action: 'addNewAddress',
                first_name: self.firstName(),
                last_name: self.lastName(),
                customer_email: self.customerEmail(),
                alias: self.aliasName(),
                address1: self.address1(),
                address2: self.address2(),
                company: self.company(),
                vat_number: self.vatNumber(),
                postcode: self.postcode(),
                home_phone: self.homePhone(),
                phone: self.phone(),
                other: self.other(),
                id_country: self.selectedIdCountry(),
                id_state: self.selectedIdState(),
                city: self.city(),
                posToken: posToken,
            };
            if (self.customerPanel() != "addaddress"
                && self.selectedIdAddress() != undefined
                && self.selectedIdAddress() != 0
            ) {
                data['id_address'] = self.selectedIdAddress();
            }
            if (posViewModel.navigatorOnline()) {
                $.ajax({
                    url: posSales,
                    dataType: 'json',
                    type: 'POST',
                    data: data,
                    success: function (response) {
                        if (response.hasError) {
                            $.each(response.errors, function (index, error) {
                                showErrorMsg(error);
                                // $.growl.error({ title: "", message: error });
                            })
                        } else {
                            $.each(customers, function (key, customer) {
                                if (customer["id_customer"] == self.idCustomer()) {
                                    customers[key]['addresses'] = response.addresses;
                                    return true;
                                }
                            });
                            showSuccessMsg(response.success);
                            posViewModel.bodyPanel('customers');
                            // $.growl.notice({ title: "", message: response.success });
                        }
                    },
                    error: function (jqXHR, exception) {
                        ajaxResposeError(jqXHR, exception);
                    }
                });
            } else {
                // showErrorMsg(networkError);
                // $.growl.error({ title: "", message: networkError });
            }
        } else {
            $.each(errors, function (index, error) {
                showErrorMsg(error);
                // $.growl.error({ title: "", message: error });
            });
        }
    }

    self.customerPassword = ko.observable('');
    self.days = ko.observableArray([0]);
    self.months = ko.observableArray([0]);
    self.years = ko.observableArray([0]);
    self.newsLetter = ko.observable(false);
    self.selectedTitle = ko.observable();

    /* Add Customer */
    self.addCustomer = function () {
        var customerEmail = self.customerEmail();
        var customerLastName = self.lastName();
        var customerFirstName = self.firstName();
        var customerPasswd = self.customerPassword();
        var customerPhone = self.customerPhone();

        var hasError = false;

        if (!validate_isName(customerFirstName)) {
            showErrorMsg(invalidFirstName);
            // $.growl.error({ title: "", message: invalidFirstName });
            hasError = true;
        }
        if (!validate_isName(customerLastName)) {
            showErrorMsg(invalidLastName);
            // $.growl.error({ title: "", message: invalidLastName });
            hasError = true;
        }
        if (!validate_isEmail(customerEmail)) {
            showErrorMsg(invalidEmail);
            // $.growl.error({ title: "", message: invalidEmail });
            hasError = true;
        }
        if (customerPasswd != ''
            && customerPasswd != ' '
            && !validate_isPasswd(customerPasswd)
        ) {
            showErrorMsg(invalidPasswd);
            // $.growl.error({ title: "", message: invalidPasswd });
            hasError = true;
        }
        if (customerPhone != ''
            && !validate_isPhoneNumber(customerPhone)
        ) {
            showErrorMsg(invalidPhone);
            hasError = true;
        }

        if (!hasError) {
            if (posViewModel.navigatorOnline()) {
                var birthday = (self.years())[0] + '-';
                if ((self.months())[0] < 0) {
                    birthday += '0' + (self.months())[0] + '-';
                } else {
                    birthday += (self.months())[0] + '-';
                }
                if ((self.days())[0] < 0) {
                    birthday += '0' + (self.days())[0];
                } else {
                    birthday += (self.days())[0];
                }
                var data = {
                    ajax: true,
                    action: 'addNewCustomer',
                    first_name: customerFirstName,
                    last_name: customerLastName,
                    customer_email: customerEmail,
                    customer_passwd: customerPasswd,
                    birthday: birthday,
                    news_letter: self.newsLetter(),
                    groupAccess: self.groupAccess(),
                    defaultAccess: self.defaultGroup(),
                    title: self.selectedTitle(),
                    customer_phone: customerPhone,
                    posToken: posToken,
                };
                if (self.editIdCustomer() != undefined && self.editIdCustomer() != 0) {
                    data['id_customer'] = self.editIdCustomer();
                }

                $.ajax({
                    url: posSales,
                    dataType: 'json',
                    type: 'POST',
                    data: data,
                    success: function (response) {
                        if (response.hasError) {
                            $.each(response.errors, function (index, error) {
                                showErrorMsg(error);
                                // $.growl.error({ title: "", message: error });
                            });
                        } else {
                            if (response['edit']) {
                                customers[self.editCustomerIndex()] = response.customer;
                            } else {
                                if (customers == undefined) {
                                    customers = [];
                                }
                                customers[response.customer.id_customer] = response.customer;
                                self.customerName(response.customer.name);
                                self.customerEmail(response.customer.email);
                                self.idCustomer(response.customer.id_customer);
                                self.editIdCustomer(response.customer.id_customer);
                                self.activeCustomerId(response.customer.id_customer);
                                self.customerHeading(editCustomerHeading);
                                self.customerPassword('');
                            }
                            self.issetCustomer(0);
                            showSuccessMsg(response.success);
                            // $.growl.notice({ title: "", message: response.success });
                        }
                    },
                    error: function (jqXHR, exception) {
                        ajaxResposeError(jqXHR, exception);
                    }
                });
            } else {
                // showErrorMsg(networkError);
                // $.growl.error({ title: "", message: networkError });
            }
        }

    }

    function customerGroup(group) {
        var self = this;
        this.idGroup = parseInt(group.id_group);
        this.groupName = group.name;
    }

    function stateList(state) {
        this.stateName = state.name;
        this.idState = state.id_state;
    }

    var selectedZipFormat, selectedIsoCode;

    /* Get all the states of the selected country in address tab */
    self.getStates = function (data) {
        var idCountry = document.getElementById('id_country').value;
        selectedZipFormat = $('#id_country').find('option:selected').attr("data-zip-format");
        selectedIsoCode = $('#id_country').find('option:selected').attr("data-iso-code");
        self.selectedIdCountry(idCountry);
        if (idCountry != 0) {
            if (posViewModel.navigatorOnline()) {
                $.getJSON(
                    posSales,
                    {
                        action: 'getStates',
                        ajax: true,
                        'id_country': idCountry,
                        posToken: posToken
                    },
                    function (response) {
                        if (response.hasError) {
                            $.each(response.errors, function (index, error) {
                                showErrorMsg(error);
                                // $.growl.error({ title: "", message: error });
                            });
                        } else {
                            if (typeof response.states != 'undefined') {
                                var mappedTasks = $.map(response.states, function (state, index) {
                                    return new stateList(state);
                                });
                                self.stateList(mappedTasks);
                            } else {
                                self.stateList([]);
                            }
                        }
                    }
                );
            } else {
                // showErrorMsg(networkError);
                // $.growl.error({ title: "", message: networkError });
            }
        }
    }

    /* Validate the address details */
    self.validateAddressForm = function () {
        var errors = [];
        var i = 0;
        if (self.address1() == undefined) {
            errors[i++] = requireAddress1;
        } else {
            validate_isAddress(self.address1()) ? '' : errors[i++] = invalidAddress1;
        }
        if (self.address2() != '') {
            validate_isAddress(self.address2()) ? '' : errors[i++] = invalidAddress2;
        }
        if (selectedZipFormat != undefined && self.postcode() == undefined) {
            errors[i++] = requireZipCode;
        } else {
            validate_isPostCode(self.postcode(), selectedZipFormat, selectedIsoCode) ? '' : errors[i++] = invalidPostCode;
        }

        if (self.city() == '') {
            errors[i++] = requireCityName;
        } else {
            validate_isCityName(self.city()) ? '' : errors[i++] = invalidCityName;
        }
        if (self.selectedIdCountry() == 0) {
            errors[i++] = requireCountry;
        }

        if (self.phone() != '') {
            validate_isPhoneNumber(self.phone()) ? '' : errors[i++] = invalidPhone;
        }

        if (self.homePhone() != '') {
            validate_isPhoneNumber(self.homePhone()) ? '' : errors[i++] = invalidHomePhone;
        }


        if (self.firstName() != '') {
            validate_isName(self.firstName()) ? '' : errors[i++] = invalidFirstName;
        }


        if (self.lastName() != '') {
            validate_isName(self.lastName()) ? '' : errors[i++] = invalidLastName;
        }


        if (self.company() != '') {
            validate_isGenericName(self.company()) ? '' : errors[i++] = invalidCompanyName;
        }

        if (self.aliasName() == undefined) {
            errors[i++] = requireAliasName;
        } else {
            validate_isGenericName(self.aliasName()) ? '' : errors[i++] = invalidAliasName;
        }
        return errors;
    }

    /* Update the selected carrier details */
    self.selectCarrier = function (data, event) {
        self.selectedIdCarrier(data.idCarrier);
        self.selectedCarrierName(data.carrierName);
        self.selectedIdCarrierCost(data.shippingCost);
    }

    /* Create new handler on click of enter */
    ko.bindingHandlers.executeOnEnter = {
        init: function (element, valueAccessor, allBindings, viewModel) {
            var callback = valueAccessor();
            $(element).keypress(function (event) {
                var keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 13) {
                    callback.call(viewModel);
                    return false;
                }
                return true;
            });
        }
    };
}

/* Mapping of shipping details */
function ShippingDetails(carrier) {
    var self = this;
    this.idCarrier = carrier.idCarrier;
    this.idReference = carrier.idReference;
    this.shippingCost = carrier.shippingCost;
    this.displayShippingCost = carrier.displayShippingCost;
    this.carrierName = carrier.name;
}
