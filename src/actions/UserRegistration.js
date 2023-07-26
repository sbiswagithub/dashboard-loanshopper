import {
	SAVE_REGISTRATION_DETAILS, FAILED_USER_REGISTRATION, VERIFY_OTP, REQUEST_NEW_OTP, CLEAR_OTP, 
	SET_PASSWORD, USER_EXISTS, SET_REPEAT_PASSWORD, SIGNUP_SUCCESS
} from './types';

export const onSignupSuccess = (borrower) => {
	return {
		type: SIGNUP_SUCCESS,
		payload: borrower,
	  };
}
export const userExists = () => {
	return {
	    type: USER_EXISTS,
	  };
}
export const toggleRegistrationSave = (saveRegistration) => {
	return {
	    type: SAVE_REGISTRATION_DETAILS,
	    payload: saveRegistration,
	  };
}
export const verifyOtp = (otp) => {
	return {
	    type: VERIFY_OTP,
	    payload: otp,
	  };
}
export const requestNewOtp = () => {
	return {
	    type: REQUEST_NEW_OTP,
	  };
}
export const onRegistrationFailure = (error) => {
	return {
	    type: FAILED_USER_REGISTRATION,
	    payload: error,
	  };
}
export const clearOtp = () => {
	return {
	    type: CLEAR_OTP,
	  };
}
export const setPassword = (password) => {
	return {
	    type: SET_PASSWORD,
	    payload: password,
	  };
}
export const setRepeatPassword = (repeatPassword) => {
	return {
	    type: SET_REPEAT_PASSWORD,
	    payload: repeatPassword,
	  };
}