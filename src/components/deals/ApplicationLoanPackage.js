import React, { Component } from "react";
import { Text, View, ScrollView, } from 'react-native';
import { } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';

import { } from '../../constants/common';
import getStyleSheet from '../../styles/styles';  
import { showApplication, loadProposalDetails } from '../../actions';
import { SPECIAL_REQUIREMENTS_BANNER, DISCOUNTS_BANNER, FEATURES_BANNER, RATES_AND_FEES_BANNER, SUBMITTED_ON, CURRENT_STATUS } from '../../constants/banners';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE } from '../../constants/colors';
import LoanPackageScrollTab from "../review/LoanPackageScrollTab";
import { FEATURES, RATES_AND_FEES, DISCOUNTS_AND_OFFERS, SPECIAL_REQUIREMENTS } from "../../constants/review";
import ProposalDetails from "../review/ProposalDetails";
  
class ApplicationLoanPackage extends Component {
    constructor(props) {
		super(props);
	}

    render () {
		const styles = getStyleSheet();
    	return (
		<View style={{flexDirection:'column', alignSelf:"center", width:"98%", }}>

			<ScrollView  showsHorizontalScrollIndicator={false} horizontal={true} keyboardShouldPersistTaps='handled' >
				<LoanPackageScrollTab iconName="diamond-stone" current={this.props.selectedPanel} selection={FEATURES} banner={FEATURES_BANNER} />
				<View style={{marginRight:5}} />
				<LoanPackageScrollTab iconName="brightness-percent" current={this.props.selectedPanel} selection={RATES_AND_FEES} banner={RATES_AND_FEES_BANNER} />
				<View style={{marginRight:5}} />
				<LoanPackageScrollTab iconName="content-cut" current={this.props.selectedPanel} selection={DISCOUNTS_AND_OFFERS} banner={DISCOUNTS_BANNER} />
				<View style={{marginRight:5}} />
				<LoanPackageScrollTab iconName="contrast-circle" current={this.props.selectedPanel} selection={SPECIAL_REQUIREMENTS} banner={SPECIAL_REQUIREMENTS_BANNER}  />
			</ScrollView>
			<View style={styles.space}/>
			<ProposalDetails selectedView={this.props.selectedPanel}  />
			<View style={styles.space}/>

		</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalReducer, proposalCalendarReducer, dealsReducer }) => {
  const { } = proposalReducer;
  const { displayApplication } = proposalCalendarReducer;
  const { accessCode } = authReducer;
  const { selectedPanel } = dealsReducer;
  return { accessCode, selectedPanel, displayApplication, };
};

export default connect(mapStateToProps, { showApplication, loadProposalDetails })(ApplicationLoanPackage);