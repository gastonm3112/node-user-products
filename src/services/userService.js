const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();


const findByEmail = async (email) => {
  return await userRepository.findByEmail(email);
}

const save = async (user) => {
  return await userRepository.save(user);
}



module.exports = {
  save,
  findByEmail
}