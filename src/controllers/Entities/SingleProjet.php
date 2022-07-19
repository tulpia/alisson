<?php

namespace App\Entities;

use Timber;

class SingleProjet extends Page
{
    public $works;

    public function __construct($post_id)
    {
        parent::__construct($post_id);

        $this->post = new Timber\Post();
    }
}
