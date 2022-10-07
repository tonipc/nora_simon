<br />
<hr />
<table style="width: 100%;">
	<tr>
		<td style="text-align: center; font-size: 6pt; color: #444;  width:100%;">
      {if isset($shop_details)}
        {$shop_details|escape:'html':'UTF-8'}
      {/if}

      {$shop_address|escape:'html':'UTF-8'}<br />

      {if !empty($shop_phone) OR !empty($shop_fax)}
        {l s='For more assistance, contact Support:' mod='norainventory'}
        {if !empty($shop_phone)}
          {l s='Tel: %s' sprintf=[$shop_phone|escape:'html':'UTF-8'] mod='norainventory'}
        {/if}
            <br />
      {/if}

      <p style="text-align: right; vertical-align: text-top;">
        {l s='Pag.' mod='norainventory'}{literal} {:png:} / {:ptg:} {/literal}
      </p>
		</td>
	</tr>
</table>
