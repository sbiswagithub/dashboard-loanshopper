import Constants from 'expo-constants';
import React, { useEffect } from "react";
import { BrowserRouter as Router, } from "react-router-dom";
import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Root from "./Root";
import Mobile from "./Mobile";
import store from "./reducers";
import Amplify from "@aws-amplify/core";
import awsconfig from './aws/aws-exports';
Amplify.configure(awsconfig);

const theme = {
  ...DefaultTheme,
};
function App() {
  if (Constants.platform.web)
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);
  return (
     <GestureHandlerRootView style={{ flex: 1 }}><Provider store={store}>
        <PaperProvider theme={theme}>
          {Constants.platform.web ?
            <Router>
              <Root/>
            </Router> :
            <Mobile/> }
        </PaperProvider>
      </Provider></GestureHandlerRootView>
  );
}

export default App;