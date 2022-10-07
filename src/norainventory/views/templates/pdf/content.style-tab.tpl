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
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}

{assign var=color_header value="#F0F0F0"}
{assign var=color_border value="#000000"}
{assign var=color_border_lighter value="#CCCCCC"}
{assign var=color_line_even value="#FFFFFF"}
{assign var=color_line_odd value="#F9F9F9"}
{assign var=font_size_text value="14pt"}
{assign var=font_size_welcome_icon value="24pt"}
{assign var=font_size_header value="12pt"}
{assign var=font_size_product value="16pt"}
{assign var=font_size_product_wat value="16pt"}
{assign var=font_size_product_nat value="12pt"}
{assign var=font_size_pack value="12pt"}
{assign var=font_size_quantity value="30pt"}
{assign var=height_header value="20px"}
{assign var=table_padding value="4px"}

<style>
	table, th, td {
		margin: 0!important;
		padding: 0!important;
		vertical-align: middle;
		font-size: {$font_size_text};
		white-space: nowrap;
	}

	table.product {
		border: 1px solid {$color_border};
		border-collapse: collapse;
	}

  table.pack {
    border: 1px solid {$color_border};
    border-collapse: collapse;
  }

	table#addresses-tab tr td {
		font-size: large;
	}

	table#summary-tab {
		padding: {$table_padding};
		border: 1pt solid {$color_border};
	}

	table#payment-tab {
		padding: {$table_padding};
		border: 1px solid {$color_border};
	}

	th.product {
		border-bottom: 1px solid {$color_border};
	}

  tr.pack {
		border-bottom: 1px solid {$color_border_lighter};
	}

	tr.discount th.header {
		border-top: 1px solid {$color_border};
	}

	tr.product td {
		border-bottom: 1px solid {$color_border_lighter};
	}

  tr.pack td {
		border-bottom: 1px solid {$color_border_lighter};
	}

	tr.color_line_even {
		background-color: {$color_line_even};
	}

	tr.color_line_odd {
		background-color: {$color_line_odd};
	}

  tr.color_line_welcome {
		background-color: {$color_header};
	}

	tr.customization_data td {
	}

	td.product {
		vertical-align: middle;
		font-size: {$font_size_product};
    transform: translate(-50%, -50%,-50%, -50%);
	}

  td.welcome {
		vertical-align: middle;
		font-size: {$font_size_product};
    font-weight: bold;
    transform: translate(-50%, -50%,-50%, -50%);
	}

  td.pack {
		vertical-align: middle;
		font-size: {$font_size_pack};
    font-weight: bold;
    font-style: italic;
    transform: translate(-50%, -50%,-50%, -50%);
	}

  td.product_wat {
    vertical-align: middle;
    font-size: {$font_size_product_wat};
    font-weight: bold;
    transform: translate(-50%, -50%,-50%, -50%);
  }

  td.product_nat {
    vertical-align: middle;
    font-size: {$font_size_product_nat};
    transform: translate(-50%, -50%,-50%, -50%);
  }

  td.quantity {
    vertical-align: middle;
    font-size: {$font_size_quantity};
    font-weight: bold;
    text-align: center;
    transform: translate(-50%, -50%,-50%, -50%);
  }

  td.quantity_1 {
    vertical-align: middle;
    font-size: {$font_size_quantity};
    text-align: center;
    transform: translate(-50%, -50%,-50%, -50%);
  }

  td.welcome_icon {
    vertical-align: middle;
    font-size: {$font_size_welcome_icon};
    text-align: left;
    transform: translate(-50%, -50%,-50%, -50%);
  }


	th.header {
		font-size: {$font_size_header};
		height: {$height_header};
		background-color: {$color_header};
		vertical-align: middle;
		text-align: center;
		font-weight: bold;
	}

	th.header-right {
		font-size: {$font_size_header};
		height: {$height_header};
		background-color: {$color_header};
		vertical-align: middle;
		text-align: right;
		font-weight: bold;
	}

	th.payment {
		background-color: {$color_header};
		vertical-align: middle;
		font-weight: bold;
	}

	tr.separator td {
		border-top: 1px solid #000000;
	}

	.left {
		text-align: left;
	}

	.fright {
		float: right;
	}

	.right {
		text-align: right;
	}

	.center {
		text-align: center;
	}

	.bold {
		font-weight: bold;
	}

	.border {
		border: 1px solid black;
	}

	.no_top_border {
		border-top:hidden;
		border-bottom:1px solid black;
		border-left:1px solid black;
		border-right:1px solid black;
	}

	.grey {
		background-color: {$color_header};

	}

	/* This is used for the border size */
	.white {
		background-color: #FFFFFF;
	}

	.big,
	tr.big td{
		font-size: 110%;
	}
	.small {
		font-size:small;
	}

	.line-subproduct
	{
		padding: 100px !important;
		margin-left: 10px !important;
	}
</style>
