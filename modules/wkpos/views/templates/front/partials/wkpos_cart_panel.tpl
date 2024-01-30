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

<div class="wk-cart-product-details">
    <!-- Nav tabs -->
    <!-- ko if: $root.bodyPanel() != 'shipping' -->
    <ul class="nav nav-tabs wkpos-scrollbar" role="tablist">
        <!-- ko foreach: $root.contentModel.posCarts -->
        <li role="presentation"
            data-bind="css: { active: $index() == $root.contentModel.currentCartId() }, click: $root.contentModel.switchCart">
            <a href="#home" role="tab" data-toggle="tab" data-bind="text: posCartId"></a>
        </li>
        <!-- /ko -->
        <li class="wk-cart-update-btn"><button class="btn wkpos-btn"
                data-bind="click: $root.contentModel.removeSelectedCart"><i class="fa fa-minus"></i></button></li>
        <li class="wk-cart-update-btn"><button class="btn wkpos-btn"
                data-bind="click: $root.contentModel.createNewCart"><i class="fa fa-plus"></i></button></li>
    </ul>
    <!-- /ko -->
    <div class="tab-content wkpos-scrollbar" id="wkpos-cart-panel">
        <div role="tabpanel" class="tab-pane active" id="home">
            <!-- ko if: $root.contentModel.productCart().length > 0 && $root.bodyPanel() == 'shipping' -->
            <div class="clearfix wk-product-cart-heading">
                <span class="col-md-2">{l s='Image' mod='wkpos'}</span>
                <span class="col-md-4">{l s='Name' mod='wkpos'}</span>
                <span class="col-md-3" title="{l s='Unit Price' mod='wkpos'}">{l s='U/P' mod='wkpos'}</span>
                <span class="col-md-3" title="{l s='Tax Incl.' mod='wkpos'}">{l s='Total' mod='wkpos'}</span>
                {* <span class="col-md-2 wk-padding-0">{l s='Qty' mod='wkpos'}</span> *}
            </div>
            <!-- /ko -->
            <ul data-bind="foreach: $root.contentModel.productCart">
                <li class="orderline"
                    data-bind="attr: { 'id-product': idProduct }, css: { 'cart-product-selected' : uniqueKey == $root.contentModel.selectedCartProduct() }, click: $root.contentModel.selectCartItems">
                    <div class="row">
                        <div class="col-sm-9 col-xs-9 padding-right-0">
                            <img class="img-responsive col-sm-3 col-xs-3 cart-product-img"
                                data-bind="attr: { src: image }" />
                            <div class="col-sm-5 col-xs-5 padding-0">
                                <span class="product-name" data-bind="text: productName">
                                </span>
                                <div class="info-list">
                                    <div class="info">
                                        <em
                                            data-bind="text: productAttributes, attr: { 'data-id-product-combination': idProductAttribute }"></em>
                                    </div>
                                    <div class="info clearfix">
                                        <em data-bind="text: productQuantity"></em>
                                        {l s='Unit(s) at ' mod='wkpos'} <span data-bind="text: price()"></span> /
                                        {l s='Unit(s)' mod='wkpos'}

                                    </div>
                                    <div class="info" data-bind="if: productDiscount() > 0">
                                        {l s='With a ' mod='wkpos'} <b><em data-bind="text: productDiscount"></em> %
                                        </b>{l s='discount' mod='wkpos'}
                                    </div>
                                    <!-- ko if: $root.contentModel.showStockLocation() == 1 -->
                                        <div class="info" data-bind=" css: { 'hide' : stock_location == '' } ">
                                            {l s='Stock location: ' mod='wkpos'} <b data-bind="text: stock_location"></b>
                                        </div>
                                    <!-- /ko -->
                                </div>
                            </div>
                            {* <span class="pull-right  margin-left-20">
                                <input type="text" class="form-control text-center wkpos-product-qty" data-bind="value: productQuantity"/>
                            </span> *}
                            <div class="col-sm-4 col-xs-4 wk-flex-column">
                                <!-- ko if: $root.bodyPanel() != 'shipping' -->
                                <div class="row pull-right">
                                    <span class="price " data-bind="text: displayPrice()"></span>
                                    <span class=""> ({l s='tax incl' mod='wkpos'}.)</span>
                                </div>
                                <!-- /ko -->
                                <div class="row pull-right">
                                    <span class="price " data-bind="text: displayTaxExcludedPrice()"></span>
                                    <span class=""> ({l s='tax excl' mod='wkpos'}.)</span>
                                </div>
                            </div>
                        </div>
                        <!-- ko if: $root.bodyPanel() == 'shipping' -->
                        <div class="col-sm-3 col-xs-3">
                            <div class="row pull-right">
                                <span class="price " data-bind="text: displayPrice()"></span>
                                <span class=""> ({l s='tax incl' mod='wkpos'}.)</span>
                            </div>
                        </div>
                        <!-- /ko -->
                        <!-- ko if: $root.contentModel.productCart().length > 0 && $root.bodyPanel() != 'shipping' -->
                        <div class="col-sm-3 col-xs-3" style="padding-right: 0;">
                            <div>
                                <input type="text" class="form-control text-center wkpos-product-qty"
                                    data-bind=" value: productQuantity, event: { blur: updateQuantity }, executeOnEnter: updateQuantity, attr: { 'disabled': $root.bodyPanel() == 'shipping' }" />
                                <button type="button"
                                    class="form-control text-center product-cart-item-update product-cart-item-update-delete"
                                    title="{l s='Remove Product' mod='wkpos'}"
                                    data-bind="click: $root.contentModel.removeProduct, attr: { 'disabled': $root.bodyPanel() == 'shipping' }">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                            <div>
                                <span class="clearfix">
                                    <button type="button" class="form-control pull-left product-cart-item-update"
                                        title="{l s='Decrease Quantity' mod='wkpos'}"
                                        data-bind="click: $root.contentModel.decreaseProductQuantity, attr: { 'disabled': $root.bodyPanel() == 'shipping' }">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                    <button type="button" class="form-control pull-left product-cart-item-update"
                                        title="{l s='Increase Quantity' mod='wkpos'}"
                                        data-bind="click: $root.contentModel.increaseProductQuantity, attr: { 'disabled': $root.bodyPanel() == 'shipping' }">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                        <!-- /ko -->
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="wk-payment collapsed">
    <div class="row wk-nomargin">
        <div class="col-sm-12 col-xs-12">
            <!-- ko if: $root.bodyPanel() != "shipping" -->
            <div class="col-xs-12" style="display: flex;justify-content: center;">
                <div class="row">
                    <span style="font-size:12px;">{l s='No of items in selected cart : ' mod='wkpos'}</span>
                    <span data-bind="text: $root.contentModel.currentGetNoOfItems()"> </span>
                </div>
            </div>
            <!-- /ko -->
        </div>
    </div>
    <div class="row wk-nomargin">
        <div class="col-sm-12 col-xs-12">
            <!-- ko if: $root.bodyPanel() != "shipping" -->
            <div class="col-xs-12 col-sm-6">
                <div class="row">
                    <div class="col-md-12 col-xs-12">
                        <ul id="wk-pos-keypad" class="col-md-12 col-xs-12">
                            <update-cart-details
                                params='buttonText: "{l s='Qty' mod='wkpos'}", buttonValue: "qty", $root.contentModel.productCart: $root.contentModel.productCart' title="Alt + Q">
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "1", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "2", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "3", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "{l s='Price' mod='wkpos'}", buttonValue: "price", $root.contentModel.productCart: $root.contentModel.productCart' title="Alt + P">
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "4", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "5", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "6", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "{l s='Off' mod='wkpos'}", buttonValue: "off", $root.contentModel.productCart: $root.contentModel.productCart' title="Alt + O">
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "7", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "8", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "9", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "{l s='Del' mod='wkpos'}", buttonValue: "del", $root.contentModel.productCart: $root.contentModel.productCart' title="Delete">
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "+/-", buttonValue: "toggle", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: "0", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                            <update-cart-details
                                params='buttonText: ".", $root.contentModel.productCart: $root.contentModel.productCart'>
                            </update-cart-details>
                        </ul>
                    </div>

                </div>
            </div>
            <!-- /ko -->
            <!-- ko if: $root.bodyPanel() != "shipping" -->
            <div class="col-xs-12 col-sm-6 wk-padding-0">
                {include file="module:wkpos/views/templates/front/partials/wkpos_cart_total.tpl"}
            </div>
            <!-- /ko -->
            <!-- ko if: $root.bodyPanel() == "shipping" -->
            <div class="col-xs-12 col-sm-12 col-xs-12">
                {include file="module:wkpos/views/templates/front/partials/wkpos_cart_total.tpl"}
            </div>
            <!-- /ko -->
        </div>
        <div class="wk-d-flex padding-12" style="gap: 12px;">
            <div class="wk-flex-2">
                <div class="btn wk-checkout-btn wkpos-background-color"
                    data-bind="click: $root.contentModel.updateCustomer">
                    <i class="fa fa-user-circle"></i>
                    <span data-bind="text: $root.contentModel.selectedCustomerName">{l s=' Customer' mod='wkpos'}</span>
                </div>
            </div>
            <div class="wk-flex-2">
                <a class="btn wk-checkout-btn wk-pay-btn"
                    data-bind="click: $root.contentModel.proceedToPay, css: { 'disabled': $root.contentModel.productCart().length == 0 }">
                    <span>{l s='Proceed to checkout' mod='wkpos'}</span>
                </a>
            </div>
        </div>
    </div>
</div>
