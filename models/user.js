const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  title: { type: String, trim: true},
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  middleNames: { type: String, trim: true },
  DoB: { type: Date, trim: true },
  homeAddress: { type: String, trim: true },
  postcode: { type: String, trim: true, lowercase: true },
  mobileTel: { type: String, trim: true },
  otherTel: { type: String, trim: true },
  email: { type: String, unique: true, trim: true, required: true },
  passwordHash: { type: String, required: true },
  hasSolicitor: { type: Boolean },
  solicitorName: { type: String, trim: true },
  solicitorCompanyName: { type: String, trim: true },
  solicitorEmail: { type: String, trim: true },
  solicitorTel: { type: String, trim: true },
  solicitorAddress: { type: String, trim: true },
  activeCase: { type: Boolean },
  case_ID: { type: String, trim: true }
},{
  timestamps: true
});

userSchema
  .virtual('password')
  .set(setPassword);

userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

userSchema
  .path('passwordHash')
  .validate(validatePasswordHash);

userSchema
  .path('email')
  .validate(validateEmail);

userSchema.methods.validatePassword = validatePassword;

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);

function setPassword(value){
  this._password    = value;
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

function validatePasswordHash() {
  if (this.isNew) {
    if (!this._password) {
      return this.invalidate('password', 'A password is required.');
    }

    if (this._password.length < 6) {
      this.invalidate('password', 'must be at least 6 characters.');
    }

    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
}

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return this.invalidate('email', 'must be a valid email address');
  }
}

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}
