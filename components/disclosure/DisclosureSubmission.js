import React, { Component } from "react";
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';
import SubmissionSection1 from './SubmissionSection1';
import SubmissionSection2 from './SubmissionSection2';
import SubmissionSection3 from './SubmissionSection3';
import SubmissionSection4 from './SubmissionSection4';
import SubmissionSection5 from './SubmissionSection5';
import SubmissionSection6 from './SubmissionSection6';
import SubmissionSection7 from './SubmissionSection7';
import SubmissionSection8 from './SubmissionSection8';
import SubmissionSection9 from './SubmissionSection9';
import DisclosureEditable from './DisclosureEditable';

class DisclosureSubmission extends Component {

	constructor(props) {
        super(props);
	}
	
    render () {
    	const styles = getStyleSheet();
    	return (
		<>
		<View style={this.props.editMode ? [{ width:'75%', alignSelf:"center"}] : [styles.disclosureBoxBlue]}>
			
			<View style={[styles.disclosureBoxColumn]}>

			{this.props.editMode ? 
			<DisclosureEditable />	:	
			<ScrollView showsVerticalScrollIndicator={false} style={{height:"85%", maxWidth: '95%'}} keyboardShouldPersistTaps='handled'>
				<View style={styles.disclosureBoxRow}>
				<SubmissionSection1/>
				</View>

				<View style={styles.disclosureBoxRow}>
				<SubmissionSection2/>
				</View>

				<View style={styles.disclosureBoxRow}>
				<SubmissionSection3/>
				</View>
				{ this.hasCoBorr() ? (
					<View style={styles.disclosureBoxRow}>
					<SubmissionSection4 />
					</View>
				) : null }
				{ this.hasAssets() ? (
					<View style={styles.disclosureBoxRow}>
					<SubmissionSection5 />
					</View>
				) : null }
				{ this.hasLiabilities() ? (
					<View style={styles.disclosureBoxRow}>
					<SubmissionSection6 />
					</View>
				) : null }
				{ this.hasEstWklyExp() ? (
					<View style={styles.disclosureBoxRow}>
					<SubmissionSection7 />
					</View>
				) : null }
				{ this.hasEstMnthlyExp() ? (
					<View style={styles.disclosureBoxRow}>
					<SubmissionSection8 />
					</View>
				) : null }
				{ this.hasEstAnnualExp() ? (
					<View style={styles.disclosureBoxRow}>
					<SubmissionSection9 />
					</View>
				) : null }
			</ScrollView>
			}
			</View>
			
		</View>
		</>
        )	
    }

	hasCoBorr() {
		return true &&
			this.props.hasCoborrower;
	}
	
	hasAssets() {
		return this.props.cashSavings > 0 ||
		this.props.vehicles > 0 || 
		this.props.investments > 0 || 
		this.props.otherAssets > 0 ;				
	}
	hasLiabilities() {
		return this.props.creditCardList.length > 0 ||
		this.props.otherLoans > 0 ;		
	}
	hasEstWklyExp() {
		return this.props.rent > 0 ||
		this.props.groceries > 0 || 
		this.props.lifestyle > 0 || 
		this.props.commute > 0 ;
	}
	hasEstMnthlyExp() {
		return this.props.power > 0 ||
		this.props.water > 0 ||
		this.props.phones > 0 ||
		this.props.internet > 0 ||
		this.props.cableAndStreaming > 0 ||
		this.props.lifeInsurancePrem > 0 ||
		this.props.healthInsurancePrem > 0 ||
		this.props.vehicleInsurancePrem > 0 ||
		this.props.homeContentsInsurancePrem > 0;		
	}
	hasEstAnnualExp() {
		return this.props.holidays > 0 ||
			this.props.dental > 0 ||
			this.props.unanticipated > 0 ||
			this.props.otherAnnual > 0;
	}
}

const mapStateToProps = ({ disclosureReducer }) => {
  const {
	  editMode,
	professions,
	addressIdx,
	purchaseAddressIdx,
	professionIdx,
    title,
    firstName,
    lastName,
    email,
    mobile,
    dob,
    titleCoBorr,
    firstNameCoBorr,
    lastNameCoBorr,
    coBorrowerEmail,
    employmentType, 
    immigrationStatus,
    grossIncAnn,
    borrowing,
    cashSavings, 
    vehicles, 
    investments, 
    otherAssets,
	creditCardList,
    otherLoans,
    rent, 
    groceries,
    lifestyle,
    commute,
    power,
    water,
    phones, 
    internet,
    cableAndStreaming,
    lifeInsurancePrem,
    healthInsurancePrem,
    vehicleInsurancePrem,
    homeContentsInsurancePrem,
    holidays,
    dental,
    unanticipated,
    otherAnnual, 
    hasBorrowing,
    hasOtherPersonalInfo,
	hasCoborrower,
	dependants
  } = disclosureReducer;
  return {
	  editMode,
	professions,
	addressIdx,
	purchaseAddressIdx,
	professionIdx,
    title,
    firstName,
    lastName,
    email,
    mobile,
    dob,
    titleCoBorr,
    firstNameCoBorr,
    lastNameCoBorr,
    coBorrowerEmail,
    employmentType, 
    immigrationStatus,
    grossIncAnn,
    borrowing,
    cashSavings, 
    vehicles, 
    investments, 
    otherAssets,
	creditCardList,
    otherLoans,
    rent, 
    groceries,
    lifestyle,
    commute,
    power,
    water,
    phones, 
    internet,
    cableAndStreaming,
    lifeInsurancePrem,
    healthInsurancePrem,
    vehicleInsurancePrem,
    homeContentsInsurancePrem,
    holidays,
    dental,
    unanticipated,
    otherAnnual,	
    hasBorrowing,
    hasOtherPersonalInfo,
	hasCoborrower,
	dependants
  };
};

export default connect(mapStateToProps, {  })(DisclosureSubmission);