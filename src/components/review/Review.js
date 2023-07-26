import React, { Component } from "react";
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Portal, Dialog, Button, Paragraph} from 'react-native-paper';

import getStyleSheet from '../../styles/styles';  
import { NEXT, CLOSE_BUTTON_BANNER, CONGRATS, APPLICATION_SUBMITTED } from '../../constants/banners';
import { CALENDAR_MODE, COMPARE_MODE, PROPOSAL_MODE, }  from '../../constants/review';
import { BACKGROUND_LIGHT_BLUE, WHITE, TRANSPARENT } from '../../constants/colors';
import { closeReview, setViewMode, hideSubmittedApplicationMessage } from '../../actions';
import ProposalCalendarView from './ProposalCalendarView';
import ReviewButtons from './ReviewButtons';
import CompareProposal from '../review/CompareProposal';
import Proposal from '../review/Proposal';
import SpinnerHolder from '../common/SpinnerHolder';
import ErrorDialog from '../ErrorDialog';

class Review extends Component {

	constructor(props) {
        super(props);
    }

    render () {
    	const styles = getStyleSheet();
    	return (
		<View style={[styles.stretchedWideVerticalLayout, {padding:'1%'}]}>
			<View style={styles.space}/>
			<View style={[{flexDirection:'column', height:"100%"}]} >
				{ this.props.mode == CALENDAR_MODE ? <ProposalCalendarView /> :
					this.props.mode == COMPARE_MODE ? <CompareProposal /> : 
					this.props.mode == PROPOSAL_MODE ? <Proposal /> : 
					null }
			<View style={styles.space}/>
			<View style={{alignSelf:"flex-end"}}>
			{ this.props.mode == PROPOSAL_MODE  ? null : <ReviewButtons/> }
			</View>
			</View>


			<Portal>
				<Dialog visible={this.props.showNewApplicationMessage} >
				<Dialog.Title>{CONGRATS}</Dialog.Title>
				<Dialog.Content><Paragraph>{APPLICATION_SUBMITTED}</Paragraph></Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						this.props.setViewMode(CALENDAR_MODE);
						this.props.hideSubmittedApplicationMessage();
						}}>{CLOSE_BUTTON_BANNER}</Button>
				</Dialog.Actions>
				</Dialog>
			</Portal>
			<SpinnerHolder />

	    </View >
        )
    }
}

const mapStateToProps = ({ authReducer, proposalReducer, proposalCalendarReducer }) => {
  const { showNewApplicationMessage } = proposalReducer;
  const { mode, reviewPeriod, proposalsInView, updated } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { mode, reviewPeriod, proposalsInView, updated, accessCode, borrower, showNewApplicationMessage };
};

export default connect(mapStateToProps, { closeReview, setViewMode, hideSubmittedApplicationMessage })(Review);