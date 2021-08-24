const { Router } = require('express');
const {
  getProductValidations,
  postProductsValidations,
  putProductsValidations,
  deleteProductsValidations
} = require('../middlewares/product');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct
} = require('../controllers/products');

const router = new Router();

//Obterner categorias - publico
router.get('/', getProducts);

//Obtener UNA categoria - publico
router.get('/:id', getProductValidations, getProductById);

//Crear categoria - privado - Cualquier persona con un token valido
router.post('/', postProductsValidations, createProduct);

//Actusalizar - privado - Cualquiera con token valido
router.put('/:id', putProductsValidations, updateProduct);

//Borrar categoria - ADMIN_ROLE unicamente
router.delete('/:id', deleteProductsValidations, removeProduct);


module.exports = router;