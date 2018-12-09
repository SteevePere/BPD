<?php

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('exportToCsv', 'UserController@export2CSV');
