import React, { Component } from "react";
import { Text, View, Image, ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyleSheet from '../../styles/styles';  
import {  } from '../../constants/banners';
import { CALENDAR_MODE, COMPARE_MODE, }  from '../../constants/review';
import { LOGO_BRIGHT_BLUE, BLACK, WHITE }  from '../../constants/colors';
import { setViewMode, closeReview } from '../../actions';

const renderIconButton = (props) => {
	const styles = getStyleSheet();
    return (
      <Icon.Button name={props.iconName} size={20} borderRadius={10}
		    		backgroundColor={props.activeMode == null ? BLACK :
		    							props.currentMode == props.activeMode ? LOGO_BRIGHT_BLUE : WHITE } 
		    		color={props.activeMode == null ? WHITE :
		    							props.currentMode != props.activeMode ? LOGO_BRIGHT_BLUE : WHITE } 
		    		iconStyle={{margin:8,alignContent:'center'}} 
		    		onPress={() => {props.onPress(props.activeMode)}} />
    );
};

class ReviewButtons extends Component {

	constructor(props) {
        super(props);
    }

    render () {
    	const styles = getStyleSheet();
    	return (
			<View style={{flexDirection:'row', alignSelf:"flex-end"}}>
				{renderIconButton(
		    		{iconName:"close", 
		    		onPress: this.props.closeReview
		    		})}
		    </View >
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer }) => {
  const { accessCode, borrower } = authReducer;
  const { mode } = proposalCalendarReducer;
  return { mode, accessCode, borrower };
};

export default connect(mapStateToProps, { setViewMode, closeReview })(ReviewButtons);