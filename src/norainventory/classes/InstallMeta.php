<?php

namespace Module\NoraInventory\Classes;

use Language;
use Meta;
use Tools;

class InstallMeta implements InstallInterface
{
    public static function install()
    {
        $selectedPages = [];
        // Add modules controllers to list (this function is cool !)
        foreach (glob(_PS_MODULE_DIR_ . 'norainventory/controllers/front/*.php') as $file) {
            $filename = Tools::strtolower(basename($file, '.php'));
            if ($filename == 'index') {
                continue;
            }

            $module = Tools::strtolower(basename(dirname(dirname(dirname($file)))));

            $meta = new Meta();
            $meta->page = 'module-' . $module . '-' . $filename;
            // $meta->title;
            // $meta->description;
            // $meta->keywords;
            foreach (Language::getIds() as $idLang) {
                $meta->url_rewrite[(int) $idLang] = $module . '-' . $filename;
            }

            $meta->save();
        }

        return true;
    }

    public static function uninstall()
    {
        return true;
    }
}
