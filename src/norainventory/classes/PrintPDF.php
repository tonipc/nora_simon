<?php

namespace Module\NoraInventory\Classes;

use HTMLTemplate;
use HTMLTemplateOrderDetail;
use PDF;
use PrestaShopException;

class PrintPDF extends PDF
{
    const TEMPLATE_QUOTE = 'OrderDetail';

    public function getTemplateObject($object)
    {
        $class = false;
        $class_name = 'Module\\NoraInventory\\Classes\\HTMLTemplate' . $this->template;

        if (class_exists($class_name)) {
            // Some HTMLTemplateXYZ implementations won't use the third param but this is not a problem (no warning in PHP),
            // the third param is then ignored if not added to the method signature.
            /** @var HTMLTemplateOrderDetail */
            $class = new $class_name($object, $this->smarty, $this->send_bulk_flag);

            if (!($class instanceof HTMLTemplate)) {
                throw new PrestaShopException('Invalid class. It should be an instance of HTMLTemplate');
            }
        }

        return $class;
    }
}
