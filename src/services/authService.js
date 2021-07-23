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

const validToken = async (token) => {
  try {
    //TODO:
    //Validar que ingrese por parametro el token
    if (!token) {
      throw new AppError('Authentication failed! Token required', 401);
    }

    console.log(`Token received: ${token}`);
    //Validar que el token siga vivo
    let id;
    try {
      const obj = jwt.verify(token, config.auth.secret);
      id = obj.uid;
    } catch (error) {
      throw new AppError('Authentication failed! Invalid Token', 401)
    }
    //Validar si hay usuario en DB
    const user = await userService.findById(id);
    if (!user) {
      throw new AppError('Authentication failed! User not found', 401);
    }
    //Validar si el usuario esta habilitado
    if (!user.state) {
      throw new AppError('Authentication failed!, user is not enable', 401);
    }
    //retornarusuario
    return user;
  } catch (error) {
    throw error;
  }



}


_encrypt = (uid) => {
  return jwt.sign({ uid }, config.auth.secret, { expiresIn: config.auth.expires });
}



module.exports = {
  login,
  validToken

}