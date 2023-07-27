import React, { useEffect } from "react";
import { BrowserRouter as Router, } from "react-router-dom";
import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Root from "./Root";
import store from "./reducers";

const theme = {
  ...DefaultTheme,
};
function App() {
 useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
     <GestureHandlerRootView style={{ flex: 1 }}><Provider store={store}>
        <PaperProvider theme={theme}>
          <Router>
            <Root/>
          </Router>
        </PaperProvider>
      </Provider></GestureHandlerRootView>
  );
}

export default App;