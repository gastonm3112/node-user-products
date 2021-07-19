const bcrypt = require('bcryptjs');
const User = require('../models/user');

class UserRepository {

  constructor() {

  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }


  async save(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  }



}

module.exports = UserRepository;