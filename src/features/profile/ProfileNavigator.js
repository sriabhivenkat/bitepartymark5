import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="profile"
      component={Profile}
      options={{
        title: "Profile",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="profile/settings"
      component={Settings}
      options={{
        title: "Settings",
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
