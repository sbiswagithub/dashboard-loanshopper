import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import HomeReducer from "./HomeReducer";
import EntryReducer from "./EntryReducer";
import DisclosureReducer from "./DisclosureReducer";
import BrokerSearchReducer from "./BrokerSearchReducer";
import RegistrationReducer from "./RegistrationReducer";
import BorrowReducer from "./BorrowReducer";
import ProposalCalendarReducer from "./ProposalCalendarReducer";
import ProposalReducer from "./ProposalReducer";
import HomeLoanActivityReducer from "./HomeLoanActivityReducer";
import DealsReducer from "./DealsReducer";
import DocumentsReducer from "./DocumentsReducer";
import BrokerReducer from "./BrokerReducer";
import ProspectReducer from "./ProspectReducer";
import LoanProductReducer from "./LoanProductReducer";
import AccountReducer from "./AccountReducer";

const appReducer = combineReducers({
  authReducer: AuthReducer,
  homeReducer: HomeReducer,
  entryReducer: EntryReducer,
  disclosureReducer: DisclosureReducer,
  brokerSearchReducer: BrokerSearchReducer,
  registrationReducer: RegistrationReducer,
  borrowReducer: BorrowReducer,
  proposalCalendarReducer: ProposalCalendarReducer,
  proposalReducer: ProposalReducer,
  homeLoanActivityReducer: HomeLoanActivityReducer,
  dealsReducer: DealsReducer,
  documentsReducer: DocumentsReducer,
  brokerReducer: BrokerReducer,
  prospectReducer: ProspectReducer,
  loanProductReducer: LoanProductReducer,
  accountReducer: AccountReducer,
});
export default (state, action) => {
  if (action.type === 'logout') {
    console.log('Logout')
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}
