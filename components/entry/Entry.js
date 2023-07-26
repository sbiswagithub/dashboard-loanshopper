import React, { Component } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Button, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Avatar,  } from 'react-native-paper';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { trackPromise, } from 'react-promise-tracker';

import getStyleSheet from '../../styles/styles';  
import { HOME_BANNER_1, HOME_BANNER_2, HOME_BANNER_3, BUTTON_1_BANNER, BUTTON_2_BANNER, BUTTON_3_BANNER, BUTTON_4_BANNER } from '../../constants/banners';
import { setViewMode, onClickBorrowButton, onClickApplyButton, onClickReviewButton, onClickDealsButton, 
	authenticatedBorrower, loadBorrowerDetails, handleFetchError, getLoanRequest, toApply } from '../../actions';
import { CALENDAR_MODE, DEALS_MODE, PROPOSAL_MODE } from '../../constants/review';

import Borrow from '../borrow/Borrow';
import Disclosure from '../disclosure/Disclosure';
import Review from '../review/Review';
import Deals from '../deals/Deals';
import ErrorDialog from '../ErrorDialog'
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, BACKGROUND_LIGHT_GRAY, WHITE } from '../../constants/colors';

function EntryButtons(props) {
  const navigation = useNavigation();
  const styles = getStyleSheet();

  return (
		  <View style={{height:"100%"}}>
			{props.showButtons ? 

			<View>
				<View style={[styles.stackedSimpleLayout, {maxWidth:"95%", maxHeight:'20%', alignSelf:"center", alignItems:"stretch"}]}>
					<View style={styles.space}/>
					<Text style={styles.textMediumLogoDarkBlue}>{HOME_BANNER_1}</Text> 
					<View style={styles.space}/>
					<Text style={styles.textLargeLogoDarkBlue}>{HOME_BANNER_2}</Text> 
					<View style={styles.space}/>
				</View>
				<View style={{justifyContent:"space-between", alignSelf:"center", height:'80%'}} >
					<View style={styles.space}/>
					<View  style={styles.entryButtonRowContent}>
						
						<TouchableOpacity onPress={() => { props.onClickBorrowButton() }} >
						<LinearGradient
								colors={[
								LOGO_DARK_BLUE,
								LOGO_BRIGHT_BLUE,
								]}
								style={[styles.background, { borderWidth: 1, borderRadius: 25,borderColor: WHITE}]}
								start={{ x: 0.5, y: 1 }}
								end={{ x: 0.5, y: 0 }}
							/>
						<View style={styles.tableRow}>
							<View style={styles.tableColumn20pct}>
								<Avatar.Icon size={50} icon="numeric-1-circle" color={LOGO_DARK_BLUE} style={{backgroundColor:LOGO_BRIGHT_BLUE,}}  />
							</View>
							<View style={styles.tableColumn80pct}>
								<Text style={styles.largeBlueButtonText}>{BUTTON_1_BANNER}</Text>
							</View>
						</View>
						</TouchableOpacity>				
					</View>
					<View style={styles.space}/>
					<View style={styles.entryButtonRowContent}>
						<TouchableOpacity onPress={() => { props.onClickApplyButton() }} >
						<LinearGradient
								colors={[
								LOGO_DARK_BLUE,
								LOGO_BRIGHT_BLUE,
								]}
								style={[styles.background, { borderWidth: 1, borderRadius: 25,borderColor: WHITE}]}
								start={{ x: 0.5, y: 1 }}
								end={{ x: 0.5, y: 0 }}
							/>
							<View style={styles.tableRow}>
								<View style={styles.tableColumn20pct}>
									<Avatar.Icon size={50} icon="numeric-2-circle" color={LOGO_DARK_BLUE} style={{backgroundColor:LOGO_BRIGHT_BLUE,}}  />									
								</View>
								<View style={styles.tableColumn80pct}>
									<Text style={styles.largeBlueButtonText}>{BUTTON_2_BANNER}</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.space}/>
					<View style={styles.entryButtonRowContent}>
						<TouchableOpacity onPress={() => { 
							props.setViewMode(CALENDAR_MODE);
							props.onClickReviewButton(); }} >
							<LinearGradient
									colors={[
									LOGO_DARK_BLUE,
									LOGO_BRIGHT_BLUE,
									]}
									style={[styles.background, { borderWidth: 1, borderRadius: 25,borderColor: WHITE}]}
									start={{ x: 0.5, y: 1 }}
									end={{ x: 0.5, y: 0 }}
								/>
							<View style={styles.tableRow}>
								<View style={styles.tableColumn20pct}>
									<Avatar.Icon size={50} icon="numeric-3-circle" color={LOGO_DARK_BLUE} style={{backgroundColor:LOGO_BRIGHT_BLUE,}}  />
								</View>
								<View style={styles.tableColumn80pct}>
									<Text style={styles.largeBlueButtonText}>{BUTTON_3_BANNER}</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.space}/>
				</View>
			</View>
			: 
			props.showCalculator ? <Borrow /> : 
			props.showDisclosure ? <Disclosure /> : 
			props.showReview ? <Review /> : null }
		</View>
  );
}
class Entry extends Component {
    constructor(props) {
	    super(props);
	}

	componentDidMount() {
		//console.log(this.props)
		trackPromise(
			this.props.getLoanRequest(
				(loanRequest) => {
					if (loanRequest === null || loanRequest._id === undefined) {
						this.props.toApply()
					}
				}, 
				this.props.handleFetchError)
				)		
	}

    render () {
    	const styles = getStyleSheet();
    	return (
	    	<View>
	    		<View style={styles.entryPanel}>
			    	<EntryButtons {...this.props}
			    		showButtons={this.props.showButtons} 
			    		showDisclosure={this.props.showDisclosure}
			    		showReview={this.props.showReview}
						showCalculator={this.props.showCalculator}
						showDeals={this.props.showDealInProgress}
			    		onClickBorrowButton={this.props.onClickBorrowButton} 
			    		onClickApplyButton={this.props.onClickApplyButton}
			    		onClickReviewButton={this.props.onClickReviewButton}
			    		onClickDealsButton={this.props.onClickDealsButton} />
				</View>
				<ErrorDialog />
		    </View>
        )
    }
}

const mapStateToProps = ({ entryReducer, authReducer }) => {
  const { error } = authReducer;
  const { showButtons, showDisclosure, showReview, showCalculator, showDealInProgress } = entryReducer;
  return { showButtons, showDisclosure, showReview, showCalculator, showDealInProgress, error };
};

export default connect(mapStateToProps, { setViewMode, onClickBorrowButton, onClickApplyButton, onClickReviewButton, 
	onClickDealsButton, authenticatedBorrower, loadBorrowerDetails, handleFetchError, getLoanRequest, toApply })(Entry);