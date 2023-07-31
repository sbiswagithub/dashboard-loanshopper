import React, { Component } from "react";
import { View, TextInput  } from 'react-native';
import { connect } from 'react-redux';
import { Chip  } from 'react-native-paper';

import getStyleSheet from '../../styles/styles';  
import { titleCoBorrSelected, fnameCoBorrUpdated, lnameCoBorrUpdated } from '../../actions';
import { TITLE_MR, TITLE_MS, TITLE_MRS, FNAME_DEFAULT, LNAME_DEFAULT } from '../../constants/disclosure';
import { NULL } from '../../constants/common';

class CoBorrowerName extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
    		<View style={[styles.stackedSimpleLayout, {width:'80%'}]}>
	    		<View style={styles.chipsLayout}>
		    		<Chip style={this.props.titleMrCoBorr ? styles.chipNormal : null} textStyle={this.props.titleMrCoBorr ? styles.textSmallBoldWhite : null} selected={this.props.titleMrCoBorr} onPress={() => this.props.titleCoBorrSelected(TITLE_MR)}>{TITLE_MR}</Chip>
		    		<Chip style={this.props.titleMsCoBorr ? styles.chipNormal : null} textStyle={this.props.titleMsCoBorr ? styles.textSmallBoldWhite : null} selected={this.props.titleMsCoBorr}  onPress={() => this.props.titleCoBorrSelected(TITLE_MS)}>{TITLE_MS}</Chip>
		    		<Chip style={this.props.titleMrsCoBorr ? styles.chipNormal : null} textStyle={this.props.titleMrsCoBorr ? styles.textSmallBoldWhite : null} selected={this.props.titleMrsCoBorr}  onPress={() => this.props.titleCoBorrSelected(TITLE_MRS)}>{TITLE_MRS}</Chip>
	    		</View>
	    		<View style={styles.space}/>

    			<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide]} 
    				clearTextOnFocus={true} 
    				onFocus={() => this.props.fnameCoBorrUpdated(NULL)} 
    				onChangeText={text => this.props.fnameCoBorrUpdated(text)}
    		      	value={this.props.firstNameCoBorr} placeholder={FNAME_DEFAULT}/>
		    	<View style={styles.space}/>
			    <TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide]} 
			    	clearTextOnFocus={true} 
			    	onFocus={() => this.props.lnameCoBorrUpdated(NULL)} 
			    	onChangeText={text => this.props.lnameCoBorrUpdated(text)}
			      	value={this.props.lastNameCoBorr} placeholder={LNAME_DEFAULT}/>
			</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { titleCoBorr, firstNameCoBorr, lastNameCoBorr, titleMrCoBorr, titleMrsCoBorr, titleMsCoBorr } = disclosureReducer;
  return { titleCoBorr, firstNameCoBorr, lastNameCoBorr, titleMrCoBorr, titleMrsCoBorr, titleMsCoBorr };
};

export default connect(mapStateToProps, { titleCoBorrSelected, fnameCoBorrUpdated, lnameCoBorrUpdated })(CoBorrowerName);