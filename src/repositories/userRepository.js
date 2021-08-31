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

  async getAllUsers(key) {
    return await User.find(key);
  }

  async getAllUsersWithPagination(filter, options) {
    return await User.paginate(filter, options);
  }


  async save(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  }

  async saveGoogleUser(user) {
    return await User.create(user);
  }

  async update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }

  async remove(id) {
    return await User.findByIdAndUpdate(id, { state: false });
  }



}

module.exports = UserRepository;