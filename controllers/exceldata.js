if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('../docgen/OFS_Demo_Values.xlsx');

function parseExcel(){
  console.log(workbook);
}

module.exports = {
  parse: parseExcel
};
