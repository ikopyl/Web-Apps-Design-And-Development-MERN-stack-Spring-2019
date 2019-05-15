const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(uniqueValidator);

/**  creating users collection and leveraging UserSchema for it */
const User = mongoose.model('users', UserSchema);

module.exports = UserSchema;
