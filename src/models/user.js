const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    default: 'USER_ROLE',
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
userSchema.plugin(mongoosePaginate);
userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
}


module.exports = model('User', userSchema);