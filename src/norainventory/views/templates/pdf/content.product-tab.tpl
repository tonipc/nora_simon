<table class="product" width="100%" cellpadding="4" cellspacing="0">
		<thead>
			<tr>
        <th class="product header small" width="15%">{l s='Qty' mod='norainventory'}</th>
        <th class="product header small" width="15%">Formato</th>
        <th class="product header small" width="70%" style = "text-align: center;">{l s='Product' mod='norainventory'}</th>
      </tr>
		</thead>
		<tbody>
    {if !empty($products)}
			{foreach $products as $product}
				{cycle values=["color_line_even", "color_line_odd"] assign=bgcolor_class}

				{if isset($product.package)} <!-- If product is a package render it this way -->
			        <tr class="pack {$bgcolor_class}">
			        	<td class="pack center">({$product.product_quantity})</td>
						<td></td>  <!-- No format for packs-->
						<td class="pack left">
			          		<span>{$product.product_name|escape:'html':'UTF-8'}</span>
									<!-- {if $display_short_description}
										<br />
										<br />
				            {$product.description_short}
									{/if}-->
						</td>
					</tr>
				{else}
					<tr class="product {$bgcolor_class}">
				        	{if $item.pack_quantity|intval * $product.product_quantity == 1}
								<td class="quantity_1 center">
							{else}
		            			<td class="quantity center">
							{/if}
				        		{$product.product_quantity}
				        	</td>
							<td></td>  <!-- No format for packs-->
							<td class="product left">
				          		<span>{$product.product_name|escape:'html':'UTF-8'}</span>
										<!-- {if $display_short_description}
											<br />
											<br />
					            {$product.description_short}
										{/if}-->
							</td>
					</tr>
				{/if}


	      <!-- PRINT ITEMS OF THE MENU IF PRODUCT IS A MENU -->
	      {if isset($product.package) && $product.package}
	        {foreach $product.package as $item}
	          <tr class="product {$bgcolor_class}">
					{if $item.pack_quantity|intval * $product.product_quantity == 1}
						<td class="quantity_1 center">
					{else}
            			<td class="quantity center">
					{/if}
							{if strpos($item.name|escape:'htmlall':'UTF-8','VEGAN')!== false}
									{$item.pack_quantity|intval * $product.product_quantity}·V
								{else}
									{$item.pack_quantity|intval * $product.product_quantity}
							{/if}
						</td>

						{if empty($item.attribute|escape:'htmlall':'UTF-8')}
						<td class="product_nat center">
							Normal
							</td>
						{elseif strpos($item.attribute|escape:'htmlall':'UTF-8','Normal')!== false}
						<td class="product_nat center">
							{$item.attribute|escape:'htmlall':'UTF-8'}
							</td>
						{else}
						<td class="product_wat center">
							{$item.attribute|escape:'htmlall':'UTF-8'}
							</td>
						{/if}

	            <!-- <td width = "15px"></td> line-subproduct cellpadding="50px"-->
	            <td class="product left" >
	              <span style = "color white"> {$item.name|escape:'htmlall':'UTF-8'}</span>
	            	</td>
	          </tr>
	        <!--  {if $item.reference}<span>({$item.reference|escape:'htmlall':'UTF-8'})</span>{/if} -->
	        {/foreach}
	      {/if}

			{/foreach}
		{/if}

	     <!-- EXTRA FREE PRODUCTS WHEN WELCOME-->
			{if $is_first_order}
			 <tr class="product color_line_welcome">
					 <td></td>

					 <td class="product_nat center">
						 SURPRISE!
						 </td>

				 <td class="welcome left" >
					  CARROT CAKE WELCOME
					 </td>
			 </tr>
			 <tr class="product color_line_welcome">

					 <td></td>

					 <td class="product_nat center">
						 SURPRISE!
						 </td>

				 <td class="welcome left">
					  BOLSA TELA NORA
					 </td>
			 </tr>

			{/if}
			<!-- -->

	    <!-- END WELCOME PRODUCT -->

			<!-- MANDATORY PRODUCTS FOR OSBORNE-->
		 {if {$isOsborne|intval} == 1}
			<tr class="product color_line_welcome">
					<td></td>

					<td class="product_nat center">
						OSBORNE
						</td>

				<td class="welcome left" >
					 PAN, CUBIERTOS Y SERVILLETA NEGRA
					</td>
			</tr>

		 {/if}
		 <!-- -->



	</tbody>
</table>
