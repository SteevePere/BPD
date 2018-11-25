var Report =  require('../models/report');

//Get all
exports.list = async function(req, h) {

	const mysql = req.mysql.pool
	const token = req.headers[ 'authorization' ];
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token])
	try {
		const role = row[0]['role']

		return Report.find({}).exec().then((report) => {
			return { report, code: 200 };
		}).catch((err) => {
			return { err };
		});
	}
	catch (err) {
		return { message: 'Unauthorized', code: 401};
	}
}

//Get one
exports.get = async function(req, h) {

	const mysql = req.mysql.pool
	const token = req.headers[ 'authorization' ];
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token])
	try {
		const role = row[0]['role']

		return Report.findOne({ compnos: req.params.id }).exec().then((report) => {
    if(!report) return { message: 'Not Found', code: 404 };
						return { report, code: 200 };
		}).catch((err) => {
			return { err };
		});
	}
	catch (err) {
		return { message: 'Unauthorized', code: 401};
	}
}

//Create one
exports.create = async function(req, h) {

	const mysql = req.mysql.pool
	const token = req.headers[ 'authorization' ];
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token])
	try {
		const role = row[0]['role']

		if (role == 'chief' || role == 'detective') {

		  const reportData = {
				compnos: req.payload.compnos,
				naturecode: req.payload.naturecode,
				incident_type_description: req.payload.incident_type_description,
				main_crimecode: req.payload.main_crimecode,
				reptdistrict: req.payload.reptdistrict,
				reportingarea: req.payload.reportingarea,
				fromdate: req.payload.fromdate,
				weapontype: req.payload.weapontype,
				shooting: req.payload.shooting,
				domestic: req.payload.domestic,
				shift: req.payload.shift,
				year: req.payload.year,
				month: req.payload.month,
				day_week: req.payload.day_week,
				ucrpart: req.payload.ucrpart,
				x: req.payload.x,
				y: req.payload.y,
				streetname: req.payload.streetname,
				xstreetname: req.payload.xstreetname,
				location: req.payload.location
		  };

		  return Report.create(reportData).then((report) => {
		     return { message: "Report created successfully", code: 201, report };
	  	}).catch((err) => {
	    		return { err };
	  		});
		} else return { message: 'Forbidden', code: 403};

	}
	catch (err) {
		return { message: 'Unauthorized', code: 401};
	}
}

//Update one
exports.update = async function(req, h) {

	const mysql = req.mysql.pool
	const token = req.headers[ 'authorization' ];
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token])
	try {
		const role = row[0]['role']

		if (role == 'chief' || role == 'detective') {

		  return Report.findOne({ compnos: req.params.id }).exec().then((report) => {

		    if (!report) return { message: 'Not Found', code: 404 };

				report.compnos = req.payload.compnos;
				report.naturecode = req.payload.naturecode;
				report.incident_type_description = req.payload.incident_type_description;
				report.main_crimecode = req.payload.main_crimecode;
				report.reptdistrict = req.payload.reptdistrict;
				report.reportingarea = req.payload.reportingarea;
				report.fromdate = req.payload.fromdate;
				report.weapontype = req.payload.weapontype;
				report.shooting = req.payload.shooting;
				report.domestic = req.payload.domestic;
				report.shift = req.payload.shift;
				report.year = req.payload.year;
				report.month = req.payload.month;
				report.day_week = req.payload.day_week;
				report.ucrpart = req.payload.ucrpart;
				report.x = req.payload.x;
				report.y = req.payload.y;
				report.streetname = req.payload.streetname;
				report.xstreetname = req.payload.xstreetname;
				report.location = req.payload.location;

		    report.save();

		  }).then((data) => {
		      return { message: "Report data updated successfully", code: 200 };
		  }).catch((err) => {
		      return {err};
		  });
		} else return { message: 'Forbidden', code: 403};
	}
	catch (err) {
		return { message: 'Unauthorized', code: 401};
	}
}

//Delete one
exports.remove = async function(req, h) {

	const mysql = req.mysql.pool
	const token = req.headers[ 'authorization' ];
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token])
	try {
		const role = row[0]['role']

		if (role == 'chief') {

		  return Report.findOne({ compnos: req.params.id }).exec().then((report) => {
		  if(!report) return { message: 'Not Found', code: 404 };

				report.remove();
				return { message: 'Report has been deleted', code: 200 };
		  }).catch((err) => {
		    return { err };
		  }); } else return { message: 'Forbidden', code: 403};
	}
	catch (err) {
		return { message: 'Unauthorized', code: 401};
	}
}
