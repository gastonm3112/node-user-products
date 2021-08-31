const SearchRepository = require('../repositories/searchRepository');
const searchRepository = new SearchRepository();

const searchUsers = async (key) => {
  return await searchRepository.searchUsers(key);
}

const searchProducts = async (key) => {
  return await searchRepository.searchProducts(key);
}

module.exports = {
  searchUsers,
  searchProducts
}