<form method="post" class="formReprint">
    <input type="hidden" id="url_action_reprint" value="{$action_reprint}">
    <input type="hidden" class="orderId" name="orderId" value="" />

    <div class="email-div">
        <label for="email-reprint" class="text-left">{l s='Añade tu email para enviarte copia de este pedido:' mod='posreprint'}</label>
        <input type="email" class="form-control mb-3" id="email-reprint" name="email-reprint" value="" required>

        <button type="submit" id="submitReprint" name="submitReprint" class="btn btn-block">
            {l s='Recibir email' mod='posreprint'}
        </button>
    </div>

</form>