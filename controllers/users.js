const User = require('../models/user');

const NotFoundError = require('../utils/errors/notFoundError');
const BadRequestError = require('../utils/errors/badRequestError');
const ConflictError = require('../utils/errors/conflictError');

const { USER_NOT_FOUND, INCORRECT_DATA_UPDATE_USER, EMAIL_ALREADY_EXISTS } = require('../utils/constants');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError(USER_NOT_FOUND);
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_UPDATE_USER));
      } else if (err.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_EXISTS));
      } else {
        next(err);
      }
    });
};
