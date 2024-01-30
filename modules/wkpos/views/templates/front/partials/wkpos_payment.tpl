{*
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
*}

<div class="wkpos-payment-panel col-sm-12">
    <div class="row">
        <div class="row">
            <div class="col-md-12">
                <div class="padding-tb-8 col-md-12 text-center wkpayment-header wk-d-flex">
                    <span class="pull-left wkpos-text-color wkpos-back"
                        title="{l s='Back To Previous Page' mod='wkpos'}"
                        data-bind="click: $root.contentModel.previousPage">
                        <i class="fa fa-angle-double-left"></i>
                        <span>{l s=' Back' mod='wkpos'}</span>
                    </span>
                    <span class="wk-payment-heading">{l s='Payment' mod='wkpos'}</span>
                    <span class="print_invoice" data-bind="if: ($root.contentModel.idOrder() !== 0)">
                        <a class="btn wkpos-btn pull-right"
                            data-bind="click: $root.contentModel.nextOrder">{l s='Next Order' mod='wkpos'}</a>
                    </span>
                    <div class="col-md-2"
                        data-bind="if: (parseFloat($root.contentModel.customerPayAmount()) >= parseFloat($root.contentModel.totalOrderAmount()) && $root.contentModel.idOrder() == 0)">
                        <a class="btn wkpos-btn wkpos-confirmpayment"
                            data-bind="css: { 'disabled': $root.contentModel.confirmDisabled() == 1 }, click:$root.contentModel.generateOrder">
                            {l s='Validate' mod='wkpos'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="wkpos-scrollbar" id="wk-pos-payment-panel">
            <div class="clearfix">
                {assign var="paymentWidth" value="col-sm-4"}
                <span data-bind="if: ($root.contentModel.idOrder() !== 0)">
                    {assign var="paymentWidth" value="col-sm-8"}
                </span>
                <!-- ko if: $root.contentModel.idOrder() == 0 -->
                <div class="col-md-6 {$paymentWidth|escape:'htmlall':'UTF-8'}">
                    <div class="wkpos-payment-customer" data-bind="click: $root.contentModel.updateCustomer">
                        <i class="fa fa-user-circle"></i>
                        <span data-bind="text: $root.contentModel.selectedCustomerName"></span>
                        <i class="fa fa-pencil pull-right"></i>
                    </div>
                    {if isset($shippingEnabled) && $shippingEnabled}
                        <!-- ko if: $root.contentModel.idOrder() == 0 && navigatorOnline() -->
                        <div class="wkpos-payment-customer" data-bind="click: $root.contentModel.updateShippingCarrier">
                            <i class="fa fa-truck"></i>
                            <span data-bind="text: $root.contentModel.selectedCarrierName"></span>
                            <i class="fa fa-pencil pull-right"></i>
                        </div>
                        <!-- /ko -->
                    {/if}
                    {if isset($displayVoucherEnable) && $displayVoucherEnable}
                        <!-- ko if: navigatorOnline() && $root.contentModel.idOrder() == 0 -->
                        <div class="wkpos-payment-customer wk-auto-cursor">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="wk-voucher-heading form-group">
                                        {l s='Take advantage of our exclusive offers:' mod='wkpos'}</div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="wk_voucher_coupon wk-d-flex">
                                                <div class="wk_voucher_coupon_input">
                                                    <div class="input-group">
                                                        <input type="text" name="promo_code" id="wk-voucher-applied-input"
                                                            class="form-control"
                                                            placeholder="{l s='Promo Code' mod='wkpos'}">
                                                        <span
                                                            class="input-group-addon btn btn-default wk-quick-redeem-btn wkpos-btn wk-pointer"
                                                            data-bind="click:$root.contentModel.applyPromocode"
                                                            autocomplete="off">
                                                            <span>{l s='Add' mod='wkpos'}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                {* <div class="wk_voucher_coupon_btn">
                                                            <button class="btn btn-default wk-quick-redeem-btn wkpos-btn" type="submit" name="submit_quick_redeem_point" data-bind="click:$root.contentModel.applyPromocode">
                                                                <span>{l s='Add' mod='wkpos'}</span>
                                                            </button>
                                                        </div> *}
                                            </div>
                                        </div>
                                        <!-- ko if: navigatorOnline() && $root.contentModel.availableVouchers().length > 0 && $root.contentModel.idOrder() == 0 -->
                                        <div class="col-md-6 card-voucher">
                                            <div data-bind="foreach: $root.contentModel.availableVouchers"
                                                class="text-right" class="row">
                                                <div data-bind="attr: { 'data-id_cart_rule': idCartRule }">
                                                    <span data-bind="text:rewardCode, click:$root.contentModel.copyCode"
                                                        class="wk-voucher-code wk-pointer"></span> -
                                                    <span data-bind="text:rewardCodeName"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /ko -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /ko -->
                    {/if}
                    {include file="module:wkpos/views/templates/front/partials/wkpos_order_payment.tpl"}
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <!-- ko if: $root.contentModel.idOrder() == 0 -->
                            <div class="row">
                                <div class="col-md-4 col-sm-6 col-xs-4">
                                    <!-- ko if: navigatorOnline() -->
                                    {foreach $payments as $payment}
                                        <div class="wkpos-paymentmethod"
                                            data-bind="click: $root.contentModel.selectPaymentOption.bind($data, '{$payment.name|escape:'htmlall':'UTF-8'}, {$payment.id_wkpos_payment|escape:'htmlall':'UTF-8'}')">
                                            {$payment.name|escape:'htmlall':'UTF-8'}</div>
                                    {/foreach}
                                    <!-- /ko -->
                                    <!-- ko if: navigatorOnline() == false-->
                                    {foreach $payments as $payment}
                                        {if $payment.id_wkpos_payment == 1}
                                            <div class="wkpos-paymentmethod"
                                                data-bind="click: $root.contentModel.selectPaymentOption.bind($data, '{$payment.name|escape:'htmlall':'UTF-8'}, {$payment.id_wkpos_payment|escape:'htmlall':'UTF-8'}')">
                                                {$payment.name|escape:'htmlall':'UTF-8'}</div>
                                        {/if}
                                    {/foreach}
                                    <!-- /ko -->
                                </div>
                                <div class="col-md-8 col-sm-6 col-xs-8">
                                    {* <!-- ko if: ($root.contentModel.selectedPaymentId() == '1') && ($root.contentModel.idOrder() === 0) --> *}
                                    <div class="row">
                                        {* <div class="col-md-6 text-right">
                                                    <div class="padding-bottom-8">
                                                        <span class="wk-h4 wkpos-text-color" data-bind="text: $root.contentModel.totalOrderAmount()"></span>
                                                        <div>{l s='Total' mod='wkpos'}({$currencySign})</div>
                                                    </div>
                                                    <div class="padding-bottom-8">
                                                        <span class="wk-h4 wkpos-text-color" data-bind="text: $root.contentModel.customerPayAmount"></span>
                                                        <div>{l s='Tendered' mod='wkpos'}</div>
                                                    </div>
                                                    <div class="padding-8">
                                                        <span class="wk-h4 wkpos-text-color" data-bind="text: $root.contentModel.customerReturnAmount"></span>
                                                        <div>{l s='Change' mod='wkpos'}</div>
                                                    </div>
                                                </div> *}
                                        <div class="col-md-9">
                                            <ul id="wk-pos-keypad" class="col-md-12 wk-padding-0 wk-pos-pay-keypad">
                                                <update-payment-details
                                                    params='buttonText: "1", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "2", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "3", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "+10", buttonValue: "10", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "4", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "5", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "6", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "+20", buttonValue: "20", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "7", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "8", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "9", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "+50", buttonValue: "50", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "C", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "0", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: ".", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                                <update-payment-details
                                                    params='buttonText: "{l s='Del' mod='wkpos'}", buttonValue: "del", $root.contentModel.productCart: $root.contentModel.productCart'>
                                                </update-payment-details>
                                            </ul>
                                        </div>
                                    </div>
                                    {* <!-- /ko -->
                                            <!-- ko if: $root.contentModel.selectedPaymentId() == '2' && $root.contentModel.idOrder() == 0 && $root.navigatorOnline() -->
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <a class="btn wkpos-btn wkpos-confirmpayment" data-bind="css: { 'disabled': $root.contentModel.confirmDisabled() == 1 }, click:$root.contentModel.generateOrder">
                                                        {l s='Accept Payment' mod='wkpos'}
                                                    </a>
                                                </div>
                                            </div>
                                            <!-- /ko --> *}
                                    {include file="module:wkpos/views/templates/front/partials/wkpos_installment.tpl"}
                                    {hook h='displayPaymentOptionDetail'}
                                </div>
                            </div>
                            <!-- /ko -->
                        </div>
                    </div>
                </div>
                <!-- /ko -->
                <!-- ko if: $root.contentModel.idOrder() !== 0 -->
                <div class="col-md-12 col-sm-8" data-bind="if: ($root.contentModel.idOrder() !== 0)">
                    <div class="col-md-3"></div>
                    <div class="col-md-6 invoice clearfix wkpos-scrollbar">
                        <div class="print_invoice text-center">
                            <a class="btn wkpos-payment-customer"
                                data-bind="click: $root.contentModel.printInvoice">{l s='Print Invoice' mod='wkpos'}</a>
                            {if $wkposLoyaltyInstall == true}
                                <a class="btn wkpos-payment-customer gift-card"
                                    data-bind=" click : $root.loyalty.printGiftCardSlip">
                                    {l s='Print Gift Card' mod='wkpos'}
                                </a>
                            {/if}
                            <!-- ko if: $root.contentModel.showCreditSlipSecond() == 1 -->
                            <a class="btn wkpos-payment-customer credit-slip"
                                data-bind=" click: $root.contentModel.printCreditSlipSecond">
                                {l s='Print Credit Slip' mod='wkpos'}
                            </a>
                            <!-- /ko -->
                        </div>
                        <div data-bind="foreach: $root.contentModel.order" id="wkpos-print"
                            class="col-md-12 wkpos-order-bill">
                            {include file="module:wkpos/views/templates/front/partials/wkpos_invoice.tpl"}
                        </div>
                    </div>
                    <div class="col-md-3"></div>
                </div>
                <!-- /ko -->
                <div class="col-md-6">
                    {* {if isset($rewardSystem) && $rewardSystem} *}
                        {include file="module:wkpos/views/templates/front/partials/wkpos_rewardpoints.tpl"}
                        {hook h='displayWkPosLoyalty'}
                    {* {/if} *}
                </div>
            </div>
        </div>
    </div>
</div>
