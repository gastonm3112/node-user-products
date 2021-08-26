const { Router } = require('express');
const { search } = require('../controllers/search');

const router = new Router();


router.get('/:collection/:keyword', search);



module.exports = router;