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
import { Products, loadProductPanel, listenForScrollEvent } from './product.js';
import { PosCartId, pushCartProducts, deleteCartCustomer } from './poscart.js';
import { showErrorMsg } from './wkgrowlmsg.js';
import { ajaxResposeError } from './wkajaxresponseerror.js';

export async function loadSession() {
    var self = objPosProductsViewModel;
    loaded = 1;
    $('.wk-loading-pos-details').removeClass('hide');
    $('.container-fluid.wk-pos').hide();
    if (posController != 'session') {
        await getPOSDetails();
    }
    posViewModel.bodyPanel('products');
    $(window).trigger('resize');
    if (localStorage) {
        listenForScrollEvent();
        var posProductOnLoad = objProduct.getPosProductDetails();
        // var posProductOnLoad = pos_products;
        posProductOnLoad.then(
            function (response) {
                var mappedTasks = $.map(response, function (item) {
                    return new Products(item, self.selectedIdCountry())
                });
                loadProductPanel(mappedTasks);
            },
            function (response) {
            }
        );
        //Update Product on page load.
        // self.products(mappedTasks);
        if (localStorage.pos_cart) {
            deleteCartCustomer();
            //Update Cart on Page Load.
            var allData = $.parseJSON(localStorage.pos_cart);
            var mappedTasks = $.map(allData, function (item, index) {
                if (!isNaN(index)) {
                    return new PosCartId(index)
                }
            });
            self.posCarts(mappedTasks);
            var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
            activeCart = cartIndex;

            // Update cart product on page load.
            allData = pushCartProducts(allData, cartIndex);
            //Set selected item cart value on page load
            if (allData[cartIndex]['selectedCartItemIndex'] !== undefined
                || allData[cartIndex]['selectedCartItemIndex'] >= 0
            ) {
                var selectedProductDetails = allData[cartIndex][allData[cartIndex]['selectedCartItemIndex']];
                if (selectedProductDetails['idProductAttribute'] == undefined) {
                    self.selectedCartProduct(selectedProductDetails['id'] + 'c' + '');
                } else {
                    self.selectedCartProduct(selectedProductDetails['id'] + 'c' + selectedProductDetails['idProductAttribute']);
                }
                self.selectedCartProductIndex(allData[cartIndex]['selectedCartItemIndex']);
            }

            //Set selected customer detail on page load.
            if (allData[cartIndex]['others'] !== undefined
                && allData[cartIndex]['others']['customer'] !== undefined
            ) {
                self.selectedCustomerName(allData[cartIndex]['others']['customer']['customerName']);
                self.selectedCustomerId(allData[cartIndex]['others']['customer']['idCustomer']);
                self.customerEmail(allData[cartIndex]['others']['customer']['customerEmail']);
                self.customerName(allData[cartIndex]['others']['customer']['customerName']);
                self.idCustomer(allData[cartIndex]['others']['customer']['idCustomer']);
                self.selectedIdCountry(allData[cartIndex]['others']['id_country']);
                self.selectedIdAddress(allData[cartIndex]['others']['customer']['id_address_delivery']);
            } else {
                if (guestAccountEnabled == true) {
                    self.selectedCustomerId(idGuest);
                    self.selectedCustomerName(guestName);
                } else {
                    self.selectedCustomerName(customerName);
                    self.selectedCustomerId(0);
                }
            }

            // if (typeof allData[cartIndex]['others'] !== 'undefined'
            //     && typeof allData[cartIndex]['others']['reward_coupon'] !== 'undefined'
            // ) {
            //     self.rewardAmount(getRewardTotalAmount(allData[cartIndex], 50));
            // }
            // updateShipping();
        }
        //Load order detail on page load.
        self.posCarts()[localStorage.selectedCartId].isCartActive("active");
        if (localStorage.pos_orders) {
            pos_orders = $.parseJSON(localStorage.pos_orders);
        }
    }
    //Load categories
    if (categories != undefined) {
        if (categories.length > 4) {
            $('.menu-dropdown').show();
        } else {
            $('.menu-dropdown').hide();
        }
        var isMobile = window.matchMedia("only screen and (max-width: 991px)");
        var categoryItemDisplay = 3;
        if (isMobile.matches) {
            categoryItemDisplay = 0;
        }
        var mappedTasks = $.map(categories, function (item, index) {
            if (index > categoryItemDisplay)
                return;
            return new CategoryDetails(item);
        });
        self.categories(mappedTasks);
        var mappedTasks = $.map(categories, function (item, index) {
            if (index < categoryItemDisplay + 1)
                return;
            return new CategoryDetails(item);
        });
        self.remainingCategories(mappedTasks);
    }
}

/* Mapping of category Details */
function CategoryDetails(category) {
    var self = this;
    this.idCategory = category.id_category;
    this.categoryName = category.name;
    if (typeof category.children == 'undefined') {
        this.hasChildren = 0;
    } else {
        this.hasChildren = 1;
    }
}

export function updateSessionStatus(sessionData = {}) {
    sessionData.ajax = true;
    sessionData.posToken = posToken;

    return new Promise(resolve => {
        $.ajax({
            url: posSessionLink,
            dataType: 'json',
            type: 'get',
            data: sessionData,
            success: function (response) {
                if (response.hasError) {
                    $.each(response.errors, function (index, error) {
                        showErrorMsg(error);
                    });
                    resolve(false);
                } else {
                    resolve(response);
                    // getAllCategories();
                }
            },
            error: function (jqXHR, exception) {
                ajaxResposeError(jqXHR, exception);
                resolve(false);
            }
        });
    });
}
