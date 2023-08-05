import React, { Component } from "react";
import { Text, View, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';

import getStyleSheet from '../../styles/styles';  
import { NOT_SPECIFIED_BANNER, DOCS_REQUIRED } from '../../constants/banners';
import { FEATURES, RATES_AND_FEES, DISCOUNTS_AND_OFFERS, SPECIAL_REQUIREMENTS, REQUIRED_DOCS } from '../../constants/review';

import { handleFetchError } from '../../actions';
import TableRowTwinCells from '../common/TableRowTwinCells';

const renderItem = ({ item }) => {
	const styles = getStyleSheet();
    return (
      <View key={item.label + new Date().getMilliseconds()}>
      	{ item?.text != null ? 
	      	<View style={[styles.tableRow, { padding:'2%'}]}>    		
    		<Text style={[styles.textMediumLogoDarkBlue]}>{item.text}</Text>
        	</View>
        	:
		    <TableRowTwinCells cellLeftText={item.label} cellRightText={item.value} />
	    }
	    <View style={styles.hr}/>
      </View>
    );
  };


const getFeatures = (payload, loanTermInYears, loanPurpose, lvr) => {
	const features = [
		{label: 'Loan product', 
			value: payload?.bundleName == null ? payload?.productName : payload.bundleName },
		{label: 'Loan category', 
			value: payload?.features?.loanInterestCategory },
		{label: 'Loan term', 
			value:  loanTermInYears + ' yrs'} ,
		{label: 'Rate option', 
			value:  payload?.features?.rateOption},
		{label: 'Loan purpose', 
			value:  loanPurpose ? 'Owner occupier' : 'Investor'},];

	if (payload?.features?.rateOption === 'Fixed')
		features.push(
			{label: 'Fixed term', value:  payload?.features?.fixedTermInMonths + ' months'},
		)
	if (lvr && lvr > 0)
		features.push(
			{label: 'LVR', value:  lvr + '%'});
	return features
}
const amountOrDefault = (amount, ifNull) => {
	return amount == null ? ifNull : '$' + amount;
};

const getPackageRatesAndFees = (payload) => {
	//console.log(payload?.ratesAndFees?.loanProductFees)
	const ratesAndFees = payload?.ratesAndFees == null ? [] : Object
			.values(payload.ratesAndFees.loanProductFees)
			.filter(item => item?.label != null && item?.amount?.value !== 0) // Choose Fees
			.map((fee) => {return {label:fee.label, value: amountOrDefault(fee?.amount?.value)}}); // Simplify as key value paid or label and amount
	ratesAndFees.push({label: 'Comparison rate', // Chose comparison rate
				value: payload?.ratesAndFees?.comparisonRatePI != null ?  
					payload?.ratesAndFees?.comparisonRatePI + '% p.a.' :
					payload?.ratesAndFees?.comparisonRateIO + '% p.a.' },
			{label: 'Interest rate', // Choose interest rate
				value: payload?.ratesAndFees?.interestRatePI != null ?  
					payload?.ratesAndFees?.interestRatePI + '% p.a.' :
					payload?.ratesAndFees?.interestRateIO + '% p.a.' });
	ratesAndFees.reverse();	// Rates first fees after
	return ratesAndFees.filter((element) => {return element?.value != null;});
}
const getPackageDiscountsAndOffers = (payload) => {
	const discountsAndBenefits = [			
			{label: 'Home loan discount', value: payload?.discounts?.homeLoanInterestRateDiscount == null ? null : payload?.discounts?.homeLoanInterestRateDiscount +  '%'},
			{label: 'Cash back amount', value: amountOrDefault(payload?.discounts?.cashbackAmount) },
		]
		.filter((element) => {return element?.value != null;})
		.concat(
			payload?.discounts?.transactionAccountFeeWaiver ?  [{'text':'Transaction account fee waived'}] : [] )
		.concat(
			payload?.benefit == null ?  [] : 
						payload?.benefit.map((element) => { return {'text':element}; }) )
		.concat(
			payload?.discount == null ?  [] : 
						payload?.discount.map((element) => { return {'text':element}; }) );
	return discountsAndBenefits;
}
const getSpecialRequirements = (payload) => {
	const specialRequirements = []
		.concat(
			payload?.specialRequirements?.salaryAccount ?  [{'text':'Salary account crediting requirement'}] : [] )
		.concat(
			payload?.specialRequirements?.lowDoc != null ?  [{'text':payload.specialRequirements.lowDoc}] : [] )
		.concat(
			payload?.specialRequirements?.bridging ?  [{'text':'Bridging finance required'}] : [] )
		.concat(
			payload?.specialRequirements?.badCredit ?  [{'text':'Low credit rating support required'}] : [] )
		.concat(
			payload?.specialRequirements?.familyPledge ?  [{'text':'Family pledge agreement'}] : [] )
		.concat(
			payload?.specialRequirements?.otherRequirements?.label == null ?  [] : 
				payload?.specialRequirements?.otherRequirements?.label.map((label)=> {return {'text':label};}) );
	return specialRequirements;
}
/*
 A proposal here contains loan package details and is transformed to support UI bindings of details tables
 {
  "_id": "LENDER-LP-1",
  "productId": "loanproduct-guid-nnnn",
  "discountsAndOffers": [{ "text": "Transaction account fee waived", }, ... ],
  "features": [{ "label": "Loan product", "value": "ANZ Standard Variable Home Loan",...
  "ratesAndFees": [{ "label": "Interest rate", "value": "2.09% p.a.", }, { "label": "Comparison rate",...
  "specialRequirements": [],
}
*/
const toProductDetailsTable = (link, proposal) => {
	//console.log(link?.loanProduct)
	return {
		_id: link?._id,
		productId: link?.loanProduct._id,
		features : getFeatures(link?.loanProduct, proposal?.loanPackage?.loanTermInYears, proposal?.loanRequest?.loanPurpose, proposal?.loanRequest?.lvr),
		ratesAndFees: getPackageRatesAndFees(link?.loanProduct),
		discountsAndOffers: getPackageDiscountsAndOffers(link?.loanProduct?.entitlements),
		specialRequirements: getSpecialRequirements(link?.loanProduct),
	};
};
  
class LoanProductDetails extends Component {

	constructor(props) {
        super(props);
    }

	getTableData(selectedView, payload) {
		switch (selectedView) {
		 	case FEATURES:
		 		return payload.features;
			case RATES_AND_FEES:
		 		return payload.ratesAndFees;
		 	case DISCOUNTS_AND_OFFERS:
		 		return payload.discountsAndOffers;
		 	case SPECIAL_REQUIREMENTS :
		 		return payload.specialRequirements;
			default:
		 		return [];
		 }
	}

	getEmptyPlaceholder() {
    	const styles = getStyleSheet();
	    return (
			<View  style={[{height:'100%'}]}>
	    		<Text style={[styles.textMediumBoldGray, {marginLeft:'5%'}]} >{NOT_SPECIFIED_BANNER}</Text>
	        </View>
	    );
	}


    render () {
		const styles = getStyleSheet();
		const productDetails = toProductDetailsTable(this.props.selectedLoanProduct, this.props.displayProposal)
		const data = this.getTableData(this.props.selectedView, productDetails);
    	return (
    		<View>
			{ 
			data.length == 0 ? this.getEmptyPlaceholder() :
				<View elevation={10} style={[]}>
		            	<FlatList
					        data={data}
					        renderItem={renderItem}
					        keyExtractor={(item) => item._id}
							keyboardShouldPersistTaps='handled' 
							scrollEnabled={false}
					      />
				    </View>
	        }
	        </View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalReducer, proposalCalendarReducer, loanProductReducer  }) => {
  const { displayProposal } = proposalCalendarReducer;
  const { selectedView, proposalDetails } = proposalReducer;
  const { selectedLoanProduct } = loanProductReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, selectedView, proposalDetails, displayProposal, selectedLoanProduct };
};

export default connect(mapStateToProps, { handleFetchError })(LoanProductDetails);