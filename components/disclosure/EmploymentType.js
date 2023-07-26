import React, { Component } from "react";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Chip } from 'react-native-paper';
import getStyleSheet from '../../styles/styles';
import { employmentTypeSelected } from '../../actions';
import { PERMANENT, SELF_EMPLOYED, } from '../../constants/disclosure';
import { EMPLOYMENT_TYPE_BANNER_1, PAYG } from '../../constants/banners';


class EmploymentType extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
    		<View style={{ flex: 0.9, flexDirection:'column'}}>
        		<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{EMPLOYMENT_TYPE_BANNER_1}</Text>
				<View style={styles.space}/>

	    		<View style={{ flex:1, flexDirection:"row", justifyContent: 'space-evenly', alignItems: 'stretch' }}>
	    		<Chip style={this.props.isPermanent ? styles.chipNormal : null} textStyle={this.props.isPermanent ? styles.textSmallBoldWhite : null} selected={this.props.isPermanent} onPress={() => this.props.employmentTypeSelected(PERMANENT)}>{PAYG}</Chip>
	    		<Chip style={this.props.isSelfEmployed ? styles.chipNormal : null} textStyle={this.props.isSelfEmployed ? styles.textSmallBoldWhite : null}  selected={this.props.isSelfEmployed} onPress={() => this.props.employmentTypeSelected(SELF_EMPLOYED)}>{SELF_EMPLOYED}</Chip>
	    		</View>
    		</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { employmentType, isPermanent,  isSelfEmployed } = disclosureReducer;
  return { employmentType, isPermanent, isSelfEmployed };
};

export default connect(mapStateToProps, { employmentTypeSelected })(EmploymentType);