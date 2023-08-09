const router = require('express').Router();
const userRoutes = require('./users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundError');

router.use('/users', auth, userRoutes);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
