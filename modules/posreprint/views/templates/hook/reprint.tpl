<form method="post" class="formReprint">
    <input type="hidden" id="url_action_reprint" value="{$action_reprint}">
    <input type="hidden" class="orderId" name="orderId" value="" />

    <div class="email-div">
        <label for="email-reprint" class="text-left">{l s='Add your email to send you a copy of this order:' mod='posreprint'}</label>
        <input type="email" class="form-control mb-3" id="email-reprint" name="email-reprint" value="" required>

        <button type="submit" id="submitReprint" name="submitReprint" class="btn btn-block">
            {l s='Send me an email' mod='posreprint'}
        </button>
    </div>

</form>