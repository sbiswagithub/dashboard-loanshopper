import React, { Component, } from "react";
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-elements';

import getStyleSheet from '../styles/styles';  
import { LOGO_DARK_BLUE, LOGO_BRIGHT_BLUE, WHITE,  } from "../constants/colors";
import { showResetPassword, onRedirect } from '../actions';
import * as RootNavigation from '../actions/RootNavigation.js';
import LoanShopperLogin from './common/LoanShopperLogin';
import ResetPassword from './ResetPassword';
import {  } from "../constants/banners";
import { LINKEDIN_AUTH, FACEBOOK_AUTH } from '../constants/auth';
import { toQueryString } from '../actions/Utils'


class EmailSignIn extends Component {
    constructor(props) {
		super(props);
	}

    render () {
		const styles = getStyleSheet();
		//console.log(this.props)
		//console.log(Moment('12/08/2023','DD/MM/YYYY').isBefore(Moment(new Date())))
    	return (
			<Card containerStyle={[styles.brokerCard, {backgroundColor:LOGO_BRIGHT_BLUE}]}  titleStyle={styles.cardTitle} >
				<View style={styles.brokerCardPanel}>
				<LoanShopperLogin {...this.props}  >
					{(onLoginPressed) => (
						<Icon.Button name={'email-lock'} onPress={onLoginPressed}
								backgroundColor={ LOGO_DARK_BLUE}  color={WHITE} size={40} borderRadius={10} 
								iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }} >Login</Icon.Button>
					)}
				</LoanShopperLogin>
				</View>
				<View style={styles.space} />
				<View style={styles.brokerCardPanel}>
					<Icon.Button name={'email-plus'} size={40} borderRadius={10} 
						backgroundColor={WHITE}  color={LOGO_DARK_BLUE} 
						iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
						onPress={() => {
							RootNavigation.navigate('EmailRegistration')
						}} >Sign up</Icon.Button>				</View>
				<View style={styles.space} />
				<View style={styles.brokerCardPanel}>
					<Icon.Button name={'account-lock'} size={40} borderRadius={10} 
					backgroundColor={LOGO_BRIGHT_BLUE}  color={LOGO_DARK_BLUE} 
					style={{borderColor:WHITE, borderWidth:2,}}
					iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
					onPress={this.props.showResetPassword} >Forgot password</Icon.Button>
					<ResetPassword />
				</View>
				<View style={styles.space} />

				<View style={[styles.loginRow]}>
					<View style={[{flexDirection:"row", flex: 1, justifyContent:"space-between", alignSelf:"center"}]}>
						<View style={[styles.hr, {alignSelf:"stretch", width:'40%'}]}/>
						<Text style={styles.textMediumBoldWhite}>OR</Text>
						<View style={[styles.hr, {alignSelf:"stretch", width:'40%'}]}/>
					</View>
				</View>
				<View style={styles.space} />
				<View style={styles.loginRow}>
					<LoanShopperLogin {...this.props} url={LINKEDIN_AUTH.linkedInUrl + toQueryString(LINKEDIN_AUTH.linkedInQParams)} >
					{(onLoginPressed) => (
						<Image style={[{width:'400px', height:'50px', borderWidth:2 , borderRadius:10, borderColor:WHITE }]} source={require('../assets/linkedin.png')} onPress={onLoginPressed} />
					)}
					</LoanShopperLogin>
				</View>

			</Card>
        )
    }

}

const mapStateToProps = ({ }) => {
  return { };
};

export default connect(mapStateToProps, { showResetPassword,onRedirect })(EmailSignIn);