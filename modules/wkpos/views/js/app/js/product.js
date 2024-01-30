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

import { wkFormatCurrency, asyncComputed } from './wkformatcurrency.js';
import { showErrorMsg } from './wkgrowlmsg.js';
import { loadOrderPanel } from './order.js';
import { loadCustomersPanel } from './customer.js';

export function Products(data, selectedCountry = false, customerGroup = false) {
    var self = this;
    //ToDo:: Display Product Details according to the POS Customer Group
    // this.showPrice = 1;
    // if (customerGroup) {
    //     var found = 0;
    //     var selectedGroup = null;
    //     $.each(groups, function(index, group) {
    //         if (group.id_group == customerGroup) {
    //             found = 1;
    //             selectedGroup = group;
    //             return;
    //         }
    //     });

    //     if (found && selectedGroup && !selectedGroup.show_prices) {
    //         this.showPrice = 0;
    //     }
    // }
    this.price = data.price;
    this.name = data.name;
    this.displayName = data.display_name;
    this.taxExcludedPrice = data.taxExcludedPrice;
    var taxExcludePrice = parseFloat(data.taxExcludedPrice);
    if (defaultTaxRate[data.id] > 0) {
        taxExcludePrice = (taxExcludePrice * 100 / (100 + defaultTaxRate[data.id]));
    }
    if (taxRate != undefined) {
        this.taxRate = ko.observable(taxRate[data.id]);
    } else {
        this.taxRate = ko.observable(defaultTaxRate[data.id]);
    }
    this.displayPrice = parseFloat(taxExcludePrice) + (this.taxRate() * taxExcludePrice / 100);
    this.displayPrice = asyncComputed(function () {
        return wkFormatCurrency(this.displayPrice, currencyFormat);
    }, this);
    this.hasCombination = data.has_combination;
    this.idProduct = data.id;
    this.quantity = ko.observable(parseInt(data.quantity));
    this.imagePath = data.image;
}

/* Mapping of product combination */
export function ProductCombinationDetails(groupName, attribute, idProduct, idAttributeGroup, defaultCombination) {
    var self = this;
    self.groupName = ko.observable(groupName);
    self.productAttribute = ko.observableArray();
    $.each(attribute, function (idAttribute, attributeName) {
        var defaultAttributeId = 0;
        if (defaultCombination[idAttribute] !== undefined) {
            defaultAttributeId = 1;
        }
        self.productAttribute.push(new ProductAttributeDetails(idAttribute, attributeName, idProduct, idAttributeGroup, defaultAttributeId));
    });
}

/* Mapping of product attribute in a combination */
function ProductAttributeDetails(idAttribute, attributeName, idProduct, idAttributeGroup, defaultCombination) {
    this.attributeName = ko.observable(attributeName);
    this.idAttribute = ko.observable(idAttribute);
    this.idProduct = ko.observable(idProduct);
    this.idAttributeGroup = ko.observable(idAttributeGroup);
    if (defaultCombination) {
        this.selected = ko.observable("selected");
    } else {
        this.selected = ko.observable("");
    }
}

export async function searchProduct(event, code) {
    viewModel.resetShipping();
    viewModel.displayCart(1);
    viewModel.bodyPanel("products");
    listenForScrollEvent();
    var isAllreadyPushed, i = 0, productSearch = [];
    var pos_products = await getAllPosProducts();
    var productSearch = [];
    if (viewModel.productSearchKey() == "") {
        $.each(pos_products, function (idProduct, product) {
            productSearch[i++] = (new Products(product, viewModel.selectedIdCountry()));
        });
        // viewModel.products(productSearch);
        loadProductPanel(productSearch);
    } else {
        isAllreadyPushed = 0;
        $.each(pos_products, function (idProduct, product) {
            var searchProduct = viewModel.productSearchKey();
            if (searchProduct != ''
                && ((product["name"] != null &&
                    product["name"].toLowerCase().search((searchProduct.replace(/\\/g, "\\\\")).toLowerCase()) != '-1'
                    && productSearchMethods.search("2") != -1)
                    || (searchProduct == idProduct && productSearchMethods.search("1") != -1)
                    || (product["upc"] != undefined
                        && product["upc"] == searchProduct
                        && (productSearchMethods.search("5") != -1 || barcodeType == 5))
                    || (product["ref"] != undefined
                        && product["ref"] == searchProduct
                        && productSearchMethods.search("6") != -1)
                    || (product["ean13"] != undefined
                        && product["ean13"] == searchProduct
                        && (productSearchMethods.search("4") != -1 || barcodeType == 4)))
            ) {
                productSearch[i++] = (new Products(product, viewModel.selectedIdCountry()));
                isAllreadyPushed = 1;
                if (code == 13) {
                    if (!product['has_combination']) {
                        var cartProduct = {};
                        cartProduct["idProduct"] = product.id;
                        cartProduct["hasCombination"] = product.has_combination;
                        cartProduct["name"] = product.name;
                        cartProduct["price"] = parseFloat(product.price);
                        cartProduct["imagePath"] = product.image;
                        cartProduct["displayPrice"] = product.displayPrice;
                        cartProduct["taxExcludedPrice"] = parseFloat(product.taxExcludedPrice);
                        cartProduct["taxRate"] = parseFloat(product.taxRate[viewModel.selectedIdCountry()]);
                        viewModel.addProductToCart(cartProduct, event);
                        viewModel.productSearchKey("");
                        return;
                    }
                }
            }
            if (!isAllreadyPushed && product["has_combination"] == true) {
                $.each(product["combination_details"], function (idProductCombination, combination) {
                    if ((combination["upc"] != undefined
                        && combination["upc"] == searchProduct
                        && (productSearchMethods.search("5") != -1 || barcodeType == 5))
                        || (combination["reference"] != undefined
                            && combination["reference"] == searchProduct
                            && productSearchMethods.search("6") != -1)
                        || (combination["ean13"] != undefined
                            && combination["ean13"] == searchProduct
                            && (productSearchMethods.search("4") != -1 || barcodeType == 4))
                    ) {
                        isAllreadyPushed = 1;
                        productSearch[i++] = (new Products(product, viewModel.selectedIdCountry()));
                        if (code == 13) {
                            var selectedAttribute = "";
                            $.each(product['combination_details'], function (combinations, attributeGroupDetails) {
                                if (attributeGroupDetails.id_product_attribute == combination.id_product_attribute) {
                                    selectedAttribute = combinations;
                                }
                            });
                            selectCombination = {};
                            $.each(product['combination'], function (idGroup, attributeGroupDetails) {
                                $.each(attributeGroupDetails, function (groupName, groupDetails) {
                                    $.each(groupDetails, function (idAttribute, attributeName) {
                                        if (selectedAttribute.search(idAttribute) != -1) {
                                            selectCombination[idAttribute] = attributeName;
                                        }
                                    });
                                });
                            });
                            isAllreadyPushed = 1;
                            $.each(product, function (combination, attributeGroupDetails) {
                                if (combination === "combination") {
                                    $.each(attributeGroupDetails, function (idAttributeGroup, attributeGroup) {
                                        $.each(attributeGroup, function (groupName, attribute) {
                                            viewModel.productCombination.push(new ProductCombinationDetails(groupName, attribute, product.id, idAttributeGroup, selectCombination));
                                        });
                                    });
                                }
                            });
                            viewModel.combinationQuantity(1);
                            viewModel.addCombinationToCart();
                            viewModel.productCombination.removeAll();
                            viewModel.productSearchKey("");
                            return;
                        }
                    }
                });
            }
            if (!isAllreadyPushed
                && productSearchMethods.search("3") != -1
                && typeof product["tags"] != 'undefined' && product["tags"] != ""
            ) {
                var tags = product["tags"].split(', ');
                $.each(tags, function (index, tag) {
                    if (tag.toLowerCase().search((searchProduct.replace(/\\/g, "\\\\")).toLowerCase()) != '-1') {
                        productSearch[i++] = (new Products(product, viewModel.selectedIdCountry()));
                        return;
                    }
                });
            }
        });
        // viewModel.products(productSearch);
        loadProductPanel(productSearch);
    }
    viewModel.callPosResize();
    if (viewModel.productSearchKey() == "") {
        var j = 0;
        $.each(pos_products, function (idProduct, product) {
            productSearch[j++] = (new Products(product, viewModel.selectedIdCountry()));
        });
        // viewModel.products(productSearch);
        loadProductPanel(productSearch);
    }
}

export function listenForScrollEvent() {
    $(document).find("#wk-product-panel").on('scroll', function () {
        if ($(this).scrollTop() + $(this).height() > $('#wk-product-panel .wk-products').height() - 100 && (objPosProductsViewModel.loadedProducts()).length > 0) {
            loadProductPanel(objPosProductsViewModel.loadedProducts(), true);
        }
    });
    $(document).find('#wk-customer-panel').on('scroll', function () {
        if ($(this).scrollTop() + $(this).height() > $('#wk-customer-panel .wk-customers-detail').height() - 100 && (objPosProductsViewModel.loadedCustomers()).length > 0) {
            loadCustomersPanel(objPosProductsViewModel.loadedCustomers(), true);
        }
    });
    $(document).find('#wk-order-panel').on('scroll', function () {
        if ($(this).scrollTop() + $(this).height() > $('#wk-order-panel .wk-order-detail').height() - 100 && (objPosProductsViewModel.loadedOrders()).length > 0) {
            loadOrderPanel(objPosProductsViewModel.loadedOrders(), true);
        }
    });
}


var remainingProducts = [];
export function loadProductPanel(products, onScroll = false) {
    var loadViewModel = viewModel;
    if (typeof viewModel == 'undefined') {
        loadViewModel = objPosProductsViewModel;
    }
    if (typeof loadViewModel != 'undefined') {
        var pagination = 100;
        remainingProducts = products.slice(pagination, products.length + 1);
        loadViewModel.loadedProducts(remainingProducts);
        if (onScroll) {
            var remaininglength = products.length;
            if (products.length > pagination) {
                remaininglength = pagination;
            }
            var i = 0;
            for (i = 0; i < remaininglength; i++) {
                loadViewModel.products.push(products[i]);
            }
        } else {
            loadViewModel.products(products.slice(0, pagination));
        }
    }
}

var getPosProductDetails = async () => {
    return new Promise(function (resolve, reject) {
        dbRequest = window.indexedDB.open(dbName, dbVersion);
        dbRequest.onsuccess = function (event) {
            var db = event.target.result;
            var trans = db.transaction('pos_products', 'readwrite');
            var productStore = trans.objectStore('pos_products');
            var request = productStore.getAll();
            request.onsuccess = function (event) {
                var products = {};
                $.each(event.target.result, function (index, product) {
                    products[product.id] = product;
                });
                resolve(products);
            }
            request.onerror = function (event) {
                reject(event.target.result);
            }
        }
        dbRequest.onerror = function () {
            resolve(posOnlineProducts);
        }
    });
    // var posProducts = await getAllPosProducts();
    // // var posProducts = $.parseJSON(localStorage.pos_products);
    // // if (idProduct) {
    // //     return posProducts[idProduct];
    // // }
    // return posProducts;
}

export default {
    getPosProductDetails: getPosProductDetails
};

export async function selectCombination(data) {
    var selectedCombinationId = [];
    var pos_products = await getAllPosProducts();
    selectedCombinationId.push(data.idAttribute());
    for (var i = 0; i < viewModel.productCombination().length; i++) {
        for (var j = 0; j < viewModel.productCombination()[i].productAttribute().length; j++) {
            if (viewModel.productCombination()[i].productAttribute()[j].idAttributeGroup() != data.idAttributeGroup()) {
                if (viewModel.productCombination()[i].productAttribute()[j].selected() == "selected") {
                    selectedCombinationId.push(viewModel.productCombination()[i].productAttribute()[j].idAttribute());
                }
            } else {
                if (viewModel.productCombination()[i].productAttribute()[j].idAttribute() == data.idAttribute()) {
                    viewModel.productCombination()[i].productAttribute()[j].selected("selected");
                } else {
                    viewModel.productCombination()[i].productAttribute()[j].selected("");
                }
            }
        }
    }
    selectedCombinationId = selectedCombinationId.sort(function (a, b) { return a - b }).join('-');
    if (pos_products[data.idProduct()]['combination_details'][selectedCombinationId] != undefined) {
        var combiTaxRate = 0;
        if (taxRate != undefined) {
            combiTaxRate = parseFloat(taxRate[data.idProduct()]);
        } else {
            combiTaxRate = parseFloat(defaultTaxRate[data.idProduct()]);
        }
        var selectedCombinationDetail = pos_products[data.idProduct()]['combination_details'][selectedCombinationId];
        var combiPrice = parseFloat(selectedCombinationDetail['taxExcludedPrice']);
        combiPrice += (combiTaxRate * combiPrice) / 100;
        combiPrice *= viewModel.combinationQuantity();
        // viewModel.combinationPrice(wkFormatCurrency(parseFloat(combiPrice), currencyFormat));
        viewModel.combinationUnitPrice(parseFloat(combiPrice), currencyFormat);
        // viewModel.combinationPrice(wkFormatCurrency(parseFloat(selectedCombinationDetail['price']), currencyFormat));
        // customization
        var idProductAttribute = selectedCombinationDetail['id_product_attribute'];
        viewModel.updateCombinationImage(data.idProduct(), idProductAttribute);
        viewModel.combinationQuantity(parseInt(selectedCombinationDetail['minimal_quantity']));
        // End
    } else {
        showErrorMsg(combinationNotExist);
        // $.growl.error({ title: "", message: combinationNotExist });
    }
}

function mergreArray(indexedDbKeys, productKeys) {
    var mergeArray = indexedDbKeys.concat(productKeys.filter(function (item) {
        return indexedDbKeys.indexOf(item) < 0;
    }));
    return mergeArray;
}

export function storeProduct(products) {
    dbRequest = window.indexedDB.open(dbName, dbVersion);
    dbRequest.onsuccess = function (event) {
        var db = event.target.result;
        var trans = db.transaction('pos_products', 'readwrite');
        var productStore = trans.objectStore('pos_products');
        var request = productStore.getAll();
        request.onsuccess = function (event) {
            var indexedDbProducts = {};
            $.each(event.target.result, function (index, product) {
                indexedDbProducts[product.id] = product;
            });
            if (typeof indexedDbProducts != 'undefined' && indexedDbProducts) {
                /* Update this code Pending  */
                var indexedDbKeys = Object.keys(indexedDbProducts);
                var productKeys = Object.keys(products);
                // var totalProductKeys = { ...{}, ...indexedDbKeys, ...productKeys };
                var totalProductKeys = mergreArray(indexedDbKeys, productKeys);
                $.each(totalProductKeys, function (index, productKey) {
                    if (typeof products[productKey] == 'undefined'
                        && typeof indexedDbProducts[productKey] != 'undefined'
                    ) {
                        /* Remove product from db */
                        productStore.delete(parseInt(productKey));
                    } else if (typeof indexedDbProducts[productKey] == 'undefined') {
                        /* Add product to indexed db */
                        productStore.add(products[productKey]);
                    } else {
                        /* Update Product to indexed db */
                        productStore.put(products[productKey]);
                    }
                });

            } else {
                $.each(products, function (index, product) {
                    productStore.add(product);
                });
            }
        }
    };
}

export function updateStoreProduct(products) {
    dbRequest = window.indexedDB.open(dbName, dbVersion);
    dbRequest.onsuccess = function (event) {
        var db = event.target.result;
        var trans = db.transaction('pos_products', 'readwrite');
        var productStore = trans.objectStore('pos_products');
        $.each(products, function (index, product) {
            productStore.put(product);
        })
    };
}

export function getAllPosProducts() {
    return new Promise(resolve => {
        dbRequest = window.indexedDB.open(dbName, dbVersion);
        dbRequest.onsuccess = function (event) {
            var db = event.target.result;
            var trans = db.transaction('pos_products', 'readwrite');
            var productStore = trans.objectStore('pos_products');
            var request = productStore.getAll();
            request.onsuccess = function (event) {
                var products = {};
                $.each(event.target.result, function (index, product) {
                    products[product.id] = product;
                });
                resolve(products);
            }
        }
    });
}
