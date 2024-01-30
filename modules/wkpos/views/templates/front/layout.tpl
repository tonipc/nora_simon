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

<!doctype html>
<html lang="{$language.iso_code|escape:'htmlall':'UTF-8'}">

<head>
    {block name='wkpos_head'}
        {include file='module:wkpos/views/templates/front/_partials/head.tpl'}
    {/block}
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

<body id="{if isset($pageName) && $pageName == 'pos-sale'}{$pageName|escape:'htmlall':'UTF-8'}{else}{$page.page_name|escape:'htmlall':'UTF-8'}{/if}"
    class="{$page.body_classes|classnames} wkpos-scrollbar">

    {block name='hook_after_body_opening_tag'}
        {hook h='displayAfterBodyOpeningTag'}
    {/block}

    <main>
        {* {block name='product_activation'}
        {include file='module:wkpos/views/templates/front/catalog/_partials/product-activation.tpl'}
      {/block} *}

        <header id="header">
            {block name='header'}
                {include file='module:wkpos/views/templates/front/_partials/header.tpl'}
            {/block}
        </header>

        {* {block name='notifications'}
        {include file='module:wkpos/views/templates/front/_partials/notifications.tpl'}
      {/block} *}

        <section id="pos-content">
            {* <!-- ko with: contentModel --> *}
            {hook h="wkposDisplayWrapperTop"}
            {block name='wkpos_loader'}
            {/block}
            <div class="container-fluid wk-pos"">
            <div class=" row wk-d-flex">
                {* {block name='breadcrumb'}
                {include file='module:wkpos/views/templates/front/_partials/breadcrumb.tpl'}
              {/block} *}
                {block name='wkpos_body'}
                {block name="left_column"}
                <div id="wk-pos-side-panel" class="col-xs-1">
                    {block name="wkpos_sidebar"}
                    <p>Hello world! This is HTML5 Boilerplate.</p>
                    {/block}
                </div>
                {/block}

                {block name="content_wrapper"}
                <div id="content-wrapper" class="col-sm-11">
                    {hook h="wkposDisplayContentWrapperTop"}
                    {block name="content"}
                    <p>Hello world! This is HTML5 Boilerplate.</p>
                    {/block}
                    {hook h="wkposDisplayContentWrapperBottom"}
                </div>
                {/block}

                {block name="right_column"}
                <div id="right-column" class="col-xs-5 hidden-xs">
                    {hook h='wkposDisplayWkPosRightColumn'}
                </div>
                {/block}
                {/block}
            </div>
            </div>
            {hook h="wkposDisplayWrapperBottom"}
            {* <!-- /ko --> *}
        </section>

        <footer id="footer">
            {block name="footer"}
            {/block}
        </footer>

    </main>

    {* {block name='javascript_bottom'}
      {include file="_partials/javascript.tpl" javascript=$javascript.bottom}
    {/block} *}
    {block name='wkpos_fullscreen'}
    <div id="wkpos_full_screen">
        <div id="wkpos_full_screen_img" draggable="true" title="{l s='Enter Full Screen' mod='wkpos'}">
            <i class="fa fa-arrows-alt" aria-hidden="true"></i>
        </div>
    </div>
    {/block}

    {block name='hook_before_body_closing_tag'}
        {hook h='wkposDisplayBeforeBodyClosingTag'}
    {/block}
</body>

</html>
