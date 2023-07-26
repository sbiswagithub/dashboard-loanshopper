import React, { Component, useState } from "react";
import { Keyboard,TouchableWithoutFeedback,Text, TextInput, View, SafeAreaView, Image } from 'react-native';
import { connect } from 'react-redux';
import { trackPromise  } from 'react-promise-tracker';

import getStyleSheet from '../styles/styles';  
import { EMAIL_DEFAULT, MOBILE_DEFAULT } from '../constants/disclosure';
import {  } from '../constants/banners';
import {  } from '../constants/alerts';
import { emailRegistrationStart, emailUpdated, mobileUpdated,  handleFetchError,
	emailCheckResult, mobileCheckResult, checkAccountExists } from '../actions';
import * as RootNavigation from '../actions/RootNavigation.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Name from './disclosure/Name';
import ErrorDialog from './ErrorDialog';
import SpinnerHolder from './common/SpinnerHolder';
import PreRegistrationDeclaration from './PreRegistrationDeclaration';
import {  LOGO_BRIGHT_BLUE, TRANSPARENT, LOGO_DARK_BLUE, } from "../constants/colors";

class EmailRegistration extends Component {

	constructor(props) {
		super(props);
		this.props.emailRegistrationStart();
    }
  
    render () {
		const styles = getStyleSheet();
		const ready = this.props.hasTitle && this.props.hasFirstName && this.props.hasLastName 
			&& this.props.hasMobile && this.props.hasEmail 
			&& this.props.hasValidEmail && this.props.hasValidMobile
			&& !this.props.hasDuplicateEmail && !this.props.hasDuplicateMobile
    	return (
        <SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.stackedLayout}>
				<View style={styles.space}/>
				<Image source={require('../assets/LoanShopper_LR.png')}  style={styles.logoMastheadWide} />
				<View style={styles.space}/>
				<View style={styles.stackedLayout}>
					<View style={styles.space}/>
					<Name/>

					<TextInput 
						style={this.props.hasValidMobile ? 
							[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned] : 
								[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color:'red'}]} 
						clearTextOnFocus={true} 
						onFocus={() => {this.props.mobileUpdated('')}} 
						onChangeText={text => this.props.mobileUpdated(text)}
						onBlur={() => {
							trackPromise(
								this.props.checkAccountExists(
									{mobile: this.props.mobile},
									this.props.mobileCheckResult
								)
							)
						}}
						value={this.props.mobile} 
						placeholder={MOBILE_DEFAULT} />

					{this.props.hasDuplicateMobile ? <Text style={{color:'red'}}>Account already exists</Text> : null}
					<View style={styles.space}/>
		    		
				    <TextInput 
				    	style={this.props.hasValidEmail ? 
				    			[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned] : 
				    				[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color:'red'}]} 
			    		clearTextOnFocus={true} placeholder={EMAIL_DEFAULT}
			    		onChangeText={text => this.props.emailUpdated(text)} onFocus={() => {this.props.emailUpdated('')}}  
						onBlur={() => {
							trackPromise(
								this.props.checkAccountExists(
									{email: this.props.email},
									this.props.emailCheckResult
								)
							)
						}}
		    			autoCompleteType="email" textContentType="emailAddress" autoCapitalize="none"
  		      			value={this.props.email}  />

					{this.props.hasDuplicateEmail ? <Text style={{color:'red'}}>Account already exists</Text> : null}
		    		<View style={styles.space}/>					

					<View style={styles.chipsLayout}>
						<Icon.Button name={'arrow-left-bold-circle-outline'} size={30} borderRadius={10} 
							backgroundColor={TRANSPARENT}  color={LOGO_BRIGHT_BLUE} 
							iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
							onPress={() => {RootNavigation.navigate('SignIn')}} >Back</Icon.Button>	
						<Icon.Button name={'arrow-right-bold-circle-outline'} size={30} borderRadius={10} 
							backgroundColor={TRANSPARENT}  color={ready ? LOGO_DARK_BLUE : 'grey'} 
							iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
							disabled={!ready}
							onPress={() => {RootNavigation.navigate('EmailRegistration2');}} >Next</Icon.Button>	
					</View>
				</View>
				<PreRegistrationDeclaration />
				<SpinnerHolder />
				<ErrorDialog />
			</View>
			</TouchableWithoutFeedback>
	    </SafeAreaView>
        )
    }
}


const mapStateToProps = ({ disclosureReducer, registrationReducer, authReducer }) => {
  const { title, firstName, lastName, email, mobile, hasTitle, hasFirstName, hasLastName, hasEmail, 
	hasValidEmail, hasDuplicateEmail, hasMobile, hasValidMobile, hasDuplicateMobile } = disclosureReducer;
  const {  } = registrationReducer;
  const { accessCode, appEntryMode, error,  } = authReducer;
  return { title, firstName, lastName, email, mobile, hasTitle, hasFirstName, hasLastName, hasEmail, 
	hasValidEmail, hasDuplicateEmail, hasMobile, hasValidMobile, hasDuplicateMobile,
	accessCode, appEntryMode, error, };
};

export default connect(mapStateToProps, { emailRegistrationStart, emailUpdated, mobileUpdated, handleFetchError,  
	checkAccountExists, emailCheckResult, mobileCheckResult })(EmailRegistration);