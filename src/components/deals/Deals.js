import React, { Component } from "react";
import { View, Text } from 'react-native';
import {  } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyleSheet from '../../styles/styles';  
import { onClickDealsButton, setViewMode, closeDeals } from '../../actions';
import { DEALS_BANNER, APPLICATION_BANNER } from '../../constants/banners';
import { APPLICATION_MODE, DEALS_MODE }  from '../../constants/review';

import DealsByStatus from './DealsByStatus';
import Application from '../deals/Application';

class Deals extends Component {
    constructor(props) {
	    super(props);
	}

    render () {
    	const styles = getStyleSheet();

    	return (
			<View style={{alignContent:"stretch", height:"95%", width:"100%"}}>
    			<View style={{flexDirection:'row',justifyContent:'space-between'}}>
					<Text style={styles.textMediumBoldGray} >{this.props.mode == APPLICATION_MODE ? APPLICATION_BANNER : DEALS_BANNER}</Text>
					<Icon.Button name="close" 
						borderRadius={20}
						backgroundColor={"#000000"}
						color={"#ffffff"}
						height={40}
						width={40}
						iconStyle={{alignSelf:"center", marginLeft:2}}
						onPress={this.props.mode == APPLICATION_MODE ? 
						() => { 
							this.props.setViewMode(DEALS_MODE);
							this.props.onClickDealsButton() }
						: this.props.closeDeals} />
				</View>
				<View>
				{ this.props.mode == APPLICATION_MODE ? <Application /> : <DealsByStatus /> }					
				</View>
			</View>
        )
    }
}

const mapStateToProps = ({ proposalCalendarReducer, dealsReducer }) => {
  const { mode } = proposalCalendarReducer;
  const { numUnderAssessment, numConditionallyApproved, numRejected, numExpired } = dealsReducer ;
  return { mode, numUnderAssessment, numConditionallyApproved, numRejected, numExpired };
};

export default connect(mapStateToProps, { onClickDealsButton, closeDeals, setViewMode })(Deals);