import React, { Component } from "react";
import { Dimensions, View, } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { connect } from 'react-redux';
import Constants from 'expo-constants';

import getStyleSheet from '../../styles/styles';  
import { amortizationChartConfig, legends, colourBlueLight, colourBlueDark } from '../../constants/borrow';
import { showIndexData } from '../../actions';
import {  } from '../../constants/banners';


class AmortizationChart extends Component {
    constructor(props) {
	    super(props);
	}

    render () {
		const styles = getStyleSheet();
		//console.log(this.props)
		const selectedDataPoint = this.props.indexData;
		const lowBalances = this.props.lowReducingBalances;
		const highBalances = this.props.highReducingBalances;
    	return (
		<View>
			<LineChart
				horizontalLabelRotation={-45}
				verticalLabelRotation={45}
				onDataPointClick={this.props.showIndexData}
				getDotColor={(dataPoint, dataPointIndex) => {
						return selectedDataPoint!= null && selectedDataPoint.value === dataPoint ? "#ffffff" : 
							lowBalances.includes(dataPoint) ? "#00b4f0" : "#20225d"
				}}
				data={{
					legend: legends,
							labels: this.props.milestoneYears,
						datasets: [
						{
							data: this.props.lowReducingBalances,
							color: colourBlueLight 
						},
						{
							data: this.props.highReducingBalances,
							color: colourBlueDark
						},
						]
					}}
				width={Dimensions.get("window").width*(Constants.platform.web ? 0.5:0.75)} 
				height={300}
				yAxisLabel="$"
				yAxisSuffix="k"
				yAxisInterval={1} // optional, defaults to 1
				chartConfig={amortizationChartConfig}
				bezier
				style={{
				      marginVertical: 8,
				      borderRadius: 10
				    }}
				/>
			</View>
        )
    }
}

const mapStateToProps = ({ borrowReducer }) => {
  const { milestoneYears, lowReducingBalances, highReducingBalances, indexData } = borrowReducer;
  return { milestoneYears, lowReducingBalances, highReducingBalances, indexData };
};

export default connect(mapStateToProps, { showIndexData })(AmortizationChart);