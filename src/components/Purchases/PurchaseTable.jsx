import React from 'react'

const Purchases = ({ purchases, categories, onClick }) => {
  console.log('%cPurchases table render', 'color:darkorange;font-weight:bold;', categories);
  return (
    <table className='purchases__table'>
      <tbody>
        <tr>
          <th className='purchases__titlecol'>Product</th>
          <th className='purchases__costcol'>Cost</th>
          <th className='purchases__amountcol'>Amount</th>
          <th className='purchases__datecol'>Date</th>
          <th className='sm-btn'>Del</th>
        </tr>
        {purchases.map(item =>
          item.hidden ? null : (
            <tr key={item._id} className='purchases__item'>
              <td>
                {item.title}
                {item.category && getCategoryBySlug(item.category, categories)}
                {/*{getCategoryBySlug(item.category, categories)}*/}
              </td>
              <td>{item.cost}</td>
              <td>{item.amount}</td>
              <td>{getDateString(item.date)}</td>
              <td className='sm-btn'>
                <button className='form-control-sm-btn'
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


const getDateString = date =>
  // new Date(date).toLocaleString()
  new Date(date).toLocaleDateString()

const getCategoryBySlug = (path, list) =>
  <span className='purchases__category'>
    ({
      path
      .split('/')
      .map(slug => {
        let c = list.find(item => {
          let result = slug === item.slug
          if (result) {
            list = item.sub
          }
          return result
        })
        return c ? c.title : 'ERROR!---' + slug + '---'
      })
      .join(' / ')
    })
  </span>
