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

<div class="col-md-12">
    <hr>
    <div class="row">
        <div class="col-md-12">
            <h2>
                {l s='Sale product on POS or Online' mod='wkpos'}
                <span class="help-box" data-toggle="popover"
                    data-content="{l s='Check to sale product online or on pos.' mod='wkpos'}" data-original-title=""
                    title=""></span>
            </h2>
            <div class="row">
                <div class="col-md-4">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" id="saleOnline" name="saleOnline" value="1"
                                {if (isset($online_sale_allow) && $online_sale_allow != 0)}checked="checked" {/if}
                                {if (!isset($online_sale_allow))}checked="checked" {/if}>
                            {l s='Sale Online' mod='wkpos'}
                        </label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" id="salePos" name="posSale" value="1"
                                {if (isset($pos_sale_allow) && $pos_sale_allow != 0)}checked="checked" {/if}
                                {if (!isset($online_sale_allow))}checked="checked" {/if}>
                            {l s='Sale on POS' mod='wkpos'}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $("#saleOnline").click(function() {
        if (this.checked) {
            $('#form_step6_visibility option[value="both"]').prop("selected", true);;
        } else {
            $('#form_step6_visibility option[value="none"]').prop("selected", true);;
        }
    });
</script>
