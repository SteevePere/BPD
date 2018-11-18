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
