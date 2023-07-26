import React, { Component } from "react";
import { View, } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-elements';

import getStyleSheet from '../styles/styles';  
import { LOGO_DARK_BLUE, LOGO_BRIGHT_BLUE, WHITE, TRANSPARENT } from "../constants/colors";
import { showResetPassword } from '../actions';
import * as RootNavigation from '../actions/RootNavigation.js';
import LoanShopperLogin from './common/LoanShopperLogin';
import ResetPassword from './ResetPassword';
import {  } from "../constants/banners";

class EmailSignIn extends Component {
    constructor(props) {
		super(props);
	}

    render () {
		const styles = getStyleSheet();
		//console.log(this.props)
    	return (
			<Card containerStyle={[styles.brokerCard, {backgroundColor:LOGO_BRIGHT_BLUE}]} 
				title={'Title'} titleStyle={styles.cardTitle} >
				<View style={styles.brokerCardPanel}>
					<LoanShopperLogin>
					<Icon.Button name={'email-lock'} size={40} borderRadius={10} 
						backgroundColor={ LOGO_DARK_BLUE}  color={WHITE} 
						iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
						disabled={true} >Login</Icon.Button></LoanShopperLogin>
				</View>
				<View style={styles.space} />
				<View style={styles.brokerCardPanel}>
					<Icon.Button name={'email-plus'} size={40} borderRadius={10} 
						backgroundColor={WHITE}  color={LOGO_DARK_BLUE} 
						iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
						onPress={() => {
							RootNavigation.navigate('EmailRegistration')
						}} >Sign up</Icon.Button>
				</View>
				<View style={styles.space} />
				<View style={styles.brokerCardPanel}>
					<Icon.Button name={'account-lock'} size={40} borderRadius={10} 
					backgroundColor={LOGO_BRIGHT_BLUE}  color={LOGO_DARK_BLUE} 
					style={{borderColor:WHITE, borderWidth:2,}}
					iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
					onPress={this.props.showResetPassword} >Forgot password</Icon.Button>
					<ResetPassword />
				</View>

			</Card>
        )
    }

}

const mapStateToProps = ({ }) => {
  return { };
};

export default connect(mapStateToProps, { showResetPassword })(EmailSignIn);