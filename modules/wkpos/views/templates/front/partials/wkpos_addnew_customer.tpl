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

<div class="col-xs-12">
    <div class="row">
        <ul class="nav nav-tabs" role="tablist">
            <!-- ko if: $root.contentModel.issetCustomer() == 1 -->
            <li role="presentation" class="wkpos-text-color active wk-customer-tab-link"
                data-bind="click: $root.contentModel.addNewCustomer, css: { 'active': $root.contentModel.customerPanel() == 'customer' }">
                <a class="wkpos-text-color" data-bind="text: $root.contentModel.customerHeading">
                </a>
            </li>
            <!-- /ko -->
            <!-- ko if: $root.contentModel.issetCustomer() == 0 -->
            <li role="presentation" class="wkpos-text-color active wk-customer-tab-link"
                data-bind="click: $root.contentModel.editCustomerDetails, css: { 'active': $root.contentModel.customerPanel() == 'customer' }">
                <a class="wkpos-text-color" data-bind="text: $root.contentModel.customerHeading">
                </a>
            </li>
            <!-- ko if: $root.contentModel.selectedIdAddress() != {$idOutletAddress|escape:'htmlall':'UTF-8'} -->
            <li role="presentation" id="add-address" class="wkpos-text-color wk-customer-tab-link"
                data-bind="click: $root.contentModel.addNewAddress, css: { 'active': $root.contentModel.customerPanel() == 'address' }">
                <a class="wkpos-text-color">
                    {l s='Address' mod='wkpos'}
                </a>
            </li>
            <!-- /ko -->
            <!-- ko if: $root.contentModel.customerAddresses().length > 0 -->
            <li role="presentation" class="wkpos-text-color wk-customer-tab-link" id="add-address"
                data-bind="click: $root.contentModel.addAddress, css: { 'active': $root.contentModel.customerPanel() == 'addaddress' }">
                <a class="wkpos-text-color">
                    {l s='Add New Address' mod='wkpos'}
                </a>
            </li>
            <!-- /ko -->
            <!-- /ko -->
            {hook h="displayPosOrderTab"}
        </ul>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="add_customer_panel">
                <div class="wkpos-scrollbar wkpos-body">
                    <!-- ko if: $root.contentModel.customerPanel() == 'customer' -->
                    <div
                        class="col-md-6 col-sm-8 col-sm-offset-2 col-md-offset-3 wkpos-scrollbar wk-pos-customer-details">
                        <div class="col-md-12 wk-customer-setting">
                            <form action="" id="wkpos_add_new_customer" method="post"
                                data-bind="submit: $root.contentModel.addCustomer">
                                <div class="row text-center">
                                    <i class="fa fa-user-circle wkpos-icon-color"></i>
                                </div>
                                <div class="clearfix form-group gender">
                                    <div class="col-md-12" data-bind="foreach: $root.contentModel.titles">
                                        <span>
                                            <input type="radio" name="idGender" class=""
                                                data-bind="value: idGender, attr: { 'id': name }, checked: $root.contentModel.selectedTitle">
                                            <label data-bind="attr: { 'for': name }, text: name"></label>
                                        </span>
                                    </div>
                                </div>
                                {assign var="formGroup" value=""}
                                <!-- ko if: $root.contentModel.displayCart() == 1 -->
                                {assign var="formGroup" value="form-group"}
                                <!-- /ko -->
                                <div class="clearfix form-group">
                                    <div class=" col-md-6 {$formGroup|escape:'htmlall':'UTF-8'}">
                                        <input type="text" class="form-control" name="firstname" value=""
                                            placeholder="{l s='First name' mod='wkpos'}"
                                            data-bind="value: $root.contentModel.firstName, css: { 'required': $root.contentModel.firstName() == '' }">
                                    </div>
                                    <div class=" col-md-6">
                                        <input type="text" class="form-control" name="lastname" value=""
                                            placeholder="{l s='Last name' mod='wkpos'}"
                                            data-bind="value: $root.contentModel.lastName, css: { 'required': $root.contentModel.lastName() == '' }">
                                    </div>
                                </div>
                                <div class="clearfix form-group">
                                    <div class="col-md-12">
                                        <input type="text" class="form-control" name="email" value=""
                                            placeholder="{l s='Email address' mod='wkpos'}"
                                            data-bind="value: $root.contentModel.customerEmail, css: { 'required': $root.contentModel.customerEmail() == '' }">
                                    </div>
                                </div>
                                {* <div class="clearfix form-group">
                                    <div class="col-md-12">
                                        <input type="text" class="form-control phone-number" name="phone" value="" placeholder="{l s='Phone' mod='wkpos'}" data-bind="value: phone">
                                    </div>
                                </div> *}
                                <div class="clearfix form-group">
                                    <div class=" col-md-12">
                                        <input type="password" class="form-control" name="password"
                                            placeholder="{l s='Password' mod='wkpos'}"
                                            data-bind="value: $root.contentModel.customerPassword, css: { '': $root.contentModel.customerPassword() == '' }">
                                    </div>
                                </div>
                                <div class="clearfix form-group">
                                    <div class=" col-md-12">
                                        <input type="text" class="form-control" name="customer_phone"
                                            placeholder="{l s='Phone Number' mod='wkpos'}"
                                            data-bind="textInput: $root.contentModel.customerPhone, css: { '': $root.contentModel.customerPhone() == '' }">
                                    </div>
                                </div>
                                <div class="clearfix form-group">
                                    {* <p class="info-text col-md-6"></p>
                                    <p class="info-text col-md-6">{l s='(Date of birth)' mod='wkpos'}</p> *}
                                    <div class="col-md-12"><label for="days">{l s='Date of birth' mod='wkpos'}</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <select name="days" id="days" class="form-control"
                                            data-bind="selectedOptions: $root.contentModel.days()">
                                            <option value="">{l s='DD' mod='wkpos'}</option>
                                            {foreach from=$days item=v}
                                                <option value="{$v|escape:'htmlall':'UTF-8'}">
                                                    {$v|escape:'htmlall':'UTF-8'}&nbsp;&nbsp;</option>
                                            {/foreach}
                                        </select>
                                    </div>
                                    <div class="col-sm-3">
                                        <select id="months" name="months" class="form-control"
                                            data-bind="selectedOptions: $root.contentModel.months()">
                                            <option value="">{l s='MM' mod='wkpos'}</option>
                                            {foreach from=$months key=k item=v}
                                                <option value="{$k|escape:'htmlall':'UTF-8'}">{l s=$v mod='wkpos'}&nbsp;
                                                </option>
                                            {/foreach}
                                        </select>
                                    </div>
                                    <div class="col-sm-3 col-sm-4">
                                        <select id="years" name="years" class="form-control"
                                            data-bind="selectedOptions: $root.contentModel.years()">
                                            <option value="">{l s='YYYY' mod='wkpos'}</option>
                                            {foreach from=$years item=v}
                                                <option value="{$v|escape:'htmlall':'UTF-8'}">
                                                    {$v|escape:'htmlall':'UTF-8'}&nbsp;&nbsp;</option>
                                            {/foreach}
                                        </select>
                                    </div>
                                </div>
                                <div class="clearfix col-md-12">
                                    <input type="checkbox" class="newsletter" id="newsletter" name="newsletter"
                                        data-bind="checked: $root.contentModel.newsLetter">
                                    <label for="newsletter">{l s='Sign up for newsletter' mod='wkpos'}</label>
                                </div>
                                {if Configuration::get('WKPOS_CUSTOMER_GROUP')}
                                    <div class="customer-group form-group col-md-12">
                                        <h4></h4>
                                        <table class="table bordered-row table-striped">
                                            <thead>
                                                <tr>
                                                    <th>{l s='ID' mod='wkpos'}</th>
                                                    <th class="name">{l s='Name' mod='wkpos'}</th>
                                                    <th>{l s='Access' mod='wkpos'}</th>
                                                    <th>{l s='Default' mod='wkpos'}</th>
                                                </tr>
                                            </thead>
                                            <tbody data-bind="foreach: $root.contentModel.customerGroups">
                                                <tr>
                                                    <td data-bind="text: idGroup"></td>
                                                    <td class="name" data-bind="text: groupName"></td>
                                                    <td><input type="checkbox" class="" name="groupsAccess"
                                                            data-bind="attr: { 'disabled': idGroup == $root.contentModel.defaultGroup() }, value: idGroup, checked: $root.contentModel.groupAccess()">
                                                    </td>
                                                    {* <td><input type="checkbox" class="" name="groupsAccess" data-bind="attr: { 'disabled': idGroup $root.contentModel.defaultGroup() }, value: idGroup, checked: $root.contentModel.groupAccess()"></td> *}
                                                    <td><input type="radio" class="" name="defaultGroup"
                                                            data-bind="attr: { 'disabled': idGroup != $root.contentModel.defaultGroup() }, value: idGroup, checked: $root.contentModel.defaultGroup()">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                {/if}
                                <div class="form-actions clearfix text-right">
                                    <button type="submit" class="btn wkpos-btn">{l s='Save' mod='wkpos'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- /ko -->
                    <!-- ko if: $root.contentModel.customerPanel() == 'address' || $root.contentModel.customerPanel() == 'addaddress' -->
                    {include file="module:wkpos/views/templates/front/partials/wkpos_add_address.tpl"}
                    <!-- /ko -->
                </div>
                {hook h="displayPosOrderContent"}
            </div>
        </div>
    </div>
</div>
