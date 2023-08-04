import Moment from 'moment';
import { trackPromise, } from 'react-promise-tracker';

import { toQueryString } from '../actions/Utils';
import { LOAD_PROPOSAL_DETAILS, SELECT_DETAILS_PANEL, UPDATED_PROPOSAL, SHOW_MODAL, HIDE_MODAL, 
	SHOW_SUBMITTED_APPLICATION_MODAL, HIDE_SUBMITTED_APPLICATION_MODAL, SHOW_NEXT_STEPS, NEXT_DISPLAY_STEP, 
	TOGGLE_CLAIM_CASHBACK, TOGGLE_APPLICATION_STATUS, TOGGLE_BROKER_MESSAGES, TOGGLE_DOCUMENTS_UPLOAD, 
	PICK_DOCUMENT_TYPE, LOAD_DOCUMENT_SESSION, SELECT_UPLOAD_DOCUMENT, CLOSE_UPLOAD_DOCUMENT, 
	DOCUMENT_UPLOAD_RESULT, SET_PROPOSAL_DOCUMENTS } from '../actions/types';
import { FEATURES, } from '../constants/review';
import { API_MORTGAGE_APPLICATIONS_URI, API_LOAN_PACKAGES_URI, API_PROPOSALS_URI } from '../constants/apiUrls';
import { ERROR_DIALOG_PUBLIC_MSG_1, ERROR_DIALOG_TITLE_1 } from '../constants/banners';

/*
 * @props : { proposalId:..., accessCode:..., }
 */
const proposalBeginSubmission = (props, onSuccess, onError) => {
	const uri = `${API_PROPOSALS_URI}/`+ props.proposalId;
	trackPromise(
		fetch(uri, {
		    method: "PATCH",
			headers: { 'Content-Type': 'application/json', 'Authorization': props.accessCode },
			body:  JSON.stringify( { 'operationId' : 'beginSubmission' } )
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
		    ////console.log('Boo in PATCH proposal');
		    ////console.log(error);
		  	onError(error);	  						  	
	    }));
}

/*
 * @props : { proposalId:..., accessCode:..., }
 */
const deleteBrokerProposal = (props, onSuccess, onError) => {
	const uri = `${API_PROPOSALS_URI}/`+ props.proposalId;
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
                    logMessage: 'Failed to connect to {API_PROPOSALS_URI}'
                });
                return Promise.reject(error);
			} else
	    		return response.json();
	    })
	    .then((json) => {
		    onSuccess();
	    })
	    .catch((error) => {
		    ////console.log('Boo in DELETE proposals');
		    ////console.log(error);
		  	onError(error);	  						  	
	    }));
}
/*
 * @props : { accessCode:..., }
 */
const fetchApplications = (props, onSuccess, onError) => {
	const uri = `${API_MORTGAGE_APPLICATIONS_URI}/` + 
		toQueryString({ 'operationId' : 'findApplicationsForBorrower' });
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
		    ////console.log('Boo in GET applications');
		    ////console.log(error);
		  	onError(error);	  						  	
	    }));
}
/*
 * @props : { proposalId:..., loanPackageId: ..., accessCode:..., }
 */
const fetchLoanPackage = (props, onSuccess, onError) => {
	const uri = `${API_LOAN_PACKAGES_URI}/`+ props.loanPackageId;
	const proposalId = props?.proposalId;
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
                    logMessage: 'Failed to connect to {API_LOAN_PACKAGES_URI}'
                });
                return Promise.reject(error);
			} else
	    		return response.json();
	    })
	    .then((json) => {
		    onSuccess(toProposalDetailsTable({...json, proposalId: proposalId}));
	    })
	    .catch((error) => {
		    ////console.log('Boo in GET loanpackage/' + props.loanPackageId);
		    ////console.log(error);
		  	onError(error);	  						  	
	    }));
}
const getPackageRatesAndFees = (payload) => {
	const ratesAndFees = payload?.ratesAndFees == null ? [] : Object
			.values(payload.ratesAndFees)
			.filter(item => item?.label != null) // Choose Fees
			.map((fee) => {return {label:fee.label, value: amountOrDefault(fee?.amount?.value)}}); // Simplify as key value paid or label and amount
	ratesAndFees.push({label: 'Comparison rate', // Chose comparison rate
				value: payload?.ratesAndFees?.comparisonRatePI != null ?  
					payload?.ratesAndFees?.comparisonRatePI + '% p.a.' :
					payload?.ratesAndFees?.comparisonRateIO + '% p.a.' },
			{label: 'Interest rate', // Choose interest rate
				value: payload?.ratesAndFees?.interestRatePI != null ?  
					payload?.ratesAndFees?.interestRatePI + '% p.a.' :
					payload?.ratesAndFees?.interestRateIO + '% p.a.' });
	ratesAndFees.reverse();	// Rates first fees after
	return ratesAndFees.filter((element) => {return element?.value != null;});
}
const getPackageDiscountsAndOffers = (payload) => {
	const discountsAndBenefits = [			
			{label: 'Home loan discount', value: payload?.discounts?.homeLoanInterestRateDiscount == null ? null : payload?.discounts?.homeLoanInterestRateDiscount +  '%'},
			{label: 'Cash back amount', value: amountOrDefault(payload?.discounts?.cashbackAmount) },
		]
		.filter((element) => {return element?.value != null;})
		.concat(
			payload?.discounts?.transactionAccountFeeWaiver ?  [{'text':'Transaction account fee waived'}] : [] )
		.concat(
			payload?.discounts?.benefits?.benefit == null ?  [] : 
						payload?.discounts?.benefits?.benefit.map((element) => { return {'text':element}; }) );
	return discountsAndBenefits;
}
const getSpecialRequirements = (payload) => {
	const specialRequirements = []
		.concat(
			payload?.specialRequirements?.salaryAccount ?  [{'text':'Salary account crediting requirement'}] : [] )
		.concat(
			payload?.specialRequirements?.lowDoc != null ?  [{'text':payload.specialRequirements.lowDoc}] : [] )
		.concat(
			payload?.specialRequirements?.bridging ?  [{'text':'Bridging finance required'}] : [] )
		.concat(
			payload?.specialRequirements?.badCredit ?  [{'text':'Low credit rating support required'}] : [] )
		.concat(
			payload?.specialRequirements?.familyPledge ?  [{'text':'Family pledge agreement'}] : [] )
		.concat(
			payload?.specialRequirements?.otherRequirements?.label == null ?  [] : 
				payload?.specialRequirements?.otherRequirements?.label.map((label)=> {return {'text':label};}) );
	return specialRequirements;
}
const getFeatures = (payload) => {
	return [
		{label: 'Loan product', 
			value: payload?.bundleName == null ? payload?.productName : payload.bundleName },
		{label: 'Loan category', 
			value: payload?.features?.loanInterestCategory },
		{label: 'Loan term', 
			value:  payload?.features?.loanTermDescription},
		{label: 'Rate option', 
			value:  payload?.features?.rateOption},
		{label: 'Loan purpose', 
			value:  payload?.features?.ownerOccupierLoan ? 'Owner occupier' : 'Investor'},
		{label: 'Fixed term', 
			value:  payload?.features?.minimumTerm},
		{label: 'LVR', 
			value:  payload?.features?.lvr + '%'}];
}
/*
 A proposal here contains loan package details and is transformed to support UI bindings of details tables
 {
  "_id": "LOANPKG-2",
  "proposalId": "PROP-3",
  "discountsAndOffers": [{ "text": "Transaction account fee waived", }, ... ],
  "features": [{ "label": "Loan product", "value": "ANZ Standard Variable Home Loan",...
  "ratesAndFees": [{ "label": "Interest rate", "value": "2.09% p.a.", }, { "label": "Comparison rate",...
  "specialRequirements": [],
}
*/
const toProposalDetailsTable = (payload) => {
	return {
		_id: payload?._id,
		proposalId: payload?.proposalId,
		features : getFeatures(payload),
		ratesAndFees: getPackageRatesAndFees(payload),
		discountsAndOffers: getPackageDiscountsAndOffers(payload),
		specialRequirements: getSpecialRequirements(payload),
	};
};
const amountOrDefault = (amount, ifNull) => {
	return amount == null ? ifNull : '$' + amount;
};
const INITIAL_STATE = {
	selectedView: FEATURES,
	proposalDetails: toProposalDetailsTable(),
	fetchLoanPackage: fetchLoanPackage,
	deleteBrokerProposal: deleteBrokerProposal,
	toProposalDetailsTable : toProposalDetailsTable,
	proposalBeginSubmission: proposalBeginSubmission,
	fetchApplications: fetchApplications,
	updatedProposal: Moment(),
	isDeleteConfirmed: false,
	showDeleteWarning: false,
	showNewApplicationMessage: false,

	showOverview:true,
	showBrokerInfo: false,
	showNextSteps: false,
	showApplicationStatus: false,
	showClaimCashback: false,
	showBrokerMessages: false,
	showDocumentsUpload: false,
	selectedDocumentTypeForUpload: undefined,
	showConfirmUploadToS3: false,
	documentUploadSessions : [],
	documentUploadResult: undefined,
	displayStep: 1,
	proposalDocuments: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MODAL:
	  return { ...state, showDeleteWarning: true };
    case HIDE_MODAL:
	  return { ...state, showDeleteWarning: false };
  	case UPDATED_PROPOSAL:
      return { ...state, updatedProposal: Moment() };
  	case SELECT_DETAILS_PANEL:
      return { ...state, selectedView: action.payload };
  	case LOAD_PROPOSAL_DETAILS:
	  return { ...state, proposalDetails: action.payload };
	case SHOW_SUBMITTED_APPLICATION_MODAL:
	  return { ...state, showNewApplicationMessage: true };
	case HIDE_SUBMITTED_APPLICATION_MODAL:
	  return { ...state, showNewApplicationMessage: false };
	case NEXT_DISPLAY_STEP:
	  return { ...state, displayStep : action.payload === true ? state.displayStep + 1 : state.displayStep - 1,};
	case SHOW_NEXT_STEPS:
	  return { ...state, showNextSteps: !state.showNextSteps, showClaimCashback: false, showApplicationStatus: false, showDocumentsUpload: false, showBrokerMessages: false};
	case TOGGLE_CLAIM_CASHBACK:
	  return { ...state, showClaimCashback: !state.showClaimCashback, showApplicationStatus: false, showDocumentsUpload: false, showBrokerMessages: false};
	case TOGGLE_APPLICATION_STATUS:
	  return { ...state, showApplicationStatus: !state.showApplicationStatus, showDocumentsUpload: false, showBrokerMessages: false};
	case TOGGLE_BROKER_MESSAGES:
	  return { ...state, showBrokerMessages: !state.showBrokerMessages,showClaimCashback: false, showNextSteps: false, showApplicationStatus: false, showDocumentsUpload: false};
	case TOGGLE_DOCUMENTS_UPLOAD:
	  return { ...state, showDocumentsUpload: !state.showDocumentsUpload,showClaimCashback: false, showNextSteps: false, showApplicationStatus: false, showBrokerMessages: false};
	case PICK_DOCUMENT_TYPE:
	  return { ...state, selectedDocumentTypeForUpload : action.payload};
	case LOAD_DOCUMENT_SESSION:
		const documentUploadSessions = state.documentUploadSessions.concat(action.payload ? [action.payload] : [])
		const showConfirmUploadToS3 = documentUploadSessions.find(s => s?.documentTypeId === state.selectedDocumentTypeForUpload?.item?._id)
	  return { ...state, documentUploadSessions : documentUploadSessions, showConfirmUploadToS3: showConfirmUploadToS3};
	case SELECT_UPLOAD_DOCUMENT:
	  return { ...state, showConfirmUploadToS3: true};
	case DOCUMENT_UPLOAD_RESULT:
	  return { ...state, documentUploadResult: action.payload };
	case CLOSE_UPLOAD_DOCUMENT:
	  return { ...state, showConfirmUploadToS3: false, documentUploadSessions: [], selectedDocumentTypeForUpload: undefined, documentUploadResult : undefined };
	case SET_PROPOSAL_DOCUMENTS:
	  return { ...state, proposalDocuments : action.payload };
    default:
      return state;
  }
};