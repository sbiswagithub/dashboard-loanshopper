import React, { Component } from "react";
import { View } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import ClientConnections from '../clientConnections';

import getStyleSheet from '../../styles/styles';  
import ErrorDialog from '../ErrorDialog'
import {  } from "react-native-paper";
import { BACKGROUND_LIGHT_BLUE,WHITE, LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, BACKGROUND_LIGHT_GRAY } from '../../constants/colors';
import { handleFetchError, showMyConnections, showMyDocuments, showMyAccount } from "../../actions";

class Account extends Component {

	constructor(props) {
        super(props);
	}
	
    render () {
		//console.log(this.props)
		const styles = getStyleSheet();
    	return (
	    	<View style={[styles.container]}>
				<LinearGradient
					colors={[WHITE,BACKGROUND_LIGHT_BLUE]} style={styles.background}
					start={{x:0,y:1}} end={{x:0,y:0}} />

				<View style={{flexDirection:"row", justifyContent:"space-evenly", alignSelf:"stretch", alignItems:"center"}}>
					{this.props.modeMyBrokerConnections ? 
					<View style={{alignContent:"stretch"}}>
					<Card containerStyle={[styles.brokerCard, {backgroundColor:LOGO_BRIGHT_BLUE, alignSelf:"stretch"}]}  titleStyle={styles.cardTitle} >
						<FAIcon.Button name={'close'} size={40} borderRadius={10} 
							backgroundColor={LOGO_BRIGHT_BLUE}  color={LOGO_DARK_BLUE} 
							iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
							onPressIn={this.props.showMyAccount}
							>Close</FAIcon.Button>
					</Card>
					<ClientConnections /> 
					
					</View>
					:
					<Card containerStyle={[styles.brokerCard, {backgroundColor:LOGO_BRIGHT_BLUE, alignSelf:"flex-start"}]}  titleStyle={styles.cardTitle} >
						<FAIcon.Button name={'address-book'} size={40} borderRadius={10} 
							backgroundColor={LOGO_BRIGHT_BLUE}  color={LOGO_DARK_BLUE} 
							iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
							onPressIn={this.props.showMyConnections}
							>My broker connections</FAIcon.Button>
					</Card>}
					<Card containerStyle={[styles.brokerCard, {backgroundColor:BACKGROUND_LIGHT_GRAY, alignSelf:"flex-start"}]}  titleStyle={styles.cardTitle} >
						<Icon.Button name={'file-cloud'} size={40} borderRadius={10} 
							backgroundColor={BACKGROUND_LIGHT_GRAY}  color={WHITE} 
							disabled={true}
							iconStyle={{flexGrow:1, flexDirection:"row",  writingDirection:"rtl" }}
							>My documents</Icon.Button>
					</Card>
				</View>
				
				<ErrorDialog />
		    </View>    	
        )
    }
}


const mapStateToProps = ({ accountReducer }) => {

  return { ...accountReducer };
};

export default connect(mapStateToProps, {handleFetchError, showMyConnections, showMyDocuments, showMyAccount})(Account);