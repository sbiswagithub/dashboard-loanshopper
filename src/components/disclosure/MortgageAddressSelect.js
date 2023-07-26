import React, { Component, useState } from 'react';
import { View, Text, } from 'react-native';
import { Chip } from 'react-native-paper';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { mortgageAddressOnBlur, mortgageAddressesFound, mortgageAddressSelected, mortgageAddressUnSelected, mortgageAddressRemoved } from '../../actions';
import { AddressSelect } from './AddressComponentFunctions';
import { MORTGAGE_ADDRESSES, START_WITH_RES, SELECT_MORTGAGE_ADDR } from '../../constants/banners';

function DeleteFromList(props)  {
  const list = [];
	const styles = getStyleSheet();
	for (const [index, item] of props.items.entries()) {
		list.push(
        <Chip icon="delete" style={[styles.chipNormal, {marginTop:"1%", marginBottom:"1%"}]} textStyle={styles.textSmallBoldWhite} 
          onPress={() => {props.onRemoveItem(item)}}>{item?.fullAddress}</Chip>
		)
	}
    return (
      <View style={{maxWidth:"95%", alignContent:"center"}}>
      {list}
      </View>
    );
  
}

function AddressSelectCart(props) {
	const styles = getStyleSheet();
	const [showCart, setShowCart] = useState(true)
  return (
    <>
      { showCart ? 
      <Chip icon="cart" style={[styles.chipNormal, {marginTop:"1%", marginBottom:"1%"}]} textStyle={styles.textSmallBoldWhite} 
        onPress={() => {
          setShowCart(false)
          props.addressUnSelected()
        }}>{'+'}</Chip> :
       <AddressSelect {...props} 
          addressOnBlur={() => {
            setShowCart(true)
            props.addressOnBlur()
          }} />
        }

    </>
  );
}

class MortgageAddressSelect extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const styles = getStyleSheet();
    ////console.log(this.props)
    return (
		<View style={{ flexDirection:'column', justifyContent: 'space-around', flex:1, flexGrow:1 }}>
      <Text style={[styles.textSmallBoldGray, {alignSelf:'center'}]}>{MORTGAGE_ADDRESSES}</Text>
      <View style={styles.space}/>

      {this.props.isBothResidentialAndInvestment ? 
      <Text style={[styles.textSmallLogoDarkBlue, {alignSelf:'center'}]}>{START_WITH_RES}</Text> : null }
      <View style={styles.space}/>

			<View style={styles.disclosureBoxRow}>
        <AddressSelectCart 
          accessCode={this.props.accessCode}
          addressSet={this.props.mortgageAddressSet}
          addressIdx={this.props.mortgageAddressIdx}
          addressStart={this.props.mortgageAddressStart} 
          addresses={this.props.mortgageAddresses}
          addressSelection={this.props.mortgageAddressSelection}

          addressPlaceholder={SELECT_MORTGAGE_ADDR}

          addressesFound={this.props.mortgageAddressesFound}
          addressSelected={this.props.mortgageAddressSelected} 
          addressUnSelected={this.props.mortgageAddressUnSelected} 
          addressOnBlur={this.props.mortgageAddressOnBlur} />
      </View>
      <View style={styles.space}/>

      {this.props?.mortgageAddressesList && this.props.mortgageAddressesList.length > 0 ? 
			<View style={styles.disclosureBoxRow}>
        <DeleteFromList items={this.props.mortgageAddressesList} onRemoveItem={this.props.mortgageAddressRemoved} />
      </View>: null }
      <View style={styles.space}/>

    </View>
    )
  }
}

const mapStateToProps = ({ disclosureReducer, authReducer }) => {
  const { accessCode } = authReducer;
  return { accessCode, ...disclosureReducer };
};

export default connect(mapStateToProps, { mortgageAddressOnBlur, mortgageAddressesFound, mortgageAddressSelected, mortgageAddressUnSelected, mortgageAddressRemoved })(MortgageAddressSelect);