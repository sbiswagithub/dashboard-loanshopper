import React, { Component, useState } from "react";
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Chip,  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import getStyleSheet from '../../styles/styles';  
import { addCreditCard, removeCreditCard, currencyToNumber } from '../../actions';
import {  } from '../../constants/disclosure';
import { } from '../../constants/common';
import { ZERO_DOLLAR_BANNER } from "../../constants/banners";
import { LOGO_BRIGHT_BLUE } from "../../constants/colors";

function CreditCardCart(props) {
	const styles = getStyleSheet();
	const [amount, setAmount] = useState(0)
  return (
    <>
	<View style={styles.tableRow}>
		<View style={styles.tableColumn150}>
			<View style={{ flex:1, flexDirection:"column", justifyContent: 'space-evenly', alignItems: 'stretch' }}>
				<Chip style={styles.chipNormal} 
					icon={() => ( <Icon name="credit-card-plus" size={25} color="white" /> )} 
					textStyle={styles.textSmallBoldWhite} 
					style={amount > 0 ? styles.chipNormal : null} 
					selected={false}
					disabled={amount <= 0} 
					onPressIn={() => {props.onChange(props.cardIssuer, amount)
					setAmount(0)}}>{props.cardIssuer}</Chip>
				<View style={styles.space} />
			</View>
		</View>

		<View style={styles.tableColumn100}>    		
			<TextInput style={[styles.whiteBgCentredTextInput, styles.disclTextEntry100]} 
						clearTextOnFocus={true} keyboardType = 'number-pad'  
						onFocus={() => setAmount(0)}
						value={'$' + amount}
						onChangeText={text => setAmount(currencyToNumber(text))}
						placeholder={ZERO_DOLLAR_BANNER} />
			<View style={styles.space}/>
		</View>
	</View>
    </>
  );
}
class CreditCards extends Component {

	constructor(props) {
        super(props);
	}

    render () {
		const styles = getStyleSheet();
		console.log(this.props)
    	return (
    		<View style={styles.stackedSimpleLayout}>
				<View style={[styles.tableRow]}>
					<View style={styles.tableColumn150}>
						<Text style={[styles.textMediumGray]}>{'Credit cards'}</Text>
					</View>
					<View style={styles.tableColumn100}>
						<Text style={[styles.textSmallBoldGray]}>{this.props.creditCards == 0 ? null :
							'$' + this.props.creditCards.toLocaleString(undefined, {maximumFractionDigits:0})}</Text>
					</View>
				</View>
				<View style={styles.space}/>
				<View style={[ { flexDirection:"column"}, this.props.creditCardList.length == 0 ? {} :
					{margin:'1%', padding:'1%', borderWidth:1, borderColor: LOGO_BRIGHT_BLUE, borderRadius:5}]}>
				{this.props.creditCardList.map(card => {
					return (
						<View key={card.id}>
							<View style={[styles.tableRow, {alignItems:"center"}]}>
								<View style={[styles.tableColumn150, {flexDirection:"row", alignItems:"center"}]}>
									{this.props?.readMode && this.props.readMode == true ? null : 
									<Icon name="delete" size={25} color={LOGO_BRIGHT_BLUE} onPress={() => {this.props.removeCreditCard(card.id)}} />}
									<Text style={[styles.textMediumBoldLogoDarkBlue, {alignSelf:"flex-start"}]}>{card.cardIssuer}</Text>
								</View>
								<View style={styles.tableColumn100}>
									<Text style={[styles.textSmallBoldLogoDarkBlue]}>{'$' + card.cardLimit.toLocaleString(undefined, {maximumFractionDigits:0})}</Text>
								</View>
							</View>
							<View style={styles.space}/>
						</View>
						)				
					})}
				</View>
				{this.props?.readMode && this.props.readMode == true  ? null : 
				<View style={styles.stackedSimpleLayout}>
					<CreditCardCart cardIssuer={'Mastercard'} onChange={this.props.addCreditCard} />
					<CreditCardCart cardIssuer={'VISA'} onChange={this.props.addCreditCard} />
					<CreditCardCart cardIssuer={'AMEX'} onChange={this.props.addCreditCard} />
					<CreditCardCart cardIssuer={'Other card'} onChange={this.props.addCreditCard} />
				</View>}
			</View>
        )
    }
}

const mapStateToProps = ({ disclosureReducer }) => {
  const { creditCardList, creditCards } = disclosureReducer;
  return { creditCardList, creditCards };
};

export default connect(mapStateToProps, { addCreditCard, removeCreditCard })(CreditCards);