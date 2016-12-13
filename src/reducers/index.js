'use strict';

import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import { promise, timer } from '../middlewares';

import loadingState from './loadingState'
import timerState from './timerState'
// import repos from './repos'
// import users from './users'

import adminData from './adminData'
import userData from './userData'
import purchases from './purchases'
import categories from './categories'
import userView from './userView'

// import user from './user'
// import flash from './flash'


import types from '../constants';

const views = [types.VIEW_PURCHASES, types.VIEW_CATEGORIES]

const preloadedState = {
  userView: views[1]
}

const reducer = combineReducers({
  loadingState,
  timerState,
  adminData,
  userData,
  purchases,
  categories,
  userView
  // flash
})

let middlewares = [promise, timer];

if (NODE_ENV) middlewares.push(createLogger({collapsed: true}));

export default createStore(
  reducer,
  preloadedState,
  applyMiddleware.apply(null, middlewares)
);
