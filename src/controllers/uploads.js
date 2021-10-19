const express = require('express');
const logger = require('../loaders/logger');
const {
  uploadService,
  userService,
  productService } = require('../services');
const AppError = require('../errors/appError');
const Success = require('../handlers/succesHandler');


/**
 * 
 * @param {Express.Request} req 
 * @param {Express.response} res 
 * @param {Express.next} next 
 */
const uploadFile = async (req, res, next) => {
  try {
    //For images
    const name = await uploadService.uploadFiles(req.files, undefined, 'images');

    res.status(201).json(new Success({ name }));

  } catch (error) {
    next(error);
  }
}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.next} next 
 * 
 * PRE: collection and id must exist - id has to be a MongoId
 * POS: Update an image of a collection
 */
const updateImage = async (req, res, next) => {
  try {
    const { collection, id } = req.params;


    let model;

    switch (collection) {
      case 'users':

        model = await userService.findById(id);

        if (!model) {
          throw new AppError(`The user with the id ${id} does not exists`, 400);
        }
        break;

      case 'products':

        model = await productService.findProductById(id);

        if (!model) {
          throw new AppError(`The product with the id ${id} does not exists`, 400);
        }
        break;

      default:
        throw new AppError('Work is still in progress', 500);
    };

    const name = await uploadService.uploadFiles(req.files, undefined, collection);

    model.img = name;

    await model.save();

    res.json(new Success(model));

  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadFile,
  updateImage
}