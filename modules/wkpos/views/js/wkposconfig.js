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

$(document).ready(function () {
    $('.wkpos_config_tab').hide();
    var tab = current_config_tab;
    if (tab == undefined || tab == '') {
        var tab = 'generalConfig';
    }
    $('#wkpos_config_tab_' + tab).addClass('active');
    $('#wkpos_config_' + tab).show();
    $(".config_tab_link").on("click", function (e) {
        var tab = $(this).data('tab');
        if (tab == "doc") {
            // do nothing
        } else {
            $('.wkpos_config_tab').hide();
            $('#wkpos_config_tab_' + tab).removeClass('active');
            $('#wkpos_config_' + tab).show();
            $('#current_config_tab').val(tab);
            current_config_tab = tab;
        }
    });
});
