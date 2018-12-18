'use strict';

const ReportController =  require('../controllers/report');
const UserController =  require('../controllers/user');
const Joi = require('joi');

exports.plugin = {
	register: (server, options) => {

    const routes = [
			//--- REPORTS ---
      {
				//Get all reports
				method: 'GET',
				path: '/reports',
				handler: ReportController.list,
		    options: {
		        validate: {
		            query: {
	                page: Joi.number().integer().min(1).default(1),
									per_page : Joi.number().integer().min(1).max(500).default(15)
		            }
		        }
    		}
      },
			{
				//Get geoloc of all matching reports (by incident type)
				method: 'GET',
				path: '/geoloc/{type}',
				handler: ReportController.geoloc,
				options: {
						validate: {
								params: {
									type: Joi.string().required(),
								}
						}
				}
			},
      {
				//Get one report
				method: 'GET',
				path: '/reports/{id}',
				handler: ReportController.get
      },
			{
				//Get incidents per month
				method: 'GET',
				path: '/incidents_per_month',
				handler: ReportController.perMonth,
				options: {
		        validate: {
		            query: {
									year : Joi.number().integer().required(),
		            }
		        }
    		}
      },
			{
				//Get incidents per day
				method: 'GET',
				path: '/incidents_per_day',
				handler: ReportController.perDay,
				options: {
		        validate: {
		            query: {
									year : Joi.number().integer().required(),
		            }
		        }
    		}
      },
			{
				//Get incidents per district
				method: 'GET',
				path: '/incidents_per_district',
				handler: ReportController.perDistrict,
				options: {
		        validate: {
		            query: {
									year : Joi.number().integer().required(),
		            }
		        }
    		}
      },
			{
				//Get incidents per weapon type
				method: 'GET',
				path: '/incidents_per_weapon',
				handler: ReportController.perWeapon,
				options: {
		        validate: {
		            query: {
									year : Joi.number().integer().required(),
		            }
		        }
    		}
      },
			{
				//Create one report
				method: 'POST',
				path: '/add_report',
				handler: ReportController.create
			},
			{
				//Edit one report
				method: 'PUT',
				path: '/reports/{id}',
				handler: ReportController.update
			},
			{
				//Delete one report
				method: 'DELETE',
				path: '/reports/{id}',
				handler: ReportController.remove
			},
			//--- USERS ---
			{
				//Get current app user
				method: 'GET',
				path: '/login',
				handler: UserController.login
			},
			{
				//Get all pending accounts (status = OFF)
				method: 'GET',
				path: '/pending_accounts',
				handler: UserController.pending
			},
			{
				//Get all accounts
				method: 'GET',
				path: '/all_users',
				handler: UserController.all_users
			},
			{
				//Activate pending user account (set status to ON)
				method: 'PUT',
				path: '/activate_user/{id}',
				handler: UserController.activate
			},
			{
				//Block user account (set status to OFF)
				method: 'PUT',
				path: '/block_user/{id}',
				handler: UserController.block
			}
    ];

    server.route(routes);
  },
	name: "routes"
};
