import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import store from "./reducers";
import Root from './_layout'


const theme = {
  ...DefaultTheme,
}
  
export default function App() {
  return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Root/>
        </PaperProvider>
      </Provider>
    );
}
