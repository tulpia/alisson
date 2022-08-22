<?php

namespace App\Entities;

use Timber\Menu;

class Page
{
    public $post_id;
    public $fields;
    public $menus;
    public $theme;

    public function __construct($post_id)
    {
        $this->post_id = $post_id;

        $this->getFields();
        $this->getMenus();
        $this->getThemeSettings();
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

    protected function getThemeSettings()
    {
        $this->theme = [];

        // Footer
        $this->theme["footer"] = [];
        $this->theme["footer"]["footer_email_contact"] = get_field("footer_email_contact", "option");
        $this->theme["footer"]["footer_location"] = get_field("footer_location", "option");
        $this->theme["footer"]["footer_social_links"] = get_field("footer_social_links", "option");
        $this->theme["footer"]["footer_cv"] = get_field("footer_cv", "option");
    }
}
