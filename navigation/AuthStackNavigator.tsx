import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import { AuthParamList } from "../types";

const Stack = createNativeStackNavigator<AuthParamList>();
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign in"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Sign up" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
