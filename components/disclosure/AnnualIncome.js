import React, { Component } from "react";
import { View, Text, TextInput } from 'react-native';
import { Slider } from 'react-native-elements';

import { connect } from 'react-redux';
import getStyleSheet from '../../styles/styles';

import { GROSS_INC_BANNER, } from '../../constants/banners';
import { THUMB_COLOR } from '../../constants/common';
import { GROSS_INC_SLIDER_MAX, } from '../../constants/disclosure';
import { grossAnnualIncomeUpdated, currencyToNumber  } from '../../actions';

class AnnualIncome extends Component {

	constructor(props) {
        super(props);
	}

	whenUpdated(text) {
		const amount = currencyToNumber(text);
		// Annual Income in steps of 1000 capped to GROSS_INC_SLIDER_MAX
		const grossIncVal = amount > GROSS_INC_SLIDER_MAX ? GROSS_INC_SLIDER_MAX : (amount - (amount%1000));
		this.props.grossAnnualIncomeUpdated(grossIncVal);
	}

	render () {
    	const styles = getStyleSheet();
    	return (
    		<View style={{ flexDirection:'column', width:'80%', }}>

				<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{GROSS_INC_BANNER}</Text>
	   			<View style={styles.boxRow}>
		    		<View style={styles.boxCol60}>
			    		<Slider thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  
			    			maximumValue={GROSS_INC_SLIDER_MAX} value={this.props.grossIncAnn} onValueChange={value => this.whenUpdated(value)}  />
			        </View>
		    		<View style={styles.boxCol40}>
						<Text 
						style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>{'$' + this.props.grossIncAnn.toLocaleString(undefined, {maximumFractionDigits:0})}</Text>
			        </View>
		        </View>
    		</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { grossIncAnn } = disclosureReducer;
  return { grossIncAnn };
};

export default connect(mapStateToProps, { grossAnnualIncomeUpdated, currencyToNumber })(AnnualIncome);