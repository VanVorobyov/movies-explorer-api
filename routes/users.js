const userRoutes = require('express').Router();

const { updateUser, getCurrentUser } = require('../controllers/users');

const { validateUpdateUser } = require('../utils/validators/userValidator');

userRoutes.get('/me', getCurrentUser);
userRoutes.patch('/me', validateUpdateUser, updateUser);

module.exports = userRoutes;
