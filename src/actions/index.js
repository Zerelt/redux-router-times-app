//====================================  STOPWATCH ===============================
import {START} from '../constants';
import {TICK} from '../constants';
import {STOP} from '../constants';
import {PAUSE} from '../constants';
import {RESUME} from '../constants';
import {LAP} from '../constants';

//====================================  COUNTDOWN ===============================
import {CD_INC_M} from '../constants';
import {CD_DEC_M} from '../constants';
import {CD_INC_S} from '../constants';
import {CD_DEC_S} from '../constants';
import {CD_GO} from '../constants';
import {CD_TICK} from '../constants';
import {CD_RESET}from '../constants';


//====================================  TIME ===============================
import {TIME_START} from '../constants';
import {TIME_TICK} from '../constants';
import {TIME_SELECT} from '../constants';
import {TIME_PROCESS} from '../constants';
import {TIME_UPDATE_ALL} from '../constants';
import {TIME_REMOVE} from '../constants';
import {TIME_SHOW_LIST} from '../constants';

import {store} from '../store';
import moment from 'moment-timezone';

//====================================  STOPWATCH ===============================
export const counterStart = () => {

  const interval = setInterval( () => {
    store.dispatch({
      type: TICK
    });
  },10);

  return store.dispatch({
    type: START,
    interval:interval
  });
};

export const stopStart = () => {
  return {type: STOP};
};

export const pauseStart = () => {
  return {type: PAUSE};
};

export const resumeStart = () => {
  return counterStart()
};

export const lapStart = () => {
  return {type: LAP};
};


//====================================  COUNTDOWN ===============================
export const cd_M_Up = () => {
  return {type: CD_INC_M};
};

export const cd_M_Down = () => {
  return {type: CD_DEC_M};
};

export const cd_S_Up = () => {
  return {type: CD_INC_S};
};

export const cd_S_Down = () => {
  return {type: CD_DEC_S};
};

export const cd_Reset = () => {
  return {type: CD_RESET};
};

export const cd_GO = () => {

  let checkReset = () => {
    if(store.getState().countdown.target_time ===0 && store.getState().countdown.status =='Running') {
      return {type: CD_RESET};
    } else if (store.getState().countdown.target_time !==0 && store.getState().countdown.status =='Running') {
      return{type:CD_TICK}
    }
  };
/*
  const interval = setInterval( () => {
    if ( store.getState().countdown.target_time !== 0 ) {
      store.dispatch({
        type: CD_TICK
      });
    } else {
      return {type: CD_RESET}
    }
  },1000);
//*/

  const interval = setInterval( () => {
    store.dispatch(checkReset());
  },1000);

  // store.subscribe(checkReset);

  return store.dispatch({
    type: CD_GO,
    interval:interval
  });
};


//====================================  TIME ===============================
export const refresh_Time = () => {

  const interval = setInterval( () => {
    store.dispatch({
      type: TIME_TICK
    });
  },1000);

  return store.dispatch({
    type: TIME_START,
    interval:interval
  });
};


let process_Selected = (x) => {
  return ( x.map((a,id) => {
      return moment().tz(a).format("HH:mm:ss")+ ' ' +moment().tz(a).format("DD MMM YYYY");
    })
  );
};

let addCodeName = (x) => {
  return {type:TIME_SELECT,codename:x}
}
let processCodeNames = (x) => {
  const interval_all = setInterval( () => {
    store.dispatch({
      type: TIME_UPDATE_ALL
    });
  },1000);
  return {
    type: TIME_UPDATE_ALL,
    processed_times: process_Selected(store.getState().show_Time.selected_Timezones),
    interval_all:interval_all
  }
}

export const select_Time = (x) => {

  const interval_all = setInterval( () => {
    store.dispatch({
      type: TIME_PROCESS,
      processed_times:process_Selected(store.getState().show_Time.selected_Timezones)
    });
  },1000);
  //
  // return store.dispatch({
  //   type:TIME_SELECT,
  //   codeName:x,
  //   interval_all:interval_all
  // });
  // return {
  //   type:TIME_SELECT,
  //   codeName:x,
  //   interval_all:interval_all,
  // }
  return (dispatch) => {
    dispatch({type:TIME_SELECT,codeName:x})
    dispatch({
      type: TIME_PROCESS,
      processed_times: process_Selected(store.getState().show_Time.selected_Timezones),
    })
    dispatch({type:TIME_UPDATE_ALL,interval_all:interval_all})
    // setTimeout(function(){
    //   dispatch({type: TIME_UPDATE_ALL, processed_times: process_Selected(['US/Alaska'])})
    // },1)
  }
}

export const remove_Time = (item) =>{
  return{
    type:TIME_REMOVE,
    removed:item,
    stopUPD: store.getState().show_Time.selected_Timezones.length > 1 ? '' : store.getState().show_Time.interval_all
  }
}

export const showHide = () =>{
  return {
    type: TIME_SHOW_LIST
  }
}
