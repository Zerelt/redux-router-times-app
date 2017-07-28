import {START} from '../constants';
import {TICK} from '../constants';
import {STOP} from '../constants';
import {PAUSE} from '../constants';
import {RESUME} from '../constants';
import {LAP} from '../constants';
import {store} from '../store';

let increment = () => {
  return {
    type:TICK
  }
}

let interval = () => {
  setInterval(increment(), 1000);
};

const newCounter = () => {
  store.dispatch(increment());
};
/*
export const counterStart = () => {

  if (store.getState().strt.status=='Stopped') {
    return (dispatch) => {
      dispatch({type:START});
      setInterval(newCounter, 1000);
    };
  } else {
    return (dispatch) => {
      dispatch({type:STOP});
      clearInterval(newCounter);
    };
  }
};
*/

export const counterStart = () => {

  const interval = setInterval( () => {
    store.dispatch({
      type: TICK
    });
  },10);

  // return (dispatch) => {
  //   dispatch({type: START, interval});
  // }

  return store.dispatch({
    type: START,
    interval:interval
  });
}

export const stopStart = () => {
  // return (dispatch) => {
  //   clearInterval(newCounter());
  // };
  return {type: STOP};
};

export const pauseStart = () => {
  // return (dispatch) => {
  //   dispatch({type: PAUSE});
  // }
  return {type: PAUSE};
};

export const resumeStart = () => {
  // return (dispatch) => {
  //   dispatch({type: PAUSE});
  // }
  // return {type: START};
  return counterStart()
  // return (dispatch) => {return counterStart()};
};

export const lapStart = () => {
  // return (dispatch) => {
  //   dispatch({type: PAUSE});
  // }
  // return {type: START};
  return {type: LAP}
  // return (dispatch) => {return counterStart()};
};

/*
export const counterStart = () => {
  // console.log('merge');
  // return dispatch => {
  //   setInterval(() => {
  //     dispatch( increment() );
  //   }, 1000);
  // };
  return (dispatch) => {
    // dispatch({type: TICK});
    // let interval = setInterval(() => {
    //
    // },1000)

    // if(RdCounter==0){
      // console.log(allReducers.strt);
      setInterval(() => {
        dispatch(increment());
      }, 1000);
    // }
    // else {
    //   // console.log(allReducers.strt);
    //   clearInterval(increment());
    // }
  };
};
*/
