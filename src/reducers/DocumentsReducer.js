import Moment from 'moment';
import { SHOW_DOCUMENT_UPLOADER, HIDE_DOCUMENT_UPLOADER, SWITCH_DOCUMENT_UPLOADER_MODE, 
		SHOW_STAGING_DOCUMENTS, UPDATE_STAGING_DOC_TYPE, STORE_DOCUMENTS, DELETE_STAGING_DOCUMENT,
		SELECT_STORED_DOCUMENT_TYPE,  STAGING_DOCUMENT_IN_VIEW, SET_FILES_UPLOAD_OTP, 
		RELOAD_STAGING_DOCUMENT } from '../actions/types';
import { DIALOG_CLOSED_MODE, CHOOSE_UPLOADER_MODE, GOOGLE_DRIVE_MODE, DROPBOX_MODE, EMAIL_MODE, STAGING_DOCUMENTS_MODE, DEFAULT_MODE, EMAIL_MODE_3, 
	ID_DOCUMENTS_MODE, BANK_STATEMENTS_MODE, INC_PROOF_MODE, OTHER_DOCUMENTS_MODE,
	ID_DOC_TYPE, BANK_STMT_TYPE, INC_PROOF_TYPE, OTHER_DOC_TYPE } from '../constants/documents';
import { API_DOCUMENTS_URI, } from '../constants/apiUrls';
import { toQueryString } from '../actions/Utils';
import { ERROR_DIALOG_PUBLIC_MSG_1, ERROR_DIALOG_PUBLIC_MSG_2, ERROR_DIALOG_TITLE_1,  } from '../constants/banners';
import { trackPromise, usePromiseTracker  } from 'react-promise-tracker';

const updateDocumentType = (props, onSuccess) => {
	const uri = `${API_DOCUMENTS_URI}`+  '/' + props.documentId;
	const body = {
		"_id" : props.documentId,
		"operationId" : "updateStagingDocumentType",
		"metadata" : {
			"documentType" : props.documentType
		}
	}
	trackPromise(
		fetch(uri, {
			method: "PATCH",
			body: JSON.stringify(body),
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
					logMessage: 'Failed to connect to ${API_DOCUMENTS_URI}'
				});
				return Promise.reject(error);
			} else
				return response.json();
		})
		.then((json) => {
			if (onSuccess != null)
				onSuccess(json);
		})
		.catch((error) => {
			////console.log('Boo in PATCH documents'+ uri);
			////console.log(error);
			props.handleFetchError(error);	  						  	
		}));			
}

const fetchStoredDocuments = (props, onSuccess) => {
	const uri = `${API_DOCUMENTS_URI}`+  toQueryString({ operationId : 'storedDocuments' });
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
					logMessage: 'Failed to connect to ${API_DOCUMENTS_URI}'
				});
				return Promise.reject(error);
			} else
				return response.json();
		})
		.then((json) => {
			if (onSuccess != null)
				onSuccess(json);
		})
		.catch((error) => {
			//console.log('Boo in GET documents'+ uri);
			//console.log(error);
			props.handleFetchError(error);	  						  	
		}));			
}

const deleteDocument = (props, onSuccess) => {
	const uri = `${API_DOCUMENTS_URI}/`+ props._id;
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
	    		return response;
	    })
	    .then(() => {
			if (onSuccess != null)
				onSuccess();
	    })
	    .catch((error) => {
		    ////console.log('Boo in DELETE document');
		    ////console.log(error);
			props.handleFetchError(error);	  	
	    }));
}

const fetchStagingDocuments = (input, props, onSuccess) => {
	const uri = `${API_DOCUMENTS_URI}`+ toQueryString({ otp: input, 'operationId' : 'searchByOtp' });
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
					logMessage: 'Failed to connect to ${API_DOCUMENTS_URI}'
				});
				return Promise.reject(error);
			} else
				return response.json();
		})
		.then((json) => {
			if (onSuccess != null)
				onSuccess(json);
		})
		.catch((error) => {
			////console.log('Boo in GET documents'+ uri);
			////console.log(error);
			props.handleFetchError(error);	  	
		}));			

}

const storeDocuments = (documentIds, props, onSuccess) => {
	const qParams = {
		'id' : documentIds,
		'operationId': 'storeDocuments',
	};
	const uri = `${API_DOCUMENTS_URI}/` + toQueryString(qParams);
	trackPromise(
		fetch(uri, {
			method: "PATCH",
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
					logMessage: 'Failed to connect to ${API_DOCUMENTS_URI}'
				});
				return Promise.reject(error);
			} else
				return response.json();
		})
		.then((json) => {
			if (onSuccess != null)
				onSuccess(json);
		})
		.catch((error) => {
			////console.log('Boo in PATCH documents'+ uri);
			////console.log(error);
			props.handleFetchError(error);	  						  	
		}));			
}

const findDocument = (match, documents) => {
	return documents.find(function(item) {
		return item._id !== match._id;
	});
}	

const deleteStagingDocumentItem = (index, stagingDocuments) => {
	var document = stagingDocuments[index];
	return stagingDocuments.filter(function(item) {
		return item._id !== document._id;
	});
}	

const INITIAL_STATE = {
	// Application state
	mode: DEFAULT_MODE,
	otp: null,
	documentsMode: ID_DOCUMENTS_MODE,
	documentType: ID_DOC_TYPE,
	hasIdDoc : false,
	hasBankStmtDoc : false,
	hasIncProofDoc : false,
	hasOtherDoc : false,
	stagingDocuments: null,
	stagingDocumentInView : null,
	storedDocuments: [],
	updatedDocument: Moment(),
	storeDocumentsAction: storeDocuments,
	fetchStagingDocumentsAction: fetchStagingDocuments,
	updateDocumentTypeAction: updateDocumentType,
	fetchStoredDocumentsAction: fetchStoredDocuments,
	deleteDocumentAction: deleteDocument,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
	case SET_FILES_UPLOAD_OTP :
		return { ...state, updatedDocument: Moment(), otp: action.payload };
	case SELECT_STORED_DOCUMENT_TYPE :
		const storedDocumentsOfType = action.payload.storedDocuments == null ? 
			[] : 
			action.payload.storedDocuments.filter(document => document.metadata.documentType == action.payload.documentType);
		const ret = { ...state, 
			documentType : action.payload.documentType,
			storedDocuments : storedDocumentsOfType,
			hasIdDoc : action.payload.storedDocuments.findIndex(document => document.metadata.documentType == ID_DOC_TYPE) >= 0,
			hasBankStmtDoc : action.payload.storedDocuments.findIndex(document => document.metadata.documentType == BANK_STMT_TYPE) >= 0,
			hasIncProofDoc : action.payload.storedDocuments.findIndex(document => document.metadata.documentType == INC_PROOF_TYPE) >= 0,
			hasOtherDoc : action.payload.storedDocuments.findIndex(document => document.metadata.documentType == OTHER_DOC_TYPE) >= 0,
			documentsMode : 
				action.payload.documentType == ID_DOC_TYPE ? ID_DOCUMENTS_MODE :
				action.payload.documentType == BANK_STMT_TYPE ? BANK_STATEMENTS_MODE :
				action.payload.documentType == INC_PROOF_TYPE ? INC_PROOF_MODE :
				action.payload.documentType == OTHER_DOC_TYPE ? OTHER_DOCUMENTS_MODE : null, };
		return ret;
	case DELETE_STAGING_DOCUMENT:
		return { ...state, 
			updatedDocument: Moment(), 
			stagingDocuments: deleteStagingDocumentItem(action.payload, state.stagingDocuments) };
	case STORE_DOCUMENTS:
		return { ...state, 
			updatedDocument: Moment(), 
			stagingDocuments: null,
			mode: DIALOG_CLOSED_MODE };
	case STAGING_DOCUMENT_IN_VIEW:
		return { ...state, stagingDocumentInView: action.payload, updatedDocument: Moment(), };
	case SHOW_STAGING_DOCUMENTS:
		return { ...state, stagingDocuments: action.payload, 
			stagingDocumentInView: action.payload == null || action.payload.length == 0 ? null : action.payload[0] , 
			mode: EMAIL_MODE_3, 
			updatedDocument: Moment(), };
	case RELOAD_STAGING_DOCUMENT:
		return { ...state, stagingDocuments: action.payload, 
			stagingDocumentInView:  action.payload.find(document => document._id == state.stagingDocumentInView._id) , 
			updatedDocument: Moment(), };
	case SHOW_DOCUMENT_UPLOADER:
		return { ...state, mode: CHOOSE_UPLOADER_MODE };
	case HIDE_DOCUMENT_UPLOADER:
		return { ...state, mode: DIALOG_CLOSED_MODE };
	case SWITCH_DOCUMENT_UPLOADER_MODE:
		return { ...state, 
			updatedDocument: Moment(), 
			mode: action.payload };
	case DEFAULT_MODE:
		return { ...state, mode: DEFAULT_MODE };
  default:
      return state;
  } 
};