import React, { Component, useState } from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { professionSelected, handleFetchError } from '../../actions';
import { PRIMARY_PROFESSION_DEFAULT } from '../../constants/disclosure';

const styles = getStyleSheet();

function Profession(props) {
  	const [profession,setProfession] = useState(props?.profession)
	
	return (
		<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntryWide]} 
			onFocus={() => setProfession('')}
			onBlur={() => {props.onChange(profession)}}
			value={profession}
			onChangeText={text => {setProfession(text)}}
			placeholder={PRIMARY_PROFESSION_DEFAULT}/>

	)
}


class SimpleProfessionSelect extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
		<View style={{ flexDirection:'column', justifyContent: 'space-around' }}>
			<Profession {...this.props} onChange={this.props.professionSelected} />
		</View>
    )
  }
}


const mapStateToProps = ({ disclosureReducer }) => {
  const { profession } = disclosureReducer;
  return { profession };
};

export default connect(mapStateToProps, { professionSelected, handleFetchError })(SimpleProfessionSelect);