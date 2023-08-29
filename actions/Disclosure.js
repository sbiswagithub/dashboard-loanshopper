import {
	LOAD_BORROWER_DETAILS,
	TITLE_SELECTED, FNAME_UPDATED, LNAME_UPDATED, EMAIL_UPDATED, MOBILE_UPDATED, CO_BORR_EMAIL_UPDATED,
	TITLE_COBORR_SELECTED, FNAME_COBORR_UPDATED, LNAME_COBORR_UPDATED, 
	ADDRESS_FOUND, ADDRESS_SELECTED, ADDRESS_UNSELECTED, ADDRESS_BLUR,
	PROFESSION_FOUND, PROFESSION_SELECTED, PROFESSION_UNSELECTED,
	EMPLOYEMENT_TYPE_SELECTED,
	DOB_UPDATED, DATE_PICKER_TOGGLE,
	COBORR_DOB_UPDATED, COBORR_DOB_PICKER_TOGGLE, COBORR_GR_ANN_INC_UPDATED,
	IMMIGRATION_STATUS_SELECTED,
	GR_ANN_INC_UPDATED, STMT_OF_INTENT_UPDATED, BORROWING_UPDATED,
	TOGGLE_EDIT, TOGGLE_ACCEPT, 
	LOAN_PURPOSE_SELECTED, LOAN_PROFILE_SELECTED, LOAN_PROCESSING_SELECTED,
	LOAD_LOAN_REQUEST, CLEAR_CO_BORR, SHOW_NEXT, DEPENDANTS_UPDATED, LVR_UPDATED, RATE_PREF_UPDATED,
	FIRST_PREF_UPDATED, SECOND_PREF_UPDATED, REPAYMENT_PREF_UPDATED, EXTRAS_PREF_UPDATED, 
	MORTGAGE_ADDRESS_UNSELECTED, MORTGAGE_ADDRESS_SELECTED, MORTGAGE_ADDRESS_BLUR, MORTGAGE_ADDRESS_FOUND, MORTGAGE_ADDRESS_REMOVE,
	EDIT_MORE, CHECK_ACCOUNT_FOR_EMAIL, CHECK_ACCOUNT_FOR_MOBILE, PROFESSION_BLUR, EDIT_LESS, TOGGLE_ALERT, PROMO_CODE_UPDATED
} from './types';



export const statementOfIntentUpdated = (statement) => {
  return {
	type: STMT_OF_INTENT_UPDATED,
	payload: statement
  };
};

export const promoCodeUpdated = (promoCode) => {
  return {
	type: PROMO_CODE_UPDATED,
	payload: promoCode
  };
};

export const emailCheckResult = (success) => {
  return {
	type: CHECK_ACCOUNT_FOR_EMAIL,
	payload: success
  };
};

export const mobileCheckResult = (success) => {
  return {
	type: CHECK_ACCOUNT_FOR_MOBILE,
	payload: success
  };
};

export const editMore = () => {
  return {
	    type: EDIT_MORE,
	  };
}

export const editLess = () => {
  return {
	    type: EDIT_LESS,
	  };
}

export const currentLendingUpdated = (type, update) => {
  return {
	    type: type,
	    payload: update,
	  };
}

export const extrasUpdated = (type, toggle) => {
  return {
	    type: EXTRAS_PREF_UPDATED,
	    payload: {type : type , toggle : toggle},
	  };
}

export const lvrUpdated = (lvr) => {
  return {
	    type: LVR_UPDATED,
	    payload: lvr,
	  };
}

export const disclosureDependantsUpdated = (numDependants) => {
  return {
	    type: DEPENDANTS_UPDATED,
	    payload: numDependants,
	  };
}

export const clearCoBorr = () => {
  return {
	    type: CLEAR_CO_BORR,
	  };
}

export const loadLoanRequest = (loanRequest) => {
  return {
	    type: LOAD_LOAN_REQUEST,
	    payload: loanRequest
	  };
}

export const loanPurposeSelected = (loanPurpose) => {
  return {
	    type: LOAN_PURPOSE_SELECTED,
	    payload: loanPurpose
	  };
}
export const loanProfileSelected = (loanProfile) => {
  return {
	    type: LOAN_PROFILE_SELECTED,
	    payload: loanProfile
	  };
}
export const loadBorrowerDetails = (borrower) => {
  return {
	    type: LOAD_BORROWER_DETAILS,
	    payload: borrower
	  };
}

export const loanProcessingSelected = (loanProcessing) => {
  return {
	    type: LOAN_PROCESSING_SELECTED,
	    payload: loanProcessing
	  };
}

export const titleSelected = (title) => {
  return {
	    type: TITLE_SELECTED,
	    payload: title
	  };
};
export const fnameUpdated = (fname) => {
  return {
	    type: FNAME_UPDATED,
	    payload: fname
	  };
};
export const lnameUpdated = (lname) => {
  return {
	    type: LNAME_UPDATED,
	    payload: lname
	  };
};

export const emailUpdated = (email) => {
  return {
	    type: EMAIL_UPDATED,
	    payload: email.trim()
	  };
};
export const mobileUpdated = (mobile) => {
  return {
	    type: MOBILE_UPDATED,
	    payload: mobile
	  };
};

export const titleCoBorrSelected = (titleCoBorr) => {
  return {
	    type: TITLE_COBORR_SELECTED,
	    payload: titleCoBorr
	  };
};
export const fnameCoBorrUpdated = (fnameCoBorr) => {
  return {
	    type: FNAME_COBORR_UPDATED,
	    payload: fnameCoBorr
	  };
};
export const lnameCoBorrUpdated = (lnameCoBorr) => {
  return {
	    type: LNAME_COBORR_UPDATED,
	    payload: lnameCoBorr
	  };
};
export const coBorrowerEmailUpdated = (coBorrowerEmail) => {
  return {
	    type: CO_BORR_EMAIL_UPDATED,
	    payload: coBorrowerEmail
	  };
};

// Address 
export const addressesFound = (data) => {
  return {
	    type: ADDRESS_FOUND,
	    payload: data,
	  };
};
export const addressOnBlur = () => {
  return {
	    type: ADDRESS_BLUR,
	  };
};
export const addressSelected = (addressData) => {
  return {
	    type: ADDRESS_SELECTED,
	    payload: addressData,
	  };
};
export const addressUnSelected = () => {
  return {
	    type: ADDRESS_UNSELECTED,
	    payload: '',
	  };
};

export const mortgageAddressesFound = (data) => {
  return {
	    type: MORTGAGE_ADDRESS_FOUND,
	    payload: data,
	  };
};
export const mortgageAddressOnBlur = () => {
  return {
	    type: MORTGAGE_ADDRESS_BLUR,
	  };
};
export const mortgageAddressSelected = (addressData) => {
  return {
	    type: MORTGAGE_ADDRESS_SELECTED,
	    payload: addressData,
	  };
};
export const mortgageAddressUnSelected = () => {
  return {
	    type: MORTGAGE_ADDRESS_UNSELECTED,
	    payload: '',
	  };
};
export const mortgageAddressRemoved = (addressData) => {
  return {
	    type: MORTGAGE_ADDRESS_REMOVE,
	    payload: addressData,
	  };
};


export const professionsOnBlur = () => {
  return {
	    type: PROFESSION_BLUR,
	  };
};
export const professionsFound = (professionsArray, input) => {
  return {
	    type: PROFESSION_FOUND,
	    payload: { professions : professionsArray , professionPart : input} 
	  };
};
export const professionSelected = (profession) => {
  return {
	    type: PROFESSION_SELECTED,
	    payload: profession,
	  };
};
export const professionUnSelected = () => {
  return {
	    type: PROFESSION_UNSELECTED,
	    payload: '',
	  };
};

export const dobUpdated = (dob) => {
  return {
	    type: DOB_UPDATED,
	    payload: dob
	  };
};
export const toggleDatePicker = (showDp) => {
  return {
	    type: DATE_PICKER_TOGGLE,
	    payload: showDp
	  };
}
export const coBorrDobUpdated = (coBorrDob) => {
  return {
	    type: COBORR_DOB_UPDATED,
	    payload: coBorrDob
	  };
};
export const toggleCoBorrDobPicker = (showCoBorrDp) => {
  return {
	    type: COBORR_DOB_PICKER_TOGGLE,
	    payload: showCoBorrDp
	  };
};
export const coBorrGrossIncUpdated = (coBorrGrossAnnInc) => {
  return {
	    type: COBORR_GR_ANN_INC_UPDATED,
	    payload: coBorrGrossAnnInc
	  };
};
export const employmentTypeSelected = (employmentType) => {
  return {
	    type: EMPLOYEMENT_TYPE_SELECTED,
	    payload: employmentType
	  };
}
export const immigrationStatusSelected = (immigrationStatus) => {
  return {
	    type: IMMIGRATION_STATUS_SELECTED,
	    payload: immigrationStatus,
	  };
}
export const grossAnnualIncomeUpdated = (grossIncAnn) => {
  return {
	    type: GR_ANN_INC_UPDATED,
	    payload: grossIncAnn,
	  };
}
export const borrowingUpdated = (borrowing) => {
  return {
	    type: BORROWING_UPDATED,
	    payload: borrowing,
	  };
}
export const disclosureAmountUpdated = (type, value) => {
  return {
	    type: type,
	    payload: value,
	  };
}
export const toggleEditMode = (editMode) => {
  return {
	    type: TOGGLE_EDIT,
	    payload: editMode
	  };
}
export const toggleAlert = () => {
  return {
	    type: TOGGLE_ALERT,
	  };
}
export const toggleModal = (mode) => {
  return {
	    type: mode,
	  };
}
export const toggleAcceptFlag = (isAccepted) => {
  return {
	    type: TOGGLE_ACCEPT,
	    payload: isAccepted
	  };
}
export const messageNext = (show) => {
  return {
		type: SHOW_NEXT,
		payload: show
	  };
}
export const ratePreferenceUpdated = (ratePreference) => {
  return {
	    type: RATE_PREF_UPDATED,
	    payload: ratePreference
	  };
}
export const loanPreferenceUpdated = (number, loanPreference) => {
  return {
	    type: number ==1 ? FIRST_PREF_UPDATED : SECOND_PREF_UPDATED,
	    payload: loanPreference
	  };
}
export const repaymentPreferenceUpdated = (repaymentFrequency) => {
  return {
	    type: REPAYMENT_PREF_UPDATED,
	    payload: repaymentFrequency
	  };
}
