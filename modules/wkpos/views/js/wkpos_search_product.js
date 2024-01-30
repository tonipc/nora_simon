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
    jQuery.fn.filterByText = function (textbox) {
        return this.each(function () {
            var select = this;
            var options = [];
            $(select).find('option').each(function () {
                options.push({
                    value: $(this).val(),
                    text: $(this).text()
                });
            });
            $(select).data('options', options);

            $(textbox).bind('change keyup', function () {
                var options = $(select).empty().data('options');
                var search = $.trim($(this).val());
                var regex = new RegExp(search, "gi");

                var empty = true
                $.each(options, function (i) {
                    var option = options[i];
                    if (option.text.match(regex) !== null) {
                        empty = false;
                        $(select).append(
                            $('<option>').text(option.text).val(option.value)
                        );
                    }
                });
                if (empty) {
                    $(select).append(
                        $('<option>').text(noProductFound).val(0)
                    );
                }
            });
        });
    };

    $(function () {
        if ($('#wkpos_searchproduct') != '') {
            $('select').filterByText($('#wkpos_searchproduct'));
        }
    });

    if ($("#table-wkpos_outlet_product").length > 0) {
        $("#table-wkpos_outlet_product > thead > tr.nodrag.nodrop.filter.row_hover > th:nth-child(6) > input").attr('pattern', '[0-9]+([\.][0-9]{0,2})?').attr('title', 'Please enter numbers only.');
    }
});
