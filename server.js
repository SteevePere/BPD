'use strict';

const Hapi = require('hapi');
const Mongoose = require('mongoose');
const routesPlugin = require('./routes/routes');
const MongoDBUrl = 'mongodb://localhost:27017/crime_incident_reports';
const MySQLURL = 'mysql://root:Makaveli@localhost/users';

const launchServer = async function() {

    const MySQLopts = {
        settings: MySQLURL,
        decorate: true
    }

		const server = new Hapi.Server({
		  port: 8000,
		  host: 'localhost'
		});

    await server.register([{
					plugin: require('hapi-mysql2'),
					options: MySQLopts
				}, {
					plugin: routesPlugin,
					options: {}
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

launchServer().catch(err => {
	console.error(err)
  process.exit(1)
})
