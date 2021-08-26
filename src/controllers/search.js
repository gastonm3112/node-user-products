const express = require('express');


/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Request} res 
 * @param {Express.next} next 
 */
const search = async (req, res, next) => {
  try {

    const { collection, term } = req.params;

    res.json({ collection, term });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  search
}