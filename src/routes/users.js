const { Router } = require('express');
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const router = new Router();

router.get('/', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/', deleteUser);

module.exports = router;