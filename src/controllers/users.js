const express = require('express');
const userModel = require('../models/user');
const userService = require('../services/userService');

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
 */
const createUser = async (req, res) => {

  const body = req.body;
  const user = await userService.save(body);


  res.status(201).json({
    user
  })

}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const updateUser = (req, res) => {

  const id = req.params.id;

  res.status(200).json({
    message: 'put - API controller',
    id
  })

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