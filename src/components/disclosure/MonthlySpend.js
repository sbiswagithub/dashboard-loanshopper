import React, { Component } from "react";
import { View, Text, TextInput } from 'react-native';
import { Divider } from 'react-native-paper';

import { connect } from 'react-redux';
import getStyleSheet from '../../styles/styles';
import { MAX_6_DIG } from '../../constants/disclosure';
import { MONTHLYSPEND_COL_L_BANNER, MONTHLYSPEND_COL_R_BANNER, 
	POWER_BANNER, WATER_BANNER, PHONES_BANNER, INTERNET_BANNER, CABLE_AND_STREAMING_BANNER, 
	LIFE_INSURANCE_BANNER, HEALTH_INSURANCE_BANNER, 
	VEHICLE_INSURANCE_BANNER, HOME_CONTENTS_INSURANCE_BANNER,
	ZERO_DOLLAR_BANNER } from '../../constants/banners';
import { POWER_UPDATED, WATER_UPDATED, PHONES_UPDATED, INTERNET_UPDATED, CABLE_AND_STREAMING_UPDATED, 
	LIFE_INSURANCE_UPDATED, HEALTH_INSURANCE_UPDATED, 
	VEHICLE_INSURANCE_UPDATED, HOME_CONTENTS_INSURANCE_UPDATED, } 
	from '../../actions/types';
import { disclosureAmountUpdated, currencyToNumber  } from '../../actions';

class MonthlySpend extends Component {

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
    	    		<Text style={[styles.textSmallBoldGray]}>{MONTHLYSPEND_COL_L_BANNER}</Text>
    	        	</View>
    	
    	    		<View style={styles.tableColumn100}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{MONTHLYSPEND_COL_R_BANNER}</Text>
    	    		</View>
        		</View>
    		    <Divider style={styles.tableDivider} />

	    		<View style={styles.tableRow}>
			    	<View style={styles.tableColumn150}>    		
		    		<Text style={[styles.textMediumGray]}>{POWER_BANNER}</Text>
		        	</View>
		
		    		<View style={styles.tableColumn100}>    		
		    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(POWER_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(POWER_UPDATED, text)}
			    		value={'$' + this.props.power.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
		    		</View>
	    		</View>
	        	<View style={styles.hrLight}/>    		
	
	    		<View style={styles.tableRow}>
			    	<View style={styles.tableColumn150}>    		
		    		<Text style={[styles.textMediumGray]}>{WATER_BANNER}</Text>
		        	</View>
		
		    		<View style={styles.tableColumn100}>    		
		    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(WATER_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(WATER_UPDATED, text)}
			    		value={'$' + this.props.water.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
		    		</View>
				</View>
	        	<View style={styles.hrLight}/>    		

	    		<View style={styles.tableRow}>
			    	<View style={styles.tableColumn150}>    		
		    		<Text style={[styles.textMediumGray]}>{PHONES_BANNER}</Text>
		        	</View>
		
		    		<View style={styles.tableColumn100}>    		
		    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(PHONES_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(PHONES_UPDATED, text)}
			    		value={'$' + this.props.phones.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
		    		</View>
	    		</View>
	        	<View style={styles.hrLight}/>    		
	
	    		<View style={styles.tableRow}>
			    	<View style={styles.tableColumn150}>    		
		    		<Text style={[styles.textMediumGray]}>{INTERNET_BANNER}</Text>
		        	</View>
		
		    		<View style={styles.tableColumn100}>    		
		    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(INTERNET_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(INTERNET_UPDATED, text)}
			    		value={'$' + this.props.internet.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
		    		</View>
				</View>
	        	<View style={styles.hrLight}/>    		
	
	    		<View style={styles.tableRow}>
			    	<View style={styles.tableColumn150}>    		
		    		<Text style={[styles.textMediumGray]}>{CABLE_AND_STREAMING_BANNER}</Text>
		        	</View>
		
		    		<View style={styles.tableColumn100}>    		
		    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(CABLE_AND_STREAMING_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(CABLE_AND_STREAMING_UPDATED, text)}
			    		value={'$' + this.props.cableAndStreaming.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
		    		</View>
				</View>
	        	<View style={styles.hrLight}/>    		
	
	    		<View style={styles.tableRow}>
			    	<View style={styles.tableColumn150}>    		
		    		<Text style={[styles.textMediumGray]}>{LIFE_INSURANCE_BANNER}</Text>
		        	</View>
		
		    		<View style={styles.tableColumn100}>    		
		    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(LIFE_INSURANCE_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(LIFE_INSURANCE_UPDATED, text)}
			    		value={'$' + this.props.lifeInsurancePrem.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
		    		</View>
				</View>
	        	<View style={styles.hrLight}/>    		
	
	    		<View style={styles.tableRow}>
			    	<View style={styles.tableColumn150}>    		
		    		<Text style={[styles.textMediumGray]}>{HEALTH_INSURANCE_BANNER}</Text>
		        	</View>
		
		    		<View style={styles.tableColumn100}>    		
		    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(HEALTH_INSURANCE_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(HEALTH_INSURANCE_UPDATED, text)}
			    		value={'$' + this.props.healthInsurancePrem.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
		    		</View>
				</View>
	        	<View style={styles.hrLight}/>    		
	
	    		<View style={styles.tableRow}>
			    	<View style={styles.tableColumn150}>    		
		    		<Text style={[styles.textMediumGray]}>{VEHICLE_INSURANCE_BANNER}</Text>
		        	</View>
		
		    		<View style={styles.tableColumn100}>    		
		    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(VEHICLE_INSURANCE_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(VEHICLE_INSURANCE_UPDATED, text)}
			    		value={'$' + this.props.vehicleInsurancePrem.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
		    		</View>
				</View>
	        	<View style={styles.hrLight}/>    		
	
	    		<View style={styles.tableRow}>
			    	<View style={styles.tableColumn150}>    		
		    		<Text style={[styles.textMediumGray]}>{HOME_CONTENTS_INSURANCE_BANNER}</Text>
		        	</View>
		
		    		<View style={styles.tableColumn100}>    		
		    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
		    			clearTextOnFocus={true} keyboardType = 'number-pad'  
		    			onFocus={() => this.whenUpdated(HOME_CONTENTS_INSURANCE_UPDATED, 0)}
		    			onChangeText={text => this.whenUpdated(HOME_CONTENTS_INSURANCE_UPDATED, text)}
			    		value={'$' + this.props.homeContentsInsurancePrem.toLocaleString(undefined, {maximumFractionDigits:0})}
		    			placeholder={ZERO_DOLLAR_BANNER} />
		    		</View>
				</View>

        	</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { power, water, phones, internet, cableAndStreaming, 
	  lifeInsurancePrem, healthInsurancePrem, 
	  vehicleInsurancePrem, homeContentsInsurancePrem } = disclosureReducer;
  return { power, water, phones, internet, cableAndStreaming, 
	  lifeInsurancePrem, healthInsurancePrem, 
	  vehicleInsurancePrem, homeContentsInsurancePrem };
};


export default connect(mapStateToProps, { disclosureAmountUpdated })(MonthlySpend);