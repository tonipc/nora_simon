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

<div class="col-sm-12" id="wkpos-content-panel">
    <div class="row wk-d-flex">
        <div class=" category-div col-xs-12" id='wkpos-body-panel'>
            <div class="col-xs-12 upper-category">
                <!-- ko if: $root.bodyPanel() == "products" -->
                <ul class="wk-flex-10 lower-category"  data-bind="css: $root.contentModel.remainingCategories().length == 0 ? 'wk-flex-10' : 'wk-flex-8'">
                    <li class="hidden-xs wkpos-category-list" data-bind="foreach: $root.contentModel.categories">
                        <div class="wk-d-flex wk-pos-category-heading ">
                            <div class="wk-cursor-pointer"
                                data-bind="attr: { 'category-id': idCategory }, css: { 'active': $root.contentModel.selectedCategory() == idCategory }, text: categoryName, click: $root.contentModel.getCategoryWsProduct">
                            </div>
                            <!-- ko if: hasChildren == 1 -->
                            <i class="fa fa-plus font-22 pull-right wk-p-17-8"
                                data-bind="attr: { 'category-id': idCategory }, click: $root.contentModel.displaySubCategories"></i>
                            <!-- /ko -->
                        </div>
                    </li>
                    <!-- ko if: $root.contentModel.remainingCategories().length > 0 -->
                    <li class="menu-dropdown">
                        <span id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <div class="wkcategory categoryProduct wkicon-expand">
                                <i class="fa fa-list font-22"></i>
                            </div>
                        </span>
                        {* <ul class="dropdown-menu wk-category-list" aria-labelledby="dLabel"> *}
                        <ul class="dropdown-menu wk-category-list wkpos-scrollbar" aria-labelledby="dLabel"
                            style="overflow:hidden; overflow-y:scroll;height:500px; width:250px;">
                            <!-- ko foreach: $root.contentModel.remainingCategories -->
                            <li class="wkcategory categoryProduct">
                                <span
                                    data-bind="attr: { 'category-id': idCategory }, css: { 'active': $root.contentModel.selectedCategory() == idCategory }, text: categoryName, click: $root.contentModel.getCategoryWsProduct"></span>
                                <!-- ko if: hasChildren == 1 -->
                                <i class="fa fa-plus font-22 pull-right wk-p-4"
                                    data-bind="attr: { 'category-id': idCategory }, click: $root.contentModel.displaySubCategories"></i>
                                <!-- /ko -->
                            </li>
                            <!-- /ko -->
                        </ul>
                    </li>
                    <!-- /ko -->
                </ul>
                <div class="wk-flex-2" data-bind="css: $root.contentModel.remainingCategories().length == 0 ? 'wk-flex-2' : 'wk-flex-4'">
                    <i class="categoryProduct wkcategory fa fa-sort-alpha-asc"
                        data-bind="click: $root.contentModel.sortProductByAsc, css: { 'active': $root.contentModel.selectedSortType() == 'asc' }"
                        aria-hidden="true"></i>
                    <i class="categoryProduct wkcategory fa fa-sort-alpha-desc"
                        data-bind="click: $root.contentModel.sortProductByDesc, css: { 'active': $root.contentModel.selectedSortType() == 'desc' }"
                        aria-hidden="true"></i>
                </div>
                <!-- /ko -->
                <!-- ko if: $root.bodyPanel() == "customers" -->
                <div class="col-xs-12">
                    <div class="col-md-6 wkpos-customer-heading"><span>{l s='Customer' mod='wkpos'}</span></div>
                    <div class="col-md-6 wkpos-customer-heading"><span>{l s='Address' mod='wkpos'}</span></div>
                </div>
                <!-- /ko -->
                {if isset($shippingEnabled) && $shippingEnabled}
                    <!-- ko if: ($root.bodyPanel() === "shipping") -->
                    <div class="col-xs-12 wkpos-customer-heading">
                        <span>{l s='Shipping' mod='wkpos'}</span>
                    </div>
                    <!-- /ko -->
                {/if}
                {hook h="displayPosBodyPanelHeading"}
            </div>
            <div class="col-md-12 col-xs-12 text-center wkpos-body">
                <div class="row">
                    <!-- ko if: $root.bodyPanel() == "products" -->
                    <!-- ko if: $root.contentModel.products().length == 0 -->
                    <div class="col-md-12 margin-top-15">
                        <div class="alert alert-warning">{l s='No product found' mod='wkpos'}</div>
                    </div>
                    <!-- /ko -->
                    <div class="col-xs-12 wkpos-scrollbar" id="wk-product-panel">
                        <div class="wk-products clearfix" data-bind="foreach: $root.contentModel.products">
                            <div class="col-md-3 col-sm-6 col-xs-6 product-select" product-id="" options=""
                                data-bind="attr: { 'product-id': idProduct, 'options': hasCombination }, click: $root.contentModel.addProductToCart">
                                <div class="clearfix">
                                    {* <!-- ko if: $root.navigatorOnline() --> *}
                                    <img src="" class="img-responsive" data-id-product=""
                                        data-bind="attr: { src: imagePath, alt: name }">
                                    {* <!-- /ko -->
                                        <!-- ko if: $root.navigatorOnline() == false -->
                                            <span data-bind="text: name"></span>
                                        <!-- /ko --> *}
                                    <div class="col-xs-12 product-detail">
                                        <span data-bind="text: displayName"></span><br>
                                        {* <!-- ko if: showPrice == 1 --> *}
                                        <b data-bind="attr: { 'product-price': price }, text: displayPrice"></b>
                                        <!-- ko if: $root.contentModel.showPriceWithoutReduction() == 1 -->
                                        <br>
                                        <s>
                                            <b data-bind="attr: { 'product-price': price }, text: displayPriceWithoutReduction"></b>
                                        </s>
                                        <!-- /ko -->
                                        {* <!-- /ko --> *}
                                        {* <del class="line-through">$98.00</del> *}
                                        <br>
                                        <span> Stock :</span>
                                        <b data-bind="attr: { 'product-qty': displayAvailQty }, text: displayAvailQty"></b>
                                        <!-- ko if: $root.contentModel.showStockLocation() == 1 -->
                                        <br>
                                        <div data-bind=" css: { 'hide' : displayStockLocation() == '' } ">
                                            <span> Stock Location:</span>
                                            <b data-bind="attr: { 'stock-location': displayStockLocation }, text: displayStockLocation"></b>
                                        </div>
                                        <!-- /ko -->
                                    </div>
                                </div>
                                <!-- ko if: hasCombination && {$displayCombinationTag|escape:'htmlall':'UTF-8'} -->
                                <span class="label label-info combination-noti" data-toggle="tooltip"
                                    title="{l s='This product contain combinations' mod='wkpos'}">
                                    <i class="fa fa-clone "></i>
                                </span>
                                <!-- /ko -->
                                {* <span class="label label-danger special-tag" data-toggle="tooltip" title='{l s='This product is on discount.' mod='wkpos'}'>
                                        <i class="fa fa-star"></i>
                                    </span> *}
                                <!-- ko if: quantity() <= {$displayLowStockAfter|escape:'htmlall':'UTF-8'} -->
                                <span class="label label-danger low-stock" data-toggle="tooltip"
                                    title="{l s='Low Stock Products' mod='wkpos'}">
                                    <i class="fa fa-exclamation-triangle"></i>
                                </span>
                                <!-- /ko -->
                            </div>
                        </div>
                    </div>
                    {block name='wkpos_combination_select'}
                        <div class="modal fade" id="wk-pos-product-combination" tabindex="-1" role="dialog"
                            aria-labelledby="myModalLabel">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <span class="h4" data-bind="text: $root.contentModel.selectedCombinationProductName"></span>
                                        <button type="button" class="close modal-close-padding" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div class="modal-body combination">
                                        <div class="row wk-d-flex">
                                            <!-- ko ifnot: $root.contentModel.selectedCombinationImage() == '' -->
                                                <div class="col-md-4 col-sm-4 col-xs-4"
                                                    data-bind="if: $root.contentModel.selectedCombinationImage">
                                                    <img src="" class="img-responsive"
                                                    data-bind="attr: { src: $root.contentModel.selectedCombinationImage }" />
                                                    <br>
                                                    <div class="row">
                                                        <div class="col-md-6 margin-top-15">
                                                            <div class="combination-modal-head">
                                                                {l s='Stock' mod='wkpos'}
                                                            </div>
                                                            <div class="wk-padding-0 margin-top-15">
                                                                <span data-bind="text: $root.contentModel.combinationAvalQty"
                                                                    class="combination-price"></span>
                                                            </div>
                                                        </div>
                                                        <!-- ko if: $root.contentModel.showStockLocation() == 1 -->
                                                        <div class="col-md-6 margin-top-15" data-bind=" css: { 'hide' : $root.contentModel.combinationStockLocation() == '' } ">
                                                            <div class="combination-modal-head">
                                                                {l s='Location' mod='wkpos'}
                                                            </div>
                                                            <div class="wk-padding-0 margin-top-15">
                                                                <span data-bind="text: $root.contentModel.combinationStockLocation"
                                                                    class="combination-price"></span>
                                                            </div>
                                                        </div>
                                                        <!-- /ko -->
                                                    </div>
                                                </div>
                                            <!-- /ko -->
                                            <!-- ko if: $root.contentModel.selectedCombinationImage() == '' -->
                                            <div class="col-md-4 col-sm-4 col-xs-4 combination-price-block" data-bind="foreach: $root.contentModel.productCombination"
                                                class="clearfix col-md-8 col-sm-8 col-xs-8">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="combination-modal-head" data-bind="text: groupName"
                                                            class="groupName"></div>
                                                        <div data-bind="foreach: productAttribute">
                                                            {* "attr: { 'product-id': idProduct, 'options': hasCombination }, click: $root.contentModel.addProductToCart" *}
                                                            <span
                                                                data-bind="attr: { 'product-id': idProduct, 'attribute-id': idAttribute }, click: $root.contentModel.selectCombination, css: selected, text: attributeName"
                                                                class="product-combination"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /ko -->
                                            <!-- ko ifnot: $root.contentModel.selectedCombinationImage() == '' -->
                                            <div class="col-md-4 col-sm-4 col-xs-4 combination-price-block" data-bind="foreach: $root.contentModel.productCombination"
                                                class="clearfix col-md-5 col-sm-8 col-xs-4">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="combination-modal-head" data-bind="text: groupName"
                                                            class="groupName"></div>
                                                        <div data-bind="foreach: productAttribute">
                                                            {* "attr: { 'product-id': idProduct, 'options': hasCombination }, click: $root.contentModel.addProductToCart" *}
                                                            <span
                                                                data-bind="attr: { 'product-id': idProduct, 'attribute-id': idAttribute }, click: $root.contentModel.selectCombination, css: selected, text: attributeName"
                                                                class="product-combination"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /ko -->
                                            <div class="col-md-4 col-sm-4 col-xs-4 combination-price-block">
                                                <div class="row">
                                                    <div class="combination-modal-head">
                                                        {l s='Quantity' mod='wkpos'}
                                                    </div>
                                                    <div class="col-md-4 wk-padding-0 margin-top-15">
                                                        <input type="text" class="form-control col-md-5"
                                                            data-bind="value: $root.contentModel.combinationQuantity" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-xs-6 padding-0">
                                                        <span class="clearfix">
                                                            <button type="button"
                                                                class="form-control pull-left product-cart-item-update"
                                                                title="{l s='Decrease Quantity' mod='wkpos'}"
                                                                data-bind="click: $root.contentModel.decreaseCombinationQuantity">
                                                                <i class="fa fa-minus"></i>
                                                            </button>
                                                            <button type="button"
                                                                class="form-control pull-left product-cart-item-update"
                                                                title="{l s='Increase Quantity' mod='wkpos'}"
                                                                data-bind="click: $root.contentModel.increaseCombinationQuantity">
                                                                <i class="fa fa-plus"></i>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="row margin-top-15">
                                                    <div class="combination-modal-head">
                                                        {l s='Price' mod='wkpos'}
                                                    </div>
                                                    <div class="wk-padding-0 margin-top-15">
                                                        <span data-bind="text: $root.contentModel.combinationPrice"
                                                            class="combination-price"></span>
                                                    </div>
                                                </div>
                                                <div class="row margin-top-15">
                                                    <!-- ko if: $root.contentModel.showPriceWithoutReduction() == 1 -->
                                                    <div class="combination-modal-head">
                                                        {l s='Original Price' mod='wkpos'}
                                                    </div>
                                                    <div class="wk-padding-0 margin-top-15">
                                                        <s><span
                                                            data-bind="text: $root.contentModel.combinationDisplayPriceWithoutReduction"
                                                            class="combination-price"></span></s>
                                                    </div>
                                                    <!-- /ko -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" data-bind="click: $root.contentModel.addCombinationToCart"
                                            class="btn wkpos-btn" name="addToCart"
                                            id="">{l s='Add To Cart' mod='wkpos'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/block}
                    {block name='wkpos_category_tree'}
                        <!-- ko if: ($root.contentModel.displaySubCategoriesFlag() === 1) -->
                        {include file="module:wkpos/views/templates/front/partials/wkpos_category.tpl"}
                        <!-- /ko -->
                    {/block}
                    <!-- /ko -->
                    <!-- ko if: $root.bodyPanel() == "customers" -->
                    {include file="module:wkpos/views/templates/front/partials/wkpos_customer.tpl"}
                    <!-- /ko -->
                    {if isset($shippingEnabled) && $shippingEnabled}
                        <!-- ko if: ($root.bodyPanel() === "shipping") -->
                        {include file="module:wkpos/views/templates/front/partials/wkpos_shipping.tpl"}
                        <!-- /ko -->
                    {/if}
                    {hook h="displayPosBodyPanel"}
                </div>
            </div>
        </div>
    </div>
</div>
