const SearchRepository = require('../repositories/searchRepository');
const searchRepository = new SearchRepository();

const searchCategories = async (key) => {
  return await searchRepository.searchCategories(key);
}

const searchProducts = async (key) => {
  return await searchRepository.searchProducts(key);
}

const searchUsers = async (key) => {
  return await searchRepository.searchUsers(key);
}

module.exports = {
  searchCategories,
  searchProducts,
  searchUsers
}