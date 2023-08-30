import React, { Component } from "react";
import { View, Image, } from "react-native";
import { IconButton } from 'react-native-paper';

import getStyleSheet from '../../styles/styles';  

export default class Header extends Component {
	render() {
	    const styles = getStyleSheet();
	
		return (
			<View style={styles.header}>
				<IconButton icon="menu" size={30} color="#00b4f0"
					onPress={() => this.props.onTogglePress()}/>
		        <View style={{flex: 1, flexDirection:'column'}}>
					<Image src={require('../../assets/LoanShopper_LR.png')}  
						style={[styles.logoHeader, styles.centreAligned]} />
			    </View>
			</View>	   	
		);
	}
};