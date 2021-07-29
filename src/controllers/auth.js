const express = require('express');
const authService = require('../services/authService');
const Success = require('../handlers/succesHandler');
const AppError = require('../errors/appError');


/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Request} res 
 * @param {Express.next} next 
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    res.json(new Success(await authService.login(email, password)));

  } catch (error) {
    next(error);
  }
}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Request} res 
 * @param {Express.next} next 
 */
const googleSignin = async (req, res, next) => {

  const { id_token } = req.body;

  try {
    res.json(new Success(await authService.googleLogin(id_token)));

  } catch (error) {
    next(error);
  }


}


module.exports = {
  login,
  googleSignin
}