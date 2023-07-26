import React, { Component } from "react";
import { Linking, Keyboard,TouchableWithoutFeedback, TouchableHighlight, View, Image, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';

import EmailSignIn from './EmailSignIn'
import getStyleSheet from '../styles/styles';  
import { LINKEDIN_AUTH, FACEBOOK_AUTH } from '../constants/auth';
import { toQueryString, onRedirect, } from '../actions';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirectData: null,
        };
      }

    render () {
    	const styles = getStyleSheet();
    	return (
        <SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
	    	<View style={styles.box}>
				<View style={styles.loginBox}>
					<View style={styles.loginRow}>
						<Image source={require('../assets/LoanShopper_LR.png')}  style={styles.logoMastheadWide} />
					</View>
					<View style={styles.loginRow}>
						<EmailSignIn />
					</View>
		    	</View>
	    	</View>
			</TouchableWithoutFeedback>
	    </SafeAreaView>
        )
    }

	_handleRedirect = (event) => {
		this._removeLinkingListener();

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
		const eventListener = Linking.addEventListener("url", this._handleRedirect);
		this.setState({ returnUrlListener : eventListener});
	};

	_removeLinkingListener = () => {
		this.state.returnUrlListener.remove()
	};
	
    _openAuthSessionAsync = async (url) => {
      try {
		////console.log("Opening browser");
		////console.log(url);

		this._addLinkingListener();

		//let result = await WebBrowser.openAuthSessionAsync(url);
		////console.log("Returned Auth session");
		////console.log(result);

		this._handleRedirect(null);

	} catch (error) {
        alert(error);
        ////console.log(error);
    }
    };

}

const mapStateToProps = ({ authReducer }) => {
  const { apiKey, accessCode, appEntryMode } = authReducer;
  return { apiKey, accessCode, appEntryMode };
};

export default connect(mapStateToProps, { onRedirect, })(SignIn);