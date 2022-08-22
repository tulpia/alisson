<?php

namespace App\Utils;

use Timber;
use Timber\Twig_Filter;
use Timber\Twig_Function;

class TwigFilters
{
    private static $instance = null;

    public function __construct()
    {
        add_filter("timber/twig", [$this, "add_to_twig"]);
    }

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new TwigFilters();
        }

        return self::$instance;
    }

    public function add_to_twig($twig)
    {
        $twig->addFilter(new Twig_Filter('convert_to_underline', [$this, "convertToUnderline"]));
        $twig->addFunction(new Twig_Function('renderImage',[$this, "renderImage"]));

        return $twig;
    }

    public function convertToUnderline($string)
    {
        $string = str_replace("[", "<span class='underline'>", $string);
        $string = str_replace("]", "</span>", $string);

        return $string;
    }

    public function renderImage($image, $arguments = null) {
        if ($image && is_array($image)) {
            $image["credit"] = get_field("credit", $image["ID"]);
        }

        $html = Timber::compile("partial/components/img.twig", ["image" => $image, "options" => $arguments]);

        return $html;
    }
}
