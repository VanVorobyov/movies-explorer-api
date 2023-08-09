const router = require('express').Router();
const userRoutes = require('./users');
const NotFoundError = require('./utils/errors/notFoundError');

app.use('/users', auth, userRoutes);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;