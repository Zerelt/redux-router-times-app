import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {refresh_Time} from '../../actions/index.js';

import {store} from '../../store';

class CurrentTime extends Component {

  componentDidMount() {
    store.dispatch(refresh_Time);
  }
  componentWillUnmount() {
    // store.dispatch(refresh_Time);
  }

  render() {
    let H = this.props.show_Time.current_Time.split(' ')[0].split(':')[0];
    let M = this.props.show_Time.current_Time.split(' ')[0].split(':')[1];
    let S = this.props.show_Time.current_Time.split(' ')[0].split(':')[2];

    return (
      <div className='local-time'>
        <span className='local-time-top'>
          <div>
            <span>{H}</span>
            <span>:</span>
            <span>{M}</span>
            <span>:</span>
            <span>{S}</span>
          </div>
        </span>
        <span className='local-time-bottom'>
          {
            this.props.show_Time.current_Time.split(' ')[1]
            +' '+
            this.props.show_Time.current_Time.split(' ')[2]
            +' '+
            this.props.show_Time.current_Time.split(' ')[3]
          }
        </span>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    show_Time: state.show_Time
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      refresh_Time:refresh_Time
    }
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(CurrentTime);
