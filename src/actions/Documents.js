import {
	SHOW_DOCUMENT_UPLOADER, HIDE_DOCUMENT_UPLOADER, SWITCH_DOCUMENT_UPLOADER_MODE, SHOW_STAGING_DOCUMENTS, 
	UPDATE_STAGING_DOC_TYPE, STAGING_DOCUMENT_IN_VIEW, DELETE_STAGING_DOCUMENT, STORE_DOCUMENTS,
	SELECT_STORED_DOCUMENT_TYPE , SET_FILES_UPLOAD_OTP, RELOAD_STAGING_DOCUMENT
} from './types';
import { DEFAULT_MODE, EMAIL_MODE, DROPBOX_MODE, GOOGLE_DRIVE_MODE, EMAIL_MODE_2 } from '../constants/documents';

export const setStagingDocument = (stagingDocument) => {
	return {
		type: STAGING_DOCUMENT_IN_VIEW,
		payload: stagingDocument
	}
}
export const setFilesUploadOtp = (otp) => {
	return {
		type: SET_FILES_UPLOAD_OTP,
		payload: otp
	}
}
export const selectStoredDocumentType = (documentType, storedDocuments ) => {
	return {
		type: SELECT_STORED_DOCUMENT_TYPE  ,
		payload: {documentType: documentType, storedDocuments: storedDocuments},
	}
}
export const deleteStagingDocument = (index) => {
	return {
		type: DELETE_STAGING_DOCUMENT,
		payload: index
	}
}
export const storeStagingDocuments = () => {
	return {
		type: STORE_DOCUMENTS,
	}
}
export const showStagingDocuments = (stagingDocuments) => {
  return {
		type: SHOW_STAGING_DOCUMENTS ,
		payload: stagingDocuments,
	  };
}
export const reloadStagingDocuments = (stagingDocuments) => {
  return {
		type: RELOAD_STAGING_DOCUMENT ,
		payload: stagingDocuments,
	  };
}
export const showDocumentUploaderModal = (mode) => {
  return {
		type: SHOW_DOCUMENT_UPLOADER ,
		payload: mode,
	  };
}
export const hideDocumentUploaderModal = () => {
  return {
	    type: HIDE_DOCUMENT_UPLOADER ,
	  };
}
export const switchDocumentUploaderMode = (mode) => {
  return {
		type: SWITCH_DOCUMENT_UPLOADER_MODE,
		payload: mode,
	  };
}
export const toDefaultDocumentUploaderMode = () => {
  return {
		type: SWITCH_DOCUMENT_UPLOADER_MODE,
		payload: DEFAULT_MODE,
	  };
}
export const toEmailMode = () => {
	return {
		type: SWITCH_DOCUMENT_UPLOADER_MODE,
		payload: EMAIL_MODE
	}
}
export const toGoogleDriveMode = () => {
	return {
		type: SWITCH_DOCUMENT_UPLOADER_MODE,
		payload: GOOGLE_DRIVE_MODE
	}
}
export const toDropboxMode = () => {
	return {
		type: SWITCH_DOCUMENT_UPLOADER_MODE,
		payload: DROPBOX_MODE
	}
}