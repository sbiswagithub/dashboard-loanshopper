import React from "react";
import { connect } from 'react-redux';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./actions/RootNavigation";

import Landing from "./components/Landing";
import Menu from "./components/menu/Menu";
import VerifyOtp from "./components/otp/VerifyOtp";
import UserRegistration from "./components/UserRegistration";
import EmailRegistration from "./components/EmailRegistration";
import EmailRegistration2 from "./components/EmailRegistration2";

const Stack = createStackNavigator();

class Mobile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={
          !this.props?.appEntryMode || this.props.appEntryMode.toUpperCase() === "INIT" ? 'Landing' : 
          this.props?.appEntryMode && this.props.appEntryMode.toUpperCase() === "EMAIL_REGISTRATION_START" ? 'VerifyOtp' :
          this.props?.appEntryMode && this.props.appEntryMode.toUpperCase() === "REGISTRATION_IN_PROGRESS" ? 'UserRegistration' :
          'Menu'} >
          <>
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false, gestureEnabled: false, }} />
            <Stack.Screen name="EmailRegistration" component={EmailRegistration} options={{ headerShown: false, gestureEnabled: false, }}  />
            <Stack.Screen name="EmailRegistration2" component={EmailRegistration2} options={{ headerShown: false, gestureEnabled: false, }}  />
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
            <Stack.Screen name="UserRegistration" component={UserRegistration} options={{ headerShown: false, gestureEnabled: false, }}  />
            <Stack.Screen name="VerifyOtp" component={VerifyOtp} options={{ headerShown: false, gestureEnabled: false, }}  />
          </>
        </Stack.Navigator>
      </NavigationContainer>     );
  }
}

const mapStateToProps = ({ authReducer }) => {
  const { appEntryMode } = authReducer
  return { appEntryMode };
};

export default connect(mapStateToProps, {  })(Mobile);