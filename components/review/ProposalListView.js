import React, { Component } from "react";
import { connect } from 'react-redux';
import { Text, View, } from 'react-native';
import { Card, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SpinnerHolder from '../common/SpinnerHolder';
import ErrorDialog from '../ErrorDialog';
import { LinearGradient } from "expo-linear-gradient";

import { trackPromise, } from 'react-promise-tracker';
import getStyleSheet from '../../styles/styles';  
import { SHOW_MORE, QUARTERLY_VIEW } from '../../constants/banners';
import { showProposal, closeReview, toggleLikeProposal, refreshProposal, loadBrokerAgent, fetchBrokerAgent, loadProposals } from '../../actions';
import { WHITE, LOGO_DARK_BLUE, LOGO_BRIGHT_BLUE, BACKGROUND_LIGHT_GRAY } from '../../constants/colors';


const renderProposalCard = (props) => {
	const styles = getStyleSheet();
	//console.log(props.proposal.lender)
    return (
		<View>
			{!props.proposal ? null : 
			<Card style={{elevation: 10,  alignSelf:"center", borderWidth:1, borderRadius: 25, borderColor:LOGO_DARK_BLUE}} >
				<LinearGradient
						colors={[
						LOGO_DARK_BLUE,
						LOGO_BRIGHT_BLUE,
						]}
						style={[styles.background, { borderRadius: 25}]}
						start={{ x: 0.5, y: 1 }}
						end={{ x: 0.5, y: 0 }}
					/>					
				<Card.Content>
				<View style={{alignSelf:"stretch", justifyContent:"space-between", height:"100%",}}>
					<View style={[{flexDirection: "column", justifyContent: "space-between", }]}>
						<View style={styles.tableColumn}>
						<View style={[styles.tableRow]}>
							<Text style={[styles.textMediumBoldWhite,{padding:'2%',  }]}>{props?.proposal?.loanPackageSummary?.label} at {props?.proposal?.loanPackageSummary?.interestRate}%</Text>
						</View>
						<View style={[styles.tableRow]}>
							<Text style={[styles.textMediumLogoBrightBlue,{padding:'2%',  }]}>Loan proposal from {props?.proposal?.agent?.firstName} of {props?.proposal?.agency?.companyDetails?.companyName} </Text>
						</View>
						</View>
					</View>

					<View style={[{flexDirection: "column", justifyContent: "space-between"}]}>
						<View style={styles.hr} />
						<View style={styles.space} />
						<Icon.Button name="arrow-expand-all" size={15} borderRadius={30}
							color={LOGO_DARK_BLUE} backgroundColor={WHITE}
							iconStyle={{margin:5,alignContent:'center'}} 
							onPress={() => 
							props.showProposal(props.proposal._id) } >{SHOW_MORE}</Icon.Button>
					</View>
				</View>
				</Card.Content>
			</Card>
			}
			<SpinnerHolder />
			<ErrorDialog/>
		</View>
    );
};

class ProposalListView extends Component {

	constructor(props) {
        super(props);
	}

	componentDidMount() {
    	const proposal = this.props.proposalsInView.find((proposal) => { return proposal._id === this.props.proposalId; });
		if (proposal !== undefined && proposal?.agentId !== undefined && !this.props.brokerAgentsInView.find(a => a._id === proposal?.agentId)) {
			trackPromise(
				this.props.fetchBrokerAgent(
					proposal.agentId, 
					this.props.loadBrokerAgent , 
					(error) => {
						this.props.handleFetchError(error);
						Promise.reject(error)
					}))
		} else {
			//console.log('Do not fetch agent')
		}
	}
	

    render () {
		const styles = getStyleSheet();
		
		const proposal = this.props.proposalsInView.find((proposal) => proposal._id === this.props.proposalId);
		console.log(proposal)
		const brokerAgent = this.props.brokerAgentsInView.find((agent) => agent._id === proposal?.agentId);
		console.log(brokerAgent)
    	return (
		<View style={{flexDirection:'column',margin:2 }}>
			{renderProposalCard(
				{...this.state, 
					showProposal: this.props.showProposal, 
					title: brokerAgent?.brokerAgency?.companyDetails?.companyName , 
					product: proposal.productName, 
					proposal : proposal,
					brokerAgent: brokerAgent,
					large:true, })}
	    </View >
        )
    }
}

const mapStateToProps = ({ proposalCalendarReducer, authReducer, documentsReducer }) => {
  const { proposalsInView, updated, brokerAgentsInView, getQParams,fetchProposals,  } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  const { fetchStoredDocumentsAction } = documentsReducer;
  return { proposalsInView, accessCode, updated, borrower, brokerAgentsInView, getQParams,fetchProposals, fetchStoredDocumentsAction };
};

export default connect(mapStateToProps, { showProposal, closeReview, toggleLikeProposal, refreshProposal, loadBrokerAgent, fetchBrokerAgent, loadProposals })(ProposalListView);