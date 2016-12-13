'use strict';

// import update from 'immutability-helper';

import types from '../constants';

export default function user(state=[], action) {
  switch (action.type) {
    case types.USER_LOADED:
      return action.payload[1]
    case types.PURCHASES_LOADED:
      return action.payload
    case types.PURCHASE_ADDED:
      return state.concat(action.payload)
    case types.PRE_DEL_PURCHASE:
      return update(state, action.payload, '_id', {hidden: true});
    case types.PURCHASE_DELETED:
      let deleted_id = action.payload._id;
      return state.filter(item => item._id !== deleted_id)
    case types.UNDO_DEL_PURCHASE:
      return update(state, action.payload, '_id', {hidden: false});
    default:
      return state;
  }
}

function update(collection, element, key, set) {
  let value = element[key]
  return collection.map(item =>
    item[key] === value ? Object.assign(item, set) : item
  )
}
