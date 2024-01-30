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

import { removeAllVouchers } from './voucher.js';
import { customerAddressDetail } from './address.js';

/* Mapping of customer details */
export function CustomerDetails(customer, index) {
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
export function searchOnlineCustomer() {
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
export function searchCustomer() {
    var i = 0, mappedCustomers = [];
    var allreadyInserted = 0;
    var searchCustomerKey = viewModel.customerSearchKey();
    $.each(customers, function (index, customer) {
        allreadyInserted = 0;
        if (index == 0) {
            viewModel.activeCustomerId(customer.id_customer);
        }
        if (searchCustomerKey != '') {
            if (viewModel.selectedSearchTypeId() == 2) {
                if (customer["email"].search((searchCustomerKey).replace(/\\/g, "\\\\")) != '-1'
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
                if (customer["name"].toLowerCase().search(((searchCustomerKey).replace(/\\/g, "\\\\")).toLowerCase()) != '-1'
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


var remainingCustomers = [];
export function loadCustomersPanel(customers, onScroll = false) {
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

export function selectCustomer(customer, index) {
    var prevCustomerId = viewModel.activeCustomerId();
    if (customer.idCustomer !== undefined) {
        viewModel.customerAddressesDetails([]);
        viewModel.customerAddresses([]);
        viewModel.customerName(customer.customerName);
        viewModel.customerEmail(customer.customerEmail);
        viewModel.idCustomer(customer.idCustomer);
        viewModel.activeCustomerId(customer.idCustomer);
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

        viewModel.customerAddresses.push(new customerAddressDetail(outletAddress));
        if (typeof customers != 'undefined'
            && typeof customers[customerIndex] != 'undefined'
            && typeof customers[customerIndex]['addresses'] != 'undefined'
        ) {
            $.each(customers[customerIndex]['addresses'], function (index, address) {
                viewModel.customerAddresses.push(new customerAddressDetail(address));
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
            viewModel.customerAddresses.push(new customerAddressDetail(outletAddress));
            if (customer.addresses != undefined) {
                $.each(customer.addresses, function (index, address) {
                    viewModel.customerAddresses.push(new customerAddressDetail(address));
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
    removeAllVouchers(prevCustomerId);
}

export function updateCustomer(customers) {
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

export function getSelectedCustomerIndex(idCustomer) {
    var selectedIndex = -1;
    $.each(customers, function (index, customer) {
        if (customer["id_customer"] == idCustomer) {
            selectedIndex = index;
            return;
        }
    });
    return selectedIndex;
}
