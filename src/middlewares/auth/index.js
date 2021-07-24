const express = require('express');
const { check } = require('express-validator');
const { validationResult } = require('../result');
const { validToken, validRole } = require('../../services/authService');


const _emailRequired = check('email', 'email required').not().isEmpty();
const _emailValid = check('email', 'invalid email').isEmail();
const _passwordRequired = check('password', 'password required').not().isEmpty();


/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Request} res 
 * @param {Express.next} next 
 */
const validJWT = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    const user = await validToken(token);

    req.user = user;

    next();
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
const hasRole = (...roles) => {
  return (req, res, next) => {
    try {
      validRole(req.user, ...roles);
      next();
    } catch (error) {
      next(error);
    }
  }
}




const loginRequestValidations = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  validationResult
];

module.exports = {
  loginRequestValidations,
  validJWT,
  hasRole
}