import React, { Component, useState } from "react";
import { SafeAreaView, Keyboard, View, Alert } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from 'expo-constants';

import getStyleSheet from '../styles/styles';  
import { resetFetchError } from '../actions';
import * as RootNavigation from '../actions/RootNavigation.js';

import { LOGO_DARK_BLUE, WHITE } from "../constants/colors";

class ErrorDialog extends Component {

	constructor(props) {
        super(props);
    }
    
    componentDidMount(){
		if (!Constants.platform.web)
			Keyboard.dismiss();
    }

    render () {
    	const styles = getStyleSheet();
    	return (
				<Portal>
					<Dialog visible={this.props.error.showDialog} onDismiss={this.props.resetFetchError} style={{maxWidth:'50%', alignSelf:"center"}}  >
					<Dialog.Title>{this.props.error.dialogTitle}</Dialog.Title>
					<Dialog.Content>
						<Paragraph>{this.props.error.publicMessage}</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Icon.Button name="close" size={15} borderRadius={30}
							color={LOGO_DARK_BLUE} backgroundColor={WHITE}
							iconStyle={{margin:5,alignContent:'center'}} 
							onPress={() => {
								this.props.resetFetchError()
								RootNavigation.navigate('Landing')
							}} >{'Close'}</Icon.Button>
					</Dialog.Actions>
					</Dialog>
				</Portal>
        )
    }
}

const mapStateToProps = ({ authReducer }) => {
  const { error } = authReducer;
  return { error };
};

export default connect(mapStateToProps, { resetFetchError, })(ErrorDialog);