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
class Carrier extends CarrierCore
{
    public static function getAvailableCarrierList(
        Product $product,
        $id_warehouse,
        $id_address_delivery = null,
        $id_shop = null,
        $cart = null,
        &$error = []
    ) {
        $carrierList = parent::getAvailableCarrierList(
            $product,
            $id_warehouse,
            $id_address_delivery,
            $id_shop,
            $cart,
            $error
        );
        if (Module::isEnabled('wkpos')) {
            $context = Context::getContext();
            if (Tools::getIsset('action')
                && Tools::getIsset('ajax')
                && Tools::getValue('ajax')
                && Tools::getIsset('fc')
                && Tools::getIsset('module')
                && Tools::getValue('fc') == 'module'
                && Tools::getValue('module') == 'wkpos'
            ) {
                if (isset($context->cookie->id_outlet_employee) && $context->cookie->id_outlet_employee) {
                    $posIdCarrier = static::getCarrierId();
                    if (!Configuration::get('WKPOS_ENABLE_SHIPPING')) {
                        return [$posIdCarrier => $posIdCarrier];
                    } else {
                        if (Tools::getValue('action') == 'getShippingCarriers') {
                            return $carrierList;
                        }
                        if (Tools::getValue('id_carrier')) {
                            $idCarrier = Tools::getValue('id_carrier');

                            return [
                                $idCarrier => $idCarrier,
                            ];
                        } else {
                            return [$posIdCarrier => $posIdCarrier];
                        }
                    }
                }
            }
        }
        $posIdCarrier = static::getCarrierId();
        if (in_array($posIdCarrier, $carrierList)) {
            $posCarrierList = [];
            foreach ($carrierList as $key => $carrier) {
                if ($carrier != $posIdCarrier) {
                    $posCarrierList[$key] = $carrier;
                }
            }

            return $posCarrierList;
        }

        return $carrierList;
    }

    public static function getCarrierId()
    {
        $objCarrier = Carrier::getCarrierByReference((int) Configuration::get('WKPOS_ID_CARRIER_REFERENCE'));
        if (Validate::isLoadedObject($objCarrier)) {
            return $objCarrier->id;
        }

        return 0;
    }
}
