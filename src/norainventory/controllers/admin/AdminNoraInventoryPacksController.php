<?php

require_once _PS_MODULE_DIR_ . 'norainventory/vendor/autoload.php';

use Module\NoraInventory\Models\ProductStepPack;

class AdminNoraInventoryPacksController extends ModuleAdminController
{
    protected $_defaultOrderWay = 'ASC';
    protected $_defaultOrderBy = 'position';
    protected $position_identifier = 'id_product_step_pack';

    public function __construct()
    {
        $this->bootstrap = true;
        $this->multishop_context = Shop::CONTEXT_ALL;

        $this->table = 'product_step_pack';
        $this->className = 'Module\\NoraInventory\\Models\\ProductStepPack';
        $this->lang = true;

        // $this->explicitSelect = true;

        parent::__construct();

        $this->addRowAction('edit');
        $this->addRowAction('delete');

        $types = [
            'product_pack' => $this->module->l('Product pack'),
            'cart_rule' => $this->module->l('Cart rule'),
        ];

        $this->fields_list = [
            'id_product_step_pack' => [
                'title' => $this->module->l('ID'),
                'align' => 'text-center',
                'class' => 'fixed-width-xs',
            ],
            'name' => [
                'title' => $this->module->l('Name'),
                'type' => 'text',
            ],
            'type' => [
                'title' => $this->module->l('Type'),
                'type' => 'select',
                'list' => $types,
                'filter_key' => 'a!type',
            ],
            'price' => [
                'title' => $this->module->l('Price (tax excl.)'),
                'type' => 'price',
                'align' => 'right',
            ],
            'description_short' => [
                'title' => $this->module->l('Descipción corta'),
                'type' => 'text',
            ],
            'active' => [
                'title' => $this->module->l('Enabled'),
                'align' => 'text-center',
                'active' => 'status',
                'type' => 'bool',
                'orderby' => false,
                'filter_key' => 'a!active',
            ],
            'position' => [
                'title' => $this->module->l('Position'),
                'filter_key' => 'a!position',
                'align' => 'center',
                'class' => 'fixed-width-sm',
                'position' => 'position',
            ],
        ];

        $this->bulk_actions = [
            'delete' => [
                'text' => $this->trans('Delete selected', [], 'Admin.Actions'),
                'confirm' => $this->trans('Delete selected items?', [], 'Admin.Notifications.Warning'),
                'icon' => 'icon-trash',
            ],
        ];
    }

    public function renderForm()
    {
        if (!$this->loadObject(true)) {
            return;
        }

        $row = TaxRulesGroup::getTaxRulesGroups();

        $taxRulesGroups = [
            ['id' => 0, 'name' => $this->module->l('No taxes')],
        ];
        foreach ($row as $item) {
            $taxRulesGroups[] = [
                'id' => $item['id_tax_rules_group'],
                'name' => $item['name'],
            ];
        }

        // User groups
        $unidentified = new Group(Configuration::get('PS_UNIDENTIFIED_GROUP'));
        $guest = new Group(Configuration::get('PS_GUEST_GROUP'));
        $default = new Group(Configuration::get('PS_CUSTOMER_GROUP'));

        $unidentified_group_information = $this->trans('%group_name% - All people without a valid customer account.', ['%group_name%' => '<b>' . $unidentified->name[$this->context->language->id] . '</b>'], 'Admin.Catalog.Feature');
        $guest_group_information = $this->trans('%group_name% - Customer who placed an order with the guest checkout.', ['%group_name%' => '<b>' . $guest->name[$this->context->language->id] . '</b>'], 'Admin.Catalog.Feature');
        $default_group_information = $this->trans('%group_name% - All people who have created an account on this site.', ['%group_name%' => '<b>' . $default->name[$this->context->language->id] . '</b>'], 'Admin.Catalog.Feature');

        $this->fields_form = [
            'legend' => [
                'title' => $this->module->l('Pack Settings'),
                'icon' => 'icon-group',
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => $this->module->l('Name'),
                    'name' => 'name',
                    'lang' => true,
                    'required' => true,
                ],
                [
                    'type' => 'switch',
                    'label' => $this->module->l('Active'),
                    'name' => 'active',
                    'values' => [
                        [
                            'id' => 'on',
                            'value' => 1,
                            'label' => $this->module->l('On'),
                        ],
                        [
                            'id' => 'off',
                            'value' => 0,
                            'label' => $this->module->l('Off'),
                        ],
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->module->l('Type'),
                    'name' => 'type',
                    'required' => false,
                    'class' => 't',
                    'options' => [
                        'query' => [
                            ['id' => 'product_pack', 'name' => $this->module->l('Product Pack')],
                            ['id' => 'cart_rule', 'name' => $this->module->l('Cart Rule')],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'text',
                    'label' => $this->module->l('price'),
                    'name' => 'price',
                    'form_group_class' => 'only-for-product-pack',
                    'prefix' => '€',
                    'class' => 'fixed-width-xl',
                    'desc' => $this->module->l('(Tax excl.) Use 0 to preserve the sum of product packs.'),
                ],
                [
                    'type' => 'select',
                    'label' => $this->module->l('Tax Rule Group'),
                    'name' => 'id_tax_rules_group',
                    'form_group_class' => 'only-for-product-pack',
                    'class' => 't',
                    'options' => [
                        'query' => $taxRulesGroups,
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'text',
                    'label' => $this->module->l('Reduction Amount'),
                    'name' => 'reduction_amount',
                    'prefix' => '€',
                    'class' => 'fixed-width-xl',
                    'desc' => $this->module->l('(Tax excl.) Use either an amount or a percentage discount, just one. 0 for no discount.'),
                ],
                [
                    'type' => 'text',
                    'label' => $this->module->l('Reduction Percent'),
                    'name' => 'reduction_percent',
                    'suffix' => '%',
                    'class' => 'fixed-width-xl',
                    'desc' => $this->module->l('Use a percentage discount. Type 5 for a discount of 5%.'),
                ],
                [
                    'type' => 'switch',
                    'label' => $this->module->l('Upselling'),
                    'name' => 'upselling',
                    'desc' => $this->module->l('Use summary categories as upselling. if true display a lateral modal in summary page to include extra products'),
                    'values' => [
                        [
                            'id' => 'on',
                            'value' => 1,
                            'label' => $this->module->l('On'),
                        ],
                        [
                            'id' => 'off',
                            'value' => 0,
                            'label' => $this->module->l('Off'),
                        ],
                    ],
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Short Description'),
                    'name' => 'description_short',
                    'lang' => true,
                    'autoload_rte' => true,
                ],
                [
                    'type' => 'textarea',
                    'label' => $this->l('Description'),
                    'name' => 'description',
                    'lang' => true,
                    'autoload_rte' => true,
                ],
                [
                    'type' => 'group',
                    'label' => $this->trans('Group access', [], 'Admin.Catalog.Feature'),
                    'name' => 'groupBox',
                    'values' => Group::getGroups(Context::getContext()->language->id),
                    'hint' => $this->trans('Mark all of the customer groups which you would like to have access to this category.', [], 'Admin.Catalog.Help'),
                ],
            ],
            'desc' => [
                $this->trans('You now have three default customer groups.', [], 'Admin.Catalog.Help'),
                $unidentified_group_information,
                $guest_group_information,
                $default_group_information,
            ],
            'submit' => [
                'title' => $this->module->l('Save'),
            ],
        ];

        $category_groups_ids = $this->object->getGroups();
        $groups = Group::getGroups($this->context->language->id);
        foreach ($groups as $group) {
            $this->fields_value['groupBox_' . $group['id_group']] = Tools::getValue('groupBox_' . $group['id_group'], (in_array($group['id_group'], $category_groups_ids)));
        }

        return parent::renderForm();
    }

    public function postProcess()
    {
        parent::postProcess();

        if (Tools::isSubmit('submitAdd' . $this->table)) {
            $groups = Tools::getValue('groupBox');
            $this->object->updateGroups($groups);
        }

        if (!Tools::getIsset('submitAdd' . $this->table)) {
            ProductStepPack::cleanPositions();
        }
    }

    public function ajaxProcessUpdatePositions()
    {
        $way = (int) (Tools::getValue('way'));
        $id_object = (int) (Tools::getValue('id'));
        $positions = Tools::getValue($this->table);

        foreach ($positions as $position => $value) {
            $pos = explode('_', $value);

            if (isset($pos[2]) && (int) $pos[2] === $id_object) {
                if ($Object = new $this->className((int) $pos[2])) {
                    if (isset($position) && $Object->updatePosition($way, $position)) {
                        echo 'ok position ' . (int) $position . ' for object ' . (int) $pos[1] . '\r\n';
                    } else {
                        echo '{"hasError" : true, "errors" : "Can not update object ' . (int) $id_object . ' to position ' . (int) $position . ' "}';
                    }
                } else {
                    echo '{"hasError" : true, "errors" : "This object (' . (int) $id_object . ') can t be loaded"}';
                }
                break;
            }
        }
    }

    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);
        if (Tools::getValue('controller') === 'AdminNoraInventoryPacks') {
            $this->addJS($this->module->getPathUri() . 'views/js/admin-pack-packs.js');
        }
    }
}
