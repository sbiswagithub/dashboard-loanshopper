
import React, { Component } from "react";
import { View, Text, } from 'react-native';
import { Chip } from 'react-native-paper';
import { Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import { DefaultTheme } from 'react-native-paper';

import getStyleSheet from '../../styles/styles';

import { LOAN_PROCESSING, LOAN_REQUIREMENTS, LOAN_PROFILE, LOAN_AMOUNT, LOAN_PURPOSE, LVR, RATE_PREFERENCE, FIRST_PREFERENCE, SECOND_PREFERENCE, 
	REPAYMENT_FREQUENCY, REPAYMENT_F, REPAYMENT_Y, REPAYMENT_M, REPAYMENT_W, BRIDGING_FINANCE, EXTRAS, OFFSET_ACCOUNT, HOME_INSURANCE, CREDIT_CARD, TX_ACCOUNT, SAV_ACCOUNT, HOME_AND_LAND_PKG, HOME_IMPROV_PKG, REDRAW_FACILITY, CURRENT_HOME_LOAN, CURRENT_LENDER, CURRENT_REPAYMENT } from '../../constants/banners';
import { THUMB_COLOR } from '../../constants/common';
import { LVR_SLIDER_MAX, BORROWING_SLIDER_MAX, RESIDENTIAL, INVESTMENT, BOTH_RESI_AND_INVEST, FIRST_MORTGAGE, REFINANCE, LT_4_WEEKS, NORMAL_PERIOD, 
	FIXED, VARIABLE, SPLIT, LEAST_INTEREST_RATE, LOWER_REPAYMENTS, LONGER_FIXED_TERM, SHORTER_LOAN_DURATION, 
	REPAYMENT_TYPE_Y, REPAYMENT_TYPE_M, REPAYMENT_TYPE_F, REPAYMENT_TYPE_W,  } from '../../constants/disclosure';
import { borrowingUpdated, loanProcessingSelected, loanProfileSelected, loanPurposeSelected, currencyToNumber, lvrUpdated, ratePreferenceUpdated, 
	loanPreferenceUpdated, repaymentPreferenceUpdated, extrasUpdated, currentLendingUpdated } from '../../actions';
import MortgageAddressSelect from "./MortgageAddressSelect";
import CurrentLendingDetails from "./CurrentLendingDetails";
const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3'
  },
};
class LoanInformation extends Component {

	constructor(props) {
        super(props);
        if (props.homeLoan > 0)
        	this.whenUpdated(props.homeLoan);
	}
	
	whenUpdated(text) {
		const amount = currencyToNumber(text);
		// Borrowing in steps of 10K capped to BORROWING_SLIDER_MAX
		const borrowingVal = amount > BORROWING_SLIDER_MAX ? BORROWING_SLIDER_MAX : (amount - (amount%10000));
		this.props.borrowingUpdated(borrowingVal);
	}
	
    render () {
    	const styles = getStyleSheet();
    	return (
			<View>
    		    <View style={styles.disclosureBoxRow}>
        		<Text style={[styles.textMediumBoldGray]}>{LOAN_REQUIREMENTS}</Text>
    		    </View>
				{this.props.edit === 4 ? 
		        <View style={[styles.disclosureBoxRow]}>
		    		<View style={{ flex: 0.9, flexDirection:'column'}}>
		    		<View style={styles.space}/>
					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{LOAN_AMOUNT}</Text>
						<View style={styles.space}/>
						<Text style={[styles.textMediumLogoDarkBlue,{ alignSelf:"center" }]} >Choose the amount you are looking to borrow. Investors should set an estimated total amount of borrowing across all properties</Text>
						<View style={styles.space}/>

			   			<View style={styles.boxRow}>
				    		<View style={styles.boxCol60}>
				    		<Slider thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  
				    			maximumValue={BORROWING_SLIDER_MAX} value={this.props.borrowing} onValueChange={value => this.whenUpdated(value)} />
					        </View>
				    		<View style={styles.boxCol40}>
								<Text style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>
								{'$' + this.props.borrowing.toLocaleString(undefined, {maximumFractionDigits:0})}
								</Text>
					        </View>
				        </View>
			    	</View>
    		    </View>
				: null }

				{this.props.edit === 5 ? 
		        <View style={[styles.disclosureBoxRow]}>
		    		<View style={{ flex: 0.9, flexDirection:'column'}}>
		    		<View style={styles.space}/>
					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{LVR}</Text>
						<View style={styles.space}/>
						<Text style={[styles.textMediumLogoDarkBlue,{ alignSelf:"center" }]} >LVR (or Loan Value Ratio) is the loan amount divided by the total estimated value of the property. For investors, please set the LVR of your residential property or skip and move to the next detail</Text>
						<View style={styles.space}/>

			   			<View style={styles.boxRow}>
				    		<View style={styles.boxCol60}>
				    		<Slider thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  
				    			maximumValue={LVR_SLIDER_MAX} value={this.props.lvr} onValueChange={value => this.props.lvrUpdated(value)} />
					        </View>
				    		<View style={styles.boxCol40}>
								<Text style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>
								{this.props.lvr.toLocaleString(undefined, {maximumFractionDigits:0}) + '%'}
								</Text>
					        </View>
				        </View>
			    	</View>
    		    </View>
				: null }

				{this.props.edit === 6 ? 
    		    <View style={styles.disclosureBoxRow}>
		    		<View style={{ flex: 0.9, flexDirection:'column'}}>
						<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{LOAN_PROCESSING}</Text>
						<View style={styles.space}/>
						<Text style={[styles.textMediumLogoDarkBlue,{ alignSelf:"center" }]} >Processing time may vary, however you may use this section to highlight special circumstances</Text>
						<View style={styles.space}/>
			    		<View style={styles.chipsLayout}>
					    	<Chip style={this.props.isNormal ? styles.chipNormal : null} textStyle={this.props.isNormal ? styles.textSmallBoldWhite : null}
					    		selected={this.props.isNormal} onPress={() => this.props.loanProcessingSelected(NORMAL_PERIOD)}>{NORMAL_PERIOD}</Chip>
					    	<Chip style={this.props.isExpedited ? styles.chipNormal : null} textStyle={this.props.isExpedited ? styles.textSmallBoldWhite : null}
					    		selected={this.props.isExpedited} onPress={() => this.props.loanProcessingSelected(LT_4_WEEKS)}>{LT_4_WEEKS}</Chip>
				        </View>
	    		    </View>
    		    </View>
				: null }

				{this.props.edit === 7 ? 
				<View>
    		    <View style={styles.disclosureBoxRow}>
		    		<View style={{ flex: 0.9, flexDirection:'column'}}>
						<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{LOAN_PROFILE}</Text>
						<View style={styles.space}/>
						<Text style={[styles.textMediumLogoDarkBlue,{ alignSelf:"center" }]} >Some loans may be eligible for first home buyer grants and other assistance. You may use this section to indicate if you would like to be considered for these conditions</Text>
						<View style={styles.space}/>
			    		<View style={styles.chipsLayout}>
					    	<Chip style={this.props.isFirstMortgage ? styles.chipNormal : null} textStyle={this.props.isFirstMortgage ? styles.textSmallBoldWhite : null}
					    		selected={this.props.isFirstMortgage} onPress={() => this.props.loanProfileSelected(FIRST_MORTGAGE)}>{FIRST_MORTGAGE}</Chip>
					    	<Chip style={this.props.isRefinance ? styles.chipNormal : null} textStyle={this.props.isRefinance ? styles.textSmallBoldWhite : null}
					    		selected={this.props.isRefinance} onPress={() => this.props.loanProfileSelected(REFINANCE)}>{REFINANCE}</Chip>
				        </View>
	    		    </View>
    		    </View>

				{this.props?.isRefinance ? 
					<CurrentLendingDetails />
				: null }

				</View>
				: null }

				{this.props.edit === 8 ? 
    		    <View style={styles.disclosureBoxRow}>
		    		<View style={{ flex: 0.9, flexDirection:'column'}}>
						<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{LOAN_PURPOSE}</Text>
						<View style={styles.space}/>
						<Text style={[styles.textMediumLogoDarkBlue,{ alignSelf:"center" }]} >Select the purpose of borrowing</Text>
						<View style={styles.space}/>
			    		<View style={[styles.chipsStackedLayout, {alignSelf:"center" }]}>
					    	<Chip style={this.props.isResidential ? styles.chipNormal : null} textStyle={this.props.isResidential ? styles.textSmallBoldWhite : null}
					    		selected={this.props.isResidential} onPress={() => this.props.loanPurposeSelected(RESIDENTIAL)}>{RESIDENTIAL}</Chip>
						<View style={styles.space}/>
					    	<Chip style={this.props.isInvestment ? styles.chipNormal : null} textStyle={this.props.isInvestment ? styles.textSmallBoldWhite : null}
					    		selected={this.props.isInvestment} onPress={() => this.props.loanPurposeSelected(INVESTMENT)}>{INVESTMENT}</Chip>
						<View style={styles.space}/>
					    	<Chip style={this.props.isBothResidentialAndInvestment ? styles.chipNormal : null} textStyle={this.props.isBothResidentialAndInvestment ? styles.textSmallBoldWhite : null}
					    		selected={this.props.isBothResidentialAndInvestment} onPress={() => this.props.loanPurposeSelected(BOTH_RESI_AND_INVEST)}>{BOTH_RESI_AND_INVEST}</Chip>
				        </View>
	    		    </View>
    		    </View>
				: null }

				{this.props.edit === 9 ? 
		        <View style={[styles.disclosureBoxRow]}>
		    		<View style={styles.space}/>
					<MortgageAddressSelect />
    		    </View>
				: null }

				{this.props.edit === 10 ? 
    		    <View style={styles.disclosureBoxRow}>
		    		<View style={{ flex: 0.9, flexDirection:'column'}}>
					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{RATE_PREFERENCE}</Text>
		    		<View style={styles.space}/>
					<Text style={[styles.textMediumLogoDarkBlue,{ alignSelf:"center" }]} >Indicate your prefered rate type</Text>
					<View style={styles.space}/>
			    		<View style={[styles.chipsStackedLayout, {alignSelf:"center" }]}>
					    	<Chip style={this.props.ratePreference == FIXED ? styles.chipNormal : null} textStyle={this.props.ratePreference == FIXED ? styles.textSmallBoldWhite : null}
					    		selected={this.props.ratePreference == FIXED} onPress={() => this.props.ratePreferenceUpdated(FIXED)}>{FIXED}</Chip>
							<View style={styles.space}/>
					    	<Chip style={this.props.ratePreference == VARIABLE ? styles.chipNormal : null} textStyle={this.props.ratePreference == VARIABLE ? styles.textSmallBoldWhite : null}
					    		selected={this.props.ratePreference == VARIABLE} onPress={() => this.props.ratePreferenceUpdated(VARIABLE)}>{VARIABLE}</Chip>
							<View style={styles.space}/>
					    	<Chip style={this.props.ratePreference == SPLIT ? styles.chipNormal : null} textStyle={this.props.ratePreference == SPLIT ? styles.textSmallBoldWhite : null}
					    		selected={this.props.ratePreference == SPLIT} onPress={() => this.props.ratePreferenceUpdated(SPLIT)}>{SPLIT}</Chip>
				        </View>
	    		    </View>
    		    </View>
				: null }

				{this.props.edit === 11 ? 
    		    <View style={styles.disclosureBoxRow}>
		    		<View style={{ flex: 0.9, flexDirection:'column'}}>
					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{FIRST_PREFERENCE}</Text>
		    		<View style={styles.space}/>
					<Text style={[styles.textMediumLogoDarkBlue,{ alignSelf:"center" }]} >You may use this section to indicate the key factor you look for when choosing a home loan product</Text>
		    		<View style={styles.space}/>
			    		<View style={[styles.chipsStackedLayout, {alignSelf:"center" }]}>
					    	<Chip style={this.props.firstPreference == LEAST_INTEREST_RATE ? styles.chipNormal : null} textStyle={this.props.firstPreference == LEAST_INTEREST_RATE ? styles.textSmallBoldWhite : null}
					    		selected={this.props.firstPreference == LEAST_INTEREST_RATE} onPress={() => this.props.loanPreferenceUpdated(1,LEAST_INTEREST_RATE)}>{LEAST_INTEREST_RATE}</Chip>
							<View style={styles.space}/>
					    	<Chip style={this.props.firstPreference == LOWER_REPAYMENTS ? styles.chipNormal : null} textStyle={this.props.firstPreference == LOWER_REPAYMENTS ? styles.textSmallBoldWhite : null}
					    		selected={this.props.firstPreference == LOWER_REPAYMENTS} onPress={() => this.props.loanPreferenceUpdated(1,LOWER_REPAYMENTS)}>{LOWER_REPAYMENTS}</Chip>
							<View style={styles.space}/>
					    	<Chip style={this.props.firstPreference == LONGER_FIXED_TERM ? styles.chipNormal : null} textStyle={this.props.firstPreference == LONGER_FIXED_TERM ? styles.textSmallBoldWhite : null}
					    		selected={this.props.firstPreference == LONGER_FIXED_TERM} onPress={() => this.props.loanPreferenceUpdated(1,LEAST_INTEREST_RATE)}>{LONGER_FIXED_TERM}</Chip>
							<View style={styles.space}/>
					    	<Chip style={this.props.firstPreference == SHORTER_LOAN_DURATION ? styles.chipNormal : null} textStyle={this.props.firstPreference == SHORTER_LOAN_DURATION ? styles.textSmallBoldWhite : null}
					    		selected={this.props.firstPreference == SHORTER_LOAN_DURATION} onPress={() => this.props.loanPreferenceUpdated(1,LEAST_INTEREST_RATE)}>{SHORTER_LOAN_DURATION}</Chip>
				        </View>
	    		    </View>
    		    </View>
				: null }
				{this.props.edit === 12 ? 
    		    <View style={styles.disclosureBoxRow}>
		    		<View style={{ flex: 0.9, flexDirection:'column'}}>
						<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{REPAYMENT_FREQUENCY}</Text>
						<View style={styles.space}/>
						<Text style={[styles.textMediumLogoDarkBlue,{ alignSelf:"center" }]} >Choose your prefered loan instalement frequency.</Text>
						<View style={styles.space}/>
			    		<View style={[styles.chipsStackedLayout, {alignSelf:"center" }]}>
					    	<Chip style={this.props.repaymentPreference == REPAYMENT_TYPE_Y ? styles.chipNormal : null} textStyle={this.props.repaymentPreference == REPAYMENT_TYPE_Y ? styles.textSmallBoldWhite : null}
					    		selected={this.props.repaymentPreference == REPAYMENT_TYPE_Y} onPress={() => this.props.repaymentPreferenceUpdated(REPAYMENT_TYPE_Y)}>{REPAYMENT_Y}</Chip>
							<View style={styles.space}/>
					    	<Chip style={this.props.repaymentPreference == REPAYMENT_TYPE_M ? styles.chipNormal : null} textStyle={this.props.repaymentPreference == REPAYMENT_TYPE_M ? styles.textSmallBoldWhite : null}
					    		selected={this.props.repaymentPreference == REPAYMENT_TYPE_M} onPress={() => this.props.repaymentPreferenceUpdated(REPAYMENT_TYPE_M)}>{REPAYMENT_M}</Chip>
							<View style={styles.space}/>
					    	<Chip style={this.props.repaymentPreference == REPAYMENT_TYPE_F ? styles.chipNormal : null} textStyle={this.props.repaymentPreference == REPAYMENT_TYPE_F ? styles.textSmallBoldWhite : null}
					    		selected={this.props.repaymentPreference == REPAYMENT_TYPE_F} onPress={() => this.props.repaymentPreferenceUpdated(REPAYMENT_TYPE_F)}>{REPAYMENT_F}</Chip>
							<View style={styles.space}/>
					    	<Chip style={this.props.repaymentPreference == REPAYMENT_TYPE_W ? styles.chipNormal : null} textStyle={this.props.repaymentPreference == REPAYMENT_TYPE_W ? styles.textSmallBoldWhite : null}
					    		selected={this.props.repaymentPreference == REPAYMENT_TYPE_W} onPress={() => this.props.repaymentPreferenceUpdated(REPAYMENT_TYPE_W)}>{REPAYMENT_W}</Chip>
				        </View>
	    		    </View>
    		    </View>
				: null }
				{this.props.edit === 13 ? 
    		    <View style={styles.disclosureBoxRow}>
		    		<View style={{ flex: 0.9, flexDirection:'column'}}>
						<Text style={[styles.textSmallBoldGray, {alignSelf:'center',}]}>{EXTRAS}</Text>
						<View style={styles.space}/>
						<Text style={[styles.textMediumLogoDarkBlue,{ alignSelf:"center" }]} >Choose if you require specific features from the home loan product or could be included as extras in your home loan package.</Text>
						<View style={styles.space}/>
			    		<View style={[styles.chipsStackedLayout, {alignSelf:"center" }]}>
					    	<Chip mode={'outlined'} theme={theme} style={this.props?.includeBridgingFinance ? styles.chipNormal : null} textStyle={this.props?.includeBridgingFinance ? styles.textSmallBoldWhite : null}
					    		selected={this.props?.includeBridgingFinance } onPress={() => this.props.extrasUpdated(BRIDGING_FINANCE, !this.props.includeBridgingFinance)}>{BRIDGING_FINANCE}</Chip>
							<View style={styles.space}/>
					    	<Chip mode={'outlined'} theme={theme} style={this.props?.offsetAccount ? styles.chipNormal : null} textStyle={this.props?.offsetAccount ? styles.textSmallBoldWhite : null}
					    		selected={this.props?.offsetAccount } onPress={() => this.props.extrasUpdated(OFFSET_ACCOUNT, !this.props.offsetAccount)}>{OFFSET_ACCOUNT}</Chip>
							<View style={styles.space}/>
					    	<Chip mode={'outlined'} theme={theme} style={this.props?.homeInsurance ? styles.chipNormal : null} textStyle={this.props?.homeInsurance ? styles.textSmallBoldWhite : null}
					    		selected={this.props?.homeInsurance } onPress={() => this.props.extrasUpdated(HOME_INSURANCE, !this.props.homeInsurance)}>{HOME_INSURANCE}</Chip>
							<View style={styles.space}/>
					    	<Chip mode={'outlined'} theme={theme} style={this.props?.creditCard ? styles.chipNormal : null} textStyle={this.props?.creditCard ? styles.textSmallBoldWhite : null}
					    		selected={this.props?.creditCard } onPress={() => this.props.extrasUpdated(CREDIT_CARD, !this.props.creditCard)}>{CREDIT_CARD}</Chip>
							<View style={styles.space}/>
					    	<Chip mode={'outlined'} theme={theme} style={this.props?.transactionsAccount ? styles.chipNormal : null} textStyle={this.props?.transactionsAccount ? styles.textSmallBoldWhite : null}
					    		selected={this.props?.transactionsAccount } onPress={() => this.props.extrasUpdated(TX_ACCOUNT, !this.props.transactionsAccount)}>{TX_ACCOUNT}</Chip>
							<View style={styles.space}/>
					    	<Chip mode={'outlined'} theme={theme} style={this.props?.savingsAccount ? styles.chipNormal : null} textStyle={this.props?.savingsAccount ? styles.textSmallBoldWhite : null}
					    		selected={this.props?.savingsAccount } onPress={() => this.props.extrasUpdated(SAV_ACCOUNT, !this.props.savingsAccount)}>{SAV_ACCOUNT}</Chip>
							<View style={styles.space}/>
					    	<Chip mode={'outlined'} theme={theme} style={this.props?.homeAndLandPackage ? styles.chipNormal : null} textStyle={this.props?.homeAndLandPackage ? styles.textSmallBoldWhite : null}
					    		selected={this.props?.homeAndLandPackage } onPress={() => this.props.extrasUpdated(HOME_AND_LAND_PKG, !this.props.homeAndLandPackage)}>{HOME_AND_LAND_PKG}</Chip>
							<View style={styles.space}/>
					    	<Chip mode={'outlined'} theme={theme} style={this.props?.homeImprovementPackage ? styles.chipNormal : null} textStyle={this.props?.homeImprovementPackage ? styles.textSmallBoldWhite : null}
					    		selected={this.props?.homeImprovementPackage } onPress={() => this.props.extrasUpdated(HOME_IMPROV_PKG, !this.props.homeImprovementPackage)}>{HOME_IMPROV_PKG}</Chip>
							<View style={styles.space}/>
					    	<Chip mode={'outlined'} theme={theme} style={this.props?.redraw ? styles.chipNormal : null} textStyle={this.props?.redraw ? styles.textSmallBoldWhite : null}
					    		selected={this.props?.redraw } onPress={() => this.props.extrasUpdated(REDRAW_FACILITY, !this.props.redraw)}>{REDRAW_FACILITY}</Chip>
				        </View>
	    		    </View>
    		    </View>
				: null }
    		</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  return { ...disclosureReducer };
};

export default connect(mapStateToProps, { borrowingUpdated, loanProfileSelected, loanPurposeSelected, loanProcessingSelected, lvrUpdated, 
	ratePreferenceUpdated, loanPreferenceUpdated, repaymentPreferenceUpdated, extrasUpdated, currentLendingUpdated })(LoanInformation);