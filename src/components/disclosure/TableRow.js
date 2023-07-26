import React, { Component } from "react";
import { View, Text  } from 'react-native';

import getStyleSheet from '../../styles/styles';  

export default  class TableRow extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
		    <View style={styles.tableRow}>
		    	<View style={styles.tableColumn40pct}>    		
	    		<Text style={[styles.textMediumSmallBlue]}>{this.props.cellLeftText}</Text>
	        	</View>

	    		<View style={styles.tableColumn60pct}>
	    		<Text style={[styles.textMediumLogoDarkBlue]}>{this.props.cellRightText}</Text>
	    		</View>
    		</View>
        )	
    }
}
