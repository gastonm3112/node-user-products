const express = require('express');


/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Request} res 
 * @param {Express.next} next 
 */
const search = async (req, res, next) => {
  try {

    const { collection, keyword } = req.params;

    res.json({ collection, keyword });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  search
}