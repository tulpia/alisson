<?php

namespace App\Entities;

class PageHome extends Page
{
    public function __construct($post_id)
    {
        parent::__construct($post_id);

        $this->getFieldsForPosts();
    }

    private function getFieldsForPosts()
    {
        $work_index = 1;

        foreach ($this->fields["works"] as $work_key => $work) {
            $this->fields["works"][$work_key]->image = get_field("intro_image", $work->ID);

            if ($work_index < 10) {
                $this->fields["works"][$work_key]->work_index = "0" . $work_index;
            } else {
                $this->fields["works"][$work_key]->work_index = $work_index;
            }

            $work_index++;
        }
    }
}
