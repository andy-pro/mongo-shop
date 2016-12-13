import React, { Component } from 'react'
import { connect } from 'react-redux'

import './index.css'
import '../close-btn'

import { SimpleForm } from '../Forms'

import * as actions from '../../actions'
import { getElementSize } from '../../utils'

class Categories extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showMenu: false
  //   }
  // }

  state = {
    showMenu: false
  }

  listClick = (event) => {
    let ref = event.target,
        path = ref.dataset.path
    if (path) {
      this.opts = {
        event,
        ref,
        path: ref.dataset.path,
        root: this.root
      }
      // console.log(e.pageX, e.pageY, this.root.offset);
      // this.opts = {
      //   root_height: this.root.offsetHeight
      // }
      this.setState({showMenu: true})
    } else {
      this.setState({showMenu: false})
    }
  }
  // 
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.showMenu !== nextState.showMenu ||
  //     this.state.opts !== nextState.opts
  // }

  onSubmit = (category) => {
    category.userId = this.props.userId
    let sub = '',
        path = this.opts.path
    if (path && path !== 'root-path') {
      let pi = path.split(',')
      sub = pi.reduce((s, i) => s + '.' + i + '.sub', '')
    }
    category.path = 'categories' + sub
    this.props.dispatch(actions.addCategory(category))
    this.setState({
      showMenu: false
    })
  }

  onCloseMenu = () =>
    this.setState({
      showMenu: false
    })

  render() {

    console.log('%cCategories render', 'color:#048;font-weight:bold', this.props);

    return (
      <div className='categories'>

        <div className='categories__list' onClick={this.listClick}
          ref = {c => this.root = c}>
          <a href='#' data-path='root-path'>Categories</a>
          {this.props.categories && createList(this.props.categories)}
        </div>

        {this.state.showMenu && (
          <div className='categories__menu'
            ref={c => c && setMenuPos(c, this.opts)}>
            <i className='close' onClick={this.onCloseMenu}></i>
            <SimpleForm
              label={(this.opts.path && this.opts.path !== 'root-path') ? 'New subcategory' : 'New Category'}
              onSubmit={this.onSubmit}
            />
          {/*this.opts.path && (
              <SimpleForm
                label={}
                onSubmit={this.onSubmitSub}
              />
            )*/}
            <div>path: {this.opts.path}</div>
          </div>
        )}

      </div>
    )

  }

}

Categories = connect(
  ({ categories }) => ({ categories })
)(Categories)

export default Categories


const setMenuPos = (el, opts) => {
  let {path, ref} = opts,
      x = path ? (ref.offsetLeft + ref.offsetWidth) : 0,
      y = path ? (ref.offsetTop + 10) : 0,
      h = parseInt(getElementSize(el).height);
  if ((y + h) > opts.root.offsetHeight) {
    y -= h;
  }
  el.style.left = x + 'px';
  el.style.top = y + 'px';
}

const createList = (data, path=[]) => {
  return (
    <ul>
      {data.map((item, i) => {
        let newpath = path.concat([i])
        return (
          <li key={encodeURI(item.title)}>
            <a href='#' data-path={newpath}>
              {item.title}
            </a>
            {item.sub && createList(item.sub, newpath)}
          </li>
        )
      })}
    </ul>
  )
}
