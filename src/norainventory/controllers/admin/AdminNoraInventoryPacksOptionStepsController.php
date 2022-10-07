<?php

require_once _PS_MODULE_DIR_ . 'norainventory/vendor/autoload.php';

class AdminNoraInventoryPacksOptionStepsController extends ModuleAdminController
{
    protected $_defaultOrderWay = 'ASC';
    protected $_defaultOrderBy = 'position';
    protected $position_identifier = 'id_product_step_pack_option_step';

    public function __construct()
    {
        $this->bootstrap = true;
        $this->multishop_context = Shop::CONTEXT_ALL;

        $this->table = 'product_step_pack_option_step';
        $this->className = 'Module\\NoraInventory\\Models\\ProductStepPackOptionStep';
        $this->lang = true;

        // $this->explicitSelect = true;

        parent::__construct();

        $this->addRowAction('edit');
        $this->addRowAction('delete');

        $this->_select = 'pspo.`id_product_step_pack_option` as `id_product_step_pack_option`, pspol.`name` as `psponame`,
        ps.`id_product_step` as `id_product_step`, psl.`name` as `psname`, pspl.`name` as `pspname`';

        $this->_join = 'LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_option` pspo
            on (pspo.`id_product_step_pack_option` = a.`id_product_step_pack_option`)
        LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_option_lang` pspol
            on (pspol.`id_product_step_pack_option` = a.`id_product_step_pack_option`
            AND pspol.`id_lang` = ' . (int) $this->context->language->id . ')

        LEFT JOIN `' . _DB_PREFIX_ . 'product_step` ps
            on (ps.`id_product_step` = a.`id_product_step`)
        LEFT JOIN `' . _DB_PREFIX_ . 'product_step_lang` psl
            on (psl.`id_product_step` = a.`id_product_step`
        AND psl.`id_lang` = ' . (int) $this->context->language->id . ')

        LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack` psp
            on (psp.`id_product_step_pack` = pspo.`id_product_step_pack`)
        LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_lang` pspl
            on (pspl.`id_product_step_pack` = psp.`id_product_step_pack`
        AND pspl.`id_lang` = ' . (int) $this->context->language->id . ')';

        // Options
        $sql = new DbQuery();
        $sql->select('pspo.`id_product_step_pack_option`, pspol.`name`');
        $sql->from('product_step_pack_option', 'pspo');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_option_lang` pspol
        ON (pspol.`id_product_step_pack_option` = pspo.`id_product_step_pack_option`)');
        $sql->where('pspo.`id_shop` = ' . (int) $this->context->shop->id);
        $sql->where('pspol.`id_lang` = ' . (int) $this->context->language->id);

        $row = Db::getInstance()->executeS($sql);
        $options = [];
        foreach ($row as $option) {
            $options[$option['id_product_step_pack_option']] = $option['name'];
        }

        // Steps
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('product_step', 'ps');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_lang` psl
        ON (psl.`id_product_step` = ps.`id_product_step`)');
        $sql->where('ps.`id_shop` = ' . (int) $this->context->shop->id);
        $sql->where('psl.`id_lang` = ' . (int) $this->context->language->id);

        $row = Db::getInstance()->executeS($sql);
        $steps = [];
        foreach ($row as $step) {
            $steps[$step['id_product_step']] = $step['name'];
        }

        // Step packs
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
            'id_product_step_pack_option_step' => [
                'title' => $this->module->l('ID'),
                'align' => 'text-center',
                'class' => 'fixed-width-xs',
            ],
            'name' => [
                'title' => $this->module->l('Name'),
                'type' => 'text',
            ],
            'psponame' => [
                'title' => $this->module->l('Parent Option'),
                'type' => 'select',
                'list' => $options,
                'filter_type' => 'int',
                'filter_key' => 'a!id_product_step_pack_option',
            ],
            'quantity' => [
                'title' => $this->module->l('Quantity'),
                'type' => 'text',
                'align' => 'right',
            ],
            'psname' => [
                'title' => $this->module->l('Step'),
                'type' => 'select',
                'list' => $steps,
                'filter_type' => 'int',
                'filter_key' => 'a!id_product_step',
            ],
            'pspname' => [
                'title' => $this->module->l('Menu'),
                'type' => 'select',
                'list' => $packs,
                'filter_type' => 'int',
                'filter_key' => 'psp!id_product_step_pack',
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

        // Options
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('product_step_pack_option', 'psp');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_pack_option_lang` pspl
        ON (pspl.`id_product_step_pack_option` = psp.`id_product_step_pack_option`)');
        $sql->where('psp.`id_shop` = ' . (int) $this->context->shop->id);
        $sql->where('pspl.`id_lang` = ' . (int) $this->context->language->id);

        $row = Db::getInstance()->executeS($sql);
        $options = [];
        foreach ($row as $option) {
            $options[] = [
                'id' => $option['id_product_step_pack_option'],
                'name' => $option['name'],
            ];
        }

        // Steps
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('product_step', 'ps');
        $sql->join('LEFT JOIN `' . _DB_PREFIX_ . 'product_step_lang` psl
        ON (psl.`id_product_step` = ps.`id_product_step`)');
        $sql->where('ps.`id_shop` = ' . (int) $this->context->shop->id);
        $sql->where('psl.`id_lang` = ' . (int) $this->context->language->id);

        $row = Db::getInstance()->executeS($sql);
        $steps = [];
        foreach ($row as $step) {
            $steps[] = [
                'id' => $step['id_product_step'],
                'name' => $step['name'],
            ];
        }

        $this->fields_form = [
            'legend' => [
                'title' => $this->module->l('Pack Option Step Settings'),
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
                    'label' => $this->module->l('Parent Option'),
                    'name' => 'id_product_step_pack_option',
                    'required' => true,
                    'class' => 't',
                    'options' => [
                        'query' => $options,
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'text',
                    'label' => $this->module->l('Quantity'),
                    'name' => 'quantity',
                    'required' => true,
                ],
                [
                    'type' => 'select',
                    'label' => $this->module->l('Step'),
                    'name' => 'id_product_step',
                    'required' => true,
                    'class' => 't',
                    'options' => [
                        'query' => $steps,
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
