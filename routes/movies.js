const router = require('express').Router();

const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/users');

// TODO: Сделать валидацию
// const { validateCurrentUser, validateUpdateUser } = require('../utils/validators/userValidator');

router.get('/', getSavedMovies);
router.post('/', createMovie);
router.delete('/:_id', deleteMovie);

module.exports = router;
