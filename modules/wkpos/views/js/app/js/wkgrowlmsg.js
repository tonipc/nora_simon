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

// import $ from 'jquery';
// import growl from '../../js/jquery.growl.js';

export function showErrorMsg(msg) {
    growl.error({ title: "", message: msg });
}

export function showSuccessMsg(msg) {
    growl.notice({ title: "", message: msg });
}

export function showWarningMsg(msg) {
    growl.warning({ title: "", message: msg });
}
