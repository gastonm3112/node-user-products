const { Router } = require('express');
const {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require('../controllers/users');

const router = new Router();

router.get('/', getUsers);
router.post('/', createUsers);
router.put('/:id', updateUsers);
router.delete('/', deleteUsers);

module.exports = router;