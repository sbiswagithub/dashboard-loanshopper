import React, { Component } from "react";
import { View, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-elements';
import { Dialog, Portal, } from 'react-native-paper';
import { trackPromise  } from 'react-promise-tracker';

import getStyleSheet from '../styles/styles';  
import { LOGO_DARK_BLUE, LOGO_BRIGHT_BLUE, WHITE, TRANSPARENT } from "../constants/colors";
import { emailUpdated, resetLoanshopperPassword, setResetConfirmationCode, confirmLoanshopperPassword, 
	resendOtp, handleFetchError, hideResetPassword } from '../actions';
import * as RootNavigation from '../actions/RootNavigation.js';
import {  } from "../constants/disclosure";
import ErrorDialog from './ErrorDialog';
import EnterPassword from './EnterPassword';
import LoanShopperLogin from "./common/LoanShopperLogin";


class ResetPassword extends Component {
    constructor(props) {
        super(props);
		this.state = {
			enterPassword: false,
			passwordChanged: false,
		}
	}

    render () {
		const styles = getStyleSheet();
		//console.log(this.props)
		const ready = this.props.passwordRepeat === this.props.password && this.props.password != undefined && this.props.password != null 
    	return (
			<View>
				<Portal>
					<Dialog visible={this.props.resetPassword} style={{position: 'absolute' , top:'2%'}} >
						<Dialog.Title>
							<View style={styles.endToEndLayout}>
								<Text style={styles.textMediumBoldLogoDarkBlue}>Reset password</Text>
								<Icon.Button name={'close-circle'} size={30} borderRadius={10} 
									backgroundColor={TRANSPARENT}  color={LOGO_DARK_BLUE} 
									iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
									onPress={this.props.hideResetPassword} ></Icon.Button>
							</View>
						</Dialog.Title>
						<Dialog.Content>
							<TextInput 
								style={this.props.hasValidEmail ? 
										[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned] : 
											[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color:'red'}]} 
								clearTextOnFocus={true} placeholder={'Enter email'}
								autoCompleteType="email" textContentType="emailAddress" autoCapitalize="none"
								onChangeText={text => this.props.emailUpdated(text)} 
								onFocus={() => {this.props.emailUpdated('')}}  
								value={this.props.email}  />
						</Dialog.Content>
						<Dialog.Actions>
							<View style={styles.chipsLayout}>
								<Icon.Button name={'arrow-right-circle'} size={30} borderRadius={10} 
									backgroundColor={TRANSPARENT}  color={this.props.hasValidEmail ? LOGO_BRIGHT_BLUE : 'gray'} 
									iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
									disabled={!this.props.hasValidEmail}
									onPress={() => {
										trackPromise(
											this.props.resetLoanshopperPassword(
												{email: this.props.email},
												(json) => {
													//console.log('In reset password onSuccess')
													//console.log(json)
													this.props.hideResetPassword()
													this.setState({ ...this.state, enterPassword: true, email: this.props.email})
												},
												(error) => {
													//console.log('In reset password onError')
													//console.log(error)
													this.props.hideResetPassword()
													this.props.handleFetchError(error)
												}
											)
										) }} >Next</Icon.Button>	
							</View>
						</Dialog.Actions>
					</Dialog>
				</Portal>

				<Portal>
					<Dialog visible={this.state.enterPassword} style={[styles.centreAligned, {position: 'absolute', top:'2%',  }]}  >
						<Dialog.Title>
							<View style={styles.endToEndLayout}>
								<Text style={styles.textMediumBoldLogoDarkBlue}>Verify and reset password</Text>
								<Icon.Button name={'close-circle'} size={30} borderRadius={10} 
									backgroundColor={TRANSPARENT}  color={LOGO_DARK_BLUE} 
									iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
									onPress={() => {
										this.setState({ ...this.state, enterPassword : false})
										}} ></Icon.Button>
							</View>
						</Dialog.Title>
						<Dialog.Content>
							<View style={{flexDirection:"column", }}>
								<View style={styles.chipsLayout}>
									<TextInput 
											style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {maxWidth:'50%'}]} 
											clearTextOnFocus={true} placeholder={'Confirmation code'}
											onChangeText={text => this.props.setResetConfirmationCode(text)} 
											onFocus={() => {this.props.setResetConfirmationCode('')}}  
											value={this.props.confirmationCode} />

									<Icon.Button name={'replay'} size={30} borderRadius={10} 
											backgroundColor={TRANSPARENT}  color={LOGO_BRIGHT_BLUE} 
											iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
											onPress={() => {
												this.props.resendOtp({ email: this.state.email},console.log, this.props.handleFetchError)
												}} ></Icon.Button>
								</View>
								<EnterPassword />
							</View>
						</Dialog.Content>
						<Dialog.Actions>
							<View style={{flexDirection:'column'}}>
								<Text style={styles.textMediumLogoDarkBlue}>You should soon recieve an SMS with a confirmation code or else click resend</Text>
									<Icon.Button name={'arrow-right-bold-circle-outline'} size={30} borderRadius={10} 
										backgroundColor={TRANSPARENT}  color={ready ? LOGO_DARK_BLUE : 'grey'} disabled={!ready} 
										iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
										onPress={() => {
												this.props.confirmLoanshopperPassword(
													{ ...this.props, ...this.state }, 
													(json) => {
														console.log(json)
														console.log('In confirm loanshopper password onsuccess')
														this.setState({ enterPassword : false, passwordChanged : true })
													}, (error) => {
														console.log(error)
														console.log('In confirm loanshopper password onError')
														this.props.handleFetchError(error)
													} )
											}} >Set new password</Icon.Button>
										</View>
						</Dialog.Actions>
					</Dialog>
				</Portal>

				<Portal>
					<Dialog visible={this.state.passwordChanged} style={{position: 'absolute', top:'2%' }}  >
						<Dialog.Title>
							<View style={styles.endToEndLayout}>
								<Text style={styles.textMediumBoldLogoDarkBlue}>Password updated</Text>
								<Icon.Button name={'close-circle'} size={30} borderRadius={10} 
									backgroundColor={TRANSPARENT}  color={LOGO_DARK_BLUE} 
									iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
									onPress={() => {
										this.setState({ ...this.state, passwordChanged : false})
										}} ></Icon.Button>
							</View>
						</Dialog.Title>
						<Dialog.Actions>
							<View style={styles.stackedSimpleLayout}>
								<LoanShopperLogin>
									<Icon.Button name={'email-lock'} size={40} borderRadius={10} 
										backgroundColor={ LOGO_DARK_BLUE}  color={WHITE} 
										iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
										disabled={true} >Login</Icon.Button></LoanShopperLogin>
							</View>
						</Dialog.Actions>
					</Dialog>					
				</Portal>
				<ErrorDialog /> 
			</View>
        )
    }

}

const mapStateToProps = ({ disclosureReducer, authReducer }) => {
  const { email, hasValidEmail } = disclosureReducer;
  const { confirmationCode, password, passwordRepeat, resetPassword } = authReducer;
  return { email, hasValidEmail, confirmationCode, password, passwordRepeat, resetPassword  };
};

export default connect(mapStateToProps, { emailUpdated, resetLoanshopperPassword, setResetConfirmationCode, 
	confirmLoanshopperPassword, resendOtp, handleFetchError, hideResetPassword })(ResetPassword);