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
class AdminWkPosPaymentsController extends ModuleAdminController
{
    public function __construct()
    {
        $this->bootstrap = true;
        $this->lang = true;
        $this->bootstrap = true;

        $this->context = Context::getContext();

        parent::__construct();
        $this->toolbar_title = $this->l('Payments');
        $this->outletList();
    }

    /**
     * Get outlet list
     *
     * @return void
     */
    protected function outletList()
    {
        $this->table = 'wkpos_payment';
        $this->className = 'WkPosPayment';
        $this->identifier = 'id_wkpos_payment';

        // Shop filter
        $this->_orderBy = $this->identifier;

        $this->addRowAction('edit');

        $this->fields_list = [
            'id_wkpos_payment' => [
                'title' => $this->l('ID'),
                'align' => 'center',
            ],
            'name' => [
                'title' => $this->l('Payment Name'),
                'align' => 'center',
                'havingFilter' => true,
            ],
            'active' => [
                'title' => $this->l('Status'),
                'type' => 'bool',
                'align' => 'center',
                'active' => 'status',
            ],
        ];

        $this->bulk_actions = [
            'enableSelection' => [
                'text' => $this->l('Enable selection'),
                'icon' => 'icon-power-off text-success',
            ],
            'disableSelection' => [
                'text' => $this->l('Disable selection'),
                'icon' => 'icon-power-off text-danger',
            ],
        ];
    }

    public function renderForm()
    {
        $title = $this->l('Nuevo metodo de pago');

        if ($this->object->id) {
            $title = $this->l('Editar metodo de pago');
        }

        $this->fields_form = [
            'legend' => [
                'title' => $title,
                'icon' => 'icon-time'
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => $this->l('Nombre método de pago'),
                    'name' => 'name',
                    'lang' => true,
                    'required' => true,
                    'col' => 4,
                ],
            ],
            'submit' => [
                'title' => $this->l('Save')
            ],
        ];

        return parent::renderForm();
    }

}
