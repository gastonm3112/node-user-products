const CategoryRepository = require('../repositories/categoryRepository');
const categoryRepository = new CategoryRepository();

const getAllCategories = async (filter, options) => {
  return await categoryRepository.getCategoriesWithPagination(filter, options);
}

const findCategoryByName = async (name) => {
  return await categoryRepository.findCategoryByName(name);
}


const saveCategory = async (category) => {
  return await categoryRepository.saveCategory(category);
}






module.exports = {
  getAllCategories,
  findCategoryByName,
  saveCategory
}