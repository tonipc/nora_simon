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

import { showErrorMsg, showSuccessMsg } from './wkgrowlmsg.js';
import { ProductCombinationDetails, getAllPosProducts } from './product.js';
import objProduct from './product.js';
import { displayImageDrag } from './wkimagemove.js';
import { asyncComputed, wkFormatCurrency, makeTotalProductCaculation } from './wkformatcurrency.js';

/* Mapping of product cart details */
function ProductCartDetails(data, index, product) {
    var self = this;
    this.idProduct = ko.observable(data.id);
    var image = data.image;
    if (typeof product != 'undefined') {
        if (typeof data.idProductAttribute != 'undefined'
            && typeof product['combination_images'][data.idProductAttribute] != 'undefined'
            && typeof product['combination_images'][data.idProductAttribute][0] != 'undefined'
        ) {
            image = product['combination_images'][data.idProductAttribute][0];
        } else {
            image = product['image'];
        }
    }
    this.index = index;
    this.image = image;
    if (taxRate != undefined) {
        this.taxRate = ko.observable(taxRate[data.id]);
    } else {
        this.taxRate = ko.observable(defaultTaxRate[data.id]);
    }
    this.productName = data.name;
    this.productPrice = ko.observable(data.price);
    this.taxExcludedPrice = ko.observable(parseFloat(data.taxExcludedPrice));

    this.updatePrice = ko.observable(data.updatePrice);
    if (data.quantity !== false) {
        this.productQuantity = ko.observable(data.quantity);
    } else {
        this.productQuantity = ko.observable(parseInt(self.combinationQuantity()));
    }
    self.updateQuantity = function () {
        if (isNaN(this.productQuantity()) || this.productQuantity() < 0) {
            this.productQuantity(1);
        }
        if (this.productQuantity() === '') {
            this.productQuantity(1);
        } else {
            var cartIndex = 0;
            var cartProductQty = 0;
            var pos_cart = $.parseJSON(localStorage.pos_cart);
            var posProducts = objProduct.getPosProductDetails();
            posProducts.then(
                function (pos_products) {
                    var productQty;
                    cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                    if (self.idProductAttribute == '') {
                        productQty = parseInt(pos_products[self.idProduct()].quantity);
                    } else {
                        productQty = parseInt(pos_products[self.idProduct()]['combination_details'][self.combinationIndex].quantity);
                    }
                    if (parseInt(self.productQuantity()) > productQty
                        && checkOutofStockAllow(pos_products[self.idProduct()]) == false
                    ) {
                        showErrorMsg(wkQuantityNotifi);
                        self.productQuantity(parseInt(pos_cart[cartIndex][self.index]['quantity']));
                    } else {
                        cartProductQty = self.productQuantity();
                        self.productQuantity(parseInt(cartProductQty));
                        pos_cart[cartIndex][self.index]['quantity'] = cartProductQty;
                        localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
                    }
                },
                function (response) {
                }
            );
        }

    };
    this.displayProductPrice = ko.observable(data.displayPrice);
    if (data.attributeName !== undefined) {
        this.productAttributes = data.attributeName;
        this.idProductAttribute = data.idProductAttribute;
        this.combinationIndex = data.combinationIndex;
    } else {
        this.productAttributes = '';
        this.idProductAttribute = '';
    }
    this.uniqueKey = data.id + 'c' + this.idProductAttribute;
    if (data.productDiscount !== undefined) {
        this.productDiscount = ko.observable(data.productDiscount);
    } else {
        this.productDiscount = ko.observable(0);
    }
    this.displayTaxExcludedPrice = asyncComputed(function () {
        var totalPrice = parseFloat(this.taxExcludedPrice());
        if (this.productDiscount()) {
            totalPrice -= totalPrice * this.productDiscount() / 100;
        }
        return wkFormatCurrency(parseFloat(totalPrice), currencyFormat);
    }, this);
    this.price = asyncComputed(function () {
        var totalPrice = parseFloat(this.taxExcludedPrice());
        totalPrice += this.taxExcludedPrice() * this.taxRate() / 100;
        if (totalPrice != parseFloat(data.taxExcludedPrice)) {
        }
        if (this.productDiscount()) {
            totalPrice -= totalPrice * this.productDiscount() / 100;
        }
        return wkFormatCurrency(parseFloat(totalPrice), currencyFormat);
    }, this);
    this.displayPrice = asyncComputed(function () {
        var totalPrice = this.productQuantity() * this.taxExcludedPrice();
        totalPrice += this.productQuantity() * this.taxExcludedPrice() * this.taxRate() / 100;
        if (totalPrice != parseFloat(data.taxExcludedPrice)) {
        }
        if (this.productDiscount()) {
            totalPrice -= totalPrice * this.productDiscount() / 100;
        }
        return wkFormatCurrency(parseFloat(totalPrice), currencyFormat);
    }, this);

}

/* Mapping of POS Cart ID*/
export function PosCartId(posCartId, active = false) {
    this.posCartId = ko.observable(parseInt(posCartId) + 1);
    if (active !== false) {
        this.isCartActive = ko.observable(active);
    } else {
        this.isCartActive = ko.observable();
    }
}

export function PosCartViewModel(params) {
    var buttonVal;
    if ((params.buttonValue) !== undefined) {
        buttonVal = params.buttonValue;
    } else {
        buttonVal = params.buttonText;
    }
    var cart = {
        activeClass: params.buttonValue,
        productCart: params.productCart,
        buttonText: ko.observable(params.buttonText),
        buttonValue: ko.observable(buttonVal),
    }
    return cart;
}

export function createNewCart() {
    if (localStorage.pos_cart !== undefined && localStorage.pos_cart !== '') {
        applyCustomer = 0;
        var pos_cart = $.parseJSON(localStorage.pos_cart);
        pos_cart[parseInt(localStorage.currentCartId) + 1] = {};
        localStorage.currentCartId = parseInt(localStorage.currentCartId) + 1;
        localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
        var previousCartId = localStorage.selectedCartId;
        localStorage.selectedCartId = viewModel.posCarts.push(new PosCartId(localStorage.currentCartId)) - 1;
        viewModel.currentCartId(localStorage.selectedCartId);
        viewModel.posCarts()[previousCartId].isCartActive("");
        viewModel.posCarts()[localStorage.selectedCartId].isCartActive("active");

        viewModel.productCart.removeAll();
        if (guestAccountEnabled == true) {
            viewModel.selectedCustomerId(idGuest);
            viewModel.selectedCustomerName(guestName);
        } else {
            viewModel.resetCustomerDetails();
            viewModel.selectedCustomerName(customerName);
        }
        if (viewModel.bodyPanel() == 'customers') {
            viewModel.updateCustomer();
        }
    }
}

export function removeSelectedCart(element) {
    applyCustomer = 0;
    var posCart = $.parseJSON(localStorage.pos_cart);
    viewModel.productCart.removeAll();
    var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;

    viewModel.posCarts.remove(viewModel.posCarts()[localStorage.selectedCartId]);
    if (viewModel.posCarts().length == 0) {
        posCart[parseInt(localStorage.currentCartId) + 1] = {};
        localStorage.currentCartId = parseInt(localStorage.currentCartId) + 1;
        var previousCartId = localStorage.selectedCartId;
        localStorage.selectedCartId = viewModel.posCarts.push(new PosCartId(localStorage.currentCartId)) - 1;
        viewModel.currentCartId(localStorage.selectedCartId);
        if (viewModel.posCarts()[previousCartId] !== undefined) {
            viewModel.posCarts()[previousCartId].isCartActive("");
        }
        viewModel.posCarts()[localStorage.selectedCartId].isCartActive("active");
    }

    if (delete posCart[cartIndex]) {
        if (viewModel.posCarts()[localStorage.selectedCartId] !== undefined || localStorage.selectedCartId <= 0) {
        } else {
            localStorage.setItem('selectedCartId', (parseInt(localStorage.selectedCartId) - 1));
            viewModel.currentCartId(localStorage.selectedCartId);
        }
        if (Object.keys(posCart).length !== 0 && posCart.constructor === Object) {
            viewModel.posCarts()[localStorage.selectedCartId].isCartActive("active");
        }
        cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
        if (posCart[cartIndex] != null) {
            var mappedTasks = $.map(posCart[cartIndex], function (item, index) {
                if (index == posCart[cartIndex]['selectedCartItemIndex']) {
                    return new ProductCartDetails(item, index);
                } else if (index != 'selectedCartItemIndex' && index != 'others') {
                    return new ProductCartDetails(item, index);
                }
            });
            if (pos_cart[cartIndex] != undefined && pos_cart[cartIndex]['others'] != undefined
                && pos_cart[cartIndex]['others']['customer'] !== undefined
            ) {
                viewModel.selectedCustomerName(pos_cart[cartIndex]['others']['customer']['customerName']);
                viewModel.selectedCustomerId(pos_cart[cartIndex]['others']['customer']['idCustomer']);
                viewModel.customerEmail(pos_cart[cartIndex]['others']['customer']['customerEmail']);
                viewModel.customerName(pos_cart[cartIndex]['others']['customer']['customerName']);
                viewModel.idCustomer(pos_cart[cartIndex]['others']['customer']['idCustomer']);
                viewModel.selectedIdCountry(pos_cart[cartIndex]['others']['id_country']);
            } else {
                if (guestAccountEnabled == true) {
                    viewModel.selectedCustomerId(idGuest);
                    viewModel.selectedCustomerName(guestName);
                } else {
                    viewModel.selectedCustomerName(customerName);
                    viewModel.selectedCustomerId(0);
                }
            }
            viewModel.productCart(mappedTasks);
        }
    }
    localStorage.setItem('pos_cart', JSON.stringify(posCart));
    if (viewModel.bodyPanel() == 'customers') {
        viewModel.updateCustomer();
    }
}

export function removeProduct(product) {
    var index = viewModel.productCart.indexOf(product);
    var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
    var pos_cart = $.parseJSON(localStorage.pos_cart);

    if (pos_cart[cartIndex] != undefined && delete pos_cart[cartIndex][index]) {
        var i = 0;
        var pos_cart_duplicate = {};
        $.each(pos_cart[cartIndex], function (index, value) {
            if (index == 'selectedCartItemIndex') {
                pos_cart_duplicate['selectedCartItemIndex'] = value;
            } else if (index == 'others') {
                pos_cart_duplicate['others'] = value;
            } else {
                pos_cart_duplicate[i++] = value;
            }
        });
        pos_cart[cartIndex] = pos_cart_duplicate;

        if (Object.keys(pos_cart[cartIndex]).length == 1 || (Object.keys(pos_cart[cartIndex]).length == 2 && pos_cart[cartIndex]['others'] != undefined)) {
            delete pos_cart[cartIndex]['selectedCartItemIndex'];
        }
    }
    if (index == viewModel.productCart().length - 1) {
        index = index - 1;
    }
    viewModel.selectedCartProductIndex(index);
    localStorage.pos_cart = JSON.stringify(pos_cart);
    viewModel.productCart.remove(product);

    var selectedProductDetails = viewModel.productCart()[index];
    if (selectedProductDetails != undefined) {
        viewModel.selectedCartProduct(selectedProductDetails.idProduct() + 'c' + selectedProductDetails.idProductAttribute);
        pos_cart[cartIndex]['selectedCartItemIndex'] = index;
    }

    localStorage.pos_cart = JSON.stringify(pos_cart);
}

export function addProductToCart(data, event) {
    var posProducts = objProduct.getPosProductDetails();
    posProducts.then(
        function (pos_products) {
            if (data.hasCombination) {
                if (pos_products[data.idProduct]['availableForOrder'] == 1) {
                    viewModel.productCombination.removeAll();
                    var productCombinations = new Array();
                    var selectedCombinationId = [];
                    $.each(pos_products[data.idProduct], function (combination, attributeGroupDetails) {
                        if (combination === "combination") {
                            $.each(attributeGroupDetails, function (idAttributeGroup, attributeGroup) {
                                $.each(attributeGroup, function (groupName, attribute) {
                                    viewModel.combinationQuantity(1);
                                    selectedCombinationId = [];
                                    $.each(pos_products[data.idProduct].default_combination, function (index, value) {
                                        selectedCombinationId.push(index);
                                    });
                                    viewModel.productCombination.push(new ProductCombinationDetails(groupName, attribute, data.idProduct, idAttributeGroup, pos_products[data.idProduct].default_combination));
                                });
                            });
                        }
                    });
                    viewModel.eventTarget(event.target);
                    selectedCombinationId = selectedCombinationId.sort(function (a, b) { return a - b }).join('-');
                    var selectedCombinationDetail = pos_products[data.idProduct]['combination_details'][selectedCombinationId];
                    if (selectedCombinationDetail != undefined) {
                        viewModel.combinationQuantity(parseInt(selectedCombinationDetail['minimal_quantity']));
                        var combiTaxRate = 0;
                        if (taxRate != undefined) {
                            combiTaxRate = taxRate[data.idProduct];
                        } else {
                            combiTaxRate = defaultTaxRate[data.idProduct];
                        }
                        var combiPrice = parseFloat(pos_products[data.idProduct]['combination_details'][selectedCombinationId]['taxExcludedPrice']);
                        combiPrice += (combiTaxRate * combiPrice) / 100;
                        combiPrice *= viewModel.combinationQuantity();
                        // formatCurrencyCldr(parseFloat(combiPrice), function(price) {
                        //     viewModel.combinationPrice(price);
                        // });
                        // viewModel.combinationPrice = asyncComputed(function () {
                        //     return wkFormatCurrency(parseFloat(combiPrice), currencyFormat);
                        // }, this);
                        viewModel.combinationUnitPrice(parseFloat(combiPrice), currencyFormat);
                        // customization
                        var idProductAttribute = pos_products[data.idProduct]['combination_details'][selectedCombinationId]['id_product_attribute'];
                        viewModel.updateCombinationImage(data.idProduct, idProductAttribute);
                        // End
                    } else {
                        showErrorMsg(combinationNotExist);
                        // $.growl.error({ title: "", message: combinationNotExist });
                    }
                    $('#wk-pos-product-combination').modal('toggle');
                } else {
                    showErrorMsg(wkProductNotAvailable);
                    // $.growl.error({ title: "", message: wkProductNotAvailable });
                }
            } else {
                var update = 0;
                var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                /* Check the product is allready exist on cart or not .
                If exist then update the cart. */
                for (var i = 0; i < viewModel.productCart().length; i++) {
                    if (viewModel.productCart()[i].idProduct() === data.idProduct) {
                        update = 1;
                        if ((pos_products[data.idProduct]['quantity'] > viewModel.productCart()[i].productQuantity()
                            || checkOutofStockAllow(pos_products[data.idProduct]))
                            && pos_products[data.idProduct]['availableForOrder'] == 1
                        ) {
                            viewModel.productCart()[i].productQuantity(viewModel.productCart()[i].productQuantity() + 1);
                            viewModel.productCart()[i].productPrice(makeTotalProductCaculation(parseFloat(data.price)));
                            var pos_cart = JSON.parse(localStorage.pos_cart);
                            if (pos_cart) {
                                var index = getIndexByIdProduct(pos_cart[cartIndex], data.idProduct);
                                pos_cart[cartIndex][index]['quantity'] += 1;
                            }
                            // pos_cart[cartIndex]['order_disount'] = viewModel.orderDiscount();
                            localStorage.setItem("pos_cart", JSON.stringify(pos_cart));
                            showSuccessMsg(updateQuantityMsg);
                            // $.growl.notice({ title: "", message: updateQuantityMsg });
                            displayImageDrag(pos_products[data.idProduct]['image'], event.target);
                        } else if (pos_products[data.idProduct]['availableForOrder'] == 0) {
                            showErrorMsg(wkProductNotAvailable);
                            // $.growl.error({ title: "", message: wkProductNotAvailable });
                        } else {
                            showErrorMsg(wkQuantityNotifi);
                            // $.growl.error({ title: "", message: wkQuantityNotifi });

                        }
                        return true;
                    }
                }
                /* If not then add product to cart */
                if (!update) {
                    var productQty = parseInt(pos_products[data.idProduct]['quantity']);
                    var productMinimalQty = parseInt(pos_products[data.idProduct]['minimal_quantity']);
                    if ((productQty >= productMinimalQty || checkOutofStockAllow(pos_products[data.idProduct]))
                        && pos_products[data.idProduct]['availableForOrder'] == 1
                    ) {
                        if (localStorage.pos_cart) {
                            pos_cart = JSON.parse(localStorage.pos_cart);
                        }
                        var cartProduct = {};
                        cartProduct["id"] = data.idProduct;
                        cartProduct["name"] = data.name;
                        cartProduct["price"] = data.price;
                        cartProduct["image"] = data.imagePath;
                        cartProduct["displayPrice"] = data.displayPrice;
                        cartProduct["taxExcludedPrice"] = data.taxExcludedPrice;
                        cartProduct["taxIncludedPrice"] = data.taxExcludedPrice;
                        cartProduct["taxRate"] = parseFloat(defaultTaxRate[data.idProduct]);
                        cartProduct["updatePrice"] = 0;

                        var taxExcludePrice = parseFloat(cartProduct["taxExcludedPrice"]);
                        if (defaultTaxRate[data.idProduct] > 0) {
                            taxExcludePrice = ((taxExcludePrice * 100) / (100 + defaultTaxRate[data.idProduct]));
                        }
                        cartProduct["taxExcludedPrice"] = (parseFloat(taxExcludePrice));

                        if (pos_cart) {
                            cartProduct['quantity'] = parseInt(productMinimalQty);
                            if (pos_cart[cartIndex]['selectedCartItemIndex'] == undefined) {
                                pos_cart[cartIndex][0] = cartProduct;
                            } else {
                                var count = 0;
                                $.each(pos_cart[cartIndex], function (index, element) {
                                    if (!isNaN(index)) {
                                        count += 1;
                                    }
                                });
                                pos_cart[cartIndex][count] = cartProduct;
                            }
                        }
                        qty = 0;
                        pos_cart[cartIndex]['selectedCartItemIndex'] = viewModel.productCart.push(
                            new ProductCartDetails(cartProduct, viewModel.productCart().length, pos_products[data.idProduct])
                        ) - 1;
                        var selectedProductDetails = pos_cart[cartIndex][pos_cart[cartIndex]['selectedCartItemIndex']];
                        if (selectedProductDetails != undefined && selectedProductDetails['idProductAttribute'] == undefined) {
                            viewModel.selectedCartProduct(selectedProductDetails['id'] + 'c' + '');
                        } else {
                            viewModel.selectedCartProduct(selectedProductDetails['id'] + 'c' + selectedProductDetails['idProductAttribute']);
                        }
                        viewModel.selectedCartProductIndex(pos_cart[cartIndex]['selectedCartItemIndex']);
                        localStorage.setItem("pos_cart", JSON.stringify(pos_cart));
                        showSuccessMsg(addedToCart);
                        // $.growl.notice({ title: "", message: addedToCart });
                        displayImageDrag(pos_products[data.idProduct]['image'], event.target);
                    } else if (pos_products[data.idProduct]['availableForOrder'] == 0) {
                        showErrorMsg(wkProductNotAvailable);
                        // $.growl.error({ title: "", message: wkProductNotAvailable });
                    } else {
                        showErrorMsg(wkQuantityNotifi);
                        // $.growl.error({ title: "", message: wkQuantityNotifi });
                    }
                }
            }
        },
        function (response) {
        }
    );
}

export function checkOutofStockAllow(product) {
    if ((product['outOfStock'] == '1') || (product['outOfStock'] == '2' && allowOOSConfig == 1)) {
        return true;
    } else {
        return false;
    }
}

export function addCombinationToCart() {
    var idProduct = Array();
    var selectedCombination = Array();
    var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
    var produtAttribute, attributeName;
    /* Generate the selected combination Index */
    for (var i = 0; i < viewModel.productCombination().length; i++) {
        produtAttribute = viewModel.productCombination()[i].productAttribute();
        for (var j = 0; j < produtAttribute.length; j++) {
            if (produtAttribute[j].selected() == "selected") {
                idProduct = produtAttribute[j].idProduct();
                if (attributeName == undefined) {
                    attributeName = produtAttribute[j].attributeName();
                } else {
                    attributeName += ' - ' + produtAttribute[j].attributeName();
                }
                selectedCombination.push(produtAttribute[j].idAttribute());
                break;
            }
        }
    }
    selectedCombination = selectedCombination.sort(function (a, b) { return a - b }).join('-');
    /* Check whether the product is available for order or not */
    // var pos_products = getAllPosProducts();
    var posProductOnLoad = objProduct.getPosProductDetails();
    posProductOnLoad.then(
        function (pos_products) {
            if (pos_products[idProduct]['availableForOrder'] == 1) {
                if (pos_products[idProduct]['combination_details'][selectedCombination] == undefined) {
                    showErrorMsg(combinationNotExist);
                    // $.growl.error({ title: "", message: combinationNotExist });
                } else {
                    var idProductAttribute = pos_products[idProduct]['combination_details'][selectedCombination].id_product_attribute;
                    var combinationPrice = pos_products[idProduct]['combination_details'][selectedCombination].price;
                    var update = 0;
                    /* Check whether the product allready exist in the selected cart or not
                    If Yes then Update the quantity */
                    for (var k = 0; k < viewModel.productCart().length; k++) {
                        if (viewModel.productCart()[k].idProduct() === idProduct
                            && viewModel.productCart()[k].idProductAttribute !== ""
                            && viewModel.productCart()[k].idProductAttribute == idProductAttribute
                        ) {
                            if ((pos_products[idProduct]['combination_details'][selectedCombination]['quantity'] > 0
                                || checkOutofStockAllow(pos_products[idProduct]))
                                && pos_products[idProduct]['availableForOrder'] == 1
                            ) {
                                update = 1;
                                if (!Number.isInteger(parseInt(viewModel.combinationQuantity()))) {
                                    showErrorMsg(wkQuantityNotifi);
                                    // $.growl.error({ title: "", message: wkQuantityNotifi });
                                } else {
                                    if ((parseInt(pos_products[idProduct]['combination_details'][selectedCombination]['quantity']) >= parseInt(viewModel.productCart()[k].productQuantity()) + parseInt(viewModel.combinationQuantity()) || checkOutofStockAllow(pos_products[idProduct]))
                                    ) {
                                        viewModel.productCart()[k].productQuantity(viewModel.productCart()[k].productQuantity() + parseInt(viewModel.combinationQuantity()));
                                        $('#wk-pos-product-combination').modal('hide');
                                        var pos_cart = JSON.parse(localStorage.pos_cart);
                                        if (pos_cart) {
                                            var index = getIndexByIdProductAttribute(pos_cart[cartIndex], idProductAttribute);
                                            pos_cart[cartIndex][index]['quantity'] += parseInt(viewModel.combinationQuantity());
                                        }
                                        localStorage.setItem("pos_cart", JSON.stringify(pos_cart));
                                        showSuccessMsg(updateQuantityMsg);
                                        // $.growl.notice({ title: "", message: updateQuantityMsg });
                                        displayImageDrag(pos_products[idProduct]['image'], viewModel.eventTarget());
                                    } else {
                                        showErrorMsg(wkQuantityNotifi);
                                        // $.growl.error({ title: "", message: wkQuantityNotifi });
                                    }
                                    return;
                                }
                            } else if (pos_products[idProduct]['availableForOrder'] == 0) {
                                showErrorMsg(wkProductNotAvailable);
                                // $.growl.error({ title: "", message: wkProductNotAvailable });
                            }
                        }
                    }
                    /* If No then add the product in the selected cart */
                    if (!update) {
                        if (!Number.isInteger(parseInt(viewModel.combinationQuantity()))) {
                            showErrorMsg(wkQuantityNotifi);
                            // $.growl.error({ title: "", message: wkQuantityNotifi });
                        } else {
                            if (pos_products[idProduct]['combination_details'] !== undefined
                                && (parseInt(pos_products[idProduct]['combination_details'][selectedCombination]['quantity']) >= parseInt(pos_products[idProduct]['combination_details'][selectedCombination]['minimal_quantity']) || checkOutofStockAllow(pos_products[idProduct]))
                                && (parseInt(pos_products[idProduct]['combination_details'][selectedCombination]['quantity']) >= parseInt(viewModel.combinationQuantity()) || checkOutofStockAllow(pos_products[idProduct]))
                                && pos_products[idProduct]['availableForOrder'] == 1
                            ) {
                                if (localStorage.pos_cart) {
                                    var pos_cart = JSON.parse(localStorage.pos_cart);
                                }

                                var cartProduct = {};
                                cartProduct["id"] = idProduct;
                                cartProduct["name"] = pos_products[idProduct].name;
                                cartProduct["price"] = combinationPrice;
                                cartProduct["taxExcludedPrice"] = combinationPrice;
                                cartProduct["taxIncludedPrice"] = combinationPrice;
                                var taxExcludePrice = parseFloat(combinationPrice);
                                if (defaultTaxRate[idProduct] > 0) {
                                    taxExcludePrice = ((taxExcludePrice * 100) / (100 + defaultTaxRate[idProduct]));
                                }

                                cartProduct["taxExcludedPrice"] = (parseFloat(taxExcludePrice));
                                // if (pos_products[idProduct].taxRate != undefined
                                //     && pos_products[idProduct].taxRate[viewModel.selectedIdCountry()] != undefined
                                // ) {
                                //     cartProduct["taxRate"] = pos_products[idProduct].taxRate[viewModel.selectedIdCountry()];
                                // } else {
                                //     cartProduct["taxRate"] = 0;
                                // }

                                if (typeof taxRate != 'undefined') {
                                    cartProduct["taxRate"] = taxRate[idProduct];
                                } else {
                                    cartProduct["taxRate"] = defaultTaxRate[idProduct];
                                }

                                cartProduct["displayPrice"] = pos_products[idProduct].displayPrice;
                                if (typeof pos_products[idProduct]['combination_images'] != 'undefined'
                                    && typeof pos_products[idProduct]['combination_images'][idProductAttribute] != 'undefined'
                                    && typeof pos_products[idProduct]['combination_images'][idProductAttribute][0] != 'undefined'
                                ) {
                                    cartProduct["image"] = pos_products[idProduct]['combination_images'][idProductAttribute][0];
                                } else {
                                    cartProduct["image"] = pos_products[idProduct].image;
                                }
                                cartProduct["idProductAttribute"] = idProductAttribute;
                                cartProduct["attributeName"] = attributeName;
                                cartProduct["combinationIndex"] = selectedCombination;
                                cartProduct["updatePrice"] = 0;
                                if (pos_cart) {
                                    cartProduct['quantity'] = parseInt(viewModel.combinationQuantity());
                                    if (pos_cart[cartIndex]['selectedCartItemIndex'] == undefined) {
                                        pos_cart[cartIndex][0] = cartProduct;
                                    } else {
                                        var count = 0;
                                        $.each(pos_cart[cartIndex], function (index, element) {
                                            if (!isNaN(index)) {
                                                count += 1;
                                            }
                                        });
                                        pos_cart[cartIndex][count] = cartProduct;
                                    }
                                }
                                qty = 0;
                                pos_cart[cartIndex]['selectedCartItemIndex'] = viewModel.productCart.push(
                                    new ProductCartDetails(cartProduct, viewModel.productCart().length, pos_products[idProduct])
                                ) - 1;
                                var selectedProductDetails = pos_cart[cartIndex][pos_cart[cartIndex]['selectedCartItemIndex']];
                                if (typeof selectedProductDetails != 'undefined'
                                    && selectedProductDetails['idProductAttribute'] == undefined
                                ) {
                                    viewModel.selectedCartProduct(selectedProductDetails['id'] + 'c' + '');
                                } else {
                                    viewModel.selectedCartProduct(selectedProductDetails['id'] + 'c' + selectedProductDetails['idProductAttribute']);
                                }
                                viewModel.selectedCartProductIndex(pos_cart[cartIndex]['selectedCartItemIndex']);

                                viewModel.productCombination.removeAll();
                                $('#wk-pos-product-combination').modal('hide');
                                // pos_cart[cartIndex]['order_disount'] = viewModel.orderDiscount();

                                localStorage.setItem("pos_cart", JSON.stringify(pos_cart));
                                displayImageDrag(pos_products[idProduct]['image'], viewModel.eventTarget());
                                showSuccessMsg(addedToCart);
                                // $.growl.notice({ title: "", message: addedToCart });
                            } else if (pos_products[idProduct]['availableForOrder'] == 0) {
                                showErrorMsg(wkProductNotAvailable);
                                // $.growl.error({ title: "", message: wkProductNotAvailable });
                            } else {
                                showErrorMsg(wkQuantityNotifi);
                                // $.growl.error({ title: "", message: wkQuantityNotifi });
                            }
                        }
                    }
                }
            } else {
                showErrorMsg(wkProductNotAvailable);
                // $.growl.error({ title: "", message: wkProductNotAvailable });
            }
        },
        function (response) {
        }
    );
    viewModel.resetCartCalculator();
}

export function switchCart(data) {
    var cartIndex = viewModel.posCarts.indexOf(data);
    if (cartIndex !== localStorage.selectedCartId) {
        viewModel.orderDiscount(0);
        viewModel.productCart.removeAll();
        var pos_cart = $.parseJSON(localStorage.pos_cart);
        var cartProductIndex = viewModel.posCarts()[cartIndex].posCartId() - 1;
        if (pos_cart[cartProductIndex] != null) {
            pos_cart = pushCartProducts(pos_cart, cartProductIndex);
        }
        if (pos_cart[cartProductIndex]['selectedCartItemIndex'] !== undefined
            || pos_cart[cartProductIndex]['selectedCartItemIndex'] >= 0
        ) {
            var selectedProductDetails = pos_cart[cartProductIndex][pos_cart[cartProductIndex]['selectedCartItemIndex']];
            if (selectedProductDetails['idProductAttribute'] == undefined) {
                viewModel.selectedCartProduct(selectedProductDetails['id'] + 'c' + '');
            } else {
                viewModel.selectedCartProduct(selectedProductDetails['id'] + 'c' + selectedProductDetails['idProductAttribute']);
            }
            viewModel.selectedCartProductIndex(pos_cart[cartProductIndex]['selectedCartItemIndex']);
        }
        if (pos_cart[cartProductIndex]['others'] != undefined
            && pos_cart[cartProductIndex]['others']['customer'] !== undefined
        ) {
            viewModel.selectedCustomerName(pos_cart[cartProductIndex]['others']['customer']['customerName']);
            viewModel.selectedCustomerId(pos_cart[cartProductIndex]['others']['customer']['idCustomer']);
            viewModel.customerEmail(pos_cart[cartProductIndex]['others']['customer']['customerEmail']);
            viewModel.customerName(pos_cart[cartProductIndex]['others']['customer']['customerName']);
            viewModel.idCustomer(pos_cart[cartProductIndex]['others']['customer']['idCustomer']);
            viewModel.selectedIdCountry(pos_cart[cartProductIndex]['others']['id_country']);
        } else {
            if (guestAccountEnabled == true) {
                viewModel.selectedCustomerId(idGuest);
                viewModel.selectedCustomerName(guestName);
            } else {
                viewModel.selectedCustomerName(customerName);
                viewModel.resetCustomerDetails();
            }
        }

        // /* Voucher Start */
        // if (typeof pos_cart[cartProductIndex]['others'] !== 'undefined'
        //     && typeof pos_cart[cartProductIndex]['others']['reward_coupon'] !== 'undefined'
        // ) {
        //     // viewModel.rewardAmount(getRewardTotalAmount(pos_cart[cartProductIndex], viewModel.total()));
        //     updateVouchers(pos_cart[cartProductIndex]);
        //     appliedVouchers(pos_cart[cartProductIndex]);
        // } else {
        //     // viewModel.rewardAmount(0);
        //     updateVouchers(pos_cart[cartProductIndex]);
        //     appliedVouchers(pos_cart[cartProductIndex]);
        // }

        /* Voucher End */

        localStorage.selectedCartId = cartIndex;
        viewModel.currentCartId(localStorage.selectedCartId);
        if (viewModel.bodyPanel() == 'customers') {
            viewModel.updateCustomer();
        }
    }
}

export function pushCartProducts(allData, cartIndex) {
    var loadViewModel = viewModel;
    if (typeof viewModel == 'undefined') {
        loadViewModel = objPosProductsViewModel;
    }
    if (typeof loadViewModel != 'undefined') {
        var count = -1;
        var i = 0;
        var notFound = 0;
        var posProductOnLoad = objProduct.getPosProductDetails();
        posProductOnLoad.then(
            function (pos_products) {
                var mappedTasks = $.map(allData[cartIndex], function (item, index) {
                    if (Number.isInteger(parseInt(index))) {
                        if (typeof removePosProduct != 'undefined' && removePosProduct != 0) {
                            if (typeof pos_products != 'undefined'
                                && typeof pos_products[item.id] != 'undefined'
                            ) {
                                i = 0;
                                count++;
                                if (count != index) {
                                    allData[cartIndex][count] = item;
                                    delete allData[cartIndex][index];
                                    if (Object.keys(allData[cartIndex]).length == 1 || (Object.keys(allData[cartIndex]).length == 2 && typeof allData[cartIndex]['others'] != 'undefined')) {
                                        delete allData[cartIndex]['selectedCartItemIndex'];
                                    }
                                }
                                return new ProductCartDetails(item, index, pos_products[item.id]);
                            } else {
                                showErrorMsg(eitherMsg + ' ' + item.name + ' ' + productNotFoundAlert);
                                // $.growl.error({ title: "", message: eitherMsg + ' '+ item.name+ ' ' +productNotFoundAlert });
                                if (typeof allData[cartIndex] != 'undefined' && delete allData[cartIndex][index]) {
                                    i++;
                                    if (count > -1 || typeof allData[cartIndex][count + i + 1] != 'undefined') {
                                        if (count > -1) {
                                            allData[cartIndex]['selectedCartItemIndex'] = count;
                                        } else {
                                            allData[cartIndex]['selectedCartItemIndex'] = count + i + 1;
                                        }
                                    }
                                    if (Object.keys(allData[cartIndex]).length == 1 || (Object.keys(allData[cartIndex]).length == 2 && typeof allData[cartIndex]['others'] != 'undefined')) {
                                        delete allData[cartIndex]['selectedCartItemIndex'];
                                    }
                                    showSuccessMsg(productSuccessRemovedAlert);
                                    // $.growl.notice({ title: "", message: productSuccessRemovedAlert });
                                }
                            }
                        } else {
                            if (typeof pos_products == 'undefined'
                                || typeof pos_products[item.id] == 'undefined'
                            ) {
                                showErrorMsg(eitherMsg + ' ' + item.name + ' ' + productNotFoundAlert);
                                // $.growl.error({ title: "", message: eitherMsg + ' '+ item.name+ ' ' +productNotFoundAlert });
                                notFound = 1;
                            }
                            return new ProductCartDetails(item, index, pos_products[item.id]);
                        }
                    }
                });
                if (notFound) {
                    showErrorMsg(removeProductAlert);
                    // $.growl.error({ title: "", message: removeProductAlert });
                }
                if (count == -1) {
                    // delete allData[cartIndex]['selectedCartItemIndex'];
                }
                loadViewModel.productCart(mappedTasks);
                localStorage.pos_cart = JSON.stringify(allData);
            },
            function (response) {
            }
        );
        return allData;
    }
}

/* For getting the index id product */
function getIndexByIdProduct(posCart, idProduct) {
    return Object.keys(posCart).map(function (index) {
        return posCart[index].id;
    }).indexOf(idProduct);
}

/* For getting the index ny product attribute id*/
function getIndexByIdProductAttribute(posCart, idProductAttribute) {
    return Object.keys(posCart).map(function (index) {
        return posCart[index].idProductAttribute;
    }).indexOf(idProductAttribute);
}

/* Get the product deatils of the pos cart product */
export async function getProductDetails(posCartProduct) {
    try {
        var posProductOnLoad = await objProduct.getPosProductDetails();
        var products = {};
        var errors = [], i = 0, productDetails = [];
        $.each(posCartProduct, function (index, product) {
            if (Number.isInteger(parseInt(index))) {
                productDetails = posProductOnLoad[product['id']];
                i = 0;
                if (productDetails['availableForOrder'] == 0) {
                    errors[i++] = wkProductNotAvailable;
                }
                if (productDetails['has_combination']
                    && (productDetails['combination_details'][product['combinationIndex']]['quantity'] < product['quantity'] && checkOutofStockAllow(productDetails) == false)
                ) {
                    errors[i++] = wkQuantityNotifi;
                } else if (productDetails['has_combination'] == false
                    && (productDetails['quantity'] < product['quantity'] && checkOutofStockAllow(productDetails) == false)
                ) {
                    errors[i++] = wkQuantityNotifi;
                }
                if (product['taxExcludedPrice'] < 0) {
                    errors[i++] = negativePriceError;
                }
                if (!String.prototype.hasOwnProperty('addSlashes')) {
                    String.prototype.addSlashes = function () {
                        return this.replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
                            .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
                            .replace(/"/g, '&quot;')
                            .replace(/\\/g, '\\\\')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;').replace(/\u0000/g, '\\0');
                    }
                }
                if (errors.length == 0) {
                    products[index] = {};
                    products[index]['product_id'] = product['id'];
                    products[index]['product_attribute_id'] = product['idProductAttribute'];
                    products[index]['product_quantity'] = product['quantity'];
                    products[index]['product_price'] = product['taxExcludedPrice'];
                    products[index]['product_name'] = (product['name'] + '').addSlashes();
                    if (product['attributeName'] !== undefined) {
                        products[index]['product_name'] += " - " + product['attributeName'].replace(" - ", " ")
                    }
                    products[index]['unit_price_tax_excl'] = product['taxExcludedPrice'];
                    var totalTax = (parseFloat(product['taxExcludedPrice']) * parseFloat(product['taxRate'])) / 100;
                    var taxIncludedPrice = parseFloat(product['taxExcludedPrice']) + totalTax;
                    products[index]['unit_price_tax_incl'] = taxIncludedPrice;
                    products[index]['total_price_tax_incl'] = products[index]['unit_price_tax_incl'] * product['quantity'];
                    products[index]['total_price_tax_excl'] = product['taxExcludedPrice'] * product['quantity'];
                    if (product['productDiscount'] !== undefined) {
                        products[index]['reduction_percent'] = product['productDiscount'];
                    } else {
                        products[index]['reduction_percent'] = 0;
                    }
                }
            }
        });
        if (errors.length > 0) {
            $.each(errors, function (index, error) {
                showErrorMsg(error);
                // $.growl.error({ title: "", message: error });
            });
            return null;
        } else {
            return products;
        }
    } catch (e) {
        return null;
    }
    // posProductOnLoad.then(
    //     function(posProductOnLoad) {
    //     },
    //     function(response) {
    //     }
    // );
}

export function updateCartTotalAmount(cartAmount) {
    var amount = makeTotalProductCaculation(cartAmount);
    // var amount = makeTotalProductCaculation((cartAmount - viewModel.orderDiscount()));
    viewModel.totalOrderAmount(amount);
}

/* Update the selected product details in cart */
export async function updateProduct(self, reset = false) {
    if (reset) {
        viewModel.reset(true);
        viewModel.updateAction(self.buttonValue().toLowerCase());
    }
    var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
    if (localStorage.pos_cart) {
        pos_cart = JSON.parse(localStorage.pos_cart);
    }
    var selectedItem = pos_cart[cartIndex]['selectedCartItemIndex'];
    if (viewModel.productCart()[selectedItem]) {
        var idProduct = viewModel.productCart()[selectedItem].idProduct();
        var combinationIndex = viewModel.productCart()[selectedItem].combinationIndex;
        if (self.buttonValue().toLowerCase() == "price"
            || self.buttonValue().toLowerCase() == "qty"
            || self.buttonValue().toLowerCase() == "off"
        ) {
            viewModel.reset(true);
            viewModel.updateAction(self.buttonValue().toLowerCase());
            qty = 0;
        } else {
            if (Number.isInteger(parseInt(self.buttonText()))
                || (self.buttonValue().toLowerCase() == "." && (viewModel.updateAction() == "price" || viewModel.updateAction() == "off"))
            ) {
                if (viewModel.reset()) {
                    qty = '';
                    viewModel.reset(false);
                }
                if (qty) {
                    if (self.buttonValue().toLowerCase() == '.'
                        && (viewModel.updateAction() == 'price' || viewModel.updateAction() == "off")
                    ) {
                        if ((qty.split('.'))[1] == undefined) {
                            qty += "" + self.buttonText();
                        }
                    } else {
                        qty += "" + self.buttonText();
                    }
                } else {
                    if (self.buttonValue().toLowerCase() == '.'
                        && (viewModel.updateAction() == 'price' || viewModel.updateAction() == "off")
                    ) {
                        qty = 0 + self.buttonText();
                    } else {
                        qty = self.buttonText();
                    }
                }


                if (viewModel.updateAction() == "price") {
                    if (changePriceType == 1) {
                        viewModel.productCart()[selectedItem].taxExcludedPrice(qty);
                        var taxPrice = 0;
                        if (viewModel.productCart()[selectedItem].taxRate() != null) {
                            taxPrice = (parseFloat(viewModel.productCart()[selectedItem].taxRate()) * parseFloat(qty)) / 100;
                        }
                        viewModel.productCart()[selectedItem].productPrice(parseFloat(qty) + taxPrice);
                        viewModel.productCart()[selectedItem].updatePrice(1);
                        pos_cart[cartIndex][selectedItem]['taxExcludedPrice'] = qty;
                        pos_cart[cartIndex][selectedItem]['price'] = parseFloat(qty) + taxPrice;
                        pos_cart[cartIndex][selectedItem]['updatePrice'] = 1;
                    } else {
                        var taxPrice = 0;
                        var taxExclPrice = qty;
                        if (viewModel.productCart()[selectedItem].taxRate() != null) {
                            var taxRate = (parseFloat(viewModel.productCart()[selectedItem].taxRate()));
                            taxExclPrice = (parseFloat(qty) * 100) / (100 + taxRate);
                        }
                        viewModel.productCart()[selectedItem].taxExcludedPrice(taxExclPrice);
                        viewModel.productCart()[selectedItem].productPrice(parseFloat(qty));
                        viewModel.productCart()[selectedItem].updatePrice(1);
                        pos_cart[cartIndex][selectedItem]['taxExcludedPrice'] = taxExclPrice;
                        pos_cart[cartIndex][selectedItem]['price'] = parseFloat(qty);
                        pos_cart[cartIndex][selectedItem]['updatePrice'] = 1;
                    }
                } else if (viewModel.updateAction() == "qty") {
                    var pos_products = await objProduct.getPosProductDetails();
                    if ((pos_products[idProduct]['combination_details'] == undefined)
                        && (parseInt(pos_products[idProduct]['quantity']) >= parseInt(qty))
                    ) {
                        viewModel.productCart()[selectedItem].productQuantity(qty);
                        pos_cart[cartIndex][selectedItem]['quantity'] = parseInt(qty);
                    } else if ((pos_products[idProduct]['combination_details'] !== undefined
                        && (parseInt(pos_products[idProduct]['combination_details'][combinationIndex]['quantity']) >= parseInt(qty) || checkOutofStockAllow(pos_products[idProduct])))
                    ) {
                        viewModel.productCart()[selectedItem].productQuantity(qty);
                        pos_cart[cartIndex][selectedItem]['quantity'] = parseInt(qty);
                    } else {
                        showErrorMsg(wkQuantityNotifi);
                        // $.growl.error({ title: "", message: wkQuantityNotifi });
                    }
                } else if (viewModel.updateAction() == "off") {
                    if (qty > 100) {
                        viewModel.productCart()[selectedItem].productDiscount("100");
                        pos_cart[cartIndex][selectedItem]['productDiscount'] = "100";
                    } else if (qty < 0) {
                        viewModel.productCart()[selectedItem].productDiscount("0");
                        pos_cart[cartIndex][selectedItem]['productDiscount'] = "0";
                    } else {
                        viewModel.productCart()[selectedItem].productDiscount(qty);
                        pos_cart[cartIndex][selectedItem]['productDiscount'] = qty;
                    }
                }
            } else if (self.buttonValue().toLowerCase() == "del") {
                if (viewModel.updateAction() == "price") {
                    /* Tax Exluded price change */
                    if (changePriceType == 1) {
                        qty = pos_cart[cartIndex][selectedItem]['taxExcludedPrice'] + "";
                        qty = qty.substring(0, qty.length - 1);
                        if (qty == "") {
                            qty = 0;
                        }
                        if (viewModel.reset()) {
                            qty = 0;
                            viewModel.reset(false);
                        }
                        viewModel.productCart()[selectedItem].taxExcludedPrice(qty);
                        taxPrice = 0;
                        if (viewModel.productCart()[selectedItem].taxRate() != null) {
                            taxPrice = (parseFloat(viewModel.productCart()[selectedItem].taxRate()) * parseFloat(qty)) / 100;
                        }
                        viewModel.productCart()[selectedItem].productPrice(parseFloat(qty) + taxPrice);
                        pos_cart[cartIndex][selectedItem]['taxExcludedPrice'] = qty;
                        pos_cart[cartIndex][selectedItem]['price'] = parseFloat(qty) + taxPrice;
                    } else {
                        /* Tax included Price Change */
                        qty = pos_cart[cartIndex][selectedItem]['price'] + "";
                        qty = qty.substring(0, qty.length - 1);
                        if (qty == "") {
                            qty = 0;
                        }
                        if (viewModel.reset()) {
                            qty = 0;
                            viewModel.reset(false);
                        }
                        var taxExclPrice = qty;
                        if (viewModel.productCart()[selectedItem].taxRate() != null) {
                            var taxRate = (parseFloat(viewModel.productCart()[selectedItem].taxRate()));
                            taxExclPrice = (parseFloat(qty) * 100) / (100 + taxRate);
                        }
                        viewModel.productCart()[selectedItem].taxExcludedPrice(taxExclPrice);
                        viewModel.productCart()[selectedItem].productPrice(parseFloat(qty));
                        pos_cart[cartIndex][selectedItem]['taxExcludedPrice'] = taxExclPrice;
                        pos_cart[cartIndex][selectedItem]['price'] = parseFloat(qty);
                    }
                } else if (viewModel.updateAction() == "qty") {
                    qty = parseInt(pos_cart[cartIndex][selectedItem]['quantity']);
                    if (viewModel.reset()) {
                        qty = 1;
                        viewModel.reset(false);
                    }
                    if (qty > 0) {
                        qty = parseInt(qty / 10);
                        viewModel.productCart()[selectedItem].productQuantity(qty);
                        pos_cart[cartIndex][selectedItem]['quantity'] = qty;
                    } else {
                        var check = confirm(deleteProductMessage);
                        if (check == true) {
                            //To Do : Update the selected cart item index
                            if (delete pos_cart[cartIndex][selectedItem]) {
                                viewModel.resetCartCalculator();
                                var i = 0;
                                var pos_cart_duplicate = {};
                                localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
                                $.each(pos_cart[cartIndex], function (index, value) {
                                    if (index == 'selectedCartItemIndex') {
                                        pos_cart_duplicate['selectedCartItemIndex'] = value;
                                    } else if (index == 'others') {
                                        pos_cart_duplicate['others'] = value;
                                    } else {
                                        pos_cart_duplicate[i++] = value;
                                    }
                                });
                                pos_cart[cartIndex] = pos_cart_duplicate;
                                var selectedCartItemIndex = viewModel.productCart()[selectedItem];

                                viewModel.productCart.remove(selectedCartItemIndex);

                                var index = pos_cart[cartIndex]['selectedCartItemIndex'];
                                if (viewModel.selectedCartProductIndex() == viewModel.productCart().length) {
                                    index = index - 1;
                                }
                                viewModel.selectedCartProductIndex(index);

                                var selectedProductDetails = viewModel.productCart()[index];
                                if (selectedProductDetails != undefined) {
                                    viewModel.selectedCartProduct(selectedProductDetails.idProduct() + 'c' + selectedProductDetails.idProductAttribute);
                                    pos_cart[cartIndex]['selectedCartItemIndex'] = index;
                                }

                                if (Object.keys(pos_cart[cartIndex]).length == 1 || (Object.keys(pos_cart[cartIndex]).length == 2 && pos_cart[cartIndex]['others'] != undefined)) {
                                    delete pos_cart[cartIndex]['selectedCartItemIndex'];
                                }
                            }
                        }
                    }
                } else if (viewModel.updateAction() == "off") {
                    qty = pos_cart[cartIndex][selectedItem]['productDiscount'];
                    if (typeof qty != 'undefined' && qty) {
                        if (viewModel.reset()) {
                            qty = '';
                            viewModel.reset(false);
                        }
                        qty = qty.substring(0, qty.length - 1);
                        if (qty == "" || qty == "0.") {
                            qty = 0;
                        }
                        viewModel.productCart()[selectedItem].productDiscount(qty);
                        pos_cart[cartIndex][selectedItem]['productDiscount'] = qty;
                    }
                }
            } else if (self.buttonValue().toLowerCase() == "toggle") {
                if (viewModel.updateAction() == "price") {
                    // qty = parseFloat(viewModel.productCart()[selectedItem].taxExcludedPrice()) * -1;
                    // viewModel.productCart()[selectedItem].taxExcludedPrice(qty);
                    // pos_cart[cartIndex][selectedItem]['taxExcludedPrice'] = qty;
                    // localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
                } else if (viewModel.updateAction() == "qty") {
                    // qty = parseInt(pos_cart[cartIndex][selectedItem]['quantity']);
                    // pos_cart[cartIndex][selectedItem]['quantity'] = qty * -1;
                    // viewModel.productCart()[selectedItem].productQuantity(qty * -1);
                }
            } else if (self.buttonValue().toLowerCase() == ".") {
                if (viewModel.updateAction() == "price") {
                    qty = pos_cart[cartIndex][selectedItem]['price'];
                    qty = parseFloat(qty + '.');
                    pos_cart[cartIndex][selectedItem]['price'] = qty;
                    viewModel.productCart()[selectedItem].productPrice(qty);
                }
            }
            viewModel.reset(false);
            localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
        }
    }
}


export function deleteCartCustomer() {
    // var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
    var posCarts = $.parseJSON(localStorage.pos_cart);
    var updated = false;
    $.each(posCarts, function (index, cart) {
        if (typeof cart != 'undefined'
            && typeof cart['others'] != 'undefined'
            && typeof cart['others']['customer'] != 'undefined'
            && typeof cart['others']['customer']['idCustomer'] != 'undefined'
        ) {
            var idCustomer = parseInt(cart['others']['customer']['idCustomer']);
            if (typeof customers[idCustomer] == 'undefined') {
                delete cart["others"]["customer"];
                updated = true;
            }
        }
    });
    if (updated) {
        localStorage.pos_cart = JSON.stringify(posCarts);
    }
}
