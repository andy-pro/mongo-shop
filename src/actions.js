'use strict';

import * as api from './api';
import types from './constants';

export const getUser = id => ({
  type: types.PROMISE,
  payload: types.USER_LOADED,
  promise: api.getUserData(id)
})

export const getUsers = () => ({
  type: types.PROMISE,
  payload: types.USERS_LOADED,
  promise: api.getUsers()
})

export const setUser = (user) => ({
  type: types.PROMISE,
  payload: types.USER_LOADED,
  promise: api.setUser(user)
})

/* purchases operations */
export const getPurchases = (userId) => ({
  type: types.PROMISE,
  payload: types.PURCHASES_LOADED,
  promise: api.getPurchases(userId)
})

export const addPurchase = (purchase) => ({
  type: types.PROMISE,
  payload: types.PURCHASE_ADDED,
  promise: api.addPurchase(purchase)
})

export const preDelPurchase = (id) => ({
  type: types.PRE_DEL_PURCHASE,
  payload: id
})

export const delPurchase = (id) => ({
  type: types.PROMISE,
  payload: types.PURCHASE_DELETED,
  promise: api.delPurchase(id)
})

export const undoDelPurchase = (id) => ({
  type: types.UNDO_DEL_PURCHASE,
  payload: id
})


/* categories operations */
export const addCategory = (category) => ({
  type: types.PROMISE,
  payload: types.CATEGORY_ADDED,
  promise: api.addCategory(category)
})

export const updateCategory = (category) => ({
  type: types.PROMISE,
  payload: types.CATEGORY_UPDATED,
  promise: api.updateCategory(category)
})

export const delCategory = (category) => ({
  type: types.PROMISE,
  payload: types.CATEGORY_UPDATED,
  promise: api.delCategory(category)
})


/* timer actions for timer middleware */
export const startTimer = (timerId, delay, action) => ({
  type: types.START_TIMER,
  timerId,
  delay,
  action
})

export const stopTimer = timerId => ({
  type: types.STOP_TIMER,
  timerId
})


export const toggleUserView = () => ({
  type: types.TOGGLE_USER_VIEW
})

export const flashMessage = payload => ({
  type: types.FLASH_MESSAGE,
  payload
})
