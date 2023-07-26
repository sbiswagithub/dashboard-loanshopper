import React, { Component } from "react";
import { View, } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import {  } from '../../constants/banners';
import { CALENDAR_MODE } from '../../constants/review';
import { setViewMode, closeReview, shiftProposal, loadProposalDetails, handleFetchError } from '../../actions';
import {  } from "react-native-paper";
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, WHITE } from '../../constants/colors';

class ProposalButtons extends Component {

	constructor(props) {
        super(props);
	}

	renderButton(iconName, isActive, up){
		return <Icon key={iconName} name={iconName} size={30} 
				    		color={isActive ? LOGO_DARK_BLUE : LOGO_BRIGHT_BLUE}  
				    		backgroundColor={WHITE} 
							iconStyle={{alignItems: "stretch"}}
							style={{alignContent:"center"}} 
				    		onPress={() => {isActive ? this.props.shiftProposal(up) : null}}/>
	}
    render () {
    	const styles = getStyleSheet();
		const isFirst = this.props.proposalsInView.findIndex(x => x._id === this.props.displayProposal._id) === 0;
		const isLast  = this.props.proposalsInView.findIndex(x => x._id === this.props.displayProposal._id) === (this.props.proposalsInView.length-1);

		return (
	    		<View style={[styles.chipsLayout,{maxWidth:"50%"}]}>
					<View style={{marginLeft:"5%"}}>
						{isFirst && isLast ? null : this.renderButton(isFirst ?"leftcircle" : "leftcircleo", !isFirst, false)}
					</View>
					<View style={{marginLeft:"5%"}}>
						{isFirst && isLast ? null : this.renderButton(isLast  ? "rightcircle" : "rightcircleo", !isLast, true)}
					</View>
					<View style={{marginLeft:"5%"}}>
						<Icon name="shrink" size={30} borderRadius={30}
							color={LOGO_DARK_BLUE} backgroundColor={"#ffffff"}
							iconStyle={{alignContent:'center'}} 
							onPress={() => this.props.setViewMode(CALENDAR_MODE)} />
					</View>
				</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer }) => {
  const { fetchLoanPackage } = proposalReducer;
  const { proposalsInView, displayProposal } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, proposalsInView, displayProposal, fetchLoanPackage };
};

export default connect(mapStateToProps, { setViewMode, shiftProposal, closeReview, loadProposalDetails, handleFetchError })(ProposalButtons);