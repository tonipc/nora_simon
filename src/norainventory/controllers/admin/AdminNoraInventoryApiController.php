<?php

require_once _PS_MODULE_DIR_ . 'norainventory/vendor/autoload.php';

use Module\NoraInventory\Models\ProductStockDate;

class AdminNoraInventoryApiController extends ModuleAdminController
{
    public $ajax = 1;
    protected $content_only = true;

    public function __construct()
    {
        $this->bootstrap = false;
        $this->multishop_context = Shop::CONTEXT_ALL;

        parent::__construct();

        header('Content-Type: application/json');
    }

    protected static function presentProducts($products, $stocksRaw)
    {
        $stocks = [];

        foreach ($stocksRaw as $stock) {
            $stocks[(int) $stock['id_product']][(int) $stock['id_product_attribute']][$stock['available_date']] = $stock['quantity'];
        }

        $arrays = [];
        $attributes = [];

        foreach ($products as $product) {
            $idProductAttribute = (int) $product['id_product_attribute'];
            $idProduct = (int) $product['id_product'];

            if (empty($attributes[$idProduct])) {
                $attributes[$idProduct] = [];
            }

            if (empty($stocks[$idProduct])) {
                $stocks[$idProduct] = [];
            }

            if ($idProductAttribute) {
                $name = $product['attribute_name'];

                $previousName = !empty($attributes[$idProduct][$idProductAttribute]['name'])
                    ? $attributes[$idProduct][$idProductAttribute]['name']
                    : '';

                if ($previousName) {
                    $name .= ' - ' . $previousName;
                }

                $attributes[$idProduct][$idProductAttribute] = [
                    'id' => $idProductAttribute,
                    'name' => $name,
                ];
            }

            $arrays[$idProduct] = [
                'id' => $idProduct,
                'name' => $product['name'],
                'active' => $product['active'],
                'categoryName' => $product['category_name'],
                'attributes' => $attributes[$idProduct],
                'stocks' => !empty($stocks[$idProduct]) ? $stocks[$idProduct] : [],
            ];
        }

        return array_values(array_map(function ($value) {
            return [
                'id' => $value['id'],
                'name' => $value['name'],
                'active' => (bool) $value['active'],
                'categoryName' => $value['categoryName'],
                'attributes' => array_values($value['attributes']),
                'stocks' => $value['stocks'],
            ];
        }, $arrays));
    }

    public function displayAjaxTest()
    {
        die(json_encode([
            'status' => 200,
            'message' => 'Success',
        ]));
        exit;
    }

    public function displayAjaxGetRawProducts()
    {
        try {
            $productsRaw = ProductStockDate::getProductsWithPopulate();

            die(json_encode($productsRaw));
            exit;
        } catch (Exception $e) {
            http_response_code(400);
            die(json_encode([
                'code' => 400,
                'message' => $e->getMessage(),
            ]));
        }
    }

    /**
     * Get a list of products
     */
    public function displayAjaxGetProducts()
    {
        try {
            $name = pSQL(Tools::getValue('name'));
            $category = pSQL(Tools::getValue('category'));
            $active = null;
            if (Tools::getIsset('active')) {
                $active = (bool) Tools::getValue('active');
            }

            $productsRaw = ProductStockDate::getProductsWithPopulate([
                'name' => $name,
                'category' => $category,
                'active' => $active,
            ]);

            $stocksRaw = ProductStockDate::getProductsStock();

            $products = self::presentProducts($productsRaw, $stocksRaw);

            die(json_encode($products));
            exit;
        } catch (Exception $e) {
            http_response_code(400);
            die(json_encode([
                'code' => 400,
                'message' => $e->getMessage(),
            ]));
        }
    }

    /**
     * Receive date and stock for a product and attribute
     */
    public function displayAjaxCreateAvailableDate()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if (Tools::getIsset('date') && Tools::getIsset('quantity') && Tools::getIsset('idProduct')) {
                $date = pSQL(Tools::getValue('date'));
                $quantity = (int) Tools::getValue('quantity');
                $idProduct = (int) Tools::getValue('idProduct');
                $idProductAttribute = (int) Tools::getValue('idProductAttribute');

                try {
                    $inventoryId = ProductStockDate::getIdByParams($date, $idProduct, $idProductAttribute);

                    $obj = new ProductStockDate($inventoryId);

                    if (!Validate::isLoadedObject($obj)) {
                        // Create if stock is available
                        if ($quantity) {
                            $obj->available_date = pSQL($date);
                            $obj->id_product = (int) $idProduct;
                            $obj->id_product_attribute = (int) $idProductAttribute;
                            $obj->quantity = (int) $quantity;
                            $obj->save();
                        }
                    } else {
                        // Update
                        if ($quantity === 0) {
                            // Deete
                            $obj->delete();
                        } else {
                            $obj->quantity = $quantity;
                            $obj->save();
                        }
                    }

                    $byDateStock = (int) ProductStockDate::getStockByProduct($idProduct, $idProductAttribute);
                    $generalStock = (int) StockAvailable::getQuantityAvailableByProduct($idProduct, $idProductAttribute);

                    $delta = $byDateStock - $generalStock;

                    StockAvailable::updateQuantity((int) $idProduct, (int) $idProductAttribute, $delta);

                    http_response_code(200);
                    die(json_encode([
                        'date' => $date,
                        'quantity' => $quantity,
                        'idProduct' => $idProduct,
                        'idProductAttribute' => $idProductAttribute ?: null,
                        'idProductStockDate' => (int) $obj->id,
                    ]));
                } catch (Exception $e) {
                    http_response_code(500);
                    die(json_encode([
                        'code' => 500,
                        'message' => $e->getMessage(),
                    ]));
                }
            } else {
                http_response_code(400);
                die(json_encode([
                    'code' => 400,
                    'message' => 'Missing required params',
                ]));
            }
        } else {
            http_response_code(405);
            die(json_encode([
                'code' => 405,
                'message' => 'Method not allowed',
            ]));
        }

        exit;
    }
}
