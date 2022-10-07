<?php

namespace Module\NoraInventory\Classes;

use Language;
use Module;
use PrestaShopLogger as Logger;
use Tab;

class InstallTabs implements InstallInterface
{
    protected static $name = 'norainventory';

    protected static $tabs = [
        // Admin API
        [
            'name' => 'Nora Api',
            'class_name' => 'AdminNoraInventoryApi',
            'visible' => false,
            'parent_class_name' => 'AdminNoraInventoryParent',
            'icon' => 'public',
        ],
        // Admin Parent
        [
            'name' => 'Nora Food',
            'class_name' => 'AdminNoraInventoryParent',
            'visible' => true,
            'parent_class_name' => 'SELL',
            'icon' => 'restaurant',
        ],
        // Admin Children
        [
            'name' => 'Nora Inventory',
            'class_name' => 'AdminNoraInventoryStock',
            'visible' => true,
            'parent_class_name' => 'AdminNoraInventoryParent',
            'icon' => 'inventory',
        ],
        // Admin Packs Parent
        [
            'name' => 'Nora Packs',
            'class_name' => 'AdminNoraInventoryPacksParent',
            'visible' => true,
            'parent_class_name' => 'AdminNoraInventoryParent',
            'icon' => 'sell',
        ],
        [
            'name' => 'Nora Pack Menus',
            'class_name' => 'AdminNoraInventoryPacks',
            'visible' => true,
            'parent_class_name' => 'AdminNoraInventoryPacksParent',
            'icon' => 'sell',
        ],
         [
            'name' => 'Nora Pack Prices',
            'class_name' => 'AdminNoraInventoryPacksPrices',
            'visible' => true,
            'parent_class_name' => 'AdminNoraInventoryPacksParent',
            'icon' => 'sell',
        ],
        [
            'name' => 'Nora Pack Options',
            'class_name' => 'AdminNoraInventoryPacksOption',
            'visible' => true,
            'parent_class_name' => 'AdminNoraInventoryPacksParent',
            'icon' => 'sell',
        ],
        [
            'name' => 'Nora Pack Option Steps',
            'class_name' => 'AdminNoraInventoryPacksOptionSteps',
            'visible' => true,
            'parent_class_name' => 'AdminNoraInventoryPacksParent',
            'icon' => 'sell',
        ],
        [
            'name' => 'Nora Steps',
            'class_name' => 'AdminNoraInventorySteps',
            'visible' => true,
            'parent_class_name' => 'AdminNoraInventoryParent',
            'icon' => 'reorder',
        ],
        [
            'name' => 'Nora Orders',
            'class_name' => 'AdminNoraInventoryOrder',
            'visible' => true,
            'parent_class_name' => 'AdminNoraInventoryParent',
            'icon' => 'point_of_sale',
        ],
    ];

    public static function install()
    {
        $module = Module::getInstanceByName(self::$name);
        $languages = Language::getLanguages(false);
        $tabs = self::$tabs;

        foreach ($tabs as $tabDetails) {
            try {
                if (!Tab::getIdFromClassName($tabDetails['class_name'])) {
                    $tab = new Tab();
                    $tab->active = isset($tabDetails['visible']) ? $tabDetails['visible'] : true;
                    $tab->class_name = $tabDetails['class_name'];
                    $tab->module = $module->name;
                    foreach ($languages as $lang) {
                        $tab->name[(int) $lang['id_lang']] = $module->l($tabDetails['name']);
                    }
                    $tab->icon = isset($tabDetails['icon']) ? $tabDetails['icon'] : null;
                    $tab->id_parent = Tab::getIdFromClassName($tabDetails['parent_class_name']);
                    if (!$tab->save()) {
                        $message = "{$module->name}: Failed to install admin tab {$tab->class_name}";
                        Logger::AddLog($message);
                    }
                }
            } catch (Exception $e) {
                Logger::AddLog($e->getMessage());
            }
        }

        return true;
    }

    public static function uninstall()
    {
        $tabs = self::$tabs;

        try {
            foreach ($tabs as $tab) {
                $id_tab = (int) Tab::getIdFromClassName($tab['class_name']);

                if ($id_tab) {
                    $object = new Tab($id_tab);
                    $object->delete();
                }
            }
        } catch (Exception $e) {
            Logger::AddLog($e->getMessage());
        }

        return true;
    }
}
