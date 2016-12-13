'use strict';

import React from 'react';
import { connect } from 'react-redux';

import './index.css';

import { getUsers, setUser } from '../../actions';
import types from '../../constants';

let AdminPanel = ({ users, onGetUsersClick, onUserClick }) => {

  console.log('Admin Panel render', users);

  return (
    <div className='admin-panel'>
      <div className='admin-panel__aside'>
        <h4>User's list</h4>
        <button onClick={onGetUsersClick}>
          Get users
        </button>
      </div>
      <ul className='admin-panel__list'>
        {users.map(user =>
          <li key={user._id}>
            <a onClick={ e => onUserClick(e, user)}>
            {user.firstName} {user.lastName}
            </a>
          </li>
        )}
      </ul>
    </div>
  )

}

const mapStateToProps = ({adminData}) => ({users: adminData.users})

const mapDispatchToProps = dispatch => ({
  onGetUsersClick: () => {
    dispatch(getUsers())
  },
  onUserClick: (e, user) => {
    e.preventDefault()
    dispatch(setUser(user))
  }
})

AdminPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel)

export default AdminPanel
