import React, { Component } from "react";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Chip } from 'react-native-paper';
import getStyleSheet from '../../styles/styles';
import { incomeSourceSelected } from '../../actions';
import { INC_SRC_SAL, INC_SRC_SELF, INC_SRC_BUS } from '../../constants/entry';
import { INC_SOURCE_BANNER, INC_SRC_SAL_BANNER, INC_SRC_SELF_BANNER, INC_SRC_BUS_BANNER } from '../../constants/banners';

class IncomeSource extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
    		<View>
        		<Text style={styles.textSmallBoldGray} >{INC_SOURCE_BANNER}</Text>
        		<View style={styles.smallSpace}/>
	    		<View style={styles.stackedLayout}>
		    		<Chip selected={this.props.isSalaried} 		onPress={() => this.props.incomeSourceSelected(INC_SRC_SAL)}>{INC_SRC_SAL_BANNER}</Chip>
		    		<Chip selected={this.props.isSelfEmployed} 	onPress={() => this.props.incomeSourceSelected(INC_SRC_SELF)}>{INC_SRC_SELF_BANNER}</Chip>
		    		<Chip selected={this.props.isBusiness} 		onPress={() => this.props.incomeSourceSelected(INC_SRC_BUS)}>{INC_SRC_BUS_BANNER}</Chip>
	    		</View>

    		</View>

        )
    }
}

const mapStateToProps = ({ entryReducer }) => {
  const { isSalaried, isSelfEmployed, isBusiness } = entryReducer;
  return { isSalaried, isSelfEmployed, isBusiness };
};

export default connect(mapStateToProps, { incomeSourceSelected })(IncomeSource);