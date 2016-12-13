'use strict';

import types from '../constants';

const views = [types.VIEW_PURCHASES, types.VIEW_CATEGORIES]

export default function loading(state=views[0], action) {
  switch (action.type) {
    case types.TOGGLE_USER_VIEW:
      return views[+(state === views[0])]
    default:
      return state;
  }
}
