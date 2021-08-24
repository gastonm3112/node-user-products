const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const userService = require('../services/userService');
const AppError = require('../errors/appError');
const config = require('../config');
const logger = require('../loaders/logger');
const client = new OAuth2Client(config.google.clientId);


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
    if (!token) {
      throw new AppError('Authentication failed! Token required', 401);
    }

    logger.info(`Token received: ${token}`);

    let id;
    try {
      const obj = jwt.verify(token, config.auth.secret);
      id = obj.uid;
    } catch (error) {
      throw new AppError('Authentication failed! Invalid Token', 401)
    }

    const user = await userService.findById(id);
    if (!user) {
      throw new AppError('Authentication failed! User not found', 401);
    }

    if (!user.state) {
      throw new AppError('Authentication failed!, user is not enable', 401);
    }

    return user;
  } catch (error) {
    throw error;
  }
}

const validRole = (user, ...roles) => {
  if (!roles.includes(user.role)) {
    throw new AppError('Authorization failed! User without privileges', 403);
  }
  return true;
}


_encrypt = (uid) => {
  return jwt.sign({ uid }, config.auth.secret, { expiresIn: config.auth.expires });
}


const verifyGoogleToken = async (idToken) => {

  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.google.clientId,
  });


  const {
    name,
    email,
    picture: img
  } = ticket.getPayload();

  return {
    name,
    email,
    img
  };
}

const googleLogin = async (idToken) => {

  const { name, email, img } = await verifyGoogleToken(idToken);
  let user = await userService.findByEmail(email);
  if (!user) {
    //Create user
    const userData = {
      name,
      email,
      img,
      password: 'no-required',
      google: true
    };

    user = await userService.saveGoogleUser(userData);
  }

  if (!user.state) {
    throw new AppError('This user is disabled', 401);
  }

  //Generar JWT
  const token = _encrypt(user._id);

  return {
    user,
    token
  }


}







module.exports = {
  login,
  validToken,
  validRole,
  verifyGoogleToken,
  googleLogin
}