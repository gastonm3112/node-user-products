const express = require('express');
const AppError = require('../../errors/appError');
const { check } = require('express-validator');
const { validationResult } = require('../result');
const { validJWT } = require('../auth');
const { allowedCollections } = require('../helpers');

const _idValid = check('id').isMongoId();

const _validCollection = check('collection').custom(c => allowedCollections(c, ['users', 'products']));

const _validateFile = (req, res, next) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    throw new AppError('No files were uploaded', 400);
  }

  next();
}








const postUploadsValidations = [
  validJWT,
  _validateFile,
  validationResult
];

const putUploadsValidations = [
  validJWT,
  _idValid,
  _validCollection,
  _validateFile,
  validationResult
];

module.exports = {
  postUploadsValidations,
  putUploadsValidations,
}