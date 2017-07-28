import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

class TimeList extends Component {

  createList () {
    let arr = this.props.timeList.slice(0).sort((a,b)=> b-a); // .sort((a,b)=>b>a) is sorting the timeList in the STATE ; need to use .slice() here
    let x=-1; let listLength=this.props.timeList.length;
    return arr.map( (t,id) => {
      x++;
        return (
          <li key={id}>
            <div className='stopwatch-lap-line'>
              <p className='stopwatch-lap-number'>Lap {listLength-x}</p>
              <div className='stopwatch-lap-time'>
                <span>{ this.props.format(Math.floor( t /6000)) }</span>
                <span> : </span>
                <span>{ this.props.format(Math.floor( ( t %6000) /100 )) }</span>
                <span> : </span>
                <span>{ this.props.format(( t %6000) % 100) }</span>
              </div>
            </div>
          </li>
        );
    });
  }

  render(){
    return(
      <div className='stopwatch-lap'>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} style={{ flex:1 }}>
          {this.createList() }
        </Scrollbars>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    timeList: state.stopwatch.lapTimes
  };
}

export default withRouter(connect(mapStateToProps)(TimeList));
