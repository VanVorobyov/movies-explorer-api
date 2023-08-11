const router = require('express').Router();

const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/users');

const { validateMovieId, validateCreateMovie } = require('../utils/validators/movieValidator');

router.get('/', getSavedMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:_id', validateMovieId, deleteMovie);

module.exports = router;
