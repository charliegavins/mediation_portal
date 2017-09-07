module.exports = {
  index: casesIndex,
  show: casesShow,
  update: casesUpdate,
  delete: casesDelete,
  new: casesNew,
  parse: parseExcel
};

const Case          = require('../models/case');
const XLSX          = require('xlsx');
const path          = require('path');

let workbook = XLSX.readFile(path.resolve(__dirname, '../docgen/OFSDemoValues.xlsx'));

function parseExcel(req, res){
let MoUFinance = { MoUFinance: {
  familyHome: {
      partnerA: getCellValue('D2'),
      partnerB: getCellValue('F2')
  },
  otherProperty: {
    partnerA: getCellValue('D3'),
    partnerB: getCellValue('F3')
  },
  personalAssets: {
    partnerA: getCellValue('D4'),
    partnerB: getCellValue('D4')
  },
  liabilities: {
    partnerA: getCellValue('D5'),
    partnerB: getCellValue('D5')
  },
  businessAssets: {
    partnerA: getCellValue('D6'),
    partnerB: getCellValue('D6')
  },
  otherAssets: {
    partnerA: getCellValue('D7'),
    partnerB: getCellValue('D7')
  },
  pensions: {
    partnerA: getCellValue('D9'),
    partnerB: getCellValue('D9')
  }
}
}
console.log(MoUFinance);
Case.findByIdAndUpdate(req.params.id, MoUFinance, { new: true },  (err, cases) => {
  if (err) return res.status(500).json({ message: 'Something went wrong.' });
  if (!cases) return res.status(404).json({ message: 'case not found.' });
  return res.status(200).json({message: 'case updated', case: cases});
});
}

function getCellValue(cellAddress){
  let first_sheet_name = workbook.SheetNames[0];
  let worksheet = workbook.Sheets[first_sheet_name];
  let address_of_cell = cellAddress;
  let desired_cell = worksheet[address_of_cell];
  let desired_value = (desired_cell ? desired_cell.v : undefined);
  return desired_value;
}


function casesIndex(req, res) {
  Case
  .find({})
  .populate('partnerA partnerB mediator')
  .exec((err, cases) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json(cases);
  });
}

function casesShow(req, res) {
  Case.findById(req.params.id)
  .populate('partnerA partnerB mediator')
  .exec((err, cases) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!cases) return res.status(404).json({ message: 'Case  not found.' });
    return res.status(200).json(cases);
  });
}

function casesUpdate(req, res) {
console.log(req.body);
  Case.findByIdAndUpdate(req.params.id, req.body, { new: true },  (err, cases) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!cases) return res.status(404).json({ message: 'case not found.' });
    return res.status(200).json({message: 'case updated', case: cases});
  });
}

function casesDelete(req, res) {
  Case.findByIdAndRemove(req.params.id, (err, cases) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!cases) return res.status(404).json({ message: 'case not found.' });
    return res.sendStatus(204);
  });
}

function casesNew(req, res){
  Case.create(req.body, (err, cases) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.', error: err });

    return res.status(201).json({
      message: `Case added`, case: cases });
  });
}
