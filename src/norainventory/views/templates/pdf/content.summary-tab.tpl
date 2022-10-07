<table id="summary-tab" width="100%">
    <tr>
      <th class="header small" valign="middle">{l s='Order Reference' mod='norainventory'}</th>
      <th class="header small" valign="middle">{l s='Order date' mod='norainventory'}</th>
      <th class="header small" valign="middle">{l s='Delivery Date' mod='norainventory'}</th>
      <th class="header small" valign="middle">{l s='Payment Method' d='Shop.Pdf' pdf='true'}</th>
    </tr>
    {if !empty($summary)}
    <tr>
        <td class="center small white"><strong>{$summary.order_id|escape:'html':'UTF-8'}</strong></td>
        <td class="center small white">{dateFormat date=$summary.order_date full=0}</td>
        <td class="center white"><strong>{dateFormat date=$summary.delivery_date full=0}</strong></td>
        <td class="center small white">{$payment_method|escape:'html':'UTF-8'}</td>
    </tr>
    {/if}
</table>
