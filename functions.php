<?php

namespace App;

require_once(__DIR__ . '/src/vendor/autoload.php');
\Timber\Timber::$dirname = array('src/templates');
$app = App::getInstance();
