<?php

namespace Module\NoraInventory\Classes;

use Address;
use AddressFormat;
use Configuration;
use Context;
use Db;
use DbQuery;
use Hook;
use HTMLTemplate;
use Image;
use ImageType;
use Module;
use Order;
use OrderDetail;
use Pack;
use PrestashopException;
use Shop;
use Tools;
use Validate;
use Carrier;
use OrderInvoice;
use HTMLTemplateDeliverySlip;
use Customer;
use Combination;
use Product;
use CustomerMessage;

class HTMLTemplateOrderDetail extends HTMLTemplate
{
    public $available_in_your_account = false;
    public $context;
    public $date = '';
    public $module;
    public $smart;
    public $title;
    public $id_lang;
    public $id_shop;

    public function __construct(OrderDetail $OrderDetail, $smarty)
    {
        $this->order_detail = $OrderDetail;
        if (!Validate::isLoadedObject($this->order_detail)) {
            throw new PrestashopException('Order detail object is not exists');
        }

        $this->context = Context::getContext();
        $this->smarty = $smarty;
        $this->module = Module::getInstanceByName('norainventory');
        if (empty($this->module->id)) {
            throw new PrestashopException('Module object quotes was not found');
        }



        // header informations
        // $this->date = Tools::displayDate($cart->date_upd);
        $this->id_lang = $this->context->language->id;
        $this->id_shop = $this->context->shop->id;

        $prefix = $this->module->l('OD-');
        $title = $this->module->l('Order Detail');
        $this->title = sprintf('%s #%s%06d', $title, $prefix, $this->order_detail->id);



        // footer informations
        $this->shop = new Shop((int) $this->id_shop);
        if (!Validate::isLoadedObject($this->shop)) {
            throw new PrestashopException('Shop object is no valid or not exists already');
        }

        $this->order = new Order((int) $this->order_detail->id_order);
        if (!Validate::isLoadedObject($this->order)) {
            throw new PrestashopException('Order object is no valid or not exists already');
        }

        //Set carrier information of the header
        $this->setCarrierHeader();
    }

    public function assignHookData($object)
    {
        $template = ucfirst(str_replace('HTMLTemplate', '', get_class($this)));
        $template = str_replace('\\', '_', $template);
        $hook_name = 'displayPDF' . $template;

        $this->smarty->assign([
            'HOOK_DISPLAY_PDF' => Hook::exec(
                $hook_name,
                [
                    'object' => $object,
                    // The smarty instance is a clone that does NOT escape HTML
                    'smarty' => $this->smarty,
                ]
            ),
        ]);
    }

    /**
     * Returns the template's HTML header
     *
     * @return string HTML header
     */
    public function getHeader()
    {
        $this->assignCommonHeaderData();
        $this->smarty->assign([
            'header' => Configuration::get('PS_SHOP_NAME', null, null, $this->id_shop),
        ]);

        return $this->smarty->fetch($this->getTemplate('header'));
    }

    /**
     * Returns the template's HTML footer
     *
     * @return string HTML footer
     */
    public function getFooter()
    {
        $this->smarty->assign([
            'available_in_your_account' => $this->available_in_your_account,
            'shop_address' => $this->getShopAddress(),
            'shop_fax' => Configuration::get('PS_SHOP_FAX', null, null, $this->id_shop),
            'shop_phone' => Configuration::get('PS_SHOP_PHONE', null, null, $this->id_shop),
            'shop_email' => Configuration::get('PS_SHOP_EMAIL', null, null, $this->id_shop),
        ]);

        return $this->smarty->fetch($this->getTemplate('footer'));
    }

    public function updateWelcome($DD){
      //Get all order_details
      $sql = new DbQuery();
      $sql->select('id_customization');
      $sql->from('order_detail');
      $sql->where('`id_order` = ' . (int) $this->order_detail->id_order );
      $ids_customization = Db::getInstance()->executeS($sql);
      //var_dump(implode(",",array_column($ids_customization,'id_customization')));

      $sql = new DbQuery();
      $sql->select('value');
      $sql->from('customized_data');
      $sql->where('`id_customization` IN (' . implode(",",array_column($ids_customization,'id_customization')) .')');
      $sql->orderby('value ASC');
      //$sql->orderway('ASC');
      $deliveryDates = Db::getInstance()->getValue($sql);
      var_dump(strtotime($deliveryDates));

      if (strtotime($DD) > strtotime($deliveryDates) ){
        $this->order->is_first_order=0;
        //var_dump(strtotime($DD));
        //var_dump('not welcome');
      } /*else {
        var_dump('welcome');
      }
      die();*/

    }

    /**
     * Returns the template's HTML content
     *
     * @return string HTML content
     */
    public function getContent()
    {
        // Current delivery date
        $sql = new DbQuery();
        $sql->select('value');
        $sql->from('customized_data');
        $sql->where('`id_customization` = ' . (int) $this->order_detail->id_customization);

        $deliveryDate = Db::getInstance()->getValue($sql);

        // Shop Address
        $address = new Address();
        $address->company = Configuration::get('PS_SHOP_NAME');
        $address->address1 = Configuration::get('PS_SHOP_ADDR1');
        $address->address2 = Configuration::get('PS_SHOP_ADDR2');
        $address->postcode = Configuration::get('PS_SHOP_CODE');
        $address->city = Configuration::get('PS_SHOP_CITY');
        $address->phone = Configuration::get('PS_SHOP_PHONE');
        $address->id_country = Configuration::get('PS_SHOP_COUNTRY_ID');
        $shop_address = AddressFormat::generateAddress($address, [], '<br />', ' ');

        $order = new Order($this->order_detail->id_order);

        $products = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS('
        SELECT od.`id_order_detail`, od.`id_order`, od.`product_name`, od.`product_quantity`,
        cd.`value` AS `delivery_date`,
        i.`id_image`,
        p.`id_product`, p.`reference`,
        pl.`description_short`, pl.`link_rewrite`
        FROM `' . _DB_PREFIX_ . 'order_detail` od
        LEFT JOIN `' . _DB_PREFIX_ . 'product` p ON (p.`id_product` = od.`product_id`)
        LEFT JOIN `' . _DB_PREFIX_ . 'customized_data` cd ON (cd.`id_customization` = od.`id_customization`)
        LEFT JOIN `' . _DB_PREFIX_ . 'image` i ON (i.id_product = p.`id_product` AND i.`cover` = 1)
        LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` pl ON (pl.id_product = p.id_product AND pl.id_lang = ' . (int) $this->id_lang . ')
        LEFT JOIN `' . _DB_PREFIX_ . 'product_shop` ps ON (ps.id_product = p.id_product AND ps.id_shop = od.id_shop)
        WHERE od.`id_order` = ' . (int) $order->id .
        ' AND cd.`value` = "' . pSQL($deliveryDate) . '"');

        foreach ($products as $key => $product) {
            if (isset($product['id_product'])
            && Pack::isPack($product['id_product'])) {
                $products[$key]['package'] = $this->getItemTable(
                    $product['id_product'],
                    $this->id_lang
                );
            }
        }

        //Check if it is the first delivery
        if ($this->order->is_first_order == 1){
          $this->updateWelcome($deliveryDate);
        }
        //var_dump($this->order->is_first_order);

        // Order addresses
        $delivery = new Address((int) $order->id_address_delivery);
        $invoice = new Address((int) $order->id_address_invoice);

        // New layout system with personalization fields
        $formatted_addresses = [
            'delivery' => AddressFormat::getFormattedLayoutData($delivery),
            'invoice' => AddressFormat::getFormattedLayoutData($invoice),
        ];

        $delivery_address = AddressFormat::generateAddress(
            $delivery,
            ['avoid' => []],
            '<br />',
            ' ',
            [
                'firstname' => '<span style="font-weight:bold;">%s</span>',
                'lastname' => '<span style="font-weight:bold;">%s</span>',
            ]
        );
        $invoice_address = AddressFormat::generateAddress(
            $invoice,
            ['avoid' => []],
            '<br />',
            ' ',
            [
                'firstname' => '<span style="font-weight:bold;">%s</span>',
                'lastname' => '<span style="font-weight:bold;">%s</span>',
            ]
        );

        //chek if two adress are the same, and put flag
        $adresses_same = false;
        if ($order->id_address_delivery == $order->id_address_invoice)
        {
          $adresses_same = true;
        }

          //var_dump(get_object_vars( $this->order) );
        if (in_array((int) $this->order->id_customer,[4123])){ //if user is promos, generate always a welcome
          $this->order->is_first_order=1;
        }

        //Check if custmer belongs to osborne clarke group
        $customer = new Customer((int) $this->order->id_customer);
        if ((int) $customer->id_default_group == 279) {
          $isOsborne = 1;
        }

        if ( (int) $delivery->is_office == 1){
          //$custgroup = new Group((int) $customer->id_default_group, 1);
          //$extrainfo = 'OFICINA - '. (string) $custgroup->name;
          $extrainfo = 'OFICINA - ';
        }

        $this->smarty->assign([
            'delivery_address' => $delivery_address,
            'invoice_address' => $invoice_address,
            'addresses' => [
                'delivery' => $delivery_address,
                'invoice' => $invoice_address,
            ],
            'summary' => [
                'order_reference' => $order->reference,
                'order_date' => $order->date_add,
                'delivery_date' => $deliveryDate,
                'order_id'=> $this->order_detail->id_order
            ],
            'shop_address' => $shop_address,
            'display_short_description' => false,
            'products' => $products,
            'link' => $this->context->link,
            'smallSize' => Image::getSize(ImageType::getFormatedName('small')),
        ]);

         $this->smarty->assign([
            'is_first_order' => $this->order->is_first_order,
            'adresses_same' => $adresses_same,
            'payment_method' => $this->order->payment,
            'isOsborne' => $isOsborne,
            'extrainfo' => $extrainfo,
         ]);

        $this->smarty->assign([
            'style_tab' => $this->smarty->fetch($this->getTemplate('content.style-tab')),
            'addresses_tab' => $this->smarty->fetch($this->getTemplate('content.addresses-tab')),
            'summary_tab' => $this->smarty->fetch($this->getTemplate('content.summary-tab')),
            'messages_customer' => CustomerMessage::getMessagesByOrderId($this->order_detail->id_order, true),
            'is_first_order' => $this->order->is_first_order,
            'isOsborne' => $isOsborne,
            'product_tab' => $this->smarty->fetch($this->getTemplate('content.product-tab')),
        ]);

        return $this->smarty->fetch($this->getTemplate('order-detail-content'));
    }


    /**
     * Returns the template filename
     *
     * @return string filename
     */
    public function getFilename()
    {
        return sprintf($this->module->l('DE%06d'), $this->order_detail->id) . '.pdf';
    }

    /**
     * Returns the template filename when using bulk rendering
     *
     * @return string filename
     */
    public function getBulkFilename()
    {
        return 'deliveries.pdf';
    }

    /**
     * If the template is not present in the theme directory, it will return the default template
     * in _PS_PDF_DIR_ directory
     *
     * @param $template
     *
     * @return string
     */
    public function getTemplate($template)
    {
        $theme_template = _PS_THEME_DIR_ . 'modules/' . $this->module->name . '/views/templates/pdf/' . $template . '.tpl';
        $module_template = _PS_MODULE_DIR_ . $this->module->name . '/views/templates/pdf/' . $template . '.tpl';
        $path = false;

        if (Tools::file_exists_cache($theme_template)) {
            $path = $theme_template;
        } elseif (Tools::file_exists_cache($module_template)) {
            $path = $module_template;
        }

        if ($path) {
            return $path;
        }

        return parent::getTemplate($template);
    }


    public function getItemTable($id_product, $id_lang, $full = false)
    {
        if (!Pack::isFeatureActive()) {
            return array();
        }

        $context = Context::getContext();

        $sql = 'SELECT p.*, product_shop.*, pl.*, image_shop.`id_image` id_image, il.`legend`, cl.`name` AS category_default, a.quantity AS pack_quantity, product_shop.`id_category_default`, a.id_product_pack, a.id_product_attribute_item
        FROM `' . _DB_PREFIX_ . 'pack` a
        LEFT JOIN `' . _DB_PREFIX_ . 'product` p ON p.id_product = a.id_product_item
        LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` pl
          ON p.id_product = pl.id_product
          AND pl.`id_lang` = ' . (int) $id_lang . Shop::addSqlRestrictionOnLang('pl') . '
        LEFT JOIN `' . _DB_PREFIX_ . 'image_shop` image_shop
          ON (image_shop.`id_product` = p.`id_product` AND image_shop.cover=1 AND image_shop.id_shop=' . (int) $context->shop->id . ')
        LEFT JOIN `' . _DB_PREFIX_ . 'image_lang` il ON (image_shop.`id_image` = il.`id_image` AND il.`id_lang` = ' . (int) $id_lang . ')
        ' . Shop::addSqlAssociation('product', 'p') . '
        LEFT JOIN `' . _DB_PREFIX_ . 'category_lang` cl
          ON product_shop.`id_category_default` = cl.`id_category`
          AND cl.`id_lang` = ' . (int) $id_lang . Shop::addSqlRestrictionOnLang('cl') . '
        WHERE product_shop.`id_shop` = ' . (int) $context->shop->id . '
        AND a.`id_product_pack` = ' . (int) $id_product . '
        GROUP BY a.`id_product_item`, a.`id_product_attribute_item`';

        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

        foreach ($result as &$line) {

          $line['attribute'] = "";
            if (Combination::isFeatureActive() && isset($line['id_product_attribute_item']) && $line['id_product_attribute_item']) {
                $line['cache_default_attribute'] = $line['id_product_attribute'] = $line['id_product_attribute_item'];

                $sql = 'SELECT agl.`name` AS group_name, al.`name` AS attribute_name,  pai.`id_image` AS id_product_attribute_image
        FROM `' . _DB_PREFIX_ . 'product_attribute` pa
        ' . Shop::addSqlAssociation('product_attribute', 'pa') . '
        LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute_combination` pac ON pac.`id_product_attribute` = ' . $line['id_product_attribute_item'] . '
        LEFT JOIN `' . _DB_PREFIX_ . 'attribute` a ON a.`id_attribute` = pac.`id_attribute`
        LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group` ag ON ag.`id_attribute_group` = a.`id_attribute_group`
        LEFT JOIN `' . _DB_PREFIX_ . 'attribute_lang` al ON (a.`id_attribute` = al.`id_attribute` AND al.`id_lang` = ' . (int) Context::getContext()->language->id . ')
        LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group_lang` agl ON (ag.`id_attribute_group` = agl.`id_attribute_group` AND agl.`id_lang` = ' . (int) Context::getContext()->language->id . ')
        LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute_image` pai ON (' . $line['id_product_attribute_item'] . ' = pai.`id_product_attribute`)
        WHERE pa.`id_product` = ' . (int) $line['id_product'] . ' AND pa.`id_product_attribute` = ' . $line['id_product_attribute_item'] . '
        GROUP BY pa.`id_product_attribute`, ag.`id_attribute_group`
        ORDER BY pa.`id_product_attribute`';

                $attr_name = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

                if (isset($attr_name[0]['id_product_attribute_image']) && $attr_name[0]['id_product_attribute_image']) {
                    $line['id_image'] = $attr_name[0]['id_product_attribute_image'];
                }
                $line['name'] .= "\n";
                $line['attribute'] = "";
                foreach ($attr_name as $value) {
                    $line['attribute'] .= $value['attribute_name'] . " ";
                }
            }
            $line = Product::getTaxesInformations($line);
        }

        if (!$full) {
            return $result;
        }

        $array_result = array();
        foreach ($result as $prow) {
            if (!Pack::isPack($prow['id_product'])) {
                $prow['id_product_attribute'] = (int) $prow['id_product_attribute_item'];
                $array_result[] = Product::getProductProperties($id_lang, $prow);
            }
        }

        return $array_result;
    }

    public function setCarrierHeader()
    {
        $carrier = new Carrier($this->order->id_carrier);

        // If shop_address is null, then update it with current one.
        // But no DB save required here to avoid massive updates for bulk PDF generation case.
        // (DB: bug fixed in 1.6.1.1 with upgrade SQL script to avoid null shop_address in old orderInvoices)
        //var_dump(get_object_vars( $this->order) );

        if (!isset($this->order_detail->shop_address) || !$this->order_detail->shop_address) {
            $this->order_detail->shop_address = OrderInvoice::getCurrentFormattedShopAddress((int) $this->order->id_shop);
           /* if (!$bulk_mode) {
                OrderInvoice::fixAllShopAddresses();
            } */
        }

        // header informations
        $this->date = Tools::displayDate($this->order->delivery_date);
        $prefix = Configuration::get('PS_DELIVERY_PREFIX', Context::getContext()->language->id);
        $this->title = sprintf(HTMLTemplateDeliverySlip::l('%1$s%2$06d'), $prefix, $this->order->delivery_number);
        $this->carrier_header = $carrier->name;
        $customer = new Customer((int) $this->order->id_customer);
        //if pickup occurs, add a shop icon. If not, add route type
        if (stripos($carrier->name,'Recogida')!== false){
          if (stripos($carrier->name,'Mandri')!== false){
            $this->carrier_is_recogida=false;
            $this->carrier_group='Mandri';
          } else {
            $this->carrier_is_recogida=true;
            $this->carrier_group='-';
          }

        } elseif (stripos($carrier->name,'oficina')!== false){ //If delivery in office classify by route type
          $this->carrier_is_recogida=false;

            switch ((int) $customer->id_default_group) {
              case 279:
                $this->carrier_group='Cla-<12h';
                break;
              case 233:
              case 280:
              case 281:
              case 282:
              case 283:
              case 284:
              case 285:
              case 286:
              case 296:
              case 297:
              case 298:
              case 299:
                $this->carrier_group='Entrega';
                break;
/*************************************** GIORGI */
              case 128: //DABA
                $this->carrier_group='K-Da';
                break;

              case 131: //CIRCONTROL
              case 148: //CIRCONTROL
              case 181: //CIRCONTROL
                $this->carrier_group='K-Ci';
                break;
              case 157: //MUTUA TERRASSA
              case 161: //MUTUA TERRASSA
              case 262: //MUTUA TERRASSA
              case 275: //MUTUA TERRASSA
                $delivery_address = new Address((int) $this->order->id_address_delivery);
                if ((int) $delivery_address->postcode == 8232){
                  $this->carrier_group='K-Mu-PL';
                } else {
                  $this->carrier_group='K-Mu';
                }
                break;

              case 119: //Topcable
              case 122: //Topcable
                $this->carrier_group='K-Tp';
                break;
              case 216: //Epson
              case 217: //Epson
                $this->carrier_group='K-Ep';
                break;
              case 217: //Ariston
                $this->carrier_group='K-Ari';
                break;
/*************************************** RUTA SANTIGA */
              case 320: //Lipsa
                $this->carrier_group='LIPSA';
                break;
/*************************************** ALEJANDRO */
              case 197: //ZITRO
                $this->carrier_group='Jan-Zi';
                break;
              case 277: //SENER
              case 333:
                $this->carrier_group='Jan-Se';
                break;
              case 207: //INTERROL
              case 208: //ASCIL BIOPHARM
              case 211: //Ireks Iberica
              case 213: //Roland
              case 215: //Sitel SA
              case 271: //Innovamat
                $this->carrier_group='Jan-KI';
                break;
              case 198: //CIRCUTOR
              case 174: //MOVENTIA
                $this->carrier_group='Jan-GE';
                break;
              case 139: //NEWELLCO
                $this->carrier_group='Jan-New';
                break;

              case 271: //Innovamat
                $this->carrier_group='Jan-Inn';
                break;
              case 325: //Eurofragance
                $this->carrier_group='Jan-EurF';
                break;
              case 30: //Lacer
                $delivery_address = new Address((int) $this->order->id_address_delivery);
                if ((int) $delivery_address->postcode == 8290){
                  $this->carrier_group='Jan-Lac';
                } else {
                  $this->carrier_group='GH';
                }
                break;
              //case 143: //FREMAP
                //$this->carrier_group='A';
                //break;
/***************************************/
              case 75: //ISDIN
                $this->carrier_group='Ait-IS';
                break;
              //case 103: //ZOBELE
              case 107: //GTD
              case 108: //GTD1
                $this->carrier_group='Ait-GTD';
                break;
              case 112: //METALOGENIA
                $this->carrier_group='Ait-MTG';
                break;
              case 142: //RAKUTEN
              case 144: //RAKUTENCEO
                $this->carrier_group='Ait-Rak';
                break;
              case 156: //SOCIAL POINT
                $this->carrier_group='Ait-Soc';
                break;
              case 79: //MB92
                $this->carrier_group='Ait-MB';
                break;
              case 74: //Holaluz
                $this->carrier_group='Ait-Hola';
                break;
              case 66: //Dassault
                $this->carrier_group='Ait-Da';
                break;
              case 149: //RESPIRA ENERGIA
                $this->carrier_group='Ait-Re';
                break;
              case 201: //Amazon
              case 223: //Amazon
              case 224: //Amazon
              case 225: //Amazon
              case 226: //Amazon
              case 227: //Amazon
              case 228: //Amazon
              case 229: //Amazon
              case 230: //Amazon
              case 231: //Amazon
              case 232: //Amazon
              case 232: //Amazon
                $this->carrier_group='Ait-Am';
                break;
              case 244: //Holded
                $this->carrier_group='Ait-H';
                break;
              case 92: //Softonic
              case 93: //Softonic
                $this->carrier_group='Ait-Soft';
                break;
/********************** RUTA FLORENCIO *****************/
              case 90: //SANOFI
                $this->carrier_group='JP-Sanf';
                break;
              case 300: //DAikin
                $this->carrier_group='JP-Daik';
                break;
              case 301: //4Retail
              case 303: //4Retail
                $this->carrier_group='JP-4ret';
                break;
              case 62: //CCIB
                $this->carrier_group='JP-CCIB';
                break;
              case 91: //SAP
                $this->carrier_group='JP-SAP';
                break;
              case 57: //Bimbo
                $this->carrier_group='JP-Bimbo';
                break;
              case 48: //Telefonica
                $this->carrier_group='JP-Zob';
                break;
              case 95: //TMHCC
                $this->carrier_group='JP-TMHCC';
                break;
              case 103: //ZOBELE
                $this->carrier_group='JP-Zob';
                break;
              case 62: //CASIO
                $this->carrier_group='JP-Cas';
                break;
              case 317: //EGARSAT
                $this->carrier_group='JP-Egar';
                break;
              case 332://Convista, JPla
                $this->carrier_group='JP-Con';
                break;
              case 60: //Campari
                $this->carrier_group='TM-Ca';
                break;
              case 78: //LINDT
              case 323: //LINDT
                $this->carrier_group='TM-Li';
                break;
              case 76: //Leadtech
                $this->carrier_group='TM-Le';
                break;
              case 64: //COTY
                $this->carrier_group='TM-Co';
                break;
              case 65: //Criteo
                $this->carrier_group='TM-Cri';
                break;
              case 115: //FRESENIUS
                $this->carrier_group='TM-Fk';
                break;
              case 130: //KANTOX
                $this->carrier_group='TM-Ka';
                break;
              case 168: //FRESENIUS NETCARE
                $this->carrier_group='TM-Fn';
                break;
              case 173: //FRESENIUS NETCARE
                $this->carrier_group='Hosp-Mar';
                break;
              case 238: //PRBB
                $this->carrier_group='PRBB';
                break;
/***************************************/
              case 9: //ABERTIS
                $this->carrier_group='Iri-Ab';
                break;
              case 11: //CELLNEX
              case 12: //CELLNEX
                $this->carrier_group='Iri-Ce';
                break;
              case 18: //FERROVIAL AUDITORI (Zona franca)
                $delivery_address = new Address((int) $this->order->id_address_delivery);
                if ((int) $delivery_address->postcode == 8040){
                  $this->carrier_group='Iri-Cesp';
                } else {
                  $this->carrier_group=$delivery_address->postcode;
                }

                break;
              case 45: //Mettler Toledo
                $this->carrier_group='Iri-MT';
                break;
              case 127: //ADVANCED NUTRIENTS
                $this->carrier_group='Iri-Ad';
                break;

              case 143: //FREMAP PUERTO 08026
                $delivery_address = new Address((int) $this->order->id_address_delivery);
                if ((int) $delivery_address->postcode == 8040){
                  $this->carrier_group='Iri-Frmp';
                } else {
                  $this->carrier_group=$delivery_address->postcode;
                }

                break;
              case 180: //ACMARCA
                $this->carrier_group='Iri-AC';
                break;
              case 171: //Filmax
              case 162: //FILMAX
              case 196: //FILMAX
                $this->carrier_group='Iri-Fi';
                break;
              case 125: //MYLAN
                $this->carrier_group='Iri-My';
                break;

              //case 103: //ZOBELE
              case 200: //WALLBOX
                $this->carrier_group='Iri-Wa';
                break;
              //case 46: //MICHAEL PAGE
              //case 47: //MICHAEL PAGE
              case 219: //ACER IBERICA
                $this->carrier_group='Iri-Ace';
                break;
              case 261: // Bestseller
                $this->carrier_group='Iri-Be';
                break;
              case 305: // AMADA
                $this->carrier_group='Iri-AM';
                break;
              case 304: // FEDEFARMA
              case 315: // FEDEFARMA 2
                $this->carrier_group='Iri-Fed';
                break;
              case 314:
                $this->carrier_group='Iri-AirP';
                break;
              /***************************************/
              case 82: //Nike
              case 83: //Nike
              case 84: //Nike
                $this->carrier_group='Cla-Nike';
                break;
              case 177: //COPISA
              case 182: //COPISA
              case 183: //COPISA
              case 184: //COPISA
              case 185: //COPISA
                $this->carrier_group='Cla-Co';
                break;
              case 21: //Caixabank
                $this->carrier_group='Cla-Ca';
                break;
              case 287:
                $this->carrier_group='Cla-Qu';
                break;
              case 253: //Ferrer
                $this->carrier_group='Cla-FeR';
                break;
              case 129: //Magna Global
              case 132: //Magna Global
              case 133: //Magna Global
              case 134: //Magna Global
                $this->carrier_group='Cla-Mag';
                break;
              case 46: //MICHAEL PAGE
              case 47: //MICHAEL PAGE
                $this->carrier_group='Cla-MP';
                break;
              case 273: //ACTURA12
                $this->carrier_group='Cla-ACT';
                break;
              /***************************************/
              case 34: //Prod Barrio
                $this->carrier_group='Frigi-PdB';
                break;
              case 56: //Batlle
                $this->carrier_group='Frigi-BR';
                break;
              case 169: //Stada
                $this->carrier_group='Frigi-St';
                break;
              case 123: //Cobega
              case 126: //Cobega
                $this->carrier_group='Frigi-Co';
                break;
              case 258: //Frigicoll
                $this->carrier_group='Frigi';
                break;
                //$this->carrier_group='JB';
                //break;
              case 309: //Ineos
              case 306:
                $this->carrier_group='Frigi-In';
                break;
              case 308: //Etnia
              case 312: //Etnia
                $this->carrier_group='Frigi-ET';
                break;

              /***************************************/
              case 274: //Vibia
                $this->carrier_group='VIBIA';
                break;
              case 105: //Verse
                $this->carrier_group='VER';
                break;
              /***************************************/

              default:
                $this->carrier_is_recogida=false;
                $delivery_address = new Address((int) $this->order->id_address_delivery);
                switch ((int) $delivery_address->postcode) {
                  case 8040:
                  case 8038:
                  case 8908:
                    $this->carrier_group='ZP'; //Zona port
                    break;
                  case 8034:
                  case 8022:
                  case 8017:
                  case 8021:
                  case 8006:
                  case 8023:
                  case 8035:
                    $this->carrier_group='ZA'; //Zona alta
                    break;
                  case 8902:
                  case 8950:
                  case 8960:
                    $this->carrier_group='BP'; //Zona port
                    break;
                  case 8028:
                  case 8014:
                  case 8004:
                  case 8015:
                  case 8029:
                    $this->carrier_group='ZS'; //Zona Sants
                    break;
                  case 8018:
                  case 8019:
                  case 8013:
                  case 8005:
                  case 8039:
                    if (in_array((int) $customer->id_default_group,[147]) and  ((int) $delivery_address->postcode)== 8019) {
                      $this->carrier_group='22@*PA'; //Zona 22@
                    } elseif (in_array((int) $customer->id_default_group,[147]) and  ((int) $delivery_address->postcode)== 8018){
                      $this->carrier_group='22@*CT'; //Zona 22@
                    } else{
                      $this->carrier_group='22@'; //Zona 22@
                    }
                    break;
                  case 8001:
                  case 8003:
                  case 8002:
                  case 8010:
                  case 8009:
                  case 8007:
                  case 8011:
                  case 8036:
                  case 8008:
                  case 8037:
                    $this->carrier_group='BC'; //Zona B. centre y pl cat
                    break;
                  case 8012:
                  case 8024:
                  case 8025:
                  case 8032:
                  case 8041:
                  case 8026:
                  case 8031:
                  case 8042:
                  case 8016:
                  case 8027:
                  case 8030:
                  case 8020:
                  case 8033:
                    $this->carrier_group='GH'; //Zona B. Gracia y Horta
                    break;
                  default:
                    $this->carrier_group=$delivery_address->postcode;
                }
              }
              if (in_array((int) $customer->id ,[9469,8746])){ // Special customers who can receive their personal deliveries in office
                $this->carrier_group='K';
              }
      } else{
          $this->carrier_is_recogida=false;
          $delivery_address = new Address((int) $this->order->id_address_delivery);
          switch ((int) $delivery_address->postcode) {
            case 8040:
            case 8038:
            case 8908:
              $this->carrier_group='ZP'; //Zona port
              break;
            case 8034:
            case 8022:
            case 8017:
            case 8021:
            case 8006:
            case 8023:
            case 8035:
              $this->carrier_group='ZA'; //Zona alta
              break;
            case 8902:
            case 8950:
            case 8960:
              $this->carrier_group='BP'; //Zona port
              break;
            case 8028:
            case 8014:
            case 8004:
            case 8015:
            case 8029:
              $this->carrier_group='ZS'; //Zona Sants
              break;
            case 8018:
            case 8019:
            case 8013:
            case 8005:
            case 8039:
              $this->carrier_group='22@'; //Zona 22@
              break;
            case 8001:
            case 8003:
            case 8002:
            case 8010:
            case 8009:
            case 8007:
            case 8011:
            case 8036:
            case 8008:
            case 8037:
              $this->carrier_group='BC'; //Zona B. centre y pl cat
              break;
            case 8012:
            case 8024:
            case 8025:
            case 8032:
            case 8041:
            case 8026:
            case 8031:
            case 8042:
            case 8016:
            case 8027:
            case 8030:
            case 8020:
            case 8033:
              $this->carrier_group='GH'; //Zona B. Gracia y Horta
              break;
            default:
              $this->carrier_group=$delivery_address->postcode;
          }

        }

        if (in_array( (int) $customer->id_default_group,[149])) { //RESPIRA ENERGIA

          $delivery_address = new Address((int) $this->order->id_address_delivery);
          similar_text('Carrer del Dr. Trueta, 183', $delivery_address->address1, $perc);
          if ($perc>78){
            $this->carrier_group='Ait';
          }
        }

        if (in_array( (int) $customer->id_default_group,[143])) { //RESPIRA ENERGIA
          $delivery_address = new Address((int) $this->order->id_address_delivery);
          similar_text('Carrer de Mallorca, 603', $delivery_address->address1, $perc);
            if ($perc>78){
              $this->carrier_group='08026';
            } else {
              similar_text('Carrer de Fluvià, 37', $delivery_address->address1, $perc);
              if ($perc>78){
                $this->carrier_group='08019';
            }
          }
        }

        if (stripos($carrier->name,'diaria')== true && in_array( (int) $customer->id_default_group,[201])){
          $this->carrier_group='AMZN';
        }

        if (in_array((int) $this->order->id_customer,[10415])){ //if user is catering, assign special name
          $this->carrier_group='Catering';
          $this->carrier_is_recogida=false;
        }

        if (in_array((int) $this->order->id_customer,[13844])){ //if user is promos, generate always a welcome
          $this->carrier_group='K-Mu-PL';
        }

    }



    /**
     * Translation method
     *
     * @param string $string
     *
     * @return string translated text
     */
    protected static function l($string)
    {
        $module = Module::getInstanceByName('norainventory');

        return $module->l($string, 'HTMLTemplateOrderDetail');
    }


}
