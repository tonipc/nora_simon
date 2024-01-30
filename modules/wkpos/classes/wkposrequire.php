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
require_once dirname(__FILE__) . '/wkposcashpayment.php';
require_once dirname(__FILE__) . '/wkposorder.php';
require_once dirname(__FILE__) . '/wkpospayment.php';
require_once dirname(__FILE__) . '/wkposdashboard.php';
require_once dirname(__FILE__) . '/wkposoutlets.php';
require_once dirname(__FILE__) . '/wkposoutletemployee.php';
require_once dirname(__FILE__) . '/wkposcustomer.php';
require_once dirname(__FILE__) . '/wkposoutletproduct.php';
require_once dirname(__FILE__) . '/wkposoutletproductattribute.php';
require_once dirname(__FILE__) . '/wkposoutletcategory.php';
require_once dirname(__FILE__) . '/wkposdb.php';
require_once dirname(__FILE__) . '/wkposinstallment.php';
require_once dirname(__FILE__) . '/wkposorderpayment.php';
require_once dirname(__FILE__) . '/wkposcustomerphone.php';
require_once dirname(__FILE__) . '/wkposcustomproduct.php';
require_once dirname(__FILE__) . '/wkposcustomposvalues.php';
require_once dirname(__FILE__) . '/wkposhelper.php';

// Cash register classes
require_once dirname(__FILE__) . '/wkposregister.php';
require_once dirname(__FILE__) . '/wkposregisterorder.php';
require_once dirname(__FILE__) . '/wkposcashmovement.php';
require_once dirname(__FILE__) . '/wkposuser.php';
require_once dirname(__FILE__) . '/HTMLTemplateCashRegister.php';
// Cash register classes end

if (Module::isInstalled('wkposloyalty')) {
    include_once dirname(__FILE__) . '/../../wkposloyalty/classes/WkprRequiredClasses.php';
}

if (Module::isInstalled('wkposnf')) {
    include_once dirname(__FILE__) . '/../../wkposnf/classes/wkrequiredclasses.php';
}
