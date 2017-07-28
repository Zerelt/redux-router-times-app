require('es6-object-assign').polyfill();
import {START} from '../constants';
import {STOP} from '../constants';
import {PAUSE} from '../constants';
import {LAP} from '../constants';
import {TICK} from '../constants';

const INITIAL_STATE = {
  status: 'Stopped',
  seconds: 0,
  lapTimes:[]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START:
      return Object.assign(
                {},
                state,
                {status: 'Running',interval:action.interval}
              );
      break; //{ ...state, status: 'Running'};
    case TICK:
      return Object.assign(
                {},
                state,
                {seconds:state.seconds+1}
              );
      break; //{ ...state, seconds: state.seconds+1};
    case STOP:
      clearInterval(state.interval);
      return Object.assign(
              {},
              state,
              INITIAL_STATE);
      break; //{ ...state, status: 'Stopped'}
    case PAUSE:
      clearInterval(state.interval);
      return Object.assign(
              {},
              state,
              {status:'Paused',seconds:state.seconds});
      break;
      case LAP:
        return Object.assign (
                {},
                state,
                { lapTimes:state.lapTimes.concat([state.seconds]) } );
      break;
    default:
      return state;
  }
};
