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

$(document).ready(function () {
    $('.show-forgot-password').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.front.panel').next().css('display', 'block');
        $(this).closest('.front.panel').css('display', 'none');
    });
    $('.show-login-form').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.back.panel').prev().css('display', 'block');
        $(this).closest('.back.panel').css('display', 'none');
    });

    $(document).on('click', '#show_password', function (e) {
        if ($(this).data('status') == 0) {
            $(this).find('#hide').show();
            $(this).find('#show').hide();
            $(this).data('status', 1);
            $(this).closest('.input-group').find('#passwd').attr('type', 'text');
        } else {
            $(this).find('#show').show();
            $(this).find('#hide').hide();
            $(this).data('status', 0);
            $(this).closest('.input-group').find('#passwd').attr('type', 'password');
        }
    });

    $(document).on('click', 'button[name="submitForgot"], button[name="submitLogin"], button[name="submitReset"]', function (e) {
        e.preventDefault();
        if ($(this).attr('name') == 'submitLogin') {
            var data = {
                action: 'login',
                ajax: true,
                email: $('#email').val(),
                passwd: $('#passwd').val(),
                posToken: posToken,
            };
            if ($('#stay_logged_in').is(":checked")) {
                data['stay_logged_in'] = 1;
            } else {
                data['stay_logged_in'] = 0;
            }
            $.ajax({
                type: 'post',
                url: $("#login_form").attr('action'),
                data: data,
                dataType: 'json',
                success: function (response) {
                    if (response.hasErrors) {
                        displayError(response);
                    } else {
                        if ($('#new_session').is(":checked")) {
                            if (localStorage.pos_cart != undefined) {
                                localStorage.removeItem('pos_cart');
                            }
                            if (localStorage.pos_orders != undefined) {
                                localStorage.removeItem('pos_orders');
                            }
                            if (localStorage.pos_products != undefined) {
                                localStorage.removeItem('pos_products');
                            }
                            if (localStorage.currentCartId != undefined) {
                                localStorage.removeItem('currentCartId');
                            }
                            if (localStorage.selectedCartId != undefined) {
                                localStorage.removeItem('selectedCartId');
                            }
                        }
                        window.location.href = response.redirect;
                    }
                }
            });
        }
        if ($(this).attr('name') == 'submitForgot') {
            $.ajax({
                type: 'post',
                url: $("#forgot_password_form").attr('action'),
                data: {
                    action: 'forgot',
                    ajax: true,
                    email_forgot: $('#email_forgot').val(),
                    passwd: $('#passwd').val(),
                    posToken: posToken,
                },
                dataType: 'json',
                success: function (response) {
                    if (response.hasErrors) {
                        displayError(response);
                    } else {
                        $.growl.notice({ title: '', message: response.confirm })
                        // window.location.href = response.redirect;
                    }
                }
            });

        }
        if ($(this).attr('name') == 'submitReset') {
            var data = {
                submitReset: 1,
                reset_token: $('#reset_token').val(),
                id_employee: $('#id_employee').val(),
                reset_email: $('#reset_email').val(),
                reset_passwd: $('#reset_passwd').val(),
                reset_confirm: $('#reset_confirm').val(),
                action: 'reset',
                ajax: true,
                posToken: posToken,
            };
            $.ajax({
                type: 'post',
                url: $("#reset_password_form").attr('action'),
                data: data,
                dataType: 'json',
                success: function (response) {
                    if (response.hasErrors) {
                        displayError(response);
                    } else {
                        $('#login_form').show();
                        $('#reset_password_form').hide();
                        $.growl.notice({ title: '', message: response.confirm })
                    }
                }
            });
        }
    })
});

function displayError(response) {
    $.each(response.errors, function (index, error) {
        $.growl.error({ title: '', message: error, duration: '5000' })
    });
}
