<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class posnewreprint extends Module
{
	// public $output = '';

    public function __construct()
    {
        $this->name = 'posnewreprint';
        $this->tab = 'front_office_features';
        $this->bootstrap = true;
        $this->version = '1.0.0';
        $this->author = 'tpc';
        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);
        $this->need_instance = 0;
        $this->secure_key = Tools::encrypt($this->name);

        parent::__construct();

        $this->displayName = $this->l('Reimprime el pedido');
        $this->description = $this->l('Reimprime el pedido si lo deseas');
    }

    public function install()
    {
        // $this->createHook('displayWkPosReprint');
        include(dirname(__FILE__) . '/sql/install.php');

        if (
            !parent::install()
            || !$this->installHooks()
        )
            return false; 
        return true;
    }

    // public function hookDisplayHeader()
    // {
    //     $this->context->controller->registerJavascript('module-'.$this->name.'-js', 'modules/'.$this->name.'/views/js/newreprint.js', ['position' => 'bottom', 'priority' => 100]);

    // }

    public function hookActionPosSetMedia($params)
    {
        $this->context->controller->posAddCss(
            [
                _MODULE_DIR_ . $this->name . '/views/css/newreprint.css',
            ]
        );
        $this->context->controller->posAddJs(
            [
                _MODULE_DIR_ . $this->name . '/views/js/newreprint.js',
            ]
        );
    }

    public function createHook($name)
    {
        $hook = Hook::getIdByName($name);
        if (!$hook) {
            $hook = new Hook();
            $hook->name = $name;
            $hook->save();
        }

        return $this->registerHook($name);
    }

    public function uninstall()
    {
        // include(dirname(__FILE__) . '/sql/uninstall.php');

        if (!parent::uninstall())
            return false;

        return true;
    }

    private function installHooks()
    {
        return $this->registerHook(

            array(
                 'actionPosSetMedia',       
                 'displayWkPosReprint',       
            )
        );
    }

    public function hookDisplayWkPosReprint($params)
    {
        $this->context->smarty->assign(
            array(
                'action_reprint' => $this->context->link->getModuleLink($this->name, 'ajaxreprint'),
            )
        );

        return $this->display(__FILE__, 'newreprint.tpl');

    }

}