import React, { Component, useRef  } from "react";
import { Text, TextInput, View, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { connect } from "react-redux";
import { trackPromise, } from 'react-promise-tracker';
import { Auth } from 'aws-amplify';

import getStyleSheet from '../../../../styles/styles';  
import {  } from '../../../../constants/disclosure';
import { ENTER_OTP, OTP_SENT_TO, ERROR_DIALOG_PUBLIC_MSG_3, ERROR_DIALOG_TITLE_1, } from '../../../../constants/banners';
import { verifyOtp, clearOtp, handleFetchError } from '../../../../actions';
import * as colors from "../../../../constants/colors";
import ErrorDialog from '../../../ErrorDialog';
import SpinnerHolder from '../../../common/SpinnerHolder';


async function confirmVerificationCodeAsync (username, code ) {
	try {
	  await Auth.confirmSignUp(username, code);
	  return username;
    } catch (error) {
        ////console.log('Error confirming broker sign up', error);
    }
}
function confirmVerificationCode (props, onSuccess, onError)  {
	trackPromise(
		confirmVerificationCodeAsync( props.email, props.otp )
	    .then(username => {
			onSuccess(username);
	    })
	    .catch((error) => {
		    onError(error);
	    }));
}
function Buttons({props}) {
    const styles = getStyleSheet();
	const navigation = useNavigation();
	const disabledSubmit = props.otp == null || props.otp == '';
	return (
			<View style={[styles.chipsLayout, {width:"90%", paddingTop:'5%'}, styles.centreAligned]}>
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
						confirmVerificationCode(props,
						(username) => { navigation.navigate("BrokerLogin") ; },
						(error) => {
								props.handleFetchError({
														showDialog: true, 
														dialogTitle: ERROR_DIALOG_TITLE_1, 
														publicMessage: ERROR_DIALOG_PUBLIC_MSG_3 , 
													});
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

class VerificationCodeEntry extends Component {

	constructor(props) {
        super(props);
    }

    render () {
    	const styles = getStyleSheet();
    	return (
        <SafeAreaView style={styles.container}>
	        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
		    		<View style={styles.space}/>
					<Image source={require('../../../../assets/LoanShopper_LR.png')}  style={styles.logoMastheadWide} />
					<View style={styles.space}/>
					<View style={styles.space}/>
					<Text style={styles.textMediumGray}>{OTP_SENT_TO}</Text>
					<View style={styles.space}/>
					<View style={styles.space}/>

					<TextInput
						style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned] }
						onFocus={() => this.props.clearOtp()}
			    		onChangeText={(text) => this.props.verifyOtp(text)}
						placeholder={ENTER_OTP} 
						clearTextOnFocus={true}
						/>
					<View style={styles.space}/>
					<View style={styles.space}/>
   		    </ScrollView>

			<Buttons props={this.props} />
			<SpinnerHolder />
	    </SafeAreaView>
        )
    }
}


const mapStateToProps = ({ disclosureReducer, registrationReducer, authReducer }) => {
  const { email } = disclosureReducer;
  const { otp } = registrationReducer;
  const { accessCode, error } = authReducer;
  return { otp, accessCode, email, error };
};

export default connect(mapStateToProps, { verifyOtp, clearOtp, handleFetchError, })(VerificationCodeEntry);