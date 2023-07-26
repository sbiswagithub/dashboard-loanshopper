import React, { Component } from "react";
import { View, ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoanProductDetails from './LoanProductDetails'
import LoanPackageScrollTab from './LoanPackageScrollTab';
import SpinnerHolder from '../common/SpinnerHolder';
import ErrorDialog from '../ErrorDialog';

import getStyleSheet from '../../styles/styles';  
import { FEATURES_BANNER, RATES_AND_FEES_BANNER, DISCOUNTS_BANNER, SPECIAL_REQUIREMENTS_BANNER, NEXT, DOCS_REQUIRED, } from '../../constants/banners';
import { CALENDAR_MODE, APPLICATION_MODE, FEATURES, RATES_AND_FEES, DISCOUNTS_AND_OFFERS, SPECIAL_REQUIREMENTS , REQUIRED_DOCS} from '../../constants/review';
import { setViewMode, handleFetchError } from '../../actions';
import { LOGO_DARK_BLUE, WHITE } from '../../constants/colors';


class LoanProduct extends Component {

	constructor(props) {
        super(props);
	}
	
    render () {
		const styles = getStyleSheet();
    	return (
		<View>

			<ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' >
				
				<View style={{flexDirection:'column'}}>
					<ScrollView  showsHorizontalScrollIndicator={false} horizontal={true} keyboardShouldPersistTaps='handled' >
						<LoanPackageScrollTab iconName="diamond-stone" selection={FEATURES} banner={FEATURES_BANNER} />
						<View style={{marginRight:5}} />
						<LoanPackageScrollTab iconName="brightness-percent"  selection={RATES_AND_FEES} banner={RATES_AND_FEES_BANNER} />
						<View style={{marginRight:5}} />
						<LoanPackageScrollTab iconName="candy"  selection={DISCOUNTS_AND_OFFERS} banner={DISCOUNTS_BANNER} />
						<View style={{marginRight:5}} />
						<LoanPackageScrollTab iconName="contrast-circle"  selection={SPECIAL_REQUIREMENTS} banner={SPECIAL_REQUIREMENTS_BANNER}  />
					</ScrollView>
				</View>

				<View style={styles.space}/>
				
				<LoanProductDetails />
				
			</ScrollView>

			<View style={{flexDirection:'column', alignSelf:'flex-end'}}>
				{this.props.mode == APPLICATION_MODE ? 
					<Icon.Button name="close" size={30} borderRadius={30}
						color={LOGO_DARK_BLUE} backgroundColor={WHITE}
						iconStyle={{margin:8,alignContent:'center'}} 
						onPress={() => this.props.setViewMode(CALENDAR_MODE)} />	:
				null
			}
			</View>

			<SpinnerHolder />
	    </View >
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer, entryReducer }) => {
  const { } = proposalReducer;
  const { } = entryReducer;
  const { } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, };
};

export default connect(mapStateToProps, { handleFetchError, setViewMode, })(LoanProduct);