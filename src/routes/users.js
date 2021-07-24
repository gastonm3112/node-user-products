const { Router } = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const {
  postValidationsRequest,
  putValidationsRequest,
  deleteValidationsRequest
} = require('../middlewares/user/index');

const router = new Router();

router.get('/', getUsers);
router.post('/', postValidationsRequest, createUser);
router.put('/:id', putValidationsRequest, updateUser);
router.delete('/:id', deleteValidationsRequest, deleteUser);

module.exports = router;