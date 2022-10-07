{$style_tab}

<table width="100%" id="body" border="0" cellpadding="0" cellspacing="0" style="margin:0;">
	<!-- Invoicing -->
	<tr>
		<td colspan="12">
			{$addresses_tab}
		</td>
	</tr>
	{if $is_first_order}
	<tr>
		<td class="welcome_icon" colspan="12" height="25">WELCOME!</td>
	</tr>
	{/if}
	<tr>
		<td height="3">&nbsp;</td>
	</tr>
    <!-- TVA Info -->
	<tr>
		<td colspan="12">
			{$summary_tab}
		</td>
	</tr>
	<tr>
		<td colspan="12" height="10">&nbsp;</td>
	</tr>
	<!-- Product -->
	<tr>
		<td colspan="12">
			{$product_tab}
		</td>
	</tr>
	{if count($messages_customer)}
		<tr>
			<td colspan="12">
				<table>
		            {foreach from=$messages_customer item=message name="messageList"}
		                <tr class="{if $smarty.foreach.messageList.first}first_item{elseif $smarty.foreach.messageList.last}last_item{/if} {if $smarty.foreach.messageList.index % 2}alternate_item{else}item{/if}">
		                    <td>
		                        <strong>
		                            {if isset($message.elastname) && $message.elastname}
		                                {$message.efirstname|escape:'html':'UTF-8'} {$message.elastname|escape:'html':'UTF-8'}
		                            {elseif $message.clastname}
		                                {$message.cfirstname|escape:'html':'UTF-8'} {$message.clastname|escape:'html':'UTF-8'}
		                            {else}
		                                {$shop_name|escape:'html':'UTF-8'}
		                            {/if}
		                        </strong>
		                        <br />
		                        {dateFormat date=$message.date_add full=1}
		                    </td>
		                    <td>{$message.message|unescape:'html':'UTF-8'|nl2br}</td>
		                </tr>
		            {/foreach}
	        	</table>
			</td>
		</tr>
	{/if}
</table>
