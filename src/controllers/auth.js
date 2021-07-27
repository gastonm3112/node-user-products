const express = require('express');
const authService = require('../services/authService');
const Success = require('../handlers/succesHandler');


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
const googleSignin = (req, res) => {

  const { id_token } = req.body;

  res.json({
    msg: 'This controller works!',
    id_token
  })


}


module.exports = {
  login,
  googleSignin
}