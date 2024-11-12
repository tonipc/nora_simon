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
if (!defined('_PS_VERSION_')) {
    exit;
}
class AdminWkPosPaytefController extends ModuleAdminController
{
    public function __construct()
    {
        $this->context = Context::getContext();
        $this->bootstrap = true;
        $this->table = 'wkpos_paytef_transaction';
        $this->className = 'WkPosPaytefTransaction';
        $this->identifier = 'id_wkpos_paytef_transaction';

        $this->_orderBy = 'a.id_wkpos_paytef_transaction';
        $this->_orderWay = 'ASC';
        $this->list_no_link = true;

        parent::__construct();

        $this->page_header_toolbar_title = $this->l('Paytef transactions');

        $this->fields_list = [
            'id_wkpos_paytef_transaction' => [
                'title' => $this->l('ID'),
                'align' => 'center',
                'class' => 'fixed-width-xs',
            ],
            'id_cart' => [
                'title' => $this->l('ID cart'),
                'havingFilter' => false,
            ],
            'id_order' => [
                'title' => $this->l('ID order'),
                'align' => 'center',
            ],
            'reference' => [
                'title' => $this->l('Paytef transaction reference'),
                'align' => 'center',
            ],
            'acquirerID' => [
                'title' => $this->l('Payment acquirer ID'),
                'align' => 'center',
            ],
            'amount' => [
                'title' => $this->l('Amount'),
                'align' => 'center',
                'type' => 'decimal',
                'havingFilter' => true,
                'filter_key' => 'a!amount',
                'callback' => 'getFormatAmount',
            ],
            'date_add' => [
                'title' => $this->l('Date'),
                'align' => 'center',
                'filter_key' => 'a!date_add',
            ],
        ];

    }

    public function getFormatAmount($val)
    {
        $result = Tools::displayPrice($val);

        return $result;
    }

    public function initPageHeaderToolbar()
    {
        unset($this->toolbar_btn['new']);
        parent::initPageHeaderToolbar();
    }

}
