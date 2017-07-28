import {combineReducers} from 'redux';
import stopwatch from './reducer-stopwatch';
import countdown from './reducer-countdown';
import show_Time from './reducer-time';

const allReducers = combineReducers({
  stopwatch: stopwatch,
  countdown: countdown,
  show_Time: show_Time
});

export default allReducers;
