import React, { Component } from "react";
import { connect } from "react-redux";
import {  } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { trackPromise,  } from 'react-promise-tracker';

const Tab = createBottomTabNavigator();

import * as colors from "./../../../constants/colors";
import { HOME, SETTIGNS } from "./../../../constants/banners";
import { API_BROKER_BROKERAGENTS_URI } from "./../../../constants/apiUrls";
import { loadBrokerDetails } from "./../../../actions";

import Entry from "./Entry";
import Settings from "./Settings";
import getStyles from "../../../styles/styles";

class BrokerHome extends Component {

	  constructor(props) {
      super(props);
    }

    whenUpdated() {
			const uri = `${API_BROKER_BROKERAGENTS_URI}`;
			if (this.props.accessCode != '' ) trackPromise(
				fetch(uri, {
				    method: "GET",
				    headers: { 'Content-Type': 'application/json', 'Authorization': this.props.accessCode },
				})
			    .then(response => {
					if (response.status >= 400 && response.status < 600) {
		                const error = Object.assign({}, {
		                    status: response.status,
		                    statusText: response.statusText,
		                    showDialog: true, 
		                    dialogTitle: ERROR_DIALOG_TITLE_1, 
		                    publicMessage: ERROR_DIALOG_PUBLIC_MSG_1, 
                    		logMessage: 'Failed to connect to ' + uri
		                });
		                return Promise.reject(error);
					} else
			    		return response.json();
			    })
			    .then((json) => {
            this.props.loadBrokerDetails(json);
			    })
			    .catch((error) => {
				    console.log('Boo in GET brokeragents');
				    console.log(error);
				  	this.props.handleFetchError(error);	  						  	
			    }));	

    }

    componentDidMount() {
      this.whenUpdated();
    }
    
    render () {
      const s = getStyles();

      const tabIconSize = 30;  
      return (
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: { backgroundColor: "#1f215e", padding:"1%" },
            }}
          >
            <Tab.Screen
              name="Broker"
              component={Entry}
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons
                    name="shield-home"
                    color={focused ? colors.LOGO_BRIGHT_BLUE : "#fff"}
                    size={tabIconSize}
                  />
                ),
                headerShown: false,
                tabBarLabel: HOME,
              }}
            />

            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons
                    name="eye-settings"
                    color={focused ? colors.LOGO_BRIGHT_BLUE : "#fff"}
                    size={tabIconSize}
                  />
                ),
                headerShown: false,
                tabBarLabel: SETTIGNS,
              }}
            />
          </Tab.Navigator>
        );
    }
}

const mapStateToProps = ({ authReducer, brokerReducer }) => {
  const { showTrialAccountMessage } = brokerReducer;
  const { accessCode, appEntryMode } = authReducer;
  return { accessCode, appEntryMode, showTrialAccountMessage };
};

export default connect(mapStateToProps, { loadBrokerDetails })(BrokerHome);