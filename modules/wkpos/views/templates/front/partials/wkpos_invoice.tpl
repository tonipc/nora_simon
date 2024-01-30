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

{* ordered-products-details wkpos-scrollbar *}
<table width="100%" style="font-family: Incolastia;">
    {* <tr class="header"> *}
    <tr style="text-align: center;">
        <td>
            <span data-bind="text: orderDate"></span>
            <br>
            <span>{l s='Order reference: ' mod='wkpos'}</span>
            <span data-bind="text: orderReference"> </span>
        </td>
    </tr>
    <tr>
        <td>
            <div>{$shopName|escape:'htmlall':'UTF-8'}</div>
            {* <div>{$outletAddress}</div> *}
            {* <div>
                    <span>{$outlet.address1}</span>,
                    <span>{$outlet.address2}</span>
                </div> *}
            <div>{$outlet.city|escape:'htmlall':'UTF-8'}</div>
            {if !empty($contactDetails)}
                <div>{l s='Phone : ' mod='wkpos'}{$contactDetails|escape:'htmlall':'UTF-8'}</div>
            {/if}
            <div>
                {l s='Cashier : ' mod='wkpos'}
                <span data-bind="text: $root.cashierName">{$employee.firstName|escape:'htmlall':'UTF-8'}
                    {$employee.lastName|escape:'htmlall':'UTF-8'}</span>
            </div>
        </td>
    </tr>
    <tr>
        <td>
            {* <table width="100%"> *}

            <div class="wkpos-order-product-heading margin-top-15 wk-d-flex">
                {* <span class="col-md-2">{l s='S. No.' mod='wkpos'}</span> *}
                <span class="wk-flex-4">{l s='Product Name' mod='wkpos'}</span>
                <span class="text-center wk-flex-1">
                    {l s='Qty' mod='wkpos'}
                </span>
                <span class="text-center wk-flex-2">
                    {l s='Price' mod='wkpos'}
                </span>
                <span class="text-center wk-flex-2">
                    {l s='Total' mod='wkpos'}
                </span>
            </div>
            <!-- ko foreach: orderedProducts -->
            {include file="module:wkpos/views/templates/front/partials/wkpos_product.tpl"}

            <!-- /ko -->
            {* </table> *}
        </td>
    </tr>
    {* <tr>
        <td>---------------------------------------------------------------------------------</td>
    </tr> *}
    <tr>
        <td>
            <table width="100%" class="wkpos-order-product-heading margin-top-15">
                <tr>
                    <td colspan="4">{l s='Subtotal :' mod='wkpos'} </td>
                    <td style="text-align: right;">
                        <span data-bind="text:orderSubTotal"></span>
                    </td>
                </tr>
                <tr data-bind="if: orderShipping() > 0">
                    <td colspan="4">{l s='Shipping Cost :' mod='wkpos'} </td>
                    <td style="text-align: right;">
                        <span data-bind="text:displayOrderShipping"></span>
                    </td>
                </tr>
                {if isset($displayOrderDiscount) && $displayOrderDiscount == 1}
                    <tr data-bind="if: orderDiscount() > 0">
                        <td colspan="4">{l s='Discount : ' mod='wkpos'}</td>
                        <td style="text-align: right;">
                            <span data-bind="text:displayOrderDiscount"></span>
                        </td>
                    </tr>
                {/if}
                <tr>
                    <td colspan="4">{l s='Total : ' mod='wkpos'}</td>
                    <td style="text-align: right;">
                        <span data-bind="text:orderTotal"></span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    {* <!-- ko if: id_wkpos_payment == 3 -->
        <tr>
            <td>
                <table width="100%" class="wkpos-order-product-heading margin-top-15">
                    <tr>
                        <td colspan="4">{l s='Installment Paid Amount :' mod='wkpos'} </td>
                        <td style="text-align: right;">
                            <span data-bind="text: displayAmountPaid"></span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">{l s='Installment Remaining Amount :' mod='wkpos'} </td>
                        <td style="text-align: right;">
                            <span data-bind="text: displayRemainingAmount"></span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    <!-- /ko --> *}
    {* <tr>
        <td>---------------------------------------------------------------------------------</td>
    </tr> *}
    <tr>
        <td style="text-align: center">
            <span>{l s='Customer Name: ' mod='wkpos'}<span data-bind="text: customerName"></span>
        </td>
    </tr>
    {if isset($displayBarcode) && $displayBarcode}
        <tr>
            <td style="text-align: center">
                <svg id="order_barcode"></svg>
            </td>
        </tr>
    {/if}
    {* for wkposnf525 *}
    {if isset($wkposNf525Install) && $wkposNf525Install == true}
        {if (Configuration::get('WKPOS_DIGITAL_SIGN_ON_RECIEPT') == 1)}
            <tr>
                <td style="text-align: center">
                    <div id="digital_sign" style="word-break:break-all;">
                        <span data-bind="text: digitalSign"></span>
                    </div>
                </td>
            </tr>
        {/if}
    {/if}
</table>
