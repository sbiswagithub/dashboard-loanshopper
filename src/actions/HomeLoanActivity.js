import { SHOW_ACTIVE_PROPOSALS, SHOW_DOCUMENTS }  from '../actions/types';

export const showActiveProposals = () => {
  return {
    type: SHOW_ACTIVE_PROPOSALS,
  };
};

export const showDocuments = () => {
  return {
    type: SHOW_DOCUMENTS,
  };
};
