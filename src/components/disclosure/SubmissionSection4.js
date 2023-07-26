import React, { Component } from "react";
import { View, Text  } from 'react-native';
import { Divider } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';
import { FULL_NAME_BANNER, EMAIL_BANNER, GROSS_INC_BANNER, COBORR_DETAILS_BANNER, } from '../../constants/banners';
import { numberToCurrency  } from '../../actions';
import TableRow from './TableRow';

class SubmissionSection4 extends Component {

	constructor(props) {
        super(props);
	}
	
    render () {
    	const styles = getStyleSheet();
    	return (
            <View style={styles.tableView}>
	    		<View style={styles.tableHeader}>
		        	<View style={styles.tableColumn}>    		
		    		<Text style={[styles.textSmallBoldGray]}>{COBORR_DETAILS_BANNER}</Text>
		        	</View>
	    		</View>
			    <Divider style={styles.tableDivider} />
    		    <TableRow cellLeftText={FULL_NAME_BANNER} cellRightText={this.props.titleCoBorr + ' ' + this.props.firstNameCoBorr + ' ' + this.props.lastNameCoBorr} />

        		{ this.props.validateEmail(this.props.coBorrowerEmail) ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={EMAIL_BANNER} cellRightText={this.props.coBorrowerEmail} />
					</View>
	        		) : null }
			    
        		{ this.props.coBorrGrossIncAnn != '' ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={GROSS_INC_BANNER} cellRightText={numberToCurrency(this.props.coBorrGrossIncAnn)} />
					</View>
	        		) : null }
			    
		    </View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const {
	    titleCoBorr,
	    firstNameCoBorr,
	    lastNameCoBorr,
	    coBorrowerEmail,
	    coBorrGrossIncAnn,
	    validateEmail,
  } = disclosureReducer;
  return {
	    titleCoBorr,
	    firstNameCoBorr,
	    lastNameCoBorr,
	    coBorrowerEmail,
	    coBorrGrossIncAnn,
	    validateEmail,
  };
};

export default connect(mapStateToProps, { numberToCurrency })(SubmissionSection4);