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

// import { loadSession, updateSessionStatus } from './session.js';
// import { showErrorMsg }  from './wkgrowlmsg.js';
// import { OrderTransaction }  from './wkordertransaction.js';
// import { asyncComputed, wkFormatCurrency, makeTotalProductCaculation } from './wkformatcurrency.js';

// var key;
// var posSession;

// $(document).ready(function () {
//     key = 'wkpos_outlet_session_'+idEmployee+'_'+idWkPosOutlet;

//     $(window).trigger('resize');
//     // navigator.onLine = false;
//     // wkposHeaderApplyBinding();
// });
// // function wkposHeaderApplyBinding() {
// //     viewModel = new PosHeaderViewModel();
// //     ko.applyBindings(
// //         viewModel,
// //         document.getElementById("wkpos-header")
// //     );
// // }

// function set_cookie(name, value) {
//     document.cookie = name +'='+ value +'; Path=/;';
// }
// function delete_cookie(name) {
//     document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// }
// function getCookie(name) {
//     var value = "; " + document.cookie;
//     var parts = value.split("; " + name + "=");
//     if (parts.length == 2) return parts.pop().split(";").shift();
// }

// function clearLocalStorage() {
//     if (localStorage.pos_cart != undefined) {
//         localStorage.removeItem('pos_cart');
//     }
//     if (localStorage.pos_orders != undefined) {
//         localStorage.removeItem('pos_orders');
//     }
//     if (localStorage.pos_products != undefined) {
//         localStorage.removeItem('pos_products');
//     }
//     if (localStorage.currentCartId != undefined) {
//         localStorage.removeItem('currentCartId');
//     }
//     if (localStorage.selectedCartId != undefined) {
//         localStorage.removeItem('selectedCartId');
//     }
// }

// export function PosSessionViewModel(PosModel) {
//     var self = this;
//     self.controlTransactions = ko.observableArray([]);
//     self.orderedTransactions = ko.observableArray([]);
//     self.emptyOrderedTransactions = ko.computed(function () {
//         return self.orderedTransactions().length == 0;
//     }, this);
//     self.sessionDate = ko.observable('');
//     self.sessionId = ko.observable(idWkPosSession);
//     self.sessionOpeningBal = ko.observable(0);
//     self.sessionTransaction = ko.observable(0);
//     self.displaySessionTransaction = asyncComputed(function () {
//         return wkFormatCurrency(self.sessionTransaction(), currencyFormat);
//     }, this);
//     self.sessionClosingBal = ko.observable(0);
//     self.displaySessionClosingBal = asyncComputed(function () {
//         return wkFormatCurrency(self.sessionClosingBal(), currencyFormat);
//     }, this);
//     self.displaySessionOpeningBal = asyncComputed(function () {
//         return wkFormatCurrency(self.sessionOpeningBal(), currencyFormat);
//     }, this);
//     self.sessionOpeningDate = ko.observable('');
//     self.idControlPanel = ko.observable(idControlPanel);
//     self.transactionType = ko.observable();
//     self.transactionAmount = ko.observable(0);
//     self.transactionReason = ko.observable('');

//     self.transactionHeading = ko.observable('');
//     self.transactionDescription = ko.observable('');

//     PosModel.call(self);
//     // self.openSession = async function() {
//     //     set_cookie(key, idWkPosOutlet);
//     //     posViewModel.sessionStatus(1);
//     //     loadSession();
//     //     // window.location.href = posSales;
//     // }


//     self.theoriticalClosingBal = ko.computed(function () {
//         var totalPrice = parseFloat(self.sessionOpeningBal()) + parseFloat(self.sessionTransaction());
//         totalPrice = makeTotalProductCaculation(parseFloat(totalPrice));
//         return parseFloat(totalPrice);
//     }, this);

//     self.difference = ko.computed(function () {
//         var totalPrice = parseFloat(self.sessionClosingBal()) - parseFloat(self.theoriticalClosingBal());
//         totalPrice = makeTotalProductCaculation(parseFloat(totalPrice));
//         return parseFloat(totalPrice);
//     }, this);
//     self.displayDifference = asyncComputed(function () {
//         var totalPrice = parseFloat(self.sessionClosingBal()) - parseFloat(self.theoriticalClosingBal());
//         return wkFormatCurrency(totalPrice, currencyFormat);
//     }, this);

//     var confirmCloseTimeout = 'undefined';
//     self.closeSession = async function() {
//         var posOrder = $.parseJSON(localStorage.pos_orders);
//         if (typeof posOrder != 'undefined' && posOrder && Object.keys(posOrder).length) {
//             showErrorMsg(orderSyncBeforeClose);
//         } else {
//             if (posViewModel.confirmClose() == 0) {
//                 posViewModel.confirmClose(1);
//                 if (typeof confirmCloseTimeout != 'undefined') {
//                     clearTimeout(confirmCloseTimeout);
//                 }
//                 confirmCloseTimeout = setTimeout(function() {
//                     posViewModel.confirmClose(0);
//                 }, 4000);
//             } else {
//                 clearTimeout(confirmCloseTimeout);
//                 delete_cookie(key);
//                 window.location.href = posSessionLink;
//             }
//         }
//     }

//     self.updateControlTransactions = async function() {
//         var data = {
//             action: 'getControlTransactions',
//             id_wkpos_control_panel: self.idControlPanel()
//         };
//         var sessionDetails = await updateSessionStatus(data);
//         var mappedTransactions = $.map(sessionDetails['controlTransaction'],
//             function (item) {
//                 if (item.type == !posViewModel.sessionStatus()) {
//                     return new CashControl(item);
//                 }
//             }
//         );
//         self.controlTransactions(mappedTransactions);
//     }

//     self.updateSessionOrderTransactions = async function() {
//         var data = {
//             action: 'getSessionOrderTransactions',
//             id_wkpos_session: self.sessionId()
//         };
//         var sessionDetails = await updateSessionStatus(data);
//         var mappedTransactions = $.map(sessionDetails['transactions'],
//             function (item) {
//                 return new OrderTransaction(item, sessionDetails['type']);
//                 // if (item.type == !posViewModel.sessionStatus()) {
//                 //     return new CashControl(item);
//                 // }
//             }
//         );
//         self.orderedTransactions(mappedTransactions);
//     }

//     function updateSessionDetails(sessionDetails)
//     {
//         if (sessionDetails) {
//             posViewModel.newSessionStatus(1);
//             if (typeof sessionDetails['sessionDetails'] != 'undefined' && sessionDetails['sessionDetails']) {
//                 idWkPosSession = sessionDetails['sessionDetails'].id_wkpos_session;
//                 self.sessionOpeningDate(sessionDetails['sessionDetails']['date_add']);
//             }
//             if (typeof sessionDetails['transactions'] != 'undefined' && sessionDetails['transactions']) {
//                 self.updateSessionTransaction(sessionDetails['transactions'])
//             }
//             if (typeof sessionDetails['controlTransaction'] != 'undefined' && sessionDetails) {
//                 self.updateOpeningAndClosingBal(sessionDetails['controlTransaction']);
//                 // var totalOpeningBalance = 0.0;
//                 // var totalClosingBalance = 0.0;
//                 // $.each(sessionDetails['controlTransaction'], function(index, item) {
//                 //     var subTotal = parseFloat(item.amount_value) * parseInt(item.quantity);
//                 //     if (item.type == 1) {
//                 //         totalOpeningBalance += subTotal;
//                 //     } else {
//                 //         totalClosingBalance += subTotal;
//                 //     }
//                 // });
//                 // self.sessionOpeningBal(totalOpeningBalance);
//                 // self.sessionClosingBal(totalClosingBalance);
//             }
//             if (typeof sessionDetails.control != 'undefined') {
//                 self.idControlPanel(sessionDetails.control.id_wkpos_control_panel);
//                 self.sessionDate(sessionDetails.control.date_add);
//                 self.sessionId(sessionDetails.control.id_wkpos_control_panel);
//             }
//         }
//     }

//     self.newSession = async function() {
//         var data = {
//             action: 'newSession'
//         }
//         var sessionDetails = await updateSessionStatus(data);
//         updateSessionDetails(sessionDetails);
//         var clearStorage = true;
//         if (clearStorage) {
//             clearLocalStorage();
//         }
//         // loadSession();
//         // window.location.href = posSales;
//     }

//     self.resumeSession = function() {
//         set_cookie(key, idWkPosOutlet);
//         window.location.href = posSales;
//     }

//     self.updateOpeningAndClosingBal = function(transactions) {
//         var totalOpeningBalance = 0.0;
//         var totalClosingBalance = 0.0;
//         if (typeof transactions != 'undefined' && transactions.length > 0) {
//             var subTotal = 0;
//             $.each(transactions, function(index, item) {
//                 subTotal = parseFloat(item.amount_value) * parseInt(item.quantity);
//                 if (item.type == 1) {
//                     totalOpeningBalance += subTotal;
//                 } else {
//                     totalClosingBalance += subTotal;
//                 }
//             });
//         }
//         totalOpeningBalance = makeTotalProductCaculation(parseFloat(totalOpeningBalance));
//         totalClosingBalance = makeTotalProductCaculation(parseFloat(totalClosingBalance));
//         self.sessionOpeningBal(parseFloat(totalOpeningBalance));
//         self.sessionClosingBal(parseFloat(totalClosingBalance));
//     }

//     self.updateControl = async function() {
//         if (self.controlTransactions().length > 0) {
//             var type = 0;
//             if (posViewModel.sessionStatus() == 0) {
//                 type = 1;
//             }
//             var data = {
//                 action: 'updateControlPanel',
//                 control_panel: self.controlTransactions(),
//                 id_wkpos_control_panel: self.idControlPanel(),
//                 type: type
//             };
//             var sessionDetails = await updateSessionStatus(data);
//             self.updateOpeningAndClosingBal(sessionDetails.controlTransaction);
//         }
//         $(document).find('#wk-pos-cash-control').modal('toggle');
//         // updateSessionDetails(sessionDetails);
//     }

//     self.openSession = async function() {
//         var data = {
//             action: 'openSession',
//             id_wkpos_control_panel: self.idControlPanel()
//         }
//         var sessionDetails = await updateSessionStatus(data);
//         set_cookie(key, idWkPosOutlet);
//         posViewModel.sessionStatus(1);
//         self.sessionClosingBal(0);
//         self.sessionTransaction(0);
//         self.sessionOpeningDate(sessionDetails.sessionDetails.date_add);
//         updateSessionDetails(sessionDetails);
//         // loadSession();
//         // window.location.href = posSales;
//     }

//     self.posSessionActions = function() {
//         $('.card-actions.cart-action-position').toggle();
//     }

//     self.completeSession = async function() {
//         var posOrder = $.parseJSON(localStorage.pos_orders);
//         if (typeof posOrder != 'undefined' && posOrder && Object.keys(posOrder).length) {
//             showErrorMsg(orderSyncBeforeClose);
//         } else {
//             if (validateSession && self.difference() != 0) {
//                 showErrorMsg(transactionMismatchMsg);
//             } else {
//                 var data = {
//                     action: 'closeSession',
//                     id_wkpos_session: idWkPosSession
//                 }
//                 var sessionDetails = await updateSessionStatus(data);
//                 delete_cookie(key);
//                 posViewModel.sessionStatus(0);
//                 self.controlSession(0);
//                 posViewModel.newSessionStatus(0);
//                 self.sessionOpeningDate('');
//             }
//         }
//     }

//     self.addNewControlRow = function() {
//         self.controlTransactions.push(new CashControl(null));
//     }

//     self.viewSession = async function() {
//         var data = {
//             action: 'viewSession'
//         }
//         var sessionDetails = await updateSessionStatus(data);
//         updateSessionDetails(sessionDetails);
//     }
//     self.viewOrders = function() {
//     }
//     self.removeTransaction = async function(transaction) {
//         var data = {
//             action: 'removeTransaction',
//             id_wkpos_session: idWkPosSession,
//             id_wkpos_cash_control: transaction.id_wkpos_cash_control
//         }
//         var response = await updateSessionStatus(data);
//         if (typeof response != 'undefined' && !response['hasError']) {
//             self.controlTransactions.remove(transaction);
//         }
//     }

//     self.viewSessionDetails = async function() {
//         var data = {
//             action: 'getSessionDetails',
//             id_wkpos_session: idWkPosSession,
//             id_wkpos_control_panel: self.idControlPanel()
//         };
//         var sessionDetails = await updateSessionStatus(data);
//         updateSessionDetails(sessionDetails);
//     }

//     // self.updateTransaction = async function() {
//     //     var errors = [];
//     //     var key = 0;
//     //     if (self.transactionReason() == '') {
//     //         errors[key++] = invalidReasonLabel;
//     //     }
//     //     var value = self.transactionAmount();
//     //     var valid = !/^\s*$/.test(value) && !isNaN(value);
//     //     if (!valid) {
//     //         errors[key++] = invalidReasonAmount;
//     //     }
//     //     if (errors.length > 0) {
//     //         $.each(errors, function (index, error) {
//     //             showErrorMsg(error);
//     //         });
//     //     } else {
//     //         var type = 0;
//     //         if (self.transactionType() == 1) {
//     //             type = 1;
//     //         }
//     //         var data = {
//     //             action: 'updateTransaction',
//     //             id_wkpos_session: idWkPosSession,
//     //             reason: self.transactionReason(),
//     //             amount: self.transactionAmount(),
//     //             type: type,
//     //         }
//     //         var sessionDetails = await updateSessionStatus(data);
//     //         var posSessionTransactionAmount = self.sessionTransaction();;
//     //         if (self.transactionType() == 1) {
//     //             posSessionTransactionAmount += self.transactionAmount();
//     //         } else {
//     //             posSessionTransactionAmount -= self.transactionAmount();
//     //         }
//     //         self.sessionTransaction(parseFloat(posSessionTransactionAmount));
//     //         self.transactionReason('');
//     //         self.transactionAmount(0);
//     //         self.transactionType(0);
//     //         $(document).find('#wk-pos-session-modal').modal('toggle');
//     //     }
//     // }

//     // self.updateTransactionEvent = async function(data) {
//     //     self.transactionType(parseInt(data));
//     //     if (data == 1) {
//     //         self.transactionHeading(moneyInHeading);
//     //         self.transactionDescription(moneyInDesc)
//     //     } else {
//     //         self.transactionHeading(moneyOutHeading);
//     //         self.transactionDescription(moneyOutDesc);
//     //     }
//     // }

//     self.updateSessionTransaction = function(transactions) {
//         if (typeof transactions != 'undefined' && transactions) {
//             var amount = 0;
//             $.each(transactions, function(index, transaction) {
//                 if (transaction.type == 1) {
//                     amount += parseFloat(transaction.amount);
//                 } else {
//                     amount -= parseFloat(transaction.amount);
//                 }
//             });
//             amount = makeTotalProductCaculation(parseFloat(amount));
//             amount = amount;
//             self.sessionTransaction(amount);
//         }
//     }

//     self.totalTransactionAmount = ko.computed(function () {
//         var totalPrice = 0;
//         var controlTransactions = self.controlTransactions();
//         for (var i = 0; i < controlTransactions.length; i++) {
//             totalPrice = parseFloat(totalPrice) + parseFloat(controlTransactions[i].subtotal());
//         }
//         totalPrice = makeTotalProductCaculation(parseFloat(totalPrice));

//         return parseFloat(totalPrice);
//     }, this);
// }

// function CashControl(data) {
//     var self = this;
//     if (data == null) {
//         self.id_wkpos_cash_control = 0;
//         self.amount_value = ko.observable(0);
//         self.quantity = ko.observable(0);
//     } else {
//         self.id_wkpos_cash_control = data.id_wkpos_cash_control;
//         data.amount_value = makeTotalProductCaculation(parseFloat(data.amount_value));
//         var amount = parseFloat(data.amount_value);
//         self.amount_value = ko.observable(amount);
//         self.quantity = ko.observable(data.quantity);
//     }
//     self.subtotal = ko.computed(function () {
//         var totalPrice = self.amount_value() * self.quantity();
//         totalPrice = makeTotalProductCaculation(parseFloat(totalPrice));
//         return parseFloat(totalPrice);
//     }, this);
// }
