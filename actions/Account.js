import {
  SHOW_MY_BROKER_CONNECTIONS, SHOW_MY_DOCUMENTS, SHOW_MY_ACCOUNT, SET_ACCEPTED_CONNECTIONS
} from './types';

export const setAcceptedConnections = (connections) => {
	return {
		type: SET_ACCEPTED_CONNECTIONS,
		payload: connections
	}
}
export const showMyAccount = () => {
	return {
		type: SHOW_MY_ACCOUNT,
	}
}
export const showMyDocuments = () => {
	return {
		type: SHOW_MY_DOCUMENTS,
	}
}
export const showMyConnections = () => {
	return {
		type: SHOW_MY_BROKER_CONNECTIONS,
	}
}
