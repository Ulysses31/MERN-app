import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import { GlobalContext } from '../../context/globalState';
import './movies.css';

function MovieForm() {
  const {
    addMovie,
    updateMovie,
    selectedMovie,
    setSelectedMovie
  } = useContext(GlobalContext);
  const [newMovie, setNewMovie] = useState({
    _id: 0,
    title: '',
    genre: '',
    year: ''
  });

  useEffect(() => {
    setNewMovie(selectedMovie);
    console.log(selectedMovie);
  }, [selectedMovie]);

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
      if (newMovie._id === 0) {
        // INSERT
        fetch('/movies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMovie)
        })
          .then((resp) => {
            return resp.json();
          })
          .then((payload) => {
            addMovie(payload);
          });
      } else {
        // UPDATE
        fetch('/movies', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMovie)
        })
          .then((resp) => {
            return resp.json();
          })
          .then((payload) => {
            if (payload.nModified === 1) {
              updateMovie(newMovie);
            }
          });
      }
      cleanupForm();
    }
  };

  const handleClear = () => {
    cleanupForm();
  };

  const cleanupForm = () => {
    setSelectedMovie({
      _id: 0,
      title: '',
      genre: '',
      year: 0
    });
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
      <button type='submit'>
        {newMovie._id === 0 ? 'Insert' : 'Update'}
      </button>
      <button type='button' onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}

export default MovieForm;
