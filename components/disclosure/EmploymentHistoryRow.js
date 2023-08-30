import React, { Component,  } from "react";
import { View, Text,  } from 'react-native';
import { connect } from 'react-redux';
import getStyleSheet from '../../styles/styles';
import {  } from '../../actions';
import {  } from "../../constants/colors";


class EmploymentHistoryRow extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
		    <View style={styles.tableRow}>
		    	<View style={styles.tableColumn40pct}>    		
	    		<Text style={[styles.textMediumSmallBlue]}>Employment history</Text>
	        	</View>

	    		<View style={styles.tableColumn60pct}>
	    		<Text style={[styles.textMediumLogoDarkBlue]}>{this.props.cellRightText}</Text>
	    		</View>
    		</View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const {  } = disclosureReducer;
  return {  };
};

export default connect(mapStateToProps, {  })(EmploymentHistoryRow);