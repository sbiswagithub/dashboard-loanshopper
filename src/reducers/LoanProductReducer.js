import { amountOrDefault } from '../actions/Utils';
import { SELECT_DISPLAY_PRODUCT } from '../actions/types';
import { } from '../constants/review';
import { } from '../constants/apiUrls';
import { } from '../constants/banners';

const getPackageRatesAndFees = (payload) => {
	const ratesAndFees = payload?.ratesAndFees == null ? [] : Object
			.values(payload.ratesAndFees)
			.filter(item => item?.label != null) // Choose Fees
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
			payload?.discounts?.benefits?.benefit == null ?  [] : 
						payload?.discounts?.benefits?.benefit.map((element) => { return {'text':element}; }) );
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


const INITIAL_STATE = {
  selectedLoanProduct : null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_DISPLAY_PRODUCT:
      return {...state, selectedLoanProduct : action.payload}
    default:
      return state;
  }
};