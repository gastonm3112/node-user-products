const { check } = require('express-validator');
const { validationResult } = require('../result');
const { validJWT, hasRole } = require('../auth');
const {
  productService,
  categoryService } = require('../../services');
const AppError = require('../../errors/appError');

//POST validations
const _nameRequired = check('name', 'name is mandatory').not().isEmpty();

const _nameExist = check('name').custom(
  async (name = '') => {
    const nameFound = await productService.findProductByName(name.toUpperCase());
    if (nameFound) {
      throw new AppError(`Name already exists in Database`, 400);
    }
  }
);

//ID Validations
const _idRequired = check('id').not().isEmpty();
const _idValid = check('id').isMongoId();
const _idCategoryValid = check('category').isMongoId();
const _idCategoryValidOptional = check('category').optional().isMongoId();
const _idCategoryExist = check('category').custom(
  async (id = '') => {
    const categoryFound = await categoryService.findByIdCat(id);
    if (!categoryFound) {
      throw new AppError('The id does not exist in the DB', 400);
    }
  }
);
const _idCategoryExistOptional = check('category').optional().custom(
  async (id = '') => {
    const categoryFound = await categoryService.findByIdCat(id);
    if (!categoryFound) {
      throw new AppError('The id does not exist in the DB', 400);
    }
  }
);
const _idProductExist = check('id').custom(
  async (id = '') => {
    const productFound = await productService.findProductById(id);
    if (!productFound) {
      throw new AppError('The id does not exist in the DB', 400);
    }
  }
);





const getProductValidations = [
  _idRequired,
  _idValid,
  _idProductExist,
  validationResult
]




const postProductsValidations = [
  validJWT,
  _nameRequired,
  _nameExist,
  _idCategoryValid,
  _idCategoryExist,
  validationResult
];

const putProductsValidations = [
  validJWT,
  _idRequired,
  _idValid,
  _idProductExist,
  _idCategoryValidOptional,
  _idCategoryExistOptional,
  validationResult
];

const deleteProductsValidations = [
  validJWT,
  hasRole('ADMIN_ROLE'),
  _idRequired,
  _idValid,
  _idProductExist,
  validationResult
];




module.exports = {
  getProductValidations,
  postProductsValidations,
  putProductsValidations,
  deleteProductsValidations
}