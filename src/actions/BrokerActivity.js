import {
  CLEAR_TRIAL_ACCOUNT_MSG, CLEAR_TRIAL_ACCOUNT_MSG_2, TOGGLE_LIKE_PROSPECT, LOAD_BROKER_DETAILS, 
  LOAD_BROKER_PROSPECTS, CLOSE_BROKER_PROSPECTS, LOAD_BROKER_PROSPECT_COUNTS, SHOW_MORE_PROSPECTS, PROSPECTS_FILTER
} from './types';
import { API_BROKER_PROSPECTS_URI } from '../constants/apiUrls';
import * as banners from "../constants/banners";
import * as prospects from "../constants/prospects";
import { trackPromise } from 'react-promise-tracker';

export const clearTrialAccountMessage = () => {
  return {
    type: CLEAR_TRIAL_ACCOUNT_MSG,
  };
};
export const clearTrialAccountMessage_2 = () => {
  return {
    type: CLEAR_TRIAL_ACCOUNT_MSG_2,
  };
};
export const toggleLikeProspect = (prospectId) => {
  return {
    type: TOGGLE_LIKE_PROSPECT,
    payload: prospectId,
  };
};
export const loadBrokerDetails = (broker) => {
  return  {
    type: LOAD_BROKER_DETAILS,
    payload: broker
  }
}
export const closeBrokerProspects = () => {
  return  {
    type: CLOSE_BROKER_PROSPECTS,
  } 
}
export const loadBrokerProspects = (page, pagesize, prospectsFilter, reload, accessCode) => async (dispatch) => {
	var searchType = prospectsFilter == prospects.RECENT ? 1 :
		prospectsFilter == prospects.FIRST_HOME ? 2 :
		prospectsFilter == prospects.INVESTOR ? 3 :
		prospectsFilter == prospects.REFINANCE ? 4 :
		prospectsFilter == prospects.URGENT ? 5 :
		prospectsFilter == prospects.SELFEMP ? 6 : null;
    var uri = 
      `${API_BROKER_PROSPECTS_URI}` 
        +  '?operationType=IncludeBorrowerSummaries' 
        + '&page=' + page
        + '&pagesize=' + pagesize;
	uri = searchType == null ? uri : uri + '&searchType=' + searchType;
	////console.log(uri);
      trackPromise(
				fetch(uri, {
				    method: "GET",
				    headers: { 'Content-Type': 'application/json', 'Authorization': accessCode },
				})
			    .then(response => {
					if (response.status >= 400 && response.status < 600) {
		                const error = Object.assign({}, {
		                    status: response.status,
		                    statusText: response.statusText,
		                    showDialog: true, 
		                    dialogTitle: banners.ERROR_DIALOG_TITLE_1, 
		                    publicMessage: banners.ERROR_DIALOG_PUBLIC_MSG_1, 
                    		logMessage: 'Failed to connect to ' + uri
		                });
		                return Promise.reject(error);
					} else
			    		return response.json();
			    })
			    .then((json) => {
					////console.log(json);
					dispatch({type: LOAD_BROKER_PROSPECTS, 
						payload: {page: page, prospects: json, reload: reload, prospectsFilter: prospectsFilter}});
			    })
			    .catch((error) => {
				    //console.log('Boo in GET prospects');
				    //console.log(error);
				  	dispatch({type: LOAD_BROKER_PROSPECTS, error: error});	  						  	
			    }));	
}

export const loadBrokerProspectsCount = (page, pagesize, prospectsFilter, reload, accessCode, onsuccess) => async (dispatch) => {
	var searchType = prospectsFilter == prospects.RECENT ? 1 :
		prospectsFilter == prospects.FIRST_HOME ? 2 :
		prospectsFilter == prospects.INVESTOR ? 3 :
		prospectsFilter == prospects.REFINANCE ? 4 :
		prospectsFilter == prospects.URGENT ? 5 :
		prospectsFilter == prospects.SELFEMP ? 6 : null;
    var uri = 
      `${API_BROKER_PROSPECTS_URI}` +  '/metadata';
	uri = searchType == null ? uri : uri + '?searchType=' + searchType;
	////console.log(uri);

      trackPromise(
				fetch(uri, {
				    method: "GET",
				    headers: { 'Content-Type': 'application/json', 'Authorization': accessCode },
				})
			    .then(response => {
					if (response.status >= 400 && response.status < 600) {
		                const error = Object.assign({}, {
		                    status: response.status,
		                    statusText: response.statusText,
		                    showDialog: true, 
		                    dialogTitle: banners.ERROR_DIALOG_TITLE_1, 
		                    publicMessage: banners.ERROR_DIALOG_PUBLIC_MSG_1, 
                    		logMessage: 'Failed to connect to ' + uri
		                });
		                return Promise.reject(error);
					} else
			    		return response.json();
			    })
			    .then((json) => {
					////console.log(json);
					dispatch({type: LOAD_BROKER_PROSPECT_COUNTS, payload: json});
					onsuccess(page, pagesize, prospectsFilter, reload, accessCode);
			    })
			    .catch((error) => {
				    //console.log('Boo in GET prospects metadata');
				    //console.log(error);
				  	dispatch({type: LOAD_BROKER_PROSPECT_COUNTS, error: error});	  						  	
			    }));	
}

export const showMoreProspects = () => {
  return  {
    type: SHOW_MORE_PROSPECTS,
  } 
}

export const selectProspectsFilter = (filter) => {
  return  {
	type: PROSPECTS_FILTER,
	payload: filter
  } 
}