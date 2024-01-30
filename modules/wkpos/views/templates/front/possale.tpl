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

{extends file='module:wkpos/views/templates/front/layout.tpl'}

{block name='wkpos_loader'}
    <div class="container text-center wk-loading-pos-details">
        <div class="row">
            <div class="cp-spinner cp-eclipse"></div>
            <div class="progress wk-load-pos-product">
                <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70" aria-valuemin="0"
                    aria-valuemax="100" style="width:0%; color:green;">
                </div>
            </div>
            <div class="wk-loading-status"></div>
        </div>
    </div>
{/block}
{block name="wkpos_sidebar"}
    <div class="col-xs-12" id="left-panel">
        <wkpos-left-panel params='activeClass: "products" , panelConentHeading: "{l s='Home' mod='wkpos'}", icon: "home"'>
        </wkpos-left-panel>
        <wkpos-left-panel
            params='activeClass: "customers" , panelConentHeading: "{l s='Customer' mod='wkpos'}", icon: "user-circle"'>
        </wkpos-left-panel>
        {* {if isset($shippingEnabled) && $shippingEnabled}
            <wkpos-left-panel params='activeClass: "shipping", panelConentHeading: "{l s='Shipping' mod='wkpos'}", icon: "truck"'></wkpos-left-panel>
        {/if} *}
        <wkpos-left-panel
            params='activeClass: "orders", panelConentHeading: "{l s='Order' mod='wkpos'}", icon: "file-text-o"'>
        </wkpos-left-panel>
        <wkpos-left-panel params='activeClass: "settings", panelConentHeading: "{l s='Setting' mod='wkpos'}", icon: "cog"'>
        </wkpos-left-panel>
        {hook h="displayPosLeftColumn"}
    </div>
{/block}

{block name="content_wrapper"}
    {assign var="bodyPanelSize" value="col-xs-11"}
    <!-- ko if: ($root.bodyPanel() == "products" || $root.bodyPanel() == "customers" || $root.bodyPanel() == "shipping") -->
    <!-- ko if: $root.contentModel.displayCart() == 1 -->
    {assign var="bodyPanelSize" value="col-xs-7"}
    <!-- /ko -->
    <!-- /ko -->
    {include file="module:wkpos/views/templates/front/partials/wkpos_custom_product.tpl"}
    <div id="content-wrapper" class=""
        data-bind="css: { 'col-xs-7 product-panel': (($root.bodyPanel() == 'products' || $root.bodyPanel() == 'customers' || $root.bodyPanel() == 'shipping') && $root.contentModel.displayCart() == 1), 'col-xs-11': (($root.bodyPanel() != 'products' || $root.bodyPanel() != 'customers' || $root.bodyPanel() != 'shipping') || $root.contentModel.displayCart() == 0) }">
        <div class="row">
            {hook h="wkposDisplayContentWrapperTop"}
            {block name='content'}
                <!-- ko if: ($root.bodyPanel() == "products" || $root.bodyPanel() == "customers" || $root.bodyPanel() == "shipping") -->
                {include file="module:wkpos/views/templates/front/partials/wkpos_products.tpl"}
                <!-- /ko -->
                <!-- ko if: ($root.bodyPanel() === "orders") -->
                {include file="module:wkpos/views/templates/front/partials/wkpos_orders.tpl"}
                <!-- /ko -->
                <!-- ko if: ($root.bodyPanel() === "settings") -->
                {include file="module:wkpos/views/templates/front/partials/wkpos_settings.tpl"}
                <!-- /ko -->
                <!-- ko if: ($root.bodyPanel() === "pay") -->
                {include file="module:wkpos/views/templates/front/partials/wkpos_payment.tpl"}
                <!-- /ko -->
                <!-- ko if: ($root.bodyPanel() === "customer") -->
                {include file="module:wkpos/views/templates/front/partials/wkpos_addnew_customer.tpl"}
                {include file="module:wkpos/views/templates/front/partials/wkpos_address.tpl"}
                <!-- /ko -->
                {hook h="displayPosContent"}
            {/block}
            {hook h="wkposDisplayContentWrapperBottom"}
        </div>
    </div>
{/block}
{* {block name='wkpos_body'}
    <!-- ko if: ($root.bodyPanel() === "session") -->
        {block name="wkpos_sidebar"}
        {/block}

        {block name="content_wrapper"}
            {include file="module:wkpos/views/templates/front/partials/wkpos_session.tpl"}
        {/block}
        {block name="right_column"}
        {/block}
    <!-- /ko -->
    <!-- ko ifnot: ($root.bodyPanel() === "session") -->
        {$smarty.block.parent}
    <!-- /ko -->
{/block} *}
{block name="right_column"}
    <!-- ko if: ($root.bodyPanel() == "products" || $root.bodyPanel() == "customers" || $root.bodyPanel() == "shipping") -->
    <div id="right_column" class="col-xs-5 hidden-xs"
        data-bind="css: { 'customer-panel-active': ($root.bodyPanel() == 'customers')}">
        <!-- ko if: $root.rightColumnPage() == "pos_cart" -->
        <!-- ko if: $root.contentModel.displayCart() == 1 -->
        <div class="row">
            <div id="wk-cart-panel" class="col-xs-12 hidden-xs wkpos-scrollbar"
                data-bind="css: { 'customer-panel-active': ($root.bodyPanel() == 'customers')}">
                {include file="module:wkpos/views/templates/front/partials/wkpos_cart_panel.tpl"}
            </div>
        </div>
        {hook h='wkposDisplayWkPosRightColumn'}
        <!-- /ko -->
        <!-- /ko -->
        {hook h="displayPosRightColumn"}
    </div>
    <!-- /ko -->
{/block}
{*
{block name='wkpos_fullscreen'}
    <div id="wkpos_full_screen">
        <div id="wkpos_full_screen_img" draggable="true" title="{l s='Enter Full Screen' mod='wkpos'}">
            <i class="fa fa-arrows-alt" aria-hidden="true"></i>
        </div>
    </div>
{/block}

 *}
