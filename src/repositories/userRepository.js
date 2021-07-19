const bcrypt = require('bcryptjs');
const User = require('../models/user');

class UserRepository {

  constructor() {

  }

  async findById(id) {
    return await User.findById(id);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async getAllUsers() {
    return await User.find();
  }

  async getAllUsersWithPagination(filter, options) {
    return await User.paginate(filter, options);
  }


  async save(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  }

  async update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }



}

module.exports = UserRepository;