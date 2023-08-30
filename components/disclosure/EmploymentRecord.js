import React, { Component } from "react";
import { View, Text  } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {  } from '../../actions';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE } from "../../constants/colors";

import getStyleSheet from '../../styles/styles';  


class EmploymentRecord extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
		<View key={'emphistory_' +  new Date() + Math.random()} style={{ flexDirection:'column', margin:'1%', padding:'1%', borderWidth:1, borderColor: LOGO_BRIGHT_BLUE, borderRadius:5}}>
			<View style={{ flexDirection:'row', padding:'1%', alignContent:"stretch", justifyContent:"flex-start", alignItems:"baseline"}}>
				<Text style={[styles.textSmallBoldPurple]}>{this.props.employerName}</Text>
				<View style={{padding:'1%'}}/>
				<Text style={[styles.textSmallGray]}>{this.props.position}</Text>
			</View>
			{this.props.startDate ? 
			<View style={{ flexDirection:'row', padding:'1%', alignContent:"stretch", justifyContent:"flex-start", alignItems:"baseline"}}>
				{this.props.isCurrent ? 
				<Text style={[styles.textSmallLogoDarkBlue]}>{this.props.startDate} to current</Text> : 
				<View><Text style={[styles.textSmallLogoDarkBlue]}>{this.props.startDate} to {this.props.endDate}</Text></View> }
			</View> : null}
			{this.props.employerContact ? 
			<View style={{ flexDirection:'row', padding:'1%', alignContent:"stretch", justifyContent:"flex-start", alignItems:"baseline"}}>
				<Text style={[styles.textSmallLogoDarkBlue]}>Contact - {this.props.employerContact} {this.props.employerEmail}</Text>
			</View> : null }

			{this.props?.onRemove ? 
			<View style={{ flexDirection:'row-reverse', padding:'1%', }}>
				<Icon.Button name="minus" size={10} borderRadius={5} backgroundColor={LOGO_DARK_BLUE } iconStyle={{margin:1}} 
					onPressIn={this.props.onRemove} >Remove</Icon.Button>
			</View> : null }
		</View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const {  } = disclosureReducer;
  return {  };
};

export default connect(mapStateToProps, {  })(EmploymentRecord);