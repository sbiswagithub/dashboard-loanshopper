import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, } from 'react-native';
import { Chip } from 'react-native-paper';
import { Slider } from 'react-native-elements';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';

import { BORROWING_BANNER, } from '../../constants/banners';
import { THUMB_COLOR } from '../../constants/common';
import { BORROWING_SLIDER_MAX, } from '../../constants/disclosure';
import { borrowingUpdated,homeLoanUpdated, currencyToNumber } from '../../actions';

class Refinance extends Component {

	constructor(props) {
        super(props);
        if (props.homeLoan > 0)
        	this.whenUpdated(props.homeLoan);
	}

	
	whenUpdated(text) {
		const amount = currencyToNumber(text);
		// Borrowing in steps of 10K capped to BORROWING_SLIDER_MAX
		const borrowingVal = amount > BORROWING_SLIDER_MAX ? BORROWING_SLIDER_MAX : (amount - (amount%10000));
		this.props.borrowingUpdated(borrowingVal);
		this.props.homeLoanUpdated(borrowingVal);
	}
	
    render () {
    	const styles = getStyleSheet();
    	return (
			<View>
    		    <View style={styles.disclosureBoxRow}>
        		<Text style={[styles.textMediumBoldGray]}>Total Loan Requirement</Text>
    		    </View>
    		    <View style={styles.disclosureBoxRow}>
		    		<View style={styles.stackedSimpleLayout}>
			    		<View style={styles.chipsLayout}>
					    	<Chip disabled='true' style={styles.chipNoticeable} textStyle={styles.textSmallBoldWhite}>First Mortgage</Chip>
					    	<Chip disabled='true' style={styles.chipNoticeable} textStyle={styles.textSmallBoldWhite}>Refinance</Chip>
				        </View>
	    		    </View>
    		    </View>
	   			<View style={styles.disclDivider}/>
		        <View style={[styles.disclosureBoxRow]}>
		    		<View style={{ flex: 0.9, flexDirection:'column'}}>
			   			<View style={styles.boxRow}>
				    		<View style={styles.boxCol60}>
				    		<Slider thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  
				    			maximumValue={BORROWING_SLIDER_MAX} value={0} />
					        </View>
				    		<View style={styles.boxCol40}>
								<Text style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>
								{'$' + this.props.borrowing.toLocaleString(undefined, {maximumFractionDigits:0})}
								</Text>
					        </View>
				        </View>
			    	</View>
    		    </View>
    		    <View style={styles.disclosureBoxRow}>
		    		<View style={styles.stackedSimpleLayout}>
			    		<View style={styles.chipsLayout}>
					    	<Chip disabled='true' style={styles.chipNormal} textStyle={styles.textSmallBoldWhite}>Residential</Chip>
					    	<Chip disabled='true' style={styles.chipNormal} textStyle={styles.textSmallBoldWhite}>Investment</Chip>
					    	<Chip disabled='true' style={styles.chipNormal} textStyle={styles.textSmallBoldWhite}>Both</Chip>
				        </View>
	    		    </View>
    		    </View>
    		</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer, homeReducer }) => {
  const { borrowing } = disclosureReducer;
  const { homeLoan } = homeReducer;
  return { borrowing, homeLoan };
};

export default connect(mapStateToProps, { borrowingUpdated, homeLoanUpdated })(Refinance);