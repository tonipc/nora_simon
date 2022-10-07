# PrestaShop Customizations for Nora Foods

## Install

Include a Docker container option to develop with the required dependencies and MySQL.

Run `cp .env.example .env` then up the docker container `docker-compose up` or `docker-compose up -d`.

Open the admin folder as `http://localhost:8087/adminNora` or the port and admin folder name designed in `.env` file.

Authenticate with `admin@admin.com` and `adminadmin` password.

Install required modules: `norainventory`

- **Nora Inventory**

## Folder Structure

- .tpm: only read folders as MySQL data and PrestaShop folder structure.
- src: in development modules
- src-client: Vue frontend project

## Client

Client is a Vue project. To modify client either js or css files:

- Run `npm run dev` to watch for changes in the `src-client` folder.
- Run `rpn run build` to generate the compiled files in the folder `src/norainventory/views/public`.

Upload the files inside `src/norainventory` to the `/modules/norainventory` folder.

### src-client/admin/admin-stock

Manage the `AdminStockDate` admin controller user interface.

### src-client/front/packs

Manage the `NoraInventoryPacksModuleFrontController` front controller user interface.

### Modifying templates

To modify a template, edit the file `<template></template>` section of the `.vue` file. After that runt the `npm run build` script and upload the compiled files.

### Static data

A `window.noraInvantoryData` is expossed with the required data, example:

```json
{
  "baseUrl": "/es/module/norainventory/packs",
  "apiUrl": "/es/module/norainventory/api?ajax=1&apiToken=ef5c1f45d524e551e46070fca80a6117",
  "dates": ["2021-05-14", "2021-05-17", "2021-05-18", "2021-05-19"],
  "translations": {
    "add_to_cart": "Añadir",
    "button_extra_confirm": "Confirm",
    "button_extra_cancel": "Add Nothing",
    "change_day": "Change Day",
    "edit": "Modificar",
    "listing_label": "Select a product",
    "order_for": "Order For",
    "price": "Price",
    "quick_view": "Quick View",
    "regular_price": "Regular price",
    "select_product": "Select",
    "selected_product": "Selected"
  },
  "featuresWithValues": [
    {
      "id_feature": "1",
      "position": "0",
      "id_lang": "1",
      "name": "Alérgenos",
      "id_feature_value": "5",
      "value": "Soja"
    },
    {
      "id_feature": "1",
      "position": "0",
      "id_lang": "1",
      "name": "Alérgenos",
      "id_feature_value": "2",
      "value": "Huevo"
    },
    {
      "id_feature": "1",
      "position": "0",
      "id_lang": "1",
      "name": "Alérgenos",
      "id_feature_value": "14",
      "value": "Sulfito"
    },
    {
      "id_feature": "1",
      "position": "0",
      "id_lang": "1",
      "name": "Alérgenos",
      "id_feature_value": "11",
      "value": "Moluscos"
    },
    {
      "id_feature": "1",
      "position": "0",
      "id_lang": "1",
      "name": "Alérgenos",
      "id_feature_value": "4",
      "value": "Frutos secos"
    },
    {
      "id_feature": "1",
      "position": "0",
      "id_lang": "1",
      "name": "Alérgenos",
      "id_feature_value": "1",
      "value": "Gluten"
    },
    {
      "id_feature": "1",
      "position": "0",
      "id_lang": "1",
      "name": "Alérgenos",
      "id_feature_value": "13",
      "value": "Apio"
    },
    {
      "id_feature": "1",
      "position": "0",
      "id_lang": "1",
      "name": "Alérgenos",
      "id_feature_value": "6",
      "value": "Crustáceos"
    },
    {
      "id_feature": "1",
      "position": "0",
      "id_lang": "1",
      "name": "Alérgenos",
      "id_feature_value": "3",
      "value": "Lácteos"
    },
    {
      "id_feature": "1",
      "position": "0",
      "id_lang": "1",
      "name": "Alérgenos",
      "id_feature_value": "12",
      "value": "Sésamo"
    }
  ],
  "steps": [
    {
      "id": 1,
      "text": "1",
      "label": "Primero",
      "description_short": "",
      "description": "",
      "categories": ["3", "4", "5"],
      "attributes": ["1", "19"],
      "icon": "check"
    },
    {
      "id": 2,
      "text": "2",
      "label": "Segundo",
      "description_short": "",
      "description": "",
      "categories": ["6", "7", "8"],
      "attributes": ["19"],
      "icon": "check"
    },
    {
      "id": 3,
      "text": 3,
      "label": "Postre",
      "description_short": "",
      "description": "",
      "categories": ["9"],
      "attributes": ["19"]
    },
    {
      "id": 4,
      "text": "3",
      "label": "Resumen",
      "description_short": "<p>Proin ex ipsum, facilisis id tincidunt </p>",
      "description": "<p>Duis vestibulum elit vel neque pharetra vulputate quisque scelerisque nisi urna rutrum non risus in imperdiet. Proin molestie accumsan nulla.</p>",
      "categories": ["12", "13", "14"],
      "attributes": ["19"]
    }
  ],
  "menus": [
    {
      "id": 1,
      "label": "Menu",
      "type": "product_pack",
      "options": [
        {
          "id": 1,
          "label": "1 primero y 1 segundo",
          "id_menu": 1,
          "type": "product_pack",
          "price": 10.528846,
          "price_formatted": "10,95 €",
          "steps": [
            {
              "id": 1,
              "label": "Primero",
              "quantity": "1",
              "id_menu": 1,
              "id_option": 1
            },
            {
              "id": 2,
              "label": "Segundo",
              "quantity": "1",
              "id_menu": 1,
              "id_option": 1
            }
          ]
        },
        {
          "id": 2,
          "label": "2 primeros",
          "id_menu": 1,
          "type": "product_pack",
          "price": 10.528846,
          "price_formatted": "10,95 €",
          "steps": [
            {
              "id": 1,
              "label": "Primero",
              "quantity": "2",
              "id_menu": 1,
              "id_option": 2
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "label": "Medio Menu",
      "type": "product_pack",
      "options": [
        {
          "id": 3,
          "label": "1 primero y 1 postre",
          "id_menu": 2,
          "type": "product_pack",
          "price": 8.605769,
          "price_formatted": "8,95 €",
          "steps": [
            {
              "id": 1,
              "label": "Primero",
              "quantity": "1",
              "id_menu": 2,
              "id_option": 3
            },
            {
              "id": 3,
              "label": "Postre",
              "quantity": "1",
              "id_menu": 2,
              "id_option": 3
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "label": "A La Carta",
      "type": "cart_rule",
      "options": [
        {
          "id": 5,
          "label": "Elegir productos",
          "id_menu": 4,
          "type": "cart_rule",
          "price": 0,
          "price_formatted": "0,00 €",
          "steps": [
            {
              "id": 1,
              "label": "Primero",
              "quantity": "0",
              "id_menu": 4,
              "id_option": 5
            },
            {
              "id": 2,
              "label": "Segundo",
              "quantity": "0",
              "id_menu": 4,
              "id_option": 5
            },
            {
              "id": 3,
              "label": "Postre",
              "quantity": "0",
              "id_menu": 4,
              "id_option": 5
            }
          ]
        }
      ]
    }
  ],
  "categories": [
    {
      "id_category": "2",
      "name": "Inicio",
      "id_parent": "1"
    },
    {
      "id_category": "3",
      "name": "Primeros",
      "id_parent": "2"
    },
    {
      "id_category": "4",
      "name": "Pastas / Arroces",
      "id_parent": "3"
    },
    {
      "id_category": "5",
      "name": "Sopas / Cremas",
      "id_parent": "3"
    },
    {
      "id_category": "6",
      "name": "Segundos",
      "id_parent": "2"
    },
    {
      "id_category": "7",
      "name": "Carnes",
      "id_parent": "6"
    },
    {
      "id_category": "8",
      "name": "Veggies",
      "id_parent": "6"
    },
    {
      "id_category": "9",
      "name": "Postres",
      "id_parent": "2"
    },
    {
      "id_category": "10",
      "name": "Products To Delete",
      "id_parent": "2"
    },
    {
      "id_category": "11",
      "name": "Extras",
      "id_parent": "2"
    },
    {
      "id_category": "12",
      "name": "Snacks",
      "id_parent": "11"
    },
    {
      "id_category": "13",
      "name": "Refrescos",
      "id_parent": "11"
    },
    {
      "id_category": "14",
      "name": "Bebidas",
      "id_parent": "11"
    }
  ]
}
```

### API data

Product list is required once after page is loaded asynchronously from the `NoraInventoryApiModuleFrontController` front controller, example:

```json
[
  {
    "id": "13",
    "attributes": [],
    "show_price": true,
    "weight_unit": "kg",
    "url": "http://localhost:8087/es/postres/13-brown-bear-vector-graphics.html",
    "canonical_url": "http://localhost:8087/es/postres/13-brown-bear-vector-graphics.html",
    "add_to_cart_url": "http://localhost:8087/es/carrito?add=1&id_product=13&id_product_attribute=0&token=8b295d3970f36b063f6c014a1f3552af",
    "condition": false,
    "delivery_information": false,
    "embedded_attributes": {
      "id_product": "13",
      "id_supplier": "0",
      "id_manufacturer": "2",
      "id_category_default": "9",
      "id_shop_default": "1",
      "on_sale": "0",
      "online_only": "0",
      "ecotax": "0.000000",
      "quantity": 100,
      "minimal_quantity": "1",
      "low_stock_threshold": null,
      "low_stock_alert": "0",
      "price": "10,89 €",
      "unity": "",
      "unit_price_ratio": "0.000000",
      "additional_shipping_cost": "0.00",
      "reference": "demo_19",
      "out_of_stock": 0,
      "customizable": "0",
      "uploadable_files": "0",
      "text_fields": "0",
      "redirect_type": "301-category",
      "id_type_redirected": "0",
      "available_for_order": "1",
      "available_date": "2021-05-14",
      "show_condition": "0",
      "condition": "new",
      "show_price": "1",
      "indexed": "1",
      "visibility": "both",
      "is_virtual": "1",
      "cache_default_attribute": "0",
      "date_add": "2021-05-10 17:24:25",
      "date_upd": "2021-05-10 17:24:25",
      "advanced_stock_management": "0",
      "pack_stock_type": "3",
      "description": "<p><span style=\"font-size:10pt;font-style:normal;\">You have a custom printing creative project? The vector graphic Mountain fox illustration can be used for printing purpose on any support, without size limitation. </span></p>",
      "description_short": "<p><span style=\"font-size:10pt;font-style:normal;\">Vector graphic, format: svg. Download for personal, private and non-commercial use.</span></p>",
      "link_rewrite": "brown-bear-vector-graphics",
      "meta_description": "",
      "meta_keywords": "",
      "meta_title": "",
      "name": "Brown bear - Vector graphics",
      "available_now": "",
      "available_later": "",
      "delivery_in_stock": "",
      "delivery_out_stock": "",
      "new": "0",
      "id_product_attribute": 0,
      "category_name": "Postres",
      "allow_oosp": 0,
      "category": "postres",
      "link": "http://localhost:8087/es/postres/13-brown-bear-vector-graphics.html",
      "attribute_price": 0,
      "price_tax_exc": 9,
      "price_without_reduction": 10.89,
      "reduction": 0,
      "specific_prices": [],
      "quantity_all_versions": 530,
      "id_image": "es-default",
      "features": [],
      "attachments": [],
      "virtual": 1,
      "pack": false,
      "packItems": [],
      "nopackprice": 0,
      "customization_required": false,
      "rate": 21,
      "tax_name": "IVA ES 21%",
      "ecotax_rate": 0,
      "unit_price": "",
      "images": [
        {
          "bySize": {
            "small_default": {
              "url": "http://localhost:8087/16-small_default/brown-bear-vector-graphics.jpg",
              "width": 98,
              "height": 98
            },
            "cart_default": {
              "url": "http://localhost:8087/16-cart_default/brown-bear-vector-graphics.jpg",
              "width": 125,
              "height": 125
            },
            "home_default": {
              "url": "http://localhost:8087/16-home_default/brown-bear-vector-graphics.jpg",
              "width": 250,
              "height": 250
            },
            "medium_default": {
              "url": "http://localhost:8087/16-medium_default/brown-bear-vector-graphics.jpg",
              "width": 452,
              "height": 452
            },
            "large_default": {
              "url": "http://localhost:8087/16-large_default/brown-bear-vector-graphics.jpg",
              "width": 800,
              "height": 800
            }
          },
          "small": {
            "url": "http://localhost:8087/16-small_default/brown-bear-vector-graphics.jpg",
            "width": 98,
            "height": 98
          },
          "medium": {
            "url": "http://localhost:8087/16-home_default/brown-bear-vector-graphics.jpg",
            "width": 250,
            "height": 250
          },
          "large": {
            "url": "http://localhost:8087/16-large_default/brown-bear-vector-graphics.jpg",
            "width": 800,
            "height": 800
          },
          "legend": "Brown bear - Vector graphics",
          "cover": "1",
          "id_image": "16",
          "position": "1",
          "associatedVariants": []
        }
      ],
      "cover": {
        "bySize": {
          "small_default": {
            "url": "http://localhost:8087/16-small_default/brown-bear-vector-graphics.jpg",
            "width": 98,
            "height": 98
          },
          "cart_default": {
            "url": "http://localhost:8087/16-cart_default/brown-bear-vector-graphics.jpg",
            "width": 125,
            "height": 125
          },
          "home_default": {
            "url": "http://localhost:8087/16-home_default/brown-bear-vector-graphics.jpg",
            "width": 250,
            "height": 250
          },
          "medium_default": {
            "url": "http://localhost:8087/16-medium_default/brown-bear-vector-graphics.jpg",
            "width": 452,
            "height": 452
          },
          "large_default": {
            "url": "http://localhost:8087/16-large_default/brown-bear-vector-graphics.jpg",
            "width": 800,
            "height": 800
          }
        },
        "small": {
          "url": "http://localhost:8087/16-small_default/brown-bear-vector-graphics.jpg",
          "width": 98,
          "height": 98
        },
        "medium": {
          "url": "http://localhost:8087/16-home_default/brown-bear-vector-graphics.jpg",
          "width": 250,
          "height": 250
        },
        "large": {
          "url": "http://localhost:8087/16-large_default/brown-bear-vector-graphics.jpg",
          "width": 800,
          "height": 800
        },
        "legend": "Brown bear - Vector graphics",
        "cover": "1",
        "id_image": "16",
        "position": "1",
        "associatedVariants": []
      },
      "has_discount": false,
      "discount_type": null,
      "discount_percentage": null,
      "discount_percentage_absolute": null,
      "discount_amount": null,
      "discount_amount_to_display": null,
      "price_amount": 10.89,
      "unit_price_full": "",
      "show_availability": true,
      "availability_date": "2021-05-14",
      "availability_message": "",
      "availability": "available"
    },
    "file_size_formatted": null,
    "attachments": [],
    "quantity_discounts": [],
    "reference_to_display": "demo_19",
    "grouped_features": null,
    "seo_availability": "https://schema.org/InStock",
    "labels": {
      "tax_short": "(impuestos inc.)",
      "tax_long": "Impuestos incluidos"
    },
    "ecotax": {
      "value": "0,00 €",
      "amount": "0.000000",
      "rate": 0
    },
    "flags": [],
    "main_variants": [],
    "specific_references": null,
    "id_product": "13",
    "id_supplier": "0",
    "id_manufacturer": "2",
    "id_category_default": "9",
    "id_shop_default": "1",
    "id_tax_rules_group": "1",
    "on_sale": "0",
    "online_only": "0",
    "ean13": "",
    "isbn": "",
    "upc": "",
    "quantity": 100,
    "minimal_quantity": "1",
    "low_stock_threshold": null,
    "low_stock_alert": "0",
    "price": "10,89 €",
    "wholesale_price": "0.000000",
    "unity": "",
    "unit_price_ratio": "0.000000",
    "additional_shipping_cost": "0.00",
    "reference": "demo_19",
    "supplier_reference": "",
    "location": "",
    "width": "0.000000",
    "height": "0.000000",
    "depth": "0.000000",
    "weight": "0.000000",
    "out_of_stock": 0,
    "additional_delivery_times": "1",
    "quantity_discount": "0",
    "customizable": "0",
    "uploadable_files": "0",
    "text_fields": "0",
    "active": "0",
    "redirect_type": "301-category",
    "id_type_redirected": "0",
    "available_for_order": "1",
    "available_date": "2021-05-14",
    "show_condition": "0",
    "indexed": "1",
    "visibility": "both",
    "cache_is_pack": "0",
    "cache_has_attachments": "0",
    "is_virtual": "1",
    "cache_default_attribute": "0",
    "date_add": "2021-05-10 17:24:25",
    "date_upd": "2021-05-10 17:24:25",
    "advanced_stock_management": "0",
    "pack_stock_type": "3",
    "state": "1",
    "id_shop": "1",
    "id_lang": "1",
    "description": "<p><span style=\"font-size:10pt;font-style:normal;\">You have a custom printing creative project? The vector graphic Mountain fox illustration can be used for printing purpose on any support, without size limitation. </span></p>",
    "description_short": "<p><span style=\"font-size:10pt;font-style:normal;\">Vector graphic, format: svg. Download for personal, private and non-commercial use.</span></p>",
    "link_rewrite": "brown-bear-vector-graphics",
    "meta_description": "",
    "meta_keywords": "",
    "meta_title": "",
    "name": "Brown bear - Vector graphics",
    "available_now": "",
    "available_later": "",
    "delivery_in_stock": "",
    "delivery_out_stock": "",
    "new": "0",
    "id_product_stock_date": "111",
    "id_product_attribute": 0,
    "category_name": "Postres",
    "allow_oosp": 0,
    "category": "postres",
    "link": "http://localhost:8087/es/postres/13-brown-bear-vector-graphics.html",
    "attribute_price": 0,
    "price_tax_exc": 9,
    "price_without_reduction": 10.89,
    "price_without_reduction_without_tax": 9,
    "reduction": 0,
    "reduction_without_tax": 0,
    "specific_prices": [],
    "quantity_all_versions": 530,
    "id_image": "es-default",
    "features": [],
    "virtual": 1,
    "pack": false,
    "packItems": [],
    "nopackprice": 0,
    "customization_required": false,
    "rate": 21,
    "tax_name": "IVA ES 21%",
    "ecotax_rate": 0,
    "depends_on_stock": true,
    "quantity_available": 100,
    "unit_price": "",
    "images": [
      {
        "bySize": {
          "small_default": {
            "url": "http://localhost:8087/16-small_default/brown-bear-vector-graphics.jpg",
            "width": 98,
            "height": 98
          },
          "cart_default": {
            "url": "http://localhost:8087/16-cart_default/brown-bear-vector-graphics.jpg",
            "width": 125,
            "height": 125
          },
          "home_default": {
            "url": "http://localhost:8087/16-home_default/brown-bear-vector-graphics.jpg",
            "width": 250,
            "height": 250
          },
          "medium_default": {
            "url": "http://localhost:8087/16-medium_default/brown-bear-vector-graphics.jpg",
            "width": 452,
            "height": 452
          },
          "large_default": {
            "url": "http://localhost:8087/16-large_default/brown-bear-vector-graphics.jpg",
            "width": 800,
            "height": 800
          }
        },
        "small": {
          "url": "http://localhost:8087/16-small_default/brown-bear-vector-graphics.jpg",
          "width": 98,
          "height": 98
        },
        "medium": {
          "url": "http://localhost:8087/16-home_default/brown-bear-vector-graphics.jpg",
          "width": 250,
          "height": 250
        },
        "large": {
          "url": "http://localhost:8087/16-large_default/brown-bear-vector-graphics.jpg",
          "width": 800,
          "height": 800
        },
        "legend": "Brown bear - Vector graphics",
        "cover": "1",
        "id_image": "16",
        "position": "1",
        "associatedVariants": []
      }
    ],
    "cover": {
      "bySize": {
        "small_default": {
          "url": "http://localhost:8087/16-small_default/brown-bear-vector-graphics.jpg",
          "width": 98,
          "height": 98
        },
        "cart_default": {
          "url": "http://localhost:8087/16-cart_default/brown-bear-vector-graphics.jpg",
          "width": 125,
          "height": 125
        },
        "home_default": {
          "url": "http://localhost:8087/16-home_default/brown-bear-vector-graphics.jpg",
          "width": 250,
          "height": 250
        },
        "medium_default": {
          "url": "http://localhost:8087/16-medium_default/brown-bear-vector-graphics.jpg",
          "width": 452,
          "height": 452
        },
        "large_default": {
          "url": "http://localhost:8087/16-large_default/brown-bear-vector-graphics.jpg",
          "width": 800,
          "height": 800
        }
      },
      "small": {
        "url": "http://localhost:8087/16-small_default/brown-bear-vector-graphics.jpg",
        "width": 98,
        "height": 98
      },
      "medium": {
        "url": "http://localhost:8087/16-home_default/brown-bear-vector-graphics.jpg",
        "width": 250,
        "height": 250
      },
      "large": {
        "url": "http://localhost:8087/16-large_default/brown-bear-vector-graphics.jpg",
        "width": 800,
        "height": 800
      },
      "legend": "Brown bear - Vector graphics",
      "cover": "1",
      "id_image": "16",
      "position": "1",
      "associatedVariants": []
    },
    "has_discount": false,
    "discount_type": null,
    "discount_percentage": null,
    "discount_percentage_absolute": null,
    "discount_amount": null,
    "discount_amount_to_display": null,
    "price_amount": 10.89,
    "regular_price_amount": 10.89,
    "regular_price": "10,89 €",
    "discount_to_display": null,
    "unit_price_full": "",
    "show_availability": true,
    "availability_date": "2021-05-14",
    "availability_message": "",
    "availability": "available"
  }
]
```

To include some product value in a template, i.e. in the product list to use the field `availability` use in the Vue `<template></template>` the value of iterable product as `product.availability`.

## PrestaShop Conding Standards

To maintain coding standards after modify a PHP file run the command `php ./vendor/bin/php-cs-fixer fix _FOLDER_NAME_`.
