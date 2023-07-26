import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import { Chip, Card, Avatar } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { } from '../../constants/common';
import getStyleSheet from '../../styles/styles';  
import { callNumber, setAgentRecommendation, toggleAgentRecommendation } from '../../actions';
import { RECOMMEND_ME, RECOMMENDED } from '../../constants/banners';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, } from '../../constants/colors';
import {  } from "../../constants/review";


class ApplicationAgentDetails extends Component {
    constructor(props) {
		super(props);
		this.props.fetchAgentRecommendations({...this.props }, this.props.setAgentRecommendation);
	}

    render () {
		const styles = getStyleSheet();
    	return (
		<View style={{flexDirection:'column', alignSelf:"center", width:"98%", }}>
			<View style={styles.space}/>
			<Card style={{elevation:5}}>
				<Card.Title 
					title={this.props.displayApplication.proposal.agent.fullName} 
					titleStyle={styles.textMediumBoldLogoPaleBlue}
					></Card.Title>
				<Card.Content>
					<TouchableOpacity onPress={() => {
						this.props.callNumber(this.props.displayApplication.proposal.agent.contact.primaryPhone)
						}}>
					<View style={styles.clumpedLeft}>
							<Avatar.Icon backgroundColor={"#ffffff"} color={LOGO_BRIGHT_BLUE} 
								icon="phone" size={30} style={{marginRight:5}}
								/>
							<Text style={styles.textMediumSmallLogoDarkBlue}>
								{this.props.displayApplication.proposal.agent.contact.primaryPhone}</Text>
					</View>
					</TouchableOpacity>
					<View style={styles.space}/>
					<View style={styles.clumpedLeft}>
							<Avatar.Icon backgroundColor={"#ffffff"} color={LOGO_BRIGHT_BLUE} 
								icon="email" size={30} style={{marginRight:5}} />
							<Text style={styles.textMediumSmallLogoDarkBlue}>
								{this.props.displayApplication.proposal.agent.contact.primaryEmail}</Text>
					</View>
					<View style={styles.space}/>
					<TouchableOpacity onPress={() => {
								this.props.toggleAgentRecommendation(
									{ ...this.props, recommended: !this.props.recommendedAgent });
							}}>
					<View style={styles.tableRow}>
						<View style={[styles.tableColumn20pct]}>
							<Avatar.Icon icon="creation" size={45} style={{borderWidth:1, borderColor:LOGO_BRIGHT_BLUE}} 
								backgroundColor={this.props.recommendedAgent ? LOGO_BRIGHT_BLUE : "#ffffff"} 
								color={this.props.recommendedAgent ? "#ffffff" : LOGO_BRIGHT_BLUE} 
							/>
						</View>
						<View style={[styles.tableColumn80pct, {justifyContent:"center"}]}>
							<Text style={[styles.textMediumSmallLogoDarkBlue]}>{this.props.recommendedAgent ? 
								RECOMMENDED : RECOMMEND_ME}</Text>
						</View>
					</View>
					</TouchableOpacity>
				</Card.Content>
			</Card>
			<View style={styles.space}/>
			<View style={styles.space}/>
		</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalReducer, proposalCalendarReducer, dealsReducer }) => {
  const { } = proposalReducer;
  const { displayApplication } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  const { selectedPanel, recommendedAgent, fetchAgentRecommendations, recommendation } = dealsReducer;
  return { recommendation, borrower, accessCode, selectedPanel, displayApplication, fetchAgentRecommendations, recommendedAgent };
};

export default connect(mapStateToProps, {  callNumber, setAgentRecommendation, toggleAgentRecommendation })(ApplicationAgentDetails);