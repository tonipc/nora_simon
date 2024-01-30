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

<div class="clearfix wk-d-flex wk-flex-property">
    <span class="wk-total">
        <span>{l s='Sub Total' mod='wkpos'}({$currencySign|escape:'htmlall':'UTF-8'})</span>
    </span>
    <div class="wk-total-detail text-right pull-right">
        <span data-bind="text: $root.contentModel.subTotal"></span>
    </div>
</div>
<div class="clearfix wk-d-flex wk-flex-property">
    <span class="wk-total">
        <span>{l s='Discount' mod='wkpos'}({$currencySign|escape:'htmlall':'UTF-8'})</span>
    </span>
    <div class="wk-total-detail pull-right">
        <input type="text"
            data-bind="value: $root.contentModel.orderDiscount, valueUpdate: ['afterkeydown', 'input'], attr: { 'disabled': $root.bodyPanel() == 'shipping' }"
            class="form-control text-right order_discount"></input>
    </div>
</div>
<div class="clearfix wk-d-flex wk-flex-property">
    <span class="wk-total">
        <span>{l s='Tax' mod='wkpos'}({$currencySign|escape:'htmlall':'UTF-8'})</span>
    </span>
    <div class="wk-total-detail pull-right">
        <span data-bind="text: $root.contentModel.totalTax" class="text-right"></span>
    </div>
</div>
{if isset($shippingEnabled) && $shippingEnabled}
    <div class="clearfix wk-d-flex wk-flex-property">
        <span class="wk-total">
            <span>{l s='Shipping' mod='wkpos'}({$currencySign|escape:'htmlall':'UTF-8'})</span>
        </span>
        <div class="wk-total-detail pull-right">
            <span data-bind="text: $root.contentModel.selectedIdCarrierCost" class="text-right"></span>
        </div>
    </div>
{/if}
<div class="clearfix wk-d-flex wk-flex-property">
    <span class="wk-total">
        <span>{l s='Total' mod='wkpos'}({$currencySign|escape:'htmlall':'UTF-8'})</span>
    </span>
    <div class="margin-top-15 price wkpos-text-color pull-right">
        <span data-bind="text: $root.contentModel.total()"></span>
    </div>
</div>
{* <div class="clearfix wk-d-flex wk-flex-property">
    <div class="text-right padding-12">
        <span>{l s='Total' mod='wkpos'}({$currencySign|escape:'htmlall':'UTF-8'})</span>
    </div>
    <div class="text-right price padding-12 wkpos-text-color">
        {$currencySign|escape:'htmlall':'UTF-8'}<span data-bind="text: $root.contentModel.total()"></span>
    </div>
</div> *}
