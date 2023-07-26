import {
	ENTRY_BORROW_1, CLOSE_CALC, CALCULATE_BORROWING, 
	ENTRY_DISCLOSURE_2, CLOSE_DISCLOSURE,
	ENTRY_REVIEW_3, CLOSE_REVIEW,
    ENTRY_DEALS_4, CLOSE_DEALS,
	INCOME_PROFILE_SELECTED, NUM_DEPENDANTS_SET, INCOME_RANGE_SET, 
	INCOME_SOURCE_SELECTED, BORR_PURPOSE_SET, 
	BIRTH_YEAR_SELECTED,
	FROM_APPLICATION, TO_APPLICATION,
} from '../actions/types';
import { SINGLE_INC, JOINT_INC, 
	INC_RANGE_1, INC_RANGE_2, INC_RANGE_3, INC_RANGE_4,
	INC_SRC_SAL, INC_SRC_SELF, INC_SRC_BUS, } from '../constants/entry';
import Moment from 'moment';

const INITIAL_STATE = {
	// Application state		
	showButtons: true,

	showCalculator: false,
	borrowStep: 0,
	isInvestor: false,
	isSingle: true,
	isJoint: false,
	isIncomeRange1:true,
	isIncomeRange2:false,
	isIncomeRange3:false,
	isIncomeRange4:false,
	isSalaried:true, 
	isSelfEmployed:false, 
	isBusiness:false,
	
	showDisclosure: false,
	showReview: false,
	showDealInProgress: false,
	// API parameters
	numDependants : 0,
	birthYear:Moment().subtract(50,'years').format('YYYY'),

	applicationMode: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TO_APPLICATION:
	return { ...state, applicationMode: false};
  case FROM_APPLICATION:
	return { ...state, applicationMode: true};
  case ENTRY_BORROW_1:
	  return { ...state, borrowStep: 1, showDisclosure: false, showCalculator: true, showReview: false, showButtons: false, showDealInProgress: false };
  case ENTRY_DISCLOSURE_2:
	  return { ...state, showDisclosure: true, showCalculator: false, showReview: false, showButtons: false, showDealInProgress: false};
  case ENTRY_REVIEW_3:
	  return { ...state, showDisclosure: false, showCalculator: false, showReview: true, showButtons: false, showDealInProgress: false};
  case ENTRY_DEALS_4:
	  return { ...state, showDisclosure: false, showCalculator: false, showReview: false, showButtons: false, showDealInProgress: true};

  case CLOSE_REVIEW:
  case CLOSE_DISCLOSURE:
  case CLOSE_DEALS:
	  return { ...state, showDisclosure: false, showCalculator: false, showReview: false, showButtons: true, showDealInProgress: false};
  
  case BIRTH_YEAR_SELECTED:
	  return { ...state, borrowStep: 1, birthYear: action.payload};
  case INCOME_PROFILE_SELECTED:
	  return { ...state, borrowStep: 1, isSingle: SINGLE_INC === action.payload, isJoint: JOINT_INC === action.payload, };
  case NUM_DEPENDANTS_SET:
	  return { ...state, borrowStep: 1, numDependants: action.payload };
  case INCOME_RANGE_SET:
	  return { ...state, borrowStep: 1, 
		  isIncomeRange1: INC_RANGE_1 === action.payload, 
		  isIncomeRange2: INC_RANGE_2 === action.payload, 
		  isIncomeRange3: INC_RANGE_3 === action.payload, 
		  isIncomeRange4: INC_RANGE_4 === action.payload };
  case INCOME_SOURCE_SELECTED:
	  return { ...state, borrowStep: 1, 
		  isSalaried: 		INC_SRC_SAL === action.payload, 
		  isSelfEmployed: 	INC_SRC_SELF === action.payload, 
		  isBusiness: 		INC_SRC_BUS === action.payload };
  case BORR_PURPOSE_SET:
	  return { ...state, borrowStep: 1, isInvestor: !action.payload, };
  case CALCULATE_BORROWING:
	  return { ...state, borrowStep: 2, };
  case CLOSE_CALC:
	  return { ...state, 
	    showButtons: true,
	    showCalculator: false,
		borrowStep: 0,
		isInvestor: false,
		isSingle: true,
		isJoint: false,
		isIncomeRange1:true,
		isIncomeRange2:false,
		isIncomeRange3:false,
		isIncomeRange4:false,
		isSalaried:true, 
		isSelfEmployed:false, 
		isBusiness:false,
		numDependants : 0, };
  default:
      return state;
  }
};