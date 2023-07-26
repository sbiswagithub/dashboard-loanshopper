import React, { Component } from "react";
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';
import { Card, Badge } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyleSheet from '../../styles/styles';  
import { } from '../../constants/banners';
import { } from '../../constants/review';
import { AGENT_DTLS_VIEW, LOAN_PKG_DEALS_VIEW } from '../../constants/deals';
import { toggleAgentDetails, toggleLoanPackage, fromApplication, handleFetchError, onClickApplyButton} from '../../actions';
import { LOGO_DARK_BLUE, LOGO_BRIGHT_BLUE } from '../../constants/colors';
import * as RootNavigation from '../../actions/RootNavigation.js';

class ApplicationTiles extends Component {

	constructor(props) {
		super(props);
    }

    render () {
		const styles = getStyleSheet();
    	return (
			<View style={{alignSelf:"center"}}>
				<View style={styles.tableRow}>
					<View style={styles.tableColumn50pct}>
						<Card style={{borderRadius:15, margin:4, borderWidth:0.3, elevation:2}}>
							<Card.Actions style={{alignSelf:"center"}} >
								<Icon.Button name="account-details-outline" 
									size={50} borderRadius={25}
									backgroundColor={"#ffffff"}
									color={LOGO_DARK_BLUE}
									style={{alignSelf:"center"}}
									onPress={() => {
										this.props.fromApplication();
										this.props.onClickApplyButton();
									}}
									/>
							</Card.Actions>
						</Card>
					</View>
					<View style={styles.tableColumn50pct}>
						<Card style={{borderRadius:15, margin:4, borderWidth:0.3, elevation:2 }}>
							<Card.Actions style={{alignSelf:"center"}} >
								<Icon.Button name="bank-outline" 
									size={50} borderRadius={25}
									backgroundColor={"#ffffff"}
									color={this.props.applicationView == LOAN_PKG_DEALS_VIEW ? LOGO_BRIGHT_BLUE :LOGO_DARK_BLUE}
									style={{alignSelf:"center"}}
									onPress={() => {
										this.props.toggleLoanPackage();
									}}
									/>
							</Card.Actions>
						</Card>
					</View>
				</View>
	    		<View style={styles.space}/>
				<View style={styles.tableRow}>
					<View style={styles.tableColumn50pct}>
						<Card style={{borderRadius:15, margin:4, borderWidth:0.3, elevation:2}}>
							<Card.Actions style={{alignSelf:"center"}}  >
								<Icon.Button name={this.props.hasNew ? "comment-eye-outline"  : "comment-multiple-outline" }
									size={50} borderRadius={25}
									backgroundColor={"#ffffff"}
									color={this.props.hasNew ? LOGO_BRIGHT_BLUE : LOGO_DARK_BLUE}
									style={{alignSelf:"center"}}
									onPress={() => {
										RootNavigation.navigate('Messages');
									}}
									/>
							</Card.Actions>
						</Card>
					</View>
					<View style={styles.tableColumn50pct}>
						<Card style={{borderRadius:15, margin:4, borderWidth:0.3, elevation:2}}>
							<Card.Actions style={{alignSelf:"center"}} >
								<Icon.Button name="account-tie-voice-outline" 
									size={50} borderRadius={25}
									backgroundColor={"#ffffff"}
									color={this.props.applicationView == AGENT_DTLS_VIEW ? LOGO_BRIGHT_BLUE : LOGO_DARK_BLUE}
									style={{alignSelf:"center"}}
									onPress={() => {
										this.props.toggleAgentDetails();
									}}
									/>
							</Card.Actions>
						</Card>
					</View>
				</View>
			</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer, entryReducer, dealsReducer }) => {
  const {  } = proposalReducer;
  const { } = entryReducer;
  const { applicationView } = dealsReducer;
  const {  } = proposalCalendarReducer;
  const { accessCode } = authReducer;
  return { accessCode, applicationView };
};

export default connect(mapStateToProps, { toggleAgentDetails, toggleLoanPackage, fromApplication, onClickApplyButton, handleFetchError, })(ApplicationTiles);