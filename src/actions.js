'use strict';

import * as api from './api'
import types from './constants';

export const getUsers = id => ({
  type: types.PROMISE,
  payload: id ? types.USER_LOADED : types.USERS_LOADED,
  promise: id ? api.getUserData(id) : api.getUsers()
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

export const preDelPurchase = (purchase) => ({
  type: types.PRE_DEL_PURCHASE,
  payload: purchase
})

export const delPurchase = (purchase) => ({
  type: types.PROMISE,
  payload: types.PURCHASE_DELETED,
  promise: api.delPurchase(purchase)
})

export const undoDelPurchase = (purchase) => ({
  type: types.UNDO_DEL_PURCHASE,
  payload: purchase
})


/* categories operations */
export const addCategory = (category) => ({
  type: types.PROMISE,
  payload: types.CATEGORY_ADDED,
  promise: api.addCategory(category)
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
