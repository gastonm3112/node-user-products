const express = require('express');
const { uploadService } = require('../services');
const AppError = require('../errors/appError');
const Success = require('../handlers/succesHandler');


/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.next} next 
 */
const uploadFile = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      throw new AppError('No files were uploaded', 400);
    }

    //For images
    const name = await uploadService.uploadFiles(req.files, undefined, 'images');

    res.status(201).json(new Success({ name }));

  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadFile
}