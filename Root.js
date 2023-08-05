import { useLocation } from "react-router-dom";
import { useDispatch, } from "react-redux";

import { LogBox, } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./actions/RootNavigation";

import Landing from "./components/Landing";
import ClientConnections from "./components/clientConnections";
import Menu from "./components/menu/Menu";
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
  //console.log(redirectData)

  if (redirectData?.accessCode) {
    //console.log('Preauthenticated')
    dispatch(webAuthenticatedBorrower(redirectData.accessCode));
    dispatch(onRedirect(redirectData.accessCode))
  }         
  LogBox.ignoreAllLogs();
 



  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={
          !redirectData?.appEntryMode ? 'Landing' : 
          redirectData?.appEntryMode && redirectData.appEntryMode.toUpperCase() === "EMAIL_REGISTRATION_START" ? 'VerifyOtp' :
          redirectData?.appEntryMode && redirectData.appEntryMode.toUpperCase() === "REGISTRATION_IN_PROGRESS" ? 'UserRegistration' :
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
      </NavigationContainer>
  );
}

export default Root;
