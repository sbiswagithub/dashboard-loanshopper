import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { addressOnBlur, addressesFound, addressSelected, addressUnSelected } from '../../actions';
import { AddressSelect } from './AddressComponentFunctions';
import { CURRENT_ADDRESS_DEFAULT } from '../../constants/disclosure';

class CurrentAddressSelect extends Component {

  constructor(props) {
    super(props);
  }

  render () {
  	const styles = getStyleSheet();
    return (
		<View style={{ flexDirection:'column', justifyContent: 'space-around', width:'80%' }}>
        	<AddressSelect {...this.props} addressPlaceholder={CURRENT_ADDRESS_DEFAULT} />
        </View>
    )
  }
}

const mapStateToProps = ({ disclosureReducer, authReducer }) => {
  const { accessCode } = authReducer;
  const { addressSet, addressIdx, addressStart, addresses, addressSelection } = disclosureReducer;
  return { accessCode, addressSet, addressIdx, addressStart, addresses, addressSelection };
};

export default connect(mapStateToProps, { addressOnBlur, addressesFound, addressSelected, addressUnSelected })(CurrentAddressSelect);