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
);
const _passwordRequired = check('password', 'password required').not().isEmpty();
const _roleValid = check('role').optional().custom(
  async (role = '') => {
    if (!ROLES.includes(role)) {
      throw new AppError('Invalid role', 400);
    }
  }
);

//PUT validations
const _idRequired = check('id').not().isEmpty();
const _idValid = check('id').isMongoId();
const _idExist = check('id').custom(
  async (id = '') => {
    const userFound = await userService.findById(id);
    if (!userFound) {
      throw new AppError('The id does not exist in the DB', 400);
    }
  }
);
const _optionalEmailValid = check('email', 'invalid email').optional().isEmail();
const _optionalEmailExist = check('email').optional().custom(
  async (email = '') => {
    const userFound = await userService.findByEmail(email);
    if (userFound) {
      throw new AppError('email already exists in DB', 400);
    }
  }
);







const postValidationsRequest = [
  _nameRequired,
  _emailRequired,
  _emailValid,
  _emailExist,
  _passwordRequired,
  _roleValid,
  validationResult
];

const putValidationsRequest = [
  _idRequired,
  _idValid,
  _idExist,
  _optionalEmailValid,
  _optionalEmailExist,
  _roleValid,
  validationResult
];

const deleteValidationsRequest = [
  _idRequired,
  _idValid,
  _idExist,
  validationResult
]




module.exports = {
  postValidationsRequest,
  putValidationsRequest,
  deleteValidationsRequest
}