const express = require('express');
const categoryService = require('../services/categoryService');
const Success = require('../handlers/succesHandler');
const user = require('../models/user');

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @param {Express.next} next 
 */
const getCategories = async (req, res, next) => {

  const { filter, options } = req.query;

  const customOptions = {
    options,
    populate: 'user'
  }

  const categories = await categoryService.getAllCategories(filter, customOptions);

  res.json(new Success(categories));
}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @param {Express.next} next 
 */
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await categoryService.findCategoryById(id);

    res.json(new Success(category));

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

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @param {Express.next} next 
 */
const updateCategory = async (req, res, next) => {
  try {

    const { id } = req.params;
    const name = req.body.name.toUpperCase();

    const data = {
      name,
      user: req.user._id
    }

    const category = await categoryService.updateCategory(id, data);

    res.json(new Success(category));

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
}