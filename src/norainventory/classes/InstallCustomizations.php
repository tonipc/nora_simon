<?php

namespace Module\NoraInventory\Classes;

use CustomizationField;
use Db;
use Language;
use Product;

class InstallCustomizations implements InstallInterface
{
    private static function installCustomization($productId)
    {
        $cf = new CustomizationField();

        foreach (Language::getIds() as $langId) {
            $cf->name[$langId] = 'DELIVERY_DATE';
        }
        $cf->type = 1;
        $cf->required = true;
        $cf->is_module = true;
        $cf->id_product = $productId;
        $cf->save();
    }

    public function install()
    {
        $sql = new DbQuery();
        $sql->select('id_product');
        $sql->from('product');
        $products = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

        foreach ($products as $product) {
            self::installCustomization($product['id_product']);
            $obj = new Product($product['id_product']);
            $obj->customizable = true;
            $obj->save();
        }

        return true;
    }

    public function uninstall()
    {
        $idLang = (int) Context::getContext()->language->id;
        $sql = new DbQuery();
        $sql->select('`id_customization_field`');
        $sql->from('customization_field_lang');
        $sql->where('`name` = "DELIVERY_DATE"');
        $sql->where('`id_lang` = ' . (int) $idLang);

        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
        $ids = array_column($result, 'id_customization_field');
        $where = '`id_customization_field` IN (' . implode(',', $ids) . ')';
        Db::getInstance()->delete('customization_field', $where);
        Db::getInstance()->delete('customization_field_lang', $where);

        return true;
    }
}
