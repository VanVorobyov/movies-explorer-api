const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');

const auth = require('../middlewares/auth');

const NotFoundError = require('../utils/errors/notFoundError');
const { ROUTE_NOT_FOUND } = require('../utils/constants');

router.use(authRoutes);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError(ROUTE_NOT_FOUND));
});

module.exports = router;
