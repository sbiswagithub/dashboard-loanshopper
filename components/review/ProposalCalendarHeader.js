import React, { Component } from "react";
import { Text, View, TouchableOpacity,  } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Moment from 'moment';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import getStyleSheet from '../../styles/styles';  
import { WEEKLY_VIEW, FORTNIGHTLY_VIEW, MONTHLY_VIEW, QUARTERLY_VIEW } from '../../constants/review';
import { WEEK_BANNER, FORTNIGHT_BANNER, MONTH_BANNER, QUARTER_BANNER,
	SHOWING_PROPOSALS_BANNER, SHOWING_PROPOSALS_FOR_DATE_BANNER }  from '../../constants/banners';
import { setQParams, loadProposals, setReviewPeriod, closeReview, } from '../../actions';
import CalendarDateCell from './CalendarDateCell';
import SpinnerHolder from '../common/SpinnerHolder';

class ProposalCalendarHeader extends Component {

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
    		<LinearGradient colors={['#ffffff', '#00b4f1']} style={{borderRadius: 20}}>
    		<View style={styles.chipButtonView}>
		    	<View style={this.props.reviewPeriod == WEEKLY_VIEW ? styles.chipButtonInFocus : styles.chipButton}>
			    	<TouchableOpacity  onPress={() =>  {
			    		this.props.setReviewPeriod(WEEKLY_VIEW); }}>
			    	<Text style={this.props.reviewPeriod == WEEKLY_VIEW ? styles.textSmallBoldWhite : styles.textSmallBoldLogoDarkBlue}>{WEEK_BANNER}</Text>
	    			</TouchableOpacity>
	   		    </View>
		    	<View style={this.props.reviewPeriod == FORTNIGHTLY_VIEW ? styles.chipButtonInFocus : styles.chipButton}>
			    	<TouchableOpacity  onPress={() => { 
			    		this.props.setReviewPeriod(FORTNIGHTLY_VIEW);
			    		this.props.setQParams(qParamsFortnightly);
			    		this.props.fetchProposals({ ...this.props, qParams: qParamsFortnightly },this.props.loadProposals); 
			    		}}>
			    	<Text style={this.props.reviewPeriod == FORTNIGHTLY_VIEW ? styles.textSmallBoldWhite : styles.textSmallBoldLogoDarkBlue}>{FORTNIGHT_BANNER}</Text>
	    			</TouchableOpacity>
	   		    </View>
		    	<View style={this.props.reviewPeriod == MONTHLY_VIEW ? styles.chipButtonInFocus : styles.chipButton}>
			    	<TouchableOpacity  onPress={() => { 
			    		this.props.setReviewPeriod(MONTHLY_VIEW);
			    		this.props.setQParams(qParamsMonthly);
			    		this.props.fetchProposals({ ...this.props, qParams: qParamsMonthly },this.props.loadProposals); 
			    		}}>
			    	<Text style={this.props.reviewPeriod == MONTHLY_VIEW ? styles.textSmallBoldWhite : styles.textSmallBoldLogoDarkBlue}>{MONTH_BANNER}</Text>
	    			</TouchableOpacity>
	   		    </View>
		    	<View style={this.props.reviewPeriod == QUARTERLY_VIEW ? styles.chipButtonInFocus : styles.chipButton}>
			    	<TouchableOpacity  onPress={() => { 
			    		this.props.setReviewPeriod(QUARTERLY_VIEW);
			    		this.props.setQParams(qParamsQuarterly);
			    		this.props.fetchProposals({ ...this.props, qParams: qParamsQuarterly },this.props.loadProposals); 
			    		}}>
			    	<Text style={this.props.reviewPeriod == QUARTERLY_VIEW ? styles.textSmallBoldWhite : styles.textSmallBoldLogoDarkBlue}>{QUARTER_BANNER}</Text>
	    			</TouchableOpacity>
	   		    </View>
	    	</View>

			{ this.props.reviewPeriod == WEEKLY_VIEW ? 
	    	<View style={styles.evenlySpacedSingleRow}>
		    	<CalendarDateCell index={0} />
		    	<CalendarDateCell index={1} />
		    	<CalendarDateCell index={2} />
		    	<CalendarDateCell index={3} />
		    	<CalendarDateCell index={4} />
		    	<CalendarDateCell index={5} />
		    	<CalendarDateCell index={6}  />
			</View> : null }
			</LinearGradient>

	      	<SpinnerHolder />
    	</View>	
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer }) => {
  const { updatedProposal } = proposalReducer;
  const { qParams, fetchProposals, reviewPeriod, viewRange, dateInView, updated, getQParams, proposalsInView } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { qParams, updatedProposal, fetchProposals, accessCode, borrower, reviewPeriod, viewRange, dateInView, getQParams, updated, proposalsInView };
};

export default connect(mapStateToProps, { setQParams, setReviewPeriod, loadProposals, closeReview, })(ProposalCalendarHeader);