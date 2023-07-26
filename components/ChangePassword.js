import React, { Component } from "react";
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-elements';

import getStyleSheet from '../styles/styles';  
import { LOGO_DARK_BLUE, LOGO_BRIGHT_BLUE, WHITE } from "../constants/colors";
import {  } from '../actions';
import * as RootNavigation from '../actions/RootNavigation.js';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
	}

    render () {
		const styles = getStyleSheet();
		//console.log(this.props)
    	return (
			<Card containerStyle={[styles.brokerCard, {backgroundColor:LOGO_BRIGHT_BLUE}]} 
				title={'Title'} titleStyle={styles.cardTitle} >
				
			</Card>
        )
    }

}

const mapStateToProps = ({ authReducer }) => {
  const { password } = authReducer;
  return {  };
};

export default connect(mapStateToProps, {   })(ChangePassword);