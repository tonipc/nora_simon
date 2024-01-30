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

import $ from 'jquery';

export function displayImageDrag(productImage, thisthis) {
    if ((typeof thisthis != 'undefined') && thisthis) {
        var product_offset = $(thisthis).offset();
        var product_top = product_offset.top - $(window).scrollTop();
        var product_left = product_offset.left - $(window).scrollLeft();

        $('#home > ul').animate({ scrollTop: $('#home > ul').prop("scrollHeight") }, 500);
        $.posting({
            image_path: productImage,
            product_left: product_left,
            product_top: product_top
        });
        $(document).find("#wkpos-cart-panel").animate({ scrollTop: $(document).find('#wkpos-cart-panel > div').height() }, 1000);
    }
}


var pospb_defaults = {
    'pospb': {
        'id': 'pospb',
        'container': 'body',
        'template': '<div></div>',
        'class': 'posProductBlock',
        'css': {
            'position': 'fixed',
            'zIndex': 998
        }
    },

    'post': {
        'template': '<img src="%image_path%" width="50" height="50">',

        'remove': function ($post, callback) {
            return $post.animate({
                opacity: '0',
                padding: '0px',
                margin: '0px',
                height: '0px'
            }, {
                duration: 500,
                complete: callback
            });
        }
    },

    'timeout': 500
};

$(document).ready(function () {
    $.posting = function (options) {
        var $poster = $(pospb_defaults.pospb.template).css(pospb_defaults.pospb.css).addClass(pospb_defaults.pospb.class);
        $(pospb_defaults.pospb.container).append($poster);
        var $post = $(pospb_defaults.post.template.replace('%image_path%', options.image_path));

        $poster.append($post);

        var cart_offset = $('.wk-cart-product-details .wkpos-scrollbar li.active').offset();
        var cart_top = cart_offset.top - $(window).scrollTop();
        var cart_left = cart_offset.left - $(window).scrollLeft();

        $poster.css({
            left: options.product_left,
            top: options.product_top,
            display: 'block'
        }).animate({ left: cart_left, top: cart_top }, 500);

        setTimeout(function () {
            pospb_defaults.post.remove($post, function () {
                $post.remove();
            });
        }, pospb_defaults.timeout);
    }
});
