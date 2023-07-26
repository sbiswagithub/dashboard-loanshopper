 import React, { Component, } from "react";
import { Linking, View, ScrollView, SafeAreaView, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';
import { connect } from "react-redux";

import getStyleSheet from '../../../../styles/styles';  
import { COGNITO_AUTH } from '../../../../constants/auth';
import { LOGIN, SIGNUP, } from '../../../../constants/banners';
import { handleFetchError, setAuthLogin, setAuthPassword, authenticatedBroker, onRedirect, toQueryString } from '../../../../actions';
import * as colors from "../../../../constants/colors";
import SpinnerHolder from '../../../common/SpinnerHolder';

function Buttons({props, doLogin}) {
    const styles = getStyleSheet();
	const navigation = useNavigation();

	return (
		<View style={[{width:"100%", alignItems:"center"}]}>
				<View style={styles.space}/>
				<View style={styles.space}/>
				<View style={{flexDirection:'row', justifyContent:"center", width:"45%", }}>
					<Icon.Button name="cloudupload" size={20} borderRadius={25}
						backgroundColor={colors.LOGO_DARK_BLUE} iconStyle={{margin:8}} 
						onPress={doLogin}
					>{LOGIN}</Icon.Button>
				</View>
				<View style={styles.space}/>
				<View style={styles.space}/>

				<View style={[styles.hrLogoDarkBlue, {width:"125%"}]}/>

				<View style={styles.space}/>
				<View style={styles.space}/>
				<View style={{flexDirection:'row', justifyContent:"center", width:"45%", }}>
					<Icon.Button name="cloudupload" size={20} borderRadius={25}
						backgroundColor={colors.LOGO_BRIGHT_BLUE} iconStyle={{margin:8}} style={{width:"150%"}} 
						onPress={() => { navigation.navigate("BrokerRegistration"); }} 
					>{SIGNUP}</Icon.Button>
				</View>
				<View style={styles.space}/>
				<View style={styles.space}/>

				<View style={[styles.hrLogoDarkBlue, {width:"125%"}]}/>

				<View style={styles.space}/>
				<View style={styles.space}/>
				<View style={{flexDirection:'column', }}>
				<Icon.Button name="closesquareo" size={20} borderRadius={25}
					backgroundColor={colors.TRANSPARENT} color={colors.LOGO_DARK_BLUE} iconStyle={{margin:8}} 
					onPress={() => { navigation.goBack(); }} 
					></Icon.Button>
				</View>
		</View>
	);
}
class BrokerPreEntry extends Component {

	constructor(props) {
        super(props);
    }
  
    render () {
		const styles = getStyleSheet();
    	return (
        <SafeAreaView style={styles.container}>
	        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
		    	<View style={[styles.stackedLayout, {width:"90%"}, styles.centreAligned]}>
		    		<View style={styles.space}/>
					<Image source={require('../../../../assets/LoanShopper_LR.png')}  style={styles.logoMastheadWide} />
		    		<View style={styles.space}/>
		    		<View style={styles.space}/>
		    		<View style={styles.space}/>
		    		<View style={styles.space}/>
					<View style={styles.space}/>
					<View style={styles.space}/>
					<Buttons props={this.props} doLogin={()=> {
						this._openAuthSessionAsync( COGNITO_AUTH.loginUrl + toQueryString(COGNITO_AUTH.authorizeQParams) )
					}} />
					<SpinnerHolder />
	   		    </View>
   		    </ScrollView>
		    

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
		Linking.addEventListener("url", this._handleRedirect);
	};

	_removeLinkingListener = () => {
		Linking.removeEventListener("url", this._handleRedirect);
	};
	
    _openAuthSessionAsync = async (url) => {
      try {
		////console.log("Opening browser");
		////console.log(url);

		this._addLinkingListener();

		//let result = await WebBrowser.openAuthSessionAsync(url);
		////console.log("Returned Auth session");
		////console.log(result);

		this._handleRedirect(result);

	} catch (error) {
        alert(error);
        ////console.log(error);
    }
    };

}


const mapStateToProps = ({ authReducer }) => {
  const { login, password, accessCode, appEntryMode, error, } = authReducer;
  return { login, password, accessCode, appEntryMode, error };
};

export default connect(mapStateToProps, { setAuthLogin, setAuthPassword, handleFetchError, authenticatedBroker , onRedirect, toQueryString })(BrokerPreEntry);