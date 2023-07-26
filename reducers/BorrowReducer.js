import {
	MAIN_APPL_INC_UPDATED, JOINT_APPL_INC_UPDATED, BORR_TERM_UPDATED, DEPENDANTS_UPDATED, INTEREST_RATE_UPDATED,
	BORROWING_ESTIMATES_RETURNED, SHOW_TOOLTIP,
} from '../actions/types';

const INITIAL_STATE = {
	// Application state		
	mainApplicantAnnualIncome: 50000,
	jointApplicantAnnualIncome: 0,
	borrowingTerm:30,
	numDependants: 0,
	interestRate: 1,
	borrowingEstimates: {},
	milestoneYears: [],
	lowReducingBalances: [0,0,0,0,0,0],
	highReducingBalances: [0,0,0,0,0,0],
	interestAndPrincipal: [[1,2], [3,4],],
	// These values will never be seen but are required as defaults for the screen to render
	borrowingEstimatesData: [[10],[10],],
	weeklyInstalmentsData: [[10],[10],],
	colorDarkBlue: "#20225d",
	colorPaleBlue: "#00b4f0",
	indexData:null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MAIN_APPL_INC_UPDATED:
	  return { ...state, mainApplicantAnnualIncome: action.payload };
  case JOINT_APPL_INC_UPDATED:
	  return { ...state, jointApplicantAnnualIncome: action.payload };
  case BORR_TERM_UPDATED:
	  return { ...state, borrowingTerm: action.payload };
  case DEPENDANTS_UPDATED:
	  return { ...state, numDependants: action.payload };
  case INTEREST_RATE_UPDATED:  
	  return { ...state, interestRate: action.payload };
  case BORROWING_ESTIMATES_RETURNED:
	  return { ...state, borrowingEstimates: action.payload, 
	  	milestoneYears: action.payload.borrowingEstimatePrecise.milestoneYears ,
	  	lowReducingBalances: action.payload.borrowingEstimateLow.reducingBalances.map((money) => money.value),
	  	highReducingBalances: action.payload.borrowingEstimateHigh.reducingBalances.map((money) => money.value),
	  	interestAndPrincipal: [
	  		[action.payload.borrowingEstimateLow.principalAmount.value,action.payload.borrowingEstimateLow.totalInterestAmount.value],
	  		[action.payload.borrowingEstimateHigh.principalAmount.value,action.payload.borrowingEstimateHigh.totalInterestAmount.value],
	  	],
	  	borrowingEstimatesData: [
	  		[action.payload.borrowingEstimateLow.principalAmount.value],
	  		[action.payload.borrowingEstimateHigh.principalAmount.value]
	  	],
	  	weeklyInstalmentsData: [
	  		[action.payload.borrowingEstimateLow.instalmentAmount.value],
	  		[action.payload.borrowingEstimateHigh.instalmentAmount.value]
	  	],
	  	};
  case SHOW_TOOLTIP:  
	  return { ...state, indexData: action.payload };
    default:
      return state;
  }
};