/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.txt
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to a newer
 * versions in the future. If you wish to customize this module for your
 * needs please refer to CustomizationPolicy.txt file inside our module for more information.
 *
 * @author Webkul IN
 * @copyright Since 2010 Webkul
 * @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */

import objProduct from './product.js';
import { showErrorMsg } from './wkgrowlmsg.js';

/* Get the tax rate of all the product according to selected address and update the tax rate in the cart */
var getTaxRateData = undefined;
export function getTaxRate() {
    if (posViewModel.navigatorOnline()) {
        if (typeof getTaxRateData != 'undefined') {
            getTaxRateData.abort();
        }
        getTaxRateData = $.getJSON(
            posSales,
            {
                action: 'getTaxRate',
                ajax: true,
                id_address: viewModel.selectedIdAddress(),
                posToken: posToken
            },
            function (response) {
                if (response.hasError) {
                    $.each(response.errors, function (index, error) {
                        showErrorMsg(error);
                        // $.growl.error({ title: "", message: error });
                    });
                } else {
                    taxRate = response.taxRate;
                    viewModel.updateTaxRate(taxRate, true);
                }
            }
        );
    } else {
        taxRate = undefined;
        // showErrorMsg(networkError);
        // $.growl.error({ title: "", message: networkError });
    }
}

export function updateTaxRate(taxRate, updateCart = false) {
    var posProducts = objProduct.getPosProductDetails();
    posProducts.then(
        function (products) {
            var posProductCart = viewModel.productCart();
            var posCart = $.parseJSON(localStorage.pos_cart);
            var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
            $.each(products, function (productIndex, product) {
                $.each(posProductCart, function (index, cartProduct) {
                    if (cartProduct.idProduct() == product['id']) {
                        cartProduct.taxRate(taxRate[product['id']]);
                        posCart[cartIndex][index]['taxRate'] = taxRate[product['id']];
                    }
                });
            });
            if (updateCart) {
                localStorage.setItem('pos_cart', JSON.stringify(posCart));
            }
        },
        function (response) {
        }
    );
}
