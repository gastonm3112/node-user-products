const { Router } = require('express');

const router = new Router();

//Obterner categorias - publico
router.get('/', (req, res) => {
  res.json('Todo Ok!');
});

//Obtener UNA categoria - publico
router.get('/:id', (req, res) => {
  res.json('Get - id');
});

//Crear categoria - privado - Cualquier persona con un token valido
router.post('/', (req, res) => {
  res.json('Post');
});

//Actusalizar - privado - Cualquiera con token valido
router.put('/:id', (req, res) => {
  res.json('put');
});

//Borrar categoria - ADMIN_ROLE unicamente
router.delete('/:id', (req, res) => {
  res.json('Delete');
});


module.exports = router;