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

<table class="pos-payment-tab" width="100%" cellpadding="4" cellspacing="0">
    <thead>
    <tr>
        <th class="product header small left" width="{$layout.payment_method.width|escape:'htmlall':'UTF-8'}%">{l s='Payment Method' mod='wkpos' pdf='true'}</th>
        <th class="product header small right" width="{$layout.opening_balance.width|escape:'htmlall':'UTF-8'}%">{l s='Opening Balance' mod='wkpos' pdf='true'}</th>
        <th class="product header small right" width="{$layout.transaction.width|escape:'htmlall':'UTF-8'}%">{l s='Transaction' mod='wkpos' pdf='true'}</th>
        <th class="product header small right" width="{$layout.closing_balance.width|escape:'htmlall':'UTF-8'}%">{l s='Closing Balance' mod='wkpos' pdf='true'}</th>
    </tr>
    </thead>
    <tbody>
    <!-- PRODUCTS -->
    {if isset($paymentMethod) && paymentMethod}
        {foreach $paymentMethod as $payment}
            {cycle values=["color_line_even", "color_line_odd"] assign=bgcolor_class}
            <tr class="product {$bgcolor_class|escape:'htmlall':'UTF-8'}">
                <td class="product{if isset($payment.isTotal)} bold{/if}">
                    {$payment.name|escape:'htmlall':'UTF-8'}
                </td>
                <td class="product right{if isset($payment.isTotal)} bold{/if}">
                    {$payment.openingBalance|escape:'htmlall':'UTF-8'}
                </td>
                <td class="product right{if isset($payment.isTotal)} bold{/if}">
                    {$payment.transactions|escape:'htmlall':'UTF-8'}
                </td>
                <td class="product right{if isset($payment.isTotal)} bold{/if}">
                    {$payment.closingBalance|escape:'htmlall':'UTF-8'}
                </td>
            </tr>
        {/foreach}
    {else}
        {cycle values=["color_line_even", "color_line_odd"] assign=bgcolor_class}
        <tr class="product {$bgcolor_class|escape:'htmlall':'UTF-8'}">
            <td class="product{if isset($payment.isTotal)} bold{/if}" colspan="4">
                {l s='No Transaction' mod='wkpos'}
            </td>
        </tr>
    {/if}
    <!-- END PRODUCTS -->
</table>
