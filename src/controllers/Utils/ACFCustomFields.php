<?php

namespace App\Utils;

class ACFCustomFields
{
    private static $instance = null;

    public function __construct()
    {
        $this->createThemeSettingsPage();
    }

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new ACFCustomFields();
        }

        return self::$instance;
    }

    public function createThemeSettingsPage() 
    {
        if( function_exists('acf_add_options_page') ) {
            acf_add_options_page(array(
                'page_title' 	=> 'Paramètres du thème',
                'menu_title'	=> 'Paramètres du thème',
                'menu_slug' 	=> 'theme-general-settings',
                'capability'	=> 'edit_posts',
                'redirect'		=> false,
                "position"      => 2
            ));
        }
    }
}
