const Product = require('../models/product');

class ProductRepository {

  constructor() { }

  async getProductsWithPagination(filter, options) {
    return await Product.paginate(filter, options);
  }

  async findProductById(id) {
    return await Product.findById(id)
      .populate({
        path: 'user',
        select: ['name', 'email']
      })
      .populate('category', 'name');
  }

  async findProductByName(name) {
    return await Product.findOne({ name });
  }

  async saveProduct(product) {
    return await Product.create(product);
  }

  async updateProduct(id, product) {
    return await Product.findByIdAndUpdate(id, product, { new: true });
  }

  async removeProduct(id) {
    return await Product.findByIdAndUpdate(id, { state: false });
  }

}



module.exports = ProductRepository;