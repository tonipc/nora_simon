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

require_once _PS_MODULE_DIR_ . 'norainventory/vendor/autoload.php';

//LOGS
require_once(_PS_MODULE_DIR_. 'noralogs/classes/log.php');

use Module\NoraInventory\Classes\InstallCategories;
use Module\NoraInventory\Classes\InstallMeta;
use Module\NoraInventory\Classes\InstallTables;
use Module\NoraInventory\Classes\InstallTabs;
use Module\NoraInventory\Models\ProductStockDate;
use Module\NoraInventory\Models\ProductStep;
use Module\NoraInventory\Models\ProductStepPack;

use PrestaShopLogger as Logger;
// use StockAvailable;

// use PrestaShop\PrestaShop\Core\Domain\Product\Stock\ValueObject\OutOfStockType;

class NoraInventory extends Module
{
    protected $config_form = false;

    public function __construct()
    {
        $this->name = 'norainventory';
        $this->tab = 'front_office_features';
        $this->version = '0.0.1';
        $this->author = 'Community Developer';
        $this->need_instance = 0;

        /*
         * Set $this->bootstrap to true if your module is compliant with bootstrap (PrestaShop 1.6)
         */
        $this->bootstrap = true;
        $this->controllers = ['packs', 'api'];

        parent::__construct();

        $this->displayName = $this->l('Nora Inventory');
        $this->description = $this->l('Nora inventory and sales');

        $this->ps_versions_compliancy = ['min' => '1.7', 'max' => _PS_VERSION_];
        // $this->registerHook('displayHome');
        $this->data = [
            'translations' => [
                'add_to_cart' => $this->l('Add'),
                'add_more_products' => $this->l('Add More Products'),
                'button_extra_confirm' => $this->l('Confirm'),
                'button_extra_cancel' => $this->l('Add Nothing'),
                'change_day' => $this->l('Change Day'),
                'change_date_info' => $this->l('Our daily menu'),
                'change_date_title' => $this->l('Choose the delivery date:'),
                'change_date_subtitle' => $this->l('Choose the day when you want the menú to be delivered'),
                'edit' => $this->l('Edit'),
                'listing_label' => $this->l('Select a product'),
                'make_an_order' => $this->l('Make An Order'),
                'order' => $this->l('Make order'),
                'order_default_menu' => $this->l('Order recommended menu'),
                'order_for' => $this->l('Order For'),
                'price' => $this->l('Price'),
                'proceed_to_checkout' => $this->l('Proceed to checkout'),
                'quantity' => $this->l('Number of menus'),
                'quick_view' => $this->l('Quick View'),
                'regular_price' => $this->l('Regular price'),
                'review_and_confirm_payment' => $this->l('Review and confirm payment'),
                'see_more' => $this->l('See More'),
                'select_product' => $this->l('Select'),
                'selected_product' => $this->l('Selected'),
                'summary_title' => $this->l('Order'),
                'summary_subtitle' => $this->l('Menu'),
                'out_of_stock' => $this->l('Out of stock'),
                'nutricionales_cien' => $this->l('Nutritional values for 100g:'),
                'calorias' => $this->l('Calories'),
                'hidratos' => $this->l('Carbohydrates'),
                'proteina' => $this->l('Protein'),
                'grasas' => $this->l('Fats'),
                'grasas_saturadas' => $this->l('Saturated fats'),
                'azucares' => $this->l('Sugars'),
                'traces' => $this->l('Products not free of traces. Store between 0 and 4°C. For immediate consumption.'),
            ],
            'home' => [
                'id_menu' => (int) Configuration::get($this->name . 'HOMEPAGE_PACK'),
                'id_menu_option' => (int) Configuration::get($this->name . 'HOMEPAGE_PACK_OPTION'),
                'title' => pSQL(Configuration::get($this->name . 'HOMEPAGE_TITLE', $this->context->language->id)),
            ],
        ];
    }

    /**
     * Don't forget to create update methods if needed:
     * http://doc.prestashop.com/display/PS16/Enabling+the+Auto-Update
     */
    public function install()
    {
        Configuration::updateValue('NORAINVENTORY_LIVE', false);

        $hooks = [
            'backOfficeHeader',
            'displayHeader',
            'displayOverrideTemplate',
            // 'actionCartUpdateQuantityBefore',
            'actionCartSave',
            'displayCustomization',
            'actionGetProductPropertiesBefore',
            'actionGetProductPropertiesAfter',
            'actionObjectProductInCartDeleteAfter',
            // 'actionSearch',
            'filterProductContent',
            'displayHeaderCategory',
            'displayContentWrapperTop',
            'displayBanner',
            'displayNav1',
            'displayNav2',
            'displayTop',
            'displayNavFullWidth',
            //confirmation puede dar problemas
            // 'displayOrderConfirmation',
            'actionValidateOrder',
            //cuando se cancela el pedido
            'actionOrderStatusUpdate',
            'actionDispatcher',
            // Display
            'displayHome'
        ];

        $result = true;

        $result &= parent::install();

        foreach ($hooks as $hook) {
            $result &= $this->registerHook($hook);

            if ($result === false) {
                $message = "{$this->name}: Error when trying to install hook {$hook}";
                $this->_errors[] = $message;
                Logger::AddLog($message);
                // Continue installation in order to log each failure
                $result = true;
            }
        }

        $result &= InstallTables::install();

        if (!$result) {
            $message = "{$this->name}: Error when trying to install tabs";
            Logger::AddLog($message);
            $this->_errors[] = $message;
            // Continue installation in order to log each failure
            $result = true;
        }

        $result &= InstallTabs::install();

        if (!$result) {
            $message = "{$this->name}: Error when trying to install tabs";
            Logger::AddLog($message);
            $this->_errors[] = $message;
            // Continue installation in order to log each failure
            $result = true;
        }

        $result &= InstallCategories::install();

        if (!result) {
            $message = "{$this->name}: Error when trying to install default category";
            Logger::AddLog($message);
            $this->_errors[] = $message;
            // Continue installation in order to log each failure
            $result = true;
        }

        // $result &= InstallMeta::install();

        // if (!$result) {
        //     $message = "{$this->name}: Error when trying to install meta";
        //     Logger::AddLog($message);
        //     $this->_errors[] = $message;
        //     // Continue installation in order to log each failure
        //     $result = true;
        // }

        return $result;
    }

    public function uninstall()
    {
        Configuration::deleteByName('NORAINVENTORY_LIVE');

        return parent::uninstall() && InstallTabs::uninstall();
    }

    public function enable($force_all = false)
    {
        return parent::enable($force_all)
            && InstallTabs::install() && InstallTables::install();
    }

    public function disable($force_all = false)
    {
        return parent::disable($force_all)
            && InstallTabs::uninstall()
        ;
    }

    /**
     * Getter for $tabs attribute.
     *
     * @return array
     */
    public function getTabs()
    {
        return $this->tabs;
    }

    /**
     * Load the configuration form
     */
    public function getContent()
    {
        /*
         * If values have been submitted in the form, process.
         */
        if (((bool) Tools::isSubmit('submitStepperModule')) == true) {
            $this->postProcess();
        }

        $this->context->smarty->assign('module_dir', $this->_path);
        $this->context->smarty->assign(
            'norainventoryCronTaskUrl', $this->context->link->getModuleLink($this->name, 'api', [
                'apiToken' => $this->getToken('apiToken', true),
                'ajax' => 1,
                'action' => 'cronJob',
                'tokenType' => 'static'
            ])
        );

        $output = $this->context->smarty->fetch($this->local_path . 'views/templates/admin/configure.tpl');

        $output .= $this->renderForm();

        return $output;
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     */
    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitStepperModule';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            . '&configure=' . $this->name . '&tab_module=' . $this->tab . '&module_name=' . $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = [
            'fields_value' => $this->getConfigFormValues(), /* Add values for your inputs */
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        ];

        return $helper->generateForm([$this->getConfigForm()]);
    }

    /**
     * Create the structure of your form.
     */
    protected function getConfigForm()
    {
        $allMenus = ProductStepPack::getDetailedPacks();
        $allOptions = [];
        if ($idMenu = (int) Configuration::get($this->name . 'HOMEPAGE_PACK')) {
            foreach ($allMenus as $key => $value) {
                if ($value['id'] == $idMenu) {
                    $allOptions = $allMenus[$key]['options'];
                    break;
                }
            }
        }

        Media::AddJsDef([
            'norainventoryData' => [
                'menus' => $allMenus
            ]
        ]);

        return [
            'form' => [
                'legend' => [
                    'title' => $this->l('Settings'),
                    'icon' => 'icon-cogs',
                ],
                'input' => [
                    [
                        'type' => 'select',
                        'label' => $this->l('Pack'),
                        'description' => $this->l('The main pack to display in homepage'),
                        'name' => $this->name . 'HOMEPAGE_PACK',
                        'options' => [
                            'query' => $allMenus,
                            'id' => 'id',
                            'name' => 'label'
                        ]
                    ],
                    [
                        'type' => 'select',
                        'label' => $this->l('Option'),
                        'description' => $this->l('The main option to display in homepage'),
                        'name' => $this->name . 'HOMEPAGE_PACK_OPTION',
                        'options' => [
                            'query' => $allOptions,
                            'id' => 'id',
                            'name' => 'label'
                        ]
                    ],
                    [
                        'type' => 'text',
                        'label' => $this->l('Homepage title'),
                        'description' => $this->l('Display a message in the header of the homepage block'),
                        'name' => $this->name . 'HOMEPAGE_TITLE',
                        'lang' => true,
                        'empty_message' => $this->l('Type a message here')
                    ],
                ],
                'submit' => [
                    'title' => $this->l('Save'),
                ],
            ],
        ];
    }

    /**
     * Set values for the inputs.
     */
    protected function getConfigFormValues()
    {
        $titleLang = [];

        foreach (Language::getIds() as $langId) {
            $titleLang[$langId] = Configuration::get($this->name . 'HOMEPAGE_TITLE', $langId);
        }

        return [
            $this->name . 'HOMEPAGE_PACK' => Configuration::get($this->name . 'HOMEPAGE_PACK'),
            $this->name . 'HOMEPAGE_PACK_OPTION' => Configuration::get($this->name . 'HOMEPAGE_PACK_OPTION'),
            $this->name . 'HOMEPAGE_TITLE' => $titleLang,
        ];
    }

    /**
     * Save form data.
     */
    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();

        foreach ($form_values as $key => $value) {
            if (is_array($value)) {
                $langField = [];

                foreach (Language::getIds() as $langId) {
                    $langField[$langId] = pSQL(Tools::getValue($key . '_' . $langId));
                }

                Configuration::updateValue($key, $langField);
            } else {
                Configuration::updateValue($key, Tools::getValue($key));
            }
        }
    }

    /**
     * Add the CSS & JavaScript files you want to be loaded in the BO.
     */
    public function hookBackOfficeHeader()
    {
        if (Tools::getValue('configure') == $this->name ||
        Tools::getValue('module_name') == $this->name) {
            $this->context->controller->addJS($this->getPathUri() . 'views/js/admin-pack-get-content.js');
        }
    }

    /**
     * Add the CSS & JavaScript files you want to be added on the FO.
     */
    public function hookDisplayHeader()
    {
        // Current Date

        if (empty($this->context->cart->id) && isset($_COOKIE[$this->context->cookie->getName()])) {
            $this->context->cart->add();
            $this->context->cookie->id_cart = (int) $this->context->cart->id;
        }

        $availableDates = ProductStockDate::getAvailableDates();

        if (Tools::isSubmit('submit_current_date')) {
            $currentDate = pSQL(Tools::getValue('current_date'));

            if (Validate::isDate($currentDate) && in_array($currentDate, $availableDates)) {
                $this->context->cookie->__set('nora_inventory_current_date', $currentDate);
            }

            //var_dump($currentDate);
            // To avoid outdated hooks
            header('Location:' . $_SERVER['REDIRECT_URL']);
            die();
        }

        // Check if cookie had been set else set one
        $currentDate = $this->context->cookie->__get('nora_inventory_current_date');

        if (!$currentDate || !in_array($currentDate, $availableDates)) {
            $currentDate = reset($availableDates);
            $this->context->cookie->__set('nora_inventory_current_date', $currentDate);
        }

        $this->context->smarty->assign([
            'nora_inventory' => [
                'available_dates' => $availableDates,
                'current_date' => $currentDate,
            ],
        ]);

        $this->context->controller->addCSS($this->getPathUri().'views/css/front.css');
    }

    public function hookDisplayHeaderCategory()
    {
        // @TODO: Implement to see date selector
    }

    /**
     * Modify category template in order to sale packs
     */
    public function hookDisplayOverrideTemplate($params)
    {
        // @TODO: Implement to override category
    }

    /**
     * Sync data between cart and product customization
     */
    public function hookActionCartSave()
    {
        try {
            if (Tools::getValue('controller') === 'cart'
            && Validate::isLoadedObject($this->context->cart)
            && Tools::getValue('action') === 'update') {
                // GET
                $idProduct = (int) Tools::getValue('id_product');

                // Get id product attribute from field or find by group
                $idProductAttribute = (int) Tools::getValue('id_product_attribute');
                $groups = Tools::getValue('group');

                if (!empty($groups)) {
                    $idProductAttribute = (int) Product::getIdProductAttributeByIdAttributes(
                        $idProduct,
                        $groups,
                        true
                    );
                }

                // If customization exists?
                $idCustomization = (int) Tools::getValue('id_customization');

                // If customization exists update else create
                $idCart = (int) $this->context->cart->id;

                $currentDate = pSQL(Tools::getValue('date'));
                if (!$currentDate) {
                    $currentDate = $this->context->cookie->__get('nora_inventory_current_date');
                }
                $index = strtotime($currentDate);

                // Existing product in cart
                $cartProduct = $this->getCartProduct(
                    $idCart,
                    $idProduct,
                    $idProductAttribute,
                    $idCustomization
                );

                $quantity = $cartProduct['quantity'];

                if (!$idCustomization) {
                    $idCustomization = $this->addCustomization(
                        (int) $idProduct,
                        (int) $idProductAttribute,
                        (int) $index,
                        Product::CUSTOMIZE_TEXTFIELD,
                        $currentDate,
                        $quantity,
                        true
                    );

                    // Update product in cart to add customization
                    $this->assignCustomizationToCartProduct(
                        $idCustomization,
                        $idCart,
                        $idProduct,
                        $idProductAttribute
                    );
                }

                // Get the quantity operations
                // $operation = pSQL(Tools::getValue('op'));
                // $add = (int) Tools::getValue('add');
                // $delete = (int) Tools::getValue('add');
                // $qty = (int) Tools::getValue('qty') ?: 1;

                // $quantity = 999;
                // switch ($operation) {
                //     case 'up':
                //         // Decrease stock
                //         break;
                //     case 'down':
                //         // Increse stock
                //         break;
                //     default:
                //         if ($add && $qty) {
                //             $quantity = $qty;
                //         } elseif ($delete) {
                //             $quantity = 0;
                //             // 'in_cart' 0
                //             $this->updateCustomization($idCustomization, ['in_cart' => 0]);
                //         }
                // }
            }
        } catch (Exception $e) {
            Logger::AddLog('Exception: ' . $e->getMessage());
        }
    }

    /**
     * Update data into the Customization object
     *
     * @param int $id
     * @param array $data
     */
    protected function updateCustomization($id, $data)
    {
        if (!$id || !$data) {
            Logger::AddLog(print_r([$id, $data], true));
        }

        Db::getInstance()->update(
            'cart_product',
            $data,
            '`id_customization` = ' . (int) $id
        );

        return true;
    }

    protected function getCartProduct($idCart, $idProduct, $idProductAttribute, $idCustomization)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('cart_product');
        $sql->where('`id_cart` = ' . (int) $idCart);
        $sql->where('`id_product` = ' . (int) $idProduct);
        $sql->where('`id_product_attribute` = ' . (int) $idProductAttribute);
        $sql->where('`id_customization` = ' . (int) $idCustomization);

        return Db::getInstance()->getRow($sql);
    }

    protected function assignCustomizationToCartProduct($idCustomization, $idCart, $idProduct, $idProductAttribute)
    {
        $where = '`id_cart` = ' . (int) $idCart .
            ' AND `id_product` = ' . (int) $idProduct .
            ' AND `id_customization` = ' . 0 .
            ' AND `id_product_attribute` = ' . (int) $idProductAttribute;

        Db::getInstance()->update(
            'cart_product',
            [
                'id_customization' => (int) $idCustomization,
            ],
            $where
        );
    }

    /**
     * @param [ 'customization' => $row ]
     */
    public function hookDisplayCustomization($params)
    {
        $this->context->smarty->assign([
            'delivery_date' => $params['customization']['value'],
        ]);

        return $this->context->smarty->fetch('module:norainventory/views/templates/hook/customization-summary.tpl');
    }

    // Display SELECT DATE buttons
    public function hookDisplayContentWrapperTop()
    {
        // @TODO: Implement to display SELECT DATE buttons
        // return 'displayContentWrapperTop_XXXXYYYYZZZ';
    }

    public function hookDisplayBanner()
    {
        // @TODO: Implement to display SELECT DATE buttons
        // return 'displayBanner_XXXXYYYYZZZ';
    }

    public function hookDisplayNav1()
    {
        return $this->context->smarty->fetch('module:norainventory/views/templates/hook/packs-link.tpl');
    }

    public function hookDisplayNav2()
    {
        // @TODO: Implement to display SELECT DATE buttons
        // return 'hookDisplayNav2_XXXXYYYYZZZ';
    }

    public function hookDisplayTop()
    {
        if ($this->context->controller->php_self ||
        (!empty($this->context->controller->page_name) &&
        $this->context->controller->page_name !== 'module-norainventory-packs')) {
            return $this->context->smarty->fetch('module:norainventory/views/templates/hook/change-date.tpl');
        }
    }

    public function hookDisplayNavFullWidth()
    {
        // @TODO: Implement to display SELECT DATE buttons
        // return 'hookDisplayNavFullWidth_XXXXYYYYZZZ';
    }

    /**
     * $data = [
     *   'cart' => $this,
     *   'product' => $product,
     *   'id_product_attribute' => $id_product_attribute,
     *   'id_customization' => $id_customization,
     *   'quantity' => $quantity,
     *   'operator' => $operator,
     *   'id_address_delivery' => $id_address_delivery,
     *   'shop' => $shop,
     *   'auto_add_cart_rule' => $auto_add_cart_rule,
     * ];
     */
    public function hookActionCartUpdateQuantityBefore($params)
    {
       // Logger::AddLog('hookActionCartUpdateQuantityBefore' . json_encode($params));
    }

    /**
     * @param array $param ['object' => $product_for_template]
     */
    public function hookFilterProductContent($params)
    {
        // TODO
        // dump($params);
        // die();
    }

    public function addCustomization($id_product, $id_product_attribute, $index, $type, $value, $quantity, $returnId = false)
    {
        $sql = new DbQuery();
        $sql->select('cu.`id_customization`, cd.`index`, cd.`value`, cd.`type`');
        $sql->from('customization', 'cu');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'customized_data` cd ON cu.`id_customization` = cd.`id_customization`');
        $sql->where('cu.id_cart = ' . (int) $this->context->cart->id);
        $sql->where('cu.id_product = ' . (int) $id_product);
        if ($id_product_attribute) {
            $sql->where('cu.id_product_attribute = ' . (int) $id_product_attribute);
        }
        $sql->where('`in_cart` = 0');

        $exising_customization = Db::getInstance()->executeS($sql);

        if ($exising_customization) {
            // If the customization field is alreay filled, delete it
            foreach ($exising_customization as $customization) {
                if ($customization['type'] == $type && $customization['index'] == $index) {
                    $where = 'id_customization = ' . (int) $customization['id_customization'] . '
                    AND type = ' . (int) $customization['type'] . '
                    AND `index` = ' . (int) $customization['index'];

                    Db::getInstance()->delete(customized_data, $where);

                    break;
                }
            }

            $idCustomization = $exising_customization[0]['id_customization'];
        } else {
            Db::getInstance()->insert('customization', [
                'id_cart' => (int) $this->context->cart->id,
                'id_product' => (int) $id_product,
                'id_product_attribute' => (int) $id_product_attribute,
                'quantity' => (int) $quantity,
                'in_cart' => 1,
            ]);

            $idCustomization = Db::getInstance()->Insert_ID();
        }

        $result = Db::getInstance()->insert('customized_data', [
            'id_customization' => $idCustomization,
            'type' => (int) $type,
            'index' => (int) $index,
            'value' => pSQL($value),
            'id_module' => (int) $this->id,
        ]);

        if (!$result) {
            return false;
        }

        if (true === $returnId) {
            return (int) $idCustomization;
        }

        return true;
    }

    public function hookActionDispatcher($params)
    {
        $baseLink = $this->context->link->getBaseLink();
        $moduleLink = $this->context->link->getModuleLink($this->name, 'packs');

        $url = str_replace($baseLink, '', $moduleLink);
        $regex = sprintf('/^\/%s/', str_replace('/', '\/', $url));

        $match = preg_match($regex, $_SERVER['REQUEST_URI']);

        if ($match && $params['controller_class'] == 'PageNotFoundController') {
            Tools::redirect($moduleLink);
        }
    }

    public function hookActionGetProductPropertiesBefore($params)
    {
        // ...
    }

    /**
     * @param array $params
     *
     * $data = [
     *      'id_cart' => (int) $this->context->cart->id,
     *      'id_product' => (int) $this->id_product,
     *      'id_product_attribute' => (int) $this->id_product_attribute,
     *      'customization_id' => (int) $this->customization_id,
     *      'id_address_delivery' => (int) $this->id_address_delivery,
     *  ];
     */
    public function hookActionObjectProductInCartDeleteAfter($params)
    {
        $idProduct = $params['id_product'];
        $product = new Product($idProduct);

        if (Validate::isLoadedObject($product) &&
        Pack::isPack($idProduct) &&
        $product->id_category_default == Configuration::get('NORAINVENTORY_DEFAULT_CATEGORY')) {
            $product->delete();
        }
    }

    /**
     * @param array $params
     *                      [
     *                      'id_lang' => $id_lang,
     *                      'product' => &$row,
     *                      'context' => $context,
     *                      ]
     */
    public function hookActionGetProductPropertiesAfter($params)
    {
        $isCart = !empty($this->context->controller) &&
            !empty($this->context->controller->php_self) &&
            $this->context->controller->php_self === 'cart';

        $date = $this->context->cookie->__get('nora_inventory_current_date');

        if ($isCart) {

            if (isset($params['product']['id_customization']))
            {
                $idCustomization = (int) $params['product']['id_customization'];
                $sql = new DbQuery();
                $sql->select('value');
                $sql->from('customized_data');
                $sql->where('`id_customization` = ' . (int) $idCustomization);
                $date = Db::getInstance()->getValue($sql);
            }
        } elseif (Tools::getIsset('date')) {
            $date = pSQL(Tools::getValue('date'));
        }

        $stock = 999;
        if (!Pack::isPack($params['product']['id_product'])) {
            $stock = ProductStockDate::getStockByDate(
                $date,
                $params['product']['id_product'],
                !empty($params['product']['id_product_attribute'])
                    ? $params['product']['id_product_attribute']
                    : 0
            );
        }

        // Load Sotck Data
        $params['product']['quantity'] = $stock;
        if (!Pack::isPack($params['product']['id_product'])) {
            $params['product']['out_of_stock'] = 0;
        } else {
            $params['product']['out_of_stock'] = 1;
        }
        $params['product']['depends_on_stock'] = (bool) $stock;
        $params['product']['location'] = '';

        // Update stock quantity in the product row
        $params['product']['quantity_available'] = $stock;
        // $params['product']['quantity'] = $stock;
        // $params['product']['quantity_all_versions'] = $stock;
        // $params['product']['available_for_order'] = (bool) $stock;
        // // $params['product']['out_of_stock'] = OutOfStockType::OUT_OF_STOCK_NOT_AVAILABLE;
        // $params['product']['out_of_stock'] = 0;
    }

    /**
     * @param string $text
     * @param bool $static
     */
    public function getToken($text, bool $static=false)
    {
        $array = [$text];

        if (!$static) {
            $array = [
                $this->context->customer->id,
                $this->context->customer->passwd,
                $this->id,
                $text,
            ];
        }

        return Tools::hash(implode('~', $array));
    }

    protected function removeBaseUrl($url)
    {
        $baseUrl = $this->context->link->getBaseLink();

        return str_replace(
            $baseUrl,
            '/',
            $url
        );
    }

    public function getModuleLinkWithoutBase($controller = 'default', $params = [])
    {
        return $this->removeBaseUrl($this->context->link->getModuleLink(
            $this->name,
            $controller,
            $params
        ));
    }

    public function getPageLinkWithoutBase($controller, $params = [])
    {
        return $this->removeBaseUrl($this->context->link->getPageLink(
            $controller,
            true,
            null,
            $params
        ));
    }

    public function getApiUrl($action = '', $params = [])
    {
        $params = array_merge($params, [
            'ajax' => 1,
            'apiToken' => $this->getToken('apiToken'),
        ]);

        if ($action) {
            $params['action'] = $action;
        }

        return $this->getModuleLinkWithoutBase('api', $params);
    }

    public function getFeaturesWithValues(array $ids = [])
    {
        $idLang = Context::getContext()->language->id;

        $features = Db::getInstance()->executeS('
		SELECT f.id_feature, f.*, fl.*, fvl.*
		FROM `' . _DB_PREFIX_ . 'feature` f
		' . Shop::addSqlAssociation('feature', 'f') . '
		LEFT JOIN `' . _DB_PREFIX_ . 'feature_lang` fl ON (f.`id_feature` = fl.`id_feature` AND fl.`id_lang` = ' . (int) $idLang . ')
		LEFT JOIN `' . _DB_PREFIX_ . 'feature_value` fv ON (fv.`id_feature` = f.`id_feature`)
		LEFT JOIN `' . _DB_PREFIX_ . 'feature_value_lang` fvl ON (fvl.`id_feature_value` = fv.`id_feature_value` AND fvl.`id_lang` = ' . (int) $idLang . ')
        '. (empty($ids) ? '' : 'WHERE fvl.id_feature_value IN (' . implode(',', array_map('intval', $ids)) . ')') .'
		ORDER BY f.`position` ASC');

        return $features;
    }

    public function getFeaturesToFilter()
    {
         //GET the ids of feature 6, that is the general features values
        $features = Db::getInstance()->executeS('
        SELECT f.id_feature_value
        FROM `' . _DB_PREFIX_ . 'feature_value` f
        WHERE f.id_feature = 6');

        $ids = [];
        foreach ($features as $feature) {
            array_push($ids, intval($feature['id_feature_value']) );
        }
        // Get 'id_feature_value' ids to use in the feature list section
        //$ids = [4, 1, 3, 65, 66];

        return $this->getFeaturesWithValues($ids);
    }

    protected function getProductPresenter()
    {
        return $this->getFactory()->getPresenter();
    }

    protected function getProductPresentationSettings()
    {
        return $this->getFactory()->getPresentationSettings();
    }

    private function getFactory()
    {
        return new ProductPresenterFactory($this->context, new TaxConfiguration());
    }

    private function prepareProductForTemplate(array $rawProduct)
    {
        $product = (new ProductAssembler($this->context))
            ->assembleProduct($rawProduct);

        $presenter = $this->getProductPresenter();
        $settings = $this->getProductPresentationSettings();

        return $presenter->present(
            $settings,
            $product,
            $this->context->language
        );
    }

    public function getProductsByDate($date, $attributes = [], $categories = [])
    {
        $queryResult = ProductStockDate::getProductsByDate($date, $attributes, $categories);

        $products = Product::getProductsProperties($this->context->language->id, $queryResult);

        return array_map([$this, 'prepareProductForTemplate'], $products);
    }

    /*NO ESTÁ EN ESE HOOK
    public function hookDisplayHome()
    {
        $currentDate = $this->context->cookie->__get('nora_inventory_current_date');
        $idMenu = (int) $this->data['home']['id_menu'];
        $idMenu = 3;
        $idMenuOption = (int) $this->data['home']['id_menu_option'];
        // Get enabled menu details
        $allMenus = ProductStepPack::getDetailedPacks();
        //var_dump($allMenus);
        $menus = array_filter($allMenus, function ($var) use ($idMenu) {
            return $var['id'] === $idMenu;
        });
        //var_dump($allMenus);
        $menu = reset($menus);
        //var_dump($idMenuOption);
        $options = array_filter($menu['options'], function ($var) use ($idMenuOption) {
            return $var['id'] === $idMenuOption;
        });
        $option = reset($options);

        $steps = $option['steps'];
        $stepsDetails = ProductStep::getStepsWithCategories();

        $products = [];
        foreach ($steps as $key => $value) {
            $details = array_filter($stepsDetails, function($var) use ($value) {
                return (int) $var['id'] == (int) $value['id'];
            });
            $detail = reset($details);

            $qty = (int) $value['quantity'];
            $steps[$key] = [
                'id' => $value['id'],
                'label' => $value['label'],
                'quantity' => $qty,
                'categories' => $detail['categories'],
                'attributes' => $detail['attributes'],
            ];

            $allProducts = $this->getProductsByDate($currentDate, $detail['attributes'], $detail['categories']);

            if ( count($allProducts) != 0)
            {
                $randomKeys = [];
                if ($qty > 1) {
                    $randomKeys = array_rand($allProducts, $qty);
                } else {
                    $randomKeys[] = array_rand($allProducts, $qty);
                }

                // $randomProducts = array_intersect_key($allProducts, $randomKeys);
                // array_merge($products, $randomProducts);
                foreach ($randomKeys as $key) {
                    $products[] = $allProducts[$key];
                }
            }
            else
            {
                $products = [];
            }
        }

        $basket = [];
        foreach ($products as $product) {
            $basket[] = [
                'date' => $currentDate,
                'id_menu' => $idMenu,
                'id_option' => $idMenuOption,
                'id_product' => $product->id,
                'id_product_attribute' => $product->id_product_attribute,
                'quantity' => 1,
            ];
        }

        $featuresWithValues = $this->getFeaturesWithValues();
        $featuresToFilter = $this->getFeaturesToFilter();

        Media::addJsDef([
            'noraInventoryData' => [
                'modalView' => false,
                'apiUrl' => $this->getApiUrl(),
                'urls' => [
                    'apiUrl' => $this->getApiUrl(),
                    'cartUrl' => $this->getPageLinkWithoutBase('cart', ['action' => 'show']),
                    'orderUrl' => $this->getPageLinkWithoutBase('order'),
                    'packsUrl' => $this->getModuleLinkWithoutBase('packs'),
                ],
                'isEmptyCart' => !Cart::getNbProducts((int) $this->context->cart->id),
                'translations' => $this->data['translations'],
                'currentDate' => $currentDate,
                'currentMenu' => $idMenu,
                'currentOption' => $idMenuOption,
                'menus' => $menus,
                'currentMenuDetails' => $menu,
                'currentMenuOptions' => $options,
                'currentOptionDetails' => $option,
                'featuresWithValues' => $featuresWithValues,
                'featuresToFilter' => $featuresToFilter,
                'truncProductTitle' => false,
                'summarySettings' => [
                    'twoButtons' => true, // false: add to cart button, true, add more products / redirect to
                    // Configure if redirect auto in one button or display confirmation modal
                    'redirectAutoTo' => true, // true redirect to redirectTo, false display confirmation modal
                    // Configure if redirect either to cart or to order page
                    'redirectTo' => true ? $this->getPageLinkWithoutBase('order') : $this->getPageLinkWithoutBase('cart', ['action' => 'show']),

                    'cartUrl' => $this->getPageLinkWithoutBase('cart', ['action' => 'show']),
                    'orderUrl' => $this->getPageLinkWithoutBase('order'),

                    'quantityInputs' => range(1, 10),

                    'quantityType' => 'number', // number | select

                    'isEmptyCart' => !Cart::getNbProducts((int) $this->context->cart->id),
                ],
                'pageTitle' => $this->data['home']['title'],
                'products' => $products,
                'basket' => $basket,
            ]
        ]);

        $this->context->controller->addCSS($this->getPathUri().'views/public/commons~homepage~packs.css');
        $this->context->controller->addCSS($this->getPathUri().'views/public/homepage.css');

        $key = $this->name;
        $this->context->smarty->assign([
            $key => [
                'pathApp' => $this->getPathUri() . 'views/public/homepage.bundle.js',
                'vendorChunk' => $this->getPathUri() . 'views/public/vendor.chunk.js',
                'commonsChunk' => $this->getPathUri() . 'views/public/commons~homepage~packs.chunk.js',
            ]
        ]);

        return $this->fetch('module:' . $this->name . '/views/templates/hook/display-home.tpl');
    }
    */

     //El Hook OrderConfirmation no es el adecuado para restar stock
    //  public function hookDisplayOrderConfirmation($params){
    public function hookActionValidateOrder($params) {
        $order = $params['order'];
        $id_order = $order->id;

        $products = $order->getProducts();

        if(Module::isEnabled("noralogs")){
            $log = new LogNora();
        }
        
        foreach ($products as $product) {

            if (Pack::isPack($product['id_product']))
            {
                //Get pack products
                $products_inPack =  Pack::getItemTable(
                    $product['id_product'],
                    1
                );

                foreach ($products_inPack as $product_pack) {
                    # code...
                    //Avoid warning that can occur when product has no attribute
                    if (!isset($product_pack['id_product_attribute']) )
                    {
                        $product_pack['id_product_attribute'] = null;
                    }


                    if($log)
                        $log->insertLog('Cantidad del pack '.$product_pack['pack_quantity'], false);
        

                    $this->decrementStock($product_pack['id_product'], $product_pack['id_product_attribute'], $product['delivery_date'], $product_pack['pack_quantity'], $id_order);
                }

            }
            else
            {
               // var_dump($product['product_quantity']);
                if (!isset($product['id_product_attribute']) )
                {
                    if ( isset($product['product_attribute_id']) )
                    {
                        $product['id_product_attribute'] = $product['product_attribute_id'];
                    }
                    else
                    {
                        $product['id_product_attribute'] = null;
                    }
                        
                        
                }

                if($log)
                    $log->insertLog('Cantidad del producto '.$product['product_quantity'], false);
    

                $this->decrementStock($product['id_product'], $product['id_product_attribute'], $product['delivery_date'], intval($product['product_quantity']), $id_order );
            }
        }

        //...some othe code
    }

    //cancel incrementaremos el stock con la clase
    public function hookActionOrderStatusUpdate($params){

    }

    //allows to decrement the product quantity
    public function decrementStock($id_product, $id_product_attribute, $date, $productQuantity = 1, $id_order)
    {
        $stock = ProductStockDate::getStockByDate(
            $date,
            $id_product,
                !empty($id_product_attribute)
                    ? $id_product_attribute
                    : 0
            );

        /*if ($stock-$productQuantity <= 0)
        {
            $inventoryId = ProductStockDate::getIdByParams($date, $id_product, $id_product_attribute);
            $obj = new ProductStockDate($inventoryId);
            $obj->delete();
        }
        else
        { */

            if(Module::isEnabled("noralogs")){
                $log = new LogNora();
            }

            if($stock){
                if($log)
                    $log->insertLog('Para el dia '.$date.' el stock es '.$stock.' y la cantidad a restar es '.$productQuantity, false);
            }

            //restamos
            $this->updateStock($date, $stock-$productQuantity, $id_product, $id_product_attribute, $id_order);
        //}

    }

    public function updateStock($date, $quantity, $idProduct, $idProductAttribute = 0, $id_order)
    {
        try {
            $inventoryId = ProductStockDate::getIdByParams($date, $idProduct, $idProductAttribute);

            if(Module::isEnabled("noralogs")){
                $log = new LogNora();
            }

            if($inventoryId){
                if($log)
                    $log->insertLog('El inventoryId existe es '.$inventoryId, false);
            }
          
            $obj = new ProductStockDate($inventoryId);

            if (!Validate::isLoadedObject($obj)) {
                // Create if stock is available
                if ($quantity) {
                    $obj->available_date = pSQL($date);
                    $obj->id_product = (int) $idProduct;
                    $obj->id_product_attribute = (int) $idProductAttribute;
                    $obj->quantity = (int) $quantity;
                    $obj->save();


                  
                }
            } else {
                // Update
                /*if ($quantity === 0) {
                    // Deete
                    $obj->delete();
                } else { */
                    $obj->quantity = $quantity;
                    $obj->save();

                    $product = new Product($idProduct);

                    //falta añadir delivery_date
                    if($obj->save()){
                        if($log)
                            $log->insertLog('Pedido '.$id_order.'. El stock en la tabla product_stock_date se actualizó con la cantidad '.$quantity.' para el id_product '.$idProduct.' de nombre '.$product->name[1].' , atributo '.$idProductAttribute.' y con fecha de entrega '.$date, false);

                    }else{
                        if($log)
                            $log->insertLog('Pedido '.$id_order.'. El stock en la tabla de FECHA NO se actualizó', false);
                    }

                //}
            }

        
            // TABLA DE STOCK DE PRESTA NOS ES IGUAL
            // $byDateStock = (int) ProductStockDate::getStockByProduct($idProduct, $idProductAttribute);
            // $generalStock = (int) StockAvailable::getQuantityAvailableByProduct($idProduct, $idProductAttribute);

            // $delta = $byDateStock - $generalStock;

       
            // StockAvailable::updateQuantity((int) $idProduct, (int) $idProductAttribute, $delta);

            // if(StockAvailable::updateQuantity((int) $idProduct, (int) $idProductAttribute, $delta)){

            //         $product = new Product($idProduct);

            //         if($log)
            //             $log->insertLog('El stock en stock_available bajó a la cantidad '.$delta.', que es la resta del stock por fecha '.$byDateStock.' y el general '.$generalStock.'. Se restó para el id_product '.$idProduct.' de nombre '.$product->name[1].' y atributo '.$idProductAttribute, false);
    
            // }

            return true;

        //PREFIERO UN LOG PARTICULAR, PARA TENERLO CONTROLADITO   
        } catch (Exception $e) {
            Logger::AddLog($e->getMessage());

            return false;
        }
    }

}
