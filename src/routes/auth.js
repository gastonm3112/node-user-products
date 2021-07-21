const { Router } = require('express');
const { login } = require('../controllers/auth');
const {
  loginRequestValidations
} = require('../middlewares/auth/index');

const router = new Router();



router.post('/login', loginRequestValidations, login);


module.exports = router;