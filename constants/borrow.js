export const THUMB_COLOR='#00b4f0';
export const MAX_INCOME=500000;
export const MIN_INCOME=50000;
export const INCOME_STEP=10000;
export const MAX_DEPENDANTS=5;
export const MAX_INTEREST_RATE=10;
export const amortizationChartConfig={
	  backgroundColor: "#9f5f80",
	  backgroundGradientFrom: "#00b4f0",
	  backgroundGradientTo: "#20225d",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffffff"
      },

	};
export const borrowingRangeChartConfig={
		      backgroundGradientFrom: "#00b4f0",
		      backgroundGradientTo: "#20225d",
		      decimalPlaces: 0, // optional, defaults to 2dp
		      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		      propsForLabels : {
			    fill:"#ffffff",
			    fontSize:"20",
			    fontWeight:"bold",
			    textAnchor:"middle",
		      },
		      propsForVerticalLabels : {
			    fill:"#ffffff",
			    fontSize:"14",
			    fontWeight:"normal",
			    textAnchor:"middle",
		      },
	    };
export const weeklyInstalmentChartConfig={
		      backgroundColor: "#9f5f80",
		      backgroundGradientFrom: "#00b4f0",
		      backgroundGradientTo: "#20225d",
		      decimalPlaces: 2, // optional, defaults to 2dp
		      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		      propsForLabels : {
			    fill:"#ffffff",
			    fontSize:"20",
			    fontWeight:"bold",
			    textAnchor:"middle",
		      },
		      propsForVerticalLabels : {
			    fill:"#ffffff",
			    fontSize:"14",
			    fontWeight:"normal",
			    textAnchor:"middle",
		      },
	    };
export const interestBarChartConfig={
		      backgroundColor: "#9f5f80",
		      backgroundGradientFrom: "#00b4f0",
		      backgroundGradientTo: "#20225d",
		      decimalPlaces: 0, // optional, defaults to 2dp
		      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		      style: {
		        borderRadius: 0,
		      },
		      propsForLabels : {
			    fill:"#ffffff",
			    fontSize:"14",
			    fontWeight:"bold",
		      },
		      propsForVerticalLabels : {
			    fill:"#ffffff",
			    fontSize:"14",
			    fontWeight:"normal",
			    textAnchor:"middle",
		      },
	    };
export const legends= ["Low", "High"];
export const colourBlueLight=(opacity = 1) => `rgba(0, 179, 240, ${opacity})`;
export const colourBlueDark=(opacity = 1) => `rgba(32, 34, 93, ${opacity})`;