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

require_once dirname(__FILE__) . '/classes/WkPosPaytefDb.php';
require_once dirname(__FILE__) . '/classes/WkPosPaytefHelper.php';
require_once dirname(__FILE__) . '/classes/WkPosPaytefTransaction.php';

if (Module::isEnabled('wkpos')) {
    require_once dirname(__FILE__) . '/../wkpos/classes/wkposrequire.php';
}

class WkPosPayTef extends Module
{
    public $secure_key;

    public function __construct()
    {
        $this->name = 'wkpospaytef';
        $this->tab = 'administration';
        $this->version = '1.0.0';
        $this->author = 'Webkul';
        $this->need_instance = 1;
        $this->bootstrap = true;
        parent::__construct();
        if (_PS_VERSION_ >= '1.7') {
            $this->secure_key = Tools::hash($this->name);
        } else {
            $this->secure_key = Tools::encrypt($this->name);
        }
        $this->dependencies = ['wkpos'];
        $this->displayName = $this->l('POS PAYTEF Reader');
        $this->ps_versions_compliancy = ['min' => '1.7', 'max' => _PS_VERSION_];
        $this->description =
        $this->l('POS PAYTEF Reader modules help to collect payment through terminal in PrestaShop POS.');
        $this->confirmUninstall = $this->l('Are you sure you want to uninstall module?');
    }

    public function install()
    {
        if (extension_loaded('curl') == false) {
            $this->_errors[] = $this->l('You have to enable the cURL extension on your server to install this module');

            return false;
        }

        $objWkPosPaytefDb = new WkPosPaytefDb();
        if (Shop::isFeatureActive()) {
            Shop::setContext(Shop::CONTEXT_ALL);
        }
        if (!parent::install()
            || !$objWkPosPaytefDb->createTables()
            || !$this->registerPsHooks()
            || !$this->callInstallTab()
            || !$this->defaultPaymentMethod()
            || !$this->alterOutletEmployeeTableAddColumns()
            || !$this->alterOutletTableAddColumn() // alter outlet table for customization not paytef module
        ) {
            return false;
        }

        return true;
    }

    public function registerPsHooks()
    {
        $hooks = [
            'actionPosSetMedia',
            'wkposDisplayBeforeBodyClosingTag',
            'displayPosHeaderButtons',
            'actionOrderStatusPostUpdate',
            'actionEmployeeFormBuilderModifier',
            'actionAfterCreateEmployeeFormHandler',
            'actionAfterUpdateEmployeeFormHandler',
        ];

        return $this->registerHook($hooks);
    }

    public function callInstallTab()
    {
        $this->installTab('AdminWkPosPaytef', 'Paytef Transactions', 'AdminPOSManage');

        return true;
    }

    public function installTab($className, $tabName, $tabParentName = false)
    {
        $tab = new Tab();

        $tab->active = 1;
        $tab->class_name = $className;
        $tab->name = [];
        foreach (Language::getLanguages(true) as $lang) {
            $tab->name[$lang['id_lang']] = $tabName;
        }

        if ($tabParentName) {
            $tab->id_parent = (int) Tab::getIdFromClassName($tabParentName);
            $tab->icon = 'shopping_cart';
        } else {
            $tab->id_parent = 0;
        }

        $tab->module = $this->name;

        return $tab->add();
    }

    protected function defaultPaymentMethod()
    {
        $objPosPayment = new WkPosPayment();
        $objPosPayment->name = $this->l('Paytef');
        $objPosPayment->active = 1;
        $objPosPayment->save();
        $objPosPayment->delete();

        $paytefPayment = WkPosPaytefHelper::getPosPaymentByName('Paytef');
        if ($paytefPayment) {
            $objPosPayment = new WkPosPayment($paytefPayment['id_wkpos_payment']);
            $objPosPayment->active = 1;
            if ($objPosPayment->save()) {
                Configuration::updateValue('WKPOS_PAYTEF_PAYMENT_ID', $objPosPayment->id);
            }
        } else {
            $objPosPayment = new WkPosPayment();
            $objPosPayment->name = $this->l('Paytef');
            $objPosPayment->active = 1;
            if ($objPosPayment->save()) {
                Configuration::updateValue('WKPOS_PAYTEF_PAYMENT_ID', $objPosPayment->id);
            }
        }

        return true;
    }

    public function uninstall()
    {
        $objWkPosPaytefDb = new WkPosPaytefDb();
        if (!parent::uninstall()
            || !$objWkPosPaytefDb->deleteTables()
            || !$this->uninstallTab()
            || !$this->deactivatePaytefPaymentMethod()
            || !$this->unsetConfigurationVariable()
        ) {
            return false;
        }

        return true;
    }

    public function uninstallTab()
    {
        $moduleTabs = Tab::getCollectionFromModule($this->name);
        if (!empty($moduleTabs)) {
            foreach ($moduleTabs as $moduleTab) {
                $moduleTab->delete();
            }
        }

        return true;
    }

    public function unsetConfigurationVariable()
    {
        $configKeys = [
            'WKPOS_PAYTEF_PAYMENT_ID',
        ];
        foreach ($configKeys as $config) {
            Configuration::deleteByName($config);
        }

        return true;
    }

    public function deactivatePaytefPaymentMethod()
    {
        $objPosPayment = new WkPosPayment(Configuration::get('WKPOS_PAYTEF_PAYMENT_ID'));
        $objPosPayment->active = 0;
        $objPosPayment->save();

        return true;
    }

    public function getContent()
    {
        return $this->displayInformation($this->l('Need to configure the device IP, device Port and pin.pad from empoyeed add/edit page.'));
    }

    public function hookActionPosSetMedia($params)
    {
        $this->context->controller->posAddCss(
            [
                _MODULE_DIR_ . $this->name . '/views/css/wkpospaytef.css',
            ]
        );
        $this->context->controller->posAddJs(
            [
                _MODULE_DIR_ . $this->name . '/views/js/wkpospaytef.js',
            ]
        );
        $this->context->controller->posAddJsDef(
            [
                'posPaytefToken' => $this->secure_key,
                'wkPaytefPaymentId' => Configuration::get('WKPOS_PAYTEF_PAYMENT_ID'),
                'paytefServiceUrl' => $this->context->link->getModuleLink('wkpospaytef', 'paytefservices'),
                'wk_pos_employee_details' => WkPosPaytefHelper::getAllPOSUsers(),
            ]
        );
        $this->context->controller->posAddJsDefL(
            [
                'checkingPinpadStatusText' => $this->l('Checking pinpad status for POS Paytef reader.'),
                'pinpadStatusConnected' => $this->l('Pinpad status connected.'),
                'connectFirst' => $this->l('Please connect Paytef reader first.'),
                'initiatingPaytef' => $this->l('Initiating Paytef POS terminal'),
                'someError' => $this->l('Something went wrong!'),
                'maxTryError' => $this->l('Max retries reached, stopping status check. Please try again.'),
                'transaction_start_msg' => $this->l('Transaction started.'),
                'transaction_approved_msg' => $this->l('Payment approved.'),
                'transaction_result_err' => $this->l('Error retrieving transaction result.'),
                'payment_error' => $this->l('Payment failed or canceled.'),
                'employee_no_detail_error' => $this->l('Employee has not device details: IP, port, pinpad; please configure first!')
            ]
        );
    }

    public function hookDisplayPosHeaderButtons()
    {
        return $this->display(__FILE__, 'posheaderbutton.tpl');
    }

    public function hookWkposDisplayBeforeBodyClosingTag()
    {
        return $this->display(__FILE__, 'paytefmodal.tpl');
    }

    public function hookActionOrderStatusPostUpdate($params)
    {
        if ($params['newOrderStatus']->id == 2
        && Tools::getValue('ajax') == true
        && Tools::getValue('action') == 'generateOrder'
        && Tools::getValue('payment_module') == 'Paytef'
        && Tools::getValue('module') == 'wkpos'
        && Tools::getValue('fc') == 'module'
        ) {
            $idOrder = $params['id_order'];
            $idCart = Tools::getValue('id_cart');
            $transactionDetail = WkPosPaytefTransaction::getTransactionDetailByIdCart((int) $idCart);
            $objTransaction = new WkPosPaytefTransaction($transactionDetail[0]['id_wkpos_paytef_transaction']);
            $objTransaction->id_order = trim($idOrder);
            $objTransaction->save();

            return true;
        }
        return true;
    }

    public function hookActionAfterUpdateEmployeeFormHandler($params)
    {
        $this->saveDetails(
            $params['id'],
            $params['form_data']['pos_outlet'],
            $params['form_data']['device_ip'],
            $params['form_data']['device_port'],
            $params['form_data']['device_pinpad']
        );
    }

    public function hookActionAfterCreateEmployeeFormHandler($params)
    {
        $this->saveDetails(
            $params['id'],
            $params['form_data']['pos_outlet'],
            $params['form_data']['device_ip'],
            $params['form_data']['device_port'],
            $params['form_data']['device_pinpad']
        );
    }

    public function saveDetails($idEmployee, $idWkPosOutlet, $deviceIp, $devicePort, $devicePinpad)
    {
        $idOutletEmployee = WkPosOutletEmployee::getIdOutletEmployee($idEmployee);
        if (empty($idOutletEmployee)) {
            $objOutletEmployee = new WkPosOutletEmployee();
            $objOutletEmployee->id_employee = (int) $idEmployee;
        } else {
            $objOutletEmployee = new WkPosOutletEmployee($idOutletEmployee);
        }

        $objOutletEmployee->active = 1;
        $objOutletEmployee->id_wkpos_outlet = (int) $idWkPosOutlet;
        $objOutletEmployee->device_ip = pSQL($deviceIp);  // Sanitize input
        $objOutletEmployee->device_port = pSQL($devicePort); // Sanitize input
        $objOutletEmployee->device_pinpad = pSQL($devicePinpad); // Sanitize input
        $objOutletEmployee->save();
    }

    public function hookActionEmployeeFormBuilderModifier($params)
    {
        $idEmployee = $params['id'];
        $outlets = WkPosPaytefHelper::getOutlets();

        $deviceIpData = ['label' => $this->l('Device IP'), 'required' => false];
        $devicePortData = ['label' => $this->l('Device Port'), 'required' => false];
        $devicePinpadData = ['label' => $this->l('Device Pinpad'), 'required' => false];

        // Load saved data if the employee exists
        if ($idEmployee) {
            $idOutletEmployee = WkPosOutletEmployee::getIdOutletEmployee($idEmployee);
            if ($idOutletEmployee) {
                $objOutletEmployee = new WkPosOutletEmployee($idOutletEmployee);

                // Load saved POS outlet data
                $posOutletData['data'] = $objOutletEmployee->id_wkpos_outlet;

                // Load saved device information if available
                if (!empty($objOutletEmployee->device_ip)) {
                    $deviceIpData['data'] = $objOutletEmployee->device_ip;
                }
                if (!empty($objOutletEmployee->device_port)) {
                    $devicePortData['data'] = $objOutletEmployee->device_port;
                }
                if (!empty($objOutletEmployee->device_pinpad)) {
                    $devicePinpadData['data'] = $objOutletEmployee->device_pinpad;
                }
            }
        }

        // Add form fields for Device IP, Port, and Pinpad if they are saved
        $params['form_builder']->add(
            $params['form_builder']->create(
                'device_ip',
                "Symfony\Component\Form\Extension\Core\Type\TextType",
                $deviceIpData
            )
        );

        $params['form_builder']->add(
            $params['form_builder']->create(
                'device_port',
                "Symfony\Component\Form\Extension\Core\Type\TextType",
                $devicePortData
            )
        );

        $params['form_builder']->add(
            $params['form_builder']->create(
                'device_pinpad',
                "Symfony\Component\Form\Extension\Core\Type\TextType",
                $devicePinpadData
            )
        );
    }

    private function alterOutletEmployeeTableAddColumns()
    {
        if (WkPosPaytefHelper::isColumnExist('device_ip', 'wkpos_outlet_employee') && WkPosPaytefHelper::isColumnExist('device_port', 'wkpos_outlet_employee') && WkPosPaytefHelper::isColumnExist('device_pinpad', 'wkpos_outlet_employee')) {
            return true;
        } else {
            $sql = 'ALTER TABLE `' . _DB_PREFIX_ . 'wkpos_outlet_employee`
                    ADD `device_ip` VARCHAR(255),
                    ADD `device_port` VARCHAR(255),
                    ADD `device_pinpad` VARCHAR(255)';
            return Db::getInstance()->execute($sql);
        }
    }

    private function alterOutletTableAddColumn()
    {
        if (WkPosPaytefHelper::isColumnExist('assigned_payment_methods', 'wkpos_outlets')) {
            return true;
        } else {
            $sql = 'ALTER TABLE `' . _DB_PREFIX_ . 'wkpos_outlets`
                    ADD `assigned_payment_methods` text default NULL AFTER `allowed_currencies`';
            return Db::getInstance()->execute($sql);
        }
    }

}