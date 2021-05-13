import React from "react";
import { Image, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Filters from "./screens/Filters";
import SelectFriends from "./screens/SelectFriends";
import Start from "./screens/Start";
import ChangeLocation from "./screens/ChangeLocation";
import { logoHeaderOptions } from "components";
const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="createParty/begin"
      component={Start}
      options={{
        title: "Start Party",
        ...logoHeaderOptions,
      }}
    />

    <Stack.Screen
      name="createParty/selectFriends"
      component={SelectFriends}
      options={{
        title: "Friends",
        headerShown: true,
        ...logoHeaderOptions,
      }}
    />

    <Stack.Screen
      name="createParty/filters"
      component={Filters}
      options={{
        title: "Filters",
        headerShown: true,
        ...logoHeaderOptions,
      }}
    />
    <Stack.Screen
      name="createParty/filters/changeLocation"
      component={ChangeLocation}
      options={{
        title: "ChangeLocation",
        headerShown: false,
        // ...logoHeader,
      }}
    />
  </Stack.Navigator>
);
