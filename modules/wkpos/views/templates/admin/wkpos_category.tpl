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

{$outletForm|escape:'htmlall':'UTF-8'}
{* <div class="row">
    <div class="col-lg-7">
    </div>
    <div class="col-lg-5">
        <form id="wk_pos_category" class="defaultForm form-horizontal{if isset($name_controller) && $name_controller} {$name_controller}{/if}" action="{$outletFormSubmit}" method="post" enctype="multipart/form-data"{if isset($style)} style="{$style}"{/if} novalidate>
            <div class="panel">
                <div class="panel-heading">
                    {l s='Outlet Category' mod='wkpos'}
                </div>
                <div class="form-wrapper">
                    {$outletCategoryTree}
                </div>
                <div class="panel-footer">
                    <button type="submit" value="1" id="wkpos_outlets_form_submit_btn" name="submitAddwkpos_outletsCategory" class="btn btn-default pull-right">
                        <i class="process-icon-save"></i> {l s='Save' mod='wkpos'}
                    </button>
                    <button type="submit" class="btn btn-default btn btn-default pull-right" name="submitAddwkpos_outletsCategoryAndStay">
                        <i class="process-icon-save"></i> {l s='Save and Stay' mod='wkpos'}
                    </button>
                </div>
            </div>
        </form>
    </div>
</div> *}
{$outletProductList|escape:'htmlall':'UTF-8'}
