import React, { Component } from "react";
import { Text, View, Image, } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import Moment from 'moment';
import { trackPromise } from "react-promise-tracker";

import getStyleSheet from '../../styles/styles';  
import { CALENDAR_MODE, PROPOSAL_RECIEVED_ON, QUARTERLY_VIEW } from '../../constants/review';
import { DELETE_PROPOSAL_TITLE_BANNER, DELETE_PROPOSAL_TEXT_BANNER } from '../../constants/banners';
import { WHITE, LOGO_DARK_BLUE, LOGO_BRIGHT_BLUE, } from '../../constants/colors';
import { ALERT_YES_BUTTON_LABEL, ALERT_NO_BUTTON_LABEL, } from '../../constants/alerts';
import { handleFetchError, refreshProposal, setViewMode, closeReview, toggleLikeProposal, showModal, hideModal, 
	loadProposals, toggleNextSteps, toggleBrokerMessages, toggleDocumentsUpload, fetchStoredDocuments, setProposalDocuments,
	switchToBrokerOverview, switchToProposalOverview } from '../../actions';

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
	    		<View style={[{flexDirection:"row", justifyContent:"space-between", alignSelf:"stretch"}]}>
					<Text style={styles.textMediumBoldGray} >{PROPOSAL_RECIEVED_ON + Moment(this.props.displayProposal.createdTs).format('MMM Do YY')}</Text>
					<View style={styles.chipsLayout}>
						<Icon name={"cogs"}
							size={30} borderRadius={30}
							color={this.props.showNextSteps ? LOGO_BRIGHT_BLUE : LOGO_DARK_BLUE} backgroundColor={WHITE}
							style={{marginLeft:'5%'}}
							iconStyle={{alignContent:'center'}}
							onPress={this.props.toggleNextSteps} />
						<Icon name={this.props.displayProposal.liked ? "thumb-up" : "thumb-up-outline"}
							size={30} borderRadius={30}
							color={LOGO_DARK_BLUE} backgroundColor={WHITE}
							style={{marginLeft:'5%'}}
							iconStyle={{alignContent:'center'}}
							onPress={() => {
										this.props.toggleLikeProposal(
											{ ...this.props, proposalId: this.props.displayProposal._id, liked: !this.props.displayProposal.liked });
									}} />
						<Icon name="delete" size={30} borderRadius={30}
							color={'red'} backgroundColor={WHITE}
							iconStyle={{alignContent:'center'}} 
							style={{marginLeft:'5%'}}
							onPress={this.props.showModal} />

						<AntDesign name="shrink" size={30} borderRadius={30}
							color={LOGO_DARK_BLUE} backgroundColor={WHITE}
							style={{marginLeft:'5%'}}
							iconStyle={{alignContent:'center'}} 
							onPress={() => this.props.setViewMode(CALENDAR_MODE)} />
					</View>
				</View>
				{this.props.showNextSteps ? null : 
				<View>
				<View style={styles.hrLight} />
	    		<View style={styles.chipsLayout}>
			    	<Icon.Button name={"barcode"} size={30} borderRadius={30}
			    		color={this.props.showOverview ? WHITE : LOGO_DARK_BLUE } backgroundColor={this.props.showOverview ? LOGO_DARK_BLUE : WHITE }
			    		iconStyle={{margin:5,alignContent:'center'}} 
				    	onPress={this.props.switchToProposalOverview } />

			    	<Icon.Button name={"account-tie"} size={30} borderRadius={30}
			    		color={this.props.showBrokerInfo ? WHITE : LOGO_DARK_BLUE } backgroundColor={this.props.showBrokerInfo ? LOGO_DARK_BLUE : WHITE }
			    		iconStyle={{margin:5,alignContent:'center'}} 
				    	onPress={this.props.switchToBrokerOverview } />

			    	<Icon.Button name={"folder-upload"} size={30} borderRadius={30}
			    		color={this.props.showDocumentsUpload ? WHITE : LOGO_DARK_BLUE} backgroundColor={this.props.showDocumentsUpload ? LOGO_DARK_BLUE : WHITE}
			    		iconStyle={{margin:5,alignContent:'center'}} 
				    	onPress={
							() => {
								trackPromise(this.props.fetchStoredDocuments(this.props.setProposalDocuments))
								this.props.toggleDocumentsUpload()
							}} />

			    	<Icon.Button name={"message"} size={30} borderRadius={30}
			    		color={this.props.showBrokerMessages ? WHITE : LOGO_DARK_BLUE} backgroundColor={this.props.showBrokerMessages ? LOGO_DARK_BLUE : WHITE}
			    		iconStyle={{margin:5,alignContent:'center'}} 
						disabled={this.props.showNextSteps}
				    	onPress={this.props.toggleBrokerMessages} />

				</View>
				</View>
				
				}
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
  const { proposalId, isDeleteConfirmed, showDeleteWarning, deleteBrokerProposal, showNextSteps, showBrokerMessages, 
	showDocumentsUpload, showOverview, showBrokerInfo } = proposalReducer;
  const { qParams, proposalsInView, displayProposal, updated, fetchProposals, getQParams, fetchProposal } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, 
    qParams, proposalsInView, displayProposal, updated, fetchProposals, fetchProposal, 
	proposalId, isDeleteConfirmed, showDeleteWarning, deleteBrokerProposal, getQParams, showNextSteps, showBrokerMessages, 
	showDocumentsUpload, showOverview, showBrokerInfo, switchToBrokerOverview, switchToProposalOverview };
};

export default connect(mapStateToProps, { loadProposals, handleFetchError, refreshProposal, closeReview, 
	toggleLikeProposal, toggleNextSteps, toggleBrokerMessages, toggleDocumentsUpload, showModal, hideModal, 
	fetchStoredDocuments, setProposalDocuments, setViewMode, switchToBrokerOverview, switchToProposalOverview })(ProposalHeader);