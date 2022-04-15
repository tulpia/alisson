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
        add_action('admin_menu', [$this, "removeMenuPages"]);
        add_action('init', [$this, "addPostType"]);
        add_filter('jpeg_quality', [$this, "returnImageQuality"]);
        add_filter('wp_editor_set_quality', [$this, "returnImageQuality"]);
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

    public function removeMenuPages()
    {
        remove_menu_page('edit-comments.php');
        remove_menu_page('edit.php');
    }

    public function addPostType()
    {
        // Remove comments links from admin bar
        if (is_admin_bar_showing()) {
            remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
        }

        // Add main menu
        register_nav_menu('main-menu', __('Menu principal'));

        // Add Custom Post Type
        register_post_type(
            'projet',
            array(
                'labels'      => array(
                    'name'          => __('Projets', 'textdomain'),
                    'singular_name' => __('Projet', 'textdomain'),
                ),
                'public'      => true,
                'menu_icon'   => "dashicons-rest-api"
            )
        );
    }

    public function returnImageQuality()
    {
        return 100;
    }
}
