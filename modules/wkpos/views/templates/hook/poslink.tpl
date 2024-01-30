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

{if ($smarty.const._PS_VERSION_ >= "8.1.0")}
    <div class="component" id="header-shop-list-container">
        <a class="link" id="header_shopname" href="{$posLink|escape:'html':'UTF-8'}" target="_blank">
            <i class="material-icons">shopping_cart</i>
            <span>{l s='POS' mod='wkpos'}</span>
        </a>
    </div>
{else}
<style>
    a.wk_header_shopname {
        padding: 5px;
        text-decoration: none;
        font-size: 15px;
        color: #43464cf0;
    }

    .bootstrap a.wk_header_shopname:hover,
    .bootstrap a.wk_header_shopname:focus {
        color: #43464cf0;
        text-decoration: none;
    }
</style>
<a href="{$posLink|escape:'html':'UTF-8'}" class="header_shopname wk_header_shopname pull-right"
    target="_blank">{l s='POS Shop' mod='wkpos'}</a>
{/if}
