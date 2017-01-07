'use strict';

// import update from 'immutability-helper';
import { pushItem, updateItemById, deleteItemById } from '../utils';

import types from '../constants';

export default function user(state=[], action) {
  switch (action.type) {
    case types.USER_LOADED:
      return action.payload[1]
    case types.PURCHASES_LOADED:
      return action.payload
    case types.PURCHASE_ADDED:
      return pushItem(state, action.payload)
    case types.PRE_DEL_PURCHASE:
      return updateItemById(state, action.payload, {hidden: true});
    case types.PURCHASE_DELETED:
      return deleteItemById(state, action.payload._id)
    case types.UNDO_DEL_PURCHASE:
      return updateItemById(state, action.payload, {hidden: false});
    default:
      return state;
  }
}
