import React, { Component } from "react";
import { Text, View, Image, Button, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import getStyleSheet from '../../styles/styles';  
import { updateDealInFocus, quickApply } from '../../actions';
import { REPAY_FASTER,LOWER_INST,REDRAW,LOWEST_RATES } from '../../actions/types';
import { QAPPLY_BANNER_1 } from '../../constants/banners';

function DealCard({ viewMode, product, rate, repayment, loanTerm, loanFixedPeriod, quickApply }) {
  const navigation = useNavigation();
  const styles = getStyleSheet();

  return (
		<View style={styles.cardContent}>
			<Text style={styles.textMediumPurple}>{product}</Text>
			<Text 
				style={viewMode === LOWEST_RATES ? styles.textXLargeBoldGray : styles.textSmallBoldGray}>
				{rate}%</Text>
			<Text 
				style={viewMode === LOWER_INST ? styles.textLargeBoldGray : styles.textSmallBoldGray}>
				${repayment} per month</Text>
			<Text 
				style={viewMode === REPAY_FASTER ? styles.textXLargeBoldGray : styles.textSmallBoldGray}>
				{loanTerm} years</Text>
			<Text 
				style={viewMode === REDRAW ? styles.textLargeBoldGray : styles.textSmallBoldGray}>
				Fixed Term {loanFixedPeriod} months</Text>
			<Button
	          title={QAPPLY_BANNER_1}
	          onPress={() => { quickApply(); navigation.navigate('Application'); }}
	        />
		</View>
  );
}

class FeaturedBroker extends Component {
    constructor(props) {
        super(props);
    }

    _renderItem({item,index}){
    	const styles = getStyleSheet();
        return (
			<Card containerStyle={styles.brokerCard} 
				title={this.props.brokerDeals[index].title} titleStyle={styles.cardTitle} >
    	    	<View style={styles.brokerCardPanel}>
    	    		{this.props.dealInFocus === index ? 
	    				<DealCard 
	    					viewMode={this.props.userPreference} 
    	    				quickApply={this.props.quickApply} 
    	    				rate={this.props.brokerDeals[index].rate} 
    	    				repayment={this.props.brokerDeals[index].repayment}
    	    				loanTerm={this.props.brokerDeals[index].loanTerm} 
    	    				loanFixedPeriod={this.props.brokerDeals[index].loanFixedPeriod}
    	    				product={this.props.brokerDeals[index].product} /> 
	    						: null}
    			</View>
			</Card>
    	    );
    }

    render () {
    	const styles = getStyleSheet();
    	this.props.updateDealInFocus(this.props.dealInFocus)
    	return (
    		<View style={styles.overlayPanelColumn}>
				<Carousel
					layout={'stack'}
                    data={this.props.brokerDeals}
                    sliderWidth={350}
                    itemWidth={300}
                    renderItem={(selection) => this._renderItem(selection)}
					onSnapToItem={ index => this.props.updateDealInFocus(index) }  />
		    </View>    			
        )
    }
}

const mapStateToProps = ({ homeReducer }) => {
  const { dealInFocus, brokerDeals, userPreference } = homeReducer;
  return { dealInFocus, brokerDeals, userPreference };
};

export default connect(mapStateToProps, { updateDealInFocus, quickApply })(FeaturedBroker);