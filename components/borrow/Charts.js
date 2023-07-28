import React, { useRef , Component } from "react";
import {  Dimensions, Text, View,ScrollView } from 'react-native';
import { Overlay } from 'react-native-elements';
import { LineChart, StackedBarChart } from "react-native-chart-kit";
import { connect } from 'react-redux';
import Constants from 'expo-constants';

import getStyleSheet from '../../styles/styles';  
import { borrowingRangeChartConfig, weeklyInstalmentChartConfig, interestBarChartConfig, legends } from '../../constants/borrow';
import { numberToCurrency, showIndexData } from '../../actions';
import { AT, EST_REM_BAL, BORROWING_RANGE, EST_WEEKLY_INSTALMENT, INTEREST_AND_PRINCIPAL, AMORTIZATION } from '../../constants/banners';
import AmortizationChart from './AmortizationChart';

function AmortizationToolTip(indexData, milestoneYears) {
    const styles = getStyleSheet();
	
	
	return (
	  <View>
		{ indexData === null ? null :
		  <View>
			   	<Text style={styles.textSmallBoldWhite}>{EST_REM_BAL}</Text>
			   	<Text style={styles.textMediumBoldWhite}>{numberToCurrency(indexData.dataPoint.value)}</Text>
			   	<Text style={styles.textSmallBoldWhite}>{AT}</Text>
			   	<Text style={styles.textMediumBoldWhite}>{indexData.milestoneYears[indexData.dataPoint.index]}</Text>
		   </View>
	   }
	   </View>
	);
}

class Charts extends Component {
    constructor(props) {
	    super(props);
	    
	}

	

    render () {
    	const styles = getStyleSheet();

    	return (
			<View style={{flexDirection:'column', margin:'1%'}}>
				<Text style={[styles.textSmallBoldGray]}>{BORROWING_RANGE}</Text>
	            <StackedBarChart
  					style={styles.stackedBarChart}
					data={{
						  labels: legends,
						  data: this.props.borrowingEstimatesData,
						  barColors: [this.props.colorDarkBlue]
						}}
				      width={Dimensions.get("window").width * (Constants.platform.web ? 0.5 : 0.75)} // from react-native
					  height={200}
					  withHorizontalLabels={false}
					  chartConfig={borrowingRangeChartConfig}
				/>    		
				<Text style={[styles.textSmallBoldGray]}>{EST_WEEKLY_INSTALMENT}</Text>
				<StackedBarChart
  					style={styles.stackedBarChart}
					data={{
						  labels: legends,
						  data: this.props.weeklyInstalmentsData,
						  barColors: [this.props.colorPaleBlue]
						}}
				      width={Dimensions.get("window").width * (Constants.platform.web ? 0.5 : 0.75)} // from react-native
					  height={200}
					  withHorizontalLabels={false}
					  chartConfig={borrowingRangeChartConfig}
				/> 		
				<Text style={[styles.textSmallBoldGray]}>{INTEREST_AND_PRINCIPAL}</Text>
	            <StackedBarChart
  					style={styles.stackedBarChart}
					data={{
						  labels: legends,
						  legend: ["Principal", "Interest"],
						  data: this.props.interestAndPrincipal,
						  barColors: ["#00b4f0","#20225d"]
						}}
				      width={Dimensions.get("window").width * (Constants.platform.web ? 0.5 : 0.75)} 
					  height={275}
					  withHorizontalLabels={false}
					  chartConfig={interestBarChartConfig}
				/>    		
				<Text style={[styles.textSmallBoldGray]}>{AMORTIZATION}</Text>
 				<AmortizationChart />	
				<Overlay overlayStyle={styles.overlayOceanBlue} fullScreen={false} isVisible={this.props.indexData != null} onBackdropPress={() => {this.props.showIndexData(null)}}>
 				  <View style={{width:275}}>
 				  <AmortizationChart />	
				  <AmortizationToolTip dataPoint={this.props.indexData} milestoneYears={this.props.milestoneYears} />	    
			      </View>
			    </Overlay>
			</View>
			
        )
    }
}

const mapStateToProps = ({ borrowReducer }) => {
  const { borrowingEstimates, milestoneYears, lowReducingBalances, highReducingBalances, interestAndPrincipal, borrowingEstimatesData, weeklyInstalmentsData, colorDarkBlue, colorPaleBlue, indexData } = borrowReducer;
  return { borrowingEstimates, milestoneYears, lowReducingBalances, highReducingBalances, interestAndPrincipal, borrowingEstimatesData, weeklyInstalmentsData, colorDarkBlue, colorPaleBlue, indexData };
};

export default connect(mapStateToProps, { showIndexData })(Charts);