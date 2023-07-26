import React, { Component } from "react";
import { View, Text, ScrollView } from 'react-native';
import { Card, } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyleSheet from '../../styles/styles';  
import { NEXT_STEPS, NEXT_STEPS_3, NEXT_STEPS_2, NEXT_STEPS_1, CLOSE_BUTTON_BANNER, NEXT } from '../../constants/banners';
import { } from '../../constants/review';
import { showSubmittedApplicationMessage, newApplication, loadApplications, toApply, loadProposalDetails, handleFetchError, toggleNextSteps, toggleClaimCashback, toggleApplicationStatus, toggleDocumentsUpload } from '../../actions';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, WHITE, BACKGROUND_LIGHT_GRAY, TRANSPARENT } from '../../constants/colors';
import * as RootNavigation from '../../actions/RootNavigation.js';

const toDocuments = () => {
	RootNavigation.navigate('Documents');
}

class ProposedNextSteps extends Component {

	constructor(props) {
        super(props);
        this.props.fetchLoanPackage(
        	{...this.props, proposalId: this.props.displayProposal._id, loanPackageId : this.props.displayProposal.loanPackageId}, 
        	this.props.loadProposalDetails,
        	this.props.handleFetchError);
    }

    render () {
    	const styles = getStyleSheet();
    	return (
			<View>
				<View style={styles.space}/>
				<Card style={{elevation: this.props.showClaimCashback ? 0 : 5, backgroundColor:TRANSPARENT}}>
					<Card.Title title={NEXT_STEPS} titleStyle={styles.textMediumBoldLogoDarkBlue} />
					<Card.Content>
						{
						this.props.showApplicationStatus ? 
							<View  style={[{height:'100%', flexDirection:"row", justifyContent:"space-between"}]}>
								<Text style={[styles.textMediumBoldGray, {marginLeft:'5%'}]} >Coming soon</Text>
								<Icon name="close-circle-outline" size={30} borderRadius={30}
									color={LOGO_DARK_BLUE} backgroundColor={TRANSPARENT}
									iconStyle={{alignContent:'center'}} 
									onPress={() => {
										this.props.toggleApplicationStatus()
									}} />
							</View> :
						this.props.showClaimCashback ? 
							<View  style={[{height:'100%', flexDirection:"column", justifyContent:"flex-start"}]}>
								<Text style={[styles.textMediumBoldGray, {marginLeft:'5%'}]} >Claiming your cashback</Text>
								<View style={styles.space}/>
								<ScrollView horizontal={false} style={{height:'80%', width: '90%', marginLeft:'5%'}}>
									<Text style={styles.textMediumLogoDarkBlue}>You can claim your cashback for eligible proposals after the loan has been discharged.</Text>
									<View style={styles.space} />
									<Text style={styles.textMediumLogoDarkBlue}>To claim your cashback, please send us an email to cashback@loanshopper.com.au from your registerd email address and set the subject as the proposal ID {this.props.displayProposal._id}.</Text>
									<View style={styles.space} />
									<Text style={styles.textMediumLogoDarkBlue}>Cashback processing can take a few days.</Text>
									<Icon name="close-circle-outline" size={30} borderRadius={30}
										color={LOGO_DARK_BLUE} backgroundColor={TRANSPARENT}
										iconStyle={{alignContent:'center'}} 
										onPress={() => {
											this.props.toggleClaimCashback()
										}}  />
								</ScrollView>
							</View> :
						this.props.displayProposal.status === 'accepted' ? 
							<View>
								<Icon.Button name="eye-check" size={30} borderRadius={30}
									color={LOGO_DARK_BLUE} backgroundColor={WHITE}
									iconStyle={{margin:5,alignContent:'center'}}  
									 style={{maxWidth:'70%'}}
									onPress={() => {
										this.props.toApply()
										this.props.toggleNextSteps()
									}} >{NEXT_STEPS_1}</Icon.Button>
								<View style={styles.space}/>

								{ this.props?.displayProposal?.requiredDocs != null && this.props?.displayProposal?.requiredDocs.length > 0 ? 
								<View><Icon.Button name="folder-upload" size={30} borderRadius={30} 
									color={LOGO_DARK_BLUE} backgroundColor={WHITE}
									iconStyle={{margin:5,alignContent:'center'}}
									 style={{maxWidth:'70%'}}
									onPress={() => {
										this.props.toggleNextSteps()
										this.props.toggleDocumentsUpload()
									}} >{NEXT_STEPS_2}</Icon.Button>
								<View style={styles.space}/></View> : null }

								{this.props.displayProposal?.prospect?.connection ? null : 
								<View><Icon.Button name="account-cash" size={30} borderRadius={30}
									color={LOGO_DARK_BLUE} backgroundColor={WHITE}
									iconStyle={{margin:5,alignContent:'center'}}  
									 style={{maxWidth:'70%'}}
									onPress={() => {
										this.props.toggleClaimCashback()
									}} >Claim cashback</Icon.Button>
								<View style={styles.space}/></View> }

							</View> : 
							<View>
								<Icon.Button name="handshake" size={30} borderRadius={30}
									color={WHITE} 
									backgroundColor={LOGO_DARK_BLUE}
									iconStyle={{margin:5,alignContent:'center'}} 
									style={{maxWidth:'80%'}}
									onPress={() => {
										const proposalId = this.props.displayProposal._id;
										this.props.proposalBeginSubmission(
											{...this.props, proposalId: proposalId}, 
											() => {
												this.props.fetchApplications(this.props, 
													(applications) => {
														this.props.loadApplications(applications);
														this.props.newApplication();
													},
													this.props.handleFetchError
													);
												this.props.showSubmittedApplicationMessage();
											}, 
											(error) => {
												// On error
												////console.log(error);
												this.props.handleFetchError(error);
											});
										}}
									>{NEXT_STEPS_3}</Icon.Button>
								<View style={styles.space}/>
							</View> 
						}
					</Card.Content>
				</Card>

			</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer, entryReducer }) => {
  const { fetchApplications, fetchLoanPackage, proposalBeginSubmission, showApplicationStatus, showClaimCashback } = proposalReducer;
  const { } = entryReducer;
  const { displayProposal } = proposalCalendarReducer;
  const { accessCode, } = authReducer;
  return { accessCode, fetchApplications, fetchLoanPackage, displayProposal, proposalBeginSubmission, showApplicationStatus, showClaimCashback };
};

export default connect(mapStateToProps, { showSubmittedApplicationMessage, newApplication, loadApplications, handleFetchError, loadProposalDetails, toApply, toggleNextSteps, toggleClaimCashback, toggleApplicationStatus, toggleDocumentsUpload })(ProposedNextSteps);