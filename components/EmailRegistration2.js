import React, { Component, useState } from "react";
import { Keyboard,TouchableWithoutFeedback,Text, TextInput, View, ScrollView, SafeAreaView, Image } from 'react-native';
import { Dialog, Portal, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import { trackPromise  } from 'react-promise-tracker';

import getStyleSheet from '../styles/styles';  
import {  } from '../constants/disclosure';
import {  } from '../constants/banners';
import {  } from '../constants/alerts';
import { handleFetchError, setAuthPassword, setAuthRepeatPassword, borrowerSignUp, onSignupSuccess } from '../actions';
import * as RootNavigation from '../actions/RootNavigation.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import EnterPassword from './EnterPassword'
import ErrorDialog from './ErrorDialog';
import SpinnerHolder from './common/SpinnerHolder';

import { LOGO_DARK_BLUE, WHITE, LOGO_BRIGHT_BLUE, TRANSPARENT } from "../constants/colors";


function PasswordRules  (props)  {
	const styles = getStyleSheet();
	const conditionMet = new RegExp(props.pattern, 'g').test(props.value)
	return (
		<View style={[styles.chipsLayout, {maxWidth:'80%'}]}>
			<FAIcon 
				name={conditionMet ? 'check-circle-o' : 'times-circle-o' } size={20} 
				color={conditionMet ? LOGO_DARK_BLUE : 'grey'} backgroundColor={TRANSPARENT} iconStyle={{alignContent:'center' }} ></FAIcon>
			<Text style={{color: conditionMet ? LOGO_DARK_BLUE : 'grey', marginLeft:'5%' }}>{props.rule}</Text>
		</View>
	);
}

class EmailRegistration2 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showPortal : false
		}
    }
  
    render () {
		const styles = getStyleSheet();
		const hidePasswordRules = this.props.password == undefined || 
			( new RegExp('^.{8,}$','g').test(this.props.password) &&
				new RegExp('(?=.*[A-Z])','g').test(this.props.password) &&
				new RegExp('(?=.*[a-z])','g').test(this.props.password) &&
				new RegExp('(?=.*\\d)','g').test(this.props.password) &&
				new RegExp('(?=.*\\W)','g').test(this.props.password) )

		const ready = hidePasswordRules && this.props.passwordRepeat === this.props.password 
    	return (
        <SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.stackedLayout}>
				<View style={styles.space}/>
				<Image source={require('../assets/LoanShopper_LR.png')}  style={styles.logoMastheadWide} />
				<View style={styles.space}/>
				<ScrollView showsVerticalScrollIndicator={false} >
					<View style={styles.stackedLayout}>

						<View style={styles.space}/>
						<Text style={styles.textMediumBoldGray}>LoanShopper username</Text>
						<View style={styles.space}/>
						<Text style={styles.textMediumBoldLogoDarkBlue}>{this.props.email}</Text>

						<Text style={styles.textMediumBoldGray}>LoanShopper password</Text>
						<View style={styles.space}/>
						<EnterPassword />
						<View style={styles.userRegistrationBottom}>
							<View style={styles.hr}/>
							<View style={styles.space}/>
							<Icon.Button name={'email-plus'} size={40} borderRadius={10} 
								backgroundColor={ready  ? LOGO_DARK_BLUE : 'grey'}  color={WHITE} 
								iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
								onPress={() => {
									trackPromise(this.props.borrowerSignUp(
										this.props,
										(response) => {
											this.props.onSignupSuccess(response)
											this.setState({showPortal : true})
										}, 
										this.props.handleFetchError))
								}} disabled={!ready} >Register</Icon.Button>	
						</View>

						<View style={styles.space}/>
						<View style={styles.chipsLayout}>
							<Icon.Button name={'close-circle-outline'} size={30} borderRadius={10} 
								backgroundColor={TRANSPARENT}  color={'black'} 
								iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
								onPress={() => {RootNavigation.navigate('SignIn')}} >Exit</Icon.Button>	
						</View>
					</View>
				<ErrorDialog />

				<Portal>
					<Dialog visible={this.state.showPortal} >
					<Dialog.Title style={styles.textMediumBoldLogoBrightBlue} >Welcome to Loanshopper!</Dialog.Title>
					<Dialog.Content><Paragraph style={[styles.textMedium, {color:LOGO_DARK_BLUE}]}>Hi {this.props.firstName}, great to have you on board. You will soon recieve a one time passcode on your mobile, click ok to enter your OTP.</Paragraph></Dialog.Content>
					<Dialog.Actions>
						<Icon.Button name={'login'} size={30} borderRadius={10} 
								backgroundColor={TRANSPARENT}  color={LOGO_DARK_BLUE} 
								iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
								onPress={() => {
									this.setState({showPortal : false})
									RootNavigation.navigate('VerifyOtp')}}  >Ok</Icon.Button>	
					</Dialog.Actions>
					</Dialog>
				</Portal>      

				</ScrollView>
			</View>
			</TouchableWithoutFeedback>
	    </SafeAreaView>
        )
    }
}


const mapStateToProps = ({ disclosureReducer, registrationReducer, authReducer }) => {
  const { title, firstName, lastName, email, mobile, } = disclosureReducer;
  const {  } = registrationReducer;
  const { error,  password, passwordRepeat } = authReducer;
  return { title, firstName, lastName, email, mobile, 
	error, password, passwordRepeat };
};

export default connect(mapStateToProps, { handleFetchError, setAuthPassword, setAuthRepeatPassword, borrowerSignUp, onSignupSuccess  })(EmailRegistration2);