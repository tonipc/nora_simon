{*
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
*}

<div class="modal fade" id="wk-pos-category" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">{l s='Category' mod='wkpos'}</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <!-- ko if: $root.contentModel.showExpand -->
                        <button type="button" class="btn wkpos-btn pull-right"
                            data-bind="click: $root.contentModel.expandAllCategory">
                            <i class="fa fa-plus-square"></i>
                            {l s='Expand All' mod='wkpos'}
                        </button>
                        <!-- /ko -->
                        <!-- ko ifnot: $root.contentModel.showExpand -->
                        <button type="button" class="btn wkpos-btn pull-right"
                            data-bind="click: $root.contentModel.collapseAllCategory">
                            <i class="fa fa-minus-square"></i>
                            {l s='Collapse All' mod='wkpos'}
                        </button>
                        <!-- /ko -->
                    </div>
                </div>
                <div class="row wk-d-flex">
                    <script id="categoryTemplate" type="text/html">
                        <ul>
                            <li>
                                <!-- ko if: hasChildren -->
                                <label data-bind="attr: { 'for': idCategory }">
                                    <!-- ko if: categoryOpen -->
                                    {* <i class="fa fa-angle-up"></i> *}
                                    <i class="fa fa-folder-open"></i>
                                    <!-- /ko -->
                                    <!-- ko ifnot: categoryOpen -->
                                    <i class="fa fa-folder"></i>
                                    {* <i class="fa fa-angle-down"></i> *}
                                    <!-- /ko -->
                                </label>
                                <!-- /ko -->
                                <!-- ko ifnot: hasChildren -->
                                <i class="fa fa-circle"></i>
                                <!-- /ko -->
                                <!-- ko if: hasChildren -->
                                <input type="checkbox" value="cherry" class="catgory-input"
                                    data-bind="checked: categoryOpen, attr: { 'id': idCategory, 'name': idCategory }">
                                </input>
                                <!-- /ko -->
                                <span
                                    data-bind="text: name, click: $root.contentModel.getCategoryWsProduct, attr: { 'category-id': idCategory }, css: { 'active': $root.contentModel.selectedCategory() == idCategory }"
                                    class="wkcategory categoryProduct"></span>
                                <!-- ko if: categoryOpen -->
                                <!-- ko template: { name: 'categoryTemplate', foreach: children } -->
                                <!-- /ko -->
                                <!-- /ko -->
                            </li>
                        </ul>
                    </script>
                    <div data-bind="template: { name: 'categoryTemplate', data: $root.contentModel.subCategories }">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
