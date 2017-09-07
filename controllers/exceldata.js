const XLSX          = require('xlsx');
const path          = require('path');

let workbook = XLSX.readFile(path.resolve(__dirname, '../docgen/OFSDemoValues.xlsx'));

function parseExcel(req, res){
let MoUFinance = {
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

  return res.status(200).json({ MoUFinance: MoUFinance });
}

function getCellValue(cellAddress){
  let first_sheet_name = workbook.SheetNames[0];
  let worksheet = workbook.Sheets[first_sheet_name];
  let address_of_cell = cellAddress;
  let desired_cell = worksheet[address_of_cell];
  let desired_value = (desired_cell ? desired_cell.v : undefined);
  return desired_value;
}

module.exports = {
  parse: parseExcel
};
