import React, { Component } from "react";
import { Text, View, } from 'react-native';
import { Card, Avatar, } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';

import { DMY } from '../../constants/common';
import getStyleSheet from '../../styles/styles';  
import { showApplication } from '../../actions';
import { INTEREST_RATE, PRESENTED_BY, } from '../../constants/banners';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE } from '../../constants/colors';
  
class ApplicationCard extends Component {
    constructor(props) {
		super(props);
	}

    render () {
    	const styles = getStyleSheet();
		const id = this.props.item == null ? -1 : this.props.item._id;
    	return (
		<View key={id} style={{width:350, border:0.4, paddingRight:5}}>
			<Card 
				style={{width:"85%", elevation: 4, borderWidth:0.3, borderColor:{LOGO_DARK_BLUE}, backgroundColor:{LOGO_BRIGHT_BLUE} }}>
				<Card.Title title={this.props.item.applicationLoanPackage.productName} 
					titleNumberOfLines={2} titleStyle={[styles.textSmallBoldLogoPaleBlue, {width:225}]} 
					left={(props) => 
						<Avatar.Image size={24} 
							source={require('../../assets/anz.png')} 
							style={{alignSelf:"flex-start", left:-5}}  />}
					/>
				<View style={styles.hr} />
				<View style={styles.space} />
				<Card.Content>
					<View style={styles.tableRow}>
						<View style={styles.tableColumn50pct}>
							<Text style={styles.textSmallLogoDarkBlue}>{INTEREST_RATE}</Text>
						</View>
						<View style={styles.tableColumn50pct}>
							<Text style={styles.textSmallBoldLogoPaleBlue}>{this.props.item.applicationLoanPackage.ratesAndFees.interestRatePI} %</Text>
						</View>
					</View>
					<View style={styles.space} />
					<View style={styles.tableRow}>
						<View style={styles.tableColumn50pct}>
							<Text style={styles.textSmallLogoDarkBlue}>{PRESENTED_BY}</Text>
						</View>
						<View style={styles.tableColumn50pct}>
							<Text style={styles.textSmallBoldLogoPaleBlue}>{this.props.item.proposal.agent.fullName}</Text>
						</View>
					</View>
					<View style={styles.space} />
					<View style={styles.tableRow}>
						<View style={[styles.tableColumn100pct, {alignItems:"flex-end"}]}>
							<Icon.Button name="stretch-to-page-outline" 
								size={20} borderRadius={25}
								backgroundColor={"#ffffff"}
								color={LOGO_DARK_BLUE}
								iconStyle={{margin:8}} 
								onPress={() => this.props.showApplication(this.props.item)} />
						</View>
					</View>
				</Card.Content>
			</Card>
		</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer }) => {
  const { } = proposalCalendarReducer;
  const { accessCode } = authReducer;
  const { } = proposalReducer;
  return { accessCode, };
};

export default connect(mapStateToProps, { showApplication })(ApplicationCard);