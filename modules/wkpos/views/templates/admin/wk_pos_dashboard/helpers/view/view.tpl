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

<div id="wkpos-dashboard">
    <div class="row">
        <div class="col-lg-12">
            <div id="calendar" class="panel">
                <form
                    action="{$current|escape:'htmlall':'UTF-8'}&{if !empty($submit_action)}{$submit_action|escape:'htmlall':'UTF-8'}{/if}&token={$token|escape:'htmlall':'UTF-8'}"
                    method="post" id="calendar_form" name="calendar_form" class="form-inline">
                    <div class="btn-group">
                        <button type="submit" name="submitDateDay"
                            class="btn btn-default submitDateDay{if isset($preselect_date_range) && $preselect_date_range == 'day'} active{/if}">
                            {l s='Day' mod='wkpos'}
                        </button>
                        <button type="submit" name="submitDateMonth"
                            class="btn btn-default submitDateMonth{if (!isset($preselect_date_range) || !$preselect_date_range) || (isset($preselect_date_range) && $preselect_date_range == 'month')} active{/if}">
                            {l s='Month' mod='wkpos'}
                        </button>
                        <button type="submit" name="submitDateYear"
                            class="btn btn-default submitDateYear{if isset($preselect_date_range) && $preselect_date_range == 'year'} active{/if}">
                            {l s='Year' mod='wkpos'}
                        </button>
                        <button type="submit" name="submitDateDayPrev"
                            class="btn btn-default submitDateDayPrev{if isset($preselect_date_range) && $preselect_date_range == 'prev-day'} active{/if}">
                            {l s='Day' mod='wkpos'}-1
                        </button>
                        <button type="submit" name="submitDateMonthPrev"
                            class="btn btn-default submitDateMonthPrev{if isset($preselect_date_range) && $preselect_date_range == 'prev-month'} active{/if}">
                            {l s='Month' mod='wkpos'}-1
                        </button>
                        <button type="submit" name="submitDateYearPrev"
                            class="btn btn-default submitDateYearPrev{if isset($preselect_date_range) && $preselect_date_range == 'prev-year'} active{/if}">
                            {l s='Year' mod='wkpos'}-1
                        </button>
                    </div>
                    <input type="hidden" name="datepickerFrom" id="datepickerFrom"
                        value="{$date_from|escape:'htmlall':'UTF-8'}" class="form-control">
                    <input type="hidden" name="datepickerTo" id="datepickerTo"
                        value="{$date_to|escape:'htmlall':'UTF-8'}" class="form-control">
                    <input type="hidden" name="preselectDateRange" id="preselectDateRange"
                        value="{if isset($preselect_date_range)}{$preselect_date_range|escape:'htmlall':'UTF-8'}{/if}"
                        class="form-control">
                    <div class="form-group pull-right">
                        <button id="datepickerExpand" class="btn btn-default" type="button">
                            <i class="icon-calendar-empty"></i>
                            <span class="hidden-xs">
                                {l s='From' mod='wkpos'}
                                <strong class="text-info"
                                    id="datepicker-from-info">{$date_from|escape:'htmlall':'UTF-8'}</strong>
                                {l s='To' mod='wkpos'}
                                <strong class="text-info"
                                    id="datepicker-to-info">{$date_to|escape:'htmlall':'UTF-8'}</strong>
                                <strong class="text-info" id="datepicker-diff-info"></strong>
                            </span>
                            <i class="icon-caret-down"></i>
                        </button>
                    </div>
                    {if isset($posOutlets) && $posOutlets}
                        <div class="form-group">
                            <select name="wk_selected_outlet" id="wk_selected_outlet">
                                <option value="0" {if 0 == $selectedPOSOutlet}selected{/if}>{l s='All Outlet' mod='wkpos'}
                                </option>
                                {foreach $posOutlets as $outlet}
                                    <option value="{$outlet.id_wkpos_outlet|escape:'htmlall':'UTF-8'}"
                                        {if $outlet.id_wkpos_outlet == $selectedPOSOutlet}selected{/if}>
                                        {$outlet.name|escape:'htmlall':'UTF-8'}</option>
                                {/foreach}
                            </select>
                        </div>
                    {/if}
                    {include file='./helper_calendar.tpl'}
                </form>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="label-tooltip col-md-3 col-xs-6 wkpos-sales wk-dashboard-details" data-type="sales" data-type-trans="{l s='Sales' mod='wkpos'}"
            data-toggle="tooltip"
            data-original-title="{l s='Sum of revenue (excl. tax) generated within the date range by orders considered validated.' mod='wkpos'}"
            data-placement="bottom">
            <span class="col-md-4 col-xs-5 wk-padding-0">
                <i class="icon icon-bar-chart"></i>
            </span>
            <div class="col-md-8 col-xs-7 wk-padding-0" id="wkpos-sales">
                <div>
                    {l s='Sales' mod='wkpos'}
                </div>
                <div>
                    <div>
                        <img src="{$psImageIcon|escape:'htmlall':'UTF-8'}" class="width-25"
                            title="{l s='PrestaShop' mod='wkpos'}"></img>
                        {$totalCount.sales.ps|escape:'htmlall':'UTF-8'}
                    </div>
                    <div>
                        <img src="{$posImageIcon|escape:'htmlall':'UTF-8'}" class="width-25"
                            title="{l s='Point of Sale' mod='wkpos'}"></img>
                        {$totalCount.sales.pos|escape:'htmlall':'UTF-8'}
                    </div>
                </div>
            </div>
        </div>
        <div class="label-tooltip col-md-3 col-xs-6 wkpos-order wk-dashboard-details" data-type="orders" data-type-trans="{l s='Orders' mod='wkpos'}"
            data-title="{l s='Total number of orders received within the date range that are considered validated.' mod='wkpos'}"
            data-placement="bottom">
            <span class="col-md-4 col-xs-5 wk-padding-0">
                <i class="icon icon-file-text-o"></i>
            </span>
            <div class="col-md-8 col-xs-7 wk-padding-0" id="wkpos-order">
                <div>
                    {l s='Orders' mod='wkpos'}
                </div>
                <div>
                    <div>
                        <img src="{$psImageIcon|escape:'htmlall':'UTF-8'}" class="width-25"
                            title="{l s='PrestaShop' mod='wkpos'}"></img>
                        {$totalCount.orders.ps|escape:'htmlall':'UTF-8'}
                    </div>
                    <div>
                        <img src="{$posImageIcon|escape:'htmlall':'UTF-8'}" class="width-25"
                            title="{l s='Point of Sale' mod='wkpos'}"></img>
                        {$totalCount.orders.pos|escape:'htmlall':'UTF-8'}
                    </div>
                </div>
            </div>
        </div>
        <div class="label-tooltip col-md-3 col-xs-6 wkpos-cart wk-dashboard-details" data-type="average_cart_value" data-type-trans="{l s='Average cart value' mod='wkpos'}"
            data-title="{l s='Average cart value is a metric representing the value of an average order within the date range. It is calculated by dividing sales by orders.' mod='wkpos'}"
            data-placement="bottom">
            <span class="col-md-4 col-xs-5 wk-padding-0">
                <i class="icon icon-shopping-cart"></i>
            </span>
            <div class="col-md-8 col-xs-7 wk-padding-0" id="wkpos-cart">
                <div>
                    {l s='Average cart' mod='wkpos'}
                </div>
                <div>
                    <div>
                        <img src="{$psImageIcon|escape:'htmlall':'UTF-8'}" class="width-25"
                            title="{l s='Prestashop' mod='wkpos'}"></img>
                        {$totalCount.average_cart_value.ps|escape:'htmlall':'UTF-8'}
                    </div>
                    <div>
                        <img src="{$posImageIcon|escape:'htmlall':'UTF-8'}" class="width-25"
                            title="{l s='Point of Sale' mod='wkpos'}"></img>
                        {$totalCount.average_cart_value.pos|escape:'htmlall':'UTF-8'}
                    </div>
                </div>
            </div>
        </div>
        <div class="label-tooltip col-md-3 col-xs-6 wkpos-net-profit wk-dashboard-details" data-type="net_profits" data-type-trans="{l s='Net profits' mod='wkpos'}"
            title="{l s='Net profit is a measure of the profitability of a venture after accounting for all Ecommerce costs.' mod='wkpos'}"
            data-placement="bottom">
            <span class="col-md-4 col-xs-5 wk-padding-0">
                <i class="icon icon-bar-chart"></i>
            </span>
            <div class="col-md-8 col-xs-7 wk-padding-0" id="wkpos-net-profit">
                <div>
                    {l s='Net Profit' mod='wkpos'}
                </div>
                <div>
                    <div>
                        <img src="{$psImageIcon|escape:'htmlall':'UTF-8'}" class="width-25"
                            title="{l s='PrestaShop' mod='wkpos'}"></img>
                        {$totalCount.net_profits.ps|escape:'htmlall':'UTF-8'}
                    </div>
                    <div>
                        <img src="{$posImageIcon|escape:'htmlall':'UTF-8'}" class="width-25"
                            title="{l s='Point of Sale' mod='wkpos'}"></img>
                        {$totalCount.net_profits.pos|escape:'htmlall':'UTF-8'}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <script type="text/javascript" src=""></script>
        <div class="panel clearfix">
            <div class="panel-heading wkpos-panel-heading">
                {l s='Sales' mod='wkpos'}
            </div>
            <div class="row wkpos-toggle-graph">
                <button type="button" class="btn btn-primary" id="hidePrestashop"
                    data-type="pos">{l s='POS Details' mod='wkpos'}</button>
                <button type="button" class="btn btn-default" id="hidePos"
                    data-type="ps">{l s='PrestaShop Details' mod='wkpos'}</button>
                <button type="button" class="btn btn-default" id="togglePrestashop"
                    data-type="both">{l s='Both' mod='wkpos'}</button>
            </div>
            <div>
                <div class="col-md-12" id="wkpos_dashboard_graph" style="height: 500px"></div>

            </div>

        </div>
    </div>
</div>
