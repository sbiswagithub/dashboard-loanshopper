import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Slider, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { QCOMP_BANNER_2, QCOMP_BANNER_3, QCOMP_BANNER_4, QCOMP_BANNER_5, QCOMP_BANNER_6, QCOMP_BANNER_7, QCOMP_BANNER_8 } from '../../constants/banners';
import { MAX_LOAN_VALUE } from '../../constants/home';
import { ALERT_CLOSE_BUTTON_LABEL, HOME_ALERT_1_TITLE, HOME_ALERT_1_MSG } from '../../constants/alerts';
import { onRedirect,homeLoanUpdated,borrowingUpdated, userLoanPreference,updateDealInFocus,hideDealOverlay } from '../../actions';
import { REPAY_FASTER,LOWER_INST,REDRAW,LOWEST_RATES } from '../../actions/types';
import PostCodeSelect from './PostCodeSelect';
import FeaturedBroker from './FeaturedBroker';

class QuickCompare extends Component {
    constructor(props) {
	    super(props);
	}

    updateHomeLoanValue(homeLoan) {
    	homeLoan = homeLoan - (homeLoan % 10000); // In steps of 10K
    	this.props.homeLoanUpdated(homeLoan);
    	this.props.borrowingUpdated(homeLoan);
    }

    toggleDealsOverlay(option) {
		if (!this.props.postCodeSet || this.props.homeLoan === 0) {
			this.alertMessage();
		} else if (option === null) {
			this.props.hideDealOverlay()
		} else
			this.props.userLoanPreference(option);
    }

    alertMessage () {
	    Alert.alert(
	      HOME_ALERT_1_TITLE,
	      HOME_ALERT_1_MSG,
	      [
	        {
	          text: ALERT_CLOSE_BUTTON_LABEL,
	          onPress: () => this.props.hideDealOverlay(),
	          style: "close"
	        }			      ],
	      { cancelable: true }
	    );
	}

    render () {
    	const styles = getStyleSheet();

    	return (
	    	<View style={[styles.searchBoxBlue]}>
				<View style={[styles.justifiedLayout]}>
			    	<Text style={styles.textMediumBoldGray}>{QCOMP_BANNER_2}</Text>
			    	<PostCodeSelect />
		    	</View>
		    	<View style={styles.qComparePanelRowContent}>
			    	<Text style={styles.textMediumBoldGray}>{QCOMP_BANNER_3}</Text>
			    	<Text style={styles.textMediumBoldGray}>${this.props.homeLoan.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
		    	</View>
		    	<View style={styles.qComparePanelRowContent}>
			    	<View style={styles.homeLoanSlider}>
			    	  <Slider maximumValue={MAX_LOAN_VALUE} value={this.props.homeLoan} onValueChange={value => this.updateHomeLoanValue(value)} />
			    	</View>
		    	</View>
		    	<View style={styles.qComparePanelRowContent}>
			    	<View style={styles.stackedLayout}>
	    		    	<Text style={styles.textMediumBoldGray}>Loan Specialist</Text>
	    		    	<Text style={styles.textSmallGray}>Choose one</Text>
			    	</View>
		    	</View>
		    	<View style={styles.qCompareButtonRowContent}>
			    	<TouchableOpacity style={styles.grayButton} onPress={() => this.toggleDealsOverlay(REDRAW)} >
			    	<Text style={styles.textMedium}>First home buyer</Text>
			        </TouchableOpacity>
			    	<TouchableOpacity style={styles.grayButton} onPress={() => this.toggleDealsOverlay(LOWEST_RATES)} >
			    	<Text style={styles.textMedium}>Commercial</Text>
			        </TouchableOpacity>
		        </View>
		    	<View style={styles.qCompareButtonRowContent}>
			    	<TouchableOpacity style={styles.grayButton} onPress={() => this.toggleDealsOverlay(REDRAW)} >
			    	<Text style={styles.textMedium}>Self employed</Text>
			        </TouchableOpacity>
			    	<TouchableOpacity style={styles.grayButton} onPress={() => this.toggleDealsOverlay(LOWEST_RATES)} >
			    	<Text style={styles.textMedium}>SMSF</Text>
			        </TouchableOpacity>
		        </View>
		    	<View style={styles.qCompareButtonRowContent}>
    		    	<TouchableOpacity style={styles.grayButton} onPress={() => this.toggleDealsOverlay(REPAY_FASTER)} >
    		    	<Text style={styles.textMedium}>{QCOMP_BANNER_5}</Text>
    		        </TouchableOpacity>
    		    	<TouchableOpacity style={styles.grayButton} onPress={() => this.toggleDealsOverlay(LOWER_INST)} >
    		    	<Text style={styles.textMedium}>{QCOMP_BANNER_6}</Text>
    		        </TouchableOpacity>
		        </View>
		    	<View style={styles.qCompareButtonRowContent}>
    		    	<TouchableOpacity style={styles.grayButton} onPress={() => this.toggleDealsOverlay(REDRAW)} >
    		    	<Text style={styles.textMedium}>{QCOMP_BANNER_7}</Text>
    		        </TouchableOpacity>
    		    	<TouchableOpacity style={styles.grayButton} onPress={() => this.toggleDealsOverlay(LOWEST_RATES)} >
    		    	<Text style={styles.textMedium}>{QCOMP_BANNER_8}</Text>
    		        </TouchableOpacity>
		        </View>
		        <Overlay overlayStyle={styles.overlayPanel} isVisible={this.props.isDealsOverlayVisible} onBackdropPress={() => this.toggleDealsOverlay(null)}>
		        <FeaturedBroker/>
		        </Overlay>
			</View>
        )
    }
}

const mapStateToProps = ({ homeReducer, disclosureReducer }) => {
  const { homeLoan, postCodeSet, isDealsOverlayVisible } = homeReducer;
  const { borrowing } = disclosureReducer;
  return { borrowing, homeLoan, postCodeSet, isDealsOverlayVisible };
};

export default connect(mapStateToProps, { onRedirect, homeLoanUpdated, borrowingUpdated, userLoanPreference, updateDealInFocus, hideDealOverlay })(QuickCompare);