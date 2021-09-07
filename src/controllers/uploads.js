const path = require('path');
const express = require('express');
const logger = require('../loaders/logger');
const AppError = require('../errors/appError');
const Success = require('../handlers/succesHandler');


/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Request} res 
 * @param {Express.next} next 
 */
const uploadFile = (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      throw new AppError('No files were uploaded', 400);
    }

    logger.info('req.files >>>', req.files);

    const { file } = req.files;
    const splittedName = file.name.split('.');
    const extension = splittedName[splittedName.length - 1];

    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (!validExtensions.includes(extension)) {
      throw new AppError(`Invalid extension, valid extensions: ${validExtensions.join(' - ')}`, 400);
    }

    // const uploadPath = path.join(__dirname, '../uploads/', file.name);

    // file.mv(uploadPath, (err) => {
    //   if (err) {
    //     throw new AppError('Error on moving file ', 500, err);
    //   }

    //   res.status(201).json(new Success({ file, path: `file uploaded to ${uploadPath}` }));
    // })

  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadFile
}