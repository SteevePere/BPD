var Report =  require('../models/report');

//Get all (all authenticated users allowed)
exports.list = async function(req, h) {

	const mysql = req.mysql.pool;
	const token = req.headers[ 'authorization' ];
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token]);

	try {

		const role = row[0]['role'];

		return Report.countDocuments().exec().then((totalCount) => {

			const perPage = Math.min(Math.max(1, req.query.per_page), 500);
			const totalPages = Math.ceil(totalCount / perPage);
			const page = Math.min(Math.max(1, req.query.page), totalPages);

			return Report.find({}).limit(perPage).skip(perPage * (page - 1)).sort({ compnos: 'asc' }).exec().then((report) => {

				return h.response({ total_records: totalCount, total_pages: totalPages, data: report, code: 200 }).code(200);

			}).catch((err) => {

				return h.response({ error: err, code: 500 }).code(500);
			});
		});
	}
	catch (err) {
		return h.response({ message: 'Unauthorized', code: 401}).code(401);
	}
}

//Get geoloc of all matching (all authenticated users allowed)
exports.geoloc = async function(req, h) {

	const mysql = req.mysql.pool;
	const token = req.headers[ 'authorization' ];
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token]);

	try {

		const role = row[0]['role'];

		return Report.countDocuments().exec().then((totalCount) => {

			return Report.find({incident_type_description: req.params.type}).select('location -_id').exec().then((report) => {

				return h.response({ total_records: totalCount, data: report, code: 200 }).code(200);

			}).catch((err) => {

				return h.response({ error: err, code: 500 }).code(500);
			});
		});
	}
	catch (err) {
		return h.response({ message: 'Unauthorized', code: 401}).code(401);
	}
}

//Get one (all authenticated users allowed)
exports.get = async function(req, h) {

	const mysql = req.mysql.pool
	const token = req.headers[ 'authorization' ];
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token])
	try {
		const role = row[0]['role']

		return Report.findOne({ compnos: req.params.id }).exec().then((report) => {
    if (!report)
			return h.response({ message: 'Not Found', code: 404 }).code(404);
		return h.response({ data: report, code: 200 }).code(200);
		}).catch((err) => {
			return h.response({ error: err, code: 500 }).code(500);
		});
	}
	catch (err) {
		return h.response({ message: 'Unauthorized', code: 401}).code(401);
	}
}

//Get incidents per month
exports.perMonth = async function(req, h) {

	const mysql = req.mysql.pool;
	const token = req.headers[ 'authorization' ];
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token]);

	try {

		const role = row[0]['role'];
		const year = [];

		for (let index = 1; index < 13; index++) {

			const total = await Report.countDocuments({month: index, year: req.query.year})

				year.push({
			    month: index,
			 		total: total
				});
		}
		return h.response({ data: year, code: 200 }).code(200);
	}
	catch (err) {
		return h.response({ message: err, code: 401}).code(401);
	}
}

//Create one (only chief & detectives)
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
		     return h.response({ message: 'Created', code: 201, report }).code(201);
	  	}).catch((err) => {
	    		return h.response({ error: err, code: 500 }).code(500);
	  		});
		} else return h.response({ message: 'Forbidden', code: 403}).code(403);

	}
	catch (err) {
		return h.response({ message: 'Unauthorized', code: 401}).code(401);
	}
}

//Update one (only chief & detectives)
exports.update = async function(req, h) {

	const mysql = req.mysql.pool
	const token = req.headers[ 'authorization' ];
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token])
	try {
		const role = row[0]['role']

		if (role == 'chief' || role == 'detective') {

		  return Report.findOne({ compnos: req.params.id }).exec().then((report) => {

		    if (!report) return h.response({ message: 'Not Found', code: 404 }).code(404);

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
		  	return h.response({ message: 'Updated', code: 200 }).code(200);
		  }).catch((err) => {
		    return h.response({ error: err, code: 500 }).code(500);
		  });
		} else return h.response({ message: 'Forbidden', code: 403}).code(403);
	}
	catch (err) {
		return h.response({ message: 'Unauthorized', code: 401}).code(401);
	}
}

//Delete one (only chief)
exports.remove = async function(req, h) {

	const mysql = req.mysql.pool
	const token = req.headers[ 'authorization' ];
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token])
	try {
		const role = row[0]['role']

		if (role == 'chief') {
		  return Report.findOne({ compnos: req.params.id }).exec().then((report) => {
		  if(!report) return h.response({ message: 'Not Found', code: 404 }).code(404);

				report.remove();
				return h.response({ message: 'Deleted', code: 200 }).code(200);
		  }).catch((err) => {
		    return { error: err, code: 500 };
		  }); } else return h.response({ message: 'Forbidden', code: 403}).code(403);
	}
	catch (err) {
		return h.response({ message: 'Unauthorized', code: 401}).code(403);
	}
}
