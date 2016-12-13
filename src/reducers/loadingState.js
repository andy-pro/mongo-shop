'use strict';

import types from '../constants';

export default function loading(state={}, action) {
  switch (action.type) {
    case types.LOADING_STATE:
      return action.payload;
    default:
      return state;
  }
}
