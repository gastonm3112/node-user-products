const ProductRepository = require('../repositories/productRepository');
const productRepository = new ProductRepository();

const getAllProducts = async (filter, options) => {
  return await productRepository.getProductsWithPagination(filter, options);
}

const findProductById = async (id) => {
  return await productRepository.findProductById(id);
}

const findProductByName = async (name) => {
  return await productRepository.findProductByName(name);
}


const saveProduct = async (product) => {
  return await productRepository.saveProduct(product);
}

const updateProduct = async (id, product) => {
  return await productRepository.updateProduct(id, product);
}

const removeProduct = async (id) => {
  return await productRepository.removeProduct(id);
}




module.exports = {
  getAllProducts,
  findProductById,
  findProductByName,
  saveProduct,
  updateProduct,
  removeProduct
}