import { SHOW_ACTIVE_PROPOSALS, SHOW_DOCUMENTS } from '../actions/types';
import { PROPOSALS_MODE, DOCUMENTS_MODE } from '../constants/homeLoanActivity';

const INITIAL_STATE = {
	// Application state
	activeProposals: 0,
	numDocuments: 0,
	mode: PROPOSALS_MODE,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SHOW_ACTIVE_PROPOSALS:
	  return { ...state, mode: PROPOSALS_MODE };
  case SHOW_DOCUMENTS:
	  return { ...state, mode: DOCUMENTS_MODE };
  default:
      return state;
  } 
};