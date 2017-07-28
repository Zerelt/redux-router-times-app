import React , {Component} from 'react';
import MainCounter from '../containers/stopwatch/main-counter';
import TimeList from '../containers/stopwatch/time-list';
import StopwatchBtns from '../containers/stopwatch/stopwatch-btns';

export default class Stopwatch extends Component {

  format(x) {
    return x < 10 ? '0'+x : x ;
  }

  render () {
    return(
      <div className='stopwatch'>
        <MainCounter format={this.format.bind(this)} />
        <StopwatchBtns />
        <TimeList format={this.format.bind(this)}/>
      </div>
    )
  }
}
