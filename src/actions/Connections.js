import {
	ADD_CONNECTION_BROKER_DETAILS
} from './types';


export const addConnectionBrokerDetails = (brokerAgent) => {
  return {
	    type: ADD_CONNECTION_BROKER_DETAILS,
	    payload: brokerAgent,
	  };
};