import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import {select_Time} from '../../actions/index.js';

class OtherTimesList extends Component {

  render() {

    let time_Options = this.props.show_Time.timezones_List.map((x,id)=>{
      return (
        <li
          tabIndex="0"
          key={id}
          onClick={()=>this.props.select_Time(x.codeName)}>
          {x.name}
        </li>
      )
    });

    let showList = this.props.show_Time.showList == true ? 0 : 100

    return (
      <div className='other-times-list' style={{transform:"translateY("+showList+"%)"}}>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} style={{ flex:1 }}>
          {time_Options}
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
      select_Time:select_Time
    },
    dispatch
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(OtherTimesList);
