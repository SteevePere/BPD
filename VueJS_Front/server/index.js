'use strict';
//Plugins
const Hapi = require('hapi')
const HapiNuxt = require('hapi-nuxt')
const Mongoose = require('mongoose');
const routesPlugin = require('./routes/routes');
//Database URLs
const MongoDBUrl = 'mongodb://localhost:27017/crime_incident_reports';
const MySQLURL = 'mysql://root:Makaveli@localhost/users';

const launchServer = async function() {

    const MySQLopts = {
        settings: MySQLURL,
        decorate: true
    }

		const server = new Hapi.Server({
		  port: process.env.PORT || 8000,
		  host: process.env.HOST || "192.168.34.28"
		});

    await server.register([{
					plugin: require('hapi-mysql2'),
					options: MySQLopts
				}, {
					plugin: routesPlugin, //adding routes to app
					options: {}
        }, {
          plugin: HapiNuxt
    }]).then(() => { console.log(`Connected to SQL server, all routes loaded.`) }, err => { console.log(err) });

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
