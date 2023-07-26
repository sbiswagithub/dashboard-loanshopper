import React, { Component, useRef  } from "react";
import { Animated, Text	, TextInput, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

import { useNavigation } from '@react-navigation/native';
import { connect } from "react-redux";

import getStyleSheet from '../../../../styles/styles';  
import { EMAIL_DEFAULT, MOBILE_DEFAULT } from '../../../../constants/disclosure';
import { QUICK_SIGNUP, } from '../../../../constants/banners';
import { emailUpdated, mobileUpdated, toggleRegistrationSave, handleFetchError, } from '../../../../actions';
import * as colors from "../../../../constants/colors";
import Name from '../../../disclosure/Name';
import ErrorDialog from '../../../ErrorDialog';
import SpinnerHolder from '../../../common/SpinnerHolder';

function Buttons({props}) {
    const styles = getStyleSheet();
	const navigation = useNavigation();
	const disabledNext = !props.hasTitle || !props.hasFirstName || !props.hasLastName || !props.hasMobile || !props.hasValidMobile;
	return (
			<View style={[styles.chipsLayout, {width:"90%", paddingTop:'5%'}, styles.centreAligned]}>
				<View style={styles.space}/>
				<View style={styles.space}/>
				<TouchableOpacity  onPress={() => { navigation.goBack(); }} >
					<Ionicons name="ios-chevron-back-circle-sharp"
					color={colors.LOGO_BRIGHT_BLUE}
					size='60'
					 />
				</TouchableOpacity>
				<View style={styles.space}/>
				<View style={styles.space}/>
				<TouchableOpacity 
					disabled={disabledNext}
					onPress={() => {navigation.navigate('EmailPasswordConfirmEntry')}} >
					<Ionicons name="ios-chevron-forward-circle-sharp"
					color={disabledNext ? colors.BACKGROUND_LIGHT_GRAY : colors.LOGO_BRIGHT_BLUE}
					size='60'
					/>
				</TouchableOpacity>
				<View style={styles.space}/>
				<View style={styles.space}/>
			</View>
	);
}

class BrokerRegistration extends Component {

	constructor(props) {
        super(props);
    }
  
    render () {
		const styles = getStyleSheet();
    	return (
        <SafeAreaView style={styles.container}>
	        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
		    	<View style={[styles.stackedLayout, {width:"90%"}, styles.centreAligned]}>
		    		<View style={styles.space}/>
					<Image source={require('../../../../assets/LoanShopper_LR.png')}  style={styles.logoMastheadWide} />
		    		<View style={styles.space}/>
		    		<View style={styles.space}/>
					<Text style={[styles.textMediumBoldPurple, styles.centreAligned]}>{QUICK_SIGNUP}</Text>
		    		<View style={styles.space}/>
		    		<View style={styles.space}/>
		    		<Name/>
				    <TextInput 
						style={this.props.hasValidMobile ? 
			    			[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned] : 
			    				[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color:'red'}]} 
						clearTextOnFocus={true} onFocus={() => {this.props.mobileUpdated('')}}
						onChangeText={text => this.props.mobileUpdated(text)}
		      			value={this.props.mobile} placeholder={MOBILE_DEFAULT} />
		    		<View style={styles.space}/>

					<SpinnerHolder />
	   		    </View>
   		    </ScrollView>
		    
			<Buttons props={this.props} />

	    </SafeAreaView>
        )
    }
}


const mapStateToProps = ({ disclosureReducer, registrationReducer, authReducer }) => {
  const { title, firstName, lastName, email, mobile, hasTitle, hasFirstName, hasLastName, hasEmail, hasValidEmail, hasMobile, hasValidMobile, } = disclosureReducer;
  const { toggleSaveMode, password, hasValidPassword, passwordConfirmed } = registrationReducer;
  const { accessCode, appEntryMode, error } = authReducer;
  return { title, firstName, lastName, email, mobile, hasTitle, hasFirstName, hasLastName, hasEmail, hasValidEmail, hasMobile, hasValidMobile, password, hasValidPassword, passwordConfirmed, 
		toggleSaveMode, accessCode, appEntryMode, error };
};

export default connect(mapStateToProps, { emailUpdated, mobileUpdated, toggleRegistrationSave, handleFetchError, })(BrokerRegistration);