import React from 'react'

const Purchases = ({ purchases, onClick }) => {
  console.log('%cPurchases table render', 'color:darkorange;font-weight:bold;');
  return (
    <table className='purchases__table'>
      <tbody>
        <tr>
          <th>Product</th>
          <th>Cost</th>
          <th>Date</th>
          <th className='purchases__lastcol'>Delete</th>
        </tr>
        {purchases.map(item =>
          item.hidden ? null : (
            <tr key={item._id} className='purchases__item'>
              <td className='purchases__titlecol'>{item.title}</td>
              <td className='purchases__costcol'>{item.cost}</td>
              <td className='purchases__datecol'>{new Date(item.date).toLocaleString()}</td>
              <td className='purchases__lastcol'>
                <button className='form-control-add-btn'
                  onClick={() => onClick(item)}>
                  -
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default Purchases
