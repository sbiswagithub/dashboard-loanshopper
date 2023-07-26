import React, { Component } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {  } from "react-native-paper";

import getStyleSheet from '../../styles/styles';  
import { selectDetailsPanel } from '../../actions';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE } from "../../constants/colors";


class LoanPackageScrollTab extends Component {

	constructor(props) {
        super(props);
    }

    render () {
    	const styles = getStyleSheet();
        return (
        <View>
            <Icon.Button name={this.props.iconName} size={30} borderRadius={30} 
                backgroundColor={this.props.selectedView == this.props.selection ? LOGO_BRIGHT_BLUE : "#ffffff"} 
                color={this.props.selectedView == this.props.selection  ? LOGO_DARK_BLUE : "grey" } 
                style={{borderWidth:0.5, borderColor:LOGO_BRIGHT_BLUE}}
                iconStyle={{margin:3,alignContent:'center'}} 
                onPress={() => 
                  this.props.inCompareMode ? null : this.props.selectDetailsPanel(this.props.selection)}
                >{this.props.banner}</Icon.Button>
          </View>
        )
    }
}

const mapStateToProps = ({ authReducer, proposalCalendarReducer, proposalReducer }) => {
  const { selectedView } = proposalReducer;
  const { } = proposalCalendarReducer;
  const { } = authReducer;
  return { selectedView };
};

export default connect(mapStateToProps, { selectDetailsPanel })(LoanPackageScrollTab);