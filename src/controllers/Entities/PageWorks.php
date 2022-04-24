<?php

namespace App\Entities;

use WP_Query;

class PageWorks extends Page
{
    public $works;

    public function __construct($post_id)
    {
        parent::__construct($post_id);

        $this->getWorks();
    }

    private function getWorks()
    {
        $works_query = new WP_Query([
            "post_type" => "projet",
            "posts_per_page" => -1
        ]);

        if ($works_query) {
            foreach ($works_query->posts as &$work) {
                $work->image = get_field("intro_image", $work->ID);
                $work->permalink = get_permalink($work->ID);

                $this->works[] = $work;
            }
        }
    }
}
