const express = require('express');
const AppError = require('../errors/appError');
const Success = require('../handlers/succesHandler');
const { COLLECTIONS } = require('../constants');
const {
  searchService
} = require('../services');




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

        const users = await searchService.searchUsers(key, res);

        res.json(new Success(users));
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