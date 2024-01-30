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

<div class="clearfix " id="customers">
    <!-- ko if: $root.contentModel.emptyCustomers() -->
    <div class="col-md-12 col-xs-12 text-left margin-top-15">
        <div class="alert alert-warning">{l s='No customer found' mod='wkpos'}</div>
    </div>
    <div class="col-md-12 col-xs-12">
        <a class="btn wkpos-payment-customer wk-add-customer" data-bind="click: $root.contentModel.addNewCusomer">
            <i class="fa fa-plus"></i>
            <span>{l s='Add Customers' mod='wkpos'}</span>
        </a>
    </div>
    <!-- /ko -->
    <!-- ko if: $root.contentModel.emptyCustomers() == false -->
    <div class="col-sm-6 col-xs-6 text-left wkpos-scrollbar wk-height-100" id="wk-customer-panel">
        {* <div class="wkpos-search clearfix wk-d-flex">
                <div class="input-group wk-flex-8">
                    <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    <input type="text" class="form-control" placeholder="{l s='Search Customers by Name, Email' mod='wkpos'}" data-bind="event: { keyup: $root.contentModel.searchCustomer }, textInput: $root.contentModel.customerSearchKey">
                </div>
                {if isset($guestAccountEnabled) && $guestAccountEnabled}
                    <span class="input-group-addon wkpos-guest-btn"  data-bind="click: $root.contentModel.selectGuestAccount">
                        <span title="{l s='Select Guest Account' mod='wkpos'}">{l s='Guest' mod='wkpos'}</span>
                    </span>
                {/if}
            </div> *}

        <div class="wkpos-search clearfix">
            <div class="input-group mb-3" style="display: flex;">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false"
                        data-bind="text: $root.contentModel.selectedSearchType()"></button>
                    <div class="dropdown-menu">
                        {foreach from=$customerSearchTypes item=searchMethod}
                            <a class="dropdown-item"
                                data-bind="click: $root.contentModel.changeCustomerSearchType.bind($data, {$searchMethod.search_id|escape:'htmlall':'UTF-8'})"
                                data-id="{$searchMethod.search_id|escape:'htmlall':'UTF-8'}">{$searchMethod.name|escape:'htmlall':'UTF-8'}</a>
                        {/foreach}
                    </div>
                </div>
                <input type="text" class="form-control"
                    placeholder="{l s='Search Customers by Name, Address, Email' mod='wkpos'}"
                    data-bind="event: { keyup: $root.contentModel.searchCustomer }, textInput: $root.contentModel.customerSearchKey">
                {if isset($guestAccountEnabled) && $guestAccountEnabled}
                    <div class="input-group-prepend">
                        <span class="input-group-addon wkpos-guest-btn"
                            data-bind="click: $root.contentModel.selectGuestAccount">
                            <span title="{l s='Select Guest Account' mod='wkpos'}">{l s='Guest' mod='wkpos'}</span>
                        </span>
                    </div>
                {/if}
            </div>
            {* <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    <input type="text" class="form-control" placeholder="{l s='Search Customers by Name, Address, Email' mod='wkpos'}" data-bind="event: { keyup: searchCustomer }, textInput: customerSearchKey">
                </div> *}
        </div>
        <!-- ko if: $root.contentModel.customers().length == 0 -->
        <div class="col-md-12 text-left">
            <div class="alert alert-warning">{l s='No customer found' mod='wkpos'}</div>
        </div>
        <!-- /ko -->
        <!-- ko if: $root.contentModel.customers().length > 0 -->
        <div data-bind="foreach: $root.contentModel.customers" class="wk-customers-detail">
            <div class="customer-details col-md-12"
                data-bind="attr: { 'id-customer': idCustomer }, css: { 'cart-product-selected': $root.contentModel.activeCustomerId() == idCustomer }, click: $root.contentModel.selectCustomer">
                <div class="name" data-bind="text: customerName"></div>
                <div class="email">
                    <i class="fa fa-envelope"></i>
                    <span data-bind="text: customerEmail"></span>
                </div>
            </div>
        </div>
        <!-- /ko -->
    </div>
    <div class="col-sm-6 col-xs-6 wk-height-100 wkpos-scrollbar">
        <div class="row">
            <div class="col-md-12 customer-detail">
                <div class="vertical-middle">
                    <!-- ko if: $root.contentModel.selectedCustomerId() == 0 || $root.contentModel.selectedCustomerId() == '' -->
                    <div>
                        <div class="alert alert-warning">{l s='Please select the customer' mod='wkpos'}</div>
                    </div>
                    <!-- /ko -->
                    <i class="fa fa-user-circle wkpos-icon-color"></i>
                    <div class="name" data-bind="text: $root.contentModel.customerName"></div>
                    {* <div class="contact">
                            <i class="fa fa-phone"></i>
                            <span data-bind="text: customerContact"></span>
                        </div> *}
                    <div class="email">
                        <i class="fa fa-envelope wkpos-icon-color"></i>
                        <span data-bind="text: $root.contentModel.customerEmail"></span>
                    </div>
                    <div class="address">
                        <i class="fa fa-map-marker wkpos-icon-color"></i>
                        <span>{l s='Address' mod='wkpos'}</span>
                        <select class="form-control" data-bind="options: $root.contentModel.customerAddresses,
                            optionsText: 'aliasName',
                            optionsValue: 'idAddress',
                            value: $root.contentModel.selectedIdAddress,
                            event: { change: $root.contentModel.selectDeliveryAddress }"></select>
                        <!-- ko foreach:$root.contentModel.customerAddressesDetails -->
                        <div class="wkpos-customer-address">
                            {* <span class='btn wkpos-btn wk-address-edit'>{l s='Edit' mod='wkpos'}</span> *}
                            <div class="company-name" data-bind="text: companyName"></div>
                            <div class="address1" data-bind="text: address1"></div>
                            <div class="address2" data-bind="text: address2"></div>
                            <div class="city-postcode">
                                <span class="pos-code" data-bind="text: postcode"></span>
                                <span> - </span>
                                <span class="city" data-bind="text: city"></span>
                            </div>
                            <div class="state" data-bind="text: state"></div>
                            <div class="country" data-bind="text: country"></div>
                            <div class="phone" data-bind="text: phone"></div>
                            <div class="phone-mobile" data-bind="text: phone_mobile"></div>
                            <div class="pos-phone" data-bind="text: pos_phone"></div>
                        </div>
                        <!-- /ko -->
                        {* <!-- /ko --> *}
                    </div>
                    <div class="change-customer">
                        {* <div>
                                <a class="btn wkpos-btn wkpos-change-customer" data-bind="click: $root.changeCustomer, attr: { 'customer-id': idCustomer }" customer-id="2">
                                    {l s='Change Customers' mod='wkpos'}
                                </a>
                            </div> *}
                        <!-- ko if: $root.contentModel.customerAddresses().length == 0 -->
                        <div class="text-right">
                            <a class="btn wkpos-btn wkpos-change-customer"
                                data-bind="click: $root.contentModel.addNewAddress">{l s='Add Address' mod='wkpos'}</a>
                        </div>
                        <!-- /ko -->
                        <!-- ko if: $root.contentModel.customerAddresses().length > 0 -->
                        <div class="text-right">
                            <a class="btn wkpos-btn wkpos-change-customer"
                                data-bind="click: $root.contentModel.editCustomerDetails">{l s='Edit' mod='wkpos'}</a>
                        </div>
                        <!-- /ko -->
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <a class="btn wkpos-payment-customer wk-add-customer"
                    data-bind="click: $root.contentModel.addNewCusomer">
                    <i class="fa fa-plus"></i>
                    <span>{l s='Add Customers' mod='wkpos'}</span>
                </a>
            </div>
            <!-- ko if: $root.contentModel.displayCart() == 0 && $root.contentModel.productCart().length > 0 -->
            <div class="wkpos-customer-pay-btn col-sm-12">
                <div>
                    <a class="btn wk-checkout-btn wk-pay-btn"
                        data-bind="click: $root.contentModel.proceedToPay, css: { 'disabled': $root.contentModel.productCart().length == 0 }">
                        <span>{l s='Proceed to checkout' mod='wkpos'}</span>
                    </a>
                </div>
            </div>
            <!-- /ko -->
        </div>
    </div>
    <!-- /ko -->
</div>
