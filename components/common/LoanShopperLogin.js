import React, { useState } from "react";
import { Pressable, Text } from 'react-native';

import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import * as RootNavigation from '../../actions/RootNavigation.js';

import getStyleSheet from '../../styles/styles';  
import { COGNITO_AUTH } from '../../constants/auth';
import { } from '../../constants/banners';
import { toQueryString } from '../../actions';



export default function LoanShopperLogin(props)  {
	const styles = getStyleSheet();
	console.log(props)
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

				if (event.url) {
					const redirectData = Linking.parse(event.url);
					props.onRedirect(redirectData);
					console.log(redirectData);
					RootNavigation.navigate('Menu')
				}
			};

			if (!Constants.platform.ios) {
				Linking.addEventListener("url", redirectHandler);
			}

			let result = await WebBrowser.openAuthSessionAsync(url);
			console.log("Returned Auth session");
			console.log(result);

			if (Constants.platform.ios) {
				redirectHandler(result);
			}
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	const onLoginPressed = () => {
		const loginUrl = props?.url ? props.url : COGNITO_AUTH.loginUrl + toQueryString(COGNITO_AUTH.authorizeQParams)
		console.log(loginUrl)
		if (Constants.platform.web)
			window.open( loginUrl,"_self" )
		else
			_openAuthSessionAsync( loginUrl )
	}

	return  <Pressable  onPress={onLoginPressed}>{props?.children == undefined ?<Text style={styles.textMediumBoldLogoDarkBlue}>Login</Text> : props.children(onLoginPressed)}</Pressable>
}