<?php

require_once _PS_MODULE_DIR_ . 'norainventory/vendor/autoload.php';

use Module\NoraInventory\Models\ProductStepPack;
use Module\NoraInventory\Models\ProductStockDate;

class NoraInventoryApiModuleFrontController extends ModuleFrontController
{
    public $ssl = true;
    protected $content_only = true;

    public $ajax = 1;

    public function __construct()
    {
        $this->bootstrap = false;
        $this->multishop_context = Shop::CONTEXT_ALL;

        parent::__construct();

        $staticToken = $this->module->getToken('apiToken');

        if (Tools::getValue('tokenType') === 'static') {
            $staticToken = $this->module->getToken('apiToken', true);
        }

        if (Tools::getValue('apiToken') !== $staticToken) {
            $this->renderJsonResponse("", 401);
        }
    }

    protected function renderJsonResponse($body = "", $statusCode = 200)
    {
        ob_end_clean();
        if ($statusCode !== 200) {
            http_response_code($statusCode);
        }

        header('Content-Type: application/json');
        die(json_encode($body));
        exit;
    }

    public function displayAjaxCronJob()
    {
        ProductStockDate::cleanStock();

        die('OK');
        exit;
    }

    public function displayAjaxGetProductsByDate()
    {
        $date = pSQL(Tools::getValue('date'));

        $isValidDate = $date && Validate::isDate($date);
        $tomorrow = date('Y-m-d', strtotime('tomorrow'));

        $result = $this->module->getProductsByDate($isValidDate ? $date : $tomorrow);

        $this->renderJsonResponse($result);
    }

    public function displayAjaxCreateCartRule()
    {
        $result = [
            'static_token' => Tools::getToken(false),
            'cart_url' => $this->context->link->getPageLink('cart'),
        ];

        $this->renderJsonResponse($result);
    }

    public function displayAjaxGetTotalProducts()
    {
        $products = Tools::getValue('products');
        $context = $this->context;

        $products = array_map(function ($product) use ($context) {
            return [
                'id_product' => $product['id_product'],
                'id_product_attribute' => $product['id_product_attribute'],
                'cart_quantity' => $product['quantity'],
                'id_address_delivery' => $context->cart->id_address_delivery,
                'id_shop' => $context->cart->id_shop,
                'id_customization' => 0,
            ];
        }, $products);
        $total = $this->context->cart->getOrderTotal(true, Cart::BOTH, $products);

        $this->renderJsonResponse(['total' => $total]);
    }


    public function displayAjaxCreateProductPack()
    {
        if (empty($this->context->cart->id) && isset($_COOKIE[$this->context->cookie->getName()])) {
            $this->context->cart->add();
            $this->context->cookie->id_cart = (int) $this->context->cart->id;
        }

        $date = pSQL(Tools::getValue('date'));

        $idMenu = (int) Tools::getValue('id_product_step_pack');
        $menu = new ProductStepPack($idMenu, $this->context->language->id);

        $product = new Product();
        $product->name = sprintf(
            $menu->name
        );

        $menu->price = ProductStepPack::get_group_price( $idMenu , $menu->price );

        $product->link_rewrite = Tools::str2url($product->name);
        $product->price = $menu->price; // @TODO: Price from total item packs
        $product->id_tax_rules_group = $menu->id_tax_rules_group;
        $product->visibility = 'none';
        $product->pack_stock_type = Pack::STOCK_TYPE_PRODUCTS_ONLY;
        // $product->quantity = 999; // @TODO: Quantity from date?
        $product->id_category_default = (int) Configuration::get('NORAINVENTORY_DEFAULT_CATEGORY');
        $product->save();

        $product->updateCategories([(int) Configuration::get('NORAINVENTORY_DEFAULT_CATEGORY')]);
        // $product->out_of_stock = 1; // @TODO: Quantity from date?
        // $produt->save();
        StockAvailable::setProductOutOfStock(
            $product->id, true,
            $this->context->shop->id
            // $product->id_product_attribute
        );
        // $product->addToCategories([]);

        // Add products to pack
        $productInfo = Tools::getValue('product_info');
        $upselling = 0;
        var_dump($productInfo);

        //Here we add the upselling
        //See if Pack has products with upselling
        foreach ($productInfo as $item) {

            
            
            // $array = explode(',', trim(trim($item, "["), "]"));
            $array = is_array($item) ? $item : json_decode($item);

            list($quantity, $itemId, $itemIdProductAttribute) = $array;

            $productItem = new Product( $item[1] );

            

            $upselling = $upselling + $productItem->upselling;

            Pack::addItem((int) $product->id, $itemId, $quantity, $itemIdProductAttribute);
        }

        $product->price = round ( $product->price + ( floatval($upselling) / 1.10), 2);

        
        var_dump($product->price);

        // Get pack price as default
        //$price = Pack::noPackPrice($product->id);

        //$product->price = $price;
        $product->save();

        // Create a specific price
        /*
        if ($product->price) {
            $sp = new SpecificPrice();
            $sp->id_product = $product->id;
            $sp->id_cart = $this->context->cart->id;
            $sp->id_shop = $this->context->shop->id;
            $sp->id_currency = 0;
            $sp->id_country = 0;
            $sp->id_group = 0;
            $sp->id_customer = 0;
            $sp->from_quantity = 1;
            $sp->reduction = 0; // 0.05 for 5% or amount
            $sp->reduction_type = 'amount'; // 'percentage'
            $sp->price = (float) $product->price; // -1 for percentage
            $sp->from = '0000-00-00 00:00:00';
            $sp->to = date('Y-m-d H:i:s', strtotime($date) - 3600);

            // isReductionType
            // $sp->reduction_type = 'amount' || 'percentaje'
            // If reduction amount or pencentaje avaliable
            // $sp->reduction = $menu->reduction_amount || $menu->reduction_percent / 100

            $sp->save();

            $product->on_sale = true;
            $product->save();
        }
        */

        $this->renderJsonResponse([
            'add_to_cart_url' => $this->context->link->getAddToCartURL($product->id, 0),
            'static_token' => Tools::getToken(false),
            'id_product' => $product->id,
            'cart_url' => $this->context->link->getPageLink('cart'),
            'product' => $product,
        ]);
    }

     public function displayAjaxgetValoresNutricionales()
    {

        $cURLConnection = curl_init();

        // var_dump($_GET['id']);

        curl_setopt($cURLConnection, CURLOPT_URL, 'https://software.gastrokaizen.com/apiv1/getPlatoValorNutricionalByCodigo/'.$_GET['id']);
        curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);
        //Cuenta Norarealfood
        // curl_setopt($cURLConnection, CURLOPT_HTTPHEADER, array(
        //     'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRlIjoxODQ0LCJsb2NhbCI6MX0.bZpyqAaB71ZBJkpH-DvYEhTtMgTS778AT4EoILBnBDU'
        // ));
        //Cuenta Nora2
        curl_setopt($cURLConnection, CURLOPT_HTTPHEADER, array(
            'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRlIjo0MDA1LCJsb2NhbCI6MX0.yZ1sTQkFQQ4NjxbAdkZHmEilD76PIZcTg9KgFg8UBkM'
        ));
        $phoneList = curl_exec($cURLConnection);

        //var_dump($phoneList);

        curl_close($cURLConnection);

        $jsonArrayResponse = json_decode($phoneList);

        $result = [
            'status' => 200,
            'values' => $jsonArrayResponse
        ];

        $this->renderJsonResponse($result);
    }

    public function displayAjaxTest()
    {
        $result = [
            'status' => 200,
            'message' => 'Success',
            'date' => [
                'post' => $_POST,
                'get' => $_GET,
            ],
        ];

        $this->renderJsonResponse($result);
    }
}
