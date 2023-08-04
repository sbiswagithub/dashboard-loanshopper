import {
	LOAD_BORROWER_DETAILS,
	TITLE_SELECTED, FNAME_UPDATED, LNAME_UPDATED, EMAIL_UPDATED, MOBILE_UPDATED, 
	DOB_UPDATED, DATE_PICKER_TOGGLE,
	TITLE_COBORR_SELECTED, FNAME_COBORR_UPDATED, LNAME_COBORR_UPDATED, CO_BORR_EMAIL_UPDATED,
	COBORR_GR_ANN_INC_UPDATED,
	ADDRESS_FOUND, ADDRESS_SELECTED, ADDRESS_UNSELECTED,ADDRESS_BLUR,
	PROFESSION_FOUND, PROFESSION_SELECTED, PROFESSION_UNSELECTED,
	EMPLOYEMENT_TYPE_SELECTED,
	IMMIGRATION_STATUS_SELECTED,
	GR_ANN_INC_UPDATED, BORROWING_UPDATED,
	CASH_SAV_UPDATED, VEHICLES_UPDATED, INVST_UPDATED, OTH_ASSETS_UPDATED,
	CRED_CARD_UPDATED, OTH_LOANS_UPDATED,
	RENT_UPDATED, GROCERIES_UPDATED, LIFES_UPDATED, COMMUTE_UPDATED, 
	POWER_UPDATED, WATER_UPDATED, PHONES_UPDATED, INTERNET_UPDATED, CABLE_AND_STREAMING_UPDATED, 
	LIFE_INSURANCE_UPDATED, HEALTH_INSURANCE_UPDATED, 
	VEHICLE_INSURANCE_UPDATED, HOME_CONTENTS_INSURANCE_UPDATED,
	HOLIDAYS_UPDATED, DENTAL_UPDATED, UNANTICIPATED_UPDATED, OTHER_ANNUAL_UPDATED, 
	TOGGLE_EDIT, SHOW_MODAL, HIDE_MODAL,TOGGLE_ACCEPT,
	LOAN_PURPOSE_SELECTED, LOAN_PROFILE_SELECTED, LOAN_PROCESSING_SELECTED,
	LOAD_LOAN_REQUEST, CLEAR_CO_BORR, SHOW_NEXT, USER_EXISTS, DEPENDANTS_UPDATED, LVR_UPDATED, 
	RATE_PREF_UPDATED, FIRST_PREF_UPDATED, SECOND_PREF_UPDATED, REPAYMENT_PREF_UPDATED, EXTRAS_PREF_UPDATED, REDRAW, 
	CURR_HOMELOAN_UPDATED, CURR_LENDER_UPDATED, CURR_REPAYMENT_UPDATED, CURR_HOME_LOAN_TYPE_UPDATED, 
	MORTGAGE_ADDRESS_FOUND, MORTGAGE_ADDRESS_SELECTED, MORTGAGE_ADDRESS_UNSELECTED, MORTGAGE_ADDRESS_BLUR, MORTGAGE_ADDRESS_REMOVE,
	EDIT_MORE, CHECK_ACCOUNT_FOR_MOBILE, CHECK_ACCOUNT_FOR_EMAIL, PROFESSION_BLUR, EDIT_LESS, TOGGLE_ALERT
	} from '../actions/types';
import { TITLE_MR, TITLE_MS, TITLE_MRS, PERMANENT, SELF_EMPLOYED, CITIZEN, RESIDENT, WORK_VISA,
	BOTH_RESI_AND_INVEST, RESIDENTIAL, INVESTMENT, FIRST_MORTGAGE, REFINANCE, LT_4_WEEKS, NORMAL_PERIOD,
	RENT_LABEL, GROCERIES_LABEL, LIFESTYLE_LABEL, COMMUTE_LABEL, POWER_LABEL, WATER_LABEL, PHONES_LABEL, 
	INTERNET_LABEL, CABLE_AND_STREAMING_LABEL, LIFE_INSURANCE_LABEL, HEALTH_INSURANCE_LABEL, VEHICLE_INSURANCE_LABEL, 
	HOME_CONTENTS_INSURANCE_LABEL, HOLIDAYS_LABEL, DENTAL_LABEL, UNANTICIPATED_LABEL, OTHER_ANNUAL_LABEL,
	SAVINGS_LABEL, VEHICLES_LABEL, INVESTMENTS_LABEL, OTHER_ASSETS_LABEL, CREDIT_CARDS_LABEL, OTHER_LOANS_LABEL,
	WEEKLY_LABEL, MONTHLY_LABEL, ANNUAL_LABEL, LVR_DEFAULT, 
	LEAST_INTEREST_RATE, LOWER_REPAYMENTS, LONGER_FIXED_TERM, SHORTER_LOAN_DURATION, 
	REPAYMENT_TYPE_Y, REPAYMENT_TYPE_M, REPAYMENT_TYPE_F, REPAYMENT_TYPE_W, 
	EDIT_1, EDIT_2, EDIT_3, EDIT_4, EDIT_5, EDIT_6, EDIT_7 } from '../constants/disclosure';
import { NULL } from '../constants/common';
import Moment from 'moment';
import { REPAYMENT_Y, REPAYMENT_M, REPAYMENT_F, REPAYMENT_W, BRIDGING_FINANCE, OFFSET_ACCOUNT, HOME_INSURANCE, CREDIT_CARD, TX_ACCOUNT, SAV_ACCOUNT, HOME_AND_LAND_PKG, HOME_IMPROV_PKG, REDRAW_FACILITY } from '../constants/banners';

const validateEmail = email => {
	var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
	return email != null && re.test(email);
};
const validateMobile = mobile => {
	var re = /^04[0-9]{8}$/;
	return mobile != null  && re.test(mobile);
}
const findExpense = (loanRequest, label) => {
	const expenseItems = loanRequest?.financials?.expenses?.expenseItem == null ? 
		[] : loanRequest.financials.expenses.expenseItem;
	const item = expenseItems.find((element) => {
	    return element.label === label;
	  });
	return item == null ? 0 : item.amount.value;
};
const findAsset = (loanRequest, label) => {
	const assetItems = loanRequest?.financials?.assets?.assetItem == null ? 
		[] : loanRequest.financials.assets.assetItem;
	const item = assetItems.find((element) => {
	    return element.label === label;
	  });
	return item == null ? 0 : item.amount.value;
};
const findLiability = (loanRequest, label) => {
	const liabilityItems = loanRequest?.financials?.liabilityItems?.liabiltyItem == null ? 
		[] : loanRequest.financials.liabilityItems.liabiltyItem;
	const item = liabilityItems.find((element) => {
	    return element.label === label;
	  });
	return item == null ? 0 : item.amount.value;
};
const findHomeLoanChoice = (homeLoanChoice) => {
	return homeLoanChoice == null ? null :
		homeLoanChoice?.leastInterestRate != null  && homeLoanChoice.leastInterestRate ? LEAST_INTEREST_RATE :
		homeLoanChoice?.lowerRepayment != null  && homeLoanChoice.lowerRepayment ? LOWER_REPAYMENTS :
		homeLoanChoice?.longerFixedTerm != null  && homeLoanChoice.longerFixedTerm ? LONGER_FIXED_TERM : 
		homeLoanChoice?.shorterLoanDuration != null  && homeLoanChoice.shorterLoanDuration ? SHORTER_LOAN_DURATION : 
		null ;
};

const checkFullName = (title, firstName, lastName) => {
    	return (title != null && firstName != null && lastName != null) || 
    		((title == null && firstName == null && lastName == null) && !(title != null || firstName != null || lastName != null));
};
const propsToLoanRequest = props => {
	var loanRequest = {
		_id: props.loanRequest._id,
		loanProcessing: props.loanProcessing,
		loanProfile: props.loanProfile,
		loanPurpose: props.loanPurpose,
		loanAmount:  { value : props.borrowing },
		lvr: props.lvr,
		borrowers: { 
			mainApplicant: { 
				dateOfBirth: Moment(props.dob).valueOf(),
				currentAddress: { fullAddress: props.addressSelection, externalId: props.addressIdx, },
				employmentType: props.employmentType,
				immigrationStatus: props.immigrationStatus,
				primaryProfession: props.profession,
				numDependants: props.dependants
			}
		},
		financials : {
			annualIncome : { value : props.grossIncAnn }
		},
	};
	if (props.hasCoborrower) {
		loanRequest.borrowers.jointApplicant = {title:props.titleCoBorr, firstName:props.firstNameCoBorr, lastName:props.lastNameCoBorr};
		if (validateEmail(props.coBorrowerEmail)) {
			loanRequest.borrowers.jointApplicant.email = props.coBorrowerEmail;
		}
		if (props.coBorrGrossIncAnn > 0) {
			loanRequest.financials.annualIncomeJointApplicant = {value:props.coBorrGrossIncAnn};
		}
	}
	loanRequest.financials.assets = { assetItem : [
			{ label: SAVINGS_LABEL, amount : {value : props.cashSavings}},
			{ label: VEHICLES_LABEL, amount : {value : props.vehicles}},
			{ label: INVESTMENTS_LABEL, amount : {value : props.investments}},
			{ label: OTHER_ASSETS_LABEL, amount : {value : props.otherAssets}}
		]};
	loanRequest.financials.liabilities = { liabilityItem : [
			{ label: CREDIT_CARDS_LABEL, amount : {value : props.creditCards}},
			{ label: OTHER_LOANS_LABEL, amount : {value : props.otherLoans}}
		] };
	loanRequest.financials.expenses = { expenseItem : [
			{ label: RENT_LABEL, frequency: WEEKLY_LABEL, amount : {value : props.rent}},
			{ label: GROCERIES_LABEL, frequency: WEEKLY_LABEL, amount : {value : props.groceries}},
			{ label: LIFESTYLE_LABEL, frequency: WEEKLY_LABEL, amount : {value : props.lifestyle}},
			{ label: COMMUTE_LABEL, frequency: WEEKLY_LABEL, amount : {value : props.commute}},
			{ label: POWER_LABEL, frequency: MONTHLY_LABEL, amount : {value : props.power }},
			{ label: WATER_LABEL, frequency: MONTHLY_LABEL, amount : {value : props.water }},
			{ label: PHONES_LABEL, frequency: MONTHLY_LABEL, amount : {value : props.phones}}, 
			{ label: INTERNET_LABEL, frequency: MONTHLY_LABEL, amount : {value : props.internet }},
			{ label: CABLE_AND_STREAMING_LABEL, frequency: MONTHLY_LABEL, amount : {value : props.cableAndStreaming }},
			{ label: LIFE_INSURANCE_LABEL, frequency: MONTHLY_LABEL, amount : {value : props.lifeInsurancePrem }},
			{ label: HEALTH_INSURANCE_LABEL, frequency: MONTHLY_LABEL, amount : {value : props.healthInsurancePrem }},
			{ label: VEHICLE_INSURANCE_LABEL, frequency: MONTHLY_LABEL, amount : {value : props.vehicleInsurancePrem }},
			{ label: HOME_CONTENTS_INSURANCE_LABEL, frequency: MONTHLY_LABEL, amount : {value : props.homeContentsInsurancePrem }},
			{ label: HOLIDAYS_LABEL, frequency: ANNUAL_LABEL, amount : {value : props.holidays }},
			{ label: DENTAL_LABEL, frequency: ANNUAL_LABEL, amount : {value : props.dental }},
			{ label: UNANTICIPATED_LABEL, frequency: ANNUAL_LABEL, amount : {value : props.unanticipated }},
			{ label: OTHER_ANNUAL_LABEL, frequency: ANNUAL_LABEL, amount : {value : props.otherAnnual }},
		] };

	loanRequest.financials.assets.assetItem = loanRequest?.financials?.assets?.assetItem.filter(item => item.amount.value > 0);
	if (loanRequest.financials.assets.assetItem.length == 0)
		loanRequest.financials.assets = null;
	
	loanRequest.financials.liabilities.liabilityItem = loanRequest?.financials?.liabilities?.liabilityItem.filter(item => item.amount.value > 0);
	if (loanRequest.financials.liabilities.liabilityItem.length == 0)
		loanRequest.financials.liabilities = null;

	loanRequest.financials.expenses.expenseItem = loanRequest?.financials?.expenses?.expenseItem.filter(item => item.amount.value > 0);
	if (loanRequest.financials.expenses.expenseItem.length == 0)
		loanRequest.financials.expenses = null;

	loanRequest.preferences = {
		rateType : props.ratePreference,
		repaymentFrequency: props.repaymentPreference
	};
	
	loanRequest.preferences.firstPreference = {
		leastInterestRate : props?.firstPreference == LEAST_INTEREST_RATE,
		lowerRepayment : props?.firstPreference == LOWER_REPAYMENTS,
		longerFixedTerm : props?.firstPreference == LONGER_FIXED_TERM,
		shorterLoanDuration : props?.firstPreference == SHORTER_LOAN_DURATION
	};

	loanRequest.preferences.secondPreference = {
		leastInterestRate : props?.secondPreference == LEAST_INTEREST_RATE,
		lowerRepayment : props?.secondPreference == LOWER_REPAYMENTS,
		longerFixedTerm : props?.secondPreference == LONGER_FIXED_TERM,
		shorterLoanDuration : props?.secondPreference == SHORTER_LOAN_DURATION
	};

	loanRequest.extras = {
		includeBridgingFinance : props.includeBridgingFinance,
		offsetAccount: props.offsetAccount,
		homeInsurance: props.homeInsurance,
		creditCard: props.creditCard,
		transactionsAccount: props.transactionsAccount,
		savingsAccount: props.savingsAccount,
		homeAndLandPackage: props.homeAndLandPackage,
		homeImprovementPackage: props.homeImprovementPackage,
		redraw: props.redraw,
	};

	loanRequest.mortgageProperty = props.mortgageAddressesList;

	if (props?.isRefinance)
		loanRequest.currentMortgage = {
			lender : props.currentLender,
			loanAmount: {value: props.currentHomeLoan},
			loanType: props.currentHomeLoanType,
			averageMonthlyRepayment: {value: props.currentRepayment},
		};

	return loanRequest;
};


const INITIAL_STATE = {
	// Helper function
	propsToLoanRequest: propsToLoanRequest,
	checkFullName : checkFullName ,
	validateEmail : validateEmail,
	// Set defaults when loading from server fails
	// Application state
	editMode:true,
	updateMode: false,
	modalVisible: false,
	showNext: false,
	showAlert: false,
	addressSet: false,
	mortgageAddressSet:false,
	professionSet: false,
    showDp: false,
    showCoBorrDp: false,
    titleMr: false,
	titleMrs:false,
	titleMs:false,
    titleMrCoBorr: false,
	titleMrsCoBorr:false,
	titleMsCoBorr:false,
	isPermanent: true, 
	isSelfEmployed: false,
	isCitizen: false, 
	isResident: false, 
	isWorkVisa: false,
	isResidential: true,
	isInvestment: false,
	isBothResidentialAndInvestment: false,
	isFirstMortgage: true,
	isRefinance: false,
	isExpedited: false,
	isNormal: true,

	// Application state - Validation results
	edit: EDIT_1,
	isAccepted: false,
	hasTitle: false,
	hasFirstName: false, 
	hasLastName: false, 
	hasEmail: false, 
	hasValidEmail: false,
	hasMobile: false,
	hasValidMobile: false,
	hasGrossIncAnn: false, 
	hasBorrowing: false,
	hasOtherPersonalInfo: false,
	hasCoborrower: false,
	hasValidCoborrowerEmail: false,
	hasCoBorrGrossIncAnn:false,
	hasDuplicateEmail:false,
	hasDuplicateMobile:false,

	// Wrapper
	loanRequest: null,
	// API Request parameters - With defaults
	// Minimum required details
	addressSelection: '',
	mortgageAddressSelection: '',
	mortgageAddressesList: [],
    dob: null,
	profession: '',
    grossIncAnn:0,
    employmentType: PERMANENT, 
	immigrationStatus: CITIZEN,
	dependants: 0,
	// Loan Requirements
    loanPurpose: RESIDENTIAL,
    loanProfile: FIRST_MORTGAGE,
	loanProcessing: NORMAL_PERIOD,
	lvr:LVR_DEFAULT,
	borrowing:0,
	ratePreference: null,
	// One of LOWER_REPAYMENTS, 
	firstPreference: null,
	secondPreference: null,
	// One of REPAYMENT_TYPE_Y, REPAYMENT_TYPE_M, REPAYMENT_TYPE_F, REPAYMENT_TYPE_W
	repaymentPreference: REPAYMENT_M,
	includeBridgingFinance:false,
	offsetAccount:false,
	homeInsurance:false,
	creditCard:false,
	transactionsAccount:false,
	savingsAccount:false,
	homeAndLandPackage:false,
	redraw:false,
	homeImprovementPackage:false,

	currentHomeLoan: null,
	currentLender: null,
	currentRepayment: null,
	currentHomeLoanType: null,

	// Co-Borrower
    titleCoBorr:'',
    firstNameCoBorr: '',
    lastNameCoBorr:'',
    coBorrowerEmail:'',
    coBorrDob: null,
    coBorrGrossIncAnn:0,
	// Assets
	cashSavings:0, 
    vehicles:0, 
    investments:0, 
	otherAssets:0,
	// Liabilities
    creditCards:0,
	otherLoans:0,
	// Weekly Expenses
    rent:0, 
    groceries:0,
    lifestyle:0,
	commute:0,
	// Monthly Expenses
    power:0,
    water:0,
    phones:0, 
    internet:0,
    cableAndStreaming:0,
    lifeInsurancePrem:0,
    healthInsurancePrem:0,
    vehicleInsurancePrem:0,
	homeContentsInsurancePrem:0,
	// Annual Expenses
    holidays:0,
    dental:0,
    unanticipated:0,
    otherAnnual:0,

	// List options from GET calls when required
	// [{
    // "addressLine1": "43 Taylor St",
    // "countryCode": "AU",
    // "externalId": "ChIJTawIAUJakWsRBR4_C00V1Zs",
    // "fullAddress": "43 Taylor St, Woolloongabba QLD 4102, Australia",
    // "postCode": "4102",
    // "state": "QLD",
    // "suburb": "Woolloongabba",
    //}]
	addresses: [],
	mortgageAddresses:[],
    professions: [],

	// Temporary variables for selecting from list options
	addressIdx: '',
	previousAddressSelection: '',
	addressStart: '',
	mortgageAddressIdx: '',
	previousMortgageAddressIdx: '',
	mortgageAddressStart: '',
	professionIdx: '',
	professionPart: '',
	previousProfession: '',

	
	// Should be from Auth Reducer borrower
    borrowerId:'',
    title:'',
    firstName: '',
    lastName:'',
    email:'',
	mobile:'',

	lenderChoices: ['Adelaide Bank','AFG Home Loans','AFM','AIMS Home Loans','AMO','AMP Bank','ANZ','Arab bank Australia','Assured','Athena','Aussie','Austral Mortgage','Australian Military Bank','Australian Mutual Bank','Australian Unity','Auswide Bank','AWA Alliance Bank','Bank Australia','Bank of China','Bank First','Bank of Heritage Isle','Bank of Melbourne','Bank of us','Bank of Sydney','BankSA','BankVic','Bankwest','bcu','BDCU Alliance Bank','Bendigo Bank','Better Choice','Better Mortgage Management','Beyond Bank','Bluestone','BOQ (Bank of Queensland)','Broken Hill Community Credit Union','Catalyst Money','Central West Credit Union','ChoiceLend','Circle Alliance Bank','Citi','ClickLoans','Commonwealth Bank','Community First Credit Union','Credit Union SA','Defence Bank','Easy Street Financial Services','ECU','Family First Credit Union','Fire Service Credit Union','Firefighters Mutual Bank','First Choice Credit Union','First Option Bank','Firstmac','Fox Symes','Freedom Lend','Gateway Bank','G&C Mutual Bank','Geelong Bank','Goldfields Money','Great Southern Bank','Greater Bank','Heritage Bank','Holiday Coast Credit Union','Homeloans.com.au','Homestar Finance','HomeStart Finance','Horizon Bank','HSBC Home Loans','Hume Bank','Hunter United','Illawarra Credit Union','IMB Bank','Indigenous Business Australia','Keystart','La Trobe Financial','Laboratories Credit Union','Liberty','loans.com.au','Lysaght Credit Union','My Credit Union','Macquarie Bank','Macquarie Credit Union','ME Bank','Mortgage Choice','Mortgage House','Mortgageport','MOVE Bank','MyState','NAB','Newcastle Permanent','Northern Inland Credit Union','Nova Alliance Bank','Orange Credit Union','Pacific Mortgage Group','People’s Choice','Pepper Money','P&N Bank','Police Bank','Police Credit Union','Pulse Credit Union','QBANK','Qudos Bank','Queensland Country Bank','Queenslanders Credit Union','RACQ Bank','RAMS','Reduce','Regional Australia Bank','Resi','SCU','SERVICE ONE Alliance Bank','Southern Cross Credit Union','St.George Bank','State Custodians','Summerland Credit Union','Suncorp Bank','The Capricornian','The Mac','The Rock','Teachers Mutual Bank','The Mutual Bank','Tic:Toc Home Loans','Transport Mutual Credit Union','Unibank','Unity Bank','Unloan','Virgin Money','Westpac','WLTH','Woolworths Employees’ Credit Union','Yard','Yellow Brick Road'],
	currentLender: null,
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
  case LOAD_LOAN_REQUEST:
	  return { ...state, 
		  	editMode: action?.payload?._id == null, // Loan request does not exist
		  	updateMode: action?.payload?._id != null, 
		  	loanRequest: action.payload, 
			addressSet: true,
			professionSet: true,
			hasGrossIncAnn: true,
		    grossIncAnn: action?.payload?.financials?.annualIncome == null ? 0 : action.payload.financials.annualIncome.value,
		    borrowing: action?.payload?.loanAmount == null ? 0 : action.payload.loanAmount.value,
			isResidential: action?.payload?.loanPurpose == null ||  action.payload.loanPurpose == RESIDENTIAL,
			isInvestment: action?.payload?.loanPurpose != null &&  action.payload.loanPurpose == INVESTMENT,
			isBothResidentialAndInvestment: action.payload != null && action.payload.loanPurpose == BOTH_RESI_AND_INVEST,
			isFirstMortgage: action?.payload?.loanProfile == null || action.payload.loanProfile == FIRST_MORTGAGE,
			isRefinance: action?.payload?.loanProfile != null && action.payload.loanProfile == REFINANCE,
			isNormal: action?.payload?.loanProcessing == null || action.payload.loanProcessing == NORMAL_PERIOD,
			isExpedited: action?.payload?.loanProcessing != null && action.payload.loanProcessing == LT_4_WEEKS,
			loanPurpose: action?.payload?.loanPurpose == null ? RESIDENTIAL : action.payload.loanPurpose,
		    loanProfile: action?.payload?.loanProfile == null ? FIRST_MORTGAGE : action.payload.loanProfile,
		    loanProcessing: action?.payload?.loanProcessing == null ? NORMAL_PERIOD : action.payload.loanProcessing,
			lvr: action?.payload?.lvr == null ? LVR_DEFAULT : action.payload.lvr,
			mortgageAddressesList: action?.payload?.mortgageProperty == null ? [] : action.payload.mortgageProperty,
			mortgageAddresses: action?.payload?.mortgageProperty == null ? [] : action.payload.mortgageProperty,
			ratePreference: action?.payload?.preferences?.rateType,
			firstPreference: findHomeLoanChoice(action?.payload?.preferences?.firstPreference),
			secondPreference: findHomeLoanChoice(action?.payload?.preferences?.secondPreference),
			repaymentPreference: action?.payload?.preferences?.repaymentFrequency,
			includeBridgingFinance: action?.payload?.extras?.includeBridgingFinance,
			offsetAccount: action?.payload?.extras?.offsetAccount,
			homeInsurance: action?.payload?.extras?.homeInsurance,
			creditCard: action?.payload?.extras?.creditCard,
			transactionsAccount: action?.payload?.extras?.transactionsAccount,
			savingsAccount: action?.payload?.extras?.savingsAccount,
			homeAndLandPackage: action?.payload?.extras?.homeAndLandPackage,
			redraw: action?.payload?.extras?.redraw,
			homeImprovementPackage: action?.payload?.extras?.homeImprovementPackage,
			currentHomeLoan: action?.payload?.currentMortgage?.loanAmount?.value,
			currentLender: action?.payload?.currentMortgage?.lender,
			currentHomeLoanType: action?.payload?.currentMortgage?.loanType,
			currentRepayment: action?.payload?.currentMortgage?.averageMonthlyRepayment?.value,
			// API Request parameters - No defaults (mandatory)
		    titleCoBorr: action?.payload?.borrowers?.jointApplicant?.title,
		    titleMrCoBorr: action?.payload?.borrowers?.jointApplicant?.title == TITLE_MR,
			titleMrsCoBorr: action?.payload?.borrowers?.jointApplicant?.title == TITLE_MRS,
			titleMsCoBorr: action?.payload?.borrowers?.jointApplicant?.title == TITLE_MS,
		    firstNameCoBorr: action?.payload?.borrowers?.jointApplicant?.firstName,
		    lastNameCoBorr: action?.payload?.borrowers?.jointApplicant?.lastName,
		    coBorrowerEmail: action?.payload?.borrowers?.jointApplicant?.email,
		    coBorrDob: action?.payload?.borrowers?.jointApplicant?.dateOfBirth,
		    coBorrGrossIncAnn: action?.payload?.financials?.annualIncomeJointApplicant == null ? 0 : action.payload.financials.annualIncomeJointApplicant.value,
		    // Assets
		    cashSavings: findAsset(action.payload, SAVINGS_LABEL),
		    vehicles: findAsset(action.payload, VEHICLES_LABEL),
		    investments: findAsset(action.payload, INVESTMENTS_LABEL),
		    otherAssets: findAsset(action.payload, OTHER_ASSETS_LABEL),
			// Liabilities
		    creditCards: findLiability(action.payload, CREDIT_CARDS_LABEL),
		    otherLoans: findLiability(action.payload, OTHER_LOANS_LABEL),
			// Weekly expenses
		    rent: findExpense(action.payload, RENT_LABEL),
		    groceries: findExpense(action.payload, GROCERIES_LABEL),
		    lifestyle: findExpense(action.payload, LIFESTYLE_LABEL),
		    commute: findExpense(action.payload, COMMUTE_LABEL),
			// Monthly Expenses
			power: findExpense(action.payload, POWER_LABEL),
		    water: findExpense(action.payload, WATER_LABEL),
		    phones: findExpense(action.payload, PHONES_LABEL),
		    internet: findExpense(action.payload, INTERNET_LABEL),
		    cableAndStreaming: findExpense(action.payload, CABLE_AND_STREAMING_LABEL),
		    lifeInsurancePrem: findExpense(action.payload, LIFE_INSURANCE_LABEL),
		    healthInsurancePrem: findExpense(action.payload, HEALTH_INSURANCE_LABEL),
		    vehicleInsurancePrem: findExpense(action.payload, VEHICLE_INSURANCE_LABEL),
		    homeContentsInsurancePrem: findExpense(action.payload, HOME_CONTENTS_INSURANCE_LABEL),
			// Annual Expenses
		    holidays: findExpense(action.payload, HOLIDAYS_LABEL),
		    dental: findExpense(action.payload, DENTAL_LABEL),
		    unanticipated: findExpense(action.payload, UNANTICIPATED_LABEL),
		    otherAnnual: findExpense(action.payload, OTHER_ANNUAL_LABEL),

			// Application state
			modalVisible: false,
		    showDp: false,			
			// Application state for validation
			isAccepted: false,
			hasGrossIncAnn: action?.payload?.financials?.annualIncome != null, 
			hasBorrowing: action?.payload?.loanAmount != null,
			hasCoborrower: action?.payload?.borrowers?.jointApplicant != null,
			hasCoBorrGrossIncAnn: action?.payload?.financials?.annualIncomeJointApplicant != null,
			hasValidCoborrowerEmail: validateEmail(action?.payload?.borrowers?.jointApplicant?.email),

			// redundant
			hasOtherPersonalInfo: false,
			purchaseAddressSet: false,
		    showCoBorrDp: false,
	  };

  case LOAD_BORROWER_DETAILS:
	  //console.log(action.payload)
	  return { ...state, 
		    addresses: [],
		    professions: [],
	  		// Mandatory fields
	  		title: action.payload.title, 
	  		firstName: action.payload.firstName, 
			lastName: action.payload.lastName, 
			email: action.payload.email, 
			mobile: action.payload.mobile, 
		    dob: action?.payload?.dateOfBirth == null ? new Date() : new Date(action.payload.dateOfBirth),
		    addressSelection: action?.payload?.currentAddress?.fullAddress,
		    addressIdx: action?.payload?.currentAddress?.externalId,
		    previousAddressSelection: action?.payload?.currentAddress?.fullAddress,
			profession: action?.payload?.primaryProfession,
			previousProfession: action?.payload?.primaryProfession,
		    employmentType: action?.payload?.employmentType == null ? PERMANENT : action.payload.employmentType,
		    immigrationStatus: action?.payload?.immigrationStatus == null ? CITIZEN : action.payload.immigrationStatus,
			dependants: action?.payload?.numDependants == null ? 0 : action?.payload?.numDependants, 

			// Flags
			professionSet: action?.payload?.primaryProfession != null,
			addressSet: action?.payload?.currentAddress != null,
		    titleMr: action?.payload?.title == TITLE_MR,
		    titleMrs: action?.payload?.title == TITLE_MRS,
			titleMs: action?.payload?.title == TITLE_MS,
			
			isPermanent: action?.payload?.employmentType != null && action?.payload?.employmentType == PERMANENT, 
			isSelfEmployed: action?.payload?.employmentType != null && action?.payload?.employmentType == SELF_EMPLOYED,

			isCitizen:  action?.payload?.immigrationStatus !=  null && action?.payload?.immigrationStatus == CITIZEN,
			isResident: action?.payload?.immigrationStatus != null && action?.payload?.immigrationStatus == RESIDENT,  
			isWorkVisa: action?.payload?.immigrationStatus != null && action?.payload?.immigrationStatus == WORK_VISA,

			// Redundant			
			hasTitle: true,
			hasFirstName: true, 
			hasLastName: true, 
			hasEmail: true, 
			hasValidEmail: true,
			hasMobile: true,
			hasValidMobile: true,
			
	  };
  case DOB_UPDATED:
	  return { ...state, dob: action.payload, };
  case DEPENDANTS_UPDATED:
	  return { ...state, dependants: action.payload, };


  // Profession auto complete
  case PROFESSION_FOUND:
      return { ...state, professionSet: false, professionIdx : action.payload?.index ? action.payload.index : state.professionIdx, profession : action.payload.professionPart, professionPart: action.payload.professionPart, professions : action.payload.professions.length > 0 ? action.payload.professions : state.professions, };
  case PROFESSION_SELECTED:
      return { ...state, professionSet: true, professionIdx : action.payload.index, professions: [], profession : action.payload.profession.name, previousProfession: action.payload.profession.name,  hasOtherPersonalInfo: true, };
  case PROFESSION_UNSELECTED:
      return { ...state, professionSet: false, professionIdx : '', professionPart: '', professions:[], profession : null };
  case PROFESSION_BLUR:
      return { ...state, professionSet: state.previousProfession != null, profession : state.previousProfession, professions : [], };

  // Address auto complete
  case ADDRESS_FOUND:
      return { ...state, addressSet: false, addressStart : action.payload.addressStart, addresses : action.payload.addresses, addressSelection: action.payload.addressStart };
  case ADDRESS_SELECTED:
      return { ...state, addressSet: true, addressIdx: action.payload.addressIdx, previousAddressSelection: action.payload.addressSelection, addressStart: action.payload.addressStart, addresses:[], addressSelection: action.payload.addressSelection };
  case ADDRESS_UNSELECTED:
      return { ...state, addressSet: false, addressStart: null, addresses:[], addressSelection: null };
  case ADDRESS_BLUR:
      return { ...state, addressSet: state.previousAddressSelection != null, addressSelection: state.previousAddressSelection, addresses: [], };
  case MORTGAGE_ADDRESS_FOUND:
      return { ...state, mortgageAddressSet: false, mortgageAddressStart : action.payload.addressStart, mortgageAddresses : action.payload.addresses, mortgageAddressSelection: action.payload.addressStart,  };
  case MORTGAGE_ADDRESS_SELECTED:
	state.mortgageAddressesList.push(action.payload)
  	return { ...state, mortgageAddressSet: true, mortgageAddressIdx: action.payload.addressIdx, mortgageAddressStart: action.payload.addressStart, mortgageAddressSelection: action.payload.addressSelection, mortgageAddresses:[], };
  case MORTGAGE_ADDRESS_UNSELECTED:
      return { ...state, mortgageAddressSet: false, mortgageAddressIdx:'', mortgageAddressStart: null, mortgageAddresses:[], mortgageAddressSelection: null };
  case MORTGAGE_ADDRESS_BLUR:
      return { ...state, mortgageAddressSet: false, mortgageAddressIdx:'', mortgageAddressStart: null, mortgageAddresses:[], mortgageAddressSelection: null};
  case MORTGAGE_ADDRESS_REMOVE:
      return { ...state, mortgageAddressesList: state.mortgageAddressesList.filter(address => address.addressIdx != action.payload?.addressIdx), };
  case TITLE_COBORR_SELECTED:
	  return { ...state, hasCoborrower: true, titleCoBorr: action.payload, titleMrCoBorr: action.payload === TITLE_MR, titleMrsCoBorr: action.payload === TITLE_MRS, titleMsCoBorr: action.payload === TITLE_MS };
  case FNAME_COBORR_UPDATED:
	  return { ...state, hasCoborrower: action.payload != null && action.payload != NULL, firstNameCoBorr: action.payload };
  case LNAME_COBORR_UPDATED:
	  return { ...state, hasCoborrower: action.payload != null && action.payload != NULL, lastNameCoBorr: action.payload };
  case CO_BORR_EMAIL_UPDATED:
	  return { ...state, hasValidCoborrowerEmail: validateEmail(action.payload.trim()), coBorrowerEmail: action.payload.trim() };
  case COBORR_GR_ANN_INC_UPDATED:
	  return { ...state, coBorrGrossIncAnn: action.payload, hasCoBorrGrossIncAnn: action.payload > 0, };
  case CLEAR_CO_BORR:
	  return { ...state, hasCoborrower: false, titleMrCoBorr: false, titleMrsCoBorr: false, titleMsCoBorr: false, titleCoBorr: null, firstNameCoBorr: null, lastNameCoBorr: null, coBorrowerEmail: null, coBorrGrossIncAnn: 0, hasCoBorrGrossIncAnn:false, };
  case DATE_PICKER_TOGGLE:
	  return { ...state, showDp: !action.payload };
  case EMPLOYEMENT_TYPE_SELECTED:
	  return { ...state, employmentType: action.payload, isPermanent: action.payload === PERMANENT, isSelfEmployed: action.payload === SELF_EMPLOYED, hasOtherPersonalInfo: true };
  case IMMIGRATION_STATUS_SELECTED:
	  return { ...state, immigrationStatus: action.payload, isCitizen: action.payload === CITIZEN, isResident: action.payload === RESIDENT, isWorkVisa: action.payload === WORK_VISA, hasOtherPersonalInfo: true };
  case GR_ANN_INC_UPDATED:
	  return { ...state, grossIncAnn: action.payload, hasGrossIncAnn: action.payload > 0, hasOtherPersonalInfo: true };
  case LOAN_PROCESSING_SELECTED:
	  return { ...state, loanProcessing: action.payload, isNormal: action.payload === NORMAL_PERIOD, isExpedited: action.payload === LT_4_WEEKS, };
  case BORROWING_UPDATED:
	  return { ...state, borrowing: action.payload, hasBorrowing: action.payload > 0 };	  
  case LOAN_PURPOSE_SELECTED:
	  return { ...state, loanPurpose: action.payload, isResidential: action.payload === RESIDENTIAL, isInvestment: action.payload === INVESTMENT, isBothResidentialAndInvestment: action.payload === BOTH_RESI_AND_INVEST, };
  case LOAN_PROFILE_SELECTED:
	  return { ...state, loanProfile: action.payload, isFirstMortgage: action.payload === FIRST_MORTGAGE, isRefinance: action.payload === REFINANCE, };
  case LVR_UPDATED:
	  return { ...state, lvr: action.payload | 0 };
  case RATE_PREF_UPDATED:
	  return { ...state, ratePreference: action.payload };
  case FIRST_PREF_UPDATED:
	  return { ...state, firstPreference: action.payload };
  case SECOND_PREF_UPDATED:
	  return { ...state, secondPreference: action.payload };
  case REPAYMENT_PREF_UPDATED:
	  return { ...state, repaymentPreference: action.payload };
  case EXTRAS_PREF_UPDATED:
	switch (action.payload.type) {
		case BRIDGING_FINANCE:
			return { ...state, includeBridgingFinance : action.payload.toggle };
		case OFFSET_ACCOUNT:
			return { ...state, offsetAccount : action.payload.toggle };
		case HOME_INSURANCE:
			return { ...state, homeInsurance : action.payload.toggle };
		case CREDIT_CARD:
			return { ...state, creditCard : action.payload.toggle };
		case TX_ACCOUNT:
			return { ...state, transactionsAccount : action.payload.toggle };
		case SAV_ACCOUNT:
			return { ...state, savingsAccount : action.payload.toggle };
		case HOME_AND_LAND_PKG:
			return { ...state, homeAndLandPackage : action.payload.toggle };
		case REDRAW_FACILITY:
			return { ...state, redraw : action.payload.toggle };
		case HOME_IMPROV_PKG:
			return { ...state, homeImprovementPackage : action.payload.toggle };
		default:
			return { ...state };
	}
  case CURR_HOMELOAN_UPDATED:
	  return { ...state, currentHomeLoan: action.payload };	  
  case CURR_LENDER_UPDATED:
	  return { ...state, currentLender: action?.payload?.item ? action.payload.item : null };	  
  case CURR_REPAYMENT_UPDATED:
	  return { ...state, currentRepayment: action.payload };	  
  case CURR_HOME_LOAN_TYPE_UPDATED:
	  return { ...state, currentHomeLoanType: action.payload }; 

  // Assets
  case CASH_SAV_UPDATED:
	  return { ...state, cashSavings: action.payload };	  
  case VEHICLES_UPDATED:
	  return { ...state, vehicles: action.payload };	  
  case INVST_UPDATED:
	  return { ...state, investments: action.payload };
  case OTH_ASSETS_UPDATED:
	  return { ...state, otherAssets: action.payload  };
  // Liabilities
  case CRED_CARD_UPDATED:
	  return { ...state, creditCards: action.payload };
  case OTH_LOANS_UPDATED:
	  return { ...state, otherLoans: action.payload };
  // Weekly expenses
  case RENT_UPDATED:
	  return { ...state, rent: action.payload };
  case GROCERIES_UPDATED:
	  return { ...state, groceries: action.payload };
  case LIFES_UPDATED:
	  return { ...state, lifestyle: action.payload };
  case COMMUTE_UPDATED:
	  return { ...state, commute: action.payload };
  // Monthly expenses
  case POWER_UPDATED:
	  return { ...state, power: action.payload };
  case WATER_UPDATED:
	  return { ...state, water: action.payload };
  case PHONES_UPDATED:
	  return { ...state, phones: action.payload };
  case INTERNET_UPDATED:
	  return { ...state, internet: action.payload };
  case CABLE_AND_STREAMING_UPDATED:
	  return { ...state, cableAndStreaming: action.payload };
  case LIFE_INSURANCE_UPDATED:
	  return { ...state, lifeInsurancePrem: action.payload };
  case HEALTH_INSURANCE_UPDATED:
	  return { ...state, healthInsurancePrem: action.payload };
  case VEHICLE_INSURANCE_UPDATED:
	  return { ...state, vehicleInsurancePrem: action.payload };
  case HOME_CONTENTS_INSURANCE_UPDATED:
	  return { ...state, homeContentsInsurancePrem: action.payload };
  // Annual expenses
  case HOLIDAYS_UPDATED:
	  return { ...state, holidays: action.payload };
  case DENTAL_UPDATED:
	  return { ...state, dental: action.payload };
  case UNANTICIPATED_UPDATED:
	  return { ...state, unanticipated: action.payload };
  case OTHER_ANNUAL_UPDATED:
	  return { ...state, otherAnnual: action.payload };
  // General actions
  case TOGGLE_EDIT:
	  return { ...state, editMode: !action.payload, isAccepted: action.payload, edit: EDIT_1 };
  case TOGGLE_ALERT:
	  return { ...state, showAlert: !state.showAlert };
  case EDIT_LESS:
	  return { ...state, edit: state.edit-1};
  case EDIT_MORE:
	  return { ...state, edit: state.edit+1};
  case SHOW_MODAL:
	  return { ...state, modalVisible: true };
  case SHOW_NEXT:
	  return { ...state, showNext: action.payload };
  case HIDE_MODAL:
	  return { ...state, modalVisible: false };
  case TOGGLE_ACCEPT:
	  return { ...state, isAccepted: action.payload };
  case USER_EXISTS:
	  return { ...state, email: '', hasValidEmail: false };

  // Email registration actions
  case CHECK_ACCOUNT_FOR_MOBILE:
	return { ...state, hasDuplicateMobile: action.payload.success }
  case CHECK_ACCOUNT_FOR_EMAIL:
	return { ...state, hasDuplicateEmail: action.payload.success }


  // Redundant
  case TITLE_SELECTED:
	  return { ...state, title: action.payload, hasTitle: true, titleMr: action.payload === TITLE_MR, titleMrs: action.payload === TITLE_MRS, titleMs: action.payload === TITLE_MS };
  case FNAME_UPDATED:
	  return { ...state, firstName: action.payload, hasFirstName: action.payload != '' };
  case LNAME_UPDATED:
	  return { ...state, lastName: action.payload, hasLastName: action.payload != '' };
  case EMAIL_UPDATED:
	  return { ...state, email: action.payload, hasEmail: action.payload != '', hasValidEmail: validateEmail(action.payload), hasDuplicateEmail: false };
  case MOBILE_UPDATED:
	  return { ...state, mobile: action.payload, hasMobile: action.payload != '', hasValidMobile: validateMobile(action.payload) , hasDuplicateMobile: false  };

  default:
      return state;
  }
};