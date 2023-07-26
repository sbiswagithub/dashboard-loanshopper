import React, { Component } from "react";
import { connect } from "react-redux";
import { View, } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import getStyleSheet from '../../styles/styles';  
import BrokerNavigation from "./BrokerNavigation";
import AuthNavigation from "./AuthNavigation";

const Stack = createStackNavigator();

class BrokerEntry extends Component {

	constructor(props) {
        super(props);
    }
  
    render () {
        const styles = getStyleSheet();
        console.log(this.props);
    	return (
			<View >
            {
                this.props.appEntryMode.toUpperCase() == 'INIT' ?
                    <AuthNavigation /> :
                    <BrokerNavigation />
            }
            </View>
        )
    }
}


const mapStateToProps = ({ authReducer }) => {

  const { accessCode, appEntryMode } = authReducer;
  return { accessCode, appEntryMode };
};

export default connect(mapStateToProps, { })(BrokerEntry);