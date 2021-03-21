export default function MoviesReducer(state, action) {
  switch (action.type) {
    case 'SELECTED_MOVIE':
      return {
        ...state,
        selectedMovie: action.payload
      };
    case 'GET_MOVIES':
      return {
        ...state,
        movies: action.payload
      };
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [...state.movies, action.payload]
      };
    case 'DELETE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter(
          (movie) => movie._id !== action.payload
        )
      };
    case 'UPDATE_MOVIE':
      return {
        ...state,
        movies: state.movies.map((movie) => {
          if (movie._id === action.payload._id) {
            return action.payload;
          } else {
            return movie;
          }
        })
      };
    default:
      return state;
  }
}
