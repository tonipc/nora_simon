{*
* NOTICE OF LICENSE
*
* All right is reserved,
* Please go through LICENSE.txt file inside our module
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future. If you wish to customize this module for your
* needs please refer to CustomizationPolicy.txt file inside our module for more information.
*
* @author Webkul IN
* @copyright since 2010 Webkul
* @license LICENSE.txt
*}
<div class="btn-group pull-right">
{if isset($wktype)}
    {if $wktype == 'warning'}
        <span class="badge badge-warning">{$wkdata|escape:'htmlall':'UTF-8'}</span>
    {elseif $wktype == 'danger'}
        <span class="badge badge-danger">{$wkdata|escape:'htmlall':'UTF-8'}</span>
    {elseif $wktype == 'success'}
        <span class="badge badge-success">{$wkdata|escape:'htmlall':'UTF-8'}</span>
    {elseif $wktype == 'info'}
        <span class="badge badge-info">{$wkdata|escape:'htmlall':'UTF-8'}</span>
    {elseif $wktype == 'critical'}
        <span class="badge badge-critical">{$wkdata|escape:'htmlall':'UTF-8'}</span>
    {elseif $wktype == 'blank'}
        <span>{$wkdata|escape:'htmlall':'UTF-8'}</span>
    {elseif $wktype == 'open'}
        <span>
    {elseif $wktype == 'close'}
        </span><br>
    {elseif $wktype == 'anchor'}
        <a href="{$wklink|escape:'htmlall':'UTF-8'}" target="_blank" class="btn btn-default">{$wktext|escape:'htmlall':'UTF-8'}</a>
    {/if}
{/if}
</div>
