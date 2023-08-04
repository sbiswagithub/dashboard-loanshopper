import React, { Component } from "react";
import { View, Text  } from 'react-native';

import getStyleSheet from '../../styles/styles';  

function TextStack(props) {
	const styles = getStyleSheet();
	const stack = [];
	props.choices.forEach(element => {
			stack.push(
			<View key={element + new Date().getMilliseconds()}>
				<Text style={[element == props.selected?  styles.textMediumSmallLogoDarkBlue : styles.textSmallGray]}>{element}</Text>
				<View style={styles.space}/>
			</View>)
		})
		return (<View>{stack}</View>);
}


function TextStackFromMap(props) {
	const styles = getStyleSheet();
	const stack = [];
	Object.entries(props.choiceMap).map(([key, value])  => {
			stack.push(
			<View key={key + new Date().getMilliseconds()}>
				<Text style={[key == props.selected?  styles.textMediumSmallLogoDarkBlue : styles.textSmallGray]}>{value}</Text>
				<View style={styles.space}/>
			</View>)
		})
		return (<View>{stack}</View>);
}

function TextStackFromBooleanMap(props) {
	const styles = getStyleSheet();
	const stack = [];
	Object.entries(props.choiceMap).map(([key, value])  => {
			stack.push(
			<View key={key + new Date().getMilliseconds()}>
				<Text style={[value ?  styles.textMediumSmallLogoDarkBlue : styles.textSmallGray]}>{key}</Text>
				<View style={styles.space}/>
			</View>)
		})
		return (<View>{stack}</View>);
}

export default  class MultiChoiceTableRow extends Component {

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
					{this.props.choiceMap != null ? 
					this.props.cellRightText == null ? 
					<TextStackFromBooleanMap {...this.props} /> :
					<TextStackFromMap {...this.props} selected={this.props.cellRightText} /> :
					<TextStack {...this.props} selected={this.props.cellRightText} /> }
	    		</View>
    		</View>
        )	
    }
}
