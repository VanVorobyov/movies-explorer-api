const Movie = require('../models/movie');

const ForbiddenError = require('../utils/errors/forbiddenError');
const NotFoundError = require('../utils/errors/notFoundError');
const BadRequestError = require('../utils/errors/badRequestError');

const {
  CREATED, INCORRECT_DATA_CREATE_MOVIE, MOVIE_NOT_FOUND, FORBIDDEN_DELETE_MOVIE,
} = require('../utils/constants');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ ...req.body, owner })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_CREATE_MOVIE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }
      if (movie && movie.owner.equals(req.user._id)) {
        Movie.deleteOne(movie)
          .then(() => res.send(movie))
          .catch(next);
      } else {
        throw new ForbiddenError(FORBIDDEN_DELETE_MOVIE);
      }
    })
    .catch(next);
};
