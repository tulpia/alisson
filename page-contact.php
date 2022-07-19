<?php

/**
 * Template Name: Contact
 */

use Timber\Timber;

$post_id = get_the_ID();
$context = Timber::get_context();
$context["data"] = new \App\Entities\PageContact($post_id);

Timber::render('src/templates/page-contact.twig', $context);
