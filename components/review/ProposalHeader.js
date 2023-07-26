import React, { Component } from "react";
import { Text, View, Image, } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import Moment from 'moment';
import { trackPromise } from "react-promise-tracker";

import getStyleSheet from '../../styles/styles';  
import { CALENDAR_MODE, PROPOSAL_RECIEVED_ON, QUARTERLY_VIEW } from '../../constants/review';
import { DELETE_PROPOSAL_TITLE_BANNER, DELETE_PROPOSAL_TEXT_BANNER } from '../../constants/banners';
import { WHITE, LOGO_DARK_BLUE, BACKGROUND_LIGHT_GRAY } from '../../constants/colors';
import { ALERT_YES_BUTTON_LABEL, ALERT_NO_BUTTON_LABEL, } from '../../constants/alerts';
import { handleFetchError, refreshProposal, setViewMode, closeReview, toggleLikeProposal, showModal, hideModal, 
	loadProposals, toggleNextSteps, toggleBrokerMessages, toggleDocumentsUpload, fetchStoredDocuments, setProposalDocuments } from '../../actions';

class ProposalHeader extends Component {

	constructor(props) {
        super(props);
    }


    // Delete button action
	_onPressDelete() {
		// Confirm before delete
		this.props.showModal();
	}
    
    render () {
		const styles = getStyleSheet();
    	return (
    		<View>
				<View style={{flexDirection:'column', maxHeight:"25%"}}>
					<Text style={this.props.displayProposal.brokerName.length > 20 ? styles.textMediumBoldLogoDarkBlue : styles.textLargeBoldLogoDarkBlue} >{this.props.displayProposal.brokerName}</Text>
					{this.props.displayProposal == null ? null :
					<Text style={styles.textMediumBoldGray} >{this.props.displayProposal.contactName}</Text>}
				</View>
	    		<View style={styles.chipsLayout}>
					<Text style={styles.textMediumBoldGray} >{PROPOSAL_RECIEVED_ON + Moment(this.props.displayProposal.createdTs).format('MMM Do YY')}</Text>
				</View>
	    		<View style={styles.chipsLayout}>
			    	<Icon.Button name={this.props.displayProposal.status === 'accepted' ? 'cogs' : "cart-arrow-down"} size={30} borderRadius={30}
			    		color={this.props.showNextSteps ? WHITE : LOGO_DARK_BLUE} backgroundColor={this.props.showNextSteps ? LOGO_DARK_BLUE : WHITE}
			    		iconStyle={{margin:5,alignContent:'center'}} 
				    	onPress={this.props.toggleNextSteps } />


			    	<Icon.Button name={"folder-upload"} size={30} borderRadius={30}
			    		color={this.props.showDocumentsUpload ? WHITE : this.props.showNextSteps ? BACKGROUND_LIGHT_GRAY : LOGO_DARK_BLUE} backgroundColor={this.props.showDocumentsUpload ? LOGO_DARK_BLUE : WHITE}
			    		iconStyle={{margin:5,alignContent:'center'}} 
						disabled={this.props.showNextSteps}
				    	onPress={
							() => {
								trackPromise(this.props.fetchStoredDocuments(this.props.setProposalDocuments))
								this.props.toggleDocumentsUpload()
							}} />

			    	<Icon.Button name={"message"} size={30} borderRadius={30}
			    		color={this.props.showBrokerMessages ? WHITE : this.props.showNextSteps ? BACKGROUND_LIGHT_GRAY : LOGO_DARK_BLUE} backgroundColor={this.props.showBrokerMessages ? LOGO_DARK_BLUE : WHITE}
			    		iconStyle={{margin:5,alignContent:'center'}} 
						disabled={this.props.showNextSteps}
				    	onPress={this.props.toggleBrokerMessages} />

			    	<Icon.Button 
			    	    name={this.props.displayProposal.liked ? "thumb-up" : "thumb-up-outline"}
			    	    size={30} borderRadius={30}
			    		color={this.props.showNextSteps ? BACKGROUND_LIGHT_GRAY :LOGO_DARK_BLUE} backgroundColor={WHITE}
						iconStyle={{margin:5,alignContent:'center'}}
						disabled={this.props.showNextSteps}
			    		onPress={() => {
					    			this.props.toggleLikeProposal(
										{ ...this.props, proposalId: this.props.displayProposal._id, liked: !this.props.displayProposal.liked });
				    			}} />

			    	<Icon.Button name="delete" size={30} borderRadius={30}
			    		color={this.props.showNextSteps ? BACKGROUND_LIGHT_GRAY : LOGO_DARK_BLUE} backgroundColor={WHITE}
			    		iconStyle={{margin:5,alignContent:'center'}} 
						disabled={this.props.showNextSteps}
				    	onPress={this.props.showModal} />

				</View>
				
			  <Portal>
			    <Dialog visible={this.props.showDeleteWarning} style={{backgroundColor:WHITE}} >
			      <Dialog.Title>{DELETE_PROPOSAL_TITLE_BANNER }</Dialog.Title>
			      <Dialog.Content>
			        <Paragraph>{DELETE_PROPOSAL_TEXT_BANNER}</Paragraph>
			      </Dialog.Content>
			      <Dialog.Actions>
			        <Button onPress={() => {
			            const proposalId = this.props.displayProposal._id;
			        	this.props.deleteBrokerProposal(
			        		{...this.props, proposalId: proposalId}, 
			        		() => {
			        			this.props.hideModal();
			    				this.props.fetchProposals({ ...this.props }, this.props.loadProposals); 
								this.props.setViewMode(CALENDAR_MODE);
			        		}, 
							(error) => {
								// On error
								this.props.hideModal();
								this.props.handleFetchError(error);
								this.props.setViewMode(CALENDAR_MODE);
							});
			        	}}>{ALERT_YES_BUTTON_LABEL}</Button>
			        <Button onPress={() => this.props.hideModal()}>{ALERT_NO_BUTTON_LABEL}</Button>
			      </Dialog.Actions>
			    </Dialog>
			  </Portal>
			</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer }) => {
  const { proposalId, isDeleteConfirmed, showDeleteWarning, deleteBrokerProposal, showNextSteps, showBrokerMessages, showDocumentsUpload } = proposalReducer;
  const { qParams, proposalsInView, displayProposal, updated, fetchProposals, getQParams, fetchProposal } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, 
    qParams, proposalsInView, displayProposal, updated, fetchProposals, fetchProposal, 
    proposalId, isDeleteConfirmed, showDeleteWarning, deleteBrokerProposal, getQParams, showNextSteps, showBrokerMessages, showDocumentsUpload };
};

export default connect(mapStateToProps, { loadProposals, handleFetchError, refreshProposal, setViewMode, closeReview, 
	toggleLikeProposal, toggleNextSteps, toggleBrokerMessages, toggleDocumentsUpload, showModal, hideModal, 
	fetchStoredDocuments, setProposalDocuments })(ProposalHeader);