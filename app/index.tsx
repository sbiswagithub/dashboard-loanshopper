import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import store from "./reducers";
import Root from './_layout'


const theme = {
  ...DefaultTheme,
}
  
export default function App() {
  return (
     <GestureHandlerRootView style={{ flex: 1 }}>
       <Provider store={store}>
        <PaperProvider theme={theme}>
          <Root/>
        </PaperProvider>
      </Provider>
      </GestureHandlerRootView>
    );
}
