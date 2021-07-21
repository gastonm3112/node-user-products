const { validationResult } = require('../result');
const { check } = require('express-validator');


const _emailRequired = check('email', 'email required').not().isEmpty();
const _emailValid = check('email', 'invalid email').isEmail();
const _passwordRequired = check('password', 'password required').not().isEmpty();


const loginRequestValidations = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  validationResult
];

module.exports = {
  loginRequestValidations
}