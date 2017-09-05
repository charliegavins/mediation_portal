const mongoose  = require('mongoose');


const mediatorSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true }
});
module.exports = mongoose.model('Mediator', mediatorSchema);
