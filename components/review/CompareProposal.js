import React, { Component } from "react";
import { Text, View, ScrollView, } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import {  } from '../../constants/banners';
import { closeReview } from '../../actions';
import CompareProposalScroller from './CompareProposalScroller';
import LoanPackageScrollTab from './LoanPackageScrollTab';
import CompareProposalDetails from './CompareProposalDetails';
import SpinnerHolder from '../common/SpinnerHolder';
import ErrorDialog from '../ErrorDialog';
import { FEATURES, RATES_AND_FEES, DISCOUNTS_AND_OFFERS, SPECIAL_REQUIREMENTS } from '../../constants/review';
import { COMPARE_TWO, ATLEAST_TWO_BANNER, FEATURES_BANNER, RATES_AND_FEES_BANNER, DISCOUNTS_BANNER, SPECIAL_REQUIREMENTS_BANNER } from '../../constants/banners';

class CompareProposal extends Component {

	constructor(props) {
        super(props);
    }

    render () {
    	const styles = getStyleSheet();
    	return (
    	<View style={{flexDirection:'column', width:"100%", height:"80%",  justifyContent:'space-between'}}>
			{this.props.proposalsInView?.length == null || this.props.proposalsInView?.length < 2 ?
				<View>
					<View style={styles.space}/>
					<Text style={styles.textMediumBoldLogoDarkBlue}>{ATLEAST_TWO_BANNER}</Text>
				</View> :
				<Text style={styles.textSmallBoldLogoPaleBlue}>{COMPARE_TWO}</Text>
			}
			<View style={{flexDirection:'column', height:"40%"}}>
	    		<View style={styles.space}/>
	    		<CompareProposalScroller/>
	    		<View style={styles.space}/>
	        </View>
			<View style={styles.space}/>
			<View style={{flexDirection:'column', height:"12%"}}>
				{ 1 < this.props.proposalsInView?.length  ?
	    		<View>
		    		<View style={styles.hr}/>
						<ScrollView  showsHorizontalScrollIndicator={false} horizontal={true} keyboardShouldPersistTaps='handled' >
							<LoanPackageScrollTab iconName="diamond-stone" current={this.props.selectedView} selection={FEATURES} banner={FEATURES_BANNER} />
							<View style={{marginRight:5}} />
							<LoanPackageScrollTab iconName="brightness-percent" current={this.props.selectedView} selection={RATES_AND_FEES} banner={RATES_AND_FEES_BANNER} />
							<View style={{marginRight:5}} />
							<LoanPackageScrollTab iconName="content-cut" current={this.props.selectedView} selection={DISCOUNTS_AND_OFFERS} banner={DISCOUNTS_BANNER} />
							<View style={{marginRight:5}} />
							<LoanPackageScrollTab iconName="contrast-circle" current={this.props.selectedView} selection={SPECIAL_REQUIREMENTS} banner={SPECIAL_REQUIREMENTS_BANNER}  />
						</ScrollView>

					</View> : null }
		        </View>
			<View style={{flexDirection:'column', height:"55%"}}>
				{ 1 < this.props.proposalsInView?.length  ?
	    		<View>
		    		<View style={styles.space}/>
		    		<CompareProposalDetails/>
					</View> : null }
	        </View>
			<SpinnerHolder />
			<ErrorDialog />
	    </View >
    	
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer }) => {
  const { selectedView } = proposalReducer;
  const { proposalsInView, displayProposal } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, proposalsInView, displayProposal, selectedView };
};

export default connect(mapStateToProps, { closeReview })(CompareProposal);