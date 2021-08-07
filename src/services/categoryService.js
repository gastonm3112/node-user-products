const CategoryRepository = require('../repositories/categoryRepository');
const categoryRepository = new CategoryRepository();

const findCategoryByName = async (name) => {
  return await categoryRepository.findCategoryByName(name);
}


const saveCategory = async (category) => {
  return await categoryRepository.saveCategory(category);
}






module.exports = {
  findCategoryByName,
  saveCategory
}