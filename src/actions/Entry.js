import {
  ENTRY_BORROW_1, CLOSE_CALC, CALCULATE_BORROWING, 
  ENTRY_DISCLOSURE_2, CLOSE_DISCLOSURE,
  ENTRY_REVIEW_3, CLOSE_REVIEW,
  ENTRY_DEALS_4, CLOSE_DEALS,
  INCOME_PROFILE_SELECTED, NUM_DEPENDANTS_SET, BIRTH_YEAR_SELECTED, 
  INCOME_RANGE_SET, INCOME_SOURCE_SELECTED, BORR_PURPOSE_SET, FROM_APPLICATION, TO_APPLICATION, 
} from './types';

export const fromApplication = () => {
  return {
    type: FROM_APPLICATION,
  }
}
export const toApplication = () => {
  return {
    type: TO_APPLICATION,
  }
}
export const toApply = () => {
  return {
    type: ENTRY_DISCLOSURE_2,
  };
}
export const onClickDealsButton = () => {
  return {
    type: ENTRY_DEALS_4,
  };
}
export const onClickBorrowButton = () => {
  return {
    type: ENTRY_BORROW_1,
  };
}
export const onClickApplyButton = () => {
  return {
    type: ENTRY_DISCLOSURE_2,
  };
}
export const onClickReviewButton = () => {
  return {
    type: ENTRY_REVIEW_3,
  };
}
export const closeCalculator = () => {
  return {
    type: CLOSE_CALC,
  };
}
export const closeDisclosure = () => {
  return {
    type: CLOSE_DISCLOSURE,
  };
}
export const closeReview = () => {
  return {
    type: CLOSE_REVIEW,
  };
}
export const closeDeals = () => {
  return {
    type: CLOSE_DEALS,
  };
}
export const calculateBorrowing = () => {
  return {
    type: CALCULATE_BORROWING,
  };
}


export const birthYearSelected = (birthYear) => {
  return {
    type: BIRTH_YEAR_SELECTED,
    payload: birthYear,
  };	
}
export const incomeProfileSelected = (incomeProfile) => {
  return {
    type: INCOME_PROFILE_SELECTED,
    payload: incomeProfile,
  };
}
export const numDependantsSelected = (numDependants) => {
  return {
    type: NUM_DEPENDANTS_SET,
    payload: numDependants,
  };
}
export const incomeRangeSelected = (incomeRange) => {
  return {
    type: INCOME_RANGE_SET,
    payload: incomeRange,
  };
}
export const incomeSourceSelected = (incomeSource) => {
  return {
    type: INCOME_SOURCE_SELECTED,
    payload: incomeSource,
  };
}
export const toggleInvestor  = (isInvestor) => {
  return {
	    type: BORR_PURPOSE_SET,
	    payload: isInvestor,
	  };
}