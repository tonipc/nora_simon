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

import { cashRegisterRequest, OrderedCashMovement, getTotalCashMovement, PosUser }  from './cashTransactions';
import { wkFormatCurrency, asyncComputed }  from '../../../wkpos/views/js/app/js/wkformatcurrency.js';
import { showSuccessMsg } from '../../../wkpos/views/js/app/js/wkgrowlmsg';

export function set_cookie(name, value) {
    document.cookie = name +'='+ value +'; Path=/;';
}

export function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

export function PosCashRegisterViewModel(PosModel) {
    var self = this;
    self.idUser = ko.observable();
    self.username = ko.observable();
    self.openCashRegister = ko.observable(false);
    self.idRegister = ko.observable();
    self.openingAmount = ko.observable(0);
    self.displayOpeningAmount = asyncComputed(function () {
        return wkFormatCurrency(parseFloat(this.openingAmount()), currencyFormat);
    }, this);
    self.openingNotes = ko.observable();
    self.openingDate = ko.observable();
    self.openingUser = ko.observable();
    self.openingSalesman = ko.observable();

    self.transactionHeading = ko.observable('');
    self.transactionReason = ko.observable('');
    self.transactionType = ko.observable();
    self.transactionAmount = ko.observable();
    self.enableClosingBalance = ko.observable(false);

    self.cashTransactions = ko.observableArray([]);
    self.paymentDetails = ko.observableArray([]);
    self.orderedMovement = ko.observableArray([]);
    self.users = ko.observableArray([]);

    PosModel.call(self);

    /*
    Type: 1 - Opened
    */
    self.updateCashregisterStatus = function(type, rightColumnPage) {
        if (type == 1) {
            self.openCashRegister(true);
        } else {
            self.openCashRegister(false);
        }
        posViewModel.rightColumnPage(rightColumnPage);
    }

    self.configureRegisterData = function(register)
    {
        if (register.id_wkpos_register == 0
            || typeof register.id_wkpos_register == 'undefined'
            || typeof register.id_wkpos_register == ''
            || typeof register.id_wkpos_register == ' '
        ) {
            posViewModel.displayCurrency(true);
        } else {
            posViewModel.displayCurrency(false);
        }
        self.idRegister(register.id_wkpos_register);
        self.openingAmount(register.amount);
        self.openingNotes(register.note);
        self.openingDate(register.opening_date);
        self.openingUser(register.id_employee);
        self.openingSalesman(register.salesperson);
    }

    self.resetRegisterData = function()
    {
        posViewModel.displayCurrency(true);
        self.idRegister('');
        self.openingAmount(0);
        self.openingNotes('');
        self.openingDate('');
        self.openingUser('');
        self.openingSalesman('');
    }

    self.open = async function(data, event) {
        var transactionData = {
            id_wkpos_register: '',
            amount: self.openingAmount(),
            note: self.openingNotes(),
            'action': 'openCashRegister'
        }
        var response = await cashRegisterRequest(transactionData);
        if (response.hasError == false) {
            if (typeof response.register != 'undefined') {
                self.configureRegisterData(response.register);
                self.updateCashregisterStatus(1, 'pos_cart');
            }
        }
    }

    self.close = async function(data, event) {
        var total = 0;
        $.each(self.paymentDetails(), function(index, payment) {
            total += parseFloat(payment.difference());
        });
        var confirmClose = true;
        if (total > 0) {
            confirmClose = confirm(cashRegisterCloseWarning);
        }
        if (confirmClose) {
            var transactionData = {
                id_wkpos_register: self.idRegister(),
                'action': 'closeCashRegister'
            }
            var response = await cashRegisterRequest(transactionData);
            if (response.hasError == false) {
                showSuccessMsg(response.msg);
                self.resetRegisterData();
                self.updateCashregisterStatus(0, 'pos_cash_register');
                posViewModel.bodyPanel('products');
                delete_cookie('wkpos_user_'+idWkPosOutlet);
                $(document).find('#button-home').trigger('click');
            }
        }
    }

    self.changeClosingBalanceStatus = function(status) {
        self.enableClosingBalance(status);
    }

    self.onClosingBalance = function() {
        self.changeClosingBalanceStatus(true);
    }

    self.openClosePanel = function(data, event) {
        var closingStatus = self.enableClosingBalance()
        self.enableClosingBalance(!closingStatus);
    }

    self.updateTransactionEvent = function(heading, type) {
        self.transactionType(type);
        self.transactionHeading(heading);
        self.changeClosingBalanceStatus(false);
    }

    self.updateCashTransaction = function(cashTransactions) {
        var paymentDetails = posViewModel.cashRegister.paymentDetails();
        var totalCashMovement = 0;
        $.each(paymentDetails, function(index, payment) {
            totalCashMovement = 0;
            $.each(cashTransactions, function(cashIndex, transaction) {
                if (transaction.id_wkpos_payment == payment.idWkPosPayment) {
                    if (transaction.type == 2 || transaction.type == 1) {
                        totalCashMovement += parseFloat(transaction.amount);
                    } else if (transaction.type == 3) {
                        totalCashMovement -= parseFloat(transaction.amount);
                    }
                }
            });
            payment.totalCashMovement(totalCashMovement);
        })
    }

    self.updateTransaction = async function(data) {
        var transactionData = {
            id_wkpos_register: self.idRegister(),
            note: self.transactionReason(),
            amount: self.transactionAmount(),
            type: self.transactionType(),
            'action': 'addCashMovement'
        };
        var response = await cashRegisterRequest(transactionData);
        if (response.hasError == false) {
            showSuccessMsg(response.msg);
            self.transactionReason('');
            self.transactionAmount('');
            self.updateCashTransaction(response.cashMovement);
            $('#wkpos_cash_transactions').modal('toggle');
        }
    }

    self.totalCashMovement = asyncComputed(function() {
        var total = 0;
        $.each(self.paymentDetails(), function(index, payment) {
            total += parseFloat(payment.totalCashMovement());
        });
        return wkFormatCurrency(parseFloat(total), currencyFormat);
    }, this);

    self.totalTransactionSubtotal = asyncComputed(function() {
        var total = 0;
        $.each(self.paymentDetails(), function(index, payment) {
            total += parseFloat(payment.transactionTotal());
        });
        return wkFormatCurrency(parseFloat(total), currencyFormat);
    }, this);

    self.totalClosingBal = asyncComputed(function() {
        var total = 0;
        $.each(self.paymentDetails(), function(index, payment) {
            if (isNaN(payment.closingBalance()) || payment.closingBalance() == '') {
                total += 0;
            } else {
                total += parseFloat(payment.closingBalance());
            }
        });
        return wkFormatCurrency(parseFloat(total), currencyFormat);
    }, this);

    self.totalDifference = asyncComputed(function() {
        var total = 0;
        $.each(self.paymentDetails(), function(index, payment) {
            total += parseFloat(payment.difference());
        });
        return wkFormatCurrency(parseFloat(total), currencyFormat);
    }, this);

    self.updateOrderTransactions = async function(data) {
        if (self.enableClosingBalance() == false) {
            var transactionData = {
                id_wkpos_register: self.idRegister(),
                id_wkpos_payment: data.idWkPosPayment,
                'action': 'getOrderMovement'
            };
            var response = await cashRegisterRequest(transactionData);
            var mappedTransactions = $.map(response.paymentDetails, function(payment) {
                if (payment.type != 4) {
                    return new OrderedCashMovement(payment);
                }
            });
            self.orderedMovement(mappedTransactions);
            $('#wkpos_order_movement').modal('toggle');
        }
    }

    self.closeRegister = async function(data) {
        var paymentDetails = self.paymentDetails();
        var paymentData = {};
        $.each(paymentDetails, function(index, payment) {
            if (paymentData[payment.idWkPosPayment] != 'undefined') {
                paymentData[payment.idWkPosPayment] = {};
            }
            paymentData[payment.idWkPosPayment]['amount'] = payment.closingBalance();
            paymentData[payment.idWkPosPayment]['id_wkpos_payment'] = payment.idWkPosPayment;
        });
        var transactionData = {
            id_wkpos_register: self.idRegister(),
            'paymentDetails': paymentData,
            'action': 'saveClosingBalance'
        };
        var response = await cashRegisterRequest(transactionData);
        if (response.hasError == false) {
            showSuccessMsg(response.msg);
            self.updateCashTransaction(response.cashMovement);
            self.changeClosingBalanceStatus(false);
        }
    }

    self.changeUser = function(user) {
        posViewModel.cashierName(user.name);
        posViewModel.cashRegister.idUser(user.id_wkpos_user);
        set_cookie('wkpos_user_'+idWkPosOutlet, user.id_wkpos_user);
    }

    self.mapPosUsers = function(users) {
        var posUsers = $.map(users, function(user) {
            return new PosUser(user);
        });
        self.users(posUsers);
    }

    self.downloadPdf = async function(data, event) {
        posPdfDownloadLink += `&id_wkpos_register=${self.idRegister()}`;
        window.open(posPdfDownloadLink, '_blank');
    }
}
