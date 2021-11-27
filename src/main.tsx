import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import kaboom from "kaboom";

kaboom();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
