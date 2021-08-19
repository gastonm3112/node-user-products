const { Router } = require('express');


const router = new Router();

//Obterner categorias - publico
router.get('/',);

//Obtener UNA categoria - publico
router.get('/:id',);

//Crear categoria - privado - Cualquier persona con un token valido
router.post('/',);

//Actusalizar - privado - Cualquiera con token valido
router.put('/:id',);

//Borrar categoria - ADMIN_ROLE unicamente
router.delete('/:id',);


module.exports = router;