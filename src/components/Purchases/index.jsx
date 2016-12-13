'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';

import { PurchaseForm } from '../Forms';
import PurchaseTable from './PurchaseTable';
import DelPurchase from './DelPurchase';

import * as actions from '../../actions';

import types from '../../constants';

let deleted_item = null

let Purchases = ({userId, purchases, onAddPurchase, onDelPurchase, onUndoDelPurchase}) => {

  return (
    <div>
      <PurchaseForm onSubmit={formdata => {
        onAddPurchase({
          ...formdata,
          userId,
          date: new Date()
        })
      }} />
      {purchases && (
        <div>
          <PurchaseTable purchases={purchases} onClick={onDelPurchase} />
          {deleted_item &&
            <DelPurchase
              deletedItem={deleted_item}
              onClick={onUndoDelPurchase}
            />
          }
        </div>
      )}
    </div>
  )

}

const mapDispatchToProps = dispatch => ({

  onAddPurchase: (item) => {
    dispatch(actions.addPurchase(item))
  },

  onDelPurchase: (item) => {
    deleted_item = item

    dispatch(actions.preDelPurchase(item))
    console.log('%cdelete', 'color:red;font-size:20px', item._id)
    dispatch(actions.startTimer(
      types.DEL_PURCHASE,
      3000,
      () => {
        deleted_item = null
        return actions.delPurchase(item)
      }
    ))
  },

  onUndoDelPurchase: () => {
    dispatch(actions.stopTimer(types.DEL_PURCHASE))
    dispatch(actions.undoDelPurchase(deleted_item))
    deleted_item = null
  }

})

Purchases = connect(
  ({purchases}) => ({purchases}),
  mapDispatchToProps
)(Purchases)

export default Purchases
