import React, { Component } from "react";
import { Keyboard, Text, TextInput, View, Image, SafeAreaView,TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { trackPromise, usePromiseTracker  } from 'react-promise-tracker';
import getStyleSheet from '../../styles/styles';  
import { ERROR_DIALOG_PUBLIC_MSG_1, ERROR_DIALOG_PUBLIC_MSG_2, ERROR_DIALOG_TITLE_1 } from '../../constants/banners';
import { API_BORROWER_URI, } from '../../constants/apiUrls';
import { ENTER_OTP, OTP_SENT_TO, DIDNT_RECEIVE } from '../../constants/banners';
import { verifyOtp, requestNewOtp, handleFetchError, } from '../../actions';
import * as RootNavigation from '../../actions/RootNavigation.js';
import SpinnerHolder from '../common/SpinnerHolder';

import ErrorDialog from '../ErrorDialog';

class VerifyOtp extends Component {

	constructor(props) {
        super(props);
    }

	verifyOtpAction(input, props) {
	    if (input.length === 5) {
	    	// Hide keyboard to stop further user input
	        Keyboard.dismiss();
	    	const body = JSON.stringify({ otpCode: input, operationId: 'verifyOtp', });
	    	const uri = `${API_BORROWER_URI}/`+ props.borrower._id;
			trackPromise(
				fetch(uri, {
				    method: "PUT",
				    headers: { 'Content-Type': 'application/json'},
				    body: body,
				})
			    .then(response => {
					if (response.status == 403 || response.status == 404) {
		                const error = Object.assign({}, {
		                    status: response.status,
		                    statusText: response.statusText,
		                    showDialog: true, 
		                    dialogTitle: ERROR_DIALOG_TITLE_1, 
		                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_2, 
		                    logMessage: 'Failed to connect to ' + uri
		                });
		                return Promise.reject(error);
					} else if (response.status == 200  || response.status == 201) {
					    ////console.log('OTP verification worked');
						RootNavigation.navigate('Landing');
		            } else {
					    //console.log('Unexpected Error');
		                const error = Object.assign({}, {
		                    status: response.status,
		                    statusText: response.statusText,
		                    showDialog: true, 
		                    dialogTitle: ERROR_DIALOG_TITLE_1, 
		                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
		                    logMessage: 'Error occured at verifyOtp operation'
		                });
		                return Promise.reject(error);
		            }
			    })
			    .catch((error) => {
				    //console.log('Boo in GET borrowers '+ uri);
				    //console.log(error);
				  	props.handleFetchError(error);	  						  	
			    }));	
	  	}
	}

	resendOtp(props) {
		// Hide keyboard to stop further user input
		Keyboard.dismiss();
		const body = JSON.stringify({ operationId: 'resendOtp', });
		const uri = `${API_BORROWER_URI}/`+ props.borrower._id;
		trackPromise(
			fetch(uri, {
				method: "PUT",
				headers: { 'Content-Type': 'application/json' },
				body: body,
			})
			.then(response => {
				if (response.status == 200 || response.status == 201) {
					////console.log('OTP verification worked');
					return response.json();
				} else {
					////console.log('Unexpected Error');
					const error = Object.assign({}, {
						status: response.status,
						statusText: response.statusText,
						showDialog: true, 
						dialogTitle: ERROR_DIALOG_TITLE_1, 
						publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
						logMessage: 'Error occured at resendOtp operation'
					});
					return Promise.reject(error);
				}
			})
			.then((json) => {
				////console.log(json);
			})
			.catch((error) => {
				////console.log('Boo in GET borrowers '+ uri);
				////console.log(error);
				props.handleFetchError(error);	  						  	
			}));	
	}

    render () {
    	const styles = getStyleSheet();
    	return (
        <SafeAreaView  style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
	    		<View style={styles.box}>
			    	<View style={styles.stackedLayout}>
						<Image source={require('../../assets/LoanShopper_LR.png')}  style={styles.logoMastheadWide} />
				    	<View style={styles.stretchedVerticalLayout}>
					    	<View style={[styles.stackedLayout]}/>
					    	<View style={[styles.stackedLayout]}>
						    	<Text style={styles.textMediumGray}>{OTP_SENT_TO}{this.props.mobile}</Text>
							</View>
					    	<View style={[styles.stackedLayout]}>
						    	<View style={[styles.stackedLayout]}>
							    	<Text style={styles.textMediumBoldGray}>{ENTER_OTP}</Text>
						    		<View style={styles.space}/>
								    <TextInput 
								    	style={[styles.bottomBorderCentredTextInput, styles.disclTextEntryWide, styles.centreAligned]} 
							    		clearTextOnFocus={true} onChangeText={text => this.verifyOtpAction(text, this.props)} />
								</View>
							</View>
					    	<View style={[styles.stackedLayout]}/>
					    	<View style={styles.stackedLayout}>
						    	<View style={styles.stackedLayout}>
									<Icon.Button
									    name="refresh-cw"
									    backgroundColor="#3b5998"
									    onPress={() => this.resendOtp(this.props)}
									  >
									    {DIDNT_RECEIVE}
									  </Icon.Button>
								</View>
							</View>
							<SpinnerHolder />
							<ErrorDialog />
						</View>
					</View>
   		    	</View>
			</TouchableWithoutFeedback>
	    </SafeAreaView >
        )
    }
}


const mapStateToProps = ({ disclosureReducer, registrationReducer, authReducer }) => {
  const { mobile } = disclosureReducer;
  const { otp, borrower } = registrationReducer;
  const { accessCode, error } = authReducer;
  return { accessCode, mobile, borrower, otp, error };
};

export default connect(mapStateToProps, { verifyOtp, requestNewOtp, handleFetchError, })(VerifyOtp);