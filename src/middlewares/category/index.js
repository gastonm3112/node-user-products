const { check } = require('express-validator');
const { validationResult } = require('../result');
const { validJWT, hasRole } = require('../auth');
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

//ID Validations
const _idRequired = check('id').not().isEmpty();
const _idValid = check('id').isMongoId();
const _idExist = check('id').custom(
  async (id = '') => {
    const categoryFound = await categoryService.findCategoryById(id);
    if (!categoryFound) {
      throw new AppError('The id does not exist in the DB', 400);
    }
  }
);





const getCategoriesValidations = [
  _idRequired,
  _idValid,
  _idExist,
  validationResult
]




const postCategoriesValidations = [
  validJWT,
  _nameRequired,
  _nameExist,
  validationResult
];

const putCategoriesValidations = [
  validJWT,
  _idRequired,
  _idValid,
  _idExist,
  _nameRequired,
  _nameExist,
  validationResult
];

const deleteCategoriesValidations = [
  validJWT,
  hasRole('ADMIN_ROLE'),
  _idRequired,
  _idValid,
  _idExist,
  validationResult
];




module.exports = {
  getCategoriesValidations,
  postCategoriesValidations,
  putCategoriesValidations,
  deleteCategoriesValidations
}