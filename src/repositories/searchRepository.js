const { ObjectId } = require('mongoose').Types;
const {
  Category,
  Product,
  User
} = require('../models');

class SearchRepository {

  constructor() { }

  async searchCategories(key) {
    const isMongoId = ObjectId.isValid(key); // true

    if (isMongoId) {
      const category = await Category.findById(key);

      return (category) ? [category] : [];
    }

    const regex = new RegExp(key, 'i');

    const categories = await Category.find({
      name: regex,
      $and: [{ state: true }]
    })

    return categories;
  }

  async searchProducts(key) {
    const isMongoId = ObjectId.isValid(key); // true

    if (isMongoId) {
      const product = await Product.findById(key);

      return (product) ? [product] : [];
    }

    const regex = new RegExp(key, 'i');

    const products = await Product.find({
      name: regex,
      $and: [{ state: true }]
    })

    return products;
  }

  async searchUsers(key) {
    const isMongoId = ObjectId.isValid(key); // true

    if (isMongoId) {
      const user = await User.findById(key);

      return (user) ? [user] : [];
    }

    const regex = new RegExp(key, 'i');

    const users = await User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ state: true }]
    })

    return users;
  }
}

module.exports = SearchRepository;