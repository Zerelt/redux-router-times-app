import React , {Component} from 'react';
import CountdownDisplay from '../containers/countdown/countdown-display';
import CountdownBtns from '../containers/countdown/countdown-btns';

export default class Countdown extends Component {

  format(x) {
    return x < 10 ? '0'+x : x ;
  }

  render () {
    return(
      <div className='countdown'>
        <CountdownBtns />
        <CountdownDisplay format={this.format.bind(this)} />
      </div>
    )
  }
}
