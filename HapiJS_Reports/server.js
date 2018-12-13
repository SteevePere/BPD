'use strict';
//Plugins
const Hapi = require('hapi');
const Mongoose = require('mongoose');
const routesPlugin = require('./routes/routes');
//Database URLs
const MongoDBUrl = 'mongodb://localhost:27017/crime_incident_reports';
const MySQLURL = 'mysql://root:Makaveli@localhost/users';

const launchServer = async function() {

	const MySQL_opts = {
	    settings: MySQLURL,
	    decorate: true
	};

	const server = new Hapi.Server({
	  port: 8000,
	  host: '192.168.0.40'
	});

	await server.register([
		{
			plugin: require('hapi-mysql2'),
			options: MySQL_opts
		},
		{
			plugin: routesPlugin, //adding routes to app
			options: {}
		}
	]).then(() => { console.log(`Connected to SQL server, all routes loaded.`) }, err => { console.log(err) });

	try {
		await server.start();
		Mongoose.set('useCreateIndex', true);
	  Mongoose.connect(MongoDBUrl, { useNewUrlParser: true }), err => { console.log(err) };
		console.log(`Connected to Mongo server.`);
	  console.log(`Server running at: ${server.info.uri}.`);
	}
	catch (err) {
		console.log(err)
	}
}
//Launching server
launchServer().catch(err => {
	console.error(err)
  process.exit(1)
});
