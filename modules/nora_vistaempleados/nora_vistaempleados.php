<?php
/**
* 2007-2021 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2021 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

if (!defined('_PS_VERSION_')) {
    exit;
}

class nora_vistaempleados extends Module
{
    public $output = '';
    public $configs = [
        'EMPLEADOS_VISTACLIENTE',
        'EMPLEADOS_AUTOPAGO_CAFETERIAS',
        // 'EMPLEADOS_TAKEAWAY',
        // 'EMPLEADOS_MOSTRAR_CERRAR_SESION'
    ];
	public function __construct() 
	{
		$this->name = 'nora_vistaempleados';
		$this->tab = 'front_office_features'; 
		$this->version = '1.1.0';							 	
		$this->author = 'Sebas and tpc';								
		$this->bootstrap = true;
		$this->need_instance = 0;
		parent::__construct();	
		$this->displayName = $this->l('Vista Empleado/Cliente');	
		$this->description = $this->l('Cambiar la vista de un empleado a vista cliente'); 
		$this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);
	}

    public function getContent()
    {
        if (Tools::isSubmit('submitAll')) {
            $this->postProcess();
            $this->output .= $this->displayConfirmation($this->l('Lista de varias vistas empleados actualizada.'));
        }

        return $this->output . $this->displayForm();
    }

    public function postProcess()
    {
        foreach ($this->configs as $field) {
            Configuration::updateValue($field, json_encode(Tools::getValue($field)));
        }
    }

    public function displayForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitAll';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            .'&configure='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm($this->displayAll());
    }

    private function getConfigValues()
    {
        $fields = array();
        foreach ($this->configs as $field) {
            $fields[$field.'[]'] = Tools::getValue($field, json_decode(Configuration::get($field), true));
        }

        return $fields;
    }

    public function displayAll()
    {
        $employees = $this->getEmployees();

        $fields = array();
        $fields[0]['form'] = array(
            'legend' => array(
                'title' => $this->l('Configuración de empleados con AUTOPAGO + TAKEAWAY'),
                'icon' => 'icon-cogs',
            ),
            'input' => array(
                array(
                    'type' => 'select',
                    'multiple' => true,
                    'class' => 'chosen',
                    'label' => $this->l('Empleados con vista SÓLO MENUS + EXTRAS'),
                    'name' => 'EMPLEADOS_VISTACLIENTE',
                    'options' => array(
                        'query' => $employees,
                        'id' => 'id_employee',
                        'name' => 'name',
                    ),
                ),
                array(
                    'type' => 'select',
                    'multiple' => true,
                    'class' => 'chosen',
                    'label' => $this->l('Empleados con vista SÓLO DESAYUNOS'),
                    'name' => 'EMPLEADOS_AUTOPAGO_CAFETERIAS',
                    'options' => array(
                        'query' => $employees,
                        'id' => 'id_employee',
                        'name' => 'name',
                    ),
                ),
                // array(
                //     'type' => 'select',
                //     'multiple' => true,
                //     'class' => 'chosen',
                //     'label' => $this->l('Empleados con vista SÓLO TAKE AWAY'),
                //     'name' => 'EMPLEADOS_TAKEAWAY',
                //     'options' => array(
                //         'query' => $employees,
                //         'id' => 'id_employee',
                //         'name' => 'name',
                //     ),
                // ),
                // array(
                //     'type' => 'select',
                //     'multiple' => true,
                //     'class' => 'chosen',
                //     'label' => $this->l('Empleados con visibilidad del boton de CERRAR SESION'),
                //     'name' => 'EMPLEADOS_MOSTRAR_CERRAR_SESION',
                //     'options' => array(
                //         'query' => $employees,
                //         'id' => 'id_employee',
                //         'name' => 'name',
                //     ),
                // ),
            ),
            'submit' => array(
                'title' => $this->l('Update settings'),
                'type' => 'submit',
                'name' => 'submitAll',
            ), 
        );

        return $fields;
    }

    private function getEmployees()
    {
        return Db::getInstance()->executeS('SELECT CONCAT(firstname, " ", lastname, " (", email, ")") as name, id_employee FROM ' . _DB_PREFIX_ . 'employee');
    }
}