import {
	POSTCODE_FOUND,POSTCODE_SELECTED,POSTCODE_UNSELECTED,
	HOMELOAN_UPDATED,SHOW_DEAL,HIDE_DEAL,
	USER_PREFERENCE,
	QUICK_APPLY,
	SET_CLIENT_CONNECTIONS,
	ADD_CONNECTION_BROKER_DETAILS,
} from '../actions/types';

const INITIAL_STATE = {
	// Application state		
	postCodeSet: false,
	isDealsOverlayVisible: false,
	dealInFocus: 0,
	applyForDeal: false,
	// API Request parameters
	idx: '',
	query: '',
	homeLoan: 0,
	userPreference: null,
	// Response data
	clientConnections:null,
	brokerDetailsList : [],
	postCodes: [],
	brokerDeals: [
		{
	        title:"Appproval Holdings Pty Ltd",
	        product: "Macquarie First Classic",
	        rate: "3.25",
	        repayment: "3245.09",
	        loanTerm: "20",
	        loanFixedPeriod: "24",
	    },
	    {
	        title:"Aussie Home Loans",
	        product: "ANZ Home Loan Rapid",
	        rate: "3.21",
	        repayment: "2282.23",
	        loanTerm: "25",
	        loanFixedPeriod: "36",
	    },
	    {
	        title:"V Corp",
	        product: "St. George Home Loan Rapid",
	        rate: "3.45",
	        repayment: "4500.52",
	        loanTerm: "20",
	        loanFixedPeriod: "12",
	    }]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUICK_APPLY:
	  return { ...state, isDealsOverlayVisible: false, applyForDeal: true };
  case USER_PREFERENCE:
	  return { ...state, userPreference: action.payload, isDealsOverlayVisible: true, applyForDeal: false };
  case HIDE_DEAL:
	  return { ...state, dealInFocus: 0, isDealsOverlayVisible: false, applyForDeal: false };
  case SHOW_DEAL:
	  return { ...state, dealInFocus: action.payload, applyForDeal: false };
  case POSTCODE_FOUND:
      return { ...state, postCodes : action.payload.postCodes, query : action.payload.query };
  case POSTCODE_SELECTED:
      return { ...state, postCodeSet: true, idx : action.payload.idx, query: action.payload.query };
  case POSTCODE_UNSELECTED:
      return { ...state, postCodeSet: false, idx : '', query: '', postCodes:[] };
  case HOMELOAN_UPDATED:
	  return { ...state, homeLoan: action.payload };
  case SET_CLIENT_CONNECTIONS:  
	  return { ...state, clientConnections: action.payload, brokerDetailsList: []  };
  case ADD_CONNECTION_BROKER_DETAILS:  
	  state.brokerDetailsList.push(action.payload)
	  return { ...state, };
  default:
      return state;
  }
};