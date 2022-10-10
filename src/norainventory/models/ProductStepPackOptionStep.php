<?php
/**
* 2007-2020 PrestaShop
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
*  @copyright 2007-2020 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

namespace Module\NoraInventory\Models;

use Context;
use Db;
use ObjectModel;

class ProductStepPackOptionStep extends ObjectModel
{
    /** @var string */
    public $name;

    /** @var string */
    public $description_short;

    /** @var string */
    public $description;

    /** @var int */
    public $position;

    /** @var bool */
    public $active;

    /** @var int */
    public $id_product_step_pack_option;

    /** @var int */
    public $quantity;

    /** @var int */
    public $id_product_step;

    public static $definition = [
        'table' => 'product_step_pack_option_step',
        'primary' => 'id_product_step_pack_option_step',
        'multilang' => true,
        'fields' => [
            'active' => [
                'type' => self::TYPE_INT,
                'validate' => 'isBool',
                'required' => false,
            ],
            'position' => [
                'type' => self::TYPE_INT,
                'validate' => 'isUnsignedInt',
                'required' => false,
            ],
            'id_product_step_pack_option' => [
                'type' => self::TYPE_INT,
                'validate' => 'isUnsignedInt',
            ],
            'quantity' => [
                'type' => self::TYPE_INT,
                'validate' => 'isUnsignedInt',
            ],
            'id_product_step' => [
                'type' => self::TYPE_INT,
                'validate' => 'isUnsignedInt',
            ],
            /* Lang fields */
            'name' => [
                'type' => self::TYPE_STRING,
                'lang' => true,
                'validate' => 'isCatalogName',
                'required' => true,
                'size' => 255,
            ],
            'description_short' => [
                'type' => self::TYPE_HTML,
                'lang' => true,
                'validate' => 'isCleanHtml',
            ],
            'description' => [
                'type' => self::TYPE_HTML,
                'lang' => true,
                'validate' => 'isCleanHtml',
            ],
        ],
    ];

    public function add($autoDate = true, $nullValues = false)
    {
        if (!$this->id_shop) {
            $this->id_shop = Context::getContext()->shop->id;
        }

        if ($this->position <= 0) {
            $this->position = static::getHigherPosition() + 1;
        }

        return parent::add($autoDate, $nullValues);
    }

    public function delete()
    {
        if (!parent::delete()) {
            return false;
        }

        return static::cleanPositions();
    }

    /**
     * Moves a object.
     *
     * @since 1.5.0
     *
     * @param bool $way Up (1) or Down (0)
     * @param int $position Current position of the Object
     *
     * @return bool Whether the update was successful
     */
    public function updatePosition($way, $position)
    {
        $id_shop = Context::getContext()->shop->id;
        if (!$res = Db::getInstance()->executeS(
            'SELECT `' . static::$definition['primary'] . '`, `position`
			FROM `' . _DB_PREFIX_ . static::$definition['table'] . '`
            WHERE `id_shop` = ' . (int) $id_shop . '
			ORDER BY `position` ASC'
        )) {
            return false;
        }

        foreach ($res as $item) {
            if ((int) $item[static::$definition['primary']] == (int) $this->id) {
                $moved_item = $item;
            }
        }

        if (!isset($moved_item) || !isset($position)) {
            return false;
        }

        // < and > statements rather than BETWEEN operator
        // since BETWEEN is treated differently according to databases
        return Db::getInstance()->execute('
			UPDATE `' . _DB_PREFIX_ . static::$definition['table'] . '`
			SET `position`= `position` ' . ($way ? '- 1' : '+ 1') . '
			WHERE `position`
			' . ($way
                ? '> ' . (int) $moved_item['position'] . ' AND `position` <= ' . (int) $position
                : '< ' . (int) $moved_item['position'] . ' AND `position` >= ' . (int) $position . '
			AND `id_shop` = ' . (int) $id_shop))
        && Db::getInstance()->execute('
			UPDATE `' . _DB_PREFIX_ . static::$definition['table'] . '`
			SET `position` = ' . (int) $position . '
			WHERE `' . static::$definition['primary'] . '` = ' . (int) $moved_item[static::$definition['primary']] . '
            AND `id_shop` = ' . (int) $id_shop);
    }

    /**
     * Reorder Object positions
     * Called after deleting an Object.
     *
     * @since 1.5.0
     *
     * @return bool $return
     */
    public static function cleanPositions()
    {
        $id_shop = Context::getContext()->shop->id;
        $return = true;
        $sql = '
		SELECT `' . static::$definition['primary'] . '`
		FROM `' . _DB_PREFIX_ . static::$definition['table'] . '`
        WHERE `id_shop` = ' . (int) $id_shop . '
		ORDER BY `position` ASC';

        $result = Db::getInstance()->executeS($sql);
        $i = 0;
        foreach ($result as $value) {
            $return = Db::getInstance()->execute('
			UPDATE `' . _DB_PREFIX_ . static::$definition['table'] . '`
			SET `position` = ' . (int) $i++ . '
			WHERE `' . static::$definition['primary'] . '` = ' . (int) $value[static::$definition['primary']]);
        }

        return $return;
    }

    /**
     * Gets the highest object position.
     *
     * @since 1.5.0
     *
     * @return int $position
     */
    public static function getHigherPosition()
    {
        $sql = 'SELECT MAX(`position`)
			FROM `' . _DB_PREFIX_ . static::$definition['table'] . '`';
        $position = Db::getInstance()->getValue($sql);

        return (is_numeric($position)) ? $position : -1;
    }
}
