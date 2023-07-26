import React, { Component } from "react";
import { Dimensions, View, Text, Alert  } from 'react-native';
import CheckBox from 'react-native-check-box';
import { connect } from 'react-redux';

import { closeDisclosure, toggleEditMode, toggleModal, toggleAcceptFlag,  } from '../../actions';
import { ACCEPTANCE_BANNER } from '../../constants/banners';
import getStyleSheet from '../../styles/styles';  
import CoBorrowerInformation from './CoBorrowerInformation';  
import MinimumRequiredDetails from './MinimumRequiredDetails';
import LoanInformation from './LoanInformation';
import Assets from  './Assets';
import Liabilities from  './Liabilities';
import WeeklySpend from  './WeeklySpend';
import MonthlySpend from  './MonthlySpend';
import AnnualSpend from  './AnnualSpend';
import CurrentLendingDetails from "./CurrentLendingDetails";

class DisclosureEditable extends Component {

	constructor(props) {
        super(props);
    }
    render () {
		const styles = getStyleSheet();
		const _onToggleAccept = (accept) => {
			this.props.toggleAcceptFlag(accept);
		}
    	return (
			<View>
				{this.props.edit == 1 ? 
				<View style={styles.disclosureMinRequirementsPanel}>
					<MinimumRequiredDetails /> 
				</View> : null }

				{this.props.edit >= 2 && this.props.edit <= 12 ? 
				<View style={styles.disclosurePanel}>
				<LoanInformation /> 
				</View> : null }

				{this.props.edit == 13 ? 
        			<View style={styles.disclosurePanel}>
			        <CoBorrowerInformation />
	    		    </View>
				: null }

				{this.props.edit == 14 ? 
		        	<View style={styles.disclosurePanel}>
			    		<View style={[styles.disclosureBoxRow]}>
				    	<Assets />
		    		    </View>
		    		</View>
				: null }

				{this.props.edit == 15 ? 
		        	<View style={styles.disclosurePanel}>
			    		<View style={[styles.disclosureBoxRow]}>
				    	<Liabilities />
		    		    </View>	   
		    		</View>
				: null }

				{this.props.edit == 16 ? 
		        	<View style={styles.disclosurePanel}>
			    		<View style={[styles.disclosureBoxRow]}>
				    	<WeeklySpend />
		    		    </View>
		    		</View>
				: null }

				{this.props.edit == 17 ? 
		        	<View style={styles.disclosurePanel}>
			    		<View style={[styles.disclosureBoxRow]}>
				    	<MonthlySpend />
		    		    </View>
	    		    </View>
				: null }

				{this.props.edit == 18 ? 
		        	<View style={styles.disclosurePanel}>
			    		<View style={[styles.disclosureBoxRow]}>
				    	<AnnualSpend />
		    		    </View>
	    		    </View>
				: null }

				{this.props.edit == 19 ? 
		        	<View style={styles.disclosurePanel}>
						<View style={{ flexDirection:'column', margin:10,justifyContent:'center', alignContent:'center'}}>
						<CheckBox isChecked={this.props.isAccepted} onClick={() => {_onToggleAccept(!this.props.isAccepted);}} />
						<Text style={[styles.textMediumBoldLogoDarkBlue] }>{ ACCEPTANCE_BANNER }</Text>
						</View>
    	    		</View>
				: null }
    		</View> 
        )
    }
    
	
}

const mapStateToProps = ({ disclosureReducer, authReducer }) => {
  const { modalVisible, editMode, titles, addressSet, employmentType, immigrationStatus, professionIdx,
	  isAccepted, hasTitle, hasFirstName, hasLastName, hasEmail, hasGrossIncAnn, hasBorrowing, professionSet, isRefinance, edit } = disclosureReducer;
  const { accessCode } = authReducer;
  return { accessCode , modalVisible, editMode, titles, addressSet, employmentType, immigrationStatus, professionIdx,
	  isAccepted, hasTitle, hasFirstName, hasLastName, hasEmail, hasGrossIncAnn, hasBorrowing, professionSet, isRefinance, edit };
};

export default connect(mapStateToProps, { closeDisclosure, toggleEditMode, toggleModal, toggleAcceptFlag,  })(DisclosureEditable);