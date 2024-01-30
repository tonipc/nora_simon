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

const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: [
        // './js/jquery.growl.js',
        './app/js/possale.js',
        './app/js/header.js',
        './app/js/session.js',
        './app/js/wkindexeddb.js',
        './app/js/address.js',
        './app/js/customer.js',
        './app/js/order.js',
        './app/js/poscart.js',
        './app/js/product.js',
        './app/js/voucher.js',
        './app/js/wkajaxresponseerror.js',
        './app/js/wkformatcurrency.js',
        './app/js/wkgrowlmsg.js',
        './app/js/wkimagemove.js',
        './app/js/wkprintinvoice.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './')
    },
    resolve: {
        alias: {
            $: "jquery/src/jquery",
        }
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [path.resolve(__dirname, "./src/app")],
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    plugins: [
    ]
};
