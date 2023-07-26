import React, { Component } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import {  } from '../../constants/banners';
import { selectTile, loadComparePackageLeft, loadComparePackageRight, handleFetchError } from '../../actions';
import {L,R} from '../../constants/common';

class CompareProposalTile extends Component {

	constructor(props) {
        super(props);
    }

    render () {
     const styles = getStyleSheet();
     const boundProposal = this.props.proposal;
     const proposal = this.props.proposalsInView.find((proposal) => {return proposal._id == boundProposal._id} );
     return ( 
	     <View>
	     { 
	    	proposal?.compareLSelected && boundProposal.side == L ?
			<View style={ [styles.compareSelected, {backgroundColor:'#1f215e'}] }>
	    		<Text style={styles.textMediumBoldWhite}>{proposal.brokerName}</Text>
	    		<View style={styles.space}/>
	            <Text style={styles.textMediumWhite}>{proposal.productName}</Text>
		        <Text style={[styles.textMediumWhite,{marginRight:5}]}>{proposal.interestRate}</Text>
			</View> :
			proposal?.compareRSelected && boundProposal.side == R ?
			<View style={ [styles.compareSelected, {backgroundColor:'#00b4f1'}] }>
	    		<Text style={styles.textMediumBoldWhite}>{proposal.brokerName}</Text>
	    		<View style={styles.space}/>
	            <Text style={styles.textMediumWhite}>{proposal.productName}</Text>
		        <Text style={[styles.textMediumWhite,{marginRight:5}]}>{proposal.interestRate}</Text>
			</View> :
		    <TouchableOpacity  onPress={() => { 
		    	this.props.selectTile(proposal, this.props.proposal.side); 
		    	this.props.fetchLoanPackage(
		        	{...this.props, proposalId: proposal._id, loanPackageId : proposal.loanPackageId}, 
		        	this.props.proposal.side == L ? this.props.loadComparePackageLeft : this.props.loadComparePackageRight,
		        	this.props.handleFetchError);
		        	
		    	}}>
				<View style={ styles.compareXSelected }>
					<Text style={styles.textMediumBoldGray}>{proposal.brokerName}</Text>
					<View style={styles.space}/>
			        <Text style={styles.textMediumdGray}>{proposal.productName}</Text>
			        <Text style={[styles.textMediumLogoDarkBlue,{marginRight:5}]}>{proposal.interestRate}</Text>
				</View>
			</TouchableOpacity>
		}
		</View>);
    }
}


const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer }) => {
  const { fetchLoanPackage, } = proposalReducer;
  const { proposalsInView, updated, } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { proposalsInView, accessCode, borrower, updated, fetchLoanPackage };
};

export default connect(mapStateToProps, { selectTile, loadComparePackageLeft, loadComparePackageRight, handleFetchError })(CompareProposalTile);