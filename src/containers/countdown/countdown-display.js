import React, {Component} from 'react';
import {connect} from 'react-redux';

class CountdownDisplay extends Component {
  render() {
    //let minutes = Math.floor(x/6000);
    //let seconds = Math.floor( (x%6000) /100 )
    //let centiseconds = (x%6000) % 100;
    let countdown_Running = this.props.countdown.status ==='Stopped' ? 'none' : 'flex';
    let countdown_Stopped = this.props.countdown.status !=='Stopped' ? 'none' : 'flex';
    return (
      <div className='countdown-display'>
        <span style={{display: countdown_Stopped }}> {this.props.format(this.props.countdown.minutes)}</span>
        <span className='separator' style={{display: countdown_Stopped }}> {"\u00A0"}:{"\u00A0"} </span>
        <span style={{display: countdown_Stopped }}> {this.props.format(this.props.countdown.seconds)}</span>

        <span style={{display: countdown_Running }}>
          { this.props.format(Math.floor( this.props.countdown.target_time /60)) }
        </span>
        <span className='separator' style={{display: countdown_Running }}>
          {"\u00A0"}:{"\u00A0"}
        </span>
        <span style={{display: countdown_Running }}>
          { this.props.format(Math.floor( this.props.countdown.target_time - Math.floor( this.props.countdown.target_time /60) * 60 ) ) }
        </span>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    countdown: state.countdown
  }
}

export default connect(mapStateToProps)(CountdownDisplay);
