import React, { Component } from "react";
import { Text, View, ScrollView, FlatList, TouchableOpacity, } from 'react-native';
import { Card, Avatar, } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';

import { DMY } from '../../constants/common';
import getStyleSheet from '../../styles/styles';  
import { loadApplications, showApplication } from '../../actions';
import { INTEREST_RATE, DEAL_CLOSED_HELPER_TEXT, DEAL_COND_APPR_HELPER_TEXT, DEAL_LODGEMENT_HELPER_TEXT, DEAL_UNDER_ASSESSMENT_HELPER_TEXT, VIEW_DEALS_BANNER, APPLICATION_SUBMISSION, CLOSED_DEALS_BANNER, UNDER_ASSESSMENT_BANNER, CONDITIONALLY_APPROVED_BANNER, PRESENTED_BY, NO_APPLICATIONS, } from '../../constants/banners';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE } from '../../constants/colors';
import ApplicationCard from './ApplicationCard';

const renderApplication = ({ item, index }) => {
	const styles = getStyleSheet();
    return (
		<ApplicationCard item={item} />
	);
}
const renderScrollApplications = ({ item, index }) => {
	const styles = getStyleSheet();
	const id = item == null ? -1 : item._id;
    return (
	<View>
		{index == 0 ? 
			<View style={[styles.chipsLayout]}>
				<Avatar.Icon size={40} icon="chevron-triple-left" color={"#ffffff"} style={{alignSelf:'center', marginRight:5,  backgroundColor:LOGO_BRIGHT_BLUE}}/>
				{renderApplication({item, index})}
			</View>	:
			<View>{renderApplication({item, index})}</View>
		}
	</View>
	);
}

const renderDealCard = (props) => {
	const styles = getStyleSheet();
    return (
		<View>
			<Card style={{elevation: 4, width:"95%", alignSelf:"center", borderWidth:0.4, borderColor:{LOGO_DARK_BLUE} }}>
				<Icon.Button name={props.icon} size={40} borderRadius={5}
						backgroundColor={LOGO_BRIGHT_BLUE} 
						color={LOGO_DARK_BLUE} 
						iconStyle={{margin:3,alignContent:'center'}} />
				<Card.Title title={props.title} subtitle={props.subTitle} subtitleNumberOfLines={props.large ? 4 : 1} 
					titleStyle={styles.textMediumBoldLogoDarkBlue} subtitleStyle={[styles.textSmallGray, {marginRight:3}]} />
				<View style={styles.space} />
				<Card.Content>
					{props.filteredApplications == null || props.filteredApplications.length == 0 ?
					<Text style={styles.textSmallBoldGray}>{NO_APPLICATIONS}</Text> :
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  >
						<FlatList 
							horizontal={true}
							renderItem={renderScrollApplications}
							data={props.filteredApplications}
							keyExtractor={(item) => item._id}
							keyboardShouldPersistTaps='handled' />
					</ScrollView>
					}
				</Card.Content> 
			</Card>
		</View>
    );
};
  
class DealsByStatus extends Component {
    constructor(props) {
		super(props);
		this.props.fetchApplications(this.props, 
			(applications) => {
				this.props.loadApplications(applications);
			},
			this.props.handleFetchError
			);		
	}

    render () {
    	const styles = getStyleSheet();
    	return (
		<View style={{ height:"100%" }}>
			<View style={styles.space} />
			<ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' >
				{renderDealCard({...this.props, title:APPLICATION_SUBMISSION, subTitle:DEAL_LODGEMENT_HELPER_TEXT, large:true, icon:"ballot", filteredApplications: this.props.lodgementApplications})}
				<View style={styles.space} />
				{renderDealCard({...this.props,title:UNDER_ASSESSMENT_BANNER, subTitle:DEAL_UNDER_ASSESSMENT_HELPER_TEXT, large:true, icon:"owl", filteredApplications: this.props.underAssessmentApplications})}
				<View style={styles.space} />
				{renderDealCard({...this.props,title:CONDITIONALLY_APPROVED_BANNER, subTitle:DEAL_COND_APPR_HELPER_TEXT, large:true, icon:"stamper", filteredApplications: this.props.conditionallyApprovedApplications})}
				<View style={styles.space} />
				{renderDealCard({...this.props,title:CLOSED_DEALS_BANNER, subTitle:DEAL_CLOSED_HELPER_TEXT, large:false, icon:"briefcase-remove", filteredApplications: this.props.closedOrExpiredApplications})}
				<View style={styles.space} />
			</ScrollView>
		</View>
        )
    }
}

const mapStateToProps = ({ authReducer, dealsReducer, documentsReducer, proposalCalendarReducer, proposalReducer }) => {
  const { closedOrExpiredApplications, conditionallyApprovedApplications, underAssessmentApplications, lodgementApplications } = proposalCalendarReducer;
  const { accessCode } = authReducer;
  const { fetchApplications } = proposalReducer;
  return { closedOrExpiredApplications, conditionallyApprovedApplications, underAssessmentApplications, fetchApplications, lodgementApplications, accessCode, };
};

export default connect(mapStateToProps, { loadApplications, showApplication })(DealsByStatus);