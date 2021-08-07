const { check } = require('express-validator');
const { validationResult } = require('../result');
const { validJWT } = require('../auth');
const categoryService = require('../../services/categoryService');
const AppError = require('../../errors/appError');

//POST validations
const _nameRequired = check('name', 'name is mandatory').not().isEmpty();

const _nameExist = check('name').custom(
  async (name = '') => {
    const nameFound = await categoryService.findCategoryByName(name.toUpperCase());
    if (nameFound) {
      throw new AppError(`Name already exists in Database`, 400);
    }
  }
);










const postCategoriesValidations = [
  validJWT,
  _nameRequired,
  _nameExist,
  validationResult
];





module.exports = {
  postCategoriesValidations,
}