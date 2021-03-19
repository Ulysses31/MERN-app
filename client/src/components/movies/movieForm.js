import React, { useState } from 'react';
import './movies.css';

function MovieForm() {
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    year: 0
  });

  const handleNewMovie = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(newMovie);

    if (newMovie) {
      fetch('/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie)
      })
        .then((resp) => {
          return resp.json();
        })
        .then((payload) => {
          // console.log(payload);
          // getAllMovies();
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={newMovie.title}
        onChange={handleNewMovie}
      />
      <br />
      <input
        type='text'
        placeholder='Genre'
        name='genre'
        value={newMovie.genre}
        onChange={handleNewMovie}
      />
      <br />
      <input
        type='text'
        placeholder='Year'
        name='year'
        value={newMovie.year}
        onChange={handleNewMovie}
      />
      <br />
      <button type='submit'>Insert</button>
    </form>
  );
}

export default MovieForm;
