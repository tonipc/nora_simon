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

<!-- ko if: navigatorOnline() && $root.contentModel.appliedVouchers().length > 0 -->
<div class="wkpos-payment-customer wk-auto-cursor" id="wk-applied-voucher">
    <div class="row">
        <div class="col-md-12">
            <div class="wk-voucher-heading form-group">{l s='Applied Vouchers:' mod='wkpos'}</div>
            <div class="row">
                <div class="col-md-6 card-voucher">
                    <div data-bind="foreach: $root.contentModel.appliedVouchers">
                        <div data-bind="attr: { 'data-id_cart_rule': idCartRule }" class="form-group">
                            <span data-bind="text:rewardCodeName"></span>
                            <span class="button btn wkpos-btn btn-default wk-pointer"
                                data-bind="click:$root.contentModel.removeVoucher"><i class="fa fa-trash"></i></span>
                            <!-- ko if: rewardCodePercent > 0 -->
                            <span class="pull-right"><span data-bind="text:rewardCodePercent"></span> %</span>
                            <!-- /ko -->
                            <!-- ko ifnot: rewardCodePercent > 0 -->
                            <span data-bind="text:displayRewardAmount" class="pull-right"></span>
                            <!-- /ko -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /ko -->
