import React from "react";
import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  LogBox,
  Appearance,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./actions/RootNavigation";
import Landing from "./components/Landing";
import BorrowerEntry from "./components/BorrowerEntry";
import Amplify from "@aws-amplify/core";
import awsconfig from './aws/aws-exports';
import store from "./reducers";

Amplify.configure(awsconfig);

const theme = {
  ...DefaultTheme,
};

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectData: null,
    };
  }

  render() {
    LogBox.ignoreAllLogs();
    const colorScheme = Appearance.getColorScheme();

    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
              <Stack.Screen
                name="Landing"
                component={Landing}
                options={{ headerShown: false, gestureEnabled: false, }}
              />
              <Stack.Screen
                name="BorrowerEntry"
                component={BorrowerEntry}
                options={{ headerShown: false, gestureEnabled: false, }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}