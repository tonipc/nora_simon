
<?php


class posnewreprintAjaxreprintModuleFrontController extends ModuleFrontController
{
    public $myerrors = array();
    public $message;

    public function postProcess()
    {
        parent::postProcess();

        $email = Tools::getValue("email-reprint");
        $id_order = Tools::getValue("orderId");

        if(!empty($email)){

            // if(!Validate::isEmail($email)){

            //     $this->myerrors = 'e-mail '.$email.' no válido';

            //     echo json_encode(array(
            //         'error' => $this->myerrors,
            //     ));

            // }
            // else{

                $send = self::dameInfoYEnvia($email, $id_order);
                $order = new Order($id_order);

                if($send){
                    $sql = 'INSERT INTO '._DB_PREFIX_.'posnewreprintlog (`email`,`order_reference`, `id_order`) values ("'.$email.'", "'.$order->getUniqReference().'", '.$id_order.')';
                    $insert = Db::getInstance()->execute($sql);
                }
                if($insert)
                    $this->message = 'email sended to '.$email;

                echo json_encode(array(
                    'status' => $this->message,
                ));
            // }
        }
    
    }

    public function dameInfoYEnvia($email, $id_order){

        $order = new Order($id_order);
        $cart = new Cart($order->id_cart);

        //Order detail list
        if (isset($order->id)) {

            $virtual_product = true;
            $product_var_tpl_list = array();
            $list_products = array();

            foreach ($cart->getProducts() as $product) {
                $price = Product::getPriceStatic((int) $product['id_product'], false, ($product['id_product_attribute'] ? (int) $product['id_product_attribute'] : null), 6, null, false, true, $product['cart_quantity'], false, (int) $order->id_customer, (int) $order->id_cart, (int) $order->{Configuration::get('PS_TAX_ADDRESS_TYPE')}, $specific_price, true, true, null, true, $product['id_customization']);
                $price_wt = Product::getPriceStatic((int) $product['id_product'], true, ($product['id_product_attribute'] ? (int) $product['id_product_attribute'] : null), 2, null, false, true, $product['cart_quantity'], false, (int) $order->id_customer, (int) $order->id_cart, (int) $order->{Configuration::get('PS_TAX_ADDRESS_TYPE')}, $specific_price, true, true, null, true, $product['id_customization']);

                $product_price = Product::getTaxCalculationMethod() == PS_TAX_EXC ? Tools::ps_round($price, 2) : $price_wt;

                $product_var_tpl = array(
                    'id_product' => $product['id_product'],
                    'reference' => $product['reference'],
                    'name' => $product['name'] . (isset($product['attributes']) ? ' - ' . $product['attributes'] : ''),
                    'price' => Tools::displayPrice($product_price * $product['quantity'], $this->context->currency, false),
                    'quantity' => $product['quantity'],
                    'customization' => array(),
                );

                if (isset($product['price']) && $product['price']) {
                    $product_var_tpl['unit_price'] = Tools::displayPrice($product_price, $this->context->currency, false);
                    $product_var_tpl['unit_price_full'] = Tools::displayPrice($product_price, $this->context->currency, false)
                        . ' ' . $product['unity'];
                } else {
                    $product_var_tpl['unit_price'] = $product_var_tpl['unit_price_full'] = '';
                }
      
                $customized_datas = Product::getAllCustomizedDatas((int) $order->id_cart, null, true, null, (int) $product['id_customization']);

                if (isset($customized_datas[$product['id_product']][$product['id_product_attribute']])) {
                    $product_var_tpl['customization'] = array();

                    //$customized_datas[$product['id_product']][$product['id_product_attribute']][$order->id_address_delivery] en muchos casos es 0
                    if (isset($customized_datas[$product['id_product']][$product['id_product_attribute']][0]))
                        $customization_address = $customized_datas[$product['id_product']][$product['id_product_attribute']][0];
                    elseif (isset($customized_datas[$product['id_product']][$product['id_product_attribute']][$order->id_address_delivery]))
                        $customization_address = $customized_datas[$product['id_product']][$product['id_product_attribute']][$order->id_address_delivery];

                    $aplica_regalo_grupos = false;
                    if (Module::isEnabled('noraregalos') && $product['id_product'] == Configuration::get('NORAREGALOS_IDS'))
                        $aplica_regalo_grupos = true;

                    foreach ($customization_address as $customization) {
                        $customization_text = '';
                        if ($aplica_regalo_grupos) {
                            $customization_text .= 'GIFT';
                        } else {
                            if (isset($customization['datas'][Product::CUSTOMIZE_TEXTFIELD])) {
                                foreach ($customization['datas'][Product::CUSTOMIZE_TEXTFIELD] as $text) {
                                    $customization_text .= '<strong>' . $text['name'] . '</strong>: ' . $text['value'] . '<br />';
                                }
                            }
                        }

                        if (isset($customization['datas'][Product::CUSTOMIZE_FILE])) {
                            $customization_text .= $this->trans('%d image(s)', array(count($customization['datas'][Product::CUSTOMIZE_FILE])), 'Admin.Payment.Notification') . '<br />';
                        }

                        $customization_quantity = (int) $customization['quantity'];

                        $product_var_tpl['customization'][] = array(
                            'customization_text' => $customization_text,
                            'customization_quantity' => $customization_quantity,
                            'quantity' => Tools::displayPrice($customization_quantity * $product_price, $this->context->currency, false),
                        );
                    }
                }

                $product_var_tpl_list[] = $product_var_tpl;
                // Check if is not a virutal product for the displaying of shipping
                if (!$product['is_virtual']) {
                    $virtual_product &= false;
                }

                $list_products[] = $product['id_product'];
            } // end foreach ($products)

            $product_list_txt = '';
            $product_list_html = '';

            if (count($product_var_tpl_list) > 0) {
                $product_list_txt = $this->getEmailTemplateContent('order_conf_product_list.txt', Mail::TYPE_TEXT, $product_var_tpl_list);
                $product_list_html = $this->getEmailTemplateContent('order_conf_product_list.tpl', Mail::TYPE_HTML, $product_var_tpl_list);
            }

            $invoice = new Address((int) $order->id_address_invoice);
            $delivery = new Address((int) $order->id_address_delivery);
            $delivery_state = $delivery->id_state ? new State((int) $delivery->id_state) : false;
            $invoice_state = $invoice->id_state ? new State((int) $invoice->id_state) : false;
            $carrier = $order->id_carrier ? new Carrier($order->id_carrier) : false;

            $data = array(
                '{firstname}' => Configuration::get('WKPOS_SHOP_NAME', 1),
                '{lastname}' => '',
                '{email}' => $email,
                '{delivery_block_txt}' => $this->_getFormatedAddress($delivery, AddressFormat::FORMAT_NEW_LINE),
                '{invoice_block_txt}' => $this->_getFormatedAddress($invoice, AddressFormat::FORMAT_NEW_LINE),
                '{delivery_block_html}' => $this->_getFormatedAddress($delivery, '<br />', array(
                    'firstname' => '<span style="font-weight:bold;">%s</span>',
                    'lastname' => '<span style="font-weight:bold;">%s</span>',
                )),
                '{invoice_block_html}' => $this->_getFormatedAddress($invoice, '<br />', array(
                    'firstname' => '<span style="font-weight:bold;">%s</span>',
                    'lastname' => '<span style="font-weight:bold;">%s</span>',
                )),
                '{delivery_company}' => $delivery->company,
                '{delivery_firstname}' => $delivery->firstname,
                '{delivery_lastname}' => $delivery->lastname,
                '{delivery_address1}' => $delivery->address1,
                '{delivery_address2}' => $delivery->address2,
                '{delivery_city}' => $delivery->city,
                '{delivery_postal_code}' => $delivery->postcode,
                '{delivery_country}' => $delivery->country,
                '{delivery_state}' => $delivery->id_state ? $delivery_state->name : '',
                '{delivery_phone}' => ($delivery->phone) ? $delivery->phone : $delivery->phone_mobile,
                '{delivery_other}' => $delivery->other,
                '{invoice_company}' => $invoice->company,
                '{invoice_vat_number}' => $invoice->vat_number,
                '{invoice_firstname}' => $invoice->firstname,
                '{invoice_lastname}' => $invoice->lastname,
                '{invoice_address2}' => $invoice->address2,
                '{invoice_address1}' => $invoice->address1,
                '{invoice_city}' => $invoice->city,
                '{invoice_postal_code}' => $invoice->postcode,
                '{invoice_country}' => $invoice->country,
                '{invoice_state}' => $invoice->id_state ? $invoice_state->name : '',
                '{invoice_phone}' => ($invoice->phone) ? $invoice->phone : $invoice->phone_mobile,
                '{invoice_other}' => $invoice->other,
                '{order_name}' => $id_order,
                '{date}' => Tools::displayDate(date('Y-m-d H:i:s'), null, 1),
                '{carrier}' => ($virtual_product || !isset($carrier->name)) ? $this->trans('No carrier', array(), 'Admin.Payment.Notification') : $carrier->name,
                '{payment}' => Tools::substr($order->payment, 0, 255),
                '{products}' => $product_list_html,
                '{products_txt}' => $product_list_txt,
                // '{discounts}' => $cart_rules_list_html,
                // '{discounts_txt}' => $cart_rules_list_txt,
                '{discounts}' => '',
                '{discounts_txt}' => '',
                '{total_paid}' => Tools::displayPrice($order->total_paid, $this->context->currency, false),
                '{total_products}' => Tools::displayPrice(Product::getTaxCalculationMethod() == PS_TAX_EXC ? $order->total_products : $order->total_products_wt, $this->context->currency, false),
                '{total_discounts}' => Tools::displayPrice($order->total_discounts, $this->context->currency, false),
                '{total_shipping}' => Tools::displayPrice($order->total_shipping, $this->context->currency, false),
                '{total_shipping_tax_excl}' => Tools::displayPrice($order->total_shipping_tax_excl, $this->context->currency, false),
                '{total_shipping_tax_incl}' => Tools::displayPrice($order->total_shipping_tax_incl, $this->context->currency, false),
                '{total_wrapping}' => Tools::displayPrice($order->total_wrapping, $this->context->currency, false),
                '{total_tax_paid}' => Tools::displayPrice(($order->total_products_wt - $order->total_products) + ($order->total_shipping_tax_incl - $order->total_shipping_tax_excl), $this->context->currency, false),
            );
            // dump($data);

     
            if ((int) Configuration::get('PS_INVOICE') && $order->invoice_number) {
                $order_invoice_list = $order->getInvoicesCollection();
                Hook::exec('actionPDFInvoiceRender', array('order_invoice_list' => $order_invoice_list));
                $pdf = new PDF($order_invoice_list, PDF::TEMPLATE_INVOICE, $this->context->smarty);
                $file_attachement['content'] = $pdf->render(false);
                $file_attachement['name'] = Configuration::get('PS_INVOICE_PREFIX', (int) $order->id_lang, null, $order->id_shop) . sprintf('%06d', $order->invoice_number) . '.pdf';
                $file_attachement['mime'] = 'application/pdf';
            // Sin adjunto para grupos con precios ocultos
            } else {
                $file_attachement = null;
            }
    
            $template_type = 'order_conf';
            $orderLanguage = new Language((int) $order->id_lang);

            return Mail::Send(
                (int) $order->id_lang,
                $template_type,
                Context::getContext()->getTranslator()->trans(
                    'Order confirmation',
                    array(),
                    'Emails.Subject',
                    $orderLanguage->locale
                ),
                $data,
                $email,
                Configuration::get('WKPOS_SHOP_NAME', 1),
                null,
                null,
                $file_attachement,
                null,
                _PS_MAIL_DIR_,
                false,
                (int) $order->id_shop
            );
        
        } 
        
    }

    public function _getFormatedAddress(Address $the_address, $line_sep, $fields_style = array())
    {
        return AddressFormat::generateAddress($the_address, array('avoid' => array()), $line_sep, ' ', $fields_style);
    }

    public function getEmailTemplateContent($template_name, $mail_type, $var)
    {

        $email_configuration = Configuration::get('PS_MAIL_TYPE');
        if ($email_configuration != $mail_type && $email_configuration != Mail::TYPE_BOTH) {
            return '';
        }

        $pathToFindEmail = array(
            _PS_THEME_DIR_ . 'mails' . DIRECTORY_SEPARATOR . $this->context->language->iso_code . DIRECTORY_SEPARATOR . $template_name,
            _PS_THEME_DIR_ . 'mails' . DIRECTORY_SEPARATOR . 'en' . DIRECTORY_SEPARATOR . $template_name,
            _PS_MAIL_DIR_ . $this->context->language->iso_code . DIRECTORY_SEPARATOR . $template_name,
            _PS_MAIL_DIR_ . 'en' . DIRECTORY_SEPARATOR . $template_name,
            _PS_MAIL_DIR_ . '_partials' . DIRECTORY_SEPARATOR . $template_name,

        );

        foreach ($pathToFindEmail as $path) {
            if (Tools::file_exists_cache($path)) {

                $this->context->smarty->assign('list', $var);

                return $this->context->smarty->fetch($path);
            }
        }

        return '';
    }

}
