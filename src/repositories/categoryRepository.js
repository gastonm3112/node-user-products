const Category = require('../models/category');

class CategoryRepository {

  constructor() { }

  async getCategoriesWithPagination(filter, options) {
    return await Category.paginate(filter, options);
  }

  async findCategoryByName(name) {
    return await Category.findOne({ name });
  }

  async saveCategory(category) {
    return await Category.create(category);
  }


}



module.exports = CategoryRepository;