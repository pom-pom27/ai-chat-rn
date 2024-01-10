import { NavigationContainer, RouteProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { IAiTheme } from "./aiTheme";
import ChatScreen from "./pages/ChatScreen";
import HomeScreen from "./pages/HomeScreen";

export type RootStackParamList = {
  Home: undefined;
  Chat: { theme: IAiTheme };
};

export type NavigationProps = NativeStackScreenProps<RootStackParamList>;

export type RouteProps = RouteProp<RootStackParamList>;

export interface INavScreen {
  navigation: NavigationProps;
  route: RouteProps;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route }) => ({
              title: `Chat with ${route.params.theme.name}`,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
