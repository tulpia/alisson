<?php

/**
 * Template Name: Works
 */

use Timber\Timber;

$post_id = get_the_ID();
$context = Timber::get_context();
$context["data"] = new \App\Entities\PageWorks($post_id);

Timber::render('src/templates/page-works.twig', $context);
