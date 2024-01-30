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
class AdminWkPosUserController extends ModuleAdminController
{
    public function __construct()
    {
        $this->bootstrap = true;
        $this->lang = false;
        $this->context = Context::getContext();
        parent::__construct();
        $this->table = 'wkpos_user';
        $this->className = 'WkPosUser';
        $this->_select = 'wkposo.`name` as `outlet_name`, CASE WHEN a.`id_employee` != 0 THEN "' . $this->l('YES');
        $this->_select .= '" ELSE "' . $this->l('NO') . '" END AS `' . _DB_PREFIX_ . 'employee`';
        $this->_join .= ' LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_employee` wkpose ON
        (a.`id_employee` = wkpose.`id_employee`)';
        $this->_join .= ' LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlets` wkposo ON
        (wkpose.`id_wkpos_outlet` = wkposo.`id_wkpos_outlet`)';
        $this->identifier = 'id_employee';
        $this->_where = ' AND a.`deleted` = 0';
        $idShop = $this->context->shop->id;
        if (Shop::getContext() == Shop::CONTEXT_SHOP) {
            $this->_where .= ' AND wkposo.`id_shop` = ' . (int) $idShop;
        }
        if (Shop::getContext() == Shop::CONTEXT_GROUP) {
            $idShops = Shop::getContextListShopID();
            $this->_where .= ' AND wkposo.`id_shop` IN (' . implode(',', $idShops) . ')';
        }
        $this->_orderBy = $this->identifier;
        $this->toolbar_title = $this->l('Cashiers');
        $this->fields_list = [
            // 'id_wkpos_user' => array(
            //     'title' => $this->l('ID'),
            //     'align' => 'center',
            // ),
            'id_employee' => [
                'title' => $this->l('Employee ID'),
                'align' => 'center',
                'havingFilter' => true,
            ],
            'name' => [
                'title' => $this->l('Cashier name'),
                'align' => 'center',
                'havingFilter' => true,
            ],
            // 'ps_employee' => array(
            //     'title' => $this->l('PS Employee'),
            //     'align' => 'center',
            //     'havingFilter' => true
            // ),
            'outlet_name' => [
                'title' => $this->l('Outlet assinged'),
                'align' => 'center',
                'havingFilter' => true,
            ],
            'date_add' => [
                'title' => $this->l('Date add'),
                'type' => 'datetime',
                'havingFilter' => true,
                'align' => 'center',
                'callback' => 'getformatedDate',
            ],
            'date_upd' => [
                'title' => $this->l('Date update'),
                'type' => 'datetime',
                'callback' => 'getformatedDate',
                'havingFilter' => true,
                'align' => 'center',
            ],
        ];
        if (Tools::isSubmit('submitFilter') && Tools::isSubmit('submitFilterid_employee')) {
            $this->filter = true;
            $this->processFilter();
        }

        if (Tools::isSubmit('submitResetid_employee')) {
            $this->processResetFilters();
        }

        $this->objWkPosSession = null;
    }

    public function getformatedDate($row)
    {
        $idLang = Context::getContext()->language->id;
        $lang = new Language($idLang);
        if ($row != '0000-00-00 00:00:00') {
            return date($lang->date_format_full, strtotime($row));
        }
    }

    public function renderView()
    {
        $idEmployee = (int) Tools::getValue('id_employee');
        if ($idEmployee) {
            Tools::redirectAdmin(
                $this->context->link->getAdminLink(
                    'AdminEmployees',
                    true,
                    [
                        'id_employee' => $idEmployee,
                        'updateEmployee' => '1',
                    ]
                )
            );
        }
    }

    /**
     * Get outlet list
     *
     * @return void
     */
    public function renderList()
    {
        unset($this->toolbar_btn['new']);
        $this->addRowAction('view');

        return parent::renderList();
    }

    public function initPageHeaderToolbar()
    {
        if ($this->display == 'view') {
            // $this->object = $this->loadObject();
            // if ($this->object) {
            //     $objControlPanel = new WkPosControlPanel($this->object->id_wkpos_control_panel);
            //     $controlPanel = $objControlPanel->date_add.'/'.$objControlPanel->id;
            //     $this->toolbar_title[] = $this->l('Reference').': '.$this->l('POS').'/'.$controlPanel;
            // }
        }
        if ($this->display != 'edit') {
            // $this->page_header_toolbar_btn['Add New User'] = array(
            //     'href' => self::$currentIndex.'&add'.$this->table.'&token='.$this->token,
            //     'desc' => $this->l('Add New User'),
            //     'icon' => 'process-icon-new'
            // );
        }

        return parent::initPageHeaderToolbar();
    }

    public function renderForm()
    {
        $this->fields_form = [
            'legend' => [
                'title' => $this->l('POS Cashier'),
                'icon' => 'icon-cube',
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => $this->l('Name'),
                    'name' => 'name',
                    'required' => true,
                    // 'class' =>'fixed-width-lg'
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Enabled'),
                    'name' => 'active',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Yes'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('No'),
                        ],
                    ],
                ],
            ],
            'submit' => [
                'title' => $this->l('Save'),
                'name' => 'submitWkPosUser',
            ],
        ];
        if ($this->display == 'add') {
            $this->fields_value['active'] = 1;
        }

        return parent::renderForm();
    }

    public function processSave()
    {
        $idUser = Tools::getValue('id_wkpos_user');
        $name = trim(Tools::getValue('name'));
        if (empty($name)) {
            $this->errors[] = $this->l('Please enter POS user name.');
        } elseif (!Validate::isGenericName($name)) {
            $this->errors[] = $this->l('Please enter valid POS user name');
        }
        if (empty($this->errors)) {
            return parent::processSave();
        } else {
            if ($idUser) {
                $this->display = 'edit';
            } else {
                $this->display = 'add';
            }

            return $this->errors;
        }
    }
}
