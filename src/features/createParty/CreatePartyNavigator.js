import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Filters from "./screens/Filters";
import SelectFriends from "./screens/SelectFriends";
import Start from "./screens/Start";

const Stack = createStackNavigator();

const LogoTitle = () => (
  <Image
    style={{ width: 100, height: 75, alignItems: "center" }}
    source={require("assets/images/headerlogo.png")}
  />
);

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="createParty/begin"
      component={Start}
      options={{
        title: "Start Party",
        // headerShown: false,
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          height: 120,
        },
      }}
    ></Stack.Screen>
    <Stack.Screen
      name="createParty/selectFriends"
      component={SelectFriends}
      options={{
        title: "Friends",
        headerShown: true,
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          height: 120,
        },
      }}
    />
    <Stack.Screen
      name="createParty/filters"
      component={Filters}
      options={{
        title: "Filters",
        headerShown: true,
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          height: 120,
        },
      }}
    />
  </Stack.Navigator>
);
