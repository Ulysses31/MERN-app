import React from 'react';
import './App.css';
import MovieForm from './components/movies/movieForm';
import MoviesList from './components/movies/moviesList';
import GlobalContextProvider from './context/globalState';

function App() {
  return (
    <GlobalContextProvider>
      <div className='App'>
        <MovieForm />
        <hr />
        <MoviesList />
      </div>
    </GlobalContextProvider>
  );
}

export default App;
