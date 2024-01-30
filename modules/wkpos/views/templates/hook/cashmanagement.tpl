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

<!-- ko if: $root.navigatorOnline() -->
    <!-- ko if: $root.bodyPanel() == 'wkpos-cash-management' && $root.cashRegister.openCashRegister() -->
        <div class="wkpos-panel wkpos-cash-register-panel clearfix">
            <div class="wkpos-heading">
                <div class="h3">{l s='Cash Management' mod='wkpos'}</div>
            </div>
            <div class="wkpos-content">
                <div class="wkpos-heading-btn-panel">
                    <div class="btn wkpos-closing-btn wkpos-download-link" data-bind="click: $root.cashRegister.downloadPdf">
                        <i class="fa fa-download"></i>
                        {l s='Download PDF' mod='wkpos'}
                    </div>

                    <div class="btn wkpos-close-btn" data-bind="click: $root.cashRegister.close">{l s='Close' mod='wkpos'}</div>

                    <div class="btn wkpos-closing-btn" data-bind="click: $root.cashRegister.openClosePanel">{l s='Set Closing Balance' mod='wkpos'}</div>

                    <div class="btn wkpos-addcash"  data-toggle="modal"  data-target="#wkpos_cash_transactions" data-bind="click: $root.cashRegister.updateTransactionEvent.bind($data, '{l s='Cash Deposit' mod='wkpos'}', '2')">{l s='Cash Deposit' mod='wkpos'}</div>

                    <div class="btn wkpos-removecash"  data-toggle="modal"  data-target="#wkpos_cash_transactions" data-bind="click: $root.cashRegister.updateTransactionEvent.bind($data, '{l s='Cash Withdraw' mod='wkpos'}', '3')">{l s='Cash Withdraw' mod='wkpos'}</div>

                </div>
                <div class="cash-entries">
                    {* <div class="table table-responsive col-md-12">
                        <table class="table table-sm table-hover table-striped">
                            <thead>
                                <th>{l s='Date' mod='wkpos'}</th>
                                <th>{l s='Users' mod='wkpos'}</th>
                                <th>{l s='Reasons' mod='wkpos'}</th>
                                <th>{l s='Amount' mod='wkpos'}</th>
                            </thead>
                            <tbody data-bind="foreach: $root.cashRegister.cashTransactions">
                                <tr>
                                    <td data-bind="text: date"></td>
                                    <td data-bind="text: employee"></td>
                                    <td data-bind="text: reason"></td>
                                    <td data-bind="text: amount"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> *}
                </div>
            </div>
        </div>
        {include file="module:wkpos/views/templates/hook/_partials/cashtransactionmodel.tpl"}
        <div class="col-md-12 wkpos-scrollbar" id='wkpos-session'>
            <div class="row">
                <div class="col-md-12 wk-padding-15">
                    <div class="card clearfix wk-margin-bottom-15">
                        <div class="wkpos-card-content-heading clearfix">
                            <div class="h4 col-md-12">
                                {l s='Register Details' mod='wkpos'}
                            </div>
                        </div>
                        <div class="wkpos-card-content">
                            <div class="card-panel-head">
                                <div class="card-heading">
                                    <div class="h4">{l s='Register Reference' mod='wkpos'}: {l s='POS' mod='wkpos'}/<span data-bind="text: $root.cashRegister.idRegister"></span> - <span data-bind="text: $root.cashRegister.openingDate"></span></div>
                                    <div class="session-info wk-d-flex wk-flex-wrap">
                                        <table class="col-md-6">
                                            <tr>
                                                <td class="wkpos_td_label">
                                                    <label name="">{l s='Sales Person' mod='wkpos'}</label>:
                                                </td>
                                                <td class="wk-width-100">
                                                    <span class="salesperson-name form-group" title="{$employee.firstName|escape:'htmlall':'UTF-8'} {$employee.lastName|escape:'htmlall':'UTF-8'}" data-bind="text: $root.cashRegister.openingSalesman">
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="wkpos_td_label">
                                                    <label name="">{l s='Point of Sale (Outlet)' mod='wkpos'}</label>:
                                                </td>
                                                <td class="wk-width-100">
                                                    <span class="salesperson-name form-group" >
                                                        {$outletDetails.name|escape:'htmlall':'UTF-8'}
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                        <table class="col-md-6">
                                            <tr>
                                                <td class="wkpos_td_label">
                                                    <label name="">{l s='Opening Balance' mod='wkpos'}</label>:
                                                </td>
                                                <td class="wk-width-100">
                                                    <span class="salesperson-name form-group" title="" data-bind="text: $root.cashRegister.displayOpeningAmount">
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="wkpos_td_label">
                                                    <label name="">{l s='Opening Date' mod='wkpos'}</label>:
                                                </td>
                                                <td class="wk-width-100">
                                                    <span class="salesperson-name form-group" title="" data-bind="text: $root.cashRegister.openingDate">
                                                    </span>
                                                </td>
                                            </tr>
                                            <!-- ko if: $root.cashRegister.openingNotes() -->
                                                <tr>
                                                    <td class="wkpos_td_label">
                                                        <label name="">{l s='Opening Note' mod='wkpos'}</label>:
                                                    </td>
                                                    <td class="wk-width-100">
                                                        <span class="salesperson-name form-group"  data-bind="text: $root.cashRegister.openingNotes">
                                                        </span>
                                                    </td>
                                                </tr>
                                            <!-- /ko -->
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="wk-cash-control-head">
                            </div>
                        </div>
                    </div>

                    <div class="card clearfix wk-margin-bottom-15">
                        <div class="session-payment-info col-md-12 clearfix">
                            <h3>{l s='Summary of Payment Methods' mod='wkpos'}</h2>
                            <div class="table-responsive">
                                <table class="table table-sm table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th>
                                                {l s='Payment Method' mod='wkpos'}
                                            </th>
                                            <th class="text-right">
                                                {l s='Total Cash Movement' mod='wkpos'}
                                            </th>
                                            <th class="text-right">
                                                {l s='Transactions Subtotal' mod='wkpos'}
                                            </th>
                                            <th class="text-right">
                                                {l s='Closing Balance' mod='wkpos'}
                                            </th>
                                            <th class="text-right">
                                                {l s='Difference' mod='wkpos'}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody data-bind="foreach: $root.cashRegister.paymentDetails">
                                        <tr data-toggle="modal" data-bind="click: $root.cashRegister.updateOrderTransactions">
                                            <td class="wk-pointer" data-bind="text: name">
                                            </td>
                                            <td class="text-right wk-pointer">
                                                <span data-bind="text: displayTotalCashMovement"></span>
                                                <!-- ko if: totalCashMovement() < 0 -->
                                                    <i class="fa fa-arrow-down wk-icon-down"></i>
                                                <!-- /ko -->
                                                <!-- ko if: totalCashMovement() > 0 -->
                                                    <i class="fa fa-arrow-up wk-icon-up"></i>
                                                <!-- /ko -->
                                            </td>
                                            <td class="text-right wk-pointer">
                                                <span data-bind="text: displayTransactionTotal"></span>
                                                <!-- ko if: transactionTotal() < 0 -->
                                                    <i class="fa fa-arrow-down wk-icon-down"></i>
                                                <!-- /ko -->
                                                <!-- ko if: transactionTotal() > 0 -->
                                                    <i class="fa fa-arrow-up wk-icon-up"></i>
                                                <!-- /ko -->
                                            </td>
                                            <td class="text-right wk-pointer">
                                                <!-- ko ifnot: $root.cashRegister.enableClosingBalance() -->
                                                    <span data-bind="text: displayClosingBalance"></span>
                                                    <!-- ko if: closingBalance() < 0 -->
                                                        <i class="fa fa-arrow-down wk-icon-down"></i>
                                                    <!-- /ko -->
                                                    <!-- ko if: closingBalance() > 0 -->
                                                        <i class="fa fa-arrow-up wk-icon-up"></i>
                                                    <!-- /ko -->
                                                <!-- /ko -->
                                                <!-- ko if: $root.cashRegister.enableClosingBalance() -->
                                                    <input type="number" class="form-control fixed-width-150 pull-right text-right" data-bind="value: closingBalance" />
                                                <!-- /ko -->
                                            </td>
                                            <td class="text-right wk-pointer">
                                                <span data-bind="text: displayDifference"></span>
                                                <!-- ko if: difference() < 0 -->
                                                    <i class="fa fa-arrow-down wk-icon-down"></i>
                                                <!-- /ko -->
                                                <!-- ko if: difference() > 0 -->
                                                    <i class="fa fa-arrow-up wk-icon-up"></i>
                                                <!-- /ko -->
                                            </td>
                                            {* <td>
                                                New
                                            </td> *}
                                        </tr>
                                        {* <tr>
                                            <td colspan="6">&nbsp;</td>
                                        </tr> *}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>{l s='Total' mod='wkpos'}</th>
                                            <th  class="text-right" data-bind="text: $root.cashRegister.totalCashMovement">{l s='Total' mod='wkpos'}</th>
                                            <th  class="text-right" data-bind="text: $root.cashRegister.totalTransactionSubtotal"></th>
                                            <th  class="text-right" data-bind="text: $root.cashRegister.totalClosingBal">{l s='Total' mod='wkpos'}</th>
                                            <th  class="text-right" data-bind="text: $root.cashRegister.totalDifference">{l s='Total' mod='wkpos'}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <!-- ko if: $root.cashRegister.enableClosingBalance() -->
                            <div class="order-transaction-footer clearfix wk-padding-15">
                                <span class="pull-right btn wkpos-btn" data-bind="click: $root.cashRegister.closeRegister">
                                    {l s='Save' mod='wkpos'}
                                </span>
                            </div>
                        <!-- /ko -->
                    </div>
                </div>
            </div>
        </div>

        {* {include file="module:wkpos/views/templates/front/partials/wkpos_session_modal.tpl"} *}
        {include file="module:wkpos/views/templates/hook/_partials/wkpos_order_transactions.tpl"}
    <!-- /ko -->
<!-- /ko -->
