const mongoose  = require('mongoose');


const caseSchema = new mongoose.Schema({
  caseID: { type: String, trim: true, unique: true },
  partnerA: { type: mongoose.Schema.ObjectId, ref: 'User' },
  partnerB: { type: mongoose.Schema.ObjectId, ref: 'User' },
  mediator: { type: mongoose.Schema.ObjectId, ref: 'Mediator' },
  numberOfSessions: { type: Number },
  mediationStart: { type: Date, trim: true },
  mediationEnd: { type: Date, trim: true },
  dateOfMarriage: { type: Date, trim: true },
  dateOfCohabitation: { type: String, trim: true },
  dateOfSeparation: { type: String, trim: true },
  MoUFinance: {
    familyHome: {
      partnerA: { type: Number, trim: true },
      partnerB: { type: Number, trim: true }
    },
    otherProperty: {
      partnerA: { type: Number, trim: true },
      partnerB: { type: Number, trim: true }
    },
    personalAssets: {
      partnerA: { type: Number, trim: true },
      partnerB: { type: Number, trim: true }
    },
    liabilities: {
      partnerA: { type: Number, trim: true },
      partnerB: { type: Number, trim: true }
    },
    businessAssets: {
      partnerA: { type: Number, trim: true },
      partnerB: { type: Number, trim: true }
    },
    otherAssets: {
      partnerA: { type: Number, trim: true },
      partnerB: { type: Number, trim: true }
    },
    pensions: {
      partnerA: { type: Number, trim: true },
      partnerB: { type: Number, trim: true }
    }
  },
  children: { type: Boolean},
  childrenInfo: [{
    firstName: { type: String},
    lastName: { type: String},
    middleNames: { type: String},
    DoB: { type: Date}
  }]
},{
  timestamps: true
});

module.exports = mongoose.model('Case', caseSchema);
