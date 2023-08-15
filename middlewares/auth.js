const jwt = require('jsonwebtoken');

const { SECRET_STRING } = require('../utils/config');

const UnauthorizedError = require('../utils/errors/unauthorizedError');
const { AUTHORIZATION_REQUIRED } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
    return;
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, SECRET_STRING);
  } catch (err) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
    return;
  }
  req.user = payload;
  next();
};
