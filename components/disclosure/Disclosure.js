import React, { Component } from "react";
import Constants from 'expo-constants';
import { Keyboard, View, Text, Alert,   } from 'react-native';
import { Switch, Button, Paragraph, Dialog, Portal, } from 'react-native-paper';
import { connect } from 'react-redux';
import Moment from 'moment';
import { trackPromise,  } from 'react-promise-tracker';
import Icon from 'react-native-vector-icons/AntDesign';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { onClickDealsButton, toApplication, showApplication, addressOnBlur, clearCoBorr, handleFetchError, 
	closeDisclosure, toggleEditMode, toggleModal, toggleAlert, toggleAcceptFlag, messageNext, editMore, editLess } from '../../actions';
import { SHOW_MODAL, HIDE_MODAL, } from '../../actions/types';
import { DISCLOSURE_BANNER, DISCLOSURE_POPUP_TITLE_2_BANNER, ACCEPTANCE_BANNER, 
	ERROR_DIALOG_PUBLIC_MSG_1, ERROR_DIALOG_TITLE_1, NEXT, PREV, CLOSE_BUTTON_BANNER, NEXT_TITLE, NEXT_MESSAGE, MORE } from '../../constants/banners';
import { API_LOAN_REQUESTS_URI } from '../../constants/apiUrls';
import { ALERT_CLOSE_BUTTON_LABEL, ALERT_YES_BUTTON_LABEL, ALERT_NO_BUTTON_LABEL, 
	HOME_ALERT_1_TITLE, DISC_SAVE_ALERT_2_TITLE, DISC_SAVE_ALERT_2_MSG, DISC_SAVE_ALERT_3_MSG, DISC_SAVE_ALERT_4_MSG } from '../../constants/alerts';
import getStyleSheet from '../../styles/styles';  
import DisclosureSubmission from './DisclosureSubmission';
import ErrorDialog from '../ErrorDialog';
import SpinnerHolder from '../common/SpinnerHolder';
import { LOGO_DARK_BLUE, LOGO_BRIGHT_BLUE, BACKGROUND_LIGHT_GRAY, HIGHLIGHTED_YELLOW } from "../../constants/colors";

const MoveButtons = (props) => {
	return (
		<>
			<View style={{flexDirection:"row"}}>
			<Icon.Button name="banckward" size={20} borderRadius={25} disabled={props.edit === 1 }
				backgroundColor={props.edit > 1 ? LOGO_BRIGHT_BLUE : BACKGROUND_LIGHT_GRAY} iconStyle={{margin:1}} onPress={()=>{props.editLess();}}>{"Less"}</Icon.Button>		
			<Icon.Button name="forward" size={20} borderRadius={25} disabled={props.edit === 19 }
				backgroundColor={props.edit < 19 ? LOGO_BRIGHT_BLUE : BACKGROUND_LIGHT_GRAY} iconStyle={{margin:1}} onPress={()=>{props.editMore();}}>{MORE}</Icon.Button>		
			</View>
		</>
	)
}

class Disclosure extends Component {

	constructor(props) {
        super(props);
    }
    
    // Save switch 
	_onToggleSwitch () {
		// Hide keyboard if visible
		if (!Constants.platform.web) Keyboard.dismiss();
		console.log(this.props);
		// Remove co borrower if full name is not set
    	if (this.props.editMode && 
    		!this.props.checkFullName(this.props.titleCoBorr, this.props.firstNameCoBorr, this.props.lastNameCoBorr)){
			this.props.clearCoBorr();
		}

		if (!this.props.editMode) {
			// Open for editing
 			this.props.toggleEditMode(this.props.editMode);
		} else if (!this.props.addressSet || this.props.dob == null || 
					this.props.employmentType === null || this.props.immigrationStatus === null  || 
					!this.props.professionSet || !this.props.hasGrossIncAnn ) {
			// Missing mandatory details, unable to proceed
			//console.log('Address ' + this.props.addressSet);
			//console.log('DOB ' + this.props.dob);
			//console.log('Employment Type ' + this.props.employmentType);
			//console.log('Immigration status ' + this.props.immigrationStatus);
			//console.log('Profession ' + this.props.professionIdx);
			//console.log('Gross Inc ' + this.props.hasGrossIncAnn);
			this.alertMinimumDetails();
		} else if (this.props.borrower.email == this.props.coBorrowerEmail) {
			this.alertCoBorrowerError();
		} else if (!this.props.isAccepted) {
			// Acknowledge before save
 			this.props.toggleModal(SHOW_MODAL);
		} else
			// User has already accepted, proceed to update
	    	this.createOrUpdateLoanRequest(this.props, this.onSaveLoanRequest, this.props.handleFetchError);
	}

	createOrUpdateLoanRequest(props, onSuccess, onError){
		// Load loan request details on load
		const loanRequest = props.propsToLoanRequest(props);
		//console.log(loanRequest)
		const body = JSON.stringify(loanRequest);
    	const uri = props.updateMode ? `${API_LOAN_REQUESTS_URI}/`+ props.loanRequest._id : `${API_LOAN_REQUESTS_URI}`;
		trackPromise(
				fetch(uri, {
			    method: props.updateMode ? "PATCH" : "POST",
			    headers: { 'Content-Type': 'application/json', 'Authorization': props.accessCode },
			    body: body,
			})
		    .then(response => {
				if (response.status >= 400 && response.status < 600) {
	                const error = Object.assign({}, {
	                    status: response.status,
	                    statusText: response.statusText,
	                    showDialog: true, 
	                    dialogTitle: ERROR_DIALOG_TITLE_1, 
	                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
                    	logMessage: 'Failed to connect to ' + uri
	                });
	                return Promise.reject(error);
				} else
		    		return response.json();
		    })
		    .then((json) => {
				onSuccess(props);
		    })
		    .catch((error) => {
			    //console.log('Boo in POST loanrequests');
			    //console.log(error);
				props.toggleModal(HIDE_MODAL);
			  	onError(error);	  						  	
		    }));
	}
	alertMinimumDetails () {
		if (Constants.platform.web)
			this.props.toggleAlert()
		else
			Alert.alert(
			DISC_SAVE_ALERT_2_TITLE,
			DISC_SAVE_ALERT_2_MSG,
			[
				{
				text: ALERT_CLOSE_BUTTON_LABEL,
				style: "close"
				}			      ],
			{ cancelable: false } 
			);
	}
	alertDOBError () {
	    Alert.alert(
	      HOME_ALERT_1_TITLE,
	      DISC_SAVE_ALERT_3_MSG,
	      [
	        {
	          text: ALERT_CLOSE_BUTTON_LABEL,
	          style: "close"
	        }			      ],
	      { cancelable: false } 
	    );
	}
	alertCoBorrowerError () {
		if (Constants.platform.web)
			this.props.toggleAlert()	
		else
			Alert.alert(
			HOME_ALERT_1_TITLE,
			DISC_SAVE_ALERT_4_MSG,
			[
				{
				text: ALERT_CLOSE_BUTTON_LABEL,
				style: "close"
				}			      ],
			{ cancelable: false } 
			);
	}	
	onSaveLoanRequest (props) {
		props.toggleEditMode(props.editMode);
		props.toggleAcceptFlag(!props.isAccepted);
		props.toggleModal(HIDE_MODAL);
	}

	componentDidMount() {

	}

    render () {
		const styles = getStyleSheet();
    	return (
    		<View style={{flexDirection:'column', justifyContent:'space-between'}}>    		
				<View style={[styles.disclosureContainer, {flexDirection:'column', margin:'2%'}]}>
					<View style={[styles.stackedSimpleLayout]}>
						<View style={{justifyContent:"space-between"}}>
							<Text style={[styles.textLargeLogoDarkBlue, {alignSelf:"center"}]} >{DISCLOSURE_BANNER}</Text>
							<View style={{flexDirection:'row', alignSelf:"flex-end", alignItems:"flex-end", justifyContent:"flex-end", width:"55%" }}>
								<View style={{flexDirection:'row',justifyContent:'space-between', marginRight:'2%'}}>
									<View style={{flexDirection:'row',alignItems:"flex-start", justifyContent:"flex-start", width:"45%" }}>
										<View style={{flexDirection:'row',justifyContent:'space-between'}}>
											<FAIcon name="lock" size={this.props.editMode ? 20 : 40} color={this.props.editMode ? BACKGROUND_LIGHT_GRAY : LOGO_DARK_BLUE } />
											<Switch color={LOGO_BRIGHT_BLUE} style={styles.padRight} value={this.props.editMode} color={HIGHLIGHTED_YELLOW}
												onValueChange={() => {this._onToggleSwitch()}} />
											<FAIcon name="unlock" size={this.props.editMode ? 40 : 20} color={this.props.editMode ? LOGO_BRIGHT_BLUE : BACKGROUND_LIGHT_GRAY } />
										</View>
									</View>
								</View>
							{this.props.applicationMode ? 
								<Icon.Button name="cloudupload" size={20} borderRadius={25}
									backgroundColor={LOGO_BRIGHT_BLUE} iconStyle={{margin:1}}
								onPress={() => {
									this.props.onClickDealsButton();
									this.props.toApplication();
									}} 
									>{PREV}</Icon.Button>
							: this.props.editMode  ? 
								<MoveButtons {...this.props} /> 
							: !this.props.editMode  ? 
								<Icon.Button name="cloudupload" size={20} borderRadius={25}
									backgroundColor={LOGO_DARK_BLUE } iconStyle={{margin:1}}
									onPress={()=>{this.props.messageNext(true);}}
									>{CLOSE_BUTTON_BANNER}</Icon.Button> : null
							}
							</View>

						</View>
						<View style={styles.space}/>
						<DisclosureSubmission />
					</View>
				</View>
				<Portal>
					<Dialog visible={this.props.modalVisible} style={{maxWidth:'50%', alignSelf:"center"}} >
					<Dialog.Title>{DISCLOSURE_POPUP_TITLE_2_BANNER }</Dialog.Title>
					<Dialog.Content><Paragraph>{ACCEPTANCE_BANNER}</Paragraph></Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => {
							this.createOrUpdateLoanRequest(this.props, this.onSaveLoanRequest, this.props.handleFetchError);
							}}>{ALERT_YES_BUTTON_LABEL}</Button>
						<Button onPress={() => {this.props.toggleModal(HIDE_MODAL);}}>{ALERT_NO_BUTTON_LABEL}</Button>
					</Dialog.Actions>
					</Dialog>
				</Portal>
				<Portal>
					<Dialog visible={this.props.showAlert} style={{maxWidth:'50%', alignSelf:"center"}} >
					<Dialog.Title>{"Oops, did you forget something"}</Dialog.Title>
					<Dialog.Content><Paragraph>{"Required minimum details"}</Paragraph></Dialog.Content>
					<Dialog.Actions>
						<Button onPress={this.props.toggleAlert}>{ALERT_NO_BUTTON_LABEL}</Button>
					</Dialog.Actions>
					</Dialog>
				</Portal>				
				<Portal>
					<Dialog visible={this.props.showNext} style={{maxWidth:'50%', alignSelf:"center"}} >
					<Dialog.Title>{NEXT_TITLE}</Dialog.Title>
					<Dialog.Content><Paragraph>{NEXT_MESSAGE}</Paragraph></Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => {
							this.props.messageNext(false);
							this.props.closeDisclosure();}}>{CLOSE_BUTTON_BANNER}</Button>
					</Dialog.Actions>
					</Dialog>
				</Portal>
				<SpinnerHolder />
				<ErrorDialog />				
			</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer, authReducer, entryReducer, proposalCalendarReducer }) => {
  const { accessCode, borrower } = authReducer;
  const { applicationMode } = entryReducer;
  const { displayApplication } = proposalCalendarReducer;
  return { displayApplication, applicationMode,  accessCode , borrower, ...disclosureReducer  };
};

export default connect(mapStateToProps, { onClickDealsButton, toApplication, showApplication, addressOnBlur, clearCoBorr, handleFetchError, closeDisclosure, 
	toggleEditMode, toggleModal, toggleAlert, toggleAcceptFlag, messageNext, editMore, editLess })(Disclosure);