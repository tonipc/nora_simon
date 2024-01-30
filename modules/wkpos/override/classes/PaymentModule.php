<?php
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
abstract class PaymentModule extends PaymentModuleCore
{
    protected function createOrderCartRules(
        Order $order,
        Cart $cart,
        $order_list,
        $total_reduction_value_ti,
        $total_reduction_value_tex,
        $id_order_state
    ) {
        if (Module::isEnabled('wkpos')
            && Tools::getIsset('action')
            && Tools::getIsset('ajax')
            && Tools::getValue('ajax')
            && Tools::getIsset('fc')
            && Tools::getIsset('module')
            && Tools::getValue('fc') == 'module'
            && Tools::getValue('module') == 'wkpos'
        ) {
            // added for pos module
            $this->context->cookie->idVoucher = 0;
            $this->context->cookie->write();
            // added for pos module

            $cart_rule_used = [];
            $computingPrecision = Context::getContext()->getComputingPrecision();

            // prepare cart calculator to correctly get the value of each cart rule
            $calculator = $cart->newCalculator($order->product_list, $cart->getCartRules(), $order->id_carrier, $computingPrecision);
            $calculator->processCalculation();
            $cartRulesData = $calculator->getCartRulesData();

            $cart_rules_list = [];
            foreach ($cartRulesData as $cartRuleData) {
                $cartRule = $cartRuleData->getCartRule();
                // Here we need to get actual values from cart calculator
                $values = [
                    'tax_incl' => $cartRuleData->getDiscountApplied()->getTaxIncluded(),
                    'tax_excl' => $cartRuleData->getDiscountApplied()->getTaxExcluded(),
                ];

                // If the reduction is not applicable to this order, then continue with the next one
                if (!$values['tax_excl']) {
                    continue;
                }

                // IF
                //  This is not multi-shipping
                //  The value of the voucher is greater than the total of the order
                //  Partial use is allowed
                //  This is an "amount" reduction, not a reduction in % or a gift
                // THEN
                //  The voucher is cloned with a new value corresponding to the remainder
                $cartRuleReductionAmountConverted = $cartRule->reduction_amount;
                if ((int) $cartRule->reduction_currency !== $cart->id_currency) {
                    $cartRuleReductionAmountConverted = Tools::convertPriceFull(
                        $cartRule->reduction_amount,
                        new Currency((int) $cartRule->reduction_currency),
                        new Currency($cart->id_currency)
                    );
                }
                $remainingValue = $cartRuleReductionAmountConverted - $values[$cartRule->reduction_tax ? 'tax_incl' : 'tax_excl'];
                $remainingValue = Tools::ps_round($remainingValue, _PS_PRICE_COMPUTE_PRECISION_);
                if (count($order_list) == 1 && $remainingValue > 0 && $cartRule->partial_use == 1 && $cartRuleReductionAmountConverted > 0) {
                    // Create a new voucher from the original
                    $voucher = new CartRule((int) $cartRule->id); // We need to instantiate the CartRule without lang parameter to allow saving it
                    unset($voucher->id);

                    // Set a new voucher code
                    $voucher->code = empty($voucher->code) ? substr(md5($order->id . '-' . $order->id_customer . '-' . $cartRule->id), 0, 16) : $voucher->code . '-2';
                    if (preg_match('/\-([0-9]{1,2})\-([0-9]{1,2})$/', $voucher->code, $matches) && $matches[1] == $matches[2]) {
                        $voucher->code = preg_replace('/' . $matches[0] . '$/', '-' . ((int) $matches[1] + 1), $voucher->code);
                    }

                    // Set the new voucher value
                    $voucher->reduction_amount = $remainingValue;
                    if ($voucher->reduction_tax) {
                        // Add total shipping amount only if reduction amount > total shipping
                        if ($voucher->free_shipping == 1 && $voucher->reduction_amount >= $order->total_shipping_tax_incl) {
                            $voucher->reduction_amount -= $order->total_shipping_tax_incl;
                        }
                    } else {
                        // Add total shipping amount only if reduction amount > total shipping
                        if ($voucher->free_shipping == 1 && $voucher->reduction_amount >= $order->total_shipping_tax_excl) {
                            $voucher->reduction_amount -= $order->total_shipping_tax_excl;
                        }
                    }
                    if ($voucher->reduction_amount <= 0) {
                        continue;
                    }

                    if ($this->context->customer->isGuest()) {
                        $voucher->id_customer = 0;
                    } else {
                        $voucher->id_customer = $order->id_customer;
                    }

                    $voucher->quantity = 1;
                    $voucher->reduction_currency = $order->id_currency;
                    $voucher->quantity_per_user = 1;
                    if ($voucher->add()) {
                        // Added for POS module
                        $this->context->cookie->idVoucher = $voucher->id;
                        $this->context->cookie->write();
                        // Added for POS module

                        // If the voucher has conditions, they are now copied to the new voucher
                        CartRule::copyConditions($cartRule->id, $voucher->id);
                        $orderLanguage = new Language((int) $order->id_lang);

                        $params = [
                            '{voucher_amount}' => Tools::getContextLocale($this->context)->formatPrice($voucher->reduction_amount, $this->context->currency->iso_code),
                            '{voucher_num}' => $voucher->code,
                            '{firstname}' => $this->context->customer->firstname,
                            '{lastname}' => $this->context->customer->lastname,
                            '{id_order}' => $order->id,
                            '{order_name}' => $order->getUniqReference(),
                        ];
                        Mail::Send(
                            (int) $order->id_lang,
                            'voucher',
                            Context::getContext()->getTranslator()->trans(
                                'New voucher for your order %s',
                                [$order->reference],
                                'Emails.Subject',
                                $orderLanguage->locale
                            ),
                            $params,
                            $this->context->customer->email,
                            $this->context->customer->firstname . ' ' . $this->context->customer->lastname,
                            null, null, null, null, _PS_MAIL_DIR_, false, (int) $order->id_shop
                        );
                    }

                    $values['tax_incl'] = $order->total_products_wt - $total_reduction_value_ti;
                    $values['tax_excl'] = $order->total_products - $total_reduction_value_tex;
                    if (1 == $voucher->free_shipping) {
                        $values['tax_incl'] += $order->total_shipping_tax_incl;
                        $values['tax_excl'] += $order->total_shipping_tax_excl;
                    }
                }
                $total_reduction_value_ti += $values['tax_incl'];
                $total_reduction_value_tex += $values['tax_excl'];

                $order->addCartRule($cartRule->id, $cartRule->name, $values, 0, $cartRule->free_shipping);

                if ($id_order_state != Configuration::get('PS_OS_ERROR') && $id_order_state != Configuration::get('PS_OS_CANCELED') && !in_array($cartRule->id, $cart_rule_used)) {
                    $cart_rule_used[] = $cartRule->id;

                    // Create a new instance of Cart Rule without id_lang, in order to update its quantity
                    $cart_rule_to_update = new CartRule((int) $cartRule->id);
                    $cart_rule_to_update->quantity = max(0, $cart_rule_to_update->quantity - 1);
                    $cart_rule_to_update->update();
                }

                $cart_rules_list[] = [
                    'voucher_name' => $cartRule->name,
                    'voucher_reduction' => ($values['tax_incl'] != 0.00 ? '-' : '') . (Product::getTaxCalculationMethod() == PS_TAX_EXC
                        ? Tools::getContextLocale($this->context)->formatPrice($values['tax_excl'], $this->context->currency->iso_code)
                        : Tools::getContextLocale($this->context)->formatPrice($values['tax_incl'], $this->context->currency->iso_code)
                    ),
                ];
            }

            return $cart_rules_list;
        } else {
            return parent::createOrderCartRules(
                $order,
                $cart,
                $order_list,
                $total_reduction_value_ti,
                $total_reduction_value_tex,
                $id_order_state
            );
        }
    }
}
