'use strict';

/* simple flash notifier */
/** usage example:
  ('message', 2); // show message during 2 sec.
  ('message'); // show message infinitely
  (); // close flash
*/

import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import './index.css';
import '../close-btn';

class Flash extends Component {
  
  constructor(props) {
    super(props);
    this.state = {show: false};
  }

  componentWillReceiveProps(nextProps) {
    // console.log('receive flash')
    clearTimeout(this.timerId);
    let {message, duration} = nextProps;
    if (duration) {
      this.timerId = setTimeout(this.close, duration * 1000);
    }
    if (message) {
      this.setState({show: true});
    } else this.close();   
  }
  /*
   componentWillUpdate() {
     console.log('upd flash')
     return true
   }
   */

  close = () => {
    clearTimeout(this.timerId);
    this.setState({show: false});
  }

  render() {
    // console.log('flash render, show:', this.state.show, this.props);
    return (
      <ReactCSSTransitionGroup
        transitionName="flash"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        {this.state.show  && (
          <div className="flash">
            <i className="close" title="Close" onClick={this.close}></i>
            <span dangerouslySetInnerHTML={{__html: this.props.message}}></span>
          </div>
        )}
      </ReactCSSTransitionGroup>
    )
  }
  
}

const mapStateToProps = ({flash, loadingState}) => {
  // console.log('flash mapper', flash, loadingState)
  if (loadingState.status === 'fail') {
    console.error('Fail: ', loadingState);
    flash.message = '<h3><a class="error" href="#">Service not available</a></h3>Error: ' + loadingState.error.message;
    flash.duration = 10;
  }
  return {...flash};
}

Flash = connect(
  mapStateToProps
)(Flash)

export default Flash
    