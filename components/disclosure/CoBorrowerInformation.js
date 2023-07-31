import React, { Component } from "react";
import { View, TextInput, Text  } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import CoBorrowerAnnualIncome from './CoBorrowerAnnualIncome';
import CoBorrowerName from './CoBorrowerName';

import { coBorrowerEmailUpdated } from '../../actions';
import { EMAIL_DEFAULT, CO_BORR_BANNER, } from '../../constants/disclosure';
import { NULL } from '../../constants/common';

class CoBorrowerInformation extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
	        	<View >

    		    <View style={styles.disclosureBoxRow}>
        		<Text style={[styles.textMediumBoldGray]}>{CO_BORR_BANNER}</Text>
    		    </View>

    		    <View style={styles.disclosureBoxRow}>
				<Text style={[styles.textMediumLogoDarkBlue,{ alignSelf:"center" }]} >If the application includes more than one applicant, include the second applicant's name, email contact and estimated gross annual income.</Text>
    		    </View>


	    		<View style={styles.disclosureBoxRow}>
			    <CoBorrowerName />
    		    </View>
				<View style={styles.space} />

    		    <View style={[styles.disclosureBoxRow, {width:'80%', alignSelf:"center"}]}>
				<TextInput 
				    	style={this.props.hasValidCoborrowerEmail ? 
				    			[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned] : 
				    				[styles.whiteBgCentredTextInput, styles.disclTextEntryWide, styles.centreAligned, {color:'red'}]} 
			    		clearTextOnFocus={true} placeholder={EMAIL_DEFAULT}
			    		onFocus={() => this.props.coBorrowerEmailUpdated(NULL)}
			    		onChangeText={text => this.props.coBorrowerEmailUpdated(text)}
		    			autoCompleteType="email" textContentType="emailAddress" autoCapitalize="none"
  		      			value={this.props.coBorrowerEmail}  />
    		    </View>

				<View style={styles.space} />
				
	    		<View style={styles.disclosureBoxRow, {width:'80%', alignSelf:"center"}}>
			    <CoBorrowerAnnualIncome />
    		    </View>
			    
    		    </View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { coBorrowerEmail, hasValidCoborrowerEmail } = disclosureReducer;
  return { coBorrowerEmail, hasValidCoborrowerEmail };
};

export default connect(mapStateToProps, { coBorrowerEmailUpdated })(CoBorrowerInformation);