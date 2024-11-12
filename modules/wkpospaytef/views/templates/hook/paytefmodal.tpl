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

<div class="modal fade" id="wk-pos-paytef-reader" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <span class="h4">{l s='Check POS paytef terminal pinpad status' mod='wkpospaytef'}</span>
                <button type="button" class="close modal-close-padding" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <h5>{l s='Device IP' mod='wkpospaytef'} : <span data-bind="text: ($root.paytef.paytefDeviceIP)"></span>
                </h5>
                <h5>{l s='Device port' mod='wkpospaytef'} : <span
                        data-bind="text: ($root.paytef.paytefDevicePort)"></span></h5>
                <h5>{l s='Device pinpad' mod='wkpospaytef'} : <span
                        data-bind="text: ($root.paytef.paytefDevicePinpad)"></span></h5>
                <div class="discover-reader">
                    <button type="button" data-bind="click: $root.paytef.pinpadStatus" class="btn wkpos-btn"
                        name="discover-reader"
                        id="discover-reader">{l s='Check pinpad status' mod='wkpospaytef'}</button>
                </div>
                <div class="modal-loader" id="paytef-reader-loader">
                    <img src="{$customProductPopUpImg|escape:'htmlall':'UTF-8'}">
                    <div class="msg" style="color: rgb(0, 128, 0);">
                        <p id="reader-msg">{l s='Please wait...' mod='wkpospaytef'}</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="wk-pos-paytef-create-payment" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-labelledby="myModalLabel2">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <span class="h4">{l s='Swipe card on POS card reader' mod='wkpospaytef'}</span>
            </div>
            <div class="modal-body">
                <div class="modal-loader" id="paytef-create-loader">
                    <img src="{$customProductPopUpImg|escape:'htmlall':'UTF-8'}">
                    <div class="msg" style="color: rgb(0, 128, 0);">
                        <p id="connector-msg">{l s='Please wait...' mod='wkpospaytef'}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>