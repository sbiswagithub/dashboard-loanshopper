import React, { useState, Component } from "react";
import { Keyboard, View, TextInput, Text, TouchableWithoutFeedback  } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import getStyleSheet from '../../styles/styles';  
import { dobUpdated, toggleDatePicker } from '../../actions';
import { DOB_BANNER } from '../../constants/banners';

class DateOfBirth extends Component {

	constructor(props) {
        super(props);
	}

	onDateChange(event, selectedDate) {
	    this.props.dobUpdated(selectedDate);
	    
	};

	render () {
		const styles = getStyleSheet();
		console.log(this.props)
		return (
		    <View>
		      <View style={{ flexDirection:'column', alignItems:"center" }}>
  				  <Text style={[styles.textSmallBoldGray, {marginTop:5}]}>{DOB_BANNER}</Text>
			      <View style={{ flexDirection:'row', justifyContent: 'space-around' }}>
			    	<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide,]} 
			    		onFocus={() => {this.props.toggleDatePicker(this.props.showDp);Keyboard.dismiss();}} clearTextOnFocus={true} placeholder={'DD-MMM-YYYY'} 
			    		value={this.props.dob === null ? '' : Moment(this.props.dob).format('DD-MMM-YYYY')} />
			      </View>
		      </View>
		      {this.props.showDp && (
		        <DateTimePicker
		          value={this.props.dob === null ? new Date() : this.props.dob}
		          mode="date"
		          display="spinner"
		          onChange={(event, selectedDate) => {
					  this.onDateChange(event, selectedDate)
						this.props.toggleDatePicker(true);
				}}
		        />
		      )}
		    </View>
	    )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { dob, showDp } = disclosureReducer;
  return { dob, showDp };
};

export default connect(mapStateToProps, { dobUpdated, toggleDatePicker })(DateOfBirth);