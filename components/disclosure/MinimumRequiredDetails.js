import React, { Component } from "react";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import DateOfBirth from './DateOfBirth';
import AnnualIncome from  './AnnualIncome';
import EmploymentType from './EmploymentType';  
import ImmigrationStatus from './ImmigrationStatus';
import PrimaryProfessionSelect from './PrimaryProfessionSelect';
import CurrentAddressSelect from './CurrentAddressSelect';
import Dependants from './Dependants';

import { emailUpdated, mobileUpdated, } from '../../actions';
import { } from '../../constants/disclosure';
import { MAIN_BORR_HDR, BASIC_DETAILS } from '../../constants/banners';

class MinimumRequiredDetails extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
	        	<View>
	    		<View style={styles.space}/>
				<Text style={[styles.textMediumLogoDarkBlue,{ alignSelf:"center" }]} >Lets start with some basic details</Text>
				<View style={styles.space}/>
	    		
				<Text style={[styles.textSmallBoldGray, { alignSelf:"center" }]}>Current residential address</Text>
	    		<View style={styles.disclosureBoxRow}>
			    <CurrentAddressSelect />
    		    </View>
				<View style={styles.hrLight}/>
	    		<View style={styles.disclosureBoxWideRow}>
			    <DateOfBirth />
    		    </View>
				<View style={styles.hrLight}/>
	    		<View style={[styles.disclosureBoxRow]}>
		    	<AnnualIncome  />
    		    </View>			    
				<View style={styles.hrLight}/>
    		    <View style={[styles.disclosureBoxRow]}>
	    		<EmploymentType />
    		    </View>	    		    
				<View style={styles.hrLight}/>
	    		<View style={styles.disclosureBoxRow}>
			    <PrimaryProfessionSelect />
    		    </View>

				<View style={styles.hrLight}/>
	    		<View style={[styles.disclosureBoxRow]}>
	    		<ImmigrationStatus />
    		    </View>	    		    

				<View style={styles.hrLight}/>
	    		<View style={[styles.disclosureBoxRow]}>
		    	<Dependants  />
    		    </View>			    
			    
    		    </View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer, authReducer }) => {
  const { email, mobile } = disclosureReducer;
  const { borrower } = authReducer;
  return { email, mobile, borrower };
};

export default connect(mapStateToProps, { emailUpdated, mobileUpdated })(MinimumRequiredDetails);