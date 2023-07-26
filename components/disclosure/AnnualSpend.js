import React, { Component } from "react";
import { View, Text, TextInput } from 'react-native';
import { Divider } from 'react-native-paper';

import { connect } from 'react-redux';
import getStyleSheet from '../../styles/styles';
import { MAX_6_DIG } from '../../constants/disclosure';
import { ANNUALSPEND_COL_L_BANNER, ANNUALSPEND_COL_R_BANNER, 
	HOLIDAYS_BANNER, DENTAL_BANNER, UNANTICIPATED_BANNER, OTHER_BANNER, 
	ZERO_DOLLAR_BANNER } from '../../constants/banners';
import { HOLIDAYS_UPDATED, DENTAL_UPDATED, UNANTICIPATED_UPDATED, OTHER_ANNUAL_UPDATED, } 
	from '../../actions/types';
import { disclosureAmountUpdated, currencyToNumber  } from '../../actions';

class AnnualSpend extends Component {

	constructor(props) {
        super(props);
	}

	whenUpdated(eventType, text) {
		const amount = currencyToNumber(text);
		const correctAmount = amount > MAX_6_DIG ? MAX_6_DIG : amount;
		this.props.disclosureAmountUpdated(eventType, correctAmount);
	}	

    render () {
    	const styles = getStyleSheet();
    	return (
                <View style={styles.tableView}>

        		<View style={styles.tableHeader}>
    	        	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{ANNUALSPEND_COL_L_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{ANNUALSPEND_COL_R_BANNER}</Text>
    	    		</View>
        		</View>
    		    <Divider style={styles.tableDivider} />

        		<View style={styles.tableRow}>
    		    	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textMediumGray]}>{HOLIDAYS_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>    		
    	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
    	    			clearTextOnFocus={true} keyboardType = 'number-pad'  
        		    	onFocus={text => this.whenUpdated(HOLIDAYS_UPDATED, ZERO_DOLLAR_BANNER)}
		    			onChangeText={text => this.whenUpdated(HOLIDAYS_UPDATED, text)}
			    		value={'$' + this.props.holidays.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
    	    		</View>
        		</View>
            	<View style={styles.hrLight}/>    		

        		<View style={styles.tableRow}>
    		    	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textMediumGray]}>{DENTAL_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>    		
    	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
    	    			clearTextOnFocus={true} keyboardType = 'number-pad'  
        		    	onFocus={text => this.whenUpdated(DENTAL_UPDATED, ZERO_DOLLAR_BANNER)}
		    			onChangeText={text => this.whenUpdated(DENTAL_UPDATED, text)}
			    		value={'$' + this.props.dental.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
    	    		</View>
        		</View>
            	<View style={styles.hrLight}/>    		

        		<View style={styles.tableRow}>
    		    	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textMediumGray]}>{UNANTICIPATED_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>    		
    	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
    	    			clearTextOnFocus={true} keyboardType = 'number-pad'  
            		    onFocus={text => this.whenUpdated(UNANTICIPATED_UPDATED, ZERO_DOLLAR_BANNER)}
		    			onChangeText={text => this.whenUpdated(UNANTICIPATED_UPDATED, text)}
			    		value={'$' + this.props.unanticipated.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
    	    		</View>
        		</View>
            	<View style={styles.hrLight}/>    		

        		<View style={styles.tableRow}>
    		    	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textMediumGray]}>{OTHER_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>    		
    	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
    	    			clearTextOnFocus={true} keyboardType = 'number-pad'  
               		    onFocus={text => this.whenUpdated(OTHER_ANNUAL_UPDATED, ZERO_DOLLAR_BANNER)}
		    			onChangeText={text => this.whenUpdated(OTHER_ANNUAL_UPDATED, text)}
			    		value={'$' + this.props.otherAnnual.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
    	    		</View>
        		</View>

        	</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { holidays, dental, unanticipated, otherAnnual, } = disclosureReducer;
  return { holidays, dental, unanticipated, otherAnnual, };
}
export default connect(mapStateToProps, { disclosureAmountUpdated })(AnnualSpend);