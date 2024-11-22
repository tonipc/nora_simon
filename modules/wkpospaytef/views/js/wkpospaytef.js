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
*
* Don't forget to prefix your containers with your own identifier
* to avoid any conflicts with others containers.
*/

function PosPaytefTerminalViewModel(PosModel) {
    var self = this;

    self.paytefDeviceIP = ko.observable(false);
    self.paytefDevicePort = ko.observable(false);
    self.paytefDevicePinpad = ko.observable(false);

    PosModel.call(self);

    self.updatePaytefReader = function () {
        $('#wk-pos-paytef-reader').modal('toggle');
    }

    self.pinpadStatus = function () {
        // $('#discover-reader').attr('disabled', true);
        // $('#reader-msg').html(checkingPinpadStatusText);
        // $('#paytef-reader-loader').show(300);
        var data = {
            action: 'fetchPinPadStatus',
            ajax: true,
            posPaytefToken: posPaytefToken,
            deviceIP: self.paytefDeviceIP,
            devicePort: self.paytefDevicePort,
            pinpad: self.paytefDevicePinpad
        };
        $.ajax({
            url: paytefServiceUrl,
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function (response) {
                if (response.status && response.status == 'connected') {
                    showSuccessMsg(pinpadStatusConnected);
                    // self.updatePaytefReader();
                    // $('#discover-reader').attr('disabled', false);
                    // $('#reader-msg').html('');
                    // $('#paytef-reader-loader').hide();
                    localStorage.setItem('paytef_device_ip', self.paytefDeviceIP());
                    localStorage.setItem('paytef_device_port', self.paytefDevicePort());
                    localStorage.setItem('paytef_device_pinpad', self.paytefDevicePinpad());
                } else {
                    showErrorMsg(response.msg);
                    // $('#discover-reader').attr('disabled', false);
                    // $('#reader-msg').html('');
                    // $('#paytef-reader-loader').hide();
                    localStorage.removeItem('paytef_device_ip');
                    localStorage.removeItem('paytef_device_port');
                    localStorage.removeItem('paytef_device_pinpad');
                }
            }
        });
    }

    self.openPaytefTerminalPinpadStatus = function () {
        var selectedUserID = getCookieValueBykey('wkpos_user_' + idWkPosOutlet);

        var selectedUser = wk_pos_employee_details.find(function (user) {
            return user.id_wkpos_user === selectedUserID;
        });

        if (selectedUser) {
            var IP = selectedUser.device_ip;
            var port = selectedUser.device_port;
            var pinpad = selectedUser.device_pinpad;

            posViewModel.paytef.paytefDeviceIP(IP);
            posViewModel.paytef.paytefDevicePort(port);
            posViewModel.paytef.paytefDevicePinpad(pinpad);
            // self.updatePaytefReader();
            self.pinpadStatus();
        } else {
            showErrorMsg(employee_no_detail_error);
        }
    };

    setTimeout(function () {
        self.openPaytefTerminalPinpadStatus();
    }, 400);
}

function getCookieValueBykey(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

$(document).ready(function () {

    wkpos.on('afterPosModel', function (event) {
        localStorage.removeItem('paytef_device_ip');
        localStorage.removeItem('paytef_device_port');
        localStorage.removeItem('paytef_device_pinpad');
        $('.wkpos-confirmpayment').show();
        posViewModel.paytef = new PosPaytefTerminalViewModel(PosModel);
    });

    /*
        Need to add this pos bundle js in 17977 line inside function self.selectPaymentOption bottom
        // Paytef
        self.emitAfterEvents('selectPaymentOption', {'data': data, 'event': event});
    */
    wkpos.on('afterSelectPaymentOption', function (params) {
        if (params.data != undefined && params.event != undefined && (params.data.id_wkpos_payment == wkPaytefPaymentId)) {
            if (localStorage.paytef_device_ip == undefined
                || localStorage.paytef_device_port == undefined
                || localStorage.paytef_device_pinpad == undefined
            ) {
                showErrorMsg(connectFirst);
                cancelPaytefPaymentSelection();
                return;
            }

            console.log(params.data.tendered);
            var pos_cart = $.parseJSON(localStorage.pos_cart);
            var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
            var idCart = pos_cart[cartIndex]['others']['id_cart'];
            var data = {
                action: 'startPytefTransaction',
                ajax: true,
                posPaytefToken: posPaytefToken,
                amount: params.data.tendered,
                id_cart: idCart,
                deviceIP: localStorage.paytef_device_ip,
                devicePort: localStorage.paytef_device_port,
                pinpad: localStorage.paytef_device_pinpad
            };
            $.ajax({
                url: paytefServiceUrl,
                dataType: 'json',
                type: 'POST',
                data: data,
                beforeSend: function () {
                    $('#wk-pos-paytef-create-payment').modal('toggle');
                    $('.wkpos-confirmpayment').hide();
                    $('#paytef-create-loader').show(300);
                    $('#connector-msg').html(initiatingPaytef);
                },
                success: function (response) {
                    if (response.hasError) {
                        showErrorMsg(response.msg);
                        cancelPaytefPaymentSelection();
                        $('#wk-pos-paytef-create-payment').modal('toggle');
                        $('.wkpos-confirmpayment').show();
                        $('#paytef-create-loader').hide();
                        return false;
                    } else {
                        if (typeof response.status != 'undefined' && response.status) {
                            // transaction started.
                            showSuccessMsg(transaction_start_msg);
                            // setTimeout(async function () {
                            //     checkTransactionStatus(idCart);
                            // }, 1000);
                            setTimeout(async function () {
                                checkTransactionStatus(idCart);
                            }, 5000);
                        } else {
                            showErrorMsg(someError);
                            cancelPaytefPaymentSelection();
                            $('#wk-pos-paytef-create-payment').modal('toggle');
                            $('.wkpos-confirmpayment').hide();
                            $('#paytef-create-loader').hide();
                        }
                    }
                }
            });
        }
    });
    // document ready end
});

function checkTransactionStatus(idCart, retryCount = 0, maxRetries = 11) {
    $.ajax({
        url: paytefServiceUrl,
        type: 'POST',
        dataType: 'json',
        data: {
            action: 'paytefTransactionStatus',
            ajax: true,
            posPaytefToken: posPaytefToken,
            deviceIP: localStorage.paytef_device_ip,
            devicePort: localStorage.paytef_device_port,
            pinpad: localStorage.paytef_device_pinpad
        },
        success: function (transaction_status) {
            if (transaction_status.info.cardStatus === 'finished' && transaction_status.info.transactionStatus === 'finished') {
                getTransactionResult(idCart);
            } else if (retryCount < maxRetries) {
                setTimeout(() => checkTransactionStatus(idCart, retryCount + 1, maxRetries), 5000);
            } else {
                showErrorMsg(maxTryError);
                cancelPaytefPaymentSelection();
                $('#wk-pos-paytef-create-payment').modal('toggle');
                $('.wkpos-confirmpayment').hide();
                $('#paytef-create-loader').hide();
                return false;
            }
        },
        error: function (error) {
            showErrorMsg(someError);
            cancelPaytefPaymentSelection();
            $('#wk-pos-paytef-create-payment').modal('toggle');
            $('.wkpos-confirmpayment').hide();
            $('#paytef-create-loader').hide();
        }
    });
}

function getTransactionResult(idCart) {
    $.ajax({
        url: paytefServiceUrl,
        type: 'POST',
        dataType: 'json',
        data: {
            action: 'paytefTransactionResult',
            ajax: true,
            id_cart: idCart,
            posPaytefToken: posPaytefToken,
            deviceIP: localStorage.paytef_device_ip,
            devicePort: localStorage.paytef_device_port,
            pinpad: localStorage.paytef_device_pinpad
        },
        success: function (result) {
            if (result.approved && !result.failed) {
                showSuccessMsg(transaction_approved_msg);
                // start order code
                $('#wk-pos-paytef-create-payment').modal('toggle');
                $('.wkpos-confirmpayment').hide();
                $('.wkpos-confirmpayment').trigger('click'); // initiate payment
                // code end
            } else {
                showErrorMsg(payment_error);
                cancelPaytefPaymentSelection();
                $('#wk-pos-paytef-create-payment').modal('toggle');
                $('.wkpos-confirmpayment').hide();
                $('#paytef-create-loader').hide();
            }
        },
        error: function (error) {
            showErrorMsg(transaction_result_err);
            cancelPaytefPaymentSelection();
            $('#wk-pos-paytef-create-payment').modal('toggle');
            $('.wkpos-confirmpayment').hide();
            $('#paytef-create-loader').hide();
        }
    });
}

showErrorMsg = function (msg) {
    growl.error({ title: "", message: msg });
}

showSuccessMsg = function (msg) {
    growl.notice({ title: "", message: msg });
}

cancelPaytefPaymentSelection = function () {
    viewModel.removePaymentOption();
    $("#wk-pos-payment-panel > div > div > div:nth-child(3) > table > tbody > tr > td.text-center.wk-pointer").trigger('click');
}

showWarningMsg = function (msg) {
    growl.warning({ title: "", message: msg });
}

