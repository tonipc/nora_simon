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
class Customer extends CustomerCore
{
    public static function customerHasAddress($idCustomer, $idAddress)
    {
        $context = Context::getContext();
        if (Module::isEnabled('wkpos')
            && isset($context->cookie->id_wkpos_outlet, $context->controller->ajax)

            && $context->controller->ajax
            && (Tools::getValue('action') == 'addProductToCart')
        ) {
            Module::getInstanceByName('wkpos');
            $objOutlet = new WkPosOutlets($context->cookie->id_wkpos_outlet);
            if (isset($objOutlet->id_address)
                && ((int) $objOutlet->id_address > 0)
                && ((int) $objOutlet->id_address === (int) Tools::getValue('id_address'))
            ) {
                return true;
            }
        }

        return parent::customerHasAddress($idCustomer, $idAddress);
    }
}
