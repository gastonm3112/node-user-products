const SearchRepository = require('../repositories/searchRepository');
const searchRepository = new SearchRepository();

const searchUsers = async (key, res) => {
  return await searchRepository.searchUsers(key, res);
}

module.exports = {
  searchUsers,
}