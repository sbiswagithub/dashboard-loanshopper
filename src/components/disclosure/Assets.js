import React, { Component } from "react";
import { View, Text, TextInput } from 'react-native';
import { Divider,  } from 'react-native-paper';

import { connect } from 'react-redux';
import getStyleSheet from '../../styles/styles';
import { disclosureAmountUpdated, currencyToNumber  } from '../../actions';
import { ASSET_COL_L_BANNER, ASSET_COL_R_BANNER, CASH_SAVINGS_BANNER, ZERO_DOLLAR_BANNER, 
	VEHICLES_BANNER, INVESTMENTS_BANNER, OTHER_BANNER } from '../../constants/banners';
import { MAX_6_DIG } from '../../constants/disclosure';
import { CASH_SAV_UPDATED, VEHICLES_UPDATED, INVST_UPDATED, OTH_ASSETS_UPDATED, } 
	from '../../actions/types';

class Assets extends Component {

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
	    		<Text style={[styles.textSmallBoldGray]}>{ASSET_COL_L_BANNER}</Text>
	        	</View>
	
	    		<View style={styles.tableColumn100}>    		
	    		<Text style={[styles.textSmallBoldGray]}>{ASSET_COL_R_BANNER}</Text>
	    		</View>
    		</View>
		    <Divider style={styles.tableDivider} />

    		<View style={styles.tableRow}>
		    	<View style={styles.tableColumn150}>    		
	    		<Text style={[styles.textMediumGray]}>{CASH_SAVINGS_BANNER}</Text>
	        	</View>
	
	    		<View style={styles.tableColumn100}>    		
	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
	    			clearTextOnFocus={true} keyboardType = 'number-pad'  
	    			onFocus={() => this.whenUpdated(CASH_SAV_UPDATED, 0)}
	    			onChangeText={text => this.whenUpdated(CASH_SAV_UPDATED, text)}
		    		value={'$' + this.props.cashSavings.toLocaleString(undefined, {maximumFractionDigits:0})}
	    			placeholder={ZERO_DOLLAR_BANNER} />
	    		</View>
    		</View>
        	<View style={styles.hrLight}/>    		

    		<View style={styles.tableRow}>
		    	<View style={styles.tableColumn150}>    		
	    		<Text style={[styles.textMediumGray]}>{VEHICLES_BANNER}</Text>
	        	</View>
	
	    		<View style={styles.tableColumn100}>
	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
	    			clearTextOnFocus={true} keyboardType = 'number-pad'  
	    			onFocus={() => this.whenUpdated(VEHICLES_UPDATED, 0)}
	    			onChangeText={text => this.whenUpdated(VEHICLES_UPDATED, text)}
		    		value={'$' + this.props.vehicles.toLocaleString(undefined, {maximumFractionDigits:0})}
	    			placeholder={ZERO_DOLLAR_BANNER} />
	    		</View>
    		</View>
        	<View style={styles.hrLight}/>    		

    		<View style={styles.tableRow}>
		    	<View style={styles.tableColumn150}>    		
	    		<Text style={[styles.textMediumGray]}>{INVESTMENTS_BANNER}</Text>
	        	</View>
	
	    		<View style={styles.tableColumn100}>    		
	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
	    			clearTextOnFocus={true} keyboardType = 'number-pad'  
	    			onFocus={() => this.whenUpdated(INVST_UPDATED, 0)}
	    			onChangeText={text => this.whenUpdated(INVST_UPDATED, text)}
		    		value={'$' + this.props.investments.toLocaleString(undefined, {maximumFractionDigits:0})}
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
	    			onFocus={() => this.whenUpdated(OTH_ASSETS_UPDATED, 0)}
	    			onChangeText={text => this.whenUpdated(OTH_ASSETS_UPDATED, text)}
		    		value={'$' + this.props.otherAssets.toLocaleString(undefined, {maximumFractionDigits:0})}
	    			placeholder={ZERO_DOLLAR_BANNER} />
	    		</View>
    		</View>
    		
    		</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { cashSavings, vehicles, investments, otherAssets } = disclosureReducer;
  return { cashSavings, vehicles, investments, otherAssets };
};

export default connect(mapStateToProps, { disclosureAmountUpdated, currencyToNumber })(Assets);