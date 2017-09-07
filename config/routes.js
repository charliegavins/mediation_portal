const express  = require('express');
const router   = express.Router();

const authentications      = require('../controllers/authentications');
const users                = require('../controllers/users');
const cases                = require('../controllers/cases');
const mediators                = require('../controllers/mediators');
const docGen               = require('../controllers/docgen');
const excelData               = require('../controllers/exceldata');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/cases')
  .get(cases.index)
  .post(cases.new);
router.route('/cases/:id')
  .get(cases.show)
  .put(cases.update)
  .delete(cases.delete);

router.route('/mediators')
  .get(mediators.index)
  .post(mediators.new);
router.route('/mediators/:id')
  .get(mediators.show)
  .put(mediators.update)
  .delete(mediators.delete);


router.route('/upload')
  .post(users.file);

router.route('/generatedocument/:id')
  .get(docGen.gen);

router.route('/parseexcel/:id')
  .put(cases.parse);


module.exports = router;
