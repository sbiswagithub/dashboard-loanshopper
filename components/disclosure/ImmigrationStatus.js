import React, { Component } from "react";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Chip } from 'react-native-paper';
import getStyleSheet from '../../styles/styles';
import { immigrationStatusSelected } from '../../actions';
import { CITIZEN, RESIDENT, WORK_VISA } from '../../constants/disclosure';
import { IMMIGRATION_STATUS_BANNER_1 } from '../../constants/banners';


class ImmigrationStatus extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
		<View style={{ flexDirection:'column', justifyContent: 'space-around', width:'80%' }}>

        		<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{IMMIGRATION_STATUS_BANNER_1}</Text>
				<View style={styles.space}/>
			    
	    		<View style={{ flex:1, flexDirection:"column", justifyContent: 'space-evenly', alignItems: 'center' }}>
	    		<Chip style={this.props.isCitizen ? styles.chipNormal : null} textStyle={this.props.isCitizen ? styles.textSmallBoldWhite : null} selected={this.props.isCitizen} onPress={() => this.props.immigrationStatusSelected(CITIZEN)}>{CITIZEN}</Chip>
	    		<Chip style={this.props.isResident ? styles.chipNormal : null} textStyle={this.props.isResident ? styles.textSmallBoldWhite : null} selected={this.props.isResident} onPress={() => this.props.immigrationStatusSelected(RESIDENT)}>{RESIDENT}</Chip>
	    		<Chip style={this.props.isWorkVisa ? styles.chipNormal : null} textStyle={this.props.isWorkVisa ? styles.textSmallBoldWhite : null} selected={this.props.isWorkVisa} onPress={() => this.props.immigrationStatusSelected(WORK_VISA)}>{WORK_VISA}</Chip>
	    		</View>

        		</View>
    			
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { isCitizen, isResident, isWorkVisa } = disclosureReducer;
  return { isCitizen, isResident, isWorkVisa };
};

export default connect(mapStateToProps, { immigrationStatusSelected })(ImmigrationStatus);