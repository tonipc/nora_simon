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
class WkPosRegisterModuleFrontController extends ModuleFrontController
{
    public $idWkPosOutlet;
    public $idEmployee;
    public $idOutletEmployee;
    public $idWkPosRegister;

    public function initContent()
    {
        if (Tools::getValue('ajax')) {
            if (Tools::getValue('posToken') == $this->module->secure_key) {
                $this->idWkPosOutlet = $this->context->cookie->id_wkpos_outlet;
                $this->idEmployee = $this->context->cookie->id_employee;
                $this->idOutletEmployee = $this->context->cookie->id_outlet_employee;
                if ($this->idWkPosOutlet) {
                    $objRegister = new WkPosRegister();
                    $currentRegister = $objRegister->getCurrentRegister($this->idWkPosOutlet, $this->idEmployee);
                    if ($currentRegister) {
                        $this->idWkPosRegister = trim($currentRegister['id_wkpos_register']);
                    }
                }

                return parent::initContent();
            } else {
                $response = [
                    'hasError' => true,
                    'errors' => [$this->l('Invalid Token')],
                ];
                $this->posAjaxDie($response);
            }
        } else {
            return parent::initContent();
        }
    }

    public function displayAjaxOpenCashRegister()
    {
        $amount = trim(Tools::getValue('amount'));
        $note = trim(Tools::getValue('note'));
        if (empty($amount)) {
            $amount = 0;
        } elseif (!Validate::isPrice($amount)) {
            $this->errors[] = $this->l('Please enter valid amount (must be less then 11 digit).');
        }
        if ($note) {
            if (!Validate::isGenericName($note)) {
                $this->errors[] = $this->l('Please enter valid note.');
            } elseif (Tools::strlen($note) >= 255) {
                $this->errors[] = $this->l('Note should be less than 255 character.');
            }
        }
        if (empty($this->errors)) {
            $objRegister = new WkPosRegister();
            $currentRegister = $objRegister->getCurrentRegister($this->idWkPosOutlet, $this->idEmployee);
            $response = [];
            if (empty($currentRegister)) {
                $objRegister->id_wkpos_outlet = $this->idWkPosOutlet;
                $objRegister->id_employee = $this->idEmployee;
                $objRegister->id_currency = $this->context->currency->id;
                $objRegister->status = WkPosRegister::OPEN;
                $objRegister->opening_date = date('Y-m-d H:i:s');
                $objRegister->save();
                if ($objRegister->id) {
                    $objCashMovement = new WkPosCashMovement();
                    $objCashMovement->id_wkpos_register = $objRegister->id;
                    $objCashMovement->id_wkpos_payment = WkPosCashMovement::CASH;
                    $objCashMovement->type = WkPosCashMovement::OPENING;
                    $objCashMovement->amount = $amount;
                    $objCashMovement->note = $note;
                    $objCashMovement->save();
                    $response = [
                        'hasError' => false,
                        'msg' => $this->l('Successfully opened.'),
                        'register' => $this->module->getRegisterDetails($objRegister->id),
                    ];
                } else {
                    $response = [
                        'hasError' => true,
                        'errors' => [
                            $this->l('There is some problem while opening register. Please try again after sometime.'),
                        ],
                    ];
                }
            } else {
                $response = [
                    'hasError' => false,
                    'msg' => $this->l('Cash register is already opened.'),
                    'register' => $this->module->getRegisterDetails($currentRegister['id_wkpos_register']),
                ];
            }
        } else {
            $response = [
                'hasError' => true,
                'errors' => $this->errors,
            ];
        }
        $this->posAjaxDie($response);
    }

    public function displayAjaxCloseCashRegister()
    {
        $idRegister = Tools::getValue('id_wkpos_register');
        if ($idRegister != $this->idWkPosRegister) {
            $this->errors[] = $this->l('Invalid Cash Register');
        }
        if (empty($this->errors)) {
            $objRegister = new WkPosRegister($idRegister);
            $objRegister->status = WkPosRegister::CLOSE;
            $objRegister->closing_date = date('Y-m-d H:i:s');
            $objRegister->save();
            $response = [
                'hasError' => false,
                'msg' => $this->l('Closed Successfully'),
            ];
        } else {
            $response = [
                'hasError' => true,
                'errors' => $this->errors,
            ];
        }
        $this->posAjaxDie($response);
    }

    public function posAjaxDie($response)
    {
        $this->ajaxDie(json_encode($response));
    }

    public function displayAjaxAddCashMovement()
    {
        $amount = trim(Tools::getValue('amount'));
        $note = trim(Tools::getValue('note'));
        $idWkPosRegister = trim(Tools::getValue('id_wkpos_register'));
        if ($idWkPosRegister != $this->idWkPosRegister) {
            $this->errors[] = $this->l('Invalid cash register.');
        }
        if (!Validate::isPrice($amount)) {
            $this->errors[] = $this->l('Please enter valid amount.');
        }
        if ($note) {
            if (!Validate::isGenericName($note)) {
                $this->errors[] = $this->l('Please enter valid Note');
            } elseif (Tools::strlen($note) >= 255) {
                $this->errors[] = $this->l('Note should be less than 255 character');
            }
        }
        if (empty($this->errors)) {
            $type = trim(Tools::getValue('type'));
            $objCashMovement = new WkPosCashMovement();
            $objCashMovement->id_wkpos_register = $idWkPosRegister;
            $objCashMovement->id_wkpos_payment = WkPosCashMovement::CASH;
            $objCashMovement->type = $type;
            $objCashMovement->amount = $amount;
            $objCashMovement->note = $note;
            $objCashMovement->save();
            $response = [
                'hasError' => false,
                'msg' => $type == 2 ? $this->l('Successfully Added') : $this->l('Successfully withdrawn.'),
                'cashMovement' => $this->module->getCashMovement($idWkPosRegister),
            ];
        } else {
            $response = [
                'hasError' => true,
                'errors' => $this->errors,
            ];
        }
        $this->posAjaxDie($response);
    }

    public function displayAjaxGetRegisterDetails()
    {
        if (Tools::getValue('id_wkpos_register') != $this->idWkPosRegister) {
            $this->errors[] = $this->l('Invalid cash register, please reload the page.');
        }
        if ($this->errors) {
            $response = [
                'hasError' => true,
                'errors' => $this->errors,
            ];
        } else {
            $response = [
                'hasError' => false,
                'register' => $this->module->getRegisterDetails($this->idWkPosRegister),
                'cashMovement' => $this->module->getCashMovement($this->idWkPosRegister),
                'registerOrders' => $this->module->getRegisterOrder($this->idWkPosRegister),
                'voucherAmount' => $this->module->getRegisterVouchersAmount($this->idWkPosRegister),
                'paymentDetails' => WkPosPayment::getActivePaymentDetail(),
                'posUsers' => $this->module->getAllUsers(),
            ];
        }
        $this->posAjaxDie($response);
    }

    public function displayAjaxGetOrderMovement()
    {
        $idWkPosregister = Tools::getValue('id_wkpos_register');
        $idWkPosPayment = Tools::getValue('id_wkpos_payment');
        $objRegisterOrder = new WkPosRegisterOrder();
        $registerOrders = $objRegisterOrder->getRegisterOrderMovement($idWkPosregister, $idWkPosPayment);
        $cashMovements = $this->module->getCashMovement($idWkPosregister);
        $cashMovementData = [];
        foreach ($cashMovements as $key => $cashMovement) {
            if ($cashMovement['type'] != WkPosCashMovement::CLOSING) {
                if ($cashMovement['id_wkpos_payment'] == $idWkPosPayment) {
                    $cashMovementData[$key] = [];
                    $cashMovementData[$key]['amount'] = $cashMovement['amount'];
                    if ($cashMovement['type'] == WkPosCashMovement::OPENING) {
                        $cashMovementData[$key]['type'] = $this->l('Opening balance');
                    } elseif ($cashMovement['type'] == WkPosCashMovement::DEPOSIT) {
                        $cashMovementData[$key]['type'] = $this->l('Deposit');
                    } elseif ($cashMovement['type'] == WkPosCashMovement::WITHDRAW) {
                        $cashMovementData[$key]['type'] = $this->l('Withdraw');
                    } elseif ($cashMovement['type'] == WkPosCashMovement::CLOSING) {
                        $cashMovementData[$key]['type'] = $this->l('Closing');
                    }
                    if (empty($cashMovement['note'])) {
                        $cashMovementData[$key]['reason'] = $cashMovementData[$key]['type'];
                    } else {
                        $cashMovementData[$key]['reason'] = $cashMovement['note'];
                    }
                    $cashMovementData[$key]['transaction_date'] = $cashMovement['date_add'];
                }
            }
        }
        $registerOrdersData = [];
        foreach ($registerOrders as $key => $order) {
            $registerOrdersData[$key] = [];
            $registerOrdersData[$key]['amount'] = $order['amount'];
            if ($order['type'] == WkPosOrderPayment::MONEY_IN) {
                $registerOrdersData[$key]['type'] = $this->l('Money In');
                $registerOrdersData[$key]['reason'] = $this->l('Order') . '/#' . $order['reference'];
            } elseif ($order['type'] == WkPosOrderPayment::MONEY_OUT) {
                $registerOrdersData[$key]['type'] = $this->l('Money Out');
                $registerOrdersData[$key]['reason'] = $this->l('Order Return') . '/#' . $order['reference'];
            }
            $registerOrdersData[$key]['transaction_date'] = $order['date_add'];

            // wkposnf525 module
            if (Module::isInstalled('wkposnf') && Module::isEnabled('wkposnf')) {
                $digitalSign = WkOrderNf::getDigitalSignByOrderReference($order['reference']);
                $registerOrdersData[$key]['digital_sign'] = $digitalSign ? $digitalSign : '--';
            }
        }
        $paymentdetails = array_merge($cashMovementData, $registerOrdersData);
        usort($paymentdetails, [$this, 'dateCompare']);
        $response = [
            'hasError' => false,
            'paymentDetails' => $paymentdetails,
        ];
        $this->posAjaxDie($response);
    }

    public function dateCompare($firstRow, $secondRow)
    {
        $t1 = strtotime($firstRow['transaction_date']);
        $t2 = strtotime($secondRow['transaction_date']);

        return $t1 - $t2;
    }

    public function displayAjaxSaveClosingBalance()
    {
        $paymentDetails = Tools::getValue('paymentDetails');
        if ($paymentDetails) {
            $idCashRegister = Tools::getValue('id_wkpos_register');
            $this->validateClosingDetails($paymentDetails);
            if (empty($this->errors)) {
                $this->saveClosingDetails($paymentDetails, $idCashRegister);
                $response = [
                    'hasError' => false,
                    'msg' => $this->l('Saved successfully'),
                    'cashMovement' => $this->module->getCashMovement($this->idWkPosRegister),
                ];
            } else {
                $response = [
                    'hasError' => true,
                    'errors' => $this->errors,
                ];
            }
        } else {
            $response = [
                'hasError' => true,
                'errors' => [$this->l('There is no payment method')],
            ];
        }
        $this->posAjaxDie($response);
    }

    public function validateClosingDetails($paymentDetails)
    {
        $idWkPosRegister = trim(Tools::getValue('id_wkpos_register'));
        if ($idWkPosRegister != $this->idWkPosRegister) {
            $this->errors[] = $this->l('Invalid Cash Register');
        }
        foreach ($paymentDetails as $payment) {
            if (!Validate::isPrice($payment['amount'])) {
                $this->errors[] = $this->l('Please enter valid amount.');
            }
        }
    }

    public function saveClosingDetails($paymentDetails, $idCashRegister)
    {
        foreach ($paymentDetails as $idPayment => $payment) {
            $objCashMovement = new WkPosCashMovement();
            $closingDetail = $objCashMovement->getCashMovement(
                $idCashRegister,
                WkPosCashMovement::CLOSING,
                $idPayment,
                true
            );
            if ($payment['amount'] != 0 || $closingDetail) {
                if ($closingDetail) {
                    $objCashMovement = new WkPosCashMovement($closingDetail['id_wkpos_cash_movement']);
                }
                $objCashMovement->amount = $payment['amount'];
                $objCashMovement->id_wkpos_register = $idCashRegister;
                $objCashMovement->id_wkpos_payment = $idPayment;
                $objCashMovement->type = WkPosCashMovement::CLOSING;
                $objCashMovement->note = '';
                $objCashMovement->save();
            }
        }
    }

    public function displayAjaxDownloadPdf()
    {
        $idWkPosRegister = Tools::getValue('id_wkpos_register');
        $objPosRegister = new WkPosRegister($idWkPosRegister);
        if ($idWkPosRegister && $objPosRegister->id == $idWkPosRegister) {
            $createRegisterPdf = new PDF(
                $objPosRegister,
                HTMLTemplateCashRegister::REGISTER_TEMPLATE,
                $this->context->smarty
            );
            $createRegisterPdf->render();
            exit;
        }
    }
}
