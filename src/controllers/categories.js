const express = require('express');
const categoryService = require('../services/categoryService');
const Success = require('../handlers/succesHandler');



/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @param {Express.next} next 
 */
const createCategory = async (req, res, next) => {
  try {
    const name = req.body.name.toUpperCase();

    const data = {
      name,
      user: req.user._id
    }

    const category = await categoryService.saveCategory(data);

    res.status(201).json(new Success(category));

  } catch (error) {
    next(error);
  }

}

module.exports = {
  createCategory,
}