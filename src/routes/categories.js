const { Router } = require('express');
const { postCategoriesValidations } = require('../middlewares/category');
const {
  getCategories,
  createCategory
} = require('../controllers/categories');

const router = new Router();

//Obterner categorias - publico
router.get('/', getCategories);

//Obtener UNA categoria - publico
router.get('/:id', (req, res) => {
  res.json('Get - id');
});

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