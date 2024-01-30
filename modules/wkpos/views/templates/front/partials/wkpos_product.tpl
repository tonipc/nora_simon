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


<div class="form-group">
    {* <span style="verticle-align:center;" rowspan="2" class="col-md-2">
            <span data-bind="text: serialNo"></span>
        </span> *}
    {* <div class="row">
    </div> *}
    <div class="wk-d-flex">
        <span style="verticle-align:center;" class="wk-flex-4">
            <span data-bind="text: productName"></span>
            <span data-bind="text: productAttributes"></span>
            {if isset($displayProductDiscount) && $displayProductDiscount == 1}
                <span data-bind="if: productDiscount > 0">
                    {l s='With a ' mod='wkpos'} <b><em data-bind="text: productDiscount"></em> %
                    </b>{l s='discount' mod='wkpos'}
                </span>
            {/if}
        </span>
        <!-- ko ifnot: $root.contentModel.enableOrderEdit() == 1 -->
        <span data-bind="text: productQuantity" class="wk-flex-1 text-center"></span>
        <span class="price wk-flex-2 text-center">
            <span data-bind="text: currency" class="wk-flex-3 text-center"></span>
            <span data-bind="text: totalPricePerProduct" class="wk-flex-3 text-center"></span>
        </span>
        <span class="price wk-flex-2 text-center">
            <span data-bind="text: currency" class="wk-flex-3 text-center"></span>
            <span data-bind="text: productPrice" class="wk-flex-3 text-center"></span>
        </span>
        {* <span data-bind="text: productPrice" class="wk-flex-2 text-right"></span>
            <span data-bind="text: totalPricePerProduct" class="wk-flex-2 text-right"></span> *}
        {* <span class="wk-flex-1">@</span> *}
        {* <span class="wk-flex-1"></span> *}
        <!-- /ko -->
        <!-- ko if: $root.contentModel.enableOrderEdit() == 1 -->
        {* <input type="number" data-bind="value: totalPrice" class="wk-flex-5 form-control" min="0"/> *}
        <input type="number" data-bind="value: productQuantity" class="wk-flex-1 form-control" min="0"
            style="margin-right: 5px;" />
        <input type="number"
            data-bind="value: orderEditPrice,  event: { blur: $root.contentModel.updateProductEditAmount}"
            class="wk-flex-2 form-control" min="0" />
        <span data-bind="text: changedtotalPricePerProduct" class="wk-flex-2 text-right"></span>
        <!-- /ko -->
        <!-- ko if: $root.bodyPanel() == 'orders' -->
        <!-- ko if: $root.contentModel.selectedOrderType() == 'current_session' -->
        <!-- ko ifnot: $root.contentModel.enableOrderEdit() == 1 -->
        <span class="wk-flex-1 ">
            <span class="btn wkpos-btn wkpos-order-action"
                data-bind="click: $root.contentModel.deleteOrderProductDetails"><i class="fa fa-trash"></i></span>
        </span>
        <!-- /ko -->
        <!-- ko if: $root.contentModel.enableOrderEdit() == 1 -->
        <span class="wk-flex-1 ">
            <span class="btn wkpos-btn wkpos-order-action"
                data-bind="click:  $root.contentModel.updateOrderProductDetails"><i class="fa fa-save"></i></span>
        </span>
        <!-- /ko -->
        <!-- /ko -->
        <!-- ko if: return_qty > 0 -->
        <div class="wk-flex-2 text-right">
            <span data-bind="text: return_qty"></span><br>
            <span class="price">
                <span data-bind="text: currency" class="wk-flex-3 text-right"></span>
                <span data-bind="text: return_amount"></span><br>
                {l s='Refund' mod='wkpos'}
            </span>
        </div>
        <!-- /ko -->

        <!-- ko if: $root.contentModel.alreadyRefund() -->
            <!-- ko if: return_qty == 0 -->
            <span class="text-center wk-flex-2">
                &nbsp;
            </span>
            <!-- /ko -->
        <!-- /ko -->


        <!-- /ko -->
        {* <div class="row wk-ordered-product-line">
        </div> *}
    </div>
    <!-- ko if: $root.bodyPanel() == 'orders' && $root.contentModel.enableOrderReturn() == 1 && quantity_refundable() > 0 -->
    <div class="row">
        <div class="col-md-offset-3 col-md-4">
            <div class="input-group">
                <input type="number" class="form-control" name="partial_refund" pattern="[0,9]" onkeypress="return event.charCode >= 48 && event.charCode <= 57" title="Numbers only"
                    data-bind="value: partialRefundQty, event: { blur: $root.contentModel.updateProductReturnQty}"
                    min="0">
                <div class="input-group-addon">/ <span data-bind="text: quantity_refundable"></span></div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="input-group">
                <input type="number" class="form-control" name="partial_Refund_amount"
                    data-bind="value: partialRefundAmount,  event: { blur: $root.contentModel.updateProductReturnAmount}"
                    min="0">
                <div class="input-group-addon">{$currencySign|escape:'htmlall':'UTF-8'}</div>
            </div>
        </div>
    </div>
    <!-- /ko -->
</div>
