const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../utils/errors/unauthorizedError');
const { EMAIL_ERROR, INCORRECT_EMAIL_OR_PASS, USER_NOT_FOUND } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина имени должна быть не менее 2 символов'],
    maxlength: [30, 'Максимальная длина имени должна быть не более 30 символов'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: EMAIL_ERROR,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .orFail(() => new UnauthorizedError(USER_NOT_FOUND))
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(INCORRECT_EMAIL_OR_PASS));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(INCORRECT_EMAIL_OR_PASS));
          }
          return user;
        });
    });
};

userSchema.methods.toJSON = function passwordDelete() {
  const user = { ...this.toObject() };
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
