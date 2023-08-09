const router = require('express').Router();
const { updateUser, getCurrentUser } = require('../controllers/users');
// TODO: Сделать валидацию
// const { validateCurrentUser, validateUpdateUser } = require('../utils/validators/userValidator');
router.get('/me', getCurrentUser);
router.patch('/me', updateUser);

module.exports = router;
