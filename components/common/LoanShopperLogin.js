 import React, { Component, } from "react";
import { TouchableHighlight, Text } from 'react-native';

import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { connect } from "react-redux";

import getStyleSheet from '../../styles/styles';  
import { COGNITO_AUTH } from '../../constants/auth';
import { } from '../../constants/banners';
import { onRedirect, toQueryString } from '../../actions';
import * as colors from "../../constants/colors";

class LoanShopperLogin extends Component {

	constructor(props) {
        super(props);
    }
  
    render () {
		const styles = getStyleSheet();
    	return (
			<TouchableHighlight onPress={()=> {
				this._openAuthSessionAsync( COGNITO_AUTH.loginUrl + toQueryString(COGNITO_AUTH.authorizeQParams) )
			}} >
				{this.props?.children == undefined ? <Text style={styles.textMediumBoldLogoDarkBlue}>Login</Text> : this.props.children}
				</TouchableHighlight>
        )
    }


    _openAuthSessionAsync = async (url) => {
      try {
		//console.log("Opening browser");
		//console.log(url);

		const redirectHandler = (event) => {
			//console.log("Returned event");
			//console.log(event);
			/*
			This event will be
			Object {
				"url": "ls://?accessCode=AQUgbCY6vbBd9R1BTvW...&appEntryMode=....&origin=...",
			}
			*/

			let redirectData;
			if (event.url) {
				redirectData = Linking.parse(event.url);
				//console.log(redirectData);
				this.props.onRedirect(redirectData);
				this.setState({ redirectData });			
			}
		};

		if (!Constants.platform.ios) {
			Linking.addEventListener("url", redirectHandler);
		}

		let result = await WebBrowser.openAuthSessionAsync(url);
		//console.log("Returned Auth session");
		//console.log(result);

		if (Constants.platform.ios) {
			redirectHandler(result);
		}

	} catch (error) {
        alert(error);
        //console.log(error);
    }
    };

}

const mapStateToProps = ({ authReducer }) => {
  const { } = authReducer;
  return { };
};

export default connect(mapStateToProps, { onRedirect, toQueryString })(LoanShopperLogin);