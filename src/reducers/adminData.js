'use strict';

import types from '../constants';

const initialState = {
  users: []
}

export default function users(state=initialState, action) {
  switch (action.type) {
    case types.USERS_LOADED:
      state.users = action.payload;
      return state;
    default:
      return state;
  }
}
