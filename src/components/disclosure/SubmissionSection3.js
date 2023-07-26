import React, { Component } from "react";
import { View, Text  } from 'react-native';
import { Divider } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';
import { LOAN_REQUIREMENTS, LOAN_PROCESSING, LOAN_AMOUNT, LOAN_PROFILE, LOAN_PURPOSE, LVR, RATE_PREFERENCE, FIRST_PREFERENCE, SECOND_PREFERENCE, 
	REPAYMENT_FREQUENCY, REPAYMENT_Y, REPAYMENT_M, REPAYMENT_F, REPAYMENT_W, EXTRAS, BRIDGING_FINANCE, OFFSET_ACCOUNT, HOME_INSURANCE, CREDIT_CARD, TX_ACCOUNT, SAV_ACCOUNT, HOME_AND_LAND_PKG, HOME_IMPROV_PKG, REDRAW_FACILITY, CURRENT_HOME_LOAN, CURRENT_REPAYMENT, CURRENT_HOME_LOAN_TYPE, CURRENT_LENDER, MORTGAGE_ADDRESSES } from '../../constants/banners';
import { numberToCurrency  } from '../../actions';
import TableRow from './TableRow';
import MultiChoiceTableRow from "./MultiChoiceTableRow";
import { FIRST_MORTGAGE, REFINANCE, NORMAL_PERIOD, LT_4_WEEKS, INVESTMENT, BOTH_RESI_AND_INVEST, RESIDENTIAL, FIXED, VARIABLE, SPLIT, 
	LEAST_INTEREST_RATE, LOWER_REPAYMENTS, LONGER_FIXED_TERM, SHORTER_LOAN_DURATION, 
	REPAYMENT_TYPE_Y, REPAYMENT_TYPE_M, REPAYMENT_TYPE_F, REPAYMENT_TYPE_W } from "../../constants/disclosure";

class SubmissionSection3 extends Component {

	constructor(props) {
        super(props);
	}
	
    render () {
		const styles = getStyleSheet();
		const repaymentChoices = {};
		repaymentChoices[REPAYMENT_TYPE_Y] = REPAYMENT_Y
		repaymentChoices[REPAYMENT_TYPE_M] = REPAYMENT_M
		repaymentChoices[REPAYMENT_TYPE_F] = REPAYMENT_F
		repaymentChoices[REPAYMENT_TYPE_W] = REPAYMENT_W
		const extrasChoices = {};
		extrasChoices[BRIDGING_FINANCE] = this.props.includeBridgingFinance
		extrasChoices[OFFSET_ACCOUNT] = this.props.offsetAccount
		extrasChoices[HOME_INSURANCE] = this.props.homeInsurance
		extrasChoices[CREDIT_CARD] = this.props.creditCard
		extrasChoices[TX_ACCOUNT] = this.props.transactionsAccount
		extrasChoices[SAV_ACCOUNT] = this.props.savingsAccount
		extrasChoices[HOME_AND_LAND_PKG] = this.props.homeAndLandPackage
		extrasChoices[HOME_IMPROV_PKG] = this.props.homeImprovementPackage
		extrasChoices[REDRAW_FACILITY] = this.props.redraw
		const addresses = {};
		for (const [index, item] of this.props.mortgageAddressesList.entries()) {
			addresses[item.fullAddress] = true
		}		


    	return (
            <View style={styles.tableView}>
        		<View style={styles.tableHeader}>
    	        	<View style={styles.tableColumn}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{LOAN_REQUIREMENTS}</Text>
    	        	</View>
        		</View>
    		    <Divider style={styles.tableDivider} />
    		    
        		{ this.props.borrowing > 0 ? (
        			<View>
	    		    <TableRow cellLeftText={LOAN_AMOUNT} cellRightText={numberToCurrency(this.props.borrowing)} />
    	        	</View>
    	        		) : null }

        		{ this.props.lvr != null ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
	    		    <TableRow cellLeftText={LVR} cellRightText={this.props.lvr + '%'} />
    	        	</View>
    	        		) : null }

        		{ this.props.loanProfile != null ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
	    		    <MultiChoiceTableRow cellLeftText={LOAN_PROFILE} cellRightText={this.props.loanProfile} choices={[FIRST_MORTGAGE, REFINANCE]} />
    	        	</View>
    	        		) : null }

        		{ this.props.loanProcessing !=  '' ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
	    		    <MultiChoiceTableRow cellLeftText={LOAN_PROCESSING} cellRightText={this.props.loanProcessing} choices={[NORMAL_PERIOD, LT_4_WEEKS]} />
    	        	</View>
    	        		) : null }

        		{ this.props.loanPurpose !=  '' ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
	    		    <MultiChoiceTableRow cellLeftText={LOAN_PURPOSE} cellRightText={this.props.loanPurpose} choices={[RESIDENTIAL, INVESTMENT, BOTH_RESI_AND_INVEST]} />
    	        	</View>
    	        		) : null }
    		    
        		{ this.props.mortgageAddressesList !=  null ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
				<MultiChoiceTableRow cellLeftText={MORTGAGE_ADDRESSES}  choiceMap={addresses} />
    	        	</View>
    	        		) : null }
    		    
        		{ this.props.ratePreference !=  null ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
	    		    <MultiChoiceTableRow cellLeftText={RATE_PREFERENCE} cellRightText={this.props.ratePreference} choices={[FIXED, VARIABLE, SPLIT]} />
    	        	</View>
    	        		) : null }

        		{ this.props.firstPreference !=  null ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
	    		    <MultiChoiceTableRow cellLeftText={FIRST_PREFERENCE} cellRightText={this.props.firstPreference} choices={[LEAST_INTEREST_RATE, LOWER_REPAYMENTS, LONGER_FIXED_TERM, SHORTER_LOAN_DURATION]} />
    	        	</View>
    	        		) : null }

        		{ this.props.secondPreference !=  null ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
	    		    <MultiChoiceTableRow cellLeftText={SECOND_PREFERENCE} cellRightText={this.props.secondPreference} choices={[LEAST_INTEREST_RATE, LOWER_REPAYMENTS, LONGER_FIXED_TERM, SHORTER_LOAN_DURATION]} />
    	        	</View>
    	        		) : null }

        		{ this.props.repaymentPreference !=  null ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
					<MultiChoiceTableRow cellLeftText={REPAYMENT_FREQUENCY} cellRightText={this.props.repaymentPreference} 
					choiceMap={repaymentChoices} />
    	        	</View>
    	        		) : null }

				<View>
				<View style={styles.hrLight}/>    		
				<MultiChoiceTableRow cellLeftText={EXTRAS}  choiceMap={extrasChoices} />
				</View>

        		{ this.props.currentLender !=  null ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
	    		    <TableRow cellLeftText={CURRENT_LENDER} cellRightText={this.props.currentLender} />
    	        	</View>
    	        		) : null }

        		{ this.props.currentHomeLoan !=  null ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
	    		    <TableRow cellLeftText={CURRENT_HOME_LOAN} cellRightText={'Between ' + numberToCurrency(this.props.currentHomeLoan - 1000) + ' and ' + numberToCurrency(this.props.currentHomeLoan)} />
    	        	</View>
    	        		) : null }
    		    
        		{ this.props.currentRepayment !=  null ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
	    		    <TableRow cellLeftText={CURRENT_REPAYMENT} cellRightText={'Between ' + numberToCurrency(this.props.currentRepayment - 50) + ' and ' + numberToCurrency(this.props.currentRepayment)} />
    	        	</View>
    	        		) : null }

        		{ this.props.currentHomeLoanType !=  null ? (
        			<View>
		        	<View style={styles.hrLight}/>    		
	    		    <TableRow cellLeftText={CURRENT_HOME_LOAN_TYPE} cellRightText={this.props.currentHomeLoanType} />
    	        	</View>
    	        		) : null }

		    </View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {

  return {
	...disclosureReducer
  };
};

export default connect(mapStateToProps, {  })(SubmissionSection3);