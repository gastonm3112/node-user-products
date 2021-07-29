const { Router } = require('express');
const {
  login,
  googleSignin } = require('../controllers/auth');
const {
  loginRequestValidations,
  googleRequestValidations
} = require('../middlewares/auth/index');

const router = new Router();



router.post('/login', loginRequestValidations, login);
router.post('/google', googleRequestValidations, googleSignin);


module.exports = router;