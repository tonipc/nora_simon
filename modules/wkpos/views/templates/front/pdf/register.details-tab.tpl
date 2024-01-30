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

<table class="pos-register-tab" width="100%" cellpadding="4" cellspacing="0">
    <thead>
    <tr>
        <th class="product register-heading" colspan="2">{l s='Register Details' mod='wkpos' pdf='true'}</th>
    </tr>
    </thead>
    <tbody>
        {cycle values=["color_line_even", "color_line_odd"] assign=bgcolor_class}
        <tr class="product {$bgcolor_class|escape:'htmlall':'UTF-8'}">
            <td class="product bold grey">
                {l s='Reference' mod='wkpos' pdf='true'}
            </td>
            <td class="product white">
                {$registerReference|escape:'htmlall':'UTF-8'}
            </td>
        </tr>
        <tr class="product {$bgcolor_class|escape:'htmlall':'UTF-8'}">
            <td class="product bold grey">
                {l s='Sales Person' mod='wkpos' pdf='true'}
            </td>
            <td class="product white">
                {$salesPerson|escape:'htmlall':'UTF-8'}
            </td>
        </tr>
        <tr class="product {$bgcolor_class|escape:'htmlall':'UTF-8'}">
            <td class="product bold grey">
                {l s='Point of Sale (Outlet)' mod='wkpos' pdf='true'}
            </td>
            <td class="product white">
                {$outletName|escape:'htmlall':'UTF-8'}
            </td>
        </tr>
        <tr class="product {$bgcolor_class|escape:'htmlall':'UTF-8'}">
            <td class="product bold grey">
                {l s='Opening Date/Time' mod='wkpos' pdf='true'}
            </td>
            <td class="product white">
                {$openingDate|escape:'htmlall':'UTF-8'}
            </td>
        </tr>
        {if isset($closingDate) && $closingDate}
            <tr class="product {$bgcolor_class|escape:'htmlall':'UTF-8'}">
                <td class="product bold grey">
                    {l s='Closing Date/Time' mod='wkpos' pdf='true'}
                </td>
                <td class="product white">
                    {$closingDate|escape:'htmlall':'UTF-8'}
                </td>
            </tr>
        {/if}
</table>
