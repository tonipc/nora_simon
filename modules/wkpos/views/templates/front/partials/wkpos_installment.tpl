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


<!-- ko if: $root.contentModel.selectedPaymentId() == '4' && $root.contentModel.idOrder() == 0 && $root.navigatorOnline() -->
<div class="wk-pos-installment">
    <div class="form-group">
    </div>
    <div class="form-group">
    </div>

    <div>
        <div class="">
            <label class="wkpos_td_label" for="wkpos_name">
                {l s='Number of Installment' mod='wkpos'}
            </label>
        </div>
        <div class="wk-width-100">
            <input class="form-control wk-margin-bottom-10" name="reason" placeholder="" id="wkpos_installment"
                type="text" data-bind="value: $root.contentModel.installment" readOnly />
        </div>
    </div>
    <div>
        <div class="">
            <label class="wkpos_td_label" for="wkpos_installment_amount">{l s='Installment Amount' mod='wkpos'}</label>
        </div>
        <div class="wk-width-100">
            <input class="form-control wk-margin-bottom-10" name="amount" placeholder="" type="number"
                id="wkpos_installment_amount"
                data-bind="value: $root.contentModel.installmentAmount, event: { blur: $root.contentModel.updateInstallmentAmount}" />
        </div>
    </div>
    <div>
        <a class="btn wkpos-btn wkpos-confirmpayment"
            data-bind="css: { 'disabled': $root.contentModel.confirmDisabled() == 1 }, click:$root.contentModel.generateOrder">
            {l s='Pay' mod='wkpos'}
        </a>
    </div>
</div>
<!-- /ko -->
