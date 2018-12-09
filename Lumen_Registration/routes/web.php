<?php

//Create one user
$router->post('user', 'UserController@createUser');

$router->get('users', function () {
    $results = app('db')->select("SELECT * FROM users");
		return $results;
});
