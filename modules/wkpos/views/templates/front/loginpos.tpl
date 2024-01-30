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

<html>

<head>
    {if isset($jsFiles) && $jsFiles}
        {foreach from=$jsFiles item=jsUrl}
            <script type="text/javascript" src="{$jsUrl|escape:'htmlall':'UTF-8'}"></script>
        {/foreach}
        <script>
            {foreach from=$jsVariables key=variableName item=variableValue}
                var {$variableName|escape:'htmlall':'UTF-8'} = '{l s=$variableValue mod='wkpos' js=1}';
            {/foreach}
        </script>
    {/if}
    <link rel="icon" type="image" href="{$logoPng|escape:'htmlall':'UTF-8'}">
    {if isset($cssFiles) && $cssFiles}
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
        {foreach from=$cssFiles item=cssUrl}
            <link rel="stylesheet" href="{$cssUrl|escape:'htmlall':'UTF-8'}" type="text/css" />
        {/foreach}
    {/if}
    <style>
        :root {
            /*--wk-pos-btn-color: #DB324D;*/
            --wk-pos-btn-color: {Configuration::get('WKPOS_BUTTON_COLOR')|escape:'htmlall':'UTF-8'};
            /*--wk-pos-btn-hover-color: rgb(219, 50, 77, 0.92);*/
            --wk-pos-btn-hover-color: {Configuration::get('WKPOS_BUTTON_COLOR')|escape:'htmlall':'UTF-8'};
            /*--wkpos-login-background: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);*/
            --wkpos-login-background: linear-gradient( 135deg, {Configuration::get('WKPOS_LOGIN_COLOR')|escape:'htmlall':'UTF-8'} 10%, {Configuration::get('WKPOS_LOGIN_COLOR')|escape:'htmlall':'UTF-8'} 100%);
            --wkpos-off-white: #eee;
            --wkpos-white: white;
            --wkpos-box-shadow: rgba(0, 0, 0, .1);
        }
    </style>
</head>

<body id={$pageName|escape:'htmlall':'UTF-8'}>
    <div id="wkpos-login-panel" class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12">
        <div id="wkpos-login-header">
            {* <h1 class="text-center">
                    <img id="logo" src="{$img_dir}prestashop@2x.png" width="123px" height="24px" alt="PrestaShop" />
                </h1> *}
            <div id="wkposlogin-errors" class="{if !isset($errors)}hide {/if}alert alert-danger">
                {if isset($errors) && $errors}
                    <h4>
                        {if isset($nbErrors) && $nbErrors > 1}
                            {l s='There are %d errors.' sprintf=$nbErrors mod='wkpos'}
                        {else}
                            {l s='There is %d error.' sprintf=$nbErrors mod='wkpos'}
                        {/if}
                    </h4>
                    <ol>
                        {foreach from=$errors item="error"}
                            <li>{$error|escape:'htmlall':'UTF-8'}</li>
                        {/foreach}
                    </ol>
                {/if}
            </div>

            {* {if isset($warningSslMessage)}
                <div class="alert alert-warning">{$warningSslMessage}</div>
                {/if} *}
        </div>
        {* <div id="shop-img"><img src="{$img_dir}preston-login@2x.png" alt="{$shop_name}" width="69.5px" height="118.5px" /></div> *}
        <div class="flip-container">
            <div class="flipper">
                <div class="front panel">
                    <h4 id="shop_name" class="text-center">{$shopName|escape:'htmlall':'UTF-8'}</h4>
                    {if isset($reset_token) && isset($id_employee)}
                        <form action="{$form_action|escape:'htmlall':'UTF-8'}" id="reset_password_form" method="post">
                            <h4 id="reset_name">{l s='Reset your password' mod='wkpos'}</h4>
                            <div class="form-group">
                                <label class="control-label" for="reset_passwd">
                                    {l s='New password' mod='wkpos'}
                                </label>
                                <input name="reset_passwd" type="password" id="reset_passwd" class="form-control" value=""
                                    tabindex="1" placeholder="{l s='Password' mod='wkpos'}" />
                            </div>
                            <div class="form-group">
                                <label class="control-label" for="reset_confirm">
                                    {l s='Confirm new password' mod='wkpos'}
                                </label>
                                <input name="reset_confirm" type="password" id="reset_confirm" class="form-control" value=""
                                    tabindex="2" placeholder="{l s='Confirm password' mod='wkpos'}" />
                            </div>
                            <div class="">
                                <button class="btn btn-default wkpos-btn pull-right" name="submitReset" type="submit"
                                    tabindex="3">
                                    <i class="icon-ok text-success"></i>
                                    {l s='Reset password' mod='wkpos'}
                                </button>
                            </div>
                            <input type="hidden" name="reset_token" id="reset_token"
                                value="{$reset_token|escape:'html':'UTF-8'}" />
                            <input type="hidden" name="id_employee" id="id_employee"
                                value="{$id_employee|escape:'html':'UTF-8'}" />
                            <input type="hidden" name="reset_email" id="reset_email"
                                value="{$reset_email|escape:'html':'UTF-8'}" />
                        </form>
                        <div class="back back_reset">
                            <h4 id="reset_confirm_name">
                                {l s='Your password has been successfully changed.' mod='wkpos'}<br /><br />{l s='You will be redirected to the login page in a few seconds.' mod='wkpos'}
                            </h4>
                        </div>
                    {/if}
                    <form action="{$form_action|escape:'htmlall':'UTF-8'}" id="login_form" method="post"
                        {if isset($reset_token) && isset($id_employee)}style="display: none" {/if}>
                        <input type="hidden" name="redirect" id="redirect" value="" />
                        <div class="form-group">
                            <label class="control-label" for="email">{l s='Email address' mod='wkpos'}</label>
                            <input name="email" type="email" id="email" class="form-control"
                                value="{if isset($email)}{$email|escape:'htmlall':'UTF-8'}{/if}" autofocus="autofocus"
                                tabindex="1" placeholder="test@example.com" />
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="passwd">
                                {l s='Password' mod='wkpos'}
                            </label>
                            <div class="input-group js-parent-focus">
                                <input name="passwd" type="password" id="passwd" class="form-control"
                                    value="{if isset($password)}{$password|escape:'htmlall':'UTF-8'}{/if}" tabindex="2"
                                    placeholder="{l s='Password' mod='wkpos'}" />
                                <span class="input-group-btn">
                                    <a class="btn wkpos-btn" type="button" id="show_password" data-status="0">
                                        <i class="fa fa-eye" id="show" aria-hidden="true"></i>
                                        <i class="fa fa-eye-slash" id="hide" aria-hidden="true"
                                            style="display: none;"></i>
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div class="form-group row-padding-top">
                            <button name="submitLogin" type="submit" tabindex="4"
                                class="btn wkpos-btn btn-lg btn-block ladda-button" data-style="slide-up"
                                data-spinner-color="white">
                                <span class="ladda-label">
                                    {l s='Log in' mod='wkpos'}
                                </span>
                            </button>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div id="remind-me" class="checkbox pull-left">
                                    <label for="stay_logged_in">
                                        <input name="stay_logged_in" type="checkbox" id="stay_logged_in" value="1"
                                            tabindex="3" />
                                        {l s='Stay logged in' mod='wkpos'}
                                    </label>
                                </div>
                                <a href="#" class="wkpos-text-color show-forgot-password pull-right">
                                    {l s='I forgot my password' mod='wkpos'}
                                </a>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-12">
                                <div id="remind-me" class="checkbox pull-left">
                                    <label for="new_session">
                                        <input name="new_session" type="checkbox" id="new_session" value="1"
                                            tabindex="3" />
                                        {l s='Start New Session' mod='wkpos'}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="back panel">
                    <form action="{$form_action|escape:'htmlall':'UTF-8'}" id="forgot_password_form" method="post">
                        <div class="alert alert-info">
                            <h4>{l s='Forgot your password?' mod='wkpos'}</h4>
                            <p>{l s='In order to receive your access code by email, please enter the address you provided during the registration process.' mod='wkpos'}
                            </p>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="email_forgot">
                                {l s='Email' mod='wkpos'}
                            </label>
                            <input type="text" name="email_forgot" id="email_forgot" class="form-control"
                                autofocus="autofocus" tabindex="5" placeholder="test@example.com" />
                        </div>
                        <div class="">
                            <button type="button" href="#" class="btn wkpos-btn show-login-form" tabindex="7">
                                <i class="icon-caret-left"></i>
                                {l s='Back to login' mod='wkpos'}
                            </button>
                            <button class="btn wkpos-btn pull-right" name="submitForgot" type="submit" tabindex="6">
                                <i class="icon-ok text-success"></i>
                                {l s='Send' mod='wkpos'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
