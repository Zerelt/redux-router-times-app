import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showHide} from '../../actions/index.js';

import {store} from '../../store';

class AddOtherTime extends Component {
  render () {

    let showList = this.props.show_Time.showList == false ? 0 : 135

    return(
      <div className='add-Other-Time' onClick={this.props.showHide}>
        <span style={{transform:"rotate("+showList+"deg)"}}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox={"0 0 46.3 46.3"}>
            <g id="XMLID_1_">
            	<g id="XMLID_8_">
            		<circle id="XMLID_11_" style={{fill:'none'}} cx="23.1" cy="23.1" r="23.1"/>
            	</g>
            	<g id="XMLID_94_">
            		<path id="XMLID_207_" style={{fill:'#FF3F00'}} d="M25.6,36h-5c-0.9,0-1.6-0.7-1.6-1.6V11.9c0-0.9,0.7-1.6,1.6-1.6h5c0.9,0,1.6,0.7,1.6,1.6
            			v22.5C27.3,35.3,26.5,36,25.6,36z"/>
                <path id="XMLID_186_" style={{fill:'#FF3F00'}} d="M36,20.6v5c0,0.9-0.7,1.6-1.6,1.6H11.9c-0.9,0-1.6-0.7-1.6-1.6v-5c0-0.9,0.7-1.6,1.6-1.6
            			h22.5C35.3,19,36,19.7,36,20.6z"/>
            	</g>
            </g>
          </svg>
        </span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    show_Time: state.show_Time
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators (
    {
      showHide: showHide
    },
    dispatch
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(AddOtherTime);
