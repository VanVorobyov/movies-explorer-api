const router = require('express').Router();
const { login, createUser } = require('../controllers/auth');

// TODO: Сделать валидацию
// const { validateLogin, validateRegister } = require('../utils/validators/userValidator');

router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
