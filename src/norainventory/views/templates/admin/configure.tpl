{*
* 2007-2021 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2021 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

<div class="panel">
	<div class="moduleconfig-content">
		<div class="row">
			<div class="col-xs-12">

        <h3>{l s='Cron Task' mod='norainventory'}</h3>
				<br />

        <p>{l s='Generate a cron job daily at 11:50 PM to clean outdated inventory.' mod='norainventory'}</p>

				<p class="text-center">
					<code>
            50 23 * * * curl -k "{$norainventoryCronTaskUrl|escape:'htmlall':'UTF-8'}"
					</code>
				</p>
			</div>
		</div>
	</div>
</div>
