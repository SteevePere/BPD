'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const ReportController =  require('./controllers/report');
const MongoDBUrl = 'mongodb://localhost:27017/crime_incident_reports';

const server = new Hapi.Server({
  port: 8000,
  host: 'localhost'
});

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

(async () => {
  try {
    await server.start();
		mongoose.set('useCreateIndex', true);
    mongoose.connect(MongoDBUrl, { useNewUrlParser: true }).then(() => { console.log(`Connected to Mongo server.`) }, err => { console.log(err) });
    console.log(`Server running at: ${server.info.uri}`);
  }
  catch (err) {
    console.log(err)
  }
})();
