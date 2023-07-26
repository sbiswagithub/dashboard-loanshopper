import React, { Component, useState } from "react";
import { Text, TextInput, View, Image } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../styles/styles';  
import {  } from '../constants/disclosure';
import {  } from '../constants/banners';
import {  } from '../constants/alerts';
import { handleFetchError, setAuthPassword, setAuthRepeatPassword, } from '../actions';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { LOGO_DARK_BLUE, TRANSPARENT } from "../constants/colors";

function PasswordRules  (props)  {
	const styles = getStyleSheet();
	const conditionMet = new RegExp(props.pattern, 'g').test(props.value)
	return (
		<View style={[styles.chipsLayout, {maxWidth:'80%'}]}>
			<FAIcon 
				name={conditionMet ? 'check-circle-o' : 'times-circle-o' } size={20} 
				color={conditionMet ? LOGO_DARK_BLUE : 'grey'} backgroundColor={TRANSPARENT} iconStyle={{alignContent:'center' }} ></FAIcon>
			<Text style={{color: conditionMet ? LOGO_DARK_BLUE : 'grey', marginLeft:'5%' }}>{props.rule}</Text>
		</View>
	);
}

class EnterPassword extends Component {

	constructor(props) {
		super(props);
    }
  
    render () {
		const styles = getStyleSheet();
		const hidePasswordRules = this.props.password == undefined || 
			( new RegExp('^.{8,}$','g').test(this.props.password) &&
				new RegExp('(?=.*[A-Z])','g').test(this.props.password) &&
				new RegExp('(?=.*[a-z])','g').test(this.props.password) &&
				new RegExp('(?=.*\\d)','g').test(this.props.password) &&
				new RegExp('(?=.*\\W)','g').test(this.props.password) )

		return (
			<View style={[styles.stackedLayout]}>
				<View style={styles.space}/>
				<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide]} 
					secureTextEntry={true} value={this.props.password}
					clearTextOnFocus={true} 
					onFocus={() => {this.props.setAuthPassword(undefined)}}
					onChangeText={this.props.setAuthPassword}
					placeholder={'Password'}/>
					
				{ hidePasswordRules ? 
					<View style={styles.space}/> :
					<View style={{flexDirection:"column"}}>
						<View style={styles.space}/>					
						<PasswordRules rule='Minimum 8 characters' pattern='^.{8,}$' value={this.props.password} />
						<PasswordRules rule='Uppercase A-Z' pattern='(?=.*[A-Z])' value={this.props.password} />
						<PasswordRules rule='Lowercase A-Z' pattern='(?=.*[a-z])' value={this.props.password} />
						<PasswordRules rule='Numeric 0-9' pattern='(?=.*\d)' value={this.props.password} />
						<PasswordRules rule='Special character' pattern='(?=.*\W)' value={this.props.password} />
						<View style={styles.space}/>					
					</View>  }

				<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide]} 
					secureTextEntry={true} value={this.props.passwordRepeat}
					clearTextOnFocus={true} 
					onFocus={() => {this.props.setAuthRepeatPassword(undefined)}} 
					onChangeText={this.props.setAuthRepeatPassword}
					placeholder={'Repeat password'}/>
				{this.props.passwordRepeat && this.props.passwordRepeat != this.props.password ? 
				<PasswordRules rule='Passwords do not match' pattern={'^' + this.props.password + '$'} value={this.props.passwordRepeat} /> : <View style={styles.space}/>}

			</View>
        )
    }
}


const mapStateToProps = ({ disclosureReducer, registrationReducer, authReducer }) => {
  const {  } = disclosureReducer;
  const {  } = registrationReducer;
  const { error,  password, passwordRepeat } = authReducer;
  return { error, password, passwordRepeat };
};

export default connect(mapStateToProps, { handleFetchError, setAuthPassword, setAuthRepeatPassword,  })(EnterPassword);