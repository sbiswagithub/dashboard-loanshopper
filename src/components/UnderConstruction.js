import React, { Component } from "react";
import { Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../styles/styles';  
import {  } from '../constants/banners';

class UnderConstruction extends Component {

	constructor(props) {
        super(props);
    }

    render () {
    	const styles = getStyleSheet();
    	return (
        <SafeAreaView  style={styles.container}>
	    	<View style={styles.homeBox}>
		    	<ScrollView  style={styles.homeBoxColumn}>
		    		<View style={styles.homeBoxRow}>
			    	<Text style={styles.textSmallBoldPurple}>Still under construction...</Text>
					</View>
				</ScrollView >
   		    </View>
	    </SafeAreaView >
        )
    }
}

export default connect()(UnderConstruction);