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
require_once dirname(__FILE__) . '/classes/wkposrequire.php';

use PrestaShop\PrestaShop\Core\Grid\Column\Type\DataColumn;
use PrestaShop\PrestaShop\Core\Grid\Filter\Filter;
use PrestaShop\PrestaShop\Core\Module\Exception\ModuleErrorException;
use PrestaShopBundle\Form\Admin\Type\YesAndNoChoiceType;

class WkPos extends Module
{
    public function __construct()
    {
        $this->name = 'wkpos';
        $this->tab = 'administration';
        $this->version = '5.3.0';
        $this->author = 'Webkul';
        $this->need_instance = 0;
        $this->secure_key = Tools::encrypt($this->name);
        $this->ps_versions_compliancy = ['min' => '1.7.0.0', 'max' => _PS_VERSION_];
        $this->bootstrap = true;
        $this->module_key = '24c086d180d7c2279dbe575867e50b03';
        parent::__construct();
        $this->displayName = $this->l('Prestashop POS');
        $this->description =
        $this->l('Merchant create order(s) from physical store using POS, that order also generated in PrestaShop.');
        $this->confirmUninstall = $this->l('Are you sure?');
        $this->customerSearchType = [
            [
                'search_id' => 1,
                'name' => $this->l('Name'),
            ],
            [
                'search_id' => 2,
                'name' => $this->l('Email'),
            ],
            [
                'search_id' => 3,
                'name' => $this->l('Phone'),
            ],
        ];
    }

    /**
     * Redirect to the configuration controller on configure button click
     *
     * @return void
     */
    public function getContent()
    {
        Tools::redirectAdmin($this->context->link->getAdminLink('AdminWkPosConfiguration'));
    }

    public function hookActionAdminLoginControllerLoginBefore($param)
    {
        $objEmp = new Employee();
        $empDetail = $objEmp->getByEmail(pSQL(Tools::getValue('email')));
        if ((int) Configuration::get('WKPOS_PROFILE') == $empDetail->id_profile) {
            $this->context->employee->logout();
            $this->context->controller->errors[] = $this->l('Employee is only allowed to login on POS panel.');
        }
    }

    /**
     * [hookActionAdminOrdersListingFieldsModifier - Add a column in admin order controller for POS]
     *
     * @param [$list] [Containing the array of sql command operation]
     */
    public function hookActionAdminOrdersListingFieldsModifier($list)
    {
        $optionsOrderStatus = [1 => 'POS', 2 => 'Web'];
        // if (isset($list['select'])) {
        //     // $list['select'] .= ', wko.`active` AS `type`, a.`reference`';
        //     $list['select'] .= ', IF(wko.`active` = 1, 1, 0) AS wkpos_type, a.`reference`';
        //     // $list['select'] .= ', wko.`active` AS `type`, a.`reference`';
        // }
        // if (isset($list['join'])) {
        //     $list['join'] .= ' LEFT JOIN `'._DB_PREFIX_.'wkpos_order` wko'.
        //     ' ON (wko.`id_order` = a.`id_order`)';
        // }
        if (isset($list['join'])) {
            $list['join'] .= ' LEFT JOIN (SELECT wkotest.id_order, (CASE WHEN wkot.active IS NULL THEN 2
            WHEN wkot.active=1 THEN 1
            WHEN wkot.active=0 THEN 0 END) as wkpos_type FROM ' . _DB_PREFIX_ . 'orders wkotest LEFT JOIN
            ' . _DB_PREFIX_ . 'wkpos_order wkot ON(wkotest.id_order=wkot.id_order)) wko' .
            ' ON (wko.id_order = a.id_order)';
        }

        $list['fields']['wkpos_type'] = [
            'title' => $this->l('Type'),
            'align' => 'text-center',
            'filter_key' => 'wko!wkpos_type',
            'callback' => 'callPosOrder',
            'orderby' => false,
            'type' => 'select',
            'list' => $optionsOrderStatus,
            'callback_object' => Module::getInstanceByName($this->name),
        ];
    }

    public function callPosOrder($col)
    {
        if ($col == 2) {
            return $this->l('Web');
        } else {
            return $this->l('POS');
        }
    }

    public function hookActionObjectProductDeleteAfter($params)
    {
        if ($params) {
            $product = $params['object'];
            $objProduct = new WkPosOutletProduct();

            return $objProduct->deleteAllOutletProduct($product->id);
        }
    }

    public function hookActionObjectCombinationAddAfter($params)
    {
        if ($params) {
            $combination = $params['object'];
            if ($combination->id_product != null) {
                WkPosHelper::updateBarcodesForNewProduct((int) $combination->id_product);
            }
            $objWkPosOutlet = new WkPosOutletProduct();
            $idOutletProducts = $objWkPosOutlet->getOutletProductIdByIdProduct($combination->id_product);
            if ($idOutletProducts) {
                foreach ($idOutletProducts as $outlet) {
                    $objOutletProductAttribute = new WkPosOutletProductAttribute();
                    $objOutletProductAttribute->id_wkpos_outlet_product = $outlet['id_wkpos_outlet_product'];
                    $objOutletProductAttribute->id_product_attribute = $combination->id;
                    $objOutletProductAttribute->quantity = 0;
                    $objOutletProductAttribute->save();
                }
                if (empty(Configuration::get('WKPOS_SYNCHRONISE_QUANTITY'))) {
                    $this->updateOutletQty($combination->id_product, $objOutletProductAttribute);
                }
            }
        }
    }

    public function hookActionObjectCombinationDeleteAfter($params)
    {
        if ($params) {
            $combination = $params['object'];
            $objProductAttribute = new WkPosOutletProductAttribute();
            $status = $objProductAttribute->deleteAllOutletProductAttribute(
                $combination->id
            );
            if ($status && empty(Configuration::get('WKPOS_SYNCHRONISE_QUANTITY'))) {
                $this->updateOutletQty($combination->id_product, $objProductAttribute);
            }

            return $status;
        }
    }

    public function updateOutletQty($idProduct, $objProductAttribute)
    {
        $outletProductQty = $objProductAttribute->getCombinationQty($idProduct);
        foreach ($outletProductQty as $outletQty) {
            $objWkPosOutletProduct = new WkPosOutletProduct($outletQty['id_wkpos_outlet_product']);
            $objWkPosOutletProduct->quantity = $outletQty['quantity'];
            $objWkPosOutletProduct->save();
        }
    }

    public function hookActionEmployeeGridDefinitionModifier(array $params)
    {
        $definition = $params['definition'];
        $definition
            ->getColumns()
            ->addAfter(
                'profile',
                (new DataColumn('pos_active'))
                    ->setName($this->l('Pos employee'))
                    ->setOptions([
                        'field' => 'pos_active',
                        // 'callback' => 'callPosOrder',
                    ])
            )
        ;
        // For search filter
        $definition->getFilters()->add(
            (new Filter('pos_active', YesAndNoChoiceType::class))
                ->setTypeOptions([
                    'choices' => [
                        $this->l('Yes') => 1,
                        $this->l('No') => 0,
                    ],
                    'required' => false,
                ])
                ->setAssociatedColumn('pos_active')
        );
    }

    /**
     * Hook allows to modify Customers query builder and add custom sql statements.
     *
     * @param array $params
     */
    public function hookActionEmployeeGridQueryBuilderModifier(array $params)
    {
        /** @var QueryBuilder $searchQueryBuilder */
        $searchQueryBuilder = $params['search_query_builder'];

        /** @var CustomerFilters $searchCriteria */
        $searchCriteria = $params['search_criteria'];

        $searchQueryBuilder->addSelect(
            'IF(CAST(oe.`id_wkpos_outlet` AS UNSIGNED) = 1, "' . $this->l('Yes') . '", "' . $this->l('No') . '") AS pos_active'
        );
        $searchQueryBuilder->leftJoin(
            'e',
            '`' . pSQL(_DB_PREFIX_) . 'wkpos_outlet_employee`',
            'oe',
            'oe.`id_employee` = e.`id_employee`'
        );
        foreach ($searchCriteria->getFilters() as $filterName => $filterValue) {
            if ('pos_active' === $filterName) {
                $searchQueryBuilder->andWhere('oe.`id_wkpos_outlet` = :id_wkpos_outlet');
                $searchQueryBuilder->setParameter('id_wkpos_outlet', $filterValue);

                if (!$filterValue) {
                    $searchQueryBuilder->orWhere('oe.`id_wkpos_outlet` IS NULL');
                }
            }
        }
    }

    /**
     * Add the field in the emplyee field modifier list
     *
     * @param [array] $params
     *
     * @return void
     */
    public function hookActionAdminEmployeesListingFieldsModifier($params)
    {
        if (isset($params['select'])) {
            $params['select'] .= ', CAST(oe.`id_wkpos_outlet` AS UNSIGNED) AS pos_active';
        } else {
            $params['select'] = 'IF(oe.`id_wkpos_outlet` Is Null, 0, 1) AS pos_active';
        }
        if (isset($params['join'])) {
            $params['join'] .= ' LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_employee` oe
            ON (oe.`id_employee` = a.`id_employee`)';
        } else {
            $params['join'] = 'LEFT JOIN `' . _DB_PREFIX_ . 'wkpos_outlet_employee` oe
            ON (oe.`id_employee` = a.`id_employee`)';
        }
        $params['fields']['pos_active'] = [
            'title' => $this->l('Pos Employee'),
            'align' => 'text-center',
            'orderby' => false,
            'havingFilter' => true,
            'type' => 'select',
            'list' => [
                0 => $this->l('No'),
                1 => $this->l('Yes'),
            ],
            'filter_key' => 'oe!id_wkpos_outlet',
            'callback' => 'outletEmployee',
            'callback_object' => Module::getInstanceByName($this->name),
        ];
    }

    /**
     * Return the label for POS Outlet in the employee list
     *
     * @param [type] $idOutletEmployee
     *
     * @return void
     */
    public function outletEmployee($idOutletEmployee)
    {
        if ($idOutletEmployee) {
            $this->context->smarty->assign(
                [
                    'posLabel' => true,
                ]
            );

            return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'wkpos/views/templates/admin/employee_info.tpl');
        }
    }

    public function getOutlets()
    {
        $posOutlets = [];
        $outlets = WkPosOutlets::getOutlets();
        if (_PS_VERSION_ >= '1.7.6.0') {
            foreach ($outlets as $outlet) {
                $posOutlets[$outlet['name']] = $outlet['id_wkpos_outlet'];
            }
        } else {
            $posOutlets = $outlets;
        }

        return $posOutlets;
    }

    public function saveDetails($idEmployee, $idWkPosOutlet)
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
        $objOutletEmployee->save();
    }

    public function uploadPosEmployeeImage($idEmployee)
    {
        $dirName = _PS_MODULE_DIR_ . 'wkpos/views/img/employee/';
        $filePrefix = $idEmployee . '_';
        $fileName = glob($dirName . "$filePrefix*.jpg");

        if ($_FILES['employee']['name']['wkpos_employee_image']) {
            if ($fileName && !@unlink($fileName[0])) {
            } else {
                // upload default image
                $logoName = $filePrefix . strtotime('now') . '.jpg';
                $storeLogoPath = $dirName . $logoName;
                ImageManager::resize($_FILES['employee']['tmp_name']['wkpos_employee_image'], $storeLogoPath, 40, 40);
            }
        }
    }

    /* Employee Form field for PS1.7.6.0 */
    public function hookActionAfterUpdateEmployeeFormHandler($params)
    {
        $this->saveDetails($params['id'], $params['form_data']['pos_outlet']);
        $this->uploadPosEmployeeImage($params['id']);
        if ($params['form_data']['pos_outlet']) {
            $this->saveUserDetails($params);
        }
    }

    public function hookActionAfterCreateEmployeeFormHandler($params)
    {
        $this->saveDetails($params['id'], $params['form_data']['pos_outlet']);
        $this->uploadPosEmployeeImage($params['id']);
        if ($params['form_data']['pos_outlet']) {
            $this->saveUserDetails($params);
        }
    }

    public function saveUserDetails($params)
    {
        $objUser = new WkPosUser();
        $posUsers = $objUser->getUserDetails($params['id']);
        if ($posUsers) {
            $objUser = new WkPosUser($posUsers);
        }

        if ($params['form_data']['pos_outlet']) {
            $objUser->id_employee = $params['id'];
            $objUser->name = $params['form_data']['firstname'];
            if ($params['form_data']['lastname']) {
                $objUser->name .= ' ' . $params['form_data']['lastname'];
            }
            $objUser->active = 1;
            $objUser->deleted = 0;
            $objUser->save();
        } elseif ($posUsers) {
            $objUser->deleted = 1;
            $objUser->save();
        }
    }

    public function hookActionWkPosSaveOrderDetail($params)
    {
        if (isset($params['posOrder']) && $params['posOrder']) {
            $idWkPosOutlet = $this->context->cookie->id_wkpos_outlet;
            $idEmployee = $this->context->cookie->id_employee;
            $idUser = trim(Tools::getValue('id_wkpos_user'));
            if ($idWkPosOutlet) {
                $objRegister = new WkPosRegister();
                $currentRegister = $objRegister->getCurrentRegister($idWkPosOutlet, $idEmployee);
                if ($currentRegister) {
                    $idWkPosRegister = trim($currentRegister['id_wkpos_register']);
                    $objPosRegisterOrder = new WkPosRegisterOrder();
                    $objPosRegisterOrder->id_wkpos_register = (int) $idWkPosRegister;
                    $objPosRegisterOrder->id_wkpos_order = (int) $params['posOrder']->id;
                    $objPosRegisterOrder->id_wkpos_user = $idUser;
                    $objPosRegisterOrder->save();
                }
            }
        }
    }

    public function hookDisplayPosLeftColumn($params)
    {
        return $this->context->smarty->fetch(_PS_MODULE_DIR_ . $this->name . '/views/templates/hook/leftpanel.tpl');
    }

    public function hookDisplayPosContent($params)
    {
        return $this->context->smarty->fetch(_PS_MODULE_DIR_ . $this->name . '/views/templates/hook/cashmanagement.tpl');
    }

    public function hookDisplayPosRightColumn($params)
    {
        $this->context->smarty->assign(
            [
                'close_image_url' => _MODULE_DIR_ . $this->name . '/views/img/closed.png',
            ]
        );

        return $this->context->smarty->fetch(_PS_MODULE_DIR_ . $this->name . '/views/templates/hook/opencashregister.tpl');
    }

    public function getRegisterDetails($idRegister)
    {
        if ($idRegister) {
            $objPosRegister = new WkPosRegister();
            $registerDetail = $objPosRegister->getRegisterOpeningDetail($idRegister);
            if ($registerDetail) {
                $objPosCashMovement = new WkPosCashMovement();
                $openingDetails = $objPosCashMovement->getRegisterOpeningBalance($idRegister);
                if ($openingDetails) {
                    $registerDetail['amount'] = $openingDetails['amount'];
                    $registerDetail['note'] = $openingDetails['note'];
                    $registerDetail['id_wkpos_payment'] = $openingDetails['id_wkpos_payment'];
                }
                $objEmployee = new Employee($registerDetail['id_employee']);
                $registerDetail['salesperson'] = $objEmployee->firstname . ' ' . $objEmployee->lastname;
            }

            return $registerDetail;
        }

        return null;
    }

    public function getCashMovement($idRegister)
    {
        $objPosCashMovement = new WkPosCashMovement();

        return $objPosCashMovement->getCashMovement($idRegister);
    }

    public function getRegisterOrder($idRegister)
    {
        $objRegisterOrder = new WkPosRegisterOrder();
        $moneyInOrders = $objRegisterOrder->getRegisterOrders(
            $idRegister,
            WkPosOrderPayment::MONEY_IN
        );
        $moneyOutOrders = $objRegisterOrder->getRegisterOrders(
            $idRegister,
            WkPosOrderPayment::MONEY_OUT
        );
        $returOrderAmount = [];
        if ($moneyOutOrders) {
            foreach ($moneyOutOrders as $order) {
                $returOrderAmount[$order['id_wkpos_payment']] = $order;
            }
        }
        $registerOrderDetails = [];
        if ($moneyInOrders) {
            foreach ($moneyInOrders as $order) {
                $idPayment = $order['id_wkpos_payment'];
                $registerOrderDetails[$idPayment] = $order;
                $registerOrderDetails[$idPayment]['tendered'] = $order['amount'];
                if (isset($returOrderAmount, $returOrderAmount[$idPayment])) {
                    $registerOrderDetails[$idPayment]['change'] = $returOrderAmount[$idPayment]['amount'];
                } else {
                    $registerOrderDetails[$idPayment]['change'] = 0;
                }
            }
        }
        if ($moneyOutOrders) {
            $idWkPosPayments = array_column($moneyInOrders, 'id_wkpos_payment');
            foreach ($moneyOutOrders as $order) {
                $idPayment = $order['id_wkpos_payment'];
                if (!in_array($idPayment, $idWkPosPayments)) {
                    $registerOrderDetails[$idPayment] = $order;
                    $registerOrderDetails[$idPayment]['tendered'] = 0;
                    $registerOrderDetails[$idPayment]['amount'] = 0;
                    if (isset($returOrderAmount, $returOrderAmount[$idPayment])) {
                        $registerOrderDetails[$idPayment]['change'] = $returOrderAmount[$idPayment]['amount'];
                    } else {
                        $registerOrderDetails[$idPayment]['change'] = 0;
                    }
                }
            }
        }

        return $registerOrderDetails;
    }

    public function getRegisterVouchersAmount($idRegister)
    {
        $objRegisterOrder = new WkPosRegisterOrder();

        return $objRegisterOrder->getRegisterVouchers($idRegister);
    }

    public function getAllUsers()
    {
        $objUser = new WkPosUser();
        $users = $objUser->getAllUsers();
        $posUsers = [];
        foreach ($users as $user) {
            $posUsers[$user['id_wkpos_user']] = $user;
        }

        return $posUsers;
    }

    public function createPosUserInCashRegister()
    {
        $allPosOutletUsers = WkPosUser::getAllPosOutletEmployee();
        foreach ($allPosOutletUsers as $user) {
            $idEmployee = $user['id_employee'];
            $objEmp = new Employee($idEmployee);
            $objPosUser = new WkPosUser();
            $objPosUser->name = $objEmp->firstname . ' ' . $objEmp->lastname;
            $objPosUser->active = 1;
            $objPosUser->id_employee = (int) $idEmployee;
            $objPosUser->deleted = 0;
            $objPosUser->save();
        }

        return true;
    }

    public function hookActionBeforeUpdateEmployeeFormHandler($params)
    {
        $this->validateEmployeeImage($_FILES['employee']);
    }

    public function hookActionBeforeCreateEmployeeFormHandler($params)
    {
        $this->validateEmployeeImage($_FILES['employee']);
    }

    public function hookActionEmployeeFormBuilderModifier($params)
    {
        $idEmployee = $params['id'];
        $outlets = $this->getOutlets();
        $posOutletData = [
            'label' => $this->l('POS outlet'),
            'choices' => $outlets,
            'required' => false,
            'placeholder' => $this->l('Select POS outlet'),
        ];
        $posEmployeeData = [
            'label' => $this->l('POS employee image'),
            'required' => false,
        ];

        if ($idEmployee) {
            $idOutletEmployee = WkPosOutletEmployee::getIdOutletEmployee($idEmployee);
            if ($idOutletEmployee) {
                $objOutletEmployee = new WkPosOutletEmployee($idOutletEmployee);
                $posOutletData['data'] = $objOutletEmployee->id_wkpos_outlet;
                $dirName = _PS_MODULE_DIR_ . 'wkpos/views/img/employee/';
                $filePrefix = $idEmployee
                . '_';
                $fileName = glob($dirName . "$filePrefix*.jpg");
                if ($fileName) {
                    $fileName = explode('/', $fileName[0]);
                    $fileName = $fileName[count($fileName) - 1];
                    $employeeImage = _MODULE_DIR_ . 'wkpos/views/img/employee/' . $fileName;
                    $posEmployeeData['action'] = $employeeImage;
                }
            }
        }
        $posOutlet = $params['form_builder']->create(
            'pos_outlet',
            "Symfony\Component\Form\Extension\Core\Type\ChoiceType",
            $posOutletData
        );
        $params['form_builder']->add(
            $posOutlet
        );
        $posOutletEmployee = $params['form_builder']->create(
            'wkpos_employee_image',
            "Symfony\Component\Form\Extension\Core\Type\FileType",
            $posEmployeeData
        );
        $params['form_builder']->add(
            $posOutletEmployee
        );
    }
    /* END */

    /**
     * Add the field in employee form for selecting the outlet and adding the image
     *
     * @param [array] $params
     *
     * @return void
     */
    public function hookActionAdminEmployeesFormModifier($params)
    {
        $idEmployee = trim(Tools::getValue('id_employee'));
        $posOutlet = [
            'type' => 'select',
            'label' => $this->l('POS Outlet'),
            'name' => 'id_wkpos_outlet',
            'options' => [
                'query' => WkPosOutlets::getOutlets(),
                'id' => 'id_wkpos_outlet',
                'name' => 'name',
                'default' => [
                    'value' => 0,
                    'label' => $this->l('-- Choose --'),
                ],
            ],
        ];

        $dirName = _PS_MODULE_DIR_ . 'wkpos/views/img/employee/';
        $filePrefix = $idEmployee
        . '_';
        $fileName = glob($dirName . "$filePrefix*.jpg");
        if ($fileName) {
            $fileName = explode('/', $fileName[0]);
            $fileName = $fileName[count($fileName) - 1];
            $employeeImage = _MODULE_DIR_ . 'wkpos/views/img/employee/' . $fileName;
            $this->context->smarty->assign(
                [
                    'employeeImage' => $employeeImage,
                ]
            );
            $image = $this->context->smarty->fetch(
                _PS_MODULE_DIR_ . 'wkpos/views/templates/admin/employee_info.tpl'
            );
        }
        $imageOutlet = [
            'type' => 'file',
            'label' => $this->l('POS employee image'),
            'name' => 'wkpos_employee_image',
            'image' => $fileName ? $image : false,
            'display_image' => true,
            'desc' => $this->l('For the best view, please upload a 40 x 40 pixel size PNG image file.'),
        ];
        array_push($params['fields'][0]['form']['input'], $posOutlet);
        array_push($params['fields'][0]['form']['input'], $imageOutlet);
        if (Tools::getValue('id_employee')) {
            $idOutletEmployee = WkPosOutletEmployee::getIdOutletEmployee(Tools::getValue('id_employee'));
            if ($idOutletEmployee) {
                $objOutletEmployee = new WkPosOutletEmployee($idOutletEmployee);
                $params['fields_value'] = array_merge(
                    $params['fields_value'],
                    [
                        'id_wkpos_outlet' => $objOutletEmployee->id_wkpos_outlet,
                    ]
                );
            } else {
                $params['fields_value'] = array_merge($params['fields_value'], ['id_wkpos_outlet' => 0]);
            }
        } else {
            $params['fields_value'] = array_merge($params['fields_value'], ['id_wkpos_outlet' => 0]);
        }
    }

    public function validateEmployeeImage($image)
    {
        if ($image['name']['wkpos_employee_image']
            && (!ImageManager::isRealImage($image['tmp_name']['wkpos_employee_image'])
            || !ImageManager::isCorrectImageFileExt($image['name']['wkpos_employee_image'])
            || preg_match('/\%00/', $image['name']['wkpos_employee_image'])) // prevent null byte injection
        ) {
            throw new ModuleErrorException(sprintf('Image format "%s", not recognized, allowed formats are: .gif, .jpg, .png', $image['name']['wkpos_employee_image']));
        }
    }

    /**
     * Validate the data before form save
     *
     * @param [array] $params
     *
     * @return void
     */
    public function hookActionAdminSaveBefore($params)
    {
        if ($params['controller'] instanceof AdminEmployeesController) {
            $file = $_FILES['wkpos_employee_image'];
            if ($file['size'] != 0) {
                if ($error = ImageManager::validateUpload($file)) {
                    $this->context->controller->errors['wkpos_employee_image'] = $error;
                }
            }
        }
    }

    /**
     * Restrict the Order Confirmation Email send to the customer. If order created through POS.
     *
     * @param [array] $params
     *
     * @return bool
     */
    public function hookActionEmailSendBefore($params)
    {
        if (!Configuration::get('WKPOS_ORDER_CONFIRMATION_EMAIL')) {
            if (isset($params, $params['template'])
                && ($params['template'] == 'order_conf'
                || $params['template'] == 'payment')
            ) {
                if (Tools::getIsset('action')
                    && Tools::getIsset('ajax')
                    && Tools::getValue('ajax')
                    && Tools::getIsset('fc')
                    && Tools::getIsset('module')
                    && Tools::getValue('fc') == 'module'
                    && Tools::getValue('module') == 'wkpos'
                    && Tools::getValue('action') == 'generateOrder'
                ) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Save the data of added field in the employee form
     *
     * @param [array] $params
     *
     * @return void
     */
    public function hookActionAdminSaveAfter($params)
    {
        if ($params['controller'] instanceof AdminEmployeesController
            && Tools::getIsset('id_wkpos_outlet')
            && isset($params['return'], $params['return']->id)

            && empty($this->context->controller->errors)
        ) {
            $this->saveDetails($params['return']->id, Tools::getValue('id_wkpos_outlet'));

            $dirName = _PS_MODULE_DIR_ . 'wkpos/views/img/employee/';
            $filePrefix = $params['return']->id . '_';
            $fileName = glob($dirName . "$filePrefix*.jpg");

            if ($_FILES['wkpos_employee_image']['name']) {
                if ($fileName && !@unlink($fileName[0])) {
                }
                // upload default image
                $logoName = $filePrefix . strtotime('now') . '.jpg';
                $storeLogoPath = $dirName . $logoName;
                ImageManager::resize($_FILES['wkpos_employee_image']['tmp_name'], $storeLogoPath, 40, 40);
            }
        }

        if ($params['controller'] instanceof AdminEmployeesController
            && Tools::getIsset('id_wkpos_outlet')
            && isset($params['return'], $params['return']->id)

            && empty($this->context->controller->errors)
        ) {
            $objUser = new WkPosUser();
            $posUsers = $objUser->getUserDetails($params['return']->id);
            if ($posUsers) {
                $objUser = new WkPosUser($posUsers);
            }
            if (Tools::getValue('id_wkpos_outlet')) {
                $objUser->id_employee = $params['return']->id;
                $objUser->name = $params['return']->firstname;
                if ($params['return']->lastname) {
                    $objUser->name .= ' ' . $params['return']->lastname;
                }
                $objUser->active = 1;
                $objUser->deleted = 0;
                $objUser->save();
            } elseif ($posUsers) {
                $objUser->deleted = 1;
                $objUser->save();
            }
        }
    }

    /**
     * Update the pos carrier id on id saving the data from carrier controller
     *
     * @param [array] $params
     *
     * @return void
     */
    public function hookActionCarrierUpdate($params)
    {
        if ((int) Configuration::get('WKPOS_ID_CARRIER') === (int) $params['id_carrier']) {
            Configuration::updateValue('WKPOS_ID_CARRIER', $params['carrier']->id);
        }
    }

    public function hookActionDispatcherBefore($params)
    {
        if (Module::isEnabled('wkpos')) {
            if (Tools::getValue('module') == 'wkpos'
                && Tools::getValue('controller') == 'sale'
                && Tools::getValue('fc') == 'module'
            ) {
                $objOutlet = new WkPosOutlets($this->context->cookie->id_wkpos_outlet);
                if (Validate::isLoadedObject($objOutlet)) {
                    $allowedCurrency = json_decode($objOutlet->allowed_currencies);
                    $allowedLanguages = json_decode($objOutlet->allowed_languages);
                    if (!isset($this->context->cookie->id_currency)
                        || !in_array($this->context->cookie->id_currency, $allowedCurrency)
                    ) {
                        $idCurrency = Configuration::get('PS_CURRENCY_DEFAULT');
                        if ($objOutlet->default_currency) {
                            $idCurrency = $objOutlet->default_currency;
                        }
                        $this->context->cookie->id_currency = $idCurrency;
                        $this->context->cookie->write();
                    }
                    if (!isset($this->context->cookie->id_lang)
                        || !in_array($this->context->cookie->id_lang, $allowedLanguages)
                    ) {
                        $idLanguage = Configuration::get('PS_LANG_DEFAULT');
                        if ($objOutlet->default_currency) {
                            $idLanguage = $objOutlet->default_language;
                        }
                        Tools::redirect($this->context->link->getModuleLink(
                            'wkpos',
                            'sale',
                            [],
                            null,
                            $idLanguage
                        ));
                    }
                }
            }
        }
    }

    /**
     * Add CSS file at back ofttice for admin icon.
     *
     * @return void
     */
    public function hookDisplayBackOfficeHeader()
    {
        $this->context->controller->addCSS($this->_path . 'views/css/wkpos_logo.css');
    }

    /**
     * Update the quantity from an outlet product
     *
     * @param [array] $params
     *
     * @return void
     */
    public function hookActionValidateOrder($params)
    {
        $this->context = Context::getContext();

        $products = [];
        foreach ($params['order']->getProducts() as $product) {
            $products[] = [
                'id_product_attribute' => $product['product_attribute_id'],
                'id_product' => $product['id_product'],
                'delta_qty' => $product['product_quantity'],
            ];
            if (Tools::getValue('module') == 'wkpos') {
                $idLang = Context::getContext()->language->id;
                if (Pack::isPack((int) $product['id_product'])) {
                    $packItems = Pack::getItemTable($product['id_product'], $idLang);
                    foreach ($packItems as $newProduct) {
                        if (!isset($newProduct['id_product_attribute'])) {
                            $newProduct['id_product_attribute'] = 0;
                        }
                        $totalQuantity = (int) StockAvailable::getQuantityAvailableByProduct(
                            $newProduct['id_product'],
                            $newProduct['id_product_attribute']
                        );
                        $afterOrderQuantity = $totalQuantity -
                        ((int) $product['product_quantity'] * (int) $newProduct['pack_quantity']);
                        StockAvailable::setQuantity(
                            $newProduct['id_product'],
                            $newProduct['id_product_attribute'],
                            $afterOrderQuantity,
                            null,
                            false
                        );
                    }
                }
            }
        }
        if (isset($this->context->cookie->posOrder)) {
            WkPosOutletProduct::updateOutletProductQuantity($products, $this->context->cookie->id_outlet_employee);
        } else {
            WkPosOutletProduct::updateOutletProductQuantity($products);
        }
    }

    public function hookActionWkUpdateQuantity($params)
    {
        if ($params['cookie']->posOrder === true) {
            foreach ($params['cart']->getProducts() as $product) {
                if (Tools::getValue('module') == 'wkpos') {
                    $idLang = Context::getContext()->language->id;
                    if (Pack::isPack((int) $product['id_product'])) {
                        WkPosOutletProduct::wkOutletUpdateQty($params);
                        $packItems = Pack::getItemTable($params['id_product'], $idLang);
                        foreach ($packItems as $newProduct) {
                            if (!isset($newProduct['id_product_attribute'])) {
                                $newProduct['id_product_attribute'] = 0;
                            }
                            $params['id_product'] = $newProduct['id_product'];
                            $params['id_product_attribute'] = $newProduct['id_product_attribute'];
                            $params['quantity'] = StockAvailable::getQuantityAvailableByProduct(
                                $newProduct['id_product'],
                                $newProduct['id_product_attribute']
                            );
                            $params['delta_qty'] = (abs($params['delta_qty']) * (int) $newProduct['pack_quantity']);
                            WkPosOutletProduct::wkOutletUpdateQty($params);
                        }
                    }
                }
            }
        }
        if (isset($this->context->controller->controller_name)
            && ($this->context->controller->controller_name == 'AdminOrders')
        ) {
            $idOutlet = 0;
            if ($idOrder = Tools::getValue('id_order')) {
                $posOrderId = WkPosOrder::getPosOrderId($idOrder);
                if ($posOrderId) {
                    $posOrder = new WkPosOrder($posOrderId);
                    $idOutlet = $posOrder->id_wkpos_outlet;
                    WkPosOutletProduct::updateOutletProduct($params, $idOutlet);
                }
            }
        } else {
            if (Configuration::get('WKPOS_SYNCHRONISE_QUANTITY')
                && (empty($params['cart']) || empty($params['cart']->getProducts()))
            ) {
                if (isset($this->context->cookie->posOrder)) {
                    WkPosOutletProduct::wkOutletUpdateQty($params);
                } else {
                    WkPosOutletProduct::wkOutletUpdateQty($params);
                }
            }
        }
    }

    /**
     * Install the module
     *
     * @return void
     */
    public function install()
    {
        $objDb = new WkPosDb();
        if (Shop::isFeatureActive()) {
            Shop::setContext(Shop::CONTEXT_ALL);
        }
        if (!parent::install()
            || !$objDb->createTables()
            || !$this->registerPsHooks()
            || !$this->callInstallTab()
            || !$this->defaultPaymentMethod()
            || !$this->setConfigurationVariable()
            || !$this->createPosCustomerGroup()
            || !$this->installCarrier()
            || !$this->addProfile()
            || !$this->addOrderStatus()
            || !$this->installCustomProductCategory()
            || !$this->generateModuleFileVersionSpecific()
            || !$this->createPosUserInCashRegister()
        ) {
            return false;
        }

        return true;
    }

    private function generateModuleFileVersionSpecific()
    {
        $filesVersion = 'override_version/files_8.0.0';
        if (version_compare(_PS_VERSION_, '8.0.0', '>=')) {
            $filesVersion = 'override_version/files_8.0.0';
            $source = _PS_MODULE_DIR_ . $this->name . '/' . $filesVersion . '/form.html.twig';
            $destinationPath = _PS_MODULE_DIR_ . $this->name . '/views/PrestaShop/Admin/Configure/AdvancedParameters/Employee/Blocks/';
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0777, true);
                $destination = $destinationPath . 'form.html.twig';
                copy($source, $destination);
            }
        } else {
            $filesVersion = 'override_version/files_1.7.8.9';
            $source = _PS_MODULE_DIR_ . $this->name . '/' . $filesVersion . '/form.html.twig';
            $destinationPath = _PS_MODULE_DIR_ . $this->name . '/views/PrestaShop/Admin/Configure/AdvancedParameters/Employee/Blocks/';
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0777, true);
                $destination = $destinationPath . 'form.html.twig';
                copy($source, $destination);
            }
        }
        $this->copyIndexIfNotAvailable();

        return true;
    }

    private function fullCopy($oldDir = '', $yourModuleDir = [])
    {
        if (is_dir($oldDir)) {
            foreach ($yourModuleDir as $value) {
                if (is_dir($value)) {
                    if (!file_exists($value . '/index.php')) {
                        copy($oldDir . '/index.php', $value . '/index.php');
                    }
                }
            }
        }
    }

    private function getSubDirectories($dir)
    {
        $subDir = [];
        // Get and add directories of $dir
        $directories = array_filter(glob($dir), 'is_dir');
        $subDir = array_merge($subDir, $directories);
        // Foreach directory, recursively get and add sub directories
        foreach ($directories as $directory) {
            $subDir = array_merge($subDir, $this->getSubDirectories($directory . '/*'));
        }
        // Return list of sub directories
        return $subDir;
    }

    private function copyIndexIfNotAvailable()
    {
        $currentPath = _PS_MODULE_DIR_ . $this->name;
        $arr = $this->getSubDirectories($currentPath);
        $this->fullCopy($currentPath, $arr);

        return true;
    }

    /**
     * Add POS front Link in the bak office top header
     *
     * @return void
     */
    public function hookDisplayBackOfficeTop()
    {
        $idShop = $this->context->shop->id;
        $this->context->smarty->assign(
            [
                'posLink' => $this->context->link->getModuleLink(
                    'wkpos',
                    'login',
                    [],
                    null,
                    null,
                    $idShop,
                    false
                ),
                // $this->context->link->getModuleLink('wkpos', 'login')
            ]
        );

        return $this->display(__FILE__, 'poslink.tpl');
    }

    /**
     * Register all tthe hooks needed in the module.
     *
     * @return bool
     */
    public function registerPsHooks()
    {
        $hooks = [
            'actionAdminEmployeesFormModifier',
            'actionAdminEmployeesListingFieldsModifier',
            'actionEmployeeGridDefinitionModifier',
            'actionEmployeeGridQueryBuilderModifier',
            'displayBackOfficeHeader',
            'actionAdminSaveAfter',
            'actionAdminSaveBefore',
            'actionValidateOrder',
            'displayBackOfficeTop',
            'actionEmailSendBefore',
            'actionWkUpdateQuantity',
            'actionAdminOrdersListingFieldsModifier',
            'actionEmployeeFormBuilderModifier',
            'actionObjectCombinationAddAfter',
            'actionObjectCombinationDeleteAfter',
            'actionAfterUpdateEmployeeFormHandler',
            'actionAfterCreateEmployeeFormHandler',
            'actionBeforeUpdateEmployeeFormHandler',
            'actionBeforeCreateEmployeeFormHandler',
            'actionObjectProductDeleteAfter',
            'actionDispatcherBefore',
            'actionOrderGridDefinitionModifier',
            'actionOrderGridQueryBuilderModifier',
            'actionSetSmartyVariablesInPos', // new added for addons
            'actionProductSave',
            'actionAdminLoginControllerLoginBefore',
            'displayAdminProductsOptionsStepTop',
            'actionProductUpdate',
            'actionPosSetMedia', // Cash register hook
            'actionWkPosSaveOrderDetail',
            'displayPosLeftColumn',
            'displayPosContent',
            'displayPosRightColumn',
            'displayWkPosEmployeeDetail',
        ];

        return $this->registerHook($hooks);
    }

    /**
     * Install Tab in the back office
     *
     * @return void
     */
    public function callInstallTab()
    {
        $this->installTab('AdminPOS', 'POS');
        $this->installTab('AdminPOSManage', 'POS', 'AdminPOS');
        $this->installTab('AdminWkPosConfiguration', 'Configuration', 'AdminPOSManage');
        $this->installTab('AdminWkPosDashboard', 'Dashboard', 'AdminPOSManage');
        $this->installTab('AdminWkPosOutlets', 'Outlets', 'AdminPOSManage');
        // $this->installTab('AdminWkPosSession', 'Session', 'AdminPOSManage');
        //  Cash register tab
        $this->installTab('AdminWkPosSession', 'Cash Register', 'AdminPOSManage');
        $this->installTab('AdminWkPosUser', 'Cashiers', 'AdminPOSManage');

        return true;
    }

    /**
     * Set the configuration variable default value
     *
     * @return void
     */
    public function setConfigurationVariable()
    {
        Configuration::updateValue('WKPOS_HEADING', 'Point of Sale');
        Configuration::updateValue('WKPOS_CHANGE_PRODUCT_PRICE', 1);
        Configuration::updateValue('WKPOS_PRODUCT_NAME_LENGTH', 20);
        Configuration::updateValue('WKPOS_LOW_STOCK', 1);
        Configuration::updateValue('WKPOS_COMBINATION_TAG_ENABLE', 1);
        Configuration::updateValue('WKPOS_SPECIAL_PRICE_ENABLE', 1);
        Configuration::updateValue('WKPOS_GUEST_ACCOUNT_ENABLE', 0);
        Configuration::updateValue('WKPOS_GUEST_ACCOUNT', '');
        Configuration::updateValue('WKPOS_SHOP_NAME', Configuration::get('PS_SHOP_NAME'));
        Configuration::updateValue('WKPOS_PRINTER_NAME', '');
        Configuration::updateValue('WKPOS_DISPLAY_PRODUCT_DISCOUNT', 1);
        Configuration::updateValue('WKPOS_DISPLAY_ORDER_DISCOUNT', 1);
        Configuration::updateValue('WKPOS_DISPLAY_BARCODE', 1);
        Configuration::updateValue('WKPOS_ENABLE_CASH_DRAWER', 1);
        Configuration::updateValue('WKPOS_PRODUCT_SEARCH_TYPE', implode(',', ['1', '2']));
        Configuration::updateValue('WKPOS_OUTLET_PRODUCT_ACTIVE', 1);
        Configuration::updateValue('WKPOS_BARCODE_SEARCH_TYPE', 5);
        Configuration::updateValue('WKPOS_ENABLE_SHIPPING', 0);
        Configuration::updateValue('WKPOS_PRINTER_AUTO_CONNECT', false);
        Configuration::updateValue('WKPOS_DEFAULT_SEARCH_TYPE', 1);
        Configuration::updateValue('WKPOS_CUSTOMER_GROUP', 1);
        Configuration::updateValue('WKPOS_ORDER_EDIT_PAYMENT', 1);
        Configuration::updateValue('WKPOS_VOUCHER_ENABLE', 1);
        Configuration::updateValue('WKPOS_MESSAGE_ENABLE', 1);
        Configuration::updateValue('WKPOS_PRINT_TYPE', 1);
        Configuration::updateValue('WKPOS_PRICE_DISPLAY_PRECISION', 2);
        Configuration::updateValue('WKPOS_PAYMENT_PARTIAL_VOUCHER', 0);
        Configuration::updateValue('WKPOS_PRINTER_ENCODING', 'Cp850');
        Configuration::updateValue('WKPOS_LOGIN_COLOR', '#0D7377');
        Configuration::updateValue('WKPOS_BUTTON_COLOR', '#212121');
        Configuration::updateValue('WKPOS_SHOW_ORIGINAL_PRICE', 1);
        Configuration::updateValue('WKPOS_SHOW_STOCK_LOCATION', 1);
        Configuration::updateValue('WKPOS_SYNCHRONISE_QUANTITY', 1);
        Configuration::updateValue('WKPOS_ORDER_STATUS_PAYMENT', Configuration::get('PS_OS_PAYMENT'));
        Configuration::updateValue('WKPOS_CASH_REGISTER_STATUS', 0);

        return true;
    }

    /**
     * Add the default Payment option in the POS.
     *
     * @return void
     */
    protected function defaultPaymentMethod()
    {
        $objPosPayment = new WkPosPayment();
        $objPosPayment->name = $this->l('Cash');
        $objPosPayment->active = 1;
        $objPosPayment->save();
        $objPosPayment = new WkPosPayment();
        $objPosPayment->active = 1;
        $objPosPayment->name = $this->l('Card Payment');
        $objPosPayment->save();
        $objPosPayment = new WkPosPayment();
        $objPosPayment->name = $this->l('Cheque');
        $objPosPayment->active = 1;
        $objPosPayment->save();
        // $objPosPayment = new WkPosPayment();
        // $objPosPayment->name = $this->l('Pay In Installment');
        // $objPosPayment->active = 1;
        // $objPosPayment->save();
        return true;
    }

    /**
     * for adding tab at the back end.
     *
     * @param string $className - class name to the tab
     * @param string $tabName -  display name for tab
     * @param bool $tabParentName - Parent name of a tab
     *
     * @return bool
     */
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

    /**
     * Overriding Module::uninstall()
     * Drop all the table created during module installation.
     * Delete the tabs created during module installation.
     *
     * @return bool
     */
    public function uninstall()
    {
        $objDb = new WkPosDb();
        if (!parent::uninstall()
            || !$objDb->deleteTables()
            || !$this->uninstallTab()
            || !$this->uninstallCarrier()
            || !$this->deletePosCustomerGroup()
            || !$this->removeProfile()
            || !$this->uninstallOrderState()
            || !$this->unsetConfigurationVariable()
        ) {
            return false;
        }

        return true;
    }

    /**
     * Unset the configuration variable on module uninstall
     *
     * @return void
     */
    public function unsetConfigurationVariable()
    {
        $configKeys = [
            'WKPOS_HEADING',
            'WKPOS_CHANGE_PRODUCT_PRICE',
            'WKPOS_VOUCHER_ENABLE',
            'WKPOS_MESSAGE_ENABLE',
            'WKPOS_PRODUCT_NAME_LENGTH',
            'WKPOS_LOW_STOCK',
            'WKPOS_COMBINATION_TAG_ENABLE',
            'WKPOS_SPECIAL_PRICE_ENABLE',
            'WKPOS_GUEST_ACCOUNT_ENABLE',
            'WKPOS_GUEST_ACCOUNT',
            'WKPOS_SHOP_NAME',
            'WKPOS_PRINTER_NAME',
            'WKPOS_CONTACT_NUMBER',
            'WKPOS_DISPLAY_PRODUCT_DISCOUNT',
            'WKPOS_DISPLAY_ORDER_DISCOUNT',
            'WKPOS_DISPLAY_BARCODE',
            'WKPOS_ENABLE_CASH_DRAWER',
            'WKPOS_PRODUCT_SEARCH_TYPE',
            'WKPOS_OUTLET_PRODUCT_ACTIVE',
            'WKPOS_BARCODE_SEARCH_TYPE',
            'WKPOS_ID_CARRIER',
            'WKPOS_ID_CARRIER_REFERENCE',
            'WKPOS_ENABLE_SHIPPING',
            'WKPOS_PROFILE',
            'WKPOS_PRODUCT_REMOVE',
            'WKPOS_ORDER_CONFIRMATION_EMAIL',
            'WKPOS_ORDER_STATUS',
            'WKPOS_PRINTER_AUTO_CONNECT',
            'WKPOS_ORDER_EDIT_PAYMENT',
            'WKPOS_DEFAULT_SEARCH_TYPE',
            'WKPOS_CUSTOMER_GROUP',
            'WKPOS_PRINT_TYPE',
            'WKPOS_PRICE_DISPLAY_PRECISION',
            'WKPOS_DEFAULT_SHIPPING',
            'WKPOS_SHIPPING_METHOD',
            'WKPOS_CUSTOM_PRODUCT_CATEGORY',
            'WKPOS_SYNCHRONISE_QUANTITY',
            'WKPOS_DEFAULT_OUTLET',
            'WKPOS_DATE_TO',
            'WKPOS_DATE_FROM',
            'WKPOS_PRESELECT_DATE_RANGE',
            'WKPOS_PAYMENT_PARTIAL_VOUCHER',
            'WKPOS_PRINTER_ENCODING',
            'WKPOS_LOGIN_COLOR',
            'WKPOS_BUTTON_COLOR',
        ];
        foreach ($configKeys as $config) {
            Configuration::deleteByName($config);
        }

        return true;
    }

    /**
     * Delete the POS customer group on uninstall
     *
     * @return void
     */
    public function deletePosCustomerGroup()
    {
        $objGroup = new Group(Configuration::get('WKPOS_CUSTOMER_GROUP'));
        $objGroup->delete();

        return true;
    }

    public function getCarrierId()
    {
        $objCarrier = Carrier::getCarrierByReference((int) Configuration::get('WKPOS_ID_CARRIER_REFERENCE'));
        if (Validate::isLoadedObject($objCarrier)) {
            return $objCarrier->id;
        }

        return 0;
    }

    /**
     * Uninstall the carrier on module uninstall
     *
     * @return void
     */
    public function uninstallCarrier()
    {
        $objCarrier = Carrier::getCarrierByReference((int) Configuration::get('WKPOS_ID_CARRIER_REFERENCE'));
        if (Validate::isLoadedObject($objCarrier)) {
            $objCarrier->deleted = 1;
            $objCarrier->save();
        }
        Configuration::deleteByName('WKPOS_ID_CARRIER');
        Configuration::deleteByName('WKPOS_ID_CARRIER_REFERENCE');

        return true;
    }

    /**
     * Remove POS profile on uninstall
     *
     * @return void
     */
    public function removeProfile()
    {
        $posProfile = new Profile((int) Configuration::get('WKPOS_PROFILE'));
        $posProfile->delete();

        return true;
    }

    /**
     * Uninstall POS admin tabs
     *
     * @return bool
     */
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

    /**
     * Add POS profile on module install
     *
     * @return void
     */
    public function addProfile()
    {
        $objProfile = new Profile();
        foreach (Language::getLanguages(true) as $lang) {
            $objProfile->name[$lang['id_lang']] = $this->l('POS');
        }
        $objProfile->save();
        Configuration::updateValue('WKPOS_PROFILE', $objProfile->id);
        $idProfile = $objProfile->id;
        $perm = 'all';
        $enabled = 1;
        $access = new Access();
        $tab = Tab::getInstanceFromClassName('AdminPOS');
        $moduleId = Module::getModuleIdByName('wkpos');
        if ((int) $tab->id > 0) {
            $access->updateLgcAccess((int) $idProfile, $tab->id, $perm, $enabled); // AdminPOS
            $access->updateLgcModuleAccess((int) $idProfile, $moduleId, $perm, $enabled);
        }

        return true;
    }

    /**
     * Add POS Order Status on module install
     *
     * @return void
     */
    public function addOrderStatus()
    {
        $orderState = new OrderState();
        $orderState->name = [];
        foreach (Language::getLanguages() as $language) {
            $orderState->name[$language['id_lang']] = $this->l('Awaiting POS Payment');
        }
        $orderState->send_email = false;
        $orderState->color = '#0000ff';
        $orderState->hidden = false;
        $orderState->delivery = false;
        $orderState->logable = false;
        $orderState->invoice = false;
        if ($orderState->add()) {
            Configuration::updateValue('WKPOS_ORDER_STATUS', (int) $orderState->id);
        }

        return true;
    }

    public function uninstallOrderState()
    {
        $orderState = new OrderState((int) Configuration::get('WKPOS_ORDER_STATUS'));
        $orderState->delete();

        return true;
    }

    /**
     * Create POS customer group on module install
     *
     * @return void
     */
    public function createPosCustomerGroup()
    {
        $objGroup = new Group();
        $objGroup->show_prices = 1;
        foreach (Language::getLanguages(true) as $lang) {
            $objGroup->name[$lang['id_lang']] = $this->l('POS Customer');
        }
        $objGroup->price_display_method = 0;
        $objGroup->save();
        Configuration::updateValue('WKPOS_CUSTOMER_GROUP', $objGroup->id);
        if ($objGroup->id) {
            return true;
        }

        return false;
    }

    /**
     * Create new carrier for POS
     *
     * @return void
     */
    public function installCarrier()
    {
        $carrier = new Carrier((int) Configuration::get('WKPOS_ID_CARRIER'));
        if (Validate::isLoadedObject($carrier)) {
            if ($carrier->deleted) {
                $carrier->deleted = 0;
                $carrier->update();
            }

            return true;
        }
        $languages = Language::getLanguages(true);
        $carrier->name = $this->l('POS Carrier');
        $carrier->is_module = 1;
        $carrier->is_free = 1;
        $carrier->active = 1;
        $carrier->deleted = 0;
        $carrier->shipping_handling = 0;
        $carrier->range_behavior = 0;
        $carrier->shipping_external = 0;
        $carrier->external_module_name = $this->name;
        $carrier->need_range = 1;
        $carrier->id_tax_rules_group = 0;
        foreach ($languages as $language) {
            $carrier->delay[(int) $language['id_lang']] = $this->l('Pick Up In Store');
        }

        if ($carrier->add()) {
            Configuration::updateValue('WKPOS_ID_CARRIER', $carrier->id);
            Configuration::updateValue('WKPOS_ID_CARRIER_REFERENCE', (new Carrier($carrier->id))->id_reference);
            Configuration::updateValue('WKPOS_DEFAULT_SHIPPING', (new Carrier($carrier->id))->id_reference);
            Configuration::updateValue(
                'WKPOS_SHIPPING_METHOD',
                implode(
                    ',',
                    [(new Carrier($carrier->id))->id_reference]
                )
            );

            return
                $this->insertCarrierGroup($carrier)
                && $this->addToZones($carrier)
            ;
        } else {
            return false;
        }
    }

    /**
     * @param Carrier $carrier
     *
     * @return bool
     */
    protected function insertCarrierGroup($carrier)
    {
        $success = [];
        $groups = Group::getGroups(true);
        foreach ($groups as $group) {
            $carrier_group_data = [
                'id_carrier' => (int) $carrier->id,
                'id_group' => (int) $group['id_group'],
            ];
            $success[] = Db::getInstance()->insert('carrier_group', $carrier_group_data);
        }

        return array_sum($success) >= count($success);
    }

    /**
     * @param Carrier $carrier
     *
     * @return bool
     */
    protected function addToZones($carrier)
    {
        $success = [];
        $zones = Zone::getZones();
        $rangeWeight = new RangeWeight();
        $rangePrice = new RangePrice();
        foreach ($zones as $zone) {
            $carrierZoneData = [
                'id_carrier' => (int) $carrier->id,
                'id_zone' => (int) $zone['id_zone'],
            ];
            $success[] = Db::getInstance()->insert('carrier_zone', $carrierZoneData);
            $deliveryPriceRange = [
                'id_carrier' => (int) $carrier->id,
                'id_range_price' => (int) $rangePrice->id,
                'id_range_weight' => null,
                'id_zone' => (int) $zone['id_zone'],
                'price' => '0',
            ];
            $success[] = Db::getInstance()->insert('delivery', $deliveryPriceRange, true);

            $deliveryWeightRange = [
                'id_carrier' => (int) $carrier->id,
                'id_range_price' => null,
                'id_range_weight' => (int) $rangeWeight->id,
                'id_zone' => (int) $zone['id_zone'],
                'price' => '0',
            ];
            $success[] = Db::getInstance()->insert('delivery', $deliveryWeightRange, true);
        }

        return array_sum($success) >= count($success);
    }

    // cash register hooks
    public function hookDisplayWkPosEmployeeDetail()
    {
        return $this->context->smarty->fetch(_PS_MODULE_DIR_ . $this->name . '/views/templates/hook/user.tpl');
    }

    public function hookActionPosSetMedia($params)
    {
        $this->context->controller->posAddCss(
            [
                _MODULE_DIR_ . $this->name . '/views/css/session.css',
            ]
        );
        $this->context->controller->posAddJs(
            [
                _MODULE_DIR_ . $this->name . '/views/js/cash_register_bundle.js',
                // _MODULE_DIR_.$this->name.'/views/js/poscashregistermodel.js',
            ]
        );
        $idRegister = $this->getActiveCashRegisters();
        $objUser = new WkPosUser();
        $idEmployee = $this->context->cookie->id_employee;
        $salesmanUserId = $objUser->getUserDetails($idEmployee);
        $this->context->controller->posAddJsDef(
            [
                'posRegisterLink' => $this->context->link->getModuleLink(
                    $this->name,
                    'register'
                ),
                'posPdfDownloadLink' => $this->context->link->getModuleLink(
                    $this->name,
                    'register',
                    [
                        'ajax' => true,
                        'action' => 'downloadPdf',
                        'posToken' => $this->secure_key,
                    ]
                ),
                'posToken' => $this->secure_key,
                'activeCashRegister' => $idRegister,
                'posUsers' => $this->getAllUsers(),
                'salesmanUserId' => $salesmanUserId,
            ]
        );
        $this->context->controller->posAddJsDefL(
            [
                'cashRegisterCloseWarning' => $this->l('The amount difference is not settled. Do you want to close the register?'),
            ]
        );
        if ($idRegister) {
            $this->context->controller->posAddJsDef(
                [
                    'activeRegisterDetail' => $this->getRegisterDetails($idRegister),
                ]
            );
        }
    }

    public function hookActionOrderGridDefinitionModifier(array $params)
    {
        $definition = $params['definition'];
        $definition
            ->getColumns()
            ->addAfter(
                'osname',
                (new DataColumn('order_type'))
                    ->setName($this->l('Order From'))
                    ->setOptions([
                        'field' => 'order_type',
                        // 'callback' => 'callPosOrder',
                    ])
            )
        ;
        // For search filter
        $definition->getFilters()->add(
            (new Filter('order_type', YesAndNoChoiceType::class))
                ->setTypeOptions([
                    'choices' => [
                        $this->l('POS') => 1,
                        $this->l('WEB') => 0,
                    ],
                    'required' => false,
                ])
                ->setAssociatedColumn('order_type')
        );
    }

    /**
     * Hook allows to modify Customers query builder and add custom sql statements.
     *
     * @param array $params
     */
    public function hookActionOrderGridQueryBuilderModifier(array $params)
    {
        /** @var QueryBuilder $searchQueryBuilder */
        $searchQueryBuilder = $params['search_query_builder'];

        /** @var CustomerFilters $searchCriteria */
        $searchCriteria = $params['search_criteria'];

        $searchQueryBuilder->addSelect(
            '(CASE WHEN wko.active IS NULL THEN "WEB"
            WHEN wko.active=1 THEN "POS"
            WHEN wko.active=0 THEN "WEB" END) AS `order_type`, o.`reference`'
        );
        $searchQueryBuilder->leftJoin(
            'o',
            '`' . pSQL(_DB_PREFIX_) . 'wkpos_order`',
            'wko',
            'wko.`id_order` = o.`id_order`'
        );
        // if ('order_type' === $searchCriteria->getOrderBy()) {
        //     $searchQueryBuilder->orderBy('wko.`order_type`', $searchCriteria->getOrderWay());
        // }
        foreach ($searchCriteria->getFilters() as $filterName => $filterValue) {
            if ('order_type' === $filterName) {
                $searchQueryBuilder->andWhere('wko.`active` = :active');
                $searchQueryBuilder->setParameter('active', $filterValue);

                if (!$filterValue) {
                    $searchQueryBuilder->orWhere('wko.`active` IS NULL');
                }
            }
        }
    }

    // added new hook for addon modules
    public function hookActionSetSmartyVariablesInPos()
    {
        $wkposNf525 = false;
        if (Module::isInstalled('wkposnf') && Module::isEnabled('wkposnf')) {
            $wkposNf525 = true;
        }
        $wkposLoyalty = false;
        if (Module::isInstalled('wkposloyalty') && Module::isEnabled('wkposloyalty')) {
            $wkposLoyalty = true;
        }
        $this->context->smarty->assign(
            [
                'wkposNf525Install' => $wkposNf525,
                'wkposLoyaltyInstall' => $wkposLoyalty,
            ]
        );
    }
    // added new hook for addon modules

    // Used when custom product is created
    public function hookActionProductSave($param)
    {
        if (Tools::getValue('ajax') == true
        && Tools::getValue('action') == 'addCustomProduct'
        && Tools::getValue('fc') == 'module'
        && Tools::getValue('module') == 'wkpos') {
            $totalQty = (int) Tools::getValue('qty');
            $objPosOutletProduct = new WkPosOutletProduct();
            $psProducts = $objPosOutletProduct->getSelectedPsProduct($param['id_product']);
            $outlets = WkPosOutlets::getOutlets();
            if ($outlets) {
                foreach ($outlets as $outlet) {
                    if ($outlet['id_wkpos_outlet'] == $this->context->cookie->id_wkpos_outlet) {
                        $idOutletProduct = $objPosOutletProduct->checkOutletProductExist(
                            $param['id_product'],
                            $outlet['id_wkpos_outlet']
                        );
                        if (empty($idOutletProduct)) {
                            $objPosOutletProduct->assignProduct(
                                $psProducts,
                                $outlet['id_wkpos_outlet'],
                                false,
                                $totalQty
                            );
                        }
                    }
                }
            }
        } else {
            // for assigning any newly created product to pos automatically
            $totalQty = Tools::getValue('qty_0');
            $objPosOutletProduct = new WkPosOutletProduct();
            $psProducts = $objPosOutletProduct->getSelectedPsProduct($param['id_product']);
            $outlets = WkPosOutlets::getOutlets();
            if ($outlets) {
                foreach ($outlets as $outlet) {
                    $idOutletProduct = $objPosOutletProduct->checkOutletProductExist(
                        $param['id_product'],
                        $outlet['id_wkpos_outlet']
                    );
                    if (empty($idOutletProduct)) {
                        $objPosOutletProduct->assignProduct(
                            $psProducts,
                            $outlet['id_wkpos_outlet'],
                            false,
                            $totalQty
                        );
                    }
                }
            }
        }
    }

    public function installCustomProductCategory()
    {
        $objCategory = new Category();
        $objCategory->name = $this->createMultiLangField('POS Custom Product');
        $objCategory->active = 0; // not to display any where except pos
        $category_link_rewrite = Tools::link_rewrite($objCategory->name[1]);
        $objCategory->link_rewrite = $this->createMultiLangField($category_link_rewrite);
        $objCategory->id_parent = Configuration::get('PS_HOME_CATEGORY');
        $objCategory->description = $this->l('This category use for custom product added from POS panel only.');
        if ($objCategory->add()) {
            Configuration::updateValue('WKPOS_CUSTOM_PRODUCT_CATEGORY', $objCategory->id);

            return true;
        } else {
            return true;
        }
    }

    protected static function createMultiLangField($field)
    {
        $res = [];
        foreach (Language::getIDs(false) as $id_lang) {
            $res[$id_lang] = $field;
        }

        return $res;
    }

    public function hookDisplayAdminProductsOptionsStepTop($params)
    {
        $id_product = $params['id_product'];
        $objPosValues = new WkPosCustomPosValues();
        $allValues = $objPosValues->getPosCustomValuesByIdProduct($id_product);
        if (!empty($allValues)) {
            $this->context->smarty->assign(
                [
                    'online_sale_allow' => $allValues['online_sale_allow'],
                    'pos_sale_allow' => $allValues['pos_sale_allow'],
                ]
            );
        } else {
            $this->context->smarty->assign(
                [
                    'online_sale_allow' => 1,
                    'pos_sale_allow' => 1,
                ]
            );
        }

        return $this->display(__FILE__, 'adminproductoption.tpl');
    }

    public function hookActionProductUpdate($params)
    {
        if ($params['id_product'] != null) {
            WkPosHelper::updateBarcodesForNewProduct((int) $params['id_product']);
            if ($this->context->controller->controller_name == 'AdminProducts') {
                $id_product = (int) $params['id_product'];
                $saleOnline = Tools::getValue('saleOnline');
                if (!$saleOnline) {
                    $saleOnline = 0;
                }
                $posSale = Tools::getValue('posSale');
                if (!$posSale) {
                    $posSale = 0;
                }
                $objPosValues = new WkPosCustomPosValues();
                $allValues = $objPosValues->getPosCustomValuesByIdProduct($id_product);
                if (isset($allValues['id_wkpos_custom_pos_values'])) {
                    $updatePosValue = new WkPosCustomPosValues($allValues['id_wkpos_custom_pos_values']);
                    $updatePosValue->id_product = $id_product;
                    $updatePosValue->online_sale_allow = $saleOnline;
                    $updatePosValue->pos_sale_allow = $posSale;
                    $updatePosValue->save();
                } else {
                    $updatePosValue = new WkPosCustomPosValues();
                    $updatePosValue->id_product = $id_product;
                    $updatePosValue->online_sale_allow = $saleOnline;
                    $updatePosValue->pos_sale_allow = $posSale;
                    $updatePosValue->save();
                }
            }
        }
    }

    public function getActiveCashRegisters()
    {
        $idWkPosOutlet = $this->context->cookie->id_wkpos_outlet;
        $idEmployee = $this->context->cookie->id_employee;
        $idWkPosRegister = 0;
        if ($idWkPosOutlet) {
            $objRegister = new WkPosRegister();
            $currentRegister = $objRegister->getCurrentRegister($idWkPosOutlet, $idEmployee);
            if ($currentRegister) {
                $idWkPosRegister = trim($currentRegister['id_wkpos_register']);
            }
        }

        return $idWkPosRegister;
    }
}
