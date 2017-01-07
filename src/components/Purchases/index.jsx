'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';

import PurchaseForm from './PurchaseForm';
import PurchaseTable from './PurchaseTable';
import DelPurchase from './DelPurchase';
import { removeSpecial, getSlug } from '../../utils'
import * as actions from '../../actions';
import types from '../../constants';

let deleted_item = null

let Purchases = ({userId, purchases, categories, onAddPurchase, onDelPurchase, onUndoDelPurchase}) => {

  return (
    <div className='purchases'>
      <PurchaseForm
        categories={categories}
        onSubmit={formData => {
          onAddPurchase({
            // ...formData,
            title: removeSpecial(formData.title),
            category: slugifyCategory(formData.category),
            cost: formData.cost,
            amount: formData.amount,
            userId,
            date: new Date().toISOString()
          })
        }}
       />
      {purchases && (
        <div>
          <PurchaseTable
            purchases={purchases}
            categories={categories}
            onClick={onDelPurchase}
          />
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
    // console.log('submit', item);
    dispatch(actions.addPurchase(item))
  },

  onDelPurchase: (item) => {
    deleted_item = item
    const id = item._id
    dispatch(actions.preDelPurchase(id))
    console.log('%cdelete', 'color:red;font-size:20px', id)
    dispatch(actions.startTimer(
      types.DEL_PURCHASE,
      3000,
      () => {
        deleted_item = null
        return actions.delPurchase(id)
      }
    ))
  },

  onUndoDelPurchase: () => {
    dispatch(actions.stopTimer(types.DEL_PURCHASE))
    dispatch(actions.undoDelPurchase(deleted_item._id))
    deleted_item = null
  }

})

Purchases = connect(
  ({purchases, categories}) => ({purchases, categories}),
  mapDispatchToProps
)(Purchases)

export default Purchases

const slugifyCategory = (category) =>
  category
    .split('/')
    .map(c => getSlug(c))
    .filter(c => Boolean(c))
    .join('/')
