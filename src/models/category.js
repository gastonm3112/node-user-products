const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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



module.exports = model('category', categorySchema);