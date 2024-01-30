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

<div id="datepicker" class="row row-padding-top hide">
    <div class="col-lg-12">
        <div class="daterangepicker-days">
            <div class="row">
                {if $is_rtl}
                    <div class="col-sm-6 col-lg-4">
                        <div class="datepicker2" data-date="{$date_to|escape:'htmlall':'UTF-8'}"
                            data-date-format="{$date_format|escape:'htmlall':'UTF-8'}"></div>
                    </div>
                    <div class="col-sm-6 col-lg-4">
                        <div class="datepicker1" data-date="{$date_from|escape:'htmlall':'UTF-8'}"
                            data-date-format="{$date_format|escape:'htmlall':'UTF-8'}"></div>
                    </div>
                {else}
                    <div class="col-sm-6 col-lg-4">
                        <div class="datepicker1" data-date="{$date_from|escape:'htmlall':'UTF-8'}"
                            data-date-format="{$date_format|escape:'htmlall':'UTF-8'}"></div>
                    </div>
                    <div class="col-sm-6 col-lg-4">
                        <div class="datepicker2" data-date="{$date_to|escape:'htmlall':'UTF-8'}"
                            data-date-format="{$date_format|escape:'htmlall':'UTF-8'}"></div>
                    </div>
                {/if}
                <div class="col-xs-12 col-sm-6 col-lg-4 pull-right">
                    <div id='datepicker-form' class='form-inline'>
                        <div id='date-range' class='form-date-group'>
                            <div class='form-date-heading'>
                                <span class="title">{l s='Date range' mod='wkpos'}</span>
                                {if isset($actions) && $actions|count > 0}
                                    {if $actions|count > 1}
                                        <button class='btn btn-default btn-xs pull-right dropdown-toggle' data-toggle='dropdown'
                                            type="button">
                                            {l s='Custom' mod='wkpos'}
                                            <i class='icon-angle-down'></i>
                                        </button>
                                        <ul class='dropdown-menu'>
                                            {foreach from=$actions item=action}
                                                <li>
                                                    <a{if isset($action.href)} href="{$action.href|escape:'htmlall':'UTF-8'}"
                                                            {/if}{if isset($action.class)}
                                                        class="{$action.class|escape:'htmlall':'UTF-8'}" {/if}>
                                                        {if isset($action.icon)}<i
                                                                class="{$action.icon|escape:'htmlall':'UTF-8'}"></i>
                                                        {/if}{$action.label|escape:'htmlall':'UTF-8'}</a>
                                                </li>
                                            {/foreach}
                                        </ul>
                                    {else}
                                        <a{if isset($actions[0].href)} href="{$actions[0].href|escape:'htmlall':'UTF-8'}" {/if}
                                            class="btn btn-default btn-xs pull-right{if isset($actions[0].class)} {$actions[0].class|escape:'htmlall':'UTF-8'}{/if}">
                                            {if isset($actions[0].icon)}<i
                                                    class="{$actions[0].icon|escape:'htmlall':'UTF-8'}"></i>
                                            {/if}{$actions[0].label|escape:'htmlall':'UTF-8'}</a>
                                        {/if}
                                    {/if}
                            </div>
                            <div class='form-date-body'>
                                <label>{l s='From' mod='wkpos'}</label>
                                <input class='date-input form-control' id='date-start' placeholder='{l s='Start' mod='wkpos'}' type='text'
                                    name="date_from" value="{$date_from|escape:'htmlall':'UTF-8'}"
                                    data-date-format="{$date_format|escape:'htmlall':'UTF-8'}" tabindex="1" />
                                <label>{l s='to' mod='wkpos'}</label>
                                <input class='date-input form-control' id='date-end' placeholder='{l s='End' mod='wkpos'}' type='text'
                                    name="date_to" value="{$date_to|escape:'htmlall':'UTF-8'}"
                                    data-date-format="{$date_format|escape:'htmlall':'UTF-8'}" tabindex="2" />
                            </div>
                        </div>
                        <div class='form-date-actions'>
                            <button class='btn btn-link' type='button' id="datepicker-cancel" tabindex="7">
                                <i class='icon-remove'></i>
                                {l s='Cancel' mod='wkpos'}
                            </button>
                            <button class='btn btn-default pull-right' type='submit' name="submitDateRange"
                                tabindex="6">
                                <i class='icon-ok text-success'></i>
                                {l s='Apply' mod='wkpos'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    translated_dates = {
        days: ['{l s='Sunday' mod='wkpos' js=1}', '{l s='Monday' mod='wkpos' js=1}', '{l s='Tuesday' mod='wkpos' js=1}', '{l s='Wednesday' mod='wkpos' js=1}', '{l s='Thursday' mod='wkpos' js=1}', '{l s='Friday' mod='wkpos' js=1}', '{l s='Saturday' mod='wkpos' js=1}', '{l s='Sunday' mod='wkpos' js=1}'],
        daysShort: ['{l s='Sun' mod='wkpos' js=1}', '{l s='Mon' mod='wkpos' js=1}', '{l s='Tue' mod='wkpos' js=1}', '{l s='Wed' mod='wkpos' js=1}', '{l s='Thu' mod='wkpos' js=1}', '{l s='Fri' mod='wkpos' js=1}', '{l s='Sat' mod='wkpos' js=1}', '{l s='Sun' mod='wkpos' js=1}'],
        daysMin: ['{l s='Su' mod='wkpos' js=1}', '{l s='Mo' mod='wkpos' js=1}', '{l s='Tu' mod='wkpos' js=1}', '{l s='We' mod='wkpos' js=1}', '{l s='Th' mod='wkpos' js=1}', '{l s='Fr' mod='wkpos' js=1}', '{l s='Sa' mod='wkpos' js=1}', '{l s='Su' mod='wkpos' js=1}'],
        months: ['{l s='January' mod='wkpos' js=1}', '{l s='February' mod='wkpos' js=1}', '{l s='March' mod='wkpos' js=1}', '{l s='April' mod='wkpos' js=1}', '{l s='May' mod='wkpos' js=1}', '{l s='June' mod='wkpos' js=1}', '{l s='July' mod='wkpos' js=1}', '{l s='August' mod='wkpos' js=1}', '{l s='September' mod='wkpos' js=1}', '{l s='October' mod='wkpos' js=1}', '{l s='November' mod='wkpos' js=1}', '{l s='December' mod='wkpos' js=1}'],
        monthsShort: ['{l s='Jan' mod='wkpos' js=1}', '{l s='Feb' mod='wkpos' js=1}', '{l s='Mar' mod='wkpos' js=1}', '{l s='Apr' mod='wkpos' js=1}', '{l s='May' mod='wkpos' js=1}', '{l s='Jun' mod='wkpos' js=1}', '{l s='Jul' mod='wkpos' js=1}', '{l s='Aug' mod='wkpos' js=1}', '{l s='Sep' mod='wkpos' js=1}', '{l s='Oct' mod='wkpos' js=1}', '{l s='Nov' mod='wkpos' js=1}', '{l s='Dec' mod='wkpos' js=1}']
    };
</script>
