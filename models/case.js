const mongoose  = require('mongoose');

const caseSchema = new mongoose.Schema({
  partnerA: { type: mongoose.Schema.ObjectId, ref: 'User' },
  partnerB: { type: mongoose.Schema.ObjectId, ref: 'User' },
  dateOfMarriage: { type: Date, trim: true },
  dateOfCohabitation: { type: String, trim: true },
  dateOfSeparation: { type: String, trim: true },
  children: { type: Boolean},
  childrenInfo: [{ firstName: String, lastName: String, middleNames: String, DoB: Date}]
});

module.exports = mongoose.model('Case', caseSchema);
