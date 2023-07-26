import {
	POSTCODE_SELECTED,POSTCODE_UNSELECTED,POSTCODE_FOUND,
	HOMELOAN_UPDATED,SHOW_DEAL,HIDE_DEAL,
	USER_PREFERENCE,
	QUICK_APPLY,
} from './types';

export const quickApply = () => {
  return {
	    type: QUICK_APPLY,
	  };
};

export const userLoanPreference = (userPreference) => {
  return {
	    type: USER_PREFERENCE,
	    payload: userPreference,
	  };
};

export const hideDealOverlay = () => {
  return {
	    type: HIDE_DEAL,
	  };
};

export const updateDealInFocus = (dealInFocus) => {
  return {
	    type: SHOW_DEAL,
	    payload: dealInFocus,
	  };
};

export const postcodesFound = (data) => {
  return {
	    type: POSTCODE_FOUND,
	    payload: data,
	  };
};

export const postcodeSelected = (idx) => {
  return {
	    type: POSTCODE_SELECTED,
	    payload: idx,
	  };
};

export const postcodeUnSelected = () => {
  return {
	    type: POSTCODE_UNSELECTED,
	    payload: '',
	  };
};

export const homeLoanUpdated = (homeLoan) => {
  return {
	    type: HOMELOAN_UPDATED,
	    payload: homeLoan,
	  };
};