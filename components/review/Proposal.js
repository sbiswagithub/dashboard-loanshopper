import React, { Component } from "react";
import { View, Text, FlatList, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { Card, } from 'react-native-paper';
import * as DocumentPicker from "expo-document-picker";
import { trackPromise } from "react-promise-tracker";

import getStyleSheet from '../../styles/styles';  
import { MORE, PREV, CASBACK_DISCLAIMER } from '../../constants/banners';
import { numberToCurrency, changeDisplay, toggleBrokerMessages, handleFetchError, 
	fetchStoredDocuments, setProposalDocuments } from '../../actions';
import ProposalHeader from './ProposalHeader';
import ProposalButtons from './ProposalButtons';
import ProposedNextSteps from './ProposedNextSteps';
import ProposalRequiredDocumentsList from './ProposalRequiredDocumentsList';
import BrokerMessages from './BrokerMessages';

import LoanProductList from './LoanProductList';
import SpinnerHolder from '../common/SpinnerHolder';
import ErrorDialog from '../ErrorDialog';
import { LOGO_BRIGHT_BLUE, BACKGROUND_LIGHT_GRAY, LOGO_DARK_BLUE, TRANSPARENT, WHITE } from '../../constants/colors';



class Proposal extends Component {

	constructor(props) {
        super(props);
	}

	componentDidMount() {
		trackPromise(
			this.props.fetchStoredDocuments(this.props.setProposalDocuments))
	}

	render () {
		const disablePrev = this.props.displayStep == 1 || (this.props.selectedLoanProduct && this.props.displayStep == 3)
		const disableNext = this.props.displayStep == 4 || (this.props.selectedLoanProduct && this.props.displayStep == 3)
		const styles = getStyleSheet();
		const totalLending = this.props?.displayProposal?.loanPackage?.loanProducts.reduce((loanAmount, link) => loanAmount + link.loanAmount.value, 0)
		console.log(this.props?.displayProposal)
		return (
		<View style={{flexDirection:'column', alignSelf:"stretch", alignContent:"space-between",}}>
			<View style={[{flexDirection:'column', padding:'2%',  borderColor: LOGO_BRIGHT_BLUE,  borderWidth: 2.0, borderRadius: 20, height:'100%'}]}>
				<ProposalHeader/>
				{
				this.props.displayProposal === undefined ? 
					null :
				this.props.showOverview ? 
					<View style={{flexDirection:'column',paddingBottom:'1%'}}>
						{this.props.displayStep == 1 ? 
						<View>
							<Text style={styles.textMediumBoldPurple}>General information</Text>
							<View style={styles.space} />
							<Text style={styles.textMediumLogoDarkBlue}>Proposal ID - {this.props?.displayProposal?._id}</Text>
							<View style={styles.space} />
							<Text style={styles.textMediumLogoDarkBlue}>Total loan term - {this.props?.displayProposal?.loanPackage?.loanTermInYears} years</Text>
							<View style={styles.space} />
							<Text style={styles.textMediumLogoDarkBlue}>Lender - {this.props?.displayProposal?.lender?.name}</Text>
							<View style={styles.space} />
							<Text style={styles.textMediumLogoDarkBlue}>Total lending - {numberToCurrency(totalLending)}</Text>
						</View> :
						this.props.displayStep === 2 ?
						<View>
							<Text style={styles.textMediumBoldPurple}>Loanshopper cashback</Text>
							<View style={styles.space} />
							{this.props.displayProposal?.prospect?.connection ? 
							<View style={styles.stackedSimpleLayout} >
								<Text style={styles.textMediumLogoDarkBlue}>You will not be able to claim a Loanshopper cashback reward on this proposal.</Text>
								<View style={styles.space} />
								<View style={styles.hr} />
								<View style={styles.space} />
								<Text style={styles.textSmallLogoDarkBlue}>{CASBACK_DISCLAIMER}</Text>
							</View>
							: 
							<View style={styles.stackedSimpleLayout} >
								<Text style={styles.textMediumBoldLogoBrightBlue}>This loan proposal is eligible for a $200/- Loanshopper cashback reward.</Text>
								<View style={styles.space} />
								<View style={styles.hr} />
								<View style={styles.space} />
							<Text style={styles.textSmallLogoDarkBlue}>{CASBACK_DISCLAIMER}</Text>
							</View>
							}
						</View> 
						: 
						this.props.displayStep === 3 ?
						<View>
							<Text style={styles.textMediumBoldPurple}>Loan products</Text>
							<View style={styles.space} />
							<LoanProductList />						
						</View> 
						: 
						<ProposedNextSteps /> 
						}
						<View style={styles.chipsLayout}>
							<Icon.Button name="banckward" size={20} borderRadius={25}
								backgroundColor={disablePrev ? BACKGROUND_LIGHT_GRAY : LOGO_BRIGHT_BLUE} iconStyle={{margin:1}} 
								disabled={disablePrev}
								onPress={()=> this.props.changeDisplay(false)}
								>{PREV}</Icon.Button> 
							<Icon.Button name="forward" size={20} borderRadius={25}
								backgroundColor={disableNext ? BACKGROUND_LIGHT_GRAY : LOGO_BRIGHT_BLUE} iconStyle={{margin:1}} 
								disabled={disableNext}
								onPress={()=> this.props.changeDisplay(true)}
								>{MORE}</Icon.Button> 
						</View>	
					</View>  : 
				this.props.showBrokerInfo ? 
					<View  style={[{height:'100%', flexDirection:"row"}]}>
						<View style={{width:'100%'}}>
							<Text style={styles.textMediumBoldPurple}>About your broker</Text>
							<View style={styles.space} />
							<View style={[styles.chipsLayout, {margin:'0', alignSelf: "stretch", justifyContent:"flex-start"}]}>
								<Text style={styles.textMediumLogoDarkBlue}>{this.props?.displayProposal?.agent?.title} {this.props?.displayProposal?.agent?.firstName} {this.props?.displayProposal?.agent?.lastName} from </Text> 
								<Text style={styles.textMediumGray}>{this.props?.displayProposal?.agency?.companyDetails?.companyName}</Text>
							</View>
							<View style={styles.space} />
							<Text style={styles.textMediumLogoBrightBlue}>{this.props?.displayProposal?.agent?.contact?.primaryEmail}</Text>
							<View style={styles.space} />
							<Text style={styles.textMediumLogoBrightBlue}>{this.props?.displayProposal?.agent?.contact?.primaryPhone}</Text>
						</View>
					</View> : 
				this.props.showBrokerMessages ? 
					<View  style={[{height:'100%', flexDirection:"row"}]}>
						<BrokerMessages />
					</View> : 
				this.props.showDocumentsUpload ? 
					<View  style={[{height:'100%', flexDirection:"row"}]}>
						<ProposalRequiredDocumentsList /> 
					</View>				
				: 
				this.props.showNextSteps ? <ProposedNextSteps /> : null
				}
			</View>

			<SpinnerHolder />
			<ErrorDialog/>
	    </View >
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer, loanProductReducer,  }) => {
  const { documentUploadSessions, showNextSteps, displayStep, showBrokerMessages, 
	showDocumentsUpload, selectedDocumentTypeForUpload, showOverview, showBrokerInfo } = proposalReducer;
  const { selectedLoanProduct } = loanProductReducer;
  const { displayProposal } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, displayProposal, showNextSteps, displayStep, 
	selectedLoanProduct, showBrokerMessages, showDocumentsUpload, selectedDocumentTypeForUpload, 
	documentUploadSessions, showOverview, showBrokerInfo };
};

export default connect(mapStateToProps, { changeDisplay, toggleBrokerMessages, 
	handleFetchError, fetchStoredDocuments, setProposalDocuments })(Proposal);