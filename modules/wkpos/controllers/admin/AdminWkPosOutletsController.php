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
class AdminWkPosOutletsController extends ModuleAdminController
{
    public function __construct()
    {
        $this->bootstrap = true;
        $this->lang = false;
        $this->bootstrap = true;
        $this->lang = false;

        $this->context = Context::getContext();

        parent::__construct();
        $this->toolbar_title = $this->l('Outlets');
        $this->_conf[40] = $this->l('All products are successfully assigned');
        $this->outletList();
    }

    /**
     * Get outlet list
     *
     * @return void
     */
    protected function outletList()
    {
        $this->table = 'wkpos_outlets';
        $this->className = 'WkPosOutlets';
        $this->identifier = 'id_wkpos_outlet';
        $this->_select = 'ad.`alias`, ad.`postcode`, cl.`name` as country';
        $this->_join .= ' LEFT JOIN `' . _DB_PREFIX_ . 'address` ad
            ON (ad.`id_address` = a.`id_address`)';
        $this->_join .= ' LEFT JOIN `' . _DB_PREFIX_ . 'country_lang` cl
            ON (cl.`id_country` = ad.`id_country`
            AND cl.`id_lang` = ' . (int) $this->context->language->id . ')';
        // Shop filter
        $idShop = $this->context->shop->id;
        if (Shop::getContext() == Shop::CONTEXT_SHOP) {
            $this->_where .= ' AND a.`id_shop` = ' . (int) $idShop;
        }
        if (Shop::getContext() == Shop::CONTEXT_GROUP) {
            $idShops = Shop::getContextListShopID();
            $this->_where .= ' AND a.`id_shop` IN (' . implode(',', $idShops) . ')';
        }
        // Shop filter
        $this->_orderBy = $this->identifier;
        $this->fields_list = [
            'id_wkpos_outlet' => [
                'title' => $this->l('ID'),
                'align' => 'center',
            ],
            'name' => [
                'title' => $this->l('Outlet name'),
                'align' => 'center',
                'havingFilter' => true,
            ],
            // 'alias' => array(
            //     'title' => $this->l('Alias Name'),
            //     'align' => 'center',
            //     'havingFilter' => true
            // ),
            'postcode' => [
                'title' => $this->l('Post code'),
                'align' => 'center',
                'havingFilter' => true,
            ],
            'country' => [
                'title' => $this->l('Country'),
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
        if (Shop::isFeatureActive()) {
            $contextShops = Shop::getShops(true);
            $this->fields_list['id_shop'] = [
                'title' => $this->l('Shop'),
                'type' => 'select',
                'list' => array_combine(array_column($contextShops, 'id_shop'), array_column($contextShops, 'name')),
                'filter_key' => 'a!id_shop',
                'callback' => 'getShopName',
            ];
        }
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

    public function getShopName($idShop)
    {
        $shop = Shop::getShop($idShop);
        if (!empty($shop)) {
            return $shop['name'];
        }

        return $idShop;
    }

    /**
     * Add the Add outlet, edit, assign product button in page header toolbar button
     *
     * @return void
     */
    public function initPageHeaderToolbar()
    {
        if (empty($this->display)) {
            $this->page_header_toolbar_btn['Add outlet'] = [
                'href' => self::$currentIndex . '&addwkpos_outlets&token=' . $this->token,
                'desc' => $this->l('Add outlet'),
                'icon' => 'process-icon-new',
            ];
        } elseif ($this->display == 'edit' && Tools::getValue('id_wkpos_outlet') != '') {
            $this->page_header_toolbar_btn['Assign all product'] = [
                'href' => self::$currentIndex . '&id_wkpos_outlet=' . (int) Tools::getValue('id_wkpos_outlet') .
                '&updatewkpos_outlets&assign_all_product=1&token=' . $this->token,
                'desc' => $this->l('Assign all product'),
                'icon' => 'process-icon-new',
            ];
            $this->page_header_toolbar_btn['Assign product'] = [
                'href' => self::$currentIndex . '&id_wkpos_outlet=' . (int) Tools::getValue('id_wkpos_outlet') .
                '&viewwkpos_outlets&assign_product=1&token=' . $this->token,
                'desc' => $this->l('Assign product'),
                'icon' => 'process-icon-new',
            ];
        }
        parent::initPageHeaderToolbar();
    }

    /**
     * Create edit, view and delete option in renderList of account.
     *
     * @return html
     */
    public function renderList()
    {
        $this->addRowAction('edit');

        return parent::renderList();
    }

    /**
     * Get Address formats used by the country where the address id retrieved from POST/GET is.
     *
     * @return array address formats
     */
    protected function processAddressFormat()
    {
        $tmpAddr = new Address((int) Tools::getValue('id_address'));

        $selectedCountry = ($tmpAddr && $tmpAddr->id_country)
            ? $tmpAddr->id_country
            : (int) Configuration::get('PS_COUNTRY_DEFAULT');

        $invAdrFields = AddressFormat::getOrderedAddressFields($selectedCountry, false, true);
        $dlvAdrFields = AddressFormat::getOrderedAddressFields($selectedCountry, false, true);

        $invAllFields = [];
        $dlvAllFields = [];

        $out = [];

        foreach ($invAdrFields as $fields_line) {
            foreach (explode(' ', $fields_line) as $field_item) {
                $invAllFields[] = trim($field_item);
            }
        }

        $out['inv_adr_fields'] = $invAdrFields;
        $out['inv_all_fields'] = $invAllFields;

        foreach ($dlvAdrFields as $fields_line) {
            foreach (explode(' ', $fields_line) as $field_item) {
                $dlvAllFields[] = trim($field_item);
            }
        }

        $out['dlv_adr_fields'] = $dlvAdrFields;
        $out['dlv_all_fields'] = $dlvAllFields;

        return $out;
    }

    /**
     * Add Oultet form
     *
     * @return void
     */
    public function renderForm()
    {
        if (($this->display == 'edit' || $this->display == 'add')
        && (Shop::getContext() == 4 || Shop::getContext() == 2)) {
            return $this->context->smarty->fetch(
                _PS_MODULE_DIR_ . $this->module->name . '/views/templates/admin/shop_warning.tpl'
            );
        }

        if (!($obj = $this->loadObject(true))) {
            return;
        }

        if (Tools::getValue('id_wkpos_outlet_product')) {
            return $this->editProductRenderForm();
        } else {
            if (empty($obj->id)) {
                $title = $this->l('Add outlet');
            } else {
                $title = $this->l('Edit outlet');
                if ($obj->id_shop != $this->context->shop->id) {
                    Tools::redirectAdmin(self::$currentIndex . '&token=' . $this->token);
                }
            }
            unset($this->fields_list, $this->_select, $this->_join, $this->_filterHaving);
            $currencies = Currency::getCurrencies(true, true, true);
            if ($idOutlet = Tools::getValue('id_wkpos_outlet')) {
                $objOutlet = new WkPosOutlets($idOutlet);
                $address = new Address($objOutlet->id_address);
            }
            $this->show_form_cancel_button = false;
            $this->fields_form = [
                'legend' => [
                    'title' => $title,
                ],
                'input' => [
                    [
                        'type' => 'text',
                        'label' => $this->l('Outlet name'),
                        'name' => 'name',
                        // 'hint' => $this->l('Enter outlet name'),
                        'required' => true,
                    ],
                    [
                        'type' => 'text',
                        'label' => $this->l('Identification number'),
                        'name' => 'dni',
                        'required' => false,
                        'col' => '4',
                        'hint' => $this->l('The national ID card number of this person, or a unique tax identification number.'),
                    ],
                    [
                        'type' => 'hidden',
                        'name' => 'address_type',
                    ],
                    [
                        'type' => 'hidden',
                        'name' => 'back',
                    ],
                ],
                'submit' => [
                    'title' => $this->l('Save'),
                ],
                'buttons' => [
                    'save-and-stay' => [
                        'title' => $this->l('Save and Stay'),
                        'name' => 'submitAdd' . $this->table . 'AndStay',
                        'type' => 'submit',
                        'class' => 'btn btn-default pull-right',
                        'icon' => 'process-icon-save',
                    ],
                    'cancel' => [
                        'title' => $this->l('Cancel'),
                        'href' => $this->context->link->getAdminLink('AdminWkPosOutlets'),
                        'class' => 'btn btn-default',
                        'icon' => 'process-icon-cancel',
                    ],
                ],
            ];

            // Order address fields depending on country format
            $addresses_fields = $this->processAddressFormat();
            // we use  delivery address
            $addresses_fields = $addresses_fields['dlv_all_fields'];

            // get required field
            $required_fields = AddressFormat::getFieldsRequired();

            // Merge with field required
            $addresses_fields = array_unique(array_merge($addresses_fields, $required_fields));

            $temp_fields = [];

            foreach ($addresses_fields as $addr_field_item) {
                if ($addr_field_item == 'address1') {
                    $temp_fields[] = [
                        'type' => 'text',
                        'label' => $this->l('Address'),
                        'name' => 'address1',
                        'col' => '6',
                        'required' => true,
                    ];
                } elseif ($addr_field_item == 'address2') {
                    $temp_fields[] = [
                        'type' => 'text',
                        'label' => $this->l('Address') . ' (2)',
                        'name' => 'address2',
                        'col' => '6',
                        'required' => in_array('address2', $required_fields),
                    ];
                } elseif ($addr_field_item == 'postcode') {
                    $temp_fields[] = [
                        'type' => 'text',
                        'label' => $this->l('Zip/postal code'),
                        'name' => 'postcode',
                        'col' => '2',
                        'required' => true,
                    ];
                } elseif ($addr_field_item == 'city') {
                    $temp_fields[] = [
                        'type' => 'text',
                        'label' => $this->l('City'),
                        'name' => 'city',
                        'col' => '4',
                        'required' => true,
                    ];
                } elseif ($addr_field_item == 'country' || $addr_field_item == 'Country:name') {
                    $temp_fields[] = [
                        'type' => 'select',
                        'label' => $this->l('Country'),
                        'name' => 'id_country',
                        'required' => (in_array('Country:name', $required_fields)
                            || in_array('country', $required_fields)
                        ),
                        'col' => '4',
                        'default_value' => (int) $this->context->country->id,
                        'options' => [
                            'query' => Country::getCountries($this->context->language->id, true),
                            'id' => 'id_country',
                            'name' => 'name',
                        ],
                    ];
                    $temp_fields[] = [
                        'type' => 'select',
                        'label' => $this->l('State'),
                        'name' => 'id_state',
                        'required' => true,
                        'col' => '4',
                        'options' => [
                            'query' => [],
                            'id' => 'id_state',
                            'name' => 'name',
                        ],
                    ];
                } elseif ($addr_field_item == 'phone') {
                    $temp_fields[] = [
                        'type' => 'text',
                        'label' => $this->l('Home phone'),
                        'name' => 'phone',
                        'required' => in_array('phone', $required_fields),
                        'col' => '4',
                    ];
                } elseif ($addr_field_item == 'phone_mobile') {
                    $temp_fields[] = [
                        'type' => 'text',
                        'label' => $this->l('Mobile phone'),
                        'name' => 'phone_mobile',
                        'required' => in_array('phone_mobile', $required_fields),
                        'col' => '4',
                    ];
                }
            }
            $temp_fields[] = [
                'type' => 'switch',
                'label' => $this->l('Active outlet'),
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
            ];

            $temp_fields[] = [
                'type' => 'select',
                'label' => $this->l('Allowed currencies'),
                'name' => 'allowed_currencies',
                'required' => 'true',
                'col' => '4',
                'multiple' => true,
                'class' => 'chosen',
                'options' => [
                    'query' => $currencies,
                    'id' => 'id',
                    'name' => 'name',
                ],
            ];

            $temp_fields[] = [
                'type' => 'select',
                'label' => $this->l('Outlet default currency'),
                'name' => 'default_currency',
                'required' => 'true',
                'col' => '4',
                'options' => [
                    'query' => $currencies,
                    'id' => 'id',
                    'name' => 'name',
                ],
            ];

            $languages = Language::getLanguages(true);
            $temp_fields[] = [
                'type' => 'select',
                'label' => $this->l('Allowed languages'),
                'name' => 'allowed_languages',
                'required' => 'true',
                'col' => '4',
                'multiple' => true,
                'class' => 'chosen',
                'options' => [
                    'query' => $languages,
                    'id' => 'id_lang',
                    'name' => 'name',
                ],
            ];

            $temp_fields[] = [
                'type' => 'select',
                'label' => $this->l('Outlet default language'),
                'name' => 'default_language',
                'required' => 'true',
                'col' => '4',
                'options' => [
                    'query' => $languages,
                    'id' => 'id_lang',
                    'name' => 'name',
                ],
            ];

            if (isset($address)) {
                $this->fields_value = [
                    'address1' => empty(Tools::getValue('address1')) ?
                        $address->address1 :
                        Tools::getValue('address1'),
                    'address2' => empty(Tools::getValue('address2')) ?
                        $address->address2 :
                        Tools::getValue('address2'),
                    'postcode' => empty(Tools::getValue('postcode')) ?
                        $address->postcode :
                        Tools::getValue('postcode'),
                    'city' => empty(Tools::getValue('city')) ?
                        $address->city :
                        Tools::getValue('city'),
                    'id_country' => empty(Tools::getValue('id_country')) ?
                        $address->id_country :
                        Tools::getValue('id_country'),
                    'id_state' => empty(Tools::getValue('id_state')) ?
                        $address->id_state :
                        Tools::getValue('id_state'),
                    'dni' => empty(Tools::getValue('dni')) ?
                        $address->dni :
                        Tools::getValue('dni'),
                    'phone' => empty(Tools::getValue('phone')) ?
                        $address->phone :
                        Tools::getValue('phone'),
                    'phone_mobile' => empty(Tools::getValue('phone_mobile')) ?
                        $address->phone_mobile : Tools::getValue('phone_mobile'),
                    'address_type' => (int) Tools::getValue('address_type', 1),
                ];
            }
            $allowedCurrencies = Tools::getValue(
                'allowed_currencies'
            );
            if (!$allowedCurrencies) {
                if (Validate::isLoadedObject($this->object)) {
                    $allowedCurrencies = json_decode($this->object->allowed_currencies);
                } else {
                    $allowedCurrencies = [Configuration::get('PS_CURRENCY_DEFAULT')];
                    $this->fields_value['default_currency'] = Configuration::get('PS_CURRENCY_DEFAULT');
                }
            }
            $this->fields_value['allowed_currencies[]'] = $allowedCurrencies;

            $allowedLanguages = Tools::getValue(
                'allowed_languages'
            );
            if (!$allowedLanguages) {
                if (Validate::isLoadedObject($this->object)) {
                    $allowedLanguages = json_decode($this->object->allowed_languages);
                } else {
                    $allowedLanguages = [Configuration::get('PS_LANG_DEFAULT')];
                    $this->fields_value['default_language'] = Configuration::get('PS_LANG_DEFAULT');
                }
            }
            $this->fields_value['allowed_languages[]'] = $allowedLanguages;

            array_splice($this->fields_form['input'], 3, 0, $temp_fields);

            if ($this->display == 'add') {
                $this->fields_value['active'] = 1;
            }

            $form = parent::renderForm();

            if ($idOutlet) {
                $this->manageProduct();
                $form .= parent::renderList();
            }

            return $form;

            // if ($idOutlet) {
            //     $this->context->smarty->assign(
            //         array(
            //             'outletForm' => parent::renderForm()
            //         )
            //     );
            //     $form = '<div class="row"><div class="col-lg-8">';
            // } else {
            //     return parent::renderForm();
            // }
            // if ($idOutlet) {
            //     $form .= '</div><div class="col-lg-4"><div class="panel"><div class="panel-heading">';
            //     $form .= $this->l('Outlet Category');
            //     $form .= '</div></div>';
            // }

            // if ($idOutlet) {
            //     $tree = new HelperTreeCategories('wkpos_category_tree');
            //     $tree->setAttribute('is_category_filter', (bool)'1')
            //         ->setInputName('category_tree')
            //         ->setUseSearch(true)
            //         ->setUseCheckBox(true);

            //     $selectedCatgories = WkPosOutletCategory::getOutletCatgoryId($idOutlet);
            //     if ($selectedCatgories) {
            //         $selectedCatgories = json_decode($selectedCatgories['id_category']);
            //         $tree->setSelectedCategories($selectedCatgories);
            //     }
            //     $this->manageProduct();
            //     $form .= parent::renderList();
            //     $outletFormSubmitURl = self::$currentIndex.'&id_wkpos_outlet='.$idOutlet;
            //     $outletFormSubmitURl .= '&updatewkpos_outlets&token='.Tools::getValue('token');
            //     $this->context->smarty->assign(
            //         array(
            //             'outletProductList' => parent::renderList(),
            //             'outletCategoryTree' => $tree->render(),
            //             'outletFormSubmit' => $outletFormSubmitURl
            //         )
            //     );
            // }
            // return $this->context->smarty->fetch(_PS_MODULE_DIR_.'wkpos/views/templates/admin/wkpos_category.tpl');
        }
    }

    /**
     * Display the form form assign the oultet product
     *
     * @return void
     */
    public function renderView()
    {
        $idWkPosOutlet = Tools::getValue('id_wkpos_outlet');
        if ($idWkPosOutlet) {
            $objPosOutletProduct = new WkPosOutletProduct();
            $posOutletProduct = $objPosOutletProduct->getAllOutletProduct($idWkPosOutlet);
            if (!empty($posOutletProduct)) {
                $psProducts = $objPosOutletProduct->getAllPsProduct(
                    implode(',', array_column($posOutletProduct, 'id_product'))
                );
            } else {
                $psProducts = $objPosOutletProduct->getAllPsProduct();
            }
            foreach ($psProducts as $key => $product) {
                $psProducts[$key]['name'] = Product::getProductName($product['id_product']);
            }
            if ($psProducts) {
                $this->context->smarty->assign(
                    [
                        'psProducts' => $psProducts,
                    ]
                );
                $this->context->smarty->assign(
                    [
                        'cancelUrl' => $this->context->link->getAdminLink(
                            'AdminWkPosOutlets'
                        ) . '&id_wkpos_outlet=' . (int) $idWkPosOutlet . '&updatewkpos_outlets',
                    ]
                );

                return parent::renderView();
            } else {
                $this->warnings[] = $this->l('All Products are already assigned');
            }
        }
    }

    /**
     * Form for updating the quantity of a product
     *
     * @return void
     */
    public function editProductRenderForm()
    {
        $this->table = 'wkpos_outlet_product';
        $this->identifier = 'id_wkpos_outlet_product';

        $this->tpl_folder = 'outlet_product_quantity/';
        $this->fields_form = [
            'submit' => [
                'title' => $this->l('Save'),
                'name' => 'updateOutletAttributeQuantity',
            ],
        ];

        // If update
        $idWkPosOutletProduct = Tools::getValue('id_wkpos_outlet_product');
        if ($idWkPosOutletProduct) {
            $objWkPosOutletProduct = new WkPosOutletProduct($idWkPosOutletProduct);
            if ($objWkPosOutletProduct->id == $idWkPosOutletProduct) {
                $displaySyncButton = 0;
                $objProduct = new Product($objWkPosOutletProduct->id_product);
                $productQuantity = $objWkPosOutletProduct->getProductQuantity(
                    $objWkPosOutletProduct->id_product,
                    Tools::getValue('id_wkpos_outlet')
                );

                $objPosOutletProduct = new WkPosOutletProductAttribute($objWkPosOutletProduct->id_product);

                $attributes = $objPosOutletProduct->getAttributesResume(
                    $idWkPosOutletProduct,
                    $this->context->language->id
                );
                if (empty($attributes)) {
                    $attributes[] = [
                        'id_product_attribute' => 0,
                        'attribute_designation' => '',
                        'default_on' => '1',
                    ];
                }
                // Get available quantities
                $availableQuantity = [];
                $productDesignation = [];
                $remainingQuantity = [];
                foreach ($attributes as $attribute) {
                    // Get available quantity for the current product attribute in the current shop
                    $totalOutletQuantity = 0;
                    $psQuantity = 0;
                    if ($attribute['id_product_attribute']) {
                        $psQuantity = (int) StockAvailable::getQuantityAvailableByProduct(
                            $objWkPosOutletProduct->id_product,
                            $attribute['id_product_attribute']
                        );
                        $totalOutletQuantity = WkPosOutletProductAttribute::getProductCombinationDetail(
                            $attribute['id_product_attribute'],
                            $objWkPosOutletProduct->id_wkpos_outlet,
                            false,
                            1
                        );
                    } else {
                        $psQuantity = (int) StockAvailable::getQuantityAvailableByProduct(
                            $objWkPosOutletProduct->id_product
                        );
                        $totalOutletQuantity = $objWkPosOutletProduct->getProductQuantityExceptCurrentOutlet(
                            $objWkPosOutletProduct->id_product,
                            $objWkPosOutletProduct->id_wkpos_outlet
                        );
                    }
                    $availableQuantity[$attribute['id_product_attribute']] = (
                        (isset($attribute['id_product_attribute']) && $attribute['id_product_attribute']) ?
                        (int) $attribute['quantity'] : (int) $productQuantity);

                    $quantityLeft = (int) $psQuantity - (int) $totalOutletQuantity;
                    $remainingQuantity[$attribute['id_product_attribute']] = ($quantityLeft < 0) ? 0 : $quantityLeft;
                    // Get all product designation
                    $productDesignation[$attribute['id_product_attribute']] = rtrim(
                        $objProduct->name[$this->context->language->id] . ' - ' . $attribute['attribute_designation'],
                        ' - '
                    );
                }
                $this->context->smarty->assign(
                    [
                        'attributes' => $attributes,
                        'availableQuantity' => $availableQuantity,
                        'remainingQuantity' => $remainingQuantity,
                        'productDesignation' => $productDesignation,
                        'productName' => Product::getProductName($objWkPosOutletProduct->id_product),
                        'hasCombination' => $objProduct->hasCombinations(),
                        'id_wkpos_outlet_product' => Tools::getValue('id_wkpos_outlet_product'),
                        'cancelUrl' => self::$currentIndex . '&id_wkpos_outlet=' . Tools::getValue('id_wkpos_outlet') .
                        '&updatewkpos_outlets&token=' . Tools::getValue('token'),
                        'outOfStockAllowOrder' => StockAvailable::outOfStock($objWkPosOutletProduct->id_product),
                        'displaySyncButton' => $displaySyncButton,
                        'action' => self::$currentIndex . '&id_wkpos_outlet=' . Tools::getValue('id_wkpos_outlet') .
                        '&updatewkpos_outlets&token=' . Tools::getValue('token'),
                    ]
                );

                return parent::renderForm();
            } else {
                $this->warnings[] = $this->l('No product found.');
            }
        }
    }

    /**
     * Display the outlet product list
     *
     * @return void
     */
    protected function manageProduct()
    {
        unset($this->toolbar_btn['save']);
        unset($this->toolbar_btn['cancel']);
        $this->toolbar_btn['back'] = [
            'href' => $this->context->link->getAdminLink('AdminWkPosOutlets'),
            'desc' => 'Back to list',
        ];
        $this->list_id = 'id_wkpos_outlet_product';

        $this->table = 'wkpos_outlet_product';
        $this->className = 'WkPosOutletProduct';
        $this->identifier = 'id_wkpos_outlet_product';
        $this->_select = ' image_shop.`id_image` AS id_image , pl.`link_rewrite`, pl.`name`,
            p.`cache_default_attribute`, pl.`id_shop`, p.`price`, p.`active` as prestashop_active';
        $this->_join = 'LEFT JOIN `' . _DB_PREFIX_ . 'product` p
            ' . Shop::addSqlAssociation('product', 'p') . ' ON (p.`id_product` = a.`id_product`)';
        $this->_join .= ' LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` pl
            ON (pl.`id_product` = p.`id_product` AND pl.`id_lang` =
            ' . (int) $this->context->language->id . Shop::addSqlRestrictionOnLang('pl') . ')';

        $this->_join .= ' LEFT JOIN `' . _DB_PREFIX_ . 'image_shop` image_shop
            ON (image_shop.`id_product` = p.`id_product` AND image_shop.cover=1
            AND image_shop.id_shop=' . (int) $this->context->shop->id . ')';
        $this->_join .= ' LEFT JOIN `' . _DB_PREFIX_ . 'image_lang` il
            ON (image_shop.`id_image` = il.`id_image` AND
            il.`id_lang` = ' . (int) $this->context->language->id . ')';

        $this->_where = ' AND a.`id_wkpos_outlet` = ' . (int) Tools::getValue('id_wkpos_outlet');
        $this->_group = 'GROUP BY a.`id_product`';

        $idOrderBy = Tools::getValue('id_wkpos_outlet_productOrderby');
        $idOrderWay = Tools::getValue('id_wkpos_outlet_productOrderway');
        $this->_orderBy = $idOrderBy ? $idOrderBy : $this->identifier;
        $this->_orderWay = $idOrderWay ? $idOrderWay : 'ASC';

        $this->toolbar_title = $this->l('Outlet products');

        $this->fields_list = [
            'id_wkpos_outlet_product' => [
                'title' => $this->l('ID'),
                'class' => 'fixed-width-xs',
                'align' => 'center',
                'havingFilter' => true,
            ],
            'id_product' => [
                'title' => $this->l('Product ID'),
                'class' => 'fixed-width-xs',
                'align' => 'center',
                'havingFilter' => true,
            ],
            'image' => [
                'title' => 'Image',
                'align' => 'center',
                'image' => 'p',
                'orderby' => false,
                'filter' => false,
                'search' => false,
            ],
            'name' => [
                'title' => $this->l('Name'),
                'align' => 'center',
                'havingFilter' => true,
            ],
            'price' => [
                'title' => $this->l('Price'),
                'havingFilter' => true,
                'type' => 'price',
                'align' => 'center',
            ],
            'prestashop_active' => [
                'title' => $this->l('Status'),
                'havingFilter' => true,
                'align' => 'center',
                'type' => 'bool',
                'activeVisu' => 'status',
            ],
            'active' => [
                'title' => $this->l('POS status'),
                'type' => 'bool',
                'havingFilter' => true,
                'align' => 'center',
                'active' => 'status',
            ],
            'quantity' => [
                'title' => $this->l('Quantity'),
                'havingFilter' => true,
                'align' => 'center',
            ],
        ];

        self::$currentIndex = self::$currentIndex . '&id_wkpos_outlet='
        . Tools::getValue('id_wkpos_outlet') . '&updatewkpos_outlets';
        $this->context->smarty->assign(
            [
                'current' => self::$currentIndex,
            ]
        );
        if (Tools::isSubmit('submitFilter')) {
            $this->processFilter();
        }

        if (Tools::isSubmit('submitResetid_wkpos_outlet_product')) {
            $this->processResetFilters();
        }

        $this->bulk_actions = [
            'delete' => [
                'text' => $this->l('Delete selected'),
                'icon' => 'icon-trash',
                'confirm' => $this->l('Delete selected items?'),
            ],
        ];

        $this->addRowAction('edit');
        $this->addRowAction('view');
        $this->addRowAction('delete');
    }

    /**
     * Save the details of an outlet
     *
     * @return void
     */
    public function processSave()
    {
        if (Tools::isSubmit('submitAddwkpos_outletsAndStay')
            || Tools::isSubmit('submitAddwkpos_outlets')
        ) {
            $idShopGroup = $this->context->shop->id_shop_group;
            $outletName = trim(Tools::getValue('name'));
            $idOutlet = trim(Tools::getValue('id_wkpos_outlet'));
            $idCountry = (int) Tools::getValue('id_country');
            $idState = (int) Tools::getValue('id_state');
            $postCode = trim(Tools::getValue('postcode'));
            $address1 = trim(Tools::getValue('address1'));
            $address2 = trim(Tools::getValue('address2'));
            $dni = trim(Tools::getValue('dni'));
            $phone = trim(Tools::getValue('phone'));
            $phoneMobile = trim(Tools::getValue('phone_mobile'));
            $city = trim(Tools::getValue('city'));
            $active = (int) Tools::getValue('active');
            $token = trim(Tools::getValue('token'));
            $objWkPosOutlet = new WkPosOutlets();
            if (empty($outletName)) {
                $this->errors[] = $this->l('Please enter outlet name.');
            } elseif (count($objWkPosOutlet->getOutletByNameId(Tools::strtolower($outletName), $idOutlet)) > 0) {
                $this->errors[] = $this->l('Outlet with the same name already exists.');
            } elseif (!Validate::isGenericName($outletName)) {
                $this->errors[] = $this->l('Please enter valid outlet name.');
            } elseif (Tools::strlen($outletName) >= 32) {
                $this->errors[] = $this->l('Outlet name length must be between 0 and 32.');
            }
            $allowedCurrencies = Tools::getValue('allowed_currencies');
            $defaultCurrency = Tools::getValue('default_currency');
            if (empty($allowedCurrencies)) {
                $this->errors[] = $this->l('Please fill allowed currencies.');
            } elseif (!in_array($defaultCurrency, $allowedCurrencies)) {
                $this->errors[] = $this->l('Selected default currency is not in allowed currency');
            }

            $allowedLanguages = Tools::getValue('allowed_languages');
            $defaultLanguage = Tools::getValue('default_language');
            if (empty($allowedLanguages)) {
                $this->errors[] = $this->l('Please choose allowed languages.');
            } elseif (!in_array($defaultLanguage, $allowedLanguages)) {
                $this->errors[] = $this->l('Selected default language is not in allowed languages.');
            }

            $this->validateAddress();

            if (empty($this->errors)) {
                if ($idOutlet) {
                    $objOutlet = new WkPosOutlets($idOutlet);
                } else {
                    $objOutlet = new WkPosOutlets();
                }
                if (empty($objOutlet->id_address)) {
                    $address = new Address();
                } else {
                    $address = new Address($objOutlet->id_address);
                }
                $address->id_customer = (int) 999999999;
                $address->company = $outletName;
                $address->lastname = 'POS outlet';
                $address->firstname = 'Address';
                $address->alias = $outletName;
                $address->id_country = $idCountry;
                $address->id_state = $idState;
                $address->postcode = $postCode;
                $address->address1 = $address1;
                $address->address2 = $address2;
                $address->dni = $dni;
                $address->phone = $phone;
                $address->phone_mobile = $phoneMobile;
                $address->city = $city;
                $address->save();
                $objOutlet->name = $outletName;
                $objOutlet->id_address = $address->id;
                $objOutlet->default_currency = $defaultCurrency;
                $objOutlet->allowed_currencies = json_encode($allowedCurrencies);
                $objOutlet->default_language = $defaultLanguage;
                $objOutlet->allowed_languages = json_encode($allowedLanguages);
                $objOutlet->active = $active;

                if ($this->context->cookie->shopContext != 'g-' . $idShopGroup
                && $this->context->cookie->shopContext != '') {
                    $objOutlet->id_shop = $this->context->shop->id;
                } else {
                    $objOutlet->id_shop = $this->context->shop->id;
                }

                $objOutlet->save();
                if ($objOutlet->id) {
                    if (Tools::isSubmit('submitAddwkpos_outletsAndStay')) {
                        Tools::redirectAdmin(
                            self::$currentIndex . '&id_wkpos_outlet=' . $objOutlet->id
                            . '&updatewkpos_outlets&conf=4&token=' . $token
                        );
                    }
                    if (Tools::isSubmit('submitAddwkpos_outlets')) {
                        Tools::redirectAdmin(
                            self::$currentIndex
                            . '&conf=4&token=' . $token
                        );
                    }
                }
            } else {
                if ($idOutlet) {
                    $this->display = 'edit';
                } else {
                    $this->display = 'add';
                }

                return $this->errors;
            }

            if (empty($this->errors)) {
            } else {
                if ($idOutlet) {
                    $this->display = 'edit';
                } else {
                    $this->display = 'add';
                }

                return $this->errors;
            }
        }
    }

    /**
     * Validate the address of an outlet
     *
     * @return void
     */
    public function validateAddress()
    {
        $idState = (int) Tools::getValue('id_state');
        $idCountry = (int) Tools::getValue('id_country');
        $postcode = trim(Tools::getValue('postcode'));
        $dni = trim(Tools::getValue('dni'));
        $phone = trim(Tools::getValue('phone'));
        $phoneMobile = trim(Tools::getValue('phone_mobile'));
        $address1 = trim(Tools::getValue('address1'));
        $city = trim(Tools::getValue('city'));

        if (!Validate::isDniLite($dni)) {
            $this->errors[] = $this->l('The identification number field is invalid');
        } elseif (!Validate::isGenericName($dni)) {
            $this->errors[] = $this->l('Please enter valid identification number.');
        } elseif (Country::isNeedDniByCountryId($idCountry) && !$dni) {
            $this->errors[] = $this->l('The identification number is incorrect or has already been used.');
        }
        if (empty($address1)) {
            $this->errors[] = $this->l('Please enter address.');
        } elseif (!Validate::isGenericName($address1)) {
            $this->errors[] = $this->l('Please enter valid address.');
        }

        if (!empty(trim(Tools::getValue('address2'))) && !Validate::isGenericName(trim(Tools::getValue('address2')))) {
            $this->errors[] = $this->l('Please enter valid address (2).');
        }
        if (empty($city)) {
            $this->errors[] = $this->l('Please enter city.');
        } elseif (!Validate::isGenericName($city)) {
            $this->errors[] = $this->l('Please enter valid city.');
        }
        if (empty($idCountry)) {
            $this->errors[] = $this->l('Please enter country.');
        }
        /* If the selected country does not contain states */
        $country = new Country((int) $idCountry);
        if ($country && !(int) $country->contains_states && $idState) {
            $this->errors[] = $this->l('You have selected a state for a country that does not contain states.');
        }
        /* If the selected country contains states, then a state have to be selected */
        if ((int) $country->contains_states && !$idState) {
            $this->errors[] = $this->l('An address located in a country containing states must have a state selected.');
        }
        /* Check zip code format */
        if ($country->zip_code_format && !$country->checkZipCode($postcode)) {
            $this->errors[] = $this->l('Your zip/postal code is incorrect. It must be entered as follows:') .
            ' ' . str_replace(
                'C',
                $country->iso_code,
                str_replace('N', '0', str_replace('L', 'A', $country->zip_code_format))
            );
        } elseif (empty($postcode) && $country->need_zip_code) {
            $this->errors[] = $this->l('Please eneter a zip/postal code.');
        } elseif ($postcode && !Validate::isPostCode($postcode)) {
            $this->errors[] = $this->l('Please enter valid zip/postal code.');
        }

        if (!Validate::isPhoneNumber($phone)) {
            $this->errors[] = $this->l('Please enter valid phone number.');
        }
        if (!Validate::isPhoneNumber($phoneMobile)) {
            $this->errors[] = $this->l('Please enter valid mobile number.');
        }
        $address = new Address();
        $this->errors = array_merge($this->errors, $address->validateFieldsRequiredDatabase());
    }

    /**
     * Bulk status enable of the selected product
     *
     * @return void
     */
    public function outletBulkEnable()
    {
        $idProducts = Tools::getValue('id_wkpos_outlet_productBox');
        if ($idProducts) {
            foreach ($idProducts as $idProduct) {
                $objWkPosOutletProduct = new WkPosOutletProduct($idProduct);
                $objWkPosOutletProduct->active = 1;
                $objWkPosOutletProduct->save();
            }
            Tools::redirectAdmin(
                self::$currentIndex . '&id_wkpos_outlet=' .
                Tools::getValue('id_wkpos_outlet') .
                '&updatewkpos_outlets&conf=5&token=' . Tools::getValue('token')
            );
        } else {
            $this->errors[] = $this->l('You must select at least one element to enable.');
        }
    }

    /**
     * Bulk status disable of the selected product
     *
     * @return void
     */
    public function outletBulkDisable()
    {
        $idProducts = Tools::getValue('id_wkpos_outlet_productBox');
        if ($idProducts) {
            foreach ($idProducts as $idProduct) {
                $objWkPosOutletProduct = new WkPosOutletProduct($idProduct);
                $objWkPosOutletProduct->active = 0;
                $objWkPosOutletProduct->save();
            }
            Tools::redirectAdmin(
                self::$currentIndex . '&id_wkpos_outlet=' .
                Tools::getValue('id_wkpos_outlet') .
                '&updatewkpos_outlets&conf=5&token=' . Tools::getValue('token')
            );
        } else {
            $this->errors[] = $this->l('You must select at least one element to disable.');
        }
    }

    /**
     * Bulk product delete from an outlet
     *
     * @return void
     */
    public function outletBulkDelete()
    {
        $idProducts = Tools::getValue('id_wkpos_outlet_productBox');
        if ($idProducts) {
            foreach ($idProducts as $idProduct) {
                $objWkPosOutletProduct = new WkPosOutletProduct($idProduct);
                $this->deleteOutletCombination($idProduct);
                $objWkPosOutletProduct->delete();
            }
            Tools::redirectAdmin(
                self::$currentIndex . '&id_wkpos_outlet=' .
                Tools::getValue('id_wkpos_outlet') .
                '&updatewkpos_outlets&conf=1&token=' . Tools::getValue('token')
            );
        } else {
            $this->errors[] = $this->l('You must select at least one element to delete.');
        }
    }

    /**
     * delete the outlet Combination of a product
     *
     * @param [type] $idProduct
     *
     * @return void
     */
    public function deleteOutletCombination($idProduct)
    {
        $idProductAttributes = WkPosOutletProductAttribute::getCombinationByIdOutletProduct($idProduct);
        foreach ($idProductAttributes as $idProductAttribute) {
            $objPosProductAttribute = new WkPosOutletProductAttribute(
                $idProductAttribute['id_wkpos_outlet_product_attribute']
            );
            $objPosProductAttribute->delete();
        }
    }

    /**
     * Delete the outlet
     *
     * @return void
     */
    public function outletDelete()
    {
        $idWkPosOutletProduct = (int) Tools::getValue('id_wkpos_outlet_product');
        $objOutletProduct = new WkPosOutletProduct($idWkPosOutletProduct);
        $this->deleteOutletCombination($idWkPosOutletProduct);
        $objOutletProduct->delete();
        Tools::redirectAdmin(
            self::$currentIndex . '&id_wkpos_outlet=' . Tools::getValue('id_wkpos_outlet') .
            '&updatewkpos_outlets&conf=1&token=' . Tools::getValue('token')
        );
    }

    /**
     * update the quantity of a product and product combination
     *
     * @return void
     */
    public function updateQuantity()
    {
        if (Tools::isSubmit('submitUpdateProductQuantity')) {
            $objWkPosOutletProduct = new WkPosOutletProduct(Tools::getValue('id_wkpos_outlet_product'));
            $combinations = WkPosOutletProductAttribute::getProductCombination($objWkPosOutletProduct->id_product);
            if (empty($combinations)) {
                $quantity = Tools::getValue('qty_0');
                if (!Validate::isUnsignedInt($quantity)) {
                    $this->errors[] = $this->l('Invalid Product Quantity');
                } else {
                    $totalQuantity = (int) StockAvailable::getQuantityAvailableByProduct(
                        $objWkPosOutletProduct->id_product
                    );
                    $totalOutletQuantity = $objWkPosOutletProduct->getProductQuantityExceptCurrentOutlet(
                        $objWkPosOutletProduct->id_product,
                        Tools::getValue('id_wkpos_outlet')
                    );
                    $totalOutletQuantity += $quantity;
                    if (($totalQuantity < 0 && $totalOutletQuantity >= $totalQuantity)
                        || ($totalQuantity >= 0 && $totalOutletQuantity <= $totalQuantity)
                    ) {
                        if ($totalQuantity < 0) {
                            $quantity = 0;
                        }
                        $objWkPosOutletProduct->quantity = $quantity;
                        $objWkPosOutletProduct->save();
                    } else {
                        $this->errors[] = $this->l('Insufficient Quantity');

                        return false;
                    }
                }
            } else {
                foreach ($combinations as $combination) {
                    $idProductAttributeQuantity = Tools::getValue('qty_' . $combination['id_product_attribute']);

                    if (!Validate::isUnsignedInt($idProductAttributeQuantity)) {
                        $this->errors[] = $this->l('Invalid quantity');
                    } else {
                        $totalQuantity = (int) StockAvailable::getQuantityAvailableByProduct(
                            $objWkPosOutletProduct->id_product,
                            $combination['id_product_attribute']
                        );
                        $quantity = WkPosOutletProductAttribute::getProductCombinationDetail(
                            $combination['id_product_attribute'],
                            Tools::getValue('id_wkpos_outlet'),
                            false,
                            1
                        );

                        $quantity += $idProductAttributeQuantity;
                        if (!Validate::isUnsignedInt($idProductAttributeQuantity)) {
                            $this->errors[] = $this->l('Invalid Product Quantity');
                        } elseif (($totalQuantity < 0 && $quantity >= $totalQuantity)
                            || ($totalQuantity >= 0 && $quantity <= $totalQuantity)
                        ) {
                            $idOutletProductAttribute = WkPosOutletProductAttribute::getProductCombinationDetail(
                                $combination['id_product_attribute'],
                                Tools::getValue('id_wkpos_outlet'),
                                Tools::getValue('id_wkpos_outlet_product'),
                                2
                            );
                            if ($idOutletProductAttribute) {
                                if ($totalQuantity < 0) {
                                    $idProductAttributeQuantity = 0;
                                }
                                $objPosProductAttribute = new WkPosOutletProductAttribute($idOutletProductAttribute);
                                $objPosProductAttribute->quantity = (int) $idProductAttributeQuantity;
                                $objPosProductAttribute->save();
                            }
                        } else {
                            $this->errors[] = $this->l('Insufficient quantity');

                            return false;
                        }
                    }
                }

                $quantity = WkPosOutletProductAttribute::getProductQuantity(
                    $objWkPosOutletProduct->id_product,
                    Tools::getValue('id_wkpos_outlet')
                );
                $objWkPosOutletProduct->quantity = $quantity;
                $objWkPosOutletProduct->save();
            }
            if (empty($this->errors)) {
                Tools::redirectAdmin(
                    self::$currentIndex . '&id_wkpos_outlet=' .
                    Tools::getValue('id_wkpos_outlet') .
                    '&updatewkpos_outlets&conf=4&token=' . Tools::getValue('token')
                );
            } else {
                return;
            }
        }
    }

    /**
     * Process the data according to the condition
     *
     * @return void
     */
    public function postProcess()
    {
        if (Tools::getIsset('submitBulkenableSelectionwkpos_outlet_product')) {
            $this->outletBulkEnable();
        }
        if (Tools::getIsset('submitBulkdeletewkpos_outlet_product')) {
            $this->outletBulkDelete();
        }
        if (Tools::getIsset('submitBulkdisableSelectionwkpos_outlet_product')) {
            $this->outletBulkDisable();
        }
        if (Tools::getIsset('deletewkpos_outlet_product')) {
            $this->outletDelete();
        }
        if (Tools::isSubmit('submitUpdateProductQuantity')) {
            $this->updateQuantity();
        }
        if (Tools::isSubmit('assignProductwkpos_outlets') || Tools::isSubmit('assignProductAndStaywkpos_outlets')) {
            $selectedProducts = Tools::getvalue('wk_product_list');
            $notEmpty = true;
            if (empty($selectedProducts)) {
                $notEmpty = false;
                $this->errors[] = $this->l('Select at least one product');
            } elseif (count($selectedProducts) == 1) {
                foreach ($selectedProducts as $product) {
                    if ($product == 0) {
                        $notEmpty = false;
                        $this->errors[] = $this->l('Select at least one product');
                    }
                }
            }

            if ($notEmpty) {
                $idWkPosOutlet = Tools::getValue('id_wkpos_outlet');
                if ($idWkPosOutlet) {
                    $objPosOutletProduct = new WkPosOutletProduct();
                    $psProducts = $objPosOutletProduct->getSelectedPsProduct(implode(',', $selectedProducts));

                    if ($psProducts) {
                        $this->assignProduct($psProducts, $idWkPosOutlet);
                    }
                    if (Tools::isSubmit('assignProductwkpos_outlets')) {
                        Tools::redirectAdmin(
                            $this->context->link->getAdminLink(
                                'AdminWkPosOutlets'
                            ) . '&id_wkpos_outlet=' . (int) $idWkPosOutlet . '&updatewkpos_outlets&conf=4'
                        );
                    } else {
                        Tools::redirectAdmin(
                            self::$currentIndex . '&id_wkpos_outlet=' . (int) $idWkPosOutlet .
                            '&viewwkpos_outlets&assign_product=1&token=' . $this->token . '&conf=4'
                        );
                    }
                }
            }
        }
        if (Tools::getIsset('statuswkpos_outlet_product')) {
            $idWkPosOutletProduct = (int) Tools::getValue('id_wkpos_outlet_product');
            $idWkPosOutlet = (int) Tools::getValue('id_wkpos_outlet');
            $token = trim(Tools::getValue('token'));
            if ($idWkPosOutletProduct) {
                $objWkPosOutletProduct = new WkPosOutletProduct($idWkPosOutletProduct);
                $objWkPosOutletProduct->active = !$objWkPosOutletProduct->active;
                $objWkPosOutletProduct->save();
                Tools::redirectAdmin(
                    self::$currentIndex . '&id_wkpos_outlet=' .
                    $idWkPosOutlet .
                    '&updatewkpos_outlets&conf=5&token=' . $token
                );
            }
        }
        if (Tools::getIsset('assign_product')) {
            $this->renderView();
        }
        if (Tools::getIsset('viewwkpos_outlet_product') && Tools::getValue('id_wkpos_outlet_product')) {
            $objOutletProduct = new WkPosOutletProduct((int) Tools::getValue('id_wkpos_outlet_product'));
            Tools::redirectAdmin(
                $this->context->link->getAdminLink(
                    'AdminProducts',
                    true,
                    [
                        'id_product' => (int) $objOutletProduct->id_product,
                        'updateproduct' => '1',
                    ]
                )
            );
        }
        if (Tools::getValue('assign_all_product')) {
            $this->assignAllProduct();
        }

        if (Tools::isSubmit('submitAddwkpos_outletsCategoryAndStay')
            || Tools::isSubmit('submitAddwkpos_outletsCategory')
        ) {
            $categoryTree = Tools::getValue('category_tree');
            $idOutlet = trim(Tools::getValue('id_wkpos_outlet'));
            $outletCategory = WkPosOutletCategory::getOutletCatgoryId($idOutlet);
            if ($outletCategory) {
                $objOutletCategory = new WkPosOutletCategory($outletCategory['id_wkpos_outlet_category']);
            } else {
                $objOutletCategory = new WkPosOutletCategory();
            }
            if ($categoryTree) {
                $objOutletCategory->id_category = json_encode($categoryTree);
            } else {
                $objOutletCategory->id_category = json_encode([0]);
            }
            $objOutletCategory->id_wkpos_outlet = (int) $idOutlet;
            $objOutletCategory->save();
            if (Tools::isSubmit('submitAddwkpos_outletsCategoryAndStay')) {
                Tools::redirectAdmin(
                    $this->context->link->getAdminLink(
                        'AdminWkPosOutlets'
                    ) . '&id_wkpos_outlet=' . (int) $idOutlet . '&updatewkpos_outlets&conf=4'
                );
            } else {
                Tools::redirectAdmin(
                    $this->context->link->getAdminLink(
                        'AdminWkPosOutlets'
                    ) . '&conf=4'
                );
            }
        }

        return parent::postProcess();
    }

    /**
     * Add JS in the controller
     *
     * @return void
     */
    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);
        Media::addJsDef(
            [
                'noProductFound' => $this->l('No product found.'),
            ]
        );
        $this->context->controller->addJS(_MODULE_DIR_ . 'wkpos/views/js/wkpos_search_product.js');
    }

    /**
     * Assign all the product to the selected outlet
     *
     * @return void
     */
    public function assignAllProduct()
    {
        $idWkPosOutlet = Tools::getValue('id_wkpos_outlet');
        if ($idWkPosOutlet) {
            $objPosOutletProduct = new WkPosOutletProduct();
            $posOutletProduct = $objPosOutletProduct->getAllOutletProduct($idWkPosOutlet);
            if (!empty($posOutletProduct)) {
                $psProducts = $objPosOutletProduct->getAllPsProduct(
                    implode(',', array_column($posOutletProduct, 'id_product'))
                );
            } else {
                $psProducts = $objPosOutletProduct->getAllPsProduct();
            }
            if ($psProducts) {
                $this->assignProduct($psProducts, Tools::getValue('id_wkpos_outlet'));
                Tools::redirectAdmin(
                    self::$currentIndex . '&id_wkpos_outlet=' . Tools::getValue('id_wkpos_outlet') .
                    '&updatewkpos_outlets&token=' . Tools::getValue('token') . '&conf=40'
                );
            } else {
                $this->warnings[] = $this->l('All products are already assigned.');
            }
        }
    }

    /**
     * Save the outlet product
     *
     * @param [int] $psProducts
     * @param [int] $idWkPosOutlet
     * @param int $idWkPosOutletProduct
     *
     * @return void
     */
    public function assignProduct($psProducts, $idWkPosOutlet, $idWkPosOutletProduct = false)
    {
        $idShopGroup = $this->context->shop->id_shop_group;
        $idShop = Context::getContext()->shop->id;
        foreach ($psProducts as $product) {
            $objWkPosOutletProduct = new WkPosOutletProduct();
            $objWkPosOutletProduct->id_wkpos_outlet = (int) $idWkPosOutlet;
            $objWkPosOutletProduct->id_product = (int) $product['id_product'];
            $objWkPosOutletProduct->active = Configuration::get('WKPOS_OUTLET_PRODUCT_ACTIVE');
            if ($this->context->cookie->shopContext != 'g-' . $idShopGroup
            && $this->context->cookie->shopContext != '') {
                $objWkPosOutletProduct->id_shop = $idShop;
            } else {
                $objWkPosOutletProduct->id_shop = $idShop;
            }
            $totalQuantity = (int) StockAvailable::getQuantityAvailableByProduct(
                $product['id_product'],
                null,
                $idShop
            );
            $quantity = $objWkPosOutletProduct->getProductQuantityByIdProduct($product['id_product']);
            if ($quantity) {
                $totalQuantity -= $quantity;
            }
            if ($totalQuantity < 0) {
                $totalQuantity = 0;
            }
            $objWkPosOutletProduct->quantity = $totalQuantity;
            $objWkPosOutletProduct->save();
            if (Combination::isFeatureActive() && $product['cache_default_attribute']) {
                $combinations = WkPosOutletProductAttribute::getProductCombination($product['id_product']);
                foreach ($combinations as $combination) {
                    $objPosProductAttribute = new WkPosOutletProductAttribute();
                    $objPosProductAttribute->id_wkpos_outlet_product = (int) $objWkPosOutletProduct->id;
                    $objPosProductAttribute->id_product_attribute = (int) $combination['id_product_attribute'];

                    $totalQuantity = (int) StockAvailable::getQuantityAvailableByProduct(
                        $objWkPosOutletProduct->id_product,
                        $combination['id_product_attribute'],
                        $idShop
                    );
                    $quantity = WkPosOutletProductAttribute::getProductCombinationDetail(
                        $combination['id_product_attribute'],
                        $idWkPosOutlet,
                        $idWkPosOutletProduct,
                        1
                    );
                    if ($quantity) {
                        $totalQuantity -= $quantity;
                    }
                    if ($totalQuantity < 0) {
                        $totalQuantity = 0;
                    }

                    $objPosProductAttribute->quantity = (int) $totalQuantity;
                    $objPosProductAttribute->save();
                }
            }
        }
    }
}
