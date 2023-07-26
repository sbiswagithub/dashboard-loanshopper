import React, { Component } from "react";
import { View, Text  } from 'react-native';
import { Divider } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';
import { EST_WEEKLY_BANNER, RENT_BANNER, GROCERIES_BANNER, LIFESTYLE_BANNER, COMMUTE_BANNER } from '../../constants/banners';
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
    	    		<Text style={[styles.textSmallBoldGray]}>{EST_WEEKLY_BANNER}</Text>
    	        	</View>
        		</View>
    		    <Divider style={styles.tableDivider} />

        		{ this.props.rent != 0 ? (
				    <TableRow cellLeftText={RENT_BANNER} cellRightText={numberToCurrency(this.props.rent)} />
    	        		) : null }

        		{ this.props.groceries != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={GROCERIES_BANNER} cellRightText={numberToCurrency(this.props.groceries)} />
					</View>
    	        		) : null }

        		{ this.props.lifestyle != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={LIFESTYLE_BANNER} cellRightText={numberToCurrency(this.props.lifestyle)} />
					</View>
    	        		) : null }

        		{ this.props.commute != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={COMMUTE_BANNER} cellRightText={numberToCurrency(this.props.commute)} />
					</View>
    	        		) : null }
    		    
		    </View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const {
    rent, 
    groceries,
    lifestyle,
    commute,
  } = disclosureReducer;
  return {
    rent, 
    groceries,
    lifestyle,
    commute,
  };
};

export default connect(mapStateToProps, {  })(SubmissionSection7);