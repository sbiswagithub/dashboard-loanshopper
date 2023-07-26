import store from "../reducers"
import * as Linking from 'expo-linking';
import { API_ACCOUNTS_URI, API_DOCUMENTS_URI, API_DOCUMENT_METADATA_URI, API_ME_URI, API_BORROWER_BROKERAGENTS_URI, API_BORROWER_MESSAGES_URI,
	API_CLIENT_CONNECTIONS_URI, API_BORROWER_URI, API_LOAN_PACKAGES_URI, API_LOAN_REQUESTS_URI } from "../constants/apiUrls";
import { ERROR_DIALOG_PUBLIC_MSG_1, ERROR_DIALOG_TITLE_1,  } from '../constants/banners';
import { toQueryString } from './Utils'


/*
 * @props : {status: ..., textMessageId: ...}
 */    
export const updateMessageStatus = (props, onSuccess, onError) => (dispatch) =>  {
	const uri = `${API_BORROWER_MESSAGES_URI}/` + props.textMessageId;
	const body = JSON.stringify({status : props.status,_id: props.textMessageId})
	console.log(body)
	return 	fetch(uri, {
		    method: "PATCH",
			headers: {  'Authorization': store.getState().authReducer.accessCode, 'Content-Type': 'application/json'},
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
	    .then(json => {
			if (onSuccess != undefined && json?.success)
				onSuccess(json);
			else if (onError != undefined)
				onError({
                    showDialog: true, 
                    dialogTitle: ERROR_DIALOG_TITLE_1, 
                    publicMessage: json?.error?.message != null ? json?.error?.message : ERROR_DIALOG_PUBLIC_MSG_1, 
                    logMessage: json?.error
                });
	    })
	    .catch((error) => {
		    //console.log('Boo in PATCH updateMessageStatus');
		    //console.log(error);
			if(onError != undefined) 
				onError(error);	  	
	    });
}

/*
 * @props : { brokerAgentId:..., text:..., }
 */    
export const sendBrokerMessage = (props, onSuccess, onError) => (dispatch) =>  {
	const uri = `${API_BORROWER_MESSAGES_URI}`;
	const body = JSON.stringify({...props, sender:'borrower'})
	//console.log(body)
	return 	fetch(uri, {
		    method: "POST",
			headers: {  'Authorization': store.getState().authReducer.accessCode, 'Content-Type': 'application/json'},
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
	    .then(json => {
			if (onSuccess != undefined && json?.success)
				onSuccess(json);
			else if (onError != undefined)
				onError({
                    showDialog: true, 
                    dialogTitle: ERROR_DIALOG_TITLE_1, 
                    publicMessage: json?.error?.message != null ? json?.error?.message : ERROR_DIALOG_PUBLIC_MSG_1, 
                    logMessage: json?.error
                });
	    })
	    .catch((error) => {
		    //console.log('Boo in POST sendBrokerMessage');
		    //console.log(error);
			if(onError != undefined) 
				onError(error);	  	
	    });
}
/*
 * @props : { qParams : {'brokerAgentId' : ...}, 
 * 				accessCode:... }
 * Returns an array of messages [{
	"text": ..,
	"sender": ..,
	"createdTs": ..,
	"_id": ..}]
 */    
export const getBrokerMessages = (props, onSuccess, onError) => (dispatch) => {
	const qParams = props.qParams;
	const uri = `${API_BORROWER_MESSAGES_URI}` + toQueryString({ ...qParams });
	//console.log(uri)
	return fetch(uri, {
		    method: "GET",
			headers: {  'Authorization': store.getState().authReducer.accessCode, 'Content-Type': 'application/json'},
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
	    .then(json => {
		    //console.log(json);
			if (onSuccess != undefined)
				onSuccess(json);
	    })
	    .catch((error) => {
		    //console.log('Boo in GET getBrokerMessages');
		    //console.log(error);
			if(onError != undefined) 
				onError(error);	  	
	    });
}

export const resendOtp = (props, onSuccess, onError) => (dispatch) => {
	//console.log(props)
	const uri = `${API_BORROWER_URI}/resendOtp`  ;
	//console.log(uri)
	return fetch(uri, {
		method: "PUT",
		headers: { 
			'Content-Type': 'application/json', 
		},
		body: JSON.stringify(props)
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
                    logMessage: 'Failed to connect to ' + uri
                });
                return Promise.reject(error);
			} else
	    		return response.json();
	    })
	    .then(json => {
			if (onSuccess != undefined && json?.success)
				onSuccess(json);
			else if (onError != undefined)
				onError({
                    showDialog: true, 
                    dialogTitle: ERROR_DIALOG_TITLE_1, 
                    publicMessage: json?.error?.message != null ? json?.error?.message : ERROR_DIALOG_PUBLIC_MSG_1, 
                    logMessage: json?.error
                });
	    })
	    .catch((error) => {
		    //console.log('Boo in GET resendOtp');
		    //console.log(error);
			if(onError != undefined) 
				onError(error);	  	
	    });
}

export const confirmLoanshopperPassword = (props, onSuccess, onError) => (dispatch) => {
	//console.log(props)
	const uri = `${API_BORROWER_URI}/changeLoanshopperPassword`  ;
	//console.log(uri)
	return fetch(uri, {
		method: "PUT",
		headers: { 
			'Content-Type': 'application/json', 
		},
		body: JSON.stringify({
				email : props.email, otpCode : props.confirmationCode, temporaryPassword : props.password
			})
		})
	    .then(response => {
			//console.log(response)
			if (response.status == 403 || response.status == 404) {
				const error = Object.assign({}, {
					status: response.status,
					statusText: response.statusText,
					showDialog: true, 
					dialogTitle: ERROR_DIALOG_TITLE_1, 
					publicMessage: ERROR_DIALOG_PUBLIC_MSG_2, 
					logMessage: 'Failed to connect to ' + uri
				});
				return Promise.reject(error);
			} else if (response.status >= 400 && response.status < 600) {
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
	    .then(json => {
			if (onSuccess != undefined && json?.success)
				onSuccess(json);
			else if (onError != undefined)
				onError({
                    showDialog: true, 
                    dialogTitle: ERROR_DIALOG_TITLE_1, 
                    publicMessage: json?.error?.message, 
                    logMessage: json?.error
                });
	    })
	    .catch((error) => {
		    //console.log('Boo in GET confirmLoanshopperPassword');
		    //console.log(error);
			if(onError != undefined) 
				onError(error);	  	
	    });
}

export const resetLoanshopperPassword = (props, onSuccess, onError) => (dispatch) => {
	//console.log(props)
	const uri = `${API_ACCOUNTS_URI}/resetLoanshopperPassword` + toQueryString(props) ;
	//console.log(uri)
	return fetch(uri, {
		method: "GET",
		headers: { 
			'Content-Type': 'application/json', 
		},
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
                    logMessage: 'Failed to connect to ' + uri
                });
                return Promise.reject(error);
			} else
	    		return response.json();
	    })
	    .then(json => {
			if (onSuccess != undefined && json?.success)
				onSuccess(json);
			else if (onError != undefined)
				onError({
                    showDialog: true, 
                    dialogTitle: ERROR_DIALOG_TITLE_1, 
                    publicMessage: json?.error?.message, 
                    logMessage: json?.error
                });
	    })
	    .catch((error) => {
		    //console.log('Boo in GET resetLoanshopperPassword');
		    //console.log(error);
			if(onError != undefined) 
				onError(error);	  	
	    });
}

export const getLoanRequest = (onSuccess, onError) => (dispatch) => {
	return fetch(API_LOAN_REQUESTS_URI, {
				    method: "GET",
				    headers: {  'Authorization': store.getState().authReducer.accessCode, 'Content-Type': 'application/json'},
				})
			    .then(response => {
					if (response.status >= 400 && response.status < 600) {
		                const error = Object.assign({}, {
		                    status: response.status,
		                    statusText: response.statusText,
		                    showDialog: true, 
		                    dialogTitle: ERROR_DIALOG_TITLE_1, 
		                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
                    		logMessage: 'Failed to connect to ' + API_LOAN_REQUESTS_URI
		                });
		                return Promise.reject(error);
					} else
			    		return response.json();
			    })
			    .then((json) => {
					if(onSuccess != null) onSuccess(json)
			    })
			    .catch((error) => {
				    //console.log('Boo in GET /loanrequests ');
				    //console.log(error);
					  if (onError != null) onError(error)
				});
}

export const borrowerSignUp = (props, onSuccess, onError) => (dispatch) => {
	return  fetch(API_BORROWER_URI, {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: props.title,
				firstName: props.firstName,
				lastName: props.lastName,
				mobile: props.mobile,
				gender: props.title == 'Mr' ? 'M' : 'F',
				email: props.email,
				temporaryPassword: props.password
			}) 
        }).then(response => {
		//console.log(response)
		if (response.status >= 400 && response.status < 600) {
			const error = Object.assign({}, {
				status: response.status,
				statusText: response.statusText,
				showDialog: true, 
				dialogTitle: ERROR_DIALOG_TITLE_1, 
				publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
				logMessage: 'Failed to connect to ' + API_BORROWER_URI
			});
			return Promise.reject(error);
		} else
			return response.json();
	}).then(response => {
		if (onSuccess != undefined)
			onSuccess(response);
	}).catch((error) => {
		//console.log('Boo in GET checkAccountExists');
		//console.log(error);
		if(onError != undefined) 
			onError(error);	  	
	});
}

export const checkAccountExists = (props, onSuccess, onError) => (dispatch) => {
	//console.log(props)
	const uri = `${API_ACCOUNTS_URI}/checkAccountExists` + toQueryString(props) ;
	//console.log(uri)
	return fetch(uri, {
		method: "GET",
		headers: { 
			'Content-Type': 'application/json', 
		},
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
                    logMessage: 'Failed to connect to ' + uri
                });
                return Promise.reject(error);
			} else
	    		return response.json();
	    })
	    .then(response => {
			if (onSuccess != undefined)
				onSuccess(response);
	    })
	    .catch((error) => {
		    //console.log('Boo in GET checkAccountExists');
		    //console.log(error);
			if(onError != undefined) 
				onError();	  	
	    });
}

export const openDocument = (props) => (dispatch) => {
	const uri = `${API_DOCUMENTS_URI}/`+ props._id + 
			toQueryString({ 'Authorization': store.getState().authReducer.accessCode, 'operationId' : 'loadDocument' });
	//console.log(uri)
	Linking.canOpenURL(uri).then(supported => {
		if (supported) {
			Linking.openURL(uri);
		} else {
			//console.log("Unable to open URI: " + uri);
		}
		});
}

export const deleteDocument = (props, onSuccess, onError) => (dispatch) => {
	//console.log('Deleting document ' + props._id)
	const uri = `${API_DOCUMENTS_URI}/`+ props._id;
	return fetch(uri, {
		method: "DELETE",
		headers: { 
			'Content-Type': 'application/json', 
			'Authorization': store.getState().authReducer.accessCode  
		},
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
	    .then(() => {
			if (onSuccess != undefined)
				onSuccess();
	    })
	    .catch((error) => {
		    //console.log('Boo in DELETE document');
		    //console.log(error);
			if(onError != undefined) 
				onError(error);	  	
	    });
}

export const fetchStoredDocuments = (onSuccess, onError) => (dispatch) => {
	//console.log('Fetching all stored documents')
	const uri = `${API_DOCUMENTS_URI}`+ toQueryString({ operationId : 'storedDocuments' });
	return fetch(uri, {
			method: "GET",
			headers: { 
				'Content-Type': 'application/json', 
				'Authorization': store.getState().authReducer.accessCode  
			},
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
			if (onSuccess !== undefined)
				onSuccess(json);
		})
		.catch((error) => {
			//console.log('Boo in GET documents'+ uri);
			//console.log(error);
			if(onError !== undefined) 
				onError(error);	  						  	
		});			
}

export const getDocumentUploadSession = (sharing, documentTypeId,  onSuccess, onError) => (dispatch) => {
  const uri = `${API_DOCUMENT_METADATA_URI}` + toQueryString({ 
	  'operationType': 'newS3UploadSession', 
	  sharing: sharing, 
	  documentTypeId : documentTypeId });
  return fetch(uri, {
				method: "GET",
				headers: { 'Content-Type': 'application/json',  'Authorization': store.getState().authReducer.accessCode  },
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
					Promise.reject(error)
				} else
					return response.json();
			})
			.then((json) => {
				if(onSuccess !== undefined)
					onSuccess(json);
			})
			.catch((error) => {
				if (onError !== undefined)
					onError(error);
			})
}

export const getMe = (onSuccess, onError) => (dispatch) => {
  const meUri = `${API_ME_URI}`;
  return fetch(meUri, {
		method: "GET",
		headers: { 'Authorization': store.getState().authReducer.accessCode },
	})
	.then((response) => response.json())
	.then((json) => {
		if(onSuccess)
			onSuccess(json);
	})
	.catch((error) => {
		if (onError)
			onError(error);
	})
}

export const fetchLoanPackageCommon = (loanPackageId, onSuccess, onError) => (dispatch) => {
	const uri = `${API_LOAN_PACKAGES_URI}/`+ loanPackageId;
    return fetch(uri, {
      method: "GET",
      headers: { 'Content-Type': 'application/json', 'Authorization': store.getState().authReducer.accessCode },
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
			return onError(error);
		} else
			return response.json();
	})
	.then((json) => {
		//console.log(json)
		//console.log(onSuccess)
		if(onSuccess !== undefined)  {
			//console.log('Updating')
			onSuccess(json);
		} else {
			//console.log('Nothing to update')
		}	
	})
	.catch((error) => {
		if (onError)
			onError(error);
	})
}

export const fetchBrokerAgent = (brokerAgentId, onSuccess, onError) => (dispatch) => {
	const brokerAgentsUri = `${API_BORROWER_BROKERAGENTS_URI}` + '/' + brokerAgentId;
    return fetch(brokerAgentsUri, {
      method: "GET",
      headers: { 'Content-Type': 'application/json', 'Authorization': store.getState().authReducer.accessCode },
    })
	.then(response => {
		if (response.status >= 400 && response.status < 600) {
			const error = Object.assign({}, {
			status: response.status,
			statusText: response.statusText,
			showDialog: true,
			dialogTitle: ERROR_DIALOG_TITLE_1,
			publicMessage: ERROR_DIALOG_PUBLIC_MSG_1,
			logMessage: 'Failed to connect to ' + brokerAgentsUri
			});
			return onError(error);
		} else
			return response.json();
	})
	.then((json) => {
		//console.log(json)
		//console.log(onSuccess)
		if(onSuccess !== undefined)  {
			//console.log('Updating')
			onSuccess(json);
		} else {
			//console.log('Nothing to update')
		}	
	})
	.catch((error) => {
		if (onError)
			onError(error);
	})
}

export const fetchClientConnections = (onSuccess, onError) => (dispatch) => {
  const clientConnectionsUri = `${API_CLIENT_CONNECTIONS_URI}` + toQueryString({ 'operationType': 'NewConnections' });
		//console.log(clientConnectionsUri)
  return fetch(clientConnectionsUri, {
      method: "GET",
      headers: { 'Content-Type': 'application/json',  'Authorization': store.getState().authReducer.accessCode },
    })
	.then(response => {
		if (response.status >= 400 && response.status < 600) {
			const error = Object.assign({}, {
				status: response.status,
				statusText: response.statusText,
				showDialog: true, 
				dialogTitle: ERROR_DIALOG_TITLE_1, 
				publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
				logMessage: 'Failed to connect to {API_BORROWER_URI}'
			});
			return Promise.reject(error);
		} else
			return response.json();
	})
	.then((json) => {
		if(onSuccess)
			onSuccess(json);
	})
	.catch((error) => {
		//console.log(error)
		if (onError)
			onError(error);
	})
}

export const getBorrower = (onSuccess, onError)  =>  (dispatch) => {
  const borrowerUri = `${API_BORROWER_URI}`;
  return fetch(borrowerUri, {
				method: "GET",
				headers: { 'Content-Type': 'application/json',  'Authorization': store.getState().authReducer.accessCode  },
			})
			.then(response => {
				if (response.status >= 400 && response.status < 600) {
					const error = Object.assign({}, {
						status: response.status,
						statusText: response.statusText,
						showDialog: true,
						dialogTitle: ERROR_DIALOG_TITLE_1,
						publicMessage: ERROR_DIALOG_PUBLIC_MSG_1,
						logMessage: 'Failed to connect to ' + borrowerUri
					});
					throw error
				} else
					return response.json();
			})
			.then((json) => {
				if(onSuccess)
					return onSuccess(json);
			})
			.catch((error) => {
				if (onError !== undefined)
					onError(error);
				return Promise.reject(error)
			})
}

export const acceptClientConnection = (clientConnection, onSuccess, onError) => (dispatch) => {
  const clientConnectionsUri = `${API_CLIENT_CONNECTIONS_URI}` + '/' + clientConnection._id  + toQueryString({ 'operationType': 'AcceptConnection' });
  return fetch(clientConnectionsUri, {
				method: "PATCH",
				headers: { 'Content-Type': 'application/json', 'Authorization': store.getState().authReducer.accessCode },
			    body: JSON.stringify(clientConnection),
			})
			.then(response => {
				if (response.status >= 400 && response.status < 600) {
					const error = Object.assign({}, {
						status: response.status,
						statusText: response.statusText,
						showDialog: true,
						dialogTitle: ERROR_DIALOG_TITLE_1,
						publicMessage: ERROR_DIALOG_PUBLIC_MSG_1,
						logMessage: 'Failed to connect to ' + clientConnectionsUri
					});
					return onError(error);
				} else
					return response.json();
			})
			.then((json) => {
				if(onSuccess)
					onSuccess(json);
			})
			.catch((error) => {
				if (onError)
					onError(error);
			})
}

export const rejectClientConnection = (clientConnectionId, onSuccess, onError) => (dispatch) => {
  const clientConnectionsUri = `${API_CLIENT_CONNECTIONS_URI}` + '/' + clientConnectionId + toQueryString({ 'operationType': 'RejectConnection' });
  return fetch(clientConnectionsUri, {
				method: "PATCH",
				headers: { 'Content-Type': 'application/json', 'Authorization': store.getState().authReducer.accessCode },
			})
			.then(response => {
				if (response.status >= 400 && response.status < 600) {
					const error = Object.assign({}, {
						status: response.status,
						statusText: response.statusText,
						showDialog: true,
						dialogTitle: ERROR_DIALOG_TITLE_1,
						publicMessage: ERROR_DIALOG_PUBLIC_MSG_1,
						logMessage: 'Failed to connect to ' + clientConnectionsUri
					});
					return onError(error);
				} else
					return response.json();
			})
			.then((json) => {
				if(onSuccess)
					onSuccess(json);
			})
			.catch((error) => {
				if (onError)
					onError(error);
			})
}