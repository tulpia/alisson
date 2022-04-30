<?php
use Timber\Timber;

$post_id = get_the_ID();
$context = Timber::get_context();
$context["data"] = new \App\Entities\SingleProjet($post_id);

Timber::render('src/templates/single-projet.twig', $context);