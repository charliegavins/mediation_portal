const JSZip         = require('jszip');
const Docxtemplater = require('docxtemplater');
const converter     = require('number-to-words');
const fs            = require('fs');
const path          = require('path');
const moment        = require('moment');
const _             = require('lodash');

const Case = require('../models/case');

function gen(req, res) {
  Case
  .findOne({ caseID: req.params.id })
  .populate('partnerA partnerB mediator')
  .exec((err, data) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    mou = {
      FIRST_NAME_A: data.partnerA.firstName,
      LAST_NAME_A: data.partnerA.lastName,
      FIRST_NAME_B: data.partnerB.firstName,
      LAST_NAME_B: data.partnerB.lastName,
      MEDIATOR_FIRST_NAME: data.mediator.firstName,
      NUMBER_OF_SESSIONS: `${converter.toWords(data.numberOfSessions)} (${data.numberOfSessions})`,
      DATE_OF_MEDIATION_START: data.mediationStart,
      DATE_OF_MEDIATION_END: data.mediationEnd,
      LEGAL_ADVICE: data.legalAdvice,
      DATE_MARRIED: data.dateOfMarriage,
      DATE_COHABITED: data.dateOfCohabitation,
      DATE_SEPARATED: data.dateOfSeparation
    };
    mouProcessed = dataFormatCheck(mou);
    docgen(mouProcessed, res);
  });
}

function dateParser(date){
  return moment(date).format('Do MMMM YYYY');
}

function capitalise(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function dataFormatCheck(mou){
  for (var i in mou){
    let value = mou[i];
    if (value == undefined){
      mou[i] = 'X';
    }
    if (_.isString(value)){
      mou[i] = capitalise(value);
    }
    if (_.isDate(value)){
      mou[i] = dateParser(value);
      console.log(mou[i]);
    }
  };
  console.log(mou);
  return mou;
}

function docgen(data, res){

  //Load the docx file as a binary
  let content = fs
  .readFileSync(path.resolve(__dirname, '../docgen/MOU_input.docx'), 'binary');

  let zip = new JSZip(content);

  let doc = new Docxtemplater();
  doc.loadZip(zip);

  doc.setData({
    partner_A_first_name: data.FIRST_NAME_A,
    partner_A_last_name: data.LAST_NAME_A,
    partner_B_first_name: data.FIRST_NAME_B,
    partner_B_last_name: data.LAST_NAME_B,
    mediator_first_name: data.MEDIATOR_FIRST_NAME,
    number_of_sessions: data.NUMBER_OF_SESSIONS,
    date_of_mediation_start: data.DATE_OF_MEDIATION_START,
    date_of_mediation_end: data.DATE_OF_MEDIATION_END
  });


  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render()
  }
  catch (error) {
    let e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    }
    console.log(JSON.stringify({error: e}));
    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
    return res.status(500).json({ message: 'Something went wrong.', error: JSON.stringify(error)  });
  }

  let buf = doc.getZip()
  .generate({type: 'nodebuffer'});

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  fs.writeFileSync(path.resolve(__dirname, '../docgen/output.docx'), buf);
  return res.status(200).json({ message: 'Document spawned'});
};

module.exports = {
  gen: gen
};
