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
  case_ID: { type: String, trim: true },
  financialInfo: {
    income: {
      occupation: { type: String},
      employer: { type: String },
      monthlyIncomeEmployed: {
        active: { type: Boolean},
        salaryGross: { type: Number },
        otherEarnings: { type: Number },
        overTimeBonusComission: { type: Number },
        nationalInsurance: { type: Number },
        incomeTax: { type: Number },
        pensionContributions: { type: Number },
        otherDeduction: { type: Number },
        totalDeductions: { type: Number },
        netIncome: { type: Number },
        p60: [{
          path: { type: String },
          added: { type: Date }}],
        p11d: [{
          path: { type: String },
          added: { type: Date }}],
        payslips: [{
          path: { type: String },
          added: { type: Date }}]
      },
      monthlyIncomeSelfEmp: {
        active: { type: Boolean},
        drawings: { type: Number },
        selfAssessmentDocs: [{
          path: { type: String },
          added: { type: Date }}],
        managementAccounts: [{
          path: { type: String },
          added: { type: Date }
        }]
      },
      otherIncome: {
        childBenefit: { type: Number },
        workingTaxCredit: { type: Number },
        childTaxCredit: { type: Number },
        childSupport: { type: Number },
        dividendsAndInterest: { type: Number },
        propertyIncome: { type: Number },
        trustsSharesPension: { type: Number },
        miscIncome: { type: Number },
        totalOtherIncome: { type: Number },
        likelyTax: { type: Number },
      },
      totalNetIncome: { type: Number },
    },
    expenditure: {
      accomodation:{
        mortgageRent: { type: Number },
        pensionPremium: { type: Number },
        buildingContentsInsurance: { type: Number },
        maintenance: { type: Number }
      },
      financialCommitments:{
        bankLoanRepayments: { type: Number },
        hpFinanceHouses: { type: Number },
        clubsMailOrderCatalogues: { type: Number },
        creditStoreCards: { type: Number },
        additionalPensionContributions: { type: Number },
        otherInsurance: { type: Number },
        investmentsSavings: [{ description: { type: String },
        amount: { type: Number }}],
        maintenance: { type: Number },
      },
      utilities:{
        councilTax: { type: Number },
        waterSewage: { type: Number },
        gasOilFuel: { type: Number },
        electricity: { type: Number },
        telephone: { type: Number },
        mobilePhone: { type: Number },
        tvLicense: { type: Number }
      },
      transport:{
        vehicleRepayments: { type: Number },
        insuranceRoadTax: { type: Number },
        serviceRepairsMOT: { type: Number },
        breakdownCover: { type: Number },
        petrolParking: { type: Number },
        publicTransport: { type: Number }
      },
      householdExpenses:{
        foodMilkGeneral: { type: Number },
        vetBills: { type: Number },
        cleanerGardenWindow: { type: Number },
        laundryClothesShoesRepairs: { type: Number },
        tvRental: { type: Number },
        satCableWebSubscription: { type: Number }
      },
      personalExpenses:{
        clothes: { type: Number },
        hairToiletariesCosmetics: { type: Number },
        newsMagazines: { type: Number },
        dentalOptician: { type: Number },
        otherHealth: { type: Number },
        tobaccoAlcohol: { type: Number },
        workMeals: { type: Number },
        presents: { type: Number },
        charity: { type: Number },
        stationaryPostage: { type: Number }
      },
      recreationalExpenses:{
        holidaysOutings: { type: Number },
        sportsHobbies: { type: Number },
        cinemaTheatreConcertsVideo: { type: Number },
        mealsOutEntertaining: { type: Number }
      },
      expenditureTotal: { type: Number },
      childExpenditure: [{
        childCare: {
          babysitting: { type: Number },
          nurseryPlaygroup: { type: Number },
          childminderNanny: { type: Number }
        },
        recreation: {
          clothesShoes: { type: Number },
          clubsGroups: { type: Number },
          equipmentLessons: { type: Number },
          allowance: { type: Number }
        },
        education: {
          schoolTravel: { type: Number },
          schoolMeals: { type: Number },
          schoolTrips: { type: Number },
          schoolUniform: { type: Number },
          schoolCollegeFees: { type: Number },
          extraTuition: { type: Number },
          higherEducationSupport: { type: Number }
        },
        personalCare: {
          nappies: { type: Number },
          toiletariesHaircut: { type: Number }
        },
        totalChildExpenditure: { type: Number }
      }],
      },
    assetsAndLiabilities: {
      familyHome: {
        active: { type: Boolean},
        address: { type: String },
        dateOfPurchase: { type: Date },
        jointSoleOwnership: { type: String },
        freeholdLeasehold: { type: String },
        numberOfBedrooms: { type: Number },
        purchasePrice: { type: Number },
        dateOfValuation: { type: Date },
        currentValue: { type: Number },
        mortgageRemainder1: { type: Number },
        mortgageType1: { type: String },
        mortgageRemainder2: { type: Number },
        mortgageType2: { type: String },
        mortgagePenalties: { type: Number },
        salesCosts: { type: Number },
        netEquity: { type: Number },
        valuationDocs: [{
          path: { type: String },
          added: { type: Date }
        }],
        mortgageDocs: [{
          path: { type: String },
          added: { type: Date }
        }]
      },
      otherProperty: [{
        active: { type: Boolean},
        address: { type: String },
        dateOfPurchase: { type: Date },
        jointSoleOwnership: { type: String },
        freeholdLeasehold: { type: String },
        deposit: { type: Number },
        purchasePrice: { type: Number },
        dateOfValuation: { type: Date },
        currentValue: { type: Number },
        mortgageRemainder1: { type: Number },
        mortgageType1: { type: String },
        mortgageRemainder2: { type: Number },
        mortgageType2: { type: String },
        mortgagePenalties: { type: Number },
        salesCosts: { type: Number },
        netEquity: { type: Number },
        valuationDocs: [{
          path: { type: String },
          added: { type: Date }}],
        mortgageDocs: [{
          path: { type: String },
          added: { type: Date }}]
      }],
      savingsSchemes: [{
        active: { type: Boolean},
        nameOfCompany: { type: String },
        typeOfScheme: { type: String },
        jointOrSole: { type: String },
        maturityDate: { type: Date },
        maturityValue: { type: Number },
        sumAssured: { type: Number },
        surrTransFundVal: { type: Number },
        date: { type: Date },
        schemeDocs: [{
          path: { type: String },
          added: { type: Date }}]
      }],
      bankSocietySavingsAccounts: [{
        active: { type: Boolean},
        nameOfInstitution: { type: String },
        lastFourAcctDigits: { type: Number },
        typeOfAccount: { type: String },
        jointOrSole: { type: String },
        balance: { type: Number },
        date: { type: Date },
        accountDocs: [{
          path: { type: String },
          added: { type: Date }}]
      }],
      stocksSharesEtc: [{
        active: { type: Boolean},
        nameOfHolding: { type: String },
        typeOfHolding: { type: Number },
        numberSize: { type: Number },
        jointOrSole: { type: String },
        currentValue: { type: Number },
        date: { type: Date },
        investmentDocs: [{
          path: { type: String },
          added: { type: Date }}]
      }],
      nationalSavingsCerts: [{
        active: { type: Boolean},
        nameOfIssue: { type: String },
        typeOfHolding: { type: String },
        numberSize: { type: Number },
        jointOrSole: { type: String },
        currentValue: { type: Number },
        date: { type: Date },
        savingCertsDocs: [{
          path: { type: String },
          added: { type: Date }}]
      }],
      nationalSavingsBonds: [{
        active: { type: Boolean},
        typeOfBond: { type: String },
        bondholderNumber: { type: Number },
        jointOrSole: { type: String },
        currentValue: { type: Number },
        date: { type: Date },
        bondsDocs: [{
          path: { type: String },
          added: { type: Date }}]
      }],
      insurancePolicies: [{
        active: { type: Boolean},
        nameOfCompany: { type: String },
        policyNumber: { type: Number },
        policyType: { type: String },
        lifeAssured: { type: Boolean },
        estMaturityValue: { type: Number },
        maturityDate: { type: Date },
        surrenderValue: { type: Number},
        insuranceDocs: [{
          path: { type: String },
          added: { type: Date }}]
      }],
      moneyOwedByOthers: [{
        active: { type: Boolean},
        description: { type: String },
        jointOrSole: { type: String },
        amount: { type: Number }
      }],
      cash: [{
        active: { type: Boolean},
        location: { type: String },
        jointOrSole: { type: String },
        amount: { type: Number },
        currency: { type: String }
      }],
      vehicles: [{
        active: { type: Boolean},
        description: { type: String },
        jointOrSole: { type: String },
        value: { type: Number }
      }],
      valuables: [{
        active: { type: Boolean},
        description: { type: String },
        jointOrSole: { type: String },
        value: { type: Number }
      }],
      businessInterests: [{
        active: { type: Boolean},
        nameOfCompany: { type: String },
        description: { type: String },
        basisOfValuation: { type: String },
        outstandingAmountsDue: { type: String },
        value: { type: Number },
        businessAccountsDocs: [{
          path: { type: String },
          added: { type: Date }}],
        businessValueDocs: [{
          path: { type: String },
          added: { type: Date }}]
      }],
      otherAssets: [{
        active: { type: Boolean},
        typeOfAsset: { type: String },
        value: { type: Number }
      }],
      liabilities: [{
        active: { type: Boolean},
        description: { type: String },
        owedPersonCompany: { type: String },
        value: { type: Number }
      }],
      capitalGainsTax: [{
        active: { type: Boolean},
        asset: { type: String },
        tax: { type: Number }
      }],
      pensions: [{
        active: { type: Boolean},
        name: { type: String },
        address: { type: String },
        nationalInsuranceNumber: { type: String },
        pensionNumber: { type: String },
        schemeType: { type: String },
        dateCETVCalc: { type: String },
        status: { type: String},
        value: { type: Number },
        pensionDocs: [{
          path: { type: String },
          added: { type: Date }}]
      }],
      pensionsTotal: { type: Number },
      newPartnerInfo: {
        active: { type: Boolean},
        annualIncome: [{
          natureOfIncome: { type: String },
          value: { type: Number },
          grossOrNet: { type: String }
        }],
        totalAnnualIncome: { type: Number },
        assetsAndLiabilities: [{
          item: { type: String },
          value: { type: Number }
        }],
        totalAssetsAndLiabilities: { type: Number }
      }
    }
  }
},{
  timestamps: true
},
{strict: false});

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
