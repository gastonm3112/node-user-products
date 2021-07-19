const express = require('express');
const userService = require('../services/userService');
const Success = require('../handlers/succesHandler');

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @param {Express.next} next 
 */
const getUsers = async (req, res, next) => {
  try {
    const { filter, options } = req.query;

    const users = await userService.getAllUsers(filter, options);

    res.json(new Success(users));

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
 * @param {Express.next} next
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.remove(id);

    res.status(200).json(new Success(user));
  } catch (error) {
    next(error);
  }


}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
}