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

import { getTaxRate } from './tax.js';
import { showErrorMsg } from './wkgrowlmsg.js';

/* Mapping of customer address in object  */
export function customerAddressDetail(address) {
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
    this.other = address.other;
}

export function selectDeliveryAddress() {
    var customerAddress;
    var customerIndex, addressIndex;
    if (viewModel.selectedIdAddress() != undefined) {
        if (viewModel.selectedIdAddress() == outletAddress['id_address']) {
            if (outletAddress['active'] == 0) {
                showErrorMsg(deliveryAddressError);
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
                                showErrorMsg(deliveryAddressError);
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
        getTaxRate();
    }
}
