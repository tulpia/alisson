<?php

namespace App\Entities;

use Timber\Menu;

class Page
{
    public $post_id;
    public $fields;
    public $menus;

    public function __construct($post_id)
    {
        $this->post_id = $post_id;

        $this->getFields();
        $this->getMenus();
    }

    protected function getFields()
    {
        $this->fields = get_fields($this->post_id);
    }

    protected function getMenus()
    {
        $this->menus = [];

        // Menu principal
        $this->menus["menu_principal"] = new Menu('primary-menu');
    }
}
