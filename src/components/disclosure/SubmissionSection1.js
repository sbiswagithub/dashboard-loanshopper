import React, { Component } from "react";
import { View, Text  } from 'react-native';
import { Divider, Switch } from 'react-native-paper';
import { connect } from 'react-redux';
import Moment from 'moment';

import getStyleSheet from '../../styles/styles';  
import { DMY } from '../../constants/common';
import { PERSONAL_DETAILS_BANNER, FULL_NAME_BANNER, DOB_BANNER, EMAIL_BANNER, MOBILE_BANNER, RES_ADDR_BANNER, DEPENDANTS_BANNER, GROSS_INC_BANNER } from '../../constants/banners';
import TableRow from './TableRow';

class SubmissionSection1 extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
            <View style={styles.tableView}>
        		<View style={styles.tableHeader}>
    	        	<View style={styles.tableColumn}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{PERSONAL_DETAILS_BANNER}</Text>
    	        	</View>
        		</View>
    		    <Divider style={styles.tableDivider} />
    		    <TableRow cellLeftText={FULL_NAME_BANNER} cellRightText={this.props.title + ' ' + this.props.firstName + ' ' + this.props.lastName} />
    		    <View style={styles.hrLight}/>
    		    <TableRow cellLeftText={DOB_BANNER} cellRightText={Moment(this.props.dob).format(DMY)} />
    		    <View style={styles.hrLight}/>
    		    <TableRow cellLeftText={EMAIL_BANNER} cellRightText={this.props.email} />
    		    <View style={styles.hrLight}/>
    		    <TableRow cellLeftText={MOBILE_BANNER} cellRightText={this.props.mobile} />
    		    <View style={styles.hrLight}/>
    		    <TableRow cellLeftText={RES_ADDR_BANNER} cellRightText={this.props.addressSelection} />
    		    <View style={styles.hrLight}/>
    		    <TableRow cellLeftText={DEPENDANTS_BANNER} cellRightText={this.props.dependants} />
		    </View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const {
	title,
    firstName,
    lastName,
    email,
    mobile,
    dob,
	addressSelection,
	dependants,
	grossIncAnn
  } = disclosureReducer;
  return {
	title,
    firstName,
    lastName,
    email,
    mobile,
    dob,
	addressSelection,
	dependants,
	grossIncAnn
  };
};

export default connect(mapStateToProps, {  })(SubmissionSection1);