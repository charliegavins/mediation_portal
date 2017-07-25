const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
  dateOfMarriage: { type: date, trim: true },
  dateOfCohabitation: { type: String, trim: true },
  dateOfSeparation: { type: String, trim: true },
  children: { type: Boolean},
  childrenInfo: [{ firstName: String, lastName: String, middleNames: String, DoB: Date}]
});

module.exports = mongoose.model('Case', caseSchema);
