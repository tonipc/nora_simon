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

<table id="total-tab" width="100%">
	<tr>
		<td class="grey" width="50%">
			{l s='Total Opening Balance' mod='wkpos' pdf='true'}
		</td>
		<td class="white right bold" width="50%">
			{$openingAmount|escape:'htmlall':'UTF-8'}
		</td>
	</tr>
    <tr>
		<td class="grey" width="50%">
			{l s='Total Closing Balance' mod='wkpos' pdf='true'}
		</td>
		<td class="white right bold" width="50%">
			{$closingAmount|escape:'htmlall':'UTF-8'}
		</td>
	</tr>
    <tr>
		<td class="grey" width="50%">
			{l s='Total Cash Deposit Amount' mod='wkpos' pdf='true'}
		</td>
		<td class="white right bold" width="50%">
			{$depositAmount|escape:'htmlall':'UTF-8'}
		</td>
	</tr>
    <tr>
		<td class="grey" width="50%">
			{l s='Total Cash Withdraw Amount' mod='wkpos' pdf='true'}
		</td>
		<td class="white right bold" width="50%">
			{$withdrawAmount|escape:'htmlall':'UTF-8'}
		</td>
	</tr>
</table>
