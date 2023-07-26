import React, { Component } from "react";
import { View, Text  } from 'react-native';
import { Divider } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';
import { ASSETS_BANNER, CASH_SAVINGS_BANNER, VEHICLES_BANNER, INVESTMENTS_BANNER, OTHER_BANNER,	} from '../../constants/banners';
import { numberToCurrency  } from '../../actions';
import TableRow from './TableRow';

class SubmissionSection5 extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
            <View style={styles.tableView}>
        		<View style={styles.tableHeader}>
    	        	<View style={styles.tableColumn}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{ASSETS_BANNER}</Text>
    	        	</View>
        		</View>
    		    <Divider style={styles.tableDivider} />

        		{ this.props.cashSavings != 0 ? (
				    <TableRow cellLeftText={CASH_SAVINGS_BANNER} cellRightText={numberToCurrency(this.props.cashSavings)} />
    	        		) : null }

        		{ this.props.vehicles != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={VEHICLES_BANNER} cellRightText={numberToCurrency(this.props.vehicles)} />
					</View>

    	        		) : null }

        		{ this.props.investments != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={INVESTMENTS_BANNER} cellRightText={numberToCurrency(this.props.investments)} />
					</View>

    	        		) : null }

        		{ this.props.otherAssets != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={OTHER_BANNER} cellRightText={numberToCurrency(this.props.otherAssets)} />
					</View>
    	        		) : null }
		    </View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const {
    cashSavings, 
    vehicles, 
    investments, 
    otherAssets,
  } = disclosureReducer;
  return {
    cashSavings, 
    vehicles, 
    investments, 
    otherAssets,
  };
};

export default connect(mapStateToProps, {  })(SubmissionSection5);