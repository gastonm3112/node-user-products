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


module.exports = {
  login
}