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

<style>
    .wk_select_height {
        min-height: 250px;
    }
</style>

<script language='javascript'>
</script>
<div>
    {if isset($psProducts)}
        <form action="" method="post" autocomplete="off" class="defaultForm form-horizontal">
            <div class="panel">
                <div class="panel-heading">
                    <i class="icon-bars"></i> {l s='Assign product' mod='wkpos'}
                </div>
                <div class="form-wrapper">
                    <div class="form-group">
                        <label
                            class="control-label col-lg-3 required">{l s='Search / Select product(s)' mod='wkpos'}</label>
                        <div class="col-lg-9">
                            <div class="input-group">
                                <input class="form-control" type="text" name="wkpos_searchproduct" id="wkpos_searchproduct">
                                <span class="input-group-addon wk-search-product"><i class="icon-search"></i></span>
                            </div>
                            <select name="wk_product_list[]" id="wk_product_list[]" class="wk_select_height" multiple
                                style="margin-top: 20px">
                                {foreach $psProducts as $product}
                                    <option value="{$product.id_product|intval}"><i
                                            class="wk"></i>({$product.id_product|intval}) {$product.name|escape:'html':'UTF-8'}
                                    </option>
                                {/foreach}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <a href="{$cancelUrl|escape:'html':'UTF-8'}" class="btn btn-default">
                        <i class="process-icon-cancel"></i> {l s='Cancel' mod='wkpos'}
                    </a>
                    <button type="submit" name="assignProduct{$table|escape:'html':'UTF-8'}"
                        class="btn btn-default pull-right" id="wkpos_assignProduct">
                        <i class="process-icon-save"></i> {l s='Assign' mod='wkpos'}
                    </button>
                    <button type="submit" name="assignProductAndStay{$table|escape:'html':'UTF-8'}"
                        class="btn btn-default pull-right" id="wkpos_assignAndStayProduct">
                        <i class="process-icon-save"></i> {l s='Assign And Stay' mod='wkpos'}
                    </button>
                </div>
            </div>
        </form>
    {/if}
</div>
