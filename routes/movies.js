const movieRoutes = require('express').Router();

const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { validateMovieId, validateCreateMovie } = require('../utils/validators/movieValidator');

movieRoutes.get('/', getSavedMovies);
movieRoutes.post('/', validateCreateMovie, createMovie);
movieRoutes.delete('/:_id', validateMovieId, deleteMovie);

module.exports = movieRoutes;
