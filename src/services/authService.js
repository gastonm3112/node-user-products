const bcrypt = require('bcryptjs');
const userService = require('../services/userService');
const AppError = require('../errors/appError');

const login = async (email, password) => {
  //TODO: 
  //Verificar si el mail existe
  const user = await userService.findByEmail(email);
  if (!user) {
    throw new AppError('Email / Password are not correct', 400);
  }
  //Verificar si el usuario esta activo
  if (!user.state) {
    throw new AppError('This user is disabled', 400);
  }
  //Verifcar contraseña
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    throw new AppError('Email / Password are not correct', 400);
  }
  //Generar JWT

}



module.exports = {
  login
}