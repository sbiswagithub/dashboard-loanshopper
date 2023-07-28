import React, { Component } from "react";
import { View } from 'react-native';
import { connect } from 'react-redux';
import { trackPromise, } from 'react-promise-tracker';
import { LinearGradient } from 'expo-linear-gradient';

import getStyleSheet from '../../styles/styles';  
import Entry from '../entry/Entry';
import ErrorDialog from '../ErrorDialog'
import ClientConnections from '../clientConnections/index';
import {  } from "react-native-paper";
import { BACKGROUND_LIGHT_BLUE,WHITE } from '../../constants/colors';
import { handleFetchError, setClientConnections, fetchClientConnections, fetchLoanRequest, getBorrower, authenticatedBorrower, loadBorrowerDetails, loadLoanRequest} from "../../actions";

class Home extends Component {

	constructor(props) {
        super(props);
	}

	componentDidMount() {
		if (this.props?.appEntryMode != null && this.props.appEntryMode.toUpperCase() === "REGISTRATION_IN_PROGRESS") {
			// Call /me
			trackPromise(this.props.getMe(this.props.onRegistrationInProgress, this.props.handleFetchError))
		} else {
			trackPromise(
				this.props.getBorrower(
					(borrower) => {
						this.props.authenticatedBorrower(borrower);
						this.props.loadBorrowerDetails(borrower);
						}, 
					this.props.handleFetchError)
					)
			trackPromise(this.props.fetchClientConnections(this.props.setClientConnections, this.props.handleFetchError))
			trackPromise(this.props.fetchLoanRequest(this.props.loadLoanRequest, this.props.handleFetchError))
		}
	}

    render () {
		//console.log(this.props)
		const styles = getStyleSheet();
    	return (
	    	<View style={[styles.container]}>
				<LinearGradient
					colors={[WHITE,BACKGROUND_LIGHT_BLUE]} style={styles.background}
					start={{x:0,y:1}} end={{x:0,y:0}} />
					{
						this.props?.clientConnections == null || this.props?.clientConnections.length == 0 ?
						<Entry/> : <ClientConnections />
					}
					<ErrorDialog />
		    </View>    	
        )
    }
}


const mapStateToProps = ({ homeReducer, disclosureReducer }) => {
  const { clientConnections } = homeReducer;
  const { loanRequest } = disclosureReducer;

  return { clientConnections, loanRequest };
};

export default connect(mapStateToProps, {  setClientConnections, handleFetchError, fetchClientConnections, getBorrower, 
	authenticatedBorrower, loadBorrowerDetails, fetchLoanRequest,loadLoanRequest })(Home);