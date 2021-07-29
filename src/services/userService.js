const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();

const findById = async (id) => {
  return await userRepository.findById(id);
}

const findByEmail = async (email) => {
  return await userRepository.findByEmail(email);
}

const getAllUsers = async (filter, options) => {
  return await userRepository.getAllUsersWithPagination(filter, options);
}

const save = async (user) => {
  return await userRepository.save(user);
}

const saveGoogleUser = async (user) => {
  return await userRepository.saveGoogleUser(user);
}


const update = async (id, user) => {
  return await userRepository.update(id, user);
}

const remove = async (id) => {
  return await userRepository.remove(id);
}



module.exports = {
  findById,
  findByEmail,
  getAllUsers,
  save,
  saveGoogleUser,
  update,
  remove
}