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

{$style_tab|escape:'htmlall':'UTF-8'}

<table width="100%" id="body" border="0" cellpadding="0" cellspacing="0" style="margin:0;">
	<!-- Register -->
    {if isset($addresses_tab)}
        <tr>
            <td colspan="12">
                {$addresses_tab|escape:'htmlall':'UTF-8'}
            </td>
        </tr>
        <tr>
            <td colspan="12" height="30">&nbsp;</td>
        </tr>
    {/if}
    {if isset($register_tab)}
        <tr>
            <td colspan="12">

                {$register_tab|escape:'htmlall':'UTF-8'}

            </td>
        </tr>
    {/if}

	<tr>
		<td colspan="12" height="30">&nbsp;</td>
	</tr>

	<!-- TVA Info -->
	<tr>
		<td colspan="12">

			{$payment_tab|escape:'htmlall':'UTF-8'}

		</td>
	</tr>

	<tr>
		<td colspan="12" height="20">&nbsp;</td>
	</tr>

	<!-- Product -->
	<tr>
        <td width="50%">
        </td>
		<td width="50%">

			{$total_tab|escape:'htmlall':'UTF-8'}

		</td>
	</tr>

	<!-- Hook -->
	{if isset($HOOK_DISPLAY_PDF)}
	<tr>
		<td colspan="12" height="30">&nbsp;</td>
	</tr>

	<tr>
		<td colspan="2">&nbsp;</td>
		<td colspan="10">
			{$HOOK_DISPLAY_PDF|escape:'htmlall':'UTF-8'}
		</td>
	</tr>
	{/if}

</table>
