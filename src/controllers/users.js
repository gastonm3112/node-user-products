const express = require('express');
const userService = require('../services/userService');
const Success = require('../handlers/succesHandler');

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getUser = (req, res) => {

  const query = req.query;

  res.json({
    message: 'get Exitoso - API controler',
    query
  })

}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @param {Express.next} next 
 */
const createUser = async (req, res, next) => {
  try {
    let user = req.body;
    user = await userService.save(user);


    res.status(201).json(new Success(user));

  } catch (error) {
    next(error);
  }

}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.next} next
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let user = req.body;
    user._id = id;

    const userUpdated = await userService.update(id, user);

    res.status(200).json(new Success(userUpdated));

  } catch (error) {
    next(error);
  }

}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const deleteUser = (req, res) => {

  res.status(200).json({
    message: 'post - API controller'
  })

}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
}