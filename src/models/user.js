const { Schema, model } = require('mongoose');

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




module.exports = model('User', userSchema);