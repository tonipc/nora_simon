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

<div>
    {if isset($displayMessageEnable) && $displayMessageEnable}
        <div class="form-group clearfix">
            <label
                for="order_message">{l s='If you would like to add a comment about your order, please write it in the field below.' mod='wkpos'}</label>
            <textarea name="order_message" class="col-md-12 col-xs-12" id="order_message" spellcheck="false"
                data-bind="textInput: $root.contentModel.orderMessage"></textarea>
        </div>
    {/if}
    <!-- ko if: $root.contentModel.paymentOptions().length > 0 -->
    <table width="100%" class="table">
        <thead>
            <tr>
                <th class="text-center">
                    {l s='Due' mod='wkpos'}
                </th>
                <th class="text-center">
                    {l s='Tendered' mod='wkpos'}
                </th>
                <th class="text-center">
                    {l s='Change' mod='wkpos'}
                </th>
                <th class="text-center">
                    {l s='Method' mod='wkpos'}
                </th>
                <th class="text-center">
                </th>
            </tr>
        </thead>
        <tbody data-bind="foreach: $root.contentModel.paymentOptions">
            <tr
                data-bind="click: $root.contentModel.selectOrderPayment, css: { 'wk-active': $root.contentModel.selectedPaymentOptionIndex() == $index() }">
                <td class="text-center" data-bind="text: dueAmount">
                </td>
                <td class="text-center tendered" data-bind="text: tendered">
                </td>
                <td class="text-center" data-bind="text: change">
                </td>
                <td class="text-center" data-bind="text: paymentMethod">
                </td>
                <td class="text-center wk-pointer" data-bind="click: $root.contentModel.removePaymentOption">
                    <i class="fa fa-remove"></i>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- /ko -->
    <!-- ko if: $root.contentModel.idOrder() == 0 -->
    <div class="row">
        <div class="col-md-12 text-right wk-d-flex wk-orderpayment-total">
            <div class="wk-head-detail wk-p-r-15">{l s='Remaining Amount' mod='wkpos'}</div>
            <div class="wk-detail">
                <!-- ko if: $root.contentModel.orderRemainingAmount() < 0 -->
                <span class="wk-h4 wkpos-text-color"> - </span>
                <!-- /ko -->
                <span class="wk-h4 wkpos-text-color"
                    data-bind="text: ($root.contentModel.remainingTotalAmount())"></span>
            </div>
        </div>
    </div>
    <!-- /ko -->
</div>
