<?php

use Module\NoraInventory\Models\ProductStockDate;

class AdminNoraInventoryStockController extends ModuleAdminController
{
    public function __construct()
    {
        $this->bootstrap = true;
        $this->multishop_context = Shop::CONTEXT_ALL;

        parent::__construct();

        $this->fields_options[] = [
            'title' => $this->module->l('Settings'),
            'icon' => 'icon-keyboard',
            'fields' => [
                'NORA_DISABLE_STOCK_SATURDAYS' => [
                    'title' => $this->module->l('Disable stock in Saturdays'),
                    'desc' => $this->module->l('True to disable saturdays to set stock quantities'),
                    'type' => 'bool',
                ],
                'NORA_DISABLE_STOCK_SUNDAYS' => [
                    'title' => $this->module->l('Disable stock in Sundays'),
                    'desc' => $this->module->l('True to disable sundays to set stock quantities'),
                    'type' => 'bool',
                ],
            ],
            'submit' => ['title' => $this->module->l('Save')],
        ];
    }

    public function initContent()
    {
        // Remove products that had not attributes and now it has
        ProductStockDate::cleanStock();

        parent::initContent();
    }

    public function postProcess()
    {
        parent::postProcess();

        $smarty = [
            // Components spinner, table
            'pathApp' => $this->module->getPathUri() . 'views/public/admin-stock.bundle.js',
            'chunkVendor' => $this->module->getPathUri() . 'views/public/vendor.chunk.js',
        ];

        $this->context->smarty->assign($smarty);

        /**
         * Get base url where to get services and send to JS
         *
         * @var string $baseUrl
         */
        $baseUrl = $this->context->link->getBaseLink();

        Media::addJsDef([
            'noraInventoryData' => [
                'baseUrl' => str_replace(
                    $baseUrl,
                    '/',
                    $this->context->link->getAdminBaseLink() . basename(_PS_ADMIN_DIR_) . '/index.php'
                ),
                'apiUrl' => str_replace(
                    $baseUrl,
                    '/',
                    $this->context->link->getAdminLink(
                        'AdminNoraInventoryApi',
                        true,
                        [],
                        ['ajax' => 1]
                    )
                ),
                'disableSaturdays' => Configuration::get('NORA_DISABLE_STOCK_SATURDAYS'),

                'disableSundays' => Configuration::get('NORA_DISABLE_STOCK_SUNDAYS'),

                'language' => $this->context->language,

                'translations' => [
                    'active' => $this->l('Active'),
                    'categories' => $this->l('Categories'),
                    'next_week' => $this->l('Next Week'),
                    'previous_week' => $this->l('Previous Week'),
                    'products' => $this->l('Products'),
                ],
            ],
        ]);

        $output = $this->createTemplate('stock.tpl')->fetch();

        $this->content .= $output;
    }

    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);

        if (Tools::getValue('controller') === 'AdminNoraInventoryStock') {
            $this->addCSS($this->module->getPathUri() . 'views/css/materialdesignicons.min.css');
            $this->addCSS($this->module->getPathUri() . 'views/public/admin-stock.css');
        }
    }
}
