import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';

import getStyleSheet from '../../styles/styles';  
import { ATLEAST_TWO_BANNER } from '../../constants/banners';
import CompareProposalTile from './CompareProposalTile';
import {  } from '../../actions';
import {L,R} from '../../constants/common';

const renderItems = ({ item }) => {
	const styles = getStyleSheet();
	const id = item == null ? -1 : item._id;
    return (
      <View key={id}>
      	<View style={styles.space}/>
		<CompareProposalTile proposal={item} />
      </View>
    );
  };

class CompareProposalScroller extends Component {

	constructor(props) {
        super(props);
    }

    render () {
    	const styles = getStyleSheet();

		const proposalsL = this.props.proposalsInView
			.map((proposal) => { return { ...proposal, side : L } })
			.filter((element) => { return element.compareRSelected === false ; })
			;
		const proposalsR = this.props.proposalsInView
			.map((proposal) => { return { ...proposal, side : R } })
			.filter((element) => { return element.compareLSelected === false ; })
			;

		return (
    		this.props.proposalsInView?.length == null || this.props.proposalsInView?.length < 2 ?
    		null
    		:
    		<LinearGradient
		        colors={['#ffffff', '#a2a59c','#e5e5e5']}
		        style={{borderRadius: 20,padding: 5}}>
	    		<View style={[styles.chipsLayout]}>
	    		<FlatList
			        data={proposalsL}
			        renderItem={renderItems}
			        keyExtractor={(item) => item._id}
					keyboardShouldPersistTaps='handled' 
					showsVerticalScrollIndicator={false} 
					style={styles.compareScrollPanel}
			      />
	    		<FlatList
			        data={proposalsR}
			        renderItem={renderItems}
			        keyExtractor={(item) => item._id}
					keyboardShouldPersistTaps='handled' 
					showsVerticalScrollIndicator={false} 
			      />
			      
	    		</View>
	        </LinearGradient>
        );
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer }) => {
  const { reviewPeriod, proposalsInView, proposalsR, proposalsL } = proposalCalendarReducer;
  const { accessCode, borrower } = authReducer;
  return { reviewPeriod, proposalsInView, proposalsR, proposalsL, accessCode, borrower };
};

export default connect(mapStateToProps, {  })(CompareProposalScroller);