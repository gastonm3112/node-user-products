const express = require('express');
const { ObjectId } = require('mongoose').Types;
const AppError = require('../errors/appError');
const Success = require('../handlers/succesHandler');
const { COLLECTIONS } = require('../constants');
const {
  categoryService,
  productService,
  userService
} = require('../services');

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Request} res 
 * @param {Express.next} next 
 */
const searchUsers = async (key, res) => {

  const isMongoId = ObjectId.isValid(key); // true

  if (isMongoId) {
    const user = await userService.findById(key);

    return res.json(new Success((user) ? [user] : []));
  }

  const regex = new RegExp(key, 'i');

  const users = await userService.getUsers({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }]
  })

  res.json(new Success(users));
}


/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Request} res 
 * @param {Express.next} next 
 */
const search = async (req, res, next) => {
  try {

    const { collection, key } = req.params;

    if (!COLLECTIONS.includes(collection)) {
      throw new AppError(`Valid collections are ${COLLECTIONS}`, 400);
    }

    switch (collection) {
      case 'categories':

        break;
      case 'products':

        break;
      case 'users':
        await searchUsers(key, res);
        break;
      default:
        throw new AppError('Search still in progress', 500);
    }

    res.json({ collection, key });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  search
}