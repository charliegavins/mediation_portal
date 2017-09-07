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
      DOB_A: data.partnerA.DoB,
      DOB_B: data.partnerB.DoB,
      FIRST_NAME_B: data.partnerB.firstName,
      LAST_NAME_B: data.partnerB.lastName,
      MEDIATOR_FIRST_NAME: data.mediator.firstName,
      NUMBER_OF_SESSIONS: `${converter.toWords(data.numberOfSessions)} (${data.numberOfSessions})`,
      DATE_OF_MEDIATION_START: data.mediationStart,
      DATE_OF_MEDIATION_END: data.mediationEnd,
      LEGAL_ADVICE: data.legalAdvice,
      DATE_MARRIED: data.dateOfMarriage,
      DATE_COHABITED: data.dateOfCohabitation,
      DATE_SEPARATED: data.dateOfSeparation,
      PENSIONS_A: data.MoUFinance.pensions.partnerA,
      PENSIONS_B: data.MoUFinance.pensions.partnerB,
      OTHER_ASSETS_A: data.MoUFinance.otherAssets.partnerA,
      OTHER_ASSETS_B: data.MoUFinance.otherAssets.partnerB,
      BUSINESS_ASSETS_A: data.MoUFinance.businessAssets.partnerA,
      BUSINESS_ASSETS_B: data.MoUFinance.businessAssets.partnerB,
      LIABILITIES_A: data.MoUFinance.liabilities.partnerA,
      LIABILITIES_B: data.MoUFinance.liabilities.partnerB,
      PERSONAL_ASSETS_A: data.MoUFinance.personalAssets.partnerA,
      PERSONAL_ASSETS_B: data.MoUFinance.personalAssets.partnerB,
      OTHER_PROPERTY_A: data.MoUFinance.otherProperty.partnerA,
      OTHER_PROPERTY_B: data.MoUFinance.otherProperty.partnerB,
      FAMILY_HOME_A: data.MoUFinance.familyHome.partnerA,
      FAMILY_HOME_A: data.MoUFinance.familyHome.partnerB,
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
  return mou;
}

function docgen(data, res){

  //Load the docx file as a binary
  let content = fs
  .readFileSync(path.resolve(__dirname, '../docgen/MOU_input.docx'), 'binary');

  let zip = new JSZip(content);

  let doc = new Docxtemplater();
  doc.loadZip(zip);

//CAN WE ES6 this so it's just { LEGAL_ADVICE, FIRST_NAME_A etc?}
  doc.setData({
    LEGAL_ADVICE: data.LEGAL_ADVICE,
    FIRST_NAME_A: data.FIRST_NAME_A,
    LAST_NAME_A: data.LAST_NAME_A,
    FIRST_NAME_B: data.FIRST_NAME_B,
    LAST_NAME_B: data.LAST_NAME_B,
    MEDIATOR_FIRST_NAME: data.MEDIATOR_FIRST_NAME,
    NUMBER_OF_SESSIONS: data.NUMBER_OF_SESSIONS,
    DATE_OF_MEDIATION_START: data.DATE_OF_MEDIATION_START,
    DATE_OF_MEDIATION_END: data.DATE_OF_MEDIATION_END,
    DATE_MARRIED: data.DATE_MARRIED,
    DATE_COHABITED: data.DATE_COHABITED,
    DATE_SEPARATED: data.DATE_SEPARATED,
    PENSIONS_A: data.PENSIONS_A,
    PENSIONS_B: data.PENSIONS_B,
    OTHER_ASSETS_A: data.OTHER_ASSETS_A,
    OTHER_ASSETS_B: data.OTHER_ASSETS_B,
    BUSINESS_ASSETS_A: data.BUSINESS_ASSETS_A,
    BUSINESS_ASSETS_B: data.BUSINESS_ASSETS_B,
    LIABILITIES_A: data.LIABILITIES_A,
    LIABILITIES_B: data.LIABILITIES_B,
    PERSONAL_ASSETS_A: data.PERSONAL_ASSETS_A,
    PERSONAL_ASSETS_B: data.PERSONAL_ASSETS_B,
    OTHER_PROPERTY_A: data.OTHER_PROPERTY_A,
    OTHER_PROPERTY_B: data.OTHER_PROPERTY_B,
    FAMILY_HOME_A: data.FAMILY_HOME_A,
    FAMILY_HOME_B: data.FAMILY_HOME_B,
    DOB_A: data.DOB_A,
    DOB_B: data.DOB_B
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
