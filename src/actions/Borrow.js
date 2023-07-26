import {
	MAIN_APPL_INC_UPDATED, JOINT_APPL_INC_UPDATED, 
	BORR_TERM_UPDATED, DEPENDANTS_UPDATED, INTEREST_RATE_UPDATED, 
	BORROWING_ESTIMATES_RETURNED, SHOW_TOOLTIP, SET_CLIENT_CONNECTIONS
} from './types';


export const setClientConnections = (clientConnections) => {
  return {
	    type: SET_CLIENT_CONNECTIONS,
	    payload: clientConnections,
	  };
}
export const mainApplicantAnnualIncomeUpdated = (income) => {
  return {
	    type: MAIN_APPL_INC_UPDATED,
	    payload: income,
	  };
}
export const jointApplicantAnnualIncomeUpdated = (income) => {
  return {
	    type: JOINT_APPL_INC_UPDATED,
	    payload: income,
	  };
}
export const borrowingTermUpdated = (borrowingTerm) => {
  return {
	    type: BORR_TERM_UPDATED,
	    payload: borrowingTerm,
	  };
}
export const dependantsUpdated = (numDependants) => {
  return {
	    type: DEPENDANTS_UPDATED,
	    payload: numDependants,
	  };
}
export const interestRateUpdated = (interestRate) => {
  return {
	    type: INTEREST_RATE_UPDATED,
	    payload: interestRate,
	  };
}
export const handleGetEstimatesReturn = (borrowingEstimates) => {
  return {
	    type: BORROWING_ESTIMATES_RETURNED,
	    payload: borrowingEstimates,
	  };
}
export const showIndexData = (indexData) => {
  return {
	    type: SHOW_TOOLTIP,
	    payload: indexData,
	  };
}
