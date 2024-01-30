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

{* {$form_action|escape:'html':'UTF-8'} *}
<div class="col-sm-12 text-center wk-pos-employee-details">
    <div class="row">
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="wkpos-text-color active"
                data-bind="click: $root.contentModel.settingTab.bind($data, 'settings') ">
                <a class="wkpos-text-color">
                    {l s='Change Password' mod='wkpos'}
                </a>
            </li>
            {hook h='displayPosSettingTab'}
        </ul>
        <div class="tab-content wkpos-scrollbar">
            <div role="tabpanel" class="tab-pane active" id="employee_panel">
                <div class="col-md-4 col-sm-6 wk-employee-setting">
                    <form action="" id="change_password_form" method="post">
                        <div class="row">
                            <i class="fa fa-user-circle"></i>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-12 text-left" for="employee_firstname">
                                {l s='First Name' mod='wkpos'}
                            </label>
                            <div class="col-md-12">
                                <input type="hidden" name="id_employee" id="id_employee" class="form-control"
                                    value="{$employee.id|escape:'htmlall':'UTF-8'}" />
                                <input type="text" name="employee_firstname" id="employee_firstname"
                                    class="form-control" autofocus="autofocus"
                                    value="{$employee.firstName|escape:'htmlall':'UTF-8'}" disabled="true" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-12 text-left" for="employee_lastname">
                                {l s='Last name' mod='wkpos'}
                            </label>
                            <div class="col-md-12">
                                <input type="text" name="employee_lastname" id="employee_lastname" class="form-control"
                                    value="{$employee.lastName|escape:'htmlall':'UTF-8'}" disabled="true" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-12 text-left" for="email_forgot">
                                {l s='Email' mod='wkpos'}
                            </label>
                            <div class="col-md-12">
                                <input type="text" name="employee_email" id="employee_email" class="form-control"
                                    value="{$employee.email|escape:'htmlall':'UTF-8'}" disabled="true" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-12 text-left" for="old_passwd">
                                {l s='Current Password' mod='wkpos'}
                            </label>
                            <div class="col-md-12">
                                <input type="password" name="old_passwd" id="old_passwd" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-12 text-left" for="passwd">
                                {l s='New Password' mod='wkpos'}
                            </label>
                            <div class="col-md-12">
                                <input type="password" name="passwd" id="passwd" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-12 text-left" for="passwd2">
                                {l s='Confirm Password' mod='wkpos'}
                            </label>
                            <div class="col-md-12">
                                <input type="password" name="passwd2" id="passwd2" class="form-control" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 wk-float-none">
                                <button class="btn wkpos-background-color"
                                    data-bind="click: $root.contentModel.updateEmployeePassword">
                                    <i class="icon-ok text-success"></i>
                                    {l s='Save' mod='wkpos'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {hook h='displayPosSettingContent'}
            </div>
        </div>
    </div>
</div>
