import { SWITCH_PERIOD, SELECT_DATE, SWITCH_MODE, SHOW_PROPOSAL, SELECT_PROPOSAL_TO_COMPARE,
	NEXT_PROPOSAL, PREV_PROPOSAL, LOAD_PROPOSALS_IN_VIEW, ADD_DATE_CONTENTS_FLAG,
	LOAD_COMPARE_PROPOSALS, TOGGLE_LIKE_PROPOSAL, REFRESH_PROPOSAL, SET_QPARAMS, SET_FILTER_MODE, 
	ACCEPT_PROPOSAL, LOAD_APPLICATIONS, NEW_APPLICATION, SHOW_APPLICATION, LOAD_BROKERAGENT } from '../actions/types';
import {QUARTERLY_VIEW, FORTNIGHTLY_VIEW, MONTHLY_VIEW, WEEKLY_VIEW, 
	CALENDAR_MODE, PROPOSAL_MODE, COMPARE_MODE, APPLICATION_MODE,
	FILTER_NONE, FILTER_BROKER, FILTER_DATE, FILTER_LENDER, } from '../constants/review';
import Moment from 'moment';
import { trackPromise, } from 'react-promise-tracker';

import { ERROR_DIALOG_PUBLIC_MSG_1, ERROR_DIALOG_TITLE_1 } from '../constants/banners';
import { API_PROPOSALS_URI, API_BROKER_BROKERAGENTS_URI } from '../constants/apiUrls';
import { toQueryString } from '../actions/Utils';
import {L,R, HIDE} from '../constants/common';
 
   /*
	* @props : { qParams : {'startTs' : ..., 'endTs' : ..}, 
	* 				accessCode:... }
	* Returns an array of broker proposals [{
        "loanRequestId": ..,
        "agentId": ..,
        "agent": {
            "fullName": ..,
            "contact": {
                "primaryEmail": ..,
                "primaryPhone": ..
            },
            "accountId": ..,
            "brokerAgencyId": "AGNCY-1",
            "createdTs": ..,
            "lastUpdatedTs": ..,
            "_id": "AGNT-1"
        },
        "loanPackageId": ..,
        "loanPackageSummary": {
            "interestRate": ..,
            "label": ..
        },
        "status": ..,
        "createdTs": ..,
        "lastUpdatedTs": ..,
        "_id": ..}]
	*/    
const fetchProposals = (props, onSuccess) => {
	const qParams = props.qParams;
	const uri = `${API_PROPOSALS_URI}`+ 
					toQueryString(
						{ ...qParams, 
							'operationId' : props.liked == null ? 'searchByStartDate' : 'searchLikedProposals' });
	//console.log(uri)
	trackPromise(
		fetch(uri, {
		    method: "GET",
		    headers: { 'Content-Type': 'application/json', 'Authorization': props.accessCode },
		})
	    .then(response => {
			//console.log(response)
			if (response.status >= 400 && response.status < 600) {
                const error = Object.assign({}, {
                    status: response.status,
                    statusText: response.statusText,
                    showDialog: true, 
                    dialogTitle: ERROR_DIALOG_TITLE_1, 
                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
                    logMessage: 'Failed to connect to {API_PROPOSALS_URI}'
                });
                return Promise.reject(error);
			} else
	    		return response.json();
	    })
	    .then((json) => {
			//console.log(json)
		    onSuccess({...props, response : json });
	    })
	    .catch((error) => {
		    //console.log('Boo in GET proposals');
		    //console.log(error);
		  	//onError(error);	  						  	
	    }));
}
const fetchProposal = (props, onSuccess) => {
	const qParams = props.qParams;
	const uri = `${API_PROPOSALS_URI}/`+ props.proposalId;
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
                    logMessage: 'Failed to connect to {API_PROPOSALS_URI}'
                });
                return Promise.reject(error);
			} else
	    		return response.json();
	    })
	    .then((json) => {
		    onSuccess({ response : json });
	    })
	    .catch((error) => {
		    //console.log('Boo in GET proposal');
		    //console.log(error);
	    }));
}

/*
 * @id - Proposal to update
 * @liked - Updated flag 
 */
const updateLikeProposal = (props) => {

	const uri = `${API_PROPOSALS_URI}/` + props.proposalId;
	const body = JSON.stringify( props.liked ? 
					{ 'operationId' : 'likeProposal' } : 
					{ 'operationId' : 'unlikeProposal' } );
	trackPromise(
		fetch(uri, {
		    method: "PATCH",
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
                    logMessage: 'Failed to connect to {API_PROPOSALS_URI}'
                });
                return Promise.reject(error);
			}
	    })
	    .then((json) => {
			if (props?.refreshProposal)
				fetchProposal( { ...props, proposalId: props.proposalId}, props.refreshProposal);
	    })
	    .catch((error) => {
		    //console.log('Boo in PATCH proposals');
		    ////console.log(error);
	    }));
}

const getQParams = (reviewPeriod) => {
	const dateToStart = reviewPeriod == FORTNIGHTLY_VIEW ? Moment().subtract(13, 'days') 
							: reviewPeriod == MONTHLY_VIEW ? Moment().subtract(1, 'months') 
							: reviewPeriod == QUARTERLY_VIEW ? Moment().subtract(3, 'months') 
							: Moment();
	const startTs = dateToStart.startOf('day').valueOf();
	const endTs = Moment().endOf('day').valueOf();
	return { 'startTs' : startTs, 'endTs' : endTs };
}
const getDateRange = (index) => {
	var viewR =  [ 
		{ date : Moment().subtract(6, 'days'), selected : index == 0 },
		{ date : Moment().subtract(5, 'days'), selected : index == 1 },
		{ date : Moment().subtract(4, 'days'), selected : index == 2 },
		{ date : Moment().subtract(3, 'days'), selected : index == 3 },
		{ date : Moment().subtract(2, 'days'), selected : index == 4 },
		{ date : Moment().subtract(1, 'days'), selected : index == 5 },
		{ date : Moment(), selected : index == 6 } ];
	return viewR;
};
const getSelectedDate = (dateRange) => {
	return dateRange.find((element) => { return element.selected; });
};
const getAcceptedApplication = (applications, originatingProposal) => {
	var app =  applications.find((element) => { return element.proposal._id == originatingProposal._id; });
	return app;
};
const filterApplications = (applications, status) => {
	return applications.filter((element) => { return element.status == status });
};
const getProposalToDisplay = (proposalsInView, proposalId) => {
	return proposalsInView.find((element) => { return element._id === proposalId; });
};
const replaceProposalInView = (proposalsInView, proposal) => {
	return proposalsInView.map((element) => { return element._id === proposal._id ? proposal : element; });
};
const translateProposalToListViewBinding = (proposal) => {
	return { ...proposal, 
	    brokerName: proposal.agent.fullName, 
	    productName: proposal.loanPackageSummary.label, 
		interestRate: proposal.loanPackageSummary.interestRate, 
		compareLSelected: false, 
		compareRSelected: false};
};
const translateProposalsToListViewBinding = (proposals) => {
	return proposals.map((proposal) => {
	    return translateProposalToListViewBinding(proposal)
	});
};
const shiftProposalToDisplay = (proposalsInView, proposal, up) => {
	var currentIndex = proposalsInView.findIndex(x => x._id === proposal._id);
	return proposalsInView[up ? ++currentIndex : --currentIndex];
}
const setProposalToCompare = (proposalsInView, proposal, side) => {
	// For matching proposal and side switch, flag from false to true
	// For other proposals on the same side, set flag to false
	const newProposals = proposalsInView.map((prop) => 
		{ return prop._id === proposal?._id ? 
			{ ...prop, compareLSelected : L == side, compareRSelected : R == side } : 
			{ ...prop, compareLSelected : L == side ? false : prop.compareLSelected , compareRSelected : R == side ? false : prop.compareRSelected } ; 
		});
	return newProposals;
}
const INITIAL_STATE = {
	reviewPeriod: QUARTERLY_VIEW,
	mode: CALENDAR_MODE,
	proposalsInView: [],
	brokerAgentsInView: [],
	applications: [],
	lodgementApplications: [],
	underAssessmentApplications: [],
	conditionallyApprovedApplications: [],
	closedOrExpiredApplications: [],
	updated: Moment(),
	displayProposal: null,
	displayApplication: null,
	fetchProposals: fetchProposals,
	fetchProposal : fetchProposal,
	setProposalToCompare : setProposalToCompare,
	getQParams: getQParams,
	proposalCompareRight : null,
	proposalCompareLeft : null,
	qParams: null,
	viewRange : getDateRange(6),
	dateInView : getSelectedDate(getDateRange(6)),
	filter: FILTER_NONE,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
	case SHOW_APPLICATION:
	  return { ...state, displayApplication: action.payload, mode: APPLICATION_MODE};
	case NEW_APPLICATION:
	  return { ...state, displayApplication: getAcceptedApplication(state.applications, state.displayProposal),  mode: APPLICATION_MODE};
	case LOAD_APPLICATIONS:
	  return { ...state, applications: action.payload, 
		lodgementApplications: filterApplications(action.payload, 'begin_submission'), 
		underAssessmentApplications: filterApplications(action.payload, 'under_assessment'), 
		conditionallyApprovedApplications: filterApplications(action.payload, 'conditionally_approved'), 
		closedOrExpiredApplications: filterApplications(action.payload, 'not_approved').concat(filterApplications(action.payload, 'recently_expired')), 
	};
	case ACCEPT_PROPOSAL:
	  return { ...state, mode: APPLICATION_MODE };
	case SET_FILTER_MODE:
      return { ...state, filter: action.payload };
    case SET_QPARAMS:
      return { ...state, qParams: action.payload };
  	case REFRESH_PROPOSAL:
      return { ...state, 
      	displayProposal: translateProposalToListViewBinding(action.payload.response), 
      	proposalsInView: replaceProposalInView(state.proposalsInView, translateProposalToListViewBinding(action.payload.response)) };
  	case ADD_DATE_CONTENTS_FLAG:
  	  const data = action.payload;
  	  const selectedDate = {...state.viewRange[data.index], 
			hasContent: data.response != null && data.response.length > 0, };
  	  const viewRangeRefreshed = state.viewRange
  	  			.map((element) => { return element.date === selectedDate.date ? 
  	  									selectedDate : element; });
      const proposalsShown = state.viewRange[data.index].selected ?
      			translateProposalsToListViewBinding(action.payload.response) :
      			state.proposalsInView;
  	  return { ...state, 
  	  				viewRange: viewRangeRefreshed,
  	  				proposalsInView: proposalsShown ,
  	  				proposalCompareLeft: null, proposalCompareRight: null  };
  	case LOAD_PROPOSALS_IN_VIEW:
      return { ...state, 
      	proposalsInView: translateProposalsToListViewBinding(action.payload.response),
      	proposalCompareLeft: null, proposalCompareRight: null };  	
  	case SWITCH_PERIOD:
      return { ...state, reviewPeriod: action.payload, proposalCompareLeft: null, proposalCompareRight: null  };
	case TOGGLE_LIKE_PROPOSAL:
	  updateLikeProposal(action.payload);
      return { ...state, updated: Moment() };
    case SELECT_DATE:
      const dateIndex = action.payload.index;
      const qParams = action.payload.qParams;
      const dateClicked = { ...state.viewRange[dateIndex] , selected: true };
  	  const viewRangeDateSelected = state.viewRange
  	  			.map((element) => { return element.date === dateClicked.date ? 
  	  									dateClicked  : {...element, selected : false} });
  	  return { ...state, qParams : qParams,
  	  				viewRange: viewRangeDateSelected,
  	  				proposalCompareLeft: null, proposalCompareRight: null  };

  	case SWITCH_MODE:
      return { ...state, mode: action.payload,  };
  	case NEXT_PROPOSAL:
      return { ...state, mode: PROPOSAL_MODE, displayProposal: shiftProposalToDisplay(state.proposalsInView, state.displayProposal, true)};
  	case PREV_PROPOSAL:
      return { ...state, mode: PROPOSAL_MODE, displayProposal: shiftProposalToDisplay(state.proposalsInView, state.displayProposal, false)};
    case SHOW_PROPOSAL:
      return { ...state, mode: PROPOSAL_MODE, displayProposal: getProposalToDisplay(state.proposalsInView, action.payload)};
    case SELECT_PROPOSAL_TO_COMPARE:
    	// Called before fetch /loanpackages
      return { ...state, mode: COMPARE_MODE, updated: Moment(), 
      			proposalsInView: setProposalToCompare(state.proposalsInView, action.payload.proposal, action.payload.side)};
 	case LOAD_COMPARE_PROPOSALS:
    	// Called on success in fetch /loanpackages
 		const currentOppositeProposal = action.payload.side == R ? state?.proposalCompareLeft : state?.proposalCompareRight;
 		const newOppositeProposal = action.payload?.loanPackage?.proposalId == currentOppositeProposal?.proposalId ? null : currentOppositeProposal ;
      return { ...state, mode: COMPARE_MODE, updated: Moment(), 
      	proposalCompareRight: action.payload.side == R ? action.payload?.loanPackage : newOppositeProposal,
      	proposalCompareLeft: action.payload.side == L ? action.payload?.loanPackage : newOppositeProposal
      	};
    case LOAD_BROKERAGENT:
      return { ...state, brokerAgentsInView : state.brokerAgentsInView.concat([action.payload]) };
    default:
      return state;
  }
};