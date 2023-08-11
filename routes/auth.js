const router = require('express').Router();
const { login, createUser } = require('../controllers/auth');

const { validateLogin, validateCreateUser } = require('../utils/validators/userValidator');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

module.exports = router;
