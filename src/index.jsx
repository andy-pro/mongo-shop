'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// import 'normalize-css/normalize.css'; // prevent using 'insert-css' module
import 'reset-css';
import './index.css';

import App from './components/App';
import store from './reducers';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
