import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { trackPromise,  } from 'react-promise-tracker';
import { ERROR_DIALOG_TITLE_1, ERROR_DIALOG_PUBLIC_MSG_1 } from '../constants/banners';

import getStyleSheet from '../styles/styles';  
import BrokerHome from "./broker/BrokerNavigation/BrokerHome";
import ProspectSearch from "./broker/BrokerNavigation/Prospects/ProspectSearch";
import AuthNavigation from "./broker/AuthNavigation";
import { API_BROKER_BROKERAGENTS_URI } from "../constants/apiUrls";

const Stack = createStackNavigator();

class BrokerEntry extends Component {

	  constructor(props) {
        super(props);
    }
  
    render () {
      const styles = getStyleSheet();

      if (this.props.appEntryMode.toUpperCase() === "TRIAL_ACCOUNT") {
        // Call /brokeragents
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
            })
            .catch((error) => {
              console.log('Boo in GET brokeragents');
              console.log(error);
              this.props.handleFetchError(error);	  						  	
            }));	    
      } else {
      }

      return (
        <Stack.Navigator screenOptions={{ headerMode: "BrokerHome",  }}>
          {this.props.appEntryMode.toUpperCase() === "INIT" ? (
            <>
              <Stack.Screen name="SignIn" component={AuthNavigation} />
            </>
          ) : (
            <>
              <Stack.Screen name="BrokerHome" component={BrokerHome}                 
                options={{
                  gestureEnabled: false,
                }} />

              <Stack.Screen name="ProspectSearch" component={ProspectSearch} 
                options={{
                  gestureEnabled: false,
                }} />
            </>
          )}
        </Stack.Navigator>            
        )
    }
}


const mapStateToProps = ({ authReducer }) => {

  const { accessCode, appEntryMode } = authReducer;
  return { accessCode, appEntryMode };
};

export default connect(mapStateToProps, { })(BrokerEntry);