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

    const population = [{
      path: 'user',
      select: ['name', 'email']
    }];

    if (isMongoId) {
      const category = await Category.findById(key).populate(population);

      return (category) ? [category] : [];
    }

    const regex = new RegExp(key, 'i');

    const categories = await Category.find({
      name: regex,
      state: true
    })
      .populate(population);

    return categories;
  }

  async searchProducts(key) {
    const isMongoId = ObjectId.isValid(key); // true

    const population = [
      {
        path: 'user',
        select: ['name', 'email']
      },
      {
        path: 'category',
        select: 'name'
      }]

    if (isMongoId) {
      const product = await Product.findById(key).populate(population);

      return (product) ? [product] : [];
    }

    const regex = new RegExp(key, 'i');

    const products = await Product.find({
      name: regex,
      state: true
    })
      .populate(population)

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