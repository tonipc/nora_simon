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

import { showErrorMsg, showSuccessMsg }  from '../../../wkpos/views/js/app/js/wkgrowlmsg.js';
import { PaymentDetails, cashRegisterRequest, getTransactionTotal, getTotalCashMovement, getOpeningCashMovement, getClosingCashMovement }  from './cashTransactions.js';
import { PosCashRegisterViewModel, getCookie }  from './poscashregistermodel.js';

$(document).ready(function() {
    // wkpos.on('beforeBinding', function(event) {
    //     modelList['cashRegister'] = 'PosCashRegisterViewModel';
    // });
    wkpos.on('afterPosModel', function(event) {
        posViewModel.cashRegister = new PosCashRegisterViewModel(PosModel);
        if (typeof activeCashRegister != 'undefined' && activeCashRegister) {
            posViewModel.cashRegister.configureRegisterData(activeRegisterDetail);
            posViewModel.cashRegister.updateCashregisterStatus(1, 'pos_cart');
        } else {
            posViewModel.cashRegister.updateCashregisterStatus(0, 'pos_cash_register');
        }
        if (typeof posUsers != 'undefined') {
            posViewModel.cashRegister.mapPosUsers(posUsers);
            var selectedUser = getCookie('wkpos_user_'+idWkPosOutlet);
            if (typeof selectedUser != 'undefined') {
                posViewModel.cashRegister.changeUser(posUsers[selectedUser]);
            } else {
                posViewModel.cashRegister.changeUser(posUsers[salesmanUserId]);
            }
        }
    });
    wkpos.on('beforeAddProductToCart', function(params) {
        if (posViewModel.cashRegister.openCashRegister()) {
            posViewModel.errors([]) ;
        } else {
            posViewModel.errors([]) ;
            posViewModel.errors().push('Please open register first');
        }
    });
    wkpos.on('afterOnClickSidePanel', async function(params) {
        if (params.data.activeClass == "wkpos-cash-management") {
            /* getAllTransaction through ajax */
            var transactionData = {
                id_wkpos_register: posViewModel.cashRegister.idRegister(),
                'action': 'getRegisterDetails'
            };
            var response = await cashRegisterRequest(transactionData);
            if (response.hasError == false) {
                if (typeof response.paymentDetails != 'undefined' && response.paymentDetails) {
                    var mappedTransactions = $.map(response.paymentDetails, function (payment, index) {
                        /* Cash Payment */
                        var totalCashMovement = 0;
                        if (payment.id_wkpos_payment == 1) {
                            if (typeof response.cashMovement != 'undefined' && response.cashMovement) {
                                totalCashMovement = getTotalCashMovement(response.cashMovement);
                            }
                        }
                        payment.totalCashMovement = totalCashMovement;
                        payment.closingBalance = getClosingCashMovement(
                            response.cashMovement,
                            payment.id_wkpos_payment
                        );
                        payment.openingBalance = getOpeningCashMovement(
                            response.cashMovement,
                            payment.id_wkpos_payment
                        );
                        var transactionTotal = 0;
                        if (typeof response.registerOrders != 'undefined' && typeof response.registerOrders[payment.id_wkpos_payment] != 'undefined') {
                            transactionTotal = getTransactionTotal(response.registerOrders[payment.id_wkpos_payment]);
                        }
                        payment.transactionTotal = transactionTotal;
                        return new PaymentDetails(payment, index)
                    });
                    posViewModel.cashRegister.paymentDetails(mappedTransactions);
                }
                posViewModel.cashRegister.mapPosUsers(response.posUsers);
            }
        }
    });

    wkpos.on('beforePosBodyResize', function() {
        $('#wkpos-session').css('height', window.innerHeight - $('#wkpos-header').height() - $('.wkpos-cash-register-panel').height());
    });

    wkpos.on('beforeGenerateOnlineOrder', function(params) {
        params.id_wkpos_user = posViewModel.cashRegister.idUser();
    });
    wkpos.on('beforeGenerateOfflineOrder', function(params) {
        params.order.id_wkpos_user = posViewModel.cashRegister.idUser();
    });
    wkpos.on('beforeSyncOfflineOrder', function(params) {
        params.data.id_wkpos_user = params.order['order'].id_wkpos_user;
    });

    window.addEventListener('online', updateCashRegisterStatus);
    window.addEventListener('offline', updateCashRegisterStatus);

    function updateCashRegisterStatus() {
        if (navigator.onLine == false) {
            if (posViewModel.bodyPanel() == "wkpos-cash-management") {
                posViewModel.bodyPanel('products');
                $(document).find('#button-home').trigger('click');
            }
        }
    }
});
