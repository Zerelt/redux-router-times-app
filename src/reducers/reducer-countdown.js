require('es6-object-assign').polyfill();
import {CD_INC_M} from '../constants';
import {CD_DEC_M} from '../constants';
import {CD_INC_S} from '../constants';
import {CD_DEC_S} from '../constants';
import {CD_GO} from '../constants';
import {CD_TICK} from '../constants';
import {CD_RESET}from '../constants';

const INITIAL_STATE = {
  status: 'Stopped',
  minutes: 0,
  seconds: 0,
  target_time: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CD_INC_M:
      return Object.assign(
        {},
        state,
        {minutes:state.minutes+1}
      );
      break;
    case CD_DEC_M:
      return Object.assign(
        {},
        state,
        {minutes:state.minutes-1}
      );
      break;
    case CD_INC_S:
      return Object.assign(
        {},
        state,
        {seconds:state.seconds+1}
      );
      break;
    case CD_DEC_S:
      return Object.assign(
        {},
        state,
        {seconds:state.seconds-1}
      );
      break;
    case CD_GO:
      return Object.assign(
        {},
        state,
        {status:'Running', target_time:state.minutes*60+state.seconds, interval:action.interval}
      );
      break;
    case CD_RESET:
      clearInterval(state.interval);
      return Object.assign(
        {},
        state,
        INITIAL_STATE
      );
      break;
    case CD_TICK:
      return Object.assign(
        {},
        state,
        {target_time:state.target_time-1}
      );
      break;
    default:
      return state;
  }
};
