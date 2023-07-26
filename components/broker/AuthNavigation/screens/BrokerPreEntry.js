 import React, { Component, useRef  } from "react";
import { TextInput, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/AntDesign';

import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { connect } from "react-redux";
import { trackPromise, } from 'react-promise-tracker';
import { Auth } from 'aws-amplify';

import getStyleSheet from '../../../../styles/styles';  
import { LOGIN_DEFAULT, PASSWORD_DEFAULT, COGNITO_AUTH } from '../../../../constants/auth';
import { LOGIN, RESET_PASSWORD, SIGNUP, CLOSE_BUTTON_BANNER, ERROR_DIALOG_TITLE_1, ERROR_DIALOG_USERNAME_PASSWORD_INCORRECT_MSG } from '../../../../constants/banners';
import { handleFetchError, setAuthLogin, setAuthPassword, authenticatedBroker, onRedirect, toQueryString } from '../../../../actions';
import * as colors from "../../../../constants/colors";
import ErrorDialog from '../../../ErrorDialog';
import SpinnerHolder from '../../../common/SpinnerHolder';


function Buttons({props, doLogin}) {
    const styles = getStyleSheet();
	const navigation = useNavigation();

	return (
		<View style={[{width:"100%", alignItems:"center"}]}>
				<View style={styles.space}/>
				<View style={styles.space}/>
				<View style={{flexDirection:'row', justifyContent:"center", width:"45%", }}>
					<Icon.Button name="cloudupload" size={20} borderRadius={25}
						backgroundColor={colors.LOGO_DARK_BLUE} iconStyle={{margin:8}} 
						onPress={doLogin}
					>{LOGIN}</Icon.Button>
				</View>
				<View style={styles.space}/>
				<View style={styles.space}/>

				<View style={[styles.hrLogoDarkBlue, {width:"125%"}]}/>

				<View style={styles.space}/>
				<View style={styles.space}/>
				<View style={{flexDirection:'row', justifyContent:"center", width:"45%", }}>
					<Icon.Button name="cloudupload" size={20} borderRadius={25}
						backgroundColor={colors.LOGO_BRIGHT_BLUE} iconStyle={{margin:8}} style={{width:"150%"}} 
						onPress={() => { navigation.navigate("BrokerRegistration"); }} 
					>{SIGNUP}</Icon.Button>
				</View>
				<View style={styles.space}/>
				<View style={styles.space}/>

				<View style={[styles.hrLogoDarkBlue, {width:"125%"}]}/>

				<View style={styles.space}/>
				<View style={styles.space}/>
				<View style={{flexDirection:'column', }}>
				<Icon.Button name="closesquareo" size={20} borderRadius={25}
					backgroundColor={colors.TRANSPARENT} color={colors.LOGO_DARK_BLUE} iconStyle={{margin:8}} 
					onPress={() => { navigation.goBack(); }} 
					></Icon.Button>
				</View>
		</View>
	);
}
class BrokerPreEntry extends Component {

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
		    		<View style={styles.space}/>
		    		<View style={styles.space}/>
					<View style={styles.space}/>
					<View style={styles.space}/>
					<Buttons props={this.props} doLogin={()=> {
						this._openAuthSessionAsync( COGNITO_AUTH.loginUrl + toQueryString(COGNITO_AUTH.authorizeQParams) )
					}} />
					<SpinnerHolder />
	   		    </View>
   		    </ScrollView>
		    

	    </SafeAreaView>
        )
    }


	_handleRedirect = (event) => {
		if (!Constants.platform.ios) {
			////console.log("Handling redirect NOT iOS");
			this._removeLinkingListener();
		}

		////console.log("Returned event");
		////console.log(event);
		/*
		This event will be
		Object {
			"url": "ls://?accessCode=AQUgbCY6vbBd9R1BTvW...&appEntryMode=....&origin=...",
		}
		*/

        let redirectData;
        if (event.url) {
          redirectData = Linking.parse(event.url);
		  ////console.log(redirectData);
          this.props.onRedirect(redirectData);
		}

		this.setState({ redirectData });
	};
	
	_addLinkingListener = () => {
		Linking.addEventListener("url", this._handleRedirect);
	};

	_removeLinkingListener = () => {
		Linking.removeEventListener("url", this._handleRedirect);
	};
	
    _openAuthSessionAsync = async (url) => {
      try {
		////console.log("Opening browser");
		////console.log(url);

		if (!Constants.platform.ios) {
			this._addLinkingListener();
		}

		let result = await WebBrowser.openAuthSessionAsync(url);
		////console.log("Returned Auth session");
		////console.log(result);

		if (Constants.platform.ios) {
			this._handleRedirect(result);
		}

	} catch (error) {
        alert(error);
        ////console.log(error);
    }
    };

}


const mapStateToProps = ({ authReducer }) => {
  const { login, password, accessCode, appEntryMode, error, } = authReducer;
  return { login, password, accessCode, appEntryMode, error };
};

export default connect(mapStateToProps, { setAuthLogin, setAuthPassword, handleFetchError, authenticatedBroker , onRedirect, toQueryString })(BrokerPreEntry);