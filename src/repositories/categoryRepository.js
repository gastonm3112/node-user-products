const Category = require('../models/category');

class CategoryRepository {

  constructor() { }

  async getCategoriesWithPagination(filter, options) {
    return await Category.paginate(filter, options);
  }

  async findByIdCat(id) {
    return await Category.findById(id);
  }

  async findCategoryById(id) {
    return await Category.findById(id)
      .populate({
        path: 'user',
        select: ['name', 'email']
      });
  }

  async findCategoryByName(name) {
    return await Category.findOne({ name });
  }

  async saveCategory(category) {
    return await Category.create(category);
  }

  async updateCategory(id, category) {
    return await Category.findByIdAndUpdate(id, category, { new: true });
  }

  async removeCategory(id) {
    return await Category.findByIdAndUpdate(id, { state: false });
  }

}



module.exports = CategoryRepository;