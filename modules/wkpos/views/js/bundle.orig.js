/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/        }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/        };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/    }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/        }
/******/    };
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/        }
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/    };
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/    };
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/    };
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/([
/* 0 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showErrorMsg", function () { return showErrorMsg; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSuccessMsg", function () { return showSuccessMsg; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showWarningMsg", function () { return showWarningMsg; });
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

        // import $ from 'jquery';
        // import growl from '../../js/jquery.growl.js';

        function showErrorMsg(msg) {
            playErrorAudio();
            growl.error({ title: "", message: msg });
        }

        function showSuccessMsg(msg) {
            growl.notice({ title: "", message: msg });
        }

        function showWarningMsg(msg) {
            playErrorAudio();
            growl.warning({ title: "", message: msg });
        }

        function playErrorAudio() {
            var errorAudio = document.getElementById("errorAudio");
            errorAudio.play();
        }
/***/ }),

/* 1 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeTotalProductCaculation", function () { return makeTotalProductCaculation; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormatPrice", function () { return getFormatPrice; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wkFormatCurrency", function () { return wkFormatCurrency; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncComputed", function () { return asyncComputed; });
        /* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
        /* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
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
        /* Format the product price according to the currency */
        var p, pos;
        var format = [];

        String.prototype.strtr = function (dic) {
            const str = this.toString(),
                makeToken = (inx) => `{{###~${inx}~###}}`,

                tokens = Object.keys(dic)
                    .map((key, inx) => ({
                        key,
                        val: dic[key],
                        token: makeToken(inx)
                    })),

                tokenizedStr = tokens.reduce((carry, entry) =>
                    carry.replace(entry.key, entry.token), str);

            return tokens.reduce((carry, entry) =>
                carry.replace(entry.token, entry.val), tokenizedStr);
        };

        function makeTotalProductCaculation(price) {
            var roundOffValue = 100;
            if (psPrecision == 1) {
                roundOffValue = 10;
            } else if (psPrecision == 2) {
                roundOffValue = 100;
            } else if (psPrecision == 3) {
                roundOffValue = 1000;
            } else if (psPrecision == 4) {
                roundOffValue = 10000;
            } else if (psPrecision == 5) {
                roundOffValue = 100000;
            } else if (psPrecision == 6) {
                roundOffValue = 1000000;
            }
            price = Math.round(price * roundOffValue) / roundOffValue;
            return price.toFixed(psPrecision);
        }

        async function getFormatPrice(price) {
            if (isNaN(price)) {
                price = 0;
            }
            price = makeTotalProductCaculation(price);
            return new Promise(resolve => {
                formatCurrencyCldr(price, function (price) {
                    price = price.strtr(number_formatter);
                    resolve(price);
                });
            });
        }

        async function wkFormatCurrency(number, currencyFormat, invoice = false) {
            if (psVersion < '1.7.0.0') {
                return formatCurrency(number, currencyFormat, currencySign, currencyBlank);
            } else if (psVersion >= '1.7.6.0') {
                try {
                    return getFormatPrice(number);
                } catch (e) {
                    console.log(e);
                }
            } else {
                var patterns = currencyFormat.split(';');
                var matches = false;
                if (matches = (patterns[0] + '').match(/^(.*?)[#,\.0]+(.*?)$/)) {
                    format['positive_prefix'] = matches[1];
                    format['positive_suffix'] = matches[2];
                }
                if (patterns[1] != undefined && (patterns[1] + '').match(/^(.*?)[#,\.0]+(.*?)$/)) {
                    format['negative_prefix'] = matches[1];
                    format['negative_suffix'] = matches[2];
                } else {
                    format['negative_prefix'] = '-' + format['positive_prefix'];
                    format['negative_suffix'] = format['positive_suffix'];
                }
                var pat = patterns[0];
                if (pos !== false) {
                    var pos2 = pat.indexOf('0');
                    format['decimal_digits'] = pos2 > pos ? pos2 - pos : 0;

                    var pos3 = pat.indexOf('#');
                    format['max_decimal_digits'] = pos3 >= pos2 ? pos3 - pos : format['decimal_digits'];

                    pat = pat.substring(0, pos);
                }

                p = pat.replace(',', '');
                pos = p.indexOf('0');

                format['integer_digits'] = pos !== -1 ? p.indexOf('0') - pos + 1 : 0;



                p = currencyFormat.replace('#', '0');
                pos = currencyFormat.indexOf(',');
                if (pos !== false) {
                    format['group_size1'] = currencyFormat.indexOf('0') - pos;

                    pos2 = currencyFormat.substring(0, pos).indexOf(',');
                    format['group_size2'] = pos2 !== false ? pos - pos2 - 1 : 0;
                }

                var result = parseNumber(number);
                var formattedInteger = formatIntegerWithGroup(result[0], ',');

                var formattedNumber = formatIntegerWithDecimal(formattedInteger, result[1], '.')

                if (number < 0) {
                    number = format['negative_prefix'] + formattedNumber + format['negative_suffix'];
                }
                else {
                    number = format['positive_prefix'] + formattedNumber + format['positive_suffix'];
                }
                if (invoice) {
                    return number.replace("¤", '\x1B\x74\x13\xD5');
                }
                return number.replace("¤", currencySign);
            }
        }

        function parseNumber(number) {
            number = Math.abs(number);

            if (format['max_decimal_digits'] >= 0) {
                number = makeTotalProductCaculation(parseFloat(number));
            }
            number = number + '';
            if ((pos = number.indexOf('.')) !== -1) {
                return [number.substring(0, pos), number.substring(pos + 1)];
            }
            return [number, ''];
        }
        function ltrim(data) {
            var trimmed = data.replace(/^\s+/g, '');
            return trimmed;
        };

        function padLeft(char, length, data) {
            data = data + '';
            while (data.length < length) {
                data = char + data;
            }
            return data;
        }

        function formatIntegerWithGroup(integerValue, group_symbol) {
            integerValue += '';
            integerValue = padLeft('0', format['integer_digits'], integerValue) + '';
            var group_size1 = format['group_size1'];

            if (group_size1 < 1 || (integerValue.length) <= format['group_size1']) {
                return integerValue;
            }

            var group_size2 = format['group_size2'];

            var str1 = integerValue.slice(0, -group_size1);
            var str2 = integerValue.slice(-group_size1);
            var size = group_size2 > 0 ? group_size2 : group_size1;

            str1 = padLeft(' ', parseInt(((str1.length) + size - 1) / size) * size, str1) + '';
            if (str1.length >= size) {
                return (ltrim((str1.match(new RegExp('.{' + size + '}', 'g'))).join(group_symbol))) + group_symbol + str2;
            } else {
                return ltrim(str1) + group_symbol + str2;
            }

        }

        function formatIntegerWithDecimal(integer, decimal, decimal_symbol) {
            integer += '';
            decimal += '';

            if (decimal.length > format['decimal_digits']) {
                decimal = padLeft('0', decimal.length - 1, decimal);
            }

            if (decimal.length > 0) {
                decimal = decimal_symbol + decimal;
            }

            return '' + integer + decimal;
        }

        function asyncComputed(evaluator, owner) {
            var result = ko.observable();
            ko.computed(function () {
                var value = evaluator.call(owner);
                if (value instanceof Promise) {
                    evaluator.call(owner).then(result);
                }
            });
            return result;
        }
/***/ }),

/* 2 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Products", function () { return Products; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCombinationDetails", function () { return ProductCombinationDetails; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchProduct", function () { return searchProduct; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listenForScrollEvent", function () { return listenForScrollEvent; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadProductPanel", function () { return loadProductPanel; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCombination", function () { return selectCombination; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeProduct", function () { return storeProduct; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateStoreProduct", function () { return updateStoreProduct; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllPosProducts", function () { return getAllPosProducts; });
        /* harmony import */ var _wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
        /* harmony import */ var _wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
        /* harmony import */ var _order_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
        /* harmony import */ var _customer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
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

        function Products(data, selectedCountry = false, customerGroup = false) {
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
            this.displayAvailQty = ko.observable(data.quantity);
            this.displayStockLocation = ko.observable(data.stock_location);
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
            this.displayPriceWithoutReduction = data.displayPriceWithoutReduction;
            this.displayPrice = parseFloat(taxExcludePrice) + (this.taxRate() * taxExcludePrice / 100);
            this.displayPrice = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_0__["asyncComputed"])(function () {
                return Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_0__["wkFormatCurrency"])(this.displayPrice, currencyFormat);
            }, this);
            this.hasCombination = data.has_combination;
            this.idProduct = data.id;
            this.quantity = ko.observable(parseInt(data.quantity));
            this.imagePath = data.image;
            this.specificPrices = data.specificPrices;
        }

        /* Mapping of product combination */
        function ProductCombinationDetails(groupName, attribute, idProduct, idAttributeGroup, defaultCombination) {
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

        async function searchProduct(event, code) {
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
                            || (product["isbn"] != undefined
                                && product["isbn"] == searchProduct
                                && (productSearchMethods.search("7") != -1 || barcodeType == 7))
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
                                cartProduct["specificPrices"] = product.specificPrices;
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
                                || (combination["isbn"] != undefined
                                    && combination["isbn"] == searchProduct
                                    && (productSearchMethods.search("7") != -1 || barcodeType == 7))
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
                                                var newSelectedAttribute = selectedAttribute.split('-');
                                                if (newSelectedAttribute.includes(idAttribute)) {
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
                //  for search more precisely fuse.js
                var list = Object.values(pos_products);
                const options = {
                    includeScore: true,
                    keys: ['name'],
                    minMatchCharLength: 3
                    // threshold: 0.4,
                }

                const fuse = new Fuse(list, options)
                const result = fuse.search(viewModel.productSearchKey())
                var searchedFor = viewModel.productSearchKey().toLowerCase().split(' ');
                result.forEach(function (value, index) {
                    var name = stripVowelAccent(value.item.name.toLowerCase());
                    var proname = name;
                    var isEvery = searchedFor.every(itemitrate => proname.includes(itemitrate));
                    if (isEvery) {
                        productSearch[i++] = (new Products(value.item, viewModel.selectedIdCountry()));
                    }
                });
                const key = 'idProduct';
                const arrayUniqueByKey = [...new Map(productSearch.map(item => [item[key], item])).values()];
                productSearch = arrayUniqueByKey;
                if (productSearch.length == 0) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_1__["showErrorMsg"])(noProductFound);
                }
                //  for search more precisely
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

        function stripVowelAccent(str) {
            var rExps = [
                { re: /[\xC0-\xC6]/g, ch: 'A' },
                { re: /[\xE0-\xE6]/g, ch: 'a' },
                { re: /[\xC8-\xCB]/g, ch: 'E' },
                { re: /[\xE8-\xEB]/g, ch: 'e' },
                { re: /[\xCC-\xCF]/g, ch: 'I' },
                { re: /[\xEC-\xEF]/g, ch: 'i' },
                { re: /[\xD2-\xD6]/g, ch: 'O' },
                { re: /[\xF2-\xF6]/g, ch: 'o' },
                { re: /[\xD9-\xDC]/g, ch: 'U' },
                { re: /[\xF9-\xFC]/g, ch: 'u' },
                { re: /[\xD1]/g, ch: 'N' },
                { re: /[\xF1]/g, ch: 'n' }];

            for (var i = 0, len = rExps.length; i < len; i++)
                str = str.replace(rExps[i].re, rExps[i].ch);

            return str;
        }

        function listenForScrollEvent() {
            $(document).find("#wk-product-panel").on('scroll', function () {
                if ($(this).scrollTop() + $(this).height() > $('#wk-product-panel .wk-products').height() - 100 && (objPosProductsViewModel.loadedProducts()).length > 0) {
                    loadProductPanel(objPosProductsViewModel.loadedProducts(), true);
                }
            });
            $(document).find('#wk-customer-panel').on('scroll', function () {
                if ($(this).scrollTop() + $(this).height() > $('#wk-customer-panel .wk-customers-detail').height() - 100 && (objPosProductsViewModel.loadedCustomers()).length > 0) {
                    Object(_customer_js__WEBPACK_IMPORTED_MODULE_3__["loadCustomersPanel"])(objPosProductsViewModel.loadedCustomers(), true);
                }
            });
            $(document).find('#wk-order-panel').on('scroll', function () {
                if ($(this).scrollTop() + $(this).height() > $('#wk-order-panel .wk-order-detail').height() - 100 && (objPosProductsViewModel.loadedOrders()).length > 0) {
                    Object(_order_js__WEBPACK_IMPORTED_MODULE_2__["loadOrderPanel"])(objPosProductsViewModel.loadedOrders(), true);
                }
            });
        }


        var remainingProducts = [];
        function loadProductPanel(products, onScroll = false) {
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

        /* harmony default export */ __webpack_exports__["default"] = ({
            getPosProductDetails: getPosProductDetails
        });

        async function selectCombination(data) {
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
            if (typeof(pos_products[data.idProduct()]['combination_details'][selectedCombinationId]) == 'undefined') {
                var selectedCombinationId = [];
                var pos_products = await Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["getAllPosProducts"])();
                selectedCombinationId.push(data.idAttribute());
                for (var i = 0; i < viewModel.productCombination().length; i++) {
                    for (var j = 0; j < viewModel.productCombination()[i].productAttribute().length; j++) {
                        if (viewModel.productCombination()[i].productAttribute()[j].idAttribute() == data.idAttribute()) {
                            viewModel.productCombination()[i].productAttribute()[j].selected("selected");
                        } else {
                            viewModel.productCombination()[i].productAttribute()[j].selected("");
                        }
                    }
                }
            } else
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
                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_1__["showErrorMsg"])(combinationNotExist);
                // $.growl.error({ title: "", message: combinationNotExist });
            }
        }

        function mergreArray(indexedDbKeys, productKeys) {
            var mergeArray = indexedDbKeys.concat(productKeys.filter(function (item) {
                return indexedDbKeys.indexOf(item) < 0;
            }));
            return mergeArray;
        }

        function storeProduct(products) {
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

        function updateStoreProduct(products) {
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

        function getAllPosProducts() {
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

/***/ }),

/* 3 */
/***/ (function (module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
        * jQuery JavaScript Library v3.4.1
        * https://jquery.com/
        *
        * Includes Sizzle.js
        * https://sizzlejs.com/
        *
        * Copyright JS Foundation and other contributors
        * Released under the MIT license
        * https://jquery.org/license
        *
        * Date: 2019-05-01T21:04Z
        */
        (function (global, factory) {

            "use strict";

            if (true && typeof module.exports === "object") {

                // For CommonJS and CommonJS-like environments where a proper `window`
                // is present, execute the factory and get jQuery.
                // For environments that do not have a `window` with a `document`
                // (such as Node.js), expose a factory as module.exports.
                // This accentuates the need for the creation of a real `window`.
                // e.g. var jQuery = require("jquery")(window);
                // See ticket #14549 for more info.
                module.exports = global.document ?
                    factory(global, true) :
                    function (w) {
                        if (!w.document) {
                            throw new Error("jQuery requires a window with a document");
                        }
                        return factory(w);
                    };
            } else {
                factory(global);
            }

            // Pass this if window is not defined yet
        })(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

            // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
            // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
            // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
            // enough that all such attempts are guarded in a try block.
            "use strict";

            var arr = [];

            var document = window.document;

            var getProto = Object.getPrototypeOf;

            var slice = arr.slice;

            var concat = arr.concat;

            var push = arr.push;

            var indexOf = arr.indexOf;

            var class2type = {};

            var toString = class2type.toString;

            var hasOwn = class2type.hasOwnProperty;

            var fnToString = hasOwn.toString;

            var ObjectFunctionString = fnToString.call(Object);

            var support = {};

            var isFunction = function isFunction(obj) {

                // Support: Chrome <=57, Firefox <=52
                // In some browsers, typeof returns "function" for HTML <object> elements
                // (i.e., `typeof document.createElement( "object" ) === "function"`).
                // We don't want to classify *any* DOM node as a function.
                return typeof obj === "function" && typeof obj.nodeType !== "number";
            };


            var isWindow = function isWindow(obj) {
                return obj != null && obj === obj.window;
            };




            var preservedScriptAttributes = {
                type: true,
                src: true,
                nonce: true,
                noModule: true
            };

            function DOMEval(code, node, doc) {
                doc = doc || document;

                var i, val,
                    script = doc.createElement("script");

                script.text = code;
                if (node) {
                    for (i in preservedScriptAttributes) {

                        // Support: Firefox 64+, Edge 18+
                        // Some browsers don't support the "nonce" property on scripts.
                        // On the other hand, just using `getAttribute` is not enough as
                        // the `nonce` attribute is reset to an empty string whenever it
                        // becomes browsing-context connected.
                        // See https://github.com/whatwg/html/issues/2369
                        // See https://html.spec.whatwg.org/#nonce-attributes
                        // The `node.getAttribute` check was added for the sake of
                        // `jQuery.globalEval` so that it can fake a nonce-containing node
                        // via an object.
                        val = node[i] || node.getAttribute && node.getAttribute(i);
                        if (val) {
                            script.setAttribute(i, val);
                        }
                    }
                }
                doc.head.appendChild(script).parentNode.removeChild(script);
            }


            function toType(obj) {
                if (obj == null) {
                    return obj + "";
                }

                // Support: Android <=2.3 only (functionish RegExp)
                return typeof obj === "object" || typeof obj === "function" ?
                    class2type[toString.call(obj)] || "object" :
                    typeof obj;
            }
            /* global Symbol */
            // Defining this global in .eslintrc.json would create a danger of using the global
            // unguarded in another place, it seems safer to define global only for this module



            var
                version = "3.4.1",

                // Define a local copy of jQuery
                jQuery = function (selector, context) {

                    // The jQuery object is actually just the init constructor 'enhanced'
                    // Need init if jQuery is called (just allow error to be thrown if not included)
                    return new jQuery.fn.init(selector, context);
                },

                // Support: Android <=4.0 only
                // Make sure we trim BOM and NBSP
                rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

            jQuery.fn = jQuery.prototype = {

                // The current version of jQuery being used
                jquery: version,

                constructor: jQuery,

                // The default length of a jQuery object is 0
                length: 0,

                toArray: function () {
                    return slice.call(this);
                },

                // Get the Nth element in the matched element set OR
                // Get the whole matched element set as a clean array
                get: function (num) {

                    // Return all the elements in a clean array
                    if (num == null) {
                        return slice.call(this);
                    }

                    // Return just the one element from the set
                    return num < 0 ? this[num + this.length] : this[num];
                },

                // Take an array of elements and push it onto the stack
                // (returning the new matched element set)
                pushStack: function (elems) {

                    // Build a new jQuery matched element set
                    var ret = jQuery.merge(this.constructor(), elems);

                    // Add the old object onto the stack (as a reference)
                    ret.prevObject = this;

                    // Return the newly-formed element set
                    return ret;
                },

                // Execute a callback for every element in the matched set.
                each: function (callback) {
                    return jQuery.each(this, callback);
                },

                map: function (callback) {
                    return this.pushStack(jQuery.map(this, function (elem, i) {
                        return callback.call(elem, i, elem);
                    }));
                },

                slice: function () {
                    return this.pushStack(slice.apply(this, arguments));
                },

                first: function () {
                    return this.eq(0);
                },

                last: function () {
                    return this.eq(-1);
                },

                eq: function (i) {
                    var len = this.length,
                        j = +i + (i < 0 ? len : 0);
                    return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
                },

                end: function () {
                    return this.prevObject || this.constructor();
                },

                // For internal use only.
                // Behaves like an Array's method, not like a jQuery method.
                push: push,
                sort: arr.sort,
                splice: arr.splice
            };

            jQuery.extend = jQuery.fn.extend = function () {
                var options, name, src, copy, copyIsArray, clone,
                    target = arguments[0] || {},
                    i = 1,
                    length = arguments.length,
                    deep = false;

                // Handle a deep copy situation
                if (typeof target === "boolean") {
                    deep = target;

                    // Skip the boolean and the target
                    target = arguments[i] || {};
                    i++;
                }

                // Handle case when target is a string or something (possible in deep copy)
                if (typeof target !== "object" && !isFunction(target)) {
                    target = {};
                }

                // Extend jQuery itself if only one argument is passed
                if (i === length) {
                    target = this;
                    i--;
                }

                for (; i < length; i++) {

                    // Only deal with non-null/undefined values
                    if ((options = arguments[i]) != null) {

                        // Extend the base object
                        for (name in options) {
                            copy = options[name];

                            // Prevent Object.prototype pollution
                            // Prevent never-ending loop
                            if (name === "__proto__" || target === copy) {
                                continue;
                            }

                            // Recurse if we're merging plain objects or arrays
                            if (deep && copy && (jQuery.isPlainObject(copy) ||
                                (copyIsArray = Array.isArray(copy)))) {
                                src = target[name];

                                // Ensure proper type for the source value
                                if (copyIsArray && !Array.isArray(src)) {
                                    clone = [];
                                } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                                    clone = {};
                                } else {
                                    clone = src;
                                }
                                copyIsArray = false;

                                // Never move original objects, clone them
                                target[name] = jQuery.extend(deep, clone, copy);

                                // Don't bring in undefined values
                            } else if (copy !== undefined) {
                                target[name] = copy;
                            }
                        }
                    }
                }

                // Return the modified object
                return target;
            };

            jQuery.extend({

                // Unique for each copy of jQuery on the page
                expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

                // Assume jQuery is ready without the ready module
                isReady: true,

                error: function (msg) {
                    throw new Error(msg);
                },

                noop: function () { },

                isPlainObject: function (obj) {
                    var proto, Ctor;

                    // Detect obvious negatives
                    // Use toString instead of jQuery.type to catch host objects
                    if (!obj || toString.call(obj) !== "[object Object]") {
                        return false;
                    }

                    proto = getProto(obj);

                    // Objects with no prototype (e.g., `Object.create( null )`) are plain
                    if (!proto) {
                        return true;
                    }

                    // Objects with prototype are plain iff they were constructed by a global Object function
                    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
                    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
                },

                isEmptyObject: function (obj) {
                    var name;

                    for (name in obj) {
                        return false;
                    }
                    return true;
                },

                // Evaluates a script in a global context
                globalEval: function (code, options) {
                    DOMEval(code, { nonce: options && options.nonce });
                },

                each: function (obj, callback) {
                    var length, i = 0;

                    if (isArrayLike(obj)) {
                        length = obj.length;
                        for (; i < length; i++) {
                            if (callback.call(obj[i], i, obj[i]) === false) {
                                break;
                            }
                        }
                    } else {
                        for (i in obj) {
                            if (callback.call(obj[i], i, obj[i]) === false) {
                                break;
                            }
                        }
                    }

                    return obj;
                },

                // Support: Android <=4.0 only
                trim: function (text) {
                    return text == null ?
                        "" :
                        (text + "").replace(rtrim, "");
                },

                // results is for internal usage only
                makeArray: function (arr, results) {
                    var ret = results || [];

                    if (arr != null) {
                        if (isArrayLike(Object(arr))) {
                            jQuery.merge(ret,
                                typeof arr === "string" ?
                                    [arr] : arr
                            );
                        } else {
                            push.call(ret, arr);
                        }
                    }

                    return ret;
                },

                inArray: function (elem, arr, i) {
                    return arr == null ? -1 : indexOf.call(arr, elem, i);
                },

                // Support: Android <=4.0 only, PhantomJS 1 only
                // push.apply(_, arraylike) throws on ancient WebKit
                merge: function (first, second) {
                    var len = +second.length,
                        j = 0,
                        i = first.length;

                    for (; j < len; j++) {
                        first[i++] = second[j];
                    }

                    first.length = i;

                    return first;
                },

                grep: function (elems, callback, invert) {
                    var callbackInverse,
                        matches = [],
                        i = 0,
                        length = elems.length,
                        callbackExpect = !invert;

                    // Go through the array, only saving the items
                    // that pass the validator function
                    for (; i < length; i++) {
                        callbackInverse = !callback(elems[i], i);
                        if (callbackInverse !== callbackExpect) {
                            matches.push(elems[i]);
                        }
                    }

                    return matches;
                },

                // arg is for internal usage only
                map: function (elems, callback, arg) {
                    var length, value,
                        i = 0,
                        ret = [];

                    // Go through the array, translating each of the items to their new values
                    if (isArrayLike(elems)) {
                        length = elems.length;
                        for (; i < length; i++) {
                            value = callback(elems[i], i, arg);

                            if (value != null) {
                                ret.push(value);
                            }
                        }

                        // Go through every key on the object,
                    } else {
                        for (i in elems) {
                            value = callback(elems[i], i, arg);

                            if (value != null) {
                                ret.push(value);
                            }
                        }
                    }

                    // Flatten any nested arrays
                    return concat.apply([], ret);
                },

                // A global GUID counter for objects
                guid: 1,

                // jQuery.support is not used in Core but other projects attach their
                // properties to it so it needs to exist.
                support: support
            });

            if (typeof Symbol === "function") {
                jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
            }

            // Populate the class2type map
            jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
                function (i, name) {
                    class2type["[object " + name + "]"] = name.toLowerCase();
                });

            function isArrayLike(obj) {

                // Support: real iOS 8.2 only (not reproducible in simulator)
                // `in` check used to prevent JIT error (gh-2145)
                // hasOwn isn't used here due to false negatives
                // regarding Nodelist length in IE
                var length = !!obj && "length" in obj && obj.length,
                    type = toType(obj);

                if (isFunction(obj) || isWindow(obj)) {
                    return false;
                }

                return type === "array" || length === 0 ||
                    typeof length === "number" && length > 0 && (length - 1) in obj;
            }
            var Sizzle =
                /*!
                 * Sizzle CSS Selector Engine v2.3.4
                 * https://sizzlejs.com/
                 *
                 * Copyright JS Foundation and other contributors
                 * Released under the MIT license
                 * https://js.foundation/
                 *
                 * Date: 2019-04-08
                 */
                (function (window) {

                    var i,
                        support,
                        Expr,
                        getText,
                        isXML,
                        tokenize,
                        compile,
                        select,
                        outermostContext,
                        sortInput,
                        hasDuplicate,

                        // Local document vars
                        setDocument,
                        document,
                        docElem,
                        documentIsHTML,
                        rbuggyQSA,
                        rbuggyMatches,
                        matches,
                        contains,

                        // Instance-specific data
                        expando = "sizzle" + 1 * new Date(),
                        preferredDoc = window.document,
                        dirruns = 0,
                        done = 0,
                        classCache = createCache(),
                        tokenCache = createCache(),
                        compilerCache = createCache(),
                        nonnativeSelectorCache = createCache(),
                        sortOrder = function (a, b) {
                            if (a === b) {
                                hasDuplicate = true;
                            }
                            return 0;
                        },

                        // Instance methods
                        hasOwn = ({}).hasOwnProperty,
                        arr = [],
                        pop = arr.pop,
                        push_native = arr.push,
                        push = arr.push,
                        slice = arr.slice,
                        // Use a stripped-down indexOf as it's faster than native
                        // https://jsperf.com/thor-indexof-vs-for/5
                        indexOf = function (list, elem) {
                            var i = 0,
                                len = list.length;
                            for (; i < len; i++) {
                                if (list[i] === elem) {
                                    return i;
                                }
                            }
                            return -1;
                        },

                        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

                        // Regular expressions

                        // http://www.w3.org/TR/css3-selectors/#whitespace
                        whitespace = "[\\x20\\t\\r\\n\\f]",

                        // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                        identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

                        // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                            // Operator (capture 2)
                            "*([*^$|!~]?=)" + whitespace +
                            // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                            "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                            "*\\]",

                        pseudos = ":(" + identifier + ")(?:\\((" +
                            // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                            // 1. quoted (capture 3; capture 4 or capture 5)
                            "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                            // 2. simple (capture 6)
                            "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                            // 3. anything else (capture 2)
                            ".*" +
                            ")\\)|)",

                        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                        rwhitespace = new RegExp(whitespace + "+", "g"),
                        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

                        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
                        rdescend = new RegExp(whitespace + "|>"),

                        rpseudo = new RegExp(pseudos),
                        ridentifier = new RegExp("^" + identifier + "$"),

                        matchExpr = {
                            "ID": new RegExp("^#(" + identifier + ")"),
                            "CLASS": new RegExp("^\\.(" + identifier + ")"),
                            "TAG": new RegExp("^(" + identifier + "|[*])"),
                            "ATTR": new RegExp("^" + attributes),
                            "PSEUDO": new RegExp("^" + pseudos),
                            "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                                "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                                "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                            "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                            // For use in libraries implementing .is()
                            // We use this for POS matching in `select`
                            "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                                whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                        },

                        rhtml = /HTML$/i,
                        rinputs = /^(?:input|select|textarea|button)$/i,
                        rheader = /^h\d$/i,

                        rnative = /^[^{]+\{\s*\[native \w/,

                        // Easily-parseable/retrievable ID or TAG or CLASS selectors
                        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                        rsibling = /[+~]/,

                        // CSS escapes
                        // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                        funescape = function (_, escaped, escapedWhitespace) {
                            var high = "0x" + escaped - 0x10000;
                            // NaN means non-codepoint
                            // Support: Firefox<24
                            // Workaround erroneous numeric interpretation of +"0x"
                            return high !== high || escapedWhitespace ?
                                escaped :
                                high < 0 ?
                                    // BMP codepoint
                                    String.fromCharCode(high + 0x10000) :
                                    // Supplemental Plane codepoint (surrogate pair)
                                    String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
                        },

                        // CSS string/identifier serialization
                        // https://drafts.csswg.org/cssom/#common-serializing-idioms
                        rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                        fcssescape = function (ch, asCodePoint) {
                            if (asCodePoint) {

                                // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                                if (ch === "\0") {
                                    return "\uFFFD";
                                }

                                // Control characters and (dependent upon position) numbers get escaped as code points
                                return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
                            }

                            // Other potentially-special ASCII characters get backslash-escaped
                            return "\\" + ch;
                        },

                        // Used for iframes
                        // See setDocument()
                        // Removing the function wrapper causes a "Permission Denied"
                        // error in IE
                        unloadHandler = function () {
                            setDocument();
                        },

                        inDisabledFieldset = addCombinator(
                            function (elem) {
                                return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
                            },
                            { dir: "parentNode", next: "legend" }
                        );

                    // Optimize for push.apply( _, NodeList )
                    try {
                        push.apply(
                            (arr = slice.call(preferredDoc.childNodes)),
                            preferredDoc.childNodes
                        );
                        // Support: Android<4.0
                        // Detect silently failing push.apply
                        arr[preferredDoc.childNodes.length].nodeType;
                    } catch (e) {
                        push = {
                            apply: arr.length ?

                                // Leverage slice if possible
                                function (target, els) {
                                    push_native.apply(target, slice.call(els));
                                } :

                                // Support: IE<9
                                // Otherwise append directly
                                function (target, els) {
                                    var j = target.length,
                                        i = 0;
                                    // Can't trust NodeList.length
                                    while ((target[j++] = els[i++])) { }
                                    target.length = j - 1;
                                }
                        };
                    }

                    function Sizzle(selector, context, results, seed) {
                        var m, i, elem, nid, match, groups, newSelector,
                            newContext = context && context.ownerDocument,

                            // nodeType defaults to 9, since context defaults to document
                            nodeType = context ? context.nodeType : 9;

                        results = results || [];

                        // Return early from calls with invalid selector or context
                        if (typeof selector !== "string" || !selector ||
                            nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

                            return results;
                        }

                        // Try to shortcut find operations (as opposed to filters) in HTML documents
                        if (!seed) {

                            if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                                setDocument(context);
                            }
                            context = context || document;

                            if (documentIsHTML) {

                                // If the selector is sufficiently simple, try using a "get*By*" DOM method
                                // (excepting DocumentFragment context, where the methods don't exist)
                                if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

                                    // ID selector
                                    if ((m = match[1])) {

                                        // Document context
                                        if (nodeType === 9) {
                                            if ((elem = context.getElementById(m))) {

                                                // Support: IE, Opera, Webkit
                                                // TODO: identify versions
                                                // getElementById can match elements by name instead of ID
                                                if (elem.id === m) {
                                                    results.push(elem);
                                                    return results;
                                                }
                                            } else {
                                                return results;
                                            }

                                            // Element context
                                        } else {

                                            // Support: IE, Opera, Webkit
                                            // TODO: identify versions
                                            // getElementById can match elements by name instead of ID
                                            if (newContext && (elem = newContext.getElementById(m)) &&
                                                contains(context, elem) &&
                                                elem.id === m) {

                                                results.push(elem);
                                                return results;
                                            }
                                        }

                                        // Type selector
                                    } else if (match[2]) {
                                        push.apply(results, context.getElementsByTagName(selector));
                                        return results;

                                        // Class selector
                                    } else if ((m = match[3]) && support.getElementsByClassName &&
                                        context.getElementsByClassName) {

                                        push.apply(results, context.getElementsByClassName(m));
                                        return results;
                                    }
                                }

                                // Take advantage of querySelectorAll
                                if (support.qsa &&
                                    !nonnativeSelectorCache[selector + " "] &&
                                    (!rbuggyQSA || !rbuggyQSA.test(selector)) &&

                                    // Support: IE 8 only
                                    // Exclude object elements
                                    (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {

                                    newSelector = selector;
                                    newContext = context;

                                    // qSA considers elements outside a scoping root when evaluating child or
                                    // descendant combinators, which is not what we want.
                                    // In such cases, we work around the behavior by prefixing every selector in the
                                    // list with an ID selector referencing the scope context.
                                    // Thanks to Andrew Dupont for this technique.
                                    if (nodeType === 1 && rdescend.test(selector)) {

                                        // Capture the context ID, setting it first if necessary
                                        if ((nid = context.getAttribute("id"))) {
                                            nid = nid.replace(rcssescape, fcssescape);
                                        } else {
                                            context.setAttribute("id", (nid = expando));
                                        }

                                        // Prefix every selector in the list
                                        groups = tokenize(selector);
                                        i = groups.length;
                                        while (i--) {
                                            groups[i] = "#" + nid + " " + toSelector(groups[i]);
                                        }
                                        newSelector = groups.join(",");

                                        // Expand context for sibling selectors
                                        newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                                            context;
                                    }

                                    try {
                                        push.apply(results,
                                            newContext.querySelectorAll(newSelector)
                                        );
                                        return results;
                                    } catch (qsaError) {
                                        nonnativeSelectorCache(selector, true);
                                    } finally {
                                        if (nid === expando) {
                                            context.removeAttribute("id");
                                        }
                                    }
                                }
                            }
                        }

                        // All others
                        return select(selector.replace(rtrim, "$1"), context, results, seed);
                    }

                    /**
                     * Create key-value caches of limited size
                     * @returns {function(string, object)} Returns the Object data after storing it on itself with
                     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
                     *	deleting the oldest entry
                     */
                    function createCache() {
                        var keys = [];

                        function cache(key, value) {
                            // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                            if (keys.push(key + " ") > Expr.cacheLength) {
                                // Only keep the most recent entries
                                delete cache[keys.shift()];
                            }
                            return (cache[key + " "] = value);
                        }
                        return cache;
                    }

                    /**
                     * Mark a function for special use by Sizzle
                     * @param {Function} fn The function to mark
                     */
                    function markFunction(fn) {
                        fn[expando] = true;
                        return fn;
                    }

                    /**
                     * Support testing using an element
                     * @param {Function} fn Passed the created element and returns a boolean result
                     */
                    function assert(fn) {
                        var el = document.createElement("fieldset");

                        try {
                            return !!fn(el);
                        } catch (e) {
                            return false;
                        } finally {
                            // Remove from its parent by default
                            if (el.parentNode) {
                                el.parentNode.removeChild(el);
                            }
                            // release memory in IE
                            el = null;
                        }
                    }

                    /**
                     * Adds the same handler for all of the specified attrs
                     * @param {String} attrs Pipe-separated list of attributes
                     * @param {Function} handler The method that will be applied
                     */
                    function addHandle(attrs, handler) {
                        var arr = attrs.split("|"),
                            i = arr.length;

                        while (i--) {
                            Expr.attrHandle[arr[i]] = handler;
                        }
                    }

                    /**
                     * Checks document order of two siblings
                     * @param {Element} a
                     * @param {Element} b
                     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
                     */
                    function siblingCheck(a, b) {
                        var cur = b && a,
                            diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                                a.sourceIndex - b.sourceIndex;

                        // Use IE sourceIndex if available on both nodes
                        if (diff) {
                            return diff;
                        }

                        // Check if b follows a
                        if (cur) {
                            while ((cur = cur.nextSibling)) {
                                if (cur === b) {
                                    return -1;
                                }
                            }
                        }

                        return a ? 1 : -1;
                    }

                    /**
                     * Returns a function to use in pseudos for input types
                     * @param {String} type
                     */
                    function createInputPseudo(type) {
                        return function (elem) {
                            var name = elem.nodeName.toLowerCase();
                            return name === "input" && elem.type === type;
                        };
                    }

                    /**
                     * Returns a function to use in pseudos for buttons
                     * @param {String} type
                     */
                    function createButtonPseudo(type) {
                        return function (elem) {
                            var name = elem.nodeName.toLowerCase();
                            return (name === "input" || name === "button") && elem.type === type;
                        };
                    }

                    /**
                     * Returns a function to use in pseudos for :enabled/:disabled
                     * @param {Boolean} disabled true for :disabled; false for :enabled
                     */
                    function createDisabledPseudo(disabled) {

                        // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
                        return function (elem) {

                            // Only certain elements can match :enabled or :disabled
                            // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
                            // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
                            if ("form" in elem) {

                                // Check for inherited disabledness on relevant non-disabled elements:
                                // * listed form-associated elements in a disabled fieldset
                                //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                                //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                                // * option elements in a disabled optgroup
                                //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                                // All such elements have a "form" property.
                                if (elem.parentNode && elem.disabled === false) {

                                    // Option elements defer to a parent optgroup if present
                                    if ("label" in elem) {
                                        if ("label" in elem.parentNode) {
                                            return elem.parentNode.disabled === disabled;
                                        } else {
                                            return elem.disabled === disabled;
                                        }
                                    }

                                    // Support: IE 6 - 11
                                    // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                                    return elem.isDisabled === disabled ||

                                        // Where there is no isDisabled, check manually
                                        /* jshint -W018 */
                                        elem.isDisabled !== !disabled &&
                                        inDisabledFieldset(elem) === disabled;
                                }

                                return elem.disabled === disabled;

                                // Try to winnow out elements that can't be disabled before trusting the disabled property.
                                // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                                // even exist on them, let alone have a boolean value.
                            } else if ("label" in elem) {
                                return elem.disabled === disabled;
                            }

                            // Remaining elements are neither :enabled nor :disabled
                            return false;
                        };
                    }

                    /**
                     * Returns a function to use in pseudos for positionals
                     * @param {Function} fn
                     */
                    function createPositionalPseudo(fn) {
                        return markFunction(function (argument) {
                            argument = +argument;
                            return markFunction(function (seed, matches) {
                                var j,
                                    matchIndexes = fn([], seed.length, argument),
                                    i = matchIndexes.length;

                                // Match elements found at the specified indexes
                                while (i--) {
                                    if (seed[(j = matchIndexes[i])]) {
                                        seed[j] = !(matches[j] = seed[j]);
                                    }
                                }
                            });
                        });
                    }

                    /**
                     * Checks a node for validity as a Sizzle context
                     * @param {Element|Object=} context
                     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
                     */
                    function testContext(context) {
                        return context && typeof context.getElementsByTagName !== "undefined" && context;
                    }

                    // Expose support vars for convenience
                    support = Sizzle.support = {};

                    /**
                     * Detects XML nodes
                     * @param {Element|Object} elem An element or a document
                     * @returns {Boolean} True iff elem is a non-HTML XML node
                     */
                    isXML = Sizzle.isXML = function (elem) {
                        var namespace = elem.namespaceURI,
                            docElem = (elem.ownerDocument || elem).documentElement;

                        // Support: IE <=8
                        // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
                        // https://bugs.jquery.com/ticket/4833
                        return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
                    };

                    /**
                     * Sets document-related variables once based on the current document
                     * @param {Element|Object} [doc] An element or document object to use to set the document
                     * @returns {Object} Returns the current document
                     */
                    setDocument = Sizzle.setDocument = function (node) {
                        var hasCompare, subWindow,
                            doc = node ? node.ownerDocument || node : preferredDoc;

                        // Return early if doc is invalid or already selected
                        if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                            return document;
                        }

                        // Update global variables
                        document = doc;
                        docElem = document.documentElement;
                        documentIsHTML = !isXML(document);

                        // Support: IE 9-11, Edge
                        // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
                        if (preferredDoc !== document &&
                            (subWindow = document.defaultView) && subWindow.top !== subWindow) {

                            // Support: IE 11, Edge
                            if (subWindow.addEventListener) {
                                subWindow.addEventListener("unload", unloadHandler, false);

                                // Support: IE 9 - 10 only
                            } else if (subWindow.attachEvent) {
                                subWindow.attachEvent("onunload", unloadHandler);
                            }
                        }

                        /* Attributes
                        ---------------------------------------------------------------------- */

                        // Support: IE<8
                        // Verify that getAttribute really returns attributes and not properties
                        // (excepting IE8 booleans)
                        support.attributes = assert(function (el) {
                            el.className = "i";
                            return !el.getAttribute("className");
                        });

                        /* getElement(s)By*
                        ---------------------------------------------------------------------- */

                        // Check if getElementsByTagName("*") returns only elements
                        support.getElementsByTagName = assert(function (el) {
                            el.appendChild(document.createComment(""));
                            return !el.getElementsByTagName("*").length;
                        });

                        // Support: IE<9
                        support.getElementsByClassName = rnative.test(document.getElementsByClassName);

                        // Support: IE<10
                        // Check if getElementById returns elements by name
                        // The broken getElementById methods don't pick up programmatically-set names,
                        // so use a roundabout getElementsByName test
                        support.getById = assert(function (el) {
                            docElem.appendChild(el).id = expando;
                            return !document.getElementsByName || !document.getElementsByName(expando).length;
                        });

                        // ID filter and find
                        if (support.getById) {
                            Expr.filter["ID"] = function (id) {
                                var attrId = id.replace(runescape, funescape);
                                return function (elem) {
                                    return elem.getAttribute("id") === attrId;
                                };
                            };
                            Expr.find["ID"] = function (id, context) {
                                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                                    var elem = context.getElementById(id);
                                    return elem ? [elem] : [];
                                }
                            };
                        } else {
                            Expr.filter["ID"] = function (id) {
                                var attrId = id.replace(runescape, funescape);
                                return function (elem) {
                                    var node = typeof elem.getAttributeNode !== "undefined" &&
                                        elem.getAttributeNode("id");
                                    return node && node.value === attrId;
                                };
                            };

                            // Support: IE 6 - 7 only
                            // getElementById is not reliable as a find shortcut
                            Expr.find["ID"] = function (id, context) {
                                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                                    var node, i, elems,
                                        elem = context.getElementById(id);

                                    if (elem) {

                                        // Verify the id attribute
                                        node = elem.getAttributeNode("id");
                                        if (node && node.value === id) {
                                            return [elem];
                                        }

                                        // Fall back on getElementsByName
                                        elems = context.getElementsByName(id);
                                        i = 0;
                                        while ((elem = elems[i++])) {
                                            node = elem.getAttributeNode("id");
                                            if (node && node.value === id) {
                                                return [elem];
                                            }
                                        }
                                    }

                                    return [];
                                }
                            };
                        }

                        // Tag
                        Expr.find["TAG"] = support.getElementsByTagName ?
                            function (tag, context) {
                                if (typeof context.getElementsByTagName !== "undefined") {
                                    return context.getElementsByTagName(tag);

                                    // DocumentFragment nodes don't have gEBTN
                                } else if (support.qsa) {
                                    return context.querySelectorAll(tag);
                                }
                            } :

                            function (tag, context) {
                                var elem,
                                    tmp = [],
                                    i = 0,
                                    // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                                    results = context.getElementsByTagName(tag);

                                // Filter out possible comments
                                if (tag === "*") {
                                    while ((elem = results[i++])) {
                                        if (elem.nodeType === 1) {
                                            tmp.push(elem);
                                        }
                                    }

                                    return tmp;
                                }
                                return results;
                            };

                        // Class
                        Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
                            if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                                return context.getElementsByClassName(className);
                            }
                        };

                        /* QSA/matchesSelector
                        ---------------------------------------------------------------------- */

                        // QSA and matchesSelector support

                        // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                        rbuggyMatches = [];

                        // qSa(:focus) reports false when true (Chrome 21)
                        // We allow this because of a bug in IE8/9 that throws an error
                        // whenever `document.activeElement` is accessed on an iframe
                        // So, we allow :focus to pass through QSA all the time to avoid the IE error
                        // See https://bugs.jquery.com/ticket/13378
                        rbuggyQSA = [];

                        if ((support.qsa = rnative.test(document.querySelectorAll))) {
                            // Build QSA regex
                            // Regex strategy adopted from Diego Perini
                            assert(function (el) {
                                // Select is set to empty string on purpose
                                // This is to test IE's treatment of not explicitly
                                // setting a boolean content attribute,
                                // since its presence should be enough
                                // https://bugs.jquery.com/ticket/12359
                                docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" +
                                    "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                                    "<option selected=''></option></select>";

                                // Support: IE8, Opera 11-12.16
                                // Nothing should be selected when empty strings follow ^= or $= or *=
                                // The test attribute must be unknown in Opera but "safe" for WinRT
                                // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                                if (el.querySelectorAll("[msallowcapture^='']").length) {
                                    rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                                }

                                // Support: IE8
                                // Boolean attributes and "value" are not treated correctly
                                if (!el.querySelectorAll("[selected]").length) {
                                    rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                                }

                                // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                                if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                                    rbuggyQSA.push("~=");
                                }

                                // Webkit/Opera - :checked should return selected option elements
                                // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                                // IE8 throws error here and will not see later tests
                                if (!el.querySelectorAll(":checked").length) {
                                    rbuggyQSA.push(":checked");
                                }

                                // Support: Safari 8+, iOS 8+
                                // https://bugs.webkit.org/show_bug.cgi?id=136851
                                // In-page `selector#id sibling-combinator selector` fails
                                if (!el.querySelectorAll("a#" + expando + "+*").length) {
                                    rbuggyQSA.push(".#.+[+~]");
                                }
                            });

                            assert(function (el) {
                                el.innerHTML = "<a href='' disabled='disabled'></a>" +
                                    "<select disabled='disabled'><option/></select>";

                                // Support: Windows 8 Native Apps
                                // The type and name attributes are restricted during .innerHTML assignment
                                var input = document.createElement("input");
                                input.setAttribute("type", "hidden");
                                el.appendChild(input).setAttribute("name", "D");

                                // Support: IE8
                                // Enforce case-sensitivity of name attribute
                                if (el.querySelectorAll("[name=d]").length) {
                                    rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                                }

                                // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                                // IE8 throws error here and will not see later tests
                                if (el.querySelectorAll(":enabled").length !== 2) {
                                    rbuggyQSA.push(":enabled", ":disabled");
                                }

                                // Support: IE9-11+
                                // IE's :disabled selector does not pick up the children of disabled fieldsets
                                docElem.appendChild(el).disabled = true;
                                if (el.querySelectorAll(":disabled").length !== 2) {
                                    rbuggyQSA.push(":enabled", ":disabled");
                                }

                                // Opera 10-11 does not throw on post-comma invalid pseudos
                                el.querySelectorAll("*,:x");
                                rbuggyQSA.push(",.*:");
                            });
                        }

                        if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
                            docElem.webkitMatchesSelector ||
                            docElem.mozMatchesSelector ||
                            docElem.oMatchesSelector ||
                            docElem.msMatchesSelector)))) {

                            assert(function (el) {
                                // Check to see if it's possible to do matchesSelector
                                // on a disconnected node (IE 9)
                                support.disconnectedMatch = matches.call(el, "*");

                                // This should fail with an exception
                                // Gecko does not error, returns false instead
                                matches.call(el, "[s!='']:x");
                                rbuggyMatches.push("!=", pseudos);
                            });
                        }

                        rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                        rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

                        /* Contains
                        ---------------------------------------------------------------------- */
                        hasCompare = rnative.test(docElem.compareDocumentPosition);

                        // Element contains another
                        // Purposefully self-exclusive
                        // As in, an element does not contain itself
                        contains = hasCompare || rnative.test(docElem.contains) ?
                            function (a, b) {
                                var adown = a.nodeType === 9 ? a.documentElement : a,
                                    bup = b && b.parentNode;
                                return a === bup || !!(bup && bup.nodeType === 1 && (
                                    adown.contains ?
                                        adown.contains(bup) :
                                        a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                                ));
                            } :
                            function (a, b) {
                                if (b) {
                                    while ((b = b.parentNode)) {
                                        if (b === a) {
                                            return true;
                                        }
                                    }
                                }
                                return false;
                            };

                        /* Sorting
                        ---------------------------------------------------------------------- */

                        // Document order sorting
                        sortOrder = hasCompare ?
                            function (a, b) {

                                // Flag for duplicate removal
                                if (a === b) {
                                    hasDuplicate = true;
                                    return 0;
                                }

                                // Sort on method existence if only one input has compareDocumentPosition
                                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                                if (compare) {
                                    return compare;
                                }

                                // Calculate position if both inputs belong to the same document
                                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                                    a.compareDocumentPosition(b) :

                                    // Otherwise we know they are disconnected
                                    1;

                                // Disconnected nodes
                                if (compare & 1 ||
                                    (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                                    // Choose the first element that is related to our preferred document
                                    if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                                        return -1;
                                    }
                                    if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                                        return 1;
                                    }

                                    // Maintain original order
                                    return sortInput ?
                                        (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                        0;
                                }

                                return compare & 4 ? -1 : 1;
                            } :
                            function (a, b) {
                                // Exit early if the nodes are identical
                                if (a === b) {
                                    hasDuplicate = true;
                                    return 0;
                                }

                                var cur,
                                    i = 0,
                                    aup = a.parentNode,
                                    bup = b.parentNode,
                                    ap = [a],
                                    bp = [b];

                                // Parentless nodes are either documents or disconnected
                                if (!aup || !bup) {
                                    return a === document ? -1 :
                                        b === document ? 1 :
                                            aup ? -1 :
                                                bup ? 1 :
                                                    sortInput ?
                                                        (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                                        0;

                                    // If the nodes are siblings, we can do a quick check
                                } else if (aup === bup) {
                                    return siblingCheck(a, b);
                                }

                                // Otherwise we need full lists of their ancestors for comparison
                                cur = a;
                                while ((cur = cur.parentNode)) {
                                    ap.unshift(cur);
                                }
                                cur = b;
                                while ((cur = cur.parentNode)) {
                                    bp.unshift(cur);
                                }

                                // Walk down the tree looking for a discrepancy
                                while (ap[i] === bp[i]) {
                                    i++;
                                }

                                return i ?
                                    // Do a sibling check if the nodes have a common ancestor
                                    siblingCheck(ap[i], bp[i]) :

                                    // Otherwise nodes in our document sort first
                                    ap[i] === preferredDoc ? -1 :
                                        bp[i] === preferredDoc ? 1 :
                                            0;
                            };

                        return document;
                    };

                    Sizzle.matches = function (expr, elements) {
                        return Sizzle(expr, null, null, elements);
                    };

                    Sizzle.matchesSelector = function (elem, expr) {
                        // Set document vars if needed
                        if ((elem.ownerDocument || elem) !== document) {
                            setDocument(elem);
                        }

                        if (support.matchesSelector && documentIsHTML &&
                            !nonnativeSelectorCache[expr + " "] &&
                            (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                            (!rbuggyQSA || !rbuggyQSA.test(expr))) {

                            try {
                                var ret = matches.call(elem, expr);

                                // IE 9's matchesSelector returns false on disconnected nodes
                                if (ret || support.disconnectedMatch ||
                                    // As well, disconnected nodes are said to be in a document
                                    // fragment in IE 9
                                    elem.document && elem.document.nodeType !== 11) {
                                    return ret;
                                }
                            } catch (e) {
                                nonnativeSelectorCache(expr, true);
                            }
                        }

                        return Sizzle(expr, document, null, [elem]).length > 0;
                    };

                    Sizzle.contains = function (context, elem) {
                        // Set document vars if needed
                        if ((context.ownerDocument || context) !== document) {
                            setDocument(context);
                        }
                        return contains(context, elem);
                    };

                    Sizzle.attr = function (elem, name) {
                        // Set document vars if needed
                        if ((elem.ownerDocument || elem) !== document) {
                            setDocument(elem);
                        }

                        var fn = Expr.attrHandle[name.toLowerCase()],
                            // Don't get fooled by Object.prototype properties (jQuery #13807)
                            val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                                fn(elem, name, !documentIsHTML) :
                                undefined;

                        return val !== undefined ?
                            val :
                            support.attributes || !documentIsHTML ?
                                elem.getAttribute(name) :
                                (val = elem.getAttributeNode(name)) && val.specified ?
                                    val.value :
                                    null;
                    };

                    Sizzle.escape = function (sel) {
                        return (sel + "").replace(rcssescape, fcssescape);
                    };

                    Sizzle.error = function (msg) {
                        throw new Error("Syntax error, unrecognized expression: " + msg);
                    };

                    /**
                     * Document sorting and removing duplicates
                     * @param {ArrayLike} results
                     */
                    Sizzle.uniqueSort = function (results) {
                        var elem,
                            duplicates = [],
                            j = 0,
                            i = 0;

                        // Unless we *know* we can detect duplicates, assume their presence
                        hasDuplicate = !support.detectDuplicates;
                        sortInput = !support.sortStable && results.slice(0);
                        results.sort(sortOrder);

                        if (hasDuplicate) {
                            while ((elem = results[i++])) {
                                if (elem === results[i]) {
                                    j = duplicates.push(i);
                                }
                            }
                            while (j--) {
                                results.splice(duplicates[j], 1);
                            }
                        }

                        // Clear input after sorting to release objects
                        // See https://github.com/jquery/sizzle/pull/225
                        sortInput = null;

                        return results;
                    };

                    /**
                     * Utility function for retrieving the text value of an array of DOM nodes
                     * @param {Array|Element} elem
                     */
                    getText = Sizzle.getText = function (elem) {
                        var node,
                            ret = "",
                            i = 0,
                            nodeType = elem.nodeType;

                        if (!nodeType) {
                            // If no nodeType, this is expected to be an array
                            while ((node = elem[i++])) {
                                // Do not traverse comment nodes
                                ret += getText(node);
                            }
                        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                            // Use textContent for elements
                            // innerText usage removed for consistency of new lines (jQuery #11153)
                            if (typeof elem.textContent === "string") {
                                return elem.textContent;
                            } else {
                                // Traverse its children
                                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                    ret += getText(elem);
                                }
                            }
                        } else if (nodeType === 3 || nodeType === 4) {
                            return elem.nodeValue;
                        }
                        // Do not include comment or processing instruction nodes

                        return ret;
                    };

                    Expr = Sizzle.selectors = {

                        // Can be adjusted by the user
                        cacheLength: 50,

                        createPseudo: markFunction,

                        match: matchExpr,

                        attrHandle: {},

                        find: {},

                        relative: {
                            ">": { dir: "parentNode", first: true },
                            " ": { dir: "parentNode" },
                            "+": { dir: "previousSibling", first: true },
                            "~": { dir: "previousSibling" }
                        },

                        preFilter: {
                            "ATTR": function (match) {
                                match[1] = match[1].replace(runescape, funescape);

                                // Move the given value to match[3] whether quoted or unquoted
                                match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

                                if (match[2] === "~=") {
                                    match[3] = " " + match[3] + " ";
                                }

                                return match.slice(0, 4);
                            },

                            "CHILD": function (match) {
                                /* matches from matchExpr["CHILD"]
                                    1 type (only|nth|...)
                                    2 what (child|of-type)
                                    3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                                    4 xn-component of xn+y argument ([+-]?\d*n|)
                                    5 sign of xn-component
                                    6 x of xn-component
                                    7 sign of y-component
                                    8 y of y-component
                                */
                                match[1] = match[1].toLowerCase();

                                if (match[1].slice(0, 3) === "nth") {
                                    // nth-* requires argument
                                    if (!match[3]) {
                                        Sizzle.error(match[0]);
                                    }

                                    // numeric x and y parameters for Expr.filter.CHILD
                                    // remember that false/true cast respectively to 0/1
                                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                                    match[5] = +((match[7] + match[8]) || match[3] === "odd");

                                    // other types prohibit arguments
                                } else if (match[3]) {
                                    Sizzle.error(match[0]);
                                }

                                return match;
                            },

                            "PSEUDO": function (match) {
                                var excess,
                                    unquoted = !match[6] && match[2];

                                if (matchExpr["CHILD"].test(match[0])) {
                                    return null;
                                }

                                // Accept quoted arguments as-is
                                if (match[3]) {
                                    match[2] = match[4] || match[5] || "";

                                    // Strip excess characters from unquoted arguments
                                } else if (unquoted && rpseudo.test(unquoted) &&
                                    // Get excess from tokenize (recursively)
                                    (excess = tokenize(unquoted, true)) &&
                                    // advance to the next closing parenthesis
                                    (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                                    // excess is a negative index
                                    match[0] = match[0].slice(0, excess);
                                    match[2] = unquoted.slice(0, excess);
                                }

                                // Return only captures needed by the pseudo filter method (type and argument)
                                return match.slice(0, 3);
                            }
                        },

                        filter: {

                            "TAG": function (nodeNameSelector) {
                                var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                                return nodeNameSelector === "*" ?
                                    function () { return true; } :
                                    function (elem) {
                                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                                    };
                            },

                            "CLASS": function (className) {
                                var pattern = classCache[className + " "];

                                return pattern ||
                                    (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                                    classCache(className, function (elem) {
                                        return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                                    });
                            },

                            "ATTR": function (name, operator, check) {
                                return function (elem) {
                                    var result = Sizzle.attr(elem, name);

                                    if (result == null) {
                                        return operator === "!=";
                                    }
                                    if (!operator) {
                                        return true;
                                    }

                                    result += "";

                                    return operator === "=" ? result === check :
                                        operator === "!=" ? result !== check :
                                            operator === "^=" ? check && result.indexOf(check) === 0 :
                                                operator === "*=" ? check && result.indexOf(check) > -1 :
                                                    operator === "$=" ? check && result.slice(-check.length) === check :
                                                        operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
                                                            operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                                                false;
                                };
                            },

                            "CHILD": function (type, what, argument, first, last) {
                                var simple = type.slice(0, 3) !== "nth",
                                    forward = type.slice(-4) !== "last",
                                    ofType = what === "of-type";

                                return first === 1 && last === 0 ?

                                    // Shortcut for :nth-*(n)
                                    function (elem) {
                                        return !!elem.parentNode;
                                    } :

                                    function (elem, context, xml) {
                                        var cache, uniqueCache, outerCache, node, nodeIndex, start,
                                            dir = simple !== forward ? "nextSibling" : "previousSibling",
                                            parent = elem.parentNode,
                                            name = ofType && elem.nodeName.toLowerCase(),
                                            useCache = !xml && !ofType,
                                            diff = false;

                                        if (parent) {

                                            // :(first|last|only)-(child|of-type)
                                            if (simple) {
                                                while (dir) {
                                                    node = elem;
                                                    while ((node = node[dir])) {
                                                        if (ofType ?
                                                            node.nodeName.toLowerCase() === name :
                                                            node.nodeType === 1) {

                                                            return false;
                                                        }
                                                    }
                                                    // Reverse direction for :only-* (if we haven't yet done so)
                                                    start = dir = type === "only" && !start && "nextSibling";
                                                }
                                                return true;
                                            }

                                            start = [forward ? parent.firstChild : parent.lastChild];

                                            // non-xml :nth-child(...) stores cache data on `parent`
                                            if (forward && useCache) {

                                                // Seek `elem` from a previously-cached index

                                                // ...in a gzip-friendly way
                                                node = parent;
                                                outerCache = node[expando] || (node[expando] = {});

                                                // Support: IE <9 only
                                                // Defend against cloned attroperties (jQuery gh-1709)
                                                uniqueCache = outerCache[node.uniqueID] ||
                                                    (outerCache[node.uniqueID] = {});

                                                cache = uniqueCache[type] || [];
                                                nodeIndex = cache[0] === dirruns && cache[1];
                                                diff = nodeIndex && cache[2];
                                                node = nodeIndex && parent.childNodes[nodeIndex];

                                                while ((node = ++nodeIndex && node && node[dir] ||

                                                    // Fallback to seeking `elem` from the start
                                                    (diff = nodeIndex = 0) || start.pop())) {

                                                    // When found, cache indexes on `parent` and break
                                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                                        uniqueCache[type] = [dirruns, nodeIndex, diff];
                                                        break;
                                                    }
                                                }

                                            } else {
                                                // Use previously-cached element index if available
                                                if (useCache) {
                                                    // ...in a gzip-friendly way
                                                    node = elem;
                                                    outerCache = node[expando] || (node[expando] = {});

                                                    // Support: IE <9 only
                                                    // Defend against cloned attroperties (jQuery gh-1709)
                                                    uniqueCache = outerCache[node.uniqueID] ||
                                                        (outerCache[node.uniqueID] = {});

                                                    cache = uniqueCache[type] || [];
                                                    nodeIndex = cache[0] === dirruns && cache[1];
                                                    diff = nodeIndex;
                                                }

                                                // xml :nth-child(...)
                                                // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                                if (diff === false) {
                                                    // Use the same loop as above to seek `elem` from the start
                                                    while ((node = ++nodeIndex && node && node[dir] ||
                                                        (diff = nodeIndex = 0) || start.pop())) {

                                                        if ((ofType ?
                                                            node.nodeName.toLowerCase() === name :
                                                            node.nodeType === 1) &&
                                                            ++diff) {

                                                            // Cache the index of each encountered element
                                                            if (useCache) {
                                                                outerCache = node[expando] || (node[expando] = {});

                                                                // Support: IE <9 only
                                                                // Defend against cloned attroperties (jQuery gh-1709)
                                                                uniqueCache = outerCache[node.uniqueID] ||
                                                                    (outerCache[node.uniqueID] = {});

                                                                uniqueCache[type] = [dirruns, diff];
                                                            }

                                                            if (node === elem) {
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            // Incorporate the offset, then check against cycle size
                                            diff -= last;
                                            return diff === first || (diff % first === 0 && diff / first >= 0);
                                        }
                                    };
                            },

                            "PSEUDO": function (pseudo, argument) {
                                // pseudo-class names are case-insensitive
                                // http://www.w3.org/TR/selectors/#pseudo-classes
                                // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                                // Remember that setFilters inherits from pseudos
                                var args,
                                    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                                        Sizzle.error("unsupported pseudo: " + pseudo);

                                // The user may use createPseudo to indicate that
                                // arguments are needed to create the filter function
                                // just as Sizzle does
                                if (fn[expando]) {
                                    return fn(argument);
                                }

                                // But maintain support for old signatures
                                if (fn.length > 1) {
                                    args = [pseudo, pseudo, "", argument];
                                    return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                        markFunction(function (seed, matches) {
                                            var idx,
                                                matched = fn(seed, argument),
                                                i = matched.length;
                                            while (i--) {
                                                idx = indexOf(seed, matched[i]);
                                                seed[idx] = !(matches[idx] = matched[i]);
                                            }
                                        }) :
                                        function (elem) {
                                            return fn(elem, 0, args);
                                        };
                                }

                                return fn;
                            }
                        },

                        pseudos: {
                            // Potentially complex pseudos
                            "not": markFunction(function (selector) {
                                // Trim the selector passed to compile
                                // to avoid treating leading and trailing
                                // spaces as combinators
                                var input = [],
                                    results = [],
                                    matcher = compile(selector.replace(rtrim, "$1"));

                                return matcher[expando] ?
                                    markFunction(function (seed, matches, context, xml) {
                                        var elem,
                                            unmatched = matcher(seed, null, xml, []),
                                            i = seed.length;

                                        // Match elements unmatched by `matcher`
                                        while (i--) {
                                            if ((elem = unmatched[i])) {
                                                seed[i] = !(matches[i] = elem);
                                            }
                                        }
                                    }) :
                                    function (elem, context, xml) {
                                        input[0] = elem;
                                        matcher(input, null, xml, results);
                                        // Don't keep the element (issue #299)
                                        input[0] = null;
                                        return !results.pop();
                                    };
                            }),

                            "has": markFunction(function (selector) {
                                return function (elem) {
                                    return Sizzle(selector, elem).length > 0;
                                };
                            }),

                            "contains": markFunction(function (text) {
                                text = text.replace(runescape, funescape);
                                return function (elem) {
                                    return (elem.textContent || getText(elem)).indexOf(text) > -1;
                                };
                            }),

                            // "Whether an element is represented by a :lang() selector
                            // is based solely on the element's language value
                            // being equal to the identifier C,
                            // or beginning with the identifier C immediately followed by "-".
                            // The matching of C against the element's language value is performed case-insensitively.
                            // The identifier C does not have to be a valid language name."
                            // http://www.w3.org/TR/selectors/#lang-pseudo
                            "lang": markFunction(function (lang) {
                                // lang value must be a valid identifier
                                if (!ridentifier.test(lang || "")) {
                                    Sizzle.error("unsupported lang: " + lang);
                                }
                                lang = lang.replace(runescape, funescape).toLowerCase();
                                return function (elem) {
                                    var elemLang;
                                    do {
                                        if ((elemLang = documentIsHTML ?
                                            elem.lang :
                                            elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                                            elemLang = elemLang.toLowerCase();
                                            return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                        }
                                    } while ((elem = elem.parentNode) && elem.nodeType === 1);
                                    return false;
                                };
                            }),

                            // Miscellaneous
                            "target": function (elem) {
                                var hash = window.location && window.location.hash;
                                return hash && hash.slice(1) === elem.id;
                            },

                            "root": function (elem) {
                                return elem === docElem;
                            },

                            "focus": function (elem) {
                                return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                            },

                            // Boolean properties
                            "enabled": createDisabledPseudo(false),
                            "disabled": createDisabledPseudo(true),

                            "checked": function (elem) {
                                // In CSS3, :checked should return both checked and selected elements
                                // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                                var nodeName = elem.nodeName.toLowerCase();
                                return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                            },

                            "selected": function (elem) {
                                // Accessing this property makes selected-by-default
                                // options in Safari work properly
                                if (elem.parentNode) {
                                    elem.parentNode.selectedIndex;
                                }

                                return elem.selected === true;
                            },

                            // Contents
                            "empty": function (elem) {
                                // http://www.w3.org/TR/selectors/#empty-pseudo
                                // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                                //   but not by others (comment: 8; processing instruction: 7; etc.)
                                // nodeType < 6 works because attributes (2) do not appear as children
                                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                    if (elem.nodeType < 6) {
                                        return false;
                                    }
                                }
                                return true;
                            },

                            "parent": function (elem) {
                                return !Expr.pseudos["empty"](elem);
                            },

                            // Element/input types
                            "header": function (elem) {
                                return rheader.test(elem.nodeName);
                            },

                            "input": function (elem) {
                                return rinputs.test(elem.nodeName);
                            },

                            "button": function (elem) {
                                var name = elem.nodeName.toLowerCase();
                                return name === "input" && elem.type === "button" || name === "button";
                            },

                            "text": function (elem) {
                                var attr;
                                return elem.nodeName.toLowerCase() === "input" &&
                                    elem.type === "text" &&

                                    // Support: IE<8
                                    // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                                    ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                            },

                            // Position-in-collection
                            "first": createPositionalPseudo(function () {
                                return [0];
                            }),

                            "last": createPositionalPseudo(function (matchIndexes, length) {
                                return [length - 1];
                            }),

                            "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                                return [argument < 0 ? argument + length : argument];
                            }),

                            "even": createPositionalPseudo(function (matchIndexes, length) {
                                var i = 0;
                                for (; i < length; i += 2) {
                                    matchIndexes.push(i);
                                }
                                return matchIndexes;
                            }),

                            "odd": createPositionalPseudo(function (matchIndexes, length) {
                                var i = 1;
                                for (; i < length; i += 2) {
                                    matchIndexes.push(i);
                                }
                                return matchIndexes;
                            }),

                            "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                                var i = argument < 0 ?
                                    argument + length :
                                    argument > length ?
                                        length :
                                        argument;
                                for (; --i >= 0;) {
                                    matchIndexes.push(i);
                                }
                                return matchIndexes;
                            }),

                            "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                                var i = argument < 0 ? argument + length : argument;
                                for (; ++i < length;) {
                                    matchIndexes.push(i);
                                }
                                return matchIndexes;
                            })
                        }
                    };

                    Expr.pseudos["nth"] = Expr.pseudos["eq"];

                    // Add button/input type pseudos
                    for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
                        Expr.pseudos[i] = createInputPseudo(i);
                    }
                    for (i in { submit: true, reset: true }) {
                        Expr.pseudos[i] = createButtonPseudo(i);
                    }

                    // Easy API for creating new setFilters
                    function setFilters() { }
                    setFilters.prototype = Expr.filters = Expr.pseudos;
                    Expr.setFilters = new setFilters();

                    tokenize = Sizzle.tokenize = function (selector, parseOnly) {
                        var matched, match, tokens, type,
                            soFar, groups, preFilters,
                            cached = tokenCache[selector + " "];

                        if (cached) {
                            return parseOnly ? 0 : cached.slice(0);
                        }

                        soFar = selector;
                        groups = [];
                        preFilters = Expr.preFilter;

                        while (soFar) {

                            // Comma and first run
                            if (!matched || (match = rcomma.exec(soFar))) {
                                if (match) {
                                    // Don't consume trailing commas as valid
                                    soFar = soFar.slice(match[0].length) || soFar;
                                }
                                groups.push((tokens = []));
                            }

                            matched = false;

                            // Combinators
                            if ((match = rcombinators.exec(soFar))) {
                                matched = match.shift();
                                tokens.push({
                                    value: matched,
                                    // Cast descendant combinators to space
                                    type: match[0].replace(rtrim, " ")
                                });
                                soFar = soFar.slice(matched.length);
                            }

                            // Filters
                            for (type in Expr.filter) {
                                if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                                    (match = preFilters[type](match)))) {
                                    matched = match.shift();
                                    tokens.push({
                                        value: matched,
                                        type: type,
                                        matches: match
                                    });
                                    soFar = soFar.slice(matched.length);
                                }
                            }

                            if (!matched) {
                                break;
                            }
                        }

                        // Return the length of the invalid excess
                        // if we're just parsing
                        // Otherwise, throw an error or return tokens
                        return parseOnly ?
                            soFar.length :
                            soFar ?
                                Sizzle.error(selector) :
                                // Cache the tokens
                                tokenCache(selector, groups).slice(0);
                    };

                    function toSelector(tokens) {
                        var i = 0,
                            len = tokens.length,
                            selector = "";
                        for (; i < len; i++) {
                            selector += tokens[i].value;
                        }
                        return selector;
                    }

                    function addCombinator(matcher, combinator, base) {
                        var dir = combinator.dir,
                            skip = combinator.next,
                            key = skip || dir,
                            checkNonElements = base && key === "parentNode",
                            doneName = done++;

                        return combinator.first ?
                            // Check against closest ancestor/preceding element
                            function (elem, context, xml) {
                                while ((elem = elem[dir])) {
                                    if (elem.nodeType === 1 || checkNonElements) {
                                        return matcher(elem, context, xml);
                                    }
                                }
                                return false;
                            } :

                            // Check against all ancestor/preceding elements
                            function (elem, context, xml) {
                                var oldCache, uniqueCache, outerCache,
                                    newCache = [dirruns, doneName];

                                // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                                if (xml) {
                                    while ((elem = elem[dir])) {
                                        if (elem.nodeType === 1 || checkNonElements) {
                                            if (matcher(elem, context, xml)) {
                                                return true;
                                            }
                                        }
                                    }
                                } else {
                                    while ((elem = elem[dir])) {
                                        if (elem.nodeType === 1 || checkNonElements) {
                                            outerCache = elem[expando] || (elem[expando] = {});

                                            // Support: IE <9 only
                                            // Defend against cloned attroperties (jQuery gh-1709)
                                            uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

                                            if (skip && skip === elem.nodeName.toLowerCase()) {
                                                elem = elem[dir] || elem;
                                            } else if ((oldCache = uniqueCache[key]) &&
                                                oldCache[0] === dirruns && oldCache[1] === doneName) {

                                                // Assign to newCache so results back-propagate to previous elements
                                                return (newCache[2] = oldCache[2]);
                                            } else {
                                                // Reuse newcache so results back-propagate to previous elements
                                                uniqueCache[key] = newCache;

                                                // A match means we're done; a fail means we have to keep checking
                                                if ((newCache[2] = matcher(elem, context, xml))) {
                                                    return true;
                                                }
                                            }
                                        }
                                    }
                                }
                                return false;
                            };
                    }

                    function elementMatcher(matchers) {
                        return matchers.length > 1 ?
                            function (elem, context, xml) {
                                var i = matchers.length;
                                while (i--) {
                                    if (!matchers[i](elem, context, xml)) {
                                        return false;
                                    }
                                }
                                return true;
                            } :
                            matchers[0];
                    }

                    function multipleContexts(selector, contexts, results) {
                        var i = 0,
                            len = contexts.length;
                        for (; i < len; i++) {
                            Sizzle(selector, contexts[i], results);
                        }
                        return results;
                    }

                    function condense(unmatched, map, filter, context, xml) {
                        var elem,
                            newUnmatched = [],
                            i = 0,
                            len = unmatched.length,
                            mapped = map != null;

                        for (; i < len; i++) {
                            if ((elem = unmatched[i])) {
                                if (!filter || filter(elem, context, xml)) {
                                    newUnmatched.push(elem);
                                    if (mapped) {
                                        map.push(i);
                                    }
                                }
                            }
                        }

                        return newUnmatched;
                    }

                    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                        if (postFilter && !postFilter[expando]) {
                            postFilter = setMatcher(postFilter);
                        }
                        if (postFinder && !postFinder[expando]) {
                            postFinder = setMatcher(postFinder, postSelector);
                        }
                        return markFunction(function (seed, results, context, xml) {
                            var temp, i, elem,
                                preMap = [],
                                postMap = [],
                                preexisting = results.length,

                                // Get initial elements from seed or context
                                elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

                                // Prefilter to get matcher input, preserving a map for seed-results synchronization
                                matcherIn = preFilter && (seed || !selector) ?
                                    condense(elems, preMap, preFilter, context, xml) :
                                    elems,

                                matcherOut = matcher ?
                                    // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                                    postFinder || (seed ? preFilter : preexisting || postFilter) ?

                                        // ...intermediate processing is necessary
                                        [] :

                                        // ...otherwise use results directly
                                        results :
                                    matcherIn;

                            // Find primary matches
                            if (matcher) {
                                matcher(matcherIn, matcherOut, context, xml);
                            }

                            // Apply postFilter
                            if (postFilter) {
                                temp = condense(matcherOut, postMap);
                                postFilter(temp, [], context, xml);

                                // Un-match failing elements by moving them back to matcherIn
                                i = temp.length;
                                while (i--) {
                                    if ((elem = temp[i])) {
                                        matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                                    }
                                }
                            }

                            if (seed) {
                                if (postFinder || preFilter) {
                                    if (postFinder) {
                                        // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                        temp = [];
                                        i = matcherOut.length;
                                        while (i--) {
                                            if ((elem = matcherOut[i])) {
                                                // Restore matcherIn since elem is not yet a final match
                                                temp.push((matcherIn[i] = elem));
                                            }
                                        }
                                        postFinder(null, (matcherOut = []), temp, xml);
                                    }

                                    // Move matched elements from seed to results to keep them synchronized
                                    i = matcherOut.length;
                                    while (i--) {
                                        if ((elem = matcherOut[i]) &&
                                            (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

                                            seed[temp] = !(results[temp] = elem);
                                        }
                                    }
                                }

                                // Add elements to results, through postFinder if defined
                            } else {
                                matcherOut = condense(
                                    matcherOut === results ?
                                        matcherOut.splice(preexisting, matcherOut.length) :
                                        matcherOut
                                );
                                if (postFinder) {
                                    postFinder(null, results, matcherOut, xml);
                                } else {
                                    push.apply(results, matcherOut);
                                }
                            }
                        });
                    }

                    function matcherFromTokens(tokens) {
                        var checkContext, matcher, j,
                            len = tokens.length,
                            leadingRelative = Expr.relative[tokens[0].type],
                            implicitRelative = leadingRelative || Expr.relative[" "],
                            i = leadingRelative ? 1 : 0,

                            // The foundational matcher ensures that elements are reachable from top-level context(s)
                            matchContext = addCombinator(function (elem) {
                                return elem === checkContext;
                            }, implicitRelative, true),
                            matchAnyContext = addCombinator(function (elem) {
                                return indexOf(checkContext, elem) > -1;
                            }, implicitRelative, true),
                            matchers = [function (elem, context, xml) {
                                var ret = (!leadingRelative && (xml || context !== outermostContext)) || (
                                    (checkContext = context).nodeType ?
                                        matchContext(elem, context, xml) :
                                        matchAnyContext(elem, context, xml));
                                // Avoid hanging onto element (issue #299)
                                checkContext = null;
                                return ret;
                            }];

                        for (; i < len; i++) {
                            if ((matcher = Expr.relative[tokens[i].type])) {
                                matchers = [addCombinator(elementMatcher(matchers), matcher)];
                            } else {
                                matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

                                // Return special upon seeing a positional matcher
                                if (matcher[expando]) {
                                    // Find the next relative operator (if any) for proper handling
                                    j = ++i;
                                    for (; j < len; j++) {
                                        if (Expr.relative[tokens[j].type]) {
                                            break;
                                        }
                                    }
                                    return setMatcher(
                                        i > 1 && elementMatcher(matchers),
                                        i > 1 && toSelector(
                                            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                            tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })
                                        ).replace(rtrim, "$1"),
                                        matcher,
                                        i < j && matcherFromTokens(tokens.slice(i, j)),
                                        j < len && matcherFromTokens((tokens = tokens.slice(j))),
                                        j < len && toSelector(tokens)
                                    );
                                }
                                matchers.push(matcher);
                            }
                        }

                        return elementMatcher(matchers);
                    }

                    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                        var bySet = setMatchers.length > 0,
                            byElement = elementMatchers.length > 0,
                            superMatcher = function (seed, context, xml, results, outermost) {
                                var elem, j, matcher,
                                    matchedCount = 0,
                                    i = "0",
                                    unmatched = seed && [],
                                    setMatched = [],
                                    contextBackup = outermostContext,
                                    // We must always have either seed elements or outermost context
                                    elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                                    // Use integer dirruns iff this is the outermost matcher
                                    dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                                    len = elems.length;

                                if (outermost) {
                                    outermostContext = context === document || context || outermost;
                                }

                                // Add elements passing elementMatchers directly to results
                                // Support: IE<9, Safari
                                // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                                for (; i !== len && (elem = elems[i]) != null; i++) {
                                    if (byElement && elem) {
                                        j = 0;
                                        if (!context && elem.ownerDocument !== document) {
                                            setDocument(elem);
                                            xml = !documentIsHTML;
                                        }
                                        while ((matcher = elementMatchers[j++])) {
                                            if (matcher(elem, context || document, xml)) {
                                                results.push(elem);
                                                break;
                                            }
                                        }
                                        if (outermost) {
                                            dirruns = dirrunsUnique;
                                        }
                                    }

                                    // Track unmatched elements for set filters
                                    if (bySet) {
                                        // They will have gone through all possible matchers
                                        if ((elem = !matcher && elem)) {
                                            matchedCount--;
                                        }

                                        // Lengthen the array for every element, matched or not
                                        if (seed) {
                                            unmatched.push(elem);
                                        }
                                    }
                                }

                                // `i` is now the count of elements visited above, and adding it to `matchedCount`
                                // makes the latter nonnegative.
                                matchedCount += i;

                                // Apply set filters to unmatched elements
                                // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                                // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                                // no element matchers and no seed.
                                // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                                // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                                // numerically zero.
                                if (bySet && i !== matchedCount) {
                                    j = 0;
                                    while ((matcher = setMatchers[j++])) {
                                        matcher(unmatched, setMatched, context, xml);
                                    }

                                    if (seed) {
                                        // Reintegrate element matches to eliminate the need for sorting
                                        if (matchedCount > 0) {
                                            while (i--) {
                                                if (!(unmatched[i] || setMatched[i])) {
                                                    setMatched[i] = pop.call(results);
                                                }
                                            }
                                        }

                                        // Discard index placeholder values to get only actual matches
                                        setMatched = condense(setMatched);
                                    }

                                    // Add matches to results
                                    push.apply(results, setMatched);

                                    // Seedless set matches succeeding multiple successful matchers stipulate sorting
                                    if (outermost && !seed && setMatched.length > 0 &&
                                        (matchedCount + setMatchers.length) > 1) {

                                        Sizzle.uniqueSort(results);
                                    }
                                }

                                // Override manipulation of globals by nested matchers
                                if (outermost) {
                                    dirruns = dirrunsUnique;
                                    outermostContext = contextBackup;
                                }

                                return unmatched;
                            };

                        return bySet ?
                            markFunction(superMatcher) :
                            superMatcher;
                    }

                    compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
                        var i,
                            setMatchers = [],
                            elementMatchers = [],
                            cached = compilerCache[selector + " "];

                        if (!cached) {
                            // Generate a function of recursive functions that can be used to check each element
                            if (!match) {
                                match = tokenize(selector);
                            }
                            i = match.length;
                            while (i--) {
                                cached = matcherFromTokens(match[i]);
                                if (cached[expando]) {
                                    setMatchers.push(cached);
                                } else {
                                    elementMatchers.push(cached);
                                }
                            }

                            // Cache the compiled function
                            cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

                            // Save selector and tokenization
                            cached.selector = selector;
                        }
                        return cached;
                    };

                    /**
                     * A low-level selection function that works with Sizzle's compiled
                     *  selector functions
                     * @param {String|Function} selector A selector or a pre-compiled
                     *  selector function built with Sizzle.compile
                     * @param {Element} context
                     * @param {Array} [results]
                     * @param {Array} [seed] A set of elements to match against
                     */
                    select = Sizzle.select = function (selector, context, results, seed) {
                        var i, tokens, token, type, find,
                            compiled = typeof selector === "function" && selector,
                            match = !seed && tokenize((selector = compiled.selector || selector));

                        results = results || [];

                        // Try to minimize operations if there is only one selector in the list and no seed
                        // (the latter of which guarantees us context)
                        if (match.length === 1) {

                            // Reduce context if the leading compound selector is an ID
                            tokens = match[0] = match[0].slice(0);
                            if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                                context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

                                context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                                if (!context) {
                                    return results;

                                    // Precompiled matchers will still verify ancestry, so step up a level
                                } else if (compiled) {
                                    context = context.parentNode;
                                }

                                selector = selector.slice(tokens.shift().value.length);
                            }

                            // Fetch a seed set for right-to-left matching
                            i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                            while (i--) {
                                token = tokens[i];

                                // Abort if we hit a combinator
                                if (Expr.relative[(type = token.type)]) {
                                    break;
                                }
                                if ((find = Expr.find[type])) {
                                    // Search, expanding context for leading sibling combinators
                                    if ((seed = find(
                                        token.matches[0].replace(runescape, funescape),
                                        rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                                    ))) {

                                        // If seed is empty or no tokens remain, we can return early
                                        tokens.splice(i, 1);
                                        selector = seed.length && toSelector(tokens);
                                        if (!selector) {
                                            push.apply(results, seed);
                                            return results;
                                        }

                                        break;
                                    }
                                }
                            }
                        }

                        // Compile and execute a filtering function if one is not provided
                        // Provide `match` to avoid retokenization if we modified the selector above
                        (compiled || compile(selector, match))(
                            seed,
                            context,
                            !documentIsHTML,
                            results,
                            !context || rsibling.test(selector) && testContext(context.parentNode) || context
                        );
                        return results;
                    };

                    // One-time assignments

                    // Sort stability
                    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

                    // Support: Chrome 14-35+
                    // Always assume duplicates if they aren't passed to the comparison function
                    support.detectDuplicates = !!hasDuplicate;

                    // Initialize against the default document
                    setDocument();

                    // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
                    // Detached nodes confoundingly follow *each other*
                    support.sortDetached = assert(function (el) {
                        // Should return 1, but returns 4 (following)
                        return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
                    });

                    // Support: IE<8
                    // Prevent attribute/property "interpolation"
                    // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
                    if (!assert(function (el) {
                        el.innerHTML = "<a href='#'></a>";
                        return el.firstChild.getAttribute("href") === "#";
                    })) {
                        addHandle("type|href|height|width", function (elem, name, isXML) {
                            if (!isXML) {
                                return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                            }
                        });
                    }

                    // Support: IE<9
                    // Use defaultValue in place of getAttribute("value")
                    if (!support.attributes || !assert(function (el) {
                        el.innerHTML = "<input/>";
                        el.firstChild.setAttribute("value", "");
                        return el.firstChild.getAttribute("value") === "";
                    })) {
                        addHandle("value", function (elem, name, isXML) {
                            if (!isXML && elem.nodeName.toLowerCase() === "input") {
                                return elem.defaultValue;
                            }
                        });
                    }

                    // Support: IE<9
                    // Use getAttributeNode to fetch booleans when getAttribute lies
                    if (!assert(function (el) {
                        return el.getAttribute("disabled") == null;
                    })) {
                        addHandle(booleans, function (elem, name, isXML) {
                            var val;
                            if (!isXML) {
                                return elem[name] === true ? name.toLowerCase() :
                                    (val = elem.getAttributeNode(name)) && val.specified ?
                                        val.value :
                                        null;
                            }
                        });
                    }

                    return Sizzle;

                })(window);



            jQuery.find = Sizzle;
            jQuery.expr = Sizzle.selectors;

            // Deprecated
            jQuery.expr[":"] = jQuery.expr.pseudos;
            jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
            jQuery.text = Sizzle.getText;
            jQuery.isXMLDoc = Sizzle.isXML;
            jQuery.contains = Sizzle.contains;
            jQuery.escapeSelector = Sizzle.escape;




            var dir = function (elem, dir, until) {
                var matched = [],
                    truncate = until !== undefined;

                while ((elem = elem[dir]) && elem.nodeType !== 9) {
                    if (elem.nodeType === 1) {
                        if (truncate && jQuery(elem).is(until)) {
                            break;
                        }
                        matched.push(elem);
                    }
                }
                return matched;
            };


            var siblings = function (n, elem) {
                var matched = [];

                for (; n; n = n.nextSibling) {
                    if (n.nodeType === 1 && n !== elem) {
                        matched.push(n);
                    }
                }

                return matched;
            };


            var rneedsContext = jQuery.expr.match.needsContext;



            function nodeName(elem, name) {

                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

            };
            var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);



            // Implement the identical functionality for filter and not
            function winnow(elements, qualifier, not) {
                if (isFunction(qualifier)) {
                    return jQuery.grep(elements, function (elem, i) {
                        return !!qualifier.call(elem, i, elem) !== not;
                    });
                }

                // Single element
                if (qualifier.nodeType) {
                    return jQuery.grep(elements, function (elem) {
                        return (elem === qualifier) !== not;
                    });
                }

                // Arraylike of elements (jQuery, arguments, Array)
                if (typeof qualifier !== "string") {
                    return jQuery.grep(elements, function (elem) {
                        return (indexOf.call(qualifier, elem) > -1) !== not;
                    });
                }

                // Filtered directly for both simple and complex selectors
                return jQuery.filter(qualifier, elements, not);
            }

            jQuery.filter = function (expr, elems, not) {
                var elem = elems[0];

                if (not) {
                    expr = ":not(" + expr + ")";
                }

                if (elems.length === 1 && elem.nodeType === 1) {
                    return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
                }

                return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
                    return elem.nodeType === 1;
                }));
            };

            jQuery.fn.extend({
                find: function (selector) {
                    var i, ret,
                        len = this.length,
                        self = this;

                    if (typeof selector !== "string") {
                        return this.pushStack(jQuery(selector).filter(function () {
                            for (i = 0; i < len; i++) {
                                if (jQuery.contains(self[i], this)) {
                                    return true;
                                }
                            }
                        }));
                    }

                    ret = this.pushStack([]);

                    for (i = 0; i < len; i++) {
                        jQuery.find(selector, self[i], ret);
                    }

                    return len > 1 ? jQuery.uniqueSort(ret) : ret;
                },
                filter: function (selector) {
                    return this.pushStack(winnow(this, selector || [], false));
                },
                not: function (selector) {
                    return this.pushStack(winnow(this, selector || [], true));
                },
                is: function (selector) {
                    return !!winnow(
                        this,

                        // If this is a positional/relative selector, check membership in the returned set
                        // so $("p:first").is("p:last") won't return true for a doc with two "p".
                        typeof selector === "string" && rneedsContext.test(selector) ?
                            jQuery(selector) :
                            selector || [],
                        false
                    ).length;
                }
            });


            // Initialize a jQuery object


            // A central reference to the root jQuery(document)
            var rootjQuery,

                // A simple way to check for HTML strings
                // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
                // Strict HTML recognition (#11290: must start with <)
                // Shortcut simple #id case for speed
                rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

                init = jQuery.fn.init = function (selector, context, root) {
                    var match, elem;

                    // HANDLE: $(""), $(null), $(undefined), $(false)
                    if (!selector) {
                        return this;
                    }

                    // Method init() accepts an alternate rootjQuery
                    // so migrate can support jQuery.sub (gh-2101)
                    root = root || rootjQuery;

                    // Handle HTML strings
                    if (typeof selector === "string") {
                        if (selector[0] === "<" &&
                            selector[selector.length - 1] === ">" &&
                            selector.length >= 3) {

                            // Assume that strings that start and end with <> are HTML and skip the regex check
                            match = [null, selector, null];

                        } else {
                            match = rquickExpr.exec(selector);
                        }

                        // Match html or make sure no context is specified for #id
                        if (match && (match[1] || !context)) {

                            // HANDLE: $(html) -> $(array)
                            if (match[1]) {
                                context = context instanceof jQuery ? context[0] : context;

                                // Option to run scripts is true for back-compat
                                // Intentionally let the error be thrown if parseHTML is not present
                                jQuery.merge(this, jQuery.parseHTML(
                                    match[1],
                                    context && context.nodeType ? context.ownerDocument || context : document,
                                    true
                                ));

                                // HANDLE: $(html, props)
                                if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                                    for (match in context) {

                                        // Properties of context are called as methods if possible
                                        if (isFunction(this[match])) {
                                            this[match](context[match]);

                                            // ...and otherwise set as attributes
                                        } else {
                                            this.attr(match, context[match]);
                                        }
                                    }
                                }

                                return this;

                                // HANDLE: $(#id)
                            } else {
                                elem = document.getElementById(match[2]);

                                if (elem) {

                                    // Inject the element directly into the jQuery object
                                    this[0] = elem;
                                    this.length = 1;
                                }
                                return this;
                            }

                            // HANDLE: $(expr, $(...))
                        } else if (!context || context.jquery) {
                            return (context || root).find(selector);

                            // HANDLE: $(expr, context)
                            // (which is just equivalent to: $(context).find(expr)
                        } else {
                            return this.constructor(context).find(selector);
                        }

                        // HANDLE: $(DOMElement)
                    } else if (selector.nodeType) {
                        this[0] = selector;
                        this.length = 1;
                        return this;

                        // HANDLE: $(function)
                        // Shortcut for document ready
                    } else if (isFunction(selector)) {
                        return root.ready !== undefined ?
                            root.ready(selector) :

                            // Execute immediately if ready is not present
                            selector(jQuery);
                    }

                    return jQuery.makeArray(selector, this);
                };

            // Give the init function the jQuery prototype for later instantiation
            init.prototype = jQuery.fn;

            // Initialize central reference
            rootjQuery = jQuery(document);


            var rparentsprev = /^(?:parents|prev(?:Until|All))/,

                // Methods guaranteed to produce a unique set when starting from a unique set
                guaranteedUnique = {
                    children: true,
                    contents: true,
                    next: true,
                    prev: true
                };

            jQuery.fn.extend({
                has: function (target) {
                    var targets = jQuery(target, this),
                        l = targets.length;

                    return this.filter(function () {
                        var i = 0;
                        for (; i < l; i++) {
                            if (jQuery.contains(this, targets[i])) {
                                return true;
                            }
                        }
                    });
                },

                closest: function (selectors, context) {
                    var cur,
                        i = 0,
                        l = this.length,
                        matched = [],
                        targets = typeof selectors !== "string" && jQuery(selectors);

                    // Positional selectors never match, since there's no _selection_ context
                    if (!rneedsContext.test(selectors)) {
                        for (; i < l; i++) {
                            for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

                                // Always skip document fragments
                                if (cur.nodeType < 11 && (targets ?
                                    targets.index(cur) > -1 :

                                    // Don't pass non-elements to Sizzle
                                    cur.nodeType === 1 &&
                                    jQuery.find.matchesSelector(cur, selectors))) {

                                    matched.push(cur);
                                    break;
                                }
                            }
                        }
                    }

                    return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
                },

                // Determine the position of an element within the set
                index: function (elem) {

                    // No argument, return index in parent
                    if (!elem) {
                        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
                    }

                    // Index in selector
                    if (typeof elem === "string") {
                        return indexOf.call(jQuery(elem), this[0]);
                    }

                    // Locate the position of the desired element
                    return indexOf.call(this,

                        // If it receives a jQuery object, the first element is used
                        elem.jquery ? elem[0] : elem
                    );
                },

                add: function (selector, context) {
                    return this.pushStack(
                        jQuery.uniqueSort(
                            jQuery.merge(this.get(), jQuery(selector, context))
                        )
                    );
                },

                addBack: function (selector) {
                    return this.add(selector == null ?
                        this.prevObject : this.prevObject.filter(selector)
                    );
                }
            });

            function sibling(cur, dir) {
                while ((cur = cur[dir]) && cur.nodeType !== 1) { }
                return cur;
            }

            jQuery.each({
                parent: function (elem) {
                    var parent = elem.parentNode;
                    return parent && parent.nodeType !== 11 ? parent : null;
                },
                parents: function (elem) {
                    return dir(elem, "parentNode");
                },
                parentsUntil: function (elem, i, until) {
                    return dir(elem, "parentNode", until);
                },
                next: function (elem) {
                    return sibling(elem, "nextSibling");
                },
                prev: function (elem) {
                    return sibling(elem, "previousSibling");
                },
                nextAll: function (elem) {
                    return dir(elem, "nextSibling");
                },
                prevAll: function (elem) {
                    return dir(elem, "previousSibling");
                },
                nextUntil: function (elem, i, until) {
                    return dir(elem, "nextSibling", until);
                },
                prevUntil: function (elem, i, until) {
                    return dir(elem, "previousSibling", until);
                },
                siblings: function (elem) {
                    return siblings((elem.parentNode || {}).firstChild, elem);
                },
                children: function (elem) {
                    return siblings(elem.firstChild);
                },
                contents: function (elem) {
                    if (typeof elem.contentDocument !== "undefined") {
                        return elem.contentDocument;
                    }

                    // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
                    // Treat the template element as a regular one in browsers that
                    // don't support it.
                    if (nodeName(elem, "template")) {
                        elem = elem.content || elem;
                    }

                    return jQuery.merge([], elem.childNodes);
                }
            }, function (name, fn) {
                jQuery.fn[name] = function (until, selector) {
                    var matched = jQuery.map(this, fn, until);

                    if (name.slice(-5) !== "Until") {
                        selector = until;
                    }

                    if (selector && typeof selector === "string") {
                        matched = jQuery.filter(selector, matched);
                    }

                    if (this.length > 1) {

                        // Remove duplicates
                        if (!guaranteedUnique[name]) {
                            jQuery.uniqueSort(matched);
                        }

                        // Reverse order for parents* and prev-derivatives
                        if (rparentsprev.test(name)) {
                            matched.reverse();
                        }
                    }

                    return this.pushStack(matched);
                };
            });
            var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);



            // Convert String-formatted options into Object-formatted ones
            function createOptions(options) {
                var object = {};
                jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
                    object[flag] = true;
                });
                return object;
            }

            /*
             * Create a callback list using the following parameters:
             *
             *	options: an optional list of space-separated options that will change how
             *			the callback list behaves or a more traditional option object
             *
             * By default a callback list will act like an event callback list and can be
             * "fired" multiple times.
             *
             * Possible options:
             *
             *	once:			will ensure the callback list can only be fired once (like a Deferred)
             *
             *	memory:			will keep track of previous values and will call any callback added
             *					after the list has been fired right away with the latest "memorized"
             *					values (like a Deferred)
             *
             *	unique:			will ensure a callback can only be added once (no duplicate in the list)
             *
             *	stopOnFalse:	interrupt callings when a callback returns false
             *
             */
            jQuery.Callbacks = function (options) {

                // Convert options from String-formatted to Object-formatted if needed
                // (we check in cache first)
                options = typeof options === "string" ?
                    createOptions(options) :
                    jQuery.extend({}, options);

                var // Flag to know if list is currently firing
                    firing,

                    // Last fire value for non-forgettable lists
                    memory,

                    // Flag to know if list was already fired
                    fired,

                    // Flag to prevent firing
                    locked,

                    // Actual callback list
                    list = [],

                    // Queue of execution data for repeatable lists
                    queue = [],

                    // Index of currently firing callback (modified by add/remove as needed)
                    firingIndex = -1,

                    // Fire callbacks
                    fire = function () {

                        // Enforce single-firing
                        locked = locked || options.once;

                        // Execute callbacks for all pending executions,
                        // respecting firingIndex overrides and runtime changes
                        fired = firing = true;
                        for (; queue.length; firingIndex = -1) {
                            memory = queue.shift();
                            while (++firingIndex < list.length) {

                                // Run callback and check for early termination
                                if (list[firingIndex].apply(memory[0], memory[1]) === false &&
                                    options.stopOnFalse) {

                                    // Jump to end and forget the data so .add doesn't re-fire
                                    firingIndex = list.length;
                                    memory = false;
                                }
                            }
                        }

                        // Forget the data if we're done with it
                        if (!options.memory) {
                            memory = false;
                        }

                        firing = false;

                        // Clean up if we're done firing for good
                        if (locked) {

                            // Keep an empty list if we have data for future add calls
                            if (memory) {
                                list = [];

                                // Otherwise, this object is spent
                            } else {
                                list = "";
                            }
                        }
                    },

                    // Actual Callbacks object
                    self = {

                        // Add a callback or a collection of callbacks to the list
                        add: function () {
                            if (list) {

                                // If we have memory from a past run, we should fire after adding
                                if (memory && !firing) {
                                    firingIndex = list.length - 1;
                                    queue.push(memory);
                                }

                                (function add(args) {
                                    jQuery.each(args, function (_, arg) {
                                        if (isFunction(arg)) {
                                            if (!options.unique || !self.has(arg)) {
                                                list.push(arg);
                                            }
                                        } else if (arg && arg.length && toType(arg) !== "string") {

                                            // Inspect recursively
                                            add(arg);
                                        }
                                    });
                                })(arguments);

                                if (memory && !firing) {
                                    fire();
                                }
                            }
                            return this;
                        },

                        // Remove a callback from the list
                        remove: function () {
                            jQuery.each(arguments, function (_, arg) {
                                var index;
                                while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                    list.splice(index, 1);

                                    // Handle firing indexes
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            });
                            return this;
                        },

                        // Check if a given callback is in the list.
                        // If no argument is given, return whether or not list has callbacks attached.
                        has: function (fn) {
                            return fn ?
                                jQuery.inArray(fn, list) > -1 :
                                list.length > 0;
                        },

                        // Remove all callbacks from the list
                        empty: function () {
                            if (list) {
                                list = [];
                            }
                            return this;
                        },

                        // Disable .fire and .add
                        // Abort any current/pending executions
                        // Clear all callbacks and values
                        disable: function () {
                            locked = queue = [];
                            list = memory = "";
                            return this;
                        },
                        disabled: function () {
                            return !list;
                        },

                        // Disable .fire
                        // Also disable .add unless we have memory (since it would have no effect)
                        // Abort any pending executions
                        lock: function () {
                            locked = queue = [];
                            if (!memory && !firing) {
                                list = memory = "";
                            }
                            return this;
                        },
                        locked: function () {
                            return !!locked;
                        },

                        // Call all callbacks with the given context and arguments
                        fireWith: function (context, args) {
                            if (!locked) {
                                args = args || [];
                                args = [context, args.slice ? args.slice() : args];
                                queue.push(args);
                                if (!firing) {
                                    fire();
                                }
                            }
                            return this;
                        },

                        // Call all the callbacks with the given arguments
                        fire: function () {
                            self.fireWith(this, arguments);
                            return this;
                        },

                        // To know if the callbacks have already been called at least once
                        fired: function () {
                            return !!fired;
                        }
                    };

                return self;
            };


            function Identity(v) {
                return v;
            }
            function Thrower(ex) {
                throw ex;
            }

            function adoptValue(value, resolve, reject, noValue) {
                var method;

                try {

                    // Check for promise aspect first to privilege synchronous behavior
                    if (value && isFunction((method = value.promise))) {
                        method.call(value).done(resolve).fail(reject);

                        // Other thenables
                    } else if (value && isFunction((method = value.then))) {
                        method.call(value, resolve, reject);

                        // Other non-thenables
                    } else {

                        // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
                        // * false: [ value ].slice( 0 ) => resolve( value )
                        // * true: [ value ].slice( 1 ) => resolve()
                        resolve.apply(undefined, [value].slice(noValue));
                    }

                    // For Promises/A+, convert exceptions into rejections
                    // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
                    // Deferred#then to conditionally suppress rejection.
                } catch (value) {

                    // Support: Android 4.0 only
                    // Strict mode functions invoked without .call/.apply get global-object context
                    reject.apply(undefined, [value]);
                }
            }

            jQuery.extend({

                Deferred: function (func) {
                    var tuples = [

                        // action, add listener, callbacks,
                        // ... .then handlers, argument index, [final state]
                        ["notify", "progress", jQuery.Callbacks("memory"),
                            jQuery.Callbacks("memory"), 2],
                        ["resolve", "done", jQuery.Callbacks("once memory"),
                            jQuery.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", jQuery.Callbacks("once memory"),
                            jQuery.Callbacks("once memory"), 1, "rejected"]
                    ],
                        state = "pending",
                        promise = {
                            state: function () {
                                return state;
                            },
                            always: function () {
                                deferred.done(arguments).fail(arguments);
                                return this;
                            },
                            "catch": function (fn) {
                                return promise.then(null, fn);
                            },

                            // Keep pipe for back-compat
                            pipe: function ( /* fnDone, fnFail, fnProgress */) {
                                var fns = arguments;

                                return jQuery.Deferred(function (newDefer) {
                                    jQuery.each(tuples, function (i, tuple) {

                                        // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                                        var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];

                                        // deferred.progress(function() { bind to newDefer or newDefer.notify })
                                        // deferred.done(function() { bind to newDefer or newDefer.resolve })
                                        // deferred.fail(function() { bind to newDefer or newDefer.reject })
                                        deferred[tuple[1]](function () {
                                            var returned = fn && fn.apply(this, arguments);
                                            if (returned && isFunction(returned.promise)) {
                                                returned.promise()
                                                    .progress(newDefer.notify)
                                                    .done(newDefer.resolve)
                                                    .fail(newDefer.reject);
                                            } else {
                                                newDefer[tuple[0] + "With"](
                                                    this,
                                                    fn ? [returned] : arguments
                                                );
                                            }
                                        });
                                    });
                                    fns = null;
                                }).promise();
                            },
                            then: function (onFulfilled, onRejected, onProgress) {
                                var maxDepth = 0;
                                function resolve(depth, deferred, handler, special) {
                                    return function () {
                                        var that = this,
                                            args = arguments,
                                            mightThrow = function () {
                                                var returned, then;

                                                // Support: Promises/A+ section 2.3.3.3.3
                                                // https://promisesaplus.com/#point-59
                                                // Ignore double-resolution attempts
                                                if (depth < maxDepth) {
                                                    return;
                                                }

                                                returned = handler.apply(that, args);

                                                // Support: Promises/A+ section 2.3.1
                                                // https://promisesaplus.com/#point-48
                                                if (returned === deferred.promise()) {
                                                    throw new TypeError("Thenable self-resolution");
                                                }

                                                // Support: Promises/A+ sections 2.3.3.1, 3.5
                                                // https://promisesaplus.com/#point-54
                                                // https://promisesaplus.com/#point-75
                                                // Retrieve `then` only once
                                                then = returned &&

                                                    // Support: Promises/A+ section 2.3.4
                                                    // https://promisesaplus.com/#point-64
                                                    // Only check objects and functions for thenability
                                                    (typeof returned === "object" ||
                                                        typeof returned === "function") &&
                                                    returned.then;

                                                // Handle a returned thenable
                                                if (isFunction(then)) {

                                                    // Special processors (notify) just wait for resolution
                                                    if (special) {
                                                        then.call(
                                                            returned,
                                                            resolve(maxDepth, deferred, Identity, special),
                                                            resolve(maxDepth, deferred, Thrower, special)
                                                        );

                                                        // Normal processors (resolve) also hook into progress
                                                    } else {

                                                        // ...and disregard older resolution values
                                                        maxDepth++;

                                                        then.call(
                                                            returned,
                                                            resolve(maxDepth, deferred, Identity, special),
                                                            resolve(maxDepth, deferred, Thrower, special),
                                                            resolve(maxDepth, deferred, Identity,
                                                                deferred.notifyWith)
                                                        );
                                                    }

                                                    // Handle all other returned values
                                                } else {

                                                    // Only substitute handlers pass on context
                                                    // and multiple values (non-spec behavior)
                                                    if (handler !== Identity) {
                                                        that = undefined;
                                                        args = [returned];
                                                    }

                                                    // Process the value(s)
                                                    // Default process is resolve
                                                    (special || deferred.resolveWith)(that, args);
                                                }
                                            },

                                            // Only normal processors (resolve) catch and reject exceptions
                                            process = special ?
                                                mightThrow :
                                                function () {
                                                    try {
                                                        mightThrow();
                                                    } catch (e) {

                                                        if (jQuery.Deferred.exceptionHook) {
                                                            jQuery.Deferred.exceptionHook(e,
                                                                process.stackTrace);
                                                        }

                                                        // Support: Promises/A+ section 2.3.3.3.4.1
                                                        // https://promisesaplus.com/#point-61
                                                        // Ignore post-resolution exceptions
                                                        if (depth + 1 >= maxDepth) {

                                                            // Only substitute handlers pass on context
                                                            // and multiple values (non-spec behavior)
                                                            if (handler !== Thrower) {
                                                                that = undefined;
                                                                args = [e];
                                                            }

                                                            deferred.rejectWith(that, args);
                                                        }
                                                    }
                                                };

                                        // Support: Promises/A+ section 2.3.3.3.1
                                        // https://promisesaplus.com/#point-57
                                        // Re-resolve promises immediately to dodge false rejection from
                                        // subsequent errors
                                        if (depth) {
                                            process();
                                        } else {

                                            // Call an optional hook to record the stack, in case of exception
                                            // since it's otherwise lost when execution goes async
                                            if (jQuery.Deferred.getStackHook) {
                                                process.stackTrace = jQuery.Deferred.getStackHook();
                                            }
                                            window.setTimeout(process);
                                        }
                                    };
                                }

                                return jQuery.Deferred(function (newDefer) {

                                    // progress_handlers.add( ... )
                                    tuples[0][3].add(
                                        resolve(
                                            0,
                                            newDefer,
                                            isFunction(onProgress) ?
                                                onProgress :
                                                Identity,
                                            newDefer.notifyWith
                                        )
                                    );

                                    // fulfilled_handlers.add( ... )
                                    tuples[1][3].add(
                                        resolve(
                                            0,
                                            newDefer,
                                            isFunction(onFulfilled) ?
                                                onFulfilled :
                                                Identity
                                        )
                                    );

                                    // rejected_handlers.add( ... )
                                    tuples[2][3].add(
                                        resolve(
                                            0,
                                            newDefer,
                                            isFunction(onRejected) ?
                                                onRejected :
                                                Thrower
                                        )
                                    );
                                }).promise();
                            },

                            // Get a promise for this deferred
                            // If obj is provided, the promise aspect is added to the object
                            promise: function (obj) {
                                return obj != null ? jQuery.extend(obj, promise) : promise;
                            }
                        },
                        deferred = {};

                    // Add list-specific methods
                    jQuery.each(tuples, function (i, tuple) {
                        var list = tuple[2],
                            stateString = tuple[5];

                        // promise.progress = list.add
                        // promise.done = list.add
                        // promise.fail = list.add
                        promise[tuple[1]] = list.add;

                        // Handle state
                        if (stateString) {
                            list.add(
                                function () {

                                    // state = "resolved" (i.e., fulfilled)
                                    // state = "rejected"
                                    state = stateString;
                                },

                                // rejected_callbacks.disable
                                // fulfilled_callbacks.disable
                                tuples[3 - i][2].disable,

                                // rejected_handlers.disable
                                // fulfilled_handlers.disable
                                tuples[3 - i][3].disable,

                                // progress_callbacks.lock
                                tuples[0][2].lock,

                                // progress_handlers.lock
                                tuples[0][3].lock
                            );
                        }

                        // progress_handlers.fire
                        // fulfilled_handlers.fire
                        // rejected_handlers.fire
                        list.add(tuple[3].fire);

                        // deferred.notify = function() { deferred.notifyWith(...) }
                        // deferred.resolve = function() { deferred.resolveWith(...) }
                        // deferred.reject = function() { deferred.rejectWith(...) }
                        deferred[tuple[0]] = function () {
                            deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
                            return this;
                        };

                        // deferred.notifyWith = list.fireWith
                        // deferred.resolveWith = list.fireWith
                        // deferred.rejectWith = list.fireWith
                        deferred[tuple[0] + "With"] = list.fireWith;
                    });

                    // Make the deferred a promise
                    promise.promise(deferred);

                    // Call given func if any
                    if (func) {
                        func.call(deferred, deferred);
                    }

                    // All done!
                    return deferred;
                },

                // Deferred helper
                when: function (singleValue) {
                    var

                        // count of uncompleted subordinates
                        remaining = arguments.length,

                        // count of unprocessed arguments
                        i = remaining,

                        // subordinate fulfillment data
                        resolveContexts = Array(i),
                        resolveValues = slice.call(arguments),

                        // the master Deferred
                        master = jQuery.Deferred(),

                        // subordinate callback factory
                        updateFunc = function (i) {
                            return function (value) {
                                resolveContexts[i] = this;
                                resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
                                if (!(--remaining)) {
                                    master.resolveWith(resolveContexts, resolveValues);
                                }
                            };
                        };

                    // Single- and empty arguments are adopted like Promise.resolve
                    if (remaining <= 1) {
                        adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject,
                            !remaining);

                        // Use .then() to unwrap secondary thenables (cf. gh-3000)
                        if (master.state() === "pending" ||
                            isFunction(resolveValues[i] && resolveValues[i].then)) {

                            return master.then();
                        }
                    }

                    // Multiple arguments are aggregated like Promise.all array elements
                    while (i--) {
                        adoptValue(resolveValues[i], updateFunc(i), master.reject);
                    }

                    return master.promise();
                }
            });


            // These usually indicate a programmer mistake during development,
            // warn about them ASAP rather than swallowing them by default.
            var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

            jQuery.Deferred.exceptionHook = function (error, stack) {

                // Support: IE 8 - 9 only
                // Console exists when dev tools are open, which can happen at any time
                if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
                    window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
                }
            };




            jQuery.readyException = function (error) {
                window.setTimeout(function () {
                    throw error;
                });
            };




            // The deferred used on DOM ready
            var readyList = jQuery.Deferred();

            jQuery.fn.ready = function (fn) {

                readyList
                    .then(fn)

                    // Wrap jQuery.readyException in a function so that the lookup
                    // happens at the time of error handling instead of callback
                    // registration.
                    .catch(function (error) {
                        jQuery.readyException(error);
                    });

                return this;
            };

            jQuery.extend({

                // Is the DOM ready to be used? Set to true once it occurs.
                isReady: false,

                // A counter to track how many items to wait for before
                // the ready event fires. See #6781
                readyWait: 1,

                // Handle when the DOM is ready
                ready: function (wait) {

                    // Abort if there are pending holds or we're already ready
                    if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                        return;
                    }

                    // Remember that the DOM is ready
                    jQuery.isReady = true;

                    // If a normal DOM Ready event fired, decrement, and wait if need be
                    if (wait !== true && --jQuery.readyWait > 0) {
                        return;
                    }

                    // If there are functions bound, to execute
                    readyList.resolveWith(document, [jQuery]);
                }
            });

            jQuery.ready.then = readyList.then;

            // The ready event handler and self cleanup method
            function completed() {
                document.removeEventListener("DOMContentLoaded", completed);
                window.removeEventListener("load", completed);
                jQuery.ready();
            }

            // Catch cases where $(document).ready() is called
            // after the browser event has already occurred.
            // Support: IE <=9 - 10 only
            // Older IE sometimes signals "interactive" too soon
            if (document.readyState === "complete" ||
                (document.readyState !== "loading" && !document.documentElement.doScroll)) {

                // Handle it asynchronously to allow scripts the opportunity to delay ready
                window.setTimeout(jQuery.ready);

            } else {

                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", completed);

                // A fallback to window.onload, that will always work
                window.addEventListener("load", completed);
            }




            // Multifunctional method to get and set values of a collection
            // The value/s can optionally be executed if it's a function
            var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
                var i = 0,
                    len = elems.length,
                    bulk = key == null;

                // Sets many values
                if (toType(key) === "object") {
                    chainable = true;
                    for (i in key) {
                        access(elems, fn, i, key[i], true, emptyGet, raw);
                    }

                    // Sets one value
                } else if (value !== undefined) {
                    chainable = true;

                    if (!isFunction(value)) {
                        raw = true;
                    }

                    if (bulk) {

                        // Bulk operations run against the entire set
                        if (raw) {
                            fn.call(elems, value);
                            fn = null;

                            // ...except when executing function values
                        } else {
                            bulk = fn;
                            fn = function (elem, key, value) {
                                return bulk.call(jQuery(elem), value);
                            };
                        }
                    }

                    if (fn) {
                        for (; i < len; i++) {
                            fn(
                                elems[i], key, raw ?
                                value :
                                value.call(elems[i], i, fn(elems[i], key))
                            );
                        }
                    }
                }

                if (chainable) {
                    return elems;
                }

                // Gets
                if (bulk) {
                    return fn.call(elems);
                }

                return len ? fn(elems[0], key) : emptyGet;
            };


            // Matches dashed string for camelizing
            var rmsPrefix = /^-ms-/,
                rdashAlpha = /-([a-z])/g;

            // Used by camelCase as callback to replace()
            function fcamelCase(all, letter) {
                return letter.toUpperCase();
            }

            // Convert dashed to camelCase; used by the css and data modules
            // Support: IE <=9 - 11, Edge 12 - 15
            // Microsoft forgot to hump their vendor prefix (#9572)
            function camelCase(string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
            }
            var acceptData = function (owner) {

                // Accepts only:
                //  - Node
                //    - Node.ELEMENT_NODE
                //    - Node.DOCUMENT_NODE
                //  - Object
                //    - Any
                return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
            };




            function Data() {
                this.expando = jQuery.expando + Data.uid++;
            }

            Data.uid = 1;

            Data.prototype = {

                cache: function (owner) {

                    // Check if the owner object already has a cache
                    var value = owner[this.expando];

                    // If not, create one
                    if (!value) {
                        value = {};

                        // We can accept data for non-element nodes in modern browsers,
                        // but we should not, see #8335.
                        // Always return an empty object.
                        if (acceptData(owner)) {

                            // If it is a node unlikely to be stringify-ed or looped over
                            // use plain assignment
                            if (owner.nodeType) {
                                owner[this.expando] = value;

                                // Otherwise secure it in a non-enumerable property
                                // configurable must be true to allow the property to be
                                // deleted when data is removed
                            } else {
                                Object.defineProperty(owner, this.expando, {
                                    value: value,
                                    configurable: true
                                });
                            }
                        }
                    }

                    return value;
                },
                set: function (owner, data, value) {
                    var prop,
                        cache = this.cache(owner);

                    // Handle: [ owner, key, value ] args
                    // Always use camelCase key (gh-2257)
                    if (typeof data === "string") {
                        cache[camelCase(data)] = value;

                        // Handle: [ owner, { properties } ] args
                    } else {

                        // Copy the properties one-by-one to the cache object
                        for (prop in data) {
                            cache[camelCase(prop)] = data[prop];
                        }
                    }
                    return cache;
                },
                get: function (owner, key) {
                    return key === undefined ?
                        this.cache(owner) :

                        // Always use camelCase key (gh-2257)
                        owner[this.expando] && owner[this.expando][camelCase(key)];
                },
                access: function (owner, key, value) {

                    // In cases where either:
                    //
                    //   1. No key was specified
                    //   2. A string key was specified, but no value provided
                    //
                    // Take the "read" path and allow the get method to determine
                    // which value to return, respectively either:
                    //
                    //   1. The entire cache object
                    //   2. The data stored at the key
                    //
                    if (key === undefined ||
                        ((key && typeof key === "string") && value === undefined)) {

                        return this.get(owner, key);
                    }

                    // When the key is not a string, or both a key and value
                    // are specified, set or extend (existing objects) with either:
                    //
                    //   1. An object of properties
                    //   2. A key and value
                    //
                    this.set(owner, key, value);

                    // Since the "set" path can have two possible entry points
                    // return the expected data based on which path was taken[*]
                    return value !== undefined ? value : key;
                },
                remove: function (owner, key) {
                    var i,
                        cache = owner[this.expando];

                    if (cache === undefined) {
                        return;
                    }

                    if (key !== undefined) {

                        // Support array or space separated string of keys
                        if (Array.isArray(key)) {

                            // If key is an array of keys...
                            // We always set camelCase keys, so remove that.
                            key = key.map(camelCase);
                        } else {
                            key = camelCase(key);

                            // If a key with the spaces exists, use it.
                            // Otherwise, create an array by matching non-whitespace
                            key = key in cache ?
                                [key] :
                                (key.match(rnothtmlwhite) || []);
                        }

                        i = key.length;

                        while (i--) {
                            delete cache[key[i]];
                        }
                    }

                    // Remove the expando if there's no more data
                    if (key === undefined || jQuery.isEmptyObject(cache)) {

                        // Support: Chrome <=35 - 45
                        // Webkit & Blink performance suffers when deleting properties
                        // from DOM nodes, so set to undefined instead
                        // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                        if (owner.nodeType) {
                            owner[this.expando] = undefined;
                        } else {
                            delete owner[this.expando];
                        }
                    }
                },
                hasData: function (owner) {
                    var cache = owner[this.expando];
                    return cache !== undefined && !jQuery.isEmptyObject(cache);
                }
            };
            var dataPriv = new Data();

            var dataUser = new Data();



            //	Implementation Summary
            //
            //	1. Enforce API surface and semantic compatibility with 1.9.x branch
            //	2. Improve the module's maintainability by reducing the storage
            //		paths to a single mechanism.
            //	3. Use the same single mechanism to support "private" and "user" data.
            //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
            //	5. Avoid exposing implementation details on user objects (eg. expando properties)
            //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

            var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                rmultiDash = /[A-Z]/g;

            function getData(data) {
                if (data === "true") {
                    return true;
                }

                if (data === "false") {
                    return false;
                }

                if (data === "null") {
                    return null;
                }

                // Only convert to a number if it doesn't change the string
                if (data === +data + "") {
                    return +data;
                }

                if (rbrace.test(data)) {
                    return JSON.parse(data);
                }

                return data;
            }

            function dataAttr(elem, key, data) {
                var name;

                // If nothing was found internally, try to fetch any
                // data from the HTML5 data-* attribute
                if (data === undefined && elem.nodeType === 1) {
                    name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
                    data = elem.getAttribute(name);

                    if (typeof data === "string") {
                        try {
                            data = getData(data);
                        } catch (e) { }

                        // Make sure we set the data so it isn't changed later
                        dataUser.set(elem, key, data);
                    } else {
                        data = undefined;
                    }
                }
                return data;
            }

            jQuery.extend({
                hasData: function (elem) {
                    return dataUser.hasData(elem) || dataPriv.hasData(elem);
                },

                data: function (elem, name, data) {
                    return dataUser.access(elem, name, data);
                },

                removeData: function (elem, name) {
                    dataUser.remove(elem, name);
                },

                // TODO: Now that all calls to _data and _removeData have been replaced
                // with direct calls to dataPriv methods, these can be deprecated.
                _data: function (elem, name, data) {
                    return dataPriv.access(elem, name, data);
                },

                _removeData: function (elem, name) {
                    dataPriv.remove(elem, name);
                }
            });

            jQuery.fn.extend({
                data: function (key, value) {
                    var i, name, data,
                        elem = this[0],
                        attrs = elem && elem.attributes;

                    // Gets all values
                    if (key === undefined) {
                        if (this.length) {
                            data = dataUser.get(elem);

                            if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                                i = attrs.length;
                                while (i--) {

                                    // Support: IE 11 only
                                    // The attrs elements can be null (#14894)
                                    if (attrs[i]) {
                                        name = attrs[i].name;
                                        if (name.indexOf("data-") === 0) {
                                            name = camelCase(name.slice(5));
                                            dataAttr(elem, name, data[name]);
                                        }
                                    }
                                }
                                dataPriv.set(elem, "hasDataAttrs", true);
                            }
                        }

                        return data;
                    }

                    // Sets multiple values
                    if (typeof key === "object") {
                        return this.each(function () {
                            dataUser.set(this, key);
                        });
                    }

                    return access(this, function (value) {
                        var data;

                        // The calling jQuery object (element matches) is not empty
                        // (and therefore has an element appears at this[ 0 ]) and the
                        // `value` parameter was not undefined. An empty jQuery object
                        // will result in `undefined` for elem = this[ 0 ] which will
                        // throw an exception if an attempt to read a data cache is made.
                        if (elem && value === undefined) {

                            // Attempt to get data from the cache
                            // The key will always be camelCased in Data
                            data = dataUser.get(elem, key);
                            if (data !== undefined) {
                                return data;
                            }

                            // Attempt to "discover" the data in
                            // HTML5 custom data-* attrs
                            data = dataAttr(elem, key);
                            if (data !== undefined) {
                                return data;
                            }

                            // We tried really hard, but the data doesn't exist.
                            return;
                        }

                        // Set the data...
                        this.each(function () {

                            // We always store the camelCased key
                            dataUser.set(this, key, value);
                        });
                    }, null, value, arguments.length > 1, null, true);
                },

                removeData: function (key) {
                    return this.each(function () {
                        dataUser.remove(this, key);
                    });
                }
            });


            jQuery.extend({
                queue: function (elem, type, data) {
                    var queue;

                    if (elem) {
                        type = (type || "fx") + "queue";
                        queue = dataPriv.get(elem, type);

                        // Speed up dequeue by getting out quickly if this is just a lookup
                        if (data) {
                            if (!queue || Array.isArray(data)) {
                                queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                            } else {
                                queue.push(data);
                            }
                        }
                        return queue || [];
                    }
                },

                dequeue: function (elem, type) {
                    type = type || "fx";

                    var queue = jQuery.queue(elem, type),
                        startLength = queue.length,
                        fn = queue.shift(),
                        hooks = jQuery._queueHooks(elem, type),
                        next = function () {
                            jQuery.dequeue(elem, type);
                        };

                    // If the fx queue is dequeued, always remove the progress sentinel
                    if (fn === "inprogress") {
                        fn = queue.shift();
                        startLength--;
                    }

                    if (fn) {

                        // Add a progress sentinel to prevent the fx queue from being
                        // automatically dequeued
                        if (type === "fx") {
                            queue.unshift("inprogress");
                        }

                        // Clear up the last queue stop function
                        delete hooks.stop;
                        fn.call(elem, next, hooks);
                    }

                    if (!startLength && hooks) {
                        hooks.empty.fire();
                    }
                },

                // Not public - generate a queueHooks object, or return the current one
                _queueHooks: function (elem, type) {
                    var key = type + "queueHooks";
                    return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                        empty: jQuery.Callbacks("once memory").add(function () {
                            dataPriv.remove(elem, [type + "queue", key]);
                        })
                    });
                }
            });

            jQuery.fn.extend({
                queue: function (type, data) {
                    var setter = 2;

                    if (typeof type !== "string") {
                        data = type;
                        type = "fx";
                        setter--;
                    }

                    if (arguments.length < setter) {
                        return jQuery.queue(this[0], type);
                    }

                    return data === undefined ?
                        this :
                        this.each(function () {
                            var queue = jQuery.queue(this, type, data);

                            // Ensure a hooks for this queue
                            jQuery._queueHooks(this, type);

                            if (type === "fx" && queue[0] !== "inprogress") {
                                jQuery.dequeue(this, type);
                            }
                        });
                },
                dequeue: function (type) {
                    return this.each(function () {
                        jQuery.dequeue(this, type);
                    });
                },
                clearQueue: function (type) {
                    return this.queue(type || "fx", []);
                },

                // Get a promise resolved when queues of a certain type
                // are emptied (fx is the type by default)
                promise: function (type, obj) {
                    var tmp,
                        count = 1,
                        defer = jQuery.Deferred(),
                        elements = this,
                        i = this.length,
                        resolve = function () {
                            if (!(--count)) {
                                defer.resolveWith(elements, [elements]);
                            }
                        };

                    if (typeof type !== "string") {
                        obj = type;
                        type = undefined;
                    }
                    type = type || "fx";

                    while (i--) {
                        tmp = dataPriv.get(elements[i], type + "queueHooks");
                        if (tmp && tmp.empty) {
                            count++;
                            tmp.empty.add(resolve);
                        }
                    }
                    resolve();
                    return defer.promise(obj);
                }
            });
            var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

            var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");


            var cssExpand = ["Top", "Right", "Bottom", "Left"];

            var documentElement = document.documentElement;



            var isAttached = function (elem) {
                return jQuery.contains(elem.ownerDocument, elem);
            },
                composed = { composed: true };

            // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
            // Check attachment across shadow DOM boundaries when possible (gh-3504)
            // Support: iOS 10.0-10.2 only
            // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
            // leading to errors. We need to check for `getRootNode`.
            if (documentElement.getRootNode) {
                isAttached = function (elem) {
                    return jQuery.contains(elem.ownerDocument, elem) ||
                        elem.getRootNode(composed) === elem.ownerDocument;
                };
            }
            var isHiddenWithinTree = function (elem, el) {

                // isHiddenWithinTree might be called from jQuery#filter function;
                // in that case, element will be second argument
                elem = el || elem;

                // Inline style trumps all
                return elem.style.display === "none" ||
                    elem.style.display === "" &&

                    // Otherwise, check computed style
                    // Support: Firefox <=43 - 45
                    // Disconnected elements can have computed display: none, so first confirm that elem is
                    // in the document.
                    isAttached(elem) &&

                    jQuery.css(elem, "display") === "none";
            };

            var swap = function (elem, options, callback, args) {
                var ret, name,
                    old = {};

                // Remember the old values, and insert the new ones
                for (name in options) {
                    old[name] = elem.style[name];
                    elem.style[name] = options[name];
                }

                ret = callback.apply(elem, args || []);

                // Revert the old values
                for (name in options) {
                    elem.style[name] = old[name];
                }

                return ret;
            };




            function adjustCSS(elem, prop, valueParts, tween) {
                var adjusted, scale,
                    maxIterations = 20,
                    currentValue = tween ?
                        function () {
                            return tween.cur();
                        } :
                        function () {
                            return jQuery.css(elem, prop, "");
                        },
                    initial = currentValue(),
                    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),

                    // Starting value computation is required for potential unit mismatches
                    initialInUnit = elem.nodeType &&
                        (jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
                        rcssNum.exec(jQuery.css(elem, prop));

                if (initialInUnit && initialInUnit[3] !== unit) {

                    // Support: Firefox <=54
                    // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
                    initial = initial / 2;

                    // Trust units reported by jQuery.css
                    unit = unit || initialInUnit[3];

                    // Iteratively approximate from a nonzero starting point
                    initialInUnit = +initial || 1;

                    while (maxIterations--) {

                        // Evaluate and update our best guess (doubling guesses that zero out).
                        // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
                        jQuery.style(elem, prop, initialInUnit + unit);
                        if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
                            maxIterations = 0;
                        }
                        initialInUnit = initialInUnit / scale;

                    }

                    initialInUnit = initialInUnit * 2;
                    jQuery.style(elem, prop, initialInUnit + unit);

                    // Make sure we update the tween properties later on
                    valueParts = valueParts || [];
                }

                if (valueParts) {
                    initialInUnit = +initialInUnit || +initial || 0;

                    // Apply relative offset (+=/-=) if specified
                    adjusted = valueParts[1] ?
                        initialInUnit + (valueParts[1] + 1) * valueParts[2] :
                        +valueParts[2];
                    if (tween) {
                        tween.unit = unit;
                        tween.start = initialInUnit;
                        tween.end = adjusted;
                    }
                }
                return adjusted;
            }


            var defaultDisplayMap = {};

            function getDefaultDisplay(elem) {
                var temp,
                    doc = elem.ownerDocument,
                    nodeName = elem.nodeName,
                    display = defaultDisplayMap[nodeName];

                if (display) {
                    return display;
                }

                temp = doc.body.appendChild(doc.createElement(nodeName));
                display = jQuery.css(temp, "display");

                temp.parentNode.removeChild(temp);

                if (display === "none") {
                    display = "block";
                }
                defaultDisplayMap[nodeName] = display;

                return display;
            }

            function showHide(elements, show) {
                var display, elem,
                    values = [],
                    index = 0,
                    length = elements.length;

                // Determine new display value for elements that need to change
                for (; index < length; index++) {
                    elem = elements[index];
                    if (!elem.style) {
                        continue;
                    }

                    display = elem.style.display;
                    if (show) {

                        // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                        // check is required in this first loop unless we have a nonempty display value (either
                        // inline or about-to-be-restored)
                        if (display === "none") {
                            values[index] = dataPriv.get(elem, "display") || null;
                            if (!values[index]) {
                                elem.style.display = "";
                            }
                        }
                        if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                            values[index] = getDefaultDisplay(elem);
                        }
                    } else {
                        if (display !== "none") {
                            values[index] = "none";

                            // Remember what we're overwriting
                            dataPriv.set(elem, "display", display);
                        }
                    }
                }

                // Set the display of the elements in a second loop to avoid constant reflow
                for (index = 0; index < length; index++) {
                    if (values[index] != null) {
                        elements[index].style.display = values[index];
                    }
                }

                return elements;
            }

            jQuery.fn.extend({
                show: function () {
                    return showHide(this, true);
                },
                hide: function () {
                    return showHide(this);
                },
                toggle: function (state) {
                    if (typeof state === "boolean") {
                        return state ? this.show() : this.hide();
                    }

                    return this.each(function () {
                        if (isHiddenWithinTree(this)) {
                            jQuery(this).show();
                        } else {
                            jQuery(this).hide();
                        }
                    });
                }
            });
            var rcheckableType = (/^(?:checkbox|radio)$/i);

            var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]*)/i);

            var rscriptType = (/^$|^module$|\/(?:java|ecma)script/i);



            // We have to close these tags to support XHTML (#13200)
            var wrapMap = {

                // Support: IE <=9 only
                option: [1, "<select multiple='multiple'>", "</select>"],

                // XHTML parsers do not magically insert elements in the
                // same way that tag soup parsers do. So we cannot shorten
                // this by omitting <tbody> or other required elements.
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

                _default: [0, "", ""]
            };

            // Support: IE <=9 only
            wrapMap.optgroup = wrapMap.option;

            wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
            wrapMap.th = wrapMap.td;


            function getAll(context, tag) {

                // Support: IE <=9 - 11 only
                // Use typeof to avoid zero-argument method invocation on host objects (#15151)
                var ret;

                if (typeof context.getElementsByTagName !== "undefined") {
                    ret = context.getElementsByTagName(tag || "*");

                } else if (typeof context.querySelectorAll !== "undefined") {
                    ret = context.querySelectorAll(tag || "*");

                } else {
                    ret = [];
                }

                if (tag === undefined || tag && nodeName(context, tag)) {
                    return jQuery.merge([context], ret);
                }

                return ret;
            }


            // Mark scripts as having already been evaluated
            function setGlobalEval(elems, refElements) {
                var i = 0,
                    l = elems.length;

                for (; i < l; i++) {
                    dataPriv.set(
                        elems[i],
                        "globalEval",
                        !refElements || dataPriv.get(refElements[i], "globalEval")
                    );
                }
            }


            var rhtml = /<|&#?\w+;/;

            function buildFragment(elems, context, scripts, selection, ignored) {
                var elem, tmp, tag, wrap, attached, j,
                    fragment = context.createDocumentFragment(),
                    nodes = [],
                    i = 0,
                    l = elems.length;

                for (; i < l; i++) {
                    elem = elems[i];

                    if (elem || elem === 0) {

                        // Add nodes directly
                        if (toType(elem) === "object") {

                            // Support: Android <=4.0 only, PhantomJS 1 only
                            // push.apply(_, arraylike) throws on ancient WebKit
                            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

                            // Convert non-html into a text node
                        } else if (!rhtml.test(elem)) {
                            nodes.push(context.createTextNode(elem));

                            // Convert html into DOM nodes
                        } else {
                            tmp = tmp || fragment.appendChild(context.createElement("div"));

                            // Deserialize a standard representation
                            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                            wrap = wrapMap[tag] || wrapMap._default;
                            tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

                            // Descend through wrappers to the right content
                            j = wrap[0];
                            while (j--) {
                                tmp = tmp.lastChild;
                            }

                            // Support: Android <=4.0 only, PhantomJS 1 only
                            // push.apply(_, arraylike) throws on ancient WebKit
                            jQuery.merge(nodes, tmp.childNodes);

                            // Remember the top-level container
                            tmp = fragment.firstChild;

                            // Ensure the created nodes are orphaned (#12392)
                            tmp.textContent = "";
                        }
                    }
                }

                // Remove wrapper from fragment
                fragment.textContent = "";

                i = 0;
                while ((elem = nodes[i++])) {

                    // Skip elements already in the context collection (trac-4087)
                    if (selection && jQuery.inArray(elem, selection) > -1) {
                        if (ignored) {
                            ignored.push(elem);
                        }
                        continue;
                    }

                    attached = isAttached(elem);

                    // Append to fragment
                    tmp = getAll(fragment.appendChild(elem), "script");

                    // Preserve script evaluation history
                    if (attached) {
                        setGlobalEval(tmp);
                    }

                    // Capture executables
                    if (scripts) {
                        j = 0;
                        while ((elem = tmp[j++])) {
                            if (rscriptType.test(elem.type || "")) {
                                scripts.push(elem);
                            }
                        }
                    }
                }

                return fragment;
            }


            (function () {
                var fragment = document.createDocumentFragment(),
                    div = fragment.appendChild(document.createElement("div")),
                    input = document.createElement("input");

                // Support: Android 4.0 - 4.3 only
                // Check state lost if the name is set (#11217)
                // Support: Windows Web Apps (WWA)
                // `name` and `type` must use .setAttribute for WWA (#14901)
                input.setAttribute("type", "radio");
                input.setAttribute("checked", "checked");
                input.setAttribute("name", "t");

                div.appendChild(input);

                // Support: Android <=4.1 only
                // Older WebKit doesn't clone checked state correctly in fragments
                support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

                // Support: IE <=11 only
                // Make sure textarea (and checkbox) defaultValue is properly cloned
                div.innerHTML = "<textarea>x</textarea>";
                support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
            })();


            var
                rkeyEvent = /^key/,
                rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

            function returnTrue() {
                return true;
            }

            function returnFalse() {
                return false;
            }

            // Support: IE <=9 - 11+
            // focus() and blur() are asynchronous, except when they are no-op.
            // So expect focus to be synchronous when the element is already active,
            // and blur to be synchronous when the element is not already active.
            // (focus and blur are always synchronous in other supported browsers,
            // this just defines when we can count on it).
            function expectSync(elem, type) {
                return (elem === safeActiveElement()) === (type === "focus");
            }

            // Support: IE <=9 only
            // Accessing document.activeElement can throw unexpectedly
            // https://bugs.jquery.com/ticket/13393
            function safeActiveElement() {
                try {
                    return document.activeElement;
                } catch (err) { }
            }

            function on(elem, types, selector, data, fn, one) {
                var origFn, type;

                // Types can be a map of types/handlers
                if (typeof types === "object") {

                    // ( types-Object, selector, data )
                    if (typeof selector !== "string") {

                        // ( types-Object, data )
                        data = data || selector;
                        selector = undefined;
                    }
                    for (type in types) {
                        on(elem, type, selector, data, types[type], one);
                    }
                    return elem;
                }

                if (data == null && fn == null) {

                    // ( types, fn )
                    fn = selector;
                    data = selector = undefined;
                } else if (fn == null) {
                    if (typeof selector === "string") {

                        // ( types, selector, fn )
                        fn = data;
                        data = undefined;
                    } else {

                        // ( types, data, fn )
                        fn = data;
                        data = selector;
                        selector = undefined;
                    }
                }
                if (fn === false) {
                    fn = returnFalse;
                } else if (!fn) {
                    return elem;
                }

                if (one === 1) {
                    origFn = fn;
                    fn = function (event) {

                        // Can use an empty set, since event contains the info
                        jQuery().off(event);
                        return origFn.apply(this, arguments);
                    };

                    // Use same guid so caller can remove using origFn
                    fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
                }
                return elem.each(function () {
                    jQuery.event.add(this, types, fn, data, selector);
                });
            }

            /*
             * Helper functions for managing events -- not part of the public interface.
             * Props to Dean Edwards' addEvent library for many of the ideas.
             */
            jQuery.event = {

                global: {},

                add: function (elem, types, handler, data, selector) {

                    var handleObjIn, eventHandle, tmp,
                        events, t, handleObj,
                        special, handlers, type, namespaces, origType,
                        elemData = dataPriv.get(elem);

                    // Don't attach events to noData or text/comment nodes (but allow plain objects)
                    if (!elemData) {
                        return;
                    }

                    // Caller can pass in an object of custom data in lieu of the handler
                    if (handler.handler) {
                        handleObjIn = handler;
                        handler = handleObjIn.handler;
                        selector = handleObjIn.selector;
                    }

                    // Ensure that invalid selectors throw exceptions at attach time
                    // Evaluate against documentElement in case elem is a non-element node (e.g., document)
                    if (selector) {
                        jQuery.find.matchesSelector(documentElement, selector);
                    }

                    // Make sure that the handler has a unique ID, used to find/remove it later
                    if (!handler.guid) {
                        handler.guid = jQuery.guid++;
                    }

                    // Init the element's event structure and main handler, if this is the first
                    if (!(events = elemData.events)) {
                        events = elemData.events = {};
                    }
                    if (!(eventHandle = elemData.handle)) {
                        eventHandle = elemData.handle = function (e) {

                            // Discard the second event of a jQuery.event.trigger() and
                            // when an event is called after a page has unloaded
                            return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                                jQuery.event.dispatch.apply(elem, arguments) : undefined;
                        };
                    }

                    // Handle multiple events separated by a space
                    types = (types || "").match(rnothtmlwhite) || [""];
                    t = types.length;
                    while (t--) {
                        tmp = rtypenamespace.exec(types[t]) || [];
                        type = origType = tmp[1];
                        namespaces = (tmp[2] || "").split(".").sort();

                        // There *must* be a type, no attaching namespace-only handlers
                        if (!type) {
                            continue;
                        }

                        // If event changes its type, use the special event handlers for the changed type
                        special = jQuery.event.special[type] || {};

                        // If selector defined, determine special event api type, otherwise given type
                        type = (selector ? special.delegateType : special.bindType) || type;

                        // Update special based on newly reset type
                        special = jQuery.event.special[type] || {};

                        // handleObj is passed to all event handlers
                        handleObj = jQuery.extend({
                            type: type,
                            origType: origType,
                            data: data,
                            handler: handler,
                            guid: handler.guid,
                            selector: selector,
                            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                            namespace: namespaces.join(".")
                        }, handleObjIn);

                        // Init the event handler queue if we're the first
                        if (!(handlers = events[type])) {
                            handlers = events[type] = [];
                            handlers.delegateCount = 0;

                            // Only use addEventListener if the special events handler returns false
                            if (!special.setup ||
                                special.setup.call(elem, data, namespaces, eventHandle) === false) {

                                if (elem.addEventListener) {
                                    elem.addEventListener(type, eventHandle);
                                }
                            }
                        }

                        if (special.add) {
                            special.add.call(elem, handleObj);

                            if (!handleObj.handler.guid) {
                                handleObj.handler.guid = handler.guid;
                            }
                        }

                        // Add to the element's handler list, delegates in front
                        if (selector) {
                            handlers.splice(handlers.delegateCount++, 0, handleObj);
                        } else {
                            handlers.push(handleObj);
                        }

                        // Keep track of which events have ever been used, for event optimization
                        jQuery.event.global[type] = true;
                    }

                },

                // Detach an event or set of events from an element
                remove: function (elem, types, handler, selector, mappedTypes) {

                    var j, origCount, tmp,
                        events, t, handleObj,
                        special, handlers, type, namespaces, origType,
                        elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

                    if (!elemData || !(events = elemData.events)) {
                        return;
                    }

                    // Once for each type.namespace in types; type may be omitted
                    types = (types || "").match(rnothtmlwhite) || [""];
                    t = types.length;
                    while (t--) {
                        tmp = rtypenamespace.exec(types[t]) || [];
                        type = origType = tmp[1];
                        namespaces = (tmp[2] || "").split(".").sort();

                        // Unbind all events (on this namespace, if provided) for the element
                        if (!type) {
                            for (type in events) {
                                jQuery.event.remove(elem, type + types[t], handler, selector, true);
                            }
                            continue;
                        }

                        special = jQuery.event.special[type] || {};
                        type = (selector ? special.delegateType : special.bindType) || type;
                        handlers = events[type] || [];
                        tmp = tmp[2] &&
                            new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

                        // Remove matching events
                        origCount = j = handlers.length;
                        while (j--) {
                            handleObj = handlers[j];

                            if ((mappedTypes || origType === handleObj.origType) &&
                                (!handler || handler.guid === handleObj.guid) &&
                                (!tmp || tmp.test(handleObj.namespace)) &&
                                (!selector || selector === handleObj.selector ||
                                    selector === "**" && handleObj.selector)) {
                                handlers.splice(j, 1);

                                if (handleObj.selector) {
                                    handlers.delegateCount--;
                                }
                                if (special.remove) {
                                    special.remove.call(elem, handleObj);
                                }
                            }
                        }

                        // Remove generic event handler if we removed something and no more handlers exist
                        // (avoids potential for endless recursion during removal of special event handlers)
                        if (origCount && !handlers.length) {
                            if (!special.teardown ||
                                special.teardown.call(elem, namespaces, elemData.handle) === false) {

                                jQuery.removeEvent(elem, type, elemData.handle);
                            }

                            delete events[type];
                        }
                    }

                    // Remove data and the expando if it's no longer used
                    if (jQuery.isEmptyObject(events)) {
                        dataPriv.remove(elem, "handle events");
                    }
                },

                dispatch: function (nativeEvent) {

                    // Make a writable jQuery.Event from the native event object
                    var event = jQuery.event.fix(nativeEvent);

                    var i, j, ret, matched, handleObj, handlerQueue,
                        args = new Array(arguments.length),
                        handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
                        special = jQuery.event.special[event.type] || {};

                    // Use the fix-ed jQuery.Event rather than the (read-only) native event
                    args[0] = event;

                    for (i = 1; i < arguments.length; i++) {
                        args[i] = arguments[i];
                    }

                    event.delegateTarget = this;

                    // Call the preDispatch hook for the mapped type, and let it bail if desired
                    if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                        return;
                    }

                    // Determine handlers
                    handlerQueue = jQuery.event.handlers.call(this, event, handlers);

                    // Run delegates first; they may want to stop propagation beneath us
                    i = 0;
                    while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                        event.currentTarget = matched.elem;

                        j = 0;
                        while ((handleObj = matched.handlers[j++]) &&
                            !event.isImmediatePropagationStopped()) {

                            // If the event is namespaced, then each handler is only invoked if it is
                            // specially universal or its namespaces are a superset of the event's.
                            if (!event.rnamespace || handleObj.namespace === false ||
                                event.rnamespace.test(handleObj.namespace)) {

                                event.handleObj = handleObj;
                                event.data = handleObj.data;

                                ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
                                    handleObj.handler).apply(matched.elem, args);

                                if (ret !== undefined) {
                                    if ((event.result = ret) === false) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }
                                }
                            }
                        }
                    }

                    // Call the postDispatch hook for the mapped type
                    if (special.postDispatch) {
                        special.postDispatch.call(this, event);
                    }

                    return event.result;
                },

                handlers: function (event, handlers) {
                    var i, handleObj, sel, matchedHandlers, matchedSelectors,
                        handlerQueue = [],
                        delegateCount = handlers.delegateCount,
                        cur = event.target;

                    // Find delegate handlers
                    if (delegateCount &&

                        // Support: IE <=9
                        // Black-hole SVG <use> instance trees (trac-13180)
                        cur.nodeType &&

                        // Support: Firefox <=42
                        // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                        // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                        // Support: IE 11 only
                        // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                        !(event.type === "click" && event.button >= 1)) {

                        for (; cur !== this; cur = cur.parentNode || this) {

                            // Don't check non-elements (#13208)
                            // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                            if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                                matchedHandlers = [];
                                matchedSelectors = {};
                                for (i = 0; i < delegateCount; i++) {
                                    handleObj = handlers[i];

                                    // Don't conflict with Object.prototype properties (#13203)
                                    sel = handleObj.selector + " ";

                                    if (matchedSelectors[sel] === undefined) {
                                        matchedSelectors[sel] = handleObj.needsContext ?
                                            jQuery(sel, this).index(cur) > -1 :
                                            jQuery.find(sel, this, null, [cur]).length;
                                    }
                                    if (matchedSelectors[sel]) {
                                        matchedHandlers.push(handleObj);
                                    }
                                }
                                if (matchedHandlers.length) {
                                    handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                                }
                            }
                        }
                    }

                    // Add the remaining (directly-bound) handlers
                    cur = this;
                    if (delegateCount < handlers.length) {
                        handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
                    }

                    return handlerQueue;
                },

                addProp: function (name, hook) {
                    Object.defineProperty(jQuery.Event.prototype, name, {
                        enumerable: true,
                        configurable: true,

                        get: isFunction(hook) ?
                            function () {
                                if (this.originalEvent) {
                                    return hook(this.originalEvent);
                                }
                            } :
                            function () {
                                if (this.originalEvent) {
                                    return this.originalEvent[name];
                                }
                            },

                        set: function (value) {
                            Object.defineProperty(this, name, {
                                enumerable: true,
                                configurable: true,
                                writable: true,
                                value: value
                            });
                        }
                    });
                },

                fix: function (originalEvent) {
                    return originalEvent[jQuery.expando] ?
                        originalEvent :
                        new jQuery.Event(originalEvent);
                },

                special: {
                    load: {

                        // Prevent triggered image.load events from bubbling to window.load
                        noBubble: true
                    },
                    click: {

                        // Utilize native event to ensure correct state for checkable inputs
                        setup: function (data) {

                            // For mutual compressibility with _default, replace `this` access with a local var.
                            // `|| data` is dead code meant only to preserve the variable through minification.
                            var el = this || data;

                            // Claim the first handler
                            if (rcheckableType.test(el.type) &&
                                el.click && nodeName(el, "input")) {

                                // dataPriv.set( el, "click", ... )
                                leverageNative(el, "click", returnTrue);
                            }

                            // Return false to allow normal processing in the caller
                            return false;
                        },
                        trigger: function (data) {

                            // For mutual compressibility with _default, replace `this` access with a local var.
                            // `|| data` is dead code meant only to preserve the variable through minification.
                            var el = this || data;

                            // Force setup before triggering a click
                            if (rcheckableType.test(el.type) &&
                                el.click && nodeName(el, "input")) {

                                leverageNative(el, "click");
                            }

                            // Return non-false to allow normal event-path propagation
                            return true;
                        },

                        // For cross-browser consistency, suppress native .click() on links
                        // Also prevent it if we're currently inside a leveraged native-event stack
                        _default: function (event) {
                            var target = event.target;
                            return rcheckableType.test(target.type) &&
                                target.click && nodeName(target, "input") &&
                                dataPriv.get(target, "click") ||
                                nodeName(target, "a");
                        }
                    },

                    beforeunload: {
                        postDispatch: function (event) {

                            // Support: Firefox 20+
                            // Firefox doesn't alert if the returnValue field is not set.
                            if (event.result !== undefined && event.originalEvent) {
                                event.originalEvent.returnValue = event.result;
                            }
                        }
                    }
                }
            };

            // Ensure the presence of an event listener that handles manually-triggered
            // synthetic events by interrupting progress until reinvoked in response to
            // *native* events that it fires directly, ensuring that state changes have
            // already occurred before other listeners are invoked.
            function leverageNative(el, type, expectSync) {

                // Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
                if (!expectSync) {
                    if (dataPriv.get(el, type) === undefined) {
                        jQuery.event.add(el, type, returnTrue);
                    }
                    return;
                }

                // Register the controller as a special universal handler for all event namespaces
                dataPriv.set(el, type, false);
                jQuery.event.add(el, type, {
                    namespace: false,
                    handler: function (event) {
                        var notAsync, result,
                            saved = dataPriv.get(this, type);

                        if ((event.isTrigger & 1) && this[type]) {

                            // Interrupt processing of the outer synthetic .trigger()ed event
                            // Saved data should be false in such cases, but might be a leftover capture object
                            // from an async native handler (gh-4350)
                            if (!saved.length) {

                                // Store arguments for use when handling the inner native event
                                // There will always be at least one argument (an event object), so this array
                                // will not be confused with a leftover capture object.
                                saved = slice.call(arguments);
                                dataPriv.set(this, type, saved);

                                // Trigger the native event and capture its result
                                // Support: IE <=9 - 11+
                                // focus() and blur() are asynchronous
                                notAsync = expectSync(this, type);
                                this[type]();
                                result = dataPriv.get(this, type);
                                if (saved !== result || notAsync) {
                                    dataPriv.set(this, type, false);
                                } else {
                                    result = {};
                                }
                                if (saved !== result) {

                                    // Cancel the outer synthetic event
                                    event.stopImmediatePropagation();
                                    event.preventDefault();
                                    return result.value;
                                }

                                // If this is an inner synthetic event for an event with a bubbling surrogate
                                // (focus or blur), assume that the surrogate already propagated from triggering the
                                // native event and prevent that from happening again here.
                                // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
                                // bubbling surrogate propagates *after* the non-bubbling base), but that seems
                                // less bad than duplication.
                            } else if ((jQuery.event.special[type] || {}).delegateType) {
                                event.stopPropagation();
                            }

                            // If this is a native event triggered above, everything is now in order
                            // Fire an inner synthetic event with the original arguments
                        } else if (saved.length) {

                            // ...and capture the result
                            dataPriv.set(this, type, {
                                value: jQuery.event.trigger(

                                    // Support: IE <=9 - 11+
                                    // Extend with the prototype to reset the above stopImmediatePropagation()
                                    jQuery.extend(saved[0], jQuery.Event.prototype),
                                    saved.slice(1),
                                    this
                                )
                            });

                            // Abort handling of the native event
                            event.stopImmediatePropagation();
                        }
                    }
                });
            }

            jQuery.removeEvent = function (elem, type, handle) {

                // This "if" is needed for plain objects
                if (elem.removeEventListener) {
                    elem.removeEventListener(type, handle);
                }
            };

            jQuery.Event = function (src, props) {

                // Allow instantiation without the 'new' keyword
                if (!(this instanceof jQuery.Event)) {
                    return new jQuery.Event(src, props);
                }

                // Event object
                if (src && src.type) {
                    this.originalEvent = src;
                    this.type = src.type;

                    // Events bubbling up the document may have been marked as prevented
                    // by a handler lower down the tree; reflect the correct value.
                    this.isDefaultPrevented = src.defaultPrevented ||
                        src.defaultPrevented === undefined &&

                        // Support: Android <=2.3 only
                        src.returnValue === false ?
                        returnTrue :
                        returnFalse;

                    // Create target properties
                    // Support: Safari <=6 - 7 only
                    // Target should not be a text node (#504, #13143)
                    this.target = (src.target && src.target.nodeType === 3) ?
                        src.target.parentNode :
                        src.target;

                    this.currentTarget = src.currentTarget;
                    this.relatedTarget = src.relatedTarget;

                    // Event type
                } else {
                    this.type = src;
                }

                // Put explicitly provided properties onto the event object
                if (props) {
                    jQuery.extend(this, props);
                }

                // Create a timestamp if incoming event doesn't have one
                this.timeStamp = src && src.timeStamp || Date.now();

                // Mark it as fixed
                this[jQuery.expando] = true;
            };

            // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
            // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
            jQuery.Event.prototype = {
                constructor: jQuery.Event,
                isDefaultPrevented: returnFalse,
                isPropagationStopped: returnFalse,
                isImmediatePropagationStopped: returnFalse,
                isSimulated: false,

                preventDefault: function () {
                    var e = this.originalEvent;

                    this.isDefaultPrevented = returnTrue;

                    if (e && !this.isSimulated) {
                        e.preventDefault();
                    }
                },
                stopPropagation: function () {
                    var e = this.originalEvent;

                    this.isPropagationStopped = returnTrue;

                    if (e && !this.isSimulated) {
                        e.stopPropagation();
                    }
                },
                stopImmediatePropagation: function () {
                    var e = this.originalEvent;

                    this.isImmediatePropagationStopped = returnTrue;

                    if (e && !this.isSimulated) {
                        e.stopImmediatePropagation();
                    }

                    this.stopPropagation();
                }
            };

            // Includes all common event props including KeyEvent and MouseEvent specific props
            jQuery.each({
                altKey: true,
                bubbles: true,
                cancelable: true,
                changedTouches: true,
                ctrlKey: true,
                detail: true,
                eventPhase: true,
                metaKey: true,
                pageX: true,
                pageY: true,
                shiftKey: true,
                view: true,
                "char": true,
                code: true,
                charCode: true,
                key: true,
                keyCode: true,
                button: true,
                buttons: true,
                clientX: true,
                clientY: true,
                offsetX: true,
                offsetY: true,
                pointerId: true,
                pointerType: true,
                screenX: true,
                screenY: true,
                targetTouches: true,
                toElement: true,
                touches: true,

                which: function (event) {
                    var button = event.button;

                    // Add which for key events
                    if (event.which == null && rkeyEvent.test(event.type)) {
                        return event.charCode != null ? event.charCode : event.keyCode;
                    }

                    // Add which for click: 1 === left; 2 === middle; 3 === right
                    if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
                        if (button & 1) {
                            return 1;
                        }

                        if (button & 2) {
                            return 3;
                        }

                        if (button & 4) {
                            return 2;
                        }

                        return 0;
                    }

                    return event.which;
                }
            }, jQuery.event.addProp);

            jQuery.each({ focus: "focusin", blur: "focusout" }, function (type, delegateType) {
                jQuery.event.special[type] = {

                    // Utilize native event if possible so blur/focus sequence is correct
                    setup: function () {

                        // Claim the first handler
                        // dataPriv.set( this, "focus", ... )
                        // dataPriv.set( this, "blur", ... )
                        leverageNative(this, type, expectSync);

                        // Return false to allow normal processing in the caller
                        return false;
                    },
                    trigger: function () {

                        // Force setup before trigger
                        leverageNative(this, type);

                        // Return non-false to allow normal event-path propagation
                        return true;
                    },

                    delegateType: delegateType
                };
            });

            // Create mouseenter/leave events using mouseover/out and event-time checks
            // so that event delegation works in jQuery.
            // Do the same for pointerenter/pointerleave and pointerover/pointerout
            //
            // Support: Safari 7 only
            // Safari sends mouseenter too often; see:
            // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
            // for the description of the bug (it existed in older Chrome versions as well).
            jQuery.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function (orig, fix) {
                jQuery.event.special[orig] = {
                    delegateType: fix,
                    bindType: fix,

                    handle: function (event) {
                        var ret,
                            target = this,
                            related = event.relatedTarget,
                            handleObj = event.handleObj;

                        // For mouseenter/leave call the handler if related is outside the target.
                        // NB: No relatedTarget if the mouse left/entered the browser window
                        if (!related || (related !== target && !jQuery.contains(target, related))) {
                            event.type = handleObj.origType;
                            ret = handleObj.handler.apply(this, arguments);
                            event.type = fix;
                        }
                        return ret;
                    }
                };
            });

            jQuery.fn.extend({

                on: function (types, selector, data, fn) {
                    return on(this, types, selector, data, fn);
                },
                one: function (types, selector, data, fn) {
                    return on(this, types, selector, data, fn, 1);
                },
                off: function (types, selector, fn) {
                    var handleObj, type;
                    if (types && types.preventDefault && types.handleObj) {

                        // ( event )  dispatched jQuery.Event
                        handleObj = types.handleObj;
                        jQuery(types.delegateTarget).off(
                            handleObj.namespace ?
                                handleObj.origType + "." + handleObj.namespace :
                                handleObj.origType,
                            handleObj.selector,
                            handleObj.handler
                        );
                        return this;
                    }
                    if (typeof types === "object") {

                        // ( types-object [, selector] )
                        for (type in types) {
                            this.off(type, selector, types[type]);
                        }
                        return this;
                    }
                    if (selector === false || typeof selector === "function") {

                        // ( types [, fn] )
                        fn = selector;
                        selector = undefined;
                    }
                    if (fn === false) {
                        fn = returnFalse;
                    }
                    return this.each(function () {
                        jQuery.event.remove(this, types, fn, selector);
                    });
                }
            });


            var

                /* eslint-disable max-len */

                // See https://github.com/eslint/eslint/issues/3229
                rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

                /* eslint-enable */

                // Support: IE <=10 - 11, Edge 12 - 13 only
                // In IE/Edge using regex groups here causes severe slowdowns.
                // See https://connect.microsoft.com/IE/feedback/details/1736512/
                rnoInnerhtml = /<script|<style|<link/i,

                // checked="checked" or checked
                rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
                rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

            // Prefer a tbody over its parent table for containing new rows
            function manipulationTarget(elem, content) {
                if (nodeName(elem, "table") &&
                    nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

                    return jQuery(elem).children("tbody")[0] || elem;
                }

                return elem;
            }

            // Replace/restore the type attribute of script elements for safe DOM manipulation
            function disableScript(elem) {
                elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
                return elem;
            }
            function restoreScript(elem) {
                if ((elem.type || "").slice(0, 5) === "true/") {
                    elem.type = elem.type.slice(5);
                } else {
                    elem.removeAttribute("type");
                }

                return elem;
            }

            function cloneCopyEvent(src, dest) {
                var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

                if (dest.nodeType !== 1) {
                    return;
                }

                // 1. Copy private data: events, handlers, etc.
                if (dataPriv.hasData(src)) {
                    pdataOld = dataPriv.access(src);
                    pdataCur = dataPriv.set(dest, pdataOld);
                    events = pdataOld.events;

                    if (events) {
                        delete pdataCur.handle;
                        pdataCur.events = {};

                        for (type in events) {
                            for (i = 0, l = events[type].length; i < l; i++) {
                                jQuery.event.add(dest, type, events[type][i]);
                            }
                        }
                    }
                }

                // 2. Copy user data
                if (dataUser.hasData(src)) {
                    udataOld = dataUser.access(src);
                    udataCur = jQuery.extend({}, udataOld);

                    dataUser.set(dest, udataCur);
                }
            }

            // Fix IE bugs, see support tests
            function fixInput(src, dest) {
                var nodeName = dest.nodeName.toLowerCase();

                // Fails to persist the checked state of a cloned checkbox or radio button.
                if (nodeName === "input" && rcheckableType.test(src.type)) {
                    dest.checked = src.checked;

                    // Fails to return the selected option to the default selected state when cloning options
                } else if (nodeName === "input" || nodeName === "textarea") {
                    dest.defaultValue = src.defaultValue;
                }
            }

            function domManip(collection, args, callback, ignored) {

                // Flatten any nested arrays
                args = concat.apply([], args);

                var fragment, first, scripts, hasScripts, node, doc,
                    i = 0,
                    l = collection.length,
                    iNoClone = l - 1,
                    value = args[0],
                    valueIsFunction = isFunction(value);

                // We can't cloneNode fragments that contain checked, in WebKit
                if (valueIsFunction ||
                    (l > 1 && typeof value === "string" &&
                        !support.checkClone && rchecked.test(value))) {
                    return collection.each(function (index) {
                        var self = collection.eq(index);
                        if (valueIsFunction) {
                            args[0] = value.call(this, index, self.html());
                        }
                        domManip(self, args, callback, ignored);
                    });
                }

                if (l) {
                    fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
                    first = fragment.firstChild;

                    if (fragment.childNodes.length === 1) {
                        fragment = first;
                    }

                    // Require either new content or an interest in ignored elements to invoke the callback
                    if (first || ignored) {
                        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                        hasScripts = scripts.length;

                        // Use the original fragment for the last item
                        // instead of the first because it can end up
                        // being emptied incorrectly in certain situations (#8070).
                        for (; i < l; i++) {
                            node = fragment;

                            if (i !== iNoClone) {
                                node = jQuery.clone(node, true, true);

                                // Keep references to cloned scripts for later restoration
                                if (hasScripts) {

                                    // Support: Android <=4.0 only, PhantomJS 1 only
                                    // push.apply(_, arraylike) throws on ancient WebKit
                                    jQuery.merge(scripts, getAll(node, "script"));
                                }
                            }

                            callback.call(collection[i], node, i);
                        }

                        if (hasScripts) {
                            doc = scripts[scripts.length - 1].ownerDocument;

                            // Reenable scripts
                            jQuery.map(scripts, restoreScript);

                            // Evaluate executable scripts on first document insertion
                            for (i = 0; i < hasScripts; i++) {
                                node = scripts[i];
                                if (rscriptType.test(node.type || "") &&
                                    !dataPriv.access(node, "globalEval") &&
                                    jQuery.contains(doc, node)) {

                                    if (node.src && (node.type || "").toLowerCase() !== "module") {

                                        // Optional AJAX dependency, but won't run scripts if not present
                                        if (jQuery._evalUrl && !node.noModule) {
                                            jQuery._evalUrl(node.src, {
                                                nonce: node.nonce || node.getAttribute("nonce")
                                            });
                                        }
                                    } else {
                                        DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                                    }
                                }
                            }
                        }
                    }
                }

                return collection;
            }

            function remove(elem, selector, keepData) {
                var node,
                    nodes = selector ? jQuery.filter(selector, elem) : elem,
                    i = 0;

                for (; (node = nodes[i]) != null; i++) {
                    if (!keepData && node.nodeType === 1) {
                        jQuery.cleanData(getAll(node));
                    }

                    if (node.parentNode) {
                        if (keepData && isAttached(node)) {
                            setGlobalEval(getAll(node, "script"));
                        }
                        node.parentNode.removeChild(node);
                    }
                }

                return elem;
            }

            jQuery.extend({
                htmlPrefilter: function (html) {
                    return html.replace(rxhtmlTag, "<$1></$2>");
                },

                clone: function (elem, dataAndEvents, deepDataAndEvents) {
                    var i, l, srcElements, destElements,
                        clone = elem.cloneNode(true),
                        inPage = isAttached(elem);

                    // Fix IE cloning issues
                    if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
                        !jQuery.isXMLDoc(elem)) {

                        // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
                        destElements = getAll(clone);
                        srcElements = getAll(elem);

                        for (i = 0, l = srcElements.length; i < l; i++) {
                            fixInput(srcElements[i], destElements[i]);
                        }
                    }

                    // Copy the events from the original to the clone
                    if (dataAndEvents) {
                        if (deepDataAndEvents) {
                            srcElements = srcElements || getAll(elem);
                            destElements = destElements || getAll(clone);

                            for (i = 0, l = srcElements.length; i < l; i++) {
                                cloneCopyEvent(srcElements[i], destElements[i]);
                            }
                        } else {
                            cloneCopyEvent(elem, clone);
                        }
                    }

                    // Preserve script evaluation history
                    destElements = getAll(clone, "script");
                    if (destElements.length > 0) {
                        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
                    }

                    // Return the cloned set
                    return clone;
                },

                cleanData: function (elems) {
                    var data, elem, type,
                        special = jQuery.event.special,
                        i = 0;

                    for (; (elem = elems[i]) !== undefined; i++) {
                        if (acceptData(elem)) {
                            if ((data = elem[dataPriv.expando])) {
                                if (data.events) {
                                    for (type in data.events) {
                                        if (special[type]) {
                                            jQuery.event.remove(elem, type);

                                            // This is a shortcut to avoid jQuery.event.remove's overhead
                                        } else {
                                            jQuery.removeEvent(elem, type, data.handle);
                                        }
                                    }
                                }

                                // Support: Chrome <=35 - 45+
                                // Assign undefined instead of using delete, see Data#remove
                                elem[dataPriv.expando] = undefined;
                            }
                            if (elem[dataUser.expando]) {

                                // Support: Chrome <=35 - 45+
                                // Assign undefined instead of using delete, see Data#remove
                                elem[dataUser.expando] = undefined;
                            }
                        }
                    }
                }
            });

            jQuery.fn.extend({
                detach: function (selector) {
                    return remove(this, selector, true);
                },

                remove: function (selector) {
                    return remove(this, selector);
                },

                text: function (value) {
                    return access(this, function (value) {
                        return value === undefined ?
                            jQuery.text(this) :
                            this.empty().each(function () {
                                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                    this.textContent = value;
                                }
                            });
                    }, null, value, arguments.length);
                },

                append: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var target = manipulationTarget(this, elem);
                            target.appendChild(elem);
                        }
                    });
                },

                prepend: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var target = manipulationTarget(this, elem);
                            target.insertBefore(elem, target.firstChild);
                        }
                    });
                },

                before: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.parentNode) {
                            this.parentNode.insertBefore(elem, this);
                        }
                    });
                },

                after: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.parentNode) {
                            this.parentNode.insertBefore(elem, this.nextSibling);
                        }
                    });
                },

                empty: function () {
                    var elem,
                        i = 0;

                    for (; (elem = this[i]) != null; i++) {
                        if (elem.nodeType === 1) {

                            // Prevent memory leaks
                            jQuery.cleanData(getAll(elem, false));

                            // Remove any remaining nodes
                            elem.textContent = "";
                        }
                    }

                    return this;
                },

                clone: function (dataAndEvents, deepDataAndEvents) {
                    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
                    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

                    return this.map(function () {
                        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
                    });
                },

                html: function (value) {
                    return access(this, function (value) {
                        var elem = this[0] || {},
                            i = 0,
                            l = this.length;

                        if (value === undefined && elem.nodeType === 1) {
                            return elem.innerHTML;
                        }

                        // See if we can take a shortcut and just use innerHTML
                        if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                            !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

                            value = jQuery.htmlPrefilter(value);

                            try {
                                for (; i < l; i++) {
                                    elem = this[i] || {};

                                    // Remove element nodes and prevent memory leaks
                                    if (elem.nodeType === 1) {
                                        jQuery.cleanData(getAll(elem, false));
                                        elem.innerHTML = value;
                                    }
                                }

                                elem = 0;

                                // If using innerHTML throws an exception, use the fallback method
                            } catch (e) { }
                        }

                        if (elem) {
                            this.empty().append(value);
                        }
                    }, null, value, arguments.length);
                },

                replaceWith: function () {
                    var ignored = [];

                    // Make the changes, replacing each non-ignored context element with the new content
                    return domManip(this, arguments, function (elem) {
                        var parent = this.parentNode;

                        if (jQuery.inArray(this, ignored) < 0) {
                            jQuery.cleanData(getAll(this));
                            if (parent) {
                                parent.replaceChild(elem, this);
                            }
                        }

                        // Force callback invocation
                    }, ignored);
                }
            });

            jQuery.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function (name, original) {
                jQuery.fn[name] = function (selector) {
                    var elems,
                        ret = [],
                        insert = jQuery(selector),
                        last = insert.length - 1,
                        i = 0;

                    for (; i <= last; i++) {
                        elems = i === last ? this : this.clone(true);
                        jQuery(insert[i])[original](elems);

                        // Support: Android <=4.0 only, PhantomJS 1 only
                        // .get() because push.apply(_, arraylike) throws on ancient WebKit
                        push.apply(ret, elems.get());
                    }

                    return this.pushStack(ret);
                };
            });
            var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

            var getStyles = function (elem) {

                // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
                // IE throws on elements created in popups
                // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
                var view = elem.ownerDocument.defaultView;

                if (!view || !view.opener) {
                    view = window;
                }

                return view.getComputedStyle(elem);
            };

            var rboxStyle = new RegExp(cssExpand.join("|"), "i");



            (function () {

                // Executing both pixelPosition & boxSizingReliable tests require only one layout
                // so they're executed at the same time to save the second computation.
                function computeStyleTests() {

                    // This is a singleton, we need to execute it only once
                    if (!div) {
                        return;
                    }

                    container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
                        "margin-top:1px;padding:0;border:0";
                    div.style.cssText =
                        "position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
                        "margin:auto;border:1px;padding:1px;" +
                        "width:60%;top:1%";
                    documentElement.appendChild(container).appendChild(div);

                    var divStyle = window.getComputedStyle(div);
                    pixelPositionVal = divStyle.top !== "1%";

                    // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
                    reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;

                    // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
                    // Some styles come back with percentage values, even though they shouldn't
                    div.style.right = "60%";
                    pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;

                    // Support: IE 9 - 11 only
                    // Detect misreporting of content dimensions for box-sizing:border-box elements
                    boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;

                    // Support: IE 9 only
                    // Detect overflow:scroll screwiness (gh-3699)
                    // Support: Chrome <=64
                    // Don't get tricked when zoom affects offsetWidth (gh-4029)
                    div.style.position = "absolute";
                    scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;

                    documentElement.removeChild(container);

                    // Nullify the div so it wouldn't be stored in the memory and
                    // it will also be a sign that checks already performed
                    div = null;
                }

                function roundPixelMeasures(measure) {
                    return Math.round(parseFloat(measure));
                }

                var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
                    reliableMarginLeftVal,
                    container = document.createElement("div"),
                    div = document.createElement("div");

                // Finish early in limited (non-browser) environments
                if (!div.style) {
                    return;
                }

                // Support: IE <=9 - 11 only
                // Style of cloned element affects source element cloned (#8908)
                div.style.backgroundClip = "content-box";
                div.cloneNode(true).style.backgroundClip = "";
                support.clearCloneStyle = div.style.backgroundClip === "content-box";

                jQuery.extend(support, {
                    boxSizingReliable: function () {
                        computeStyleTests();
                        return boxSizingReliableVal;
                    },
                    pixelBoxStyles: function () {
                        computeStyleTests();
                        return pixelBoxStylesVal;
                    },
                    pixelPosition: function () {
                        computeStyleTests();
                        return pixelPositionVal;
                    },
                    reliableMarginLeft: function () {
                        computeStyleTests();
                        return reliableMarginLeftVal;
                    },
                    scrollboxSize: function () {
                        computeStyleTests();
                        return scrollboxSizeVal;
                    }
                });
            })();


            function curCSS(elem, name, computed) {
                var width, minWidth, maxWidth, ret,

                    // Support: Firefox 51+
                    // Retrieving style before computed somehow
                    // fixes an issue with getting wrong values
                    // on detached elements
                    style = elem.style;

                computed = computed || getStyles(elem);

                // getPropertyValue is needed for:
                //   .css('filter') (IE 9 only, #12537)
                //   .css('--customProperty) (#3144)
                if (computed) {
                    ret = computed.getPropertyValue(name) || computed[name];

                    if (ret === "" && !isAttached(elem)) {
                        ret = jQuery.style(elem, name);
                    }

                    // A tribute to the "awesome hack by Dean Edwards"
                    // Android Browser returns percentage for some values,
                    // but width seems to be reliably pixels.
                    // This is against the CSSOM draft spec:
                    // https://drafts.csswg.org/cssom/#resolved-values
                    if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {

                        // Remember the original values
                        width = style.width;
                        minWidth = style.minWidth;
                        maxWidth = style.maxWidth;

                        // Put in the new values to get a computed value out
                        style.minWidth = style.maxWidth = style.width = ret;
                        ret = computed.width;

                        // Revert the changed values
                        style.width = width;
                        style.minWidth = minWidth;
                        style.maxWidth = maxWidth;
                    }
                }

                return ret !== undefined ?

                    // Support: IE <=9 - 11 only
                    // IE returns zIndex value as an integer.
                    ret + "" :
                    ret;
            }


            function addGetHookIf(conditionFn, hookFn) {

                // Define the hook, we'll check on the first run if it's really needed.
                return {
                    get: function () {
                        if (conditionFn()) {

                            // Hook not needed (or it's not possible to use it due
                            // to missing dependency), remove it.
                            delete this.get;
                            return;
                        }

                        // Hook needed; redefine it so that the support test is not executed again.
                        return (this.get = hookFn).apply(this, arguments);
                    }
                };
            }


            var cssPrefixes = ["Webkit", "Moz", "ms"],
                emptyStyle = document.createElement("div").style,
                vendorProps = {};

            // Return a vendor-prefixed property or undefined
            function vendorPropName(name) {

                // Check for vendor prefixed names
                var capName = name[0].toUpperCase() + name.slice(1),
                    i = cssPrefixes.length;

                while (i--) {
                    name = cssPrefixes[i] + capName;
                    if (name in emptyStyle) {
                        return name;
                    }
                }
            }

            // Return a potentially-mapped jQuery.cssProps or vendor prefixed property
            function finalPropName(name) {
                var final = jQuery.cssProps[name] || vendorProps[name];

                if (final) {
                    return final;
                }
                if (name in emptyStyle) {
                    return name;
                }
                return vendorProps[name] = vendorPropName(name) || name;
            }


            var

                // Swappable if display is none or starts with table
                // except "table", "table-cell", or "table-caption"
                // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
                rdisplayswap = /^(none|table(?!-c[ea]).+)/,
                rcustomProp = /^--/,
                cssShow = { position: "absolute", visibility: "hidden", display: "block" },
                cssNormalTransform = {
                    letterSpacing: "0",
                    fontWeight: "400"
                };

            function setPositiveNumber(elem, value, subtract) {

                // Any relative (+/-) values have already been
                // normalized at this point
                var matches = rcssNum.exec(value);
                return matches ?

                    // Guard against undefined "subtract", e.g., when used as in cssHooks
                    Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
                    value;
            }

            function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
                var i = dimension === "width" ? 1 : 0,
                    extra = 0,
                    delta = 0;

                // Adjustment may not be necessary
                if (box === (isBorderBox ? "border" : "content")) {
                    return 0;
                }

                for (; i < 4; i += 2) {

                    // Both box models exclude margin
                    if (box === "margin") {
                        delta += jQuery.css(elem, box + cssExpand[i], true, styles);
                    }

                    // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
                    if (!isBorderBox) {

                        // Add padding
                        delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

                        // For "border" or "margin", add border
                        if (box !== "padding") {
                            delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);

                            // But still keep track of it otherwise
                        } else {
                            extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                        }

                        // If we get here with a border-box (content + padding + border), we're seeking "content" or
                        // "padding" or "margin"
                    } else {

                        // For "content", subtract padding
                        if (box === "content") {
                            delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                        }

                        // For "content" or "padding", subtract border
                        if (box !== "margin") {
                            delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                        }
                    }
                }

                // Account for positive content-box scroll gutter when requested by providing computedVal
                if (!isBorderBox && computedVal >= 0) {

                    // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
                    // Assuming integer scroll gutter, subtract the rest and round down
                    delta += Math.max(0, Math.ceil(
                        elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
                        computedVal -
                        delta -
                        extra -
                        0.5

                        // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
                        // Use an explicit zero to avoid NaN (gh-3964)
                    )) || 0;
                }

                return delta;
            }

            function getWidthOrHeight(elem, dimension, extra) {

                // Start with computed style
                var styles = getStyles(elem),

                    // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
                    // Fake content-box until we know it's needed to know the true value.
                    boxSizingNeeded = !support.boxSizingReliable() || extra,
                    isBorderBox = boxSizingNeeded &&
                        jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                    valueIsBorderBox = isBorderBox,

                    val = curCSS(elem, dimension, styles),
                    offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);

                // Support: Firefox <=54
                // Return a confounding non-pixel value or feign ignorance, as appropriate.
                if (rnumnonpx.test(val)) {
                    if (!extra) {
                        return val;
                    }
                    val = "auto";
                }


                // Fall back to offsetWidth/offsetHeight when value is "auto"
                // This happens for inline elements with no explicit setting (gh-3571)
                // Support: Android <=4.1 - 4.3 only
                // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
                // Support: IE 9-11 only
                // Also use offsetWidth/offsetHeight for when box sizing is unreliable
                // We use getClientRects() to check for hidden/disconnected.
                // In those cases, the computed value can be trusted to be border-box
                if ((!support.boxSizingReliable() && isBorderBox ||
                    val === "auto" ||
                    !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") &&
                    elem.getClientRects().length) {

                    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

                    // Where available, offsetWidth/offsetHeight approximate border box dimensions.
                    // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
                    // retrieved value as a content box dimension.
                    valueIsBorderBox = offsetProp in elem;
                    if (valueIsBorderBox) {
                        val = elem[offsetProp];
                    }
                }

                // Normalize "" and auto
                val = parseFloat(val) || 0;

                // Adjust for the element's box model
                return (val +
                    boxModelAdjustment(
                        elem,
                        dimension,
                        extra || (isBorderBox ? "border" : "content"),
                        valueIsBorderBox,
                        styles,

                        // Provide the current computed size to request scroll gutter calculation (gh-3589)
                        val
                    )
                ) + "px";
            }

            jQuery.extend({

                // Add in style property hooks for overriding the default
                // behavior of getting and setting a style property
                cssHooks: {
                    opacity: {
                        get: function (elem, computed) {
                            if (computed) {

                                // We should always get a number back from opacity
                                var ret = curCSS(elem, "opacity");
                                return ret === "" ? "1" : ret;
                            }
                        }
                    }
                },

                // Don't automatically add "px" to these possibly-unitless properties
                cssNumber: {
                    "animationIterationCount": true,
                    "columnCount": true,
                    "fillOpacity": true,
                    "flexGrow": true,
                    "flexShrink": true,
                    "fontWeight": true,
                    "gridArea": true,
                    "gridColumn": true,
                    "gridColumnEnd": true,
                    "gridColumnStart": true,
                    "gridRow": true,
                    "gridRowEnd": true,
                    "gridRowStart": true,
                    "lineHeight": true,
                    "opacity": true,
                    "order": true,
                    "orphans": true,
                    "widows": true,
                    "zIndex": true,
                    "zoom": true
                },

                // Add in properties whose names you wish to fix before
                // setting or getting the value
                cssProps: {},

                // Get and set the style property on a DOM Node
                style: function (elem, name, value, extra) {

                    // Don't set styles on text and comment nodes
                    if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                        return;
                    }

                    // Make sure that we're working with the right name
                    var ret, type, hooks,
                        origName = camelCase(name),
                        isCustomProp = rcustomProp.test(name),
                        style = elem.style;

                    // Make sure that we're working with the right name. We don't
                    // want to query the value if it is a CSS custom property
                    // since they are user-defined.
                    if (!isCustomProp) {
                        name = finalPropName(origName);
                    }

                    // Gets hook for the prefixed version, then unprefixed version
                    hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

                    // Check if we're setting a value
                    if (value !== undefined) {
                        type = typeof value;

                        // Convert "+=" or "-=" to relative numbers (#7345)
                        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                            value = adjustCSS(elem, name, ret);

                            // Fixes bug #9237
                            type = "number";
                        }

                        // Make sure that null and NaN values aren't set (#7116)
                        if (value == null || value !== value) {
                            return;
                        }

                        // If a number was passed in, add the unit (except for certain CSS properties)
                        // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
                        // "px" to a few hardcoded values.
                        if (type === "number" && !isCustomProp) {
                            value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
                        }

                        // background-* props affect original clone's values
                        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                            style[name] = "inherit";
                        }

                        // If a hook was provided, use that value, otherwise just set the specified value
                        if (!hooks || !("set" in hooks) ||
                            (value = hooks.set(elem, value, extra)) !== undefined) {

                            if (isCustomProp) {
                                style.setProperty(name, value);
                            } else {
                                style[name] = value;
                            }
                        }

                    } else {

                        // If a hook was provided get the non-computed value from there
                        if (hooks && "get" in hooks &&
                            (ret = hooks.get(elem, false, extra)) !== undefined) {

                            return ret;
                        }

                        // Otherwise just get the value from the style object
                        return style[name];
                    }
                },

                css: function (elem, name, extra, styles) {
                    var val, num, hooks,
                        origName = camelCase(name),
                        isCustomProp = rcustomProp.test(name);

                    // Make sure that we're working with the right name. We don't
                    // want to modify the value if it is a CSS custom property
                    // since they are user-defined.
                    if (!isCustomProp) {
                        name = finalPropName(origName);
                    }

                    // Try prefixed name followed by the unprefixed name
                    hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

                    // If a hook was provided get the computed value from there
                    if (hooks && "get" in hooks) {
                        val = hooks.get(elem, true, extra);
                    }

                    // Otherwise, if a way to get the computed value exists, use that
                    if (val === undefined) {
                        val = curCSS(elem, name, styles);
                    }

                    // Convert "normal" to computed value
                    if (val === "normal" && name in cssNormalTransform) {
                        val = cssNormalTransform[name];
                    }

                    // Make numeric if forced or a qualifier was provided and val looks numeric
                    if (extra === "" || extra) {
                        num = parseFloat(val);
                        return extra === true || isFinite(num) ? num || 0 : val;
                    }

                    return val;
                }
            });

            jQuery.each(["height", "width"], function (i, dimension) {
                jQuery.cssHooks[dimension] = {
                    get: function (elem, computed, extra) {
                        if (computed) {

                            // Certain elements can have dimension info if we invisibly show them
                            // but it must have a current display style that would benefit
                            return rdisplayswap.test(jQuery.css(elem, "display")) &&

                                // Support: Safari 8+
                                // Table columns in Safari have non-zero offsetWidth & zero
                                // getBoundingClientRect().width unless display is changed.
                                // Support: IE <=11 only
                                // Running getBoundingClientRect on a disconnected node
                                // in IE throws an error.
                                (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
                                swap(elem, cssShow, function () {
                                    return getWidthOrHeight(elem, dimension, extra);
                                }) :
                                getWidthOrHeight(elem, dimension, extra);
                        }
                    },

                    set: function (elem, value, extra) {
                        var matches,
                            styles = getStyles(elem),

                            // Only read styles.position if the test has a chance to fail
                            // to avoid forcing a reflow.
                            scrollboxSizeBuggy = !support.scrollboxSize() &&
                                styles.position === "absolute",

                            // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
                            boxSizingNeeded = scrollboxSizeBuggy || extra,
                            isBorderBox = boxSizingNeeded &&
                                jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                            subtract = extra ?
                                boxModelAdjustment(
                                    elem,
                                    dimension,
                                    extra,
                                    isBorderBox,
                                    styles
                                ) :
                                0;

                        // Account for unreliable border-box dimensions by comparing offset* to computed and
                        // faking a content-box to get border and padding (gh-3699)
                        if (isBorderBox && scrollboxSizeBuggy) {
                            subtract -= Math.ceil(
                                elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
                                parseFloat(styles[dimension]) -
                                boxModelAdjustment(elem, dimension, "border", false, styles) -
                                0.5
                            );
                        }

                        // Convert to pixels if value adjustment is needed
                        if (subtract && (matches = rcssNum.exec(value)) &&
                            (matches[3] || "px") !== "px") {

                            elem.style[dimension] = value;
                            value = jQuery.css(elem, dimension);
                        }

                        return setPositiveNumber(elem, value, subtract);
                    }
                };
            });

            jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
                function (elem, computed) {
                    if (computed) {
                        return (parseFloat(curCSS(elem, "marginLeft")) ||
                            elem.getBoundingClientRect().left -
                            swap(elem, { marginLeft: 0 }, function () {
                                return elem.getBoundingClientRect().left;
                            })
                        ) + "px";
                    }
                }
            );

            // These hooks are used by animate to expand properties
            jQuery.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function (prefix, suffix) {
                jQuery.cssHooks[prefix + suffix] = {
                    expand: function (value) {
                        var i = 0,
                            expanded = {},

                            // Assumes a single number if not a string
                            parts = typeof value === "string" ? value.split(" ") : [value];

                        for (; i < 4; i++) {
                            expanded[prefix + cssExpand[i] + suffix] =
                                parts[i] || parts[i - 2] || parts[0];
                        }

                        return expanded;
                    }
                };

                if (prefix !== "margin") {
                    jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
                }
            });

            jQuery.fn.extend({
                css: function (name, value) {
                    return access(this, function (elem, name, value) {
                        var styles, len,
                            map = {},
                            i = 0;

                        if (Array.isArray(name)) {
                            styles = getStyles(elem);
                            len = name.length;

                            for (; i < len; i++) {
                                map[name[i]] = jQuery.css(elem, name[i], false, styles);
                            }

                            return map;
                        }

                        return value !== undefined ?
                            jQuery.style(elem, name, value) :
                            jQuery.css(elem, name);
                    }, name, value, arguments.length > 1);
                }
            });


            function Tween(elem, options, prop, end, easing) {
                return new Tween.prototype.init(elem, options, prop, end, easing);
            }
            jQuery.Tween = Tween;

            Tween.prototype = {
                constructor: Tween,
                init: function (elem, options, prop, end, easing, unit) {
                    this.elem = elem;
                    this.prop = prop;
                    this.easing = easing || jQuery.easing._default;
                    this.options = options;
                    this.start = this.now = this.cur();
                    this.end = end;
                    this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
                },
                cur: function () {
                    var hooks = Tween.propHooks[this.prop];

                    return hooks && hooks.get ?
                        hooks.get(this) :
                        Tween.propHooks._default.get(this);
                },
                run: function (percent) {
                    var eased,
                        hooks = Tween.propHooks[this.prop];

                    if (this.options.duration) {
                        this.pos = eased = jQuery.easing[this.easing](
                            percent, this.options.duration * percent, 0, 1, this.options.duration
                        );
                    } else {
                        this.pos = eased = percent;
                    }
                    this.now = (this.end - this.start) * eased + this.start;

                    if (this.options.step) {
                        this.options.step.call(this.elem, this.now, this);
                    }

                    if (hooks && hooks.set) {
                        hooks.set(this);
                    } else {
                        Tween.propHooks._default.set(this);
                    }
                    return this;
                }
            };

            Tween.prototype.init.prototype = Tween.prototype;

            Tween.propHooks = {
                _default: {
                    get: function (tween) {
                        var result;

                        // Use a property on the element directly when it is not a DOM element,
                        // or when there is no matching style property that exists.
                        if (tween.elem.nodeType !== 1 ||
                            tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                            return tween.elem[tween.prop];
                        }

                        // Passing an empty string as a 3rd parameter to .css will automatically
                        // attempt a parseFloat and fallback to a string if the parse fails.
                        // Simple values such as "10px" are parsed to Float;
                        // complex values such as "rotate(1rad)" are returned as-is.
                        result = jQuery.css(tween.elem, tween.prop, "");

                        // Empty strings, null, undefined and "auto" are converted to 0.
                        return !result || result === "auto" ? 0 : result;
                    },
                    set: function (tween) {

                        // Use step hook for back compat.
                        // Use cssHook if its there.
                        // Use .style if available and use plain properties where available.
                        if (jQuery.fx.step[tween.prop]) {
                            jQuery.fx.step[tween.prop](tween);
                        } else if (tween.elem.nodeType === 1 && (
                            jQuery.cssHooks[tween.prop] ||
                            tween.elem.style[finalPropName(tween.prop)] != null)) {
                            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                        } else {
                            tween.elem[tween.prop] = tween.now;
                        }
                    }
                }
            };

            // Support: IE <=9 only
            // Panic based approach to setting things on disconnected nodes
            Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
                set: function (tween) {
                    if (tween.elem.nodeType && tween.elem.parentNode) {
                        tween.elem[tween.prop] = tween.now;
                    }
                }
            };

            jQuery.easing = {
                linear: function (p) {
                    return p;
                },
                swing: function (p) {
                    return 0.5 - Math.cos(p * Math.PI) / 2;
                },
                _default: "swing"
            };

            jQuery.fx = Tween.prototype.init;

            // Back compat <1.8 extension point
            jQuery.fx.step = {};




            var
                fxNow, inProgress,
                rfxtypes = /^(?:toggle|show|hide)$/,
                rrun = /queueHooks$/;

            function schedule() {
                if (inProgress) {
                    if (document.hidden === false && window.requestAnimationFrame) {
                        window.requestAnimationFrame(schedule);
                    } else {
                        window.setTimeout(schedule, jQuery.fx.interval);
                    }

                    jQuery.fx.tick();
                }
            }

            // Animations created synchronously will run synchronously
            function createFxNow() {
                window.setTimeout(function () {
                    fxNow = undefined;
                });
                return (fxNow = Date.now());
            }

            // Generate parameters to create a standard animation
            function genFx(type, includeWidth) {
                var which,
                    i = 0,
                    attrs = { height: type };

                // If we include width, step value is 1 to do all cssExpand values,
                // otherwise step value is 2 to skip over Left and Right
                includeWidth = includeWidth ? 1 : 0;
                for (; i < 4; i += 2 - includeWidth) {
                    which = cssExpand[i];
                    attrs["margin" + which] = attrs["padding" + which] = type;
                }

                if (includeWidth) {
                    attrs.opacity = attrs.width = type;
                }

                return attrs;
            }

            function createTween(value, prop, animation) {
                var tween,
                    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
                    index = 0,
                    length = collection.length;
                for (; index < length; index++) {
                    if ((tween = collection[index].call(animation, prop, value))) {

                        // We're done with this property
                        return tween;
                    }
                }
            }

            function defaultPrefilter(elem, props, opts) {
                var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
                    isBox = "width" in props || "height" in props,
                    anim = this,
                    orig = {},
                    style = elem.style,
                    hidden = elem.nodeType && isHiddenWithinTree(elem),
                    dataShow = dataPriv.get(elem, "fxshow");

                // Queue-skipping animations hijack the fx hooks
                if (!opts.queue) {
                    hooks = jQuery._queueHooks(elem, "fx");
                    if (hooks.unqueued == null) {
                        hooks.unqueued = 0;
                        oldfire = hooks.empty.fire;
                        hooks.empty.fire = function () {
                            if (!hooks.unqueued) {
                                oldfire();
                            }
                        };
                    }
                    hooks.unqueued++;

                    anim.always(function () {

                        // Ensure the complete handler is called before this completes
                        anim.always(function () {
                            hooks.unqueued--;
                            if (!jQuery.queue(elem, "fx").length) {
                                hooks.empty.fire();
                            }
                        });
                    });
                }

                // Detect show/hide animations
                for (prop in props) {
                    value = props[prop];
                    if (rfxtypes.test(value)) {
                        delete props[prop];
                        toggle = toggle || value === "toggle";
                        if (value === (hidden ? "hide" : "show")) {

                            // Pretend to be hidden if this is a "show" and
                            // there is still data from a stopped show/hide
                            if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                                hidden = true;

                                // Ignore all other no-op show/hide data
                            } else {
                                continue;
                            }
                        }
                        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
                    }
                }

                // Bail out if this is a no-op like .hide().hide()
                propTween = !jQuery.isEmptyObject(props);
                if (!propTween && jQuery.isEmptyObject(orig)) {
                    return;
                }

                // Restrict "overflow" and "display" styles during box animations
                if (isBox && elem.nodeType === 1) {

                    // Support: IE <=9 - 11, Edge 12 - 15
                    // Record all 3 overflow attributes because IE does not infer the shorthand
                    // from identically-valued overflowX and overflowY and Edge just mirrors
                    // the overflowX value there.
                    opts.overflow = [style.overflow, style.overflowX, style.overflowY];

                    // Identify a display type, preferring old show/hide data over the CSS cascade
                    restoreDisplay = dataShow && dataShow.display;
                    if (restoreDisplay == null) {
                        restoreDisplay = dataPriv.get(elem, "display");
                    }
                    display = jQuery.css(elem, "display");
                    if (display === "none") {
                        if (restoreDisplay) {
                            display = restoreDisplay;
                        } else {

                            // Get nonempty value(s) by temporarily forcing visibility
                            showHide([elem], true);
                            restoreDisplay = elem.style.display || restoreDisplay;
                            display = jQuery.css(elem, "display");
                            showHide([elem]);
                        }
                    }

                    // Animate inline elements as inline-block
                    if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
                        if (jQuery.css(elem, "float") === "none") {

                            // Restore the original display value at the end of pure show/hide animations
                            if (!propTween) {
                                anim.done(function () {
                                    style.display = restoreDisplay;
                                });
                                if (restoreDisplay == null) {
                                    display = style.display;
                                    restoreDisplay = display === "none" ? "" : display;
                                }
                            }
                            style.display = "inline-block";
                        }
                    }
                }

                if (opts.overflow) {
                    style.overflow = "hidden";
                    anim.always(function () {
                        style.overflow = opts.overflow[0];
                        style.overflowX = opts.overflow[1];
                        style.overflowY = opts.overflow[2];
                    });
                }

                // Implement show/hide animations
                propTween = false;
                for (prop in orig) {

                    // General show/hide setup for this element animation
                    if (!propTween) {
                        if (dataShow) {
                            if ("hidden" in dataShow) {
                                hidden = dataShow.hidden;
                            }
                        } else {
                            dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
                        }

                        // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                        if (toggle) {
                            dataShow.hidden = !hidden;
                        }

                        // Show elements before animating them
                        if (hidden) {
                            showHide([elem], true);
                        }

                        /* eslint-disable no-loop-func */

                        anim.done(function () {

                            /* eslint-enable no-loop-func */

                            // The final step of a "hide" animation is actually hiding the element
                            if (!hidden) {
                                showHide([elem]);
                            }
                            dataPriv.remove(elem, "fxshow");
                            for (prop in orig) {
                                jQuery.style(elem, prop, orig[prop]);
                            }
                        });
                    }

                    // Per-property setup
                    propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                    if (!(prop in dataShow)) {
                        dataShow[prop] = propTween.start;
                        if (hidden) {
                            propTween.end = propTween.start;
                            propTween.start = 0;
                        }
                    }
                }
            }

            function propFilter(props, specialEasing) {
                var index, name, easing, value, hooks;

                // camelCase, specialEasing and expand cssHook pass
                for (index in props) {
                    name = camelCase(index);
                    easing = specialEasing[name];
                    value = props[index];
                    if (Array.isArray(value)) {
                        easing = value[1];
                        value = props[index] = value[0];
                    }

                    if (index !== name) {
                        props[name] = value;
                        delete props[index];
                    }

                    hooks = jQuery.cssHooks[name];
                    if (hooks && "expand" in hooks) {
                        value = hooks.expand(value);
                        delete props[name];

                        // Not quite $.extend, this won't overwrite existing keys.
                        // Reusing 'index' because we have the correct "name"
                        for (index in value) {
                            if (!(index in props)) {
                                props[index] = value[index];
                                specialEasing[index] = easing;
                            }
                        }
                    } else {
                        specialEasing[name] = easing;
                    }
                }
            }

            function Animation(elem, properties, options) {
                var result,
                    stopped,
                    index = 0,
                    length = Animation.prefilters.length,
                    deferred = jQuery.Deferred().always(function () {

                        // Don't match elem in the :animated selector
                        delete tick.elem;
                    }),
                    tick = function () {
                        if (stopped) {
                            return false;
                        }
                        var currentTime = fxNow || createFxNow(),
                            remaining = Math.max(0, animation.startTime + animation.duration - currentTime),

                            // Support: Android 2.3 only
                            // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                            temp = remaining / animation.duration || 0,
                            percent = 1 - temp,
                            index = 0,
                            length = animation.tweens.length;

                        for (; index < length; index++) {
                            animation.tweens[index].run(percent);
                        }

                        deferred.notifyWith(elem, [animation, percent, remaining]);

                        // If there's more to do, yield
                        if (percent < 1 && length) {
                            return remaining;
                        }

                        // If this was an empty animation, synthesize a final progress notification
                        if (!length) {
                            deferred.notifyWith(elem, [animation, 1, 0]);
                        }

                        // Resolve the animation and report its conclusion
                        deferred.resolveWith(elem, [animation]);
                        return false;
                    },
                    animation = deferred.promise({
                        elem: elem,
                        props: jQuery.extend({}, properties),
                        opts: jQuery.extend(true, {
                            specialEasing: {},
                            easing: jQuery.easing._default
                        }, options),
                        originalProperties: properties,
                        originalOptions: options,
                        startTime: fxNow || createFxNow(),
                        duration: options.duration,
                        tweens: [],
                        createTween: function (prop, end) {
                            var tween = jQuery.Tween(elem, animation.opts, prop, end,
                                animation.opts.specialEasing[prop] || animation.opts.easing);
                            animation.tweens.push(tween);
                            return tween;
                        },
                        stop: function (gotoEnd) {
                            var index = 0,

                                // If we are going to the end, we want to run all the tweens
                                // otherwise we skip this part
                                length = gotoEnd ? animation.tweens.length : 0;
                            if (stopped) {
                                return this;
                            }
                            stopped = true;
                            for (; index < length; index++) {
                                animation.tweens[index].run(1);
                            }

                            // Resolve when we played the last frame; otherwise, reject
                            if (gotoEnd) {
                                deferred.notifyWith(elem, [animation, 1, 0]);
                                deferred.resolveWith(elem, [animation, gotoEnd]);
                            } else {
                                deferred.rejectWith(elem, [animation, gotoEnd]);
                            }
                            return this;
                        }
                    }),
                    props = animation.props;

                propFilter(props, animation.opts.specialEasing);

                for (; index < length; index++) {
                    result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
                    if (result) {
                        if (isFunction(result.stop)) {
                            jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
                                result.stop.bind(result);
                        }
                        return result;
                    }
                }

                jQuery.map(props, createTween, animation);

                if (isFunction(animation.opts.start)) {
                    animation.opts.start.call(elem, animation);
                }

                // Attach callbacks from options
                animation
                    .progress(animation.opts.progress)
                    .done(animation.opts.done, animation.opts.complete)
                    .fail(animation.opts.fail)
                    .always(animation.opts.always);

                jQuery.fx.timer(
                    jQuery.extend(tick, {
                        elem: elem,
                        anim: animation,
                        queue: animation.opts.queue
                    })
                );

                return animation;
            }

            jQuery.Animation = jQuery.extend(Animation, {

                tweeners: {
                    "*": [function (prop, value) {
                        var tween = this.createTween(prop, value);
                        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                        return tween;
                    }]
                },

                tweener: function (props, callback) {
                    if (isFunction(props)) {
                        callback = props;
                        props = ["*"];
                    } else {
                        props = props.match(rnothtmlwhite);
                    }

                    var prop,
                        index = 0,
                        length = props.length;

                    for (; index < length; index++) {
                        prop = props[index];
                        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                        Animation.tweeners[prop].unshift(callback);
                    }
                },

                prefilters: [defaultPrefilter],

                prefilter: function (callback, prepend) {
                    if (prepend) {
                        Animation.prefilters.unshift(callback);
                    } else {
                        Animation.prefilters.push(callback);
                    }
                }
            });

            jQuery.speed = function (speed, easing, fn) {
                var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                    complete: fn || !fn && easing ||
                        isFunction(speed) && speed,
                    duration: speed,
                    easing: fn && easing || easing && !isFunction(easing) && easing
                };

                // Go to the end state if fx are off
                if (jQuery.fx.off) {
                    opt.duration = 0;

                } else {
                    if (typeof opt.duration !== "number") {
                        if (opt.duration in jQuery.fx.speeds) {
                            opt.duration = jQuery.fx.speeds[opt.duration];

                        } else {
                            opt.duration = jQuery.fx.speeds._default;
                        }
                    }
                }

                // Normalize opt.queue - true/undefined/null -> "fx"
                if (opt.queue == null || opt.queue === true) {
                    opt.queue = "fx";
                }

                // Queueing
                opt.old = opt.complete;

                opt.complete = function () {
                    if (isFunction(opt.old)) {
                        opt.old.call(this);
                    }

                    if (opt.queue) {
                        jQuery.dequeue(this, opt.queue);
                    }
                };

                return opt;
            };

            jQuery.fn.extend({
                fadeTo: function (speed, to, easing, callback) {

                    // Show any hidden elements after setting opacity to 0
                    return this.filter(isHiddenWithinTree).css("opacity", 0).show()

                        // Animate to the value specified
                        .end().animate({ opacity: to }, speed, easing, callback);
                },
                animate: function (prop, speed, easing, callback) {
                    var empty = jQuery.isEmptyObject(prop),
                        optall = jQuery.speed(speed, easing, callback),
                        doAnimation = function () {

                            // Operate on a copy of prop so per-property easing won't be lost
                            var anim = Animation(this, jQuery.extend({}, prop), optall);

                            // Empty animations, or finishing resolves immediately
                            if (empty || dataPriv.get(this, "finish")) {
                                anim.stop(true);
                            }
                        };
                    doAnimation.finish = doAnimation;

                    return empty || optall.queue === false ?
                        this.each(doAnimation) :
                        this.queue(optall.queue, doAnimation);
                },
                stop: function (type, clearQueue, gotoEnd) {
                    var stopQueue = function (hooks) {
                        var stop = hooks.stop;
                        delete hooks.stop;
                        stop(gotoEnd);
                    };

                    if (typeof type !== "string") {
                        gotoEnd = clearQueue;
                        clearQueue = type;
                        type = undefined;
                    }
                    if (clearQueue && type !== false) {
                        this.queue(type || "fx", []);
                    }

                    return this.each(function () {
                        var dequeue = true,
                            index = type != null && type + "queueHooks",
                            timers = jQuery.timers,
                            data = dataPriv.get(this);

                        if (index) {
                            if (data[index] && data[index].stop) {
                                stopQueue(data[index]);
                            }
                        } else {
                            for (index in data) {
                                if (data[index] && data[index].stop && rrun.test(index)) {
                                    stopQueue(data[index]);
                                }
                            }
                        }

                        for (index = timers.length; index--;) {
                            if (timers[index].elem === this &&
                                (type == null || timers[index].queue === type)) {

                                timers[index].anim.stop(gotoEnd);
                                dequeue = false;
                                timers.splice(index, 1);
                            }
                        }

                        // Start the next in the queue if the last step wasn't forced.
                        // Timers currently will call their complete callbacks, which
                        // will dequeue but only if they were gotoEnd.
                        if (dequeue || !gotoEnd) {
                            jQuery.dequeue(this, type);
                        }
                    });
                },
                finish: function (type) {
                    if (type !== false) {
                        type = type || "fx";
                    }
                    return this.each(function () {
                        var index,
                            data = dataPriv.get(this),
                            queue = data[type + "queue"],
                            hooks = data[type + "queueHooks"],
                            timers = jQuery.timers,
                            length = queue ? queue.length : 0;

                        // Enable finishing flag on private data
                        data.finish = true;

                        // Empty the queue first
                        jQuery.queue(this, type, []);

                        if (hooks && hooks.stop) {
                            hooks.stop.call(this, true);
                        }

                        // Look for any active animations, and finish them
                        for (index = timers.length; index--;) {
                            if (timers[index].elem === this && timers[index].queue === type) {
                                timers[index].anim.stop(true);
                                timers.splice(index, 1);
                            }
                        }

                        // Look for any animations in the old queue and finish them
                        for (index = 0; index < length; index++) {
                            if (queue[index] && queue[index].finish) {
                                queue[index].finish.call(this);
                            }
                        }

                        // Turn off finishing flag
                        delete data.finish;
                    });
                }
            });

            jQuery.each(["toggle", "show", "hide"], function (i, name) {
                var cssFn = jQuery.fn[name];
                jQuery.fn[name] = function (speed, easing, callback) {
                    return speed == null || typeof speed === "boolean" ?
                        cssFn.apply(this, arguments) :
                        this.animate(genFx(name, true), speed, easing, callback);
                };
            });

            // Generate shortcuts for custom animations
            jQuery.each({
                slideDown: genFx("show"),
                slideUp: genFx("hide"),
                slideToggle: genFx("toggle"),
                fadeIn: { opacity: "show" },
                fadeOut: { opacity: "hide" },
                fadeToggle: { opacity: "toggle" }
            }, function (name, props) {
                jQuery.fn[name] = function (speed, easing, callback) {
                    return this.animate(props, speed, easing, callback);
                };
            });

            jQuery.timers = [];
            jQuery.fx.tick = function () {
                var timer,
                    i = 0,
                    timers = jQuery.timers;

                fxNow = Date.now();

                for (; i < timers.length; i++) {
                    timer = timers[i];

                    // Run the timer and safely remove it when done (allowing for external removal)
                    if (!timer() && timers[i] === timer) {
                        timers.splice(i--, 1);
                    }
                }

                if (!timers.length) {
                    jQuery.fx.stop();
                }
                fxNow = undefined;
            };

            jQuery.fx.timer = function (timer) {
                jQuery.timers.push(timer);
                jQuery.fx.start();
            };

            jQuery.fx.interval = 13;
            jQuery.fx.start = function () {
                if (inProgress) {
                    return;
                }

                inProgress = true;
                schedule();
            };

            jQuery.fx.stop = function () {
                inProgress = null;
            };

            jQuery.fx.speeds = {
                slow: 600,
                fast: 200,

                // Default speed
                _default: 400
            };


            // Based off of the plugin by Clint Helfers, with permission.
            // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
            jQuery.fn.delay = function (time, type) {
                time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
                type = type || "fx";

                return this.queue(type, function (next, hooks) {
                    var timeout = window.setTimeout(next, time);
                    hooks.stop = function () {
                        window.clearTimeout(timeout);
                    };
                });
            };


            (function () {
                var input = document.createElement("input"),
                    select = document.createElement("select"),
                    opt = select.appendChild(document.createElement("option"));

                input.type = "checkbox";

                // Support: Android <=4.3 only
                // Default value for a checkbox should be "on"
                support.checkOn = input.value !== "";

                // Support: IE <=11 only
                // Must access selectedIndex to make default options select
                support.optSelected = opt.selected;

                // Support: IE <=11 only
                // An input loses its value after becoming a radio
                input = document.createElement("input");
                input.value = "t";
                input.type = "radio";
                support.radioValue = input.value === "t";
            })();


            var boolHook,
                attrHandle = jQuery.expr.attrHandle;

            jQuery.fn.extend({
                attr: function (name, value) {
                    return access(this, jQuery.attr, name, value, arguments.length > 1);
                },

                removeAttr: function (name) {
                    return this.each(function () {
                        jQuery.removeAttr(this, name);
                    });
                }
            });

            jQuery.extend({
                attr: function (elem, name, value) {
                    var ret, hooks,
                        nType = elem.nodeType;

                    // Don't get/set attributes on text, comment and attribute nodes
                    if (nType === 3 || nType === 8 || nType === 2) {
                        return;
                    }

                    // Fallback to prop when attributes are not supported
                    if (typeof elem.getAttribute === "undefined") {
                        return jQuery.prop(elem, name, value);
                    }

                    // Attribute hooks are determined by the lowercase version
                    // Grab necessary hook if one is defined
                    if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                        hooks = jQuery.attrHooks[name.toLowerCase()] ||
                            (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
                    }

                    if (value !== undefined) {
                        if (value === null) {
                            jQuery.removeAttr(elem, name);
                            return;
                        }

                        if (hooks && "set" in hooks &&
                            (ret = hooks.set(elem, value, name)) !== undefined) {
                            return ret;
                        }

                        elem.setAttribute(name, value + "");
                        return value;
                    }

                    if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                        return ret;
                    }

                    ret = jQuery.find.attr(elem, name);

                    // Non-existent attributes return null, we normalize to undefined
                    return ret == null ? undefined : ret;
                },

                attrHooks: {
                    type: {
                        set: function (elem, value) {
                            if (!support.radioValue && value === "radio" &&
                                nodeName(elem, "input")) {
                                var val = elem.value;
                                elem.setAttribute("type", value);
                                if (val) {
                                    elem.value = val;
                                }
                                return value;
                            }
                        }
                    }
                },

                removeAttr: function (elem, value) {
                    var name,
                        i = 0,

                        // Attribute names can contain non-HTML whitespace characters
                        // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                        attrNames = value && value.match(rnothtmlwhite);

                    if (attrNames && elem.nodeType === 1) {
                        while ((name = attrNames[i++])) {
                            elem.removeAttribute(name);
                        }
                    }
                }
            });

            // Hooks for boolean attributes
            boolHook = {
                set: function (elem, value, name) {
                    if (value === false) {

                        // Remove boolean attributes when set to false
                        jQuery.removeAttr(elem, name);
                    } else {
                        elem.setAttribute(name, name);
                    }
                    return name;
                }
            };

            jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
                var getter = attrHandle[name] || jQuery.find.attr;

                attrHandle[name] = function (elem, name, isXML) {
                    var ret, handle,
                        lowercaseName = name.toLowerCase();

                    if (!isXML) {

                        // Avoid an infinite loop by temporarily removing this function from the getter
                        handle = attrHandle[lowercaseName];
                        attrHandle[lowercaseName] = ret;
                        ret = getter(elem, name, isXML) != null ?
                            lowercaseName :
                            null;
                        attrHandle[lowercaseName] = handle;
                    }
                    return ret;
                };
            });




            var rfocusable = /^(?:input|select|textarea|button)$/i,
                rclickable = /^(?:a|area)$/i;

            jQuery.fn.extend({
                prop: function (name, value) {
                    return access(this, jQuery.prop, name, value, arguments.length > 1);
                },

                removeProp: function (name) {
                    return this.each(function () {
                        delete this[jQuery.propFix[name] || name];
                    });
                }
            });

            jQuery.extend({
                prop: function (elem, name, value) {
                    var ret, hooks,
                        nType = elem.nodeType;

                    // Don't get/set properties on text, comment and attribute nodes
                    if (nType === 3 || nType === 8 || nType === 2) {
                        return;
                    }

                    if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

                        // Fix name and attach hooks
                        name = jQuery.propFix[name] || name;
                        hooks = jQuery.propHooks[name];
                    }

                    if (value !== undefined) {
                        if (hooks && "set" in hooks &&
                            (ret = hooks.set(elem, value, name)) !== undefined) {
                            return ret;
                        }

                        return (elem[name] = value);
                    }

                    if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                        return ret;
                    }

                    return elem[name];
                },

                propHooks: {
                    tabIndex: {
                        get: function (elem) {

                            // Support: IE <=9 - 11 only
                            // elem.tabIndex doesn't always return the
                            // correct value when it hasn't been explicitly set
                            // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                            // Use proper attribute retrieval(#12072)
                            var tabindex = jQuery.find.attr(elem, "tabindex");

                            if (tabindex) {
                                return parseInt(tabindex, 10);
                            }

                            if (
                                rfocusable.test(elem.nodeName) ||
                                rclickable.test(elem.nodeName) &&
                                elem.href
                            ) {
                                return 0;
                            }

                            return -1;
                        }
                    }
                },

                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                }
            });

            // Support: IE <=11 only
            // Accessing the selectedIndex property
            // forces the browser to respect setting selected
            // on the option
            // The getter ensures a default option is selected
            // when in an optgroup
            // eslint rule "no-unused-expressions" is disabled for this code
            // since it considers such accessions noop
            if (!support.optSelected) {
                jQuery.propHooks.selected = {
                    get: function (elem) {

                        /* eslint no-unused-expressions: "off" */

                        var parent = elem.parentNode;
                        if (parent && parent.parentNode) {
                            parent.parentNode.selectedIndex;
                        }
                        return null;
                    },
                    set: function (elem) {

                        /* eslint no-unused-expressions: "off" */

                        var parent = elem.parentNode;
                        if (parent) {
                            parent.selectedIndex;

                            if (parent.parentNode) {
                                parent.parentNode.selectedIndex;
                            }
                        }
                    }
                };
            }

            jQuery.each([
                "tabIndex",
                "readOnly",
                "maxLength",
                "cellSpacing",
                "cellPadding",
                "rowSpan",
                "colSpan",
                "useMap",
                "frameBorder",
                "contentEditable"
            ], function () {
                jQuery.propFix[this.toLowerCase()] = this;
            });




            // Strip and collapse whitespace according to HTML spec
            // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
            function stripAndCollapse(value) {
                var tokens = value.match(rnothtmlwhite) || [];
                return tokens.join(" ");
            }


            function getClass(elem) {
                return elem.getAttribute && elem.getAttribute("class") || "";
            }

            function classesToArray(value) {
                if (Array.isArray(value)) {
                    return value;
                }
                if (typeof value === "string") {
                    return value.match(rnothtmlwhite) || [];
                }
                return [];
            }

            jQuery.fn.extend({
                addClass: function (value) {
                    var classes, elem, cur, curValue, clazz, j, finalValue,
                        i = 0;

                    if (isFunction(value)) {
                        return this.each(function (j) {
                            jQuery(this).addClass(value.call(this, j, getClass(this)));
                        });
                    }

                    classes = classesToArray(value);

                    if (classes.length) {
                        while ((elem = this[i++])) {
                            curValue = getClass(elem);
                            cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");

                            if (cur) {
                                j = 0;
                                while ((clazz = classes[j++])) {
                                    if (cur.indexOf(" " + clazz + " ") < 0) {
                                        cur += clazz + " ";
                                    }
                                }

                                // Only assign if different to avoid unneeded rendering.
                                finalValue = stripAndCollapse(cur);
                                if (curValue !== finalValue) {
                                    elem.setAttribute("class", finalValue);
                                }
                            }
                        }
                    }

                    return this;
                },

                removeClass: function (value) {
                    var classes, elem, cur, curValue, clazz, j, finalValue,
                        i = 0;

                    if (isFunction(value)) {
                        return this.each(function (j) {
                            jQuery(this).removeClass(value.call(this, j, getClass(this)));
                        });
                    }

                    if (!arguments.length) {
                        return this.attr("class", "");
                    }

                    classes = classesToArray(value);

                    if (classes.length) {
                        while ((elem = this[i++])) {
                            curValue = getClass(elem);

                            // This expression is here for better compressibility (see addClass)
                            cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");

                            if (cur) {
                                j = 0;
                                while ((clazz = classes[j++])) {

                                    // Remove *all* instances
                                    while (cur.indexOf(" " + clazz + " ") > -1) {
                                        cur = cur.replace(" " + clazz + " ", " ");
                                    }
                                }

                                // Only assign if different to avoid unneeded rendering.
                                finalValue = stripAndCollapse(cur);
                                if (curValue !== finalValue) {
                                    elem.setAttribute("class", finalValue);
                                }
                            }
                        }
                    }

                    return this;
                },

                toggleClass: function (value, stateVal) {
                    var type = typeof value,
                        isValidValue = type === "string" || Array.isArray(value);

                    if (typeof stateVal === "boolean" && isValidValue) {
                        return stateVal ? this.addClass(value) : this.removeClass(value);
                    }

                    if (isFunction(value)) {
                        return this.each(function (i) {
                            jQuery(this).toggleClass(
                                value.call(this, i, getClass(this), stateVal),
                                stateVal
                            );
                        });
                    }

                    return this.each(function () {
                        var className, i, self, classNames;

                        if (isValidValue) {

                            // Toggle individual class names
                            i = 0;
                            self = jQuery(this);
                            classNames = classesToArray(value);

                            while ((className = classNames[i++])) {

                                // Check each className given, space separated list
                                if (self.hasClass(className)) {
                                    self.removeClass(className);
                                } else {
                                    self.addClass(className);
                                }
                            }

                            // Toggle whole class name
                        } else if (value === undefined || type === "boolean") {
                            className = getClass(this);
                            if (className) {

                                // Store className if set
                                dataPriv.set(this, "__className__", className);
                            }

                            // If the element has a class name or if we're passed `false`,
                            // then remove the whole classname (if there was one, the above saved it).
                            // Otherwise bring back whatever was previously saved (if anything),
                            // falling back to the empty string if nothing was stored.
                            if (this.setAttribute) {
                                this.setAttribute("class",
                                    className || value === false ?
                                        "" :
                                        dataPriv.get(this, "__className__") || ""
                                );
                            }
                        }
                    });
                },

                hasClass: function (selector) {
                    var className, elem,
                        i = 0;

                    className = " " + selector + " ";
                    while ((elem = this[i++])) {
                        if (elem.nodeType === 1 &&
                            (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                            return true;
                        }
                    }

                    return false;
                }
            });




            var rreturn = /\r/g;

            jQuery.fn.extend({
                val: function (value) {
                    var hooks, ret, valueIsFunction,
                        elem = this[0];

                    if (!arguments.length) {
                        if (elem) {
                            hooks = jQuery.valHooks[elem.type] ||
                                jQuery.valHooks[elem.nodeName.toLowerCase()];

                            if (hooks &&
                                "get" in hooks &&
                                (ret = hooks.get(elem, "value")) !== undefined
                            ) {
                                return ret;
                            }

                            ret = elem.value;

                            // Handle most common string cases
                            if (typeof ret === "string") {
                                return ret.replace(rreturn, "");
                            }

                            // Handle cases where value is null/undef or number
                            return ret == null ? "" : ret;
                        }

                        return;
                    }

                    valueIsFunction = isFunction(value);

                    return this.each(function (i) {
                        var val;

                        if (this.nodeType !== 1) {
                            return;
                        }

                        if (valueIsFunction) {
                            val = value.call(this, i, jQuery(this).val());
                        } else {
                            val = value;
                        }

                        // Treat null/undefined as ""; convert numbers to string
                        if (val == null) {
                            val = "";

                        } else if (typeof val === "number") {
                            val += "";

                        } else if (Array.isArray(val)) {
                            val = jQuery.map(val, function (value) {
                                return value == null ? "" : value + "";
                            });
                        }

                        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

                        // If set returns undefined, fall back to normal setting
                        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                            this.value = val;
                        }
                    });
                }
            });

            jQuery.extend({
                valHooks: {
                    option: {
                        get: function (elem) {

                            var val = jQuery.find.attr(elem, "value");
                            return val != null ?
                                val :

                                // Support: IE <=10 - 11 only
                                // option.text throws exceptions (#14686, #14858)
                                // Strip and collapse whitespace
                                // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                                stripAndCollapse(jQuery.text(elem));
                        }
                    },
                    select: {
                        get: function (elem) {
                            var value, option, i,
                                options = elem.options,
                                index = elem.selectedIndex,
                                one = elem.type === "select-one",
                                values = one ? null : [],
                                max = one ? index + 1 : options.length;

                            if (index < 0) {
                                i = max;

                            } else {
                                i = one ? index : 0;
                            }

                            // Loop through all the selected options
                            for (; i < max; i++) {
                                option = options[i];

                                // Support: IE <=9 only
                                // IE8-9 doesn't update selected after form reset (#2551)
                                if ((option.selected || i === index) &&

                                    // Don't return options that are disabled or in a disabled optgroup
                                    !option.disabled &&
                                    (!option.parentNode.disabled ||
                                        !nodeName(option.parentNode, "optgroup"))) {

                                    // Get the specific value for the option
                                    value = jQuery(option).val();

                                    // We don't need an array for one selects
                                    if (one) {
                                        return value;
                                    }

                                    // Multi-Selects return an array
                                    values.push(value);
                                }
                            }

                            return values;
                        },

                        set: function (elem, value) {
                            var optionSet, option,
                                options = elem.options,
                                values = jQuery.makeArray(value),
                                i = options.length;

                            while (i--) {
                                option = options[i];

                                /* eslint-disable no-cond-assign */

                                if (option.selected =
                                    jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1
                                ) {
                                    optionSet = true;
                                }

                                /* eslint-enable no-cond-assign */
                            }

                            // Force browsers to behave consistently when non-matching value is set
                            if (!optionSet) {
                                elem.selectedIndex = -1;
                            }
                            return values;
                        }
                    }
                }
            });

            // Radios and checkboxes getter/setter
            jQuery.each(["radio", "checkbox"], function () {
                jQuery.valHooks[this] = {
                    set: function (elem, value) {
                        if (Array.isArray(value)) {
                            return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
                        }
                    }
                };
                if (!support.checkOn) {
                    jQuery.valHooks[this].get = function (elem) {
                        return elem.getAttribute("value") === null ? "on" : elem.value;
                    };
                }
            });




            // Return jQuery for attributes-only inclusion


            support.focusin = "onfocusin" in window;


            var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
                stopPropagationCallback = function (e) {
                    e.stopPropagation();
                };

            jQuery.extend(jQuery.event, {

                trigger: function (event, data, elem, onlyHandlers) {

                    var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
                        eventPath = [elem || document],
                        type = hasOwn.call(event, "type") ? event.type : event,
                        namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

                    cur = lastElement = tmp = elem = elem || document;

                    // Don't do events on text and comment nodes
                    if (elem.nodeType === 3 || elem.nodeType === 8) {
                        return;
                    }

                    // focus/blur morphs to focusin/out; ensure we're not firing them right now
                    if (rfocusMorph.test(type + jQuery.event.triggered)) {
                        return;
                    }

                    if (type.indexOf(".") > -1) {

                        // Namespaced trigger; create a regexp to match event type in handle()
                        namespaces = type.split(".");
                        type = namespaces.shift();
                        namespaces.sort();
                    }
                    ontype = type.indexOf(":") < 0 && "on" + type;

                    // Caller can pass in a jQuery.Event object, Object, or just an event type string
                    event = event[jQuery.expando] ?
                        event :
                        new jQuery.Event(type, typeof event === "object" && event);

                    // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
                    event.isTrigger = onlyHandlers ? 2 : 3;
                    event.namespace = namespaces.join(".");
                    event.rnamespace = event.namespace ?
                        new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                        null;

                    // Clean up the event in case it is being reused
                    event.result = undefined;
                    if (!event.target) {
                        event.target = elem;
                    }

                    // Clone any incoming data and prepend the event, creating the handler arg list
                    data = data == null ?
                        [event] :
                        jQuery.makeArray(data, [event]);

                    // Allow special events to draw outside the lines
                    special = jQuery.event.special[type] || {};
                    if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                        return;
                    }

                    // Determine event propagation path in advance, per W3C events spec (#9951)
                    // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
                    if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {

                        bubbleType = special.delegateType || type;
                        if (!rfocusMorph.test(bubbleType + type)) {
                            cur = cur.parentNode;
                        }
                        for (; cur; cur = cur.parentNode) {
                            eventPath.push(cur);
                            tmp = cur;
                        }

                        // Only add window if we got to document (e.g., not plain obj or detached DOM)
                        if (tmp === (elem.ownerDocument || document)) {
                            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                        }
                    }

                    // Fire handlers on the event path
                    i = 0;
                    while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                        lastElement = cur;
                        event.type = i > 1 ?
                            bubbleType :
                            special.bindType || type;

                        // jQuery handler
                        handle = (dataPriv.get(cur, "events") || {})[event.type] &&
                            dataPriv.get(cur, "handle");
                        if (handle) {
                            handle.apply(cur, data);
                        }

                        // Native handler
                        handle = ontype && cur[ontype];
                        if (handle && handle.apply && acceptData(cur)) {
                            event.result = handle.apply(cur, data);
                            if (event.result === false) {
                                event.preventDefault();
                            }
                        }
                    }
                    event.type = type;

                    // If nobody prevented the default action, do it now
                    if (!onlyHandlers && !event.isDefaultPrevented()) {

                        if ((!special._default ||
                            special._default.apply(eventPath.pop(), data) === false) &&
                            acceptData(elem)) {

                            // Call a native DOM method on the target with the same name as the event.
                            // Don't do default actions on window, that's where global variables be (#6170)
                            if (ontype && isFunction(elem[type]) && !isWindow(elem)) {

                                // Don't re-trigger an onFOO event when we call its FOO() method
                                tmp = elem[ontype];

                                if (tmp) {
                                    elem[ontype] = null;
                                }

                                // Prevent re-triggering of the same event, since we already bubbled it above
                                jQuery.event.triggered = type;

                                if (event.isPropagationStopped()) {
                                    lastElement.addEventListener(type, stopPropagationCallback);
                                }

                                elem[type]();

                                if (event.isPropagationStopped()) {
                                    lastElement.removeEventListener(type, stopPropagationCallback);
                                }

                                jQuery.event.triggered = undefined;

                                if (tmp) {
                                    elem[ontype] = tmp;
                                }
                            }
                        }
                    }

                    return event.result;
                },

                // Piggyback on a donor event to simulate a different one
                // Used only for `focus(in | out)` events
                simulate: function (type, elem, event) {
                    var e = jQuery.extend(
                        new jQuery.Event(),
                        event,
                        {
                            type: type,
                            isSimulated: true
                        }
                    );

                    jQuery.event.trigger(e, null, elem);
                }

            });

            jQuery.fn.extend({

                trigger: function (type, data) {
                    return this.each(function () {
                        jQuery.event.trigger(type, data, this);
                    });
                },
                triggerHandler: function (type, data) {
                    var elem = this[0];
                    if (elem) {
                        return jQuery.event.trigger(type, data, elem, true);
                    }
                }
            });


            // Support: Firefox <=44
            // Firefox doesn't have focus(in | out) events
            // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
            //
            // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
            // focus(in | out) events fire after focus & blur events,
            // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
            // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
            if (!support.focusin) {
                jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

                    // Attach a single capturing handler on the document while someone wants focusin/focusout
                    var handler = function (event) {
                        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
                    };

                    jQuery.event.special[fix] = {
                        setup: function () {
                            var doc = this.ownerDocument || this,
                                attaches = dataPriv.access(doc, fix);

                            if (!attaches) {
                                doc.addEventListener(orig, handler, true);
                            }
                            dataPriv.access(doc, fix, (attaches || 0) + 1);
                        },
                        teardown: function () {
                            var doc = this.ownerDocument || this,
                                attaches = dataPriv.access(doc, fix) - 1;

                            if (!attaches) {
                                doc.removeEventListener(orig, handler, true);
                                dataPriv.remove(doc, fix);

                            } else {
                                dataPriv.access(doc, fix, attaches);
                            }
                        }
                    };
                });
            }
            var location = window.location;

            var nonce = Date.now();

            var rquery = (/\?/);



            // Cross-browser xml parsing
            jQuery.parseXML = function (data) {
                var xml;
                if (!data || typeof data !== "string") {
                    return null;
                }

                // Support: IE 9 - 11 only
                // IE throws on parseFromString with invalid input.
                try {
                    xml = (new window.DOMParser()).parseFromString(data, "text/xml");
                } catch (e) {
                    xml = undefined;
                }

                if (!xml || xml.getElementsByTagName("parsererror").length) {
                    jQuery.error("Invalid XML: " + data);
                }
                return xml;
            };


            var
                rbracket = /\[\]$/,
                rCRLF = /\r?\n/g,
                rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
                rsubmittable = /^(?:input|select|textarea|keygen)/i;

            function buildParams(prefix, obj, traditional, add) {
                var name;

                if (Array.isArray(obj)) {

                    // Serialize array item.
                    jQuery.each(obj, function (i, v) {
                        if (traditional || rbracket.test(prefix)) {

                            // Treat each array item as a scalar.
                            add(prefix, v);

                        } else {

                            // Item is non-scalar (array or object), encode its numeric index.
                            buildParams(
                                prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
                                v,
                                traditional,
                                add
                            );
                        }
                    });

                } else if (!traditional && toType(obj) === "object") {

                    // Serialize object item.
                    for (name in obj) {
                        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                    }

                } else {

                    // Serialize scalar item.
                    add(prefix, obj);
                }
            }

            // Serialize an array of form elements or a set of
            // key/values into a query string
            jQuery.param = function (a, traditional) {
                var prefix,
                    s = [],
                    add = function (key, valueOrFunction) {

                        // If value is a function, invoke it and use its return value
                        var value = isFunction(valueOrFunction) ?
                            valueOrFunction() :
                            valueOrFunction;

                        s[s.length] = encodeURIComponent(key) + "=" +
                            encodeURIComponent(value == null ? "" : value);
                    };

                if (a == null) {
                    return "";
                }

                // If an array was passed in, assume that it is an array of form elements.
                if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {

                    // Serialize the form elements
                    jQuery.each(a, function () {
                        add(this.name, this.value);
                    });

                } else {

                    // If traditional, encode the "old" way (the way 1.3.2 or older
                    // did it), otherwise encode params recursively.
                    for (prefix in a) {
                        buildParams(prefix, a[prefix], traditional, add);
                    }
                }

                // Return the resulting serialization
                return s.join("&");
            };

            jQuery.fn.extend({
                serialize: function () {
                    return jQuery.param(this.serializeArray());
                },
                serializeArray: function () {
                    return this.map(function () {

                        // Can add propHook for "elements" to filter or add form elements
                        var elements = jQuery.prop(this, "elements");
                        return elements ? jQuery.makeArray(elements) : this;
                    })
                        .filter(function () {
                            var type = this.type;

                            // Use .is( ":disabled" ) so that fieldset[disabled] works
                            return this.name && !jQuery(this).is(":disabled") &&
                                rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                                (this.checked || !rcheckableType.test(type));
                        })
                        .map(function (i, elem) {
                            var val = jQuery(this).val();

                            if (val == null) {
                                return null;
                            }

                            if (Array.isArray(val)) {
                                return jQuery.map(val, function (val) {
                                    return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                                });
                            }

                            return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                        }).get();
                }
            });


            var
                r20 = /%20/g,
                rhash = /#.*$/,
                rantiCache = /([?&])_=[^&]*/,
                rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

                // #7653, #8125, #8152: local protocol detection
                rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                rnoContent = /^(?:GET|HEAD)$/,
                rprotocol = /^\/\//,

                /* Prefilters
                 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
                 * 2) These are called:
                 *    - BEFORE asking for a transport
                 *    - AFTER param serialization (s.data is a string if s.processData is true)
                 * 3) key is the dataType
                 * 4) the catchall symbol "*" can be used
                 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
                 */
                prefilters = {},

                /* Transports bindings
                 * 1) key is the dataType
                 * 2) the catchall symbol "*" can be used
                 * 3) selection will start with transport dataType and THEN go to "*" if needed
                 */
                transports = {},

                // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
                allTypes = "*/".concat("*"),

                // Anchor tag for parsing the document origin
                originAnchor = document.createElement("a");
            originAnchor.href = location.href;

            // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
            function addToPrefiltersOrTransports(structure) {

                // dataTypeExpression is optional and defaults to "*"
                return function (dataTypeExpression, func) {

                    if (typeof dataTypeExpression !== "string") {
                        func = dataTypeExpression;
                        dataTypeExpression = "*";
                    }

                    var dataType,
                        i = 0,
                        dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

                    if (isFunction(func)) {

                        // For each dataType in the dataTypeExpression
                        while ((dataType = dataTypes[i++])) {

                            // Prepend if requested
                            if (dataType[0] === "+") {
                                dataType = dataType.slice(1) || "*";
                                (structure[dataType] = structure[dataType] || []).unshift(func);

                                // Otherwise append
                            } else {
                                (structure[dataType] = structure[dataType] || []).push(func);
                            }
                        }
                    }
                };
            }

            // Base inspection function for prefilters and transports
            function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

                var inspected = {},
                    seekingTransport = (structure === transports);

                function inspect(dataType) {
                    var selected;
                    inspected[dataType] = true;
                    jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                        if (typeof dataTypeOrTransport === "string" &&
                            !seekingTransport && !inspected[dataTypeOrTransport]) {

                            options.dataTypes.unshift(dataTypeOrTransport);
                            inspect(dataTypeOrTransport);
                            return false;
                        } else if (seekingTransport) {
                            return !(selected = dataTypeOrTransport);
                        }
                    });
                    return selected;
                }

                return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
            }

            // A special extend for ajax options
            // that takes "flat" options (not to be deep extended)
            // Fixes #9887
            function ajaxExtend(target, src) {
                var key, deep,
                    flatOptions = jQuery.ajaxSettings.flatOptions || {};

                for (key in src) {
                    if (src[key] !== undefined) {
                        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
                    }
                }
                if (deep) {
                    jQuery.extend(true, target, deep);
                }

                return target;
            }

            /* Handles responses to an ajax request:
             * - finds the right dataType (mediates between content-type and expected dataType)
             * - returns the corresponding response
             */
            function ajaxHandleResponses(s, jqXHR, responses) {

                var ct, type, finalDataType, firstDataType,
                    contents = s.contents,
                    dataTypes = s.dataTypes;

                // Remove auto dataType and get content-type in the process
                while (dataTypes[0] === "*") {
                    dataTypes.shift();
                    if (ct === undefined) {
                        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
                    }
                }

                // Check if we're dealing with a known content-type
                if (ct) {
                    for (type in contents) {
                        if (contents[type] && contents[type].test(ct)) {
                            dataTypes.unshift(type);
                            break;
                        }
                    }
                }

                // Check to see if we have a response for the expected dataType
                if (dataTypes[0] in responses) {
                    finalDataType = dataTypes[0];
                } else {

                    // Try convertible dataTypes
                    for (type in responses) {
                        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                            finalDataType = type;
                            break;
                        }
                        if (!firstDataType) {
                            firstDataType = type;
                        }
                    }

                    // Or just use first one
                    finalDataType = finalDataType || firstDataType;
                }

                // If we found a dataType
                // We add the dataType to the list if needed
                // and return the corresponding response
                if (finalDataType) {
                    if (finalDataType !== dataTypes[0]) {
                        dataTypes.unshift(finalDataType);
                    }
                    return responses[finalDataType];
                }
            }

            /* Chain conversions given the request and the original response
             * Also sets the responseXXX fields on the jqXHR instance
             */
            function ajaxConvert(s, response, jqXHR, isSuccess) {
                var conv2, current, conv, tmp, prev,
                    converters = {},

                    // Work with a copy of dataTypes in case we need to modify it for conversion
                    dataTypes = s.dataTypes.slice();

                // Create converters map with lowercased keys
                if (dataTypes[1]) {
                    for (conv in s.converters) {
                        converters[conv.toLowerCase()] = s.converters[conv];
                    }
                }

                current = dataTypes.shift();

                // Convert to each sequential dataType
                while (current) {

                    if (s.responseFields[current]) {
                        jqXHR[s.responseFields[current]] = response;
                    }

                    // Apply the dataFilter if provided
                    if (!prev && isSuccess && s.dataFilter) {
                        response = s.dataFilter(response, s.dataType);
                    }

                    prev = current;
                    current = dataTypes.shift();

                    if (current) {

                        // There's only work to do if current dataType is non-auto
                        if (current === "*") {

                            current = prev;

                            // Convert response if prev dataType is non-auto and differs from current
                        } else if (prev !== "*" && prev !== current) {

                            // Seek a direct converter
                            conv = converters[prev + " " + current] || converters["* " + current];

                            // If none found, seek a pair
                            if (!conv) {
                                for (conv2 in converters) {

                                    // If conv2 outputs current
                                    tmp = conv2.split(" ");
                                    if (tmp[1] === current) {

                                        // If prev can be converted to accepted input
                                        conv = converters[prev + " " + tmp[0]] ||
                                            converters["* " + tmp[0]];
                                        if (conv) {

                                            // Condense equivalence converters
                                            if (conv === true) {
                                                conv = converters[conv2];

                                                // Otherwise, insert the intermediate dataType
                                            } else if (converters[conv2] !== true) {
                                                current = tmp[0];
                                                dataTypes.unshift(tmp[1]);
                                            }
                                            break;
                                        }
                                    }
                                }
                            }

                            // Apply converter (if not an equivalence)
                            if (conv !== true) {

                                // Unless errors are allowed to bubble, catch and return them
                                if (conv && s.throws) {
                                    response = conv(response);
                                } else {
                                    try {
                                        response = conv(response);
                                    } catch (e) {
                                        return {
                                            state: "parsererror",
                                            error: conv ? e : "No conversion from " + prev + " to " + current
                                        };
                                    }
                                }
                            }
                        }
                    }
                }

                return { state: "success", data: response };
            }

            jQuery.extend({

                // Counter for holding the number of active queries
                active: 0,

                // Last-Modified header cache for next request
                lastModified: {},
                etag: {},

                ajaxSettings: {
                    url: location.href,
                    type: "GET",
                    isLocal: rlocalProtocol.test(location.protocol),
                    global: true,
                    processData: true,
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",

                    /*
                    timeout: 0,
                    data: null,
                    dataType: null,
                    username: null,
                    password: null,
                    cache: null,
                    throws: false,
                    traditional: false,
                    headers: {},
                    */

                    accepts: {
                        "*": allTypes,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },

                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },

                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },

                    // Data converters
                    // Keys separate source (or catchall "*") and destination types with a single space
                    converters: {

                        // Convert anything to text
                        "* text": String,

                        // Text to html (true = no transformation)
                        "text html": true,

                        // Evaluate text as a json expression
                        "text json": JSON.parse,

                        // Parse text as xml
                        "text xml": jQuery.parseXML
                    },

                    // For options that shouldn't be deep extended:
                    // you can add your own custom options here if
                    // and when you create one that shouldn't be
                    // deep extended (see ajaxExtend)
                    flatOptions: {
                        url: true,
                        context: true
                    }
                },

                // Creates a full fledged settings object into target
                // with both ajaxSettings and settings fields.
                // If target is omitted, writes into ajaxSettings.
                ajaxSetup: function (target, settings) {
                    return settings ?

                        // Building a settings object
                        ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

                        // Extending ajaxSettings
                        ajaxExtend(jQuery.ajaxSettings, target);
                },

                ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
                ajaxTransport: addToPrefiltersOrTransports(transports),

                // Main method
                ajax: function (url, options) {

                    // If url is an object, simulate pre-1.5 signature
                    if (typeof url === "object") {
                        options = url;
                        url = undefined;
                    }

                    // Force options to be an object
                    options = options || {};

                    var transport,

                        // URL without anti-cache param
                        cacheURL,

                        // Response headers
                        responseHeadersString,
                        responseHeaders,

                        // timeout handle
                        timeoutTimer,

                        // Url cleanup var
                        urlAnchor,

                        // Request state (becomes false upon send and true upon completion)
                        completed,

                        // To know if global events are to be dispatched
                        fireGlobals,

                        // Loop variable
                        i,

                        // uncached part of the url
                        uncached,

                        // Create the final options object
                        s = jQuery.ajaxSetup({}, options),

                        // Callbacks context
                        callbackContext = s.context || s,

                        // Context for global events is callbackContext if it is a DOM node or jQuery collection
                        globalEventContext = s.context &&
                            (callbackContext.nodeType || callbackContext.jquery) ?
                            jQuery(callbackContext) :
                            jQuery.event,

                        // Deferreds
                        deferred = jQuery.Deferred(),
                        completeDeferred = jQuery.Callbacks("once memory"),

                        // Status-dependent callbacks
                        statusCode = s.statusCode || {},

                        // Headers (they are sent all at once)
                        requestHeaders = {},
                        requestHeadersNames = {},

                        // Default abort message
                        strAbort = "canceled",

                        // Fake xhr
                        jqXHR = {
                            readyState: 0,

                            // Builds headers hashtable if needed
                            getResponseHeader: function (key) {
                                var match;
                                if (completed) {
                                    if (!responseHeaders) {
                                        responseHeaders = {};
                                        while ((match = rheaders.exec(responseHeadersString))) {
                                            responseHeaders[match[1].toLowerCase() + " "] =
                                                (responseHeaders[match[1].toLowerCase() + " "] || [])
                                                    .concat(match[2]);
                                        }
                                    }
                                    match = responseHeaders[key.toLowerCase() + " "];
                                }
                                return match == null ? null : match.join(", ");
                            },

                            // Raw string
                            getAllResponseHeaders: function () {
                                return completed ? responseHeadersString : null;
                            },

                            // Caches the header
                            setRequestHeader: function (name, value) {
                                if (completed == null) {
                                    name = requestHeadersNames[name.toLowerCase()] =
                                        requestHeadersNames[name.toLowerCase()] || name;
                                    requestHeaders[name] = value;
                                }
                                return this;
                            },

                            // Overrides response content-type header
                            overrideMimeType: function (type) {
                                if (completed == null) {
                                    s.mimeType = type;
                                }
                                return this;
                            },

                            // Status-dependent callbacks
                            statusCode: function (map) {
                                var code;
                                if (map) {
                                    if (completed) {

                                        // Execute the appropriate callbacks
                                        jqXHR.always(map[jqXHR.status]);
                                    } else {

                                        // Lazy-add the new callbacks in a way that preserves old ones
                                        for (code in map) {
                                            statusCode[code] = [statusCode[code], map[code]];
                                        }
                                    }
                                }
                                return this;
                            },

                            // Cancel the request
                            abort: function (statusText) {
                                var finalText = statusText || strAbort;
                                if (transport) {
                                    transport.abort(finalText);
                                }
                                done(0, finalText);
                                return this;
                            }
                        };

                    // Attach deferreds
                    deferred.promise(jqXHR);

                    // Add protocol if not provided (prefilters might expect it)
                    // Handle falsy url in the settings object (#10093: consistency with old signature)
                    // We also use the url parameter if available
                    s.url = ((url || s.url || location.href) + "")
                        .replace(rprotocol, location.protocol + "//");

                    // Alias method option to type as per ticket #12004
                    s.type = options.method || options.type || s.method || s.type;

                    // Extract dataTypes list
                    s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

                    // A cross-domain request is in order when the origin doesn't match the current origin.
                    if (s.crossDomain == null) {
                        urlAnchor = document.createElement("a");

                        // Support: IE <=8 - 11, Edge 12 - 15
                        // IE throws exception on accessing the href property if url is malformed,
                        // e.g. http://example.com:80x/
                        try {
                            urlAnchor.href = s.url;

                            // Support: IE <=8 - 11 only
                            // Anchor's host property isn't correctly set when s.url is relative
                            urlAnchor.href = urlAnchor.href;
                            s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                                urlAnchor.protocol + "//" + urlAnchor.host;
                        } catch (e) {

                            // If there is an error parsing the URL, assume it is crossDomain,
                            // it can be rejected by the transport if it is invalid
                            s.crossDomain = true;
                        }
                    }

                    // Convert data if not already a string
                    if (s.data && s.processData && typeof s.data !== "string") {
                        s.data = jQuery.param(s.data, s.traditional);
                    }

                    // Apply prefilters
                    inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

                    // If request was aborted inside a prefilter, stop there
                    if (completed) {
                        return jqXHR;
                    }

                    // We can fire global events as of now if asked to
                    // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
                    fireGlobals = jQuery.event && s.global;

                    // Watch for a new set of requests
                    if (fireGlobals && jQuery.active++ === 0) {
                        jQuery.event.trigger("ajaxStart");
                    }

                    // Uppercase the type
                    s.type = s.type.toUpperCase();

                    // Determine if request has content
                    s.hasContent = !rnoContent.test(s.type);

                    // Save the URL in case we're toying with the If-Modified-Since
                    // and/or If-None-Match header later on
                    // Remove hash to simplify url manipulation
                    cacheURL = s.url.replace(rhash, "");

                    // More options handling for requests with no content
                    if (!s.hasContent) {

                        // Remember the hash so we can put it back
                        uncached = s.url.slice(cacheURL.length);

                        // If data is available and should be processed, append data to url
                        if (s.data && (s.processData || typeof s.data === "string")) {
                            cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

                            // #9682: remove data so that it's not used in an eventual retry
                            delete s.data;
                        }

                        // Add or update anti-cache param if needed
                        if (s.cache === false) {
                            cacheURL = cacheURL.replace(rantiCache, "$1");
                            uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce++) + uncached;
                        }

                        // Put hash and anti-cache on the URL that will be requested (gh-1732)
                        s.url = cacheURL + uncached;

                        // Change '%20' to '+' if this is encoded form body content (gh-2658)
                    } else if (s.data && s.processData &&
                        (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                        s.data = s.data.replace(r20, "+");
                    }

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if (s.ifModified) {
                        if (jQuery.lastModified[cacheURL]) {
                            jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                        }
                        if (jQuery.etag[cacheURL]) {
                            jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                        }
                    }

                    // Set the correct header, if data is being sent
                    if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                        jqXHR.setRequestHeader("Content-Type", s.contentType);
                    }

                    // Set the Accepts header for the server, depending on the dataType
                    jqXHR.setRequestHeader(
                        "Accept",
                        s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                            s.accepts[s.dataTypes[0]] +
                            (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
                            s.accepts["*"]
                    );

                    // Check for headers option
                    for (i in s.headers) {
                        jqXHR.setRequestHeader(i, s.headers[i]);
                    }

                    // Allow custom headers/mimetypes and early abort
                    if (s.beforeSend &&
                        (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

                        // Abort if not done already and return
                        return jqXHR.abort();
                    }

                    // Aborting is no longer a cancellation
                    strAbort = "abort";

                    // Install callbacks on deferreds
                    completeDeferred.add(s.complete);
                    jqXHR.done(s.success);
                    jqXHR.fail(s.error);

                    // Get transport
                    transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

                    // If no transport, we auto-abort
                    if (!transport) {
                        done(-1, "No Transport");
                    } else {
                        jqXHR.readyState = 1;

                        // Send global event
                        if (fireGlobals) {
                            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                        }

                        // If request was aborted inside ajaxSend, stop there
                        if (completed) {
                            return jqXHR;
                        }

                        // Timeout
                        if (s.async && s.timeout > 0) {
                            timeoutTimer = window.setTimeout(function () {
                                jqXHR.abort("timeout");
                            }, s.timeout);
                        }

                        try {
                            completed = false;
                            transport.send(requestHeaders, done);
                        } catch (e) {

                            // Rethrow post-completion exceptions
                            if (completed) {
                                throw e;
                            }

                            // Propagate others as results
                            done(-1, e);
                        }
                    }

                    // Callback for when everything is done
                    function done(status, nativeStatusText, responses, headers) {
                        var isSuccess, success, error, response, modified,
                            statusText = nativeStatusText;

                        // Ignore repeat invocations
                        if (completed) {
                            return;
                        }

                        completed = true;

                        // Clear timeout if it exists
                        if (timeoutTimer) {
                            window.clearTimeout(timeoutTimer);
                        }

                        // Dereference transport for early garbage collection
                        // (no matter how long the jqXHR object will be used)
                        transport = undefined;

                        // Cache response headers
                        responseHeadersString = headers || "";

                        // Set readyState
                        jqXHR.readyState = status > 0 ? 4 : 0;

                        // Determine if successful
                        isSuccess = status >= 200 && status < 300 || status === 304;

                        // Get response data
                        if (responses) {
                            response = ajaxHandleResponses(s, jqXHR, responses);
                        }

                        // Convert no matter what (that way responseXXX fields are always set)
                        response = ajaxConvert(s, response, jqXHR, isSuccess);

                        // If successful, handle type chaining
                        if (isSuccess) {

                            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                            if (s.ifModified) {
                                modified = jqXHR.getResponseHeader("Last-Modified");
                                if (modified) {
                                    jQuery.lastModified[cacheURL] = modified;
                                }
                                modified = jqXHR.getResponseHeader("etag");
                                if (modified) {
                                    jQuery.etag[cacheURL] = modified;
                                }
                            }

                            // if no content
                            if (status === 204 || s.type === "HEAD") {
                                statusText = "nocontent";

                                // if not modified
                            } else if (status === 304) {
                                statusText = "notmodified";

                                // If we have data, let's convert it
                            } else {
                                statusText = response.state;
                                success = response.data;
                                error = response.error;
                                isSuccess = !error;
                            }
                        } else {

                            // Extract error from statusText and normalize for non-aborts
                            error = statusText;
                            if (status || !statusText) {
                                statusText = "error";
                                if (status < 0) {
                                    status = 0;
                                }
                            }
                        }

                        // Set data for the fake xhr object
                        jqXHR.status = status;
                        jqXHR.statusText = (nativeStatusText || statusText) + "";

                        // Success/Error
                        if (isSuccess) {
                            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                        } else {
                            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                        }

                        // Status-dependent callbacks
                        jqXHR.statusCode(statusCode);
                        statusCode = undefined;

                        if (fireGlobals) {
                            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
                                [jqXHR, s, isSuccess ? success : error]);
                        }

                        // Complete
                        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                        if (fireGlobals) {
                            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

                            // Handle the global AJAX counter
                            if (!(--jQuery.active)) {
                                jQuery.event.trigger("ajaxStop");
                            }
                        }
                    }

                    return jqXHR;
                },

                getJSON: function (url, data, callback) {
                    return jQuery.get(url, data, callback, "json");
                },

                getScript: function (url, callback) {
                    return jQuery.get(url, undefined, callback, "script");
                }
            });

            jQuery.each(["get", "post"], function (i, method) {
                jQuery[method] = function (url, data, callback, type) {

                    // Shift arguments if data argument was omitted
                    if (isFunction(data)) {
                        type = type || callback;
                        callback = data;
                        data = undefined;
                    }

                    // The url can be an options object (which then must have .url)
                    return jQuery.ajax(jQuery.extend({
                        url: url,
                        type: method,
                        dataType: type,
                        data: data,
                        success: callback
                    }, jQuery.isPlainObject(url) && url));
                };
            });


            jQuery._evalUrl = function (url, options) {
                return jQuery.ajax({
                    url: url,

                    // Make this explicit, since user can override this through ajaxSetup (#11264)
                    type: "GET",
                    dataType: "script",
                    cache: true,
                    async: false,
                    global: false,

                    // Only evaluate the response if it is successful (gh-4126)
                    // dataFilter is not invoked for failure responses, so using it instead
                    // of the default converter is kludgy but it works.
                    converters: {
                        "text script": function () { }
                    },
                    dataFilter: function (response) {
                        jQuery.globalEval(response, options);
                    }
                });
            };


            jQuery.fn.extend({
                wrapAll: function (html) {
                    var wrap;

                    if (this[0]) {
                        if (isFunction(html)) {
                            html = html.call(this[0]);
                        }

                        // The elements to wrap the target around
                        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

                        if (this[0].parentNode) {
                            wrap.insertBefore(this[0]);
                        }

                        wrap.map(function () {
                            var elem = this;

                            while (elem.firstElementChild) {
                                elem = elem.firstElementChild;
                            }

                            return elem;
                        }).append(this);
                    }

                    return this;
                },

                wrapInner: function (html) {
                    if (isFunction(html)) {
                        return this.each(function (i) {
                            jQuery(this).wrapInner(html.call(this, i));
                        });
                    }

                    return this.each(function () {
                        var self = jQuery(this),
                            contents = self.contents();

                        if (contents.length) {
                            contents.wrapAll(html);

                        } else {
                            self.append(html);
                        }
                    });
                },

                wrap: function (html) {
                    var htmlIsFunction = isFunction(html);

                    return this.each(function (i) {
                        jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
                    });
                },

                unwrap: function (selector) {
                    this.parent(selector).not("body").each(function () {
                        jQuery(this).replaceWith(this.childNodes);
                    });
                    return this;
                }
            });


            jQuery.expr.pseudos.hidden = function (elem) {
                return !jQuery.expr.pseudos.visible(elem);
            };
            jQuery.expr.pseudos.visible = function (elem) {
                return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
            };




            jQuery.ajaxSettings.xhr = function () {
                try {
                    return new window.XMLHttpRequest();
                } catch (e) { }
            };

            var xhrSuccessStatus = {

                // File protocol always yields status code 0, assume 200
                0: 200,

                // Support: IE <=9 only
                // #1450: sometimes IE returns 1223 when it should be 204
                1223: 204
            },
                xhrSupported = jQuery.ajaxSettings.xhr();

            support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
            support.ajax = xhrSupported = !!xhrSupported;

            jQuery.ajaxTransport(function (options) {
                var callback, errorCallback;

                // Cross domain only allowed if supported through XMLHttpRequest
                if (support.cors || xhrSupported && !options.crossDomain) {
                    return {
                        send: function (headers, complete) {
                            var i,
                                xhr = options.xhr();

                            xhr.open(
                                options.type,
                                options.url,
                                options.async,
                                options.username,
                                options.password
                            );

                            // Apply custom fields if provided
                            if (options.xhrFields) {
                                for (i in options.xhrFields) {
                                    xhr[i] = options.xhrFields[i];
                                }
                            }

                            // Override mime type if needed
                            if (options.mimeType && xhr.overrideMimeType) {
                                xhr.overrideMimeType(options.mimeType);
                            }

                            // X-Requested-With header
                            // For cross-domain requests, seeing as conditions for a preflight are
                            // akin to a jigsaw puzzle, we simply never set it to be sure.
                            // (it can always be set on a per-request basis or even using ajaxSetup)
                            // For same-domain requests, won't change header if already provided.
                            if (!options.crossDomain && !headers["X-Requested-With"]) {
                                headers["X-Requested-With"] = "XMLHttpRequest";
                            }

                            // Set headers
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i]);
                            }

                            // Callback
                            callback = function (type) {
                                return function () {
                                    if (callback) {
                                        callback = errorCallback = xhr.onload =
                                            xhr.onerror = xhr.onabort = xhr.ontimeout =
                                            xhr.onreadystatechange = null;

                                        if (type === "abort") {
                                            xhr.abort();
                                        } else if (type === "error") {

                                            // Support: IE <=9 only
                                            // On a manual native abort, IE9 throws
                                            // errors on any property access that is not readyState
                                            if (typeof xhr.status !== "number") {
                                                complete(0, "error");
                                            } else {
                                                complete(

                                                    // File: protocol always yields status 0; see #8605, #14207
                                                    xhr.status,
                                                    xhr.statusText
                                                );
                                            }
                                        } else {
                                            complete(
                                                xhrSuccessStatus[xhr.status] || xhr.status,
                                                xhr.statusText,

                                                // Support: IE <=9 only
                                                // IE9 has no XHR2 but throws on binary (trac-11426)
                                                // For XHR2 non-text, let the caller handle it (gh-2498)
                                                (xhr.responseType || "text") !== "text" ||
                                                    typeof xhr.responseText !== "string" ?
                                                    { binary: xhr.response } :
                                                    { text: xhr.responseText },
                                                xhr.getAllResponseHeaders()
                                            );
                                        }
                                    }
                                };
                            };

                            // Listen to events
                            xhr.onload = callback();
                            errorCallback = xhr.onerror = xhr.ontimeout = callback("error");

                            // Support: IE 9 only
                            // Use onreadystatechange to replace onabort
                            // to handle uncaught aborts
                            if (xhr.onabort !== undefined) {
                                xhr.onabort = errorCallback;
                            } else {
                                xhr.onreadystatechange = function () {

                                    // Check readyState before timeout as it changes
                                    if (xhr.readyState === 4) {

                                        // Allow onerror to be called first,
                                        // but that will not handle a native abort
                                        // Also, save errorCallback to a variable
                                        // as xhr.onerror cannot be accessed
                                        window.setTimeout(function () {
                                            if (callback) {
                                                errorCallback();
                                            }
                                        });
                                    }
                                };
                            }

                            // Create the abort callback
                            callback = callback("abort");

                            try {

                                // Do send the request (this may raise an exception)
                                xhr.send(options.hasContent && options.data || null);
                            } catch (e) {

                                // #14683: Only rethrow if this hasn't been notified as an error yet
                                if (callback) {
                                    throw e;
                                }
                            }
                        },

                        abort: function () {
                            if (callback) {
                                callback();
                            }
                        }
                    };
                }
            });




            // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
            jQuery.ajaxPrefilter(function (s) {
                if (s.crossDomain) {
                    s.contents.script = false;
                }
            });

            // Install script dataType
            jQuery.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, " +
                        "application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function (text) {
                        jQuery.globalEval(text);
                        return text;
                    }
                }
            });

            // Handle cache's special case and crossDomain
            jQuery.ajaxPrefilter("script", function (s) {
                if (s.cache === undefined) {
                    s.cache = false;
                }
                if (s.crossDomain) {
                    s.type = "GET";
                }
            });

            // Bind script tag hack transport
            jQuery.ajaxTransport("script", function (s) {

                // This transport only deals with cross domain or forced-by-attrs requests
                if (s.crossDomain || s.scriptAttrs) {
                    var script, callback;
                    return {
                        send: function (_, complete) {
                            script = jQuery("<script>")
                                .attr(s.scriptAttrs || {})
                                .prop({ charset: s.scriptCharset, src: s.url })
                                .on("load error", callback = function (evt) {
                                    script.remove();
                                    callback = null;
                                    if (evt) {
                                        complete(evt.type === "error" ? 404 : 200, evt.type);
                                    }
                                });

                            // Use native DOM manipulation to avoid our domManip AJAX trickery
                            document.head.appendChild(script[0]);
                        },
                        abort: function () {
                            if (callback) {
                                callback();
                            }
                        }
                    };
                }
            });




            var oldCallbacks = [],
                rjsonp = /(=)\?(?=&|$)|\?\?/;

            // Default jsonp settings
            jQuery.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function () {
                    var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
                    this[callback] = true;
                    return callback;
                }
            });

            // Detect, normalize options and install callbacks for jsonp requests
            jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

                var callbackName, overwritten, responseContainer,
                    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
                        "url" :
                        typeof s.data === "string" &&
                        (s.contentType || "")
                            .indexOf("application/x-www-form-urlencoded") === 0 &&
                        rjsonp.test(s.data) && "data"
                    );

                // Handle iff the expected data type is "jsonp" or we have a parameter to set
                if (jsonProp || s.dataTypes[0] === "jsonp") {

                    // Get callback name, remembering preexisting value associated with it
                    callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ?
                        s.jsonpCallback() :
                        s.jsonpCallback;

                    // Insert callback into url or form data
                    if (jsonProp) {
                        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
                    } else if (s.jsonp !== false) {
                        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
                    }

                    // Use data converter to retrieve json after script execution
                    s.converters["script json"] = function () {
                        if (!responseContainer) {
                            jQuery.error(callbackName + " was not called");
                        }
                        return responseContainer[0];
                    };

                    // Force json dataType
                    s.dataTypes[0] = "json";

                    // Install callback
                    overwritten = window[callbackName];
                    window[callbackName] = function () {
                        responseContainer = arguments;
                    };

                    // Clean-up function (fires after converters)
                    jqXHR.always(function () {

                        // If previous value didn't exist - remove it
                        if (overwritten === undefined) {
                            jQuery(window).removeProp(callbackName);

                            // Otherwise restore preexisting value
                        } else {
                            window[callbackName] = overwritten;
                        }

                        // Save back as free
                        if (s[callbackName]) {

                            // Make sure that re-using the options doesn't screw things around
                            s.jsonpCallback = originalSettings.jsonpCallback;

                            // Save the callback name for future use
                            oldCallbacks.push(callbackName);
                        }

                        // Call if it was a function and we have a response
                        if (responseContainer && isFunction(overwritten)) {
                            overwritten(responseContainer[0]);
                        }

                        responseContainer = overwritten = undefined;
                    });

                    // Delegate to script
                    return "script";
                }
            });




            // Support: Safari 8 only
            // In Safari 8 documents created via document.implementation.createHTMLDocument
            // collapse sibling forms: the second one becomes a child of the first one.
            // Because of that, this security measure has to be disabled in Safari 8.
            // https://bugs.webkit.org/show_bug.cgi?id=137337
            support.createHTMLDocument = (function () {
                var body = document.implementation.createHTMLDocument("").body;
                body.innerHTML = "<form></form><form></form>";
                return body.childNodes.length === 2;
            })();


            // Argument "data" should be string of html
            // context (optional): If specified, the fragment will be created in this context,
            // defaults to document
            // keepScripts (optional): If true, will include scripts passed in the html string
            jQuery.parseHTML = function (data, context, keepScripts) {
                if (typeof data !== "string") {
                    return [];
                }
                if (typeof context === "boolean") {
                    keepScripts = context;
                    context = false;
                }

                var base, parsed, scripts;

                if (!context) {

                    // Stop scripts or inline event handlers from being executed immediately
                    // by using document.implementation
                    if (support.createHTMLDocument) {
                        context = document.implementation.createHTMLDocument("");

                        // Set the base href for the created document
                        // so any parsed elements with URLs
                        // are based on the document's URL (gh-2965)
                        base = context.createElement("base");
                        base.href = document.location.href;
                        context.head.appendChild(base);
                    } else {
                        context = document;
                    }
                }

                parsed = rsingleTag.exec(data);
                scripts = !keepScripts && [];

                // Single tag
                if (parsed) {
                    return [context.createElement(parsed[1])];
                }

                parsed = buildFragment([data], context, scripts);

                if (scripts && scripts.length) {
                    jQuery(scripts).remove();
                }

                return jQuery.merge([], parsed.childNodes);
            };


            /**
             * Load a url into a page
             */
            jQuery.fn.load = function (url, params, callback) {
                var selector, type, response,
                    self = this,
                    off = url.indexOf(" ");

                if (off > -1) {
                    selector = stripAndCollapse(url.slice(off));
                    url = url.slice(0, off);
                }

                // If it's a function
                if (isFunction(params)) {

                    // We assume that it's the callback
                    callback = params;
                    params = undefined;

                    // Otherwise, build a param string
                } else if (params && typeof params === "object") {
                    type = "POST";
                }

                // If we have elements to modify, make the request
                if (self.length > 0) {
                    jQuery.ajax({
                        url: url,

                        // If "type" variable is undefined, then "GET" method will be used.
                        // Make value of this field explicit since
                        // user can override it through ajaxSetup method
                        type: type || "GET",
                        dataType: "html",
                        data: params
                    }).done(function (responseText) {

                        // Save response for use in complete callback
                        response = arguments;

                        self.html(selector ?

                            // If a selector was specified, locate the right elements in a dummy div
                            // Exclude scripts to avoid IE 'Permission Denied' errors
                            jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

                            // Otherwise use the full result
                            responseText);

                        // If the request succeeds, this function gets "data", "status", "jqXHR"
                        // but they are ignored because response was set above.
                        // If it fails, this function gets "jqXHR", "status", "error"
                    }).always(callback && function (jqXHR, status) {
                        self.each(function () {
                            callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                        });
                    });
                }

                return this;
            };




            // Attach a bunch of functions for handling common AJAX events
            jQuery.each([
                "ajaxStart",
                "ajaxStop",
                "ajaxComplete",
                "ajaxError",
                "ajaxSuccess",
                "ajaxSend"
            ], function (i, type) {
                jQuery.fn[type] = function (fn) {
                    return this.on(type, fn);
                };
            });




            jQuery.expr.pseudos.animated = function (elem) {
                return jQuery.grep(jQuery.timers, function (fn) {
                    return elem === fn.elem;
                }).length;
            };




            jQuery.offset = {
                setOffset: function (elem, options, i) {
                    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                        position = jQuery.css(elem, "position"),
                        curElem = jQuery(elem),
                        props = {};

                    // Set position first, in-case top/left are set even on static elem
                    if (position === "static") {
                        elem.style.position = "relative";
                    }

                    curOffset = curElem.offset();
                    curCSSTop = jQuery.css(elem, "top");
                    curCSSLeft = jQuery.css(elem, "left");
                    calculatePosition = (position === "absolute" || position === "fixed") &&
                        (curCSSTop + curCSSLeft).indexOf("auto") > -1;

                    // Need to be able to calculate position if either
                    // top or left is auto and position is either absolute or fixed
                    if (calculatePosition) {
                        curPosition = curElem.position();
                        curTop = curPosition.top;
                        curLeft = curPosition.left;

                    } else {
                        curTop = parseFloat(curCSSTop) || 0;
                        curLeft = parseFloat(curCSSLeft) || 0;
                    }

                    if (isFunction(options)) {

                        // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                        options = options.call(elem, i, jQuery.extend({}, curOffset));
                    }

                    if (options.top != null) {
                        props.top = (options.top - curOffset.top) + curTop;
                    }
                    if (options.left != null) {
                        props.left = (options.left - curOffset.left) + curLeft;
                    }

                    if ("using" in options) {
                        options.using.call(elem, props);

                    } else {
                        curElem.css(props);
                    }
                }
            };

            jQuery.fn.extend({

                // offset() relates an element's border box to the document origin
                offset: function (options) {

                    // Preserve chaining for setter
                    if (arguments.length) {
                        return options === undefined ?
                            this :
                            this.each(function (i) {
                                jQuery.offset.setOffset(this, options, i);
                            });
                    }

                    var rect, win,
                        elem = this[0];

                    if (!elem) {
                        return;
                    }

                    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
                    // Support: IE <=11 only
                    // Running getBoundingClientRect on a
                    // disconnected node in IE throws an error
                    if (!elem.getClientRects().length) {
                        return { top: 0, left: 0 };
                    }

                    // Get document-relative position by adding viewport scroll to viewport-relative gBCR
                    rect = elem.getBoundingClientRect();
                    win = elem.ownerDocument.defaultView;
                    return {
                        top: rect.top + win.pageYOffset,
                        left: rect.left + win.pageXOffset
                    };
                },

                // position() relates an element's margin box to its offset parent's padding box
                // This corresponds to the behavior of CSS absolute positioning
                position: function () {
                    if (!this[0]) {
                        return;
                    }

                    var offsetParent, offset, doc,
                        elem = this[0],
                        parentOffset = { top: 0, left: 0 };

                    // position:fixed elements are offset from the viewport, which itself always has zero offset
                    if (jQuery.css(elem, "position") === "fixed") {

                        // Assume position:fixed implies availability of getBoundingClientRect
                        offset = elem.getBoundingClientRect();

                    } else {
                        offset = this.offset();

                        // Account for the *real* offset parent, which can be the document or its root element
                        // when a statically positioned element is identified
                        doc = elem.ownerDocument;
                        offsetParent = elem.offsetParent || doc.documentElement;
                        while (offsetParent &&
                            (offsetParent === doc.body || offsetParent === doc.documentElement) &&
                            jQuery.css(offsetParent, "position") === "static") {

                            offsetParent = offsetParent.parentNode;
                        }
                        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {

                            // Incorporate borders into its offset, since they are outside its content origin
                            parentOffset = jQuery(offsetParent).offset();
                            parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
                            parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
                        }
                    }

                    // Subtract parent offsets and element margins
                    return {
                        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
                    };
                },

                // This method will return documentElement in the following cases:
                // 1) For the element inside the iframe without offsetParent, this method will return
                //    documentElement of the parent window
                // 2) For the hidden or detached element
                // 3) For body or html element, i.e. in case of the html node - it will return itself
                //
                // but those exceptions were never presented as a real life use-cases
                // and might be considered as more preferable results.
                //
                // This logic, however, is not guaranteed and can change at any point in the future
                offsetParent: function () {
                    return this.map(function () {
                        var offsetParent = this.offsetParent;

                        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                            offsetParent = offsetParent.offsetParent;
                        }

                        return offsetParent || documentElement;
                    });
                }
            });

            // Create scrollLeft and scrollTop methods
            jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
                var top = "pageYOffset" === prop;

                jQuery.fn[method] = function (val) {
                    return access(this, function (elem, method, val) {

                        // Coalesce documents and windows
                        var win;
                        if (isWindow(elem)) {
                            win = elem;
                        } else if (elem.nodeType === 9) {
                            win = elem.defaultView;
                        }

                        if (val === undefined) {
                            return win ? win[prop] : elem[method];
                        }

                        if (win) {
                            win.scrollTo(
                                !top ? val : win.pageXOffset,
                                top ? val : win.pageYOffset
                            );

                        } else {
                            elem[method] = val;
                        }
                    }, method, val, arguments.length);
                };
            });

            // Support: Safari <=7 - 9.1, Chrome <=37 - 49
            // Add the top/left cssHooks using jQuery.fn.position
            // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
            // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
            // getComputedStyle returns percent when specified for top/left/bottom/right;
            // rather than make the css module depend on the offset module, just check for it here
            jQuery.each(["top", "left"], function (i, prop) {
                jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
                    function (elem, computed) {
                        if (computed) {
                            computed = curCSS(elem, prop);

                            // If curCSS returns percentage, fallback to offset
                            return rnumnonpx.test(computed) ?
                                jQuery(elem).position()[prop] + "px" :
                                computed;
                        }
                    }
                );
            });


            // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
            jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
                jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name },
                    function (defaultExtra, funcName) {

                        // Margin is only for outerHeight, outerWidth
                        jQuery.fn[funcName] = function (margin, value) {
                            var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                                extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

                            return access(this, function (elem, type, value) {
                                var doc;

                                if (isWindow(elem)) {

                                    // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                                    return funcName.indexOf("outer") === 0 ?
                                        elem["inner" + name] :
                                        elem.document.documentElement["client" + name];
                                }

                                // Get document width or height
                                if (elem.nodeType === 9) {
                                    doc = elem.documentElement;

                                    // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                                    // whichever is greatest
                                    return Math.max(
                                        elem.body["scroll" + name], doc["scroll" + name],
                                        elem.body["offset" + name], doc["offset" + name],
                                        doc["client" + name]
                                    );
                                }

                                return value === undefined ?

                                    // Get width or height on the element, requesting but not forcing parseFloat
                                    jQuery.css(elem, type, extra) :

                                    // Set width or height on the element
                                    jQuery.style(elem, type, value, extra);
                            }, type, chainable ? margin : undefined, chainable);
                        };
                    });
            });


            jQuery.each(("blur focus focusin focusout resize scroll click dblclick " +
                "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
                "change select submit keydown keypress keyup contextmenu").split(" "),
                function (i, name) {

                    // Handle event binding
                    jQuery.fn[name] = function (data, fn) {
                        return arguments.length > 0 ?
                            this.on(name, null, data, fn) :
                            this.trigger(name);
                    };
                });

            jQuery.fn.extend({
                hover: function (fnOver, fnOut) {
                    return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
                }
            });




            jQuery.fn.extend({

                bind: function (types, data, fn) {
                    return this.on(types, null, data, fn);
                },
                unbind: function (types, fn) {
                    return this.off(types, null, fn);
                },

                delegate: function (selector, types, data, fn) {
                    return this.on(types, selector, data, fn);
                },
                undelegate: function (selector, types, fn) {

                    // ( namespace ) or ( selector, types [, fn] )
                    return arguments.length === 1 ?
                        this.off(selector, "**") :
                        this.off(types, selector || "**", fn);
                }
            });

            // Bind a function to a context, optionally partially applying any
            // arguments.
            // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
            // However, it is not slated for removal any time soon
            jQuery.proxy = function (fn, context) {
                var tmp, args, proxy;

                if (typeof context === "string") {
                    tmp = fn[context];
                    context = fn;
                    fn = tmp;
                }

                // Quick check to determine if target is callable, in the spec
                // this throws a TypeError, but we will just return undefined.
                if (!isFunction(fn)) {
                    return undefined;
                }

                // Simulated bind
                args = slice.call(arguments, 2);
                proxy = function () {
                    return fn.apply(context || this, args.concat(slice.call(arguments)));
                };

                // Set the guid of unique handler to the same of original handler, so it can be removed
                proxy.guid = fn.guid = fn.guid || jQuery.guid++;

                return proxy;
            };

            jQuery.holdReady = function (hold) {
                if (hold) {
                    jQuery.readyWait++;
                } else {
                    jQuery.ready(true);
                }
            };
            jQuery.isArray = Array.isArray;
            jQuery.parseJSON = JSON.parse;
            jQuery.nodeName = nodeName;
            jQuery.isFunction = isFunction;
            jQuery.isWindow = isWindow;
            jQuery.camelCase = camelCase;
            jQuery.type = toType;

            jQuery.now = Date.now;

            jQuery.isNumeric = function (obj) {

                // As of jQuery 3.0, isNumeric is limited to
                // strings and numbers (primitives or objects)
                // that can be coerced to finite numbers (gh-2662)
                var type = jQuery.type(obj);
                return (type === "number" || type === "string") &&

                    // parseFloat NaNs numeric-cast false positives ("")
                    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                    // subtraction forces infinities to NaN
                    !isNaN(obj - parseFloat(obj));
            };




            // Register as a named AMD module, since jQuery can be concatenated with other
            // files that may use define, but not via a proper concatenation script that
            // understands anonymous AMD modules. A named AMD is safest and most robust
            // way to register. Lowercase jquery is used because AMD module names are
            // derived from file names, and jQuery is normally delivered in a lowercase
            // file name. Do this after creating the global so that if an AMD module wants
            // to call noConflict to hide this version of jQuery, it will work.

            // Note that for maximum portability, libraries that are not jQuery should
            // declare themselves as anonymous modules, and avoid setting a global if an
            // AMD loader is present. jQuery is a special case. For more information, see
            // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

            if (true) {
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
                    return jQuery;
                }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
                    __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            }




            var

                // Map over jQuery in case of overwrite
                _jQuery = window.jQuery,

                // Map over the $ in case of overwrite
                _$ = window.$;

            jQuery.noConflict = function (deep) {
                if (window.$ === jQuery) {
                    window.$ = _$;
                }

                if (deep && window.jQuery === jQuery) {
                    window.jQuery = _jQuery;
                }

                return jQuery;
            };

            // Expose jQuery and $ identifiers, even in AMD
            // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
            // and CommonJS for browser emulators (#13566)
            if (!noGlobal) {
                window.jQuery = window.$ = jQuery;
            }




            return jQuery;
        });
/***/ }),

/* 4 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PosCartId", function () { return PosCartId; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PosCartViewModel", function () { return PosCartViewModel; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNewCart", function () { return createNewCart; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSelectedCart", function () { return removeSelectedCart; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeProduct", function () { return removeProduct; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addProductToCart", function () { return addProductToCart; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkOutofStockAllow", function () { return checkOutofStockAllow; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCombinationToCart", function () { return addCombinationToCart; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchCart", function () { return switchCart; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushCartProducts", function () { return pushCartProducts; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProductDetails", function () { return getProductDetails; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCartTotalAmount", function () { return updateCartTotalAmount; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateProduct", function () { return updateProduct; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteCartCustomer", function () { return deleteCartCustomer; });
        /* harmony import */ var _wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
        /* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
        /* harmony import */ var _wkimagemove_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
        /* harmony import */ var _wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
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
            this.stock_location = product.stock_location;
            this.productPrice = ko.observable(data.price);
            this.taxExclPrice = ko.observable(parseFloat(data.taxExcludedPrice));
            this.updatePrice = ko.observable(data.updatePrice);
            if (data.quantity !== false) {
                this.productQuantity = ko.observable(data.quantity);
            } else {
                this.productQuantity = ko.observable(parseInt(self.combinationQuantity()));
            }
            this.specificPrices = data.specificPrices;
            /*  this.appliedSpecificPrice = ko.computed(function () {
                var sp = self.specificPrices.find(
                    o => (parseInt(o.from_quantity) <= parseInt(self.productQuantity()))
                        && (parseInt(o.id_customer) == parseInt(viewModel.selectedCustomerId()))
                );
                if (typeof sp != 'undefined') {
                    return sp;
                }
                return [];
            }); */
            this.appliedSpecificPrice = ko.computed(function () {
                var localCart = JSON.parse(localStorage.pos_cart)
                var sp = {}
                if ((localCart[localStorage.currentCartId] != undefined) && (localCart[localStorage.currentCartId].others != undefined) && (localCart[localStorage.currentCartId].others.id_cart != undefined) && (parseInt(localCart[localStorage.currentCartId].others.id_cart) > 0)) {
                    sp = self.specificPrices.find(
                        o => (parseInt(o.from_quantity) <= parseInt(self.productQuantity()))
                            && (parseInt(o.id_customer) == parseInt(viewModel.selectedCustomerId()))
                            && ((parseInt(o.id_cart) == localCart[localStorage.currentCartId].others.id_cart) || (parseInt(o.id_cart) == 0))
                    );
                } else {
                    sp = self.specificPrices.find(
                        o => (parseInt(o.from_quantity) <= parseInt(self.productQuantity()))
                            && (parseInt(o.id_customer) == parseInt(viewModel.selectedCustomerId()))
                            && (parseInt(o.id_cart) == 0)
                    );
                }
                if (!sp || (Object.keys(sp).length == 0)) {
                    sp = self.specificPrices.find(
                        o => (parseInt(o.from_quantity) <= parseInt(self.productQuantity()))
                            && (parseInt(o.id_group) == parseInt(viewModel.selectedCustomerIdGroup()))
                            && (parseInt(o.id_cart) == 0)
                    );
                }
                if (sp && (Object.keys(sp).length > 0)) {
                    return sp;
                }
                return {};
            });

            this.taxExcludedPrice = ko.computed({
                read: function() {
                    var prPrice = self.taxExclPrice();
                    if (Object.keys(self.appliedSpecificPrice()).length > 0) {
                        var sp = self.appliedSpecificPrice();
                        if (sp.price > 0) {
                            prPrice = sp.price;
                        }
                        if (sp.reduction_type == "percentage") {
                            prPrice = prPrice - prPrice * parseFloat(sp.reduction);
                        } else {
                            //amount
                            var taxExclReduction = sp.reduction;
                            if (sp.reduction_tax == 1) {
                                // reduction is tax included, remove tax for this price: taxExcludedPrice
                                taxExclReduction = ((sp.reduction * 100)/(100 + self.taxRate()));
                            }
                            prPrice = prPrice - taxExclReduction;
                        }
                    }
                    return prPrice;
                },
                write: function(value) {
                    var prPrice = value;
                    if (Object.keys(self.appliedSpecificPrice()).length > 0) {
                        var sp = self.appliedSpecificPrice();
                        // if (sp.price > 0) {
                        // 	prPrice = sp.price;
                        // }
                        if (sp.reduction_type == "percentage") {
                            prPrice = prPrice /(1 - parseFloat(sp.reduction));
                        } else {
                            //amount
                            var taxExclReduction = sp.reduction;
                            if (sp.reduction_tax == 1) {
                                // reduction is tax included, remove tax for this price: taxExcludedPrice
                                taxExclReduction = ((sp.reduction * 100)/(100 + self.taxRate()));
                            }
                            prPrice = prPrice + taxExclReduction;
                        }
                    }
                    self.taxExclPrice(prPrice)
                },
                owner: self
            });
            // this.taxExcludedPrice = ko.computed(function () {
            //     var prPrice = self.taxExclPrice();
            //     if (Object.keys(self.appliedSpecificPrice()).length > 0) {
            //         var sp = self.appliedSpecificPrice();
            //         if (sp.price > 0) {
            //             prPrice = sp.price;
            //         }
            //         if (sp.reduction_type == "percentage") {
            //             prPrice = prPrice - prPrice * parseFloat(sp.reduction);
            //         } else {
            //             //amount
            //             var taxExclReduction = sp.reduction;
            //             if (sp.reduction_tax == 1) {
            //                 // reduction is tax included, remove tax for this price: taxExcludedPrice
            //                 taxExclReduction = ((sp.reduction * 100) / (100 + self.taxRate()));
            //             }
            //             prPrice = prPrice - taxExclReduction;
            //         }
            //     }
            //     return prPrice;
            // });

            self.updateQuantity = function () {
                if (isNaN(this.productQuantity()) || this.productQuantity() < 0) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(invalidProductQuantity);
                    this.productQuantity(1);
                }
                if (this.productQuantity() === '') {
                    this.productQuantity(1);
                } else {
                    var cartIndex = 0;
                    var cartProductQty = 0;
                    var pos_cart = $.parseJSON(localStorage.pos_cart);
                    var posProducts = _product_js__WEBPACK_IMPORTED_MODULE_1__["default"].getPosProductDetails();
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
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(self.productName + ' ' + wkQuantityNotifi);
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
            this.displayTaxExcludedPrice = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_3__["asyncComputed"])(function () {
                var totalPrice = parseFloat(this.taxExcludedPrice());
                if (this.productDiscount()) {
                    totalPrice -= totalPrice * this.productDiscount() / 100;
                }
                return Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_3__["wkFormatCurrency"])(parseFloat(totalPrice), currencyFormat);
            }, this);
            this.price = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_3__["asyncComputed"])(function () {
                var totalPrice = parseFloat(this.taxExcludedPrice());
                totalPrice += this.taxExcludedPrice() * this.taxRate() / 100;
                if (totalPrice != parseFloat(data.taxExcludedPrice)) {
                }
                if (this.productDiscount()) {
                    totalPrice -= totalPrice * this.productDiscount() / 100;
                }
                return Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_3__["wkFormatCurrency"])(parseFloat(totalPrice), currencyFormat);
            }, this);
            this.displayPrice = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_3__["asyncComputed"])(function () {
                var totalPrice = this.productQuantity() * this.taxExcludedPrice();
                totalPrice += this.productQuantity() * this.taxExcludedPrice() * this.taxRate() / 100;
                if (totalPrice != parseFloat(data.taxExcludedPrice)) {
                }
                if (this.productDiscount()) {
                    totalPrice -= totalPrice * this.productDiscount() / 100;
                }
                return Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_3__["wkFormatCurrency"])(parseFloat(totalPrice), currencyFormat);
            }, this);

        }

        /* Mapping of POS Cart ID*/
        function PosCartId(posCartId, active = false) {
            this.posCartId = ko.observable(parseInt(posCartId) + 1);
            if (active !== false) {
                this.isCartActive = ko.observable(active);
            } else {
                this.isCartActive = ko.observable();
            }
        }

        function PosCartViewModel(params) {
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

        function createNewCart() {
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
                    viewModel.selectedCustomerIdGroup(customers[viewModel.selectedCustomerId()].default_group);
                } else {
                    viewModel.resetCustomerDetails();
                    viewModel.selectedCustomerName(customerName);
                }
                if (viewModel.bodyPanel() == 'customers') {
                    viewModel.updateCustomer();
                }
            }
        }

        function removeSelectedCart(element) {
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
                        viewModel.selectedCustomerIdGroup(customers[viewModel.selectedCustomerId()].default_group);
                        viewModel.customerEmail(pos_cart[cartIndex]['others']['customer']['customerEmail']);
                        viewModel.customerName(pos_cart[cartIndex]['others']['customer']['customerName']);
                        viewModel.idCustomer(pos_cart[cartIndex]['others']['customer']['idCustomer']);
                        viewModel.selectedIdCountry(pos_cart[cartIndex]['others']['id_country']);
                    } else {
                        if (guestAccountEnabled == true) {
                            viewModel.selectedCustomerId(idGuest);
                            viewModel.selectedCustomerName(guestName);
                            viewModel.selectedCustomerIdGroup(customers[viewModel.selectedCustomerId()].default_group);
                        } else {
                            viewModel.selectedCustomerName(customerName);
                            viewModel.selectedCustomerId(0);
                            viewModel.selectedCustomerIdGroup(0);
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

        function removeProduct(product) {
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

        function addProductToCart(data, event) {
            var posProducts = _product_js__WEBPACK_IMPORTED_MODULE_1__["default"].getPosProductDetails();
            posProducts.then(
                function (pos_products) {
                    if (data.hasCombination) {
                        viewModel.selectedCombinationProductName(data.name);
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
                                            viewModel.productCombination.push(new _product_js__WEBPACK_IMPORTED_MODULE_1__["ProductCombinationDetails"](groupName, attribute, data.idProduct, idAttributeGroup, pos_products[data.idProduct].default_combination));
                                        });
                                    });
                                }
                            });
                            viewModel.eventTarget(event.target);
                            selectedCombinationId = selectedCombinationId.sort(function (a, b) { return a - b }).join('-');
                            var selectedCombinationDetail = pos_products[data.idProduct]['combination_details'][selectedCombinationId];
                            if (selectedCombinationDetail != undefined) {
                                viewModel.combinationQuantity(parseInt(selectedCombinationDetail['minimal_quantity']));
                                viewModel.combinationAvalQty(selectedCombinationDetail['quantity']);
                                viewModel.combinationStockLocation(selectedCombinationDetail['stock_location']);
                                viewModel.combinationDisplayPriceWithoutReduction(selectedCombinationDetail['priceWithoutReduction']);
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
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(combinationNotExist);
                                // $.growl.error({ title: "", message: combinationNotExist });
                            }
                            $('#wk-pos-product-combination').modal('toggle');
                        } else {
                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(wkProductNotAvailable);
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
                                    viewModel.productCart()[i].productPrice(Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_3__["makeTotalProductCaculation"])(parseFloat(data.price)));
                                    var pos_cart = JSON.parse(localStorage.pos_cart);
                                    if (pos_cart) {
                                        var index = getIndexByIdProduct(pos_cart[cartIndex], data.idProduct);
                                        pos_cart[cartIndex][index]['quantity'] += 1;
                                    }
                                    // pos_cart[cartIndex]['order_disount'] = viewModel.orderDiscount();
                                    localStorage.setItem("pos_cart", JSON.stringify(pos_cart));
                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(updateQuantityMsg);
                                    // $.growl.notice({ title: "", message: updateQuantityMsg });
                                    Object(_wkimagemove_js__WEBPACK_IMPORTED_MODULE_2__["displayImageDrag"])(pos_products[data.idProduct]['image'], event.target);
                                } else if (pos_products[data.idProduct]['availableForOrder'] == 0) {
                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(wkProductNotAvailable);
                                    // $.growl.error({ title: "", message: wkProductNotAvailable });
                                } else {
                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(pos_products[data.idProduct]['name'] + ' ' + wkQuantityNotifi);
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
                                cartProduct["specificPrices"] = data.specificPrices;
                                cartProduct["stock_location"] = data.stock_location;
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
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(addedToCart);
                                // $.growl.notice({ title: "", message: addedToCart });
                                Object(_wkimagemove_js__WEBPACK_IMPORTED_MODULE_2__["displayImageDrag"])(pos_products[data.idProduct]['image'], event.target);
                            } else if (pos_products[data.idProduct]['availableForOrder'] == 0) {
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(wkProductNotAvailable);
                                // $.growl.error({ title: "", message: wkProductNotAvailable });
                            } else {
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(pos_products[data.idProduct]['name'] + ' ' + wkQuantityNotifi);
                                // $.growl.error({ title: "", message: wkQuantityNotifi });
                            }
                        }
                    }
                },
                function (response) {
                }
            );
        }

        function checkOutofStockAllow(product) {
            if ((product['outOfStock'] == '1') || (product['outOfStock'] == '2' && allowOOSConfig == 1)) {
                return true;
            } else {
                return false;
            }
        }

        function addCombinationToCart() {
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
            var posProductOnLoad = _product_js__WEBPACK_IMPORTED_MODULE_1__["default"].getPosProductDetails();
            posProductOnLoad.then(
                function (pos_products) {
                    if (pos_products[idProduct]['availableForOrder'] == 1) {
                        if (pos_products[idProduct]['combination_details'][selectedCombination] == undefined) {
                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(combinationNotExist);
                            // $.growl.error({ title: "", message: combinationNotExist });
                        } else {
                            var idProductAttribute = pos_products[idProduct]['combination_details'][selectedCombination].id_product_attribute;
                            var combinationPrice = pos_products[idProduct]['combination_details'][selectedCombination].price;
                            var combinationAvalQty = pos_products[idProduct]['combination_details'][selectedCombination].quantity;
                            var combinationDisplayPriceWithoutReduction = pos_products[idProduct]['combination_details'][selectedCombination].priceWithoutReduction;
                            var combinationStockLocation = pos_products[idProduct]['combination_details'][selectedCombination].stock_location;
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
                                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(pos_products[idProduct]['name'] + ' ' + wkQuantityNotifi);
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
                                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(updateQuantityMsg);
                                                // $.growl.notice({ title: "", message: updateQuantityMsg });
                                                Object(_wkimagemove_js__WEBPACK_IMPORTED_MODULE_2__["displayImageDrag"])(pos_products[idProduct]['image'], viewModel.eventTarget());
                                            } else {
                                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(pos_products[idProduct]['name'] + ' ' + wkQuantityNotifi);
                                                // $.growl.error({ title: "", message: wkQuantityNotifi });
                                            }
                                            return;
                                        }
                                    } else if (pos_products[idProduct]['availableForOrder'] == 0) {
                                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(wkProductNotAvailable);
                                        // $.growl.error({ title: "", message: wkProductNotAvailable });
                                    }
                                }
                            }
                            /* If No then add the product in the selected cart */
                            if (!update) {
                                if (!Number.isInteger(parseInt(viewModel.combinationQuantity()))) {
                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(pos_products[idProduct]['name'] + ' ' + wkQuantityNotifi);
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
                                        var specificPricesWk = [];
                                        $.each(pos_products[idProduct].specificPrices, function (index, element) {
                                            if (element.id_product_attribute == idProductAttribute) {
                                                specificPricesWk.push(element);
                                            }
                                        });
                                        // cartProduct["specificPrices"] = pos_products[idProduct].specificPrices;
                                        cartProduct["specificPrices"] = specificPricesWk;
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
                                        Object(_wkimagemove_js__WEBPACK_IMPORTED_MODULE_2__["displayImageDrag"])(pos_products[idProduct]['image'], viewModel.eventTarget());
                                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(addedToCart);
                                        // $.growl.notice({ title: "", message: addedToCart });
                                    } else if (pos_products[idProduct]['availableForOrder'] == 0) {
                                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(wkProductNotAvailable);
                                        // $.growl.error({ title: "", message: wkProductNotAvailable });
                                    } else {
                                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(pos_products[idProduct]['name'] + ' ' + wkQuantityNotifi);
                                        // $.growl.error({ title: "", message: wkQuantityNotifi });
                                    }
                                }
                            }
                        }
                    } else {
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(wkProductNotAvailable);
                        // $.growl.error({ title: "", message: wkProductNotAvailable });
                    }
                },
                function (response) {
                }
            );
            viewModel.resetCartCalculator();
        }

        function switchCart(data) {
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
                    viewModel.selectedCustomerIdGroup(customers[viewModel.selectedCustomerId()].default_group);
                    viewModel.customerEmail(pos_cart[cartProductIndex]['others']['customer']['customerEmail']);
                    viewModel.customerName(pos_cart[cartProductIndex]['others']['customer']['customerName']);
                    viewModel.idCustomer(pos_cart[cartProductIndex]['others']['customer']['idCustomer']);
                    viewModel.selectedIdCountry(pos_cart[cartProductIndex]['others']['id_country']);
                } else {
                    if (guestAccountEnabled == true) {
                        viewModel.selectedCustomerId(idGuest);
                        viewModel.selectedCustomerIdGroup(customers[viewModel.selectedCustomerId()].default_group);
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

        function pushCartProducts(allData, cartIndex) {
            var loadViewModel = viewModel;
            if (typeof viewModel == 'undefined') {
                loadViewModel = objPosProductsViewModel;
            }
            if (typeof loadViewModel != 'undefined') {
                var count = -1;
                var i = 0;
                var notFound = 0;
                var posProductOnLoad = _product_js__WEBPACK_IMPORTED_MODULE_1__["default"].getPosProductDetails();
                posProductOnLoad.then(
                    function (pos_products) {
                        var mappedTasks = $.map(allData[cartIndex], function (item, index) {
                            if (Number.isInteger(parseInt(index))) {
                                if (typeof removePosProduct != 'undefined' && removePosProduct != 0) {
                                    if (typeof pos_products != 'undefined'
                                        && typeof pos_products[item.id] != 'undefined'
                                        && (!pos_products[item.id].has_combination || ((typeof item.idProductAttribute != 'undefined') && (parseInt(item.idProductAttribute) > 0)))
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
                                        item.specificPrices = pos_products[item.id].specificPrices;
                                        return new ProductCartDetails(item, index, pos_products[item.id]);
                                    } else {
                                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(eitherMsg + ' ' + item.name + ' ' + productNotFoundAlert);
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
                                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(productSuccessRemovedAlert);
                                            // $.growl.notice({ title: "", message: productSuccessRemovedAlert });
                                        }
                                    }
                                } else {
                                    if (typeof pos_products == 'undefined'
                                        || typeof pos_products[item.id] == 'undefined'
                                    ) {
                                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(eitherMsg + ' ' + item.name + ' ' + productNotFoundAlert);
                                        // $.growl.error({ title: "", message: eitherMsg + ' '+ item.name+ ' ' +productNotFoundAlert });
                                        notFound = 1;
                                    } else {
                                        item.specificPrices = pos_products[item.id].specificPrices;
                                    }
                                    if (typeof pos_products != 'undefined'
                                        && typeof pos_products[item.id] != 'undefined'
                                    ) {
                                        if (!pos_products[item.id].has_combination || ((typeof item.idProductAttribute != 'undefined') && (parseInt(item.idProductAttribute) > 0))) {
                                            return new ProductCartDetails(item, index, pos_products[item.id]);
                                        }
                                    } else {
                                        return new ProductCartDetails(item, index, pos_products[item.id]);
                                    }
                                }
                            }
                        });
                        if (notFound) {
                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(removeProductAlert);
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

        function getAppliedSpecificPrice(productDetails) {
            var localCart = JSON.parse(localStorage.pos_cart)
            var sp = {}
            if ((localCart[localStorage.currentCartId] != undefined) && (localCart[localStorage.currentCartId].others != undefined) && (localCart[localStorage.currentCartId].others.id_cart != undefined) && (parseInt(localCart[localStorage.currentCartId].others.id_cart) > 0)) {
                sp = productDetails.specificPrices.find(
                    o => (parseInt(o.from_quantity) <= parseInt(productDetails.quantity))
                        && (parseInt(o.id_customer) == parseInt(viewModel.selectedCustomerId()))
                        && ((parseInt(o.id_cart) == localCart[localStorage.currentCartId].others.id_cart) || (parseInt(o.id_cart) == 0))
                );
            } else {
                sp = productDetails.specificPrices.find(
                    o => (parseInt(o.from_quantity) <= parseInt(productDetails.quantity))
                        && (parseInt(o.id_customer) == parseInt(viewModel.selectedCustomerId()))
                        && (parseInt(o.id_cart) == 0)
                );
            }
            if (!sp || (Object.keys(sp).length == 0)) {
                sp = productDetails.specificPrices.find(
                    o => (parseInt(o.from_quantity) <= parseInt(productDetails.quantity))
                        && (parseInt(o.id_group) == parseInt(viewModel.selectedCustomerIdGroup()))
                        && (parseInt(o.id_cart) == 0)
                );
            }
            if (sp && (Object.keys(sp).length > 0)) {
                return sp;
            }
            return {};
        }

        function getTaxExcludedPriceForCartProduct(productDetails) {
            var prPrice = productDetails.taxExcludedPrice;
            var appliedSpecificPrice = getAppliedSpecificPrice(productDetails);
            if (Object.keys(appliedSpecificPrice).length > 0) {
                var sp = appliedSpecificPrice;
                if (sp.price > 0) {
                    prPrice = sp.price;
                }
                if (sp.reduction_type == "percentage") {
                    prPrice = prPrice - prPrice * parseFloat(sp.reduction);
                } else {
                    //amount
                    var taxExclReduction = sp.reduction;
                    if (sp.reduction_tax == 1) {
                        // reduction is tax included, remove tax for this price: taxExcludedPrice
                        taxExclReduction = ((sp.reduction * 100) / (100 + productDetails.taxRate));
                    }
                    prPrice = prPrice - taxExclReduction;
                }
            }
            return prPrice;
        }

        /* Get the product deatils of the pos cart product */
        async function getProductDetails(posCartProduct) {
            try {
                var posProductOnLoad = await _product_js__WEBPACK_IMPORTED_MODULE_1__["default"].getPosProductDetails();
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
                            errors[i++] = product['name'] + ' ' + wkQuantityNotifi;
                        } else if (productDetails['has_combination'] == false
                            && (productDetails['quantity'] < product['quantity'] && checkOutofStockAllow(productDetails) == false)
                        ) {
                            errors[i++] = product['name'] + ' ' + wkQuantityNotifi;
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
                            product['taxExcludedPrice'] = getTaxExcludedPriceForCartProduct(product); ///added for specific price
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
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
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

        function updateCartTotalAmount(cartAmount) {
            var amount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_3__["makeTotalProductCaculation"])(cartAmount);
            // var amount = makeTotalProductCaculation((cartAmount - viewModel.orderDiscount()));
            viewModel.totalOrderAmount(amount);
        }

        /* Update the selected product details in cart */
        async function updateProduct(self, reset = false) {
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
                                viewModel.productCart()[selectedItem].taxExclPrice(qty);
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
                                viewModel.productCart()[selectedItem].taxExclPrice(taxExclPrice);
                                viewModel.productCart()[selectedItem].productPrice(parseFloat(qty));
                                viewModel.productCart()[selectedItem].updatePrice(1);
                                pos_cart[cartIndex][selectedItem]['taxExcludedPrice'] = taxExclPrice;
                                pos_cart[cartIndex][selectedItem]['price'] = parseFloat(qty);
                                pos_cart[cartIndex][selectedItem]['updatePrice'] = 1;
                            }
                        } else if (viewModel.updateAction() == "qty") {
                            var pos_products = await _product_js__WEBPACK_IMPORTED_MODULE_1__["default"].getPosProductDetails();
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
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(pos_products[idProduct]['name'] + ' ' + wkQuantityNotifi);
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
                                viewModel.productCart()[selectedItem].taxExclPrice(qty);
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
                                viewModel.productCart()[selectedItem].taxExclPrice(taxExclPrice);
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


        function deleteCartCustomer() {
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

/***/ }),

/* 5 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Order", function () { return Order; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderedProduct", function () { return OrderedProduct; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchOrder", function () { return searchOrder; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addProductToPsCart", function () { return addProductToPsCart; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateOrder", function () { return generateOrder; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePOSOrder", function () { return generatePOSOrder; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateOrderStatus", function () { return updateOrderStatus; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refundOrder", function () { return refundOrder; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editOrderProduct", function () { return editOrderProduct; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateOrder", function () { return updateOrder; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadOrderPanel", function () { return loadOrderPanel; });
        /* harmony import */ var _wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
        /* harmony import */ var _poscart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
        /* harmony import */ var _wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
        /* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
        /* harmony import */ var _voucher_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
        /* harmony import */ var _wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
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

        /* Mapping of order Details */
        function Order(order, products = false) {
            var self = this;
            self.orderReference = order['reference'];
            self.idOrder = order['id_order'];
            self.orderDate = order['order_date'];
            self.messages = null;
            self.orderedProducts = ko.observableArray([]);
            self.digitalSign = ko.observable(order['digital_sign']);
            self.giftCardB = ko.observable(order['gift_card']);
            self.creditSlipSecond = ko.observable(order['credit_slip']);
            self.current_state = ko.observable(parseInt(order.current_state));
            self.orderTotal = ko.observable(order['total_paid_tax_incl']);
            self.displayOrderDiscount = ko.observable(order['total_discounts']);
            self.orderSubTotal = ko.observable((order['total_products_wt']));
            self.displayOrderShipping = ko.observable((order['shipping_cost_tax_incl']));
            if (typeof order['shipping_cost_tax_incl'] != 'undefined' && order['shipping_cost_tax_incl']) {
                self.orderShipping = ko.observable((order['shipping_cost_tax_incl'].replace(order['currency'], '')));
            } else {
                self.orderShipping = ko.observable(0);
            }
            if (typeof order['total_discounts'] != 'undefined' && order['total_discounts']) {
                self.orderDiscount = ko.observable((order['total_discounts'].replace(order['currency'], '')));
            } else {
                self.orderDiscount = ko.observable(0);
            }
            self.displayOrderDiscount = ko.observable(order['total_discounts']);
            self.shippingCost = ko.observable(order['shipping_cost_tax_incl']);

            if (typeof order['messages'] != 'undefined' && order['messages'] != null) {
                var messages = [];
                $.each(order['messages'], function (index, message) {
                    messages.push({
                        'name': message['message']
                    });
                });
                self.messages = messages;
            }
            // if (isNaN(order['total_paid_tax_incl'])) {
            // } else {
            //     self.orderTotal = asyncComputed(function () {
            //         return wkFormatCurrency(order['total_paid_tax_incl'], currencyFormat);
            //     }, this);
            //     self.displayOrderDiscount = asyncComputed(function () {
            //         return wkFormatCurrency(order['total_discounts'], currencyFormat);
            //     }, this);
            //     self.orderSubTotal = asyncComputed(function () {
            //         return wkFormatCurrency(order['total_products_wt'], currencyFormat);
            //     }, this);
            //     self.orderShipping = asyncComputed(function () {
            //         return wkFormatCurrency(order['shipping_cost_tax_incl'], currencyFormat);
            //     }, this);
            //     self.orderDiscount = asyncComputed(function () {
            //         return wkFormatCurrency(order['total_discounts'], currencyFormat);
            //     }, this);
            //     self.shippingCost = asyncComputed(function () {
            //         return wkFormatCurrency(order['shipping_cost_tax_incl'], currencyFormat);
            //     }, this);

            // }
            self.payment = order['payment'];
            self.id_wkpos_order = parseInt(order['id_wkpos_order']);
            self.order_payment = order['order_payment'];
            self.installment_order = false;
            self.currency = ko.observable(order.currency);
            var orderPayments = [];
            if (order['order_payment']) {
                $.each(order['order_payment'], function (index, payment) {
                    if (payment['id_wkpos_payment'] == 4) {
                        self.installment_order = true;
                        if (order['installment']['paidAmount'] == null) {
                            order['installment']['paidAmount'] = 0;
                        }
                        if (isNaN(order['installment']['paidAmount'])) {
                            self.displayAmountPaid = order['installment']['paidAmount'];
                            self.displayRemainingAmount = order['installment']['remainingAmount'];
                        } else {
                            self.displayAmountPaid = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__["asyncComputed"])(function () {
                                return Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__["wkFormatCurrency"])(parseFloat(order['installment']['paidAmount']), currencyFormat);
                            }, this);
                            self.displayRemainingAmount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__["asyncComputed"])(function () {
                                return Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__["wkFormatCurrency"])(parseFloat(order['installment']['remainingAmount']), currencyFormat);
                            }, this);
                        }
                        self.amountPaid = ko.observable(parseFloat(order['installment']['paidAmount']));
                        self.remainingAmount = ko.observable(parseFloat(order['installment']['remainingAmount']));
                    } else {
                        if (isNaN(payment['tendered'])) {
                            var orderPayment = {
                                'name': payment['name'],
                                'displayPartialAmount': payment['totalOrderAmount']
                            };
                        } else {
                            var orderPayment = {
                                'name': payment['name'],
                                'displayPartialAmount': Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__["asyncComputed"])(function () {
                                    return Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__["wkFormatCurrency"])(parseFloat(payment['totalOrderAmount']), currencyFormat);
                                }, this)
                            };
                        }
                        orderPayments.push(orderPayment);
                    }
                });
            } else {
                self.displayAmountPaid = ko.observable(0);
                self.displayRemainingAmount = ko.observable(0);
                self.amountPaid = ko.observable(0);
                self.remainingAmount = ko.observable(0);
            }
            self.order_payment = orderPayments;

            self.customerName = order['customer_name'];
            var address;
            if (order['address1'] != '') {
                address = order['address1'] + '<br>';
            }
            if (order['address2'] != '') {
                address += order['address2'] + '<br>';
            }
            if (order['city'] != '') {
                address += order['city'] + ' - ';
            }
            if (order['postcode'] != '') {
                address += order['postcode'];
            }
            self.customerAddress = address;

            if (products) {
                $.each(products, function (index, product) {
                    self.orderedProducts.push(new OrderedProduct(product, index, 1, order.currency));
                });
            }
        }

        /* Mapping of ordered product in a order */
        function OrderedProduct(product, index, displayOrderBill = false, currency) {
            var self = this;
            this.serialNo = parseInt(index) + 1;
            this.productName = product['product_name'].split(" - ")[0];
            this.productQuantity = product['product_quantity'];
            self.productPrice = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__["makeTotalProductCaculation"])(product['unit_price_tax_incl']);
            self.totalPricePerProduct = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__["makeTotalProductCaculation"])(product['total_price_tax_incl']);
            self.changedtotalPricePerProduct = ko.observable(Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__["makeTotalProductCaculation"])(product['total_price_tax_incl']));
            self.currency = currency;
            // if (isNaN(product['unit_price_tax_incl'])) {
            // } else {
            //     self.productPrice = asyncComputed(function () {
            //         return wkFormatCurrency(product['unit_price_tax_incl'], currencyFormat);
            //     }, this);
            //     self.totalPricePerProduct = asyncComputed(function () {
            //         return wkFormatCurrency(product['total_price_tax_incl'], currencyFormat);
            //     }, this);
            //     self.changedtotalPricePerProduct = asyncComputed(function () {
            //         return wkFormatCurrency(product['total_price_tax_incl'], currencyFormat);
            //     }, this);
            // }
            // formatCurrencyCldr(product['unit_price_tax_incl'], function(price) {
            //     self.productPrice = price;
            // });
            // formatCurrencyCldr(product['total_price_tax_incl'], function(price) {
            //     self.totalPricePerProduct = price;
            // });
            // formatCurrencyCldr(product['total_price_tax_incl'], function(price) {
            //     self.changedtotalPricePerProduct = ko.observable(price);
            // });

            this.changedTaxExclPrice = ko.observable(Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__["makeTotalProductCaculation"])(parseFloat(product['total_price_tax_incl'])));
            this.id_order_invoice = parseInt(product['id_order_invoice']);
            this.totalPrice = parseFloat(product['total_price_tax_incl']);
            this.price = product['unit_price_tax_incl'];
            this.totalTaxExclusive = parseFloat(product['total_price_tax_excl']);
            this.totalTaxInclusive = parseFloat(product['total_price_tax_incl']);
            this.taxRate = ((this.totalTaxInclusive - this.totalTaxExclusive) * 100 / (this.totalTaxExclusive));

            if (product['product_name'].split(" - ")[1] != undefined) {
                this.productAttributes = product['product_name'].split(" - ")[1];
            } else {
                this.productAttributes = "";
            }

            if (product['reduction_percent'] != undefined && displayProductDiscount == 1) {
                this.productDiscount = product['reduction_percent'];
                // productDetails += product['reduction_percent'];
            } else {
                this.productDiscount = 0;
            }

            this.partialRefundQty = ko.observable(0);
            this.partialRefundAmount = ko.observable(0);

            this.refundedQty = ko.observable(0);
            this.refundedAmount = ko.observable(0);

            this.id_order_detail = product.id_order_detail;
            this.amount_refundable_tax_incl = ko.observable(product.amount_refundable_tax_incl);
            this.quantity_refundable = ko.observable(parseInt(product.quantity_refundable));

            if (product.return_qty) {
                var status = viewModel.alreadyRefund() || true;
                this.return_qty = product['return_qty'];
            } else {
                var status = viewModel.alreadyRefund() || false;
                this.return_qty = 0;
            }
            viewModel.changeRefundStatus(status);
            if (product.return_amount_tax_incl) {
                this.return_amount_tax_incl = product['return_amount_tax_incl'];
            } else {
                this.return_amount_tax_incl = 0;
            }
            self.return_amount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_5__["makeTotalProductCaculation"])(self.return_amount_tax_incl);
            // if (isNaN(self.return_amount_tax_incl)) {
            // } else {
            //     self.return_amount = asyncComputed(function () {
            //         return wkFormatCurrency(self.return_amount_tax_incl, currencyFormat);
            //     }, this);
            // }
        }

        /* Search order on the basis of order reference */
        function searchOrder() {
            var posOrder;
            posOrder = posOrders;
            if (viewModel.selectedOrderType() == "offline") {
                posOrder = $.parseJSON(localStorage.pos_orders);
            }
            var selectOrder = true;
            var i = 0, mappedOrders = [];
            var orderSearch = (viewModel.orderSearchKey()).toLowerCase();
            var addOrder = true;
            $.each(posOrder, function (index, order) {
                if ((((order['order']['reference'] + "").toLowerCase()).search(orderSearch) != '-1')
                    || (((order['order']['offline_reference'] + "").toLowerCase()).search(orderSearch) != '-1')
                    || ((order['order']['order_date'] + "").search(orderSearch) != '-1')
                    || ((order['order']['total_paid_tax_incl'] + "").search(orderSearch) != '-1')
                ) {
                    addOrder = true;
                    // if (viewModel.selectedOrderType() == "history" && order['order'].id_wkpos_session == idWkPosSession) {
                    //     addOrder = false;
                    // } else if (viewModel.selectedOrderType() == "current_session" && order['order'].id_wkpos_session != idWkPosSession) {
                    //     addOrder = false;
                    // }

                    if (addOrder) {
                        if (selectOrder) {
                            viewModel.selectedOrderReference(order['order']['reference']);
                            viewModel.selectedOrderId(order['order']['id_order']);
                            selectOrder = false;
                        }
                        mappedOrders[i++] = (new Order(order['order']));
                    }
                }
            });
            loadOrderPanel(mappedOrders);
            // viewModel.orderDetails(mappedOrders);
        }


        async function addProductToPsCart(offlineSync = false) {
            var pos_cart = $.parseJSON(localStorage.pos_cart);
            var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
            viewModel.order = ko.observableArray([]);
            var idCustomer = 0;
            if (pos_cart[cartIndex] != undefined) {
                if (pos_cart[cartIndex]['others'] != undefined && pos_cart[cartIndex]['others']['customer'] != undefined) {
                    idCustomer = pos_cart[cartIndex]['others']['customer']['idCustomer'];
                }
                var products = await Object(_poscart_js__WEBPACK_IMPORTED_MODULE_1__["getProductDetails"])(pos_cart[cartIndex]);
                if (products != null) {
                    var data = {
                        action: 'addProductToCart',
                        ajax: true,
                        product: JSON.stringify(products),
                        idCustomer: idCustomer,
                        order_discount: viewModel.orderDiscount(),
                        id_address: viewModel.selectedIdAddress(),
                        id_carrier: viewModel.selectedIdCarrier(),
                        posToken: posToken
                    };
                    if (pos_cart[cartIndex]['others'] != undefined
                        && pos_cart[cartIndex]['others']['id_cart'] != undefined
                    ) {
                        data['id_cart'] = pos_cart[cartIndex]['others']['id_cart'];
                    }
                    $('.wk-loading-pos-details').addClass('sync-orders').removeClass('hide');
                    $('.wk-loading-status').html('').show();
                    $('.wk-loading-pos-details').next().css({ "opacity": "0.7" });
                    $.ajax({
                        url: orderUrl,
                        dataType: 'json',
                        type: 'POST',
                        data: data,
                        success: function (order) {
                            if (order.hasError) {
                                $.each(order.errors, function (index, error) {
                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                    $('.wk-loading-pos-details').addClass('sync-orders').addClass('hide');
                                    $('.wk-loading-status').html('').hide();
                                    $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                                    // $.growl.error({ title: "", message: error });
                                    posViewModel.bodyPanel('products');
                                    posViewModel.contentModel.callPosResize();
                                });
                            } else {
                                // self.totalOrderAmount(order.cartAmount);
                                Object(_poscart_js__WEBPACK_IMPORTED_MODULE_1__["updateCartTotalAmount"])(order.cartAmount);
                                cartVouchers = order.availableVouchers;
                                if (order.id_cart != undefined) {
                                    pos_cart[cartIndex]['others']['id_cart'] = order.id_cart;
                                }
                                if (typeof order.appliedVoucher != 'undefined' && order.appliedVoucher) {
                                    Object(_voucher_js__WEBPACK_IMPORTED_MODULE_4__["updateVoucherCoupon"])(pos_cart[cartIndex], order.appliedVoucher);
                                    Object(_voucher_js__WEBPACK_IMPORTED_MODULE_4__["updateVouchers"])(pos_cart[cartIndex]);
                                    Object(_voucher_js__WEBPACK_IMPORTED_MODULE_4__["appliedVouchers"])(order.appliedVoucher);
                                }
                                localStorage.pos_cart = JSON.stringify(pos_cart);
                                $('.wk-loading-pos-details').removeClass('sync-orders').addClass('hide');
                                $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                                if (offlineSync) {

                                }
                            }
                        },
                        error: function (jqXHR, exception) {
                            Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_2__["ajaxResposeError"])(jqXHR, exception);
                        }
                    });
                }
            }
        }

        async function generateOrder(orderData = null) {
            if (deliveryError == 0) {
                var pos_cart = $.parseJSON(localStorage.pos_cart);
                var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                viewModel.order = ko.observableArray([]);
                var idCustomer = 0;
                var cartOtherDetails = pos_cart[cartIndex]['others'];

                if (cartOtherDetails != undefined && cartOtherDetails['customer'] != undefined) {
                    idCustomer = cartOtherDetails['customer']['idCustomer'];
                }

                var products = await Object(_poscart_js__WEBPACK_IMPORTED_MODULE_1__["getProductDetails"])(pos_cart[cartIndex]);
                if (products != null) {
                    viewModel.confirmDisabled(1);
                    if (posViewModel.navigatorOnline()) {
                        /* Generate order in prestashop if there is internet connection  */
                        $('.wk-loading-pos-details').addClass('sync-orders').removeClass('hide');
                        $('.wk-loading-status').html('').show();
                        $('.wk-loading-pos-details').next().css({ "opacity": "0.7" });
                        var paymentDetails = ko.mapping.toJS(viewModel.paymentOptions);
                        if (paymentDetails.length == 1) {
                            viewModel.selectedPaymentOption(paymentDetails[0].paymentMethod);
                        }
                        var data = {
                            action: 'generateOrder',
                            ajax: true,
                            idCustomer: idCustomer,
                            total_paid: viewModel.total(),
                            // tendered: viewModel.customerPayAmount(),
                            // change: viewModel.customerReturnAmount(),
                            order_discount: viewModel.orderDiscount(),
                            payment_module: viewModel.selectedPaymentOption(),
                            // id_payment: viewModel.selectedPaymentId(),
                            id_address: viewModel.selectedIdAddress(),
                            id_carrier: viewModel.selectedIdCarrier(),
                            order_message: viewModel.orderMessage(),
                            // id_wkpos_session: idWkPosSession,
                            paymentDetails: paymentDetails,
                            posToken: posToken
                        };

                        if (orderData != null) {
                            data = { ...data, ...orderData };
                        }
                        if (viewModel.selectedPaymentId() == 3) {
                            data.installment = viewModel.installment();
                            data.installmentAmount = viewModel.installmentAmount();
                        }
                        if (pos_cart[cartIndex]['others']['id_cart'] != undefined) {
                            data['id_cart'] = pos_cart[cartIndex]['others']['id_cart'];
                        }
                        posViewModel.contentModel.emitBeforeEvents('generateOnlineOrder', data);
                        $.ajax({
                            url: orderUrl,
                            dataType: 'json',
                            type: 'get',
                            data: data,
                            success: function (order) {
                                if (order.hasError) {
                                    $.each(order.errors, function (index, error) {
                                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                        // $.growl.error({ title: "", message: error });
                                    });
                                } else {
                                    viewModel.digitalSign(order[order.id_order]['order']['digital_sign']);
                                    viewModel.giftCardB(order[order.id_order]['order']['gift_card']);
                                    // for wkposnf525
                                    viewModel.creditSlipSecond(order['credit_slip']);

                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(order.success);
                                    // $.growl.notice({ title: "", message: order.success });
                                    taxRate = undefined;
                                    viewModel.confirmDisabled(0);
                                    viewModel.orderDiscount(0);
                                    /* Generate order Receipt */
                                    viewModel.orderReceipt(order[order.id_order]);
                                    viewModel.selectedOrderId(order.id_order);
                                    posOrders[order.id_order] = order[order.id_order];
                                    /* Display Barcode if applicable */
                                    if (displayBarcode == 1) {
                                        JsBarcode("#order_barcode", order[order.id_order]['order']['reference'], {
                                            height: 40,
                                            displayValue: false,
                                            textAlign: 'center',
                                        });
                                    }
                                    $('.wk-loading-pos-details').removeClass('sync-orders').addClass('hide');
                                    $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                                    /* Update all the deatils in the store */
                                    getPOSDetails();
                                    selectedCountry = 0;
                                    /* Remove the shipping methods */
                                    viewModel.posShipping([]);
                                    viewModel.selectedIdCountry(0);
                                    viewModel.selectedPaymentId(0);
                                    qty = 0;
                                    viewModel.selectedIdCarrier(0);
                                    viewModel.selectedIdCarrierCost(0);
                                    viewModel.appliedVouchers([]);
                                    viewModel.orderMessage('');
                                }
                                viewModel.selectedPaymentOption(defaultPaymentMethod);
                                viewModel.selectedCarrierName(noCarrier);
                                if (guestAccountEnabled == true) {
                                    viewModel.selectedCustomerId(idGuest);
                                    viewModel.selectedCustomerIdGroup(customers[viewModel.selectedCustomerId()].default_group);
                                    viewModel.selectedCustomerName(guestName);
                                    if (shippingEnabled) {
                                        viewModel.posShipping([]);
                                    }
                                } else {
                                    viewModel.resetCustomerDetails();
                                    viewModel.selectedCustomerName(customerName);
                                    // viewModel.selectedCustomerId(0);
                                    // viewModel.activeCustomerId(0);
                                }
                                viewModel.idCustomer(0);
                                viewModel.confirmDisabled(0);
                                applyCustomer = 0;
                                applyShipping = 0;
                                $('.wk-loading-pos-details').removeClass('sync-orders').addClass('hide');
                                $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                                // hide gift card button
                                if (viewModel.giftCardB() != undefined) {
                                    if (viewModel.giftCardB().length == 0) {
                                        $('.gift-card').hide();
                                    }
                                }
                                // hide gift card button
                                if (order['credit_slip'] != undefined) {
                                    if (order['credit_slip'].status == true) {
                                        viewModel.showCreditSlipSecond(1);
                                    } else {
                                        viewModel.showCreditSlipSecond(0);
                                    }
                                }
                            },
                            error: function (jqXHR, exception) {
                                Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_2__["ajaxResposeError"])(jqXHR, exception);
                            }
                        });
                    } else {
                        /* Generate order in local storage if there is no internet connection  */
                        var order = {};
                        var d = new Date();
                        var olength = Object.keys(pos_orders).length;
                        order['product'] = products;
                        var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                        var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

                        order['order'] = {};
                        order['order']['payment'] = viewModel.selectedPaymentOption();
                        order['order']['order_date'] = date + " " + time;
                        order['order']['total_discounts'] = viewModel.orderDiscount();
                        order['order']['total_tax'] = parseFloat(viewModel.total()) - parseFloat(viewModel.subTotal());
                        order['order']['total_paid_tax_excl'] = viewModel.subTotal();
                        order['order']['total_products_wt'] = parseFloat(viewModel.subTotal()) + parseFloat(viewModel.totalTax());
                        order['order']['total_paid_tax_incl'] = viewModel.total();
                        order['order']['reference'] = Math.floor((Math.random() * 999999999) + 100000000);
                        order['order']['id_order'] = olength;
                        order['order']['payment_module'] = viewModel.selectedPaymentOption();
                        order['order']['id_payment'] = viewModel.selectedPaymentId();
                        order['order']['id_customer'] = idCustomer;
                        order['order']['id_address'] = idOutletAddress;
                        order['order']['id_carrier'] = viewModel.selectedIdCarrier();
                        order['order']['order_message'] = viewModel.orderMessage();
                        order['order']['shipping_cost_tax_incl'] = 0;
                        order['order']['order_payment'] = ko.mapping.toJS(viewModel.paymentOptions);
                        $.each(order['order']['order_payment'], function (index, payment) {
                            order['order']['order_payment'][index]['name'] = payment['paymentMethod'];
                        });
                        if (viewModel.selectedPaymentId() == 3) {
                            order['order']['installment'] = viewModel.installment();
                            order['order']['installmentAmount'] = viewModel.installmentAmount();
                        }
                        order['order']['id_address'] = idOutletAddress;
                        order['order']['address1'] = outletAddress1;
                        order['order']['address2'] = outletAddress2;
                        order['order']['city'] = outletCity;
                        order['order']['currency'] = currencySign;
                        order['order']['current_state'] = 2;
                        order['order']['postcode'] = outletPostCode;

                        order['order']['tendered'] = viewModel.customerPayAmount();
                        order['order']['change'] = viewModel.customerReturnAmount();
                        // order['order']['id_wkpos_session'] = idWkPosSession;

                        order['order']['customer_name'] = viewModel.selectedCustomerName();
                        viewModel.orderReceipt(order);
                        viewModel.orderDiscount(0);
                        viewModel.selectedOrderId(olength);
                        if (displayBarcode == 1) {
                            JsBarcode("#order_barcode", order['order']['reference'], {
                                height: 40,
                                displayValue: false,
                                textAlign: 'center',
                            });
                        }
                        viewModel.confirmDisabled(0);
                        viewModel.selectedIdCountry(0);
                        viewModel.selectedPaymentId(0);
                        qty = 0;
                        if (guestAccountEnabled == true) {
                            viewModel.selectedCustomerId(idGuest);
                            viewModel.selectedCustomerIdGroup(customers[viewModel.selectedCustomerId()].default_group);
                            viewModel.selectedCustomerName(guestName);
                        } else {
                            viewModel.resetCustomerDetails();
                            viewModel.selectedCustomerName(customerName);
                        }
                        viewModel.selectedPaymentOption(defaultPaymentMethod);
                        viewModel.idCustomer(0);
                        posViewModel.contentModel.emitBeforeEvents('generateOfflineOrder', order);
                        pos_orders[olength] = order;
                        // $.growl.success({ message: "Order Created Successfully" });
                        if (localStorage) {
                            localStorage.pos_orders = JSON.stringify(pos_orders);
                        };
                        /* Update the local storage inventory */
                        try {
                            var pos_products = await _product_js__WEBPACK_IMPORTED_MODULE_3__["default"].getPosProductDetails();
                            var mappedTasks = $.map(pos_products, function (item) { return new _product_js__WEBPACK_IMPORTED_MODULE_3__["Products"](item, viewModel.selectedIdCountry()) });
                            Object(_product_js__WEBPACK_IMPORTED_MODULE_3__["loadProductPanel"])(mappedTasks);
                            $.each(pos_cart[cartIndex], function (key, value) {
                                if (Number.isInteger(parseInt(key))) {
                                    var cartProduct = pos_cart[cartIndex][key];
                                    pos_products[cartProduct['id']]['quantity'] = parseInt(pos_products[cartProduct['id']]['quantity']) - parseInt(cartProduct['quantity']);
                                    if (cartProduct['combinationIndex'] != undefined) {
                                        pos_products[cartProduct['id']]['combination_details'][cartProduct['combinationIndex']]['quantity'] = parseInt(pos_products[cartProduct['id']]['combination_details'][cartProduct['combinationIndex']]['quantity']) - parseInt(cartProduct['quantity']);
                                    }
                                }
                            });
                            Object(_product_js__WEBPACK_IMPORTED_MODULE_3__["storeProduct"])(pos_products);
                            Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["updateStoreProduct"])(pos_products);
                        } catch (e) {
                            console.log(e);
                        }
                        applyCustomer = 0;
                        applyShipping = 0;
                    }
                }
            } else {
                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(deliveryAddressError);
                // $.growl.error({ title: "", message: deliveryAddressError });
            }
        }

        function generatePOSOrder(idCart, order, idCustomer, index, numberOfOrders) {
            var data = {
                action: 'generateOrder',
                ajax: true,
                // product: JSON.stringify(order['product']),
                idCustomer: idCustomer,
                total_paid: order['order']['total_price_tax_incl'],
                orderDate: order['order']['order_date'],
                tendered: order['order']['tendered'],
                change: order['order']['change'],
                order_discount: order['order']['total_discounts'],
                payment_module: order['order']['payment_module'],
                id_payment: order['order']['id_payment'],
                id_address: order['order']['id_address'],
                id_carrier: order['order']['id_carrier'],
                // id_wkpos_session: order['order']['id_wkpos_session'],
                offline_reference: order['order']['reference'],
                id_cart: idCart,
                offlineSync: true,
                posToken: posToken
            };

            if (typeof order['order']['order_message'] != undefined) {
                data.order_message = order['order']['order_message'];
            }

            posViewModel.contentModel.emitBeforeEvents('syncOfflineOrder', { data: data, order: order });

            if (order['order']['id_payment'] == 3) {
                data.installment = order['order']['installment'];
                data.installmentAmount = order['order']['installmentAmount'];
            }

            $.ajax({
                url: orderUrl,
                dataType: 'json',
                type: 'POST',
                async: false,
                data: data,
                success: function (order) {
                    if (order != null) {
                        if (order.hasError) {
                            $.each(order.errors, function (errorIndex, error) {
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                // $.growl.error({ title: "", message: error });
                            });
                        } else {
                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(order.success);
                            // $.growl.notice({ title: "", message: order.success });
                            posOrders[order['id_order']] = order;
                            delete pos_orders[index];
                            localStorage.pos_orders = JSON.stringify(pos_orders);
                            if (viewModel.orderDetails() != undefined && viewModel.orderDetails() != null) {
                                viewModel.orderDetails.remove(viewModel.orderDetails()[0]);
                            }
                            if (viewModel.orderDetails().length == 0) {
                                viewModel.emptyOrders(true);
                            }
                        }
                        if (index == numberOfOrders) {
                            $('.wk-loading-pos-details').removeClass('sync-orders').addClass('hide');
                            $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                            getPOSDetails();
                        }
                    }
                },
                error: function (jqXHR, exception) {
                    Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_2__["ajaxResposeError"])(jqXHR, exception);
                }
            });
        }

        async function updateOrderStatus(idWkPosOrder, installmentAmount) {
            var orderData = {
                action: 'updateOrderStatus',
                id_wkpos_order: idWkPosOrder,
                installmentAmount: installmentAmount,
            }
            var response = await updateOrder(orderData);
            return response;
        }

        async function refundOrder(orderData) {
            var response = await updateOrder(orderData);
            if (response) {
                if (typeof response.msg != 'undefined') {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(response.msg);
                }
                viewModel.orderHistory([]);
                viewModel.orderHistory.push(
                    new Order(
                        response['order'],
                    )
                );
                viewModel.orderedProductsDetail([]);
                var isOrderReturnPossible = false
                $.each(response['products'], function (index, product) {
                    const objOrderedProduct = new OrderedProduct(product, index, false, response.currency)
                    if (objOrderedProduct.quantity_refundable() > 0) {
                        isOrderReturnPossible = true
                    }
                    viewModel.orderedProductsDetail.push(objOrderedProduct);
                });
                viewModel.isOrderReturnable(isOrderReturnPossible)
                posOrders[parseInt(response['id_order'])]['product'] = response['products'];
                posOrders[parseInt(response['id_order'])]['order'] = response['order'];
                orderSlip = response.orderSlip;
                viewModel.showCreditSlip(1);
            }
        }
        // action: editProductOnOrder
        // id_order: 99
        // product_id_order_detail: 160
        // product_price_tax_excl: 15
        // product_price_tax_incl: 18
        // product_quantity: 1
        // product_invoice: 62
        async function editOrderProduct(orderData) {
            var response = await updateOrder(orderData);
            if (response) {
                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(response.msg);
                posOrders[viewModel.selectedOrderId()] = response['order'][viewModel.selectedOrderId()];
                var data = {
                    idOrder: viewModel.selectedOrderId()
                };
                viewModel.loadOrderedDetails(data);
                if (typeof (viewModel.orderDetails()[viewModel.currentSelectedOrderIndex()]) != 'undefined'
                    && (viewModel.orderDetails()[viewModel.currentSelectedOrderIndex()])
                ) {
                    (viewModel.orderDetails()[viewModel.currentSelectedOrderIndex()]).orderTotal(posOrders[viewModel.selectedOrderId()]['order']['total_paid_tax_incl']);
                }
                // (viewModel.orderDetails()[viewModel.currentSelectedOrderIndex()]).orderTotal(wkFormatCurrency((parseFloat(posOrders[viewModel.selectedOrderId()]['order']['total_paid_tax_incl'])), currencyFormat));
            }
        }

        function updateOrder(orderData = {}) {
            orderData.ajax = true;
            orderData.posToken = posToken;

            return new Promise(resolve => {
                $.ajax({
                    url: orderUrl,
                    dataType: 'json',
                    type: 'get',
                    data: orderData,
                    success: function (response) {
                        if (response.hasError) {
                            $.each(response.errors, function (index, error) {
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                            });
                            resolve(false);
                        } else {
                            resolve(response);
                            // getAllCategories();
                        }
                    },
                    error: function (jqXHR, exception) {
                        Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_2__["ajaxResposeError"])(jqXHR, exception);
                        resolve(false);
                    }
                });
            });
        }

        var remainingOrders = [];
        function loadOrderPanel(orders, onScroll = false) {
            orders.sort(function (a, b) {
                return b.idOrder - a.idOrder;
            });
            var pagination = 30;
            var i = 0;
            remainingOrders = orders.slice(pagination, orders.length + 1);
            viewModel.loadedOrders(remainingOrders);
            if (onScroll) {
                var remaininglength = orders.length;
                if (orders.length > pagination) {
                    remaininglength = pagination;
                }
                for (i = 0; i < remaininglength; i++) {
                    viewModel.orderDetails.push(orders[i]);
                }
            } else {
                viewModel.orderDetails(orders.slice(0, pagination));
            }
        }
/***/ }),

/* 6 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajaxResposeError", function () { return ajaxResposeError; });
        /* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
        /* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
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

        function ajaxResposeError(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            jquery__WEBPACK_IMPORTED_MODULE_0___default.a.growl.error({ title: "", message: msg });
        }
/***/ }),

/* 7 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateVouchers", function () { return updateVouchers; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appliedVouchers", function () { return appliedVouchers; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAllVouchers", function () { return removeAllVouchers; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateVoucherCoupon", function () { return updateVoucherCoupon; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyPromocode", function () { return applyPromocode; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeRewardCoupon", function () { return removeRewardCoupon; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removePromoCode", function () { return removePromoCode; });
        /* harmony import */ var _customer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
        /* harmony import */ var _poscart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
        /* harmony import */ var _wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
        /* harmony import */ var _wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
        /* harmony import */ var _wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
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

        function Vouchers(data) {
            var self = this;
            this.idCartRule = data.id_cart_rule;
            this.rewardCode = data.code;
            this.rewardCodeName = data.name;
            this.rewardCodeAmount = data.value_real;
            // formatCurrencyCldr(parseFloat(data.value_real), function(price) {
            //     self.displayRewardAmount = price;
            // });
            self.displayRewardAmount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_4__["asyncComputed"])(function () {
                return Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_4__["wkFormatCurrency"])(parseFloat(data.value_real), currencyFormat);
            }, this);
            this.rewardCodePercent = data.reduction_percent;
        }

        function updateVouchers(posCart, vouchers = false) {
            if (typeof posCart != 'undefined'
                && typeof posCart['others'] != 'undefined'
            ) {
                var selectedIndex = Object(_customer_js__WEBPACK_IMPORTED_MODULE_0__["getSelectedCustomerIndex"])(viewModel.selectedCustomerId());
                if (selectedIndex != -1) {
                    if (typeof cartVouchers != 'undefined' && cartVouchers) {
                        // var selectedCustomer = customers[selectedIndex];
                        // if (typeof selectedCustomer != 'undefined' && typeof selectedCustomer['vouchers'] != 'undefined' && selectedCustomer['vouchers']) {
                        var mappedTasks = $.map(cartVouchers, function (item) {
                            if (item) {
                                if (typeof posCart['others']['reward_coupon'] == 'undefined') {
                                    return new Vouchers(item);
                                }
                                var coupon = posCart['others']['reward_coupon'];
                                if ((Object.keys(coupon)).indexOf(item.id_cart_rule) == -1) {
                                    return new Vouchers(item);
                                }
                            }
                        });
                        viewModel.availableVouchers(mappedTasks);
                    }
                }
            } else {
                viewModel.appliedVouchers([]);
            }
        }

        function appliedVouchers(appliedVouchers) {
            if (typeof appliedVouchers != 'undefined' && appliedVouchers) {
                var mappedTasks = $.map(appliedVouchers, function (item) {
                    return new Vouchers(item);
                });
                viewModel.appliedVouchers(mappedTasks);
            } else {
                viewModel.appliedVouchers([]);
            }
        }

        function removeAllVouchers(prevCustomerId) {
            var pos_cart = $.parseJSON(localStorage.pos_cart);
            var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
            if (typeof pos_cart[cartIndex]['others'] != 'undefined'
                && typeof pos_cart[cartIndex]['others']['reward_coupon'] != 'undefined'
                && pos_cart[cartIndex]['others']['reward_coupon'].length > 0
                && (prevCustomerId != viewModel.activeCustomerId() && prevCustomerId != 0)
            ) {
                idCart = pos_cart[cartIndex]['others']['id_cart'];
                idCartRules = pos_cart[cartIndex]['others']['reward_coupon'];
                idCustomer = pos_cart[cartIndex]['others']['customer']['idCustomer'];
                removePromoCode(idCart, idCartRules, idCustomer);
            }
        }

        function updateVoucherCoupon(posCart, cartRules) {
            var rewardCoupon = {};
            $.each(cartRules, function (index, cartRule) {
                rewardCoupon[cartRule.id_cart_rule] = cartRule.value_real;
            });

            var pos_cart = $.parseJSON(localStorage.pos_cart);
            var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;

            posCart['others']['reward_coupon'] = rewardCoupon;
            pos_cart[cartIndex]['others']['reward_coupon'] = rewardCoupon;
            localStorage.pos_cart = JSON.stringify(pos_cart);
        }

        function applyPromocode() {
            var idCartRule = $('#wk-voucher-applied-input').attr('data-id-cart-rule');
            var pos_cart = $.parseJSON(localStorage.pos_cart);
            var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
            if (typeof pos_cart[cartIndex] != 'undefined') {
                var idCart = pos_cart[cartIndex]['others']['id_cart'];
                var code = $('#wk-voucher-applied-input').val();
                var idCustomer = pos_cart[cartIndex]['others']['customer']['idCustomer'];
                $.ajax({
                    url: orderUrl,
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        'id_cart': idCart,
                        'discount_name': code,
                        'id_cart_rule': idCartRule,
                        'idCustomer': idCustomer,
                        ajax: true,
                        action: 'applyPromoCode'
                    },
                    success: function (order) {
                        if (order.hasError) {
                            $.each(order.errors, function (index, error) {
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_2__["showErrorMsg"])(error);
                                // $.growl.error({ title: "", message: error });
                            });
                        } else {
                            updateVoucherCoupon(pos_cart[cartIndex], order.appliedVoucher);
                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_2__["showSuccessMsg"])(order.success);
                            // $.growl.notice({ title: "", message: order.success });
                            $('#wk-voucher-applied-input').val('');
                            updateVouchers(pos_cart[cartIndex]);
                            appliedVouchers(order.appliedVoucher);
                            // viewModel.rewardAmount(getRewardTotalAmount(pos_cart[cartIndex], viewModel.total()));
                            Object(_poscart_js__WEBPACK_IMPORTED_MODULE_1__["updateCartTotalAmount"])(order.cartAmount);
                            // viewModel.totalOrderAmount(order.cartAmount - viewModel.orderDiscount());
                            removeRewardCoupon(pos_cart, idCartRule, cartIndex);
                        }
                    },
                    error: function (jqXHR, exception) {
                        Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_3__["ajaxResposeError"])(jqXHR, exception);
                    }
                });
            }
        }

        function removeRewardCoupon(posCart, idCartRule, cartIndex) {
            $.each(posCart, function (index, cart) {
                if (typeof cart != 'undefined'
                    && typeof cart['others'] != 'undefined'
                    && typeof cart['others']['reward_coupon'] != 'undefined'
                    && index != cartIndex
                ) {
                    var rewardCoupon = cart['others']['reward_coupon'];
                    if (typeof rewardCoupon && Object.keys(rewardCoupon).length > 0) {
                        var voucherIndex = parseInt(rewardCoupon.indexOf(idCartRule));
                        rewardCoupon.splice(voucherIndex, 1);
                        posCart[index]['others']['reward_coupon'] = rewardCoupon;
                    }
                }
            });
            localStorage.pos_cart = JSON.stringify(posCart);
        }

        function removePromoCode(code) {
            var pos_cart = $.parseJSON(localStorage.pos_cart);
            var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
            var idCart = pos_cart[cartIndex]['others']['id_cart'];
            var idCartRules = [code.idCartRule];
            var idCustomer = viewModel.activeCustomerId();
            $.ajax({
                url: orderUrl,
                dataType: 'json',
                type: 'POST',
                data: {
                    'id_cart': idCart,
                    'id_cart_rule': idCartRules,
                    'idCustomer': idCustomer,
                    ajax: true,
                    action: 'removePromoCode'
                },
                success: function (order) {
                    if (order.hasError) {
                        $.each(order.errors, function (index, error) {
                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_2__["showErrorMsg"])(error);
                            // $.growl.error({ title: "", message: error });
                        });
                    } else {
                        updateVoucherCoupon(pos_cart[cartIndex], order.appliedVoucher);
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_2__["showSuccessMsg"])(order.success);
                        // $.growl.notice({ title: "", message: order.success });
                        updateVouchers(pos_cart[cartIndex]);
                        appliedVouchers(order.appliedVoucher);
                        // self.rewardAmount(getRewardTotalAmount(pos_cart[cartIndex], self.total()));
                        // self.totalOrderAmount(order.cartAmount);
                        Object(_poscart_js__WEBPACK_IMPORTED_MODULE_1__["updateCartTotalAmount"])(order.cartAmount);
                    }
                },
                error: function (jqXHR, exception) {
                    Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_3__["ajaxResposeError"])(jqXHR, exception);
                }
            });
        }

/***/ }),

/* 8 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerDetails", function () { return CustomerDetails; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchOnlineCustomer", function () { return searchOnlineCustomer; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchCustomer", function () { return searchCustomer; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadCustomersPanel", function () { return loadCustomersPanel; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCustomer", function () { return selectCustomer; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCustomer", function () { return updateCustomer; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedCustomerIndex", function () { return getSelectedCustomerIndex; });
        /* harmony import */ var _voucher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
        /* harmony import */ var _address_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
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

        /* Mapping of customer details */
        function CustomerDetails(customer, index) {
            var self = this;
            this.customerIndex = index;
            this.customerName = customer.name;
            this.customerEmail = customer.email;
            this.idCustomer = customer.id_customer;
            this.group = customer.default_group;
        }

        var searchAjax = undefined;
        function searchCustomerAjax(searchKey) {
            var data = {
                ajax: true,
                action: 'searchCustomer',
                search: searchKey,
                posToken: posToken,
            };
            if (typeof searchAjax != 'undefined') {
                searchAjax.abort();
            }
            $(document).find('.wk-loading-pos-details').removeClass('hide');
            $(document).find('.wk-loading-status').addClass('hide');
            searchAjax = $.ajax({
                url: posSales,
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (response) {
                    if (response.hasError) {
                        $.each(response.errors, function (index, error) {
                            $.growl.error({ title: "", message: error });
                        })
                    } else {
                        var mappedCustomers = [], i = 0;
                        customers = { ...response['customers'], ...customers };
                        $.each(response.customers, function (index, customer) {
                            // if (index == 0) {
                            //     self.activeCustomerId(customer.id_customer);
                            // }
                            mappedCustomers[i++] = (new CustomerDetails(customer, index));
                        });
                        loadCustomersPanel(mappedCustomers);
                        $(document).find('.wk-loading-pos-details').addClass('hide');
                        $(document).find('.wk-loading-status').removeClass('hide');
                    }
                },
                error: function (jqXHR, exception) {
                    // ajaxResposeError(jqXHR, exception);
                }
            });
        }

        /* Search customer on the basis of name */
        function searchOnlineCustomer() {
            let searchedKey = (viewModel.customerSearchKey()).replace(/\\/g, "\\\\");
            if (viewModel.navigatorOnline()) {
                let keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 13) {
                    searchCustomerAjax(searchedKey);
                }
            } else {
                var i = 0, mappedCustomers = [];
                $.each(customers, function (index, customer) {
                    if (index == 0) {
                        viewModel.activeCustomerId(customer.id_customer);
                    }
                    if (customer["name"].toLowerCase().search(((viewModel.customerSearchKey()).replace(/\\/g, "\\\\")).toLowerCase()) != '-1'
                        || customer["email"].search((viewModel.customerSearchKey()).replace(/\\/g, "\\\\")) != '-1'
                    ) {
                        mappedCustomers[i++] = (new CustomerDetails(customer, index));
                    }
                });
                loadCustomersPanel(mappedCustomers);
            }
        }

        /* Search customer on the basis of name */
        function searchCustomer() {
            var i = 0, mappedCustomers = [];
            var allreadyInserted = 0;
            var searchCustomerKey = viewModel.customerSearchKey().toLowerCase();
            $.each(customers, function (index, customer) {
                allreadyInserted = 0;
                if (index == 0) {
                    viewModel.activeCustomerId(customer.id_customer);
                }
                if (searchCustomerKey != '') {
                    if (viewModel.selectedSearchTypeId() == 2) {
                        if (customer["email"].toLowerCase().search((searchCustomerKey).replace(/\\/g, "\\\\")) != '-1'
                        ) {
                            mappedCustomers[i++] = (new CustomerDetails(customer, index));
                        }
                    } else if (viewModel.selectedSearchTypeId() == 3) {
                        if (customer["customer_phone"] == searchCustomerKey) {
                            mappedCustomers[i++] = (new CustomerDetails(customer, index));
                            allreadyInserted = 1;
                        }
                        if (allreadyInserted == 0) {
                            if (customer["addresses"].length > 0) {
                                $.each(customer["addresses"], function (addressIndex, address) {
                                    if (allreadyInserted == 0
                                        && (address['phone'] == searchCustomerKey
                                            || address['phone_mobile'] == searchCustomerKey)
                                    ) {
                                        mappedCustomers[i++] = (new CustomerDetails(customer, index));
                                        allreadyInserted = 1;
                                    }
                                });
                            }
                        }
                    } else {
                        var name = stripVowelAccent(customer["name"]);
                        if (name.toLowerCase().search(((searchCustomerKey).replace(/\\/g, "\\\\")).toLowerCase()) != '-1'
                        ) {
                            mappedCustomers[i++] = (new CustomerDetails(customer, index));
                        }
                    }
                } else {
                    mappedCustomers[i++] = (new CustomerDetails(customer, index));
                }
            });
            loadCustomersPanel(mappedCustomers);
        }

        function stripVowelAccent(str) {
            var rExps = [
                { re: /[\xC0-\xC6]/g, ch: 'A' },
                { re: /[\xE0-\xE6]/g, ch: 'a' },
                { re: /[\xC8-\xCB]/g, ch: 'E' },
                { re: /[\xE8-\xEB]/g, ch: 'e' },
                { re: /[\xCC-\xCF]/g, ch: 'I' },
                { re: /[\xEC-\xEF]/g, ch: 'i' },
                { re: /[\xD2-\xD6]/g, ch: 'O' },
                { re: /[\xF2-\xF6]/g, ch: 'o' },
                { re: /[\xD9-\xDC]/g, ch: 'U' },
                { re: /[\xF9-\xFC]/g, ch: 'u' },
                { re: /[\xD1]/g, ch: 'N' },
                { re: /[\xF1]/g, ch: 'n' }];

            for (var i = 0, len = rExps.length; i < len; i++)
                str = str.replace(rExps[i].re, rExps[i].ch);

            return str;
        }

        var remainingCustomers = [];
        function loadCustomersPanel(customers, onScroll = false) {
            var pagination = 30;
            var i = 0;
            remainingCustomers = customers.slice(pagination, customers.length + 1);
            viewModel.loadedCustomers(remainingCustomers);
            if (onScroll) {
                var remaininglength = customers.length;
                if (customers.length > pagination) {
                    remaininglength = pagination;
                }
                for (i = 0; i < remaininglength; i++) {
                    viewModel.customers.push(customers[i]);
                }
            } else {
                viewModel.customers(customers.slice(0, pagination));
            }
        }

        function selectCustomer(customer, index) {
            var prevCustomerId = viewModel.activeCustomerId();
            if (customer.idCustomer !== undefined) {
                viewModel.customerAddressesDetails([]);
                viewModel.customerAddresses([]);
                viewModel.customerName(customer.customerName);
                viewModel.customerEmail(customer.customerEmail);
                viewModel.idCustomer(customer.idCustomer);
                viewModel.activeCustomerId(customer.idCustomer);
                viewModel.selectedCustomerIdGroup(customers[viewModel.idCustomer()].default_group);
                viewModel.customerAddresses([]);
                var customerIndex;
                if (index && parseInt(index)) {
                    customerIndex = index;
                } else {
                    customerIndex = customer.customerIndex;
                }
                if (customers[customerIndex]['addresses'] != undefined
                    && customers[customerIndex]['addresses'].length
                ) {
                    viewModel.selectedIdAddress(customers[customerIndex]['addresses'][0]['id_address']);
                    viewModel.selectedIdAddressIndex(0);
                } else {
                    viewModel.selectedIdAddress(0);
                    viewModel.selectedIdAddressIndex(0);
                    viewModel.selectedIdCountry(0);
                }

                viewModel.customerAddresses.push(new _address_js__WEBPACK_IMPORTED_MODULE_1__["customerAddressDetail"](outletAddress));
                if (typeof customers != 'undefined'
                    && typeof customers[customerIndex] != 'undefined'
                    && typeof customers[customerIndex]['addresses'] != 'undefined'
                ) {
                    $.each(customers[customerIndex]['addresses'], function (index, address) {
                        viewModel.customerAddresses.push(new _address_js__WEBPACK_IMPORTED_MODULE_1__["customerAddressDetail"](address));
                    });
                }
                viewModel.posShipping([]);
                viewModel.selectDeliveryAddress();
                viewModel.changeCustomer(customer.idCustomer);
            } else {
                viewModel.activeCustomerId(customer.id_customer);
                viewModel.customerName(customer.name);
                viewModel.customerEmail(customer.email);
                viewModel.selectedCustomerIndex(index);
                if (customer.id_customer != viewModel.idCustomer() || viewModel.selectedIdAddress() == undefined) {
                    viewModel.customerAddressesDetails([]);
                    viewModel.customerAddresses([]);
                    if (customer.addresses != undefined && customer.addresses.length) {
                        viewModel.selectedIdAddress(customer.addresses[0]['id_address']);
                        viewModel.selectedIdAddressIndex(0);
                    } else {
                        viewModel.selectedIdAddress(0);
                        viewModel.selectedIdAddressIndex(0);
                        viewModel.selectedIdCountry(0);
                    }
                    viewModel.customerAddresses.push(new _address_js__WEBPACK_IMPORTED_MODULE_1__["customerAddressDetail"](outletAddress));
                    if (customer.addresses != undefined) {
                        $.each(customer.addresses, function (index, address) {
                            viewModel.customerAddresses.push(new _address_js__WEBPACK_IMPORTED_MODULE_1__["customerAddressDetail"](address));
                        });
                    }
                }
                viewModel.idCustomer(customer.id_customer);
                viewModel.posShipping([]);
                viewModel.selectDeliveryAddress();
                viewModel.changeCustomer(customer.id_customer);
            }
            if (this instanceof CustomerDetails) {
                viewModel.selectedCustomerIndex(viewModel.customers().indexOf(this));
            }
            Object(_voucher_js__WEBPACK_IMPORTED_MODULE_0__["removeAllVouchers"])(prevCustomerId);
        }

        function updateCustomer(customers) {
            var cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
            var notSelected = 1;
            var mappedTasks = $.map(customers, function (customer, index) {
                var pos_cart = $.parseJSON(localStorage.pos_cart);
                if ((pos_cart[cartIndex]['others'] != undefined
                    && pos_cart[cartIndex]['others']['customer'] != undefined
                    && pos_cart[cartIndex]['others']['customer']['idCustomer'] == customer.id_customer)
                    || notSelected
                    && ((typeof pos_cart[cartIndex]['others'] == 'undefined' || typeof pos_cart[cartIndex]['others']['customer'] == 'undefined') && guestAccountEnabled == true && idGuest == customer.id_customer)
                    // || (pos_cart[cartIndex]['others'] == undefined && index == 0 && !guestAccountEnabled)
                    || (pos_cart[cartIndex]['others'] != undefined && pos_cart[cartIndex]['others']['customer'] == undefined && index == 0 && !guestAccountEnabled)
                ) {
                    notSelected = 0;
                    viewModel.selectCustomer(customer, index);
                }
                return new CustomerDetails(customer, index);
            });
            // viewModel.customers(mappedTasks);
            loadCustomersPanel(mappedTasks);
        }

        function getSelectedCustomerIndex(idCustomer) {
            var selectedIndex = -1;
            $.each(customers, function (index, customer) {
                if (customer["id_customer"] == idCustomer) {
                    selectedIndex = index;
                    return;
                }
            });
            return selectedIndex;
        }
/***/ }),

/* 9 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customerAddressDetail", function () { return customerAddressDetail; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDeliveryAddress", function () { return selectDeliveryAddress; });
        /* harmony import */ var _tax_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
        /* harmony import */ var _wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
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
        **/

        /* Mapping of customer address in object  */
        function customerAddressDetail(address) {
            this.idAddress = address.id_address;
            this.aliasName = address.alias;
            this.address1 = address.address1;
            this.address2 = address.address2;
            this.companyName = address.companyName;
            this.city = address.city;
            this.postcode = address.postcode;
            this.country = address.country;
            if (address.state != null)
                this.state = address.state;
            else
                this.state = '';
            this.phone = address.phone;
            this.pos_phone = address.pos_phone;
            this.phone_mobile = address.phone_mobile;
            this.other = address.other;
        }

        function selectDeliveryAddress() {
            var customerAddress;
            var customerIndex, addressIndex;
            if (viewModel.selectedIdAddress() != undefined) {
                if (viewModel.selectedIdAddress() == outletAddress['id_address']) {
                    if (outletAddress['active'] == 0) {
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_1__["showErrorMsg"])(deliveryAddressError);
                        // $.growl.error({ title: "", message: deliveryAddressError });
                        deliveryError = 1;
                    } else {
                        deliveryError = 0;
                    }
                    addressIndex = 0;
                    customerAddress = outletAddress;
                    selectedCountry = outletAddress["id_country"];
                } else {
                    $.each(customers, function (index, customer) {
                        if (customer["id_customer"] == viewModel.idCustomer()) {
                            customerIndex = index;
                            $.each(customer.addresses, function (addressIndex1, address) {
                                if (address["id_address"] == viewModel.selectedIdAddress()) {
                                    if (address['active'] == 0) {
                                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_1__["showErrorMsg"])(deliveryAddressError);
                                        // $.growl.error({ title: "", message: deliveryAddressError });
                                        deliveryError = 1;
                                    } else {
                                        deliveryError = 0;
                                    }
                                    addressIndex = addressIndex1;
                                    customerAddress = address;
                                    selectedCountry = address["id_country"];
                                    return false;
                                }
                            });
                            return false;
                        }
                    });
                }
                if (customerAddress != undefined) {
                    viewModel.selectedIdCountry(selectedCountry);
                    viewModel.customerAddressesDetails.push(new customerAddressDetail(customerAddress));
                    viewModel.selectedIdAddressIndex(addressIndex);
                    viewModel.selectedCustomerIndex(customerIndex);
                }
                Object(_tax_js__WEBPACK_IMPORTED_MODULE_0__[/* getTaxRate */ "a"])();
            }
        }
/***/ }),

/* 10 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayImageDrag", function () { return displayImageDrag; });
        /* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
        /* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
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

        function displayImageDrag(productImage, thisthis) {
            if ((typeof thisthis != 'undefined') && thisthis) {
                var product_offset = jquery__WEBPACK_IMPORTED_MODULE_0___default()(thisthis).offset();
                var product_top = product_offset.top - jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop();
                var product_left = product_offset.left - jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollLeft();

                jquery__WEBPACK_IMPORTED_MODULE_0___default()('#home > ul').animate({
                    scrollTop: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#home > ul').prop("scrollHeight")
                }, 500);
                // jquery__WEBPACK_IMPORTED_MODULE_0___default.a.posting({
                //     image_path: productImage,
                //     product_left: product_left,
                //     product_top: product_top
                // });
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).find("#wkpos-cart-panel").animate({
                    scrollTop: jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).find('#wkpos-cart-panel > div').height()
                }, 1000);
            }
        }

        var pospb_defaults = {
            'pospb': {
                'id': 'pospb',
                'container': 'body',
                'template': '<div></div>',
                'class': 'posProductBlock',
                'css': {
                    'position': 'fixed',
                    'zIndex': 998
                }
            },

            'post': {
                'template': '<img src="%image_path%" width="50" height="50">',

                'remove': function ($post, callback) {
                    return $post.animate({
                        opacity: '0',
                        padding: '0px',
                        margin: '0px',
                        height: '0px'
                    }, {
                        duration: 500,
                        complete: callback
                    });
                }
            },

            'timeout': 500
        };

        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default.a.posting = function (options) {
                var $poster = jquery__WEBPACK_IMPORTED_MODULE_0___default()(pospb_defaults.pospb.template).css(pospb_defaults.pospb.css).addClass(pospb_defaults.pospb.class);
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(pospb_defaults.pospb.container).append($poster);
                var $post = jquery__WEBPACK_IMPORTED_MODULE_0___default()(pospb_defaults.post.template.replace('%image_path%', options.image_path));

                $poster.append($post);

                var cart_offset = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.wk-cart-product-details .wkpos-scrollbar li.active').offset();
                var cart_top = cart_offset.top - jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop();
                var cart_left = cart_offset.left - jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollLeft();

                $poster.css({
                    left: options.product_left,
                    top: options.product_top,
                    display: 'block'
                }).animate({ left: cart_left, top: cart_top }, 500);

                setTimeout(function () {
                    pospb_defaults.post.remove($post, function () {
                        $post.remove();
                    });
                }, pospb_defaults.timeout);
            }
        });
/***/ }),

/* 11 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printOrderBill", function () { return printOrderBill; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function () { return connect; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printCreditSlip", function () { return printCreditSlip; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printCreditSlipSecond", function () { return printCreditSlipSecond; });
        /* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
        /* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */ var _wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
        /* harmony import */ var _wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
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

        var orderBill = [];
        var languageEncoding = {
            'en': 'Cp850',
            'fr': 'Cp850',
            'es': 'Cp850',
            'it': 'Cp850',
            'pt': 'Cp850',
            'de': 'Cp850',
            'el': 'Cp1253',
            'vi': 'TCVN-3-1',
            'zh': 'GB2312',
            'ar': 'IBM864',
            'ru': 'Cp866',
        };

        function printOrderBill(printer) {
            var encoding = {};
            if (typeof languageEncoding[langIsoCode] != 'undefined') {
                encoding = { encoding: printerEncoding };
                if (printerEncoding == '') {
                    encoding = { encoding: languageEncoding[langIsoCode] };
                }
            }
            var posOrder;
            posOrder = posOrders;
            if (viewModel.selectedOrderType() == "offline"
                || (posViewModel.bodyPanel() == 'pay' && !posViewModel.navigatorOnline())
            ) {
                posOrder = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.parseJSON(localStorage.pos_orders);
            }


            createOrderBill(posOrder[viewModel.selectedOrderId()]['order'], posOrder[viewModel.selectedOrderId()]['product']);
            if (typeof encoding.encoding != 'undefined') {
                var config = qz.configs.create(printer, encoding);       // Create a default config for the found printer
            } else {
                var config = qz.configs.create(printer);       // Create a default config for the found printer
            }
            return qz.print(config, orderBill);
        }

        function getShopName(shopName, variableLength = 19) {
            var shopNameArray = [];
            if (shopName.length > variableLength) {
                var count = 0;
                var searchLength = 0;
                var i = 0;
                for (i = 0; (i < shopName.length); i = searchLength) {
                    var shopNameSlice = shopName.slice(i, i + variableLength);
                    count = shopNameSlice.lastIndexOf(' ', variableLength);
                    if (count != -1) {
                        shopNameSlice = shopNameSlice.slice(0, count);
                        shopNameArray.push(shopNameSlice);
                        searchLength += count + 1;
                    } else {
                        searchLength += shopNameSlice.length;
                        shopNameArray.push(shopNameSlice);
                    }
                }
                return shopNameArray;
            } else {
                return [shopName];
            }
        }

        function chunkString(str, length) {
            return str.match(new RegExp('.{1,' + length + '}', 'g'));
        }

        /* generate order bill array for order print */
        function createOrderBill(order, products) {
            if (isNaN(order['total_paid_tax_incl'])) {
                var totalTax = order['total_tax'];
                var orderTotal = order['total_paid_tax_incl'];
                var orderDiscount = order['total_discounts'];
                var orderSubTotal = order['total_products_wt'];
                var orderShipping = order['shipping_cost_tax_incl'];
            } else {
                var totalTax = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_2__["makeTotalProductCaculation"])(order['total_tax']);
                var orderTotal = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_2__["makeTotalProductCaculation"])(order['total_paid_tax_incl']);
                var orderDiscount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_2__["makeTotalProductCaculation"])(order['total_discounts']);
                var orderSubTotal = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_2__["makeTotalProductCaculation"])(order['total_products_wt']);
                var orderShipping = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_2__["makeTotalProductCaculation"])(order['shipping_cost_tax_incl']);
            }

            var orderDetails = [];
            if (order.id_wkpos_payment == 4 && typeof order.installment != 'undefined') {
                if (isNaN(order.installment.paidAmount)) {
                    var displayPaidAmount = order.installment.paidAmount;
                    var displayRemainingAmount = order.installment.remainingAmount;
                } else {
                    var displayPaidAmount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_2__["makeTotalProductCaculation"])((parseFloat(order.installment.paidAmount)));
                    var displayRemainingAmount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_2__["makeTotalProductCaculation"])((parseFloat(order.installment.remainingAmount)));
                    // var displayPaidAmount = wkFormatCurrency((parseFloat(order.installment.paidAmount)), currencyFormat, true);
                    // var displayRemainingAmount = wkFormatCurrency((parseFloat(order.installment.remainingAmount)), currencyFormat, true);
                }
            }
            // order['customer_name'];
            var shopNameArray = getShopName(shopName, 42);
            orderBill = [
                { type: 'raw', format: 'image', flavor: 'file', data: invoice_logo, options: { language: "ESCPOS", dotDensity: 'double' } },
                '\x1B' + '\x40',          // init
                '\x1B' + '\x45' + '\x0D', // bold on
                '\x1B' + '\x61' + '\x31', // center align
            ];
            jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(shopNameArray, function (index, shop) {
                orderBill.push(shop + '\x0A');
            });
            if (outletAddress1.length > 1) {
                orderBill.push(outletAddress1);
            }
            if (outletAddress2.length > 1) {
                orderBill.push(', ' + outletAddress2 + '\x0A');
            } else {
                orderBill.push('\x0A');
            }
            if (outletCity.length > 1) {
                orderBill.push(outletCity);
            }
            if (outletState.length > 1) {
                orderBill.push(', ' + outletState + '\x0A');
            } else {
                orderBill.push('\x0A');
            }
            if (outletCountry.length > 1) {
                orderBill.push(outletCountry + ' - ')
            }
            if (outletPostCode.length > 1) {
                orderBill.push(outletPostCode + '\x0A')
            }

            if (contactDetails != undefined && contactDetails != '') {
                orderDetails = [displayPhone + contactDetails + '\x0A'];
            }
            orderBill = orderBill.concat(orderDetails);

            var productNameHeading2 = productNameHeading;
            if (productNameHeading2.length < 20) {
                var length = productNameHeading2.length;
                for (var i = 0; i < (22 - length); i++) {
                    productNameHeading2 += ' ';
                }
            } else {
                productNameHeading2 = productNameHeading2.substr(0, 20) + '  ';
            }

            var qtyHeading2 = qtyHeading;
            if (qtyHeading2.length < 4) {
                var length = qtyHeading2.length;
                for (var i = 0; i < (6 - length); i++) {
                    qtyHeading2 += ' ';
                }
            } else {
                qtyHeading2 = qtyHeading2.substr(0, 4) + '  ';
            }
            var priceHeading2 = priceHeading;
            if (priceHeading2.length < 9) {
                var length = priceHeading2.length;
                for (var i = 0; i < (11 - length); i++) {
                    priceHeading2 += ' ';
                }
            } else {
                priceHeading2 = priceHeading2.substr(0, 9) + '  ';
            }
            var totalHeading2 = totalHeading;
            if (totalHeading2.length > 12) {
                totalHeading2 = totalHeading2.substr(0, 12);
            }
            orderDetails = [
                order['order_date'] + '\x0A',
                '\x1B' + '\x45' + '\x0A', // bold off
                // '\x0A',                   // line break
                displayUser + employeeName + '\x0A',
                // '\x0A',                   // line break
                displayOrder + '#' + order['reference'] + '\x0A',
                '\x0A',
                '\x1B' + '\x61' + '\x30', // left align
                productNameHeading2,
                qtyHeading2 + priceHeading2 + totalHeading2,
                '\x0A',
                '\x1B' + '\x61' + '\x30',
                '-----------------------------------------------',
            ];
            orderBill = orderBill.concat(orderDetails);
            var taxArray = {};
            if (products) {
                var serialNo;
                var productQuantity;
                var productPrice;
                var totalPricePerProduct;
                var totalProducts = products.length + '';
                var maximumIndex = totalProducts.length;
                if (maximumIndex < 4) {
                    maximumIndex = 4;
                }

                jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(products, function (index, product) {
                    orderBill.push('\x0A');
                    serialNo = parseInt(index) + 1;
                    productQuantity = product['product_quantity'];
                    if (typeof product['display_unit_price_tax_incl'] != 'undefined' && isNaN(product['display_unit_price_tax_incl'])) {
                        productPrice = product['display_unit_price_tax_incl'];
                        totalPricePerProduct = product['display_total_price_tax_incl'];
                    } else {
                        productPrice = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_2__["makeTotalProductCaculation"])(product['unit_price_tax_incl']);
                        totalPricePerProduct = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_2__["makeTotalProductCaculation"])(product['total_price_tax_incl']);
                    }
                    var productDetails = '';
                    var i = 0;
                    for (i = 0; i <= maximumIndex - (serialNo + '').length; i++) {
                        productDetails += '';
                    }
                    var productName = product['product_name'];
                    if (product['reduction_percent'] != undefined
                        && product['reduction_percent'] > 0
                        && displayProductDiscount == 1) {
                        productName += ' ' + beforeDiscountMessage + product['reduction_percent'] + afterDiscountMessage;
                        // productDetails += ' ' + beforeDiscountMessage + product['reduction_percent'] + afterDiscountMessage;
                    }
                    var productNameArray = chunkString(productName, 20);
                    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(productNameArray, function (index, name) {
                        productDetails += name;
                        // productDetails += '\x0A' + '\x1B' + '\x61' + '\x32';
                        if (index == 0) {
                            if (name.length <= 20) {
                                var length = name.length;
                                for (var i = 0; i < (22 - length); i++) {
                                    name += ' ';
                                }
                            }
                            productQuantity = productQuantity.toString();
                            var length = productQuantity.length;
                            if (productQuantity.length <= 4) {
                                for (var i = 0; i < (6 - length); i++) {
                                    productQuantity += ' ';
                                }
                            }
                            productPrice = productPrice.toString();
                            var length = productPrice.length;
                            if (productPrice.length <= 9) {
                                for (var i = 0; i < (11 - length); i++) {
                                    productPrice += ' ';
                                }
                            }
                            totalPricePerProduct = totalPricePerProduct.toString();
                            var length = totalPricePerProduct.length;
                            if (totalPricePerProduct.length <= 12) {
                                for (var i = 0; i < (12 - length); i++) {
                                    totalPricePerProduct += '';
                                }
                            }
                            name += productQuantity + productPrice + totalPricePerProduct + '\x0A';
                        } else {
                            name += '\x0A';
                        }
                        orderBill.push(name);
                    })


                    if (!taxArray.hasOwnProperty(product.tax_rate_value)) {
                        // If the tax rate value doesn't exist in taxArray, initialize it.
                        taxArray[product.tax_rate_value] = {
                            'tax_rate': product.tax_rate,
                            'tax_amount': 0
                        };
                    }

                    if (taxArray.hasOwnProperty(product.tax_rate_value)) {
                        // If the tax rate value exists in taxArray, update the tax_amount.
                        taxArray[product.tax_rate_value].tax_amount += product.tax_amount_value;
                    } else {
                        // This block is unnecessary as the previous condition handles both cases.
                        taxArray[product.tax_rate_value] = {
                            'tax_rate': product.tax_rate,
                            'tax_amount': product.tax_amount_value
                        };
                    }
                });
            }
            var chr = function (n) { return String.fromCharCode(n); };
            orderDetails = [
                '-----------------------------------------------' + '\x0A',
                '\x1B' + '\x45' + '\x0D', // bold on
                '\x1B' + '\x61' + '\x32',
                displaySubTotal,
                orderSubTotal,
                '\x0A'
            ];
            orderBill = orderBill.concat(orderDetails);

            if (order['shipping_cost_tax_incl'] > 0) {
                orderDetails = [
                    displayShippingMsg,
                    orderShipping,
                    '\x0A'
                ];
                orderBill = orderBill.concat(orderDetails);
            }

            jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(taxArray, function (index, taax) {
                if (taax.tax_amount > 0) {
                    orderDetails = [
                        taax.tax_rate + ' ',
                        displayTax + ' ',
                        taax.tax_amount + ' EUR',
                        '\x0A',
                    ];
                    orderBill = orderBill.concat(orderDetails);
                }
            });

            if (parseInt(displayOrderDiscountWk) == 1) {
                orderDetails = [
                    '\x1B' + '\x61' + '\x32',
                    displayDiscount,
                    orderDiscount,
                    '\x0A',
                ];
                orderBill = orderBill.concat(orderDetails);
            }
            orderDetails = [
                '\x1B' + '\x61' + '\x32',
                displayTotal,
                orderTotal,
                '\x0A',
                '\x1B' + '\x45' + '\x0A', // bold off
                '\x1B' + '\x61' + '\x30', // left align
                '-----------------------------------------------' + '\x0A',
                '\x1B' + '\x61' + '\x31', // center align
                displayCustomerName + order['customer_name'] + '\x0A',
            ];
            orderBill = orderBill.concat(orderDetails);

            if (shippingEnabled) {
                orderDetails = [
                    '\x1B' + '\x61' + '\x31', // center align
                    customerAddress + order['address1'] + ' ' + order['address2'] + ', ' + order['city'] + '\x0A',
                ];
                orderBill = orderBill.concat(orderDetails);
            }
            if (order.id_wkpos_payment == 4 && typeof order.installment != 'undefined') {
                orderDetails = [
                    '\x1B' + '\x45' + '\x0D', // bold on
                    '-----------------------------------------------' + '\x0A',
                    installmentPaidAmount + '          ' + '\x1B' + '\x61' + '\x32' + displayPaidAmount,
                    '\x0A',
                    installmentRemainingAmount + '          ' + '\x1B' + '\x61' + '\x32' + displayRemainingAmount,
                    '\x0A',
                    '\x1B' + '\x45' + '\x0A', // bold off
                    '\x1B' + '\x61' + '\x30', // left align
                    '-----------------------------------------------' + '\x0A',
                    '\x1B' + '\x61' + '\x31', // center align
                ];
                orderBill = orderBill.concat(orderDetails);
            }
            if (displayBarcode == 1) {
                orderDetails = [
                    '\x1D' + 'h' + chr(80) +   //barcode height
                    '\x1D' + 'f' + chr(0) +              //font for printed number
                    '\x1D' + 'k' + chr(69) + chr(order['reference'].length) + order['reference'] + chr(0),
                ];
                orderBill = orderBill.concat(orderDetails);
            }
            if (signOnOrderReciept == 1) {
                // console.log(order.digitalSign);
                if (order.digital_sign.length > 0) {
                    orderDetails = [
                        '\x1B' + '\x61' + '\x31', // center align
                        '\x1D' + order.digital_sign + chr(0),
                        '\x1B' + '\x61' + '\x31', // center align
                    ];
                    orderBill = orderBill.concat(orderDetails);
                }
            }
            orderBill.push('\x0A');
            var rowforpaymenthead = paymentTypeWk.padEnd(12, ' ')+paymentAmountWk.padEnd(12, ' ')+paymentTenderedWk.padEnd(12, ' ')+paymentChangeWk.padEnd(12, ' ');
            orderBill.push(rowforpaymenthead + '\x0A');

            jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(order.order_payment, function (index, orderPaymentWk) {
                var rowforpayment = (orderPaymentWk.name).padEnd(12, ' ') + (orderPaymentWk.totalOrderAmount).padEnd(12, ' ') + (orderPaymentWk.tendered).padEnd(12, ' ') + (orderPaymentWk.change).padEnd(12, ' ');
                orderBill.push(rowforpayment + '\x0A');
            });

            orderDetails = [
                '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
                '\x1B' + '\x69',          // cut paper
            ];
            if (openCashDrawer == 1) {
                // Generate Pulse to kick-out cash drawer**
                orderDetails.push('\x10' + '\x14' + '\x01' + '\x00' + '\x05');
                // **for legacy drawer cable CD-005A.  Research before using.
            }
            orderBill = orderBill.concat(orderDetails);

            /*  In case sign not print comment below to print it as text */
            /*
                var orderReplacedEuro = orderBill;
                orderBill = [];
                var items = [];
                orderReplacedEuro.forEach((orderBil, key) => {
                    if (key != 0) {
                        var itemsx = orderBil.replaceAll(" €", "EUR");
                        itemsx = itemsx.replaceAll(" €\n", "EUR\n");
                        itemsx = itemsx.replaceAll("€", "EUR");
                        itemsx = itemsx.replaceAll("€\n", "EUR\n");
                        items[key] = itemsx.replaceAll("false\n", "");
                    } else {
                        items[key] = orderBil;
                    }
                });
                orderBill = items;
            */
        }

        /* Connect the printer at run time */
        // Without certs
        /*  function connect(times = 1) {
            return new RSVP.Promise(function (resolve, connectionReject) {
                if (qz.websocket.isActive()) {	// if already active, resolve immediately
                    resolve();
                } else {
                    // reject(qzTrayLoadError);
                    // $.growl.error({ title: "", message: printerNotConnected });
                    // try to connect once before firing the mimetype launcher
                    qz.websocket.connect().then(resolve, function reject() {
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_1__["showWarningMsg"])(qzTrayLoadError);
                        // if a connect was not succesful, launch the mimetime, try 3 more times
                        // qz.websocket.connect({ retries: 2, delay: 1 }).then(resolve, reject);
                    });
                }
            });
        } */

        // With certs
        function connect(times = 1) {
            return new RSVP.Promise(function (resolve, connectionReject) {
                if (qz.websocket.isActive()) {	// if already active, resolve immediately
                    resolve();
                } else {
                    qz.security.setCertificatePromise(function (resolve, reject) {
                        fetch(wkDigitalCertUrl, { cache: 'no-store', headers: { 'Content-Type': 'text/plain' } }).then(function (data) { data.ok ? resolve(data.text()) : reject(data.text()); });
                    });
                    qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1
                    qz.security.setSignaturePromise(function (toSign) {
                        return function (resolve, reject) {
                            fetch(wkSignRequestUrl + "&request=" + toSign, { cache: 'no-store', headers: { 'Content-Type': 'text/plain' } })
                                .then(function (data) {
                                    if (data.ok) {
                                        resolve(data.text());
                                    } else {
                                        reject(data.text());
                                    }
                                });
                        };
                    });
                    qz.websocket.connect().then(resolve, function reject() {
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_1__["showWarningMsg"])(qzTrayLoadError);
                    });
                }
            });
        }

        function createOrderSlip(order, orderSlip) {
            var orderDetails = [];
            // order['customer_name'];
            var shopNameArray = getShopName(shopName, 42);
            var creditSlip = [
                { type: 'raw', format: 'image', flavor: 'file', data: invoice_logo, options: { language: "ESCPOS", dotDensity: 'double' } },
                '\x1B' + '\x40',          // init
                '\x1B' + '\x45' + '\x0D', // bold on
                '\x1B' + '\x61' + '\x31', // center align

            ];
            jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(shopNameArray, function (index, shop) {
                creditSlip.push(shop + '\x0A');
            });
            creditSlip.push(outletCity + '\x0A');
            if (contactDetails != undefined || contactDetails != '') {
                orderDetails = [displayPhone + contactDetails + '\x0A'];
            }
            creditSlip = creditSlip.concat(orderDetails);
            if (orderSlip.code != '--') {
                orderDetails = [
                    creditSlipHeading + '\x0A',
                    orderSlip.date_add + '\x0A',
                    '\x1B' + '\x45' + '\x0A', // bold off
                    '\x0A',                   // line break
                    displayUser + viewModel.cashierName() + '\x0A',
                    displayOrder + '#' + order['reference'] + '\x0A',
                    '\x0A',
                    '\x1B' + '\x61' + '\x30', // left align
                    orderSlipAmount + '    ' + (orderSlip.amount).toFixed(2),
                    '\x0A',
                    orderSlipVoucher + '    ' + orderSlip.code,
                    '\x1B' + '\x61' + '\x32',
                    '\x0A',
                ];
                creditSlip = creditSlip.concat(orderDetails);
            } else {
                orderDetails = [
                    creditSlipHeading + '\x0A',
                    orderSlip.date_add + '\x0A',
                    '\x1B' + '\x45' + '\x0A', // bold off
                    '\x0A',                   // line break
                    displayUser + viewModel.cashierName() + '\x0A',
                    displayOrder + '#' + order['reference'] + '\x0A',
                    orderSlipAmount + '    ' + (orderSlip.amount).toFixed(2),
                    '\x0A',
                ];
                creditSlip = creditSlip.concat(orderDetails);
            }

            var chr = function (n) { return String.fromCharCode(n); };
            orderDetails = [
                '\x1B' + '\x61' + '\x30', // left align
                '-----------------------------------------------' + '\x0A',
                '\x1B' + '\x61' + '\x31', // center align
                displayCustomerName + order['customer_name'] + '\x0A',
            ];
            creditSlip = creditSlip.concat(orderDetails);

            if (displayBarcode == 1) {
                orderDetails = [
                    '\x1D' + 'h' + chr(80) +   //barcode height
                    '\x1D' + 'f' + chr(0) +              //font for printed number
                    '\x1D' + 'k' + chr(69) + chr(orderSlip.code.length) + orderSlip.code + chr(0),
                ];
                creditSlip = creditSlip.concat(orderDetails);
            }
            orderDetails = [
                '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
                '\x1B' + '\x69',          // cut paper
            ];
            if (openCashDrawer == 1) {
                // Generate Pulse to kick-out cash drawer**
                orderDetails.push('\x10' + '\x14' + '\x01' + '\x00' + '\x05');
                // **for legacy drawer cable CD-005A.  Research before using.
            }
            creditSlip = creditSlip.concat(orderDetails);
            return creditSlip;
        }

        function printCreditSlip(printer) {
            var config = qz.configs.create(printer);       // Create a default config for the found printer
            var posOrder;
            if (viewModel.selectedOrderType() == "offline") {
                posOrder = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.parseJSON(localStorage.pos_orders);
            } else if (viewModel.selectedOrderType() == "history") {
                posOrder = posOrders;
            }
            var creditSlip = createOrderSlip(posOrder[viewModel.selectedOrderId()]['order'], orderSlip);
            return qz.print(config, creditSlip);
        }

        function printCreditSlipSecond(printer) {
            var config = qz.configs.create(printer);       // Create a default config for the found printer
            var posOrder;
            if (viewModel.selectedOrderType() == "offline") {
                posOrder = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.parseJSON(localStorage.pos_orders);
            } else if (viewModel.selectedOrderType() == "history") {
                posOrder = posOrders;
            }
            if (viewModel.creditSlipSecond().status == true) {
                var newCreditSlip = viewModel.creditSlipSecond();
                var creditSlip = createOrderSlip(posOrder[viewModel.selectedOrderId()]['order'], newCreditSlip);
            }

            return qz.print(config, creditSlip);
        }
/***/ }),

/* 12 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function () { return getTaxRate; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function () { return updateTaxRate; });
        /* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
        /* harmony import */ var _wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
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

        /* Get the tax rate of all the product according to selected address and update the tax rate in the cart */
        var getTaxRateData = undefined;
        function getTaxRate() {
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
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_1__["showErrorMsg"])(error);
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

        function updateTaxRate(taxRate, updateCart = false) {
            var posProducts = _product_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPosProductDetails();
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
/***/ }),

/* 13 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadSession", function () { return loadSession; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSessionStatus", function () { return updateSessionStatus; });
        /* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
        /* harmony import */ var _poscart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
        /* harmony import */ var _wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
        /* harmony import */ var _wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
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

        async function loadSession() {
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
                Object(_product_js__WEBPACK_IMPORTED_MODULE_0__["listenForScrollEvent"])();
                var posProductOnLoad = _product_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPosProductDetails();
                // var posProductOnLoad = pos_products;
                posProductOnLoad.then(
                    function (response) {
                        var mappedTasks = $.map(response, function (item) {
                            return new _product_js__WEBPACK_IMPORTED_MODULE_0__["Products"](item, self.selectedIdCountry())
                        });
                        Object(_product_js__WEBPACK_IMPORTED_MODULE_0__["loadProductPanel"])(mappedTasks);
                    },
                    function (response) {
                    }
                );
                //Update Product on page load.
                // self.products(mappedTasks);
                if (localStorage.pos_cart) {
                    Object(_poscart_js__WEBPACK_IMPORTED_MODULE_1__["deleteCartCustomer"])();
                    //Update Cart on Page Load.
                    var allData = $.parseJSON(localStorage.pos_cart);
                    var mappedTasks = $.map(allData, function (item, index) {
                        if (!isNaN(index)) {
                            return new _poscart_js__WEBPACK_IMPORTED_MODULE_1__["PosCartId"](index)
                        }
                    });
                    self.posCarts(mappedTasks);
                    var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                    activeCart = cartIndex;

                    // In case of combination change reset cart and make it empty
                    // combination change of simple product need to
                    /* $.each(allData[cartIndex], function (index, item) {
                        if (Number.isInteger(parseInt(index))) {
                            if ((item.combinationIndex == undefined && posOnlineProducts[item.id].has_combination == true) ||
                            (item.combinationIndex != undefined && posOnlineProducts[item.id].has_combination == false)) {
                                updatePosCartWithCurrencyUpdate();
                            }
                        }
                    }); */

                    allData = $.parseJSON(localStorage.pos_cart);
                    // Update cart product on page load.
                    allData = Object(_poscart_js__WEBPACK_IMPORTED_MODULE_1__["pushCartProducts"])(allData, cartIndex);
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
                        self.selectedCustomerIdGroup(customers[self.selectedCustomerId()].default_group);
                        self.customerEmail(allData[cartIndex]['others']['customer']['customerEmail']);
                        self.customerName(allData[cartIndex]['others']['customer']['customerName']);
                        self.idCustomer(allData[cartIndex]['others']['customer']['idCustomer']);
                        self.selectedIdCountry(allData[cartIndex]['others']['id_country']);
                        self.selectedIdAddress(allData[cartIndex]['others']['customer']['id_address_delivery']);
                    } else {
                        if (guestAccountEnabled == true) {
                            self.selectedCustomerId(idGuest);
                            self.selectedCustomerName(guestName);
                            self.selectedCustomerIdGroup(customers[self.selectedCustomerId()].default_group);
                        } else {
                            self.selectedCustomerName(customerName);
                            self.selectedCustomerId(0);
                            self.selectedCustomerIdGroup(0);
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

            /* addEvent(document, "keypress", function (e) {
                e = e || window.event;
                console.log(e.keyCode)
                console.log(e.key)
                if (parseInt(e.keyCode) >= 48 && parseInt(e.keyCode) <= 57) {
                    var buttonValue = e.key;
                    $('#wk-pos-keypad').find(`[value='${buttonValue}']`).trigger('click')
                }
                if (e.key == 'Delete') {
                    var buttonValue = 'del';
                    $('#wk-pos-keypad').find(`[value='${buttonValue}']`).trigger('click')
                }
            }); */

            document.addEventListener("keydown", function (e) {
                /* console.log(e);
                console.log(e.keyCode)
                console.log(e.key) */
                var elex = $('input');
                var hasFocus = elex.is(':focus');
                if(hasFocus == false){
                    if (parseInt(e.keyCode) >= 96 && parseInt(e.keyCode) <= 105) {
                        var buttonValue = e.key;
                        $('#wk-pos-keypad').find(`[value='${buttonValue}']`).trigger('click')
                    }
                    if (parseInt(e.keyCode) >= 48 && parseInt(e.keyCode) <= 57) {
                        var buttonValue = e.key;
                        $('#wk-pos-keypad').find(`[value='${buttonValue}']`).trigger('click')
                    }
                    if (parseInt(e.keyCode) == 46) {
                        var buttonValue = 'del';
                        $('#wk-pos-keypad').find(`[value='${buttonValue}']`).trigger('click')
                    }
                    if (parseInt(e.keyCode) == 81 && e.altKey == true) {
                        var buttonValue = 'qty';
                        $('#wk-pos-keypad').find(`[value='${buttonValue}']`).trigger('click')
                    }
                    if (parseInt(e.keyCode) == 80 && e.altKey == true) {
                        var buttonValue = 'price';
                        $('#wk-pos-keypad').find(`[value='${buttonValue}']`).trigger('click')
                    }
                    if (parseInt(e.keyCode) == 79 && e.altKey == true) {
                        var buttonValue = 'off';
                        $('#wk-pos-keypad').find(`[value='${buttonValue}']`).trigger('click')
                    }
                    if (parseInt(e.keyCode) == 110) {
                        var buttonValue = '.';
                        $('#wk-pos-keypad').find(`[value='${buttonValue}']`).trigger('click')
                    }
                }
            });
        }

        /* function addEvent(element, eventName, callback) {
            if (element.addEventListener) {
                element.addEventListener(eventName, callback, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + eventName, callback);
            } else {
                element["on" + eventName] = callback;
            }
        } */

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

        function updateSessionStatus(sessionData = {}) {
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
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_2__["showErrorMsg"])(error);
                            });
                            resolve(false);
                        } else {
                            resolve(response);
                            // getAllCategories();
                        }
                    },
                    error: function (jqXHR, exception) {
                        Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_3__["ajaxResposeError"])(jqXHR, exception);
                        resolve(false);
                    }
                });
            });
        }
/***/ }),

/* 14 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIndexDBConnection", function () { return createIndexDBConnection; });
        /* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
        /* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
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

        function createIndexDBConnection(dbName, dbVersion = 1) {
            // In the following line, you should include the prefixes of implementations you want to test.
            // window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            // DON'T use "var indexedDB = ..." if you're not in a function.
            // Moreover, you may need references to some window.IDB* objects:
            // window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
            // window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
            // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
            if (!window.indexedDB) {
                window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
            }

            dbRequest = window.indexedDB.open(dbName, dbVersion);

            dbRequest.onsuccess = function (event) {
            };

            dbRequest.onupgradeneeded = function (event) {
                var db = event.target.result;
                db.createObjectStore('pos_products', { keyPath: "id" });
            }

            dbRequest.onerror = function (event) {
                // Do something with dbRequest.errorCode!
            };

            // db = dbRequest.result;
            // db.createObjectStore('pos_products', { keyPath: "id" });
            // db.createObjectStore('pos_cart', { keyPath: "cartIndex" });

            // dbRequest.onupgradeneeded = function(event) {
            //     objectStore.transaction.oncomplete = function(event) {
            //         // Store values in the newly created objectStore.
            //         var productObjectStore = db.transaction("pos_products", "readwrite").objectStore("pos_products");
            //         $.each(products, function(index, product) {
            //             productObjectStore.add(product);
            //         });
            //     };
            // };
            // return dbRequest;
        }
        // }
/***/ }),

/* 15 */
/***/ (function (module, exports, __webpack_require__) {
        "use strict";
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        var R = typeof Reflect === 'object' ? Reflect : null
        var ReflectApply = R && typeof R.apply === 'function'
            ? R.apply
            : function ReflectApply(target, receiver, args) {
                return Function.prototype.apply.call(target, receiver, args);
            }

        var ReflectOwnKeys
        if (R && typeof R.ownKeys === 'function') {
            ReflectOwnKeys = R.ownKeys
        } else if (Object.getOwnPropertySymbols) {
            ReflectOwnKeys = function ReflectOwnKeys(target) {
                return Object.getOwnPropertyNames(target)
                    .concat(Object.getOwnPropertySymbols(target));
            };
        } else {
            ReflectOwnKeys = function ReflectOwnKeys(target) {
                return Object.getOwnPropertyNames(target);
            };
        }

        function ProcessEmitWarning(warning) {
            if (console && console.warn) console.warn(warning);
        }

        var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
            return value !== value;
        }

        function EventEmitter() {
            EventEmitter.init.call(this);
        }
        module.exports = EventEmitter;

        // Backwards-compat with node 0.10.x
        EventEmitter.EventEmitter = EventEmitter;

        EventEmitter.prototype._events = undefined;
        EventEmitter.prototype._eventsCount = 0;
        EventEmitter.prototype._maxListeners = undefined;

        // By default EventEmitters will print a warning if more than 10 listeners are
        // added to it. This is a useful default which helps finding memory leaks.
        var defaultMaxListeners = 10;

        Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
            enumerable: true,
            get: function () {
                return defaultMaxListeners;
            },
            set: function (arg) {
                if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
                    throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
                }
                defaultMaxListeners = arg;
            }
        });

        EventEmitter.init = function () {

            if (this._events === undefined ||
                this._events === Object.getPrototypeOf(this)._events) {
                this._events = Object.create(null);
                this._eventsCount = 0;
            }

            this._maxListeners = this._maxListeners || undefined;
        };

        // Obviously not all Emitters should be limited to 10. This function allows
        // that to be increased. Set to zero for unlimited.
        EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
            if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
                throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
            }
            this._maxListeners = n;
            return this;
        };

        function $getMaxListeners(that) {
            if (that._maxListeners === undefined)
                return EventEmitter.defaultMaxListeners;
            return that._maxListeners;
        }

        EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
            return $getMaxListeners(this);
        };

        EventEmitter.prototype.emit = function emit(type) {
            var args = [];
            for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
            var doError = (type === 'error');

            var events = this._events;
            if (events !== undefined)
                doError = (doError && events.error === undefined);
            else if (!doError)
                return false;

            // If there is no 'error' event listener then throw.
            if (doError) {
                var er;
                if (args.length > 0)
                    er = args[0];
                if (er instanceof Error) {
                    // Note: The comments on the `throw` lines are intentional, they show
                    // up in Node's output if this results in an unhandled exception.
                    throw er; // Unhandled 'error' event
                }
                // At least give some kind of context to the user
                var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
                err.context = er;
                throw err; // Unhandled 'error' event
            }

            var handler = events[type];

            if (handler === undefined)
                return false;

            if (typeof handler === 'function') {
                ReflectApply(handler, this, args);
            } else {
                var len = handler.length;
                var listeners = arrayClone(handler, len);
                for (var i = 0; i < len; ++i)
                    ReflectApply(listeners[i], this, args);
            }

            return true;
        };

        function _addListener(target, type, listener, prepend) {
            var m;
            var events;
            var existing;

            if (typeof listener !== 'function') {
                throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
            }

            events = target._events;
            if (events === undefined) {
                events = target._events = Object.create(null);
                target._eventsCount = 0;
            } else {
                // To avoid recursion in the case that type === "newListener"! Before
                // adding it to the listeners, first emit "newListener".
                if (events.newListener !== undefined) {
                    target.emit('newListener', type,
                        listener.listener ? listener.listener : listener);

                    // Re-assign `events` because a newListener handler could have caused the
                    // this._events to be assigned to a new object
                    events = target._events;
                }
                existing = events[type];
            }

            if (existing === undefined) {
                // Optimize the case of one listener. Don't need the extra array object.
                existing = events[type] = listener;
                ++target._eventsCount;
            } else {
                if (typeof existing === 'function') {
                    // Adding the second element, need to change to array.
                    existing = events[type] =
                        prepend ? [listener, existing] : [existing, listener];
                    // If we've already got an array, just append.
                } else if (prepend) {
                    existing.unshift(listener);
                } else {
                    existing.push(listener);
                }

                // Check for listener leak
                m = $getMaxListeners(target);
                if (m > 0 && existing.length > m && !existing.warned) {
                    existing.warned = true;
                    // No error code for this since it is a Warning
                    // eslint-disable-next-line no-restricted-syntax
                    var w = new Error('Possible EventEmitter memory leak detected. ' +
                        existing.length + ' ' + String(type) + ' listeners ' +
                        'added. Use emitter.setMaxListeners() to ' +
                        'increase limit');
                    w.name = 'MaxListenersExceededWarning';
                    w.emitter = target;
                    w.type = type;
                    w.count = existing.length;
                    ProcessEmitWarning(w);
                }
            }

            return target;
        }

        EventEmitter.prototype.addListener = function addListener(type, listener) {
            return _addListener(this, type, listener, false);
        };

        EventEmitter.prototype.on = EventEmitter.prototype.addListener;

        EventEmitter.prototype.prependListener =
            function prependListener(type, listener) {
                return _addListener(this, type, listener, true);
            };

        function onceWrapper() {
            var args = [];
            for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
            if (!this.fired) {
                this.target.removeListener(this.type, this.wrapFn);
                this.fired = true;
                ReflectApply(this.listener, this.target, args);
            }
        }

        function _onceWrap(target, type, listener) {
            var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
            var wrapped = onceWrapper.bind(state);
            wrapped.listener = listener;
            state.wrapFn = wrapped;
            return wrapped;
        }

        EventEmitter.prototype.once = function once(type, listener) {
            if (typeof listener !== 'function') {
                throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
            }
            this.on(type, _onceWrap(this, type, listener));
            return this;
        };

        EventEmitter.prototype.prependOnceListener =
            function prependOnceListener(type, listener) {
                if (typeof listener !== 'function') {
                    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
                }
                this.prependListener(type, _onceWrap(this, type, listener));
                return this;
            };

        // Emits a 'removeListener' event if and only if the listener was removed.
        EventEmitter.prototype.removeListener =
            function removeListener(type, listener) {
                var list, events, position, i, originalListener;

                if (typeof listener !== 'function') {
                    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
                }

                events = this._events;
                if (events === undefined)
                    return this;

                list = events[type];
                if (list === undefined)
                    return this;

                if (list === listener || list.listener === listener) {
                    if (--this._eventsCount === 0)
                        this._events = Object.create(null);
                    else {
                        delete events[type];
                        if (events.removeListener)
                            this.emit('removeListener', type, list.listener || listener);
                    }
                } else if (typeof list !== 'function') {
                    position = -1;

                    for (i = list.length - 1; i >= 0; i--) {
                        if (list[i] === listener || list[i].listener === listener) {
                            originalListener = list[i].listener;
                            position = i;
                            break;
                        }
                    }

                    if (position < 0)
                        return this;

                    if (position === 0)
                        list.shift();
                    else {
                        spliceOne(list, position);
                    }

                    if (list.length === 1)
                        events[type] = list[0];

                    if (events.removeListener !== undefined)
                        this.emit('removeListener', type, originalListener || listener);
                }

                return this;
            };

        EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

        EventEmitter.prototype.removeAllListeners =
            function removeAllListeners(type) {
                var listeners, events, i;

                events = this._events;
                if (events === undefined)
                    return this;

                // not listening for removeListener, no need to emit
                if (events.removeListener === undefined) {
                    if (arguments.length === 0) {
                        this._events = Object.create(null);
                        this._eventsCount = 0;
                    } else if (events[type] !== undefined) {
                        if (--this._eventsCount === 0)
                            this._events = Object.create(null);
                        else
                            delete events[type];
                    }
                    return this;
                }

                // emit removeListener for all listeners on all events
                if (arguments.length === 0) {
                    var keys = Object.keys(events);
                    var key;
                    for (i = 0; i < keys.length; ++i) {
                        key = keys[i];
                        if (key === 'removeListener') continue;
                        this.removeAllListeners(key);
                    }
                    this.removeAllListeners('removeListener');
                    this._events = Object.create(null);
                    this._eventsCount = 0;
                    return this;
                }

                listeners = events[type];

                if (typeof listeners === 'function') {
                    this.removeListener(type, listeners);
                } else if (listeners !== undefined) {
                    // LIFO order
                    for (i = listeners.length - 1; i >= 0; i--) {
                        this.removeListener(type, listeners[i]);
                    }
                }

                return this;
            };

        function _listeners(target, type, unwrap) {
            var events = target._events;

            if (events === undefined)
                return [];

            var evlistener = events[type];
            if (evlistener === undefined)
                return [];

            if (typeof evlistener === 'function')
                return unwrap ? [evlistener.listener || evlistener] : [evlistener];

            return unwrap ?
                unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
        }

        EventEmitter.prototype.listeners = function listeners(type) {
            return _listeners(this, type, true);
        };

        EventEmitter.prototype.rawListeners = function rawListeners(type) {
            return _listeners(this, type, false);
        };

        EventEmitter.listenerCount = function (emitter, type) {
            if (typeof emitter.listenerCount === 'function') {
                return emitter.listenerCount(type);
            } else {
                return listenerCount.call(emitter, type);
            }
        };

        EventEmitter.prototype.listenerCount = listenerCount;
        function listenerCount(type) {
            var events = this._events;

            if (events !== undefined) {
                var evlistener = events[type];

                if (typeof evlistener === 'function') {
                    return 1;
                } else if (evlistener !== undefined) {
                    return evlistener.length;
                }
            }

            return 0;
        }

        EventEmitter.prototype.eventNames = function eventNames() {
            return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
        };

        function arrayClone(arr, n) {
            var copy = new Array(n);
            for (var i = 0; i < n; ++i)
                copy[i] = arr[i];
            return copy;
        }

        function spliceOne(list, index) {
            for (; index + 1 < list.length; index++)
                list[index] = list[index + 1];
            list.pop();
        }

        function unwrapListeners(arr) {
            var ret = new Array(arr.length);
            for (var i = 0; i < ret.length; ++i) {
                ret[i] = arr[i].listener || arr[i];
            }
            return ret;
        }
/***/ }),

/* 16 */
/***/ (function (module, exports) {
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

        // import { loadSession, updateSessionStatus } from './session.js';
        // import { showErrorMsg }  from './wkgrowlmsg.js';
        // import { OrderTransaction }  from './wkordertransaction.js';
        // import { asyncComputed, wkFormatCurrency, makeTotalProductCaculation } from './wkformatcurrency.js';

        // var key;
        // var posSession;

        // $(document).ready(function () {
        //     key = 'wkpos_outlet_session_'+idEmployee+'_'+idWkPosOutlet;

        //     $(window).trigger('resize');
        //     // navigator.onLine = false;
        //     // wkposHeaderApplyBinding();
        // });
        // // function wkposHeaderApplyBinding() {
        // //     viewModel = new PosHeaderViewModel();
        // //     ko.applyBindings(
        // //         viewModel,
        // //         document.getElementById("wkpos-header")
        // //     );
        // // }

        // function set_cookie(name, value) {
        //     document.cookie = name +'='+ value +'; Path=/;';
        // }
        // function delete_cookie(name) {
        //     document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // }
        // function getCookie(name) {
        //     var value = "; " + document.cookie;
        //     var parts = value.split("; " + name + "=");
        //     if (parts.length == 2) return parts.pop().split(";").shift();
        // }

        // function clearLocalStorage() {
        //     if (localStorage.pos_cart != undefined) {
        //         localStorage.removeItem('pos_cart');
        //     }
        //     if (localStorage.pos_orders != undefined) {
        //         localStorage.removeItem('pos_orders');
        //     }
        //     if (localStorage.pos_products != undefined) {
        //         localStorage.removeItem('pos_products');
        //     }
        //     if (localStorage.currentCartId != undefined) {
        //         localStorage.removeItem('currentCartId');
        //     }
        //     if (localStorage.selectedCartId != undefined) {
        //         localStorage.removeItem('selectedCartId');
        //     }
        // }

        // export function PosSessionViewModel(PosModel) {
        //     var self = this;
        //     self.controlTransactions = ko.observableArray([]);
        //     self.orderedTransactions = ko.observableArray([]);
        //     self.emptyOrderedTransactions = ko.computed(function () {
        //         return self.orderedTransactions().length == 0;
        //     }, this);
        //     self.sessionDate = ko.observable('');
        //     self.sessionId = ko.observable(idWkPosSession);
        //     self.sessionOpeningBal = ko.observable(0);
        //     self.sessionTransaction = ko.observable(0);
        //     self.displaySessionTransaction = asyncComputed(function () {
        //         return wkFormatCurrency(self.sessionTransaction(), currencyFormat);
        //     }, this);
        //     self.sessionClosingBal = ko.observable(0);
        //     self.displaySessionClosingBal = asyncComputed(function () {
        //         return wkFormatCurrency(self.sessionClosingBal(), currencyFormat);
        //     }, this);
        //     self.displaySessionOpeningBal = asyncComputed(function () {
        //         return wkFormatCurrency(self.sessionOpeningBal(), currencyFormat);
        //     }, this);
        //     self.sessionOpeningDate = ko.observable('');
        //     self.idControlPanel = ko.observable(idControlPanel);
        //     self.transactionType = ko.observable();
        //     self.transactionAmount = ko.observable(0);
        //     self.transactionReason = ko.observable('');

        //     self.transactionHeading = ko.observable('');
        //     self.transactionDescription = ko.observable('');

        //     PosModel.call(self);
        //     // self.openSession = async function() {
        //     //     set_cookie(key, idWkPosOutlet);
        //     //     posViewModel.sessionStatus(1);
        //     //     loadSession();
        //     //     // window.location.href = posSales;
        //     // }


        //     self.theoriticalClosingBal = ko.computed(function () {
        //         var totalPrice = parseFloat(self.sessionOpeningBal()) + parseFloat(self.sessionTransaction());
        //         totalPrice = makeTotalProductCaculation(parseFloat(totalPrice));
        //         return parseFloat(totalPrice);
        //     }, this);

        //     self.difference = ko.computed(function () {
        //         var totalPrice = parseFloat(self.sessionClosingBal()) - parseFloat(self.theoriticalClosingBal());
        //         totalPrice = makeTotalProductCaculation(parseFloat(totalPrice));
        //         return parseFloat(totalPrice);
        //     }, this);
        //     self.displayDifference = asyncComputed(function () {
        //         var totalPrice = parseFloat(self.sessionClosingBal()) - parseFloat(self.theoriticalClosingBal());
        //         return wkFormatCurrency(totalPrice, currencyFormat);
        //     }, this);

        //     var confirmCloseTimeout = 'undefined';
        //     self.closeSession = async function() {
        //         var posOrder = $.parseJSON(localStorage.pos_orders);
        //         if (typeof posOrder != 'undefined' && posOrder && Object.keys(posOrder).length) {
        //             showErrorMsg(orderSyncBeforeClose);
        //         } else {
        //             if (posViewModel.confirmClose() == 0) {
        //                 posViewModel.confirmClose(1);
        //                 if (typeof confirmCloseTimeout != 'undefined') {
        //                     clearTimeout(confirmCloseTimeout);
        //                 }
        //                 confirmCloseTimeout = setTimeout(function() {
        //                     posViewModel.confirmClose(0);
        //                 }, 4000);
        //             } else {
        //                 clearTimeout(confirmCloseTimeout);
        //                 delete_cookie(key);
        //                 window.location.href = posSessionLink;
        //             }
        //         }
        //     }

        //     self.updateControlTransactions = async function() {
        //         var data = {
        //             action: 'getControlTransactions',
        //             id_wkpos_control_panel: self.idControlPanel()
        //         };
        //         var sessionDetails = await updateSessionStatus(data);
        //         var mappedTransactions = $.map(sessionDetails['controlTransaction'],
        //             function (item) {
        //                 if (item.type == !posViewModel.sessionStatus()) {
        //                     return new CashControl(item);
        //                 }
        //             }
        //         );
        //         self.controlTransactions(mappedTransactions);
        //     }

        //     self.updateSessionOrderTransactions = async function() {
        //         var data = {
        //             action: 'getSessionOrderTransactions',
        //             id_wkpos_session: self.sessionId()
        //         };
        //         var sessionDetails = await updateSessionStatus(data);
        //         var mappedTransactions = $.map(sessionDetails['transactions'],
        //             function (item) {
        //                 return new OrderTransaction(item, sessionDetails['type']);
        //                 // if (item.type == !posViewModel.sessionStatus()) {
        //                 //     return new CashControl(item);
        //                 // }
        //             }
        //         );
        //         self.orderedTransactions(mappedTransactions);
        //     }

        //     function updateSessionDetails(sessionDetails)
        //     {
        //         if (sessionDetails) {
        //             posViewModel.newSessionStatus(1);
        //             if (typeof sessionDetails['sessionDetails'] != 'undefined' && sessionDetails['sessionDetails']) {
        //                 idWkPosSession = sessionDetails['sessionDetails'].id_wkpos_session;
        //                 self.sessionOpeningDate(sessionDetails['sessionDetails']['date_add']);
        //             }
        //             if (typeof sessionDetails['transactions'] != 'undefined' && sessionDetails['transactions']) {
        //                 self.updateSessionTransaction(sessionDetails['transactions'])
        //             }
        //             if (typeof sessionDetails['controlTransaction'] != 'undefined' && sessionDetails) {
        //                 self.updateOpeningAndClosingBal(sessionDetails['controlTransaction']);
        //                 // var totalOpeningBalance = 0.0;
        //                 // var totalClosingBalance = 0.0;
        //                 // $.each(sessionDetails['controlTransaction'], function(index, item) {
        //                 //     var subTotal = parseFloat(item.amount_value) * parseInt(item.quantity);
        //                 //     if (item.type == 1) {
        //                 //         totalOpeningBalance += subTotal;
        //                 //     } else {
        //                 //         totalClosingBalance += subTotal;
        //                 //     }
        //                 // });
        //                 // self.sessionOpeningBal(totalOpeningBalance);
        //                 // self.sessionClosingBal(totalClosingBalance);
        //             }
        //             if (typeof sessionDetails.control != 'undefined') {
        //                 self.idControlPanel(sessionDetails.control.id_wkpos_control_panel);
        //                 self.sessionDate(sessionDetails.control.date_add);
        //                 self.sessionId(sessionDetails.control.id_wkpos_control_panel);
        //             }
        //         }
        //     }

        //     self.newSession = async function() {
        //         var data = {
        //             action: 'newSession'
        //         }
        //         var sessionDetails = await updateSessionStatus(data);
        //         updateSessionDetails(sessionDetails);
        //         var clearStorage = true;
        //         if (clearStorage) {
        //             clearLocalStorage();
        //         }
        //         // loadSession();
        //         // window.location.href = posSales;
        //     }

        //     self.resumeSession = function() {
        //         set_cookie(key, idWkPosOutlet);
        //         window.location.href = posSales;
        //     }

        //     self.updateOpeningAndClosingBal = function(transactions) {
        //         var totalOpeningBalance = 0.0;
        //         var totalClosingBalance = 0.0;
        //         if (typeof transactions != 'undefined' && transactions.length > 0) {
        //             var subTotal = 0;
        //             $.each(transactions, function(index, item) {
        //                 subTotal = parseFloat(item.amount_value) * parseInt(item.quantity);
        //                 if (item.type == 1) {
        //                     totalOpeningBalance += subTotal;
        //                 } else {
        //                     totalClosingBalance += subTotal;
        //                 }
        //             });
        //         }
        //         totalOpeningBalance = makeTotalProductCaculation(parseFloat(totalOpeningBalance));
        //         totalClosingBalance = makeTotalProductCaculation(parseFloat(totalClosingBalance));
        //         self.sessionOpeningBal(parseFloat(totalOpeningBalance));
        //         self.sessionClosingBal(parseFloat(totalClosingBalance));
        //     }

        //     self.updateControl = async function() {
        //         if (self.controlTransactions().length > 0) {
        //             var type = 0;
        //             if (posViewModel.sessionStatus() == 0) {
        //                 type = 1;
        //             }
        //             var data = {
        //                 action: 'updateControlPanel',
        //                 control_panel: self.controlTransactions(),
        //                 id_wkpos_control_panel: self.idControlPanel(),
        //                 type: type
        //             };
        //             var sessionDetails = await updateSessionStatus(data);
        //             self.updateOpeningAndClosingBal(sessionDetails.controlTransaction);
        //         }
        //         $(document).find('#wk-pos-cash-control').modal('toggle');
        //         // updateSessionDetails(sessionDetails);
        //     }

        //     self.openSession = async function() {
        //         var data = {
        //             action: 'openSession',
        //             id_wkpos_control_panel: self.idControlPanel()
        //         }
        //         var sessionDetails = await updateSessionStatus(data);
        //         set_cookie(key, idWkPosOutlet);
        //         posViewModel.sessionStatus(1);
        //         self.sessionClosingBal(0);
        //         self.sessionTransaction(0);
        //         self.sessionOpeningDate(sessionDetails.sessionDetails.date_add);
        //         updateSessionDetails(sessionDetails);
        //         // loadSession();
        //         // window.location.href = posSales;
        //     }

        //     self.posSessionActions = function() {
        //         $('.card-actions.cart-action-position').toggle();
        //     }

        //     self.completeSession = async function() {
        //         var posOrder = $.parseJSON(localStorage.pos_orders);
        //         if (typeof posOrder != 'undefined' && posOrder && Object.keys(posOrder).length) {
        //             showErrorMsg(orderSyncBeforeClose);
        //         } else {
        //             if (validateSession && self.difference() != 0) {
        //                 showErrorMsg(transactionMismatchMsg);
        //             } else {
        //                 var data = {
        //                     action: 'closeSession',
        //                     id_wkpos_session: idWkPosSession
        //                 }
        //                 var sessionDetails = await updateSessionStatus(data);
        //                 delete_cookie(key);
        //                 posViewModel.sessionStatus(0);
        //                 self.controlSession(0);
        //                 posViewModel.newSessionStatus(0);
        //                 self.sessionOpeningDate('');
        //             }
        //         }
        //     }

        //     self.addNewControlRow = function() {
        //         self.controlTransactions.push(new CashControl(null));
        //     }

        //     self.viewSession = async function() {
        //         var data = {
        //             action: 'viewSession'
        //         }
        //         var sessionDetails = await updateSessionStatus(data);
        //         updateSessionDetails(sessionDetails);
        //     }
        //     self.viewOrders = function() {
        //     }
        //     self.removeTransaction = async function(transaction) {
        //         var data = {
        //             action: 'removeTransaction',
        //             id_wkpos_session: idWkPosSession,
        //             id_wkpos_cash_control: transaction.id_wkpos_cash_control
        //         }
        //         var response = await updateSessionStatus(data);
        //         if (typeof response != 'undefined' && !response['hasError']) {
        //             self.controlTransactions.remove(transaction);
        //         }
        //     }

        //     self.viewSessionDetails = async function() {
        //         var data = {
        //             action: 'getSessionDetails',
        //             id_wkpos_session: idWkPosSession,
        //             id_wkpos_control_panel: self.idControlPanel()
        //         };
        //         var sessionDetails = await updateSessionStatus(data);
        //         updateSessionDetails(sessionDetails);
        //     }

        //     // self.updateTransaction = async function() {
        //     //     var errors = [];
        //     //     var key = 0;
        //     //     if (self.transactionReason() == '') {
        //     //         errors[key++] = invalidReasonLabel;
        //     //     }
        //     //     var value = self.transactionAmount();
        //     //     var valid = !/^\s*$/.test(value) && !isNaN(value);
        //     //     if (!valid) {
        //     //         errors[key++] = invalidReasonAmount;
        //     //     }
        //     //     if (errors.length > 0) {
        //     //         $.each(errors, function (index, error) {
        //     //             showErrorMsg(error);
        //     //         });
        //     //     } else {
        //     //         var type = 0;
        //     //         if (self.transactionType() == 1) {
        //     //             type = 1;
        //     //         }
        //     //         var data = {
        //     //             action: 'updateTransaction',
        //     //             id_wkpos_session: idWkPosSession,
        //     //             reason: self.transactionReason(),
        //     //             amount: self.transactionAmount(),
        //     //             type: type,
        //     //         }
        //     //         var sessionDetails = await updateSessionStatus(data);
        //     //         var posSessionTransactionAmount = self.sessionTransaction();;
        //     //         if (self.transactionType() == 1) {
        //     //             posSessionTransactionAmount += self.transactionAmount();
        //     //         } else {
        //     //             posSessionTransactionAmount -= self.transactionAmount();
        //     //         }
        //     //         self.sessionTransaction(parseFloat(posSessionTransactionAmount));
        //     //         self.transactionReason('');
        //     //         self.transactionAmount(0);
        //     //         self.transactionType(0);
        //     //         $(document).find('#wk-pos-session-modal').modal('toggle');
        //     //     }
        //     // }

        //     // self.updateTransactionEvent = async function(data) {
        //     //     self.transactionType(parseInt(data));
        //     //     if (data == 1) {
        //     //         self.transactionHeading(moneyInHeading);
        //     //         self.transactionDescription(moneyInDesc)
        //     //     } else {
        //     //         self.transactionHeading(moneyOutHeading);
        //     //         self.transactionDescription(moneyOutDesc);
        //     //     }
        //     // }

        //     self.updateSessionTransaction = function(transactions) {
        //         if (typeof transactions != 'undefined' && transactions) {
        //             var amount = 0;
        //             $.each(transactions, function(index, transaction) {
        //                 if (transaction.type == 1) {
        //                     amount += parseFloat(transaction.amount);
        //                 } else {
        //                     amount -= parseFloat(transaction.amount);
        //                 }
        //             });
        //             amount = makeTotalProductCaculation(parseFloat(amount));
        //             amount = amount;
        //             self.sessionTransaction(amount);
        //         }
        //     }

        //     self.totalTransactionAmount = ko.computed(function () {
        //         var totalPrice = 0;
        //         var controlTransactions = self.controlTransactions();
        //         for (var i = 0; i < controlTransactions.length; i++) {
        //             totalPrice = parseFloat(totalPrice) + parseFloat(controlTransactions[i].subtotal());
        //         }
        //         totalPrice = makeTotalProductCaculation(parseFloat(totalPrice));

        //         return parseFloat(totalPrice);
        //     }, this);
        // }

        // function CashControl(data) {
        //     var self = this;
        //     if (data == null) {
        //         self.id_wkpos_cash_control = 0;
        //         self.amount_value = ko.observable(0);
        //         self.quantity = ko.observable(0);
        //     } else {
        //         self.id_wkpos_cash_control = data.id_wkpos_cash_control;
        //         data.amount_value = makeTotalProductCaculation(parseFloat(data.amount_value));
        //         var amount = parseFloat(data.amount_value);
        //         self.amount_value = ko.observable(amount);
        //         self.quantity = ko.observable(data.quantity);
        //     }
        //     self.subtotal = ko.computed(function () {
        //         var totalPrice = self.amount_value() * self.quantity();
        //         totalPrice = makeTotalProductCaculation(parseFloat(totalPrice));
        //         return parseFloat(totalPrice);
        //     }, this);
        // }
/***/ }),

/* 17 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function () { return PaymentOption; });
        /* harmony import */ var _wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
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

        function PaymentOption(data) {
            var self = this;
            self.id_wkpos_payment = data.id_wkpos_payment;
            self.dueAmount = ko.observable(data.dueAmount);
            self.tendered = ko.observable(data.tendered);
            if (typeof data.change == 'undefined') {
                data.change = 0;
            }
            self.totalOrderAmount = ko.observable(parseFloat(data.tendered) - parseFloat(data.change));
            self.change = ko.computed(function () {
                var changePrice = parseFloat(self.tendered()) - parseFloat(self.dueAmount());
                changePrice = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_0__["makeTotalProductCaculation"])(parseFloat(changePrice));
                changePrice = parseFloat(changePrice);
                return changePrice.toFixed(psPrecision);
            }, this);
            self.paymentMethod = data.paymentMethod;
        }
/***/ }),

/* 18 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function () { return printHtmlOrderInvoice; });
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

        // function printMultipleBarcodeImages(imageDataUrlsToPrint, width, height, rotate) {
        function printHtmlOrderInvoice(order, products) {
            var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            var isEdge = window.navigator.userAgent.toLowerCase().indexOf("edge") > -1;
            var isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
            var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && !navigator.userAgent.match('CriOS');
            var isMSIE = window.navigator.userAgent.indexOf("MSIE") > 0;
            var min_width = 650;

            // if (width < min_width) {
            //     height = (height * min_width) / width;
            //     width = min_width;
            // }

            // // Create IE + others compatible event handler
            var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            var eventer = window[eventMethod];
            var printEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

            // Listen to message from child window
            eventer(printEvent, function (e) {
                $("#printingFrame").remove();
            }, false);

            // var extra_css = "";
            // if (isChrome || isFirefox) {
            //     extra_css = "@page { size: auto; margin: 0; }";
            // }

            // var final_Html_Code = generateFinalHtmlforPrint(imageDataUrlsToPrint, extra_css);

            var final_Html_Code = generateHtmlForOrderPrinting(order, products);
            var iframe = appendIframeHtml();
            var invoiceBarcodeDiv = document.createElement('div');
            invoiceBarcodeDiv.id = "invoiceBarcodeDiv";

            invoiceBarcodeDiv.innerHTML = '<svg class="barcode"></svg>';
            invoiceBarcodeDiv.style.position = "absolute";
            invoiceBarcodeDiv.style.height = 40 * 1.5 + "px";
            invoiceBarcodeDiv.style.width = 200 * 1.25 + "px";
            invoiceBarcodeDiv.style.zIndex = 0;
            invoiceBarcodeDiv.style.background = "transparent";
            invoiceBarcodeDiv.style.color = "black";

            document.body.appendChild(invoiceBarcodeDiv);


            var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
            if (isFirefox) {
                iframe.srcdoc = final_Html_Code;
            } else {
                iframedoc.body.innerHTML = final_Html_Code;
            }

            if (displayBarcode == 1) {
                JsBarcode("#invoiceBarcodeDiv .barcode", order['reference'], {
                    height: 40,
                    displayValue: false,
                    textAlign: 'center'
                });
            }
            $($($('#printingFrame').get(0).contentWindow.document).find('#invoice_barcode')).html($('#invoiceBarcodeDiv').html());
            document.body.removeChild(invoiceBarcodeDiv);
            setTimeout(function () { $("#printingFrame").get(0).contentWindow.print(); parent.postMessage('Printing Completed') }, 100)
            // $("#printingFrame").get(0).contentWindow.print();
            // parent.postMessage('Printing Completed');
        }

        function generateFinalHtmlforPrint(imageDataUrlsToPrint, extra_css) {
            var jsTimeOutCode = "setTimeout(function(){window.print(); parent.postMessage('Printing Completed')},1000);";
            var imageCSS = "width:100%;max-height:100%;margin:3; padding:2;"
            var final_Html_Code = "<style>html, body { height:" + barcodeHeight + "; width:" + barcodeWidth + "; margin:5; padding:0;}" + extra_css + " </style>";

            lengthImages = Object.keys(images).length;
            for (var i = 0; i < lengthImages; i++) {
                var codeToBeLoaded = "";
                if (i == lengthImages - 1) {
                    codeToBeLoaded = " onload=\"" + jsTimeOutCode + "\"";
                }
                final_Html_Code += "<img src=\"" + imageDataUrlsToPrint[i] + "\" style=\"" + imageCSS + "\" " + codeToBeLoaded + "/>";
                if (i < imageDataUrlsToPrint.length - 1) {
                    final_Html_Code += "<br/>";
                }
            }
            return final_Html_Code;
        }

        function appendIframeHtml() {
            var iframe = document.createElement('iframe');
            iframe.scroll = "auto";
            iframe.height = '100%';
            iframe.width = '60%';
            iframe.style.position = "absolute";
            iframe.style.left = "20%";
            iframe.style.top = "0px";
            iframe.style.zIndex = 10000;
            iframe.marginwidth = "0";
            iframe.marginheight = "0";
            iframe.hspace = "0";
            iframe.vspace = "0";
            iframe.style.background = "white";
            iframe.id = "printingFrame";
            document.body.appendChild(iframe);
            iframe.focus();
            return iframe;
        }

        function generateHtmlForOrderPrinting(order, products) {
            if (isNaN(order['total_paid_tax_incl'])) {
                var totalTax = order['total_tax'];
                var orderTotal = order['total_paid_tax_incl'];
                var orderDiscount = order['total_discounts'];
                var orderSubTotal = order['total_products_wt'];
                var orderShipping = order['shipping_cost_tax_incl'];
            } else {
                var totalTax = makeTotalProductCaculation(order['total_tax']);
                var orderTotal = makeTotalProductCaculation(order['total_paid_tax_incl']);
                var orderDiscount = makeTotalProductCaculation(order['total_discounts']);
                var orderSubTotal = makeTotalProductCaculation(order['total_products_wt']);
                var orderShipping = makeTotalProductCaculation(order['shipping_cost_tax_incl']);
            }
            var flex8 = "flex: 8;";
            var flex2 = "flex: 2;";
            var flex3 = "flex: 3;";
            var dflex = "display: flex;";
            var textRight = "text-align: right;";
            var padding10 = "padding: 10px;";
            var fontWeight600 = "font-weight: 600;";
            var style = '<style>';
            style += '.order-heading { font-weight: 600; }';
            style += '.order-products { border-top: 1px dashed; padding: 15px 0; border-bottom: 1px dashed;}';
            style += 'div.order-detail span { padding: 5px 0; }';
            style += '.order-customer { border-top: 1px dashed; padding-top: 15px; }';
            style += '</style>';
            // var html = '<h1 onload="'+jsTimeOutCode+'">Heading</h1>';
            var html = '<div class="order-invoicing" style="text-align:center">';
            html += '<div class="order-heading" style="margin-bottom: 15px;">';
            html += '<div class="outlet-name">' + shopName + '</div>';
            html += '<div class="outlet-city">' + outletAddress1 + ', ' + outletAddress2 + '</div>';
            // html += '<div class="outlet-city">' + outletAddress2 + '</div>';
            html += '<div class="outlet-city">' + outletCity + ', ' + outletState + '</div>';
            // html += '<div class="outlet-city">' + outletState + '</div>';
            html += '<div class="outlet-city">' + outletCountry + ' - ' + outletPostCode + '</div>';
            // html += '<div class="outlet-city">' + outletPostCode + '</div>';
            if (outletPhone != undefined && outletPhone != '') {
                html += '<div class="outlet-number">' + displayPhone + outletPhone + '</div>';
            }
            html += '<div class="order-date">' + order['order_date'] + '</div>';
            html += '<div class="user-employee">' + displayUser + employeeName + '</div>';
            html += '<div class="order-refernce">' + displayOrder + '#' + order['reference'] + '</ div>';
            html += '</div>';

            html += '<div class="customer-details" style="text-align: left;">';
            // html += '<div class="customer">';
            //     html += '<span>'+ order['order_date'] + '</span>';
            // html += '</div>';
            // html += '<div class="customer">';
            //     html += '<span>' + displayOrder + '</span>';
            //     html += '<span>' + order['id_order'] + '</span>';
            // html += '</div>';
            // html += '<div class="customer">';
            //     html += '<span>' + displayCustomerName + '</span>';
            //     html += '<span>' + order['customer_name'] + '</span>';
            // html += '</div>';


            // html += '<div class="customer">';
            // html += '<span>' + displayPaymentMethod + '</span>';
            // html += '<span>' + order['payment'] + '</span>';
            // html += '</div>';

            html += '</div>';

            html += '</div>';

            html += '<div class="order-products" style="text-align: left;">';
            html += '<table width="100%">';
            html += '<thead>';
            html += '<tr style="' + dflex + '">';
            html += '<th style="' + flex8 + '">' + productNameHeading + '</th>';
            html += '<th style="' + flex2 + textRight + '">' + qtyHeading + '</th>';
            html += '<th style="' + flex3 + textRight + '">' + priceHeading + '</th>';
            html += '<th style="' + flex3 + textRight + '">' + totalHeading + '</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';
            $.each(products, function (index, product) {
                var productQuantity = product['product_quantity'];
                if (typeof product['display_unit_price_tax_incl'] != 'undefined' && isNaN(product['display_unit_price_tax_incl'])) {
                    var productPrice = product['display_unit_price_tax_incl'];
                    var totalPricePerProduct = product['display_total_price_tax_incl'];
                } else {
                    var productPrice = makeTotalProductCaculation(product['unit_price_tax_incl']);
                    var totalPricePerProduct = makeTotalProductCaculation(product['total_price_tax_incl']);
                }
                var productName = product['product_name'];
                if (product['reduction_percent'] != undefined
                    && product['reduction_percent'] > 0
                    && displayProductDiscount == 1
                ) {
                    productName += ' ' + beforeDiscountMessage + product['reduction_percent'] + afterDiscountMessage;
                    // productDetails += ' ' + beforeDiscountMessage + product['reduction_percent'] + afterDiscountMessage;
                }
                html += '<tr style="' + dflex + '">';
                html += '<td style="' + flex8 + padding10 + '">' + productName + '</td>';
                html += '<td style="' + flex2 + textRight + '">' + productQuantity + '</td>';
                html += '<td style="' + flex3 + textRight + '">' + productPrice + '</td>';
                html += '<td style="' + flex3 + textRight + '">' + totalPricePerProduct + '</td>';
                html += '</tr>';
            });
            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            html += '<div class="order-detail">';

                html += '<div class="order-subtotal" style="' + dflex + fontWeight600 + '">';
                    html += '<span style="' + flex8 + textRight + '">' + displaySubTotal + '</span>';
                    html += '<span style="' + flex2 + textRight + '">' + orderSubTotal + '</span>';
                html += '</div>';

                if (order['shipping_cost_tax_incl'] > 0) {
                    html += '<div class="order-shipping" style="' + dflex + fontWeight600 + '">';
                        html += '<span style="' + flex8 + textRight + '">' + displayShippingMsg + '</span>';
                        html += '<span style="' + flex2 + textRight + '">' + orderShipping + '</span>';
                    html += '</div>';
                }

                html += '<div class="order-tax" style="' + dflex + fontWeight600 + '">';
                    html += '<span style="' + flex8 + textRight + '">' + displayTax + '</span>';
                    html += '<span style="' + flex2 + textRight + '">' + totalTax + '</span>';
                html += '</div>';

                if (parseInt(displayOrderDiscountWk) == 1) {
                    html += '<div class="order-discount" style="' + dflex + fontWeight600 + '">';
                        html += '<span style="' + flex8 + textRight + '">' + displayDiscount + '</span>';
                        html += '<span style="' + flex2 + textRight + '">' + orderDiscount + '</span>';
                    html += '</div>';
                }
                html += '<div class="order-total" style="' + dflex + fontWeight600 + '">';
                    html += '<span style="' + flex8 + textRight + '">' + displayTotal + '</span>';
                    html += '<span style="' + flex2 + textRight + '">' + orderTotal + '</span>';
                html += '</div>';

                html += '<div class="order-customer">';
                    html += '<span>' + displayCustomerName + '</span>';
                    html += '<span>' + order['customer_name'] + '</span>';
                html += '</div>';

                html += '<div>';
                    html += '<span>' + customerAddress + '</span>';
                    html += '<span>' + order['address1'] + ' ' + order['address2'] + ', ' + order['city'] + '</span>';
                html += '</div>';

                html += '<div id="invoice_barcode"></div>';
                if (signOnOrderReciept == 1) {
                    html += '<div id="digital_sign" style="word-break:break-all;">' + order['digital_sign'] + '</div>';
                }

                html += '<div>';
                    html += '<table width="100%">';
                        html += '<thead>';
                            html += '<tr style="' + dflex + '">';
                                html += '<th style="' + flex8 + '">' + paymentTypeWk + '</th>';
                                html += '<th style="' + flex2 + textRight + '">' + paymentAmountWk + '</th>';
                                html += '<th style="' + flex3 + textRight + '">' + paymentTenderedWk + '</th>';
                                html += '<th style="' + flex3 + textRight + '">' + paymentChangeWk + '</th>';
                            html += '</tr>';
                            $.each(order.order_payment, function (index, orderPaymentWk) {
                                html += '<tr style="' + dflex + '">';
                                    html += '<th style="' + flex8 + '">' + orderPaymentWk.name + '</th>';
                                    html += '<th style="' + flex2 + textRight + '">' + orderPaymentWk.totalOrderAmount + '</th>';
                                    html += '<th style="' + flex3 + textRight + '">' + orderPaymentWk.tendered + '</th>';
                                    html += '<th style="' + flex3 + textRight + '">' + orderPaymentWk.change + '</th>';
                                html += '</tr>';
                            });
                        html += '</thead>';
                    html += '</table>';
                html += '</div>';

            html += '</div>';

            html += '</div>';
            return style + html;
        }
/***/ }),

/* 19 */
/***/ (function (module, exports, __webpack_require__) {
        __webpack_require__(20);
        __webpack_require__(16);
        __webpack_require__(13);
        __webpack_require__(14);
        __webpack_require__(9);
        __webpack_require__(8);
        __webpack_require__(5);
        __webpack_require__(4);
        __webpack_require__(2);
        __webpack_require__(7);
        __webpack_require__(6);
        __webpack_require__(1);
        __webpack_require__(0);
        __webpack_require__(10);
        module.exports = __webpack_require__(11);
/***/ }),

/* 20 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* WEBPACK VAR INJECTION */(function (global) {/* harmony import */ var _wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
        /* harmony import */ var _wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
        /* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
        /* harmony import */ var _poscart_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
        /* harmony import */ var _order_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
        /* harmony import */ var _voucher_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
        /* harmony import */ var _customer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
        /* harmony import */ var _address_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
        /* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(16);
        /* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_header_js__WEBPACK_IMPORTED_MODULE_8__);
        /* harmony import */ var _tax_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(12);
        /* harmony import */ var _wkprintinvoice_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11);
        /* harmony import */ var _session_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(13);
        /* harmony import */ var _wkindexeddb_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(14);
        /* harmony import */ var _wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6);
        /* harmony import */ var _payment_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(17);
        /* harmony import */ var _wkposhtmlprint_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(18);
        /* harmony import */ var events__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(15);
        /* harmony import */ var events__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_16__);
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
        global.wkpos = {};
        global.modelList = {};


        for (var i in events__WEBPACK_IMPORTED_MODULE_16___default.a.prototype) {
            wkpos[i] = events__WEBPACK_IMPORTED_MODULE_16___default.a.prototype[i];
        }
        var enableResize = 0;
        var shipping,
            defaultShippingCarrier,
            groups,
            genders,
            posError,
            pos_products = {},
            categoryWiseProducts = undefined,
            pos_cart = undefined,
            confirmBeforeLoad = true;

        global.PosViewModel = undefined;
        global.posOnlineProducts = {};
        global.PosModel = undefined;
        global.PosProductsViewModel = undefined;
        global.activeCart = 0;
        global.loaded = 0;
        global.categories = undefined;
        global.defaultTaxRate = undefined;
        global.taxRate = undefined;
        global.viewModel = undefined;
        global.posViewModel = undefined;
        global.productViewModel = undefined;
        global.objPosProductsViewModel = undefined;
        global.outletAddress = undefined;
        global.cartVouchers = {};
        global.customers = {};
        global.deliveryError = 0;
        global.posOrders = undefined;
        global.growl = $.growl;
        global.dbRequest = undefined;
        global.dbName = 'wkpos';
        global.dbVersion = 1;
        global.applyCustomer = 0;
        global.applyShipping = 0;
        global.selectedCountry = 0;
        global.qty = 0;
        global.orderSlip = undefined;

        global.getPOSDetails = undefined;
        global.getAllProducts = undefined;
        global.updatePosCartWithCurrencyUpdate = undefined;
        global.getAllCategories = undefined;
        global.getAllCustomers = undefined;
        global.getAllOrders = undefined;

        global.ajaxAddCustomProduct = undefined;

        var orderBill = [];
        var key;
        var posSession;
        $(window).on('resize', function (e) {
            enableResize = 0;
            wkposBodySize();
        });

        function wkposBodySize(customer = false) {
            wkpos.emit('beforePosBodyResize', {});
            $('#wk-pos-side-panel, #wkpos-content-panel, #right_column, .wk-sidepanel, .wk-pos-employee-details, .wkpos-payment-panel').css('height', window.innerHeight - $('#wkpos-header').height());
            $('.invoice.wkpos-scrollbar').css('height', window.innerHeight - $('#wkpos-header').height() - 49);
            $('#wk-demo').css('height', window.innerHeight - $('#wkpos-header').height() - 50 - 40);
            $('.wk-pos-employee-details div.tab-content').css('height', window.innerHeight - $('#wkpos-header').height() - $('#pos-sale .wk-pos-employee-details ul.nav > li').height());
            $('.order-panel-height').css('height', window.innerHeight - $('#wkpos-header').height() - $('#pos-sale .wkpos-order-panel ul.nav > li').height());
            $('.wk-pos-order-detail').css('height', window.innerHeight - $('#wkpos-header').height() - $('#pos-sale .wkpos-order-panel ul.nav > li').height() - 60);

            var paymentHeaderHeight = $('#pos-sale .wkpayment-header').height();
            if (paymentHeaderHeight < 0) {
                paymentHeaderHeight = 25;
            }
            $('#wk-pos-payment-panel').css('height', window.innerHeight - $('#wkpos-header').height() - paymentHeaderHeight - 17);
            if ($('.wk-payment.collapsed').height() > 0) {
                $('#wk-cart-panel >.wk-cart-product-details div.tab-content').css('height', window.innerHeight - $('#wkpos-header').height() - $('.wk-payment.collapsed').height() - $('.wk-cart-product-details > ul.nav').height() - 4);
            } else {
                const heightTemp = window.innerHeight - $('#wkpos-header').height() - ((window.innerWidth > 768) ? 305 : 538) - $('.wk-cart-product-details > ul.nav').height() - 4;
                $('#wk-cart-panel >.wk-cart-product-details div.tab-content').css('height', heightTemp);
            }
            var categoryHeight = $('.upper-category').height();
            if (isNaN(categoryHeight) || categoryHeight < 0) {
                categoryHeight = 50;
            }
            $('.wkpos-body').css('height', window.innerHeight - $('#wkpos-header').height() - $('.upper-category').height());
            if (!customer) {
                var isMobile = window.matchMedia("only screen and (max-width: 991px)");
                var bodyPanelWidthPercent = 0;
                var cartPanelWidthPercent = 0;
                var minWidth = 0;
                if (isMobile.matches) {
                    bodyPanelWidthPercent = 40.66;
                    cartPanelWidthPercent = 59.03;
                    minWidth = 300;
                } else {
                    bodyPanelWidthPercent = 58.03;
                    cartPanelWidthPercent = 41.66;
                    minWidth = 550;
                }
                $('#content-wrapper.product-panel').width(bodyPanelWidthPercent * window.innerWidth * 91.6667 / 10000);
                $('#right_column').width(cartPanelWidthPercent * window.innerWidth * 91.6667 / 10000);
                // var resize = $(document).find("#content-wrapper.product-panel");
                if (enableResize == 0) {
                    var productPanelWidth = 0;
                    var cartPanelWidth = 0;
                    if ($("#content-wrapper.product-panel").width() < 100) {
                        productPanelWidth = $("#content-wrapper.product-panel").width() * $("#wkpos-content-panel").width() * window.innerWidth / 10000;
                        cartPanelWidth = $("#right_column").width() * $("#wkpos-content-panel").width() * window.innerWidth / 10000;
                    } else {
                        productPanelWidth = $("#content-wrapper.product-panel").width();
                    }
                    if (isMobile.matches) {
                        productPanelWidth = 320;
                    }
                    enableResize = 1;
                } else {
                    if ($(document).find("#content-wrapper").hasClass('ui-resizable')) {
                        $(document).find("#content-wrapper").resizable();
                        $(document).find("#content-wrapper").resizable('destroy');
                    }
                }
                var containerWidth = 91.6667 * window.innerWidth / 100;
                if (typeof posViewModel != 'undefined' && (posViewModel.bodyPanel() == 'products' || posViewModel.bodyPanel() == 'customers')) {
                    $(document).find("#content-wrapper.product-panel").resizable({
                        handles: 'e',
                        maxWidth: productPanelWidth,
                        minWidth: minWidth,
                        resize: function (event, ui) {
                            var currentWidth = ui.size.width;
                            var padding = 12;
                            $(this).width(currentWidth);
                            $("#right_column").width(containerWidth - currentWidth - 2);
                        }
                    });
                } else {
                    if ($(document).find("#content-wrapper").hasClass('ui-resizable')) {
                        $(document).find("#content-wrapper").resizable();
                        $(document).find("#content-wrapper").resizable('destroy');
                    }
                }
            } else {
                $('#content-wrapper').width(100 * window.innerWidth * 91.6667 / 10000);
            }
            wkpos.emit('afterPosBodyResize', {});
            updateSyncStatus();
        }


        function updateSyncStatus() {
            var posOrder = $.parseJSON(localStorage.pos_orders);
            if (typeof viewModel != 'undefined') {
                if (posViewModel.navigatorOnline() && typeof posOrder != 'undefined' && posOrder && Object.keys(posOrder).length) {
                    viewModel.emptyOfflineOrders(true);
                } else {
                    viewModel.emptyOfflineOrders(false);
                }
            }
        }

        function blockDevloperMode() {
            document.addEventListener("contextmenu", function (e) {
                e.preventDefault();
            }, false);
            document.addEventListener("keydown", function (e) {
                //document.onkeydown = function(e) {
                // "I" key
                if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
                    disabledEvent(e);
                }
                // "J" key
                if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
                    disabledEvent(e);
                }
                // "S" key + macOS
                if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                    disabledEvent(e);
                }
                // "U" key
                if (e.ctrlKey && e.keyCode == 85) {
                    disabledEvent(e);
                }
                // "F12" key
                if (event.keyCode == 123) {
                    disabledEvent(e);
                }
            }, false);
        }

        function disabledEvent(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }
            e.preventDefault();
            return false;
        }

        function disabledUserSelection() {
            $("body").css("-webkit-user-select", "none");
            $("body").css("-moz-user-select", "none");
            $("body").css("-ms-user-select", "none");
            $("body").css("-o-user-select", "none");
            $("body").css("user-select", "none");
        }

        $(document).ready(function () {
            key = 'wkpos_outlet_session_' + idEmployee + '_' + idWkPosOutlet;

            $(window).trigger('resize');
            // navigator.onLine = false;
            Object(_wkindexeddb_js__WEBPACK_IMPORTED_MODULE_12__["createIndexDBConnection"])(dbName, dbVersion);
            wkposApplyBinding();
            Object(_session_js__WEBPACK_IMPORTED_MODULE_11__["loadSession"])();
            var fullscreenElement = document.getElementById("wkpos_full_screen");
            // dragElement(fullscreenElement);
            fullscreenElement.addEventListener('click', function () {
                toggleFullScreen();
            });
            $(window).bind('beforeunload', function (e, data) {
                if (confirmBeforeLoad) {
                    return '';
                }
            });

            var target = document.querySelector('#wkpos-product-search input');
            target.addEventListener('paste', (event) => {
                let paste = (event.clipboardData || window.clipboardData).getData('text');
                $('#wkpos-product-search input').keyup();
            });

            disabledUserSelection();
            // blockDevloperMode();
            // if (posController == 'sale') {
            //     if (typeof posSession == 'undefined') {
            //         window.location.href = posSessionLink;
            //     }
            //     if (posViewModel.sessionStatus() != 1) {
            //     }
            // }

            // localStorage.sessionStatus = posSessionStatus;

            $('.order_discount').on('focus', function () {
                if ($(this).val() == 0) {
                    $(this).val('');
                }
            });

            window.addEventListener("orientationchange", function () {
                // Announce the new orientation number
                if (posViewModel.bodyPanel() == 'customers' || posViewModel.bodyPanel() == 'customers') {
                    var isMobile = window.matchMedia("only screen and (max-width: 991px)");
                    if (isMobile.matches) {
                        wkposBodySize(true);
                        viewModel.displayCart(1);
                    } else {
                        viewModel.displayCart(0);
                        wkposBodySize(false);
                    }
                }
            }, false);

            setInterval(function () {
                var countx = $('#home > ul >li').length;
                viewModel.currentGetNoOfItems(countx);
            }, 300);

            startOnScan()
        });

        function startOnScan() {
            onScan.attachTo(document, {
                suffixKeyCodes: [13],
                reactToPaste: true,
                onScan: function (sCode, iQty) {
                    $('#wkpos-product-search > div > input').val(sCode);
                    var e = $.Event("keypress");
                    e.which = 13;
                    e.keyCode = 13;
                    $('#wkpos-product-search > div > input').trigger(e);
                    var e = $.Event("keydown");
                    e.which = 13;
                    e.keyCode = 13;
                    $('#wkpos-product-search > div > input').trigger(e);
                    var e = $.Event("keyup");
                    e.which = 13;
                    e.keyCode = 13;
                    $('#wkpos-product-search > div > input').trigger(e);
                },
                onKeyDetect: function (iKeyCode) {
                    // console.log('Pressed: ' + iKeyCode);
                }
            });
        }

        function toggleFullScreen() {
            if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                if (document.documentElement.requestFullScreen) {
                    document.documentElement.requestFullScreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullScreen) {
                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                }
                $('#wkpos_full_screen_img').attr('title', exitFullScreen);
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
                $('#wkpos_full_screen_img').attr('title', enterFullScreen);
            }
        }

        getAllProducts = async function (page = 0, limit = 0) {
            return new Promise(resolve => {
                $.ajax({
                    url: posSales,
                    dataType: 'json',
                    type: 'get',
                    data: {
                        action: 'getAllProducts',
                        ajax: true,
                        page: page,
                        limit: limit,
                        posToken: posToken
                    },
                    success: function (response) {
                        if (response.hasError) {
                            $.each(response.errors, function (index, error) {
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                // $.growl.error({ title: "", message: error });
                            });
                        } else {
                            $('.progress-bar').addClass('progress-bar-success').css('width', '20%');
                            $('.wk-loading-status').html(loadingPosProduct).css('color', 'green');
                            // pos_products = response['products'];
                            pos_products = mergeObject(pos_products, response['products']);
                            if (page == 0) {
                                categoryWiseProducts = response['category_wise_id_product'];
                                defaultTaxRate = response['taxRate'];
                            }
                            if (response['count_products'] == limit && limit != 0) {
                                getAllProducts(response['next_page']);
                            } else {
                                Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["storeProduct"])(pos_products);
                                Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["updateStoreProduct"])(pos_products);
                                posOnlineProducts = pos_products;
                                if (localStorage) {
                                    // localStorage.pos_products = JSON.stringify(pos_products);
                                    if (localStorage.currentCartId === undefined) {
                                        localStorage.currentCartId = JSON.stringify(0);
                                    }
                                    if (localStorage.selectedCartId === undefined) {
                                        localStorage.selectedCartId = parseInt(0);
                                    }
                                    var posCart = $.parseJSON(localStorage.pos_cart);
                                    if (posCart === undefined || posCart == null) {
                                        pos_cart = { [localStorage.selectedCartId]: {} };
                                        localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
                                    }
                                }
                            }
                            resolve(true);
                            // getAllCategories();
                        }
                    },
                    error: function (jqXHR, exception) {
                        Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_13__["ajaxResposeError"])(jqXHR, exception);
                        posError = errorPosProduct + '<br>';
                        $('.wk-loading-status').html(posError).css('color', 'red');
                        $('.progress-bar').addClass('progress-bar-danger').css('width', '20%');
                        resolve(false);
                        // getAllCategories();
                    }
                });
            });
        }

        updatePosCartWithCurrencyUpdate = async function () {
            let cartIndex = viewModel.posCarts()[localStorage.selectedCartId].posCartId() - 1;
            let allCart = $.parseJSON(localStorage.pos_cart);
            if (typeof allCart != 'undefined' && typeof allCart[cartIndex] != 'undefined') {
                allCart[cartIndex] = {};
                localStorage.setItem('pos_cart', JSON.stringify(allCart));
            }
        }


        function mergeObject(obj, src) {
            Object.keys(src).forEach(function (key) { obj[key] = src[key]; });
            return obj;
        }

        getAllCategories = function () {
            return new Promise(resolve => {
                $.ajax({
                    url: posSales,
                    dataType: 'json',
                    type: 'get',
                    data: {
                        action: 'getAllCategories',
                        ajax: true,
                        posToken: posToken
                    },
                    success: function (json) {
                        if (json.hasError) {
                            $.each(json.errors, function (index, error) {
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                // $.growl.error({ title: "", message: error });
                            });
                        } else {
                            $('.wk-loading-status').html(loadingPosCategory).css('color', 'green');
                            $('.progress-bar').css('width', '60%');
                            categories = json['categories'];
                            // getAllCustomers();
                            resolve(true);
                        }
                    },
                    error: function (jqXHR, exception) {
                        Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_13__["ajaxResposeError"])(jqXHR, exception);
                        posError += errorPosCategory + '<br>';
                        $('.wk-loading-status').html(posError).css('color', 'red');
                        $('.progress-bar').addClass('progress-bar-danger').css('width', '60%');
                        // getAllCustomers();
                        resolve(false);
                    },
                });
            });
        }

        getAllCustomers = function (noContinue = false, page = 0, limit = 0) {
            return new Promise(resolve => {
                $.ajax({
                    url: posSales,
                    dataType: 'json',
                    type: 'get',
                    data: {
                        action: 'getAllCustomers',
                        ajax: true,
                        page: page,
                        limit: limit,
                        posToken: posToken
                    },
                    success: function (json) {
                        if (json.hasError) {
                            $.each(json.errors, function (index, error) {
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                // $.growl.error({ title: "", message: error });
                            });
                        } else {
                            if (typeof json != null) {
                                customers = mergeObject(customers, json['customers']);
                                customers = json['customers'];
                                if (page == 0) {
                                    $('.wk-loading-status').html(loadingPosCustomers).css('color', 'green');
                                    $('.progress-bar').css('width', '80%');
                                    groups = json['customerGroups'];
                                    genders = json['genders'];
                                    outletAddress = json['outlet_address'];
                                }
                                if (noContinue && json['count_customers'] == limit && limit != 0) {
                                    getAllCustomers(noContinue, json['next_page']);
                                }
                            }
                            resolve(true);
                            // if (!nocontinue) {
                            //     getAllOrders();
                            // }
                        }
                    },
                    error: function (jqXHR, exception) {
                        Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_13__["ajaxResposeError"])(jqXHR, exception);
                        posError += errorPosCustomers + '<br>';
                        $('.wk-loading-status').html(posError).css('color', 'red');
                        $('.progress-bar').addClass('progress-bar-danger').css('width', '80%');
                        // getAllOrders();
                        resolve(false);
                    },
                });
            });
        }

        getAllOrders = function () {
            return new Promise(resolve => {
                var orderData = {};
                orderData['action'] = 'getAllOrders';
                orderData['ajax'] = true;
                orderData['posToken'] = posToken;
                if (loaded == 0) {
                    orderData['viewmodel'] = 1;
                }
                $.ajax({
                    url: posSales,
                    dataType: 'json',
                    type: 'get',
                    data: orderData,
                    success: function (orders) {
                        if (orders.hasError) {
                            $.each(orders.errors, function (index, error) {
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                // $.growl.error({ title: "", message: error });
                            });
                        } else {
                            $('.wk-loading-status').html(loadingPosOrders).css('color', 'green');
                            $('.progress-bar').css('width', '100%');
                            posOrders = orders;
                            if (loaded == 0) {
                                wkposApplyBinding();
                            }
                            loaded = 1;
                            setTimeout(function () {
                                $('#loader').css('display', 'none');
                                $('.wk-pos').removeClass('hidden hide');
                                $('.wk-pos').show();

                                $('.wk-loading-pos-details, .progress, #loading-text').addClass('hide');
                            }, 700);
                            resolve(true);
                        }
                    },
                    error: function (jqXHR, exception) {
                        Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_13__["ajaxResposeError"])(jqXHR, exception);
                        posError += errorPosOrders + '<br>';
                        $('.wk-loading-status').html(posError).css('color', 'red');
                        $('.progress-bar').addClass('progress-bar-danger').css('width', '100%');
                        if (loaded == 0) {
                            wkposApplyBinding();
                        }
                        loaded = 1;
                        setTimeout(function () {
                            $('#loader').css('display', 'none');
                            $('.wk-pos').removeClass('hidden hide');
                            $('.wk-pos').show();
                            $('.wk-loading-pos-details, .progress, #loading-text, #error-text').addClass('hide');
                        }, 5000);
                        resolve(false);
                    }
                });
            });
        }

        PosModel = function () {
            var self = this;
            self.bodyPanel = ko.observable("products");
            self.enableRefund = ko.observable(false);
            self.rightColumnPage = ko.observable('pos_cart');
            self.confirmClose = ko.observable(0);
            if (parseInt(posSessionStatus)) {
                posSession = getCookie(key);
            }
            self.navigatorOnline = ko.observable(navigator.onLine);
            self.sessionStatus = ko.observable(parseInt(posSessionStatus));
            self.controlSession = ko.observable(parseInt(controlSession));
            self.errors = ko.observableArray([]);
            // if (typeof posSession != 'undefined') {
            // } else {
            //     self.sessionStatus = ko.observable(0);
            // }
            self.newSessionStatus = ko.observable(0);
            self.cashierName = ko.observable(employeeName);
            // this.contentModel = new PosProductsViewModel()
            // this.headerModel = new PosSessionViewModel();

            self.displayCurrency = ko.observable(true);

            self.changeCurrency = function (data, event) {
                var status = confirm(changeCurrencyMsg);
                if (status) {
                    updatePosCartWithCurrencyUpdate();
                    confirmBeforeLoad = false;
                    window.location.href = data;
                }
            }
        };

        // modelList = {
        //     'contentModel': 'PosProductsViewModel'
        // };

        PosViewModel = function () {
            var self = this;
            PosModel.call(self);
            this.contentModel = new PosProductsViewModel(PosModel);
            // $.each(modelList, function(index, model) {
            //     self[index] = new window[model](PosModel);
            // });
            // if (posController == 'sale') {
            // }
            // this.sessionModel = new PosSessionViewModel(PosModel);
        };

        function wkposApplyBinding() {
            wkpos.emit('beforeBinding', {});
            posViewModel = new PosViewModel();
            viewModel = posViewModel.contentModel;
            // viewModel.updateFocusType();
            wkpos.emit('afterPosModel', { 'posModel': posViewModel });
            ko.applyBindings(posViewModel);
            wkposBodySize();
            if (posController != 'session'
                && typeof autoPrinterConnect != 'undefined'
                && autoPrinterConnect == 1
                && wkposPrintType == 1
            ) {
                try {
                    viewModel.connectPrinter();
                } catch (e) {
                    console.log(e);
                }
            }
        }

        function PosLeftPanelViewModel(params) {
            return {
                activeClass: params.activeClass,
                iconClass: "fa fa-" + params.icon,
                panelConentHeading: params.panelConentHeading,
            };
        }

        getPOSDetails = async function () {
            if (posController != 'session') {
                await Promise.all([await getAllProducts(), await getAllCategories(), await getAllCustomers(), await getAllOrders()]);
            }
        }

        function set_cookie(name, value) {
            document.cookie = name + '=' + value + '; Path=/;';
        }
        function delete_cookie(name) {
            document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        PosProductsViewModel = function (PosModel) {
            var self = this;
            PosModel.call(self);

            self.cashRegisterStatus = ko.observable(cashRegisterStatus);

            self.products = ko.observableArray([]);
            self.loadedProducts = ko.observableArray([]);
            self.loadedCustomers = ko.observableArray([]);
            self.loadedOrders = ko.observableArray([]);
            self.categories = ko.observableArray([]);
            self.remainingCategories = ko.observableArray([]);
            self.productCart = ko.observableArray([]);
            self.productCombination = ko.observableArray([]);
            self.productAttribute = ko.observableArray([]);
            self.posCarts = ko.observableArray([]);

            self.selectedCombinationProductName = ko.observable('');

            self.customerName = ko.observable();
            self.customerPhone = ko.observable(null);
            self.customerAddresses = ko.observableArray([]);
            self.customerAddressesDetails = ko.observableArray([]);
            self.selectedIdAddress = ko.observable(idOutletAddress);
            self.selectedIdAddressIndex = ko.observable(0);
            self.selectedCustomerIndex = ko.observable(0);
            self.customerContact = ko.observable();
            self.issetCustomer = ko.observable(0);

            self.digitalSign = ko.observable('');
            self.giftCardB = ko.observableArray([]);

            self.customProductName = ko.observable('');
            self.customProductPrice = ko.observable('');
            self.customProductQuantity = ko.observable('');
            self.customProductTax = ko.observable(0);

            self.address1 = ko.observable();
            self.address2 = ko.observable();
            self.customerEmail = ko.observable();
            self.aliasName = ko.observable(null);
            self.city = ko.observable(null);
            self.firstName = ko.observable(null);
            self.lastName = ko.observable(null);
            self.company = ko.observable(null);
            self.vatNumber = ko.observable(null);
            self.postcode = ko.observable(null);
            self.selectedIdCountry = ko.observable(0);
            self.selectedIdState = ko.observable();
            self.homePhone = ko.observable(null);
            self.phone = ko.observable(null);
            self.other = ko.observable(null);

            self.stateList = ko.observableArray([]);

            self.idCustomer = ko.observable();
            self.selectedCustomerName = ko.observable();
            self.selectedCustomerId = ko.observable();
            self.selectedCustomerIdGroup = ko.observable();
            self.customers = ko.observableArray([]);
            self.customerDetail = ko.observable();
            // self.customerPayAmount = ko.observable(0.00);

            self.posShipping = ko.observableArray([]);
            self.selectedIdCarrier = ko.observable(0);
            self.selectedCarrierName = ko.observable(noCarrier);
            self.selectedIdCarrierCost = ko.observable(0);

            self.idOrder = ko.observable(0);
            self.activeCustomerId = ko.observable(0);
            self.updateAction = ko.observable("qty");
            self.selectedOrderType = ko.observable("history");
            self.orderDetails = ko.observableArray([]);
            self.orderHistory = ko.observableArray([]);
            self.orderedProducts = ko.observableArray([]);
            self.orderedProductsDetail = ko.observableArray([]);
            self.selectedPaymentOption = ko.observable(defaultPaymentMethod);
            self.selectedPaymentId = ko.observable(defaultIdPaymentMethod);
            self.selectedOrderId = ko.observable();
            self.selectedOrderReference = ko.observable();
            self.selectedCategory = ko.observable(0);
            self.orderPrint = ko.observableArray([]);
            self.selectedCartProduct = ko.observable('');
            self.selectedCartProductIndex = ko.observable(0);
            self.selectedSortType = ko.observable('');
            self.customerHeading = ko.observable("");
            self.confirmDisabled = ko.observable(0);
            self.selectedCombinationImage = ko.observable('');

            // Reward Points variable
            self.availablePoints = ko.observable(0);
            self.pointsWorth = ko.observable(0);
            self.zeroPrice = ko.observable(0);
            self.showRewardPoint = ko.observable(0);
            /* End */

            /* Vouchers */
            self.availableVouchers = ko.observableArray([]);
            self.appliedVouchers = ko.observableArray([]);
            self.totalOrderAmount = ko.observable();
            self.totalOrderAmountPaid = ko.observable(0.0);
            /* End */

            /* Installment */
            self.reset = ko.observable(true);
            self.installment = ko.observable(2);
            self.installmentAmount = ko.observable(500);
            /* END */

            /* Order Return */
            self.enableOrderReturn = ko.observable(0);
            self.enableOrderEdit = ko.observable(0);
            self.alreadyRefund = ko.observable(0);
            self.currentSelectedOrderIndex = ko.observable(-1);
            self.showCreditSlip = ko.observable(0);
            /* END */

            /* Partial Payment */
            self.paymentOptions = ko.observableArray([]);
            self.selectedPaymentOptionIndex = ko.observable(-1);
            /* End */
            self.emptyOfflineOrders = ko.observable(false);

            self.printerConnected = ko.observable(false);
            self.selectedPrinter = ko.observable(selectedPrinterName);

            self.showCreditSlipSecond = ko.observable(0);
            self.creditSlipSecond = ko.observableArray([]);

            self.showPriceWithoutReduction = ko.observable(showPriceWithoutReduction);
            self.showStockLocation = ko.observable(showStockLocation);

            self.currentGetNoOfItems = ko.observable(0);

            objPosProductsViewModel = self;

            self.orderRemainingAmount = ko.observable(self.totalOrderAmount());
            self.remainingTotalAmount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["asyncComputed"])(function () {
                var total = parseFloat(self.totalOrderAmount()) - parseFloat(self.totalOrderAmountPaid());
                var formattedAmount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["wkFormatCurrency"])(total, currencyFormat);
                self.orderRemainingAmount(total);
                return formattedAmount;
            }, this);

            self.currentCartId = ko.observable(localStorage.selectedCartId);
            self.orderMessage = ko.observable('');
            self.isOrderReturnable = ko.observable(false)

            if (!(ko.components.isRegistered('wkpos-left-panel'))) {
                ko.components.register('wkpos-left-panel', {
                    viewModel: PosLeftPanelViewModel,
                    template: '<div class="wksidepanel button-payment" id="button-home" data-bind="click: $root.contentModel.onClickSidePanel, css: {\'wkpos-text-color\': $root.bodyPanel() == activeClass }, attr: { title: panelConentHeading }"><i data-bind="css: iconClass"></i><div class="hidden-sm" data-bind="text: panelConentHeading"></div></div>'
                });
            }
            if (!(ko.components.isRegistered('update-cart-details'))) {
                ko.components.register('update-cart-details', {
                    viewModel: _poscart_js__WEBPACK_IMPORTED_MODULE_3__["PosCartViewModel"],
                    template: '<li class="letter col-xs-3" data-bind="attr: { value: buttonValue }, text: buttonText, click: $root.contentModel.updateProduct, css: {\'cart-product-selected\': $root.contentModel.updateAction() == activeClass }"></li>'
                });
            }
            if (!(ko.components.isRegistered('update-payment-details'))) {
                ko.components.register('update-payment-details', {
                    viewModel: _poscart_js__WEBPACK_IMPORTED_MODULE_3__["PosCartViewModel"],
                    template: '<li class="letter col-xs-3" data-bind="attr: { value: buttonValue }, text: buttonText, click: $root.contentModel.updatePaymentDetails"></li>'
                });
            }

            if (posSessionStatus == 1 && typeof getCookie(key) != 'undefined') {
                Object(_session_js__WEBPACK_IMPORTED_MODULE_11__["loadSession"])();
            }

            window.addEventListener('online', updateStatus);
            window.addEventListener('offline', updateStatus);

            function updateStatus() {
                posViewModel.navigatorOnline(navigator.onLine);
                updateSyncStatus();
                if (navigator.onLine == false) {
                    taxRate = undefined;
                    self.updateTaxRate(defaultTaxRate, true);
                    self.selectedPaymentOption(defaultPaymentMethod);
                    self.selectedPaymentId(defaultIdPaymentMethod);
                    self.selectedIdAddress(outletAddress['id_address']);
                    if (posViewModel.bodyPanel() == 'shipping') {
                        posViewModel.bodyPanel('products');
                        self.checkBodyPanel('products');
                        Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["listenForScrollEvent"])();
                        self.resetShipping();
                    }
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(networkError);
                } else {
                    // posViewModel.bodyPanel('products');
                    // self.checkBodyPanel('products');
                    Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["listenForScrollEvent"])();
                    Object(_tax_js__WEBPACK_IMPORTED_MODULE_9__[/* getTaxRate */ "a"])();
                }
                wkposBodySize();
            }

            // focusSearchProductField('products');
            function focusSearchProductField(type) {
                var BarcodeScanerEvents = function () {
                    this.initialize.apply(this, arguments, type);
                };

                BarcodeScanerEvents.prototype = {
                    initialize: function () {
                        $(document).on({
                            keyup: $.proxy(this._keyup, this)
                        });
                    },
                    _timeoutHandler: 0,
                    _inputString: '',
                    _keyup: function (e, data) {
                        if (this._timeoutHandler) {
                            clearTimeout(this._timeoutHandler);
                        }
                        this._inputString += String.fromCharCode(e.which);

                        this._timeoutHandler = setTimeout($.proxy(function () {
                            if (this._inputString.length <= 3) {
                                this._inputString = '';
                                return;
                            }
                            if (posViewModel.bodyPanel() == 'products')
                                switch (posViewModel.bodyPanel()) {
                                    case 'products':
                                        $(document).find('#wkpos-product-search input').focus();
                                        viewModel.productSearchKey(this._inputString);
                                        viewModel.searchProduct(null, e);
                                        break;
                                    case 'customers':
                                        $(document).find('#wk-customer-panel .wkpos-search input').focus();
                                        viewModel.customerSearchKey(this._inputString);
                                        viewModel.searchCustomer(null, e);
                                        break;
                                    case 'orders':
                                        $(document).find('#wk-order-panel .wkpos-search input').focus();
                                        viewModel.orderSearchKey(this._inputString);
                                        viewModel.searchOrder(null, e);
                                        break;
                                    default:
                                }
                            $(document).trigger('onbarcodescaned', this._inputString);

                            this._inputString = '';

                        }, this), 20);
                    }
                };

                new BarcodeScanerEvents();
            }

            //check the internet connection
            self.toggleNavigator = function () {
                updateStatus();
                wkposBodySize();
            }

            self.emitBeforeEvents = function (event, data) {
                event = capitalizeFLetter(event);
                return wkpos.emit('before' + event, data);
            }
            self.emitAfterEvents = function (event, data) {
                event = capitalizeFLetter(event);
                return wkpos.emit('after' + event, data);
            }

            function capitalizeFLetter(string) {
                return string[0].toUpperCase() + string.slice(1);
            }
            //Add new cart
            self.createNewCart = function (data, event) {
                self.emitBeforeEvents('createNewCart', { 'data': data, 'event': event });
                Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["createNewCart"])();
                self.resetCartCalculator();
                self.emitAfterEvents('createNewCart', { 'data': data, 'event': event });
            }

            //Remove selected cart with all products
            self.removeSelectedCart = function (data, event) {
                var check;
                if (data != undefined) {
                    check = confirm(deleteCartMessage);
                } else {
                    check = true;
                }
                if (check == true) {
                    self.emitBeforeEvents('removeSelectedCart', { 'data': data, 'event': event });
                    Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["removeSelectedCart"])(this);
                    self.resetCartCalculator();
                    self.emitBeforeEvents('removeSelectedCart', { 'data': data, 'event': event });
                }
                else {
                    return false;
                }

            }

            self.combinationAvalQty = ko.observable(0);
            self.combinationStockLocation = ko.observable('');
            self.combinationDisplayPriceWithoutReduction = ko.observable('');
            self.combinationQuantity = ko.observable(0);
            // self.combinationPrice = ko.observable(0);
            self.combinationUnitPrice = ko.observable(0);
            self.eventTarget = ko.observable(false);

            self.errorIterator = function (errors) {
                $.each(errors, function (index, error) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                });
            }
            //Add Product to the selected Cart
            self.addProductToCart = function (data, event) {
                self.emitBeforeEvents('addProductToCart', { 'data': data, 'event': event });
                // wkpos.emit('beforeAddProductToCart', {'data': data, 'event': event});
                //check whether the combination of product exist or not
                if (posViewModel.errors().length == 0) {
                    Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["addProductToCart"])(data, event);
                    self.resetCartCalculator();
                } else {
                    self.errorIterator(posViewModel.errors());
                }
                // wkpos.emit('afterAddProductToCart', {'data': data, 'event': event});
                self.emitBeforeEvents('addProductToCart', { 'data': data, 'event': event });
            }

            self.updateCombinationImage = function (idProduct, idProductAttr) {
                if (typeof pos_products[idProduct]['combination_images'] != 'undefined'
                    && pos_products[idProduct]['combination_images']
                ) {
                    if (typeof pos_products[idProduct]['combination_images'][idProductAttr] != 'undefined'
                        && typeof pos_products[idProduct]['combination_images'][idProductAttr][0] != 'undefined') {
                        self.selectedCombinationImage(pos_products[idProduct]['combination_images'][idProductAttr][0]);
                    } else {
                        self.selectedCombinationImage(pos_products[idProduct].image);
                    }
                } else {
                    self.selectedCombinationImage(pos_products[idProduct].image);
                }
            }

            /* Update the selected combination */
            self.selectCombination = async function (data, event) {
                var selectedCombinationId = [];
                var pos_products = await Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["getAllPosProducts"])();
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

                if (typeof(pos_products[data.idProduct()]['combination_details'][selectedCombinationId]) == 'undefined') {
                    var selectedCombinationId = [];
                    var pos_products = await Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["getAllPosProducts"])();
                    selectedCombinationId.push(data.idAttribute());
                    for (var i = 0; i < viewModel.productCombination().length; i++) {
                        for (var j = 0; j < viewModel.productCombination()[i].productAttribute().length; j++) {
                            if (viewModel.productCombination()[i].productAttribute()[j].idAttribute() == data.idAttribute()) {
                                viewModel.productCombination()[i].productAttribute()[j].selected("selected");
                            } else {
                                viewModel.productCombination()[i].productAttribute()[j].selected("");
                            }
                        }
                    }
                } else
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
                    viewModel.combinationUnitPrice(parseFloat(combiPrice), currencyFormat);
                    combiPrice *= viewModel.combinationQuantity();
                    // viewModel.combinationPrice(wkFormatCurrency(parseFloat(combiPrice), currencyFormat));
                    // viewModel.combinationPrice(wkFormatCurrency(parseFloat(selectedCombinationDetail['price']), currencyFormat));
                    // customization
                    var idProductAttribute = selectedCombinationDetail['id_product_attribute'];
                    viewModel.updateCombinationImage(data.idProduct(), idProductAttribute);
                    viewModel.combinationQuantity(parseInt(selectedCombinationDetail['minimal_quantity']));
                    viewModel.combinationAvalQty(selectedCombinationDetail['quantity']);
                    viewModel.combinationStockLocation(selectedCombinationDetail['stock_location']);
                    viewModel.combinationDisplayPriceWithoutReduction(selectedCombinationDetail['priceWithoutReduction']);
                    // End
                } else {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(combinationNotExist);
                    // $.growl.error({ title: "", message: combinationNotExist });
                }
            }

            /* Add selected combination to the cart */
            self.addCombinationToCart = function (data, event) {
                self.emitBeforeEvents('addCombinationToCart', { 'data': data, 'event': event });
                Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["addCombinationToCart"])();
                self.emitBeforeEvents('addCombinationToCart', { 'data': data, 'event': event });
            }

            /* Update the selected Product in the selected cart */
            self.selectCartItems = function (data, event) {
                self.resetCartCalculator();
                if (localStorage.pos_cart) {
                    pos_cart = JSON.parse(localStorage.pos_cart);
                };
                var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                pos_cart[cartIndex]['selectedCartItemIndex'] = self.productCart().indexOf(data);
                self.selectedCartProduct(data.idProduct() + 'c' + data.idProductAttribute);
                self.selectedCartProductIndex(self.productCart().indexOf(data));
                qty = 0;
                localStorage.setItem("pos_cart", JSON.stringify(pos_cart));
            }

            self.resetCartCalculator = function () {
                var params = {
                    'buttonValue': 'qty',
                    'buttonText': 'Qty'
                };
                Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["updateProduct"])(new _poscart_js__WEBPACK_IMPORTED_MODULE_3__["PosCartViewModel"](params), true);
                self.reset(true);
            }

            /* Switch between the carts on hold */
            self.switchCart = function (data, event) {
                Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["switchCart"])(data);
                self.resetCartCalculator();
            }

            /* Update the selected product details in cart */
            self.updateProduct = function () {
                Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["updateProduct"])(this);
            }

            /* Update the details of payment option selected in the product */
            self.selectPaymentOption = function (paymentMethod) {
                var payment = paymentMethod.split(", ");
                self.selectedPaymentOption(payment[0]);
                self.selectedPaymentId(payment[1]);
                self.installmentAmount(self.totalOrderAmount());
                var dueAmount = self.totalOrderAmount() - self.customerPayAmount();
                var addedPayments = self.paymentOptions();
                var addPayment = true;
                if (addedPayments.length > 0) {
                    $.each(addedPayments, function (idx, pOpt) {
                        if (parseInt(payment[1]) == parseInt(pOpt['id_wkpos_payment'])) {
                            if (dueAmount > 0) {
                                addPayment = false;
                                var tenderAmount = parseFloat(dueAmount) + parseFloat(pOpt.tendered());
                                tenderAmount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(tenderAmount);

                                addedPayments[idx].tendered(tenderAmount);
                                addedPayments[idx].dueAmount(tenderAmount);
                            }
                            self.selectedPaymentOptionIndex(idx);
                        } else {
                            if (dueAmount > 0) {
                                addedPayments[idx].dueAmount(parseFloat(pOpt.tendered()));
                            }
                        }
                    });
                    if (dueAmount > 0) {
                        self.paymentOptions(addedPayments);
                    }
                }
                if (dueAmount > 0) {
                    if (addPayment) {
                        var tenderedamount = 0;
                        var autofillTenderedamount = true;
                        dueAmount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(dueAmount));
                        if (autofillTenderedamount) {
                            tenderedamount = dueAmount;
                        }
                        var data = {
                            id_wkpos_payment: payment[1],
                            dueAmount: dueAmount,
                            tendered: tenderedamount,
                            paymentMethod: payment[0]
                        };
                        if (self.selectedPaymentOptionIndex() == -1) {
                            self.selectedPaymentOptionIndex(0);
                        }
                        var index = self.paymentOptions.push(new _payment_js__WEBPACK_IMPORTED_MODULE_14__[/* PaymentOption */ "a"](data));
                        self.selectedPaymentOptionIndex(index - 1);
                    }
                    // var tenderedamount = 0;
                    // var autofillTenderedamount = true;
                    // dueAmount = dueAmount.toFixed(psPrecision);
                    // if (autofillTenderedamount) {
                    //     tenderedamount = dueAmount;
                    // }
                    // var data = {
                    //     id_wkpos_payment: payment[1],
                    //     dueAmount: dueAmount,
                    //     tendered: tenderedamount,
                    //     paymentMethod: payment[0]
                    // };
                    // if(self.selectedPaymentOptionIndex() == -1) {
                    //     self.selectedPaymentOptionIndex(0);
                    // }
                    // var index = self.paymentOptions.push(new PaymentOption(data));
                    // self.selectedPaymentOptionIndex(index - 1);
                }
                self.emitAfterEvents('selectPaymentOption', { 'data': data, 'event': event });
            }

            self.selectOrderPayment = function (orderPayment) {
                var index = self.paymentOptions.indexOf(orderPayment);
                self.selectedPaymentOptionIndex(index);
            }

            self.removePaymentOption = function (data) {
                self.paymentOptions.remove(data);
                var index = self.paymentOptions().length - 1;
                self.selectedPaymentOptionIndex(index);
            }

            /* Calculate the subTotal amount of the cart */
            self.subTotal = ko.computed(function () {
                var total = 0;
                var productCart = self.productCart();
                for (var i = 0; i < productCart.length; i++) {
                    total = parseFloat(total) + parseFloat(productCart[i].taxExcludedPrice()) * productCart[i].productQuantity();
                    if (productCart[i].productDiscount() > 0) {
                        total -= (parseFloat(productCart[i].taxExcludedPrice()) * parseInt(productCart[i].productQuantity()) * parseFloat(productCart[i].productDiscount())) / 100;
                    }
                }
                total = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(total));
                return total;
            }, this);

            self.combinationPrice = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["asyncComputed"])(function () {
                var combiPrice = self.combinationUnitPrice() * self.combinationQuantity();
                return Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["wkFormatCurrency"])(parseFloat(combiPrice), currencyFormat);
            }, this);
            /* Calculate the subTotal amount of the cart */
            self.updateCombinationPrice = ko.computed(function () {
                if (isNaN(self.combinationQuantity()) || self.combinationQuantity() < 1) {
                    self.combinationQuantity(1);
                }
                // var combiPrice = self.combinationUnitPrice() * self.combinationQuantity();
                // // formatCurrencyCldr(parseFloat(combiPrice), function(price) {
                // //     self.combinationPrice(price);
                // // });
                // self.combinationPrice = asyncComputed(function () {
                //     return wkFormatCurrency(parseFloat(combiPrice), currencyFormat);
                // }, this);
            }, this);

            /* Calculate the total tax amount of the cart */
            self.totalTax = ko.computed(function () {
                var total = 0;
                var productCart = self.productCart();
                for (var i = 0; i < productCart.length; i++) {
                    var discountedPrice = parseFloat(productCart[i].taxExcludedPrice()) * productCart[i].productQuantity();
                    if (productCart[i].productDiscount() > 0) {
                        discountedPrice -= (discountedPrice * parseFloat(productCart[i].productDiscount()) / 100);
                    }
                    if (psRoundType == 1) {
                        total = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(total));
                        var orderDiscountTotal = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])((discountedPrice * productCart[i].taxRate()) / 100);
                        total = parseFloat(total) + parseFloat(orderDiscountTotal);
                    } else if (psRoundType == 2) {
                        total = parseFloat(total) + (discountedPrice * productCart[i].taxRate()) / 100;
                        total = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(total));
                        total = total;
                    } else {
                        total = parseFloat(total) + (discountedPrice * productCart[i].taxRate()) / 100;
                    }
                }
                if (isNaN(total)) {
                    total = 0;
                }
                if (psRoundType == 3) {
                    total = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(total));
                    return total;
                }
                return total;
            }, this);

            self.isCartActive = function () {
                self.posCarts()[localStorage.selectedCartId].isCartActive("active");
            }

            self.orderDiscount = ko.observable(0);

            self.decreaseCombinationQuantity = function (data, event) {
                if (self.combinationQuantity() > 1) {
                    self.combinationQuantity(parseInt(self.combinationQuantity()) - 1);
                }
            }
            self.increaseCombinationQuantity = function (data, event) {
                if (self.combinationQuantity()) {
                    var idProduct, selectedCombination = Array();
                    var produtAttribute, attributeName;
                    /* Generate the selected combination Index */
                    for (var i = 0; i < self.productCombination().length; i++) {
                        produtAttribute = self.productCombination()[i].productAttribute();
                        for (var j = 0; j < produtAttribute.length; j++) {
                            if (produtAttribute[j].selected() == "selected") {
                                idProduct = produtAttribute[j].idProduct();
                                selectedCombination.push(produtAttribute[j].idAttribute());
                                break;
                            }
                        }
                    }
                    selectedCombination = selectedCombination.sort(function (a, b) { return a - b }).join('-');
                    if (pos_products[idProduct]['combination_details'] !== undefined
                        && (parseInt(pos_products[idProduct]['combination_details'][selectedCombination]['quantity']) > 0
                            || Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["checkOutofStockAllow"])(pos_products[idProduct]))
                        && (parseInt(pos_products[idProduct]['combination_details'][selectedCombination]['quantity']) >= parseInt(self.combinationQuantity())
                            || Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["checkOutofStockAllow"])(pos_products[idProduct]))
                        && pos_products[idProduct]['availableForOrder'] == 1
                    ) {
                        self.combinationQuantity(parseInt(self.combinationQuantity()) + 1);
                    } else if (pos_products[idProduct]['availableForOrder'] == 0) {
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(wkProductNotAvailable);
                        // $.growl.error({ title: "", message: wkProductNotAvailable });
                    } else {
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(pos_products[idProduct]['name'] + ' ' + wkQuantityNotifi);
                        // $.growl.error({ title: "", message: wkQuantityNotifi });
                    }
                }
            }

            /* Calculate the total amount of the cart */
            self.total = ko.computed(function (data, event) {
                if (isNaN(self.orderDiscount())) {
                    self.orderDiscount(0);
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(invalidOrderDiscount);
                    // $.growl.error({ title: "", message: invalidOrderDiscount });
                }
                if (!Number.isInteger(parseInt(self.orderDiscount()))) {
                    self.orderDiscount(0);
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(invalidOrderDiscount);
                    // $.growl.error({ title: "", message: invalidOrderDiscount });
                }
                // if (self.idOrder() == 0 && ((self.orderDiscount() < 0 && self.orderDiscount() != 0)
                //     || self.orderDiscount() > (parseFloat(this.subTotal()) + parseFloat(this.totalTax())))
                // ) {
                // showErrorMsg(invalidOrderDiscount);
                //     $.growl.error({ title: "", message: invalidOrderDiscount });
                //     self.orderDiscount(0);
                //     return (parseFloat(this.subTotal()) + parseFloat(this.totalTax())).toFixed(psPrecision);
                // } else {
                //     pos_cart = $.parseJSON(localStorage.pos_cart);
                //     localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
                //     return (parseFloat(this.subTotal()) + parseFloat(this.totalTax()) + parseFloat(self.selectedIdCarrierCost()) - parseFloat(this.orderDiscount())).toFixed(psPrecision);
                // }

                var totalAmount = 0;
                if (self.idOrder() == 0 && ((self.orderDiscount() < 0 && self.orderDiscount() != 0)
                    || self.orderDiscount() > (parseFloat(this.subTotal()) + parseFloat(this.totalTax())))
                ) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(invalidOrderDiscount);
                    // $.growl.error({ title: "", message: invalidOrderDiscount });
                    self.orderDiscount(0);
                    totalAmount = parseFloat(this.subTotal()) + parseFloat(this.totalTax());
                    // return (parseFloat(this.subTotal()) + parseFloat(this.totalTax())).toFixed(psPrecision);
                } else {
                    pos_cart = $.parseJSON(localStorage.pos_cart);
                    localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
                    totalAmount = parseFloat(this.subTotal()) + parseFloat(this.totalTax()) - parseFloat(this.orderDiscount());
                    // return (parseFloat(this.subTotal()) + parseFloat(this.totalTax()) + parseFloat(self.selectedIdCarrierCost()) - parseFloat(this.orderDiscount())).toFixed(psPrecision);
                }
                if (self.selectedIdCarrier() != 0) {
                    totalAmount += parseFloat(self.selectedIdCarrierCost());
                }
                if (typeof posViewModel != 'undefined') {
                    if (!posViewModel.navigatorOnline()) {
                        totalAmount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(totalAmount));
                        self.totalOrderAmount(totalAmount);
                        self.installmentAmount(totalAmount);
                    }
                }
                totalAmount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(totalAmount));
                return totalAmount;

            }, this);

            /* Calculate the total amount of the cart */
            // self.totalOrderAmount = ko.computed(function (data, event) {
            //     var totalAmount = self.total();
            //     if (self.rewardAmount() != 0) {
            //         totalAmount -= parseFloat(self.rewardAmount());
            //         totalAmount = totalAmount.toFixed(psPrecision);
            //     }
            //     return totalAmount;
            // }, this);

            self.customerPayAmount = ko.computed(function () {
                var total = 0;
                var paymentOptions = self.paymentOptions();
                $.each(paymentOptions, function (index, paymentOption) {
                    total += parseFloat(paymentOption.tendered());
                });
                total = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(total));
                self.totalOrderAmountPaid(total);
                return total;
            }, this);

            /* Calculate the amount to be paid back to the customer */
            self.customerReturnAmount = ko.computed(function () {
                var total = parseFloat(self.customerPayAmount()) - parseFloat(this.totalOrderAmount());
                if (total > 0) {
                } else {
                    total = 0;
                }
                total = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(total));
                return total;
            }, this);

            /* Update the amount paid by the customer while creating the order */
            self.updatePaymentDetails = function () {
                var added = false;
                if (self.paymentOptions().length == 0) {
                    var paymentMethod = self.selectedPaymentOption() + ', ' + self.selectedPaymentId();
                    self.selectPaymentOption(paymentMethod);
                    added = true;
                }
                var paymentIndex = self.selectedPaymentOptionIndex();
                var selectedPaymentOption = null;
                if (paymentIndex != -1) {
                    selectedPaymentOption = self.paymentOptions()[paymentIndex];
                }
                if (selectedPaymentOption) {
                    var addText = '';
                    var tenderedAmount = selectedPaymentOption.tendered();
                    if (added) {
                        tenderedAmount = 0;
                    }
                    if (Number.isInteger(parseInt(this.buttonValue()))) {
                        if (tenderedAmount != 0) {
                            if (this.buttonValue() == 10
                                || this.buttonValue() == 20
                                || this.buttonValue() == 50
                            ) {
                                addText = parseFloat(tenderedAmount) + parseFloat(this.buttonValue());
                            } else {
                                addText = tenderedAmount + '' + this.buttonValue();
                            }
                        } else {
                            if (typeof tenderedAmount != 'undefined' && tenderedAmount) {
                                var index = tenderedAmount.indexOf('.');
                                if (index == 1) {
                                    addText = tenderedAmount + this.buttonValue();
                                } else {
                                    addText = this.buttonValue();
                                }
                            } else {
                                addText = this.buttonValue();
                            }
                        }
                        // if (self.customerPayAmount() !== 0) {
                        //     self.customerPayAmount(self.customerPayAmount() + this.buttonValue());
                        // } else {
                        //     self.customerPayAmount(this.buttonValue());
                        // }
                    } else if (this.buttonValue() == ".") {
                        tenderedAmount += '';
                        if (tenderedAmount.indexOf('.') == -1) {
                            addText = tenderedAmount + this.buttonValue();
                        } else {
                            addText = tenderedAmount;
                        }
                        // self.customerPayAmount(self.customerPayAmount() + this.buttonValue());
                    } else if (this.buttonValue().toLowerCase() == "del") {
                        // qty = self.customerPayAmount() + "";
                        var selectedOptionQty = tenderedAmount + "";
                        // qty = qty.substring(0, qty.length - 1);
                        // if (qty == "") {
                        //     qty = 0;
                        // }
                        selectedOptionQty = selectedOptionQty.substring(0, selectedOptionQty.length - 1);
                        if (selectedOptionQty == "") {
                            selectedOptionQty = 0;
                        }
                        addText = parseFloat(selectedOptionQty);
                        // self.customerPayAmount(parseFloat(qty));
                    } else if (this.buttonValue().toLowerCase() == "c") {
                        addText = parseFloat(0.0);
                    }
                    if (selectedPaymentOption) {
                        addText += '';
                        var index = addText.indexOf('.');
                        var qtyLength = addText.length;
                        if (index != -1) {
                            if (index + 1 < qtyLength && (qtyLength - index - 1) > psPrecision) {
                                addText = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(addText));
                            }
                        }
                        // addText = parseFloat(addText).toFixed(psPrecision);
                        selectedPaymentOption.tendered(addText);
                    }
                }
            }

            self.emptyCustomers = ko.observable(false);

            /* Open customer panel on customer select and update the details of customer */
            self.updateCustomer = function () {
                $(window).trigger('resize');
                posViewModel.bodyPanel("customers");
                self.checkBodyPanel('customers');
                Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["listenForScrollEvent"])();
                self.idOrder(0);
                if (customers != undefined) {
                    self.emptyCustomers(false);
                    Object(_customer_js__WEBPACK_IMPORTED_MODULE_6__["updateCustomer"])(customers);
                } else {
                    self.emptyCustomers(true);
                }
                self.callPosResize();
            }


            /* Get the shipping details of the selected cart */
            self.updateShippingCarrier = async function () {
                if (posViewModel.navigatorOnline()) {
                    if (deliveryError == 0) {
                        $(window).trigger('resize');
                        var pos_cart = $.parseJSON(localStorage.pos_cart);
                        var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                        self.order = ko.observableArray([]);
                        var idCustomer = 0;
                        if (pos_cart[cartIndex] != undefined) {
                            if (pos_cart[cartIndex]['others'] != undefined && pos_cart[cartIndex]['others']['customer'] != undefined) {
                                idCustomer = pos_cart[cartIndex]['others']['customer']['idCustomer'];
                            }
                            var products = await Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["getProductDetails"])(pos_cart[cartIndex]);
                            posViewModel.bodyPanel("shipping");
                            self.displayCart(1);
                            if (products != null) {
                                if (posViewModel.navigatorOnline()) {
                                    var data = {
                                        action: 'getShippingCarriers',
                                        ajax: true,
                                        posToken: posToken,
                                        // product: JSON.stringify(products),
                                        // idCustomer: idCustomer,
                                        // order_discount: self.orderDiscount(),
                                        id_address: self.selectedIdAddress()
                                    };
                                    if (pos_cart[cartIndex]['others'] != undefined
                                        && pos_cart[cartIndex]['others']['id_cart'] != undefined
                                    ) {
                                        data['id_cart'] = pos_cart[cartIndex]['others']['id_cart'];
                                    }
                                    $('.shiping-carrier-spinner').removeClass('hidden');
                                    $('.shiping-carrier').addClass('hidden');
                                    $.ajax({
                                        url: orderUrl,
                                        dataType: 'json',
                                        type: 'POST',
                                        data: data,
                                        success: function (order) {
                                            if (order.hasError) {
                                                $.each(order.errors, function (index, error) {
                                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                                    // $.growl.error({ title: "", message: error });
                                                });
                                            } else {
                                                shipping = order.shipping;
                                                defaultShippingCarrier = order.defaultShipping;
                                                updateShipping();
                                                if (order.id_cart != undefined) {
                                                    pos_cart[cartIndex]['others']['id_cart'] = order.id_cart;
                                                }
                                                localStorage.pos_cart = JSON.stringify(pos_cart);
                                                $('.shiping-carrier').removeClass('hidden');
                                                $('.shiping-carrier-spinner').addClass('hidden');
                                            }
                                        },
                                        error: function (jqXHR, exception) {
                                            Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_13__["ajaxResposeError"])(jqXHR, exception);
                                        }
                                    });
                                }
                            }
                            self.callPosResize();
                        }
                    } else {
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(deliveryAddressError);
                        // $.growl.error({ title: "", message: deliveryAddressError });
                    }
                } else {
                    self.resetShipping();
                    // showErrorMsg(networkError);
                    // $.growl.error({ title: "", message: networkError });
                }
            }

            /* Reset the details of the selected shipping */
            self.resetShipping = function () {
                self.posShipping([]);
                self.selectedIdCarrier(0);
                self.selectedCarrierName(noCarrier);
                self.selectedIdCarrierCost(0);
            }

            self.displayCart = ko.observable(1);
            /* Update the body panel on click of the left column element */
            self.checkBodyPanel = function (type) {
                if (type == 'products' || type == 'customers' || type == 'shipping') {
                    self.displayCart(1);
                    if (type == 'customers' || type == 'customers') {
                        var isMobile = window.matchMedia("only screen and (max-width: 991px)");
                        if (isMobile.matches) {
                            self.displayCart(0);
                        }
                    }
                } else {
                    self.displayCart(0);
                }
            }

            self.onClickSidePanel = async function (data, event) {
                $.each(self.posCarts(), function (cartInd, cartItem) {
                    self.posCarts()[cartInd].isCartActive("");
                });
                self.posCarts()[localStorage.selectedCartId].isCartActive("active");
                posViewModel.bodyPanel(data.activeClass);
                self.checkBodyPanel(data.activeClass);
                $(window).trigger('resize');
                self.idOrder(0);
                if (data.activeClass === "products") {
                    Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["listenForScrollEvent"])();
                    self.resetShipping();
                    self.selectedCategory(0);
                    self.productSearchKey("");
                    self.selectedSortType('');
                    var pos_products = await _product_js__WEBPACK_IMPORTED_MODULE_2__["default"].getPosProductDetails();
                    if (typeof self.selectedCustomerIndex() != 'undefined') {
                        var mappedTasks = $.map(pos_products, function (item) {
                            return new _product_js__WEBPACK_IMPORTED_MODULE_2__["Products"](item, self.selectedIdCountry())
                        });
                    } else {
                        var mappedTasks = $.map(pos_products, function (item) {
                            return new _product_js__WEBPACK_IMPORTED_MODULE_2__["Products"](item, self.selectedIdCountry())
                        });
                    }
                    // self.products(mappedTasks);
                    Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["loadProductPanel"])(mappedTasks);
                } else if (data.activeClass === "customers") {
                    self.updateCustomer();
                } else if (data.activeClass === "orders") {
                    self.orderTab(self.selectedOrderType());
                } else if (data.activeClass === "setting") {
                    changeEmployeePassword(self.selectedSettingTab());
                } else if (data.activeClass === "shipping") {
                    applyShipping = 1;
                    updateShipping();
                }
                self.emitAfterEvents('onClickSidePanel', { 'data': data, 'event': event });
                self.callPosResize();
            }

            self.callPosResize = function () {
                if (self.displayCart() == 1) {
                    wkposBodySize(false);
                } else {
                    wkposBodySize(true);
                }
            }

            /* Update the shipping details in the shipping panel */
            function updateShipping() {
                if (shipping != undefined) {
                    var mappedTasks = $.map(shipping, function (carrier) {
                        if (defaultShippingCarrier == carrier.idCarrier) {
                            self.selectedIdCarrier(carrier.idCarrier);
                            self.selectedCarrierName(carrier.name);
                            self.selectedIdCarrierCost(carrier.shippingCost);
                        }
                        return new ShippingDetails(carrier);
                    });

                    self.posShipping(mappedTasks);
                }
            }

            /* Open the setting panel in the front */
            self.selectedSettingTab = ko.observable();
            self.settingTab = function (data) {
                posViewModel.bodyPanel('settings');
                self.selectedSettingTab(data);
            }

            function displayError(error) {
                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                // $.growl.error({ title: "", message: error });
            }

            self.minimalQtyCheck = async function () {
                var posCartProducts = self.productCart();
                var posProducts = await _product_js__WEBPACK_IMPORTED_MODULE_2__["default"].getPosProductDetails();

                var error = false;
                $.each(posCartProducts, function (index, cartProduct) {
                    var minimalQty;
                    if (typeof posProducts[cartProduct.idProduct()] == 'undefined') {
                        error = true;
                        displayError(cartProduct.productName + ' ' + productNotExists);
                    } else {
                        if (typeof cartProduct.combinationIndex != 'undefined') {
                            minimalQty = posProducts[cartProduct.idProduct()]['combination_details'][cartProduct.combinationIndex]['minimal_quantity'];
                        } else {
                            minimalQty = posProducts[cartProduct.idProduct()]['minimal_quantity'];
                        }
                        if (cartProduct.productQuantity() < minimalQty) {
                            error = true;
                            displayError(minimalQtyError + cartProduct.productQuantity() + minimalQtyError1 + cartProduct.productName + ' ' + cartProduct.productAttributes);
                        }
                    }
                });
                return error;
            }

            /* Proceed to the payment with all the selected details */
            self.proceedToPay = async function () {
                var posOrder = $.parseJSON(localStorage.pos_orders);
                var proceedPayment = true;
                if (posViewModel.navigatorOnline()) {
                    if (typeof posOrder != 'undefined' && posOrder) {
                        var posOrderList = Object.keys(posOrder);
                        if (typeof posOrderList != 'undefined' && posOrderList.length > 0) {
                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(orderSyncMsg);
                            proceedPayment = false;
                        }
                    }
                }
                if (proceedPayment) {
                    var hasErrors = await self.minimalQtyCheck();
                    if (!hasErrors) {
                        var totalQty = 0;
                        var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                        var posCartPay = $.parseJSON(localStorage.pos_cart);
                        $.each(posCartPay[cartIndex], function (index, product) {
                            if (Number.isInteger(parseInt(index))) {
                                totalQty += product['quantity'];
                            }
                        });
                        if (totalQty > 0) {
                            if (self.idCustomer() == undefined || self.customers().length == 0) {
                                posViewModel.bodyPanel("customers");
                                self.updateCustomer();
                                applyCustomer = 1;
                                if (self.activeCustomerId() == 0) {
                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(selectCustomerMsg);
                                    // $.growl.error({ title: "", message: selectCustomerMsg });
                                }
                            } else if (self.activeCustomerId() == 0 || (self.idCustomer() == undefined || self.idCustomer() == 0 || applyCustomer == 0)
                                && posViewModel.bodyPanel() != 'customers'
                            ) {
                                if (self.activeCustomerId() == 0) {
                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(selectCustomerMsg);
                                    // $.growl.error({ title: "", message: selectCustomerMsg });
                                }
                                // posViewModel.bodyPanel("customers");
                                self.updateCustomer();
                                applyCustomer = 1;
                                // applyShipping = 0;
                            } else if ((self.selectedIdAddress() == undefined || self.selectedIdAddress() == 0)
                                && posViewModel.bodyPanel() != 'customers'
                            ) {
                                self.updateCustomer();
                                applyCustomer = 1;
                                // applyShipping = 0;
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(noAddressSelectedError);
                                // $.growl.error({ title: "", message: noAddressSelectedError });
                            } else {
                                back = posViewModel.bodyPanel();
                                posViewModel.bodyPanel("pay");
                                self.updatePaymentOptions();
                                self.removeResizable();
                                if (posViewModel.navigatorOnline()) {
                                    Object(_order_js__WEBPACK_IMPORTED_MODULE_4__["addProductToPsCart"])();
                                } else {
                                    // showErrorMsg(networkError);
                                    // $.growl.error({ title: "", message: networkError });
                                }
                                // updateVouchers(posCartPay[cartIndex]);
                                // appliedVouchers(posCartPay[cartIndex]);
                                // self.rewardAmount(getRewardTotalAmount(posCartPay[cartIndex], self.total()));
                            }
                        }
                    }
                }
            }

            self.copyCode = function (code) {
                $('#wk-voucher-applied-input').val(code.rewardCode);
                $('#wk-voucher-applied-input').attr('data-id-cart-rule', code.idCartRule);
            }

            self.applyPromocode = function () {
                Object(_voucher_js__WEBPACK_IMPORTED_MODULE_5__["applyPromocode"])();
                self.updatePaymentOptions();
            }

            self.removeVoucher = function (code) {
                var pos_cart = $.parseJSON(localStorage.pos_cart);
                var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                var idCart = pos_cart[cartIndex]['others']['id_cart'];
                Object(_voucher_js__WEBPACK_IMPORTED_MODULE_5__["removePromoCode"])(code);
                self.updatePaymentOptions();
            }

            /* Open the previous body panel on click of back link in payment panel */
            self.previousPage = function () {
                if (back == 'shipping' && self.idOrder != 0) {
                    posViewModel.bodyPanel('products');
                    Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["listenForScrollEvent"])();
                } else {
                    posViewModel.bodyPanel(back);
                }
                self.idOrder(0);
                self.callPosResize();
                $(window).trigger('resize');
            }

            /* Reset the customer to the selected cart */
            self.resetCustomerDetails = function () {
                self.customerAddressesDetails([]);
                self.customerAddresses([]);
                self.customerName('');
                self.customerEmail('');
                self.idCustomer(0);
                self.activeCustomerId(0);
                self.customerAddresses([]);
            }
            /* Assign the customer to the selected cart */
            self.selectCustomer = function (customer, index = false) {
                Object(_customer_js__WEBPACK_IMPORTED_MODULE_6__["selectCustomer"])(customer, index);
            }

            var getCustomerFromId = function (idCustomer) {
                var selectCustomer = {};
                $.each(customers, function (index, item) {
                    if (item.id_customer == idCustomer) {
                        selectCustomer['index'] = index;
                        selectCustomer['customer'] = item;
                        return;
                    }
                });
                return selectCustomer;
            }

            self.selectGuestAccount = function () {
                if (guestAccountEnabled) {
                    var guestCustomer = getCustomerFromId(idGuest);
                    Object(_customer_js__WEBPACK_IMPORTED_MODULE_6__["selectCustomer"])(guestCustomer['customer'], guestCustomer['index']);
                }
            }


            /* Update the address of the customer and get the tax rate according to the customer address */
            self.selectDeliveryAddress = function (data, event) {
                self.customerAddressesDetails([]);
                if (self.idCustomer() != undefined) {
                    Object(_address_js__WEBPACK_IMPORTED_MODULE_7__["selectDeliveryAddress"])();
                }
            }

            /* Update the tax rate of the product and cart product */
            self.updateTaxRate = function (taxRate, updateCart = false) {
                Object(_tax_js__WEBPACK_IMPORTED_MODULE_9__[/* updateTaxRate */ "b"])(taxRate, updateCart = false);
            }


            /* Update the customer in the cart */
            self.changeCustomer = function (idCustomer) {
                var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                pos_cart = $.parseJSON(localStorage.pos_cart);
                self.selectedCustomerName(self.customerName());
                self.selectedCustomerId(idCustomer);
                applyShipping = 0;
                var customer = {};
                customer['idCustomer'] = idCustomer;
                customer['customerName'] = self.customerName();
                customer['customerEmail'] = self.customerEmail();
                customer['id_address_delivery'] = self.selectedIdAddress();

                if (pos_cart[cartIndex]['others'] == undefined) {
                    pos_cart[cartIndex]['others'] = {};
                }
                pos_cart[cartIndex]['others']['customer'] = customer;
                localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
            }

            self.selectedSearchTypeId = ko.observable(parseInt(defaultSearchTypeId));
            self.selectedSearchType = ko.observable(defaultSearchType);
            self.changeCustomerSearchType = function (data) {
                let index = parseInt(data) - 1;
                self.selectedSearchTypeId(data);
                if (typeof customerSearchTypes[index] != 'undefined') {
                    self.selectedSearchType(customerSearchTypes[index].name);
                }
            }

            /* generate the order on click of confirmation Payment button */
            self.generateOrder = function () {
                Object(_order_js__WEBPACK_IMPORTED_MODULE_4__["generateOrder"])();
                updateSyncStatus();
            }

            self.changeRefundStatus = function (status) {
                self.alreadyRefund(status);
            }

            self.returnOrderStatus = function () {
                var orderStatus = self.enableOrderReturn();
                self.enableOrderEdit(0);
                self.enableOrderReturn(!orderStatus);
                // returnOrderStatus();
            }

            self.changeOrderEditStatus = function (orderStatus) {
                self.enableOrderEdit(orderStatus);
            }

            self.editOrderDetails = function () {
                var orderStatus = self.enableOrderEdit();
                self.enableOrderReturn(0);
                self.enableOrderEdit(!orderStatus);
                // returnOrderStatus();
            }

            self.updateProductReturnQty = function (data) {
                if (data.quantity_refundable() <= data.partialRefundQty()) {
                    data.partialRefundQty(data.quantity_refundable());
                }

                var amount = parseFloat(data.productPrice) * parseInt(data.partialRefundQty());
                data.partialRefundAmount(amount);
            }
            self.updateProductReturnAmount = function (data) {
                if (data.amount_refundable_tax_incl() <= data.partialRefundAmount()) {
                    data.partialRefundAmount(data.amount_refundable_tax_incl());
                }
            }

            self.updateProductEditAmount = function (data) {
                if (data.price == '') {
                    var price = 0;
                    var total = 0;
                } else {
                    var price = (parseFloat(data.price) * 100) / (100 + parseFloat(data.taxRate));
                    price = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(price));
                    var total = parseFloat(data.price) * parseInt(data.productQuantity);
                }
                data.changedTaxExclPrice(price);
                total = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["makeTotalProductCaculation"])(parseFloat(total));
                data.changedtotalPricePerProduct(total);
            }

            self.partialRefundProcess = async function (data) {
                var currentOrderDetails = viewModel.orderedProductsDetail();
                var partialRefundProduct = {};
                var partialRefundProductQuantity = {};
                var idOrderDetail = 0;
                var qtyReturn = 0;
                $.each(currentOrderDetails, function (index, order) {
                    if (order.partialRefundQty() > 0) {
                        qtyReturn++;
                        idOrderDetail = order.id_order_detail;
                        partialRefundProduct[idOrderDetail] = order.partialRefundAmount();
                        partialRefundProductQuantity[idOrderDetail] = order.partialRefundQty();
                    }
                });
                if (qtyReturn > 0) {
                    var data = {
                        partialRefundProduct: partialRefundProduct,
                        partialRefundProductQuantity: partialRefundProductQuantity,
                        id_order: self.selectedOrderId(),
                        action: 'orderRefund',
                        TaxMethod: 1,
                        generateDiscountRefund: 1
                    };
                    await Object(_order_js__WEBPACK_IMPORTED_MODULE_4__["refundOrder"])(data);
                    self.returnOrderStatus();
                } else {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])('Update Product Quantity');
                }
            }

            self.updatePaymentOptions = function () {
                self.paymentOptions([]);
            }

            self.updateOrderProductDetails = async function (data) {
                // var currentOrderDetails = viewModel.orderedProductsDetail();
                // var partialRefundProduct = {};
                // var partialRefundProductQuantity = {};
                // var idOrderDetail = 0;
                // var qtyReturn = 0;
                // $.each(currentOrderDetails, function(index, order) {
                //     if (order.partialRefundQty() > 0) {
                //         qtyReturn++;
                //         idOrderDetail = order.id_order_detail;
                //         partialRefundProduct[idOrderDetail] = order.partialRefundAmount();
                //         partialRefundProductQuantity[idOrderDetail] = order.partialRefundQty();
                //     }
                // });
                // if (qtyReturn > 0) {
                var data = {
                    action: 'editProductOnOrder',
                    id_order: self.selectedOrderId(),
                    product_id_order_detail: data.id_order_detail,
                    product_price_tax_excl: data.changedTaxExclPrice(),
                    product_price_tax_incl: data.price,
                    product_quantity: data.productQuantity,
                    product_invoice: data.id_order_invoice,
                    // id_wkpos_session: idWkPosSession
                };


                var response = await Object(_order_js__WEBPACK_IMPORTED_MODULE_4__["editOrderProduct"])(data);
                self.changeOrderEditStatus(0);
                self.changeRefundStatus(false);
                // console.log(response['order'][self.selectedOrderId()]);
                // posOrders[self.selectedOrderId()] = response['order'][self.selectedOrderId()];
                // console.log(posOrders);
                // var data = {
                //     idOrder: self.selectedOrderId()
                // };
                // self.loadOrderedDetails(data);
                // } else {
                //     showErrorMsg('Update Product Quantity')
                // }

            }

            self.deleteOrderProductDetails = async function (data) {
                var check = confirm(deleteOrderProductMessage);
                if (check == true) {
                    var data = {
                        action: 'deleteProductLine',
                        id_order: self.selectedOrderId(),
                        id_order_detail: data.id_order_detail,
                        // id_wkpos_session: idWkPosSession
                    };
                    var response = await Object(_order_js__WEBPACK_IMPORTED_MODULE_4__["editOrderProduct"])(data);
                }
            }

            self.updateOrderStatus = async function (data) {
                var orderDetail = self.orderHistory();
                var response = await Object(_order_js__WEBPACK_IMPORTED_MODULE_4__["updateOrderStatus"])(data.id_wkpos_order, data.remainingAmount);
                if (typeof response != 'undefined' && response) {
                    orderDetail = orderDetail[0]
                    // formatCurrencyCldr(parseFloat(response['installment']['paidAmount']), function(price) {
                    //     orderDetail.displayAmountPaid(price);
                    // });
                    orderDetail.displayAmountPaid = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["asyncComputed"])(function () {
                        return Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["wkFormatCurrency"])(parseFloat(response['installment']['paidAmount']), currencyFormat);
                    }, this);
                    orderDetail.displayRemainingAmount = Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["asyncComputed"])(function () {
                        return Object(_wkformatcurrency_js__WEBPACK_IMPORTED_MODULE_1__["wkFormatCurrency"])(parseFloat(response['installment']['remainingAmount']), currencyFormat);
                    }, this);
                    // formatCurrencyCldr(parseFloat(response['installment']['remainingAmount']), function(price) {
                    //     orderDetail.displayRemainingAmount(price);
                    // });
                    // self.combinationPrice = asyncComputed(function () {
                    //     return wkFormatCurrency(parseFloat(combiPrice), currencyFormat);
                    // }, this);
                    orderDetail.amountPaid(parseFloat(response['installment']['paidAmount']));
                    orderDetail.remainingAmount(parseFloat(response['installment']['remainingAmount']));

                    posOrders[parseInt(response.id_order)]['order']['installment'] = response.installment;
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(response.success);
                    self.orderHistory()[0].current_state(parseInt(paymentAcceptedStatus));
                }
            }

            self.updateInstallmentAmount = function () {
                var orderAmount = self.totalOrderAmount();
                if (isNaN(self.installmentAmount())) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(invalidInstallmentAmount);
                    self.installmentAmount(orderAmount);
                } else if (orderAmount < parseFloat(self.installmentAmount())) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(overflowInstallmentAmount);
                    self.installmentAmount(orderAmount);
                }
            }

            /* Synchronise all the offline order if there is internet connection */
            self.synchroniseOrder = function () {
                if (posViewModel.navigatorOnline()) {
                    var numberOfOrders = (Object.keys(pos_orders).length);
                    if (pos_orders != undefined && numberOfOrders > 0) {
                        numberOfOrders -= 1;
                        var idCustomer = 0;
                        var syncMessage = '';
                        $('.wk-loading-pos-details').addClass('sync-orders').removeClass('hide');
                        $('.wk-loading-status').html('').show();
                        $('.wk-loading-pos-details').next().css({ "opacity": "0.7" });

                        var countIndex = 0;
                        $.each(pos_orders, function (index, order) {
                            idCustomer = 0;
                            if (order['order']['id_customer'] != undefined) {
                                idCustomer = order['order']['id_customer'];
                            }
                            var idInterval = setTimeout(function () {
                                if (order['product'] != null) {
                                    var data = {
                                        action: 'addProductToCart',
                                        ajax: true,
                                        product: JSON.stringify(order['product']),
                                        idCustomer: idCustomer,
                                        order_discount: order['order']['total_discounts'],
                                        id_address: order['order']['id_address'],
                                        posToken: posToken
                                    };

                                    $('.wk-loading-pos-details').addClass('sync-orders').removeClass('hide');
                                    $('.wk-loading-status').html('').show();
                                    $('.wk-loading-pos-details').next().css({ "opacity": "0.7" });
                                    $.ajax({
                                        url: orderUrl,
                                        dataType: 'json',
                                        type: 'POST',
                                        async: false,
                                        data: data,
                                        success: function (response) {
                                            if (response.hasError) {
                                                $.each(response.errors, function (erorIndex, error) {
                                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                                    // $.growl.error({ title: "", message: error });
                                                });
                                                if (countIndex == numberOfOrders) {
                                                    $('.wk-loading-pos-details').removeClass('sync-orders').addClass('hide');
                                                    $('.wk-loading-pos-details').next().css({ "opacity": "1" });
                                                }
                                            } else {
                                                Object(_order_js__WEBPACK_IMPORTED_MODULE_4__["generatePOSOrder"])(response.id_cart, order, idCustomer, countIndex, numberOfOrders);
                                            }
                                            countIndex += 1;
                                        },
                                        error: function (jqXHR, exception) {
                                            Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_13__["ajaxResposeError"])(jqXHR, exception);
                                        }
                                    });
                                }
                            }, 1);
                        });
                    }
                } else {
                    // showErrorMsg(networkError);
                    // $.growl.error({ title: "", message: networkError });
                }
                updateSyncStatus();
            }

            /* Create order receipt */
            self.orderReceipt = function (orderDetail) {
                if (orderDetail != undefined && orderDetail != "") {
                    self.order.push(
                        new _order_js__WEBPACK_IMPORTED_MODULE_4__["Order"](
                            orderDetail['order'],
                            orderDetail['product']
                        )
                    );
                    self.idOrder(1);
                    self.paymentOptions([]);
                    // self.customerPayAmount(0);
                    self.removeSelectedCart();
                }
            }

            /* Display the ordered products */
            self.orderProductReceipt = function (orderDetail) {
                if (orderDetail != undefined && orderDetail != "") {
                    self.orderPrint([]);
                    self.orderPrint.push(
                        new _order_js__WEBPACK_IMPORTED_MODULE_4__["Order"](
                            orderDetail['order'],
                            orderDetail['product']
                        )
                    );
                }
            }

            /* Open product panel on click of next order */
            self.nextOrder = function () {
                Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["listenForScrollEvent"])();
                self.idOrder(0);
                self.selectedPaymentId(defaultIdPaymentMethod);
                posViewModel.bodyPanel("products");
                var posProducts = _product_js__WEBPACK_IMPORTED_MODULE_2__["default"].getPosProductDetails();
                posProducts.then(
                    function (products) {
                        var mappedTasks = $.map(products, function (item) { return new _product_js__WEBPACK_IMPORTED_MODULE_2__["Products"](item, self.selectedIdCountry()) });
                        // self.products(mappedTasks);
                        Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["loadProductPanel"])(mappedTasks);
                        self.callPosResize();
                        $('#button-home').trigger('click');
                    },
                    function (response) {
                    }
                );
            }

            self.productSearchKey = ko.observable();
            self.customerSearchKey = ko.observable();
            self.orderSearchKey = ko.observable();

            /* Search the products in product panel */
            self.searchProduct = async function (data, event) {
                var code = (event.keyCode ? event.keyCode : event.which);
                if (code != 0) {
                    await Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["searchProduct"])(event, code);
                    return;
                }
            }

            self.sortOrders = function (orders) {
                return orders.sort(function (a, b) {
                    if (a > b) {
                        return -1;
                    }
                    if (a < b) {
                        return 1;
                    }
                });
            }

            /* sort the product by ascending order */
            self.sortProductByAsc = function () {
                self.selectedSortType('asc');
                self.products(self.products().sort(function (a, b) {
                    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                }));
            }

            /* sort the product by descending order */
            self.sortProductByDesc = function () {
                self.selectedSortType('desc');
                self.products(self.products().sort(function (a, b) {
                    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                }));
            }

            /* Remove the product from cart */
            self.removeProduct = function (product) {
                var check = confirm(deleteProductMessage);
                if (check == true) {
                    Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["removeProduct"])(product);
                    self.resetCartCalculator();
                }
            }

            /* Increase the product quantity by one */
            self.increaseProductQuantity = function (product) {
                var index = self.productCart.indexOf(product);
                var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                var cartProductQty = 0;
                var pos_cart = $.parseJSON(localStorage.pos_cart);
                var productQty = 0;
                if (product.idProductAttribute == '') {
                    productQty = parseInt(pos_products[product.idProduct()].quantity);
                } else {
                    productQty = parseInt(pos_products[product.idProduct()]['combination_details'][product.combinationIndex].quantity);
                }
                var currentQty = parseInt(product.productQuantity());
                if (currentQty + 1 > productQty
                    && Object(_poscart_js__WEBPACK_IMPORTED_MODULE_3__["checkOutofStockAllow"])(pos_products[product.idProduct()]) == false
                ) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(pos_products[product.idProduct()]['name'] + ' ' + wkQuantityNotifi);
                    // $.growl.error({ title: "", message: wkQuantityNotifi });
                } else {
                    cartProductQty = parseInt(product.productQuantity()) + 1;
                    pos_cart[cartIndex][index]['quantity'] = cartProductQty;
                    localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
                    product.productQuantity(cartProductQty);
                }
            }

            /* Decrease the product quantity by one */
            self.decreaseProductQuantity = function (product) {
                var index = self.productCart.indexOf(product);
                var cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                var cartProductQty = 0;
                var pos_cart = $.parseJSON(localStorage.pos_cart);
                if (parseInt(product.productQuantity()) - 1 < 1) {
                    self.removeProduct(product);
                    self.resetCartCalculator();
                } else {
                    cartProductQty = product.productQuantity() - 1;
                    pos_cart[cartIndex][index]['quantity'] = cartProductQty;
                    localStorage.setItem('pos_cart', JSON.stringify(pos_cart));
                    product.productQuantity(cartProductQty);
                }
            }

            // /* Search customer on the basis of name */
            self.searchCustomer = function (data, event) {
                Object(_customer_js__WEBPACK_IMPORTED_MODULE_6__["searchCustomer"])();
            }

            /* Search order on the basis of order reference */
            self.searchOrder = function (data, event) {
                Object(_order_js__WEBPACK_IMPORTED_MODULE_4__["searchOrder"])();
            }


            self.connectPrinter = function () {
                try {
                    if (qz.websocket.isActive()) {
                        qz.websocket.disconnect().then(function () {
                            self.printerConnected(qz.websocket.isActive());
                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(printerDisconnectSuccess);
                        });
                    } else {
                        Object(_wkprintinvoice_js__WEBPACK_IMPORTED_MODULE_10__["connect"])().then(function () {
                            return qz.printers.find(selectedPrinterName);               // Pass the printer name into the next Promise
                        }).then(function (printer) {
                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(printerConnectedSuccess);
                            self.selectedPrinter(printer);
                            self.printerConnected(qz.websocket.isActive());
                        }).catch(function (e) {
                            self.printerConnected(qz.websocket.isActive());
                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(e);
                        });
                    }
                } catch (e) {
                    self.printerConnected(qz.websocket.isActive());
                    console.log(e);
                }
            }

            self.printCreditSlip = function () {
                if (wkposPrintType == 2) {
                    var posOrder;
                    posOrder = posOrders;
                    if (viewModel.selectedOrderType() == "offline") {
                        posOrder = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.parseJSON(localStorage.pos_orders);
                    } else if (viewModel.selectedOrderType() == "history") {
                        posOrder = posOrders;
                    }
                    self.printHtmlCreditSlip(posOrder[viewModel.selectedOrderId()]['order'], orderSlip);

                    // printHtmlCreditSlip(creditSlip);

                } else {
                    Object(_wkprintinvoice_js__WEBPACK_IMPORTED_MODULE_10__["connect"])().then(function () {
                        return qz.printers.find(selectedPrinterName);               // Pass the printer name into the next Promise
                        // return print();
                    }).then(function (printer) {
                        Object(_wkprintinvoice_js__WEBPACK_IMPORTED_MODULE_10__["printCreditSlip"])(printer);
                    }).catch(function (e) {
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(e);
                        // $.growl.error({ title: "", message: e });
                    });
                }
            }


            self.printCreditSlipSecond = function () {
                if (wkposPrintType == 2) {
                    var posOrder;
                    posOrder = posOrders;
                    if (viewModel.selectedOrderType() == "offline") {
                        posOrder = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.parseJSON(localStorage.pos_orders);
                    } else if (viewModel.selectedOrderType() == "history") {
                        posOrder = posOrders;
                    }
                    if (viewModel.creditSlipSecond().status == true) {
                        var newCreditSlip = viewModel.creditSlipSecond();

                        self.printHtmlCreditSlip(posOrder[viewModel.selectedOrderId()]['order'], newCreditSlip);
                    }

                    // printHtmlCreditSlip(creditSlip);

                } else {
                    Object(_wkprintinvoice_js__WEBPACK_IMPORTED_MODULE_10__["connect"])().then(function () {
                        return qz.printers.find(selectedPrinterName);               // Pass the printer name into the next Promise
                        // return print();
                    }).then(function (printer) {
                        Object(_wkprintinvoice_js__WEBPACK_IMPORTED_MODULE_10__["printCreditSlipSecond"])(printer);
                    }).catch(function (e) {
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(e);
                        // $.growl.error({ title: "", message: e });
                    });
                }
            }

            self.printHtmlCreditSlip = function (order, orderSlip) {
                // console.log(order, orderSlip);

                var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                var isEdge = window.navigator.userAgent.toLowerCase().indexOf("edge") > -1;
                var isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
                var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && !navigator.userAgent.match('CriOS');
                var isMSIE = window.navigator.userAgent.indexOf("MSIE") > 0;
                var min_width = 650;

                // if (width < min_width) {
                //     height = (height * min_width) / width;
                //     width = min_width;
                // }

                // // Create IE + others compatible event handler
                var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                var eventer = window[eventMethod];
                var printEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

                // Listen to message from child window
                eventer(printEvent, function (e) {
                    $("#printingFrame").remove();
                }, false);

                // var extra_css = "";
                // if (isChrome || isFirefox) {
                //     extra_css = "@page { size: auto; margin: 0; }";
                // }

                // var final_Html_Code = generateFinalHtmlforPrint(imageDataUrlsToPrint, extra_css);

                var final_Html_Code = self.generateHtmlForCreditSlipPrinting(order, orderSlip);
                var iframe = self.appendIframeCreditHtml();
                var invoiceBarcodeDiv = document.createElement('div');
                invoiceBarcodeDiv.id = "invoiceBarcodeDiv";

                invoiceBarcodeDiv.innerHTML = '<svg class="barcode"></svg>';
                invoiceBarcodeDiv.style.position = "absolute";
                invoiceBarcodeDiv.style.height = 40 * 1.5 + "px";
                invoiceBarcodeDiv.style.width = 200 * 1.25 + "px";
                invoiceBarcodeDiv.style.zIndex = 0;
                invoiceBarcodeDiv.style.background = "transparent";
                invoiceBarcodeDiv.style.color = "black";

                document.body.appendChild(invoiceBarcodeDiv);


                var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
                if (isFirefox) {
                    iframe.srcdoc = final_Html_Code;
                } else {
                    iframedoc.body.innerHTML = final_Html_Code;
                }

                if (displayBarcode == 1) {
                    JsBarcode("#invoiceBarcodeDiv .barcode", orderSlip.code, {
                        height: 40,
                        displayValue: false,
                        textAlign: 'center'
                    });
                }
                $($($('#printingFrame').get(0).contentWindow.document).find('#invoice_barcode')).html($('#invoiceBarcodeDiv').html());
                document.body.removeChild(invoiceBarcodeDiv);
                setTimeout(function () { $("#printingFrame").get(0).contentWindow.print(); parent.postMessage('Printing Completed') }, 100)
            }

            self.appendIframeCreditHtml = function () {
                var iframe = document.createElement('iframe');
                iframe.scroll = "auto";
                iframe.height = '100%';
                iframe.width = '60%';
                iframe.style.position = "absolute";
                iframe.style.left = "20%";
                iframe.style.top = "0px";
                iframe.style.zIndex = 10000;
                iframe.marginwidth = "0";
                iframe.marginheight = "0";
                iframe.hspace = "0";
                iframe.vspace = "0";
                iframe.style.background = "white";
                iframe.id = "printingFrame";
                document.body.appendChild(iframe);
                iframe.focus();
                return iframe;
            }


            self.generateHtmlForCreditSlipPrinting = function (order, orderSlip) {
                var flex8 = "flex: 8;";
                var flex2 = "flex: 2;";
                var flex3 = "flex: 3;";
                var dflex = "display: flex;";
                var textRight = "text-align: right;";
                var padding10 = "padding: 10px;";
                var fontWeight600 = "font-weight: 600;";
                var style = '<style>';
                style += '.order-heading { font-weight: 600; }';
                style += '.order-products { border-top: 1px dashed; padding: 15px 0; border-bottom: 1px dashed;}';
                style += 'div.order-detail span { padding: 5px 0; }';
                style += '.order-customer { border-top: 1px dashed; padding-top: 15px; }';
                style += '</style>';
                // var html = '<h1 onload="'+jsTimeOutCode+'">Heading</h1>';
                var html = '<div class="order-invoicing" style="text-align:center">';
                html += '<div class="order-heading" style="margin-bottom: 15px;">';
                html += '<div class="outlet-name">' + shopName + '</div>';
                html += '<div class="outlet-city">' + outletAddress1 + ', ' + outletAddress2 + '</div>';
                // html += '<div class="outlet-city">' + outletAddress2 + '</div>';
                html += '<div class="outlet-city">' + outletCity + ', ' + outletState + '</div>';
                // html += '<div class="outlet-city">' + outletState + '</div>';
                html += '<div class="outlet-city">' + outletCountry + ' - ' + outletPostCode + '</div>';
                // html += '<div class="outlet-city">' + outletPostCode + '</div>';
                if (outletPhone != undefined && outletPhone != '') {
                    html += '<div class="outlet-number">' + displayPhone + outletPhone + '</div>';
                }
                html += '<div class="order-date">' + order['order_date'] + '</div>';
                html += '<div class="user-employee">' + displayUser + employeeName + '</div>';
                html += '<div class="order-refernce">' + displayOrder + '#' + order['reference'] + '</ div>';
                html += '</div>';

                html += '<div class="customer-details" style="text-align: left;">';

                html += '<div class="customer">';

                html += '<span>' + creditSlipHeading + '</span>';

                if (orderSlip.code != '--') {

                    html += '<span>' + creditSlipHeading + '</span><br>';
                    html += '<span>' + orderSlip.date_add + '</span><br>';

                    html += '<span>' + displayUser + viewModel.cashierName() + '</span><br>';

                    html += '<span>' + displayOrder + '#' + order['reference'] + '</span><br>';

                    html += '<span>' + orderSlipAmount + '    ' + orderSlip.amount + '</span><br>';

                    html += '<span>' + orderSlipVoucher + '    ' + orderSlip.code + '</span><br>';


                } else {

                    html += '<span>' + creditSlipHeading + '</span><br>';
                    html += '<span>' + orderSlip.date_add + '</span><br>';

                    html += '<span>' + displayUser + viewModel.cashierName() + '</span><br>';

                    html += '<span>' + displayOrder + '#' + order['reference'] + '</span><br>';

                    html += '<span>' + orderSlipAmount + '    ' + orderSlip.amount + '</span><br>';
                }

                // html += '<span>' + order['payment'] + '</span>';
                html += '</div>';

                html += '</div>';

                html += '</div>';




                html += '<div class="order-customer">';
                html += '<span>' + displayCustomerName + '</span>';
                html += '<span>' + order['customer_name'] + '</span>';
                html += '</div>';
                html += '<div id="invoice_barcode"></div>';
                if (signOnOrderReciept == 1) {
                    html += '<div id="digital_sign" style="word-break:break-all;">' + order['digital_sign'] + '</div>';
                }
                html += '</div>';
                html += '</div>';
                return style + html;
            }

            self.updateStock = function () {
                $.ajax({
                    url: posSales,
                    dataType: 'json',
                    type: 'get',
                    data: {
                        action: 'updateAllStock',
                        ajax: true,
                        posToken: posToken
                    },
                    success: function (response) {
                        if (response.hasError) {
                            $.each(response.errors, function (index, error) {
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                            });
                        } else {
                            getPOSDetails();
                            setTimeout(function () {
                                $('#button-home').trigger('click');
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(stockUpdated);
                            }, 1000);
                        }
                    },
                    error: function (jqXHR, exception) {
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                    }
                });
            }

            /* Print Invoice on print invoice button click */
            self.printInvoice = function () {
                try {
                    if (wkposPrintType == 2) {
                        var posOrder;
                        posOrder = posOrders;
                        if (viewModel.selectedOrderType() == "offline"
                            || (posViewModel.bodyPanel() == 'pay' && !posViewModel.navigatorOnline())
                        ) {
                            posOrder = $.parseJSON(localStorage.pos_orders);
                        }

                        Object(_wkposhtmlprint_js__WEBPACK_IMPORTED_MODULE_15__[/* printHtmlOrderInvoice */ "a"])(
                            posOrder[viewModel.selectedOrderId()]['order'],
                            posOrder[viewModel.selectedOrderId()]['product']
                        );
                    } else {
                        self.printerConnected(qz.websocket.isActive());
                        if (qz.websocket.isActive()) {
                            Object(_wkprintinvoice_js__WEBPACK_IMPORTED_MODULE_10__["printOrderBill"])(self.selectedPrinter());
                        } else {
                            Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(printerNotConnected);
                        }
                    }
                } catch (e) {
                    self.printerConnected(qz.websocket.isActive());
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(e);
                }
                // connect().then(function () {
                //     return qz.printers.find(selectedPrinterName);               // Pass the printer name into the next Promise
                //     // return print();
                // }).then(function (printer) {
                //     printOrderBill(printer);
                // }).catch(function (e) {
                //     showErrorMsg(e);
                //     // $.growl.error({ title: "", message: e });
                // });
            }

            self.removeResizable = function () {
                wkposBodySize(false);
                $("#content-wrapper").removeAttr("style");
            }

            self.customerGroups = ko.observableArray([]);
            self.titles = ko.observableArray([]);

            /* Add new customer from front end */
            self.addNewCusomer = function () {
                self.issetCustomer(1);
                self.firstName("");
                self.lastName("");
                self.customerEmail("");
                self.customerPassword("");
                self.customerPhone("");
                self.editIdCustomer(0);
                self.groupAccess(defaultGroupAccess);
                self.days([0]);
                self.months([0]);
                self.years([0]);
                self.newsLetter(false);
                self.selectedTitle(0);
                self.customerHeading(addCustomerHeading);
                // customerGroups = $.parseJSON(customerGroups);
                var mappedTasks = $.map(groups, function (group, index) {
                    return new customerGroup(group);
                });
                self.customerGroups(mappedTasks);
                var mappedTasks = $.map(genders, function (gender, index) {
                    return { idGender: index, name: gender };
                });
                self.titles(mappedTasks);
                posViewModel.bodyPanel("customer");

                self.customerPanel('customer');
                self.removeResizable();
                self.callPosResize();
            }

            self.customerPanel = ko.observable('customer');

            /* Mapping of customer address */
            self.addAddress = function () {
                self.aliasName('');
                self.address1('');
                self.address2('');
                self.company('');
                self.vatNumber('');
                self.postcode('');
                self.homePhone('');
                self.phone('');
                self.other('');
                self.selectedIdCountry(0);
                self.stateList([]);
                self.selectedIdState(0);
                self.city('');
                self.customerPanel('addaddress');
                posViewModel.bodyPanel('customer');
                self.removeResizable();
            }

            /* Add New Customer address */
            self.addNewAddress = function (address) {
                if (self.activeCustomerId() == 0) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(selectCustomerMsg);
                    // $.growl.error({ title: "", message: selectCustomerMsg });
                } else {
                    $.each(customers, function (key, customer) {
                        if (customer["id_customer"] == self.idCustomer()) {
                            self.customerHeading(editCustomerHeading);
                            posViewModel.bodyPanel("customer");
                            self.customerPanel('address');
                            if (self.selectedIdAddress() != undefined && self.selectedIdAddress() != 0 && customer["addresses"] != undefined) {
                                $.each(customer["addresses"], function (key, address) {
                                    if (address["id_address"] == self.selectedIdAddress()) {
                                        self.firstName(address.firstname);
                                        self.lastName(address.lastname);
                                        self.customerEmail(self.customerEmail());
                                        self.aliasName(address.alias);
                                        self.address1(address.address1);
                                        self.address2(address.address2);
                                        self.company(address.company);
                                        self.vatNumber(address.vat_number);
                                        self.postcode(address.postcode);
                                        self.homePhone(address.phone);
                                        self.phone(address.phone_mobile);
                                        self.other(address.other);
                                        self.selectedIdCountry(address.id_country);
                                        if (address.id_state != undefined || address.id_State != 0) {
                                            self.getStates()
                                            self.selectedIdState(address.id_state);
                                        }
                                        self.city(address.city);
                                        return true;
                                    }
                                });
                            } else {
                                self.firstName(customer['first_name']);
                                self.lastName(customer['last_name']);
                                self.aliasName('');
                                self.address1('');
                                self.address2('');
                                self.company('');
                                self.vatNumber('');
                                self.postcode('');
                                self.homePhone('');
                                self.phone('');
                                self.other('');
                                self.selectedIdCountry(0);
                                self.selectedIdState(0);
                                self.city('');
                            }
                        }
                    });
                }
            }

            self.groupAccess = ko.observableArray([]);
            self.editIdCustomer = ko.observable();
            self.editCustomerIndex = ko.observable();
            self.defaultGroup = ko.observable(parseInt(defaultGroup));

            /* Edit customer details */
            self.editCustomerDetails = function () {
                $.each(customers, function (key, customer) {
                    if (customer["id_customer"] == self.idCustomer()) {
                        self.issetCustomer(0);
                        self.firstName(customer['first_name']);
                        self.lastName(customer['last_name']);
                        self.customerEmail(customer['email']);
                        self.editIdCustomer(customer['id_customer']);
                        self.editCustomerIndex(key);
                        self.customerPassword('');
                        self.customerHeading(editCustomerHeading);
                        posViewModel.bodyPanel("customer");
                        self.customerPanel('customer');
                        self.removeResizable();
                        self.groupAccess(customer['group']);

                        if (customer['customer_phone']) {
                            self.customerPhone(customer['customer_phone']);
                        } else {
                            self.customerPhone('');
                        }

                        var mappedTasks = $.map(groups, function (group, index) {
                            return new customerGroup(group);
                        });
                        self.customerGroups(mappedTasks);
                        var mappedTasks = $.map(genders, function (gender, index) {
                            return { idGender: index, name: gender };
                        });
                        self.titles(mappedTasks);

                        if (customer['birthday'] != undefined) {
                            var dob = customer['birthday'].split('-');
                            self.days([parseInt(dob[2]) + '']);
                            self.months(parseInt(dob[1]) + '');
                            self.years([parseInt(dob[0]) + '']);
                        }
                        if (customer['newsletter'] != undefined && customer['newsletter'] != 0) {
                            self.newsLetter(Boolean(customer['newsletter']));
                        } else {
                            self.newsLetter(false);
                        }
                        if (customer['id_gender'] != undefined) {
                            self.selectedTitle(customer['id_gender']);
                        }
                        return true;
                    }
                });
                self.callPosResize();
            }

            /* Update Employee password */
            self.updateEmployeePassword = function (data) {
                if (posViewModel.navigatorOnline()) {
                    $.ajax({
                        url: wkposLogin,
                        dataType: 'json',
                        type: 'POST',
                        data: {
                            action: 'updateEmployeePassword',
                            ajax: true,
                            'id_employee': document.getElementById('id_employee').value,
                            'old_passwd': document.getElementById('old_passwd').value,
                            'passwd': document.getElementById('passwd').value,
                            'passwd2': document.getElementById('passwd2').value,
                            posToken: posToken,
                        },
                        success: function (response) {
                            if (response.hasErrors) {
                                $.each(response.errors, function (index, error) {
                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                    // $.growl.error({ title: "", message: error });
                                })
                            } else {
                                Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(response.success);
                                // $.growl.notice({ title: "", message: response.success });
                                document.getElementById('old_passwd').value = '';
                                document.getElementById('passwd').value = '';
                                document.getElementById('passwd2').value = '';
                            }
                        },
                        error: function (jqXHR, exception) {
                            Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_13__["ajaxResposeError"])(jqXHR, exception);
                        }
                    });
                } else {
                    // showErrorMsg(networkError);
                    // $.growl.error({ title: "", message: networkError });
                }
            }

            /* Display the product on the basis of category in product panel */
            self.getCategoryWsProduct = function (data) {
                self.selectedCategory(data.idCategory);
                self.selectedSortType('');
                var idProducts = categoryWiseProducts[data.idCategory];
                var idSubCategories = [];
                var subCategoriesMapping = [];
                if (typeof data.children != 'undefined'
                    && Object.keys(data.children).length > 0
                ) {
                    if (typeof subCategoriesMapping[data.idCategory] != 'undefined') {
                        idSubCategories = subCategoriesMapping[data.idCategory];
                    } else {
                        getAllSubCatgories(data.children, idSubCategories);
                        subCategoriesMapping[data.idCategory] = idSubCategories;
                    }
                }
                if (idSubCategories.length > 0) {
                    $.each(idSubCategories, function (index, idCategory) {
                        if (idCategory && typeof categoryWiseProducts[idCategory] != 'undefined') {
                            idProducts = { ...idProducts, ...categoryWiseProducts[idCategory] };
                        }
                    });
                }
                self.products([]);
                var mappedProducts = $.map(idProducts, function (idProduct) {
                    if (pos_products[idProduct] != undefined) {
                        return new _product_js__WEBPACK_IMPORTED_MODULE_2__["Products"](pos_products[idProduct], self.selectedIdCountry());
                    }
                });
                Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["loadProductPanel"])(mappedProducts);
            }

            /* Get all Sub Categories */
            function getAllSubCatgories(categories, idSubCategories) {
                $.each(categories, function (index, category) {
                    if (typeof category['children'] != 'undefined'
                        && Object.keys(category['children']).length > 0
                    ) {
                        getAllSubCatgories(category['children'], idSubCategories);
                    }
                    idSubCategories.push(index);
                })
            }

            self.subCategories = ko.observableArray([]);
            self.displaySubCategoriesFlag = ko.observable(0);
            var Category = function (children, category) {
                var self = this;
                self.children = ko.observableArray(children);
                self.idCategory = category.id_category;
                self.name = ko.observable(category.name);
                self.categoryOpen = ko.observable(0);
                if (typeof category.children == 'undefined') {
                    self.hasChildren = ko.observable(0);
                } else {
                    self.hasChildren = ko.observable(1);
                }
            }

            self.createCategorieTree = function (categories) {
                var categoryTreeDemo = [];
                $.each(categories, function (index, category) {
                    categoryTreeDemo.push(self.createSubCategorieTree(category));
                });
                return categoryTreeDemo;
            }

            self.createSubCategorieTree = function (category) {
                if (typeof category.children == 'undefined') {
                    return new Category([], category);
                } else {
                    return new Category(self.createCategorieTree(category.children), category);
                }
            }

            self.showExpand = ko.observable(1);
            self.expandAllCategory = function () {
                self.changeSubCategoryStatus([self.subCategories()], 1);
                self.showExpand(0);
            }

            self.collapseAllCategory = function () {
                self.changeSubCategoryStatus([self.subCategories()], 0);
                self.showExpand(1);
            }

            self.changeSubCategoryStatus = function (categories, status) {
                $.each(categories, function (index, category) {
                    self.changeTreeStatus(category, status);
                });
            }

            self.changeTreeStatus = function (category, status) {
                if (category.hasChildren() == 0) {
                    category.categoryOpen(status);
                } else {
                    category.categoryOpen(status);
                    return self.changeSubCategoryStatus(category.children(), status);
                }
            }

            self.displaySubCategories = function (data) {
                var selectedCategory = null;
                $.each(categories, function (index, category) {
                    if (category.id_category == data.idCategory) {
                        selectedCategory = category;
                        return;
                    }
                });
                var categoryTree = self.createCategorieTree(selectedCategory.children);
                self.subCategories(new Category(categoryTree, selectedCategory));
                self.showExpand(1);
                self.displaySubCategoriesFlag(1);
                $('#wk-pos-category').modal('toggle');
            }

            /* Load all the order details on click of order in left panel */
            self.loadOrderedDetails = function (data) {
                var orderDetails = self.orderDetails();
                $.each(orderDetails, function (index, order) {
                    if (order.idOrder == data.idOrder) {
                        self.currentSelectedOrderIndex(parseInt(index));
                        return;
                    }
                });
                self.orderHistory([]);
                self.orderedProductsDetail([]);
                var posOrderDetail;
                posOrderDetail = posOrders;
                if (self.selectedOrderType() == "offline") {
                    posOrderDetail = $.parseJSON(localStorage.pos_orders);
                }
                self.changeRefundStatus(false);

                self.selectedOrderId(data.idOrder);
                self.selectedOrderReference(posOrderDetail[data.idOrder]['order']['reference']);
                self.orderHistory.push(
                    new _order_js__WEBPACK_IMPORTED_MODULE_4__["Order"](posOrderDetail[data.idOrder]['order'])
                );
                if (posOrderDetail[data.idOrder] != undefined) {
                    self.orderPrint([]);
                    self.orderProductReceipt(posOrderDetail[data.idOrder]);
                }
                var currency = posOrderDetail[data.idOrder]['order'].currency;
                var isOrderReturnPossible = false
                $.each(posOrderDetail[data.idOrder]['product'], function (index, product) {
                    const objOrderedProduct = new _order_js__WEBPACK_IMPORTED_MODULE_4__["OrderedProduct"](product, index, false, currency)
                    if (objOrderedProduct.quantity_refundable() > 0) {
                        isOrderReturnPossible = true
                    }
                    self.orderedProductsDetail.push(objOrderedProduct);
                });
                self.isOrderReturnable(isOrderReturnPossible)
                self.enableOrderReturn(0);
                self.showCreditSlip(0);
                self.changeOrderEditStatus(0);
                viewModel.giftCardB(posOrderDetail[data.idOrder]['order']['gift_card']);
                if (viewModel.giftCardB() != undefined) {
                    if (viewModel.giftCardB().length == 0) {
                        $('.gift-card-order').hide();
                    } else {
                        posViewModel.loyalty.giftCardsForCurrentOrder = viewModel.giftCardB();
                    }
                }
            }

            self.emptyOrders = ko.observable(false);

            /* Switch between order tab */
            self.orderTab = function (orderType) {
                self.orderDetails([]);
                self.orderHistory([]);
                self.orderedProductsDetail([]);
                self.orderSearchKey('');
                self.selectedOrderType(orderType);
                var selectOrder = true;

                if (orderType == "history") {
                    if (posOrders == undefined || posOrders == null || posOrders.length == 0) {
                        self.emptyOrders(true);
                    } else {
                        var empty = true;
                        var orderSortedKeys = self.sortOrders(Object.keys(posOrders));
                        var mappedTasks = $.map(orderSortedKeys, function (order, index) {
                            // if (posOrders[order].order.id_wkpos_session != idWkPosSession) {
                            empty = false;
                            if (selectOrder) {
                                selectOrder = false;
                                self.loadOrderedDetails({ idOrder: posOrders[order]['order']['id_order'] })
                            }
                            return new _order_js__WEBPACK_IMPORTED_MODULE_4__["Order"](posOrders[order]['order']);
                            // }
                        });
                        self.emptyOrders(empty);
                        Object(_order_js__WEBPACK_IMPORTED_MODULE_4__["loadOrderPanel"])(mappedTasks);
                        // self.orderDetails(mappedTasks);
                    }
                } else if (orderType == "offline") {
                    if (typeof localStorage.pos_orders != 'undefined' && localStorage.pos_orders != null) {
                        var posOfflineOrders = $.parseJSON(localStorage.pos_orders);
                        if (typeof posOfflineOrders == 'undefined' || posOfflineOrders == null || Object.keys(posOfflineOrders).length == 0) {
                            self.emptyOrders(true);
                        } else {
                            var mappedTasks = $.map(posOfflineOrders, function (order, index) {
                                if (selectOrder) {
                                    selectOrder = false;
                                    self.loadOrderedDetails({ idOrder: index })
                                }
                                return new _order_js__WEBPACK_IMPORTED_MODULE_4__["Order"](order['order'])
                            });
                            self.emptyOrders(false);
                            Object(_order_js__WEBPACK_IMPORTED_MODULE_4__["loadOrderPanel"])(mappedTasks);
                            // self.orderDetails(mappedTasks);
                        }
                    } else {
                        self.emptyOrders(true);
                    }
                } else if (orderType == "current_session") {
                    if (posOrders == undefined || posOrders == null || posOrders.length == 0) {
                        self.emptyOrders(true);
                    } else {
                        var empty = true;
                        var orderSortedKeys = self.sortOrders(Object.keys(posOrders));
                        var mappedTasks = $.map(orderSortedKeys, function (order, index) {
                            // if (posOrders[order].order.id_wkpos_session == idWkPosSession) {
                            empty = false;
                            if (selectOrder) {
                                selectOrder = false;
                                self.loadOrderedDetails({ idOrder: posOrders[order]['order']['id_order'] })
                            }
                            return new _order_js__WEBPACK_IMPORTED_MODULE_4__["Order"](posOrders[order]['order']);
                            // }
                        });
                        self.emptyOrders(empty);
                        Object(_order_js__WEBPACK_IMPORTED_MODULE_4__["loadOrderPanel"])(mappedTasks);
                        // self.orderDetails(mappedTasks);
                    }
                }
                Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["listenForScrollEvent"])();
                self.callPosResize();
            }

            /* Add new Address */
            self.onSubmit = function () {
                var errors = self.validateAddressForm();
                if (errors == undefined || errors.length == 0) {
                    var data = {
                        ajax: true,
                        action: 'addNewAddress',
                        first_name: self.firstName(),
                        last_name: self.lastName(),
                        customer_email: self.customerEmail(),
                        alias: self.aliasName(),
                        address1: self.address1(),
                        address2: self.address2(),
                        company: self.company(),
                        vat_number: self.vatNumber(),
                        postcode: self.postcode(),
                        home_phone: self.homePhone(),
                        phone: self.phone(),
                        other: self.other(),
                        id_country: self.selectedIdCountry(),
                        id_state: self.selectedIdState(),
                        city: self.city(),
                        posToken: posToken,
                    };
                    if (self.customerPanel() != "addaddress"
                        && self.selectedIdAddress() != undefined
                        && self.selectedIdAddress() != 0
                    ) {
                        data['id_address'] = self.selectedIdAddress();
                    }
                    if (posViewModel.navigatorOnline()) {
                        $.ajax({
                            url: posSales,
                            dataType: 'json',
                            type: 'POST',
                            data: data,
                            success: function (response) {
                                if (response.hasError) {
                                    $.each(response.errors, function (index, error) {
                                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                        // $.growl.error({ title: "", message: error });
                                    })
                                } else {
                                    $.each(customers, function (key, customer) {
                                        if (customer["id_customer"] == self.idCustomer()) {
                                            customers[key]['addresses'] = response.addresses;
                                            viewModel.selectCustomer(customers[key], key);
                                            return true;
                                        }
                                    });
                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(response.success);
                                    posViewModel.bodyPanel('customers');
                                    // $('.customer-details.cart-product-selected').trigger('click');
                                    // $.growl.notice({ title: "", message: response.success });
                                }
                            },
                            error: function (jqXHR, exception) {
                                Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_13__["ajaxResposeError"])(jqXHR, exception);
                            }
                        });
                    } else {
                        // showErrorMsg(networkError);
                        // $.growl.error({ title: "", message: networkError });
                    }
                } else {
                    $.each(errors, function (index, error) {
                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                        // $.growl.error({ title: "", message: error });
                    });
                }
            }

            self.customerPassword = ko.observable('');
            self.days = ko.observableArray([0]);
            self.months = ko.observableArray([0]);
            self.years = ko.observableArray([0]);
            self.newsLetter = ko.observable(false);
            self.selectedTitle = ko.observable();

            /* Add Customer */
            self.addCustomer = function () {
                var customerEmail = self.customerEmail();
                var customerLastName = self.lastName();
                var customerFirstName = self.firstName();
                var customerPasswd = self.customerPassword();
                var customerPhone = self.customerPhone();

                var hasError = false;

                if (!validate_isName(customerFirstName)) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(invalidFirstName);
                    // $.growl.error({ title: "", message: invalidFirstName });
                    hasError = true;
                }
                if (!validate_isName(customerLastName)) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(invalidLastName);
                    // $.growl.error({ title: "", message: invalidLastName });
                    hasError = true;
                }
                if (!validate_isEmail(customerEmail)) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(invalidEmail);
                    // $.growl.error({ title: "", message: invalidEmail });
                    hasError = true;
                }
                var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (!customerEmail.match(validRegex)) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(invalidEmail);
                    // $.growl.error({ title: "", message: invalidEmail });
                    hasError = true;
                }
                if (customerPasswd != ''
                    && customerPasswd != ' '
                    && !validate_isPasswd(customerPasswd)
                ) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(invalidPasswd);
                    // $.growl.error({ title: "", message: invalidPasswd });
                    hasError = true;
                }
                if (customerPhone != ''
                    && !validate_isPhoneNumber(customerPhone)
                ) {
                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(invalidPhone);
                    hasError = true;
                }

                if (!hasError) {
                    if (posViewModel.navigatorOnline()) {
                        var birthday = (self.years())[0] + '-';
                        if ((self.months())[0] < 0) {
                            birthday += '0' + (self.months())[0] + '-';
                        } else {
                            birthday += (self.months())[0] + '-';
                        }
                        if ((self.days())[0] < 0) {
                            birthday += '0' + (self.days())[0];
                        } else {
                            birthday += (self.days())[0];
                        }

                        var dayWk = $('#days').val();
                        var monthWk = $('#months').val();
                        var yearWk = $('#years').val();
                        var birthday = '';
                        birthday = yearWk + '-' + monthWk + '-' + dayWk;

                        var data = {
                            ajax: true,
                            action: 'addNewCustomer',
                            first_name: customerFirstName,
                            last_name: customerLastName,
                            customer_email: customerEmail,
                            customer_passwd: customerPasswd,
                            birthday: birthday,
                            news_letter: self.newsLetter(),
                            groupAccess: self.groupAccess(),
                            defaultAccess: self.defaultGroup(),
                            title: self.selectedTitle(),
                            customer_phone: customerPhone,
                            posToken: posToken,
                        };
                        if (self.editIdCustomer() != undefined && self.editIdCustomer() != 0) {
                            data['id_customer'] = self.editIdCustomer();
                        }

                        $.ajax({
                            url: posSales,
                            dataType: 'json',
                            type: 'POST',
                            data: data,
                            success: function (response) {
                                if (response.hasError) {
                                    $.each(response.errors, function (index, error) {
                                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                        // $.growl.error({ title: "", message: error });
                                    });
                                } else {
                                    if (response['edit']) {
                                        customers[self.editCustomerIndex()] = response.customer;
                                    } else {
                                        if (customers == undefined) {
                                            customers = [];
                                        }
                                        customers[response.customer.id_customer] = response.customer;
                                        self.customerName(response.customer.name);
                                        self.customerEmail(response.customer.email);
                                        self.idCustomer(response.customer.id_customer);
                                        self.editIdCustomer(response.customer.id_customer);
                                        self.activeCustomerId(response.customer.id_customer);
                                        self.customerHeading(editCustomerHeading);
                                        self.customerPassword('');
                                        viewModel.selectCustomer(
                                            customers[response.customer.id_customer],
                                            response.customer.id_customer
                                        );
                                    }
                                    self.issetCustomer(0);
                                    Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showSuccessMsg"])(response.success);
                                    $('#add-address').trigger('click');
                                    // $.growl.notice({ title: "", message: response.success });
                                }
                            },
                            error: function (jqXHR, exception) {
                                Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_13__["ajaxResposeError"])(jqXHR, exception);
                            }
                        });
                    } else {
                        // showErrorMsg(networkError);
                        // $.growl.error({ title: "", message: networkError });
                    }
                }

            }

            function customerGroup(group) {
                var self = this;
                this.idGroup = parseInt(group.id_group);
                this.groupName = group.name;
            }

            function stateList(state) {
                this.stateName = state.name;
                this.idState = state.id_state;
            }

            var selectedZipFormat, selectedIsoCode;

            /* Get all the states of the selected country in address tab */
            self.getStates = function (data) {
                var idCountry = document.getElementById('id_country').value;
                selectedZipFormat = $('#id_country').find('option:selected').attr("data-zip-format");
                selectedIsoCode = $('#id_country').find('option:selected').attr("data-iso-code");
                self.selectedIdCountry(idCountry);
                if (idCountry != 0) {
                    if (posViewModel.navigatorOnline()) {
                        $.getJSON(
                            posSales,
                            {
                                action: 'getStates',
                                ajax: true,
                                'id_country': idCountry,
                                posToken: posToken
                            },
                            function (response) {
                                if (response.hasError) {
                                    $.each(response.errors, function (index, error) {
                                        Object(_wkgrowlmsg_js__WEBPACK_IMPORTED_MODULE_0__["showErrorMsg"])(error);
                                        // $.growl.error({ title: "", message: error });
                                    });
                                } else {
                                    if (typeof response.states != 'undefined') {
                                        var mappedTasks = $.map(response.states, function (state, index) {
                                            return new stateList(state);
                                        });
                                        self.stateList(mappedTasks);
                                    } else {
                                        self.stateList([]);
                                    }
                                }
                            }
                        );
                    } else {
                        // showErrorMsg(networkError);
                        // $.growl.error({ title: "", message: networkError });
                    }
                }
            }

            /* Validate the address details */
            self.validateAddressForm = function () {
                var errors = [];
                var i = 0;
                if (self.address1() == undefined) {
                    errors[i++] = requireAddress1;
                } else {
                    validate_isAddress(self.address1()) ? '' : errors[i++] = invalidAddress1;
                }
                if (self.address2() != '') {
                    validate_isAddress(self.address2()) ? '' : errors[i++] = invalidAddress2;
                }
                if (selectedZipFormat != undefined && self.postcode() == undefined) {
                    errors[i++] = requireZipCode;
                } else {
                    validate_isPostCode(self.postcode(), selectedZipFormat, selectedIsoCode) ? '' : errors[i++] = invalidPostCode;
                }

                if (self.city() == '') {
                    errors[i++] = requireCityName;
                } else {
                    validate_isCityName(self.city()) ? '' : errors[i++] = invalidCityName;
                }
                if (self.selectedIdCountry() == 0) {
                    errors[i++] = requireCountry;
                }

                if (self.phone() != '') {
                    validate_isPhoneNumber(self.phone()) ? '' : errors[i++] = invalidPhone;
                }

                if (self.homePhone() != '') {
                    validate_isPhoneNumber(self.homePhone()) ? '' : errors[i++] = invalidHomePhone;
                }


                if (self.firstName() != '') {
                    validate_isName(self.firstName()) ? '' : errors[i++] = invalidFirstName;
                }


                if (self.lastName() != '') {
                    validate_isName(self.lastName()) ? '' : errors[i++] = invalidLastName;
                }


                if (self.company() != '') {
                    validate_isGenericName(self.company()) ? '' : errors[i++] = invalidCompanyName;
                }

                if (self.aliasName() == undefined) {
                    errors[i++] = requireAliasName;
                } else {
                    validate_isGenericName(self.aliasName()) ? '' : errors[i++] = invalidAliasName;
                }
                return errors;
            }

            /* Update the selected carrier details */
            self.selectCarrier = function (data, event) {
                self.selectedIdCarrier(data.idCarrier);
                self.selectedCarrierName(data.carrierName);
                self.selectedIdCarrierCost(data.shippingCost);
            }

            /* Create new handler on click of enter */
            ko.bindingHandlers.executeOnEnter = {
                init: function (element, valueAccessor, allBindings, viewModel) {
                    var callback = valueAccessor();
                    $(element).keypress(function (event) {
                        var keyCode = (event.which ? event.which : event.keyCode);
                        if (keyCode === 13) {
                            callback.call(viewModel);
                            return false;
                        }
                        return true;
                    });
                }
            };

            /* Start Custom Product */
            self.openCustomProductForm = function () {
                viewModel.customProductName('');
                viewModel.customProductPrice('');
                viewModel.customProductQuantity('');
                viewModel.customProductTax(0);
                $('#wk-pos-custom-product').modal('toggle');
            }

            self.addCustomProduct = function () {
                let errors = [], i = 0;
                if (viewModel.customProductName() == undefined) {
                    errors[i++] = requireCustomProductName;
                } else if (viewModel.customProductName().trim() == '') {
                    errors[i++] = requireCustomProductName;
                } else {
                    validate_isGenericName(viewModel.customProductName()) ? '' : errors[i++] = invalidCustomProductName;
                }
                var regex = new RegExp("^[a-zA-Z0-9.,/ $@()]+$");
                if (!regex.test(viewModel.customProductName().trim())) {
                    errors[i++] = invalidCustomProductName;
                }
                if (viewModel.customProductPrice() == '') {
                    errors[i++] = requireCustomPrice;
                }
                if (viewModel.customProductPrice() == undefined) {
                    errors[i++] = requireCustomPrice;
                } else {
                    !isNaN(viewModel.customProductPrice()) ? '' : errors[i++] = invalidCustomPrice;
                }
                if (viewModel.customProductPrice() < 0) {
                    errors[i++] = invalidCustomPrice;
                }
                if (viewModel.customProductQuantity() == undefined) {
                    errors[i++] = requireCustomQty;
                }
                if (viewModel.customProductQuantity() == '') {
                    errors[i++] = requireCustomQty;
                }
                if (viewModel.customProductQuantity() <= 0) {
                    errors[i++] = invalidCustomQty;
                } else {
                    !isNaN(viewModel.customProductQuantity()) ? '' : errors[i++] = invalidCustomQty;
                }
                if (viewModel.customProductTax() == undefined || viewModel.customProductTax() == '') {
                    viewModel.customProductTax(0);
                }
                if (errors.length > 0) {
                    $.each(errors, function (index, error) {
                        $.growl.error({ title: "", message: error });
                    });
                } else {
                    ajaxAddCustomProduct(
                        viewModel.customProductName(),
                        viewModel.customProductPrice(),
                        viewModel.customProductQuantity(),
                        viewModel.customProductTax()
                    );
                }
            }

            var addCustomAjax = undefined;
            ajaxAddCustomProduct = async function (name, price, qty, tax) {
                if (typeof addCustomAjax != 'undefined') {
                    addCustomAjax.abort();
                }
                let pos_cart = $.parseJSON(localStorage.pos_cart);
                let cartIndex = self.posCarts()[localStorage.selectedCartId].posCartId() - 1;
                let idCart = 0;
                if (typeof pos_cart[cartIndex] != 'undefined'
                    && typeof pos_cart[cartIndex]['others'] != 'undefined'
                ) {
                    if (typeof pos_cart[cartIndex]['others']['id_cart'] != 'undefined') {
                        idCart = pos_cart[cartIndex]['others']['id_cart'];
                    }
                }
                return new Promise(resolve => {
                    $.ajax({
                        url: posSales,
                        dataType: 'json',
                        type: 'GET',
                        data: {
                            action: 'addCustomProduct',
                            posToken: posToken,
                            name: name,
                            price: price,
                            qty: qty,
                            tax: tax,
                            idCart: idCart,
                            ajax: true
                        },
                        beforeSend: function () {
                            $('#custom-product-btn').attr('disabled', true);
                            $('#custom-product-loader').show(300);
                        },
                        success: function (response) {
                            if (response.hasError) {
                                $.each(response.errors, function (index, error) {
                                    $.growl.error({ title: "", message: error });
                                });
                            } else {
                                if (typeof response.product != 'undefined') {
                                    let newPosProducts = [];
                                    let product = response.product[response.id_product];
                                    newPosProducts[response.id_product] = product;
                                    pos_products = mergeObject(pos_products, newPosProducts);
                                    Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["storeProduct"])(pos_products);
                                    posOnlineProducts = pos_products;
                                    Object(_product_js__WEBPACK_IMPORTED_MODULE_2__["updateStoreProduct"])(pos_products);
                                    setTimeout(function () {
                                        var cartProduct = {};
                                        var appliedTax = parseFloat(price - ((price * 100) / (parseFloat(response.tax_rate_cpro) + 100)));
                                        cartProduct["idProduct"] = product.id;
                                        cartProduct["hasCombination"] = product.has_combination;
                                        cartProduct["name"] = product.name;
                                        cartProduct["price"] = parseFloat(product.price);
                                        cartProduct["imagePath"] = product.image;
                                        cartProduct["quantity"] = qty;
                                        cartProduct["displayPrice"] = product.displayPrice;
                                        cartProduct["taxExcludedPrice"] = parseFloat(product.taxExcludedPrice - appliedTax);
                                        cartProduct["taxRate"] = parseFloat(0);
                                        cartProduct["customProduct"] = true;
                                        cartProduct["specificPrices"] = [];
                                        defaultTaxRate[response.id_product] = 0;
                                        let event = {};
                                        event.target = null;
                                        viewModel.addProductToCart(cartProduct, event);
                                        Object(_tax_js__WEBPACK_IMPORTED_MODULE_9__[/* getTaxRate */ "a"])();
                                    }, 300);
                                }
                            }
                            resolve(true);
                        },
                        error: function (jqXHR, exception) {
                            Object(_wkajaxresponseerror_js__WEBPACK_IMPORTED_MODULE_2__["ajaxResposeError"])(jqXHR, exception);
                        },
                        complete: function () {
                            $('#custom-product-loader').hide(100);
                            $('#custom-product-btn').attr('disabled', false);
                            $('#wk-pos-custom-product').modal('toggle');

                        },
                    });
                });
            }
        }

        /* Mapping of shipping details */
        function ShippingDetails(carrier) {
            var self = this;
            this.idCarrier = carrier.idCarrier;
            this.idReference = carrier.idReference;
            this.shippingCost = carrier.shippingCost;
            this.displayShippingCost = carrier.displayShippingCost;
            this.carrierName = carrier.name;
        }

        /* WEBPACK VAR INJECTION */
    }.call(this, __webpack_require__(21)))
/***/ }),

/* 21 */
/***/ (function (module, exports) {
        var g;
        // This works in non-strict mode
        g = (function () {
            return this;
        })();
        try {
            // This works if eval is allowed (see CSP)
            g = g || new Function("return this")();
        } catch (e) {
            // This works if the window reference is available
            if (typeof window === "object") g = window;
        }
        // g can still be undefined, but nothing to do about it...
        // We return undefined, instead of nothing here, so it's
        // easier to handle this case. if(!global) { ...}
        module.exports = g;
/***/ })
/******/]);
