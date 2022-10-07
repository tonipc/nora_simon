<?php

require_once _PS_MODULE_DIR_ . 'norainventory/vendor/autoload.php';

use Module\NoraInventory\Models\ProductStep;

class AdminNoraInventoryStepsController extends ModuleAdminController
{
    protected $_defaultOrderWay = 'ASC';
    protected $_defaultOrderBy = 'position';
    protected $position_identifier = 'id_product_step';

    public function __construct()
    {
        $this->bootstrap = true;
        $this->multishop_context = Shop::CONTEXT_ALL;

        $this->table = 'product_step';
        $this->className = 'Module\\NoraInventory\\Models\\ProductStep';
        $this->lang = true;

        // $this->explicitSelect = true;

        parent::__construct();

        $this->addRowAction('edit');
        $this->addRowAction('delete');

        $this->fields_list = [
            'id_product_step' => [
                'title' => $this->module->l('ID'),
                'align' => 'text-center',
                'class' => 'fixed-width-xs',
            ],
            'name' => [
                'title' => $this->module->l('Name'),
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
            'description_short' => [
                'title' => $this->module->l('Descripción corta'),
                'type' => 'text',
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

        $selected = $this->object->getCategories();

        $root = Category::getRootCategory();
        $tree = new HelperTreeCategories('categories-tree');
        $tree->setUseCheckBox(true)
            ->setAttribute('is_category_filter', $root->id)
            ->setSelectedCategories($selected)
            ->setNoJS(true)
            ->setRootCategory($root->id)
            ->setInputName('categories');

        $categoryTree = $tree->render();

        $row = Attribute::getAttributes(Context::getContext()->language->id);
        $attributes = [];
        foreach ($row as $att) {
            $attributes[] = [
                'id_attribute' => $att['id_attribute'],
                'name' => $att['attribute_group'] . ' - ' . $att['name'],
            ];
        }
        // dump($attributes);
        // die();

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
                    'type' => 'categories_select',
                    'label' => $this->module->l('Categories'),
                    'name' => 'categories',
                    'category_tree' => $categoryTree,
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
                    'type' => 'checkbox',
                    'label' => $this->module->l('Attributes'),
                    'name' => 'attributes',
                    'values' => [
                        'id' => 'id_attribute',
                        'name' => 'name',
                        'query' => $attributes,
                    ],
                    'expand' => [
                        'print_total' => count($attributes),
                        'default' => 'show',
                        'show' => ['text' => $this->l('show'), 'icon' => 'plus-sign-alt'],
                        'hide' => ['text' => $this->l('hide'), 'icon' => 'minus-sign-alt'],
                    ],
                    'hint' => $this->module->l('Mark all the available attributes for this step.'),
                ],
            ],
            'submit' => [
                'title' => $this->module->l('Save'),
            ],
        ];

        $attributeIds = $this->object->getAttributes();
        foreach ($attributes as $attribute) {
            $this->fields_value['attributes_' . $attribute['id_attribute']] = Tools::getValue('attributes_' . $attribute['id_attribute'], (in_array($attribute['id_attribute'], $attributeIds)));
        }

        return parent::renderForm();
    }

    public function postProcess()
    {
        parent::postProcess();

        if (Tools::isSubmit('submitAdd' . $this->table)) {
            $categories = Tools::getValue('categories');
            $this->object->updateCategories($categories);

            $row = Attribute::getAttributes($this->context->language->id);
            $attributes = [];
            foreach ($row as $att) {
                if (Tools::getIsset('attributes_' . $att['id_attribute'])) {
                    $attributes[] = (int) $att['id_attribute'];
                }
            }

            $this->object->updateAttributes($attributes);
        }

        if (!Tools::getIsset('submitAdd' . $this->table)) {
            ProductStep::cleanPositions();
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

        $this->addJqueryPlugin(['autocomplete']);
    }
}
