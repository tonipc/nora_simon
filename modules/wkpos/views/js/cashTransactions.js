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

import { showErrorMsg }  from '../../../wkpos/views/js/app/js/wkgrowlmsg.js';
import { ajaxResposeError }  from '../../../wkpos/views/js/app/js/wkajaxresponseerror.js';
import { wkFormatCurrency, asyncComputed }  from '../../../wkpos/views/js/app/js/wkformatcurrency.js';
/* Mapping of customer details */
export function CashTransactionsModel(transaction) {
    var self = this;
    this.date = transaction.date;
    this.employee = transaction.employee;
    this.reason = transaction.reason;
    this.amount = transaction.amount;
    this.displayAmount = asyncComputed(function () {
        return wkFormatCurrency(parseFloat(this.amount), currencyFormat);
    }, this);
    this.id_currency = transaction.id_currency;
}


export function PaymentDetails(payment, index)
{
    var self = this;
    this.name = payment.name;
    this.index = index;
    this.totalCashMovement = ko.observable(payment.totalCashMovement);
    this.idWkPosPayment = payment.id_wkpos_payment;
    this.transactionTotal = ko.observable(payment.transactionTotal);
    this.closingBalance = ko.observable(payment.closingBalance);
    this.openingBalance =  ko.observable(payment.openingBalance);

    this.difference = ko.computed(function() {
        return (self.totalCashMovement() + this.transactionTotal()) -self.closingBalance();
    }, this);
    this.displayDifference = asyncComputed(function () {
        return wkFormatCurrency(parseFloat(this.difference()), currencyFormat);
    }, this);
    this.displayTotalCashMovement = asyncComputed(function () {
        return wkFormatCurrency(parseFloat(this.totalCashMovement()), currencyFormat);
    }, this);
    this.displayTransactionTotal = asyncComputed(function () {
        return wkFormatCurrency(parseFloat(this.transactionTotal()), currencyFormat);
    }, this);
    this.displayClosingBalance = asyncComputed(function () {
        return wkFormatCurrency(parseFloat(this.closingBalance()), currencyFormat);
    }, this);
    this.displayOpeningBalance = asyncComputed(function () {
        return wkFormatCurrency(parseFloat(this.openingBalance()), currencyFormat);
    }, this);
}


export function cashRegisterRequest(transactionData = {}) {
    transactionData.ajax = true;
    transactionData.posToken = posToken;
    $('.wk-loading-pos-details').removeClass('hide');
    $('.wk-loading-pos-details .wk-loading-status').html('');
    return new Promise(resolve => {
        $.ajax({
            url: posRegisterLink,
            dataType: 'json',
            type: 'get',
            data: transactionData,
            success: function (response) {
                $('.wk-loading-pos-details').addClass('hide');
                if (typeof transactionData.pdf == 'undefined' && response.hasError) {
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

export function OrderedCashMovement(transaction) {
    var self = this;
    this.reason = transaction.reason;
    this.amount = transaction.amount;
    this.displayAmount = asyncComputed(function () {
        return wkFormatCurrency(parseFloat(this.amount), currencyFormat);
    }, this);
    this.type = transaction.type;
    this.transactionDate = transaction.transaction_date;
}

export function getTransactionTotal(transaction) {
    return parseFloat(transaction.tendered) - parseFloat(transaction.change);
}

export function getTotalCashMovement(cashMovement) {
    var totalCashMovement = 0;
    $.each(cashMovement, function(index, cash) {
        if (cash.type == 2 || cash.type == 1) {
            totalCashMovement += parseFloat(cash.amount);
        } else if (cash.type == 3) {
            totalCashMovement -= parseFloat(cash.amount);
        }
    });
    return totalCashMovement;
}

export function getOpeningCashMovement(cashMovement, idWkPosPayment) {
    var openingBalance = 0;
    $.each(cashMovement, function(index, cash) {
        if (cash.id_wkpos_payment == idWkPosPayment) {
            if (cash.type == 1) {
                openingBalance += parseFloat(cash.amount);
            }
        }
    });
    return openingBalance;
}

export function getClosingCashMovement(cashMovement, idWkPosPayment) {
    var closingBalance = 0;
    $.each(cashMovement, function(index, cash) {
        if (cash.id_wkpos_payment == idWkPosPayment) {
            if (cash.type == 4) {
                closingBalance += parseFloat(cash.amount);
            }
        }
    });
    return closingBalance;
}

export function PosUser(user) {
    var self = this;
    self.id_wkpos_user = user.id_wkpos_user;
    self.name = user.name;
}
