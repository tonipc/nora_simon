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

<!-- ko if: $root.bodyPanel() == 'wkpos_close_register_panel' && $root.cashRegister.openCashRegister() -->
    <div class="wkpos-panel">
        <div class="wkpos-heading">
            <div class="h3">{l s='Close Register' mod='wkpos'}</div>
        </div>
        <div class="wkpos-content">
            <div class="wkpos-outlet-detail"></div>
            <div class="cash-entries">
                <div class="table table-responsive col-md-12">
                    <table class="table table-sm table-hover table-striped">
                        <thead>
                            <th>{l s='Payment Types' mod='wkpos'}</th>
                            <th>{l s='Expected' mod='wkpos'}</th>
                            <th>{l s='Counted' mod='wkpos'}</th>
                            <th>{l s='Difference' mod='wkpos'}</th>
                        </thead>
                        <tbody data-bind="foreach: $root.cashRegister.paymentDetails">
                            <tr>
                                <td data-bind="text: name"></td>
                                <td data-bind="text: amount"></td>
                                <td>
                                    <input class="form-control" type="number" data-bind="value: countedAmount" />
                                </td>
                                <td data-bind="text: difference"></td>
                            </tr>
                            <!-- ko if: movements().length > 0 -->
                                <tr>
                                    <td>{l s='Cash Movement' mod='wkpos'}</td>
                                    <td>
                                        <table class="table table-sm table-hover table-striped">
                                            <thead>
                                                <th>{l s='Time' mod='wkpos'}</th>
                                                <th>{l s='Users' mod='wkpos'}</th>
                                                <th>{l s='Reasons' mod='wkpos'}</th>
                                                <th>{l s='Amount' mod='wkpos'}</th>
                                            </thead>
                                            <tbody data-bind="foreach: movements">
                                                <tr>
                                                    <td data-bind="text: date"></td>
                                                    <td data-bind="text: employee"></td>
                                                    <td data-bind="text: reason"></td>
                                                    <td data-bind="text: amount"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            <!-- /ko -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
<!-- /ko -->
