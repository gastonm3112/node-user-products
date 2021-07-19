const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is mandatory']
  },
  email: {
    type: String,
    required: [true, 'email is mandatory'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is mandatory']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(uniqueValidator, { message: 'Already exists in the Database' });


module.exports = model('User', userSchema);