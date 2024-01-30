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

<div class="wkpos-order-panel col-sm-12 col-xs-12">
    <div class="row">
        <ul class="nav nav-tabs" role="tablist">
            {* <li role="presentation" class="wkpos-text-color" data-bind="click: $root.contentModel.orderTab.bind($data, 'current_session'), css: { 'active': $root.contentModel.selectedOrderType() == 'current_session' }">
                <a class="wkpos-text-color">
                    {l s='Current Session Orders' mod='wkpos'}
                </a>
            </li> *}
            <li role="presentation" class="wkpos-text-color"
                data-bind="click: $root.contentModel.orderTab.bind($data, 'history'), css: { 'active': $root.contentModel.selectedOrderType() == 'history' }">
                <a class="wkpos-text-color">
                    {l s='Order History' mod='wkpos'}
                </a>
            </li>
            <li role="presentation" class="wkpos-text-color"
                data-bind="click: $root.contentModel.orderTab.bind($data, 'offline'), css: { 'active': $root.contentModel.selectedOrderType() == 'offline' }">
                <a class="wkpos-text-color">
                    {l s='Offline Order' mod='wkpos'}
                </a>
            </li>
        </ul>

        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="order">
                {* <!-- ko if : $root.contentModel.orderDetails().length > 0 --> *}
                <!-- ko if : $root.contentModel.emptyOrders() == false -->
                <div class="col-md-4 col-sm-4 col-xs-6 wkpos-scrollbar order-panel-height" id="wk-order-panel">
                    <div class="wkpos-search clearfix">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-search"></i></span>
                            <input type="text" class="form-control"
                                placeholder="{l s='Order Number or Amount or Date' mod='wkpos'}"
                                data-bind="event: { keyup: $root.contentModel.searchOrder }, value: $root.contentModel.orderSearchKey, valueUpdate: ['afterkeydown', 'input']"
                                style="border-right: 1px solid #ccc;">
                            {* <span class="input-group-addon"><i class="fa fa-calendar"></i></span> *}
                        </div>
                    </div>
                    <!-- ko if : $root.contentModel.orderDetails().length == 0 -->
                    <div class="col-md-12 col-sm-12 col-xs-12 margin-top-50px">
                        <div class="alert alert-warning">{l s='No Order Found' mod='wkpos'}</div>
                    </div>
                    <!-- /ko -->
                    <!-- ko if : $root.contentModel.orderDetails().length > 0 -->
                    <div data-bind="foreach: $root.contentModel.orderDetails" class="margin-top-50px wk-order-detail">
                        <div class="wkpos-order-detail row wk-d-flex wk-flex-wrap clearfix"
                            data-bind="attr: { 'order-reference': orderReference }, click: $root.contentModel.loadOrderedDetails, css: { 'cart-product-selected': $root.contentModel.selectedOrderId() == idOrder }">
                            <span class="wk-flex-2 col-xs-4 wkpos-text-color">#<span
                                    data-bind="text: orderReference"></span></span>
                            <span class="wk-flex-3 col-xs-4 wkpos-padding-0 wkpos-font-13">
                                <i class="fa fa-calendar-o"></i>
                                <span data-bind="text: orderDate"></span>
                            </span>
                            <span class="wk-flex-1 col-xs-4 text-right wkpos-font-13"><span
                                    data-bind="text: orderTotal"></span>
                        </div>
                    </div>
                    <!-- /ko -->
                </div>
                <div class="col-md-8 col-sm-8 col-xs-6 ">
                    <div class="wk-order-product-action form-group clearfix">
                        <!-- ko if: $root.navigatorOnline() && $root.contentModel.selectedOrderType() != 'offline' -->
                        <!-- ko if: $root.contentModel.orderedProductsDetail().length -->
                        <!-- ko foreach: $root.contentModel.orderHistory -->
                        <!-- ko if: current_state() == {$paymentAcceptedStatus|escape:'htmlall':'UTF-8'} -->
                        <span class="btn wkpos-btn pull-right" data-bind="attr: {literal}{disabled: !$root.contentModel.isOrderReturnable()}{/literal},click:$root.contentModel.isOrderReturnable() ? $root.contentModel.returnOrderStatus : null">
                            {l s='Order Return' mod='wkpos'}
                        </span>
                        <!-- /ko -->
                        <!-- /ko -->
                        <!-- /ko -->
                        <!-- ko if: $root.contentModel.selectedOrderType() == 'current_session' -->
                        <span class="btn wkpos-btn pull-right" data-bind="click:$root.contentModel.editOrderDetails">
                            {l s='Order Edit' mod='wkpos'}
                        </span>
                        <!-- /ko -->
                        <!-- /ko -->
                    </div>
                    <div class="row wk-pos-order-detail wkpos-scrollbar">
                        <!-- ko foreach: $root.contentModel.orderHistory -->
                        <div class="col-md-5 col-xs-12 clearfix wkpos-orderinfo">
                            <div class="order-detail">
                                <div>{l s='Order reference' mod='wkpos'}</div>
                                <div class="wkpos-text-color font-size-18">#<span
                                        data-bind="text: orderReference"></span></div>
                                <div>
                                    <i class="fa fa-calendar-o"></i>
                                    <span data-bind="text: orderDate"></span>
                                </div>
                            </div>
                            <div class="customer clearfix">
                                <i class="col-md-2 padding-0 fa fa-user-circle wk-font-size-40 wkpos-text-color"></i>
                                <div class="col-md-10 padding-0">
                                    <div class="name wkpos-text-color font-size-18" data-bind="text: customerName">
                                    </div>
                                    <div class="name">
                                        <i class="fa fa-map-marker"></i>
                                        <span data-bind="html: customerAddress"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="messages">
                                <div class="heading wkpos-text-color font-size-18">
                                    {l s='Message' mod='wkpos'}
                                </div>
                                <div data-bind="foreach: messages">
                                    <div data-bind="text: name"></div>
                                </div>
                            </div>
                            <div>
                                <div class="payment">
                                    {l s='Payment Method' mod='wkpos'}
                                    <!-- ko if: installment_order -->
                                    <div data-bind="text: payment" class="wkpos-text-color font-size-18"></div>
                                    <!-- /ko -->
                                    <!-- ko if: !installment_order -->
                                    <!-- ko if: order_payment.length == 0 -->
                                    <div class="wkpos_orderpayment_row">
                                        <span
                                            class="wkpos-text-color font-size-18">{l s='Free Order' mod='wkpos'}</span>
                                    </div>
                                    <!-- /ko -->
                                    <div data-bind="foreach: order_payment">
                                        <div class="wkpos_orderpayment_row">
                                            <span class="wkpos-text-color font-size-18" data-bind="text: name"></span>
                                            <span class="pull-right" data-bind="text: displayPartialAmount"></span>
                                        </div>
                                    </div>
                                    <hr style="margin: 0;border-color: lightgray;">
                                    <!-- /ko -->
                                </div>
                                <div class="subtotal clearfix">
                                    <span class="pull-left">{l s='Sub Total' mod='wkpos'}</span>
                                    <span class="pull-right" data-bind="text: orderSubTotal"></span>
                                </div>
                                <!-- ko if: orderShipping() > 0 -->
                                <div class="subtotal clearfix">
                                    <span class="pull-left">{l s='Shipping Cost' mod='wkpos'}</span>
                                    <span class="pull-right" data-bind="text: displayOrderShipping"></span>
                                </div>
                                <!-- /ko -->
                                <div class="cash-discount clearfix">
                                    <span class="pull-left">{l s='Discount' mod='wkpos'}</span>
                                    <span class="pull-right" data-bind="text: displayOrderDiscount"></span>
                                </div>
                                <div class="total clearfix">
                                    <span class="pull-left">{l s='Total' mod='wkpos'}</span>
                                    <span class="pull-right" data-bind="text: orderTotal"></span>
                                </div>
                                {if (Configuration::get('WKPOS_DIGITAL_SIGN_ON_RECIEPT') == 1)}
                                    <div class="total clearfix">
                                        <span class="wk-fixed-width">
                                            {l s='Digital Sign' mod='wkpos'} :
                                        </span>
                                        <span class="wk-fixed-width" data-bind="text: digitalSign"></span>
                                    </div>
                                {/if}
                                {* <!-- ko if: id_wkpos_payment == 4 -->
                                            <div class="total clearfix">
                                                <span class="pull-left">{l s='Installment Paid' mod='wkpos'}</span>
                                                <span class="pull-right" data-bind="text: displayAmountPaid"></span>
                                            </div>
                                            <div class="total clearfix">
                                                <span class="pull-left">{l s='Installment remaining Amount' mod='wkpos'}</span>
                                                <span class="pull-right" data-bind="text: displayRemainingAmount"></span>
                                            </div>
                                        <!-- /ko --> *}
                            </div>
                            <div class="print_invoice text-center">
                                <a class="btn wkpos-payment-customer"
                                    data-bind="click: $root.contentModel.printInvoice">{l s='Print Invoice' mod='wkpos'}</a>
                                {if $wkposLoyaltyInstall == true}
                                    <a class="btn wkpos-payment-customer gift-card-order"
                                        data-bind=" click : $root.loyalty.printGiftCardSlip">
                                        {l s='Print Gift Card' mod='wkpos'}
                                    </a>
                                {/if}
                            </div>
                        </div>
                        <!-- ko if: $root.contentModel.orderedProductsDetail -->
                        <div class="col-md-7 col-xs-12 wk-order-product-detail wkpos-scrollbar clearfix form-group">
                            <div class="row wkpos-order-product-heading wk-d-flex">
                                {* <span class="wk-flex-1"">{l s='S. No.' mod='wkpos'}</span> *}
                                <span class="wk-flex-4">{l s='Product Name' mod='wkpos'}</span>
                                <span class="text-center wk-flex-1">
                                    {l s='Qty' mod='wkpos'}
                                </span>
                                {* <div data-bind="text:$root.contentModel.orderedProductsDetail().length"></div> *}
                                <span class="text-center wk-flex-2">
                                    {l s='Price' mod='wkpos'}
                                </span>
                                <span class="text-center wk-flex-2">
                                    {l s='Total Price' mod='wkpos'}
                                </span>
                                <!-- ko if: $root.contentModel.alreadyRefund() -->
                                <span class="text-center wk-flex-2">
                                    {l s='Refund' mod='wkpos'}
                                </span>
                                <!-- /ko -->
                                <!-- ko if: $root.contentModel.selectedOrderType() == 'current_session' -->
                                <span class="text-center wk-flex-1">
                                    {l s='Action' mod='wkpos'}
                                </span>
                                <!-- /ko -->
                            </div>
                            <!-- ko foreach: $root.contentModel.orderedProductsDetail -->
                            {include file="module:wkpos/views/templates/front/partials/wkpos_product.tpl"}
                            <!-- /ko -->
                            <!-- ko if: $root.contentModel.showCreditSlip() == 1 -->
                            <a class="btn wkpos-payment-customer"
                                data-bind="click: $root.contentModel.printCreditSlip">{l s='Print Credit Slip' mod='wkpos'}</a>
                            <!-- /ko -->
                            <!-- ko if: $root.bodyPanel() == 'orders' && $root.contentModel.enableOrderReturn() == 1 -->
                            <div class="row">
                                <span class="btn wkpos-btn wk-margin-15 pull-right"
                                    data-bind="click: $root.contentModel.partialRefundProcess">{l s='Return process' mod='wkpos'}</span>
                            </div>
                            <!-- /ko -->
                        </div>
                        <!-- /ko -->
                        <!-- /ko -->

                    </div>
                </div>
                <!-- /ko -->
                <!-- ko if : $root.contentModel.orderDetails().length == 0 -->
                <div class="col-md-12 margin-top-15 col-xs-12 ">
                    <div class="alert alert-warning">{l s='No Order Found' mod='wkpos'}</div>
                </div>
                <!-- /ko -->
            </div>
        </div>
    </div>
</div>
