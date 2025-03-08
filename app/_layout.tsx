import { createStackNavigator } from "@react-navigation/stack";


import Home from "./components/home";
import AppStores from "./components/appstores";
const Stack = createStackNavigator();


function Root() {

  return (
        <Stack.Navigator initialRouteName={'Home'} >
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false, }} />
            <Stack.Screen name="AppStores" component={AppStores} options={{ headerShown: false, gestureEnabled: false, }} />
          </>
        </Stack.Navigator>
  );
}

export default Root;