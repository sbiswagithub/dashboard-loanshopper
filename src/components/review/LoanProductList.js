import React, { Component } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Card, } from "react-native-paper";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyleSheet from '../../styles/styles';  
import {  } from '../../constants/banners';
import {  } from '../../constants/review';
import { handleFetchError, numberToCurrency, setDisplayProduct } from '../../actions';
import LoanProduct from './LoanProduct';

import SpinnerHolder from '../common/SpinnerHolder';
import * as colors from '../../constants/colors';

const LoanProductPreview = (props) => {
	const styles = getStyleSheet();
	return (
		<View style={{flexDirection:'column'}}>
				<Icon.Button name="eye-check" size={30} borderRadius={30}
					color={colors.LOGO_BRIGHT_BLUE} backgroundColor={props.expanded ? colors.HIGHLIGHTED_YELLOW : colors.WHITE}
					iconStyle={{margin:5,alignContent:'center'}}  
					onPress={() => {
						props.setDisplayProduct(props.expanded ? null : props.loanProductLink)
					}} >
					<View style={{flexDirection:'column', alignSelf:"stretch"}}>
						<Text style={styles.textMediumBoldLogoDarkBlue}>{props.loanProductLink.loanProduct.productName}</Text>
						<View style={{flexDirection:'row', alignSelf:"stretch"}}>
							<Text style={{color: colors.BLACK}}>{numberToCurrency(props.loanProductLink.loanAmount.value)} at</Text>
							<Text style={[styles.textMediumBoldPurple,{marginLeft:'2%'}]}>{props.loanProductLink.loanProduct.ratesAndFees.interestRate}%</Text>
						</View>
						{props.loanProductLink.loanProduct.features.rateOption === 'Fixed' ? 
							<Text style={[{color: colors.BLACK},{marginLeft: '2%'}]}>Fixed repayments for {props.loanProductLink.loanProduct.features.fixedTermInMonths} months</Text>
						: null}
					</View>
				</Icon.Button>
				<View style={styles.space} />
				{props.expanded ? props.children : null}
		</View>
	)
}

class LoanProductList extends Component {

	constructor(props) {
        super(props);
	}
	
    render () {
		const styles = getStyleSheet();
		// Sorted in descending order of loan amount
		const productLinks = this.props?.displayProposal?.loanPackage?.loanProducts == undefined ? [] :
			this.props.displayProposal.loanPackage.loanProducts
				.concat([])
				.sort((a,b) => a.loanAmount.value < b.loanAmount.value)
				.map(link => {return {loanProductLink : link, ...this.props}})
		return (
		<ScrollView>
			{productLinks.map(item => {
				return (
						<View key={item._id}  >
						{item.selectedLoanProduct && item.loanProductLink._id !== item.selectedLoanProduct._id ? null :
							<LoanProductPreview  {...item} expanded={item.selectedLoanProduct && item.loanProductLink._id === item.selectedLoanProduct._id}  >
								<LoanProduct/>
								</LoanProductPreview>}
						</View>
					)				
			})}
			<SpinnerHolder />
	    </ScrollView >
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer, loanProductReducer }) => {
  const { } = proposalReducer;
  const { selectedLoanProduct } = loanProductReducer;
  const { displayProposal } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, displayProposal, selectedLoanProduct };
};

export default connect(mapStateToProps, { handleFetchError, numberToCurrency, setDisplayProduct })(LoanProductList);