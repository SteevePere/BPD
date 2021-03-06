'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportModel = new Schema({
  compnos: { type: Number, required: true, index: { unique: true } },
  naturecode: { type: String },
  incident_type_description: { type: String },
  main_crimecode: { type: String },
	reptdistrict: { type: String },
	reportingarea: { type: String },
	fromdate: { type: String },
	weapontype: { type: String },
	shooting: { type: String },
	domestic: { type: String },
	shift: { type: String },
	year: { type: Number },
	month: { type: Number },
	day_week: { type: String },
	ucrpart: { type: String },
	x: { type: String },
	y: { type: String },
	streetname: { type: String },
	xstreetname: { type: String },
	location: { type: String }
});

module.exports = mongoose.model('Report', reportModel, 'crime_incident_reports');
