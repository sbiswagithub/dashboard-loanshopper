import React, { Component } from "react";
import { View, Text  } from 'react-native';

import getStyleSheet from '../../styles/styles';  

export default  class TableRowTwinCells extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
		    <View style={styles.tableRow}>
		    	<View style={[styles.tableColumn50pct]}>    		
	    		<Text style={[styles.textSmallBoldLogoDarkBlue]}>{this.props.cellLeftText}</Text>
	        	</View>

	    		<View style={[styles.tableColumn50pct, this.props.cellRBorder ? {borderleftColor: '#1f215e', borderLeftWidth: 0.5} : {}]}>
	    		<Text style={[styles.textSmallBoldLogoPaleBlue, {marginLeft:3}]}>{this.props.cellRightText}</Text>
	    		</View>
    		</View>
        )	
    }
}
