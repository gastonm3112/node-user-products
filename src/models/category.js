const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const categorySchema = Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

categorySchema.plugin(uniqueValidator, { message: 'Already exists in the Database' });
categorySchema.plugin(mongoosePaginate);

mongoosePaginate.paginate.options = {
  collation: {
    locale: 'en',
    strength: 2
  },
  populate: {
    path: 'user',
    select: ['name', 'email']
  }
};

categorySchema.methods.toJSON = function () {
  const { __v, state, ...category } = this.toObject();
  return category;
}



module.exports = model('Category', categorySchema);