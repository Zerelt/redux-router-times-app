import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'

class MainCounter extends Component {
  render() {
    //let minutes = Math.floor(x/6000);
    //let seconds = Math.floor( (x%6000) /100 )
    //let centiseconds = (x%6000) % 100;
    return (
      <div className='stopwatch-Display'>
        <span>{ this.props.format(Math.floor( this.props.strt.seconds /6000)) }</span>
        <span>:</span>
        <span>{ this.props.format(Math.floor( ( this.props.strt.seconds %6000) /100 )) }</span>
        <span>:</span>
        <span>{ this.props.format(( this.props.strt.seconds %6000) % 100) }</span>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    strt: state.stopwatch
  }
}

export default withRouter(connect(mapStateToProps)(MainCounter));
