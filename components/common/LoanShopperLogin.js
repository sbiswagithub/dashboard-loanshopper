 import React, { useState } from "react";
import { Pressable, Text } from 'react-native';

import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import getStyleSheet from '../../styles/styles';  
import { COGNITO_AUTH } from '../../constants/auth';
import { } from '../../constants/banners';
import { onRedirect, toQueryString } from '../../actions';



export default function LoanShopperLogin({children})  {
  	const [redirectData,setRedirectData] = useState()
	const styles = getStyleSheet();
	const _openAuthSessionAsync = async (url) => {
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
					onRedirect(redirectData);
					setRedirectData(redirectData);			
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

	const onLoginPressed = () => {
		const loginUrl = COGNITO_AUTH.loginUrl + toQueryString(COGNITO_AUTH.authorizeQParams)
		console.log(loginUrl)
		if (Constants.platform.web)
			window.open( loginUrl,"_self" )
		else
			_openAuthSessionAsync( loginUrl )
	}

	return  <Pressable  onPress={onLoginPressed}>{children == undefined ?<Text style={styles.textMediumBoldLogoDarkBlue}>Login</Text> : children(onLoginPressed)}</Pressable>
}