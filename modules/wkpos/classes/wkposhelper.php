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
class WkPosHelper
{
    public static function generateISBN()
    {
        $prefix = '978'; // International Standard Book Number prefix
        $group = '0'; // Group identifier (0 for English language books)
        $publisher = str_pad(rand(0, 99999), 5, '0', STR_PAD_LEFT); // Publisher identifier (5 digits)
        $title = str_pad(rand(0, 99999), 5, '0', STR_PAD_LEFT); // Title identifier (5 digits)
        $checkDigit = self::generateCheckDigit($prefix . $group . $publisher . $title); // Check digit calculation
        // return $prefix . "-" . $group . "-" . $publisher . "-" . $title . "-" . $checkDigit;
        $isbn = $prefix . '-' . $publisher . '-' . $title;
        $isbn = str_replace('-', '', $isbn);
        $isAlreadyAvailable = self::checkIsbnAlreadyAssigned($isbn);
        if (!in_array($isbn, $isAlreadyAvailable)) {
            return $isbn;
        } else {
            return self::generateISBN();
        }
    }

    public static function generateUPC()
    {
        $upc = '';
        // Generate the first 10 digits randomly
        for ($i = 0; $i < 10; ++$i) {
            $upc .= mt_rand(0, 9);
        }
        // Calculate the 11th check digit
        $sum = 0;
        for ($i = 0; $i < 10; $i += 2) {
            $sum += $upc[$i];
        }
        $sum *= 3;
        for ($i = 1; $i < 9; $i += 2) {
            $sum += $upc[$i];
        }
        $checksum = (10 - ($sum % 10)) % 10;
        // Append the check digit to complete the UPC
        $upc .= $checksum;
        $isAlreadyAvailable = self::checkUpcAlreadyAssigned($upc);
        if (!in_array($upc, $isAlreadyAvailable)) {
            return $upc;
        } else {
            return self::generateUPC();
        }
    }

    public static function generateEAN()
    {
        $prefix = '2'; // You can change the prefix here
        $ean = $prefix;
        // Generate random digits for the EAN-13 code
        for ($i = 1; $i <= 11; ++$i) {
            $ean .= rand(0, 9);
        }
        // Calculate the check digit
        $sum = 0;
        for ($i = 0; $i < 12; ++$i) {
            $weight = ($i % 2 === 0) ? 1 : 3;
            $sum += $weight * (int) $ean[$i];
        }
        $checkDigit = (10 - ($sum % 10)) % 10;
        $ean .= $checkDigit;
        $isAlreadyAvailable = self::checkEanAlreadyAssigned($ean);
        if (!in_array($ean, $isAlreadyAvailable)) {
            return $ean;
        } else {
            return self::generateEAN();
        }
    }

    public static function generateCheckDigit($isbn)
    {
        $isbn = str_replace('-', '', $isbn); // Remove hyphens from the ISBN
        $sum = 0;
        for ($i = 0; $i < 12; ++$i) {
            $digit = (int) substr($isbn, $i, 1);
            $factor = ($i % 2 == 0) ? 1 : 3; // Apply alternating factor of 1 or 3
            $sum += $digit * $factor;
        }
        $remainder = $sum % 10;
        $checkDigit = (10 - $remainder) % 10;

        return $checkDigit;
    }

    public static function getAllProducts()
    {
        $sql = 'SELECT `id_product` FROM `' . _DB_PREFIX_ . 'product`';
        $result = Db::getInstance()->executeS($sql);

        return $result;
    }

    public static function checkIsbnAlreadyAssigned()
    {
        $product = 'SELECT `isbn` FROM `' . _DB_PREFIX_ . 'product` p WHERE isbn !=""';
        $result = Db::getInstance()->executeS($product);

        $productAttr = 'SELECT `isbn` FROM `' . _DB_PREFIX_ . 'product_attribute` pa WHERE isbn !=""';
        $resultAttr = Db::getInstance()->executeS($productAttr);

        return array_merge($result, $resultAttr);
    }

    public static function checkUpcAlreadyAssigned()
    {
        $product = 'SELECT `upc` FROM `' . _DB_PREFIX_ . 'product` p WHERE upc !=""';
        $result = Db::getInstance()->executeS($product);

        $productAttr = 'SELECT `upc` FROM `' . _DB_PREFIX_ . 'product_attribute` pa WHERE upc !=""';
        $resultAttr = Db::getInstance()->executeS($productAttr);

        return array_merge($result, $resultAttr);
    }

    public static function checkEanAlreadyAssigned()
    {
        $product = 'SELECT `ean13` FROM `' . _DB_PREFIX_ . 'product` p WHERE ean13 !=""';
        $result = Db::getInstance()->executeS($product);

        $productAttr = 'SELECT `ean13` FROM `' . _DB_PREFIX_ . 'product_attribute` pa WHERE ean13 !=""';
        $resultAttr = Db::getInstance()->executeS($productAttr);

        return array_merge($result, $resultAttr);
    }

    public static function getProductAttributes($idProduct)
    {
        return Db::getInstance()->executeS(
            'SELECT `id_product_attribute`, `isbn`, `upc`, `ean13` FROM `' . _DB_PREFIX_ . 'product_attribute`
            WHERE `id_product` =' . (int) $idProduct
        );
    }

    public static function updateBarcodesForNewProduct($idProduct)
    {
        if ($idProduct != null) {
            $objProduct = new Product($idProduct);
            if ($objProduct->isbn == '') {
                $objProduct->isbn = WkPosHelper::generateISBN();
                $objProduct->save();
            }
            if ($objProduct->upc == '' || $objProduct->upc == null) {
                $objProduct->upc = WkPosHelper::generateUPC();
                $objProduct->save();
            }
            if ($objProduct->ean13 == '' || $objProduct->ean13 == null) {
                $objProduct->ean13 = WkPosHelper::generateEAN();
                $objProduct->save();
            }

            if ($objProduct->hasCombinations()) {
                $combinations = WkPosHelper::getProductAttributes($idProduct);
                foreach ($combinations as $combination) {
                    if ($combination['isbn'] == '' || $combination['isbn'] == null) {
                        $objAttr = new Combination($combination['id_product_attribute']);
                        $objAttr->isbn = WkPosHelper::generateISBN();
                        $objAttr->save();
                    }
                    if ($combination['upc'] == '' || $combination['upc'] == null) {
                        $objAttr = new Combination($combination['id_product_attribute']);
                        $objAttr->upc = WkPosHelper::generateUPC();
                        $objAttr->save();
                    }
                    if ($combination['ean13'] == '' || $combination['ean13'] == null) {
                        $objAttr = new Combination($combination['id_product_attribute']);
                        $objAttr->ean13 = WkPosHelper::generateEAN();
                        $objAttr->save();
                    }
                }
            }

            return true;
        }
    }
}
