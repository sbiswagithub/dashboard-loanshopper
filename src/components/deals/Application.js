import React, { Component } from "react";
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';

import getStyleSheet from '../../styles/styles';  
import { APPLICATION_BANNER, SUBMITTED_ON, CURRENT_STATUS } from '../../constants/banners';
import { DEALS_MODE } from '../../constants/review';
import { DEFAULT_DEALS_VIEW, LOAN_PKG_DEALS_VIEW, MESSAGES_VIEW, AGENT_DTLS_VIEW } from '../../constants/deals';
import { toggleLoanPackage, fromApplication, setViewMode, handleFetchError, onClickApplyButton, loadProposalDetails } from '../../actions';
import SpinnerHolder from '../common/SpinnerHolder';
import ErrorDialog from '../ErrorDialog';
import { LOGO_DARK_BLUE, LOGO_BRIGHT_BLUE } from '../../constants/colors';
import ApplicationLoanPackage from "./ApplicationLoanPackage";
import ApplicationTiles from "./ApplicationTiles";
import ApplicationAgentDetails from "./ApplicationAgentDetails";

class Application extends Component {

	constructor(props) {
		super(props);

	}

    render () {
		const styles = getStyleSheet();
        this.props.fetchLoanPackage(
			{...this.props, 
				proposalId: this.props?.displayApplication?.proposal._id, 
				loanPackageId : this.props?.displayApplication?.applicationLoanPackage._id}, 
        	this.props.loadProposalDetails,
        	this.props.handleFetchError);
    	return (
		<View style={{flexDirection:'column', width:"100%",  justifyContent:'space-between', maxHeight:"100%"}}>
			<View style={styles.space}/>

    		<View style={{flexDirection:'column'}}>
			<ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
				<Text style={styles.textMediumBoldLogoDarkBlue} >{this.props?.displayApplication?.applicationLoanPackage?.productName}</Text>
				<View style={styles.space}/>
				<Text style={styles.textMediumLogoDarkBlue}>{SUBMITTED_ON} : {Moment(this.props.displayApplication.startDate).format('ll')}</Text>
				<View style={styles.space}/>
				<ApplicationTiles />
				<View style={styles.space}/>
				{
				this.props.applicationView == LOAN_PKG_DEALS_VIEW ?
					<ApplicationLoanPackage  /> :
				this.props.applicationView == AGENT_DTLS_VIEW ?
					<ApplicationAgentDetails />
					 : null
				}
	        </ScrollView>
			</View>
			<SpinnerHolder />
	    </View >
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer, entryReducer, dealsReducer }) => {
  const {  fetchLoanPackage, } = proposalReducer;
  const { } = entryReducer;
  const { applicationView } = dealsReducer;
  const { displayApplication } = proposalCalendarReducer;
  const { accessCode, } = authReducer;
  return { accessCode, displayApplication, applicationView, fetchLoanPackage, };
};

export default connect(mapStateToProps, { toggleLoanPackage, fromApplication, setViewMode, handleFetchError, onClickApplyButton, loadProposalDetails })(Application);