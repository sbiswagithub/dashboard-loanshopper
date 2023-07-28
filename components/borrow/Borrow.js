import React, { Component } from "react";
import { Text, View, ScrollView } from 'react-native';
import { Slider, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { trackPromise,   } from 'react-promise-tracker';
import Icon from 'react-native-vector-icons/AntDesign';

import getStyleSheet from '../../styles/styles';  
import { BORR_CALC_BANNER, MAIN_APPL_ANN_INC, JOINT_APPL_ANN_INC, 
	BORROWING_TERM, NUM_DEPENDANTS, INTEREST_RATE, CLOSE_BUTTON_BANNER, NEXT } from '../../constants/banners';
import { MAX_INCOME, MIN_INCOME, INCOME_STEP, MAX_DEPENDANTS, MAX_INTEREST_RATE, } from '../../constants/borrow';
import { THUMB_COLOR } from '../../constants/common';
import { closeCalculator, calculateBorrowing,  
	mainApplicantAnnualIncomeUpdated, jointApplicantAnnualIncomeUpdated,
	borrowingTermUpdated, dependantsUpdated, interestRateUpdated, 
	handleGetEstimatesReturn, handleFetchError, 
	onClickApplyButton, fetchEstimatedBorrowingLimits} from '../../actions';
import * as RootNavigation from '../../actions/RootNavigation.js';

import ErrorDialog from '../ErrorDialog';
import Charts from './Charts';
import SpinnerHolder from '../common/SpinnerHolder';

class Borrow extends Component {
    constructor(props) {
	    super(props);
	}

	whenUpdated(data, fieldToUpdate) {
		if (this.props.borrower == null) 
			return;
		switch (fieldToUpdate) {
		  case 0:
			break;
		  case 1:
			this.props.mainApplicantAnnualIncomeUpdated(data);
			break;
		  case 2:
			this.props.jointApplicantAnnualIncomeUpdated(data);
			break;
		  case 3:
			this.props.borrowingTermUpdated(parseInt(data));
			break;
		  case 4:
			this.props.dependantsUpdated(parseInt(data));
			break;
		  case 5:
		  	this.props.interestRateUpdated(parseFloat(data));
			break;
		  }
		const qParams = {
			'mainApplicantIncome' : this.props.mainApplicantAnnualIncome ,
			'jointApplicantIncome': this.props.jointApplicantAnnualIncome ,
			'numDependants': this.props.numDependants ,
			'borrowingTerm': this.props.borrowingTerm ,
			'interestRate': this.props.interestRate ,
		};
		trackPromise(this.props.fetchEstimatedBorrowingLimits(this.props.borrower, qParams, this.props.handleGetEstimatesReturn, this.props.handleFetchError));	
	}

	componentDidMount() {
		this.whenUpdated(undefined,0);
	}
	
    render () {
    	const styles = getStyleSheet();

    	return (
		<View style={{flexDirection:'column',  alignSelf: "stretch", marginLeft:'1%', marginRight:'1%'}}>
    		<View style={{flexDirection:'row',justifyContent:'space-between', paddingTop:"1%", paddingBottom:"2%"}}>
				<Text style={styles.textMediumBoldGray} >{BORR_CALC_BANNER}</Text>
				<View style={{flexDirection:'row',  alignItems:"flex-end" }}>
					<View style={{marginRight:'2%'}}>
					<Icon.Button name="cloudupload" size={20} borderRadius={25} 
						backgroundColor={'#00b4f1'} iconStyle={{margin:8}} 
						onPress={() => this.props.onClickApplyButton()}
					>{NEXT}</Icon.Button></View>
					<Icon.Button name="closesquareo" size={20} borderRadius={25}
						backgroundColor={'#000000'} iconStyle={{margin:8}} 
						onPress={() => this.props.closeCalculator()} >{CLOSE_BUTTON_BANNER}</Icon.Button>
				</View>
    		</View>
			<View style={{flexDirection:'row',alignItems:"flex-start", alignSelf:'center', width:'95%'}}>
				<View style={{flexDirection:'column', width:"30%", marginRight:'1%'}}>
				<View style={[styles.borrowPanel]}>
					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{MAIN_APPL_ANN_INC}</Text>
					<View style={styles.boxRow}>
						<View style={styles.boxCol60}>
							<Slider step={INCOME_STEP} minimumValue={MIN_INCOME} maximumValue={MAX_INCOME} value={this.props.mainApplicantAnnualIncome} 
								onValueChange={value => this.whenUpdated(value, 1)} 
								trackStyle={styles.track} thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  />
						</View>
						<View style={styles.boxCol40}>
							<Text style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>{'$' + this.props.mainApplicantAnnualIncome.toLocaleString(undefined, {maximumFractionDigits:0})} </Text>
						</View>
					</View>

					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{JOINT_APPL_ANN_INC}</Text>
					<View style={styles.boxRow}>
						<View style={styles.boxCol60}>
							<Slider step={10000} maximumValue={MAX_INCOME} value={this.props.jointApplicantAnnualIncome} 
								onValueChange={value => this.whenUpdated(value, 2)} 
								trackStyle={styles.track} thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  />
						</View>
						<View style={styles.boxCol40}>
							<Text style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>{'$' + this.props.jointApplicantAnnualIncome.toLocaleString(undefined, {maximumFractionDigits:0})} </Text>
						</View>
					</View>
					
					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{BORROWING_TERM}</Text>
					<View style={styles.boxRow}>
						<View style={styles.boxCol60}>
							<Slider step={1} maximumValue={30} value={this.props.borrowingTerm} onValueChange={value => this.whenUpdated(value,3)}  
								trackStyle={styles.track} thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  />
						</View>
						<View style={styles.boxCol40}>
							<Text style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>{this.props.borrowingTerm.toLocaleString(undefined, {maximumFractionDigits:0}) + ' years' } </Text>
						</View>
					</View>

					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{NUM_DEPENDANTS}</Text>
					<View style={styles.boxRow}>
						<View style={styles.boxCol60}>
							<Slider step={1} maximumValue={MAX_DEPENDANTS} value={this.props.numDependants} onValueChange={value => this.whenUpdated(value,4)}  
								trackStyle={styles.track} thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  />
						</View>
						<View style={styles.boxCol40}>
							<Text style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>{this.props.numDependants.toLocaleString(undefined, {maximumFractionDigits:0}) } </Text>
						</View>
					</View>

					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{INTEREST_RATE}</Text>
					<View style={styles.boxRow}>
						<View style={styles.boxCol60}>
							<Slider maximumValue={MAX_INTEREST_RATE} value={this.props.interestRate} onValueChange={value => this.whenUpdated(value,5)}  
								trackStyle={styles.track} thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  />
						</View>
						<View style={styles.boxCol40}>
							<Text style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>{this.props.interestRate.toLocaleString(undefined, {maximumFractionDigits:2}) + '%'  } </Text>
						</View>
					</View>
				</View>
				</View>

				<View style={[styles.borrowPanel,{flexDirection:'column', width:'65%',  maxHeight:'35%'}]}>
				<ScrollView keyboardShouldPersistTaps='handled' 
					showsHorizontalScrollIndicator={true} showsVerticalScrollIndicator={true} 
					horizontal={false} >
					<Charts />	
				</ScrollView>
				</View>

			</View>
	      	<SpinnerHolder />
        </View>

        )
    }
}

const mapStateToProps = ({ entryReducer, borrowReducer, authReducer, disclosureReducer }) => {
  const { showButtons, borrowStep } = entryReducer;
  const { accessCode, borrower } = authReducer;
  const { mainApplicantAnnualIncome, jointApplicantAnnualIncome, borrowingTerm, numDependants, interestRate, } = borrowReducer;
  return { showButtons, borrowStep, 
  	mainApplicantAnnualIncome, jointApplicantAnnualIncome, borrowingTerm, numDependants, interestRate, 
	  accessCode, borrower,  };
};

export default connect(mapStateToProps, { closeCalculator, calculateBorrowing, 
	mainApplicantAnnualIncomeUpdated, jointApplicantAnnualIncomeUpdated,
	borrowingTermUpdated, dependantsUpdated, interestRateUpdated, 
	handleGetEstimatesReturn, handleFetchError, 
	onClickApplyButton, fetchEstimatedBorrowingLimits })(Borrow);