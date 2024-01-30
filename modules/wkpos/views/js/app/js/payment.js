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
import { makeTotalProductCaculation } from './wkformatcurrency.js';

export function PaymentOption(data) {
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
        changePrice = makeTotalProductCaculation(parseFloat(changePrice));
        changePrice = parseFloat(changePrice);
        return changePrice.toFixed(psPrecision);
    }, this);
    self.paymentMethod = data.paymentMethod;
}
