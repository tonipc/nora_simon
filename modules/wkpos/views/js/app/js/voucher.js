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

import { getSelectedCustomerIndex } from './customer.js';
import { updateCartTotalAmount } from './poscart.js';
import { showSuccessMsg, showErrorMsg } from './wkgrowlmsg.js';
import { ajaxResposeError } from './wkajaxresponseerror.js';
import { wkFormatCurrency, asyncComputed } from './wkformatcurrency.js';

function Vouchers(data) {
    var self = this;
    this.idCartRule = data.id_cart_rule;
    this.rewardCode = data.code;
    this.rewardCodeName = data.name;
    this.rewardCodeAmount = data.value_real;
    // formatCurrencyCldr(parseFloat(data.value_real), function(price) {
    //     self.displayRewardAmount = price;
    // });
    self.displayRewardAmount = asyncComputed(function () {
        return wkFormatCurrency(parseFloat(data.value_real), currencyFormat);
    }, this);
    this.rewardCodePercent = data.reduction_percent;
}

export function updateVouchers(posCart, vouchers = false) {
    if (typeof posCart != 'undefined'
        && typeof posCart['others'] != 'undefined'
    ) {
        var selectedIndex = getSelectedCustomerIndex(viewModel.selectedCustomerId());
        if (selectedIndex != -1) {
            if (typeof cartVouchers != 'undefined' && cartVouchers) {
                // var selectedCustomer = customers[selectedIndex];
                // if (typeof selectedCustomer != 'undefined' && typeof selectedCustomer['vouchers'] != 'undefined' && selectedCustomer['vouchers']) {
                var mappedTasks = $.map(cartVouchers, function (item) {
                    if (item) {
                        if (typeof posCart['others']['reward_coupon'] == 'undefined') {
                            return new Vouchers(item);
                        }
                        var coupon = posCart['others']['reward_coupon'];
                        if ((Object.keys(coupon)).indexOf(item.id_cart_rule) == -1) {
                            return new Vouchers(item);
                        }
                    }
                });
                viewModel.availableVouchers(mappedTasks);
            }
        }
    } else {
        viewModel.appliedVouchers([]);
    }
}

export function appliedVouchers(appliedVouchers) {
    if (typeof appliedVouchers != 'undefined' && appliedVouchers) {
        var mappedTasks = $.map(appliedVouchers, function (item) {
            return new Vouchers(item);
        });
        viewModel.appliedVouchers(mappedTasks);
    } else {
        viewModel.appliedVouchers([]);
    }
}

export function removeAllVouchers(prevCustomerId) {
    var pos_cart = $.parseJSON(localStorage.pos_cart);
    var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
    if (typeof pos_cart[cartIndex]['others'] != 'undefined'
        && typeof pos_cart[cartIndex]['others']['reward_coupon'] != 'undefined'
        && pos_cart[cartIndex]['others']['reward_coupon'].length > 0
        && (prevCustomerId != viewModel.activeCustomerId() && prevCustomerId != 0)
    ) {
        idCart = pos_cart[cartIndex]['others']['id_cart'];
        idCartRules = pos_cart[cartIndex]['others']['reward_coupon'];
        idCustomer = pos_cart[cartIndex]['others']['customer']['idCustomer'];
        removePromoCode(idCart, idCartRules, idCustomer);
    }
}

export function updateVoucherCoupon(posCart, cartRules) {
    var rewardCoupon = {};
    $.each(cartRules, function (index, cartRule) {
        rewardCoupon[cartRule.id_cart_rule] = cartRule.value_real;
    });

    var pos_cart = $.parseJSON(localStorage.pos_cart);
    var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;

    posCart['others']['reward_coupon'] = rewardCoupon;
    pos_cart[cartIndex]['others']['reward_coupon'] = rewardCoupon;
    localStorage.pos_cart = JSON.stringify(pos_cart);
}

export function applyPromocode() {
    var idCartRule = $('#wk-voucher-applied-input').attr('data-id-cart-rule');
    var pos_cart = $.parseJSON(localStorage.pos_cart);
    var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
    if (typeof pos_cart[cartIndex] != 'undefined') {
        var idCart = pos_cart[cartIndex]['others']['id_cart'];
        var code = $('#wk-voucher-applied-input').val();
        var idCustomer = pos_cart[cartIndex]['others']['customer']['idCustomer'];
        $.ajax({
            url: orderUrl,
            dataType: 'json',
            type: 'POST',
            data: {
                'id_cart': idCart,
                'discount_name': code,
                'id_cart_rule': idCartRule,
                'idCustomer': idCustomer,
                ajax: true,
                action: 'applyPromoCode'
            },
            success: function (order) {
                if (order.hasError) {
                    $.each(order.errors, function (index, error) {
                        showErrorMsg(error);
                        // $.growl.error({ title: "", message: error });
                    });
                } else {
                    updateVoucherCoupon(pos_cart[cartIndex], order.appliedVoucher);
                    showSuccessMsg(order.success);
                    // $.growl.notice({ title: "", message: order.success });
                    $('#wk-voucher-applied-input').val('');
                    updateVouchers(pos_cart[cartIndex]);
                    appliedVouchers(order.appliedVoucher);
                    // viewModel.rewardAmount(getRewardTotalAmount(pos_cart[cartIndex], viewModel.total()));
                    updateCartTotalAmount(order.cartAmount);
                    // viewModel.totalOrderAmount(order.cartAmount - viewModel.orderDiscount());
                    removeRewardCoupon(pos_cart, idCartRule, cartIndex);
                }
            },
            error: function (jqXHR, exception) {
                ajaxResposeError(jqXHR, exception);
            }
        });
    }
}


export function removeRewardCoupon(posCart, idCartRule, cartIndex) {
    $.each(posCart, function (index, cart) {
        if (typeof cart != 'undefined'
            && typeof cart['others'] != 'undefined'
            && typeof cart['others']['reward_coupon'] != 'undefined'
            && index != cartIndex
        ) {
            var rewardCoupon = cart['others']['reward_coupon'];
            if (typeof rewardCoupon && Object.keys(rewardCoupon).length > 0) {
                var voucherIndex = parseInt(rewardCoupon.indexOf(idCartRule));
                rewardCoupon.splice(voucherIndex, 1);
                posCart[index]['others']['reward_coupon'] = rewardCoupon;
            }
        }
    });
    localStorage.pos_cart = JSON.stringify(posCart);
}

export function removePromoCode(code) {
    var pos_cart = $.parseJSON(localStorage.pos_cart);
    var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
    var idCart = pos_cart[cartIndex]['others']['id_cart'];
    var idCartRules = [code.idCartRule];
    var idCustomer = viewModel.activeCustomerId();
    $.ajax({
        url: orderUrl,
        dataType: 'json',
        type: 'POST',
        data: {
            'id_cart': idCart,
            'id_cart_rule': idCartRules,
            'idCustomer': idCustomer,
            ajax: true,
            action: 'removePromoCode'
        },
        success: function (order) {
            if (order.hasError) {
                $.each(order.errors, function (index, error) {
                    showErrorMsg(error);
                    // $.growl.error({ title: "", message: error });
                });
            } else {
                updateVoucherCoupon(pos_cart[cartIndex], order.appliedVoucher);
                showSuccessMsg(order.success);
                // $.growl.notice({ title: "", message: order.success });
                updateVouchers(pos_cart[cartIndex]);
                appliedVouchers(order.appliedVoucher);
                // self.rewardAmount(getRewardTotalAmount(pos_cart[cartIndex], self.total()));
                // self.totalOrderAmount(order.cartAmount);
                updateCartTotalAmount(order.cartAmount);
            }
        },
        error: function (jqXHR, exception) {
            ajaxResposeError(jqXHR, exception);
        }
    });
}
