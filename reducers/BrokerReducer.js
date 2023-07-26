import {
	CLEAR_TRIAL_ACCOUNT_MSG, LOAD_BROKER_DETAILS
} from '../actions/types';

const INITIAL_STATE = {
	// Application state		
  prospectsCount: 0,	
  applicationsCount: 0,	
  newMessagesCount: 0,	
  brokerId: null,
  accountId: null,
  brokerTitle: null,
  brokerFirstName: null,
  brokerLastName: null,
  brokerPrimaryEmail: null,
  brokerPrimaryPhone: null,

	// Flags
	showTrialAccountMessage: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_BROKER_DETAILS:
      return { ...state, 
        brokerId: action.payload._id, 
        accountId: action.payload.accountId, 
        brokerTitle: action.payload?.title,
        brokerFirstName: action.payload?.firstName,
        brokerLastName: action.payload?.lastName,
        brokerPrimaryEmail: action.payload?.contact?.primaryEmail,
        brokerPrimaryPhone: action.payload?.contact?.brokerPrimaryPhone,

       };
    case CLEAR_TRIAL_ACCOUNT_MSG:
      return { ...state, showTrialAccountMessage: false };
    default:
      return state;
  }
};