<?php

return [

	'default' => 'mongodb',

  'connections' => [

		'mysql' => [
	    'driver'    => env('DB_CONNECTION'),
	    'host'      => env('DB_HOST'),
	    'port'      => env('DB_PORT'),
	    'database'  => env('DB_DATABASE'),
	    'username'  => env('DB_USERNAME'),
	    'password'  => env('DB_PASSWORD'),
		],

		'mongodb' => [
	    'driver'    => env('DB_CONNECTION_SECOND'),
	    'host'      => env('DB_HOST_SECOND'),
	    'port'      => env('DB_PORT_SECOND'),
	    'database'  => env('DB_DATABASE_SECOND'),
	    'username'  => env('DB_USERNAME_SECOND'),
	    'password'  => env('DB_PASSWORD_SECOND'),
		],

	],

  'migrations' => 'migrations',
];
