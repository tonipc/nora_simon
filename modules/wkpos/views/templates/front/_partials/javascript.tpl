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

{if isset($javascript) && $javascript}
    {foreach from=$javascript item=jsUrl}
        <script type="text/javascript" src="{$jsUrl|escape:'htmlall':'UTF-8'}"></script>
    {/foreach}

    <script>
        {foreach from=$vars key=variableName item=variableValue}
            var {$variableName|escape:'htmlall':'UTF-8'} = {$variableValue|json_encode nofilter};
        {/foreach}
    </script>
    <script>
        var pos_products,
            customers,
            orders,
            pos_cart = {},
            pos_orders = {},
            posOrders;
        var qty = 0,
            update = "qty",
            activeSidePanel, back;
        var categoryWiseProducts = {};
    </script>
{/if}
