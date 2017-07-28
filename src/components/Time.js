import React , {Component} from 'react';
import CurrentTime from '../containers/time/local-time';
import OtherTimes from '../containers/time/other-times';
import OtherTimesList from '../containers/time/other-times-list';
import AddOtherTime from '../containers/time/add-other-time';

export default class Time extends Component {
  render(){
    return (
      <div className='time'>
        <CurrentTime />
        <OtherTimes />
        <OtherTimesList/>
        <AddOtherTime />
      </div>
    );
  }
}
