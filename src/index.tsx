import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'reset-css';
import { App } from './entry';
import { BrowserRouter } from 'react-router-dom';
import './translations';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
