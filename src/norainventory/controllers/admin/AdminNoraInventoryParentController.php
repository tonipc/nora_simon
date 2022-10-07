<?php

class AdminNoraInventoryParentController extends ModuleAdminController
{
    public function __construct()
    {
        $this->bootstrap = true;
        $this->multishop_context = Shop::CONTEXT_ALL;

        parent::__construct();
    }

    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);
    }
}
