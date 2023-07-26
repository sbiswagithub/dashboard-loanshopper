import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import Menu from "./menu/Menu";
import SignIn from "./SignIn";
import VerifyOtp from "./otp/VerifyOtp";
import UserRegistration from "./UserRegistration";
import EmailRegistration from "./EmailRegistration";
import EmailRegistration2 from "./EmailRegistration2";
import ApplicationMessages from "./deals/ApplicationMessages";

const Stack = createStackNavigator();

// This entry stack will direct the user to the SignIn page for LinkedIn or email sign-in modules.
// For Email sign ins - 
// - new users are directed to the EmailRegistration component
// For linked in sign ins - 
// - new users are directed to the UserRegistration component
// For Email and linked sign ins - 
// - registered users are directed to the Home page by way of the Menu component
class BorrowerEntry extends Component {

  render() {

    return (
      <Stack.Navigator screenOptions={{ headerMode: "UserRegistration" }}>
        {this.props.appEntryMode.toUpperCase() === "INIT" || this.props.appEntryMode.toUpperCase() === "EMAIL_REGISTRATION_START" ? (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="EmailRegistration" component={EmailRegistration} />
            <Stack.Screen name="EmailRegistration2" component={EmailRegistration2} />
            <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
          </>
        ) : this.props.appEntryMode.toUpperCase() === "REGISTRATION_IN_PROGRESS" ? (
          <>
            <Stack.Screen name="UserRegistration" component={UserRegistration} />
            <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Messages" component={ApplicationMessages} />
          </>
        )}
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = ({ authReducer, homeReducer }) => {
  const { appEntryMode } = authReducer;
  const { } = homeReducer;

  return { appEntryMode };
};

export default connect(mapStateToProps, {
})(BorrowerEntry);