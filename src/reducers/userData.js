'use strict';

import types from '../constants';

export default function user(state={}, action) {
  switch (action.type) {
    case types.USER_LOADED:
      return get_user_data(action.payload[0]);
    default:
      return state;
  }
}

function get_user_data(data) {
  return {
    _id: data._id,
    firstName: data.firstName,
    lastName: data.lastName
  }
}
