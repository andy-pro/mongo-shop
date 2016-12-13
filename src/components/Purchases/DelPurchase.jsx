import React from 'react'
import { connect } from 'react-redux'

let DelPurchase = ({ deletedItem, onClick,  timerState }) => {
  console.log('%cDelPurchase render', 'color:blue;font-weight:bold;', timerState);
  return (
    <div>
      Delete purchase <span className='purchases__deleted'>{deletedItem.title}</span>
      <button className='purchases__undo'
        onClick={onClick}
        disabled={timerState.status === 'stopped'}>
        Cansel
      </button>
    </div>
  )
}

DelPurchase = connect(
  ({timerState}) => ({timerState})
)(DelPurchase)

export default DelPurchase
