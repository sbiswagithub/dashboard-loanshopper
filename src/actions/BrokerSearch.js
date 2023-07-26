import {
	BROKER_SEARCH_TOGL,
} from './types';

export const toggleBrokerSearchPanel = (toggleValue) => {
  return {
	    type: BROKER_SEARCH_TOGL,
	    payload: toggleValue
	  };
};
