import React, { useEffect, useState } from 'react';
import './movies.css';

function MoviesList() {
  const [movies, setMovies] = useState([]);

  function test() {
    fetch('/movies')
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
      })
      .then((payload) => {
        setMovies(payload);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    console.log('called...');
    test();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {movies &&
        movies.map((movie) => {
          return (
            <div key={movie._id}>
              <h2>{movie.title}</h2>
              <p>Genre: {movie.genre}</p>
              <p>Year: {movie.year}</p>
            </div>
          );
        })}
    </div>
  );
}

export default MoviesList;
