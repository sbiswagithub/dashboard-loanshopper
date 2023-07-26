import {
  SAVE_REGISTRATION_DETAILS, VERIFY_OTP, REQUEST_NEW_OTP, CLEAR_OTP, 
  SET_PASSWORD, SET_REPEAT_PASSWORD, CONFIRM_PASSWORD, USER_EXISTS, 
  SIGNUP_SUCCESS
} from '../actions/types';

function validatePassword(password) {
  // This pattern matcher validates per AWS Cognito setup
  var passwordPattern = [
            '^.{8,}$', // min 8 chars
            '(?=.*[0-9])', // number required
            '(?=.*[a-z])', // lower case letter
            '(?=.*[A-Z])', // uppercase letter
            '(?=.*[-!@#%&/,><\’:;|_~`])' // atleast one special character required
          ];
  const conditions = passwordPattern.map(rule => new RegExp(rule, 'g'));
  var valid = conditions.map(condition => condition.test(password)).every((result) => {
    return result;});
  return valid;
}

const INITIAL_STATE = {
	toggleSaveMode: false,
	otp: '',
  borrower: null,
  broker: null,
  hasValidPassword: false,
  passwordConfirmed: true,
  password: null,
  repeatPassword: null,
  userExistsError: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_REGISTRATION_DETAILS:
      return { ...state, toggleSaveMode: !action.payload.saveMode, borrower: action.payload.borrower };
    case VERIFY_OTP:
      return { ...state, otp: action.payload, };
    case REQUEST_NEW_OTP:
      return { ...state, otp: '', };
    case CLEAR_OTP:
      return { ...state, otp: '', };
    case SET_PASSWORD:
      return { ...state, password: action.payload   , hasValidPassword : validatePassword(action.payload) , };
    case SET_REPEAT_PASSWORD:
      return { ...state, repeatPassword: action.payload, passwordConfirmed : action.payload == state.password, };
    case USER_EXISTS:
      return { ...state, userExistsError : true, password : '', repeatPassword: '' };
    case SIGNUP_SUCCESS:
      return { ...state, borrower: action.payload };
    default:
      return state;
  }
};