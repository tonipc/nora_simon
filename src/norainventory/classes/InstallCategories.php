<?php

namespace Module\NoraInventory\Classes;

use Category;
use Configuration;
use Language;
use Module;
use Tools;

class InstallCategories implements InstallInterface
{
    public static function install()
    {
        if (!Configuration::get('NORAINVENTORY_DEFAULT_CATEGORY')) {
            $module = Module::getInstanceByName('norainventory');

            $homeCategory = (int) Configuration::get('PS_HOME_CATEGORY');

            $category = new Category();
            foreach (Language::getIds() as $idLang) {
                $category->name[$idLang] = $module->l('Products To Delete');
                $category->link_rewrite[$idLang] = Tools::str2url($module->l('Products To Delete'));
            }
            $category->id_parent = $homeCategory;
            $category->save();

            Configuration::updateValue('NORAINVENTORY_DEFAULT_CATEGORY', $category->id);
        }

        return true;
    }

    public static function uninstall()
    {
        $idCategory = (int) Configuration::get('NORAINVENTORY_DEFAULT_CATEGORY');

        if ($idCategory != (int) Configuration::get('PS_HOME_CATEGORY')) {
            $category = new Category($idCategory);
            $category->delete();
        }

        Configuration::deleteByName('NORAINVENTORY_DEFAULT_CATEGORY');

        return true;
    }
}
