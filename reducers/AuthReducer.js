import {
  LOGIN, REGISTRATION_IN_PROGRESS, API_CALL_FAILED, RESET_ERROR, AUTHENTICATED_BORROWER, LOGOUT, SET_ERROR, 
  SET_AUTH_LOGIN, SET_AUTH_PASSWORD, AUTHENTICATED_BROKER, EMAIL_REGISTRATION_START, LOGIN_INIT, SET_AUTH_REPEAT_PASSWORD, 
  SET_RESET_CONFIRMATION_CODE, SHOW_RESET_PASSWORD, HIDE_RESET_PASSWORD
} from '../actions/types';
const INIT = 'init'
const EMAIL_REGISTRATION = 'email_registration_start'
const INITIAL_STATE = {
  accessCode: '',
  idToken: null,
  refreshToken: null,
	// appEntryMode options -  init, REGISTRATION_IN_PROGRESS, EMAIL_REGISTRATION_START, REGISTERED, TRIAL_ACCOUNT, UPGRADE_ACCOUNT, FULL_ACCOUNT
	appEntryMode: 'init',  
	account : {},
  borrower: null,
  cognitoUser: null,
  broker : null,
  login: null,
  password: null,
  passwordRepeat: null,
  confirmationCode: undefined,
  resetPassword : false,
	error: { showDialog: false, dialogTitle: '', publicMessage: '', logMessage: '', status: 200, statusText: null, },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload.queryParams };
    case LOGOUT:
      return INITIAL_STATE;
    case REGISTRATION_IN_PROGRESS:
        return { ...state, account: action.payload, appEntryMode: action.payload.status };
    case API_CALL_FAILED:
    case SET_ERROR:
        return { ...state, error: action.payload, };
    case AUTHENTICATED_BORROWER:
        return { ...state, borrower: action.payload, };
    case RESET_ERROR:
        return { ...state, error: { showDialog: false, dialogTitle: '', publicMessage: '', logMessage: '', status: 200, statusText: null, }, };
    case SET_AUTH_LOGIN:
        return { ...state, login: action.payload, };
    case SET_AUTH_PASSWORD:
        return { ...state, password: action.payload, };
    case SET_AUTH_REPEAT_PASSWORD:
        return { ...state, passwordRepeat: action.payload, };
    case AUTHENTICATED_BROKER:
        return { ...state, 
          cognitoUser: action.payload, 
          accessCode : action.payload?.signInUserSession?.accessToken?.jwtToken, 
          idToken : action.payload?.signInUserSession?.idToken?.jwtToken, 
          refreshToken : action.payload?.signInUserSession?.refreshToken?.jwtToken, };
    case EMAIL_REGISTRATION_START:
      return { ...state, appEntryMode: EMAIL_REGISTRATION , login: undefined, password : undefined, passwordRepeat: undefined }
    case LOGIN_INIT:
      return { ...state, appEntryMode: INIT , login: undefined, password : undefined }
    case SET_RESET_CONFIRMATION_CODE:
      return { ...state, confirmationCode : action.payload }
    case SHOW_RESET_PASSWORD:
      return { ...state, resetPassword : true }
    case HIDE_RESET_PASSWORD:
      return { ...state, resetPassword : false }
    default:
      return state;
  }
};