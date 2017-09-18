// const XLSX          = require('xlsx');
// const path          = require('path');
//
// let workbook = XLSX.read(path.resolve(__dirname, '../docgen/OFSHelper.xlsx'));
// let first_sheet_name = workbook.SheetNames[0];
// let worksheet = workbook.Sheets[first_sheet_name];
//
// function parseExcel(req, res){
//   console.log(XLSX.utils.sheet_to_csv(worksheet));
// // let MoUFinance = {
// //   familyHome: {
// //       partnerA: getCellValue('K130'),
// //       partnerB: getCellValue('M130')
// //   },
// //   otherProperty: {
// //     partnerA: getCellValue('K131'),
// //     partnerB: getCellValue('M131')
// //   },
// //   personalAssets: {
// //     partnerA: getCellValue('K132'),
// //     partnerB: getCellValue('M132')
// //   },
// //   liabilities: {
// //     partnerA: getCellValue('K133'),
// //     partnerB: getCellValue('M133')
// //   },
// //   businessAssets: {
// //     partnerA: getCellValue('K134'),
// //     partnerB: getCellValue('M134')
// //   },
// //   otherAssets: {
// //     partnerA: getCellValue('K135'),
// //     partnerB: getCellValue('M135')
// //   },
// //   pensions: {
// //     partnerA: getCellValue('K137'),
// //     partnerB: getCellValue('M137')
// //   }
// // }
//
//   // return res.status(200).json({ MoUFinance: MoUFinance });
//   return res.status(200).json({ MoUFinance: 'MoUFinance' });
// }
//
// // function getCellValue(cellAddress){
// //   let first_sheet_name = workbook.SheetNames[0];
// //   let worksheet = workbook.Sheets[first_sheet_name];
// //   let address_of_cell = cellAddress;
// //   let desired_cell = worksheet[address_of_cell];
// //   let desired_value = (desired_cell ? desired_cell.v : undefined);
// //   return desired_value;
// // }
//
// module.exports = {
//   parse: parseExcel
// };
