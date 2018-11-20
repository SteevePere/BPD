var Report =  require('../models/report');

//Get all
exports.list = (req, h) => {
  return Report.find({}).exec().then((report) => {

    return { crime_incident_reports: report };

  }).catch((err) => {

    return { err: err };

  });
}

//Get one
exports.get = (req, h) => {

  return Report.findOne({ compnos: req.params.id }).exec().then((report) => {

    if(!report) return { message: 'Report not Found' };

    return { report };

  }).catch((err) => {

    return { err: err };

  });
}

//Create one
exports.create = (req, h) => {

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

     return { message: "Report created successfully", report };

  }).catch((err) => {

    return { err: err };

  });
}

//Update one
exports.update = (req, h) => {

  return Report.findById(req.params.id).exec().then((report) => {

    if (!report) return { err: 'Report not found' };

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

      return { message: "Report data updated successfully" };

  }).catch((err) => {

			console.log(err)
      return { err: err };

  });
}

//Delete one
exports.remove = (req, h) => {

	  return Report.findOne({ compnos: req.params.id }).exec().then((report) => {

	    if(!report) return { message: 'Report not Found' };

			report.remove();
			return { message: 'Report has been deleted' };

	  }).catch((err) => {

	    return { err: err };

	  });
	}
