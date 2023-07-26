import {
  CLEAR_TRIAL_ACCOUNT_MSG_2, TOGGLE_LIKE_PROSPECT, LOAD_BROKER_PROSPECTS, CLOSE_BROKER_PROSPECTS, 
  LOAD_BROKER_PROSPECT_COUNTS, SHOW_MORE_PROSPECTS, PROSPECTS_FILTER
} from '../actions/types';
import * as constants from '../constants/prospects';
import Moment from 'moment';


const prospectsToProspectTiles = prospects => {
  var tiles = [];
  prospects.forEach(prospect => {
    var age = prospect?.mainBorrower.dateOfBirth == null ? '' : Moment().diff(Moment(prospect.mainBorrower.dateOfBirth),'years');
    var name = (prospect.mainBorrower.title + ' ' + prospect.mainBorrower.firstName + ' ' + prospect.mainBorrower.lastName);
    tiles.push({
      ...prospect,
      name: name.length > 10 ? name.slice(0, 10)+'...' : name,
      age: age,
      profession: prospect.mainBorrower.primaryProfession.length > 10 ? prospect.mainBorrower.primaryProfession.slice(0, 10)+'...' : prospect.mainBorrower.primaryProfession,
      location: prospect.mainBorrower.currentAddress.state,
      postCode: prospect.mainBorrower.currentAddress.postCode,
      lending: prospect?.loanRequest?.loanAmount?.value > 0 ? prospect?.loanRequest?.loanAmount?.value : 'N/A',
    });
  });
  return tiles;
};

const INITIAL_STATE = {
	// Application state		
  prospectsFilter: constants.RECENT,
  updated: Moment(),
  page: 1,
  pagesize : 6,
  prospectCount: 0,
  prospects: [],
  prospectTiles : [],
  //  Array of Prospects
  // {
  //   "_id": "prospects-1651622410607-6-1",
  //   "age": 49,
  //   "borrowerProfiles": Array [
  //     Object {
  //       "_id": "borrowerprofile-1651622410607-27-1",
  //       "createdTs": 1651622512385,
  //       "hasAnnualSpend": false,
  //       "hasAssets": false,
  //       "hasCoborrower": false,
  //       "hasLiabilities": false,
  //       "hasLoanRequirements": true,
  //       "hasMonthlySpend": false,
  //       "hasWeeklySpend": false,
  //       "lastUpdatedTs": 1651827963112,
  //       "loanRequestId": "loanrequest-1651622410607-33-1",
  //     },
  //   ],
  //   "brokerAgentId": "broker-1651622410607-30-1",
  //   "createdTs": 1651622568515,
  //   "expiryTs": 1659398568000,
  //   "lastUpdatedTs": 1651622568515,
  //   "lending": 1030000,
  //   "loanRequest": Object {
  //     "_id": "loanrequest-1651622410607-33-1",
  //     "borrowers": Object {
  //       "mainApplicant": Object {
  //         "_id": "borrower-1651622410607-28-1",
  //       },
  //     },
  //     "createdTs": 1651622512100,
  //     "financials": Object {
  //       "annualIncome": Object {
  //         "value": 469000,
  //       },
  //     },
  //     "lastUpdatedTs": 1651827962827,
  //     "loanAmount": Object {
  //       "value": 1030000,
  //     },
  //     "loanProcessing": "Normal",
  //     "loanProfile": "Refinance",
  //     "loanPurpose": "Investment",
  //   },
  //   "loanRequestId": "loanrequest-1651622410607-33-1",
  //   "location": "NSW",
  //   "mainBorrower": Object {
  //     "_id": "borrower-1651622410607-28-1",
  //     "accountId": "r5n7amNcvH",
  //     "createdTs": 1651622473236,
  //     "currentAddress": Object {
  //       "addresLine1": "11 Harbour St",
  //       "countryCode": "AU",
  //       "externalId": "ChIJlwlOdTuuEmsRb3TAppvtDi4",
  //       "fullAddress": "11 Harbour St, Sydney NSW 2000, Australia",
  //       "postCode": "2000",
  //       "state": "NSW",
  //       "suburb": "Sydney",
  //     },
  //     "dateOfBirth": 105321685000,
  //     "email": "rraje_2000@yahoo.com",
  //     "employmentType": "Permanent",
  //     "firstName": "A",
  //     "immigrationStatus": "Resident",
  //     "lastName": "B",
  //     "lastUpdatedTs": 1651622473236,
  //     "mobile": "0427967771",
  //     "primaryProfession": "AGENT - REPOSSESSION",
  //     "title": "Mr",
  //   },
  //   "name": "Mr A B",
  //   "postCode": "2000",
  //   "profession": "AGENT - RE...",
  // }

  // Flags
  hasMore: false,
  showTrialAccountMessage: true,

};

export default (state = INITIAL_STATE, action) => {
  if (action.error != null) return { ...state};
  switch (action.type) {
    case TOGGLE_LIKE_PROSPECT:
      return { ...state,  };
    case CLEAR_TRIAL_ACCOUNT_MSG_2:
      return { ...state, showTrialAccountMessage: false };
    case LOAD_BROKER_PROSPECTS:
      var newProspects = action.payload.reload || action.payload.page == state.page 
        ? action.payload.prospects : state.prospects.concat(action.payload.prospects);
      var newProspectTiles = prospectsToProspectTiles(newProspects);
      var pageNum = action.payload.reload ? 1 : Math.max(1,Math.floor(newProspectTiles.length/state.pagesize))   ;
      //console.log('Displaying page ' + pageNum + ' of ' + Math.ceil(newProspectTiles.length/state.pagesize));
      //console.log('Displaying records ' + newProspectTiles.length  + ' of ' + state.prospectCount);
      return { ...state, prospectsFilter : action.payload.prospectsFilter, prospects : newProspects, prospectTiles : newProspectTiles,  page: pageNum, hasMore: newProspectTiles.length < state.prospectCount };
    case LOAD_BROKER_PROSPECT_COUNTS:
      return { ...state, prospectCount : action.payload.count };
    case CLOSE_BROKER_PROSPECTS:
      return { ...state, prospects : [], prospectTiles : [],  page: 1 };
    case SHOW_MORE_PROSPECTS:
      var nextPage = state.page +1;
      return { ...state, page: nextPage, updated: Moment() };

    default:
      return state;
  }
};