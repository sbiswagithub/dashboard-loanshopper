import { useLocation } from "react-router-dom";
import { useDispatch, } from "react-redux";

import { LogBox, } from "react-native";
import Constants from 'expo-constants';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./actions/RootNavigation";

import Landing from "./components/Landing";
import Menu from "./components/menu/Menu";
import SignIn from "./components/SignIn";
import VerifyOtp from "./components/otp/VerifyOtp";
import UserRegistration from "./components/UserRegistration";
import EmailRegistration from "./components/EmailRegistration";
import EmailRegistration2 from "./components/EmailRegistration2";


import Amplify from "@aws-amplify/core";
import awsconfig from './aws/aws-exports';
import { webAuthenticatedBorrower, onRedirect } from './actions/Auth'

Amplify.configure(awsconfig);

function Root() {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const Stack = createStackNavigator();
  const redirectData = Object.fromEntries(
    new URLSearchParams(search)
  )
  console.log(redirectData)

  if (redirectData?.accessCode) {
    console.log('Preauthenticated')
    dispatch(webAuthenticatedBorrower(redirectData.accessCode));
    dispatch(onRedirect(redirectData.accessCode))
  }         
  LogBox.ignoreAllLogs();
 



  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator >
        {
          !redirectData?.appEntryMode ? (
          <>
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false, gestureEnabled: false, }}
            />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="EmailRegistration" component={EmailRegistration} />
            <Stack.Screen name="EmailRegistration2" component={EmailRegistration2} />
          </>
        ) : redirectData.appEntryMode.toUpperCase() === "EMAIL_REGISTRATION_START" ? (
          <>
            <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
          </>
        ) : redirectData.appEntryMode.toUpperCase() === "REGISTRATION_IN_PROGRESS" ? (
          <>
            <Stack.Screen name="UserRegistration" component={UserRegistration} />
            <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          </>
        )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default Root;
