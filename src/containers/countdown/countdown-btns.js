import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {cd_M_Up, cd_M_Down, cd_S_Up, cd_S_Down, cd_GO, cd_Reset } from '../../actions/index.js';


class CountdownBtns extends Component {
  render() {

    return(
      <div className='countdown-btns'>
        <div className='plusBtn-container'>
          <button className='plusBtn' onClick={this.props.countdown.status=='Stopped' ? this.props.cd_M_Up : ''} > + </button>
          <button className='plusBtn' onClick={this.props.countdown.status=='Stopped' && this.props.countdown.seconds<59 ? this.props.cd_S_Up : ''} > + </button>
        </div>

        <button className='go-reset' onClick={ this.props.countdown.status !== 'Running' ? this.props.cd_GO : this.props.cd_Reset} >
          {this.props.countdown.status === 'Running' ? '\u21BA' : 'Go' }
        </button>

        <div className='minusBtn-container'>
          <button className='minusBtn' onClick={this.props.countdown.status=='Stopped' && this.props.countdown.minutes>0 ? this.props.cd_M_Down : ''} > - </button>
          <button className='minusBtn' onClick={this.props.countdown.status=='Stopped' && this.props.countdown.seconds>0 ? this.props.cd_S_Down : ''} > - </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    countdown: state.countdown
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      cd_M_Up: cd_M_Up,
      cd_M_Down:cd_M_Down,
      cd_S_Up: cd_S_Up,
      cd_S_Down:cd_S_Down,
      cd_GO:cd_GO,
      cd_Reset:cd_Reset
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CountdownBtns);
