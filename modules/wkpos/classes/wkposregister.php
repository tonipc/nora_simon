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
class WkPosRegister extends ObjectModel
{
    public const OPEN = 1;
    public const CLOSE = 2;

    public $id_wkpos_outlet;
    public $id_employee;
    public $id_currency;
    public $status;
    public $opening_date;
    public $closing_date;

    public static $definition = [
        'table' => 'wkpos_register',
        'primary' => 'id_wkpos_register',
        'multilang' => false,
        'fields' => [
            'id_wkpos_outlet' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'id_employee' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'id_currency' => [
                'type' => self::TYPE_INT,
                'required' => true,
                'validate' => 'isNullOrUnsignedId',
                'size' => 10,
            ],
            'status' => ['type' => self::TYPE_INT, 'required' => true, 'size' => 2],
            'opening_date' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat', 'required' => true],
            'closing_date' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat'],
        ],
    ];

    public function getCurrentRegister($idWkPosOutlet, $idEmployee = false, $active = true)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('wkpos_register', 'wpr');
        if ($idEmployee) {
            $sql->where('wpr.`id_employee` IN (' . pSQL($idEmployee) . ')');
        }
        $sql->where('wpr.`id_wkpos_outlet` = ' . (int) $idWkPosOutlet);
        if ($active) {
            $sql->where('wpr.`status` = ' . (int) self::OPEN);
        }
        $sql->orderBy('wpr.`id_wkpos_register` DESC');

        return Db::getInstance()->getRow($sql);
    }

    public function getRegisterOpeningDetail($idRegister, $active = false)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('wkpos_register', 'wpr');
        $sql->where('wpr.`id_wkpos_register` = ' . (int) $idRegister);
        if ($active) {
            $sql->where('wpr.`status` = ' . (int) self::OPEN);
        }
        $sql->orderBy('wpr.`id_wkpos_register` DESC');

        return Db::getInstance()->getRow($sql);
    }

    public function getRegisterReference()
    {
        $controlPanel = $this->id . ' - ' . $this->opening_date;
        $objModule = Module::getInstanceByName('wkpos');

        return $objModule->l('Reference') . ': ' . $objModule->l('POS') . '/' . $controlPanel;
    }

    public function getRegisterDetails()
    {
        $sql = new DbQuery();
        $sql->select('*, a.`opening_date` as `reference`');
        $sql->from('wkpos_register', 'a');
        $sql->innerjoin('wkpos_outlets', 'wo', 'wo.`id_wkpos_outlet` = a.`id_wkpos_outlet`');
        $sql->where('a.`id_wkpos_register` = ' . (int) $this->id);
        $sql->orderBy('a.`id_wkpos_register` DESC');

        return Db::getInstance()->executeS($sql);
    }

    public function getRegisterPdfDetail($idRegister)
    {
        $objCashMovement = new WkPosCashMovement();
        $objRegisterOrder = new WkPosRegisterOrder();
        $objOutlet = new WkPosOutlets($this->id_wkpos_outlet);
        $objCurrency = new Currency($this->id_currency);
        $objEmployee = new Employee($this->id_employee);

        $objModule = Module::getInstanceByName('wkpos');
        $controlPanel = $this->id . ' - ' . $this->opening_date;
        $registerReference = $objModule->l('POS') . '/' . $controlPanel;

        $data = [
            'outletName' => $objOutlet->name,
            'openingDate' => $this->opening_date,
            'closingDate' => $this->closing_date,
            'salesPerson' => $objEmployee->firstname . ' ' . $objEmployee->lastname,
            'registerReference' => $registerReference,
            'openingAmount' => $objCashMovement->getTotalAmount(
                $idRegister,
                $objCurrency,
                WkPosCashMovement::OPENING
            ),
            'closingAmount' => $objCashMovement->getTotalAmount(
                $idRegister,
                $objCurrency,
                WkPosCashMovement::CLOSING
            ),
            'depositAmount' => $objCashMovement->getTotalAmount(
                $idRegister,
                $objCurrency,
                WkPosCashMovement::DEPOSIT
            ),
            'withdrawAmount' => $objCashMovement->getTotalAmount(
                $idRegister,
                $objCurrency,
                WkPosCashMovement::WITHDRAW
            ),
        ];

        if ($this->status != self::CLOSE) {
            $data['closingDate'] = '';
        }

        $paymentMethod = $objRegisterOrder->getRegisterPayment($idRegister);
        if ($paymentMethod) {
            $paymentTotal = [];
            foreach ($paymentMethod as $payment) {
                $paymentTotal[] = [
                    'name' => $payment['name'],
                    'openingBalance' => $objCashMovement->getTotalAmount(
                        $idRegister,
                        $objCurrency,
                        WkPosCashMovement::OPENING,
                        $payment['id_wkpos_payment']
                    ),
                    'closingBalance' => $objCashMovement->getTotalAmount(
                        $idRegister,
                        $objCurrency,
                        WkPosCashMovement::CLOSING,
                        $payment['id_wkpos_payment']
                    ),
                    'transactions' => $objRegisterOrder->getTotalAmount(
                        $idRegister,
                        $objCurrency,
                        $payment['id_wkpos_payment']
                    ),
                ];
            }
            $paymentTotal[] = [
                'name' => $objModule->l('Total'),
                'openingBalance' => $objCashMovement->getTotalAmount(
                    $idRegister,
                    $objCurrency,
                    WkPosCashMovement::OPENING
                ),
                'closingBalance' => $objCashMovement->getTotalAmount(
                    $idRegister,
                    $objCurrency,
                    WkPosCashMovement::CLOSING
                ),
                'transactions' => $objRegisterOrder->getTotalAmount(
                    $idRegister,
                    $objCurrency
                ),
                'isTotal' => true,
            ];
            $data['paymentMethod'] = $paymentTotal;
        }

        return $data;
    }
}
