const { check } = require('express-validator');
const { validationResult } = require('../result');
const { validJWT } = require('../auth');
const { allowedCollections } = require('../helpers');

const _idValid = check('id').isMongoId();

const _validCollection = check('collection').custom(c => allowedCollections(c, ['users', 'products']));








const postUploadsValidations = [
  validJWT,
  validationResult
];

const putUploadsValidations = [
  validJWT,
  _idValid,
  _validCollection,
  validationResult
];

module.exports = {
  postUploadsValidations,
  putUploadsValidations,
}