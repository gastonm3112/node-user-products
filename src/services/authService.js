const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const AppError = require('../errors/appError');
const config = require('../config');

const login = async (email, password) => {
  try {
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
    const token = _encrypt(user._id);

    return {
      token,
      user: user.name,
      role: user.role
    }

  } catch (error) {
    throw error;
  }


}

_encrypt = (uid) => {
  return jwt.sign({ uid }, config.auth.secret, { expiresIn: config.auth.expires });
}



module.exports = {
  login
}