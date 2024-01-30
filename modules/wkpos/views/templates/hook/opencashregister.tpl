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

<!-- ko if: $root.cashRegister.cashRegisterStatus() == '1' -->
    <!-- ko if: $root.rightColumnPage() == "pos_cash_register" -->
        <div class="wkps-cash-register-open">
            <div class="open-register-panel-header">
                <img class="wr-register-closed-image" src="{$close_image_url|escape:'htmlall':'UTF-8'}">
                <div category="subpage" class="h4" role="headings">
                    {l s='Register closed' mod='wkpos'}
                </div>
            </div>
            <div class="open_register_form">
                <div class="form-group">
                    <label for="exampleInputEmail1">{l s='Open Register' mod='wkpos'}</label>
                    <input type="number" class="form-control" id="" data-bind="value: $root.cashRegister.openingAmount" placeholder="{l s='Opening Amount' mod='wkpos'}"/>
                </div>
                <div class="form-group">
                    <label for="opening_notes">{l s='Notes' mod='wkpos'}</label>
                    {* <input type="text" class="form-control" id="opening_notes" placeholder="Notes" data-bind="value: $root.cashRegister.notes">
                    <input type="text" class="form-control" id="opening_notes" placeholder="Notes" data-bind="value: $root.cashRegister.notes"> *}
                    <textarea class="form-control"  name="opening_notes" data-bind="textInput: $root.cashRegister.openingNotes">
                    </textarea>
                    <span class="help-block">{l s='Maximum 255 characters' mod='wkpos'}</span>
                </div>
                <div class="form-group text-center">
                    <button type="submit" class="btn wkpos-btn" data-bind="click: $root.cashRegister.open">
                        {l s='Open Register' mod='wkpos'}
                    </button>
                </div>
            </div>
        </div>
    <!-- /ko -->
<!-- /ko -->
