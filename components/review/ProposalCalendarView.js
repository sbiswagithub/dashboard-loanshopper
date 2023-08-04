import React, { Component } from "react";
import { Text, View, FlatList } from 'react-native';
import { List, Card, Portal, Dialog, Button, Avatar } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyleSheet from '../../styles/styles';  
import { closeReview, loadProposals, setFilterMode } from '../../actions';
import ProposalCalendarHeader from './ProposalCalendarHeader';
import ProposalListView from './ProposalListView';
import ProposalFilterButton from './ProposalFilterButton';

import { QUARTERLY_VIEW, WEEKLY_VIEW, FILTER_NONE, FILTER_DATE, FILTER_LIKED } from '../../constants/review';
import { SHOWING_LIKED_BANNER, NO_LOANS_TO_DISPLAY, NO_LOANS_AT_ALL, DATES_BUTTON, SHOW_ALL_BUTTON, FILTERS_BANNER, LIKED_BUTTON, SHOWING_ALL_BANNER, SHOWING_PROPOSALS_BANNER, SHOWING_PROPOSALS_FOR_DATE_BANNER } from '../../constants/banners';
import { WHITE } from '../../constants/colors';

const renderProposal = ({ item }) => {
	const styles = getStyleSheet();
	const id = item == null ? -1 : item._id;
    return (
      <View key={id} >
		<ProposalListView proposalId={id}/>
      </View>
    );
  };

class ProposalCalendarView extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchProposals({ ...this.props, qParams: this.props.getQParams(QUARTERLY_VIEW), liked: this.props.filter == FILTER_LIKED ? true : undefined  },this.props.loadProposals); 		
	}

    render () {
    	const styles = getStyleSheet();
    	return (
	    		<View style={{alignSelf:"flex-start", width:'100%', height:'85%' }}>
					<Card style={{elevation:10, borderRadius:20, borderWidth:1, borderColor:WHITE}}>
						<Card.Title title={FILTERS_BANNER} titleStyle={styles.textMediumBoldGray} />
						<Card.Content>
							<View style={[styles.chipsLayout]}>
								<ProposalFilterButton label={SHOW_ALL_BUTTON} iconName="filter-remove" active={this.props.filter == FILTER_NONE} mode={FILTER_NONE} />
								<ProposalFilterButton label={DATES_BUTTON} iconName="calendar" active={this.props.filter == FILTER_DATE} mode={FILTER_DATE} />
								<ProposalFilterButton label={LIKED_BUTTON} iconName="thumb-up" active={this.props.filter == FILTER_LIKED} mode={FILTER_LIKED} />
							</View>
						</Card.Content>
					</Card>
					<View style={styles.space} />
					{
						this.props.filter == FILTER_DATE ?  <ProposalCalendarHeader />  : null
					}
					<View style={styles.space} />

					{
						this.props?.proposalsInView?.length === 0 ? null : 
							this.props.reviewPeriod == WEEKLY_VIEW ? <Text style={styles.textMediumBoldGray}>{SHOWING_PROPOSALS_FOR_DATE_BANNER  }</Text> : 
							this.props.filter == FILTER_LIKED ? <Text style={styles.textMediumBoldGray}>{SHOWING_LIKED_BANNER}</Text> :
							this.props.filter == FILTER_NONE ? <Text style={styles.textMediumBoldGray}>{SHOWING_ALL_BANNER}</Text> :
							null  
						}
					<View style={styles.space} />

					{ this.props.proposalsInView == null || this.props.proposalsInView.length == 0 ? 
					<Text style={styles.largeGrayButtonText}>{this.props.reviewPeriod == QUARTERLY_VIEW ? NO_LOANS_AT_ALL : NO_LOANS_TO_DISPLAY}</Text>
					:
					<FlatList
						style={{alignSelf:"flex-start", maxWidth:'30%'}}
						data={this.props.proposalsInView}
						renderItem={renderProposal}
						keyExtractor={(item) => item._id}
						keyboardShouldPersistTaps='handled' 
						showsVerticalScrollIndicator={false} 
						horizontal={false}
					/>}
				</View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer }) => {
  const { updatedProposal } = proposalReducer;
  const { reviewPeriod, proposalsInView, updated, fetchProposals, getQParams, filter, } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { updatedProposal, reviewPeriod, proposalsInView, updated, accessCode, borrower, filter, fetchProposals, getQParams, };
};

export default connect(mapStateToProps, { closeReview, loadProposals, setFilterMode })(ProposalCalendarView);