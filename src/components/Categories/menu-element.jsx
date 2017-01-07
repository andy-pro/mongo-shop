import React from 'react'

import '../close-btn'

// import { addCategory, updateCategory, delCategory } from '../../actions'
import { getElementSize } from '../../utils'

let $newItem, $newTitle, $preserve;

export default ({ category, onAdd, onRename, onDelete, onClose }) =>
  <div className='categories__menu'
    ref={c => c && setMenuPos(c, category)}>
    <i className='close' onClick={onClose}></i>

    <form className='flex'
      onSubmit={e => {
        e.preventDefault()
        onAdd({
          title: $newItem.value,
        })
      }}>
        <input className='mr-10'
          placeholder={category.isChild ? 'New subcategory' : 'New Category'}
          type='text'
          required={true}
          ref={c => {
            $newItem = c
            if (c) c.focus()
          }}
        />
        <button className='form-control-sm-btn' type="submit">
          +
        </button>
    </form>

    {category.isChild &&
  <div>
      <form onSubmit={e => {
          e.preventDefault()
          let newTitle = $newTitle.value
          if (newTitle !== category.title) {
            onRename({
              title: newTitle,
              preserve: $preserve.checked
            })
          }
        }}>
        <div className='flex'>
          <input className='mr-10'
            defaultValue={category.title}
            type='text'
            required={true}
            ref={c => {
              if (c) {
                // c.value = category.title;
              }
              $newTitle = c
            }}
          />
          <button className='form-control-btn' type="submit">
            Rename
          </button>
        </div>
        <div>
          <label>
            <input
              ref={c => $preserve = c}
              type='checkbox'/>
            Preserve references
          </label>
        </div>


      </form>

        <button
          className='form-control-del-btn'
          onClick={onDelete}>
          Delete
        </button>
      </div>
    }
    {/*<div>{category.path}</div>*/}
  </div>

const setMenuPos = (el, category) => {
  let {rootEl, titleEl} = category,
      x = titleEl.offsetLeft + titleEl.offsetWidth,
      y = titleEl.offsetTop + 10 - rootEl.scrollTop,
      h = parseInt(getElementSize(el).height);
  if ((y + h) > rootEl.offsetHeight) {
    y -= h;
  }
  el.style.left = x + 'px';
  el.style.top = y + 'px';
}
