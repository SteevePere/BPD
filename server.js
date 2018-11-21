'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const ReportController =  require('./controllers/report');
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
        path: '/user',
        async handler(request) {
            const mysql = request.mysql.pool
						const login = request.headers[ 'login' ];
						const password = request.headers[ 'password' ];
            try {
                const [row, fields] = await mysql.query('SELECT * FROM users WHERE login = ? and password = ?;',[login, password])
                const user = row[0]
								return user;
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
