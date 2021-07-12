const express = require('express');

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getUsers = (req, res) => {

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
const createUsers = (req, res) => {

  const { nombre, edad } = req.body;

  res.status(201).json({
    message: 'post - API controller',
    nombre,
    edad
  })

}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const updateUsers = (req, res) => {

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
const deleteUsers = (req, res) => {

  res.status(200).json({
    message: 'post - API controller'
  })

}

module.exports = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
}