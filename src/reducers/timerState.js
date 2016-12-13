'use strict';

import types from '../constants';

export default function loading(state={status: 'stopped'}, action) {
  switch (action.type) {
    case types.TIMER_STARTED:
      return {status: 'started'};
    case types.TIMER_STOPPED:
      return {status: 'stopped'};
    default:
      return state;
  }
}
