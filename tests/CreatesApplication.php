<?php

namespace Tests;

use Illuminate\Contracts\Foundation\Application;

trait CreatesApplication
{
    /**
     * Creates the application.
     */
    public function createApplication(): Application
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->makeKernel()->bootstrap();

        return $app;
    }
}
