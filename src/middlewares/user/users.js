const { validationResult } = require('../result');
const { check } = require('express-validator');
const AppError = require('../../errors/appError');
const userService = require('../../services/userService');
const { ROLES } = require('../../constants/index');

//POST validations
const _nameRequired = check('name', 'name required').not().isEmpty();
const _emailRequired = check('email', 'email required').not().isEmpty();
const _emailValid = check('email', 'invalid email').isEmail();
const _emailExist = check('email').custom(
  async (email = '') => {
    const userFound = await userService.findByEmail(email);
    if (userFound) {
      throw new AppError('email already exists in DB', 400);
    }
  }
)
const _passwordRequired = check('password', 'password required').not().isEmpty();
const _roleValid = check('role').custom(
  async (role = '') => {
    if (!ROLES.includes(role)) {
      throw new AppError('Invalid role', 400);
    }
  }
)







const postValidationsRequest = [
  _nameRequired,
  _emailRequired,
  _emailValid,
  _emailExist,
  _passwordRequired,
  _roleValid,
  validationResult
]




module.exports = {
  postValidationsRequest,
}