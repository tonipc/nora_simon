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

{block name='head_charset'}
    <meta charset="utf-8">
{/block}
{block name='head_ie_compatibility'}
    <meta http-equiv="x-ua-compatible" content="ie=edge">
{/block}

{block name='head_seo'}
    <title>{block name='head_seo_title'}{l s='Point of Sale ' mod='wkpos'}{/block}</title>
    <meta name="description"
        content="{block name='head_seo_description'}POS Sale, Create order through Point of sale module{/block}">
    <meta name="keywords" content="{block name='head_seo_keywords'}{$page.meta.keywords|escape:'htmlall':'UTF-8'}{/block}">

    {if $page.meta.robots !== 'index'}
        <meta name="robots" content="{$page.meta.robots|escape:'htmlall':'UTF-8'}">
    {/if}
    {if $page.canonical}
        <link rel="canonical" href="{$page.canonical|escape:'htmlall':'UTF-8'}">
    {/if}
    {block name='head_hreflang'}
        {foreach from=$urls.alternative_langs item=pageUrl key=code}
            <link rel="alternate" href="{$pageUrl|escape:'htmlall':'UTF-8'}" hreflang="{$code|escape:'htmlall':'UTF-8'}">
        {/foreach}
    {/block}
{/block}

{block name='head_viewport'}
    <meta name="viewport" content="width=device-width, initial-scale=1">
{/block}

{block name='head_icons'}
    <link rel="icon" type="image" href="{$logoPng|escape:'htmlall':'UTF-8'}">
    {* <link rel="icon" type="image/vnd.microsoft.icon" href="{$shop.favicon}?{$shop.favicon_update_time}">
  <link rel="shortcut icon" type="image/x-icon" href="{$shop.favicon}?{$shop.favicon_update_time}"> *}
{/block}

{block name='stylesheets'}
    {include file="module:wkpos/views/templates/front/_partials/stylesheets.tpl" stylesheets=$cssFiles}
{/block}

{block name='javascript_head'}
    {include file="module:wkpos/views/templates/front/_partials/javascript.tpl" javascript=$jsFiles vars=$jsVariables}
{/block}

{block name='hook_header'}
    {hook h='wkposDisplayHeader'}
{/block}

{block name='hook_extra'}{/block}

<audio id="errorAudio" src="{$errorMp3|escape:'htmlall':'UTF-8'}" autoplay="false" style="display:none;"></audio>
