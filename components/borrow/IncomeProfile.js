import React, { Component } from "react";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Chip } from 'react-native-paper';
import getStyleSheet from '../../styles/styles';
import { incomeProfileSelected } from '../../actions';
import { SINGLE_INC, JOINT_INC } from '../../constants/entry';
import { SINGLE_INC_BANNER, JOINT_INC_BANNER,INC_PROFILE_BANNER } from '../../constants/banners';


class IncomeProfile extends Component {

	constructor(props) {
        super(props);
	}

    render () {
    	const styles = getStyleSheet();
    	return (
        		<View style={{ flex: 0.9, flexDirection:'column'}}>
        		<Text style={styles.textSmallBoldGray} >{INC_PROFILE_BANNER}</Text>
        		<View style={styles.smallSpace}/>
	    		<View style={styles.chipsLayout}>
	    		<Chip selected={this.props.isSingle} onPress={() => this.props.incomeProfileSelected(SINGLE_INC)}>{SINGLE_INC_BANNER}</Chip>
	    		<Chip selected={this.props.isJoint} onPress={() => this.props.incomeProfileSelected(JOINT_INC)}>{JOINT_INC_BANNER}</Chip>
	    		</View>

        		</View>
    			
        )
    }
}

const mapStateToProps = ({ entryReducer }) => {
  const { isSingle, isJoint } = entryReducer;
  return { isSingle, isJoint };
};

export default connect(mapStateToProps, { incomeProfileSelected })(IncomeProfile);