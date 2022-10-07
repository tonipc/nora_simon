{**
* 2007-2019 PrestaShop and Contributors
*
* NOTICE OF LICENSE
*
* This source file is subject to the Open Software License (OSL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* https://opensource.org/licenses/OSL-3.0
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to https://www.prestashop.com for more information.
*
* @author PrestaShop SA <contact@prestashop.com>
  * @copyright 2007-2019 PrestaShop SA and Contributors
  * @license https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
  * International Registered Trademark & Property of PrestaShop SA
  *}

  <table style="width: 100%">
    <tr>
      <td style="width: 40%">
        {if $logo_path}
        <img src="{$logo_path}" style="width:{$width_logo}px; height:{$height_logo}px;" />
        {/if}
      </td>
      {if $carrier_is_recogida}
      <td style="width: 10%; font-weight: bold; font-size: 14pt; color: #444;">
        <img src="/img/s/56.jpg" style="width:130px; height:130px;" />
      </td>
      {/if}

      <td style="width: 50%; text-align: right;">

        {if !$carrier_is_recogida}
        <span style="font-weight: bold; font-size: 56pt; color: #444;">{$carrier_group|escape:'html':'UTF-8'}</span>
        {else}
        <table style="width: 100%">
          <tr>
            <td style="font-weight: bold; font-size: 14pt; color: #444; width: 100%;">{if isset($header)}{$header|escape:'html':'UTF-8'|upper}{/if}</td>
          </tr>
          <tr>
            <td style="font-size: 14pt; color: #9E9F9E">{$date|escape:'html':'UTF-8'}</td>
          </tr>
          <tr>
            <td style="font-size: 14pt; color: #9E9F9E">{$title|escape:'html':'UTF-8'}</td>
          </tr>
        </table>
        {/if}
      </td>
    </tr>
  </table>
