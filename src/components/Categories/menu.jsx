import React, { Component } from 'react'

import { getElementSize } from '../../utils'

// let $newItem, $newTitle, $preserve;

export default class CategoryMenu extends Component {
// export default ({ category, onAdd, onRename, onDelete, onClose }) =>

  componentDidMount() {
    console.log('menu did mount!');
    this.setupMenu()
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('menu did update!');
    this.setupMenu()
  }

  componentWillMount() {
    console.log('menu will mount!', this.refs);

  }

  componentWillUpdate(nextProps, nextState) {
    console.log('menu will update!', this.refs, this.props, nextProps, this.props === nextProps);
    // this.style = setMenuPos(this.refs.menu, this.props.category)
  }


  onAdd = (e) => {
    e.preventDefault()
    this.props.onAdd({
      title: this.refs.add.value
    })
  }

  onRename = (e) => {
    e.preventDefault()
    let newTitle = this.refs.rename.value
    if (newTitle !== this.props.category.title) {
      this.props.onRename({
        title: newTitle,
        preserve: this.refs.preserve.checked
      })
    }
  }

  setupMenu = () => {
    setMenuPos(this.refs.menu, this.props.category)
    this.refs.add.focus()
    this.refs.rename.value = this.props.category.title
  }

  render() {
    const {category} = this.props;
    console.log('menu render', category);
    return (
      <div className='categories__menu' ref='menu'>

        <i className='close' onClick={this.props.onClose}></i>

        <form className='flex'
          onSubmit={this.onAdd}>
          <input className='mr-10'
            placeholder={category.isChild ? 'New subcategory' : 'New Category'}
            type='text'
            required={true}
            ref='add'
          />
          <button className='form-control-sm-btn' type="submit">
            +
          </button>
        </form>

        {category.isChild &&
          <div>
            <div className='delimeter'></div>
            <form onSubmit={this.onRename}>
              <div className='flex'>
                <input className='mr-10'
                  type='text'
                  required={true}
                  ref='rename'
                />
                <button className='form-control-btn' type="submit">
                  Rename
                </button>
              </div>
              <div>
                <label>
                  <input type='checkbox' ref='preserve' />
                  Preserve references
                </label>
              </div>
            </form>
            <div className='delimeter'></div>
            <button
              className='form-control-del-btn' onClick={this.props.onDelete}>
              Delete
            </button>
          </div>
        }

        {/*<div>{category.path}</div>*/}
      </div>
    )
  }

}

const setMenuPos = (el, category) => {
  console.log('set menu pos', el, category);
  let {rootEl, titleEl} = category,
      x = titleEl.offsetLeft + titleEl.offsetWidth,
      y = titleEl.offsetTop + 10 - rootEl.scrollTop,
      h = parseInt(getElementSize(el).height);
  if ((y + h) > rootEl.offsetHeight) {
    y -= h;
  }
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  // return {
  //   left: x + 'px',
  //   top: y + 'px'
  // }
}
