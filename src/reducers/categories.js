'use strict';

import types from '../constants';

export default function user(state=[], action) {
  switch (action.type) {
    case types.USER_LOADED:
      return action.payload[0].categories || []
    case types.CATEGORY_ADDED:
      return action.payload.categories
    case types.CATEGORY_UPDATED:
      return action.payload.categories
    default:
      return state;
  }
}
