import React, { Component } from "react";
import { View, Text  } from 'react-native';
import { Divider } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';
import { OTHER_BANNER, EST_ANNUAL_BANNER, HOLIDAYS_BANNER, DENTAL_BANNER, UNANTICIPATED_BANNER, } from '../../constants/banners';
import { numberToCurrency } from '../../actions';
import TableRow from './TableRow';

class SubmissionSection9 extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
            <View style={styles.tableView}>
        		<View style={styles.tableHeader}>
    	        	<View style={styles.tableColumn}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{EST_ANNUAL_BANNER}</Text>
    	        	</View>
        		</View>
    		    <Divider style={styles.tableDivider} />

        		{ this.props.holidays != 0 ? (
				    <TableRow cellLeftText={HOLIDAYS_BANNER} cellRightText={numberToCurrency(this.props.holidays)} />
    	        		) : null }

        		{ this.props.dental != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={DENTAL_BANNER} cellRightText={numberToCurrency(this.props.dental)} />
					</View>
    	        		) : null }

        		{ this.props.unanticipated != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={UNANTICIPATED_BANNER} cellRightText={numberToCurrency(this.props.unanticipated)} />
					</View>
    	        		) : null }

        		{ this.props.otherAnnual != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={OTHER_BANNER} cellRightText={numberToCurrency(this.props.otherAnnual)} />
					</View>
    	        		) : null }

		    </View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const {
    holidays,
    dental,
    unanticipated,
    otherAnnual, 
  } = disclosureReducer;
  return {
    holidays,
    dental,
    unanticipated,
    otherAnnual, 
  };
};

export default connect(mapStateToProps, {  })(SubmissionSection9);