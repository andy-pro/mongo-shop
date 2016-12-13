import React, { Component } from 'react'

import './index.css'

import { connect } from 'react-redux'

import * as actions from '../actions';

import AdminPanel from './AdminPanel'
import MainPanel from './MainPanel'

const ADMIN = false;

class App extends Component {

  componentDidMount() {
    console.log('set initial from APP');
    // start app with a given user or with all users (ADMIN mode)
    // Andy  "584565afec910a0db4fb8ef5"
    // Oksy  "5845e1adec910a0db4fb8f01"
    // Yarik "5845e24dec910a0db4fb8f04"
    this.props.dispatch(actions.getUsers(
      ADMIN ? '' : "584565afec910a0db4fb8ef5"
    ))
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
