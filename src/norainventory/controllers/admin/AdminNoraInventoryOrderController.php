<?php

use Module\NoraInventory\Classes\PrintPDF;

class AdminNoraInventoryOrderController extends ModuleAdminController
{
    public function __construct()
    {
        $this->bootstrap = true;
        $this->table = 'order_detail';
        $this->className = 'OrderDetail';
        $this->lang = false;
        // $this->addRowAction('view');
        $this->explicitSelect = true;
        $this->allow_export = true;
        $this->deleted = false;

        parent::__construct();

        $this->_select = '
        o.`date_add` AS `date_add`, o.`id_currency`, a.`id_order_detail` AS `id_pdf`, GROUP_CONCAT(DISTINCT a.`id_order_detail` SEPARATOR \'-\') AS pedidos, o.`id_order` AS `reference`,
        CONCAT(c.`firstname`,SPACE(1), c.`lastname`) AS `customer`,
        osl.`name` AS `osname`,
        a.`send_to_shargo` AS `shargo`,
    		os.`color`,
    		country_lang.`name` AS `cname`,
    		IF(o.valid, 1, 0) badge_success,
        a.`product_quantity` AS `product_quantity`,
        a.`product_name` AS `product_name`,
        DATE(cd.`value`) AS `delivery_date`,
        ods.`printed` AS `printed`, a.`send_to_shargo`,
        address.company AS `company_address`,
        mm.message,
        gl.name AS `group_name`
        ';

        // CONCAT(pk.quantity, "x ", pl.`name`) as `item_name`,

        $this->_join = '
        LEFT JOIN `' . _DB_PREFIX_ . 'order_detail_status` ods ON (ods.`id_order_detail` = a.`id_order_detail`)
        LEFT JOIN `' . _DB_PREFIX_ . 'orders` o ON (o.`id_order` = a.`id_order`)
        LEFT JOIN `' . _DB_PREFIX_ . 'customized_data` cd ON (cd.`id_customization` = a.`id_customization`)
        LEFT JOIN `' . _DB_PREFIX_ . 'customer` c ON (c.`id_customer` = o.`id_customer`)
        LEFT JOIN `' . _DB_PREFIX_ . 'group_lang` gl ON (gl.`id_group` = c.`id_default_group` AND gl.id_lang = 1)
    		INNER JOIN `' . _DB_PREFIX_ . 'address` address ON address.id_address = o.id_address_delivery
    		INNER JOIN `' . _DB_PREFIX_ . 'country` country ON address.id_country = country.id_country
    		INNER JOIN `' . _DB_PREFIX_ . 'country_lang` country_lang ON (country.`id_country` = country_lang.`id_country` AND country_lang.`id_lang` = ' . (int) $this->context->language->id . ')
    		LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON (os.`id_order_state` = ods.`id_order_detail_status`)
    		LEFT JOIN `' . _DB_PREFIX_ . 'order_state_lang` osl ON (ods.`id_order_detail_status` = osl.`id_order_state` AND osl.`id_lang` = ' . (int) $this->context->language->id . ')
        LEFT JOIN `' . _DB_PREFIX_ . 'message` mm ON (mm.`id_order` = a.`id_order` AND  mm.`private` = 0)
        ';

        // LEFT JOIN `'._DB_PREFIX_.'product_lang` pl ON (pl.`id_product` = pk.`id_product_item` AND pl.`id_lang` = '.(int)$this->context->language->id.')

        $tomorrow = date('Y-m-d', strtotime('tomorrow'));
        $this->_where = '
        AND cd.`value` <> "" ';

        $this->_orderBy = 'id_order_detail'; //'delivery_date'
        $this->_orderWay = 'DESC';
        $this->_use_found_rows = true;
        $this->_group .= 'GROUP BY a.`id_order`, cd.value';

        //Get current statuses array names to display them
        $statuses = OrderState::getOrderStates((int) $this->context->language->id);
        foreach ($statuses as $status) {
            $this->statuses_array[$status['id_order_state']] = $status['name'];
        }

        $this->fields_list = [
            'date_add' => [
                'title' => $this->module->l('Date'),
                'align' => 'text-right',
                'type' => 'datetime',
                'filter_key' => 'a!date_add',
            ],
            'reference' => [
                'title' => $this->module->l('ID order'),
                'align' => 'text-center',
                'class' => 'fixed-width-xs',
            ],
            'customer' => [
                'title' => $this->module->l('Customer'),
                'havingFilter' => true,
            ],
            'id_order_detail' => [
                'title' => $this->module->l('SubOrder ID'),
                'align' => 'text-center',
                'class' => 'fixed-width-xs',
            ],
            'pedidos' => [
                'title' => $this->module->l('SubOrder IDs'),
                'align' => 'text-center',
                'class' => 'fixed-width-xs',
            ],
            'delivery_date' => [
                'title' => $this->module->l('Delivery Date'),
                'align' => 'text-center',
                'type' => 'text',
                'filter_key' => 'cd!value',
            ],
            'company' => [
                'title' => $this->module->l('Group name'),
                'align' => 'text-center',
                'type' => 'text',
                'filter_key' => 'gl!name',
            ],
          /*  'product_quantity' => [
                'title' => $this->module->l('Num paquetes'),
                'search' => false,
                'orderby' => false,
            ],
            'product_name' => [
                'title' => $this->module->l('Product Name'),
            ],*/

            'osname' => [
                'title' => $this->module->l('Status'),
                'type' => 'select',
                'color' => 'color',
                'list' => $this->statuses_array,
                'filter_key' => 'os!id_order_state',
                'filter_type' => 'int',
                'order_key' => 'osname',
            ],
            /*'printed' => [
                'title' => $this->module->l('Printed'),
                'align' => 'text-center',
                'active' => 'status',
                'type' => 'bool',
                'orderby' => false,
                'filter_key' => 'ods!printed',
            ],*/
            'printed' => [
              "title" => $this->module->l('Printed'),
            "align" => "text-right",
            "filter_key" => "ods!printed",
            'callback' => 'callbackPrinted',
            "type" => "select",
            "list" => array(
                0 => 0,
                1 => 1)
            ],


            'id_pdf' => [
                'title' => $this->module->l('PDF'),
                'align' => 'text-center',
                'callback' => 'printPDFIcons',
                'orderby' => false,
                'search' => false,
                'remove_onclick' => true,
            ],
            'send_to_shargo' => [
              "title" => "Shargo",
            "align" => "text-right",
            "filter_key" => "a!send_to_shargo",
            'callback' => 'callbackShargo',
            "type" => "select",
            "list" => array(
                0 => 0,
                1 => 1)
            ],
            'message' => [
                'title' => $this->module->l('message'),
                'type' => 'text',
                "align" => "text-right",
                'filter_key' => 'mm!message', //|escape:\'html\':\'UTF-8\'

            ],
        ];

         $this->bulk_actions = [
             'printOrders' => [
                 'text' => $this->module->l('Imprimir pedidos (Actualizar para ver estado correctamente)'),
                 'icon' => 'icon-print'
             ],
             'DeliverSubOrders' => [
                 'text' => $this->module->l('Marcar pedidos como entregados'),
                 'icon' => 'icon-rocket'
             ],
             'MarkUnprinted' => [
                 'text' => $this->module->l('Marcar pedidos como NO impresos'),
                 'icon' => 'icon-print'
             ],
             'Cancelado' => [
                 'text' => $this->module->l('Marcar pedidos como cancelados'),
                 'icon' => 'icon-exclamation',
                 'confirm' => $this->l('Marcar como impresos estos pedidos?')
             ],
         ];
    }

    /**
     * Change object status (active, inactive)
     *
     * @return ObjectModel|false
     *
     * @throws PrestaShopException
     */
    public function processStatus()
    {
        if (Validate::isLoadedObject($object = $this->loadObject())) {
            $sql = new DbQuery();
            $sql->select('*');
            $sql->from('order_detail_status');
            $sql->where('`id_order_detail` = ' . (int) $object->id_order_detail);

            $idOrderDetailStatus = Db::getInstance()->executeS($sql);


            if ($idOrderDetailStatus) {
                $where = '`id_order_detail` = ' . (int) $object->id_order_detail .
                ' AND `id_order_detail_status` = ' . (int) $idOrderDetailStatus[0]['id_order_detail_status'];

                $printValue = '0';

                if ( $idOrderDetailStatus[0]['printed'] == '0')
                {
                    $printValue = '1';
                }
                Db::getInstance()->update('order_detail_status', [
                    'printed' => $printValue,
                ], $where);

            } else {
                Db::getInstance()->insert('order_detail_status', [
                    'printed' => 1,
                    'id_order_detail' => (int) $object->id_order_detail,
                ]);
            }
        }

        return $object;
    }

    // public function processBulkPrintOrder()
    // {

    // }

    public function processGenerateOrderDetailPdf()
    {
        $idOrderDetail = (int) Tools::getValue('id_order_detail');

        $orderDetail = new OrderDetail($idOrderDetail);

        if (!Validate::isLoadedObject($orderDetail)) {
            throw new PrestaShopException($this->module->l('Error while trying to load order detail object'));
        }

        $pdf = new PrintPDF($orderDetail, PrintPDF::TEMPLATE_QUOTE, $this->context->smarty);
        $pdf->render();
    }

    public function processBulkprintOrders()
    {
        //Get the boxes ticked
        if (is_array($this->boxes) && !empty($this->boxes)) {

            $order_details_list = [];
            $sqlplus = '(';
            foreach ($this->boxes as $id) {

                //Set printed to one
                //delete previous order_detail_status, if exists
               /* Db::getInstance()->delete('order_detail_status', [
                    'id_order_detail' => (int) $id,
                ]); */
                //Db::getInstance()->delete('order_detail_status', 'id_order_detail = '.(int) $id);
                //and update  to 1
            /*    Db::getInstance()->insert('order_detail_status', [
                    'printed' => 1,
                    'id_order_detail' => (int) $id,
                ]);*/

                //Aquí poner un foreach para que ponga todos los sub order details que corresponden
                $data = $this->generateData($id);
                foreach ($data[0] as $id_detail){
                  Db::getInstance()->update('order_detail_status', [
                      'printed' => 1], ' id_order_detail ='. $id_detail
                  );
                }

                //add to array to print
                array_push($order_details_list, new OrderDetail($id) );

            }

            ////////// ID_SUBORDER -> ID_DEFAULT_GROUP -> ORDERNAR. Quizás se puede hacer antes del loop y luego entrear otra vez al loop para generar los PDFs

            $pdf = new PrintPDF($order_details_list, PrintPDF::TEMPLATE_QUOTE, $this->context->smarty);
            $pdf->render();





        }
        Tools::redirectAdmin(self::$currentIndex . '&conf=4&token=' . $this->token);

        //return $object;

    }

    public function processBulkMarkUnprinted()
    {
        //Get the boxes ticked
        if (is_array($this->boxes) && !empty($this->boxes)) {

            $order_details_list = [];
            $sqlplus = '(';
            foreach ($this->boxes as $id) {

                //Set printed to one
                //delete previous order_detail_status, if exists
               /* Db::getInstance()->delete('order_detail_status', [
                    'id_order_detail' => (int) $id,
                ]); */
                //Db::getInstance()->delete('order_detail_status', 'id_order_detail = '.(int) $id);
                //and update  to 1
            /*    Db::getInstance()->insert('order_detail_status', [
                    'printed' => 1,
                    'id_order_detail' => (int) $id,
                ]);*/

                Db::getInstance()->update('order_detail_status', [
                    'printed' => 0], ' id_order_detail ='. $id
                );
                //add to array to print
                array_push($order_details_list, new OrderDetail($id) );
            }




        }
        Tools::redirectAdmin(self::$currentIndex . '&conf=4&token=' . $this->token);

        //return $object;

    }

    public static function setOrderCurrency($echo, $tr)
    {
        $order = new Order($tr['id_order']);

        return Tools::displayPrice($echo, (int) $order->id_currency);
    }

    public function printPDFIcons($idOrderDetail, $tr)
    {
        $action = '';

        $this->context->smarty->assign([
            'idOrderDetail' => (int) $idOrderDetail,
        ]);

        return $this->createTemplate('_print_pdf_icon.tpl')->fetch();
    }

    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);
    }


    public function callbackShargo($value)
    {
        if ($value==1) {
            return '<span class="label label-primary">SENT</span>'; //#00aff0
        }
        else {
          return '<span class="label color_field" style="background-color:#DC143C;color:white">NOT SENT</span>';
        }


    }

    public function callbackPrinted($value)
    {
        if ($value==1) {
            return '<span class="label color_field" style="background-color:#009f08;color:white">PRINTED</span>'; //#00aff0
        }
        else {
          return '<span class="label color_field" style="background-color:#DC143C;color:white">NOT PRINTED</span>';
        }


    }

    public function processBulkDeliverSubOrders()
    {
        //Get the boxes ticked
        if (is_array($this->boxes) && !empty($this->boxes)) {

            foreach ($this->boxes as $id) {

                $data = $this->generateData($id);
                // Now update all these order details to sent
                switch ((int) $data[1] )
                {
                  case 28: //Ticket restaurant
                    $status = 29; //Pendiente Ticket restaurant
                  case 6: //Cancelado
                    $status = 6; //Cancelado, no se debería cambiar desde aquí
                  default:
                    $status = 5;
                    break;
                }
                Db::getInstance()->update('order_detail_status', ['id_order_detail_status' => (int) $status], ' id_order_detail IN ('. implode(",", array_values($data[0])) .')');

                //FALTARÁ AÑADIR UN COMPROBANTE DEL STATUS DEL PEDIDO GENERAL; SI TODOS LOS COMPONENTES TIENEN EL MISMO ESTATUS, DEBERÁ CAMBIARSE EN LA ORDER_ID
                //var_dump($this->checkOrder($data[2]));
                if ($this->checkOrder($data[2]))
                {
                  //Change to that status the whole order
                  $history = new OrderHistory();
                  $history->id_order = $data[2];
                  $history->id_employee = (int) 22; //Pongo el ID del noreply
                  $history->changeIdOrderState((int) $status, $data[2]); /// This way it will call opinat
                  Hook::exec('actionOrderStatusUpdate', array('newOrderStatus' => $status, 'id_order' => (int) $data[2]), null, false, true, false, 1);
                  $history->save();
                }

            }

        }

        if (!count($this->errors)) {
            Tools::redirectAdmin(self::$currentIndex . '&conf=4&token=' . $this->token);
        }

    }

    public function processBulkCancelado() //FALTARA AÑADIR LA DEVOLUCIÓN DEL IMPORTE
    {
        //Get the boxes ticked   ----- , 'confirm' => $this->l('Marcar como impresos estos pedidos?')
        if (is_array($this->boxes) && !empty($this->boxes)) {

            foreach ($this->boxes as $id) {


              $data = $this->generateData($id);

              // Now update all these order details to canceled

              Db::getInstance()->update('order_detail_status', ['id_order_detail_status' => 6], ' id_order_detail IN ('. implode(",", array_values($data[0])) .')');

              //var_dump($this->checkOrder($data[2]));
              if ($this->checkOrder($data[2]))
              {
                //Change to that status the whole order
                $history = new OrderHistory();
                $history->id_order = $data[2];
                $history->id_employee = (int) 22; ///Pongo el ID del noreply
                $history->changeIdOrderState((int) 6, $data[2]);
                Hook::exec('actionOrderStatusUpdate', array('newOrderStatus' => 6, 'id_order' => (int) $data[2]), null, false, true, false, 1);
                $history->save();
              }

            }

        }

        if (!count($this->errors)) {
            Tools::redirectAdmin(self::$currentIndex . '&conf=4&token=' . $this->token);
        }

    }

    public function generateData($id) //Use this function to get information about an order status from its id_order_detail
    {
      // First get order ID from id_order_detail
      $sql = new DbQuery();
      $sql->select('id_order, delivery_date');
      $sql->from('order_detail');
      $sql->where('`id_order_detail` = ' . (int) $id);
      $order_data = Db::getInstance()->executeS($sql);

      // Now get the current status
      $sql = new DbQuery();
      $sql->select('id_order_detail_status');
      $sql->from('order_detail_status');
      $sql->where('`id_order_detail` = ' . (int) $id);
      $current_status = Db::getInstance()->executeS($sql);

      // Now get the list of order details
      $sql = new DbQuery();
      $sql->select('id_order_detail');
      $sql->from('order_detail');
      $sql->where('`id_order` = ' . (int) $order_data[0]['id_order'] . ' AND `delivery_date` = \'' . (string) $order_data[0]['delivery_date'].'\'');
      $order_details = Db::getInstance()->executeS($sql);

      //Generate list of order details
      $order_detail_list = [];
      foreach ($order_details as $o)
      {
        array_push($order_detail_list,$o['id_order_detail']);
      }
      return array($order_detail_list, $current_status, $order_data[0]['id_order']);
    }

    public function checkOrder($idorder)
    {
      $sql = new DbQuery();
      $sql->select('id_order_detail_status');
      $sql->from('order_detail_status');
      $sql->where('`id_order` = ' . (int) $idorder);
      $sql->groupBy('`id_order_detail_status`');
      $current_status = Db::getInstance()->executeS($sql);
      if (count($current_status)==1)
      {
        $val = (bool) true;
      }
      else {
        {
          $val = (bool) false;
        }
      }
      return $val;
    }


}
