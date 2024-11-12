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
class WkPosPaytefPaytefServicesModuleFrontController extends ModuleFrontController
{
    public $secretkey;

    public function init()
    {
        parent::init();
        $this->display_header = false;
        $this->display_footer = false;

    }

    public function displayAjaxFetchPinPadStatus()
    {
        if(Tools::getValue('posPaytefToken') == $this->module->secure_key)
        {
            $pinpad = Tools::getValue('pinpad');
            $deviceIP = Tools::getValue('deviceIP');
            $devicePort = Tools::getValue('devicePort');
            $isoCode = $this->context->language->iso_code;

            $url = 'http://' . $deviceIP . ':' . $devicePort . WkPosPaytefHelper::WK_POS_PAYTEF_PINPAD_STATUS_ENDPOINT;

            $data = [
                "language" => $isoCode,
                "pinpad" => $pinpad
            ];

            // test code with json code
            // $filePath = _PS_MODULE_DIR_ . $this->module->name . '/views/wk_paytef.json';
            // $response = json_decode(Tools::file_get_contents($filePath), true);
            // test code end

            $token = $this->getToken();
            $response = $this->getApi(WkPosPaytefHelper::WK_POS_PAYTEF_PINPAD_STATUS_ENDPOINT, $data, $token);

            // $ch = curl_init($url);
            // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            // curl_setopt($ch, CURLOPT_POST, true);
            // curl_setopt($ch, CURLOPT_HTTPHEADER, [
            //     'Content-Type: application/json',
            //     'Authorization:Bearer ' . $token,
            // ]);
            // curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

            // $response = json_decode(curl_exec($ch));

            // curl_close($ch);
            
            if(isset($response['result']['pinpads'][0]['status']) && $response['result']['pinpads'][0]['status']) {
                exit(json_encode(['status' => $response['result']['pinpads'][0]['status']])); // we have static 0 index becuase we have get the status using pinpad id
            } else {
                $result = json_encode([
                    'hasError' => true,
                    'msg' => $this->l('Pinpad staty is not getting.'),
                ]);
                exit($result);
            }

        } else {
            $result = json_encode([
                'hasError' => true,
                'msg' => $this->l('You are not allowed to this page.'),
            ]);
            exit($result);
        }
    }

    public function getToken()
    {
        $function = '/authorize/';
        $data = array(
            'secretKey' => 'XQ3zULKIRsIBJEI1qOpjUs6mnCWUq5RWHoYvcg9r',
            'accessKey' => 'MS43M3c='
        );

        $result = $this->getApi($function, $data);

        if (isset($result['result'])) {
            return $result['result']['token'];
        }

        return false;
    }

    public function getApi($function = '', $data = array(), $token = false)
    {
        $url =  Tools::getValue('deviceIP');
        $cURLConnection = curl_init();

        $headers = array('Content-Type:application/json');

        if ($token) {
            $headers[] = 'Authorization:Bearer ' . $token;
        }

        curl_setopt_array($cURLConnection, array(
            CURLOPT_URL => $url . $function,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($data, JSON_UNESCAPED_UNICODE),
            CURLOPT_HTTPHEADER => $headers,
        ));

        $result = curl_exec($cURLConnection);
        $err = curl_error($cURLConnection);

        curl_close($cURLConnection);

        if ($err) {
            return array('error' => $err);
        }

        $jsonArrayResponse = json_decode($result, true);
        // $jsonArrayResponse = $result;

        return $jsonArrayResponse;
    }

    public function displayAjaxStartPytefTransaction()
    {
        if(Tools::getValue('posPaytefToken') == $this->module->secure_key)
        {
            $pinpad = Tools::getValue('pinpad');
            $deviceIP = Tools::getValue('deviceIP');
            $devicePort = Tools::getValue('devicePort');
            $amount = Tools::getValue('amount');
            $idCart = (int)Tools::getValue('id_cart');
            $transactionReference = $idCart . '-' . time();
            $isoCode = $this->context->language->iso_code;

            $url = 'http://' . $deviceIP . ':' . $devicePort . WkPosPaytefHelper::WK_POS_PAYTEF_TRANSACTION_START;

            $data = [
                "cardNumberHashDomain" => "branch",
                "createReceipt" => true,
                "executeOptions" => [
                    "method" => "polling",
                ],
                "language" =>  $isoCode,
                "opType" => "sale",
                "pinpad" => $pinpad,
                "receiptOptions" => [
                    "uiOptions" => [
                        "enablePaperPrint" => true,
                    ],
                ],
                "requestedAmount" => $amount * 100, //Amount of the transaction in cents of euros. For example 299 indicates 2.99 euros
                "requireConfirmation" => false,
                "transactionReference" =>  $transactionReference
            ];


            // test code with json code
            // $filePath = _PS_MODULE_DIR_ . $this->module->name . '/views/wk_paytef_transaction_start.json';
            // $response = json_decode(Tools::file_get_contents($filePath), true);
            $token = $this->getToken();
            $response = $this->getApi(WkPosPaytefHelper::WK_POS_PAYTEF_TRANSACTION_START, $data, $token);

            // test code end

            /*
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

            $response = json_decode(curl_exec($ch));

            curl_close($ch);
            */

            if(isset($response['info']['started']) && $response['info']['started']) {

                $objWkPosPaytefTransaction = new WkPosPaytefTransaction();
                $objWkPosPaytefTransaction->id_cart = trim($idCart);
                $objWkPosPaytefTransaction->id_order = 0; // empty when start the transaction
                $objWkPosPaytefTransaction->amount = trim($amount);
                $objWkPosPaytefTransaction->reference = trim($transactionReference);
                $objWkPosPaytefTransaction->acquirerID = ''; // empty when start the transaction
                $objWkPosPaytefTransaction->pinpadID = trim($pinpad);
                $objWkPosPaytefTransaction->transaction_response = json_encode($response['info']);
                $objWkPosPaytefTransaction->save();

                exit(json_encode(['status' => $response['info']['started']]));
            } else {
                $result = json_encode([
                    'hasError' => true,
                    'msg' => $this->l('Transaction not started.'),
                ]);
                exit($result);
            }


        } else {
            $result = json_encode([
                'hasError' => true,
                'msg' => $this->l('You are not allowed to this page.'),
            ]);
            exit($result);
        }
    }

    public function displayAjaxPaytefTransactionStatus()
    {
        if(Tools::getValue('posPaytefToken') == $this->module->secure_key)
        {
            $pinpad = Tools::getValue('pinpad');
            $deviceIP = Tools::getValue('deviceIP');
            $devicePort = Tools::getValue('devicePort');

            $url = 'http://' . $deviceIP . ':' . $devicePort . WkPosPaytefHelper::WK_POS_PAYTEF_TRANSACTION_POLL;

            $data = [
                "pinpad" => $pinpad,

            ];

            // test code with json code
            // $filePath = _PS_MODULE_DIR_ . $this->module->name . '/views/wk_paytef_transaction_poll.json';
            // $response = json_decode(Tools::file_get_contents($filePath), true);

            $token = $this->getToken();
            $response = $this->getApi(WkPosPaytefHelper::WK_POS_PAYTEF_TRANSACTION_POLL, $data, $token);

            // test code end

            /*
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

            $response = json_decode(curl_exec($ch));

            curl_close($ch);
            */

            if(isset($response) && $response) {
                exit(json_encode($response));

            } else {
                $result = json_encode([
                    'hasError' => true,
                    'msg' => $this->l('Something went wrong, transaction status is not getting.'),
                ]);
                exit($result);
            }


        } else {
            $result = json_encode([
                'hasError' => true,
                'msg' => $this->l('You are not allowed to this page.'),
            ]);
            exit($result);
        }
    }

    public function displayAjaxPaytefTransactionResult()
    {
        if(Tools::getValue('posPaytefToken') == $this->module->secure_key)
        {
            $pinpad = Tools::getValue('pinpad');
            $deviceIP = Tools::getValue('deviceIP');
            $devicePort = Tools::getValue('devicePort');
            $idCart = Tools::getValue('id_cart');

            $url = 'http://' . $deviceIP . ':' . $devicePort . WkPosPaytefHelper::WK_POS_PAYTEF_TRANSACTION_RESULT;

            $data = [
                "pinpad" => $pinpad,

            ];

            // test code with json code
            $filePath = _PS_MODULE_DIR_ . $this->module->name . '/views/wk_paytef_transaction_result.json';
            // $response = json_decode(Tools::file_get_contents($filePath), true);

            $token = $this->getToken();
            $response = $this->getApi(WkPosPaytefHelper::WK_POS_PAYTEF_TRANSACTION_RESULT, $data, $token);

            // test code end

            /*
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

            $response = json_decode(curl_exec($ch));

            curl_close($ch);
            */

            if(isset($response['info'], $response['result']) && $response['info'] && $response['result']) {

                $transactionDetail = WkPosPaytefTransaction::getTransactionDetailByIdCart((int) $idCart, $pinpad);
                $objWkPosPaytefTransaction = new WkPosPaytefTransaction($transactionDetail[0]['id_wkpos_paytef_transaction']);
                $objWkPosPaytefTransaction->acquirerID = trim($response['result']['acquirerID']); // empty when start the transaction
                $objWkPosPaytefTransaction->transaction_response = json_encode($response['result']);
                $objWkPosPaytefTransaction->save();

                exit(json_encode($response['result']));
            } else {
                $result = json_encode([
                    'hasError' => true,
                    'msg' => $this->l('Something went wrong, transaction status is not getting.'),
                ]);
                exit($result);
            }


        } else {
            $result = json_encode([
                'hasError' => true,
                'msg' => $this->l('You are not allowed to this page.'),
            ]);
            exit($result);
        }
    }
}
