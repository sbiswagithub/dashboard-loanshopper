import React, { Component } from "react";
import { Text, View, TouchableOpacity,  } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { setQParams, addContentsFlag, loadProposals, setReviewPeriod, closeReview, selectDate, } from '../../actions';

class CalendarDateCell extends Component {

	constructor(props) {
        super(props);
    	const dateToSelect = this.props.viewRange[props.index];
    	const startTs = dateToSelect.date.startOf('day').valueOf();
		const endTs = dateToSelect.date.endOf('day').valueOf();
    	const qParams = { 'startTs' : startTs, 'endTs' : endTs };
    	this.props.setQParams(qParams);
		this.props.fetchProposals({...this.props, qParams: qParams}, this.props.addContentsFlag);
    }
    render () {
    	const styles = getStyleSheet();
    	const dateToSelect = this.props.viewRange[this.props.index];
    	return (
		<View style={dateToSelect.selected || dateToSelect.hasContent  ? styles.dateCellWithContent : styles.dateCell}>
	    	<TouchableOpacity onPress={() => { 
			    	const startTs = dateToSelect.date.startOf('day').valueOf();
					const endTs = dateToSelect.date.endOf('day').valueOf();
			    	const qParams = { 'startTs' : startTs, 'endTs' : endTs };
	    			this.props.selectDate({index: this.props.index, qParams : qParams});
					this.props.fetchProposals({ ...this.props, index: this.props.index, qParams : qParams }, this.props.addContentsFlag);
				}} >
		    	<Text style={dateToSelect.selected ? styles.textLargeWhite : styles.textSmallBoldLogoDarkBlue}>{dateToSelect.date.format('dddd').charAt(0)}</Text>
		    	<Text style={dateToSelect.selected ? styles.textLargeWhite : styles.textSmallBoldLogoDarkBlue}>{dateToSelect.date.format('DD')}</Text>
			</TouchableOpacity>
	    </View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer }) => {
  const { qParams, fetchProposals, reviewPeriod, viewRange, dateInView, proposalsInView } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { qParams, fetchProposals, accessCode, borrower, reviewPeriod, viewRange, dateInView, proposalsInView };
};

export default connect(mapStateToProps, { setQParams, addContentsFlag, setReviewPeriod, loadProposals, closeReview, selectDate, })(CalendarDateCell);