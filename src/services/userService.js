const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();

const findById = async (id) => {
  return await userRepository.findById(id);
}

const findByEmail = async (email) => {
  return await userRepository.findByEmail(email);
}

const save = async (user) => {
  return await userRepository.save(user);
}

const update = async (id, user) => {
  return await userRepository.update(id, user);
}



module.exports = {
  findById,
  findByEmail,
  save,
  update,
}