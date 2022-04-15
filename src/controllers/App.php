<?php

namespace App;

use Timber\Timber;

class App
{
    private static $instance = null;

    public function __construct()
    {
        $this->loadTimber();

        add_action("wp_enqueue_scripts", [$this, "includeAssets"]);
    }

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new App();
        }

        return self::$instance;
    }

    private static function loadTimber()
    {
        $timber = new Timber();
    }

    public function includeAssets()
    {
        wp_enqueue_style('site_main_css', get_template_directory_uri() . '/assets/styles/main.css', array(), '1.0', false);
        wp_enqueue_script('site_main_js', get_template_directory_uri() . '/assets/scripts/main.js', array(), '1.0', true);
    }
}
