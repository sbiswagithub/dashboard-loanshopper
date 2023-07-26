import React, { Component } from "react";
import { View, Text, TextInput } from 'react-native';
import { Divider } from 'react-native-paper';

import { connect } from 'react-redux';
import getStyleSheet from '../../styles/styles';
import { disclosureAmountUpdated, currencyToNumber  } from '../../actions';
import { MAX_6_DIG } from '../../constants/disclosure';
import { WEEKLYSPEND_COL_L_BANNER, WEEKLYSPEND_COL_R_BANNER, RENT_BANNER, GROCERIES_BANNER, LIFESTYLE_BANNER, COMMUTE_BANNER, ZERO_DOLLAR_BANNER } from '../../constants/banners';
import { RENT_UPDATED, GROCERIES_UPDATED, LIFES_UPDATED, COMMUTE_UPDATED, } from '../../actions/types';

class WeeklySpend extends Component {

	constructor(props) {
        super(props);
	}

	whenUpdated(eventType, text) {
		const amount = currencyToNumber(text);
		const assetAmount = amount > MAX_6_DIG ? MAX_6_DIG : amount;
		this.props.disclosureAmountUpdated(eventType, assetAmount);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
                <View style={styles.tableView}>

        		<View style={styles.tableHeader}>
    	        	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{WEEKLYSPEND_COL_L_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{WEEKLYSPEND_COL_R_BANNER}</Text>
    	    		</View>
        		</View>
    		    <Divider style={styles.tableDivider} />

        		<View style={styles.tableRow}>
    		    	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textMediumGray]}>{RENT_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>    		
    	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
    	    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(RENT_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(RENT_UPDATED, text)}
			    		value={'$' + this.props.rent.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
    	    		</View>
        		</View>
            	<View style={styles.hrLight}/>    		

        		<View style={styles.tableRow}>
    		    	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textMediumGray]}>{GROCERIES_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>
    	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(GROCERIES_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(GROCERIES_UPDATED, text)}
			    		value={'$' + this.props.groceries.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
    	    		</View>
        		</View>
            	<View style={styles.hrLight}/>    		

        		<View style={styles.tableRow}>
    		    	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textMediumGray]}>{LIFESTYLE_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>
    	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(LIFES_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(LIFES_UPDATED, text)}
			    		value={'$' + this.props.lifestyle.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
    	    		</View>
        		</View>
            	<View style={styles.hrLight}/>    		

        		<View style={styles.tableRow}>
    		    	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textMediumGray]}>{COMMUTE_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>
    	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(COMMUTE_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(COMMUTE_UPDATED, text)}
			    		value={'$' + this.props.commute.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
    	    		</View>
        		</View>

        	</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { rent, groceries, lifestyle, commute } = disclosureReducer;
  return { rent, groceries, lifestyle, commute };
};

export default connect(mapStateToProps, { disclosureAmountUpdated })(WeeklySpend);