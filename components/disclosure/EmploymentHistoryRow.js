import React, { Component,  } from "react";
import { View, Text,  } from 'react-native';
import { connect } from 'react-redux';
import getStyleSheet from '../../styles/styles';
import {  } from '../../actions';
import {  } from "../../constants/colors";
import EmploymentRecord from './EmploymentRecord'

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
					{this.props.employmentHistory.map(e => (
					<>
					{e.employerName == undefined || 
						e.position == undefined || 
						e.startDate == undefined || 
						(e.endDate == undefined && (e.isCurrent == false || e.isCurrent == undefined)) ? null : 
						<EmploymentRecord {...e}  />}
					</>
					))}

	    		</View>
    		</View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { employmentHistory } = disclosureReducer;
  return { employmentHistory  };
};

export default connect(mapStateToProps, {  })(EmploymentHistoryRow);