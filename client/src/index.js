import React from 'react';
import { debugContextDevtool } from 'react-context-devtool';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container
);

// Attach root container
debugContextDevtool(container, {
  debugReducer:
    process.env.NODE_ENV !== 'production' && true,
  debugContext:
    process.env.NODE_ENV !== 'production' && true,
  disable: process.env.NODE_ENV === 'production'
});
