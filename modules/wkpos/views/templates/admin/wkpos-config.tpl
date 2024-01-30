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

<div class="alert alert-info">
    {l s='Refer the' mod='wkpos'}<a href="{$doc_url|escape:'htmlall':'UTF-8'}" target="_blank">
        {l s=' User Guide ' mod='wkpos'}<i class="icon-external-link-sign"></i>
    </a>
    {l s=' to checkout the complete workflow of the PrestaShop Point Of Sale (POS) module.' mod='wkpos'}
</div>
<div class="row">
    <div class="col-sm-2" id="bar-menu">
        <ul class="nav nav-pills nav-stacked ul_nav" role="tablist">
            {if isset($tab_name)}
                {foreach from=$tab_name item=tab}
                    <li id="wkpos_config_tab_{$tab.tab_name|escape:'htmlall':'UTF-8'}"
                        class="li_list {if ($current_config_tab == $tab.tab_name)} active {/if}">
                        <a href="javascript:void(0)" aria-controls="{$tab.tab_name|escape:'htmlall':'UTF-8'}" role="tab"
                            data-toggle="tab" data-tab="{$tab.tab_name|escape:'htmlall':'UTF-8'}" class="config_tab_link">
                            <i class="{$tab.icon|escape:'htmlall':'UTF-8'}"></i>
                            {$tab.label|escape:'htmlall':'UTF-8'}
                        </a>
                    </li>
                {/foreach}
            {/if}
        </ul>

        <ul class="nav nav-pills nav-stacked ul_nav" role="tablist">
            <li id="wkpos_config_tab_doc" class="li_list">
                <a href="javascript:void(0)" aria-controls="" role="tab" data-tab="doc" class="config_tab_link">
                    <i class="icon-puzzle-piece"></i>
                    {l s='Module v' mod='wkpos'}{$module_version|escape:'htmlall':'UTF-8'}
                </a>
            </li>
            <li id="wkpos_config_tab_" class="li_list">
                <a href="https://addons.prestashop.com/en/204_webkul" target="_blank" aria-controls="" role="tab"
                    data-tab="doc" class="config_tab_link"
                    title="{l s='Search our more developed modules' mod='wkpos'}">
                    <i class='icon-external-link-sign'></i> {l s='More addons' mod='wkpos'}
                </a>
            </li>
            <li id="wkpos_config_tab_" class="li_list">
                <a href="https://addons.prestashop.com/en/ratings.php" target="_blank" aria-controls="" role="tab"
                    data-tab="doc" class="config_tab_link" title="{l s='Rate our module' mod='wkpos'}">
                    <i class='icon-external-link-sign'></i> {l s='Rate our module' mod='wkpos'}
                </a>
            </li>
            <li id="wkpos_config_tab_" class="li_list">
                <a href="https://addons.prestashop.com/en/contact-us?id_product=31497" target="_blank" aria-controls=""
                    role="tab" data-tab="doc" class="config_tab_link" title="{l s='Contact us' mod='wkpos'}">
                    <i class='icon-external-link-sign'></i> {l s='Contact us' mod='wkpos'}
                </a>
            </li>
        </ul>
    </div>

    <div class="col-sm-10" id="menu-content">
        <div class="tab-content">
            <input type="hidden" id="current_config_tab" name="current_config_tab"
                value="{$current_config_tab|escape:'htmlall':'UTF-8'}" />
            {if isset($tab_name)}
                {foreach from=$form key=index item=forms}
                    <div id="wkpos_config_{$index|escape:'htmlall':'UTF-8'}" class="wkpos_config_tab"
                        {if ($current_config_tab == $index)} style="display:block;" {/if}>
                        {$forms nofilter}
                    </div>
                {/foreach}
            {/if}
        </div>
    </div>
</div>
