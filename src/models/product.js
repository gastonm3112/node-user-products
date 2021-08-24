const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = Schema({
  name: {
    type: String,
    required: [true, 'name is mandatory'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

productSchema.plugin(uniqueValidator, { message: 'Already exists in the Database' });
productSchema.plugin(mongoosePaginate);

mongoosePaginate.paginate.options = {
  collation: {
    locale: 'en',
    strength: 2
  },
  populate: [
    {
      path: 'user',
      select: ['name', 'email']
    },
    {
      path: 'category',
      select: 'name'
    }
  ]
};

productSchema.methods.toJSON = function () {
  const { __v, state, ...product } = this.toObject();
  return product;
}



module.exports = model('Product', productSchema);