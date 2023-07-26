import React, { Component } from "react";
import { Text , View, TextInput,  } from 'react-native';
import { connect } from 'react-redux';
import { Chip  } from 'react-native-paper';

import getStyleSheet from '../../styles/styles';  
import { titleSelected, fnameUpdated, lnameUpdated } from '../../actions';
import { TITLE_MR, TITLE_MS, TITLE_MRS, FNAME_DEFAULT, LNAME_DEFAULT } from '../../constants/disclosure';

class Name extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
    		<View style={styles.stackedSimpleLayout}>
	    		<View style={styles.chipsLayout}>
		    		<Chip selected={this.props.titleMr} onPress={() => this.props.titleSelected(TITLE_MR)}>{TITLE_MR}</Chip>
		    		<Chip selected={this.props.titleMs}  onPress={() => this.props.titleSelected(TITLE_MS)}>{TITLE_MS}</Chip>
		    		<Chip selected={this.props.titleMrs}  onPress={() => this.props.titleSelected(TITLE_MRS)}>{TITLE_MRS}</Chip>
	    		</View>
	    		<View style={styles.space}/>

    			<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide]} clearTextOnFocus={true} onFocus={() => {this.props.fnameUpdated('')}} onChangeText={text => this.props.fnameUpdated(text)}
	    			value={this.props.firstName} placeholder={FNAME_DEFAULT}  />
	    		<View style={styles.space}/>

	    		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide]} clearTextOnFocus={true} onFocus={() => {this.props.lnameUpdated('')}} onChangeText={text => this.props.lnameUpdated(text)}
			      	value={this.props.lastName} placeholder={LNAME_DEFAULT}/>
	    		<View style={styles.space}/>
    		</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { title, firstName, lastName, titleMr, titleMrs, titleMs } = disclosureReducer;
  return { title, firstName, lastName, titleMr, titleMrs, titleMs };
};

export default connect(mapStateToProps, { titleSelected, fnameUpdated, lnameUpdated })(Name);