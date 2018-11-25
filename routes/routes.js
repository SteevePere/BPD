'use strict';

const ReportController =  require('../controllers/report');
const UserController =  require('../controllers/user');

exports.plugin = {
	register: (server, options) => {

    const routes = [
      {
				method: 'GET',
				path: '/reports',
				handler: ReportController.list
      },
      {
				method: 'GET',
				path: '/reports/{id}',
				handler: ReportController.get
      },
			{
				method: 'POST',
				path: '/add_report',
				handler: ReportController.create
			},
			{
				method: 'PUT',
				path: '/reports/{id}',
				handler: ReportController.update
			},
			{
				method: 'DELETE',
				path: '/reports/{id}',
				handler: ReportController.remove
			},
			{
				method: 'GET',
				path: '/user',
				handler: UserController.get
			}
    ];

    server.route(routes);
  },
	name: "routes"
};
