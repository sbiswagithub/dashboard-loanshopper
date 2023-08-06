import { SHOW_MY_BROKER_CONNECTIONS, SHOW_MY_DOCUMENTS, SHOW_MY_ACCOUNT, SET_ACCEPTED_CONNECTIONS } from '../actions/types';
const INITIAL_STATE = {
  modeMyBrokerConnections: false,
  modeMyDocuments: false,
  acceptedConnections: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACCEPTED_CONNECTIONS:
      return { ...state, acceptedConnections : action.payload }
    case SHOW_MY_ACCOUNT:
      return { ...state, modeMyDocuments:false, modeMyBrokerConnections:false }
    case SHOW_MY_DOCUMENTS:
      return { ...state, modeMyDocuments:true, modeMyBrokerConnections:false }
    case SHOW_MY_BROKER_CONNECTIONS:
      return { ...state, modeMyDocuments:false, modeMyBrokerConnections:true }
    default:
      return state;
  }
};