import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {counterStart,stopStart,pauseStart,resumeStart,lapStart} from '../../actions/index.js';
import { withRouter } from 'react-router-dom'
// () => this.props.counterStart()  //this.props.counterStart
class StopwatchBtns extends Component {
  render() {
    let showGo = this.props.strt.status !== 'Stopped' ? 'none' : 'block' ;
    // let showReset = this.props.strt.status !== 'Paused' ? 'none' : 'inline-block';
    let showResetResume = this.props.strt.status !== 'Paused' ? 'none' : 'inline-block';
    // let showPause = this.props.strt.status !== 'Running' ? 'none' : 'inline-block';
    let showPauseLap = this.props.strt.status !== 'Running' ? 'none' : 'inline-block';

    return(
      <div className='stopwatch-Btns'>
        <button onClick={this.props.counterStart} style={{display: showGo}} > Go </button>
        <button onClick={this.props.stopStart} style={{display: showResetResume}}> Reset </button>
        <button onClick={this.props.pauseStart} style={{display: showPauseLap}}> Pause </button>
        <button onClick={this.props.resumeStart} style={{display: showResetResume}}> Resume </button>
        <button onClick={this.props.lapStart} style={{display: showPauseLap}}> Lap </button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    strt: state.stopwatch
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      counterStart: counterStart,
      stopStart:stopStart,
      pauseStart:pauseStart,
      resumeStart:resumeStart,
      lapStart:lapStart
    }, dispatch)
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(StopwatchBtns));
