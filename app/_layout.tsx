import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer,NavigationIndependentTree } from '@react-navigation/native';
import { Text } from "react-native";


import Home from "./components/home";
import AppStores from "./components/appstores";
import React from "react";
const Stack = createStackNavigator();

const linking = {
  prefixes: ['ls://', 'http://localhost:8081','https://borrower.loanshopper.com.au'],
  config: {
    screens: {
      Home: 'Home',
      AppStores:  {
        path: 'appstores',
        alias: ['AppStores'],
      },
    },
  },
};
function Root() {

  return (
    <NavigationIndependentTree>
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
    >
      <Stack.Navigator initialRouteName={'Home'} >
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false, }} />
            <Stack.Screen name="AppStores" component={AppStores} options={{ headerShown: false, gestureEnabled: false, }} />
          </>
        </Stack.Navigator>
    </NavigationContainer></NavigationIndependentTree>
  );
}

export default Root;