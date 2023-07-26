import React, { Component } from "react";
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { NOT_SPECIFIED_BANNER } from '../../constants/banners';
import { FEATURES, RATES_AND_FEES, DISCOUNTS_AND_OFFERS, SPECIAL_REQUIREMENTS } from '../../constants/review';

import {  } from '../../actions';
import TableRowTwinCells from './CompareTableRowTwinCells';

const renderItem = ({ item }) => {
	const styles = getStyleSheet();
	const displayLeft = item?.valueL?.value == null ? item?.valueL?.text : item?.valueL.value;
	const displayRight = item?.valueR?.value == null ? item?.valueR?.text : item?.valueR.value;
	const displayLabel = item?.valueR?.text == item?.key || item?.valueL?.text ? null : item?.key ;
    return (
      <View>
  		{ 
  		(displayLeft == null && displayRight == null) ? null :
    		<View><Text style={[styles.textSmallBoldGray], {alignSelf:'center'}}>{displayLabel}</Text>
		    	<TableRowTwinCells cellRBorder={true} cellLeftText={displayLeft} cellRightText={displayRight} />
	    	<View style={styles.space}/></View>}
      </View>
    );
  };
    
class CompareProposalDetails extends Component {

	constructor(props) {
        super(props);
    }

	getEmptyPlaceholder() {
    	const styles = getStyleSheet();
	    return (
			<View elevation={10} style={[styles.viewStyle]}>
	    		<Text style={[styles.textMediumBoldGray, {marginLeft:10}]} >{NOT_SPECIFIED_BANNER}</Text>
	        </View>
	    );
	}
	
	getTableData(selectedView, proposalDetails) {
		if (proposalDetails == null)
			return [];
		switch (selectedView) {
		 	case FEATURES:
		 		return proposalDetails.features;
		 	case RATES_AND_FEES:
		 		return proposalDetails.ratesAndFees;
		 	case DISCOUNTS_AND_OFFERS:
		 		return proposalDetails.discountsAndOffers;
		 	case SPECIAL_REQUIREMENTS :
		 		return proposalDetails.specialRequirements;
		 	default:
		 		return [];
		 }
	}

    render () {
    	const styles = getStyleSheet();
    	const proposalL = this.getTableData(this.props.selectedView, this.props.proposalCompareLeft);
    	const proposalR = this.getTableData(this.props.selectedView, this.props.proposalCompareRight);
		const keysL = proposalL.map((map) => map.label);
		const textL = proposalL.map((map) => map.text);
		const keysR = proposalR.map((map) => map.label);
		const textR = proposalR.map((map) => map.text);
		const allKeys = keysL.concat(keysR);
		const uniques = allKeys.filter((item, pos) => allKeys.indexOf(item) === pos);
		const allText = textL.concat(textR);
		const uniqueTexts = allText.filter((item, pos) => allText.indexOf(item) === pos);
		const rows = uniques.map( (key) => 
			{return { key:key,
					  valueL: proposalL.find((map)=> {return map.label === key ? map.value : null}),
					  valueR: proposalR.find((map)=> {return map.label === key ? map.value : null})
					  }} );
		const rowsWithText = uniqueTexts.map( (key) => 
			{return { key:key,
					  valueL: proposalL.find((map)=> {return map.text === key ? map.text : null}),
					  valueR: proposalR.find((map)=> {return map.text === key ? map.text : null})
					  }} );			  
    	const allRows = rows.concat(rowsWithText);
    	return (
    		<View>
    		{ Object.keys(uniques).length == 0 ? this.getEmptyPlaceholder() :
    		<View elevation={10} style={[styles.viewStyle]}>
	    		<View style={styles.chipsLayout}>
		            <View style={styles.tableView}>
			    		<View style={styles.space}/>
						<FlatList
					        data={allRows}
					        renderItem={renderItem}
					        keyExtractor={(item) => item._id}
							keyboardShouldPersistTaps='handled' 
							showsVerticalScrollIndicator={false}  />
				    </View>
		        </View>
	        </View>
	        }
	        </View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalReducer, proposalCalendarReducer  }) => {
  const { selectedView } = proposalReducer;
  const { proposalCompareRight, proposalCompareLeft, proposalsInView, updated, } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { accessCode, borrower, proposalCompareRight, proposalCompareLeft, proposalsInView, updated, selectedView };
};

export default connect(mapStateToProps, {  })(CompareProposalDetails);