const { check } = require('express-validator');
const { validationResult } = require('../result');
const { validToken } = require('../../services/authService');


const _emailRequired = check('email', 'email required').not().isEmpty();
const _emailValid = check('email', 'invalid email').isEmail();
const _passwordRequired = check('password', 'password required').not().isEmpty();

const validJWT = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    const user = await validToken(token);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }


}




const loginRequestValidations = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  validationResult
];

module.exports = {
  loginRequestValidations,
  validJWT,
}