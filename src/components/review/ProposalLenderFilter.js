import React, { Component } from "react";
import { Text, View, } from 'react-native';
import { Card, Avatar, Chip } from 'react-native-paper';
import { connect } from 'react-redux';
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import getStyleSheet from '../../styles/styles';  
import { WEEKLY_VIEW, FORTNIGHTLY_VIEW, MONTHLY_VIEW, QUARTERLY_VIEW } from '../../constants/review';
import { WEEK_BANNER, FORTNIGHT_BANNER, MONTH_BANNER, QUARTER_BANNER,
	SHOWING_PROPOSALS_BANNER, SHOWING_PROPOSALS_FOR_DATE_BANNER }  from '../../constants/banners';
import { setQParams, loadProposals, setReviewPeriod, closeReview, } from '../../actions';
import CalendarDateCell from './CalendarDateCell';
import SpinnerHolder from '../common/SpinnerHolder';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE } from '../../constants/colors';

class ProposalLenderFilter extends Component {

	constructor(props) {
        super(props);
    }

    render () {
    	const styles = getStyleSheet();
    	const qParamsFortnightly = this.props.getQParams(FORTNIGHTLY_VIEW);
    	const qParamsMonthly = this.props.getQParams(MONTHLY_VIEW);
    	const qParamsQuarterly = this.props.getQParams(QUARTERLY_VIEW);

    	return (
    	<View>
		  <Card style={{borderWidth:0.5, borderColor:LOGO_BRIGHT_BLUE, borderRadius:10}}>
			  <Card.Title title="Select lender to show proposals for" titleStyle={styles.textSmallBoldLogoPaleBlue}></Card.Title>
			  <Card.Content>
				  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
						<Chip key="ALL_LENDERS" textStyle={styles.textSmallLogoDarkBlue} selected={true}>All</Chip>
						<View style={{margin:3}} />
						<Chip icon={(props) => <Avatar.Image  size={24} source={require('../../assets/anz.png')} style={{marginRight:15}}  />} onPress={() => {}}></Chip>							
						<View style={{margin:3}} />
						<Chip icon={(props) => <Avatar.Image  size={24} source={require('../../assets/anz.png')} style={{marginRight:15}}  />} onPress={() => {}}></Chip>							
						<View style={{margin:3}} />
						<Chip icon={(props) => <Avatar.Image  size={24} source={require('../../assets/anz.png')} style={{marginRight:15}}  />} onPress={() => {}}></Chip>							
						<View style={{margin:3}} />
						<Chip icon={(props) => <Avatar.Image  size={24} source={require('../../assets/anz.png')} style={{marginRight:15}}  />} onPress={() => {}}></Chip>							
						<View style={{margin:3}} />

				  </ScrollView>
			  </Card.Content>
		  </Card>
      </View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer }) => {
  const { updatedProposal } = proposalReducer;
  const { qParams, fetchProposals, reviewPeriod, viewRange, dateInView, updated, getQParams } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { qParams, updatedProposal, fetchProposals, accessCode, borrower, reviewPeriod, viewRange, dateInView, getQParams, updated };
};

export default connect(mapStateToProps, { setQParams, setReviewPeriod, loadProposals, closeReview, })(ProposalLenderFilter);