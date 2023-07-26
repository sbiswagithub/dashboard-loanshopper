import React, { Component } from "react";
import { View, Text, TextInput } from 'react-native';
import { Divider,  } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';
import { disclosureAmountUpdated, currencyToNumber  } from '../../actions';
import { LIAB_COL_L_BANNER, LIAB_COL_R_BANNER, CRED_CARD_BANNER, OTH_LOANS_BANNER, ZERO_DOLLAR_BANNER } from '../../constants/banners';
import { MAX_6_DIG } from '../../constants/disclosure';
import { CRED_CARD_UPDATED, OTH_LOANS_UPDATED, } from '../../actions/types';

class Liabilities extends Component {

	constructor(props) {
        super(props);
	}

	whenUpdated(eventType, text) {
		const amount = currencyToNumber(text);
		const liabAmount = amount > MAX_6_DIG ? MAX_6_DIG : amount;
		this.props.disclosureAmountUpdated(eventType, liabAmount);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
            <View style={styles.tableView}>

        		<View style={styles.tableHeader}>
    	        	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{LIAB_COL_L_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{LIAB_COL_R_BANNER}</Text>
    	    		</View>
        		</View>
    		    <Divider style={styles.tableDivider} />

        		<View style={styles.tableRow}>
    		    	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textMediumGray]}>{CRED_CARD_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>    		
    	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
    	    			clearTextOnFocus={true} keyboardType = 'number-pad'  
			    		onFocus={() => this.whenUpdated(CRED_CARD_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(CRED_CARD_UPDATED, text)}
			    		value={'$' + this.props.creditCards.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
    	    		</View>
        		</View>
            	<View style={styles.hrLight}/>    		

        		<View style={styles.tableRow}>
    		    	<View style={styles.tableColumn150}>    		
    	    		<Text style={[styles.textMediumGray]}>{OTH_LOANS_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>
    	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(OTH_LOANS_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(OTH_LOANS_UPDATED, text)}
			    		value={'$' + this.props.otherLoans.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
    	    		</View>
        		</View>

        	</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { creditCards, otherLoans } = disclosureReducer;
  return { creditCards, otherLoans };
};

export default connect(mapStateToProps, { disclosureAmountUpdated })(Liabilities);