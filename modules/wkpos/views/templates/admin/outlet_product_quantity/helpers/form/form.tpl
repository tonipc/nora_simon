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

{if isset($attributes)}
    {if isset($outOfStockAllowOrder) && $outOfStockAllowOrder == 1}
        <div class="row">
            <div class="alert alert-warning">
                {l s='The product has been allowed to order when out of stock from Prestashop catalog' mod='wkpos'}
            </div>
            <div class="alert alert-info">
                <div>
                    {l s='In this case the quantity of an outlet product might not be synchronised as we have allowed the order to process when the quantity is out of stock.' mod='wkpos'}
                    {if isset($displaySyncButton) && $displaySyncButton}
                        <a class="btn btn-primary">{l s='Sync. Now' mod='wkpos'}</a>
                    {/if}
                </div>
                <div>
                    {l s='The quantity of an outlet will always be zero if the quantity of a catalog is zero.' mod='wkpos'}
                </div>
            </div>
        </div>
    {/if}
    <div class="alert alert-info">
        {l s='Product quantity which has not been allocated to other outlets will display under \'Available Qty.\'' mod='wkpos'}
    </div>
    <div class="panel clearfix">
        <form id="wkpos_outlet_product_attribute" class="defaultForm form-horizontal AdminWkPosOutlets"
            action="{$action|escape:'htmlall':'UTF-8'}" method="post" enctype="multipart/form-data" novalidate="">
            <div class="panel-heading clearfix">{$productName|escape:'htmlall':'UTF-8'} ->
                {l s='Manage Quantity' mod='wkpos'}</div>
            <div class="form-wrapper clearfix">
                <input type="hidden" name="id_wkpos_outlet_product" id="id_wkpos_outlet_product"
                    value="{$id_wkpos_outlet_product|escape:'htmlall':'UTF-8'}">
                <div class="panel" id="fieldset_0">

                    <div class="form-group">
                        <div class="col-lg-8 col-lg-offset-2">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th><span class="title_box">{l s='Quantity' mod='wkpos'}</span></th>
                                        <th><span class="title_box">{l s='Product Name' mod='wkpos'}
                                                {if $hasCombination}
                                                    {l s='- Combination' mod='wkpos'}
                                                {/if}
                                            </span></th>
                                        <th><span class="title_box">{l s='Available Quantity' mod='wkpos'}</span></th>
                                    </tr>
                                </thead>
                                {foreach from=$attributes item=attribute}
                                    <tr{if isset($attribute['default_on']) && $attribute['default_on']} class="highlighted"
                                        {/if}>
                                        <td class="available_quantity"
                                            id="qty_{$attribute['id_product_attribute']|escape:'htmlall':'UTF-8'}">
                                            <input type="text"
                                                name="qty_{$attribute['id_product_attribute']|escape:'htmlall':'UTF-8'}"
                                                class="fixed-width-sm"
                                                value="{$availableQuantity[$attribute['id_product_attribute']]|escape:'htmlall':'UTF-8'}" />
                                        </td>
                                        <td>
                                            {$productDesignation[$attribute['id_product_attribute']]|escape:'htmlall':'UTF-8'}
                                        </td>
                                        <td>
                                            {$remainingQuantity[$attribute['id_product_attribute']]|escape:'htmlall':'UTF-8'}
                                        </td>
                                        </tr>
                                    {/foreach}
                            </table>
                        </div>
                    </div>
                </div>
                <div class="panel-footer clearfix">
                    <a href="{$cancelUrl|escape:'htmlall':'UTF-8'}" class="btn btn-default">
                        <i class="process-icon-cancel"></i> {l s='Cancel' mod='wkpos'}
                    </a>
                    <button type="submit" class="btn btn-default btn btn-default pull-right"
                        name="submitUpdateProductQuantity">
                        <i class="process-icon-save"></i>
                        {l s='Save' mod='wkpos'}
                    </button>
                </div>
        </form>
    </div>
{/if}
