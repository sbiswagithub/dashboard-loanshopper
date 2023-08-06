import React, { Component } from "react";
import { CheckBox, View, Text, TextInput } from 'react-native';
import { TouchableHighlight } from "react-native-gesture-handler";

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
						<View style={[styles.tableView, {width:'80%', alignSelf:"center"}]}>
							<View style={styles.tableRow}>
									<View style={styles.tableColumn}>    		
									<Text style={[styles.textMediumGray]}>Promo code</Text>
									</View>
						
									<View style={styles.tableColumn}>    		
									<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
										clearTextOnFocus={true} 
										onFocus={text => {}}
										onChangeText={text => {}}
										value={''} />
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
  const { modalVisible, editMode, titles, addressSet, employmentType, immigrationStatus, professionIdx,
	  isAccepted, hasTitle, hasFirstName, hasLastName, hasEmail, hasGrossIncAnn, hasBorrowing, professionSet, isRefinance, edit } = disclosureReducer;
  const { accessCode } = authReducer;
  return { accessCode , modalVisible, editMode, titles, addressSet, employmentType, immigrationStatus, professionIdx,
	  isAccepted, hasTitle, hasFirstName, hasLastName, hasEmail, hasGrossIncAnn, hasBorrowing, professionSet, isRefinance, edit };
};

export default connect(mapStateToProps, { closeDisclosure, toggleEditMode, toggleModal, toggleAcceptFlag,  })(DisclosureEditable);