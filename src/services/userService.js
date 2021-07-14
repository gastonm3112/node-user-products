const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();




const save = async (user) => {
  return await userRepository.save(user);
}



module.exports = {
  save,
}