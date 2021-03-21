import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/globalState';
import './movies.css';

function MoviesList() {
  const {
    movies,
    getMovies,
    deleteMovie,
    setSelectedMovie
  } = useContext(GlobalContext);

  useEffect(() => {
    getMovies();
  }, []);

  function removeMovie(id) {
    if (id) {
      fetch(`/movies/${id}`, {
        method: 'DELETE'
      })
        .then((resp) => {
          return resp.json();
        })
        .then((payload) => {
          if (payload.deletedCount === 1) {
            deleteMovie(id);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function editMovie(movie) {
    // console.log(movie);
    setSelectedMovie(movie);
  }

  return (
    <div>
      <h1>Movies</h1>
      {movies &&
        movies.map((movie) => {
          return (
            <div key={movie._id}>
              <h2>{movie.title}</h2>
              <button
                onClick={() => removeMovie(movie._id)}
              >
                Delete
              </button>
              <button onClick={() => editMovie(movie)}>
                Edit
              </button>
              <p>Genre: {movie.genre}</p>
              <p>Year: {movie.year}</p>
            </div>
          );
        })}
    </div>
  );
}

export default MoviesList;
