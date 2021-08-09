const { Router } = require('express');
const {
  getCategoriesValidations,
  postCategoriesValidations
} = require('../middlewares/category');
const {
  getCategories,
  getCategoryById,
  createCategory,
} = require('../controllers/categories');

const router = new Router();

//Obterner categorias - publico
router.get('/', getCategories);

//Obtener UNA categoria - publico
router.get('/:id', getCategoriesValidations, getCategoryById);

//Crear categoria - privado - Cualquier persona con un token valido
router.post('/', postCategoriesValidations, createCategory);

//Actusalizar - privado - Cualquiera con token valido
router.put('/:id', (req, res) => {
  res.json('put');
});

//Borrar categoria - ADMIN_ROLE unicamente
router.delete('/:id', (req, res) => {
  res.json('Delete');
});


module.exports = router;