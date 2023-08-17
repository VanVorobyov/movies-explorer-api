const authRouter = require('express').Router();
const { login, createUser } = require('../controllers/login');

const { validateLogin, validateCreateUser } = require('../utils/validators/userValidator');

authRouter.post('/signup', validateCreateUser, createUser);
authRouter.post('/signin', validateLogin, login);

module.exports = authRouter;
