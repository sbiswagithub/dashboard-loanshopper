import { TOGGLE_LOAN_PACKAGE, TOGGLE_MESSAGE_DIALOG,
	LOAD_APPLN_MESSAGES, NEW_APPLN_MESSAGE, TOGGLE_AGENT_DTLS,
	SET_AGENT_RECOMMENDATION, TOGGLE_AGENT_RECOMMENDATION } from '../actions/types';

export const toggleAgentRecommendation = (props) => {
  return {
    type: TOGGLE_AGENT_RECOMMENDATION,
    payload: props,
  };
};	
export const setAgentRecommendation = (recommendations, displayApplication) =>{
	return {
		type: SET_AGENT_RECOMMENDATION,
		payload: {recommendations: recommendations, displayApplication: displayApplication}
	}
}

export const updatedTextMessage = (text) => {
	return {
		type: NEW_APPLN_MESSAGE,
		payload: text
	}
}
export const loadApplicationMessages = (messages) => {
	return {
		type: LOAD_APPLN_MESSAGES,
		payload: messages
	}
}
export const toggleLoanPackage = () => {
	return {
		type: TOGGLE_LOAN_PACKAGE
	}
}
export const toggleAgentDetails = () => {
	return {
		type: TOGGLE_AGENT_DTLS
	}
}
export const toggleMessageDialog = () => {
	return {
		type: TOGGLE_MESSAGE_DIALOG
	}
}