const { validationResult } = require('express-validator');
const AppError = require('../errors/appError');



const _validResult = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('error validations', 400, errors.errors);
  }

  next();
}

module.exports = {
  validationResult: _validResult
}