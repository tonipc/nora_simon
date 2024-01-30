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

{block name='wkpos_cash_transactions'}
    <div class="modal fade" id="wkpos_cash_transactions" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <header class="modal-header">
                    <h4 data-bind="text: $root.cashRegister.transactionHeading"></h4>
                    <button type="button" class="close modal-close-padding wk-session-modal-close" data-dismiss="modal">&times;</button>
                </header>
                <div class="modal-body">
                    <div class="row">
                        <div class="wk-amount-control">
                            <h4  data-bind="text: $root.cashRegister.transactionDescription">
                            </h4>
                            <table class="">
                                <tbody>
                                    <tr>
                                        <td class="">
                                            <label class="wkpos_td_label wkpos_td_label_1" for="wkpos_name">
                                                {l s='Reason' mod='wkpos'}
                                            </label>
                                        </td>
                                        <td class="wk-width-100">
                                            <textarea class="form-control"  name="wkpos_transaction_reason" data-bind="textInput: $root.cashRegister.transactionReason">
                                            </textarea>
                                            <span class="help-block">{l s='Maximum 255 characters' mod='wkpos'}</span>
                                            {* <input class="form-control wk-margin-bottom-10" name="reason" placeholder="" id="wkpos_transaction_reason" type="text" data-bind="value: $root.cashRegister.transactionReason"/> *}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="">
                                            <label class="wkpos_td_label wkpos_td_label_2" for="wkpos_amount">{l s='Amount' mod='wkpos'}</label></td>
                                        <td class="wk-width-100">
                                            <input class="form-control wk-margin-bottom-10" name="amount" placeholder="" type="number" id="wkpos_amount"
                                            data-bind="value: $root.cashRegister.transactionAmount"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <footer class="modal-footer">
                    <div>
                        <footer>
                            <button type="button" name="run" class="pull-right btn wkpos-btn" data-bind="click: $root.cashRegister.updateTransaction">
                                <span data-bind="text: $root.cashRegister.transactionHeading"></span>
                            </button>
                            {* <button type="button" special="cancel" class="btn btn-secondary">
                                <span>{l s='Cancel' mod='wkpos'}</span>
                            </button> *}
                        </footer>
                    </div>
                </footer>
            </div>
        </div>
    </div>
{/block}
