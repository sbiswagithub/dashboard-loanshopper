import React, { Component } from "react";
import { Text, View, } from 'react-native';
import { } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyleSheet from '../../styles/styles';  
import { loadProposals, setFilterMode } from '../../actions';
import { FILTER_NONE, FILTER_DATE, FILTER_LENDER, FILTER_BROKER, FILTER_LIKED, QUARTERLY_VIEW } from '../../constants/review';
import {  } from '../../constants/banners';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE } from '../../constants/colors';

class ProposalFilterButton extends Component {

	constructor(props) {
		super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
			<View>
				<Icon.Button name={this.props.iconName} size={20} borderRadius={25}
						backgroundColor={this.props.active ? LOGO_BRIGHT_BLUE : "#ffffff"} 
						color={this.props.active ? LOGO_DARK_BLUE : "grey" } 
						style={{borderWidth:0.5,  borderColor:LOGO_BRIGHT_BLUE}}
						iconStyle={{margin:3,alignSelf:'center'}} 
						onPress={() => {
							this.props.setFilterMode(this.props.mode);
							switch(this.props.mode) {
								case FILTER_LIKED:
									this.props.fetchProposals({ ...this.props, qParams: this.props.getQParams(QUARTERLY_VIEW), liked:true, },this.props.loadProposals);
									return;
								default:
									this.props.fetchProposals({ ...this.props, qParams: this.props.getQParams(QUARTERLY_VIEW) },this.props.loadProposals);
							}
						}}
						/>
				<View style={styles.space} />
				<Text style={this.props.active ? styles.textSmallBoldLogoDarkBlue : styles.textSmallGray}>{this.props.label}</Text>
			</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer }) => {
  const { updatedProposal } = proposalReducer;
  const { reviewPeriod, proposalsInView, updated, fetchProposals, getQParams, filter, } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { updatedProposal, reviewPeriod, proposalsInView, updated, accessCode, borrower, filter, fetchProposals, getQParams };
};

export default connect(mapStateToProps, { loadProposals, setFilterMode })(ProposalFilterButton);