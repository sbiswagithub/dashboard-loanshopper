import React, { Component } from "react";
import { View, Text  } from 'react-native';
import { Divider } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';
import { EST_MONTHLY_BANNER, POWER_BANNER, WATER_BANNER, PHONES_BANNER, INTERNET_BANNER, CABLE_AND_STREAMING_BANNER, 
	LIFE_INSURANCE_BANNER, HEALTH_INSURANCE_BANNER, VEHICLE_INSURANCE_BANNER, HOME_CONTENTS_INSURANCE_BANNER, } from '../../constants/banners';
import { numberToCurrency } from '../../actions';
import TableRow from './TableRow';

class SubmissionSection8 extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
            <View style={styles.tableView}>
        		<View style={styles.tableHeader}>
    	        	<View style={styles.tableColumn}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{EST_MONTHLY_BANNER}</Text>
    	        	</View>
        		</View>
    		    <Divider style={styles.tableDivider} />

        		{ this.props.power != 0 ? (
				    <TableRow cellLeftText={POWER_BANNER} cellRightText={numberToCurrency(this.props.power)} />
    	        		) : null }

        		{ this.props.water != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={WATER_BANNER} cellRightText={numberToCurrency(this.props.water)} />
					</View>
    	        		) : null }

        		{ this.props.phones != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={PHONES_BANNER} cellRightText={numberToCurrency(this.props.phones)} />
					</View>
    	        		) : null }

        		{ this.props.internet != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={INTERNET_BANNER} cellRightText={numberToCurrency(this.props.internet)} />
					</View>
    	        		) : null }

        		{ this.props.cableAndStreaming != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={CABLE_AND_STREAMING_BANNER} cellRightText={numberToCurrency(this.props.cableAndStreaming)} />
					</View>
    	        		) : null }

        		{ this.props.lifeInsurancePrem != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={LIFE_INSURANCE_BANNER} cellRightText={numberToCurrency(this.props.lifeInsurancePrem)} />
					</View>
    	        		) : null }

        		{ this.props.healthInsurancePrem != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={HEALTH_INSURANCE_BANNER} cellRightText={numberToCurrency(this.props.healthInsurancePrem)} />
					</View>
    	        		) : null }

        		{ this.props.vehicleInsurancePrem != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={VEHICLE_INSURANCE_BANNER} cellRightText={numberToCurrency(this.props.vehicleInsurancePrem)} />
					</View>
    	        		) : null }

        		{ this.props.homeContentsInsurancePrem != 0 ? (
        			<View><View style={styles.hrLight}/>    		
				    <TableRow cellLeftText={HOME_CONTENTS_INSURANCE_BANNER} cellRightText={numberToCurrency(this.props.homeContentsInsurancePrem)} />
					</View>
    	        		) : null }
		    </View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const {
    power,
    water,
    phones, 
    internet,
    cableAndStreaming,
    lifeInsurancePrem,
    healthInsurancePrem,
    vehicleInsurancePrem,
    homeContentsInsurancePrem,
  } = disclosureReducer;
  return {
    power,
    water,
    phones, 
    internet,
    cableAndStreaming,
    lifeInsurancePrem,
    healthInsurancePrem,
    vehicleInsurancePrem,
    homeContentsInsurancePrem,
  };
};

export default connect(mapStateToProps, {  })(SubmissionSection8);