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

<div class="wk-pos-form col-md-6 col-sm-8 col-sm-offset-2 col-md-offset-3 margin-top-15 col-xs-12" id="wkpos_address">
    <div>
        {assign var="formGroup" value=""}
        <!-- ko if: $root.contentModel.displayCart() == 1 -->
        {assign var="formGroup" value="form-group"}
        <!-- /ko -->
        <div class="row" style="text-align:  center;">
            <i class="fa fa-address-card wkpos-icon-color" aria-hidden="true">
            </i>
        </div>
        <form data-bind="submit: $root.contentModel.onSubmit">
            <button type="submit" class="btn wkpos-btn save-address">{l s='Save Address' mod='wkpos'}</button>
            <div>
                <div class="row clearfix form-group">
                    <div class="col-md-12">
                        <input type="email" name="customer_email" disabled class="form-control"
                            placeholder="{l s='Email address' mod='wkpos'}"
                            data-bind="value: $root.contentModel.customerEmail" />
                    </div>
                </div>
                <div class="row clearfix form-group">
                    <div class="col-md-12">
                        <input type="text" class="form-control" placeholder="{l s='Address alias' mod='wkpos'}"
                            name="alias"
                            data-bind="value: $root.contentModel.aliasName, css: { 'required': $root.contentModel.aliasName() == '' }" />
                    </div>
                </div>
                <div class="row clearfix form-group">
                    <div class="col-md-6 {$formGroup|escape:'htmlall':'UTF-8'}">
                        <input type="text" class="form-control" placeholder="{l s='First name' mod='wkpos'}"
                            name="firstname"
                            data-bind="value: $root.contentModel.firstName, css: { 'required': $root.contentModel.firstName() == '' }" />
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="{l s='Last name' mod='wkpos'}"
                            name="lastname"
                            data-bind="value: $root.contentModel.lastName, css: { 'required': $root.contentModel.lastName() == '' }" />
                    </div>
                </div>
                <div class="row clearfix form-group">
                    <div class="col-md-6 {$formGroup|escape:'htmlall':'UTF-8'}">
                        <input type="text" class="form-control" placeholder="{l s='Company' mod='wkpos'}" name="company"
                            data-bind="value: $root.contentModel.company" />
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="{l s='VAT number' mod='wkpos'}"
                            name="vatNumber" data-bind="value: $root.contentModel.vatNumber" />
                    </div>
                </div>
                <div class="row clearfix form-group">
                    <div class="col-md-6 {$formGroup|escape:'htmlall':'UTF-8'}">
                        <input type="text" class="form-control" placeholder="{l s='Address' mod='wkpos'}"
                            name="address1"
                            data-bind="value: $root.contentModel.address1, css: { 'required': $root.contentModel.address1() == '' }" />
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="{l s='Address 2' mod='wkpos'}"
                            name="address2" data-bind="value: $root.contentModel.address2" />
                    </div>
                </div>
                <div class="row clearfix form-group">
                    <div class="col-md-6 {$formGroup|escape:'htmlall':'UTF-8'}">
                        <input type="text" class="form-control" placeholder="{l s='City' mod='wkpos'}" name="city"
                            data-bind="value: $root.contentModel.city, css: { 'required': $root.contentModel.city() == '' }" />
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control " placeholder="{l s='Zip/Postal Code' mod='wkpos'}"
                            name="postcode"
                            data-bind="value: $root.contentModel.postcode, css: { 'required': $root.contentModel.postcode() == '' }" />
                    </div>
                </div>
                <div class="row clearfix form-group">
                    <div class="col-md-6 {$formGroup|escape:'htmlall':'UTF-8'}">
                        <select name="id_country" id="id_country" class="form-control"
                            data-bind="value: $root.contentModel.selectedIdCountry, event: { change: $root.contentModel.getStates }, css: { 'required': $root.contentModel.selectedIdCountry() == 0 }">
                            <option value="0">{l s='Country' mod='wkpos'}</option>
                            {foreach from=$countriesList item=country}
                                <option value="{$country.id_country|escape:'htmlall':'UTF-8'}"
                                    {if isset ($country.need_zip_code) && $country.need_zip_code != 0}data-zip-format="{$country.zip_code_format|escape:'htmlall':'UTF-8'}"
                                    {/if} data-iso-code="{$country.iso_code|escape:'htmlall':'UTF-8'}">
                                    {$country.name|escape:'htmlall':'UTF-8'}</option>
                            {/foreach}
                        </select>
                    </div>
                    <!-- ko if: $root.contentModel.stateList().length > 0 -->
                    <div class="col-md-6">
                        <select class="form-control" data-bind="options: $root.contentModel.stateList,
                            optionsText: 'stateName',
                            optionsValue: 'idState',
                            value: $root.contentModel.selectedIdState,
                            optionsCaption: 'State', css: { 'required': $root.contentModel.selectedIdState() == 0 }">
                        </select>
                    </div>
                    <!-- /ko -->
                </div>
                <div class="row clearfix form-group">
                    <div class="col-md-6 {$formGroup|escape:'htmlall':'UTF-8'}">
                        <input type="text" class="form-control" placeholder="{l s='Home phone' mod='wkpos'}"
                            name="phone" data-bind="value: $root.contentModel.homePhone" />
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="{l s='Mobile phone' mod='wkpos'}"
                            name="phoneMobile" data-bind="value: $root.contentModel.phone" />
                    </div>
                </div>
                <div class="row clearfix form-group">
                    <div class="col-md-12">
                        <textarea type="text" name="other" class="form-control" placeholder="{l s='Other' mod='wkpos'}"
                            rows="4" data-bind="value: $root.contentModel.other"></textarea>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
