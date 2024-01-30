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

{block name='wkpos_order_movement'}
    <div class="modal fade" id="wkpos_order_movement" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="card clearfix">
                    <div class="session-payment-info col-md-12 clearfix">
                        <h3>{l s='Transactions' mod='wkpos'}</h2>
                        <div class="table-responsive">
                            <table class="table table-sm table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            {l s='Reason' mod='wkpos'}
                                        </th>
                                        <th class="text-center">
                                            {l s='Amount' mod='wkpos'}
                                        </th>
                                        <th class="text-center">
                                            {l s='Type' mod='wkpos'}
                                        </th>
                                        {if Configuration::get('WKPOS_DIGITAL_SIGN_ON_CASH_REGISTER') == 1}
                                        <th class="text-center">
                                            {l s='Digital Sign' mod='wkpos'}
                                        </th>
                                        {/if}
                                        <th class="text-center">
                                            {l s='Transaction Date' mod='wkpos'}
                                        </th>
                                    </tr>
                                </thead>
                                <!-- ko if: $root.cashRegister.orderedMovement().length == 0 -->
                                    <tbody>
                                        <tr>
                                            <th colspan="4">
                                                {l s='No Transactions' mod='wkpos'}
                                            </th>
                                        </tr>
                                    </tbody>
                                <!-- /ko -->
                                <!-- ko if: $root.cashRegister.orderedMovement().length > 0 -->
                                <tbody class="ui-sortable" data-bind="foreach: $root.cashRegister.orderedMovement">
                                    <tr>
                                        <td data-bind="text: reason">
                                        </td>
                                        <td class="text-center" data-bind="text: displayAmount">
                                        </td>
                                        <td class="text-center" data-bind="text: type">
                                        </td>
                                        {if Configuration::get('WKPOS_DIGITAL_SIGN_ON_CASH_REGISTER') == 1}
                                        <td class="text-center wk-fixed-width" data-bind="text: digitalSign" >
                                        </td>
                                        {/if}
                                        <td class="text-center" data-bind="text: transactionDate">
                                        </td>
                                    </tr>
                                </tbody>
                                <!-- /ko -->
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/block}
