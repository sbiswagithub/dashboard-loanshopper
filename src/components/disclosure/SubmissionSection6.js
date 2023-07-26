import React, { Component } from "react";
import { View, Text  } from 'react-native';
import { Divider } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';
import { LIABILITIES_BANNER, CRED_CARD_BANNER, OTH_LOANS_BANNER, } from '../../constants/banners';
import { numberToCurrency  } from '../../actions';
import TableRow from './TableRow';

class SubmissionSection7 extends Component {

	constructor(props) {
        super(props);
	}
    render () {
    	const styles = getStyleSheet();
    	return (
                <View style={styles.tableView}>
        		<View style={styles.tableHeader}>
    	        	<View style={styles.tableColumn}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{LIABILITIES_BANNER}</Text>
    	        	</View>
        		</View>
    		    <Divider style={styles.tableDivider} />
        		{ this.props.creditCards != 0 ? (
				    <TableRow cellLeftText={CRED_CARD_BANNER} cellRightText={numberToCurrency(this.props.creditCards)} />
    	        		) : null }

        		{ this.props.otherLoans != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={OTH_LOANS_BANNER} cellRightText={numberToCurrency(this.props.otherLoans)} />
					</View>
    	        		) : null }
		    </View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const {
    creditCards,
    otherLoans,
  } = disclosureReducer;
  return {
    creditCards,
    otherLoans,
  };
};

export default connect(mapStateToProps, {  })(SubmissionSection7);