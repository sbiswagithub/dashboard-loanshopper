import React, { Component } from "react";
import { Keyboard,TouchableWithoutFeedback, Text, TextInput, View, ScrollView, SafeAreaView, Alert, Image, Linking } from 'react-native';
import { Switch, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { trackPromise  } from 'react-promise-tracker';

import getStyleSheet from '../styles/styles';  
import { EMAIL_DEFAULT, MOBILE_DEFAULT } from '../constants/disclosure';
import { USER_REGISTRATION_MASTHEAD, EDIT_BANNER, SAVE_BANNER, ERROR_DIALOG_PUBLIC_MSG_1, ERROR_DIALOG_TITLE_1 } from '../constants/banners';
import { API_BORROWER_URI, } from '../constants/apiUrls';
import { emailUpdated, mobileUpdated, toggleRegistrationSave, checkAccountExists, emailCheckResult, mobileCheckResult ,handleFetchError, } from '../actions';
import * as RootNavigation from '../actions/RootNavigation.js';

import Name from './disclosure/Name';
import ErrorDialog from './ErrorDialog';
import SpinnerHolder from './common/SpinnerHolder';
import PreRegistrationDeclaration from './PreRegistrationDeclaration'
import { TRANSPARENT, LOGO_DARK_BLUE, LOGO_BRIGHT_BLUE } from "../constants/colors";
import { privacy_policy_url, t_and_c_url } from "../constants/home";

function SaveSwitch(props) {
	const styles = getStyleSheet();
    const disable = !props.hasEmail ||!props.hasValidEmail || props.hasDuplicateEmail
							|| !props.hasMobile || !props.hasValidMobile || props.hasDuplicateMobile
							|| !props.hasTitle || !props.hasFirstName || !props.hasLastName 
	  return (
    	<View style={styles.chipsLayout}>
	      <Text style={props.toggleSaveMode ? 
				[styles.textSmallBoldGray, styles.padRight] : 
					[styles.textSmallGray, styles.padRight]}>{SAVE_BANNER}</Text>
			<Switch style={styles.padRight} value={!props.toggleSaveMode} disabled={disable}
				onValueChange={() => { 
					if (!props.toggleSaveMode) {
						const body = JSON.stringify({
							        title: props.title,
							        firstName: props.firstName,
							        lastName: props.lastName,
							        email: props.email,
							        mobile: props.mobile,
							      });
						trackPromise(
							fetch(`${API_BORROWER_URI}`, {
							    method: "POST",
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
					                    logMessage: 'Failed to connect to {API_BORROWER_URI}'
					                });
					                return Promise.reject(error);
								} else
						    		return response.json();
						    })
						    .then((json) => {
								props.onSave({saveMode: props.toggleSaveMode, borrower: json});
								RootNavigation.navigate('VerifyOtp');
						    })
						    .catch((error) => {
							    ////console.log('Boo in POST /borrowers');
							    ////console.log(error);
								props.onSave({saveMode: !props.toggleSaveMode});
	  						  	props.handleFetchError(error);	  						  	
						    }));
			    	}
				}} />
			<Text 
				style={props.toggleSaveMode ? 
					[styles.textSmallGray, styles.padRight] : 
						[styles.textSmallBoldGray, styles.padRight]}>{EDIT_BANNER}</Text>
	      	<SpinnerHolder />
		</View>
	  );
	}



class UserRegistration extends Component {

	constructor(props) {
		super(props);
		this.state ={
			showPrivacyTAndCLinks : true
		}
    }
  
    render () {
    	const styles = getStyleSheet();
    	return (
        <SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
	        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
		    	<View style={styles.stackedLayout}>
		    		<View style={styles.space}/>
					<Image source={require('../assets/LoanShopper_LR.png')}  style={styles.logoMastheadWide} />
		    		<View style={styles.space}/>
		    		<View style={styles.space}/>
					<Text style={[styles.textMediumBoldPurple, styles.centreAligned]}>{USER_REGISTRATION_MASTHEAD}</Text>
		    		<View style={styles.space}/>
		    		<View style={styles.space}/>
		    		<Name/>
				    <TextInput 
				    	style={this.props.hasValidEmail ? 
				    			[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned] : 
				    				[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color:'red'}]} 
			    		clearTextOnFocus={true} placeholder={EMAIL_DEFAULT}
			    		onChangeText={text => this.props.emailUpdated(text)} onFocus={() => {this.props.emailUpdated('')}}  
						autoCompleteType="email" textContentType="emailAddress" autoCapitalize="none"
						onBlur={() => {
							trackPromise(
								this.props.checkAccountExists(
									{email: this.props.email},
									this.props.emailCheckResult
								)
							)
						}}
  		      			value={this.props.email}  />
					{this.props.hasDuplicateEmail ? <Text style={{color:'red'}}>Account already exists</Text> : null}		
		    		<View style={styles.space}/>
				    <TextInput 
			    	style={this.props.hasValidMobile ? 
			    			[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned] : 
			    				[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color:'red'}]} 
						clearTextOnFocus={true} onFocus={() => {this.props.mobileUpdated('')}}  onChangeText={text => this.props.mobileUpdated(text)}
						onBlur={() => {
							trackPromise(
								this.props.checkAccountExists(
									{mobile: this.props.mobile},
									this.props.mobileCheckResult
								)
							)
						}}
		      			value={this.props.mobile} placeholder={MOBILE_DEFAULT} />
					{this.props.hasDuplicateMobile ? <Text style={{color:'red'}}>Account already exists</Text> : null}

			    		<View style={styles.space}/>
			    		<View style={styles.space}/>
				    	<SaveSwitch 
				    		{...this.props} 
			    			onSave={this.props.toggleRegistrationSave}
			    		/>
					
	   		    </View>
				
				<PreRegistrationDeclaration />
				<ErrorDialog />
   		    </ScrollView>
			</TouchableWithoutFeedback>
	    </SafeAreaView>
        )
    }
}


const mapStateToProps = ({ disclosureReducer, registrationReducer, authReducer }) => {
  const { title, firstName, lastName, email, mobile, hasTitle, hasFirstName, hasLastName, hasEmail, hasValidEmail,  hasDuplicateEmail, 
	hasMobile, hasValidMobile, hasDuplicateMobile  } = disclosureReducer;
  const { toggleSaveMode } = registrationReducer;
  const { accessCode, appEntryMode, error } = authReducer;
  return { title, firstName, lastName, email, mobile, hasTitle, hasFirstName, hasLastName, hasEmail, hasValidEmail, hasMobile, hasValidMobile, 
	 hasDuplicateEmail, hasDuplicateMobile,  toggleSaveMode, accessCode, appEntryMode, error };
};

export default connect(mapStateToProps, { emailUpdated, mobileUpdated, toggleRegistrationSave, checkAccountExists, 
	emailCheckResult, mobileCheckResult, handleFetchError, })(UserRegistration);