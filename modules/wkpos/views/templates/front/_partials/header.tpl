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

{block name='header_banner'}
    <div class="header-banner">
        {hook h='wkposDisplayBanner'}
    </div>
{/block}

{block name='header_nav'}
    <nav class="header-nav">
        <div class="container-fluid wk-pos"">
      <div class=" row">
        <div class="col-xs-12">
            <div class="row" id="wkpos-header">
                {block name='pos_heading'}
                <div class="col-xs-12 col-sm-3 wk-flex-grow">
                    <span style="font-size: 26px; line-height: 1.9;">{$wkposHeading|escape:'htmlall':'UTF-8'}</span>
                </div>
                {/block}
                {block name='pos_product_search'}
                <div class="col-xs-4 col-sm-4 pull-right col-md-offset-1 wk-pos-features" id="wkpos-product-search">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                        <input type="text" class="form-control"
                            placeholder="{l s='Search Product by Name, Barcode, Product Id' mod='wkpos'}"
                            data-bind="event: { keyup: $root.contentModel.searchProduct }, value: $root.contentModel.productSearchKey, valueUpdate: ['afterkeydown', 'input']">
                        <span class="input-group-addon"><i class="fa fa-barcode"></i></span>
                    </div>
                </div>
                {/block}
                {block name='syncronize_indicator'}
                <!-- ko if: $root.contentModel.emptyOfflineOrders() -->
                <div class="pull-right wk-pos-features" data-bind="click: $root.contentModel.synchroniseOrder"
                    title="{l s='synchronise' mod='wkpos'}">
                    <a class="" id="wk_pos_sync"><i class="fa fa-refresh"
                            style="line-height: 1.9; color: #FFB4C0;"></i></a>
                </div>
                <!-- /ko -->
                {/block}
                {block name='navigator_block'}
                <div class="pull-right wk-pos-features"
                    data-bind="click: $root.contentModel.toggleNavigator, attr: { title: $root.navigatorOnline()? '{l s='online' mod='wkpos' }' : '{l s='offline' mod='wkpos'}' }">
                    <i class="fa fa-wifi"
                        data-bind="css: { 'wkpos-online-mode': $root.navigatorOnline() == true, 'wkpos-offline-mode': $root.navigatorOnline() == false }"></i>
                </div>
                {/block}
                {block name='printer_block'}
                <!-- ko if: $root.navigatorOnline() == true -->
                <div class="pull-right wk-pos-features" data-bind="click: $root.contentModel.openCustomProductForm"
                    title="{l s='Add Custom product' mod='wkpos'}">
                    <a class="" id="wk_pos_sync"><i class="fa fa-plus"
                            style="line-height: 1.9; color: #FFB4C0;"></i></a>
                </div>
                <!-- /ko -->
                {/block}
                {block name='printer_block'}
                <div class="pull-right wk-pos-features">
                    <!-- ko if: $root.contentModel.printerConnected() -->
                    <i class="fa fa-print wk-cursor-pointer wkpos-online-mode"
                        data-bind="click: $root.contentModel.connectPrinter" aria-hidden="true"
                        title="{l s='Connect Printer' mod='wkpos'}"></i>
                    <!-- /ko -->
                    <!-- ko if: !$root.contentModel.printerConnected() -->
                    <i class="fa fa-print wk-cursor-pointer wkpos-offline-mode"
                        data-bind="click: $root.contentModel.connectPrinter" aria-hidden="true"
                        title="{l s='Connect Printer' mod='wkpos'}"></i>
                    <!-- /ko -->
                </div>
                {/block}
                {block name='stock_block'}
                <div class="pull-right wk-pos-features">
                    <i class="fa fa-download wk-cursor-pointer wkpos-offline-mode"
                        data-bind="click: $root.contentModel.updateStock" aria-hidden="true"
                        title="{l s='Update Stock' mod='wkpos'}"></i>
                </div>
                {/block}
                {block name='hook_block'}
                {hook h='displayPosHeaderButtons'}
                {/block}
                {block name='langugae_block'}
                {* Start Language Block *}
                {if $languages|count > 1}
                <!-- ko if: $root.navigatorOnline() -->
                <div class="language-selector dropdown js-dropdown pull-right wk-pos-features">
                    {foreach $languages as $language}
                    {if $language.id_lang == $selectedLanguageId}
                    <button data-toggle="dropdown" class="btn wkpos-btn btn-unstyle" aria-haspopup="true"
                        aria-expanded="false" aria-label="Language dropdown">
                        <span class="expand-more">{$language.iso_code|escape:'htmlall':'UTF-8'}</span>
                        <i class="fa fa-angle-down"></i>
                    </button>
                    {/if}
                    {/foreach}
                    <ul class="dropdown-menu hidden-sm-down" aria-labelledby="language-selector-label">
                        {foreach $languages as $language}
                        <li>
                            <a href="{url entity='language' id=$language.id_lang}" class="dropdown-item"
                                data-iso-code="en">{$language.name|escape:'htmlall':'UTF-8'}</a>
                        </li>
                        {/foreach}
                    </ul>
                </div>
                <!-- /ko -->
                {/if}
                {* End *}
                {/block}
                {block name='currency_block'}
                <!-- ko if: $root.displayCurrency() -->
                {* Start Currency Block *}
                {if $currencies|count > 1}
                <div class="language-selector dropdown js-dropdown pull-right wk-pos-features">
                    {foreach $currencies as $currency}
                    {if $currency.id == $selectedCurrencyId}
                    <button data-toggle="dropdown" class="btn wkpos-btn btn-unstyle" aria-haspopup="true"
                        aria-expanded="false" aria-label="Language dropdown">
                        <span class="expand-more">{$currency.iso_code|escape:'htmlall':'UTF-8'}</span>
                        <i class="fa fa-angle-down"></i>
                    </button>
                    {/if}
                    {/foreach}
                    <ul class="dropdown-menu hidden-sm-down" aria-labelledby="language-selector-label">
                        {foreach $currencies as $currency}
                        <li {if $currency.current} class="current" {/if}
                            data-bind="click: $root.changeCurrency.bind($data, '{$currency.url|escape:'htmlall':'UTF-8'}')">
                            <a title="{$currency.name|escape:'htmlall':'UTF-8'}" rel="nofollow"
                                href="{$currency.url|escape:'htmlall':'UTF-8'}"
                                class="dropdown-item">{$currency.iso_code|escape:'htmlall':'UTF-8'}
                                {$currency.sign|escape:'htmlall':'UTF-8'}</a>
                        </li>
                        {/foreach}
                    </ul>
                </div>
                {/if}
                {* End *}
                <!-- /ko -->
                {/block}
                {block name='employee_details'}
                <div class=" pull-right wk-pos-features font-size-12 wkpos-width-15 wkpos-employee">
                    {if isset($employeeImage) && $employeeImage}
                    <img src="{$employeeImage|escape:'htmlall':'UTF-8'}"
                        title="{$employee.firstName|escape:'htmlall':'UTF-8'} {$employee.lastName|escape:'htmlall':'UTF-8'}"
                        class="wk-emp-img wk-line-height-0 col-md-3 wk-padding-0 clearfix"></img>
                    {else}
                    <i class="fa fa-user-circle wk-line-height-0 col-md-2 wk-padding-0 clearfix"></i>
                    {/if}
                    <div class=" col-md-9 wk-padding-0 wkpos-padding-left-15 hidden-sm wk-d-flex">
                        <div class="salesperson-name wk-flex-3"
                            data-bind="text: cashierName, attr: { title: cashierName }"></div>
                        {* <div class="salesperson-post" title="{$employee.profile}">{$employee.shortProfile}</div> *}
                        {hook h='displayWkPosEmployeeDetail'}
                    </div>
                </div>
                {/block}
                <!-- ko if: $root.navigatorOnline() -->
                <!-- ko if: $root.sessionStatus() == 1 -->
                <!-- ko if: $root.confirmClose() == 0 -->
                <div data-bind="click:$root.sessionModel.closeSession"
                    class=" pull-right wk-pos-features wk-line-height-2 wk-pointer" title="{l s='Close' mod='wkpos'}">
                    {l s='Close' mod='wkpos'}
                    {* <i class="fa fa-sign-out"></i> *}
                </div>
                <!-- /ko -->
                <!-- ko ifnot: $root.confirmClose() == 0 -->
                <div data-bind="click:$root.sessionModel.closeSession"
                    class=" pull-right wk-pos-features wk-line-height-2 wkpos-confirm wk-pointer"
                    title="{l s='Confirm' mod='wkpos'}">
                    {l s='Confirm' mod='wkpos'}
                    {* <i class="fa fa-sign-out"></i> *}
                </div>
                <!-- /ko -->
                <!-- /ko -->
                <!-- /ko -->
                {block name='sign_out'}
                <!-- ko ifnot: $root.sessionStatus() == 1 -->
                <a href="{$wkposLogin|escape:'htmlall':'UTF-8'}">
                    <div class=" pull-right wk-pos-features" title="{l s='Sign out' mod='wkpos'}">
                        <i class="fa fa-sign-out"></i>
                        </div>
                    </a>
                    <!-- /ko -->
                {/block}
            </div>
        </div>
    </div>
    </div>
</nav>
{/block}
