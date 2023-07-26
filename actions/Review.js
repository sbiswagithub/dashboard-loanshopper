import { SELECT_DETAILS_PANEL, SWITCH_PERIOD, SELECT_DATE, SWITCH_MODE, 
	LOAD_PROPOSALS_IN_VIEW, LOAD_PROPOSAL_DETAILS, SELECT_PROPOSAL_TO_COMPARE,
	SHOW_PROPOSAL, NEXT_PROPOSAL, PREV_PROPOSAL, ADD_DATE_CONTENTS_FLAG,
  LOAD_COMPARE_PROPOSALS, TOGGLE_LIKE_PROPOSAL, REFRESH_PROPOSAL, HIDE_MODAL, SHOW_MODAL, SET_QPARAMS,
  SET_FILTER_MODE, ACCEPT_PROPOSAL, LOAD_APPLICATIONS, NEW_APPLICATION, SHOW_APPLICATION, 
  SHOW_SUBMITTED_APPLICATION_MODAL, HIDE_SUBMITTED_APPLICATION_MODAL, SHOW_NEXT_STEPS, 
  LOAD_BROKERAGENT, SELECT_DISPLAY_PRODUCT, NEXT_DISPLAY_STEP, TOGGLE_CLAIM_CASHBACK, 
  TOGGLE_APPLICATION_STATUS, TOGGLE_BROKER_MESSAGES, TOGGLE_DOCUMENTS_UPLOAD, 
  PICK_DOCUMENT_TYPE, LOAD_DOCUMENT_SESSION, SELECT_UPLOAD_DOCUMENT, 
  CLOSE_UPLOAD_DOCUMENT, DOCUMENT_UPLOAD_RESULT, SET_PROPOSAL_DOCUMENTS } from '../actions/types';
import {L,R} from '../constants/common';

export const setProposalDocuments = (result) => {
  return {
    type : SET_PROPOSAL_DOCUMENTS,
    payload : result
  }
}

export const setDocumentUploadResult = (result) => {
  return {
    type : DOCUMENT_UPLOAD_RESULT,
    payload : result
  }
}

export const closeUploadDocument = () => {
  return {
    type : CLOSE_UPLOAD_DOCUMENT,
  }
}

export const showSelectUploadDocumentModal = () => {
  return {
    type : SELECT_UPLOAD_DOCUMENT,
  }
}

export const addDocumentSession = (documentMetadata) => {
  return {
    type : LOAD_DOCUMENT_SESSION,
    payload: documentMetadata,
  }
}

export const setDocumentTypeToUpload = (documentType) => {
  return {
    type : PICK_DOCUMENT_TYPE,
    payload: documentType,
  }
}

export const toggleDocumentsUpload = () => {
  return {
    type : TOGGLE_DOCUMENTS_UPLOAD,
  }
}

export const toggleBrokerMessages = () => {
  return {
    type : TOGGLE_BROKER_MESSAGES,
  }
}

export const toggleClaimCashback = () => {
  return {
    type : TOGGLE_CLAIM_CASHBACK,
  }
}

export const toggleApplicationStatus = () => {
  return {
    type : TOGGLE_APPLICATION_STATUS,
  }
}

export const changeDisplay = (up) => {
  return {
    type : NEXT_DISPLAY_STEP,
    payload : up
  }
}

export const setDisplayProduct = (loanProductLink) => {
  return {
    type : SELECT_DISPLAY_PRODUCT,
    payload : loanProductLink
  }
}

export const loadBrokerAgent = (response) => {
  return {
    type: LOAD_BROKERAGENT,
    payload: response,
  };
};
export const toggleNextSteps = () => {
  return {
      type: SHOW_NEXT_STEPS,
	  };
}
export const hideSubmittedApplicationMessage = () => {
  return {
      type: HIDE_SUBMITTED_APPLICATION_MODAL,
	  };
}
export const showSubmittedApplicationMessage = () => {
  return {
      type: SHOW_SUBMITTED_APPLICATION_MODAL,
	  };
}
export const showApplication = (application) => {
  return {
      type: SHOW_APPLICATION,
      payload: application,
	  };
}
export const newApplication = () => {
  return {
      type: NEW_APPLICATION,
	  };
}
export const loadApplications = (applications) => {
  return {
      type: LOAD_APPLICATIONS,
      payload: applications,
	  };
}
export const acceptProposal = () => {
  return {
      type: ACCEPT_PROPOSAL,
	  };
}
export const setFilterMode = (filterMode) => {
  return {
	    type: SET_FILTER_MODE,
	    payload: filterMode,
	  };
}
export const toggleFilterModal = (showHide) => {
  return {
	    type: TOGGLE_FILTER_MODAL ,
	    payload: showHide,
	  };

}
export const setQParams = (qParams) => {
  return {
	    type: SET_QPARAMS,
	    payload: qParams,
	  };
};
export const hideModal = () => {
  return {
	    type: HIDE_MODAL,
	  };
}
export const showModal = () => {
  return {
	    type: SHOW_MODAL,
	  };
}
export const refreshProposal = (response) => {
  return {
    type: REFRESH_PROPOSAL,
    payload: response,
  };
};
export const toggleLikeProposal = (props) => {
  return {
    type: TOGGLE_LIKE_PROPOSAL,
    payload: props,
  };
};
export const loadComparePackageLeft = (loanPackage) => {
  return {
    type: LOAD_COMPARE_PROPOSALS ,
    payload: {loanPackage: loanPackage, side: L},
  };
};
export const loadComparePackageRight = (loanPackage) => {
  return {
    type: LOAD_COMPARE_PROPOSALS ,
    payload: {loanPackage: loanPackage, side: R},
  };
};
export const selectTile = (proposal, side) => {
  return {
    type: SELECT_PROPOSAL_TO_COMPARE,
    payload: {proposal: proposal, side: side},
  };
};
export const addContentsFlag = (response) => {
  return {
    type: ADD_DATE_CONTENTS_FLAG,
    payload: response,
  };
};
export const loadProposals = (proposals) => {
  return {
    type: LOAD_PROPOSALS_IN_VIEW,
    payload: proposals,
  };
};
export const shiftProposal = (direction) => {
  return {
    type: direction ? NEXT_PROPOSAL : PREV_PROPOSAL ,
  };
};
export const selectDetailsPanel = (panel) => {
  return {
    type: SELECT_DETAILS_PANEL,
    payload: panel,
  };
};
export const loadProposalDetails = (proposal) => {
  return {
    type: LOAD_PROPOSAL_DETAILS,
    payload: proposal,
  };
};
export const setReviewPeriod = (reviewPeriod) => {
  return {
    type: SWITCH_PERIOD,
    payload: reviewPeriod,
  };
};
export const setViewMode = (mode) => {
  return {
    type: SWITCH_MODE,
    payload: mode,
  };
};
export const selectDate = (index) => {
  return {
    type: SELECT_DATE,
    payload: index,
  };
};
export const showProposal = (proposalId) => {
  return {
    type: SHOW_PROPOSAL,
    payload: proposalId,
  };
};