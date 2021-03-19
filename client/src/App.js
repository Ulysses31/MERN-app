import React from 'react';
import './App.css';
import MovieForm from './components/movies/movieForm';
import MoviesList from './components/movies/moviesList';

function App() {
  return (
    <div className='App'>
      <MovieForm />
      <hr />
      <MoviesList />
    </div>
  );
}

export default App;
