<table id="addresses-tab" cellspacing="0" cellpadding="0">
    <tr>
        <td width="33%"><span class="bold"> </span><br/><br/>
            {$extrainfo}
        </td>
        {if !$adresses_same}
          <td width="33%">
            <span class="left">{l s='Dirección de facturación' mod='quotes'}</span>
            <span class="right">---------------------------------</span>
            <br/>
            {$invoice_address}
          </td>
        {else}
           <td width="33%">
           </td>
        {/if}

        {if $delivery_address}
          <td width="33%">
            <span class="left">{l s='Dirección de entrega' mod='quotes'}</span>
            <span class="right">---------------------------------</span>
            <br/>
            {$delivery_address}
          </td>
        {/if}
    </tr>
</table>
