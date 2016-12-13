'use strict';

import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import { getElementSize } from '../../utils';

import './index.css';

class Repos extends Component {
  
  constructor(props) {
    super(props);
    this.state = {show: false};
  }
  
  componentWillReceiveProps(nextProps) {
    // console.log('Repos Will Receive Props:', nextProps, 'mouse:', this.mouseOn)
    if (nextProps.show) {
      clearTimeout(this.timerId);
      this.mouseOn = false;
      this.setState({show: true});
    }
    else if (!this.mouseOn) {      
      this.setState({show: false});
    }   
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('Repos Should Update: nextProps:', nextProps, 'thisProps:', this.props, 'nextState:', nextState, 'thisState:', this.state)
    return this.state.show !== nextState.show ||
      this.props.items !== nextProps.items    
  }
  
  onMouseOver = () => {
    this.mouseOn = true;
    clearTimeout(this.timerId);
  }
  onMouseOut = () => {
    this.mouseOn = false;
    this.timerId = setTimeout(() => {
      this.setState({show: false});
      this.mouseOn = false;
    }, 1500);
  }

  render() {
    // <pre>{JSON.stringify(repos, null, 2)}</pre>   
    const {items, coords} = this.props;
    const title = items.length ? items[0].owner.login + "'s" : "no";
    // console.info('repos render', title, this.state);
    return (
      <ReactCSSTransitionGroup
        transitionName="repos"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        {/*should check node; when element leaves DOM, node will be null*/}
        {this.state.show && (
          <div key={title} className='repos'
            ref={node => node && setReposCoords(node, coords)}
            onMouseEnter={this.onMouseOver}
            onMouseLeave={this.onMouseOut}>
            <h2 className="repos__title">{title} repos</h2>
            <div className='repos__slot'>
              <table className='repos__table'>
                <tbody>
                  {items.map(repo =>
                    <tr key={repo.id}>
                      <td className='repos__name'>{repo.name}</td>
                      <td className='repos__lang'>{repo.language}</td>
                      <td className='repos__date'>
                        {new Date(repo.created_at).toDateString()}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </ReactCSSTransitionGroup>
    )
  }
}

const setReposCoords = (el, coords) => {
    let h = parseInt(getElementSize(el).height);
    if ((coords.clientY + h) < window.innerHeight) {
      h = - 6;
    }
    el.style.left = (coords.x + 10) + 'px';
    el.style.top = (coords.y - h) + 'px';
}

const mapStateToProps = ({repos}) => ({...repos})

Repos = connect(
  mapStateToProps
)(Repos)

export default Repos
