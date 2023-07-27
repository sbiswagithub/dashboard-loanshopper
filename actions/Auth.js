import {
  LOGIN, REGISTRATION_IN_PROGRESS, API_CALL_FAILED, RESET_ERROR, AUTHENTICATED_BORROWER, AUTHENTICATED_WEB, LOGOUT,
	SET_AUTH_LOGIN, SET_AUTH_PASSWORD, SET_ERROR, AUTHENTICATED_BROKER,
	EMAIL_REGISTRATION_START, LOGIN_INIT, SET_AUTH_REPEAT_PASSWORD, SET_RESET_CONFIRMATION_CODE,
	SHOW_RESET_PASSWORD, HIDE_RESET_PASSWORD
} from './types';

export const hideResetPassword = () => {
	return {
		type: HIDE_RESET_PASSWORD,
	};
};

export const showResetPassword = () => {
	return {
		type: SHOW_RESET_PASSWORD,
	};
};

export const setResetConfirmationCode = (confirmationCode) => {
	return {
		type: SET_RESET_CONFIRMATION_CODE,
		payload: confirmationCode,
	};
};

export const setAuthRepeatPassword = (password) => {
	return {
		type: SET_AUTH_REPEAT_PASSWORD,
		payload: password,
	};
};

export const loginInit = () => {
  return {
    type: LOGIN_INIT,
  };
};

export const emailRegistrationStart = () => {
  return {
    type: EMAIL_REGISTRATION_START,
  };
};

export const onRedirect = (redirectData) => {
  return {
    type: LOGIN,
    payload: redirectData,
  };
};
export const onLogout = () => {
  return {
    type: LOGOUT,
  };
};
export const onRegistrationInProgress = (account) => {
	return {
		type: REGISTRATION_IN_PROGRESS,
		payload: account,
	};
};
export const handleFetchError = (error) => {
	//console.log(error)
	return {
		type: API_CALL_FAILED,
		payload: error,
	};
};
export const setError = (error) => {
	return {
		type: SET_ERROR,
		payload: error,
	};
};
export const resetFetchError = () => {
	return {
		type: RESET_ERROR,
	};
};
export const webAuthenticatedBorrower = (accessCode) => {
	return {
		type: AUTHENTICATED_WEB,
		payload: accessCode,
	};
};
export const authenticatedBorrower = (borrower) => {
	return {
		type: AUTHENTICATED_BORROWER,
		payload: borrower,
	};
};
export const setAuthLogin = (login) => {
	return {
		type: SET_AUTH_LOGIN,
		payload: login,
	};
};
export const setAuthPassword = (password) => {
	return {
		type: SET_AUTH_PASSWORD,
		payload: password,
	};
};
export const authenticatedBroker = (cognitoUser) => {
	return {
		type: AUTHENTICATED_BROKER,
		payload: cognitoUser
	}
}
