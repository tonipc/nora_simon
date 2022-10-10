<?php

require_once _PS_MODULE_DIR_ . 'norainventory/vendor/autoload.php';

use Module\NoraInventory\Models\ProductStep;
use Module\NoraInventory\Models\ProductStepPack;
use Module\NoraInventory\Models\ProductStockDate;
//use Group;

class NoraInventoryPacksModuleFrontController extends ModuleFrontController
{
    public $ssl = true;

    public function initContent()
    {
        parent::initContent();

        $this->context->smarty->assign([
            'pathApp' => $this->module->getPathUri() . 'views/public/packs.bundle.js',
            'vendorChunk' => $this->module->getPathUri() . 'views/public/vendor.chunk.js',
            'commonsChunk' => $this->module->getPathUri() . 'views/public/commons~homepage~packs.chunk.js',
        ]);

        // Styles
        $this->addCSS($this->module->getPathUri() . 'views/css/materialdesignicons.min.css');
        $this->addCSS($this->module->getPathUri() . 'views/public/commons~homepage~packs.css');
        $this->addCSS($this->module->getPathUri() . 'views/public/packs.css');

        $this->setTemplate('module:norainventory/views/templates/front/packs.tpl');
    }

    public function getBreadcrumbLinks()
    {
        $breadcrumb = parent::getBreadcrumbLinks();
        $breadcrumb['links'][] = [
            'title' => $this->l('Packs'),
            'url' => $this->context->link->getModuleLink($this->module->name, 'packs', [], true),
        ];

        return $breadcrumb;
    }

    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);

        $dates = ProductStockDate::getAvailableDates();
        $steps = ProductStep::getStepsWithCategories();
        $menus = ProductStepPack::getDetailedPacks();
        $categories = [];

        foreach ($steps as $step) {
            foreach ($step['categories'] as $category) {
                $categories[] = $category;
            }
        }

        $baseUrl = $this->context->link->getBaseLink();

        //Logic to show or hide prices based on group
        // $groupId = FrontController::getCurrentCustomerGroups();

        $grupo_defecto_cliente = $this->context->customer->id_default_group;

        //vienen del noraparticularidades
        $grupos_con_precio_oculto = json_decode(Configuration::get('NORAPARTI_GROUPS_PRECIOSOCULTOS'));

        $showPrices = true;

        // foreach ($groupId as $group) {

            // if ( ($group == "142") ||  ($group == "279") ||  ($group == "195") ||  ($group == "129") ||  ($group == "132") ||  ($group == "133") ||  ($group == "134") ||  ($group == "339") ||  ($group == "340")  ||  ($group == "348")  ||  ($group == "349") ||  ($group == "350") )
            if ( in_array($grupo_defecto_cliente, $grupos_con_precio_oculto) ) {
                 $showPrices = false;
            }
        // }

        Media::addJsDef([
            'noraInventoryData' => [
                'baseUrl' => $this->module->getModuleLinkWithoutBase('packs'),
                'apiUrl' => $this->module->getApiUrl(),
                'showPrices' => $showPrices,
                'isLoggued' => $this->context->customer->isLogged(),
                'cartUrl' => $this->module->getPageLinkWithoutBase('cart', ['action' => 'show']),
                'defaultLocale' => $this->context->language->locale,
                'orderUrl' => $this->module->getPageLinkWithoutBase('order'),
                'categories' => Category::getSimpleCategoriesWithParentInfos($this->context->language->id),
                'dates' => $dates,
                'featuresWithValues' => $this->module->getFeaturesWithValues(),
                'featuresToFilter' => $this->module->getFeaturesToFilter(),
                'menus' => $menus,
                'truncProductTitle' => false,
                'emitEvents' => false, // true: Display shopping cart modal, false: redirect to shopping cart
                'redirectAutoToCart' => true, // true: redirect to cart, false: show buttons to redirect manually
                'steps' => array_values(array_map(function ($step) {
                    return [
                        'id' => (int) $step['id'],
                        'text' => $step['text'],
                        'label' => $step['label'],
                        'description_short' => $step['description_short'],
                        'description' => $step['description'],
                        'categories' => !empty($step['categories']) ? array_values($step['categories']) : [],
                        'attributes' => !empty($step['attributes']) ? array_values($step['attributes']) : [],
                    ];
                }, $steps)),
                'summarySettings' => [
                    'twoButtons' => true, // false: add to cart button, true, add more products / redirect to
                    // Configure if redirect auto in one button or display confirmation modal
                    'redirectAutoTo' => true, // true redirect to redirectTo, false display confirmation modal
                    // Configure if redirect either to cart or to order page
                    'redirectTo' => true ? $this->module->getPageLinkWithoutBase('order') : $this->module->getPageLinkWithoutBase('cart', ['action' => 'show']),

                    'cartUrl' => $this->module->getPageLinkWithoutBase('cart', ['action' => 'show']),
                    'orderUrl' => $this->module->getPageLinkWithoutBase('order'),

                    'quantityInputs' => range(1, 10),

                    'quantityType' => 'number', // number | select

                    'isEmptyCart' => !Cart::getNbProducts((int) $this->context->cart->id),
                ],
                'translations' => $this->module->data['translations']
            ],
        ]);
    }

    protected function getFeaturesWithValues(array $ids = [])
    {
        $idLang = Context::getContext()->language->id;

        $features = Db::getInstance()->executeS('
		SELECT f.id_feature, f.*, fl.*, fvl.*
		FROM `' . _DB_PREFIX_ . 'feature` f
		' . Shop::addSqlAssociation('feature', 'f') . '
		LEFT JOIN `' . _DB_PREFIX_ . 'feature_lang` fl ON (f.`id_feature` = fl.`id_feature` AND fl.`id_lang` = ' . (int) $idLang . ')
		LEFT JOIN `' . _DB_PREFIX_ . 'feature_value` fv ON (fv.`id_feature` = f.`id_feature`)
		LEFT JOIN `' . _DB_PREFIX_ . 'feature_value_lang` fvl ON (fvl.`id_feature_value` = fv.`id_feature_value` AND fvl.`id_lang` = ' . (int) $idLang . ')
        '. (empty($ids) ? '' : 'WHERE fvl.id_feature_value IN (' . implode(',', array_map('intval', $ids)) . ')') .'
		ORDER BY f.`position` ASC');

        return $features;
    }

    public function getLayout()
    {
        return 'layouts/layout-full-width.tpl';
    }
}
