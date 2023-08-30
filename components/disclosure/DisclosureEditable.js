import React, { Component } from "react";
import { CheckBox, View, Text, TextInput } from 'react-native';
import { TouchableHighlight } from "react-native-gesture-handler";

import { connect } from 'react-redux';

import { closeDisclosure, toggleEditMode, toggleModal, toggleAcceptFlag, promoCodeUpdated } from '../../actions';
import { ACCEPTANCE_BANNER } from '../../constants/banners';
import getStyleSheet from '../../styles/styles';  
import CoBorrowerInformation from './CoBorrowerInformation';  
import EmploymentHistory from './EmploymentHistory';
import MinimumRequiredDetails from './MinimumRequiredDetails';
import BorrowersStatement from './BorrowersStatement';
import LoanInformation from './LoanInformation';
import Assets from  './Assets';
import Liabilities from  './Liabilities';
import WeeklySpend from  './WeeklySpend';
import MonthlySpend from  './MonthlySpend';
import AnnualSpend from  './AnnualSpend';

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

				{this.props.edit == 2 ? 
				<View style={styles.disclosurePanel}>
					<BorrowersStatement />
				</View> : null }

				{this.props.edit == 3 ? 
				<View style={styles.disclosurePanel}>
					<EmploymentHistory />
				</View> : null }

				{this.props.edit >= 4 && this.props.edit <= 14 ? 
        			<View style={styles.disclosurePanel}>
				<LoanInformation /> 
	    		    </View>
				: null }

				{this.props.edit == 15 ? 
		        	<View style={styles.disclosurePanel}>
			    		<View style={[styles.disclosureBoxRow]}>
			        <CoBorrowerInformation />
		    		    </View>
		    		</View>
				: null }

				{this.props.edit == 16 ? 
		        	<View style={styles.disclosurePanel}>
			    		<View style={[styles.disclosureBoxRow]}>
				    	<Assets />
		    		    </View>	   
		    		</View>
				: null }

				{this.props.edit == 17 ? 
		        	<View style={styles.disclosurePanel}>
			    		<View style={[styles.disclosureBoxRow]}>
				    	<Liabilities />
		    		    </View>
		    		</View>
				: null }

				{this.props.edit == 18 ? 
		        	<View style={styles.disclosurePanel}>
			    		<View style={[styles.disclosureBoxRow]}>
				    	<WeeklySpend />
		    		    </View>
	    		    </View>
				: null }

				{this.props.edit == 19 ? 
		        	<View style={styles.disclosurePanel}>
			    		<View style={[styles.disclosureBoxRow]}>
				    	<MonthlySpend />
		    		    </View>
	    		    </View>
				: null }

				{this.props.edit == 20 ? 
		        	<View style={styles.disclosurePanel}>
			    		<View style={[styles.disclosureBoxRow]}>
				    	<AnnualSpend />
		    		    </View>
	    		    </View>
				: null }

				{this.props.edit == 21 ? 
		        	<View style={styles.disclosurePanel}>
						<View style={[styles.tableView, {width:'80%', alignSelf:"center"}]}>
							<View style={styles.tableRow}>
									<View style={styles.tableColumn}>    		
									<Text style={[styles.textMediumGray]}>Promo code</Text>
									</View>
						
									<View style={styles.tableColumn}>    		
									<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
										selectTextOnFocus={true} 
										onChangeText={text => this.props.promoCodeUpdated(text)}
										value={this.props.promoCode} />
									</View>
								</View>
						</View>
						<View style={styles.space} />
						<View style={styles.hrLight} />
						<View style={styles.space} />
						<View style={{ flexDirection:'row', width:'80%', alignSelf:"center", justifyContent:'flex-start'}}>
						<TouchableHighlight  onPressIn={() => {_onToggleAccept(!this.props.isAccepted);}}>
							<CheckBox disabled={true} value={this.props.isAccepted} />
						</TouchableHighlight>
						<Text style={[styles.textMediumBoldLogoDarkBlue, {marginLeft:'1%'}] }>{ ACCEPTANCE_BANNER }</Text>
						</View>
    	    		</View>
				: null }
    		</View> 
        )
    }
    
	
}

const mapStateToProps = ({ disclosureReducer, authReducer }) => {
  const { modalVisible, editMode, titles, addressSet, employmentType, immigrationStatus, professionIdx, promoCode,
	  isAccepted, hasTitle, hasFirstName, hasLastName, hasEmail, hasGrossIncAnn, hasBorrowing, professionSet, isRefinance, edit } = disclosureReducer;
  const { accessCode } = authReducer;
  return { accessCode , modalVisible, editMode, titles, addressSet, employmentType, immigrationStatus, professionIdx, promoCode,
	  isAccepted, hasTitle, hasFirstName, hasLastName, hasEmail, hasGrossIncAnn, hasBorrowing, professionSet, isRefinance, edit };
};

export default connect(mapStateToProps, { closeDisclosure, toggleEditMode, toggleModal, toggleAcceptFlag, promoCodeUpdated })(DisclosureEditable);