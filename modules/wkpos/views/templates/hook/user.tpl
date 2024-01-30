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
    <div class="user-selector dropdown js-dropdown wkpos-users">
        <button data-toggle="dropdown" class="btn wkpos-btn btn-unstyle" aria-haspopup="true" aria-expanded="false" aria-label="user dropdown">
            <span class="expand-more" data-bind="text: $root.cashRegister.username"></span>
            <i class="fa fa-angle-down"></i>
        </button>
        <ul class="wkpos-user-menu dropdown-menu hidden-sm-down" aria-labelledby="user-selector-label" data-bind="foreach: $root.cashRegister.users">
            <li>
                <a class="dropdown-item" data-bind="text: name, click: $root.cashRegister.changeUser"></a>
            </li>
        </ul>
    </div>
<!-- /ko -->
