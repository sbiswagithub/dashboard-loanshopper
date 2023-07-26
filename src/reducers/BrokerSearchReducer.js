import {
	BROKER_SEARCH_TOGL, 
} from '../actions/types';
import { SEARCH_BY_LOCATION_TOGGLE } from '../constants/brokerSearch';

const INITIAL_STATE = {
	searchMode: SEARCH_BY_LOCATION_TOGGLE,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case BROKER_SEARCH_TOGL:
	  return { ...state, searchMode: action.payload };

  default:
      return state;
  }
};