import React, { Component } from 'react'
import { connect } from 'react-redux'

import './index.css'

import CategoryMenu from './menu'
import { removeSpecial, getSlug, findDuplicate } from '../../utils'
import * as actions from '../../actions'

const ROOT_PATH = 'categories'

class Categories extends Component {

  init = () => {
    this.category = {
      userId: this.props.userId
    }
    return { showMenu: false }
  }

  onCloseMenu = () =>
    this.setState(this.init())

  componentWillReceiveProps(nextProps) {
    this.setState(this.init())
  }

  state = this.init()

  onClickList = (event) => {
    let titleEl = event.target,
        path = titleEl.dataset.path || '',
        show = Boolean(path);
    if (show !== this.state.showMenu || path != this.category.path) {
      Object.assign(this.category, {
        rootEl: this.refs.rootEl,
        titleEl,
        title: titleEl.textContent,
        path,
        parentPath: path.replace(/\.\d+$/, ''),
        isChild: Boolean(path && path !== ROOT_PATH)
      })
      console.log('click list', this.category);
      this.setState({showMenu: show})
    }
  }

  submitCategory = (formData, path, parentPath, action) => {
    // let title = formData.title.replace(/[\/|\&\?<>]/g, '')
    let title = removeSpecial(formData.title)
    if (formData.title !== title) {
      return alert('Unacceptable symbols /\\|?&<>')
    }
    let slug = getSlug(title)
    if (findDuplicate(this.props, slug, parentPath)) {
      return alert('The same category already exists!')
    }
    this.category.path = path
    this.category.title = title
    this.category.slug = slug
    this.props.dispatch(action(this.category))
    this.setState({
      showMenu: false
    })
  }

  addCategory = formData => {
    let path = this.category.path + (this.category.isChild ? '.sub' : '')
    this.submitCategory(
      formData,
      path,
      path,
      actions.addCategory
    )
  }

  renameCategory = formData => {
    this.submitCategory(
      formData,
      this.category.path,
      this.category.parentPath,
      actions.updateCategory
    )
  }

  delCategory = () => {
    this.props.dispatch(actions.delCategory(this.category))
    this.setState({
      showMenu: false
    })
  }

  render() {
    // console.log('%cCategories render', 'color:#048;font-weight:bold', this.props);
    let categories = this.props.categories
    return (
      <div className='categories'>
        <div className='categories__list'
          onClick={this.onClickList}
          ref='rootEl'>
          <span data-path={ROOT_PATH}>Categories</span>
          {categories && createList(categories, ROOT_PATH)}
        </div>
        {this.state.showMenu &&
          <CategoryMenu
            category={this.category}
            onAdd={this.addCategory}
            onRename={this.renameCategory}
            onDelete={this.delCategory}
            onClose={this.onCloseMenu}
          />
        }
      </div>
    )
  }

}

Categories = connect(
  ({ categories }) => ({ categories })
)(Categories)

export default Categories


const createList = (data, _path) =>
  <ul>
    {data.map((item, i) => {
      let path = _path + '.' + i
      return (
        <li key={item.slug}>
          <span data-path={path}>{item.title}</span>
          {(item.sub && item.sub.length) ? createList(item.sub, path + '.sub') : ''}
        </li>
      )
    })}
  </ul>
