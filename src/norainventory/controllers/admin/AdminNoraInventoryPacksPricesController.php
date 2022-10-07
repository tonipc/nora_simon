<?php

require_once _PS_MODULE_DIR_ . 'norainventory/vendor/autoload.php';

use Module\NoraInventory\Models\ProductStepPack;

class AdminNoraInventoryPacksPricesController extends ModuleAdminController
{
    protected $_defaultOrderWay = 'ASC';
    protected $_defaultOrderBy = 'position';
    protected $position_identifier = 'id_product_step_pack_price';

    public function __construct()
    {
        $this->bootstrap = true;
        $this->multishop_context = Shop::CONTEXT_ALL;

        $this->table = 'product_step_pack_price';
        //$this->className = 'Module\\NoraInventory\\Models\\ProductStepPack';
        $this->lang = false;

        // $this->explicitSelect = true;

        parent::__construct();

        $this->addRowAction('edit');
        $this->addRowAction('delete');

        /*
        $types = [
            'product_pack' => $this->module->l('Product pack'),
            'cart_rule' => $this->module->l('Cart rule'),
        ];
            */

        $this->fields_list = [
            'id_product_step_pack_price' => [
                'title' => $this->module->l('ID'),
                'align' => 'text-center',
                'class' => 'fixed-width-xs',
            ],
             'id_product_step_pack' => [
                'title' => $this->module->l('Menu'),
                'align' => 'text-center',
                'class' => 'fixed-width-xs',
            ],
            'price' => [
                'title' => $this->module->l('Price (tax excl.)'),
                'type' => 'price',
                'align' => 'right',
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

        //Get packs
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


        // User groups
        $unidentified = new Group(Configuration::get('PS_UNIDENTIFIED_GROUP'));
        $guest = new Group(Configuration::get('PS_GUEST_GROUP'));
        $default = new Group(Configuration::get('PS_CUSTOMER_GROUP'));

        $unidentified_group_information = $this->trans('%group_name% - All people without a valid customer account.', ['%group_name%' => '<b>' . $unidentified->name[$this->context->language->id] . '</b>'], 'Admin.Catalog.Feature');
        $guest_group_information = $this->trans('%group_name% - Customer who placed an order with the guest checkout.', ['%group_name%' => '<b>' . $guest->name[$this->context->language->id] . '</b>'], 'Admin.Catalog.Feature');
        $default_group_information = $this->trans('%group_name% - All people who have created an account on this site.', ['%group_name%' => '<b>' . $default->name[$this->context->language->id] . '</b>'], 'Admin.Catalog.Feature');

        $this->fields_form = [
            'legend' => [
                'title' => $this->module->l('Pack Price settings:'),
                'icon' => 'icon-group',
            ],
            'input' => [
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
                    'type' => 'text',
                    'label' => $this->module->l('price'),
                    'name' => 'price',
                    'form_group_class' => 'only-for-product-pack',
                    'prefix' => '€',
                    'class' => 'fixed-width-xl',
                    'desc' => $this->module->l('(Tax excl.) Use 0 to preserve the sum of product packs.'),
                ],
                [
                    'type' => 'group',
                    'label' => $this->trans('Group access', [], 'Admin.Catalog.Feature'),
                    'name' => 'groupBox',
                    'values' => Group::getGroups(Context::getContext()->language->id),
                    'hint' => $this->trans('Mark all of the customer groups which you would like to have access to this category.', [], 'Admin.Catalog.Help'),
                ],
                [
                    'type' => 'text',
                    'name' => 'priceID',
                ]
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

        $this->getFormValues();

        $category_groups_ids = $this->getGroups();
        $groups = Group::getGroups($this->context->language->id);

        foreach ($groups as $group) {
            $this->fields_value['groupBox_' . $group['id_group']] = Tools::getValue('groupBox_' . $group['id_group'], (in_array($group['id_group'], $category_groups_ids)));
        }



        return parent::renderForm();
    }

    public function getFormValues()
    {
        if (Tools::getValue('id_product_step_pack_price'))
        {
            $sql = new DbQuery();
            $sql->select('*');
            $sql->from('product_step_pack_price');
            $sql->where('id_product_step_pack_price'. ' = ' . (int) Tools::getValue('id_product_step_pack_price') );

            $row = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

            foreach ($row as $val) {
                $this->fields_value['price'] = $val['price'];
                $this->fields_value['id_product_step_pack'] = $val['id_product_step_pack'];
                $this->fields_value['priceID'] = Tools::getValue('id_product_step_pack_price');
            }
        }
    }


    public function getGroups()
    {
        return $this->getStepPackGroups( Tools::getValue('id_product_step_pack_price') );
    }

    

    
    public function getStepPackGroups($idProductStepPack)
    {
        $sql = new DbQuery();
        $sql->select('id_group');
        $sql->from('product_step_pack_price_group');
        $sql->where('id_product_step_pack_price'. ' = ' . (int) $idProductStepPack);

        $row = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

        $ret = [];
        foreach ($row as $val) {
            $ret[] = $val['id_group'];
        }

        return $ret;
    }

    
    public function postProcess()
    {
        parent::postProcess();

        if (Tools::isSubmit('submitAdd' . $this->table)) {
            $groups = Tools::getValue('groupBox');
            $this->updateGroups($groups);
        }

    }



    public function updateGroups($groups)
    {
        if (empty($groups)) {
            return false;
        }

        //first determine if we are adding or editing an element
        $idPackPrice  = Tools::getValue('priceID');


        if ( $idPackPrice )
        {
            Db::getInstance()->update('product_step_pack_price', [
                    'id_product_step_pack' => (int) Tools::getValue('id_product_step_pack'),
                    'price' => Tools::getValue('price')
                ], ' id_product_step_pack_price = '. $idPackPrice);
        }
        else
        {
           $packPrice = [
                    'id_product_step_pack' => (int) Tools::getValue('id_product_step_pack'),
                    'price' => Tools::getValue('price')
                ];

            $response = Db::getInstance()->insert('product_step_pack_price', $packPrice); 

            $idPackPrice = Db::getInstance()->Insert_ID(); 
        }

        //Then delete all previous instances of groups for this element if is update
        if ( $idPackPrice )
        {
             $return = Db::getInstance()->delete(
                'product_step_pack_price_group',
                'id_product_step_pack_price = ' . $idPackPrice
            );
        }
       

        //insert al the groups belonging to this price
        $groups = array_map('intval', $groups);
        $currentGroups = $this->getGroups();
        $currentGroups = array_map('intval', $currentGroups);
        $stepGruops = [];

        foreach ($groups as $group) {
            if (!in_array($group, $currentGroups)) {
                $stepGruops[] = [
                    'id_product_step_pack_price' => (int) $idPackPrice,
                    'id_group' => (int) $group
                ];
            }
        }
        Db::getInstance()->insert('product_step_pack_price_group', $stepGruops);

        return true;
    }

    public function deleteGroup($idGroup)
    {
        $result = Db::getInstance()->executeS(
            'SELECT `id_group`
            FROM `' . _DB_PREFIX_ . 'product_step_pack_group`
            WHERE `id_product_step_pack` = ' . (int) $this->id . '
            AND id_group = ' . (int) $idGroup . ''
        );

        $return = Db::getInstance()->delete(
            'product_step_pack_group',
            'id_product_step_pack = ' . (int) $this->id . ' AND id_group = ' . (int) $idGroup
        );

        return $return;
    }

    public function addToGroups($groups = [])
    {
        if (empty($groups)) {
            return false;
        }

        if (!is_array($groups)) {
            $groups = [$groups];
        }

        if (!count($groups)) {
            return false;
        }

        $groups = array_map('intval', $groups);

        $currentGroups = $this->getGroups();
        $currentGroups = array_map('intval', $currentGroups);

        $stepGruops = [];

        foreach ($groups as $group) {
            if (!in_array($group, $currentGroups)) {
                $stepGruops[] = [
                    'id_product_step_pack' => (int) $this->id,
                    'id_group' => (int) $group,
                ];
            }
        }

        Db::getInstance()->insert('product_step_pack_group', $stepGruops);

        return true;
    }


    /*
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
    } */
}
