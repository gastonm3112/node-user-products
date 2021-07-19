const { Router } = require('express');
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const {
  postValidationsRequest,
  putValidationsRequest,
} = require('../middlewares/user/index');

const router = new Router();

router.get('/', getUser);
router.post('/', postValidationsRequest, createUser);
router.put('/:id', putValidationsRequest, updateUser);
router.delete('/', deleteUser);

module.exports = router;