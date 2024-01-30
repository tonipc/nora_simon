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

<div class="modal fade" id="wk-pos-custom-product" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <span class="h4">{l s='Add custom product to POS cart' mod='wkpos'}</span>
                <button type="button" class="close modal-close-padding" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="row ">
                {* wk-d-flex *}
                    <form action="" id="add_custom_product" method="post">
                        <div class="form-group">
                            <label class="control-label col-sm-12 text-left" for="product_name">
                                {l s='Product name' mod='wkpos'}
                            </label>
                            <div class="col-md-12">
                                <input type="text" name="product_name" id="product_name" autocomplete="off"
                                    class="form-control" autofocus="autofocus"
                                    data-bind="textInput: $root.contentModel.customProductName"
                                    pattern="^[a-zA-Z0-9]+$">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-6">
                                <div class="row">
                                    <label class="control-label col-sm-12 text-left" for="price">
                                        {l s='Price' mod='wkpos'}
                                    </label>
                                    <div class="col-md-12">
                                        <input type="number" name="price" id="price" autocomplete="off" class="form-control"
                                            autofocus="autofocus" data-bind="textInput: $root.contentModel.customProductPrice">
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="row">
                                    <label class="control-label col-sm-12 text-left" for="quantity">
                                        {l s='Quantity' mod='wkpos'}
                                    </label>
                                    <div class="col-md-12">
                                        <input type="number" name="quantity" id="quantity" class="form-control"
                                            autofocus="autofocus" autocomplete="off"
                                            data-bind="textInput: $root.contentModel.customProductQuantity">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-12 text-left" for="tax">
                                {l s='Tax' mod='wkpos'}
                            </label>
                            <div class="col-md-12">
                                <select name="tax" id="custom-pro-tax" class="form-control" autofocus="autofocus"
                                    autocomplete="off" data-bind="textInput: $root.contentModel.customProductTax">
                                    {foreach from=$allTaxes item=tax}
                                        <option value="{$tax.id_tax_rules_group|escape:'htmlall':'UTF-8'}">{$tax.name|escape:'htmlall':'UTF-8'}</option>
                                    {/foreach}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" data-bind="click: $root.contentModel.addCustomProduct" class="btn wkpos-btn"
                    name="addToCart" id="custom-product-btn">{l s='Add to cart' mod='wkpos'}</button>
            </div>
            <div class="modal-loader" id="custom-product-loader">
                <img src="{$customProductPopUpImg|escape:'htmlall':'UTF-8'}">
                <div class="" style="color: rgb(0, 128, 0);">
                    {l s='Please wait adding custom product...' mod='wkpos'}
                </div>
            </div>
        </div>
    </div>
</div>
