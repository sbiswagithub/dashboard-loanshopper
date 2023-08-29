import React, { Component } from "react";
import { View, Text  } from 'react-native';
import { Divider } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';
import { OTH_DETAILS_BANNER, EMPLOYMENT_TYPE_BANNER_1, IMMIGRATION_STATUS_BANNER_1, GROSS_INC_BANNER, PAYG, } from '../../constants/banners';
import { PRIMARY_PROFESSION_DEFAULT, CITIZEN, RESIDENT, WORK_VISA, SELF_EMPLOYED } from '../../constants/disclosure';
import { numberToCurrency  } from '../../actions';
import TableRow from './TableRow';
import MultiChoiceTableRow from "./MultiChoiceTableRow";


class SubmissionSection2 extends Component {

	constructor(props) {
        super(props);
	}
	
    render () {
    	const styles = getStyleSheet();
    	return (
            <View style={styles.tableView}>
        		<View style={styles.tableHeader}>
    	        	<View style={styles.tableColumn}>    		
    	    		<Text style={[styles.textSmallBoldGray]}>{OTH_DETAILS_BANNER}</Text>
    	        	</View>
        		</View>
    		    <Divider style={styles.tableDivider} />

        		{ this.props.employmentType != null ? (
	    		    <MultiChoiceTableRow cellLeftText={EMPLOYMENT_TYPE_BANNER_1} cellRightText={this.props.isPermanent ? PAYG : this.props.employmentType} choices={[PAYG,SELF_EMPLOYED]} />
				) : null }

        		{ this.props.immigrationStatus != null ? (
        			<View><View style={styles.hrLight}/>
	    		    <MultiChoiceTableRow cellLeftText={IMMIGRATION_STATUS_BANNER_1} cellRightText={this.props.immigrationStatus} choices={[CITIZEN, RESIDENT, WORK_VISA]} />
    	        	</View>
    	        		) : null }

        		{ this.props.profession !=  '' ? (
        			<View><View style={styles.hrLight}/>
	    		    <TableRow cellLeftText={PRIMARY_PROFESSION_DEFAULT} cellRightText={this.props.profession} />
    	        	</View>
    	        		) : null }

        		{ this.props.grossIncAnn != 0 ? (
        			<View><View style={styles.hrLight}/>
	    		    <TableRow cellLeftText={GROSS_INC_BANNER} cellRightText={numberToCurrency(this.props.grossIncAnn)} />
    	        	</View>
    	        		) : null }
    		    
        		{ this.props.statementOfIntent != null && this.props.statementOfIntent != ''  ? (
        			<View><View style={styles.hrLight}/>
	    		    <TableRow cellLeftText={'Statement of intent'} cellRightText={this.props.statementOfIntent} />
    	        	</View>
    	        		) : null }
		    </View>
        )	
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const {
	  statementOfIntent,
	professions,
	professionIdx,
    employmentType, 
    immigrationStatus,
    grossIncAnn,
	profession,
	isPermanent
  } = disclosureReducer;
  return {
	  statementOfIntent,
	professions,
	professionIdx,
    employmentType, 
    immigrationStatus,
    grossIncAnn,
	profession,
	isPermanent
  };
};

export default connect(mapStateToProps, {  })(SubmissionSection2);