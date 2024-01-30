<?php
/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.txt
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to a newer
 * versions in the future. If you wish to customize this module for your
 * needs please refer to CustomizationPolicy.txt file inside our module for more information.
 *
 * @author Webkul IN
 * @copyright Since 2010 Webkul
 * @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */
if (!defined('_PS_VERSION_')) {
    exit;
}
class HTMLTemplateCashRegister extends HTMLTemplate
{
    public $cashRegister;
    public $available_in_your_account = false;
    public const REGISTER_TEMPLATE = 'CashRegister';
    public $registerTemplates;
    public $format;
    public $bulkMode;

    /**
     * @param OrderInvoice $order_invoice
     * @param $smarty
     *
     * @throws PrestaShopException
     */
    public function __construct(WkPosRegister $cashRegister, $smarty, $bulk_mode = false, $idShop = false)
    {
        $this->cashRegister = $cashRegister;
        $this->smarty = $smarty;
        $this->format = '#CR';
        $this->registerTemplates = [
            'register.style-tab',
            'register.payment-tab',
            'register.total-tab',
            'register.addresses-tab',
            'register.details-tab',
            'register',
        ];
        $this->bulkMode = $bulk_mode;

        if (!$idShop) {
            $idShop = Context::getContext()->shop->id;
        }

        // header informations
        $this->date = Tools::displayDate($cashRegister->opening_date);

        $this->title = $cashRegister->getRegisterReference();

        $this->shop = new Shop((int) $idShop);
    }

    /**
     * Returns the template's HTML header.
     *
     * @return string HTML header
     */
    public function getHeader()
    {
        $this->assignCommonHeaderData();
        $this->smarty->assign(
            [
                'header' => Context::getContext()->getTranslator()->trans('POS Cash Register', [], 'Shop.Pdf'),
            ]
        );

        return $this->smarty->fetch($this->getTemplate('header'));
    }

    /**
     * Compute layout elements size.
     *
     * @param $params Array Layout elements
     *
     * @return array Layout elements columns size
     */
    protected function computeLayout()
    {
        $layout = [
            'payment_method' => [
                'width' => 25,
            ],
            'opening_balance' => [
                'width' => 25,
            ],
            'transaction' => [
                'width' => 25,
            ],
            'closing_balance' => [
                'width' => 25,
            ],
        ];

        return $layout;
    }

    /**
     * Returns the template's HTML content.
     *
     * @return string HTML content
     */
    public function getContent()
    {
        $registerDetails = $this->cashRegister->getRegisterPdfDetail($this->cashRegister->id);

        $objOutlet = new WkPosOutlets($this->cashRegister->id_wkpos_outlet);
        $outletAddress = new Address((int) $objOutlet->id_address);
        $country = new Country((int) $outletAddress->id_country);
        $formattedOutletAddress = '';
        if (isset($outletAddress) && $outletAddress) {
            $deliveryAddressPatternRules = json_decode(Configuration::get('PS_INVCE_DELIVERY_ADDR_RULES'), true);
            $outletAddress->firstname = '';
            $outletAddress->lastname = '';
            $formattedOutletAddress = trim(AddressFormat::generateAddress(
                $outletAddress,
                $deliveryAddressPatternRules,
                '<br />',
                ' '
            ));
        }
        $layout = $this->computeLayout();
        $registerDetails['layout'] = $layout;
        $registerDetails['outlet_address'] = $formattedOutletAddress;

        if (Tools::getValue('debug')) {
            exit(json_encode($registerDetails));
        }

        $this->smarty->assign($registerDetails);
        $tpls = [
            'layout' => $layout,
            'register_tab' => $this->smarty->fetch($this->getTemplate('register.details-tab')),
            'addresses_tab' => $this->smarty->fetch($this->getTemplate('register.addresses-tab')),
            'style_tab' => $this->smarty->fetch($this->getTemplate('register.style-tab')),
            'payment_tab' => $this->smarty->fetch($this->getTemplate('register.payment-tab')),
            'total_tab' => $this->smarty->fetch($this->getTemplate('register.total-tab')),
        ];
        $this->smarty->assign($tpls);

        return $this->smarty->fetch($this->getTemplateByCountry($country->iso_code));
    }

    public function getTemplateByCountry($iso_country)
    {
        $template = false;
        $file = 'register';

        // try to fetch the iso template
        $template = $this->getTemplate($file . '.' . $iso_country);

        if (!$template) {
            $template = $this->getTemplate($file);
        }

        return $template;
    }

    /**
     * If the template is not present in the theme directory, it will return the default template
     * in _PS_PDF_DIR_ directory.
     *
     * @param $template_name
     *
     * @return string
     */
    protected function getTemplate($template_name)
    {
        $template = false;
        if (in_array($template_name, $this->registerTemplates)) {
            $default_template = rtrim(_PS_MODULE_DIR_, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'wkpos';
            $default_template .= DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR;
            $default_template .= 'front' . DIRECTORY_SEPARATOR . 'pdf' . DIRECTORY_SEPARATOR;
            $default_template .= $template_name . '.tpl';
        } else {
            $default_template = rtrim(_PS_PDF_DIR_, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $template_name . '.tpl';
        }
        $overridden_template = _PS_ALL_THEMES_DIR_ . $this->shop->theme->getName() . DIRECTORY_SEPARATOR . 'pdf';
        $overridden_template .= DIRECTORY_SEPARATOR . $template_name . '.tpl';
        if (file_exists($overridden_template)) {
            $template = $overridden_template;
        } elseif (file_exists($default_template)) {
            $template = $default_template;
        }

        return $template;
    }

    /**
     * Returns the template filename when using bulk rendering.
     *
     * @return string filename
     */
    public function getBulkFilename()
    {
        return 'cashregister.pdf';
    }

    /**
     * Returns the template filename.
     *
     * @return string filename
     */
    public function getFilename()
    {
        $format = '%1$s%2$06d';

        if (Configuration::get('PS_INVOICE_USE_YEAR')) {
            $format = Configuration::get('PS_INVOICE_YEAR_POS') ? '%1$s%3$s-%2$06d' : '%1$s%2$06d-%3$s';
        }

        return sprintf(
            $format,
            $this->format,
            $this->cashRegister->id,
            date('Y', strtotime($this->cashRegister->opening_date))
        ) . '.pdf';
    }
}
