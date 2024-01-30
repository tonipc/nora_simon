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
class WkPosLoginModuleFrontController extends ModuleFrontController
{
    public $shopWiseLoginLink;
    public $wkIdShop;
    public $shopWiseSaleLink;

    /**
     * Disable the header, footer, left column, right column
     *
     * @return void
     */
    public function init()
    {
        parent::init();
        $this->display_column_left = false;
        $this->display_header = false;
        $this->display_footer = false;
        $this->display_column_right = false;
        $this->addJquery();
        $this->wkIdShop = Context::getContext()->shop->id;
        $this->shopWiseLoginLink = $this->context->link->getModuleLink(
            'wkpos',
            'login',
            [],
            null,
            null,
            $this->wkIdShop,
            false
        );
        $this->shopWiseSaleLink = $this->context->link->getModuleLink(
            'wkpos',
            'sale',
            [],
            null,
            null,
            $this->wkIdShop,
            false
        );
    }

    /**
     * Set the variable for js and css
     *
     * @return void
     */
    public function initContent()
    {
        parent::initContent();
        if (isset($this->context->cookie->id_wkpos_outlet_employee)
            && $this->context->cookie->id_wkpos_outlet_employee
        ) {
            Tools::redirect($this->shopWiseSaleLink);
        }
        $jsFiles = [];
        $cssFiles = [];
        $jsFiles['jqueryLib'] = _PS_JS_DIR_ . 'jquery/jquery-1.11.0.min.js';
        $jsFiles['jqueryMigarateLib'] = _PS_JS_DIR_ . 'jquery/jquery-migrate-1.2.1.min.js';
        $jsFiles['validateJs'] = _PS_JS_DIR_ . 'validate.js';
        $jsFiles['customJs'] = _MODULE_DIR_ . 'wkpos/views/js/login.js';
        $jsFiles['growlJs'] = _MODULE_DIR_ . 'wkpos/views/js/jquery.growl.js';
        $jsFiles['bootstrapJsUrl'] = _MODULE_DIR_ . 'wkpos/views/js/bootstrap.min.js';
        $cssFiles['bootstrapcss_url'] = _MODULE_DIR_ . 'wkpos/views/css/bootstrap.min.css';
        $cssFiles['customCss'] = _MODULE_DIR_ . 'wkpos/views/css/custom.css';
        $cssFiles['growlCss'] = _MODULE_DIR_ . 'wkpos/views/css/jquery.growl.css';
        $cssFiles['iconCss'] = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

        $jsVariables = [
            'posToken' => $this->module->secure_key,
        ];
        $this->context->smarty->assign('form_action', $this->shopWiseLoginLink);

        $this->context->smarty->assign(
            [
                'logoPng' => _MODULE_DIR_ . '/wkpos/logo.png',
                'jsFiles' => $jsFiles,
                'jsVariables' => $jsVariables,
                'cssFiles' => $cssFiles,
                'pageName' => 'login-pos',
                'shopName' => Configuration::get('WKPOS_SHOP_NAME'),
                'posToken' => $this->module->secure_key,
            ]
        );

        if ($email = Tools::getValue('email')) {
            $this->context->smarty->assign('email', $email);
        }
        if ($password = Tools::getValue('password')) {
            $this->context->smarty->assign('password', $password);
        }

        // For reset password feature
        if ($reset_token = Tools::getValue('reset_token')) {
            $this->context->smarty->assign('reset_token', $reset_token);
        }
        if ($id_employee = Tools::getValue('id_employee')) {
            $this->context->smarty->assign('id_employee', $id_employee);
            $employee = new Employee($id_employee);
            if (Validate::isLoadedObject($employee)) {
                $this->context->smarty->assign('reset_email', $employee->email);
            }
        }

        $this->setTemplate('module:wkpos/views/templates/front/loginpos.tpl');
    }

    /**
     * Process the data according to the condition
     *
     * @return void
     */
    public function postProcess()
    {
        parent::postProcess();
        if (Tools::getValue('ajax')) {
            if (Tools::getValue('posToken') == $this->module->secure_key) {
                if (Tools::getValue('action') == 'login') {
                    $this->processLogin();
                } elseif (Tools::getValue('action') == 'forgot') {
                    $this->processForgot();
                } elseif (Tools::getValue('action') == 'reset') {
                    $this->processReset();
                } elseif (Tools::getValue('action') == 'signRequest') {
                    $this->processSignRequest();
                } elseif (Tools::getValue('action') == 'updateEmployeePassword') {
                    $action = Tools::getValue('action');
                    $this->$action();
                }
            } else {
                $this->errorInvalidAcess();
            }
            exit;
        }
        if (Tools::getValue('poslogout')) {
            $objEmployee = new WkPosOutletEmployee($this->context->cookie->id_wkpos_outlet_employee);
            Context::getContext()->cookie->__destruct();
            $objEmployee->logout();
            Tools::redirect($this->shopWiseLoginLink);
        }
    }

    public function processSignRequest()
    {
        $KEY = _PS_MODULE_DIR_ . 'wkpos/views/certs/poskey.pkey';
        $req = Tools::getValue('request');
        $privateKey = openssl_get_privatekey(Tools::file_get_contents($KEY), 'password');
        $signature = null;
        openssl_sign($req, $signature, $privateKey, 'sha512'); // Use "sha1" for QZ Tray 2.0 and older
        if ($signature) {
            header('Access-Control-Allow-Origin: *');
            header('Content-type: text/plain');
            echo base64_encode($signature);
            exit(0);
        }
        echo '<h1>Error signing message</h1>';
        exit(1);
    }

    /**
     * check he employee credentials and process the login and redirect to the sale
     *
     * @return void
     */
    public function processLogin()
    {
        /* Check fields validity */
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $passwd = trim(Tools::getValue('passwd'));
            $email = trim(Tools::getValue('email'));
            if (empty($email)) {
                $this->errors[] = $this->module->l('Please enter email.', 'login');
            } elseif (!Validate::isEmail($email)) {
                $this->errors[] = $this->module->l('Please enter valid email address.', 'login');
            }

            if (empty($passwd)) {
                $this->errors[] = $this->module->l('Please enter password.', 'login');
            } elseif (!Validate::isPlaintextPassword($passwd)) {
                $this->errors[] = $this->module->l('Please enter valid password.', 'login');
            }
            if (!count($this->errors)) {
                // Find employee
                $this->context->employee = new Employee();
                $is_employee_loaded = $this->context->employee->getByEmail($email, $passwd);
                $employee_associated_shop = $this->context->employee->getAssociatedShops();
                $idOutletEmployee = WkPosOutletEmployee::getIdOutletEmployee($this->context->employee->id);
                if (!empty($idOutletEmployee)) {
                    $outletEmployee = new WkPosOutletEmployee($idOutletEmployee);
                    $objOutlet = new WkPosOutlets($outletEmployee->id_wkpos_outlet);
                } else {
                    $outletEmployee = new WkPosOutletEmployee($idOutletEmployee);
                    $objOutlet = new WkPosOutlets($outletEmployee->id_wkpos_outlet);
                }

                if (!$is_employee_loaded) {
                    $this->errors[] =
                    $this->module->l('The employee does not exist, or the password provided is incorrect.', 'login');
                    $this->context->employee->logout();
                } elseif (empty($employee_associated_shop) && !$this->context->employee->isSuperAdmin()) {
                    $this->errors[] = $this->module->l('This employee does not manage the shop anymore.', 'login');
                    $this->context->employee->logout();
                } elseif (!in_array($this->wkIdShop, $employee_associated_shop)) {
                    $this->errors[] = $this->module->l('This employee does not manage this shop.', 'login');
                    $this->context->employee->logout();
                } elseif (empty($idOutletEmployee)
                    || (isset($outletEmployee)
                    && empty($outletEmployee->id_wkpos_outlet))
                    || !$objOutlet->active
                ) {
                    $this->errors[] =
                    $this->module->l('This employee does not manage the pos outlet shop anymore.', 'login');
                    $this->context->employee->logout();
                } elseif ((int) $objOutlet->id_shop != (int) $this->context->shop->id) {
                    $this->errors[] = $this->module->l('This employee does not manage the shop.', 'login');
                    $this->context->employee->logout();
                } else {
                    PrestaShopLogger::addLog(
                        sprintf(
                            $this->module->l('Back Office connection from wkpos', 'login'),
                            Tools::getRemoteAddr()
                        ),
                        1,
                        null,
                        '',
                        0,
                        true,
                        (int) $this->context->employee->id
                    );

                    $this->context->employee->remote_addr = (int) ip2long(Tools::getRemoteAddr());
                    // Update cookie
                    $cookie = Context::getContext()->cookie;
                    $cookie->id_employee = $this->context->employee->id;
                    $cookie->email = $this->context->employee->email;
                    $cookie->profile = $this->context->employee->id_profile;
                    $cookie->passwd = $this->context->employee->passwd;
                    $cookie->remote_addr = $this->context->employee->remote_addr;
                    $cookie->id_wkpos_outlet_employee = $idOutletEmployee;
                    $cookie->id_outlet_employee = $idOutletEmployee;
                    $cookie->id_wkpos_outlet = $outletEmployee->id_wkpos_outlet;

                    if (!Tools::getValue('stay_logged_in')) {
                        $cookie->last_activity = time();
                    }

                    $cookie->write();
                    $url = $this->shopWiseSaleLink;
                    if (Tools::isSubmit('ajax')) {
                        exit(json_encode(['hasErrors' => false, 'redirect' => $url]));
                    } else {
                        $this->redirect_after = $url;
                    }
                    Tools::redirect($this->shopWiseSaleLink);
                }
            }

            if (!empty($this->errors)) {
                $this->context->smarty->assign(
                    [
                        'errors' => $this->errors,
                        'nbErrors' => count($this->errors),
                    ]
                );
                if (Tools::isSubmit('ajax')) {
                    exit(json_encode(['hasErrors' => true, 'errors' => $this->errors]));
                }
            }
        } else {
            $this->errorInvalidAcess();
        }
    }

    /**
     * Process the forgot password and send mail to the employee for password reset
     *
     * @return void
     */
    public function processForgot()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            if (_PS_MODE_DEMO_) {
                $this->errors[] = $this->module->l('This functionality has been disabled.', 'login');
            } elseif (!($email = trim(Tools::getValue('email_forgot')))) {
                $this->errors[] = $this->module->l('Email is empty.', 'login');
            } elseif (!Validate::isEmail($email)) {
                $this->errors[] = $this->module->l('Invalid email address.', 'login');
            } else {
                $employee = new Employee();
                if (!$employee->getByEmail($email) || !$employee) {
                    $this->errors[] = $this->module->l('This account does not exist.', 'login');
                }
            }

            if (!count($this->errors)) {
                if (!$employee->hasRecentResetPasswordToken()) {
                    $employee->stampResetPasswordToken();
                    $employee->update();
                }
                $loginUrl = $this->context->link->getModuleLink(
                    'wkpos',
                    'login',
                    [
                        'id_employee' => (int) $employee->id,
                        'reset_token' => $employee->reset_password_token,
                    ]
                );

                $params = [
                    '{email}' => $employee->email,
                    '{lastname}' => $employee->lastname,
                    '{firstname}' => $employee->firstname,
                    '{url}' => $loginUrl,
                ];

                if (Mail::Send(
                    $employee->id_lang,
                    'password_query',
                    $this->module->l('Your new password', 'login'),
                    $params,
                    $employee->email,
                    $employee->firstname . ' ' . $employee->lastname
                )
                ) {
                    // Update employee only if the mail can be sent
                    Shop::setContext(Shop::CONTEXT_SHOP, (int) min($employee->getAssociatedShops()));
                    exit(json_encode([
                        'hasErrors' => false,
                        'confirm' => $this->module->l('Please check your mail for reset your password.', 'login'),
                    ]));
                } else {
                    exit(json_encode([
                        'hasErrors' => true,
                        'errors' => [
                            $this->module->l('An error occurred while attempting to reset your password.', 'login'),
                        ],
                    ]));
                }
            } elseif (Tools::isSubmit('ajax')) {
                exit(json_encode(['hasErrors' => true, 'errors' => $this->errors]));
            }
        } else {
            $this->errorInvalidAcess();
        }
    }

    /**
     * Update the employee password details set by the employee
     *
     * @return void
     */
    public function updateEmployeePassword()
    {
        if (Tools::getValue('posToken') == $this->module->secure_key) {
            $employee = new Employee((int) Tools::getValue('id_employee'));
            $newPasswd = trim(Tools::getValue('passwd'));
            $confPasswd = trim(Tools::getValue('passwd2'));
            if (!Validate::isLoadedObject($employee)
                && !Validate::isPlaintextPassword(Tools::getvalue('passwd'), Validate::ADMIN_PASSWORD_LENGTH)
            ) {
                $this->errors[] = sprintf(
                    $this->module->l('The password must be at least %s characters long.', 'login'),
                    Validate::ADMIN_PASSWORD_LENGTH
                );
            }

            $currentPassword = trim(Tools::getValue('old_passwd'));
            if (empty($currentPassword)) {
                $this->errors[] = $this->module->l('Please enter current password.', 'login');
            } elseif (empty($newPasswd)) {
                $this->errors[] = $this->module->l('Please enter new password.', 'login');
            } elseif (empty($confPasswd)) {
                $this->errors[] = $this->module->l('Please enter confirm password.', 'login');
            } elseif (empty($newPasswd)
                || (empty($currentPassword)
                // || !Validate::isPasswdAdmin($currentPassword) should not be used
                || !$employee->getByEmail($employee->email, $currentPassword))
            ) {
                $this->errors[] = $this->module->l('Your current password is invalid.', 'login');
            } elseif (empty($newPasswd)) {
                $this->errors[] = $this->module->l('Password Required');
            } elseif ($newPasswd && (!$confPasswd || $newPasswd !== $confPasswd)) {
                $this->errors[] = $this->module->l('The confirmation password does not match.', 'login');
            } elseif (!Validate::isPlaintextPassword($newPasswd)) {
                $this->errors[] = $this->module->l('Please enter valid password.', 'login');
            }
            if (empty($this->errors)) {
                $value = $newPasswd;
                if (!empty($value)) {
                    $employee->passwd = $this->get('hashing')->hash($value, _COOKIE_KEY_);
                    $employee->last_passwd_gen = date('Y-m-d H:i:s', time());
                }
                $result = $employee->update();
                if ($result) {
                    $employee->removeResetPasswordToken(); // Delete temporary reset token
                    $employee->update();
                }
                $this->ajaxRender(
                    json_encode(
                        [
                            'success' => $this->module->l('Password updated successfully.', 'login'),
                            'hasErrors' => false,
                        ]
                    )
                );
            } else {
                $this->ajaxRender(
                    json_encode(
                        [
                            'errors' => $this->errors,
                            'hasErrors' => true,
                        ]
                    )
                );
            }
        } else {
            $this->errorInvalidAcess();
        }
    }

    /**
     * Generate the error for invalid token access
     *
     * @return void
     */
    public function errorInvalidAcess()
    {
        $this->errors[] = $this->module->l('Invalid access token.', 'login');
        $this->ajaxRender(
            json_encode(
                [
                    'errors' => $this->errors,
                    'hasErrors' => true,
                ]
            )
        );
    }

    /**
     * Reset the password of an employee
     *
     * @return void
     */
    public function processReset()
    {
        if (_PS_MODE_DEMO_) {
            $this->errors[] = $this->module->l('This functionality has been disabled.', 'login');
        } elseif (!($reset_token_value = trim(Tools::getValue('reset_token')))) {
            // hidden fields
            $this->errors[] = $this->module->l('Some identification information is missing.', 'login');
        } elseif (!($id_employee = trim(Tools::getValue('id_employee')))) {
            $this->errors[] = $this->module->l('Some identification information is missing.', 'login');
        } elseif (!($resetEmail = trim(Tools::getValue('reset_email')))) {
            $this->errors[] = $this->module->l('Some identification information is missing.', 'login');
        } elseif (!($resetPassword = trim(Tools::getValue('reset_passwd')))) {
            // password (twice)
            $this->errors[] = $this->module->l('The password is missing: please enter your new password.', 'login');
        } elseif (!Validate::isPlaintextPassword($resetPassword)) {
            $this->errors[] = $this->module->l('The password is not in a valid format.', 'login');
        } elseif (!($resetConfirm = trim(Tools::getValue('reset_confirm')))) {
            $this->errors[] =
            $this->module->l('The confirmation is empty: please fill in the password confirmation as well.', 'login');
        } elseif ($resetPassword !== $resetConfirm) {
            $this->errors[] =
            $this->module->l('The password and its confirmation not match please check both passwords.', 'login');
        } else {
            $employee = new Employee();
            $timeBack = Configuration::get('PS_PASSWD_TIME_BACK');
            if (!$employee->getByEmail($resetEmail) || !$employee || $employee->id != $id_employee) {
                // check matching employee id with its email
                $this->errors[] = $this->module->l('This account does not exist.', 'login');
            } elseif ((strtotime($employee->last_passwd_gen . '+' . $timeBack . ' minutes') - time()) > 0) {
                $this->errors[] = sprintf(
                    $this->module->l('You can reset password every %d minute(s) only please try again later.', 'login'),
                    Configuration::get('PS_PASSWD_TIME_BACK')
                );
            } elseif ($employee->getValidResetPasswordToken() !== $reset_token_value) {
                // To update password, we must have the temporary reset token that matches.
                $this->errors[] = $this->module->l('Your password reset request expired. Please start again.', 'login');
            }
        }

        if (!count($this->errors)) {
            $employee->passwd = $this->get('hashing')->hash($resetPassword, _COOKIE_KEY_);
            $employee->last_passwd_gen = date('Y-m-d H:i:s', time());

            $params = [
                '{email}' => $employee->email,
                '{lastname}' => $employee->lastname,
                '{firstname}' => $employee->firstname,
            ];

            if (Mail::Send(
                $employee->id_lang,
                'password',
                $this->module->l('Your new password', 'login'),
                $params,
                $employee->email,
                $employee->firstname . ' ' . $employee->lastname
            )
            ) {
                // Update employee only if the mail can be sent
                Shop::setContext(Shop::CONTEXT_SHOP, (int) min($employee->getAssociatedShops()));

                $result = $employee->update();
                if (!$result) {
                    $this->errors[] =
                    $this->module->l('An error occurred while attempting to change your password.', 'login');
                } else {
                    $employee->removeResetPasswordToken(); // Delete temporary reset token
                    $employee->update();
                    exit(json_encode([
                        'hasErrors' => false,
                        'confirm' => $this->module->l('The password has been changed successfully.', 'login'),
                    ]));
                }
            } else {
                exit(json_encode([
                    'hasErrors' => true,
                    'errors' => [$this->module->l('An error occurred while attempting to change your password.', 'login')],
                ]));
            }
        } elseif (Tools::isSubmit('ajax')) {
            exit(json_encode(['hasErrors' => true, 'errors' => $this->errors]));
        }
    }
}
