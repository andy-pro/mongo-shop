import React from 'react'

import './index.css'

export default Modal = ({ children }) => {

  return (
    <div className='modal'>
      <div className='modal__dialog'>
        <i className='close'></i>
        <div className='modal__body'>{children}</div>
      </div>
    </div>
  )
}

//
// .modal
//   .modal__dialog
//     i.close(data-action='close')
//     h4.modal__title.center
//     .modal__body
//     .modal__footer
//       button.btn-primary(type='button' data-action='ok')
//       button.btn-default(type='button' data-action='close') Cancel
