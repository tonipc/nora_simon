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
<div class="shiping-carrier-spinner hidden">
    <i class="fa fa-spinner fa-spin" style="font-size:80px"></i>
</div>
<div class="shiping-carrier">
    <!-- ko if: $root.contentModel.posShipping() == undefined || $root.contentModel.posShipping().length == 0 -->
    <div class="col-md-12">
        <div class="alert alert-warning col-md-12 margin-top-15">
            {l s='No Shipping Applied' mod='wkpos'}
        </div>
    </div>
    <!-- /ko -->
    {* <span data-bind="text: $root.contentModel.posShipping.length"></span> *}
    <!-- ko if: $root.contentModel.posShipping() != undefined -->
    <div class="col-md-12">
        <div class="margin-top-15 clearfix" data-bind="foreach:  $root.contentModel.posShipping">
            <div class="col-md-2 product-combination"
                data-bind="attr: { 'carrier-id': idCarrier, 'id-reference': idReference }, click: $root.contentModel.selectCarrier, css: { 'selected': $root.contentModel.selectedIdCarrier() == idCarrier }">
                <div data-bind="text: carrierName"></div>
                <div data-bind="text: displayShippingCost"></div>
            </div>
        </div>
        {hook h="displayPosShipping"}
    </div>
    <!-- /ko -->
</div>
