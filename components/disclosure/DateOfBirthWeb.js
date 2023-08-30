import Constants from 'expo-constants';
import React, { Component, useState } from "react";
import { Keyboard, View, TextInput, Text, } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';

import getStyleSheet from '../../styles/styles';  
import { dobUpdated, toggleDatePicker } from '../../actions';
import { DOB_BANNER } from '../../constants/banners';
		
const styles = getStyleSheet();

function DateEntryWithError(props) {
	const [error,setError] = useState()
	const [dobText,setDobText] = useState(props?.dob ? Moment(props.dob).format('DD/MM/YYYY') : '')
	return (
		<>
		<View style={{ flexDirection:'column', alignItems:"center" }}>
			<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide,]} 
					placeholder={'DD/MM/YYYY'} 
					onChangeText={(text) => {
						setDobText(text)
						if (!new RegExp('\\d+\/?').test(text))
							setError('Date should be in DD/MM/YYYY format')
						else if (new RegExp('([a-zA-Z])').test(text))
							setError('Invalid date - unexpected characters found. Format must be DD/MM/YYYY')
						else
							setError('')
					}}
					onBlur={() => {
						if (new RegExp('\\d+/\\d+\/\\d{4}').test(dobText)) {
							const dob = Moment(dobText,'DD/MM/YYYY')
							if (!dob.isValid()) {
								setDobText('')
								setError('Invalid date entered')
							} else if (Moment(new Date()).subtract('70','years').isAfter(dob)) {
								setDobText('')
								setError('Outside accepted date range for home loan applications')
							} else if (Moment(new Date()).subtract('18','years').isBefore(dob)) {
								setDobText('')
								setError('Age must be at least 18 years to apply for home loan')
							} else {
								setError('')
								props.dobUpdated(dob)
							}
						} else
							setError('Invalid date')
					}}
					value={dobText} />
			{error ? <Text style={{color:'red', fontSize:20}} >{error}</Text> : null}
		</View>
		</>
	);
}

class DateOfBirthWeb extends Component {

	constructor(props) {
        super(props);
	}


	render () {
		return (
		    <View>
		      <View style={{ flexDirection:'column', alignItems:"center" }}>
  				  <Text style={[styles.textSmallBoldGray, {marginTop:5}]}>{DOB_BANNER}</Text>
			      <View style={{ flexDirection:'row', justifyContent: 'space-around' }}>
					<DateEntryWithError {...this.props} />
			      </View>
		      </View>
		    </View>
	    )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { dob, showDp } = disclosureReducer;
  return { dob, showDp };
};

export default connect(mapStateToProps, { dobUpdated, toggleDatePicker })(DateOfBirthWeb);