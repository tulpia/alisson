<?php

/**
 * Template Name: Accueil
 */

use Timber\Timber;

$post_id = get_the_ID();
$context = Timber::get_context();
$context["data"] = new \App\Entities\PageHome($post_id);

Timber::render('src/templates/page-accueil.twig', $context);
