import React, { Component } from 'react'

import './app.css'
import './close-btn'

import { connect } from 'react-redux'

import * as actions from '../actions';

import AdminPanel from './AdminPanel'
import MainPanel from './MainPanel'

const ADMIN = false;

class App extends Component {
  /*
    set main view in reducers/index.js:
      const views = [types.VIEW_PURCHASES, types.VIEW_CATEGORIES]
      const preloadedState = {
        userView: views[0] or views[1]
      }
    start app with a given user or with all users (ADMIN mode)
      Andy  "5856ffa4da7d1f056c935686"
      Oksy  "5845e1adec910a0db4fb8f01"
      Yarik "5845e24dec910a0db4fb8f04"
  */
  componentDidMount() {
    this.props.dispatch(ADMIN ?
      actions.getUsers()
      :
      actions.getUser('5856ffa4da7d1f056c935686')
    )
  }

  render() {
    return (
      <main className='app'>
        <section>
          <h3 className='app__title'>Mongo Shop</h3>
        </section>
        <section className='col-1-4 app__admin-panel'>
          <AdminPanel />
        </section>
        <section className='col-3-4 app__main-panel'>
          <MainPanel />
        </section>
      </main>
    )
  }

}

App = connect()(App)

export default App
