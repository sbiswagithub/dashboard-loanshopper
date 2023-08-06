import React, { Component, useState } from "react";
import { View, } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-elements';
import { Button, Paragraph, Dialog, Portal, } from 'react-native-paper';
import Moment from 'moment';

import getStyleSheet from '../styles/styles';  
import { LOGO_DARK_BLUE, LOGO_BRIGHT_BLUE, WHITE,  } from "../constants/colors";
import { showResetPassword, onRedirect } from '../actions';
import * as RootNavigation from '../actions/RootNavigation.js';
import LoanShopperLogin from './common/LoanShopperLogin';
import ResetPassword from './ResetPassword';
import {  } from "../constants/banners";

function Countdown ( props)  {
	const [visible,setVisible] = useState(props.show)
	const styles = getStyleSheet();

 	return (
	 <>
		<Icon.Button name={'email-plus'} size={40} borderRadius={10} 
			backgroundColor={WHITE}  color={LOGO_DARK_BLUE} 
			iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
			onPress={() => {
				if (Moment('12/08/2023','DD/MM/YYYY').isBefore(Moment(new Date())))
					RootNavigation.navigate('EmailRegistration')
				else
					setVisible(true)
			}} >Sign up</Icon.Button>	 
		<Portal>
			<Dialog visible={visible} style={{maxWidth:'50%', alignSelf:"center"}} >
			<Dialog.Title>Coming soon</Dialog.Title>
			<Dialog.Content><Paragraph style={styles.textLargeBoldLogoDarkBlue}>{'Launch date 12th August 2023'}</Paragraph></Dialog.Content>
			<Dialog.Actions>
				<Button onPress={() => {setVisible(false) }}>{'Close'}</Button>
			</Dialog.Actions>
			</Dialog>
		</Portal>
	</>
 )
}

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
				<LoanShopperLogin {...this.props}>
					{(onLoginPressed) => (
						<Icon.Button name={'email-lock'} onPress={onLoginPressed}
								backgroundColor={ LOGO_DARK_BLUE}  color={WHITE} size={40} borderRadius={10} 
								iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }} >Login</Icon.Button>
					)}
				</LoanShopperLogin>
				</View>
				<View style={styles.space} />
				<View style={styles.brokerCardPanel}>
					{(Moment('12/08/2023','DD/MM/YYYY').isAfter(Moment(new Date()))) ? <Countdown /> :
					<Icon.Button name={'email-plus'} size={40} borderRadius={10} 
						backgroundColor={WHITE}  color={LOGO_DARK_BLUE} 
						iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
						onPress={() => {
							RootNavigation.navigate('EmailRegistration')
						}} >Sign up</Icon.Button>}
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

export default connect(mapStateToProps, { showResetPassword,onRedirect })(EmailSignIn);