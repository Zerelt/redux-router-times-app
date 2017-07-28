import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {remove_Time} from '../../actions/index.js';
import { Scrollbars } from 'react-custom-scrollbars';

class OtherTimes extends Component {

  listCodenames (x) {
    return x.map((item,id)=>{
      return (
        <li key={id} >
          {item }
          <br/>
          {this.props.show_Time.process_Selected[id]}
          <span onClick={()=>this.props.remove_Time(item)}>Delete</span>
        </li>
      )
    });
  }

  render() {
    return(
      <div className='other-times' >
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} style={{ flex:1 }}>
          <span>
            {this.props.show_Time.selected_Timezones.length>0 ? this.listCodenames(this.props.show_Time.selected_Timezones) : null}
          </span>
          {/* yes, process_Selected.length>0 and not process_Selected.length-1>0 */}
        </Scrollbars>
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
      remove_Time:remove_Time
    },
    dispatch
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(OtherTimes);
