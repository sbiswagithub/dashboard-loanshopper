import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import VerificationCodeEntry from './screens/VerificationCodeEntry';
import EmailPasswordConfirmEntry from './screens/EmailPasswordConfirmEntry';
import BrokerRegistration from "./screens/BrokerRegistration";
import BrokerPreEntry from "./screens/BrokerPreEntry";

export default function Auth({}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BrokerLogin"
        component={BrokerPreEntry}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BrokerRegistration"
        component={BrokerRegistration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailPasswordConfirmEntry"
        component={EmailPasswordConfirmEntry}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyBrokerCode"
        component={VerificationCodeEntry}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
