import React, { Component } from "react";
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Card, } from 'react-native-paper';

import getStyleSheet from '../../styles/styles';  
import { NOT_SPECIFIED_BANNER,  } from '../../constants/banners';
import { FEATURES, RATES_AND_FEES, DISCOUNTS_AND_OFFERS, SPECIAL_REQUIREMENTS, } from '../../constants/review';

import { handleFetchError } from '../../actions';
import TableRowTwinCells from '../common/TableRowTwinCells';

const renderItem = ({ item }) => {
	const styles = getStyleSheet();
    return (
      <View key={new Date().getMilliseconds() + item.label}>
      	{ item?.text != null ? 
	      	<View style={[styles.tableRow]}>    		
    		<Text style={[styles.textMediumLogoDarkBlue]}>- {item.text}</Text>
        	</View>
        	:
		    <TableRowTwinCells cellLeftText={item.label} cellRightText={item.value} />
	    }
	    <View style={styles.space}/>
      </View>
    );
  };

  
class ProposalDetails extends Component {

	constructor(props) {
        super(props);
    }

	getTableData(selectedView, payload) {
		switch (selectedView) {
		 	case FEATURES:
		 		return payload.features;
		 	case RATES_AND_FEES:
		 		return payload.ratesAndFees;
		 	case DISCOUNTS_AND_OFFERS:
		 		return payload.discountsAndOffers;
		 	case SPECIAL_REQUIREMENTS :
		 		return payload.specialRequirements;
		 	default:
		 		return [];
		 }
	}

	getEmptyPlaceholder() {
    	const styles = getStyleSheet();
	    return (
			<View elevation={10} style={[styles.viewStyle]}>
	    		<Text style={[styles.textMediumBoldGray, {marginLeft:10}]} >{NOT_SPECIFIED_BANNER}</Text>
	        </View>
	    );
	}

    render () {
    	const styles = getStyleSheet();
		const data = this.getTableData(this.props.selectedView, this.props.proposalDetails);
    	return (
    		<View>
			{ 
			data.length == 0 ? this.getEmptyPlaceholder() :
    		<View elevation={10} style={[styles.viewStyle]}>
	    		<View style={styles.chipsLayout}>
		            <View style={styles.tableView}>
			    		<View style={styles.space}/>
		            	<FlatList
					        data={data}
					        renderItem={renderItem}
					        keyExtractor={(item) => item._id}
							keyboardShouldPersistTaps='handled' 
							scrollEnabled={false}
					      />
				    </View>
		        </View>
	        </View>
	        }
	        </View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalReducer, proposalCalendarReducer  }) => {
  const { displayProposal } = proposalCalendarReducer;
  const { selectedView, proposalDetails, showNextSteps } = proposalReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, selectedView, proposalDetails, displayProposal, showNextSteps };

};

export default connect(mapStateToProps, { handleFetchError })(ProposalDetails);