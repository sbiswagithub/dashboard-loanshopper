import React, { Component } from "react";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Chip } from 'react-native-paper';
import getStyleSheet from '../../styles/styles';
import { incomeRangeSelected } from '../../actions';
import { INC_RANGE_1, INC_RANGE_2, INC_RANGE_3, INC_RANGE_4 } from '../../constants/entry';
import { INC_RANGE_BANNER, INC_RANGE_1_BANNER, INC_RANGE_2_BANNER, INC_RANGE_3_BANNER, INC_RANGE_4_BANNER } from '../../constants/banners';

class IncomeRange extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
    		<View>
        		<Text style={styles.textSmallBoldGray} >{INC_RANGE_BANNER}</Text>
        		<View style={styles.smallSpace}/>
        		<View style={styles.stackedLayout}>
		    		<Chip selected={this.props.isIncomeRange1} onPress={() => this.props.incomeRangeSelected(INC_RANGE_1)}>{INC_RANGE_1_BANNER}</Chip>
		    		<Chip selected={this.props.isIncomeRange2} onPress={() => this.props.incomeRangeSelected(INC_RANGE_2)}>{INC_RANGE_2_BANNER}</Chip>
		    		<Chip selected={this.props.isIncomeRange3} onPress={() => this.props.incomeRangeSelected(INC_RANGE_3)}>{INC_RANGE_3_BANNER}</Chip>
		    		<Chip selected={this.props.isIncomeRange4} onPress={() => this.props.incomeRangeSelected(INC_RANGE_4)}>{INC_RANGE_4_BANNER}</Chip>
	    		</View>
    		</View>
        )
    }
}

const mapStateToProps = ({ entryReducer }) => {
  const { isIncomeRange1, isIncomeRange2, isIncomeRange3, isIncomeRange4 } = entryReducer;
  return { isIncomeRange1, isIncomeRange2, isIncomeRange3, isIncomeRange4 };
};

export default connect(mapStateToProps, { incomeRangeSelected })(IncomeRange);