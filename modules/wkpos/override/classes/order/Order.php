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
class Order extends OrderCore
{
    public function addOrderPayment($amount_paid, $payment_method = null, $payment_transaction_id = null, $currency = null, $date = null, $order_invoice = null, int $id_employee = null)
    {
        if (Module::isEnabled('wkpos')) {
            $context = Context::getContext();
            if (Tools::getIsset('action')
                && Tools::getIsset('ajax')
                && Tools::getValue('ajax')
                && Tools::getIsset('fc')
                && Tools::getIsset('module')
                && Tools::getValue('fc') == 'module'
                && Tools::getValue('module') == 'wkpos'
                && Tools::getValue('action') == 'generateOrder'
                && !empty(Tools::getValue('paymentDetails'))
            ) {
                $paymentDetails = Tools::getValue('paymentDetails');
                foreach ($paymentDetails as $paymentDetail) {
                    // return parent::addOrderPayment($paymentDetail['tendered'], $paymentDetail['paymentMethod']);

                    $order_payment = new OrderPayment();
                    $order_payment->order_reference = $this->reference;
                    $order_payment->id_currency = ($currency ? $currency->id : $this->id_currency);
                    // we kept the currency rate for historization reasons
                    $order_payment->conversion_rate = ($currency ? $currency->conversion_rate : 1);
                    // if payment_method is define, we used this
                    $order_payment->payment_method = $paymentDetail['paymentMethod'];
                    $order_payment->transaction_id = $payment_transaction_id;
                    $order_payment->amount = (float) $paymentDetail['tendered'];
                    $order_payment->date_add = ($date ? $date : null);

                    // Add time to the date if needed
                    if ($order_payment->date_add != null && preg_match('/^[0-9]+-[0-9]+-[0-9]+$/', $order_payment->date_add)) {
                        $order_payment->date_add .= ' ' . date('H:i:s');
                    }

                    // Update total_paid_real value for backward compatibility reasons
                    if ($order_payment->id_currency == $this->id_currency) {
                        $this->total_paid_real += $order_payment->amount;
                    } else {
                        $default_currency = (int) Configuration::get('PS_CURRENCY_DEFAULT');
                        if ($order_payment->id_currency === $default_currency) {
                            $this->total_paid_real += Tools::ps_round(
                                Tools::convertPrice((float) $order_payment->amount, $this->id_currency, false),
                                Context::getContext()->getComputingPrecision()
                            );
                        } else {
                            $amountInDefaultCurrency = Tools::convertPrice((float) $order_payment->amount, $order_payment->id_currency, false);
                            $this->total_paid_real += Tools::ps_round(
                                Tools::convertPrice($amountInDefaultCurrency, $this->id_currency, true),
                                Context::getContext()->getComputingPrecision()
                            );
                        }
                    }

                    // We put autodate parameter of add method to true if date_add field is null
                    $res = $order_payment->add(null === $order_payment->date_add) && $this->update();

                    if (!$res) {
                        return false;
                    }

                    if (null !== $order_invoice) {
                        $res = Db::getInstance()->execute('
                        INSERT INTO `' . _DB_PREFIX_ . 'order_invoice_payment` (`id_order_invoice`, `id_order_payment`, `id_order`)
                        VALUES(' . (int) $order_invoice->id . ', ' . (int) $order_payment->id . ', ' . (int) $this->id . ')');

                        // Clear cache
                        Cache::clean('order_invoice_paid_*');
                    }
                }

                return $res;
            } else {
                return parent::addOrderPayment($amount_paid, $payment_method, $payment_transaction_id, $currency, $date, $order_invoice, $id_employee);
            }
        } else {
            return parent::addOrderPayment($amount_paid, $payment_method, $payment_transaction_id, $currency, $date, $order_invoice, $id_employee);
        }
    }
}
