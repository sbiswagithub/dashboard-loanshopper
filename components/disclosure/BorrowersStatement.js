import React, { Component } from "react";
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import getStyleSheet from '../../styles/styles';
import { statementOfIntentUpdated } from '../../actions';
import {  } from '../../constants/disclosure';
import {  } from '../../constants/banners';
import { WHITE, TEXT_GRAY, BORDER_YELLOW } from "../../constants/colors";


class BorrowersStatement extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
    		<View style={{ flex: 0.9, flexDirection:'column'}}>
        		<Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>Statement of intent</Text>
				<View style={styles.space}/>
				<TextInput
					style={{backgroundColor:WHITE, width:'95%', alignSelf: "center", borderWidth:1, borderRadius:5, borderColor: BORDER_YELLOW, padding:10}}
					placeholder={'Tell us in your own words, a little bit about the purpose of your loan. for e.g.: We are Amy and George. We would would like to make our first home a reality and are on the lookout for a loan that provides stability and predictable expenses.'}
					placeholderTextColor={TEXT_GRAY}
					onChangeText={text => this.props.statementOfIntentUpdated(text)}
					value={this.props.statementOfIntent}
					multiline={true}
					numberOfLines={10}
				/>
    		</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { statementOfIntent } = disclosureReducer;
  return { statementOfIntent };
};

export default connect(mapStateToProps, { statementOfIntentUpdated })(BorrowersStatement);