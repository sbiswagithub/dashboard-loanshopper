import React, { Component } from "react";
import {  Text,  View,  Linking } from 'react-native';
import {  Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import getStyleSheet from '../styles/styles';  
import { onLogout, handleFetchError, } from '../actions';
import * as RootNavigation from '../actions/RootNavigation.js';

import ErrorDialog from './ErrorDialog';
import { TRANSPARENT, LOGO_DARK_BLUE,  } from "../constants/colors";
import { privacy_policy_url, t_and_c_url } from "../constants/home";


class PreRegistrationDeclaration extends Component {

	constructor(props) {
		super(props);
		this.state ={
			showPrivacyTAndCLinks : true
		}
    }
  
    render () {
    	const styles = getStyleSheet();
    	return (
			<View style={styles.stackedLayout}>
				<Portal>
					<Dialog visible={this.state.showPrivacyTAndCLinks} style={[styles.centreAligned, {position: 'absolute', top:'2%',  }]}  >
						<Dialog.Title>
							<View style={styles.endToEndLayout}>
								<Text style={styles.textMediumBoldLogoDarkBlue}>Welcome to LoanShopper</Text>
							</View>						
						</Dialog.Title>
						<Dialog.Content>
							<View style={{maxWidth:'80%' }}>
								<Text>Please take a few minutes to familiarise yourself with our </Text>
								<Text style={styles.textLinkBold} onPress={() => Linking.openURL(privacy_policy_url)}>Privacy Policy</Text>
								<Text> and </Text>
								<Text style={styles.textLinkBold} onPress={() => Linking.openURL(t_and_c_url)}>Terms and Conditions</Text>
							</View>
						</Dialog.Content>
						<Dialog.Actions>
							<View style={styles.stackedSimpleLayout}>
								<Icon.Button name={'clipboard-check-multiple-outline'} size={30} borderRadius={10} 
									backgroundColor={TRANSPARENT}  color={LOGO_DARK_BLUE} 
									iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
									onPress={() => {
										this.setState({ ...this.state, showPrivacyTAndCLinks: false})
										}} >I have read and understood</Icon.Button>
								<Icon.Button name={'backspace-outline'} size={30} borderRadius={10} 
									backgroundColor={TRANSPARENT}  color={LOGO_DARK_BLUE} 
									iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
									onPress={() => {
										this.setState({ ...this.state, showPrivacyTAndCLinks: false})
										RootNavigation.navigate('Landing')
									}} >Cancel</Icon.Button>
							</View>

						</Dialog.Actions>
					</Dialog>

				</Portal>
				<ErrorDialog />

			</View>
        )
    }
}


const mapStateToProps = ({  }) => {
  return {  };
};

export default connect(mapStateToProps, { onLogout, handleFetchError, })(PreRegistrationDeclaration);