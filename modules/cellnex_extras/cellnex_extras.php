<?php

/**
 * 2007-2021 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author    PrestaShop SA <contact@prestashop.com>
 *  @copyright 2007-2021 PrestaShop SA
 *  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

// use PrestaShopBundle\Form\Admin\Type\TextEmptyType;
// use PrestaShopBundle\Form\Admin\Type\TranslateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

use PrestaShop\PrestaShop\Core\Grid\Column\Type\DataColumn;
use PrestaShop\PrestaShop\Core\Grid\Filter\Filter;
// use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\BadgeColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\ColumnCollection;

class cellnex_extras extends Module
{
    public $output = '';
    // private $tab_module = 'nora_address_extra';

    public function __construct()
    {
        $this->name = 'cellnex_extras';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'Sebas and tpc';
        $this->need_instance = 0;
        $this->bootstrap = true;
        $this->secure_key = Tools::encrypt($this->name);

        parent::__construct();

        $this->displayName = $this->l('Cellnex Nuevos campos en object Product');
        $this->description = $this->l('Campos extras en el object Product en adminProducts y su view');
        
        $this->ps_versions_compliancy = ['min' => '1.7', 'max' => _PS_VERSION_];
    }

    public function install(){
        if (
            !parent::install()
            || !$this->addProductFileds()
            || !$this->installHooks()
        )
            return false;
        return true;
        
    }

    private function addProductFileds()
    {
        $sql = [];
        
        // $sql[] = 'ALTER TABLE ' . _DB_PREFIX_ . 'product ADD COLUMN temporada_semana VARCHAR(255) NOT NULL';
        // $sql[] = 'ALTER TABLE ' . _DB_PREFIX_ . 'product_shop ADD COLUMN temporada_semana VARCHAR(255) NOT NULL';
        
        $result = true;
        foreach ($sql as $q) {
            $result &= Db::getInstance()->execute($q);
        }

        return $result;
    }

    private function installHooks()
    {
        return $this->registerHook(
            array(
                'actionProductGridDefinitionModifier',
                'actionProductGridDataModifier',
                'actionProductGridQueryBuilderModifier',
                'actionAdminProductsListingFieldsModifier',
                'actionAdminProductsListingResultsModifier',
                'displayAdminProductsMainStepLeftColumnMiddle',
                'actionProductSave',
            )
        );
    }

    public function uninstall()
    {
        return parent::uninstall() && $this->removeProductFields();
    }

    private function removeProductFields()
    {
        $sql = [];
        
        // $sql[] = 'ALTER TABLE ' . _DB_PREFIX_ . 'product ADD COLUMN temporada_semana VARCHAR(255) NOT NULL';
        // $sql[] = 'ALTER TABLE ' . _DB_PREFIX_ . 'product_shop ADD COLUMN temporada_semana VARCHAR(255) NOT NULL';

        $result = true;
        foreach ($sql as $q) {
            $result &= Db::getInstance()->execute($q);
        }

        return $result;
    }

    public function getContent() {
        // $this->installHooks();
        return 'AAA';
    }

    public function saveExtraData(array $params)
    {

    }

    public function hookActionProductSave(array $params)
    {

    }

    public function hookDisplayAdminProductsMainStepLeftColumnMiddle(array $params)
    {
        $id_product = $params['id_product'];
        $temporada_semana = '';

        if ($id_product) {
            $product = new Product($id_product);
            $temporada_semana = $product->temporada_semana;
        }

        return '<div class="col-lg-6">
            <div class="form-group">
                <label>
                    ' . $this->l('Temporada y Semana') . '
                </label>
                <input type="text" name="temporada_semana" class="form-control" value="' . $temporada_semana . '">
            </div>
        </div>';
    }

    /**
     * Hooks allows to modify Customer grid definition.
     * This hook is a right place to add/remove columns or actions (bulk, grid).
     *
     * @param array $params
     */
    public function hookActionProductGridDefinitionModifier(array $params)
    {
        if (empty($params['definition'])) {
            return;
        }
        
        /** @var GridDefinitionInterface $definition */
        $definition = $params['definition'];

        $definition
        ->getColumns()
        ->addAfter(
            'active',
            (new DataColumn('temporada_semana'))
                ->setName($this->l('Temporada y Semana'))
                ->setOptions([
                    'field' => 'temporada_semana',
                ])
        );

        $definition->getFilters()->add(
            (new Filter('temporada_semana', TextType::class))
                ->setAssociatedColumn('temporada_semana')
                ->setTypeOptions([
                    'required' => false,
                ])
        );
    }

    public function hookActionProductGridDataModifier(array $params)
    {

    }


    public function hookActionProductGridQueryBuilderModifier(array $params)
    {
        if (empty($params['search_query_builder']) || empty($params['search_criteria'])) {
            return;
        }

        /** @var Doctrine\DBAL\Query\QueryBuilder $searchQueryBuilder */
        $searchQueryBuilder = $params['search_query_builder'];

        /** @var PrestaShop\PrestaShop\Core\Search\Filters\ProductFilters $searchCriteria */
        $searchCriteria = $params['search_criteria'];

        $searchQueryBuilder->addSelect(
            'sa.`temporada_semana` as `temporada_semana`'
        );

        if ('temporada_semana' === $searchCriteria->getOrderBy()) {
            $searchQueryBuilder->orderBy('sa.`temporada_semana`', $searchCriteria->getOrderWay());
        }

        foreach ($searchCriteria->getFilters() as $filterName => $filterValue) {
            if ('temporada_semana' === $filterName) {
                $searchQueryBuilder->setParameter('temporada_semana', $filterValue);
            }
        }
    }

    public function hookActionAdminProductsListingFieldsModifier(array $params)
    {
        $params['sql_select']['temporada_semana'] = array(
            'table' => 'sa',
            'field' => 'temporada_semana',
            'filtering' => 'LIKE \'%%%s%%\'',
        );
        
        $temporada_semana_filter = Tools::getValue('filter_column_temporada_semana');
        if (!empty($temporada_semana_filter) && Validate::isCatalogName($temporada_semana_filter)) {
            $params['sql_where'][] .= sprintf('sa.temporada_semana LIKE "%%%s%%"', pSQL($temporada_semana_filter));
        }
    }

    public function hookActionAdminProductsListingResultsModifier(array $params)
    {
        
    }
}