/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const bourbon = require("bourbon");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  externals: {
    jquery: "jQuery"
  },
  entry: {
    "admin-stock": path.resolve(__dirname, "../src-client/admin/admin-stock"),
    packs: path.resolve(__dirname, "../src-client/front/packs"),
    homepage: path.resolve(__dirname, "../src-client/front/home")
  },
  output: {
    path: path.resolve(__dirname, "../src/norainventory/views/public"),
    publicPath: "views/",
    filename: "[name].bundle.js",
    libraryTarget: "window",
    library: "[name]",

    sourceMapFilename: "[name].chunk.map",
    chunkFilename: "[name].chunk.js"
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "~": path.resolve(__dirname, "../node_modules/"),
      "@": path.resolve(__dirname, "../src-client/")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "../js"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["env", { useBuiltIns: "usage", modules: false }]],
              plugins: [
                "lodash",
                "transform-object-rest-spread",
                "transform-runtime"
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        include: /scss/,
        exclude: /js/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [bourbon.includePaths]
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: /js/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      // FILES
      {
        test: /.(jpg|png|woff2?|eot|otf|ttf|svg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "img/"
        }
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new FixStyleOnlyEntriesPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["!theme.rtlfix"]
    }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new webpack.ProvidePlugin({
      moment: "moment", // needed for bootstrap datetime picker
      $: "jquery", // needed for jquery-ui
      jQuery: "jquery"
    }),
    new CopyPlugin([{ from: "static" }]),
    new VueLoaderPlugin()
  ]
};
