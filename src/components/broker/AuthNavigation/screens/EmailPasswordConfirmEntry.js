import React, { Component, useRef  } from "react";
import { Text, TextInput, View, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { useNavigation } from '@react-navigation/native';
import { connect } from "react-redux";
import { trackPromise, } from 'react-promise-tracker';
import { Auth } from 'aws-amplify';

import getStyleSheet from '../../../../styles/styles';  
import { EMAIL_DEFAULT, GENDER_F, GENDER_M, TITLE_MR, TITLE_MS, TITLE_MRS } from '../../../../constants/disclosure';
import { CHOOSE_PASSWORD_BANNER, CONFIRM_PASSWORD_BANNER, ERROR_DIALOG_TITLE_1, ERROR_DIALOG_PUBLIC_MSG_2, ERROR_DIALOG_PUBLIC_MSG_3, ERROR_DIALOG_USERNAME_EXISTS_MSG } from '../../../../constants/banners';
import { userExists, brokerConfirmationPending, emailUpdated, setPassword, setRepeatPassword, handleFetchError } from '../../../../actions';
import * as colors from "../../../../constants/colors";
import ErrorDialog from '../../../ErrorDialog';
import SpinnerHolder from '../../../common/SpinnerHolder';
import { COUNTRY_CODE } from "../../../../constants/common";

async function signUpAsync(username, email, password, phone_number, given_name, family_name, gender, title ) {
	const { user } = await Auth.signUp({
		username,
		password,
		attributes: {
			email,          
			phone_number,   
			given_name, 
			family_name, 
			gender ,
			"custom:title" : title
		}
        });
	return user;
/*
CognitoUser {
  "Session": null,
  "authenticationFlowType": "USER_SRP_AUTH",
  "client": Client {
    "endpoint": "https://cognito-idp.ap-southeast-2.amazonaws.com/",
    "fetchOptions": Object {},
  },
  "keyPrefix": "CognitoIdentityServiceProvider.....",
  "pool": CognitoUserPool {
    "advancedSecurityDataCollectionFlag": true,
    "client": Client {
      "endpoint": "https://cognito-idp.ap-southeast-2.amazonaws.com/",
      "fetchOptions": Object {},
    },
    "clientId": ".....",
    "storage": [Function MemoryStorage],
    "userPoolId": "...",
    "wrapRefreshSessionCallback": [Function anonymous],
  },
  "signInUserSession": null,
  "storage": [Function MemoryStorage],
  "userDataKey": "...",
  "username": "...",
}
	*/
}

function signUp (props, onSuccess, onError)  {
	const phoneUtil = PhoneNumberUtil.getInstance();
	const number = phoneUtil.parseAndKeepRawInput(props.mobile, COUNTRY_CODE);
	const formattedNumber = phoneUtil.format(number, PhoneNumberFormat.E164);
	const title  = props.titleMr ? TITLE_MR : props.titleMs ? TITLE_MS : TITLE_MRS;
	trackPromise(
		signUpAsync( props.email, props.email, props.password, formattedNumber, 
			props.firstName, props.lastName, props.titleMr ? GENDER_M : GENDER_F, title )
	    .then(user => {
			onSuccess(user);
	    })
	    .catch((error) => {
		    ////console.log('Boo in sign up');
		    ////console.log(error);
		    onError(error);
	    }));
}
function Buttons({props}) {
    const styles = getStyleSheet();
	const disabledSubmit = !props.hasValidPassword || !props.passwordConfirmed;
	const navigation = useNavigation();
	return (
			<View style={[styles.chipsLayout, {width:"90%", paddingTop:'5%'}, styles.centreAligned]} >
				<View style={styles.space}/>
				<View style={styles.space}/>
				<TouchableOpacity  onPress={() => { navigation.goBack(); }} >
					<Ionicons name="ios-chevron-back-circle-sharp"
					color={colors.LOGO_BRIGHT_BLUE}
					size='60' />
				</TouchableOpacity>
				<View style={styles.space}/>
				<View style={styles.space}/>
				<TouchableOpacity 
					disabled={disabledSubmit}
					onPress={() => {	
						signUp(props, 
							(cognitoUser) => { navigation.navigate("VerifyBrokerCode") ; },
							(error) => {
								if(new RegExp("UsernameExistsException","g","i").test(error)) {
									props.userExists();
									props.handleFetchError(Object.assign({}, {
															showDialog: true, 
															dialogTitle: ERROR_DIALOG_TITLE_1, 
															publicMessage: ERROR_DIALOG_USERNAME_EXISTS_MSG, 
														}));
								} else {
									props.handleFetchError(Object.assign({}, {
															showDialog: true, 
															dialogTitle: ERROR_DIALOG_TITLE_1, 
															publicMessage: ERROR_DIALOG_PUBLIC_MSG_3 , 
														}));
								}
							}
							)}} >
					<Ionicons name="enter"
					color={disabledSubmit ? colors.BACKGROUND_LIGHT_GRAY : colors.LOGO_BRIGHT_BLUE}
					size='60' />
				</TouchableOpacity>
				<View style={styles.space}/>
				<View style={styles.space}/>
			</View>
	);
}

class EmailPasswordConfirmEntry extends Component {

	constructor(props) {
        super(props);
    }
  
	render() {
		const styles = getStyleSheet();
		return (
        <SafeAreaView style={styles.container}  >
	        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
		    		<View style={styles.space}/>
					<Image source={require('../../../../assets/LoanShopper_LR.png')} style={styles.logoMastheadWide} />
					<View style={styles.space}/>
					<View style={styles.space}/>
					<TextInput 
						style={this.props.hasValidEmail ? 
								[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned] : 
									[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color:'red'}]} 
						clearTextOnFocus={true} onFocus={() => {this.props.emailUpdated('')}}
						onChangeText={text => this.props.emailUpdated(text)}
						autoCompleteType="email" textContentType="emailAddress" autoCapitalize="none"
						value={this.props.email} placeholder={EMAIL_DEFAULT} />

					<View style={styles.space}/>
					<TextInput
						style={
							this.props.hasValidPassword ?
							[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color: 'green'}] :
							[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color: 'red'} ]
						}
						onFocus={() => {this.props.setPassword('')}}
						value={this.props.password}
			    		onChangeText={text => this.props.setPassword(text)}
						placeholder={CHOOSE_PASSWORD_BANNER}
						secureTextEntry={true} clearTextOnFocus={true}
						/>
		    		<View style={styles.space}/>
					<TextInput
						style={
							this.props.passwordConfirmed ?
							[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color: 'green'}] :
							[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color: 'red'} ]
						}
						onFocus={() => {this.props.setRepeatPassword('')}}
						value={this.props.repeatPassword}
			    		onChangeText={text => this.props.setRepeatPassword(text)}
						placeholder={CONFIRM_PASSWORD_BANNER}
						secureTextEntry={true} clearTextOnFocus={true}
						/>
   		    </ScrollView>

			<Buttons props={this.props} />
			<SpinnerHolder />
	    </SafeAreaView>

			);
	}
}

const mapStateToProps = ({ disclosureReducer, registrationReducer, authReducer }) => {
  const { hasEmail, hasValidEmail, email, mobile, firstName, lastName, titleMr, titleMs } = disclosureReducer;
  const { userExistsError, password, repeatPassword, hasValidPassword, passwordConfirmed } = registrationReducer;
  const { accessCode, appEntryMode, error } = authReducer;
  return { userExistsError, password, repeatPassword, hasEmail, hasValidEmail, email, mobile, firstName, lastName, titleMr, titleMs, 
	hasValidPassword, passwordConfirmed, accessCode, appEntryMode, error };
};

export default connect(mapStateToProps, { userExists, brokerConfirmationPending, emailUpdated, handleFetchError, setPassword, setRepeatPassword })(EmailPasswordConfirmEntry);