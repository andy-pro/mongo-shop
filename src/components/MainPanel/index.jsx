'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';

import Link from '../Link';

import Purchases from '../Purchases';
import Categories from '../Categories';

import { toggleUserView } from '../../actions';

import types from '../../constants';

let MainPanel = ({ userData, userView, toggleUserView }) => {

  const userId = userData._id

  if (!userId) {
    return null
  }

  const VIEW_PURCHASES = userView === types.VIEW_PURCHASES

  console.log('%cUser render', 'color:#480;font-weight:bold;', userView);

  return (
    <section className='main-panel'>
      <h4 className='main-panel__menu'>
        {userData.firstName} {userData.lastName} {' '}
        <Link active={VIEW_PURCHASES} onClick={toggleUserView}>
          purchases
        </Link>
        {" / "}
        <Link active={!VIEW_PURCHASES} onClick={toggleUserView}>
          categories
        </Link>
      </h4>
      { VIEW_PURCHASES ?
        <Purchases userId={userId} />
        :
        <Categories userId={userId} /> }

    </section>
  )

}

MainPanel = connect(
  ({userData, userView}) => ({userData, userView}),
  (dispatch) => ({
    toggleUserView: () => {
      dispatch(toggleUserView())
    }
  })
)(MainPanel)

export default MainPanel
