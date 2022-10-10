<!-- Button trigger modal -->
<button type="button" class="btn btn-dark" data-toggle="modal" data-target="#changeDateSsrModal">
  <span class="material-icons">event</span> {l s='Change Date' mod='norainventory'}
</button>

<!-- Modal -->
<div class="modal fade" id="changeDateSsrModal" tabindex="-1" aria-labelledby="changeDateSsrModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="changeDateSsrModalLabel">{l s='Change Date' mod='norainventory'}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            <p><strong>{l s='Current Date' mod='norainventory'}</strong>: {strtotime($nora_inventory.current_date)|date_format}</p>
          </div>
          {foreach $nora_inventory.available_dates as $date}
          <div class="col-md-2">
            <form method="post">
              <input type="hidden" name="current_date" value="{$date}">
              <button class="btn btn-dark {if ($date === $nora_inventory.current_date)}active{/if}" style="min-width:120px" type="submit" name="submit_current_date" value="1">
                <div class="d-flex flex-column">
                  <div>{$date|date_format:"%A"}</div>
                  <div class="display-2">{$date|date_format:"%e"}</div>
                </div>
              </button>
            </form>
          </div>
          {/foreach}
        </div>
      </div>
    </div>
  </div>
</div>
