<?php

require_once _PS_MODULE_DIR_ . 'norainventory/vendor/autoload.php';

class AdminNoraInventoryPacksOptionController extends ModuleAdminController
{
    protected $_defaultOrderWay = 'ASC';
    protected $_defaultOrderBy = 'position';
    protected $position_identifier = 'id_product_step_pack_option';

    public function __construct()
    {
        $this->bootstrap = true;
        $this->multishop_context = Shop::CONTEXT_ALL;

        $this->table = 'product_step_pack_option';
        $this->className = 'Module\\NoraInventory\\Models\\ProductStepPackOption';
        $this->lang = true;

        // $this->explicitSelect = true;

        parent::__construct();

        $this->addRowAction('edit');
        $this->addRowAction('delete');

        $this->_select = 'psp.`id_product_step_pack` as `id_product_step_pack`, pspl.`name` as `pspname`';
        $this->_join = 'LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack` psp
            on (psp.`id_product_step_pack` = a.`id_product_step_pack`)
        LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_lang` pspl
            on (pspl.`id_product_step_pack` = a.`id_product_step_pack`
            AND pspl.`id_lang` = ' . (int) $this->context->language->id . ')';

        $sql = new DbQuery();
        $sql->select('psp.`id_product_step_pack`, pspl.`name`');
        $sql->from('product_step_pack', 'psp');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_lang` pspl
        ON (pspl.`id_product_step_pack` = psp.`id_product_step_pack`)');
        $sql->where('psp.`id_shop` = ' . (int) $this->context->shop->id);
        $sql->where('pspl.`id_lang` = ' . (int) $this->context->language->id);

        $row = Db::getInstance()->executeS($sql);
        $packs = [];
        foreach ($row as $pack) {
            $packs[$pack['id_product_step_pack']] = $pack['name'];
        }

        $this->fields_list = [
            'id_product_step_pack_option' => [
                'title' => $this->module->l('ID'),
                'align' => 'text-center',
                'class' => 'fixed-width-xs',
            ],
            'name' => [
                'title' => $this->module->l('Name'),
                'type' => 'text',
            ],
            'pspname' => [
                'title' => $this->module->l('Parent Pack'),
                'type' => 'select',
                'list' => $packs,
                'filter_type' => 'int',
                'filter_key' => 'a!id_product_step_pack',
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

        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('product_step_pack', 'psp');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_lang` pspl
        ON (pspl.`id_product_step_pack` = psp.`id_product_step_pack`)');
        $sql->where('psp.`id_shop` = ' . (int) $this->context->shop->id);
        $sql->where('pspl.`id_lang` = ' . (int) $this->context->language->id);

        $row = Db::getInstance()->executeS($sql);
        $packs = [];
        foreach ($row as $pack) {
            $packs[] = [
                'id' => $pack['id_product_step_pack'],
                'name' => $pack['name'],
            ];
        }

        $this->fields_form = [
            'legend' => [
                'title' => $this->module->l('Pack Option Settings'),
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
                    'type' => 'select',
                    'label' => $this->module->l('Parent Pack'),
                    'name' => 'id_product_step_pack',
                    'required' => false,
                    'class' => 't',
                    'options' => [
                        'query' => $packs,
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'textarea',
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
            ],
            'submit' => [
                'title' => $this->module->l('Save'),
            ],
        ];

        return parent::renderForm();
    }
}
