import { trackPromise, } from 'react-promise-tracker';
import { NEW_APPLN_MESSAGE, TOGGLE_MESSAGE_DIALOG, TOGGLE_LOAN_PACKAGE, SELECT_DETAILS_PANEL, LOAD_APPLN_MESSAGES, 
	TOGGLE_AGENT_DTLS, SET_AGENT_RECOMMENDATION, TOGGLE_AGENT_RECOMMENDATION } from '../actions/types';
import { DEFAULT_DEALS_VIEW, LOAN_PKG_DEALS_VIEW, AGENT_DTLS_VIEW } from '../constants/deals';
import { FEATURES } from '../constants/review';
import { HIDE, SHOW } from '../constants/common';
import { API_MESSAGES_URI, API_RECOMMENDATIONS_URI } from '../constants/apiUrls';
import { ERROR_DIALOG_PUBLIC_MSG_1, ERROR_DIALOG_TITLE_1 } from '../constants/banners';
import { toQueryString } from '../actions/Utils';
import Moment from 'moment';

/*
 * @props : { qParams : {'applicationId' : ...}, 
 * 				accessCode:... }
 * Returns an array of messages [{
	"text": ..,
	"sender": ..,
	"createdTs": ..,
	"_id": ..}]
 */    
const fetchApplicationMessages = (props, onSuccess) => (dispatch) => {
	const qParams = props.qParams;
	const uri = `${API_MESSAGES_URI}` + toQueryString({ ...qParams });
	console.log(uri)
	trackPromise(
		fetch(uri, {
		    method: "GET",
		    headers: { 'Content-Type': 'application/json', 'Authorization': props.accessCode },
		})
	    .then(response => {
			if (response.status >= 400 && response.status < 600) {
                const error = Object.assign({}, {
                    status: response.status,
                    statusText: response.statusText,
                    showDialog: true, 
                    dialogTitle: ERROR_DIALOG_TITLE_1, 
                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
                    logMessage: 'Failed to connect to ' + uri
                });
                return Promise.reject(error);
			} else
	    		return response.json();
	    })
	    .then((json) => {
		    onSuccess(json);
	    })
	    .catch((error) => {
		    ////console.log('Boo in GET messages');
		    ////console.log(error);
		  	props.handleFetchError(error);	  						  	
	    }));
}
/*
 * @props : { accessCode:..., displayApplication:... }
 * Returns an array of recommendations [{
	"agentId": ..,
	"borrowerId": ..,
	"createdTs": ..,
	"_id": ..}]
 */    
const fetchAgentRecommendations = (props, onSuccess) => {
	const uri = `${API_RECOMMENDATIONS_URI}`;
	trackPromise(
		fetch(uri, {
		    method: "GET",
		    headers: { 'Content-Type': 'application/json', 'Authorization': props.accessCode },
		})
	    .then(response => {
			if (response.status >= 400 && response.status < 600) {
                const error = Object.assign({}, {
                    status: response.status,
                    statusText: response.statusText,
                    showDialog: true, 
                    dialogTitle: ERROR_DIALOG_TITLE_1, 
                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
                    logMessage: 'Failed to connect to ' + uri
                });
                return Promise.reject(error);
			} else
	    		return response.json();
	    })
	    .then((json) => {
		    onSuccess(json, props.displayApplication);
	    })
	    .catch((error) => {
		    ////console.log('Boo in GET recommendations');
		    ////console.log(error);
		  	props.handleFetchError(error);	  						  	
	    }));
}
/*
 * @props : { accessCode:..., displayApplication:... }
 */   
const addAgentRecommendation = (props, onSuccess) => {
	const body = JSON.stringify({agentId: props?.displayApplication?.proposal?.agentId, borrowerId:props?.borrower._id})
	const uri = `${API_RECOMMENDATIONS_URI}`;
	trackPromise(
		fetch(uri, {
		    method: "POST",
			headers: { 'Content-Type': 'application/json', 'Authorization': props.accessCode },
			body: body,
		})
	    .then(response => {
			if (response.status >= 400 && response.status < 600) {
                const error = Object.assign({}, {
                    status: response.status,
                    statusText: response.statusText,
                    showDialog: true, 
                    dialogTitle: ERROR_DIALOG_TITLE_1, 
                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
                    logMessage: 'Failed to connect to ' + uri
                });
                return Promise.reject(error);
			} else
	    		return response.json();
	    })
	    .then((json) => {
		    ////console.log('Added recommendation for ' + body);
			fetchAgentRecommendations(props, onSuccess);
	    })
	    .catch((error) => {
		    ////console.log('Boo in POST recommendations');
		    ////console.log(error);
		  	props.handleFetchError(error);	  						  	
	    }));	
}
/*
 * @props : { accessCode:..., displayApplication:... }
 */   
const deleteAgentRecommendation = (props, onSuccess) => {
	const uri = `${API_RECOMMENDATIONS_URI}` + '/' + props.recommendation._id;
	trackPromise(
		fetch(uri, {
		    method: "DELETE",
			headers: { 'Content-Type': 'application/json', 'Authorization': props.accessCode },
		})
	    .then(response => {
			if (response.status >= 400 && response.status < 600) {
                const error = Object.assign({}, {
                    status: response.status,
                    statusText: response.statusText,
                    showDialog: true, 
                    dialogTitle: ERROR_DIALOG_TITLE_1, 
                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
                    logMessage: 'Failed to connect to ' + uri
                });
                return Promise.reject(error);
			} else
	    		return response;
	    })
	    .then((response) => {
		    ////console.log('Deleted recommendation ' + props.recommendation._id);
			fetchAgentRecommendations(props, onSuccess);
	    })
	    .catch((error) => {
		    ////console.log('Boo in DELETE recommendations');
		    ////console.log(error);
		  	props.handleFetchError(error);	  						  	
	    }));		
}
/*
 * @props : { displayApplication:..., text:..., accessCode:... }
 */    
const postApplicationMessage = (props, onSuccess) => {
	const qParams = props.qParams;
	const uri = `${API_MESSAGES_URI}`;
	const body = JSON.stringify({applicationId: props.displayApplication._id, sender:'borrower', text:props.text})
	trackPromise(
		fetch(uri, {
		    method: "POST",
			headers: { 'Content-Type': 'application/json', 'Authorization': props.accessCode },
			body: body,
		})
	    .then(response => {
			if (response.status >= 400 && response.status < 600) {
                const error = Object.assign({}, {
                    status: response.status,
                    statusText: response.statusText,
                    showDialog: true, 
                    dialogTitle: ERROR_DIALOG_TITLE_1, 
                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
                    logMessage: 'Failed to connect to ' + uri
                });
                return Promise.reject(error);
			} else
	    		return response.json();
	    })
	    .then((json) => {
		    onSuccess();
	    })
	    .catch((error) => {
		    ////console.log('Boo in POST messages');
		    ////console.log(error);
		  	props.handleFetchError(error);	  						  	
	    }));
}

const INITIAL_STATE = {
	// Application state
	applicationView : DEFAULT_DEALS_VIEW,
	selectedPanel: FEATURES,
	fetchApplicationMessages: fetchApplicationMessages,
	postApplicationMessage: postApplicationMessage,
	fetchAgentRecommendations: fetchAgentRecommendations,
	messages : [],
	messageDialog: HIDE,
	text: null,
	updated: null,
	recommendedAgent: false,
	recommendation: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
	case TOGGLE_AGENT_RECOMMENDATION:
		if (action?.payload?.recommended)
			addAgentRecommendation(action.payload, action.payload.setAgentRecommendation);
		else
			deleteAgentRecommendation(action.payload, action.payload.setAgentRecommendation);
		return {...state, recommendedAgent: action?.payload?.recommended};
	case SET_AGENT_RECOMMENDATION:
		const recommendation = 
			action.payload.recommendations.find(recommendation => recommendation.agentId == action.payload?.displayApplication?.proposal?.agent?._id);
		return {...state, recommendedAgent: recommendation != null, recommendation: recommendation};
	case TOGGLE_MESSAGE_DIALOG:
		return { ...state, messageDialog : state.messageDialog == HIDE ? SHOW : HIDE };
	case TOGGLE_AGENT_DTLS:
		return { ...state, 
			applicationView: state.applicationView == AGENT_DTLS_VIEW ? null : AGENT_DTLS_VIEW,
		 };
	case TOGGLE_LOAN_PACKAGE:
		return { ...state, 
			applicationView: state.applicationView == LOAN_PKG_DEALS_VIEW ? null : LOAN_PKG_DEALS_VIEW,
		 };
  	case SELECT_DETAILS_PANEL:
	  return { ...state, selectedPanel: action.payload };
	case LOAD_APPLN_MESSAGES:
	  return { ...state, messages: action.payload };
	case NEW_APPLN_MESSAGE:
		return {...state, text : action.payload, };
  default:
		return state;
  } 
};