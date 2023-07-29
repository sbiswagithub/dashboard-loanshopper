import React, { Component, useState  } from 'react';
import { Text, View, Platform, TouchableOpacity, TextInput } from 'react-native'
import { Chip } from 'react-native-paper';
import { Slider } from 'react-native-elements';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { currentLendingUpdated } from '../../actions';
import { BORROWING_SLIDER_MAX, REPAYMENT_SLIDER_MAX, FIXED, VARIABLE, SPLIT } from '../../constants/disclosure';
import { CURRENT_LENDER, CURRENT_HOME_LOAN, CURRENT_REPAYMENT, CURRENT_MORTGAGE_INFORMATION, SELECT_LENDER, CURRENT_HOME_LOAN_TYPE } from '../../constants/banners';
import { THUMB_COLOR } from '../../constants/common';
import { CURR_HOMELOAN_UPDATED, CURR_REPAYMENT_UPDATED, CURR_HOME_LOAN_TYPE_UPDATED, CURR_LENDER_UPDATED } from '../../actions/types';
import Selection from "../common/Selection";
import {  currencyToNumber  } from '../../actions';

class CurrentLendingDetails extends Component {

  constructor(props) {
    super(props);
  }

  render () {
	  const styles = getStyleSheet();

    return (
		<View>
			<View style={styles.disclosureBoxRow}>
				<Text style={[styles.textMediumBoldGray]}>{CURRENT_MORTGAGE_INFORMATION}</Text>
			</View>
			<View style={styles.disclosureBoxRow}>
				<View style={[styles.stackedSimpleLayout, {flex:1, flexDirection:"column", flexGrow:0.9}]}>
					<Text style={[styles.textSmallBoldGray, {alignSelf:"center", marginBottom:"2%"}]}>{CURRENT_LENDER}</Text>
					<Selection 
						data={this.props.lenderChoices} 
						onSelect={(selection) => {this.props.currentLendingUpdated(CURR_LENDER_UPDATED, selection)}}
						selection={this.props.currentLender}
						placeholder={SELECT_LENDER} />
				</View>
			</View>
			<View style={styles.hrLight}/>
			<View style={styles.disclosureBoxRow}>
				<View style={{ flex: 0.9, flexDirection:'column'}}>
					<View style={styles.space}/>
					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{CURRENT_HOME_LOAN}</Text>
					<View style={styles.boxRow}>
						<View style={styles.boxCol60}>
						<Slider thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  
							maximumValue={BORROWING_SLIDER_MAX} value={this.props.currentHomeLoan} onValueChange={value => 
							{
								const amount = currencyToNumber(value);
								const adjustedAmount = amount > BORROWING_SLIDER_MAX ? BORROWING_SLIDER_MAX : (amount - (amount%1000));
								this.props.currentLendingUpdated(CURR_HOMELOAN_UPDATED, adjustedAmount)
							}
							} />
						</View>
						<View style={styles.boxCol40}>
							<Text style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>
							{this.props?.currentHomeLoan == null ? null :  '< $' + this.props.currentHomeLoan.toLocaleString(undefined, {maximumFractionDigits:0})}
							</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.hrLight}/>
			<View style={styles.disclosureBoxRow}>
				<View style={{ flex: 0.9, flexDirection:'column'}}>
				<View style={styles.space}/>
					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{CURRENT_REPAYMENT}</Text>
					<View style={styles.boxRow}>
						<View style={styles.boxCol60}>
						<Slider thumbStyle={styles.thumb} thumbTintColor={THUMB_COLOR}  
							maximumValue={REPAYMENT_SLIDER_MAX} value={this.props.currentRepayment} onValueChange={value => 
							{
								const amount = currencyToNumber(value);
								const adjustedAmount = amount > REPAYMENT_SLIDER_MAX ? REPAYMENT_SLIDER_MAX : (amount - (amount%50));
								this.props.currentLendingUpdated(CURR_REPAYMENT_UPDATED, adjustedAmount)
							}
							} />
						</View>
						<View style={styles.boxCol40}>
							<Text style={[styles.textSmallBoldBlue, {alignSelf:'flex-end', margin:5}]}>
							{this.props?.currentRepayment == null ? null :  ' < $' + this.props.currentRepayment.toLocaleString(undefined, {maximumFractionDigits:0})}
							</Text>
						</View>
					</View>
				</View>
			</View>			
			<View style={styles.hrLight}/>
			<View style={styles.disclosureBoxRow}>
				<View style={{ flex: 0.9, flexDirection:'column'}}>
				<View style={styles.space}/>
					<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{CURRENT_HOME_LOAN_TYPE}</Text>
		    		<View style={styles.space}/>
					<View style={styles.chipsLayout}>
						<Chip style={this.props.currentHomeLoanType == FIXED ? styles.chipNormal : null} textStyle={this.props.currentHomeLoanType == FIXED ? styles.textSmallBoldWhite : null}
							selected={this.props.currentHomeLoanType == FIXED} onPress={() => this.props.currentLendingUpdated(CURR_HOME_LOAN_TYPE_UPDATED,FIXED)}>{FIXED}</Chip>
						<Chip style={this.props.currentHomeLoanType == VARIABLE ? styles.chipNormal : null} textStyle={this.props.currentHomeLoanType == VARIABLE ? styles.textSmallBoldWhite : null}
							selected={this.props.currentHomeLoanType == VARIABLE} onPress={() => this.props.currentLendingUpdated(CURR_HOME_LOAN_TYPE_UPDATED, VARIABLE)}>{VARIABLE}</Chip>
						<Chip style={this.props.currentHomeLoanType == SPLIT ? styles.chipNormal : null} textStyle={this.props.currentHomeLoanType == SPLIT ? styles.textSmallBoldWhite : null}
							selected={this.props.currentHomeLoanType == SPLIT} onPress={() => this.props.currentLendingUpdated(CURR_HOME_LOAN_TYPE_UPDATED, SPLIT)}>{SPLIT}</Chip>
	    		    </View>
				</View>
			</View>			

        </View>
    )
  }
}

const mapStateToProps = ({ disclosureReducer, authReducer }) => {
  const { accessCode } = authReducer;
  return { accessCode, ...disclosureReducer };
};

export default connect(mapStateToProps, { currentLendingUpdated })(CurrentLendingDetails);