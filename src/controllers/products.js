const express = require('express');
const productService = require('../services/productService');
const Success = require('../handlers/succesHandler');

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @param {Express.next} next 
 */
const getProducts = async (req, res, next) => {
  try {
    const { filter, options } = req.query;

    const categories = await productService.getAllProducts(filter, options);

    res.json(new Success(categories));

  } catch (error) {
    next
  }
}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @param {Express.next} next 
 */
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productService.findProductById(id);

    res.json(new Success(product));

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
const createProduct = async (req, res, next) => {
  try {
    const { state, user, ...body } = req.body;

    const data = {
      ...body,
      name: body.name.toUpperCase(),
      user: req.user._id
    }

    const product = await productService.saveProduct(data);

    res.status(201).json(new Success(product));

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
const updateProduct = async (req, res, next) => {
  try {

    const { id } = req.params;
    const { state, user, ...body } = req.body;

    if (body.name) {
      body.name = body.name.toUpperCase();
    }

    body.user = req.user._id;

    const product = await productService.updateProduct(id, body);

    res.json(new Success(product));

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
const removeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.removeProduct(id);

    res.status(200).json(new Success(product));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct

}