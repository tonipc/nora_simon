{extends file='page.tpl'}

{block name='page_content'}

  {capture name=path}
    <a title="{l s='Compose your packs' mod='norainventory'}" href="#">{l s='Compose your packs' mod='norainventory'}</a>
		<span class="navigation-pipe"> > </span>
    {l s='Our packs'  mod='ndk_steppingpack'}
  {/capture}

  <div id="app"></div>

  <script src="{$vendorChunk}?1.8" async defer></script>
  <script src="{$commonsChunk}?1.8" async defer></script>
  <script src="{$pathApp}?1.8" async defer></script>
{/block}
