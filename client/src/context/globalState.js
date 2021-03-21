import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import MoviesReducer from './moviesReducer';

const initialState = {
  movies: [],
  selectedMovie: {
    _id: 0,
    title: '',
    genre: '',
    year: '',
    createdAt: ''
  },
  error: ''
};

export const GlobalContext = createContext(initialState);

export default function GlobalContextProvider({
  children
}) {
  const [state, dispatch] = useReducer(
    MoviesReducer,
    initialState
  );

  const getMovies = () => {
    fetch('/movies')
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
      })
      .then((payload) => {
        dispatch({
          type: 'GET_MOVIES',
          payload: payload
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'ERROR',
          payload: err
        });
      });
  };

  const addMovie = (movie) => {
    dispatch({
      type: 'ADD_MOVIE',
      payload: movie
    });
  };

  const deleteMovie = (id) => {
    dispatch({
      type: 'DELETE_MOVIE',
      payload: id
    });
  };

  const updateMovie = (movie) => {
    dispatch({
      type: 'UPDATE_MOVIE',
      payload: movie
    });
  };

  const setSelectedMovie = (movie) => {
    dispatch({
      type: 'SELECTED_MOVIE',
      payload: movie
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        movies: state.movies,
        selectedMovie: state.selectedMovie,
        setSelectedMovie,
        getMovies,
        addMovie,
        deleteMovie,
        updateMovie
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// ****** Props Validations ********
GlobalContextProvider.propTypes = {
  children: PropTypes.object.isRequired
};
