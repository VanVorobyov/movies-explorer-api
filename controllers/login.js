const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { SECRET_STRING } = require('../utils/config');

const ConflictError = require('../utils/errors/conflictError');
const BadRequestError = require('../utils/errors/badRequestError');

const { CREATED, INCORRECT_DATA_CREATE_USER, EMAIL_ALREADY_EXISTS } = require('../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User
    .findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_STRING,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INCORRECT_DATA_CREATE_USER));
      } else if (err.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_EXISTS));
      } else {
        next(err);
      }
    });
};
