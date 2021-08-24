const CategoryRepository = require('../repositories/categoryRepository');
const categoryRepository = new CategoryRepository();

const getAllCategories = async (filter, options) => {
  return await categoryRepository.getCategoriesWithPagination(filter, options);
}

const findByIdCat = async (id) => {
  return await categoryRepository.findByIdCat(id);
}

const findCategoryById = async (id) => {
  return await categoryRepository.findCategoryById(id);
}

const findCategoryByName = async (name) => {
  return await categoryRepository.findCategoryByName(name);
}


const saveCategory = async (category) => {
  return await categoryRepository.saveCategory(category);
}

const updateCategory = async (id, category) => {
  return await categoryRepository.updateCategory(id, category);
}

const removeCategory = async (id) => {
  return await categoryRepository.removeCategory(id);
}




module.exports = {
  getAllCategories,
  findByIdCat,
  findCategoryById,
  findCategoryByName,
  saveCategory,
  updateCategory,
  removeCategory
}