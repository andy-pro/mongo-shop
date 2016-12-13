'use strict';

import React from 'react';
import { connect } from 'react-redux';

// import './index.css';

import * as actions from '../../actions';

// import { getRepos, hideRepos, startTimer, stopTimer } from '../../actions';

// import types from '../../constants';

let Controls = ({ dispatch }) => {

  return (
    <div>
      <button onClick={() => dispatch(actions.getUsers())}>
        Get users
      </button>
    </div>
  )

}

Controls = connect()(Controls)

export default Controls
