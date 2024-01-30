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
    if ($('input[name="WKPOS_PAYMENT_PARTIAL_VOUCHER"]').val() != 0) {
        $('input[name="WKPOS_PAYMENT_PARTIAL_VOUCHER"]').parent().parent().parent('.form-group').hide(300);
    }
    if ($('#WKPOS_ORDER_EDIT_PAYMENT').val() == 0) {
        $('input[name="WKPOS_PAYMENT_PARTIAL_VOUCHER"]').parent().parent().parent().show(300);
    }
    toggleGuestAccount($("input[name = 'guest_checkout']:checked"));
    $("input[name = 'guest_checkout']").on('change', function () {
        toggleGuestAccount($(this));
    });

    toggleShipping($("input[name = 'enable_shipping']:checked"), $("input[name = 'enable_shipping']:checked").closest('div.form-group').next());
    toggleShipping($("input[name = 'enable_shipping']:checked"), $("input[name = 'enable_shipping']:checked").closest('div.form-group').next().next());
    $("input[name = 'enable_shipping']").on('change', function () {
        toggleShipping($(this), $(this).closest('div.form-group').next());
        toggleShipping($(this), $(this).closest('div.form-group').next().next());
    });

    var foundCustomer;
    $('#guest_account').on('keyup', function () {
        if ($(this).val().length > 3) {
            $.ajax({
                url: posConfigUrl,
                dataType: 'json',
                type: 'get',
                data: {
                    action: 'searchPosCustomers',
                    customer_search: $(this).val(),
                    ajax: true,
                    posToken: posToken
                },
                success: function (response) {
                    if (response.hasError) {
                        $.each(response.errors, function (index, error) {
                            $.growl.error({ title: "", message: error });
                        });
                    } else {
                        html = '<div id="guest_result">';
                        if (response.found) {
                            foundCustomer = response.customers;
                            $.each(response['customers'], function (index, customer) {
                                html += '<div class="customerCard col-lg-4"><div class="panel"><div class="panel-heading">';
                                html += customer.firstname + ' ' + customer.lastname;
                                html += '<span class="pull-right">#' + customer.id_customer;
                                html += '</span></div><span>' + customer.email + '</span><br>';
                                html += '<span class="text-muted"></span><br><div class="panel-footer"><button type="button" data-customer="' + customer.email + '" id="guest_account_select" class="setup-customer btn btn-default pull-right"><i class="icon-arrow-right"></i> ' + 'Choose' + '</button></div></div></div>';
                            });
                        } else {
                            html += '<div class="alert alert-warning">No customer found.</div>'
                        }
                        html += '</div>';
                        $('#guest_result').closest('.form-group').html(html);
                    }
                }
            })
        }
    });

    $(document).on('click', '#guest_account_select', function () {
        $('#guest_account').val($(this).attr('data-customer'));
        html = '<div id="guest_result">';
        html += '</div>';
        $('#guest_result').closest('.form-group').html(html);
    });

    var defaultShipping = $('#default_shipping').val();
    $('.wkpos_shipping input[name="groupBox[]"], .wkpos_shipping #checkme').on('change', function () {
        posShipping = $('.wkpos_shipping input[name="groupBox[]"]');
        var html = '';
        var shippingCarrier = '';
        var carrierName = '';
        var active = 0;
        $.each(posShipping, function (index, shipping) {
            carrierName = ($('.wkpos_shipping #groupBox_' + shipping.value).closest('tr').find('label[for="groupBox_' + shipping.value + '"]'))[0].textContent;
            if (shipping.checked) {
                shippingCarrier = '<option value="' + shipping.value + '"';
                if (typeof defaultShipping != 'undefined') {
                    if (shipping.value == defaultShipping) {
                        shippingCarrier += ' selected=selected';
                    }
                } else if (shipping.value == $(this).val()) {
                    shippingCarrier += ' selected=selected';
                }
                html = shippingCarrier + '>' + carrierName + '</option>' + html;
                active = 1;
            }
        });
        $('#default_shipping').html(html);
        if (active == 0) {
            $('#default_shipping').closest('div.form-group').hide();
        } else {
            $('#default_shipping').closest('div.form-group').show();
        }
    });

    $('.wkpos_qty_low').find('i.icon-question-circle').parent().hover(function () {
        var html = '';
        html = '<img src="' + lowStockImg + '" class="img-responsive low_stock_qty_img wkpos-description-image">';
        $('#low_stock_qty').parent().append(html);
    }, function () {
        $('.low_stock_qty_img').remove();;
    });

    $('.wkpos_name_length').find('i.icon-question-circle').parent().hover(function () {
        var html = '';
        html = '<img src="' + productNameLengthImg + '" class="img-responsive product_name_lenth_img wkpos-description-image">';
        $('#product_name_length').parent().append(html);
    }, function () {
        $('.product_name_lenth_img').remove();
    });

    $('input[name="combination_tag"]').closest('.form-group').on('mouseenter', function () {
        var html = '';
        html = '<img src="' + combinationImg + '" class="img-responsive combination_tag_img wkpos-description-image">';
        $(this).find('input[name="combination_tag"]').parent().append(html);
    });
    $('input[name="combination_tag"]').closest('.form-group').on('mouseleave', function () {
        $('.combination_tag_img').remove();;
    });

    $('#WKPOS_PRINT_TYPE').on('change', function (e) {
        toggleRawPrintHtml($(this).val());
    });
    toggleRawPrintHtml($('#WKPOS_PRINT_TYPE').val());
});

function toggleRawPrintHtml(value) {
    if (value == 1) {
        $('.raw_print').show()
    } else {
        $('.raw_print').hide()
    }
}

function toggleGuestAccount(isChecked) {
    if (isChecked.val() == 1) {
        $('#guest_account').prop('disabled', false).closest('div.form-group').show();
    } else {
        $('#guest_account').prop('disabled', true).closest('div.form-group').hide();
    }
}

function toggleShipping(isChecked, element) {
    if (isChecked.val() == 1) {
        element.show();
    } else {
        element.hide();
    }
}

$(document).on('change', '#WKPOS_ORDER_EDIT_PAYMENT', function () {
    if ($(this).val() == 0) {
        $('input[name="WKPOS_PAYMENT_PARTIAL_VOUCHER"]').parent().parent().parent('.form-group').show(300);
    } else {
        $('input[name="WKPOS_PAYMENT_PARTIAL_VOUCHER"]').parent().parent().parent('.form-group').hide(300);
    }
});
