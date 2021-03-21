const router = require('express').Router();
const Movies = require('../models/movies');

/**
 * @name Movies
 * @description Get movies list
 */
router.get('/', (req, res) => {
  Movies.find()
    .then((movies) => res.json(movies))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
  //  try {
  //    const movies = await Movies.find();
  //    console.log(movies);
  //    return res.json(movies);
  //  } catch (err) {
  //    return res.status(500).json({
  //      statusCode: res.statusCode,
  //      statusMessage: res.statusMessage,
  //      message: err,
  //    });
  //  }
});

/**
 * @name Movie
 * @description Get movie by id
 */
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movies.findById({
      _id: req.params.id,
    });
    console.log(movie);
    res.json(movie);
  } catch (err) {
    res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err,
    });
  }
});

/**
 * @name Delete Movie
 * @description Delete a movie
 */
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movies.deleteOne({
      _id: req.params.id,
    });
    console.log(movie);
    res.json(movie);
  } catch (err) {
    res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err,
    });
  }
});

/**
 * @name Update Movie
 * @description Update a movie
 */
router.put('/', async (req, res) => {
  try {
    const movie = await Movies.updateOne(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          genre: req.body.genre,
          year: req.body.year,
        },
      }
    );
    console.log(movie);
    res.json(movie);
  } catch (err) {
    res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err,
    });
  }
});

/**
 * @name Create Movie
 * @description Create a new movie
 */
router.post('/', async (req, res) => {
  try {
    const newMovie = new Movies({
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year,
    });
    const movie = await newMovie.save();
    console.log(movie);
    return res.json(movie);
  } catch (err) {
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err,
    });
  }
});

module.exports = router;
