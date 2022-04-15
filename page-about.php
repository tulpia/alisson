<?php

/**
 * Template Name: About
 */

use Timber\Timber;

$post_id = get_the_ID();
$context = Timber::get_context();
$context["fields"] = new \App\Entities\PageAbout($post_id);

Timber::render('src/templates/page-about.twig', $context);
