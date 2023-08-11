const router = require('express').Router();

const { updateUser, getCurrentUser } = require('../controllers/users');

const { validateUpdateUser } = require('../utils/validators/userValidator');

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
