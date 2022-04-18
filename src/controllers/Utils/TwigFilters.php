<?php

namespace App\Utils;

use Timber\Twig_Filter;

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

        return $twig;
    }

    public function convertToUnderline($string)
    {
        $string = str_replace("[", "<span class='underline'>", $string);
        $string = str_replace("]", "</span>", $string);

        return $string;
    }
}
