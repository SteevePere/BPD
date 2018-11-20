'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const ReportController =  require('./controllers/report');
const MongoDBUrl = 'mongodb://localhost:27017/crime_incident_reports';

const launchServer = async function() {

    const MySQLopts = {
        settings: 'mysql://root:Makaveli@localhost/users',
        decorate: true
    }

		const server = new Hapi.Server({
		  port: 8000,
		  host: 'localhost'
		});

    await server.register({
        plugin: require('hapi-mysql2'),
        options: MySQLopts
    }).then(() => { console.log(`Connected to SQL server.`) }, err => { console.log(err) });

		server.route({
		  method: 'GET',
		  path: '/reports',
		  handler: ReportController.list
		});

		server.route({
		  method: 'GET',
		  path: '/reports/{id}',
		  handler: ReportController.get
		});

		server.route({
		  method: 'POST',
		  path: '/add_report',
		  handler: ReportController.create
		});

		server.route({
		  method: 'PUT',
		  path: '/reports/{id}',
		  handler: ReportController.update
		});

		server.route({
		  method: 'DELETE',
		  path: '/reports/{id}',
		  handler: ReportController.remove
		});

    server.route({
        method: 'GET',
        path: '/info',
        async handler(request) {
            const pool = request.mysql.pool

            try {
                const [rows, fields] = await pool.query('select * from users limit 10;')
                return rows
            } catch (err) {
                return { err: err };
            }
        }
    })

  try {
		await server.start();
		mongoose.set('useCreateIndex', true);
    mongoose.connect(MongoDBUrl, { useNewUrlParser: true }).then(() => { console.log(`Connected to Mongo server.`) }, err => { console.log(err) });
    console.log(`Server running at: ${server.info.uri}`);
  }

  catch (err) {
    console.log(err)
  }
}

launchServer().catch(err => {
    console.error(err)
    process.exit(1)
})
